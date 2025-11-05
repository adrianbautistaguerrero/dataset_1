"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface ProtocolData {
  name: string
  value: number
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function ProtocolDistribution() {
  const [data, setData] = useState<ProtocolData[]>([
    { name: "TCP", value: 68234 },
    { name: "UDP", value: 44526 },
    { name: "ICMP", value: 12500 },
    { name: "Other", value: 713 },
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await fetch(`${API_URL}/api/protocol-distribution/`)
        if (response.ok) {
          const result = await response.json()
          const protocolData = result.protocol_type
            ? Object.entries(result.protocol_type).map(([name, value]: [string, any]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                value: typeof value === "number" ? value : 0,
              }))
            : data
          setData(protocolData)
        }
      } catch (err) {
        console.log("Using default protocol data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProtocols()
  }, [])

  return (
    <div className="w-full h-96">
      {isLoading ? (
        <div className="flex items-center justify-center h-full text-muted">Cargando gráfica...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
