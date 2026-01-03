## Stripe Extended Payment Provider (Medusa)

This module is an **extended version of Medusa’s Stripe payment provider**. It registers additional Stripe payment providers so you can enable more payment options in Medusa regions (each as its own provider ID).

This README is based on Medusa’s official Stripe provider quickstart: [Stripe Module Provider](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe).

### Package name

This workspace’s package name is **`medusa-payment-stripe-extended`** (see `package.json`). **Use this package name (not the official `@medusajs/payment-stripe`)** in your install command and in `medusa-config.ts`.

### Included payment providers

This module registers the following provider identifiers (used to form Medusa provider IDs):

- **Basic Stripe**: `stripe`
- **Apple Pay (as Stripe wallet on `card`)**: `stripe-apple-pay`
- **Bancontact**: `stripe-bancontact`
- **BLIK**: `stripe-blik`
- **giropay**: `stripe-giropay`
- **iDEAL**: `stripe-ideal`
- **Klarna**: `stripe-klarna`
- **OXXO**: `stripe-oxxo`
- **PayPal**: `stripe-paypal`
- **PromptPay**: `stripe-promptpay`
- **Przelewy24**: `stripe-przelewy24`
- **Wero**: `stripe-wero` (**Stripe private preview** — requires enablement)

### Note on Wero (Stripe private preview)

Stripe’s `wero` payment method is currently in **private preview**, so attempting to create a PaymentIntent with `payment_method_types: ["wero"]` will fail unless Stripe has enabled Wero for your account.

- **Docs**: `https://docs.stripe.com/payments/wero`
- **Enable payment methods**: `https://dashboard.stripe.com/account/payments/settings`

## Quickstart

### Prerequisites

- **Stripe account**
- **Stripe Secret API Key**
- **Stripe webhook secret** (recommended/required for deployed apps using webhooks)

### Install

Install this provider in your Medusa app:

```bash
npm install medusa-payment-stripe-extended
```

### Register the provider in `medusa-config.ts`

Add this provider to the Payment Module’s `providers` list (adapted from Medusa’s Stripe quickstart, using this module’s package name): [Stripe Module Provider](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe).

```ts
module.exports = defineConfig({
  // ...
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "medusa-payment-stripe-extended",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,

              // Optional:
              // capture: false,
              // automaticPaymentMethods: false,
              // paymentDescription: "Order payment",
              // oxxoExpiresDays: 3,
            },
          },
        ],
      },
    },
  ],
});
```

### Environment variables

Add the required environment variables:

```bash
STRIPE_API_KEY=<YOUR_STRIPE_SECRET_KEY>
STRIPE_WEBHOOK_SECRET=<YOUR_STRIPE_WEBHOOK_SECRET>
```

## Module options

| Option                    | Description                                                                                                                                      | Required                                   | Default |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ------- |
| `apiKey`                  | Stripe Secret API key.                                                                                                                           | Yes                                        | -       |
| `webhookSecret`           | Stripe webhook signing secret (used to verify incoming webhooks).                                                                                | Recommended (required if you use webhooks) | -       |
| `capture`                 | Whether to automatically capture after authorization.                                                                                            | No                                         | `false` |
| `automaticPaymentMethods` | Enables Stripe `automatic_payment_methods` (`{ enabled: true }`). Useful for wallets like Apple Pay / Google Pay depending on your Stripe setup. | No                                         | `false` |
| `paymentDescription`      | Default description when one isn’t provided in `cart.context.payment_description`.                                                               | No                                         | -       |
| `oxxoExpiresDays`         | OXXO expiry in days (only applies to OXXO).                                                                                                      | No                                         | `3`     |

## Enable providers in a Region

After registering the module, enable the desired Stripe provider(s) in the region you want to offer them in. Refer to Medusa’s guide: [Edit Region Details](https://docs.medusajs.com/user-guide/settings/regions#edit-region-details).

## Provider IDs

Medusa registers providers using the format:

- **`pp_{identifier}_{id}`**

Where:

- **`identifier`** is one of the identifiers listed above (for example `stripe-wero`).
- **`id`** is the module provider `id` you set in `medusa-config.ts` (for example `stripe`).

If you use `id: "stripe"` in `medusa-config.ts`, these are the provider IDs you can enable in regions:

| Provider     | Provider ID                   |
| ------------ | ----------------------------- |
| Basic Stripe | `pp_stripe_stripe`            |
| Apple Pay    | `pp_stripe-apple-pay_stripe`  |
| Bancontact   | `pp_stripe-bancontact_stripe` |
| BLIK         | `pp_stripe-blik_stripe`       |
| giropay      | `pp_stripe-giropay_stripe`    |
| iDEAL        | `pp_stripe-ideal_stripe`      |
| Klarna       | `pp_stripe-klarna_stripe`     |
| Przelewy24   | `pp_stripe-przelewy24_stripe` |
| PromptPay    | `pp_stripe-promptpay_stripe`  |
| OXXO         | `pp_stripe-oxxo_stripe`       |
| PayPal       | `pp_stripe-paypal_stripe`     |
| Wero         | `pp_stripe-wero_stripe`       |

## Webhooks (production)

For production deployments, set up Stripe webhooks so Medusa can reconcile payment state changes. Refer to Stripe’s docs linked from Medusa’s guide: [Stripe webhooks](https://docs.stripe.com/webhooks#add-a-webhook-endpoint) (also referenced in the Medusa quickstart: [Stripe Module Provider](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe)).

### Webhook URL

Medusa exposes this route:

- **`{server_url}/hooks/payment/{provider_id}`**

Where `{provider_id}` is the provider ID **without** the `pp_` prefix.

If your module provider `id` is `stripe`, the webhook URLs are:

| Stripe Payment Type | Webhook Endpoint URL                                  |
| ------------------- | ----------------------------------------------------- |
| Basic Stripe        | `{server_url}/hooks/payment/stripe_stripe`            |
| Apple Pay           | `{server_url}/hooks/payment/stripe-apple-pay_stripe`  |
| Bancontact          | `{server_url}/hooks/payment/stripe-bancontact_stripe` |
| BLIK                | `{server_url}/hooks/payment/stripe-blik_stripe`       |
| giropay             | `{server_url}/hooks/payment/stripe-giropay_stripe`    |
| iDEAL               | `{server_url}/hooks/payment/stripe-ideal_stripe`      |
| Klarna              | `{server_url}/hooks/payment/stripe-klarna_stripe`     |
| Przelewy24          | `{server_url}/hooks/payment/stripe-przelewy24_stripe` |
| PromptPay           | `{server_url}/hooks/payment/stripe-promptpay_stripe`  |
| OXXO                | `{server_url}/hooks/payment/stripe-oxxo_stripe`       |
| PayPal              | `{server_url}/hooks/payment/stripe-paypal_stripe`     |
| Wero                | `{server_url}/hooks/payment/stripe-wero_stripe`       |

### Webhook events

Configure your Stripe webhook endpoint to listen to (as listed in the Medusa Stripe quickstart):

- `payment_intent.amount_capturable_updated`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.partially_funded`

## Notes

### Apple Pay

Stripe processes Apple Pay as a wallet on top of `card`. This module includes `stripe-apple-pay` so you can **enable Apple Pay explicitly** as its own provider in Medusa regions (see `src/services/stripe-apple-pay.ts`).

### Klarna (`preferred_locale`)

If you want to pass Klarna’s `preferred_locale` to Stripe, include it in the payment session `data` under `payment_method_options.klarna.preferred_locale` (it will be forwarded to the Stripe PaymentIntent request):

```json
{
  "provider_id": "pp_stripe-klarna_stripe",
  "data": {
    "payment_method_options": {
      "klarna": {
        "preferred_locale": "en-US"
      }
    }
  }
}
```
