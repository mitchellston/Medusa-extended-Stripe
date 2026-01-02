import { ModuleProvider, Modules } from "@medusajs/framework/utils";
import {
  StripeBancontactService,
  StripeBlikService,
  StripeGiropayService,
  StripeIdealService,
  StripePaypalService,
  StripeApplePayService,
  StripeProviderService,
  StripePrzelewy24Service,
  StripePromptpayService,
  StripeWeroService,
  OxxoProviderService,
} from "./services";

const services = [
  StripeBancontactService,
  StripeBlikService,
  StripeGiropayService,
  StripeIdealService,
  StripePaypalService,
  StripeApplePayService,
  StripeProviderService,
  StripePrzelewy24Service,
  StripePromptpayService,
  StripeWeroService,
  OxxoProviderService,
];

export default ModuleProvider(Modules.PAYMENT, {
  services,
});
