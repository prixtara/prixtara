import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { sanitizePreviewRedirectPath } from '@prixtara/cms/client';

/**
 * Route handler to exit Next.js Draft Mode.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  const draft = await draftMode();
  draft.disable();

  const targetPath = sanitizePreviewRedirectPath(slug);
  redirect(targetPath);
}
