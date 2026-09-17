import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Default clock drift / replay window tolerance in milliseconds (5 minutes).
 */
const DEFAULT_TOLERANCE_MS = 5 * 60 * 1000;

/**
 * Result of webhook signature validation.
 */
export interface WebhookVerificationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates a Sanity webhook HMAC-SHA256 signature against the raw request body and secret.
 *
 * Sanity sends the `sanity-webhook-signature` header in the format:
 * `t=<timestamp>,v1=<signature>`
 *
 * The signature is computed as HMAC-SHA256 of `${timestamp}.${rawBody}` keyed by the webhook secret.
 *
 * Constant-time comparison is enforced via crypto.timingSafeEqual to protect against timing attacks.
 *
 * @param rawBody - Raw UTF-8 string payload from request body
 * @param signatureHeader - Value of `sanity-webhook-signature` header
 * @param secret - The shared SANITY_WEBHOOK_SECRET
 * @param toleranceMs - Max allowed clock drift (defaults to 5 minutes)
 */
export function verifySanityWebhookSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  secret: string | null | undefined,
  toleranceMs: number = DEFAULT_TOLERANCE_MS,
): boolean {
  if (!signatureHeader || !secret) {
    return false;
  }

  try {
    // Parse signature header components (e.g. t=1610000000,v1=abc...)
    const parts = signatureHeader.split(',');
    let timestamp: number | null = null;
    const signatures: string[] = [];

    for (const rawPart of parts) {
      const part = rawPart.trim();
      const eqIdx = part.indexOf('=');
      if (eqIdx === -1) {
        continue;
      }
      const key = part.slice(0, eqIdx).trim();
      const value = part.slice(eqIdx + 1).trim();

      if (key === 't' && value) {
        timestamp = parseInt(value, 10);
      } else if (key === 'v1' && value) {
        signatures.push(value);
      }
    }

    if (!timestamp || isNaN(timestamp) || signatures.length === 0) {
      return false;
    }

    // Timestamp check for replay protection (timestamp is in seconds or milliseconds)
    const timestampMs = timestamp < 1e12 ? timestamp * 1000 : timestamp;
    const now = Date.now();
    if (Math.abs(now - timestampMs) > toleranceMs) {
      return false;
    }

    // Compute expected HMAC signatures
    const payload = `${timestamp}.${rawBody}`;
    const hmacBase64 = createHmac('sha256', secret).update(payload).digest('base64');
    const hmacHex = createHmac('sha256', secret).update(payload).digest('hex');
    const hmacUrlSafe = hmacBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const hmacUnpadded = hmacBase64.replace(/=+$/, '');

    // Compare with constant-time equality
    for (const candidate of signatures) {
      if (safeCompare(candidate, hmacBase64)) {
        return true;
      }
      if (safeCompare(candidate, hmacHex)) {
        return true;
      }
      if (safeCompare(candidate, hmacUrlSafe)) {
        return true;
      }
      if (safeCompare(candidate.replace(/=+$/, ''), hmacUnpadded)) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Validates a shared webhook secret token (e.g. Bearer token or custom header).
 */
export function verifyWebhookSecret(
  providedSecret: string | null | undefined,
  expectedSecret: string | null | undefined,
): boolean {
  if (!providedSecret || !expectedSecret) {
    return false;
  }

  // Strip 'Bearer ' prefix if present
  const cleanProvided = providedSecret.replace(/^Bearer\s+/i, '').trim();
  const cleanExpected = expectedSecret.trim();

  return safeCompare(cleanProvided, cleanExpected);
}

/**
 * Helper to perform constant-time string comparison.
 */
function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'utf8');
    const bufB = Buffer.from(b, 'utf8');

    if (bufA.length !== bufB.length) {
      return false;
    }

    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}
