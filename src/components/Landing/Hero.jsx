import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; 
import "./Hero.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import carousel1 from "../../assets/carousel1.jpg";
import carousel2 from "../../assets/carousel2.png";

export default function Hero() {
  const navigate = useNavigate();

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="main">
      <div className="hero">
        <div className="text">
          <h1 className="title">AI Powered Algorithm Visualizer</h1>
          <p>
            Demystify algorithms with our stunning visualizations. Watch as data
            structures and algorithms unfold before your eyes, along with AI
            chatbots to help clear your doubts.
          </p>
          <button
            className="start-btn"
            onClick={() => navigate("/categories")}
          >
            <div className="start">Get Started</div>
            <div className="arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </button>
        </div>
        <div className="carousel">
          <Slider {...settings}>
            <div className="carousel-item">
              <img src={carousel1} alt="Description 1" />
              <p>Chatbot to help solve your doubts</p>
            </div>
            <div className="carousel-item">
              <img src={carousel2} alt="Description 2" ></img>
              <p>Visualizations to help you understand algorithms better</p>
            </div>
            
          </Slider>
        </div>
      </div>
    </div>
  );
}