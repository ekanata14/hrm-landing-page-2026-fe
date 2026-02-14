import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// FloatingBottomNavbar removed as per new design direction (floating top pill covers navigation)

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-0">
        {" "}
        {/* PT-0 because navbar is floating and we want hero to be top-flush or handle its own padding */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
