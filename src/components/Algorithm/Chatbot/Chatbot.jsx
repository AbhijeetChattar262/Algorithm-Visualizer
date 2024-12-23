import React, { useState, useRef, useEffect, useContext } from "react";
import { ResizableBox } from "react-resizable"; 
import { FaComments, FaTimes } from 'react-icons/fa'; // Add this import
import ChatHistory from "./ChatHistory/ChatHistory";
import ChatInput from "./ChatInput/ChatInput";
import { addCopyButtonListeners } from "../../../utils/copy-to-clipboard.util";
import { formatResponse } from "../../../utils/markdown.util";
import { chatSession } from "../../../utils/gemini";
import { ChatbotContext } from '../../../context/ChatbotContext'; // Import context
import "./Chatbot.css";
import "react-resizable/css/styles.css"; // Import default styles for react-resizable

export default function Chatbot({ onExpandChange }) {
    const { isExpanded, setIsExpanded } = useContext(ChatbotContext); // Use context
    const [chatHistory, setChatHistory] = useState([{ message: "Hello! How can I help you today?", type: "bot" }]);
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
                setChatHistory([...chatHistory, { message: "Error communicating with AI", type: "bot" }]);
            }
        }
    };

    useEffect(() => {
        if (currentWordIndex < words.length) {
            const timer = setTimeout(() => setCurrentWordIndex(currentWordIndex + 1), 25);
            return () => clearTimeout(timer);
        } else if (formattedResponse) {
            setChatHistory([...chatHistory, { message: formattedResponse, type: "bot" }]);
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
        <div className={`chatbot-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded ? (
                <ResizableBox
                    className="chatbot-container"
                    width={350}
                    height={Infinity}
                    minConstraints={[300, Infinity]}
                    maxConstraints={[500, Infinity]}
                    axis="x"
                    handle={<div className="resize-handle" />}
                    resizeHandles={["w"]}
                >
                    <div> {/* Add this wrapper div */}
                        <div className="chatbot-header">
                            <h3>Chat Assistant</h3>
                            <button className="toggle-button" onClick={toggleChatbot}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="chatbot-inner">
                            <ChatHistory chatHistory={chatHistory} chatHistoryRef={chatHistoryRef} currentWord={words.slice(0, currentWordIndex).join(" ")} />
                            <ChatInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
                        </div>
                    </div> {/* Close the wrapper div */}
                </ResizableBox>
            ) : (
                <button className="chat-bubble-button" onClick={toggleChatbot}>
                    <FaComments />
                </button>
            )}
        </div>
    );
}
