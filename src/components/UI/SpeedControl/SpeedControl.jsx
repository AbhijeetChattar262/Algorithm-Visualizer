import React from "react";
import styles from "./SpeedControl.module.css";

/**
 * Reusable SpeedControl component for algorithm animation speed control
 * @param {Object} props - Component props
 * @param {number} props.value - Current speed value
 * @param {function} props.onChange - Function to handle speed change
 * @param {number} props.min - Minimum speed value
 * @param {number} props.max - Maximum speed value
 * @param {boolean} props.disabled - Whether the control is disabled
 * @param {boolean} props.showLabels - Whether to show "Slow" and "Fast" labels
 * @param {boolean} props.isReversed - Whether higher values mean slower speed (reversed slider)
 * @param {string} props.className - Additional CSS classes
 */
const SpeedControl = ({
  value,
  onChange,
  min = 0,
  max = 100,
  disabled = false,
  showLabels = true,
  isReversed = false,
  className = "",
}) => {
  // Handle the slider change, applying reverse logic if needed
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (isReversed) {
      onChange(max + min - newValue);
    } else {
      onChange(newValue);
    }
  };

  // Calculate the display value based on whether the slider is reversed
  const displayValue = isReversed ? max + min - value : value;

  return (
    <div className={`${styles.speedControl} ${className}`}>
      <span className={styles.label}>Speed:</span>
      {showLabels && <span className={styles.rangeLabel}>Slow</span>}
      <input
        type="range"
        min={min}
        max={max}
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        className={styles.speedSlider}
        aria-label="Animation speed"
      />
      {showLabels && <span className={styles.rangeLabel}>Fast</span>}
    </div>
  );
};

export default SpeedControl;
