"use client";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import React, { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PresentationControls,
  useGLTF,
  MeshReflectorMaterial,
  Sparkles,
} from "@react-three/drei";
import { ChevronLeft, ChevronRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import createHollowKnight from "../../pages/3DAnimatedCharacter";
import { AppSidebar } from "../app-sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCompanions,
  setSelectedCompanionId,
  hydrateSelectedCompanion,
} from "@/store/companionsSlice";

export const hollowKnight = createHollowKnight();

// For now, using a static companions array.
// In future, we will fetch these from your backend.

function CompanionModel({ companion, isActive }) {
  const modelRef = useRef();

  // Memoize cloning the model to avoid doing it repeatedly
  /* const gltf = companion.modelPath ? useGLTF(companion.modelPath) : null;

  const sceneObject = useMemo(() => {
    if (companion.model) return companion.model.clone();
    else if (gltf) return gltf.scene.clone();
    return null;
  }, [companion.model, gltf]);
  */

  //Use memoized model only if its a local imported model 
  const sceneObject = useMemo(() => {
    // Check the modelUrl to inject the appropriate local model
    if (companion.modelUrl === "hollowKnight") {
      return  createHollowKnight().clone();
    }
    return null;
  }, [companion.modelUrl]);

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
        blur={[100, 30]} // much lower blur
        resolution={512} // down from 2048!
        mixBlur={0.3}
        mixStrength={20}
        roughness={1}
        depthScale={0.5}
        minDepthThreshold={0.1}
        maxDepthThreshold={1}
        color="#050505"
        metalness={0.3}
      />
    </mesh>
  );
}

function CompanionCard({ companion, isSelected }) {
  return (
    <Card
      className={`w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all duration-300 ${
        isSelected ? "ring-2 ring-offset-2 ring-offset-black ring-primary" : ""
      }`}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold" style={{ color: companion.color }}>
            {companion.name}
          </h3>
          <Badge
            variant="outline"
            className="bg-black/30 text-white border-white/20"
          >
            {companion.species}
          </Badge>
        </div>
        <div className="mb-4">
          <Badge className="mb-2" style={{ backgroundColor: companion.color }}>
            {companion.personality}
          </Badge>
          <p className="text-sm text-white/70 mt-2">{companion.description}</p>
        </div>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-neutral-600 flex items-center gap-2"
          >
            <Check size={16} className="text-neutral-400"  /> Selected as your meeting companion
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

export default function CompanionSelection({ onSelectCompanion }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { companionsList, loading, error } = useSelector(
    (state) => state.companions
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();

  const selectedCompanionId = useSelector(
    (state) => state.companions.selectedCompanionId
  );

  //Load companions from the store
  useEffect(() => {
    if (!companionsList.length) {
      dispatch(loadCompanions());
    }
  }, [companionsList, dispatch]);

  //Rehydrate the selected companion Redux when the component mounts
  useEffect(() => {
    dispatch(hydrateSelectedCompanion());
  }, [dispatch]);

  const companions = companionsList || [];
  const currentCompanion = companions[currentIndex];

  const handlePrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? companions.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === companions.length - 1 ? 0 : prev + 1));

  const handleSelect = () => {
    if (currentCompanion) {
      console.log("Selected Companion:", currentCompanion._id);
      // Save the selected companion's ID to Redux
      dispatch(setSelectedCompanionId(currentCompanion._id));
      localStorage.setItem("selectedCompanionId", currentCompanion._id);      
      // Optionally, navigate back to the meeting creation route
      // Here we assume the meeting form is part of the calendar route
      navigate("/calendar", {
        state: { 
          selectedCompanion: currentCompanion,
          resumeForm: true,
         },
      });
    }
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

  if (loading)
    return <div className="p-4 text-white">Loading your companions...</div>;
  if (error) return <div className="p-4 text-red-400">Error: {error}</div>;
  if (!currentCompanion)
    return (
      <div className="p-4 text-white">
        No companions available, consider upgrading !
      </div>
    );

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
                  <BreadcrumbLink
                    asChild
                    className="ml-2 hover:text-gray-100 transition"
                  >
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
            <React.Profiler
              id="CanvasProfiler"
              onRender={(...args) => console.log(args)}
            >
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
                <pointLight
                  position={[-5, 5, -2]}
                  intensity={0.5}
                  color="#ffffff"
                />
                <Suspense fallback={null}>
                  <PresentationControls
                    global
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 4, tension: 300 }}
                  >
                    {currentCompanion && (
                      <CompanionModel companion={currentCompanion} isActive />
                    )}
                  </PresentationControls>
                  <Floor />
                  <Sparkles
                    count={200}
                    scale={10}
                    size={4}
                    speed={0.3}
                    opacity={0.2}
                    color={currentCompanion.color}
                  />
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
            </React.Profiler>
            {/* Optional: You can also add auto-rotate toggle control over the Canvas */}
            <div className="absolute bottom-4 right-4 z-20">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-black/30 border-white/10 hover:bg-black/50"
                      onClick={toggleAutoRotate}
                    >
                      <RotateCcw
                        size={18}
                        className={
                          autoRotate ? "text-primary" : "text-white/70"
                        }
                      />
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
            {currentCompanion && (
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
                  Select a digital companion to join your meetings and enhance
                  your virtual experience.
                </p>
              </motion.div>
            )}

            <div className="mb-8">
              <CompanionCard
                companion={currentCompanion}
                isSelected={selectedCompanionId === currentCompanion._id}
              />
            </div>
            <div className="flex items-center gap-6">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-black/30 border-white/10 hover:bg-black/50"
                onClick={handlePrevious}
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                className="px-8 py-6 text-lg font-medium rounded-full shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${currentCompanion.color}, ${currentCompanion.color}99)`,
                  boxShadow: `0 0 20px ${currentCompanion.color}50`,
                }}
                onClick={handleSelect}
              >
                {selectedCompanionId === currentCompanion._id
                  ? "Selected"
                  : "Choose This Companion"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-black/30 border-white/10 hover:bg-black/50"
                onClick={handleNext}
              >
                <ChevronRight size={24} />
              </Button>
            </div>
            <div className="flex justify-start mt-8 gap-2">
              {companions.map((companion, index) => (
                <Button
                  key={companion.id}
                  variant="outline"
                  size="icon"
                  className={`w-3 h-3 p-0 rounded-full ${
                    index === currentIndex
                      ? "bg-white border-white"
                      : "bg-transparent border-white/30"
                  }`}
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
