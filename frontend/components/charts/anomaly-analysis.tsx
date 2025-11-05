"use client"
////
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import LoadingSpinner from "../loading-spinner"

interface AnomalyData {
  comparison: Record<
    string,
    {
      normal_mean: number
      anomaly_mean: number
      difference: number
      explanation: string
    }
  >
  normal_count: number
  anomaly_count: number
  explanation: string
}

export default function AnomalyAnalysis() {
  const [data, setData] = useState<AnomalyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anomaly-analysis/`)
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

  const chartData = Object.entries(data.comparison).map(([feature, stats]) => ({
    name: feature.substring(0, 12),
    normal: Number.parseFloat(stats.normal_mean.toFixed(2)),
    anomaly: Number.parseFloat(stats.anomaly_mean.toFixed(2)),
  }))

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-700/30 p-4 rounded-lg">
        <p className="text-sm text-muted">{data.explanation}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card border-border p-6">
          <div className="text-sm text-muted mb-2">Conexiones Normales</div>
          <div className="text-3xl font-bold text-green-500">{data.normal_count.toLocaleString()}</div>
          <div className="text-xs text-muted mt-2">Conexiones legítimas (67%)</div>
        </Card>
        <Card className="bg-card border-border p-6">
          <div className="text-sm text-muted mb-2">Anomalías/Ataques</div>
          <div className="text-3xl font-bold text-red-500">{data.anomaly_count.toLocaleString()}</div>
          <div className="text-xs text-muted mt-2">Conexiones con intrusiones (33%)</div>
        </Card>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="name" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip contentStyle={{ backgroundColor: "#1a1f3a", border: "1px solid #2d3748" }} />
          <Legend />
          <Bar dataKey="normal" fill="#10b981" name="Normal" />
          <Bar dataKey="anomaly" fill="#ef4444" name="Anomalía" />
        </BarChart>
      </ResponsiveContainer>

      <Card className="bg-card border-border p-6">
        <h3 className="font-semibold mb-4">Interpretación</h3>
        <div className="space-y-3 text-sm text-muted">
          <div>
            <strong className="text-foreground">Diferencias significativas:</strong> Cuando la media de una
            característica es muy diferente entre conexiones normales y anómalas, puede ser un buen indicador para
            detectar ataques.
          </div>
          <div>
            <strong className="text-foreground">Patrones de ataque:</strong> Los atacantes suelen mostrar
            comportamientos diferentes en bytes transferidos, duración de conexión, tasas de error, etc.
          </div>
          <div>
            <strong className="text-foreground">Uso en modelos ML:</strong> Los modelos de machine learning usan estas
            diferencias para clasificar automáticamente si una conexión es normal o un intento de ataque.
          </div>
        </div>
      </Card>
    </div>
  )
}
