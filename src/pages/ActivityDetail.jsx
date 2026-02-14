import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getActivityBySlug, getActivities } from "../services/api";
import Loader from "../components/common/Loader";
import { formatDate } from "../utils/helpers";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import NotFound from "./NotFound";
import { useTranslation } from "react-i18next";

import Lightbox from "../components/common/Lightbox";

const ActivityDetail = () => {
  const { slug } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "id" ? "id" : "en";
  const apiBaseUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeGalleryImages, setActiveGalleryImages] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await getActivityBySlug(slug);
        setActivity(data);

        // Fetch other activities for sidebar
        const allActivities = await getActivities();
        setSuggestions(
          allActivities
            .filter((item) => item.slug !== slug)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3),
        );
      } catch (error) {
        console.error("Error fetching activity detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    // Scroll to top when slug changes
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle opening lightbox
  const openLightbox = (images, index) => {
    setActiveGalleryImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % activeGalleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + activeGalleryImages.length) % activeGalleryImages.length,
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!activity) {
    return <NotFound />;
  }

  const title = activity.title[currentLang] || activity.title.en;
  const content = activity.content[currentLang] || activity.content.en;
  const image = apiBaseUrl + activity.image;

  return (
    <div className="bg-slate-50 dark:bg-brand-dark min-h-screen pb-16 pt-20">
      {/* Header Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-white max-w-4xl leading-tight text-center">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Link
            to="/kegiatan"
            className="inline-flex items-center text-brand-blue dark:text-brand-gold hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("activities.view_all")}
          </Link>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-100 dark:border-slate-700 pb-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg text-brand-blue dark:text-brand-gold">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-bold">
                    {t("common.date")}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(activity.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg text-brand-blue dark:text-brand-gold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-bold">
                    {t("common.time")}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {activity.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg text-brand-blue dark:text-brand-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-bold">
                    {t("common.location")}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {activity.location}
                  </p>
                </div>
              </div>

              {/* Published Date Meta */}
              <div className="md:col-span-3 mt-2">
                <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                  Published on {formatDate(activity.createdAt)}
                </p>
              </div>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-slate-700">
              {t("pages.related_activities")}
            </h3>
            <div className="space-y-6">
              {suggestions.map((item) => (
                <Link
                  key={item.id}
                  to={`/kegiatan/${item.slug}`}
                  className="block group"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={apiBaseUrl + item.image}
                        alt={item.title[currentLang] || item.title.en}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-blue transition-colors line-clamp-2 text-sm">
                        {item.title[currentLang] || item.title.en}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={activeGalleryImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};

export default ActivityDetail;
