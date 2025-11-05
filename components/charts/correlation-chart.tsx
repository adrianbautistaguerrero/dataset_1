"use client"

import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function CorrelationChart() {
  const [correlationData, setCorrelationData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [correlationStats, setCorrelationStats] = useState<any>(null)

  useEffect(() => {
    const fetchCorrelation = async () => {
      try {
        const response = await fetch(`${API_URL}/api/correlation-analysis/`)
        if (response.ok) {
          const result = await response.json()
          setCorrelationStats(result)
        }
      } catch (err) {
        console.log("Error loading correlation data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCorrelation()
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-500/30 text-blue-200 p-4 rounded-lg">
        <p className="text-sm">
          <strong>Matriz de Correlación:</strong> Muestra las relaciones lineales entre las características del dataset.
          Valores cercanos a 1 o -1 indican correlación fuerte.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96 text-muted">Calculando matriz de correlación...</div>
      ) : correlationStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Correlaciones Más Fuertes Positivas</h4>
            <div className="space-y-2">
              {correlationStats.top_positive?.slice(0, 5).map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-green-900/20 rounded border border-green-500/30"
                >
                  <span className="text-sm text-foreground">{item.pair}</span>
                  <span className="text-sm font-bold text-green-400">{item.correlation.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Correlaciones Más Fuertes Negativas</h4>
            <div className="space-y-2">
              {correlationStats.top_negative?.slice(0, 5).map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-red-900/20 rounded border border-red-500/30"
                >
                  <span className="text-sm text-foreground">{item.pair}</span>
                  <span className="text-sm font-bold text-red-400">{item.correlation.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-warning/20 border border-warning/50 text-warning p-4 rounded-lg">
          No hay datos de correlación disponibles en este momento.
        </div>
      )}
    </div>
  )
}
