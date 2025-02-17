// Carousel.jsx
import React from "react";
import "./Carousel.css"; // Import your Carousel CSS

const Carousel = () => {
  // Define your items data (this can come from props or state)
  const items = [
    { src: "/public/assets/images/dragon_1.jpg", position: 1 },
    { src: "/public/assets/images/dragon_2.jpg", position: 2 },
    { src: "/public/assets/images/dragon_3.jpg", position: 3 },
    { src: "/public/assets/images/dragon_4.jpg", position: 4 },
    { src: "/public/assets/images/dragon_6.jpg", position: 6 },
    { src: "/public/assets/images/dragon_7.jpg", position: 7 },
    { src: "/public/assets/images/dragon_8.jpg", position: 8 },
    { src: "/public/assets/images/dragon_9.jpg", position: 9 },
    { src: "/public/assets/images/dragon_10.jpg", position: 10 },
    { src: "/public/assets/images/dragon_5.jpg", position: 5 },
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
        </div>
        <div className="model"></div>
      </div>
    </div>
  );
};

export default Carousel;
