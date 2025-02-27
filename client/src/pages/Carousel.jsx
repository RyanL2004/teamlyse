// Carousel.jsx
import React from "react";
import "./Carousel.css"; // Import your Carousel CSS
import Pricing from "./Pricing";
import { Link } from "react-router-dom";

const Carousel = () => {
  // Define your items data (this can come from props or state)
  const items = [
    { src: "/assets/mock-ups/1.png", position: 1 },
    { src: "/assets/mock-ups/2.png", position: 2 },
    { src: "/assets/mock-ups/3.png", position: 3 },
    { src: "/assets/mock-ups/10) (2).png", position: 4 },
    { src: "/assets/mock-ups/5.png", position: 6 },
    { src: "/assets/mock-ups/6.png", position: 7 },
    { src: "/assets/mock-ups/7.png", position: 8 },
    { src: "/assets/mock-ups/8.png", position: 9 },
    { src: "/assets/mock-ups/png.png", position: 10 },
    { src: "/assets/mock-ups/10) (1).png", position: 5 },
  ];

  return (
    <div className="banner">
      <div
        className="slider"
        style={{ "--quantity": 10 }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="item"
            style={{ "--position": item.position }}
          >
            <img src={item.src} alt="" />
          </div>
        ))}
      </div>
      <div className="content">
        <h1 data-content="TΞAMLYSE">TΞAMLYSE</h1>
        <div className="author">

          <h3><b>Ready to enhance your Productivity?</b></h3>
          <p>
          Enhance your professional meetings experience with AI
          </p>
          <Link to="/getstarted">
          <button className="rounded-full py-2 px-5 bg-white text-black font-semibold mt-5 transition-transform duration-200 hover:scale-110 hover:shadow-lg hover:bg-gray-300">
            Get Started
          </button>
          </Link>
  
          
          
        </div>
        <div className="model"></div>
      </div>
    </div>
  );
};

export default Carousel;
