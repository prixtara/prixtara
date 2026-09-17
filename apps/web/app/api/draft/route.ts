import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { isValidPreviewSecret, sanitizePreviewRedirectPath } from '@prixtara/cms/client';

/**
 * Route handler to activate Next.js Draft Mode for Sanity Live Preview.
 *
 * Query Parameters:
 *   - secret: Sanity preview secret or API token
 *   - slug: Target route path (e.g. /products/ai-vision-defect-detection)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (!isValidPreviewSecret(secret)) {
    return new Response('Invalid preview secret token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const targetPath = sanitizePreviewRedirectPath(slug);
  redirect(targetPath);
}
