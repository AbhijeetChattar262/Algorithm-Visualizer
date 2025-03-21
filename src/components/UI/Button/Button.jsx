import React from "react";
import styles from "./Button.module.css";

/**
 * Reusable Button component with standardized styling
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, success, warning, danger)
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
  children,
  ...rest
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
