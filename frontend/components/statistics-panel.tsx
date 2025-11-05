"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import LoadingSpinner from "./loading-spinner"

interface StatData {
  [key: string]: {
    mean: number
    median: number
    std: number
    min: number
    max: number
    q25: number
    q75: number
    explanation: string
  }
}

export default function StatisticsPanel() {
  const [stats, setStats] = useState<StatData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/`)
        const result = await response.json()
        setStats(result)
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <LoadingSpinner />
  if (!stats) return null

  // Limitar a las primeras 6 características para no abrumar
  const displayStats = Object.entries(stats).slice(0, 6)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {displayStats.map(([feature, data]) => (
        <Card key={feature} className="bg-card border-border p-6">
          <h3 className="font-semibold text-lg mb-4 text-foreground">{feature}</h3>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted">Media</div>
                <div className="text-lg font-bold text-primary">{data.mean.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Mediana</div>
                <div className="text-lg font-bold text-accent">{data.median.toFixed(2)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted">Mín</div>
                <div className="text-sm font-semibold">{data.min.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Máx</div>
                <div className="text-sm font-semibold">{data.max.toFixed(2)}</div>
              </div>
            </div>

            <div>
              <div className="text-xs text-muted">Desviación Estándar</div>
              <div className="text-sm font-semibold">{data.std.toFixed(2)}</div>
            </div>

            <div className="pt-3 border-t border-border/50">
              <div className="text-xs text-muted italic">{data.explanation}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
