"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Home, Settings, User, Menu, X , ArchiveRestore} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon:  ArchiveRestore,
  },
  
]


export function DashboardSidebar() {
  const { isOpen, toggle, isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={toggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-transform duration-300 ease-in-out",
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : isOpen
              ? "translate-x-0 md:sticky md:top-0"
              : "-translate-x-full md:sticky md:top-0 md:w-16 md:translate-x-0",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            {isOpen || isMobile ? "Dashboard App" : null}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className={cn("md:hidden", !isMobile && !isOpen && "md:flex")}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                  !isOpen && !isMobile && "justify-center px-0",
                )}
              >
                <item.icon size={20} />
                {(isOpen || isMobile) && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}

