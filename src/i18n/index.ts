import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//en translations
import enCommentJson from "./locales/en/comments.json";
import enComplexJson from "./locales/en/complex.json";
import enFaqJson from "./locales/en/faq.json";
import enFooterJson from "./locales/en/footer.json";
import enHeaderJson from "./locales/en/header.json";
import enModalJson from "./locales/en/modal.json";
import enPartnersJson from "./locales/en/partners.json";
import enSolutionJson from "./locales/en/solution.json";
import enSubscriptionJson from "./locales/en/subscription.json";
import enJson from "./locales/en/en.json";
//uz translations
import uzCommentJson from "./locales/uz/comments.json";
import uzComplexJson from "./locales/uz/complex.json";
import uzFaqJson from "./locales/uz/faq.json";
import uzFooterJson from "./locales/uz/footer.json";
import uzHeaderJson from "./locales/uz/header.json";
import uzModalJson from "./locales/uz/modal.json";
import uzPartnersJson from "./locales/uz/partners.json";
import uzSolutionJson from "./locales/uz/solution.json";
import uzSubscriptionJson from "./locales/uz/subscription.json";
import uzJson from "./locales/uz/uz.json";
//uz-cyrl translations
import uzCyrlCommentJson from "./locales/uz_cyrl/comments.json";
import uzCyrlComplexJson from "./locales/uz_cyrl/complex.json";
import uzCyrlFaqJson from "./locales/uz_cyrl/faq.json";
import uzCyrlFooterJson from "./locales/uz_cyrl/footer.json";
import uzCyrlHeaderJson from "./locales/uz_cyrl/header.json";
import uzCyrlModalJson from "./locales/uz_cyrl/modal.json";
import uzCyrlPartnersJson from "./locales/uz_cyrl/partners.json";
import uzCyrlSolutionJson from "./locales/uz_cyrl/solution.json";
import uzCyrlSubscriptionJson from "./locales/uz_cyrl/subscription.json";
import uzCyrlJson from "./locales/uz_cyrl/uzCyrl.json";
//ru translations
import ruCommentJson from "./locales/ru/comments.json";
import ruComplexJson from "./locales/ru/complex.json";
import ruFaqJson from "./locales/ru/faq.json";
import ruFooterJson from "./locales/ru/footer.json";
import ruHeaderJson from "./locales/ru/header.json";
import ruModalJson from "./locales/ru/modal.json";
import ruPartnersJson from "./locales/ru/partners.json";
import ruSolutionJson from "./locales/ru/solution.json";
import ruSubscriptionJson from "./locales/ru/subscription.json";
import ruJson from "./locales/ru/ru.json";

const resources = {
  ru: {
    translation: {
      ...ruCommentJson,
      ...ruComplexJson,
      ...ruFaqJson,
      ...ruFooterJson,
      ...ruHeaderJson,
      ...ruModalJson,
      ...ruPartnersJson,
      ...ruSolutionJson,
      ...ruSubscriptionJson,
      ...ruJson,
    },
  },
  uz: {
    translation: {
      ...uzCommentJson,
      ...uzComplexJson,
      ...uzFaqJson,
      ...uzFooterJson,
      ...uzHeaderJson,
      ...uzModalJson,
      ...uzPartnersJson,
      ...uzSolutionJson,
      ...uzSubscriptionJson,
      ...uzJson,
    },
  },
  "uz-Cyrl-UZ": {
    translation: {
      ...uzCyrlCommentJson,
      ...uzCyrlComplexJson,
      ...uzCyrlFaqJson,
      ...uzCyrlFooterJson,
      ...uzCyrlHeaderJson,
      ...uzCyrlModalJson,
      ...uzCyrlPartnersJson,
      ...uzCyrlSolutionJson,
      ...uzCyrlSubscriptionJson,
      ...uzCyrlJson,
    },
  },
  en: {
    translation: {
      ...enCommentJson,
      ...enComplexJson,
      ...enFaqJson,
      ...enFooterJson,
      ...enHeaderJson,
      ...enModalJson,
      ...enPartnersJson,
      ...enSolutionJson,
      ...enSubscriptionJson,
      ...enJson,
    },
  },
};

export const initializeI18n = (lng: string): void => {
  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });
};
