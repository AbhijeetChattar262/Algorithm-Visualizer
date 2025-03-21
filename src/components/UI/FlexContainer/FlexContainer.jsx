import React from "react";
import styles from "./FlexContainer.module.css";

/**
 * Reusable FlexContainer component for flexible layouts
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.direction - Flex direction (row, column)
 * @param {string} props.gap - Space between elements
 * @param {string} props.className - Additional CSS classes
 */
const FlexContainer = ({
  children,
  direction = "row",
  gap = "medium",
  wrap = false,
  className = "",
}) => {
  const containerClass = `${styles.flexContainer} ${styles[direction]} ${
    styles[`gap-${gap}`]
  } ${wrap ? styles.wrap : ""} ${className}`;

  return <div className={containerClass}>{children}</div>;
};

export default FlexContainer;
