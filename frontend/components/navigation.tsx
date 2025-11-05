"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          NSL-KDD Analytics
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`${isOpen ? "block" : "hidden"} md:flex gap-8 absolute md:static top-16 left-0 right-0 md:top-auto bg-card md:bg-transparent p-4 md:p-0 border-b md:border-b-0 border-border`}
        >
          <a href="#dataset" className="hover:text-primary transition">
            Dataset
          </a>
          <a href="#estadisticas" className="hover:text-primary transition">
            Estadísticas
          </a>
          <a href="#anomalias" className="hover:text-primary transition">
            Anomalías
          </a>
          <a href="#metricas" className="hover:text-primary transition">
            Métricas
          </a>
        </div>
      </div>
    </nav>
  )
}
