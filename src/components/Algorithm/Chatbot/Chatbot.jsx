import React, { useState, useRef, useEffect } from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js"; // For syntax highlighting
import "highlight.js/styles/github.css"; // Import the highlight.js theme
import { chatSession } from "../../../utils/gemini";
import "./Chatbot.css";

// Initialize markdown-it with syntax highlighting
const md = new MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
    breaks: true, // Convert newlines to <br> for line breaks in paragraphs
});

export default function Chatbot() {
    const [chatHistory, setChatHistory] = useState([{ message: "Hello! How can I help you today?", type: "bot" }]);
    const [input, setInput] = useState("");
    const chatHistoryRef = useRef(null);
    const [prompt, setPrompt] = useState(""); // Add a new state for the prompt
    const [response, setResponse] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [formattedResponse, setFormattedResponse] = useState("");
    const words = formattedResponse.split(" ");

    const handleSendMessage = async (input) => {
        if (input.trim()) {
            const userMessage = { message: input, type: "user" };
            setChatHistory((prev) => [...prev, userMessage]);
            setInput("");
            setPrompt(`${prompt} ${input}`); // Update the prompt

            try {
                const result = await chatSession.sendMessage(input);
                const responseText = await result.response.text(); // Assuming this returns markdown
                const formattedText = formatResponse(responseText);
                setFormattedResponse(formattedText); // Set the formatted response text
                setResponse(responseText); // Set the raw response text
                setCurrentWordIndex(0); // Reset the word index
            } catch (error) {
                const errorMessage = {
                    message: "Error communicating with AI",
                    type: "bot",
                };
                console.log(error);
                setChatHistory((prev) => [...prev, errorMessage]);
            }
        }
    };

    useEffect(() => {
        if (currentWordIndex < words.length) {
            const timer = setTimeout(() => {
                setCurrentWordIndex(currentWordIndex + 1);
            }, 25); // Adjust the interval as needed
            return () => clearTimeout(timer);
        } else if (formattedResponse) {
            const botMessage = {
                message: formattedResponse,
                type: "bot",
            };
            setChatHistory((prev) => [...prev, botMessage]);
            setFormattedResponse(""); // Clear the formatted response after displaying
        }
    }, [currentWordIndex, words.length, formattedResponse]);

    const formatResponse = (responseText) => {
        // Convert Markdown to HTML
        return md.render(responseText);
    };

    useEffect(() => {
        // Scroll to the bottom whenever chatHistory changes
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chatHistory, prompt, currentWordIndex]); // Add prompt as a dependency

    return (
        <div className="chatbot-container">
            <div className="chat-history" ref={chatHistoryRef}>
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-bubble ${chat.type}`}>
                        {/* Render the response as HTML, with code blocks highlighted */}
                        <div className="chat-message" dangerouslySetInnerHTML={{ __html: chat.message }} />
                    </div>
                ))}
                <div className="chat-bubble bot">
                    <div className="chat-message" dangerouslySetInnerHTML={{ __html: words.slice(0, currentWordIndex).join(" ") }} />
                </div>
            </div>
            <div className="chat-input-container">
                <textarea
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    rows={1}
                />
                <button
                    className="send-btn"
                    onClick={() => handleSendMessage(input)}
                >
                    Send
                </button>
            </div>
        </div>
    );
}