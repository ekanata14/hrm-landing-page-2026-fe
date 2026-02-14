import React, { useEffect, useState } from "react";
import SectionWrapper from "../components/common/SectionWrapper";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import { getActivities } from "../services/api";
import { Calendar, MapPin, Clock, Search } from "lucide-react";
import { formatDate } from "../utils/helpers";
import { useTranslation } from "react-i18next";

const AllActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language === "id" ? "id" : "en";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivities();
        // Sort by date descending
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setActivities(sortedData);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Safe Date Parsers
  const getDateParts = (dateString) => {
    if (!dateString) return { year: 0, month: 0, day: 0 };
    const [y, m, d] = dateString.split("-").map(Number);
    return { year: y, month: m - 1, day: d };
  };

  // Extract unique filter options
  const years = [
    ...new Set(activities.map((item) => item.date.split("-")[0])),
  ].sort((a, b) => b - a);

  // Show all months (1-12) and days (1-31)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const monthNames = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Filter Logic
  const filteredActivities = activities.filter((item) => {
    const parts = item.date.split("-");
    const y = parts[0];
    const m = parseInt(parts[1]);
    const d = parseInt(parts[2]);

    const title = item.title[currentLang] || item.title.en || "";
    const location = item.location || "";

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear = selectedYear ? y === selectedYear : true;
    const matchesMonth =
      selectedMonth !== "" ? m === parseInt(selectedMonth) : true;
    const matchesDay = selectedDay ? d === parseInt(selectedDay) : true;

    return matchesSearch && matchesYear && matchesMonth && matchesDay;
  });

  return (
    <SectionWrapper className="pt-32 min-h-screen">
      <div className="text-center mb-12">
        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm">
          {t("activities.section_subtitle")}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-brand-black dark:text-white mt-2">
          {t("pages.activities_title")}
        </h1>
        <div className="w-24 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4 md:space-y-0 md:flex md:gap-4 justify-center px-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-brand-dark/50 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {/* Day Filter */}
          <div className="relative">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-brand-dark/50 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 cursor-pointer min-w-[100px]"
            >
              <option value="">Date</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Month Filter */}
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-brand-dark/50 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 cursor-pointer min-w-[140px]"
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {monthNames[m]}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-brand-dark/50 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 cursor-pointer min-w-[100px]"
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery ||
            selectedYear ||
            selectedMonth !== "" ||
            selectedDay) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedYear("");
                setSelectedMonth("");
                setSelectedDay("");
              }}
              className="px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-sm font-medium whitespace-nowrap"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((item) => (
              <Card
                key={item.id}
                image={
                  import.meta.env.VITE_API_URL.replace("/api", "") + item.image
                }
                title={item.title[currentLang] || item.title.en}
                subtitle="Activity"
                link={`/kegiatan/${item.slug}`}
              >
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-brand-black dark:text-gray-200">
                    <Calendar className="w-4 h-4 text-brand-blue dark:text-brand-gold" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-brand-blue/70 dark:text-brand-gold/70" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-brand-blue/70 dark:text-brand-gold/70" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                <p className="text-sm line-clamp-3 mb-6 text-gray-600 dark:text-gray-300">
                  {item.description[currentLang] || item.description.en}
                </p>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-400">
                  <span>Published: {formatDate(item.createdAt)}</span>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
              <p className="text-xl mb-2">No activities found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
};

export default AllActivities;
