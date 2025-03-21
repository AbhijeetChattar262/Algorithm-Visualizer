import React from "react";
import styles from "./ChatInput.module.css";
import { FaLocationArrow } from "react-icons/fa";

const ChatInput = ({ input, setInput, handleSendMessage }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents a new line
      if (input.trim()) {
        handleSendMessage(input);
      }
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      handleSendMessage(input);
    }
  };

  return (
    <div className={styles.chatInputContainer}>
      <textarea
        className={styles.chatInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        rows={3}
      />
      <button
        className={styles.sendBtn}
        onClick={handleSubmit}
        disabled={!input.trim()}
        aria-label="Send message"
      >
        <FaLocationArrow />
      </button>
    </div>
  );
};

export default ChatInput;
