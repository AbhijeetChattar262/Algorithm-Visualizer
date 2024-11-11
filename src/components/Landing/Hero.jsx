import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="main">
      <div className="hero">
        <div className="text">
          <h1 className="title">AI POWERED ALGORITHM VISUALIZER</h1>
          <p>
            Demystify algorithms with our stunning visualizations. Watch as data
            structures and algorithms unfold before your eyes along with AI
            chatbots to help clear your doubts
          </p>
          <button className="start-btn" onClick={() => navigate("/categories")}><div className="start">Get Started</div><div className="arrow"><i className="fa-solid fa-arrow-right"></i></div></button>
        </div>
      </div>
    </div>
  );
}
