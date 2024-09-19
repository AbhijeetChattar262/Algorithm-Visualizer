import React from "react";
import "./Hero.css";

export default function Hero() {
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
          <button className="start-btn">Get Started</button>
        </div>
      </div>
    </div>
  );
}
