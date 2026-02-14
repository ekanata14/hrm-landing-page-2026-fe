import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const RamadhanDecorations = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animate Moon (Floating)
      gsap.to(".crescent-moon", {
        y: -15,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animate Lanterns Entrance (Drop In)
      gsap.from(".lantern-container", {
        y: -300,
        opacity: 0,
        duration: 2,
        ease: "bounce.out",
        stagger: 0.3,
        delay: 0.5,
      });

      // Animate Lanterns (Swinging)
      gsap.utils.toArray(".lantern-container").forEach((lantern, i) => {
        gsap.to(lantern, {
          rotation: Math.random() * 4 + 2, // Random swing amplitude
          transformOrigin: "top center",
          duration: Math.random() * 2 + 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      // Glow effect pulse
      gsap.to(".lantern-light", {
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Crescent Moon & Star */}
      {/* Positioned top-rightish but behind content */}
      <div className="absolute top-10 right-10 md:top-20 md:right-[15%] opacity-80 dark:opacity-100 mix-blend-multiply dark:mix-blend-normal">
        <svg
          className="crescent-moon w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M168.4 135.2C157.6 157.6 136.2 174.4 110.6 179.2C71.6 186.6 33.6 161.2 26.2 122.2C18.8 83.2 44.2 45.2 83.2 37.8C98.2 35 112.4 37 124.6 42.6C121.2 42.2 117.8 42 114.2 42.6C75.2 50 49.8 88 57.2 127C64.6 166 102.6 191.4 141.6 184C154.6 181.6 166 175.4 174.6 167L168.4 135.2Z"
            fill="url(#moon-gradient)"
          />
          {/* Small Star near moon */}
          <path
            d="M140 60L144 72L156 76L144 80L140 92L136 80L124 76L136 72L140 60Z"
            fill="#FDE047"
            className="animate-pulse"
            style={{ filter: "blur(1px)" }}
          />
          <defs>
            <linearGradient
              id="moon-gradient"
              x1="40"
              y1="40"
              x2="160"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FDE047" /> {/* Yellow-300 */}
              <stop offset="1" stopColor="#EAB308" /> {/* Yellow-500 */}
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hanging Lanterns */}
      {/* Lantern 1 - Left */}
      <div className="lantern-container absolute top-[-60px] left-[10%] w-16 md:w-24 origin-top z-20">
        <div className="h-24 md:h-40 w-[2px] bg-gradient-to-b from-brand-gold/80 to-brand-gold mx-auto"></div>
        <LanternSVG className="w-full text-brand-gold drop-shadow-lg" />
      </div>

      {/* Lantern 2 - Right */}
      <div className="lantern-container absolute top-[-80px] right-[20%] w-12 md:w-20 origin-top z-20">
        <div className="h-32 md:h-56 w-[2px] bg-gradient-to-b from-brand-gold/80 to-brand-gold mx-auto"></div>
        <LanternSVG className="w-full text-brand-gold drop-shadow-lg" />
      </div>

      {/* Lantern 3 - Far Right (Mobile Hidden) */}
      <div className="lantern-container hidden md:block absolute top-[-50px] right-[5%] w-14 md:w-22 origin-top z-20">
        <div className="h-20 md:h-36 w-[2px] bg-gradient-to-b from-brand-gold/80 to-brand-gold mx-auto"></div>
        <LanternSVG className="w-full text-brand-gold drop-shadow-lg" />
      </div>
    </div>
  );
};

// Reusable Lantern SVG Component
const LanternSVG = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 180"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top Ring */}
    <circle
      cx="50"
      cy="5"
      r="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />

    {/* Dome */}
    <path
      d="M50 10 L80 40 H20 L50 10 Z"
      fill="currentColor"
      fillOpacity="0.8"
    />

    {/* Body */}
    <rect
      x="25"
      y="40"
      width="50"
      height="80"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />

    {/* Glass/Light Area (Inner) */}
    <rect
      x="30"
      y="45"
      width="40"
      height="70"
      rx="2"
      fill="#FEF3C7"
      fillOpacity="0.3"
      className="lantern-glass"
    />

    {/* Inner Light Glow */}
    <circle
      cx="50"
      cy="80"
      r="15"
      fill="#FDE047"
      fillOpacity="0.6"
      className="lantern-light blur-md"
    />

    {/* Decorative Patterns */}
    <path
      d="M30 45 L50 65 L70 45"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M30 115 L50 95 L70 115"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />

    {/* Bottom Base */}
    <path d="M25 120 L35 130 H65 L75 120 Z" fill="currentColor" />

    {/* Tassel (Stylized) */}
    <line
      x1="50"
      y1="130"
      x2="50"
      y2="150"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="50" cy="153" r="3" fill="currentColor" />
  </svg>
);

export default RamadhanDecorations;
