import { NextResponse, type NextRequest } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { serverEnv } from '@prixtara/config/server';
import { verifySanityWebhookSignature, verifyWebhookSecret, CACHE_TAGS } from '@prixtara/cms';

export interface WebhookPayload {
  _id?: string;
  _type?: string;
  slug?: string | { current?: string };
  operation?: 'create' | 'update' | 'delete';
  tags?: string[];
  paths?: string[];
}

/**
 * Sanity CMS on-demand revalidation webhook route handler.
 *
 * Architecture:
 *   Sanity Content Lake Mutation
 *     │
 *     ▼
 *   Sanity Webhook POST /api/webhook/sanity
 *     │ (Carries `sanity-webhook-signature` HMAC-SHA256 header)
 *     ▼
 *   Signature Verification (timingSafeEqual, replay protection)
 *     │
 *     ▼
 *   Map CMS Document Type & Slug to Cache Tags & Paths
 *     │
 *     ▼
 *   revalidateTag() / revalidatePath()
 *     │
 *     ▼
 *   Fresh Content Served on Next Request
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('sanity-webhook-signature');
    const authHeader =
      request.headers.get('authorization') || request.headers.get('x-sanity-secret');

    const expectedSecret = serverEnv.SANITY_WEBHOOK_SECRET || process.env['SANITY_WEBHOOK_SECRET'];

    // Security check: validate webhook signature or secret header
    let isAuthorized = false;

    if (expectedSecret) {
      if (signature && verifySanityWebhookSignature(rawBody, signature, expectedSecret)) {
        isAuthorized = true;
      } else if (authHeader && verifyWebhookSecret(authHeader, expectedSecret)) {
        isAuthorized = true;
      }
    } else if (process.env['NODE_ENV'] === 'development') {
      // In local dev without configured secret, allow requests with a warning
      console.warn(
        '[Webhook] SANITY_WEBHOOK_SECRET is not configured. Allowing webhook in development mode.',
      );
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid webhook signature or secret' },
        { status: 401 },
      );
    }

    let payload: WebhookPayload = {};
    if (rawBody.trim()) {
      try {
        payload = JSON.parse(rawBody);
      } catch {
        return NextResponse.json({ error: 'Bad Request: Malformed JSON payload' }, { status: 400 });
      }
    }

    const { _type, slug: rawSlug, tags: customTags = [], paths: customPaths = [] } = payload;
    const slug = typeof rawSlug === 'object' && rawSlug ? rawSlug.current : rawSlug;

    const tagsToRevalidate = new Set<string>(customTags);
    const pathsToRevalidate = new Set<string>(customPaths);

    // Map CMS document types to canonical cache tags and paths
    switch (_type) {
      case 'product': {
        tagsToRevalidate.add(CACHE_TAGS.products);
        tagsToRevalidate.add(CACHE_TAGS.homepage);
        pathsToRevalidate.add('/products');
        pathsToRevalidate.add('/');
        if (slug) {
          tagsToRevalidate.add(CACHE_TAGS.product(slug));
          pathsToRevalidate.add(`/products/${slug}`);
        }
        break;
      }
      case 'jobPosting': {
        tagsToRevalidate.add(CACHE_TAGS.jobs);
        tagsToRevalidate.add(CACHE_TAGS.careers);
        pathsToRevalidate.add('/career');
        if (slug) {
          tagsToRevalidate.add(CACHE_TAGS.job(slug));
          pathsToRevalidate.add(`/career/${slug}`);
        }
        break;
      }
      case 'careerPage': {
        tagsToRevalidate.add(CACHE_TAGS.careers);
        pathsToRevalidate.add('/career');
        break;
      }
      case 'visionPage': {
        tagsToRevalidate.add(CACHE_TAGS.vision);
        pathsToRevalidate.add('/vision');
        break;
      }
      case 'aboutPage': {
        tagsToRevalidate.add(CACHE_TAGS.about);
        pathsToRevalidate.add('/about');
        break;
      }
      case 'homepage': {
        tagsToRevalidate.add(CACHE_TAGS.homepage);
        pathsToRevalidate.add('/');
        break;
      }
      case 'navigation': {
        tagsToRevalidate.add(CACHE_TAGS.navigation);
        pathsToRevalidate.add('/');
        break;
      }
      case 'siteSettings': {
        tagsToRevalidate.add(CACHE_TAGS.siteSettings);
        tagsToRevalidate.add(CACHE_TAGS.navigation);
        pathsToRevalidate.add('/');
        break;
      }
      default: {
        // If type is not recognized but slug was provided, purge general tags
        if (slug) {
          tagsToRevalidate.add(`product:${slug}`);
          tagsToRevalidate.add(`job:${slug}`);
        }
      }
    }

    // Execute tag revalidations
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag);
    }

    // Execute path revalidations
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({
      success: true,
      message: 'On-demand cache revalidation completed successfully',
      revalidatedTags: Array.from(tagsToRevalidate),
      revalidatedPaths: Array.from(pathsToRevalidate),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Webhook Error]', error);
    return NextResponse.json(
      { error: 'Internal Server Error during revalidation' },
      { status: 500 },
    );
  }
}
