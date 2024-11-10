import React, { useState, useRef, useEffect } from "react";
import { ResizableBox } from "react-resizable"; 
import ChatHistory from "./ChatHistory/ChatHistory";
import ChatInput from "./ChatInput/ChatInput";
import { addCopyButtonListeners } from "../../../utils/copy-to-clipboard.util";
import { formatResponse } from "../../../utils/markdown.util";
import { chatSession } from "../../../utils/gemini";
import "./Chatbot.css";
import "react-resizable/css/styles.css"; // Import default styles for react-resizable

export default function Chatbot() {
    const [chatHistory, setChatHistory] = useState([{ message: "Hello! How can I help you today?", type: "bot" }]);
    const [input, setInput] = useState("");
    const [prompt, setPrompt] = useState("");
    const [formattedResponse, setFormattedResponse] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const chatHistoryRef = useRef(null);
    const words = formattedResponse.split(" ");

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
        <ResizableBox
            className="chatbot-container"
            width={400} // Initial width
            height={Infinity} // Full height
            minConstraints={[300, Infinity]} // Minimum width
            maxConstraints={[600, Infinity]} // Maximum width
            axis="x" // Allow horizontal resizing only
            handle={<div className="resize-handle" />} // Use a div as the handle
            resizeHandles={["w"]} // Only allow resizing from the left
        >
            <div className="chatbot-inner">
                <ChatHistory chatHistory={chatHistory} chatHistoryRef={chatHistoryRef} currentWord={words.slice(0, currentWordIndex).join(" ")} />
                <ChatInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
            </div>
        </ResizableBox>
    );
}
