"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

type SidebarContextType = {
  isOpen: boolean
  toggle: () => void
  isMobile: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)

  // Update sidebar state when screen size changes
  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  const toggle = () => setIsOpen((prev) => !prev)

  return <SidebarContext.Provider value={{ isOpen, toggle, isMobile }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

