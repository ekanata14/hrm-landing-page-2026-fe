import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PageTransition = ({ children }) => {
  const containerRef = useRef(null);
  const location = useLocation();

  useGSAP(
    () => {
      // Simple fade in and slide up effect on location change
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    },
    { scope: containerRef, dependencies: [location.pathname] },
  );

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  );
};

export default PageTransition;
