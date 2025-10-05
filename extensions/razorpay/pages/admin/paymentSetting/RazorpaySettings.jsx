import React from 'react';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';

export default function RazorpaySettings({ setting: { razorpayPaymentStatus, razorpayDisplayName, razorpayKeyId, razorpayKeySecret, razorpayMode, razorpayWebhookSecret, razorpayCurrency } }) {
  return (
    <Card title="Razorpay Payment Settings">
      <Card.Session>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Field
              name="razorpayPaymentStatus"
              type="radio"
              label="Status"
              options={[
                { value: 0, text: 'Disabled' },
                { value: 1, text: 'Enabled' }
              ]}
              value={razorpayPaymentStatus?.value}
            />
          </div>
        </div>
      </Card.Session>
      
      <Card.Session>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Field
              name="razorpayDisplayName"
              type="text"
              label="Display Name"
              placeholder="Razorpay"
              value={razorpayDisplayName?.value}
            />
          </div>
        </div>
      </Card.Session>

      <Card.Session>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Field
              name="razorpayMode"
              type="select"
              label="Mode"
              options={[
                { value: 'test', text: 'Test Mode' },
                { value: 'live', text: 'Live Mode' }
              ]}
              value={razorpayMode?.value || 'test'}
            />
          </div>
        </div>
      </Card.Session>

      <Card.Session>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Field
              name="razorpayKeyId"
              type="text"
              label="Key ID"
              placeholder="rzp_test_xxxxxxxxxx"
              value={razorpayKeyId?.value}
              instruction="Your Razorpay Key ID from the dashboard"
            />
          </div>
          <div>
            <Field
              name="razorpayKeySecret"
              type="password"
              label="Key Secret"
              placeholder="Enter your key secret"
              value={razorpayKeySecret?.value}
              instruction="Your Razorpay Key Secret from the dashboard"
            />
          </div>
        </div>
      </Card.Session>

      <Card.Session>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Field
              name="razorpayCurrency"
              type="select"
              label="Currency"
              options={[
                { value: 'INR', text: 'Indian Rupee (INR)' },
                { value: 'USD', text: 'US Dollar (USD)' },
                { value: 'EUR', text: 'Euro (EUR)' },
                { value: 'GBP', text: 'British Pound (GBP)' },
                { value: 'SGD', text: 'Singapore Dollar (SGD)' },
                { value: 'AED', text: 'UAE Dirham (AED)' }
              ]}
              value={razorpayCurrency?.value || 'INR'}
            />
          </div>
          <div>
            <Field
              name="razorpayWebhookSecret"
              type="password"
              label="Webhook Secret"
              placeholder="Enter webhook secret"
              value={razorpayWebhookSecret?.value}
              instruction="Optional: Webhook secret for payment verification"
            />
          </div>
        </div>
      </Card.Session>

      <Card.Session>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">Setup Instructions:</h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Create a Razorpay account at <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="underline">razorpay.com</a></li>
            <li>Get your Key ID and Key Secret from the Razorpay Dashboard</li>
            <li>Configure webhook URL: <code className="bg-blue-100 px-1 rounded">{typeof window !== 'undefined' ? window.location.origin : ''}/api/razorpay/webhook</code></li>
            <li>Enable required payment methods in your Razorpay dashboard</li>
            <li>Test with small amounts before going live</li>
          </ol>
        </div>
      </Card.Session>

      <Card.Session>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-yellow-800 mb-2">Security Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Never share your Key Secret publicly</li>
            <li>Use Test Mode for development and testing</li>
            <li>Configure webhook secret for enhanced security</li>
            <li>Regularly rotate your API keys</li>
            <li>Monitor transactions in Razorpay dashboard</li>
          </ul>
        </div>
      </Card.Session>
    </Card>
  );
}
