"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import LoadingSpinner from "../loading-spinner"

interface DistributionData {
  [key: string]: {
    values: number[]
    bins: number[]
    count: number
    explanation: string
  }
}

export default function FeatureDistributions() {
  const [distributions, setDistributions] = useState<DistributionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feature-distributions/`)
        const result = await response.json()
        setDistributions(result)
        setSelectedFeature(Object.keys(result)[0])
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <LoadingSpinner />
  if (!distributions) return null

  const currentFeature = selectedFeature ? distributions[selectedFeature] : null

  if (!currentFeature) return null

  const chartData = currentFeature.values.map((value, idx) => ({
    name: `Bin ${idx + 1}`,
    frequency: value,
    range: `${currentFeature.bins[idx].toFixed(1)}-${currentFeature.bins[idx + 1].toFixed(1)}`,
  }))

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border p-4">
        <label className="text-sm text-muted">Seleccionar Característica</label>
        <select
          value={selectedFeature || ""}
          onChange={(e) => setSelectedFeature(e.target.value)}
          className="w-full mt-2 bg-background border border-border rounded px-3 py-2 text-foreground"
        >
          {Object.keys(distributions).map((feature) => (
            <option key={feature} value={feature}>
              {feature}
            </option>
          ))}
        </select>
      </Card>

      <div className="bg-blue-900/20 border border-blue-700/30 p-4 rounded-lg">
        <p className="text-sm text-muted">{currentFeature.explanation}</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="name" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1a1f3a", border: "1px solid #2d3748" }}
            formatter={(value) => [`${value} registros`, "Frecuencia"]}
            labelFormatter={(label) => `${label}`}
          />
          <Bar dataKey="frequency" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>

      <Card className="bg-card border-border p-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-muted">Total de Registros</div>
            <div className="text-2xl font-bold text-primary">{currentFeature.count.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted">Bins</div>
            <div className="text-2xl font-bold text-accent">{currentFeature.values.length}</div>
          </div>
          <div>
            <div className="text-xs text-muted">Rango</div>
            <div className="text-sm font-semibold">
              {currentFeature.bins[0].toFixed(1)} - {currentFeature.bins[currentFeature.bins.length - 1].toFixed(1)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
