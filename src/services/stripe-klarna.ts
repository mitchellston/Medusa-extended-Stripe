import StripeBase from "../core/stripe-base"
import { PaymentIntentOptions, PaymentProviderKeys } from "../types"

/**
 * Klarna is supported by Stripe as the `klarna` PaymentMethod type on PaymentIntents.
 * This provider exists to allow selecting Klarna explicitly in Medusa.
 *
 * Note: You must enable Klarna in your Stripe Dashboard (Payments settings) and
 * ensure it's available for your account/region/currency.
 */
class KlarnaProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.KLARNA

  constructor(_, options) {
    super(_, options)
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ["klarna"],
      capture_method: "automatic",
    }
  }
}

export default KlarnaProviderService


