import { describe, it, expect } from 'vitest';
import { createHmac } from 'node:crypto';
import { verifySanityWebhookSignature, verifyWebhookSecret } from '@prixtara/cms';

describe('Sanity Webhook Security Layer', () => {
  const secret = 'super-secret-webhook-key-32byteslong!';
  const samplePayload = JSON.stringify({
    _id: 'product-123',
    _type: 'product',
    slug: { current: 'ai-vision-defect-detection' },
    operation: 'update',
  });

  function generateSignatureHeader(
    payload: string,
    secretKey: string,
    timestampSeconds?: number,
  ): string {
    const t = timestampSeconds ?? Math.floor(Date.now() / 1000);
    const hmac = createHmac('sha256', secretKey).update(`${t}.${payload}`).digest('base64');
    return `t=${t},v1=${hmac}`;
  }

  it('validates a correct HMAC-SHA256 signature', () => {
    const header = generateSignatureHeader(samplePayload, secret);
    const isValid = verifySanityWebhookSignature(samplePayload, header, secret);
    expect(isValid).toBe(true);
  });

  it('rejects a tampered payload', () => {
    const header = generateSignatureHeader(samplePayload, secret);
    const tamperedPayload = samplePayload.replace('ai-vision', 'malicious-injected');
    const isValid = verifySanityWebhookSignature(tamperedPayload, header, secret);
    expect(isValid).toBe(false);
  });

  it('rejects an invalid secret', () => {
    const header = generateSignatureHeader(samplePayload, secret);
    const isValid = verifySanityWebhookSignature(samplePayload, header, 'wrong-secret-key');
    expect(isValid).toBe(false);
  });

  it('rejects an expired timestamp (replay attack protection)', () => {
    // 10 minutes ago
    const oldTimestamp = Math.floor((Date.now() - 10 * 60 * 1000) / 1000);
    const header = generateSignatureHeader(samplePayload, secret, oldTimestamp);
    const isValid = verifySanityWebhookSignature(samplePayload, header, secret);
    expect(isValid).toBe(false);
  });

  it('rejects malformed signature headers', () => {
    expect(verifySanityWebhookSignature(samplePayload, 'invalid-header-string', secret)).toBe(
      false,
    );
    expect(verifySanityWebhookSignature(samplePayload, '', secret)).toBe(false);
    expect(verifySanityWebhookSignature(samplePayload, null, secret)).toBe(false);
    expect(verifySanityWebhookSignature(samplePayload, undefined, secret)).toBe(false);
  });

  it('validates shared bearer token secrets', () => {
    expect(verifyWebhookSecret('super-secret-token', 'super-secret-token')).toBe(true);
    expect(verifyWebhookSecret('Bearer super-secret-token', 'super-secret-token')).toBe(true);
    expect(verifyWebhookSecret('Bearer wrong-token', 'super-secret-token')).toBe(false);
    expect(verifyWebhookSecret(null, 'super-secret-token')).toBe(false);
    expect(verifyWebhookSecret('', 'super-secret-token')).toBe(false);
  });
});
