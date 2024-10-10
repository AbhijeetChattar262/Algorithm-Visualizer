import React, { useState } from 'react';
import './Chatbot.css';

export default function Chatbot() {
    const [chatHistory, setChatHistory] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim()) {
            // Add the user message to the chat history
            const updatedChatHistory = [...chatHistory, { message: input, type: 'user' }];
            setChatHistory(updatedChatHistory);
            setInput('');

            // Simulate a response from the server after a delay
            setTimeout(() => {
                setChatHistory([...updatedChatHistory, { message: 'Response from server', type: 'bot' }]);
            }, 1000);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-bubble ${chat.type}`}>
                        {chat.message}
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <textarea
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    rows={1}
                />
                <button className="send-btn" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}
