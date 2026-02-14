import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "../../assets/images/logo.png";

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out container then call onComplete
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onComplete,
          });
        },
      });

      // Logo entrance
      tl.from(logoRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .to(
          logoRef.current,
          { rotation: 360, duration: 2, ease: "power2.inOut" },
          "-=0.2",
        )
        .from(textRef.current, { opacity: 0, y: 10, duration: 0.5 }, "-=0.5")
        // Wait for a bit
        .to({}, { duration: 0.5 });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-white dark:bg-[#0F172A] flex flex-col items-center justify-center"
    >
      <div className="relative">
        {/* Spinner Ring */}
        <div className="w-24 h-24 border-2 border-brand-blue/20 dark:border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 border-t-2 border-brand-blue dark:border-brand-gold rounded-full animate-spin"></div>

        {/* Logo Center */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img src={Logo} alt="Logo" className="w-full h-full" />
        </div>
      </div>

      <div ref={textRef} className="mt-8">
        <p className="text-xs font-bold tracking-[0.3em] text-brand-blue dark:text-brand-gold uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
