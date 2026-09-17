import { describe, it, expect } from 'vitest';
import { createHmac } from 'node:crypto';
import { verifySanityWebhookSignature, verifyWebhookSecret } from '@prixtara/cms';

describe('Security Architecture', () => {
  describe('verifySanityWebhookSignature', () => {
    const secret = 'test-webhook-secret-key-12345';
    const payload = JSON.stringify({ _type: 'product', slug: 'ai-vision' });

    function createValidHeader(body: string, timestamp: number, testSecret: string) {
      const data = `${timestamp}.${body}`;
      const signature = createHmac('sha256', testSecret).update(data).digest('base64');
      return `t=${timestamp},v1=${signature}`;
    }

    it('validates a correct HMAC signature with fresh timestamp', () => {
      const now = Math.floor(Date.now() / 1000);
      const header = createValidHeader(payload, now, secret);

      const isValid = verifySanityWebhookSignature(payload, header, secret);
      expect(isValid).toBe(true);
    });

    it('rejects an expired timestamp (replay attack prevention)', () => {
      // 10 minutes in the past (tolerance default is 5 minutes)
      const tenMinutesAgo = Math.floor((Date.now() - 10 * 60 * 1000) / 1000);
      const header = createValidHeader(payload, tenMinutesAgo, secret);

      const isValid = verifySanityWebhookSignature(payload, header, secret);
      expect(isValid).toBe(false);
    });

    it('rejects a tampered body payload', () => {
      const now = Math.floor(Date.now() / 1000);
      const header = createValidHeader(payload, now, secret);
      const tampered = JSON.stringify({ _type: 'product', slug: 'tampered-slug' });

      const isValid = verifySanityWebhookSignature(tampered, header, secret);
      expect(isValid).toBe(false);
    });

    it('rejects an incorrect secret', () => {
      const now = Math.floor(Date.now() / 1000);
      const header = createValidHeader(payload, now, 'wrong-secret');

      const isValid = verifySanityWebhookSignature(payload, header, secret);
      expect(isValid).toBe(false);
    });

    it('rejects missing or empty signature header or secret', () => {
      expect(verifySanityWebhookSignature(payload, '', secret)).toBe(false);
      expect(verifySanityWebhookSignature(payload, null, secret)).toBe(false);
      expect(verifySanityWebhookSignature(payload, 't=123,v1=abc', '')).toBe(false);
      expect(verifySanityWebhookSignature(payload, 't=123,v1=abc', null)).toBe(false);
    });
  });

  describe('verifyWebhookSecret', () => {
    const secret = 'super-secret-token-777';

    it('verifies exact matching bearer secret token', () => {
      expect(verifyWebhookSecret('Bearer super-secret-token-777', secret)).toBe(true);
      expect(verifyWebhookSecret('super-secret-token-777', secret)).toBe(true);
    });

    it('rejects wrong token or differing lengths', () => {
      expect(verifyWebhookSecret('Bearer wrong-token', secret)).toBe(false);
      expect(verifyWebhookSecret('short', secret)).toBe(false);
      expect(verifyWebhookSecret(null, secret)).toBe(false);
      expect(verifyWebhookSecret('', secret)).toBe(false);
    });
  });
});
