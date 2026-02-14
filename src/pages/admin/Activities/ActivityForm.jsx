import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createActivity,
  updateActivity,
  getActivityBySlug,
  getActivities,
} from "../../../services/api"; // Note: Need getById essentially, slug logic might need tweak or just use slug
import { ArrowLeft, Save, Loader2 } from "lucide-react";

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const [formData, setFormData] = useState({
    title_en: "",
    title_id: "",
    description_en: "",
    description_id: "",
    content_en: "",
    content_id: "",
    date: "",
    time: "",
    location: "",
    slug: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEdit) {
      // Create a fetch by ID helper ideally, or filter from list (less efficient but works for now if listing all)
      const fetchActivity = async () => {
        try {
          // This is hacky if API doesn't support getById directly easily without slug, but let's assume getActivities returns all
          const activities = await getActivities();
          const activity = activities.find((a) => a.id === parseInt(id));
          if (activity) {
            setFormData({
              title_en: activity.title.en,
              title_id: activity.title.id,
              description_en: activity.description.en,
              description_id: activity.description.id,
              content_en: activity.content.en,
              content_id: activity.content.id,
              date: activity.date,
              time: activity.time,
              location: activity.location,
              slug: activity.slug,
              image: null, // We don't set file object from URL
            });
            setImagePreview(
              import.meta.env.VITE_API_URL.replace("/api", "") + activity.image,
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          setInitialLoading(false);
        }
      };
      fetchActivity();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append(
      "title",
      JSON.stringify({ en: formData.title_en, id: formData.title_id }),
    );
    data.append(
      "description",
      JSON.stringify({
        en: formData.description_en,
        id: formData.description_id,
      }),
    );
    data.append(
      "content",
      JSON.stringify({ en: formData.content_en, id: formData.content_id }),
    );
    data.append("date", formData.date);
    data.append("time", formData.time);
    data.append("location", formData.location);
    data.append("slug", formData.slug);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (isEdit) {
        await updateActivity(id, data);
      } else {
        await createActivity(data);
      }
      navigate("/admin/activities");
    } catch (error) {
      console.error("Failed to save activity", error);
      alert("Failed to save activity");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
        >
          <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEdit ? "Edit Activity" : "Create New Activity"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title (English)
              </label>
              <input
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                placeholder="Auto-translated if empty"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title (Indonesian)
              </label>
              <input
                name="title_id"
                value={formData.title_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                placeholder="Auto-translated if empty"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug (URL)
              </label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
            Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (English)
              </label>
              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                placeholder="Auto-translated if empty"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (Indonesian)
              </label>
              <textarea
                name="description_id"
                value={formData.description_id}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                placeholder="Auto-translated if empty"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content (English - HTML)
              </label>
              <textarea
                name="content_en"
                value={formData.content_en}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white font-mono text-sm"
                placeholder="Auto-translated if empty"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content (Indonesian - HTML)
              </label>
              <textarea
                name="content_id"
                value={formData.content_id}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white font-mono text-sm"
                placeholder="Auto-translated if empty"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
            Featured Image
          </h2>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-48 rounded-lg object-cover border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-dark text-black rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {isEdit ? "Update Activity" : "Create Activity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
