import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Card = ({ image, title, subtitle, link, children, className = "" }) => {
  const { t } = useTranslation();

  const cardContent = (
    <div
      className={`group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-slate-700 ${className}`}
    >
      {image && (
        <div className="relative overflow-hidden h-48 sm:h-56">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            {/* Optional overlay content */}
          </div>
        </div>
      )}
      <div className="p-6">
        {subtitle && (
          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2 block">
            {subtitle}
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {children}
        </div>
        {link && (
          <span className="inline-flex items-center gap-1 text-brand-blue dark:text-brand-gold font-semibold text-sm group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
            {t("activities.read_more")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </span>
        )}
      </div>
    </div>
  );

  if (link) {
    return <Link to={link}>{cardContent}</Link>;
  }

  return cardContent;
};

export default Card;
