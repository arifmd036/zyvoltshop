import { getRazorpayClient } from './razorpayClient';
import { error } from '@evershop/evershop/src/lib/log/logger';
import { pool } from '@evershop/evershop/src/lib/postgres/connection';

/**
 * Capture Razorpay payment
 * @param {string} paymentId - Razorpay payment ID
 * @param {number} amount - Amount to capture in paise
 * @param {string} currency - Currency code
 * @returns {Object} Capture result
 */
export async function captureRazorpayPayment(paymentId, amount, currency = 'INR') {
  try {
    const razorpay = await getRazorpayClient();
    
    const captureData = {
      amount: amount,
      currency: currency
    };

    const payment = await razorpay.payments.capture(paymentId, captureData.amount, captureData.currency);
    
    return {
      success: true,
      payment: payment
    };
  } catch (err) {
    error('Failed to capture Razorpay payment:', err);
    return {
      success: false,
      error: err.message || 'Failed to capture payment'
    };
  }
}

/**
 * Fetch Razorpay payment details
 * @param {string} paymentId - Razorpay payment ID
 * @returns {Object} Payment details
 */
export async function fetchRazorpayPayment(paymentId) {
  try {
    const razorpay = await getRazorpayClient();
    const payment = await razorpay.payments.fetch(paymentId);
    
    return {
      success: true,
      payment: payment
    };
  } catch (err) {
    error('Failed to fetch Razorpay payment:', err);
    return {
      success: false,
      error: err.message || 'Failed to fetch payment'
    };
  }
}

/**
 * Update payment transaction in database
 * @param {string} orderUuid - Order UUID
 * @param {Object} paymentData - Payment data from Razorpay
 * @returns {Object} Update result
 */
export async function updatePaymentTransaction(orderUuid, paymentData) {
  try {
    const connection = await pool.getConnection();
    
    await connection.query(
      `UPDATE payment_transaction 
       SET transaction_id = ?, 
           transaction_type = ?, 
           amount = ?, 
           payment_data = ?, 
           updated_at = NOW() 
       WHERE order_uuid = ? AND payment_method = 'razorpay'`,
      [
        paymentData.id,
        paymentData.status,
        paymentData.amount / 100, // Convert paise to rupees
        JSON.stringify(paymentData),
        orderUuid
      ]
    );
    
    connection.release();
    
    return {
      success: true
    };
  } catch (err) {
    error('Failed to update payment transaction:', err);
    return {
      success: false,
      error: err.message || 'Failed to update payment transaction'
    };
  }
}
