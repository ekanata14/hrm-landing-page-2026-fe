import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const RubElHizb = ({ className }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Continuous slow rotation
      gsap.to(containerRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "linear",
      });

      // Floating motion
      gsap.to(containerRef.current, {
        y: 20,
        duration: 3,
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
      className={`${className} pointer-events-none opacity-20`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      >
        {/* Wireframe Rub el Hizb (Two squares) */}
        <rect
          x="35"
          y="35"
          width="130"
          height="130"
          transform="rotate(0 100 100)"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <rect
          x="35"
          y="35"
          width="130"
          height="130"
          transform="rotate(45 100 100)"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />

        {/* Inner Circle connection */}
        <circle
          cx="100"
          cy="100"
          r="40"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />

        {/* Central Dot */}
        <circle cx="100" cy="100" r="5" fill="currentColor" />

        {/* Connecting Lines to corners */}
        <path
          d="M100 35 L100 165 M35 100 L165 100"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default RubElHizb;
