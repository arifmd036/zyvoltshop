# Razorpay Payment Gateway for EverShop

A comprehensive Razorpay payment gateway integration for EverShop e-commerce platform, designed specifically for Indian market with support for UPI, Cards, Net Banking, and Wallets.

## Features

- ✅ **Complete Payment Integration**: UPI, Cards, Net Banking, Wallets
- ✅ **Auto Payment Capture**: Automatic payment processing
- ✅ **Webhook Support**: Real-time payment notifications
- ✅ **Refund Management**: Full and partial refunds
- ✅ **Admin Panel**: Easy configuration through EverShop admin
- ✅ **Mobile Responsive**: Optimized for mobile payments
- ✅ **Security**: Webhook signature verification
- ✅ **Multi-Currency**: Support for INR, USD, EUR, and more
- ✅ **Test Mode**: Safe testing environment

## Installation

1. **Install Razorpay SDK**:
```bash
npm install razorpay
```

2. **Copy Extension Files**: The extension files are already created in your `extensions/razorpay/` directory.

3. **Restart EverShop**: Restart your EverShop application to load the extension.

## Configuration

### 1. Razorpay Account Setup

1. Create account at [razorpay.com](https://razorpay.com)
2. Complete KYC verification
3. Get API credentials from Dashboard → Settings → API Keys

### 2. EverShop Admin Configuration

1. Navigate to **Admin Panel → Settings → Payment Settings**
2. Find **Razorpay Payment Settings** section
3. Configure the following:

| Setting | Description | Example |
|---------|-------------|---------|
| Status | Enable/Disable Razorpay | Enabled |
| Display Name | Name shown to customers | Razorpay |
| Mode | Test or Live environment | Test Mode |
| Key ID | Razorpay Key ID | `rzp_test_xxxxxxxxxx` |
| Key Secret | Razorpay Key Secret | `your_key_secret` |
| Currency | Default currency | INR |
| Webhook Secret | Optional security enhancement | `your_webhook_secret` |

### 3. Webhook Configuration

Configure webhook in Razorpay Dashboard:

- **Webhook URL**: `https://yourdomain.com/api/razorpay/webhook`
- **Events to Subscribe**:
  - `payment.captured`
  - `payment.failed`
  - `refund.created`
  - `order.paid`

## API Endpoints

The extension provides the following API endpoints:

- `POST /api/razorpay/createOrder` - Create Razorpay order
- `POST /api/razorpay/capturePayment` - Capture payment
- `POST /api/razorpay/webhook` - Handle webhooks

## Usage

### Frontend Integration

The Razorpay checkout component is automatically integrated into the EverShop checkout flow. Customers will see Razorpay as a payment option during checkout.

### Payment Flow

1. Customer selects Razorpay payment method
2. System creates Razorpay order
3. Razorpay checkout modal opens
4. Customer completes payment
5. Payment is automatically captured
6. Order status is updated
7. Customer receives confirmation

## Testing

### Test Credentials

Use these test credentials in Test Mode:

**Test Cards**:
- Success: `4111 1111 1111 1111`
- Failure: `4000 0000 0000 0002`

**Test UPI ID**: `success@razorpay`

**Test Amounts**:
- ₹100.00 - Success
- ₹200.00 - Failure

### Test Checklist

- [ ] Payment creation
- [ ] Successful payment flow
- [ ] Failed payment handling
- [ ] Webhook processing
- [ ] Refund functionality
- [ ] Mobile responsiveness

## Security

### Best Practices

1. **Never expose Key Secret** in frontend code
2. **Use webhook secret** for signature verification
3. **Validate payment amounts** server-side
4. **Log all transactions** for audit trails
5. **Use HTTPS** in production
6. **Regularly rotate API keys**

### Signature Verification

The extension automatically verifies webhook signatures when webhook secret is configured.

## Troubleshooting

### Common Issues

**Payment not processing**:
- Check API credentials
- Verify webhook URL is accessible
- Check Razorpay dashboard for errors

**Webhook not working**:
- Ensure webhook URL is publicly accessible
- Check webhook secret configuration
- Verify SSL certificate

**Currency issues**:
- Ensure currency is supported by Razorpay
- Check currency configuration in admin panel

### Debug Mode

Enable debug logging by setting environment variable:
```bash
DEBUG=razorpay:*
```

## Support

### Razorpay Support
- Documentation: [razorpay.com/docs](https://razorpay.com/docs)
- Support: [razorpay.com/support](https://razorpay.com/support)

### EverShop Support
- Documentation: [evershop.io/docs](https://evershop.io/docs)
- Community: [GitHub Discussions](https://github.com/evershopcommerce/evershop/discussions)

## License

MIT License - see LICENSE file for details.

## Changelog

### v1.0.0
- Initial release
- Complete Razorpay integration
- Admin panel configuration
- Webhook support
- Refund management
- Mobile optimization
