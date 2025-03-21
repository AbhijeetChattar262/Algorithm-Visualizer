import React from "react";
import { motion } from "framer-motion";
import styles from "./VisualizationContainer.module.css";

/**
 * Reusable container for all visualization components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.title - Title of the visualization section
 * @param {string} props.className - Additional CSS classes
 */
const VisualizationContainer = ({ children, title = "", className = "" }) => {
  return (
    <motion.div
      className={`${styles.visualizationContainer} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && <h2 className={styles.visualizationTitle}>{title}</h2>}
      {children}
    </motion.div>
  );
};

export default VisualizationContainer;
