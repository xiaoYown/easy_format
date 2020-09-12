import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cen from './locale/en';
import czh from './locale/zh';

export const lang = () => {};

lang.get = () => {
  return window.localStorage.getItem('EF_LANG') || 'en';
}
lang.set = (val) => {
  return window.localStorage.setItem('EF_LANG', val);
}

let lng = lang.get();

export function onChange(e) {
  lng = e.target.value
  lang.set(lng);
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          translation: { ...cen }
        },
        zh: {
          translation: { ...czh }
        }
      },
      lng: lng,
      fallbackLng: lng,

      interpolation: {
        escapeValue: false
      }
    })
}

onChange({
  target: {
    value: lng
  }
});
