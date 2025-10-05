import { captureRazorpayPayment, updatePaymentTransaction } from '../../services/capturePayment';
import { getOrderByUUID } from '@evershop/evershop/src/modules/oms/services/getOrderByUUID';
import { updateOrder } from '@evershop/evershop/src/modules/oms/services/updateOrder';
import { error } from '@evershop/evershop/src/lib/log/logger';

export default async function captureRazorpayPaymentAPI(request, response, delegate, next) {
  try {
    const { paymentId, orderId, razorpaySignature } = request.body;
    
    if (!paymentId || !orderId) {
      return response.status(400).json({
        error: {
          status: 'INVALID_PAYLOAD',
          message: 'Payment ID and Order ID are required'
        }
      });
    }

    // Get order details
    const order = await getOrderByUUID(orderId);
    if (!order) {
      return response.status(404).json({
        error: {
          status: 'INVALID_PAYLOAD',
          message: 'Order not found'
        }
      });
    }

    // Verify payment signature (basic verification)
    // In production, implement proper signature verification using webhook secret
    
    // Capture payment (for manual capture mode)
    const amountInPaise = Math.round(order.grand_total * 100);
    const captureResult = await captureRazorpayPayment(paymentId, amountInPaise, 'INR');
    
    if (captureResult.success) {
      // Update payment transaction in database
      await updatePaymentTransaction(order.uuid, captureResult.payment);
      
      // Update order payment status
      await updateOrder(order.uuid, {
        payment_status: 'paid',
        payment_method: 'razorpay'
      });
      
      response.json({
        data: {
          success: true,
          payment_id: captureResult.payment.id,
          status: captureResult.payment.status,
          amount: captureResult.payment.amount,
          currency: captureResult.payment.currency
        }
      });
    } else {
      response.status(500).json({
        error: {
          status: 'PAYMENT_FAILED',
          message: captureResult.error
        }
      });
    }
  } catch (err) {
    error('Razorpay payment capture API error:', err);
    response.status(500).json({
      error: {
        status: 'INTERNAL_ERROR',
        message: 'Failed to capture Razorpay payment'
      }
    });
  }
}
