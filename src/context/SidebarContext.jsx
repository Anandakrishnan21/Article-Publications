"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext(null);

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null) throw new Error("Cannot use outside of SidebarProvider");

  return value;
}

export function SidebarProvider({ children }) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggleSidebar() {
    if (!isScreenSmall()) {
      setIsLargeOpen((l) => !l);
    }else{
      setIsSmallOpen((s) => !s);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggleSidebar,
        close
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
