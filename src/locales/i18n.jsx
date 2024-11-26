import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./en.json";
import KR from "./kr.json";

const resources = {
  en: {
    translation: EN,
  },
  ko: {
    translation: KR,
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  fallbackLng: "ko", // 기본감지 언어 en
  // debug: true,
  interpolation: {
    escapeValue: false, // 특수문자를 이스케이프(escape)하지 않도록 하는 옵션
  },
  // react: {
  //     bindI18n: '', // prevent react-i18next rerender
  // },
});
export default i18n;
