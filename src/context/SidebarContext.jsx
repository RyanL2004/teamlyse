import { createContext, useContext, useState } from "react";

// Create Context
const SidebarContext = createContext();

// Context Provider
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom Hook to use Context
export const useSidebar = () => useContext(SidebarContext);
