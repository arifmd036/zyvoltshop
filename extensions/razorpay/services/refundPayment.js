import { getRazorpayClient } from './razorpayClient';
import { error } from '@evershop/evershop/src/lib/log/logger';
import { pool } from '@evershop/evershop/src/lib/postgres/connection';

/**
 * Create refund for Razorpay payment
 * @param {string} paymentId - Razorpay payment ID
 * @param {number} amount - Amount to refund in paise (optional, full refund if not provided)
 * @param {Object} notes - Additional notes for refund
 * @returns {Object} Refund result
 */
export async function createRazorpayRefund(paymentId, amount = null, notes = {}) {
  try {
    const razorpay = await getRazorpayClient();
    
    const refundData = {
      payment_id: paymentId,
      notes: notes
    };

    // If amount is specified, add it to refund data (partial refund)
    if (amount) {
      refundData.amount = amount;
    }

    const refund = await razorpay.payments.refund(paymentId, refundData);
    
    return {
      success: true,
      refund: refund
    };
  } catch (err) {
    error('Failed to create Razorpay refund:', err);
    return {
      success: false,
      error: err.message || 'Failed to create refund'
    };
  }
}

/**
 * Fetch Razorpay refund details
 * @param {string} refundId - Razorpay refund ID
 * @returns {Object} Refund details
 */
export async function fetchRazorpayRefund(refundId) {
  try {
    const razorpay = await getRazorpayClient();
    const refund = await razorpay.refunds.fetch(refundId);
    
    return {
      success: true,
      refund: refund
    };
  } catch (err) {
    error('Failed to fetch Razorpay refund:', err);
    return {
      success: false,
      error: err.message || 'Failed to fetch refund'
    };
  }
}

/**
 * Refund payment for canceled order
 * @param {string} orderUuid - Order UUID
 * @returns {Object} Refund result
 */
export async function refundPayment(orderUuid) {
  try {
    const connection = await pool.getConnection();
    
    // Get payment transaction details
    const [transactions] = await connection.query(
      `SELECT * FROM payment_transaction 
       WHERE order_uuid = ? AND payment_method = 'razorpay' 
       ORDER BY created_at DESC LIMIT 1`,
      [orderUuid]
    );
    
    if (!transactions || transactions.length === 0) {
      connection.release();
      return {
        success: false,
        error: 'No Razorpay payment transaction found for this order'
      };
    }

    const transaction = transactions[0];
    const paymentData = JSON.parse(transaction.payment_data || '{}');
    
    if (!paymentData.id) {
      connection.release();
      return {
        success: false,
        error: 'Invalid payment transaction data'
      };
    }

    // Create refund
    const refundResult = await createRazorpayRefund(
      paymentData.id,
      null, // Full refund
      { reason: 'Order canceled', order_uuid: orderUuid }
    );

    if (refundResult.success) {
      // Update payment transaction with refund information
      await connection.query(
        `UPDATE payment_transaction 
         SET transaction_type = 'refunded',
             payment_data = ?,
             updated_at = NOW()
         WHERE payment_transaction_uuid = ?`,
        [
          JSON.stringify({
            ...paymentData,
            refund: refundResult.refund
          }),
          transaction.payment_transaction_uuid
        ]
      );
    }
    
    connection.release();
    return refundResult;
  } catch (err) {
    error('Failed to process refund:', err);
    return {
      success: false,
      error: err.message || 'Failed to process refund'
    };
  }
}
