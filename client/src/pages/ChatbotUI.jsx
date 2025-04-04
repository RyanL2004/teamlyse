"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import {
  Mic,
  MicOff,
  PauseCircle,
  MessageSquare,
  FileText,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { loadCompanions, hydrateSelectedCompanion, setSelectedCompanionId } from "../store/companionsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hollowKnight } from "@/components/dashboard-component/AICompanionSelection"
import createHollowKnight from "./3DAnimatedCharacter";


const MeetingCompanion = ({ onClose }) => {
  // State for UI
  const [isListening, setIsListening] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [activeTab, setActiveTab] = useState("transcript")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [messages, setMessages] = useState([])
  const [transcript, setTranscript] = useState([])
  const [insights, setInsights] = useState([])
  const [meetingDuration, setMeetingDuration] = useState(0)
  const [inputValue, setInputValue] = useState("")

  // Refs for 3D rendering
  const companionContainerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const modelRef = useRef(null)
  const mixerRef = useRef(null)
  const clockRef = useRef(new THREE.Clock())
  const messagesEndRef = useRef(null)


  // Dispatch Selected Companion By Id 
  // So we need to pass the state of the selected companion from the form to the ChatBot UI section 
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); 

  const meetingId = location.state?.meetingId;
  const { meetings } = useSelector((state) => state.meetings);

  //Find the meeting from Redux
  const meeting = meetings.find((m) => m._id === meetingId);
  // The embedded companion object is here if the server includes it
  const selectedCompanion = meeting?.companion;




  function loadCompanionModel(companion, scene) {
    // Clone the base model
    const model = createHollowKnight().clone();
  
    // Apply companion-specific properties
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone(); // clone the material to avoid shared state
        child.material.color.set(companion.color || "#6366f1");
      }
    });
  
    if (companion.position) {
      model.position.set(...companion.position);
    }
  
    if (companion.scale) {
      model.scale.set(companion.scale, companion.scale, companion.scale);
    }
    
    if (companion.rotation) {
      model.rotation.set(...companion.rotation);
    }
    

    scene.add(model);
  
    return {
      model,
      mixer: null,
    };
  }

  function fitCameraToModel(camera, model) {
    const scene = sceneRef.current;
    const container = companionContainerRef.current;
    if (!scene || !model || !container) return;
  
    // Remove model if already in scene to avoid duplicates
    scene.remove(model);
  
    // Center the model based on its bounding box
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
  
    model.position.sub(center);
    scene.add(model);
  
    // Camera sizing
    const aspect = container.clientWidth / container.clientHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 1.5;
  
    camera.position.set(0, 0, cameraZ);
    camera.lookAt(0, 0, 0);
  }
  
  
  
  

  // Mock data for transcript
  const mockTranscript = [
    {
      id: 1,
      speaker: "John",
      text: "I think we should focus on improving the user onboarding experience.",
      time: "00:01:23",
    },
    {
      id: 2,
      speaker: "Sarah",
      text: "I agree. Our analytics show a 23% drop-off during the first-time setup.",
      time: "00:01:45",
    },
    { id: 3, speaker: "You", text: "What specific screens have the highest drop-off rates?", time: "00:02:10" },
    {
      id: 4,
      speaker: "Sarah",
      text: "The payment information page and the preference selection screens.",
      time: "00:02:30",
    },
  ]

  // Mock data for insights
  const mockInsights = [
    { id: 1, type: "key_point", text: "User onboarding has a 23% drop-off rate", time: "00:01:45" },
    { id: 2, type: "action_item", text: "Review payment information page design", time: "00:02:30" },
    { id: 3, type: "question", text: "What specific screens have the highest drop-off rates?", time: "00:02:10" },
  ]

  // Initialize 3D scene
  useEffect(() => {
    if (!companionContainerRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      50,
      companionContainerRef.current.clientWidth / companionContainerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 2.5
    cameraRef.current = camera

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(companionContainerRef.current.clientWidth, companionContainerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    companionContainerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 10, 10)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Add a subtle point light with the companion's color
    const companionColor = selectedCompanion?.color || 0x6366f1
    const pointLight = new THREE.PointLight(companionColor, 1, 10)
    pointLight.position.set(0, 0, 2)
    scene.add(pointLight)

    // Load 3D model
    const modelPath = selectedCompanion?.modelUrl
    const { model, mixer } = loadCompanionModel(selectedCompanion, scene)
    modelRef.current = model
    mixerRef.current = mixer

    
// Auto-center and scale to fit in view
fitCameraToModel(camera, model);


    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 0.5

    // Handle window resize
      let resizeTimeout;
    
      const handleResize = () => {
        if (!companionContainerRef.current || !cameraRef.current || !modelRef.current || !rendererRef.current) return;
    
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const container = companionContainerRef.current;
          const camera = cameraRef.current;
          const renderer = rendererRef.current;
          const model = modelRef.current;
    
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
    
          fitCameraToModel(camera, model);
        }, 100);
      };
    
      
    
    

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Update mixer if it exists
      if (mixerRef.current) {
        mixerRef.current.update(clockRef.current.getDelta())
      }
      
      // Only rotate model if it exists 
      if (modelRef.current instanceof THREE.Object3D) {
        modelRef.current.rotation.y += 0.005;
      }
      
      /*
      // Add gentle floating animation
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005
        modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1
      }
        */
      

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)

      if (rendererRef.current && companionContainerRef.current) {
        companionContainerRef.current.removeChild(rendererRef.current.domElement)
      }

      if (modelRef.current) {
        scene.remove(modelRef.current)
        if (modelRef.current.geometry) modelRef.current.geometry.dispose()
        if (modelRef.current.material) {
          if (Array.isArray(modelRef.current.material)) {
            modelRef.current.material.forEach((material) => material.dispose())
          } else {
            modelRef.current.material.dispose()
          }
        }
      }

      renderer.dispose()
    }
  }, [selectedCompanion])

  // Meeting timer
  useEffect(() => {
    let interval

    if (isListening && !isPaused) {
      interval = setInterval(() => {
        setMeetingDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isListening, isPaused])

  // Load mock data
  useEffect(() => {
    setTranscript(mockTranscript)
    setInsights(mockInsights)

    // Add initial companion message
    setMessages([
      {
        id: 1,
        sender: "companion",
        text: `Hi there! I'm ${selectedCompanion?.name || "your companion"}. I'll assist you during this meeting by taking notes, identifying key points, and answering any questions you might have.`,
        timestamp: new Date(),
      },
    ])
  }, [selectedCompanion])

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle listening state
  const toggleListening = () => {
    if (isPaused) {
      setIsPaused(false)
    }
    setIsListening(!isListening)

    // If starting to listen, add a system message
    if (!isListening) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "system",
          text: "Meeting recording started. I'm listening and taking notes.",
          timestamp: new Date(),
        },
      ])

      // Simulate receiving transcript after a delay
      setTimeout(() => {
        setTranscript(mockTranscript)
      }, 3000)
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "system",
          text: "Meeting recording stopped.",
          timestamp: new Date(),
        },
      ])
    }
  }

  // Toggle pause state
  const togglePause = () => {
    setIsPaused(!isPaused)

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "system",
        text: isPaused ? "Meeting recording resumed." : "Meeting recording paused.",
        timestamp: new Date(),
      },
    ])
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate companion response
    setTimeout(() => {
      const companionMessage = {
        id: Date.now() + 1,
        sender: "companion",
        text: getCompanionResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, companionMessage])
    }, 1000)
  }

  // Simple response generation - replace with actual AI integration
  const getCompanionResponse = (userInput) => {
    const userInputLower = userInput.toLowerCase()

    if (userInputLower.includes("summary") || userInputLower.includes("summarize")) {
      return "Based on the meeting so far, the team is discussing user onboarding improvements. The main pain points are the payment information page and preference selection screens, which have high drop-off rates of approximately 23%."
    } else if (userInputLower.includes("action") || userInputLower.includes("task")) {
      return "I've identified one action item so far: Review the payment information page design to reduce drop-off rates."
    } else if (userInputLower.includes("question") || userInputLower.includes("asked")) {
      return "You asked: 'What specific screens have the highest drop-off rates?' Sarah answered that they are the payment information page and preference selection screens."
    } else {
      return `I'm here to help with your meeting. I can summarize key points, track action items, or answer questions about what's been discussed.`
    }
  }

  // Get insight icon based on type
  const getInsightIcon = (type) => {
    switch (type) {
      case "key_point":
        return <Sparkles className="w-4 h-4 text-yellow-400" />
      case "action_item":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case "question":
        return <AlertCircle className="w-4 h-4 text-blue-400" />
      default:
        return <Bookmark className="w-4 h-4 text-gray-400" />
    }
  }

  // Get insight label based on type
  const getInsightLabel = (type) => {
    switch (type) {
      case "key_point":
        return "Key Point"
      case "action_item":
        return "Action Item"
      case "question":
        return "Question"
      default:
        return "Note"
    }
  }

  return (
    <div
      className={`fixed ${isExpanded ? "inset-0" : "bottom-4 right-4"} flex flex-col bg-black/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out z-50`}
      style={{
        width: isExpanded ? "100%" : isSidebarOpen ? "800px" : "400px",
        height: isExpanded ? "100%" : "600px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            {selectedCompanion?.name?.charAt(0) || "C"}
          </div>
          <div>
            <h3 className="font-medium text-white">
              {selectedCompanion?.name || "Companion"}
              <span className="ml-2 text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">AI Assistant</span>
            </h3>
            <div className="flex items-center text-xs text-white/60">
              <Clock className="w-3 h-3 mr-1" />
              <span>{formatTime(meetingDuration)}</span>
              {isListening && !isPaused && (
                <span className="ml-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-1 animate-pulse"></span>
                  Recording
                </span>
              )}
              {isPaused && (
                <span className="ml-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                  Paused
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`p-2 rounded-full ${isListening ? "bg-red-500/20 text-red-500" : "bg-primary/20 text-primary"} hover:bg-opacity-30 transition-colors`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {isListening && (
            <button
              onClick={togglePause}
              className={`p-2 rounded-full ${isPaused ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"} hover:bg-opacity-30 transition-colors`}
            >
              <PauseCircle className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
          >
            {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* 3D Companion */}
        <div
          ref={companionContainerRef}
          className={`relative ${isSidebarOpen ? "w-1/3" : "w-full"} h-full bg-gradient-to-b from-black/30 to-black/10 transition-all duration-300`}
        >
          {/* Toggle sidebar button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10 p-1 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
          >
            {isSidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Sidebar with tabs */}
        {isSidebarOpen && (
          <div className="w-2/3 flex flex-col bg-black/10">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-4 py-3 text-sm font-medium ${activeTab === "chat" ? "text-primary border-b-2 border-primary" : "text-white/60 hover:text-white/80"}`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </div>
              </button>

              <button
                onClick={() => setActiveTab("transcript")}
                className={`px-4 py-3 text-sm font-medium ${activeTab === "transcript" ? "text-primary border-b-2 border-primary" : "text-white/60 hover:text-white/80"}`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Transcript
                </div>
              </button>

              <button
                onClick={() => setActiveTab("insights")}
                className={`px-4 py-3 text-sm font-medium ${activeTab === "insights" ? "text-primary border-b-2 border-primary" : "text-white/60 hover:text-white/80"}`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Insights
                  {insights.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                      {insights.length}
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {activeTab === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-primary text-white"
                              : message.sender === "system"
                                ? "bg-gray-500/20 text-white/80 text-sm italic"
                                : "bg-white/10 text-white"
                          }`}
                        >
                          {message.text}
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </motion.div>
                )}

                {activeTab === "transcript" && (
                  <motion.div
                    key="transcript"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {transcript.length === 0 ? (
                      <div className="text-center py-8 text-white/60">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Transcript will appear here once the meeting starts.</p>
                      </div>
                    ) : (
                      transcript.map((entry) => (
                        <div key={entry.id} className="flex gap-3">
                          <div className="flex-shrink-0 w-16 text-xs text-white/60">{entry.time}</div>
                          <div className="flex-1">
                            <div className="font-medium text-white/80">{entry.speaker}</div>
                            <div className="text-white">{entry.text}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}

                {activeTab === "insights" && (
                  <motion.div
                    key="insights"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {insights.length === 0 ? (
                      <div className="text-center py-8 text-white/60">
                        <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Insights will be extracted as the meeting progresses.</p>
                      </div>
                    ) : (
                      insights.map((insight) => (
                        <div
                          key={insight.id}
                          className="bg-white/5 rounded-lg p-3 border-l-2"
                          style={{
                            borderLeftColor:
                              insight.type === "key_point"
                                ? "#FBBF24"
                                : insight.type === "action_item"
                                  ? "#34D399"
                                  : insight.type === "question"
                                    ? "#60A5FA"
                                    : "#9CA3AF",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {getInsightIcon(insight.type)}
                            <span className="text-xs font-medium text-white/80">{getInsightLabel(insight.type)}</span>
                            <span className="text-xs text-white/60 ml-auto">{insight.time}</span>
                          </div>
                          <p className="text-white">{insight.text}</p>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input area (only in chat tab) */}
            {activeTab === "chat" && (
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask your companion a question..."
                    className="flex-1 bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MeetingCompanion

