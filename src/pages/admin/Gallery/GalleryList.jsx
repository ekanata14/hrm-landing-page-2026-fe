import React, { useEffect, useState } from "react";
import {
  getGallery,
  deleteGallery,
  createGallery,
} from "../../../services/api";
import { Trash2, Plus, Upload, Loader2, X } from "lucide-react";

const GalleryList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newImageTitleEn, setNewImageTitleEn] = useState("");
  const [newImageTitleId, setNewImageTitleId] = useState("");
  const [newImageCategory, setNewImageCategory] = useState("general");
  const [newImageFile, setNewImageFile] = useState(null);

  const fetchGallery = async () => {
    try {
      const data = await getGallery();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch gallery", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteGallery(id);
        fetchGallery();
      } catch (error) {
        console.error("Failed to delete image", error);
        alert("Failed to delete image");
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newImageFile) return;
    setUploading(true);

    const formData = new FormData();
    formData.append(
      "title",
      JSON.stringify({ en: newImageTitleEn, id: newImageTitleId }),
    );
    formData.append("image", newImageFile);
    formData.append("category", newImageCategory);

    try {
      await createGallery(formData);
      setIsModalOpen(false);
      setNewImageFile(null);
      setNewImageTitleEn("");
      setNewImageTitleId("");
      fetchGallery();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Gallery
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-black font-medium rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Upload Image</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800"
          >
            <img
              src={import.meta.env.VITE_API_URL.replace("/api", "") + img.image}
              alt={img.title.en}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <p className="text-white text-sm font-medium truncate">
                {img.title.en}
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Upload New Image
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newImageCategory}
                  onChange={(e) => setNewImageCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="general">General</option>
                  <option value="event">Event</option>
                  <option value="team">Team</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title (English)
                </label>
                <input
                  value={newImageTitleEn}
                  onChange={(e) => setNewImageTitleEn(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                  placeholder="Auto-translated if empty"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title (Indonesian)
                </label>
                <input
                  value={newImageTitleId}
                  onChange={(e) => setNewImageTitleId(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white"
                  placeholder="Auto-translated if empty"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImageFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3 bg-brand-gold hover:bg-brand-gold-dark text-black font-bold rounded-lg transition-colors flex justify-center items-center gap-2 mt-4"
              >
                {uploading && <Loader2 className="animate-spin" size={20} />}
                Upload Image
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryList;
