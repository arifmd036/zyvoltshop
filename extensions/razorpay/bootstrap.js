import config from 'config';
import { getConfig } from '@evershop/evershop/src/lib/util/getConfig';
import { hookAfter } from '@evershop/evershop/src/lib/util/hookable';
import { registerPaymentMethod } from '@evershop/evershop/src/modules/checkout/services/getAvailablePaymentMethos';
import { getSetting } from '@evershop/evershop/src/modules/setting/services/setting';
import { refundPayment } from './services/refundPayment';

export default async () => {
  // Define payment status configurations for Razorpay
  const razorpayPaymentStatus = {
    order: {
      paymentStatus: {
        authorized: {
          name: 'Authorized',
          badge: 'attention',
          progress: 'incomplete'
        },
        captured: {
          name: 'Captured',
          badge: 'success',
          progress: 'complete'
        },
        failed: {
          name: 'Failed',
          badge: 'critical',
          progress: 'failed'
        },
        refunded: {
          name: 'Refunded',
          badge: 'critical',
          progress: 'complete'
        },
        partial_refunded: {
          name: 'Partial Refunded',
          badge: 'critical',
          progress: 'incomplete'
        }
      },
      psoMapping: {
        'authorized:*': 'processing',
        'captured:*': 'processing',
        'failed:*': 'new',
        'refunded:*': 'closed',
        'partial_refunded:*': 'processing',
        'partial_refunded:delivered': 'completed'
      }
    }
  };

  // Set module defaults for order management system
  config.util.setModuleDefaults('oms', razorpayPaymentStatus);

  // Hook for handling payment cancellation
  hookAfter('changePaymentStatus', async (order, orderID, status) => {
    if (status !== 'canceled') {
      return;
    }
    if (order.payment_method !== 'razorpay') {
      return;
    }
    // Handle refund when order is canceled
    await refundPayment(orderID);
  });

  // Register Razorpay payment method
  registerPaymentMethod({
    init: async () => ({
      methodCode: 'razorpay',
      methodName: await getSetting('razorpayDisplayName', 'Razorpay')
    }),
    validator: async () => {
      const razorpayConfig = getConfig('system.razorpay', {});
      let razorpayStatus;
      
      if (razorpayConfig.status) {
        razorpayStatus = razorpayConfig.status;
      } else {
        razorpayStatus = await getSetting('razorpayPaymentStatus', 0);
      }
      
      if (parseInt(razorpayStatus, 10) === 1) {
        return true;
      } else {
        return false;
      }
    }
  });
};
