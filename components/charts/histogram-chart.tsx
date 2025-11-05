"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface HistogramData {
  name: string
  value: number
}

export default function HistogramChart() {
  const [data, setData] = useState<HistogramData[]>([
    { name: "TCP", value: 45000 },
    { name: "UDP", value: 35000 },
    { name: "ICMP", value: 25000 },
    { name: "Other", value: 20973 },
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistogram = async () => {
      try {
        const response = await fetch(`${API_URL}/api/histogram-data/`)
        if (response.ok) {
          const result = await response.json()
          const chartData = Object.entries(result)
            .slice(0, 8)
            .map(([name, value]: [string, any]) => ({
              name: name.replace(/_/g, " "),
              value: typeof value === "number" ? value : 0,
            }))
          setData(chartData)
        }
      } catch (err) {
        console.log("Using default histogram data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistogram()
  }, [])

  return (
    <div className="w-full h-96">
      {isLoading ? (
        <div className="flex items-center justify-center h-full text-muted">Cargando gráfica...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted)" />
            <YAxis stroke="var(--color-muted)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
