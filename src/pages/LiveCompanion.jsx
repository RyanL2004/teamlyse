import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DashboardSideBar from "./DashboardSideBar";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";



const pets = [
  { name: "Fox", model: "/assets/gifs/lethal-company-dance.gif" },
  { name: "Owl", model: "/assets/gifs/lethal-company-dance.gif" },
  { name: "Cat", model: "/assets/gifs/lethal-company-dance.gif" },
  { name: "Rabbit", model: "/assets/gifs/lethal-company-dance.gif" },
  { name: "Baby Kangaroo", model: "/assets/gifs/lethal-company-dance.gif" },
];

const LiveCompanion = ({ onSelectPet }) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const swiperRef = useRef(null);

  const handleSelect = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.swiper.realIndex;
      const chosenPet = pets[activeIndex];
      setSelectedPet(chosenPet);
      onSelectPet(chosenPet);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r bg-neutral-950 text-white relative overflow-hidden">
      <DashboardSideBar className="fixed left-0 top-0 h-full z-10" />
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Swiper Carousel for Pet Selection */}
        <Swiper
          modules={[Navigation]}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          navigation
          className="w-full max-w-4xl"
        >
          {pets.map((pet, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <motion.img
                src={pet.model}
                alt={pet.name}
                className="w-64 h-auto rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center gap-6 mt-4">
          <button
            className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition transform hover:scale-110"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <FaArrowLeft size={28} />
          </button>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold"
          >
            Select Your AI Companion
          </motion.h2>
          <button
            className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition transform hover:scale-110"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <FaArrowRight size={28} />
          </button>
        </div>

        <motion.button
          onClick={handleSelect}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition"
        >
          Confirm Selection
        </motion.button>

        {selectedPet && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-green-400"
          >
            You have selected: {selectedPet.name}!
          </motion.p>
        )}
      </main>
    </div>
  );
};

export default LiveCompanion;
