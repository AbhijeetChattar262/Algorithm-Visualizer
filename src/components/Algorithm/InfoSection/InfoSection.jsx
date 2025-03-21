import React from "react";
import { motion } from "framer-motion";
import styles from "./InfoSection.module.css";
import { infoSection } from "../../../constants";

const InfoSection = ({ algorithm }) => {
  // Add error handling and fallback for algorithm info
  let algorithmInfo = {};
  try {
    // Handle different formats of algorithm names
    const normalizedAlgorithm = algorithm.toLowerCase().replace(/\*/g, "star");

    // If the algorithm info exists directly, use it
    if (infoSection[algorithm]) {
      algorithmInfo = infoSection[algorithm];
    }
    // Try the normalized version
    else if (infoSection[normalizedAlgorithm]) {
      algorithmInfo = infoSection[normalizedAlgorithm];
    }
    // Default to empty object with placeholder text
    else {
      algorithmInfo = {
        info: `Information about ${algorithm} is not available yet.`,
        algorithm: ["Algorithm details will be added soon."],
        complexity: ["Complexity analysis will be added soon."],
        use_cases: ["Use cases will be added soon."],
      };
      console.warn(`No information found for algorithm: ${algorithm}`);
    }
  } catch (error) {
    console.error(`Error loading information for ${algorithm}:`, error);
    algorithmInfo = {
      info: "Algorithm information could not be loaded.",
      algorithm: ["Please try another algorithm."],
      complexity: [""],
      use_cases: [""],
    };
  }

  // Use the algorithmInfo safely with default values as fallback
  const {
    info = "",
    algorithm: steps = [],
    complexity = [],
    use_cases = [],
  } = algorithmInfo;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={styles.infoSection}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className={styles.infoDescription} variants={item}>
        <motion.h2 className={styles.algorithmTitle} variants={item}>
          {algorithm.replace(/_/g, " ").toUpperCase()}
        </motion.h2>
        <motion.p variants={item}>{info}</motion.p>
      </motion.div>

      <motion.div variants={container} className={styles.infoDetailsContainer}>
        <motion.div className={styles.infoDetails} variants={item}>
          <motion.h3 variants={item}>Algorithm Steps</motion.h3>
          <motion.ul variants={container}>
            {steps.map((step, index) => (
              <motion.li key={index} variants={item}>
                {step}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className={styles.infoDetails} variants={item}>
          <motion.h3 variants={item}>Complexity Analysis</motion.h3>
          <motion.ul variants={container}>
            {complexity.map((point, index) => (
              <motion.li key={index} variants={item}>
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className={styles.infoDetails} variants={item}>
          <motion.h3 variants={item}>Use Cases</motion.h3>
          <motion.ul variants={container}>
            {use_cases.map((useCase, index) => (
              <motion.li key={index} variants={item}>
                {useCase}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default InfoSection;
