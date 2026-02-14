import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play, MapPin } from "lucide-react";
import Button from "../common/Button";
import Logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import StarBackground from "../common/StarBackground";
import RamadhanDecorations from "../common/RamadhanDecorations";
import RubElHizb from "../common/RubElHizb";
import AnnouncementSlider from "../common/AnnouncementSlider";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const { t } = useTranslation();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Left Content Animations
      tl.from(".hero-label", { y: 20, opacity: 0, duration: 0.8, delay: 0.2 })
        .from(".hero-title-1", { y: 50, opacity: 0, duration: 1 }, "-=0.6")
        .from(".hero-title-2", { y: 50, opacity: 0, duration: 1 }, "-=0.8")
        .from(".hero-badge", { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.8")
        .from(".hero-desc", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      // Right Content Animations (Glass Card)
      tl.from(
        rightContentRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
        },
        "-=1",
      );

      // Animate Milky Way
      gsap.to(".milky-way-1", {
        rotation: 360,
        duration: 200,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(".milky-way-2", {
        rotation: -360,
        duration: 300,
        repeat: -1,
        ease: "linear",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden bg-slate-50 dark:bg-[#080c14] transition-colors duration-500"
    >
      {/* Stars Canvas */}
      <StarBackground />

      {/* Ramadhan Theme Decorations (Moon, Lanterns) */}
      <RamadhanDecorations />

      {/* Decorative Center Element - Wireframe Star */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-0 pointer-events-none">
        <RubElHizb className="text-brand-blue/10 dark:text-white/5 w-full h-full" />
      </div>

      {/* Milky Way / Nebula Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large diagonal wash */}
        <div className="milky-way-1 absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-gradient-to-br from-blue-200/20 via-transparent to-purple-200/20 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-transparent rounded-[100%] blur-[80px] opacity-60 mix-blend-screen dark:mix-blend-screen origin-center"></div>

        {/* Concentrated spots */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-300/30 dark:bg-indigo-900/20 rounded-full blur-[120px] mix-blend-overlay dark:mix-blend-screen animate-pulse-slow"></div>
        <div className="bg-amber-100/40 dark:bg-amber-900/10 rounded-full blur-[100px] absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px]"></div>

        {/* Dynamic Nebula Element */}
        <div className="milky-way-2 absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-t from-cyan-100/20 to-transparent dark:from-cyan-900/10 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div ref={leftContentRef} className="max-w-2xl relative">
          <div className="hero-label flex items-center gap-3 mb-6">
            <div className="h-[2px] w-8 bg-brand-blue dark:bg-brand-gold"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-brand-blue dark:text-brand-gold uppercase">
              {t("hero.est")}
            </span>
          </div>

          <div className="relative">
            <h1 className="hero-title-1 text-6xl md:text-7xl lg:text-8xl font-serif text-brand-black dark:text-white leading-tight">
              {t("hero.title")}
            </h1>
            <div className="flex flex-wrap items-center gap-4 lg:gap-8">
              <h1 className="hero-title-2 text-6xl md:text-7xl lg:text-8xl font-serif italic text-brand-black dark:text-white leading-tight">
                {t("hero.title2")}
              </h1>

              {/* Basecamp Badge */}
              <div className="hero-badge inline-flex items-center gap-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 shadow-sm backdrop-blur-sm -mt-2 lg:mt-4">
                <div className="bg-brand-blue rounded-full p-1.5 text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-start leading-tight">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                    {t("hero.basecamp")}
                  </p>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {t("hero.location_name")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="hero-desc text-lg text-gray-600 dark:text-gray-300 mt-8 mb-10 leading-relaxed max-w-lg">
            {t("hero.description")}{" "}
            <span className="font-bold text-brand-blue dark:text-brand-gold">
              {t("hero.ukhuwah")}
            </span>
            .
          </p>

          <div className="hero-buttons flex flex-wrap items-center gap-6">
            <button
              onClick={() =>
                document
                  .getElementById("activities")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-brand-black dark:bg-white text-white dark:text-brand-black px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform shadow-xl"
            >
              {t("hero.cta_program")}
            </button>
            <button className="group flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium hover:text-brand-black dark:hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors">
                <Play className="w-4 h-4 fill-current ms-0.5 rtl:rotate-180" />
              </div>
              <span>{t("hero.cta")}</span>
            </button>
          </div>

          <div className="hero-desc h-[1px] w-full bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 mt-12"></div>
        </div>
        {/* Right Content - Announcement Slider */}
        <div
          ref={rightContentRef}
          className="flex justify-center lg:justify-end relative"
        >
          <AnnouncementSlider />
        </div>
      </div>
    </section>
  );
};

export default Hero;
