"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import LoadingSpinner from "../loading-spinner"

interface ClassDistributionData {
  distribution: Record<string, number>
  percentages: Record<string, number>
  total_records: number
  explanation: string
}

export default function ClassDistributionChart() {
  const [data, setData] = useState<ClassDistributionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/class-distribution/`)
        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <LoadingSpinner />
  if (!data) return null

  const chartData = Object.entries(data.distribution).map(([name, value]) => ({
    name: name === "normal" ? "Normal (Legítimas)" : "Anomalía (Ataques)",
    value,
    percentage: data.percentages[name],
  }))

  const COLORS = ["#10b981", "#ef4444"]

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-700/30 p-4 rounded-lg">
        <p className="text-sm text-muted">{data.explanation}</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4">
        {chartData.map((item, idx) => (
          <div key={idx} className="bg-card border border-border p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
              <span className="font-semibold">{item.name}</span>
            </div>
            <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
            <div className="text-sm text-muted">{item.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
