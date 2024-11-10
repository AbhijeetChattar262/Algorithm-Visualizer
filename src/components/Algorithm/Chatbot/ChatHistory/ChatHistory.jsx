import React from "react";
import "./ChatHistory.css";

export default function ChatHistory({ chatHistory, chatHistoryRef, currentWord }) {
    return (
        <div className="chat-history" ref={chatHistoryRef}>
            {chatHistory.map((chat, index) => (
                <div key={index} className={`chat-bubble ${chat.type}`}>
                    <div className="chat-message" dangerouslySetInnerHTML={{ __html: chat.message }} />
                </div>
            ))}
            <div className="chat-bubble bot">
                <div className="chat-message" dangerouslySetInnerHTML={{ __html: currentWord }} />
            </div>
        </div>
    );
}
