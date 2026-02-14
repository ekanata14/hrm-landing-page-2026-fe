import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });
        if (res.data.success) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          api.defaults.headers.common["Authorization"] =
            `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        // Logout if refresh fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

// Auth Service
export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

// Activity Service
export const getActivities = async () => {
  const response = await api.get("/activities");
  return response.data.data;
};

export const getActivityBySlug = async (slug) => {
  const response = await api.get(`/activities/${slug}`);
  return response.data.data;
};

export const createActivity = async (formData) => {
  const response = await api.post("/activities", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateActivity = async (id, formData) => {
  const response = await api.put(`/activities/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteActivity = async (id) => {
  const response = await api.delete(`/activities/${id}`);
  return response.data;
};

// Gallery Service
export const getGallery = async () => {
  const response = await api.get("/gallery");
  return response.data.data;
};

export const createGallery = async (formData) => {
  const response = await api.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteGallery = async (id) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};

// Announcement Service
export const getAnnouncements = async () => {
  const response = await api.get("/announcements");
  return response.data.data;
};

export const createAnnouncement = async (formData) => {
  const response = await api.post("/announcements", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateAnnouncement = async (id, formData) => {
  const response = await api.put(`/announcements/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteAnnouncement = async (id) => {
  const response = await api.delete(`/announcements/${id}`);
  return response.data;
};

export default api;
