import React from "react";

const SectionWrapper = ({
  children,
  id,
  className = "",
  containerClass = "",
}) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 relative overflow-hidden ${className}`}
    >
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${containerClass}`}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
