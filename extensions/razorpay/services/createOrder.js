import { getRazorpayClient, getRazorpayConfig } from './razorpayClient';
import { error } from '@evershop/evershop/src/lib/log/logger';

/**
 * Create Razorpay order
 * @param {Object} orderData - Order data
 * @param {number} orderData.amount - Amount in smallest currency unit (paise for INR)
 * @param {string} orderData.currency - Currency code (INR, USD, etc.)
 * @param {string} orderData.receipt - Receipt ID
 * @param {Object} orderData.notes - Additional notes
 * @returns {Object} Razorpay order response
 */
export async function createRazorpayOrder(orderData) {
  try {
    const razorpay = await getRazorpayClient();
    const config = await getRazorpayConfig();
    
    const orderOptions = {
      amount: orderData.amount, // Amount in paise (for INR)
      currency: orderData.currency || config.currency || 'INR',
      receipt: orderData.receipt,
      notes: orderData.notes || {},
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(orderOptions);
    
    return {
      success: true,
      order: order,
      keyId: config.keyId
    };
  } catch (err) {
    error('Failed to create Razorpay order:', err);
    return {
      success: false,
      error: err.message || 'Failed to create Razorpay order'
    };
  }
}

/**
 * Fetch Razorpay order details
 * @param {string} orderId - Razorpay order ID
 * @returns {Object} Order details
 */
export async function fetchRazorpayOrder(orderId) {
  try {
    const razorpay = await getRazorpayClient();
    const order = await razorpay.orders.fetch(orderId);
    
    return {
      success: true,
      order: order
    };
  } catch (err) {
    error('Failed to fetch Razorpay order:', err);
    return {
      success: false,
      error: err.message || 'Failed to fetch Razorpay order'
    };
  }
}
