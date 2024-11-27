import React, { useState } from 'react';
import './Algorithm.css';
import InfoSection from '../../components/Algorithm/InfoSection/InfoSection';
import Visualization from '../../components/Algorithm/Visualization/Visualization';
import Chatbot from '../../components/Algorithm/Chatbot/Chatbot';

export default function Algorithm({ algorithm }) {
    const [isChatbotExpanded, setIsChatbotExpanded] = useState(false);

    return (
        <div className="algo-container">
            <div className={`algo-hero ${isChatbotExpanded ? 'chatbot-expanded' : ''}`}>
                <InfoSection algorithm={algorithm} />
                <Visualization algorithm={algorithm} />
            </div>
            <Chatbot onExpandChange={setIsChatbotExpanded} />
        </div>
    );
}
