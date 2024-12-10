import React, { useState } from 'react';
import './Algorithm.css';
import InfoSection from '../../components/Algorithm/InfoSection/InfoSection';
import Visualization from '../../components/Algorithm/Visualization/Visualization';
import SearchingVisualizer from '../../components/SearchingVisualizer/SearchingVisualizer';
import Chatbot from '../../components/Algorithm/Chatbot/Chatbot';
import GraphVisualizer from '../../components/GraphVisualizer/GraphVisualizer';

export default function Algorithm({ algorithm }) {
    const [isChatbotExpanded, setIsChatbotExpanded] = useState(false);

    const isSorting = algorithm.includes('sort');
    const isSearching = algorithm.includes('search');
    const isGraph = algorithm.includes('graph_');  // Update condition to match new naming

    return (
        <div className="algo-container">
            <div className={`algo-hero ${isChatbotExpanded ? 'chatbot-expanded' : ''}`}>
                <InfoSection algorithm={algorithm} />
                {isSorting && <Visualization algorithm={algorithm} />}
                {isSearching && <SearchingVisualizer algorithm={algorithm} />}
                {isGraph && <GraphVisualizer algorithm={algorithm} />}
            </div>
            <Chatbot onExpandChange={setIsChatbotExpanded} />
        </div>
    );
}
