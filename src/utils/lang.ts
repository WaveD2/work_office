import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: {
        email: 'Email',
        password: 'Mật khẩu',
        repeatPassword: 'Xác nhận lại mật khẩu',
        name: 'Họ và tên',
        gender: 'Giới tính',
        country: 'Quốc gia',
        city: 'Thành phố',
      },
    },
    en: {
      translation: {
        email: 'Email',
        password: 'Password',
        name: 'Full Name',
        repeatPassword: 'Repeat Password',
        gender: 'Gender',
        country: 'Country',
        city: 'City',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
