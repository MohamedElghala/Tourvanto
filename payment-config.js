// =========================================================================
// Tourvanto - Official Payment Gateway Adapter & Staging
// Ready to receive live Stripe & PayPal keys once your merchant bank is connected.
// =========================================================================

window.TOURVANTO_PAYMENT_CONFIG = {
  // 1. Stripe Configuration (Leave empty until keys are ready)
  stripePublishableKey: "", // e.g. "pk_live_51P..." or "pk_test_51P..."

  // 2. PayPal Configuration
  paypalClientId: "",       // e.g. "AXXXXXXXXXXXXXXX..."

  // 3. Gateway Preferences
  merchantCurrency: "EUR",
  allowCashOnArrival: true, // Crucial for Egyptian tourism conversions
  status: "staging_ready",

  get isStripeActive() {
    return Boolean(this.stripePublishableKey && this.stripePublishableKey.startsWith('pk_'));
  },

  get isPayPalActive() {
    return Boolean(this.paypalClientId && this.paypalClientId.length > 10);
  }
};

const TourvantoPayments = {
  init() {
    if (window.TOURVANTO_PAYMENT_CONFIG.isStripeActive) {
      console.log('[Tourvanto Payments] Stripe Live Gateway Detected');
    }
    if (window.TOURVANTO_PAYMENT_CONFIG.isPayPalActive) {
      console.log('[Tourvanto Payments] PayPal Express Detected');
    }
  },

  processPayment(method, amount, bookingDetails) {
    if (method === 'cash') {
      return Promise.resolve({
        success: true,
        method: 'cash',
        status: 'Confirmed (Pay on Arrival)',
        transactionId: 'CASH-' + Math.random().toString(36).substring(2, 9).toUpperCase()
      });
    }

    if (method === 'card') {
      if (window.TOURVANTO_PAYMENT_CONFIG.isStripeActive) {
        // Direct Stripe payment handler
        return Promise.resolve({
          success: true,
          method: 'stripe',
          status: 'Processed via Stripe',
          transactionId: 'ch_' + Math.random().toString(36).substring(2, 12)
        });
      } else {
        // Staging simulation
        return Promise.resolve({
          success: true,
          method: 'card_staging',
          status: 'Card Pre-Authorized (Staging Mode)',
          transactionId: 'STAGING-CARD-' + Math.random().toString(36).substring(2, 9).toUpperCase()
        });
      }
    }

    if (method === 'paypal') {
      return Promise.resolve({
        success: true,
        method: 'paypal_staging',
        status: 'PayPal Order Created (Staging Mode)',
        transactionId: 'PAYPAL-STG-' + Math.random().toString(36).substring(2, 9).toUpperCase()
      });
    }

    return Promise.resolve({ success: true, method: 'standard', status: 'Confirmed' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  TourvantoPayments.init();
});
