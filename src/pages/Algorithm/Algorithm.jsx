import React from 'react'
import './Algorithm.css'
import InfoSection from '../../components/Algorithm/InfoSection/InfoSection'
import Visualization from '../../components/Algorithm/Visualization/Visualization'
import Chatbot from '../../components/Algorithm/Chatbot/Chatbot'

export default function Algorithm({ algorithm }) {
    return (
        <div className="algo-container">
            <InfoSection algorithm={algorithm} />
            <div className="algo-hero">
                <Visualization algorithm={algorithm} />
                <Chatbot />
            </div>
        </div>
    )
}
