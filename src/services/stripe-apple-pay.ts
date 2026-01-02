import StripeBase from '../core/stripe-base'
import { PaymentIntentOptions, PaymentProviderKeys } from '../types'

/**
 * Apple Pay is processed by Stripe as a wallet on top of `card`.
 * This provider exists to allow selecting Apple Pay explicitly in Medusa.
 */
class ApplePayProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.APPLE_PAY

  constructor(_, options) {
    super(_, options)
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ['card'],
      capture_method: 'automatic',
    }
  }
}

export default ApplePayProviderService
