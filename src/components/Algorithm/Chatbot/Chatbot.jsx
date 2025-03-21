import React, { useState, useRef, useEffect, useContext } from "react";
import { ResizableBox } from "react-resizable";
import { FaComments, FaTimes } from "react-icons/fa";
import ChatHistory from "./ChatHistory/ChatHistory";
import ChatInput from "./ChatInput/ChatInput";
import { addCopyButtonListeners } from "../../../utils/copy-to-clipboard.util";
import { formatResponse } from "../../../utils/markdown.util";
import { chatSession } from "../../../utils/gemini";
import { ChatbotContext } from "../../../context/ChatbotContext";
import styles from "./Chatbot.module.css";
import "react-resizable/css/styles.css";

export default function Chatbot({ onExpandChange }) {
  const { isExpanded, setIsExpanded } = useContext(ChatbotContext);
  const [chatHistory, setChatHistory] = useState([
    { message: "Hello! How can I help you today?", type: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [formattedResponse, setFormattedResponse] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const chatHistoryRef = useRef(null);
  const words = formattedResponse.split(" ");

  const toggleChatbot = () => {
    setIsExpanded(!isExpanded);
    onExpandChange(!isExpanded);
  };

  const handleSendMessage = async (input) => {
    if (input.trim()) {
      setChatHistory([...chatHistory, { message: input, type: "user" }]);
      setInput("");
      setPrompt(`${prompt} ${input}`);

      try {
        const result = await chatSession.sendMessage(input);
        const responseText = result.response.text();
        const formattedText = formatResponse(responseText);
        setFormattedResponse(formattedText);
        setCurrentWordIndex(0);
      } catch (error) {
        setChatHistory([
          ...chatHistory,
          { message: "Error communicating with AI", type: "bot" },
        ]);
      }
    }
  };

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(
        () => setCurrentWordIndex(currentWordIndex + 1),
        25
      );
      return () => clearTimeout(timer);
    } else if (formattedResponse) {
      setChatHistory([
        ...chatHistory,
        { message: formattedResponse, type: "bot" },
      ]);
      setFormattedResponse("");
    }
  }, [currentWordIndex, words.length, formattedResponse]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory, currentWordIndex]);

  useEffect(() => addCopyButtonListeners(), [chatHistory]);

  return (
    <div
      className={`${styles.chatbotWrapper} ${
        isExpanded ? styles.expanded : styles.collapsed
      }`}
    >
      {isExpanded ? (
        <ResizableBox
          className={styles.chatbotContainer}
          width={350}
          height={Infinity}
          minConstraints={[300, Infinity]}
          maxConstraints={[500, Infinity]}
          axis="x"
          handle={<div className={styles.resizeHandle} />}
          resizeHandles={["w"]}
        >
          <div>
            <div className={styles.chatbotHeader}>
              <h3>Chat Assistant</h3>
              <button className={styles.toggleButton} onClick={toggleChatbot}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.chatbotInner}>
              <ChatHistory
                chatHistory={chatHistory}
                chatHistoryRef={chatHistoryRef}
                currentWord={words.slice(0, currentWordIndex).join(" ")}
              />
              <ChatInput
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </ResizableBox>
      ) : (
        <button className={styles.chatBubbleButton} onClick={toggleChatbot}>
          <FaComments />
        </button>
      )}
    </div>
  );
}
