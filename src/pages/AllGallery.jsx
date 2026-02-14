import React, { useEffect, useState } from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import Loader from "../components/common/Loader";
import { getGallery } from "../services/api";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

const AllGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "id" ? "id" : "en";
  const apiBaseUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGallery();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ["all", ...new Set(images.map((img) => img.category))];

  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <SectionWrapper className="pt-32 min-h-screen">
      <div className="text-center mb-12">
        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm">
          {t("gallery.section_subtitle")}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-brand-black dark:text-white mt-2">
          {t("pages.gallery_title")}
        </h1>
        <div className="w-24 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
              filter === cat
                ? "bg-brand-gold text-brand-black shadow-lg scale-105"
                : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={apiBaseUrl + img.image}
                alt={img.title[currentLang] || img.title.en}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-medium text-sm">
                  {img.title[currentLang] || img.title.en}
                </p>
              </div>
            </div>
          ))}
          {filteredImages.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
              No images found in this category.
            </div>
          )}
        </div>
      )}

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

export default AllGallery;
