import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const overlayRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      // Animate overlay in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      // Animate image in (scale up)
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      );
    },
    { scope: overlayRef },
  );

  // Disable scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  // Handle both string URLs and object structure { src, alt }
  const imgSrc =
    typeof currentImage === "string" ? currentImage : currentImage.src;
  const imgAlt = typeof currentImage === "string" ? "" : currentImage.alt;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-xl flex items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors p-2 z-[70] bg-black/20 rounded-full"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-3 z-[70] bg-black/20 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 rtl:rotate-180" />
      </button>

      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking image area
      >
        <img
          ref={imageRef}
          src={imgSrc}
          alt={imgAlt}
          className="max-w-[100vw] max-h-[100vh] md:max-w-[95vw] md:max-h-[95vh] object-contain shadow-2xl pointer-events-auto"
        />
        {imgAlt && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-[70] px-4">
            <p className="text-white text-center px-6 py-3 bg-black/50 backdrop-blur-md rounded-2xl text-sm md:text-base font-medium max-w-[90%] md:max-w-2xl shadow-lg border border-white/10">
              {imgAlt}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-3 z-[70] bg-black/20 rounded-full backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10 rtl:rotate-180" />
      </button>
    </div>,
    document.body,
  );
};

export default Lightbox;
