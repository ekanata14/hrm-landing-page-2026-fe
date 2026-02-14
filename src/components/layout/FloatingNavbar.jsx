import React from "react";
import { Link } from "react-router-dom";
import { Home, Calendar, Image, Users } from "lucide-react";

const FloatingNavbar = () => {
  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: "Home", path: "/" },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Kegiatan",
      path: "/#activities",
    },
    { icon: <Image className="w-6 h-6" />, label: "Galeri", path: "/#gallery" },
    { icon: <Users className="w-6 h-6" />, label: "Team", path: "/#team" },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 dark:bg-brand-black/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-gray-200 dark:border-gray-700 flex gap-8 items-center justify-between min-w-[320px]">
      {navItems.map((item, index) => (
        <a
          key={index}
          href={item.path}
          className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-gold transition-colors focus:text-brand-blue"
        >
          {item.icon}
          <span className="text-[10px] mt-1 font-medium">{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export default FloatingNavbar;
