import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({
  children,
  to,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-brand-blue to-blue-700 text-white shadow-lg hover:shadow-brand-blue/30",
    secondary: "bg-brand-gold text-brand-black hover:bg-yellow-500 shadow-md",
    outline:
      "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-brand-black",
    ghost:
      "text-brand-blue dark:text-white hover:bg-gray-100 dark:hover:bg-white/10",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost"]),
  className: PropTypes.string,
};

export default Button;
