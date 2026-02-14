import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GalleryDetail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/galeri", { replace: true });
  }, [navigate]);

  return null;
};

export default GalleryDetail;
