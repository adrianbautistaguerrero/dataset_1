"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">NS</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">NSL-KDD Analytics</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#overview" className="text-sm hover:text-primary transition">
              Overview
            </Link>
            <Link href="#statistics" className="text-sm hover:text-primary transition">
              Estadísticas
            </Link>
            <Link href="#visualizations" className="text-sm hover:text-primary transition">
              Visualizaciones
            </Link>
            <Link href="#api" className="text-sm hover:text-primary transition">
              API
            </Link>
          </div>

          {/* Menu Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            <Link href="#overview" className="block text-sm hover:text-primary transition">
              Overview
            </Link>
            <Link href="#statistics" className="block text-sm hover:text-primary transition">
              Estadísticas
            </Link>
            <Link href="#visualizations" className="block text-sm hover:text-primary transition">
              Visualizaciones
            </Link>
            <Link href="#api" className="block text-sm hover:text-primary transition">
              API
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
