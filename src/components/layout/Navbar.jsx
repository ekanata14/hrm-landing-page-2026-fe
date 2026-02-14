import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import Button from "../common/Button";
import Logo from "../../assets/images/logo.png";
import LanguageSwitcher from "../common/LanguageSwitcher";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const tl = useRef();

  const navLinks = [
    { name: t("navbar.home"), path: "/" },
    { name: t("navbar.activities"), path: "/kegiatan" },
    { name: t("navbar.gallery"), path: "/galeri" },
    { name: t("navbar.about"), path: "/#team" },
    { name: t("navbar.team"), path: "/#team" },
  ];

  useGSAP(
    () => {
      gsap.set(".mobile-menu-item", { y: 50, opacity: 0 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          duration: 0.5,
          clipPath: "circle(150% at 100% 0%)",
          ease: "power2.inOut",
          display: "flex",
        })
        .to(
          ".mobile-menu-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2",
        );
    },
    { scope: menuRef },
  );

  useGSAP(() => {
    if (isOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-5xl transition-all duration-300">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg dark:shadow-black/50 border border-white/20 dark:border-white/10 flex items-center justify-between gap-4 md:gap-8">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 pe-4 md:pe-8 border-e border-gray-200 dark:border-white/10"
          >
            <img src={Logo} alt="Logo" className="w-12 h-12" />
          </Link>

          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-blue dark:hover:text-brand-gold ${
                  location.pathname === link.path
                    ? "text-brand-blue dark:text-brand-gold"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4 ps-2 md:ps-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 md:w-4 md:h-4 text-brand-gold" />
              ) : (
                <Moon className="w-5 h-5 md:w-4 md:h-4" />
              )}
            </button>

            <div className="hidden md:block">
              <Button
                variant="primary"
                className="py-2 px-6 text-sm !rounded-full !shadow-none hover:!shadow-lg"
              >
                {t("common.join")}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-brand-black dark:text-white z-50 relative"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-white dark:bg-brand-dark pt-32 px-6 flex flex-col gap-6"
        style={{ clipPath: "circle(0% at 100% 0%)", display: "none" }} // Initial state
      >
        {navLinks.map((link) => (
          <div key={link.name} className="mobile-menu-item">
            <Link
              to={link.path}
              onClick={handleLinkClick}
              className="text-2xl font-serif font-bold text-gray-800 dark:text-white hover:text-brand-blue dark:hover:text-brand-gold"
            >
              {link.name}
            </Link>
          </div>
        ))}
        <div className="mt-4 flex flex-col gap-4 mobile-menu-item">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">
              {t("common.language")}
            </span>
            <LanguageSwitcher />
          </div>
          <Button
            variant="primary"
            className="w-full justify-center"
            onClick={handleLinkClick}
          >
            {t("common.join_now")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
