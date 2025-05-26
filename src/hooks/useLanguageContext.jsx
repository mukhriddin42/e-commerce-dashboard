import React, { createContext, useEffect, useState } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
