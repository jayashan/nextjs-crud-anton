"use client"

import type React from "react"

import { useState, useEffect } from "react"
//import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/dashboard/sidebar-provider"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)
  //const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{children}</main>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  )
}

