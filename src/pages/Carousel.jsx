// Carousel.jsx
import React from "react";
import "./Carousel.css"; // Import your Carousel CSS
import Pricing from "./Pricing";
import { Link } from "react-router-dom";

const Carousel = () => {
  // Define your items data (this can come from props or state)
  const items = [
    { src: "/assets/images/dragon_1.jpg", position: 1 },
    { src: "/assets/images/dragon_2.jpg", position: 2 },
    { src: "/assets/images/dragon_3.jpg", position: 3 },
    { src: "/assets/images/dragon_4.jpg", position: 4 },
    { src: "/assets/images/dragon_6.jpg", position: 6 },
    { src: "/assets/images/dragon_7.jpg", position: 7 },
    { src: "/assets/images/dragon_8.jpg", position: 8 },
    { src: "/assets/images/dragon_9.jpg", position: 9 },
    { src: "/assets/images/dragon_10.jpg", position: 10 },
    { src: "/assets/images/dragon_5.jpg", position: 5 },
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
