import { createRazorpayOrder } from '../../services/createOrder';
import { getCartByUUID } from '@evershop/evershop/src/modules/checkout/services/getCartByUUID';
import { error } from '@evershop/evershop/src/lib/log/logger';

export default async function createRazorpayOrderAPI(request, response, delegate, next) {
  try {
    const { cartId } = request.body;
    
    if (!cartId) {
      return response.status(400).json({
        error: {
          status: 'INVALID_PAYLOAD',
          message: 'Cart ID is required'
        }
      });
    }

    // Get cart details
    const cart = await getCartByUUID(cartId);
    if (!cart) {
      return response.status(404).json({
        error: {
          status: 'INVALID_PAYLOAD',
          message: 'Cart not found'
        }
      });
    }

    // Calculate amount in paise (smallest currency unit for INR)
    const amountInPaise = Math.round(cart.grand_total * 100);
    
    // Create Razorpay order
    const orderData = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `cart_${cartId}_${Date.now()}`,
      notes: {
        cart_id: cartId,
        customer_email: cart.customer_email || '',
        customer_name: cart.customer_full_name || ''
      }
    };

    const result = await createRazorpayOrder(orderData);
    
    if (result.success) {
      response.json({
        data: {
          order_id: result.order.id,
          amount: result.order.amount,
          currency: result.order.currency,
          key_id: result.keyId,
          receipt: result.order.receipt,
          status: result.order.status
        }
      });
    } else {
      response.status(500).json({
        error: {
          status: 'INTERNAL_ERROR',
          message: result.error
        }
      });
    }
  } catch (err) {
    error('Razorpay order creation API error:', err);
    response.status(500).json({
      error: {
        status: 'INTERNAL_ERROR',
        message: 'Failed to create Razorpay order'
      }
    });
  }
}
