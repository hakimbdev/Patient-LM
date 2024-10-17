import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="absolute top-4 right-4">
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="zh">中文</option>
        {/* Add more language options as needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;