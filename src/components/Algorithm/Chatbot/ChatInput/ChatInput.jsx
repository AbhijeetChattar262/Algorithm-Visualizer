import React from 'react';
import './ChatInput.css'; // Import the CSS for styling

const ChatInput = ({ input, setInput, handleSendMessage }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents a new line
            handleSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="chat-input-container">
            <textarea
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                rows={3} // Set the initial number of visible rows
            />
            <button className="send-btn" onClick={() => handleSendMessage(input)}>
                Send
            </button>
        </div>
    );
};

export default ChatInput;
