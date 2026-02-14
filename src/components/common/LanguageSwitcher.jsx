import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const languages = [
    { code: "en", label: "EN" },
    { code: "id", label: "ID" },
    { code: "ar", label: "AR" },
  ];

  // Find current language label
  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative group z-50">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10">
        <Globe className="w-4 h-4 text-brand-gold" />
        <span className="text-sm font-medium text-brand-black dark:text-white uppercase">
          {currentLang.code}
        </span>
      </button>

      {/* Dropdown */}
      <div className="absolute top-full right-0 mt-2 w-24 bg-white dark:bg-brand-dark rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
              i18n.language === lang.code
                ? "text-brand-gold font-bold bg-brand-gold/5"
                : "text-brand-black dark:text-gray-300"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
