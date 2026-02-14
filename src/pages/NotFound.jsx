import React from "react";
import Button from "../components/common/Button";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-brand-gold opacity-20">404</h1>
      <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-white -mt-12 mb-4">
        {t("notfound.title")}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {t("notfound.desc")}
      </p>
      <Button to="/" variant="primary">
        {t("notfound.back")}
      </Button>
    </div>
  );
};

export default NotFound;
