import React from 'react';
import { infoSection } from '../../../constants';
import './InfoSection.css';

export default function InfoSection({ algorithm }) {
    const [slide, setSlide] = React.useState(0);

    const totalSlides = 4;

    const nextSlide = () => {
        setSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setSlide((prevSlide) =>
            prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
        );
    };

    return (
        <div className="info-section">
            <div className="prev" onClick={prevSlide}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>

            <div className="slides" style={{ transform: `translateX(-${slide * 100}%)` }}>
                <div className="content">
                    <h3>Information</h3>
                    <p>{infoSection[algorithm].info}</p>
                </div>

                <div className="content">
                    <h3>Algorithm Steps</h3>
                    <ol>
                        {infoSection[algorithm].algorithm.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>

                <div className="content">
                    <h3>Complexity</h3>
                    <ol>
                        {infoSection[algorithm].complexity.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                </div>

                <div className="content">
                    <h3>Use Cases</h3>
                    <ol>
                        {infoSection[algorithm].use_cases.map((useCase, index) => (
                            <li key={index}>{useCase}</li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className="next" onClick={nextSlide}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>
        </div>
    );
}
