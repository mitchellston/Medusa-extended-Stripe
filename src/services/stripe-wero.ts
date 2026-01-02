import StripeBase from "../core/stripe-base"
import { PaymentIntentOptions, PaymentProviderKeys } from "../types"

class WeroProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.WERO

  constructor(_, options) {
    super(_, options)
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ["wero"],
      capture_method: "automatic",
    }
  }
}

export default WeroProviderService


