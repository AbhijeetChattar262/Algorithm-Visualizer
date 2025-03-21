import React, { useEffect, useRef } from "react";
import styles from "./MessageLog.module.css";

/**
 * Reusable MessageLog component for displaying algorithm steps
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message strings to display
 * @param {string} props.title - Title of the message log section
 * @param {string} props.className - Additional CSS classes
 */
const MessageLog = ({
  messages = [],
  title = "Algorithm Steps",
  className = "",
}) => {
  const messageLogRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messageLogRef.current) {
      messageLogRef.current.scrollTo({
        top: messageLogRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className={`${styles.messageLogContainer} ${className}`}>
      <h4 className={styles.messageLogHeader}>{title}</h4>
      <div className={styles.messageLog} ref={messageLogRef}>
        {messages.map((message, index) => (
          <div key={index} className={styles.logEntry}>
            {typeof message === "string" ? message : `Step ${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageLog;
