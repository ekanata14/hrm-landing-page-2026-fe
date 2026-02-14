import React, { useEffect, useState } from "react";
import SectionWrapper from "../common/SectionWrapper";
import Card from "../common/Card";
import Loader from "../common/Loader";
import { getActivities } from "../../services/api";
import { formatDate } from "../../utils/helpers";
import { Calendar, MapPin, Clock } from "lucide-react";
import Button from "../common/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "id" ? "id" : "en";
  const apiBaseUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivities();
        // Sort by date descending (newest first) and take top 9
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setActivities(sortedData.slice(0, 9));
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SectionWrapper id="activities" className="bg-white dark:bg-brand-dark">
      <div className="text-center mb-16">
        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm">
          {t("activities.section_subtitle")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-black dark:text-white mt-2">
          {t("activities.section_title")}
        </h2>
        <div className="w-24 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <Card
                key={activity.id}
                image={apiBaseUrl + activity.image}
                title={activity.title[currentLang] || activity.title.en}
                subtitle="Activity"
                link={`/kegiatan/${activity.slug}`}
              >
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-brand-black dark:text-gray-200">
                    <Calendar className="w-4 h-4 text-brand-blue dark:text-brand-gold" />
                    <span>{formatDate(activity.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-brand-blue/70 dark:text-brand-gold/70" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-brand-blue/70 dark:text-brand-gold/70" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                </div>

                <p className="text-sm line-clamp-3 mb-6 text-gray-600 dark:text-gray-300">
                  {activity.description[currentLang] || activity.description.en}
                </p>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-400">
                  <span>Published: {formatDate(activity.createdAt)}</span>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No activities found.
            </div>
          )}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/kegiatan"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-blue bg-white hover:bg-gray-50 border-brand-blue transition-colors"
        >
          {t("activities.view_all")}
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default Activities;
