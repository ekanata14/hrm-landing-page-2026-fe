import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ActivityDetail from "./pages/ActivityDetail";
import AllActivities from "./pages/AllActivities";
import AllGallery from "./pages/AllGallery";
import GalleryDetail from "./pages/GalleryDetail";
import NotFound from "./pages/NotFound";
import Preloader from "./components/common/Preloader";
import PageTransition from "./components/common/PageTransition";

// Admin Imports
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ActivityList from "./pages/admin/Activities/ActivityList";
import ActivityForm from "./pages/admin/Activities/ActivityForm";
import GalleryList from "./pages/admin/Gallery/GalleryList";
import AnnouncementList from "./pages/admin/Announcements/AnnouncementList";
import AnnouncementForm from "./pages/admin/Announcements/AnnouncementForm";

const PublicWrapper = () => {
  return (
    <Layout>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </Layout>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div
        className={`transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              {/* Add redirect if needed, but Dashboard at /admin is fine if index */}
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="activities" element={<ActivityList />} />
              <Route path="activities/new" element={<ActivityForm />} />
              <Route path="activities/edit/:id" element={<ActivityForm />} />

              <Route path="gallery" element={<GalleryList />} />

              <Route path="announcements" element={<AnnouncementList />} />
              <Route path="announcements/new" element={<AnnouncementForm />} />
              <Route
                path="announcements/edit/:id"
                element={<AnnouncementForm />}
              />
            </Route>

            {/* Public Routes */}
            <Route element={<PublicWrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/kegiatan" element={<AllActivities />} />
              <Route path="/kegiatan/:slug" element={<ActivityDetail />} />
              <Route path="/galeri" element={<AllGallery />} />
              <Route path="/galeri/:slug" element={<GalleryDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
