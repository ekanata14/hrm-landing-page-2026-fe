import React from "react";
import { Instagram, Facebook, Youtube, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-serif text-brand-gold">
              HRM Al-Ihsaan
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {t("footer.brand_description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-4">
              {t("footer.quick_links")}
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-brand-gold transition-colors">
                  {t("navbar.home")}
                </a>
              </li>
              <li>
                <a
                  href="/#activities"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("navbar.activities")}
                </a>
              </li>
              <li>
                <a
                  href="/#gallery"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("navbar.gallery")}
                </a>
              </li>
              <li>
                <a
                  href="/#team"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("navbar.about")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-4">
              {t("footer.contact")}
            </h4>
            <div className="flex items-start gap-3 text-gray-400">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
              <span>{t("footer.address")}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail className="w-5 h-5" />
              <span>info@hrm-alihsaan.org</span>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-brand-blue transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-gray-500 text-sm">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
