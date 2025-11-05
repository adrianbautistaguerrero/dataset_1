"use client"

import { useState } from "react"
import HistogramChart from "./charts/histogram-chart"
import CorrelationChart from "./charts/correlation-chart"
import ProtocolDistribution from "./charts/protocol-distribution"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function VisualizationCharts() {
  const [activeTab, setActiveTab] = useState<"histogram" | "correlation" | "protocol">("histogram")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <section id="visualizations" className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Visualizaciones de Datos</h2>
        <p className="text-muted">Gráficas interactivas del análisis NSL-KDD</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("histogram")}
          className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
            activeTab === "histogram"
              ? "bg-primary text-white"
              : "bg-card border border-border text-foreground hover:border-primary"
          }`}
        >
          Distribución de Características
        </button>
        <button
          onClick={() => setActiveTab("protocol")}
          className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
            activeTab === "protocol"
              ? "bg-primary text-white"
              : "bg-card border border-border text-foreground hover:border-primary"
          }`}
        >
          Tipos de Protocolo
        </button>
        <button
          onClick={() => setActiveTab("correlation")}
          className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
            activeTab === "correlation"
              ? "bg-primary text-white"
              : "bg-card border border-border text-foreground hover:border-primary"
          }`}
        >
          Matriz de Correlación
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-lg p-8">
        {activeTab === "histogram" && <HistogramChart />}
        {activeTab === "protocol" && <ProtocolDistribution />}
        {activeTab === "correlation" && <CorrelationChart />}
      </div>
    </section>
  )
}
