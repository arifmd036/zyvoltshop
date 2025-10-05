import Razorpay from 'razorpay';
import { getConfig } from '@evershop/evershop/src/lib/util/getConfig';
import { getSetting } from '@evershop/evershop/src/modules/setting/services/setting';

/**
 * Get Razorpay client instance
 * @returns {Razorpay} Razorpay client instance
 */
export async function getRazorpayClient() {
  const razorpayConfig = getConfig('system.razorpay', {});
  
  let keyId, keySecret, mode;
  
  if (razorpayConfig.keyId && razorpayConfig.keySecret) {
    keyId = razorpayConfig.keyId;
    keySecret = razorpayConfig.keySecret;
    mode = razorpayConfig.mode || 'test';
  } else {
    keyId = await getSetting('razorpayKeyId', '');
    keySecret = await getSetting('razorpayKeySecret', '');
    mode = await getSetting('razorpayMode', 'test');
  }

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API credentials are not configured');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
}

/**
 * Get Razorpay configuration
 * @returns {Object} Razorpay configuration
 */
export async function getRazorpayConfig() {
  const razorpayConfig = getConfig('system.razorpay', {});
  
  if (razorpayConfig.keyId && razorpayConfig.keySecret) {
    return {
      keyId: razorpayConfig.keyId,
      keySecret: razorpayConfig.keySecret,
      mode: razorpayConfig.mode || 'test',
      webhookSecret: razorpayConfig.webhookSecret || '',
      currency: razorpayConfig.currency || 'INR'
    };
  }

  return {
    keyId: await getSetting('razorpayKeyId', ''),
    keySecret: await getSetting('razorpayKeySecret', ''),
    mode: await getSetting('razorpayMode', 'test'),
    webhookSecret: await getSetting('razorpayWebhookSecret', ''),
    currency: await getSetting('razorpayCurrency', 'INR')
  };
}
