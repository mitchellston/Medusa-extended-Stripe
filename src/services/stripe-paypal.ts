import StripeBase from "../core/stripe-base";
import { PaymentIntentOptions, PaymentProviderKeys } from "../types";

/**
 * PayPal is supported by Stripe as the `paypal` PaymentMethod type on PaymentIntents.
 * This provider exists to allow selecting PayPal explicitly in Medusa.
 *
 * Note: You must enable PayPal in your Stripe Dashboard (Payments settings) and
 * ensure it's available for your account/region.
 */
class PaypalProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.PAYPAL;

  constructor(_, options) {
    super(_, options);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ["paypal"],
      capture_method: "automatic",
    };
  }
}

export default PaypalProviderService;
