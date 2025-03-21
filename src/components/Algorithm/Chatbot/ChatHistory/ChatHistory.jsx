import React from "react";
import styles from "./ChatHistory.module.css";

export default function ChatHistory({
  chatHistory,
  chatHistoryRef,
  currentWord,
}) {
  return (
    <div className={styles.chatHistory} ref={chatHistoryRef}>
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`${styles.chatBubble} ${styles[chat.type]}`}
        >
          <div
            className={styles.chatMessage}
            dangerouslySetInnerHTML={{ __html: chat.message }}
          />
        </div>
      ))}
      {currentWord && (
        <div className={`${styles.chatBubble} ${styles.bot}`}>
          <div
            className={styles.chatMessage}
            dangerouslySetInnerHTML={{ __html: currentWord }}
          />
        </div>
      )}
    </div>
  );
}
