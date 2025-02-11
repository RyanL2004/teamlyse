import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DashboardSideBar from "./DashboardSideBar";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const LiveCompanion = ({ onSelectPet }) => {
  const [pets, setPets] = useState([]); // Fetch pets dynamically
  const [selectedPet, setSelectedPet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const swiperRef = useRef(null);

  // Fetch pets from the backend when component loads
  useEffect(() => {
    fetch("/api/pets/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`); // ✅ Fixed string interpolation
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Pets fetched successfully:", data);
        setPets(data);
      })
      .catch((error) => console.error("❌ Error fetching pets:", error.message));
  }, []);  // ✅ Proper dependency array
  
  
      

  const handleSelect = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.swiper.realIndex;
      const chosenPet = pets[activeIndex];
      setSelectedPet(chosenPet);
      onSelectPet(chosenPet);

      // save pet to localStograge so secletion persists 
      localStorage.setItem("selectedPet", JSON.stringify(chosenPet));
      console.log("Pet Save to localStorage:", chosenPet)
    }
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      {/* Sidebar with state toggle */}
      <DashboardSideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main className={`flex-1 flex flex-col items-center justify-center p-4 transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-20"
      }`}>
        {/* Swiper Carousel for Pet Selection */}
        {pets.length > 0 ? (
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            navigation
            className="w-full max-w-4xl"
          >
            {pets.map((pet, index) => (
              <SwiperSlide key={pet._id} className="flex justify-center items-center">
                <motion.img
                  src={pet.image}
                  alt={pet.name}
                  className="w-64 h-auto rounded-lg shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Loading pets...</p>
        )}

        {/* Navigation Buttons */}
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

        {/* Confirm Selection Button */}
        <motion.button
          onClick={handleSelect}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition"
        >
          Confirm Selection
        </motion.button>

        {/* Selected Pet Confirmation */}
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
