import crypto from 'crypto';
import { getRazorpayConfig } from '../../services/razorpayClient';
import { updatePaymentTransaction } from '../../services/capturePayment';
import { updateOrder } from '@evershop/evershop/src/modules/oms/services/updateOrder';
import { error, info } from '@evershop/evershop/src/lib/log/logger';

export default async function razorpayWebhookAPI(request, response, delegate, next) {
  try {
    const webhookSignature = request.headers['x-razorpay-signature'];
    const webhookBody = JSON.stringify(request.body);
    
    // Get webhook secret from configuration
    const config = await getRazorpayConfig();
    const webhookSecret = config.webhookSecret;
    
    if (!webhookSecret) {
      info('Razorpay webhook secret not configured, skipping signature verification');
    } else {
      // Verify webhook signature
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(webhookBody)
        .digest('hex');
      
      if (webhookSignature !== expectedSignature) {
        return response.status(400).json({
          error: 'Invalid webhook signature'
        });
      }
    }
    
    const { event, payload } = request.body;
    
    info(`Razorpay webhook received: ${event}`);
    
    switch (event) {
      case 'payment.captured':
        await handlePaymentCaptured(payload.payment.entity);
        break;
        
      case 'payment.failed':
        await handlePaymentFailed(payload.payment.entity);
        break;
        
      case 'refund.created':
        await handleRefundCreated(payload.refund.entity);
        break;
        
      case 'order.paid':
        await handleOrderPaid(payload.order.entity, payload.payment.entity);
        break;
        
      default:
        info(`Unhandled Razorpay webhook event: ${event}`);
    }
    
    response.status(200).json({ status: 'ok' });
  } catch (err) {
    error('Razorpay webhook error:', err);
    response.status(500).json({
      error: 'Webhook processing failed'
    });
  }
}

async function handlePaymentCaptured(payment) {
  try {
    const orderReceipt = payment.order_id;
    // Extract cart ID from receipt if it follows our format
    const cartIdMatch = orderReceipt.match(/cart_([^_]+)_/);
    
    if (cartIdMatch) {
      const cartId = cartIdMatch[1];
      // Update payment transaction
      await updatePaymentTransaction(cartId, payment);
      
      // Update order status
      await updateOrder(cartId, {
        payment_status: 'paid',
        payment_method: 'razorpay'
      });
      
      info(`Payment captured for cart: ${cartId}`);
    }
  } catch (err) {
    error('Error handling payment captured webhook:', err);
  }
}

async function handlePaymentFailed(payment) {
  try {
    const orderReceipt = payment.order_id;
    const cartIdMatch = orderReceipt.match(/cart_([^_]+)_/);
    
    if (cartIdMatch) {
      const cartId = cartIdMatch[1];
      
      // Update order status
      await updateOrder(cartId, {
        payment_status: 'failed',
        payment_method: 'razorpay'
      });
      
      info(`Payment failed for cart: ${cartId}`);
    }
  } catch (err) {
    error('Error handling payment failed webhook:', err);
  }
}

async function handleRefundCreated(refund) {
  try {
    info(`Refund created: ${refund.id} for payment: ${refund.payment_id}`);
    // Handle refund logic here
  } catch (err) {
    error('Error handling refund created webhook:', err);
  }
}

async function handleOrderPaid(order, payment) {
  try {
    const orderReceipt = order.receipt;
    const cartIdMatch = orderReceipt.match(/cart_([^_]+)_/);
    
    if (cartIdMatch) {
      const cartId = cartIdMatch[1];
      
      // Update payment transaction
      await updatePaymentTransaction(cartId, payment);
      
      // Update order status
      await updateOrder(cartId, {
        payment_status: 'paid',
        payment_method: 'razorpay'
      });
      
      info(`Order paid for cart: ${cartId}`);
    }
  } catch (err) {
    error('Error handling order paid webhook:', err);
  }
}
