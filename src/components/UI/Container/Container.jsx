import React from "react";
import styles from "./Container.module.css";

/**
 * Reusable Container component for visualization sections
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.variant - Container variant (default, dark, transparent)
 * @param {string} props.className - Additional CSS classes
 */
const Container = ({ children, variant = "default", className = "" }) => {
  return (
    <div className={`${styles.container} ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
