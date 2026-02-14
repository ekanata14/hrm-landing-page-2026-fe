import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionWrapper from "../common/SectionWrapper";
import Loader from "../common/Loader";
import { getGallery } from "../../services/api";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "id" ? "id" : "en";
  const apiBaseUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGallery();
        // Sort by createdAt desc (newest first)
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setImages(sortedData.slice(0, 6)); // Show top 6
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SectionWrapper
      id="gallery"
      className="bg-slate-50 dark:bg-slate-900"
      containerClass="text-center"
    >
      <div className="mb-16">
        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm">
          {t("gallery.section_subtitle")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-black dark:text-white mt-2">
          {t("gallery.section_title")}
        </h2>
        <div className="w-24 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer block aspect-[4/3]"
            >
              <img
                src={apiBaseUrl + img.image}
                alt={img.title[currentLang] || img.title.en}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-brand-gold font-bold text-xs uppercase tracking-wider block mb-1">
                    {img.category}
                  </span>
                  <p className="font-medium text-lg">
                    {img.title[currentLang] || img.title.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No images found.
            </div>
          )}
        </div>
      )}

      <div className="mt-12">
        <Link
          to="/galeri"
          className="inline-block px-8 py-3 rounded-full border border-brand-blue text-brand-blue dark:border-white dark:text-white hover:bg-brand-blue hover:text-white dark:hover:bg-white dark:hover:text-brand-black transition-colors font-medium"
        >
          {t("gallery.view_all")}
        </Link>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2 bg-white/10 rounded-full backdrop-blur-sm"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={apiBaseUrl + selectedImage.image}
              alt={selectedImage.title[currentLang] || selectedImage.title.en}
              className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
            />
            <p className="mt-4 text-white text-lg font-medium text-center">
              {selectedImage.title[currentLang] || selectedImage.title.en}
            </p>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Gallery;
