import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog, faPlus, faListCheck, faCalculator, 
  faSearch, faSquare, faPaperclip, faMicrophone, 
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './ChatbotUI.css';

const ChatbotUI = () => {
  const [inputValue, setInputValue] = useState('');
  const avatarContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const initializeScene = () => {
      if (!avatarContainerRef.current) return;
      
      // Create scene, camera, and renderer
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      const camera = new THREE.PerspectiveCamera(
        75,
        avatarContainerRef.current.clientWidth / avatarContainerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 3;
      cameraRef.current = camera;
      
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(
        avatarContainerRef.current.clientWidth,
        avatarContainerRef.current.clientHeight
      );
      renderer.setClearColor(0x000000, 0);
      avatarContainerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 10, 10);
      scene.add(directionalLight);
      
      // Load a placeholder model (replace this with your own 3D avatar model)
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xEE8B21,
        metalness: 0.3,
        roughness: 0.4,
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      modelRef.current = sphere;
      
      // Optional: add orbit controls for development
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      
      // Handle window resize
      const handleResize = () => {
        if (!avatarContainerRef.current) return;
        camera.aspect = avatarContainerRef.current.clientWidth / avatarContainerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          avatarContainerRef.current.clientWidth,
          avatarContainerRef.current.clientHeight
        );
      };
      window.addEventListener('resize', handleResize);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        if (mixerRef.current) {
          mixerRef.current.update(clockRef.current.getDelta());
        }
        if (modelRef.current) {
          modelRef.current.rotation.y += 0.005;
          modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        }
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (rendererRef.current && avatarContainerRef.current) {
          avatarContainerRef.current.removeChild(rendererRef.current.domElement);
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

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    console.log('Sending message:', inputValue);
    // Trigger a response animation on the avatar here
    setInputValue('');
  };

  const handleAvatarClick = () => {
    // Example: Trigger an interactive animation when the avatar is clicked
    console.log('Avatar clicked – triggering animation!');
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {/* Sidebar content remains unchanged */}
        <div className="header-section">
          <div className="user-profile">
            <div>
              <div className="profile-name">Dexter</div>
              <div className="user-name">Data Analyst</div>
            </div>
          </div>
          <div className="settings-icon">
            <FontAwesomeIcon icon={faCog} />
          </div>
        </div>
        <div className="profile-section">
          <div className="profile-avatar">
            <img src="/api/placeholder/120/120" alt="Astronaut avatar" />
          </div>
          <button className="new-chat-button">
            <FontAwesomeIcon icon={faPlus} /> New Chat
          </button>
        </div>
        <div className="power-ups-section">
          <div className="section-header">
            <div className="section-title">Power-Ups</div>
            <a href="#" className="see-all-link">See all</a>
          </div>
          <div className="power-ups-grid">
            <div className="power-up-item">
              <FontAwesomeIcon icon={faListCheck} style={{ color: '#9c5afc' }} />
            </div>
            <div className="power-up-item">
              <FontAwesomeIcon icon={faCalculator} style={{ color: '#4285f4' }} />
            </div>
          </div>
        </div>
        <div className="history-section">
          <div className="section-header">
            <div className="section-title">History</div>
            <div className="search-icon">
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: '14px' }} />
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
      </div>
      
      <div className="main-content">
        {/* The avatar container is now a fixed widget in the bottom-right */}
        <div 
          ref={avatarContainerRef} 
          className="avatar-container" 
          onClick={handleAvatarClick}>
        </div>
        
        <div className="chat-section">
          <div className="greeting-message">
            <h1>Hey, it's <span>Dexter</span> <span className="wave-emoji">👋</span></h1>
            <h2>How can I help?</h2>
          </div>
          <div className="chat-messages">
            {/* Chat messages would be rendered here */}
          </div>
        </div>
        
        <div className="input-section">
          <div className="input-container">
            <div className="input-icon">
              <FontAwesomeIcon icon={faPaperclip} style={{ color: '#999' }} />
            </div>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Press '/' to see integrations actions"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
          <p className="footer-text">TΞAMLYSE Helpers can make mistakes. Consider double checking important information.</p>
        </div>
        
        <button className="help-button">Help</button>
      </div>
    </div>
  );
};

export default ChatbotUI;
