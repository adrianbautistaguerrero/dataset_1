"use client"

import { useEffect, useState } from "react"
import LoadingSpinner from "../loading-spinner"

interface CorrelationMatrix {
  [key: string]: Record<string, number>
}

interface CorrelationData {
  correlation_matrix: CorrelationMatrix
  explanation: string
}

export default function CorrelationHeatmap() {
  const [data, setData] = useState<CorrelationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/correlation-matrix/`)
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

  const features = Object.keys(data.correlation_matrix).slice(0, 8)

  const getColor = (value: number) => {
    const abs = Math.abs(value)
    if (abs > 0.8) return "bg-red-600"
    if (abs > 0.6) return "bg-orange-500"
    if (abs > 0.4) return "bg-yellow-500"
    if (abs > 0.2) return "bg-blue-500"
    return "bg-gray-700"
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-700/30 p-4 rounded-lg">
        <p className="text-sm text-muted">{data.explanation}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-border">
          <thead>
            <tr>
              <th className="bg-card border border-border p-2 text-sm">Característica</th>
              {features.map((feature) => (
                <th key={feature} className="bg-card border border-border p-2 text-xs text-center w-16">
                  {feature.substring(0, 8)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((row) => (
              <tr key={row}>
                <td className="bg-card border border-border p-2 text-sm font-semibold">{row.substring(0, 10)}</td>
                {features.map((col) => {
                  const value = data.correlation_matrix[row]?.[col] ?? 0
                  return (
                    <td
                      key={`${row}-${col}`}
                      className={`border border-border p-2 text-center text-xs font-bold text-white ${getColor(value)}`}
                      title={`Correlación: ${value.toFixed(3)}`}
                    >
                      {value.toFixed(2)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-red-600/20 border border-red-600/50 p-3 rounded text-xs">
          <div className="font-semibold">Fuerte (&gt;0.8)</div>
          <div className="text-muted">Muy correlacionada</div>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/50 p-3 rounded text-xs">
          <div className="font-semibold">Moderada (0.6-0.8)</div>
          <div className="text-muted">Correlación notable</div>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/50 p-3 rounded text-xs">
          <div className="font-semibold">Débil (0.2-0.4)</div>
          <div className="text-muted">Correlación baja</div>
        </div>
        <div className="bg-gray-700/20 border border-gray-700/50 p-3 rounded text-xs">
          <div className="font-semibold">Nula (&lt;0.2)</div>
          <div className="text-muted">Sin correlación</div>
        </div>
      </div>
    </div>
  )
}
