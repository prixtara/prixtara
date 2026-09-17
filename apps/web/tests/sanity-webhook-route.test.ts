import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/webhook/sanity/route';
import { POST as revalidatePOST } from '@/app/api/revalidate/route';
import { createHmac } from 'node:crypto';

// Mock next/cache revalidation functions
vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

import { revalidateTag, revalidatePath } from 'next/cache';

describe('Sanity Webhook Route Handler (/api/webhook/sanity & /api/revalidate)', () => {
  const secret = 'test-webhook-secret-key-1234567890!';

  beforeEach(() => {
    vi.clearAllMocks();
    process.env['SANITY_WEBHOOK_SECRET'] = secret;
  });

  function createSignedRequest(
    url: string,
    bodyObj: Record<string, unknown>,
    secretKey: string,
  ): NextRequest {
    const rawBody = JSON.stringify(bodyObj);
    const timestamp = Math.floor(Date.now() / 1000);
    const hmac = createHmac('sha256', secretKey).update(`${timestamp}.${rawBody}`).digest('base64');
    const signature = `t=${timestamp},v1=${hmac}`;

    return new NextRequest(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'sanity-webhook-signature': signature,
      },
      body: rawBody,
    });
  }

  it('rejects requests with invalid or missing signatures with 401', async () => {
    const req = new NextRequest('http://localhost:3000/api/webhook/sanity', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ _type: 'product' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toContain('Unauthorized');
  });

  it('revalidates product tags and paths on product mutation', async () => {
    const req = createSignedRequest(
      'http://localhost:3000/api/webhook/sanity',
      {
        _type: 'product',
        slug: { current: 'ai-vision-defect-detection' },
      },
      secret,
    );

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.revalidatedTags).toContain('products');
    expect(json.revalidatedTags).toContain('product:ai-vision-defect-detection');
    expect(json.revalidatedPaths).toContain('/products/ai-vision-defect-detection');

    expect(revalidateTag).toHaveBeenCalledWith('products');
    expect(revalidateTag).toHaveBeenCalledWith('product:ai-vision-defect-detection');
    expect(revalidatePath).toHaveBeenCalledWith('/products/ai-vision-defect-detection');
  });

  it('revalidates job tags and paths on jobPosting mutation', async () => {
    const req = createSignedRequest(
      'http://localhost:3000/api/webhook/sanity',
      {
        _type: 'jobPosting',
        slug: 'senior-cv-engineer',
      },
      secret,
    );

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.revalidatedTags).toContain('jobs');
    expect(json.revalidatedTags).toContain('job:senior-cv-engineer');
    expect(json.revalidatedPaths).toContain('/career/senior-cv-engineer');

    expect(revalidateTag).toHaveBeenCalledWith('jobs');
    expect(revalidateTag).toHaveBeenCalledWith('job:senior-cv-engineer');
  });

  it('revalidates vision tag on visionPage mutation', async () => {
    const req = createSignedRequest(
      'http://localhost:3000/api/webhook/sanity',
      { _type: 'visionPage' },
      secret,
    );

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith('vision');
    expect(revalidatePath).toHaveBeenCalledWith('/vision');
  });

  it('works identically via /api/revalidate alias', async () => {
    const req = createSignedRequest(
      'http://localhost:3000/api/revalidate',
      { _type: 'aboutPage' },
      secret,
    );

    const res = await revalidatePOST(req);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith('about');
    expect(revalidatePath).toHaveBeenCalledWith('/about');
  });
});
