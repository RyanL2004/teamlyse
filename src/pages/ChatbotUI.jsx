import React, { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPlus,
  faListCheck,
  faCalculator,
  faSearch,
  faSquare,
  faPaperclip,
  faMicrophone,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  User,
  Settings,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

import ChatNavUser from "../components/ChatbotUserNav";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import createHollowKnight from "./3DAnimatedCharacter";
import { UserContext } from "../context/UserContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import "./ChatbotUI.css";

const ChatbotUI = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const avatarContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const { user, loading } = useContext(UserContext);
  const [notifications, setNotifications] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {};
  useEffect(() => {
    const initializeScene = () => {
      if (!avatarContainerRef.current) return;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        avatarContainerRef.current.clientWidth /
          avatarContainerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 3;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(
        avatarContainerRef.current.clientWidth,
        avatarContainerRef.current.clientHeight
      );
      renderer.setClearColor(0x000000, 0);
      avatarContainerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 10, 10);
      scene.add(directionalLight);

      // Load your 3D avatar model
      const knightModel = createHollowKnight();
      scene.add(knightModel);
      modelRef.current = knightModel;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;

      const handleResize = () => {
        if (!avatarContainerRef.current) return;
        camera.aspect =
          avatarContainerRef.current.clientWidth /
          avatarContainerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          avatarContainerRef.current.clientWidth,
          avatarContainerRef.current.clientHeight
        );
      };
      window.addEventListener("resize", handleResize);

      const animate = () => {
        requestAnimationFrame(animate);
        if (mixerRef.current) {
          mixerRef.current.update(clockRef.current.getDelta());
        }
        if (modelRef.current) {
          modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        }
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("resize", handleResize);
        if (rendererRef.current && avatarContainerRef.current) {
          avatarContainerRef.current.removeChild(
            rendererRef.current.domElement
          );
        }
        if (modelRef.current) {
          scene.remove(modelRef.current);
          modelRef.current.geometry.dispose();
          modelRef.current.material.dispose();
        }
      };
    };

    initializeScene();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Simulate sending a message and receiving a bot response
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user's message
    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate a delayed bot response
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: "I'm processing your request...",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleAvatarClick = () => {
    // You can trigger an animation or change the state to simulate an interactive response
    console.log("Avatar clicked – triggering animation!");
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {/* 3D Avatar Container - Top of Sidebar */}
        <div
          ref={avatarContainerRef}
          className="avatar-container"
          onClick={handleAvatarClick}
        ></div>

        {/* Power-Ups Section */}
        <div className="power-ups-section">
          <div className="section-header">
            <div className="section-title">Power-Ups</div>
            <a href="#" className="see-all-link">
              See all
            </a>
          </div>
          <div className="power-ups-grid">
            <div className="power-up-item">
              <FontAwesomeIcon
                icon={faListCheck}
                style={{ color: "#9c5afc" }}
              />
            </div>
            <div className="power-up-item">
              <FontAwesomeIcon
                icon={faCalculator}
                style={{ color: "#4285f4" }}
              />
            </div>
            <div className="power-up-item">
              <FontAwesomeIcon
                icon={faCalculator}
                style={{ color: "#4285f4" }}
              />
            </div>
          </div>
          <button className="new-chat-button">
            <FontAwesomeIcon icon={faPlus} /> New Chat
          </button>
        </div>

        {/* History Section */}
        <div className="history-section">
          <div className="section-header">
            <div className="section-title">History</div>
            <div className="search-icon">
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: "14px" }} />
            </div>
          </div>
          <div className="day-label">Yesterday</div>
          <div className="history-item">
            <div className="history-icon">
              <FontAwesomeIcon icon={faSquare} />
            </div>
            <div className="history-text">Dexter will analyze...</div>
          </div>
          <div className="history-item">
            <div className="history-icon">
              <FontAwesomeIcon icon={faSquare} />
            </div>
            <div className="history-text">Dexter will analyze...</div>
          </div>
          <div className="day-label">Last 7 Days</div>
        </div>

        {/* User Profile & Header Section - Moved to Bottom */}
        {/* Combined User Profile & Header Section */}
        <div className="profile-header">
          {/* User Details on the Left 
          <div className="profile-avatar">
            <img src="/api/placeholder/120/120" alt="User avatar" />
          </div>
          */}
          {loading ? null : user ? (
            <>
              <Avatar>
                <AvatarImage
                  src={user.profilePhoto}
                  alt={user.name}
                ></AvatarImage>
                <AvatarFallback>
                  <div className="fallback-text">{user.name.charAt(0)}</div>
                </AvatarFallback>
              </Avatar>
              <div className="user-info">
                <div className="profile-name">{user.name}</div>
                <div className="user-name">Data Analyst</div>
              </div>
              {/* Profile Avatar on the Right */}

              {/* Settings Icon (Aligned to Right) */}
              <button onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon
                  icon={faCog}
                  className="transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
            </>
          ) : (
            <div className="user-info">
              <div className="profile-name">Dexter</div>
              <div className="user-name">Data Analyst</div>
            </div>
          )}
        </div>
                 {/* Dropdown Menu */}
                 {isOpen && (
                     <ChatNavUser 
                     notifications={notifications} 
                     onLogout={handleLogout}
                   />
          )}
      </div>

      <div className="main-content">
        <div className="chat-section">
          <div className="greeting-message">
            <h1>
              Hey, it's <span>Dexter</span>{" "}
              <span className="wave-emoji">👋</span>
            </h1>
            <h2>How can I help?</h2>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="input-section">
          <div className="input-container">
            <div className="input-icon">
              <FontAwesomeIcon icon={faPaperclip} />
            </div>
            <input
              type="text"
              className="input-field"
              placeholder="Press '/' to see integrations actions"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <div className="input-icons">
              <div className="input-icon">
                <FontAwesomeIcon icon={faMicrophone} />
              </div>
            </div>
            <button className="send-button" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <p className="footer-text">
            TΞAMLYSE Helpers can make mistakes. Consider checking important
            information.
          </p>
        </div>

        <button className="help-button">Help</button>
      </div>
    </div>
  );
};
export default ChatbotUI;
