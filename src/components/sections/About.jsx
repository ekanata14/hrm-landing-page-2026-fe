import React, { useRef } from "react";
import SectionWrapper from "../common/SectionWrapper";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Users, Heart, Lightbulb } from "lucide-react";

gsap.registerPlugin(useGSAP);

const About = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Static content since translation keys might not exist yet for this specific detailed section
  // In a real app, these would be in the locale files.
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Brotherhood",
      desc: "Membangun persaudaraan Islam yang kokoh dan saling mendukung dalam kebaikan.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Character",
      desc: "Membentuk karakter pemuda yang berakhlak mulia dan berkontribusi positif.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      desc: "Mengintegrasikan nilai-nilai Islam dengan kemajuan teknologi modern.",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".about-image", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".about-content",
          {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .from(
          ".feature-card",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <SectionWrapper
      id="about"
      className="bg-slate-50 dark:bg-[#0c1220] overflow-hidden relative"
    >
      {/* Decor Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 dark:bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Image Side */}
        <div className="about-image relative group">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-[-2deg] transition-transform duration-500 group-hover:rotate-0">
            <img
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
              alt="HRM Community"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-brand-blue/20 dark:bg-brand-black/40 mix-blend-multiply"></div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-[200px] hidden md:block animate-float">
            <p className="text-4xl font-bold text-brand-gold mb-1">100+</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Active Youth Members
            </p>
          </div>
        </div>

        {/* Content Side */}
        <div className="about-content">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 dark:bg-brand-gold/10 text-brand-blue dark:text-brand-gold text-xs font-bold uppercase tracking-wider mb-6">
            <span>Who We Are</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-serif text-brand-black dark:text-white mb-6 leading-tight">
            Himpunan Remaja Muslim{" "}
            <span className="text-brand-blue dark:text-brand-gold italic">
              Al-Ihsaan
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            HRM adalah wadah bagi pemuda-pemudi Islam di Bali untuk berkarya,
            belajar, dan tumbuh bersama. Kami percaya bahwa iman dan kemajuan
            zaman bisa berjalan beriringan.
            <br />
            <br />
            Visi kami adalah mencetak generasi yang tidak hanya cerdas secara
            intelektual, tetapi juga matang secara spiritual dan emosional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="feature-card bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 dark:bg-brand-gold/20 flex items-center justify-center text-brand-blue dark:text-brand-gold mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
