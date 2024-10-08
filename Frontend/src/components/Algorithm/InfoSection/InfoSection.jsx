import React, { useState, useRef } from 'react';
import './InfoSection.css';

export default function InfoSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const contentRef = useRef(null);

    const sections = [
        {
            title: "Information of Algorithm",
            content: "Details about the algorithm..."
        },
        {
            title: "Time and Space Complexity",
            content: "Details about time and space complexity..."
        },
        {
            title: "The Actual Algorithm",
            content: "Details about the algorithm steps..."
        },
        {
            title: "Use Cases and Pros and Cons",
            content: "Details about use cases and pros and cons..."
        }
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % sections.length;
            contentRef.current.scrollTo({
                left: newIndex * contentRef.current.clientWidth,
                behavior: 'smooth'
            });
            return newIndex;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + sections.length) % sections.length;
            contentRef.current.scrollTo({
                left: newIndex * contentRef.current.clientWidth,
                behavior: 'smooth'
            });
            return newIndex;
        });
    };

    return (
        <div className="info-section">
            <div className="info-content" ref={contentRef}>
                {sections.map((section, index) => (
                    <section key={index} className="info-section-item">
                        <h2>{section.title}</h2>
                        <p>{section.content}</p>
                    </section>
                ))}
            </div>
            <button onClick={handlePrev} className="prev-button">Previous</button>
            <button onClick={handleNext} className="next-button">Next</button>
        </div>
    );
}