import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getAnnouncements } from "../../services/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Bell,
  Star,
  X,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AnnouncementSlider = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const modalRef = useRef(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "id" ? "id" : "en";
  const apiBaseUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      // Safety timeout
      const timeoutId = setTimeout(() => {
        if (isMounted && loading) {
          console.warn("AnnouncementSlider: Fetch timed out");
          setLoading(false);
        }
      }, 3000);

      try {
        const data = await getAnnouncements();
        if (isMounted) {
          setAnnouncements(data);
          setLoading(false);
          clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error(
          "AnnouncementSlider: Failed to fetch announcements:",
          error,
        );
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(() => {
    if (isModalOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [isModalOpen]);

  useGSAP(() => {
    if (loading || announcements.length === 0) return;

    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
    );

    tl.fromTo(
      contentRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
      "-=0.6",
    );
  }, [currentIndex, loading, announcements.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + announcements.length) % announcements.length,
    );
  };

  useEffect(() => {
    if (loading || announcements.length === 0 || isModalOpen) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, loading, announcements.length, isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading)
    return (
      <div className="animate-pulse w-full max-h-[600px] aspect-[4/5] bg-gray-200 dark:bg-gray-800/50 rounded-[2.5rem] border border-white/20 flex items-center justify-center">
        <span className="text-gray-400">Loading announcements...</span>
      </div>
    );

  if (announcements.length === 0)
    return <div className="text-white">No announcements found</div>;

  const currentItem = announcements[currentIndex];
  // Ensure we have correct localized content and image path
  const itemTitle = currentItem.title[currentLang] || currentItem.title.en;
  const itemDesc =
    currentItem.description[currentLang] || currentItem.description.en;
  const itemContent = currentItem.content
    ? currentItem.content[currentLang] || currentItem.content.en
    : "";
  const itemImage = currentItem.image.startsWith("http")
    ? currentItem.image
    : apiBaseUrl + currentItem.image;

  return (
    <>
      <div
        ref={containerRef}
        onClick={openModal}
        className="relative w-full max-h-[600px] aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br from-white/40 to-white/10 dark:from-white/10 dark:to-transparent backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
          <img
            ref={imageRef}
            src={itemImage}
            alt={itemTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none z-10"></div>

        <div
          ref={contentRef}
          className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white"
        >
          <div className="mb-auto self-start">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase backdrop-blur-md border ${
                currentItem.type === "event"
                  ? "bg-brand-blue/80 border-brand-blue text-white"
                  : "bg-brand-gold/80 border-brand-gold text-brand-black"
              }`}
            >
              {currentItem.type === "event" ? (
                <Star className="w-3 h-3" />
              ) : (
                <Bell className="w-3 h-3" />
              )}
              {currentItem.type}
            </span>
          </div>

          <h2 className="text-2xl font-serif font-bold leading-tight mb-3 drop-shadow-md">
            {itemTitle}
          </h2>

          <div className="space-y-2 mb-4 text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span className="font-medium">{currentItem.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span className="truncate">{currentItem.location}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
            className="mb-4 w-full py-3 bg-white/10 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md border border-white/20 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <span>See Details</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <div
            className="flex items-center justify-between mt-2 pt-4 border-t border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-1">
              {announcements.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-6 bg-brand-gold"
                      : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevSlide();
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextSlide();
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Modal via Portal */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              className="relative w-full max-w-5xl md:w-[70vw] lg:w-[60vw] h-[80vh] md:h-[60vh] flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-[110] p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </button>

              <div className="w-full md:w-2/5 h-48 md:h-full relative shrink-0">
                <img
                  src={itemImage}
                  alt={itemTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/60"></div>
              </div>

              <div className="flex-1 w-full h-full flex flex-col overflow-y-auto p-6 md:p-8 lg:p-10 bg-white dark:bg-slate-900">
                <div className="max-w-2xl mx-auto w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                        currentItem.type === "event"
                          ? "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue-light"
                          : "bg-brand-gold/10 text-brand-gold-dark dark:bg-brand-gold/20 dark:text-brand-gold"
                      }`}
                    >
                      {currentItem.type === "event" ? (
                        <Star className="w-3 h-3" />
                      ) : (
                        <Bell className="w-3 h-3" />
                      )}
                      {currentItem.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {/* Using date directly or formatted - existing code used published_at which might be missing on announcement model except auto-timestamp, wait, Announcement model has published_at defaultValue NOW */}
                      {currentItem.date}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {itemTitle}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6 border-y border-gray-100 dark:border-gray-800 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-gold" />
                      <span className="font-medium">{currentItem.date}</span>
                    </div>
                    {/* Time field not in Announcement model generally, check model. Announcement model has date, location, type. No time. */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <span className="truncate max-w-[200px]">
                        {currentItem.location}
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-8">
                    <p className="font-medium text-lg leading-relaxed text-gray-800 dark:text-gray-100 mb-4 font-serif">
                      {itemDesc}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: itemContent }} />
                  </div>

                  <div className="sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md pt-4 pb-2 border-t border-gray-100 dark:border-gray-800 flex justify-end mt-auto">
                    <Link
                      to={`/kegiatan/${currentItem.slug}`}
                      className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-full font-bold transition-all hover:shadow-xl hover:-translate-y-1 text-sm md:text-base group"
                      onClick={closeModal}
                    >
                      <span>
                        {currentItem.type === "event"
                          ? "Register Event"
                          : "Read Full Details"}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default AnnouncementSlider;
