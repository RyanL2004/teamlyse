"use client"
import { FaHome, FaChevronRight } from "react-icons/fa";
import { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, PresentationControls, useGLTF, MeshReflectorMaterial, Sparkles } from "@react-three/drei";
import { ChevronLeft, ChevronRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import createHollowKnight from "../../pages/3DAnimatedCharacter";
import { AppSidebar } from "../app-sidebar";
import { Link } from "react-router-dom";

const hollowKnight = createHollowKnight();

// For now, using a static companions array.
// In future, you will fetch these from your backend.
const companions = [
  {
    id: 1,
    name: "Fox",
    species: "Vulpes",
    personality: "Clever & Witty",
    description: "A quick-thinking companion with a sharp sense of humor and problem-solving abilities.",
    model: hollowKnight,
    scale: 1,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 2, 0],
    color: "#ff6b35",
  },
  {
    id: 2,
    name: "Owl",
    species: "Strigiformes",
    personality: "Wise & Observant",
    description: "A knowledgeable companion who provides thoughtful insights and careful analysis.",
    model: hollowKnight,
    scale: 1,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 2, 0],
    color: "#8c5e58",
  },
  {
    id: 3,
    name: "Cat",
    species: "Felis catus",
    personality: "Curious & Independent",
    description: "A self-assured companion with a playful spirit and independent mindset.",
    model: hollowKnight,
    scale: 1,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 3, 0],
    color: "#4a6fa5",
  },
  {
    id: 4,
    name: "Rabbit",
    species: "Leporidae",
    personality: "Energetic & Friendly",
    description: "A lively companion who brings enthusiasm and warmth to every conversation.",
    model: hollowKnight,
    scale: 1,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 6, 0],
    color: "#9b72aa",
  },
  {
    id: 5,
    name: "Baby Kangaroo",
    species: "Macropodidae",
    personality: "Adventurous & Supportive",
    description: "A companion who helps you leap forward with confidence and adaptability.",
    model: hollowKnight,
    scale: 1,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 5, 0],
    color: "#c05746",
  },
];

function CompanionModel({ companion, isActive }) {
  const modelRef = useRef();
  // Memoize cloning the model to avoid doing it repeatedly
  const sceneObject = useMemo(() => {
    if (companion.model) {
      return companion.model.clone();
    } else if (companion.modelPath) {
      const { scene } = useGLTF(companion.modelPath);
      return scene.clone();
    }
    return null;
  }, [companion.model, companion.modelPath]);

  useEffect(() => {
    if (sceneObject) {
      sceneObject.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(companion.color);
        }
      });
    }
  }, [sceneObject, companion.color]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        companion.position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
      if (isActive) {
        modelRef.current.rotation.y += delta * 0.3;
      }
    }
  });

  return (
    <group
      ref={modelRef}
      position={companion.position}
      rotation={companion.rotation}
      scale={[companion.scale, companion.scale, companion.scale]}
    >
      {sceneObject && <primitive object={sceneObject} />}
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        metalness={0.5}
      />
    </mesh>
  );
}

function CompanionCard({ companion, isSelected }) {
  return (
    <Card className={`w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all duration-300 ${isSelected ? "ring-2 ring-offset-2 ring-offset-black ring-primary" : ""}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold" style={{ color: companion.color }}>{companion.name}</h3>
          <Badge variant="outline" className="bg-black/30 text-white border-white/20">{companion.species}</Badge>
        </div>
        <div className="mb-4">
          <Badge className="mb-2" style={{ backgroundColor: companion.color }}>{companion.personality}</Badge>
          <p className="text-sm text-white/70 mt-2">{companion.description}</p>
        </div>
        {isSelected && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-primary-foreground flex items-center gap-2">
            <Check size={16} /> Selected as your meeting companion
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

export default function CompanionSelection({ onSelectCompanion }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();
  const currentCompanion = companions[currentIndex];

  const handlePrevious = () => setCurrentIndex((prev) => (prev === 0 ? companions.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === companions.length - 1 ? 0 : prev + 1));
  const handleSelect = () => {
    setSelectedCompanion(currentCompanion);
    if (onSelectCompanion) onSelectCompanion(currentCompanion);
  };
  const toggleAutoRotate = () => setAutoRotate(!autoRotate);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Enter") handleSelect();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header with breadcrumb stays at the top */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4 rounded-lg">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="flex items-center">
                  <FaHome className="text-white" />
                  <BreadcrumbLink asChild className="ml-2 hover:text-gray-100 transition">
                    <Link to="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <FaChevronRight className="text-gray-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>AI Companion Selection</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main content split into two columns */}
        <div className="flex h-[calc(100vh-4rem)] bg-black text-white overflow-hidden">
          {/* Left column: 3D Canvas */}
          <div className="w-1/2 relative">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
              <color attach="background" args={["#050505"]} />
              <fog attach="fog" args={["#050505", 5, 20]} />
              <ambientLight intensity={0.5} />
              <spotLight
                position={[5, 10, 7.5]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
                color={currentCompanion.color}
              />
              <pointLight position={[-5, 5, -2]} intensity={0.5} color="#ffffff" />
              <Suspense fallback={null}>
                <PresentationControls
                  global
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                  config={{ mass: 2, tension: 400 }}
                  snap={{ mass: 4, tension: 300 }}
                >
                  {companions.map((companion, index) => (
                    <group key={companion.id} visible={index === currentIndex}>
                      <CompanionModel companion={companion} isActive={index === currentIndex} />
                    </group>
                  ))}
                </PresentationControls>
                <Floor />
                <Sparkles count={200} scale={10} size={4} speed={0.3} opacity={0.2} color={currentCompanion.color} />
                <Environment preset="city" />
                <OrbitControls
                  ref={controlsRef}
                  autoRotate={autoRotate}
                  autoRotateSpeed={1}
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 2}
                />
              </Suspense>
            </Canvas>
            {/* Optional: You can also add auto-rotate toggle control over the Canvas */}
            <div className="absolute bottom-4 right-4 z-20">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-black/30 border-white/10 hover:bg-black/50" onClick={toggleAutoRotate}>
                      <RotateCcw size={18} className={autoRotate ? "text-primary" : "text-white/70"} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{autoRotate ? "Disable" : "Enable"} auto-rotation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Right column: Text header, card, and navigation controls */}
          <div className="w-1/2 flex flex-col justify-start p-8 overflow-y-auto items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 text-center">
                Choose your companion!
              </h1>
              <p className="text-center text-white/60 pt-10">
                Select a digital companion to join your meetings and enhance your virtual experience.
              </p>
            </motion.div>
            
            <div className="mb-8">
              <CompanionCard companion={currentCompanion} isSelected={selectedCompanion?.id === currentCompanion.id} />
            </div>
            <div className="flex items-center gap-6">
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-black/30 border-white/10 hover:bg-black/50" onClick={handlePrevious}>
                <ChevronLeft size={24} />
              </Button>
              <Button className="px-8 py-6 text-lg font-medium rounded-full shadow-lg" style={{
                background: `linear-gradient(135deg, ${currentCompanion.color}, ${currentCompanion.color}99)`,
                boxShadow: `0 0 20px ${currentCompanion.color}50`
              }} onClick={handleSelect}>
                {selectedCompanion?.id === currentCompanion.id ? "Selected" : "Choose This Companion"}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-black/30 border-white/10 hover:bg-black/50" onClick={handleNext}>
                <ChevronRight size={24} />
              </Button>
            </div>
            <div className="flex justify-start mt-8 gap-2">
              {companions.map((companion, index) => (
                <Button
                  key={companion.id}
                  variant="outline"
                  size="icon"
                  className={`w-3 h-3 p-0 rounded-full ${index === currentIndex ? "bg-white border-white" : "bg-transparent border-white/30"}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            </div>
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
