import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCheckout } from '@evershop/evershop/src/modules/checkout/pages/frontStore/checkout/CheckoutProvider';

const RazorpayCheckout = ({ cart, onPaymentSuccess, onPaymentError }) => {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { placeOrder } = useCheckout();

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript().then((loaded) => {
      setRazorpayLoaded(loaded);
    });
  }, []);

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded) {
      toast.error('Razorpay is not loaded. Please refresh and try again.');
      return;
    }

    setLoading(true);

    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/razorpay/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId: cart.uuid
        })
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error?.message || 'Failed to create order');
      }

      const { order_id, amount, currency, key_id } = orderData.data;

      // Configure Razorpay options
      const options = {
        key: key_id,
        amount: amount,
        currency: currency,
        name: 'Zyvolt Electronics',
        description: 'Electronics Purchase',
        order_id: order_id,
        handler: async function (response) {
          try {
            // Place order first
            const order = await placeOrder();
            
            if (order.success) {
              // Capture payment
              const captureResponse = await fetch('/api/razorpay/capturePayment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  paymentId: response.razorpay_payment_id,
                  orderId: order.data.uuid,
                  razorpaySignature: response.razorpay_signature
                })
              });

              const captureData = await captureResponse.json();

              if (captureResponse.ok && captureData.data?.success) {
                toast.success('Payment successful!');
                onPaymentSuccess({
                  orderId: order.data.uuid,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature
                });
              } else {
                throw new Error(captureData.error?.message || 'Payment capture failed');
              }
            } else {
              throw new Error('Failed to place order');
            }
          } catch (error) {
            console.error('Payment processing error:', error);
            toast.error(error.message || 'Payment processing failed');
            onPaymentError(error);
          }
        },
        prefill: {
          name: cart.customer_full_name || '',
          email: cart.customer_email || '',
          contact: cart.customer_telephone || ''
        },
        notes: {
          cart_id: cart.uuid,
          customer_email: cart.customer_email || ''
        },
        theme: {
          color: '#ff6b35' // Zyvolt brand color
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast.info('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Razorpay payment error:', error);
      toast.error(error.message || 'Failed to initiate payment');
      onPaymentError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="razorpay-checkout">
      <div className="payment-method-item">
        <div className="payment-method-header">
          <div className="payment-method-logo">
            <img 
              src="/razorpay-logo.svg" 
              alt="Razorpay" 
              className="razorpay-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="payment-method-name">Razorpay</span>
          </div>
          <div className="payment-method-description">
            Pay securely with UPI, Cards, Net Banking & Wallets
          </div>
        </div>
        
        <div className="payment-method-actions">
          <button
            type="button"
            className="btn btn-primary razorpay-pay-button"
            onClick={handleRazorpayPayment}
            disabled={loading || !razorpayLoaded}
          >
            {loading ? (
              <div className="spinner">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Processing...</span>
                </div>
                Processing Payment...
              </div>
            ) : (
              <>
                <i className="fas fa-credit-card"></i>
                Pay ₹{cart.grand_total?.toFixed(2)} with Razorpay
              </>
            )}
          </button>
        </div>

        {!razorpayLoaded && (
          <div className="payment-method-error">
            <small className="text-warning">
              Loading Razorpay... Please wait.
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default RazorpayCheckout;
