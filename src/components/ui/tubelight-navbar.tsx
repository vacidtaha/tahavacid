"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, User, FolderOpen, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: string
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

const iconMap = {
  Home,
  User,
  FolderOpen,
  Mail,
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  return (
    <div
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50",
        className,
      )}
    >
      <div 
        className="flex items-center gap-3 bg-black/30 border border-white/20 py-1 px-1 shadow-lg"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '8px',
        }}
      >
        {items.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap]
          const isActive = activeTab === item.name
          const isHovered = hoveredTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 transition-all duration-300",
                "text-white",
                isHovered && !isActive && "text-white/90 scale-105",
                isActive && "bg-white/15",
              )}
              style={{
                borderRadius: '6px',
              }}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <IconComponent size={18} strokeWidth={2.5} />
              </span>
              
              {/* Active state background */}
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/30 -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    borderRadius: '6px',
                  }}
                />
              )}
              
              {/* Hover state background */}
              {isHovered && !isActive && (
                <motion.div
                  className="absolute inset-0 w-full bg-white/10 -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                  style={{
                    borderRadius: '6px',
                  }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
