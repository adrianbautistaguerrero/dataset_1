"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card } from "@/components/ui/card"
import LoadingSpinner from "./loading-spinner"

interface MetricsData {
  expected_metrics: {
    accuracy: number
    precision: number
    recall: number
    f1_score: number
  }
  explanation: string
  dataset_characteristics: {
    imbalanced: boolean
    challenge: string
    real_world: string
  }
}

export default function ModelMetrics() {
  const [data, setData] = useState<MetricsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/model-metrics/`)
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

  const metricsData = Object.entries(data.expected_metrics).map(([name, value]) => ({
    name:
      name === "accuracy" ? "Accuracy" : name === "precision" ? "Precisión" : name === "recall" ? "Recall" : "F1-Score",
    value: (value * 100).toFixed(1),
    full: value,
  }))

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-700/30 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Explicación de Métricas</h3>
        <p className="text-sm text-muted mb-4">{data.explanation}</p>

        <div className="space-y-2 text-sm">
          <div>
            <strong>Accuracy (Exactitud):</strong> Proporción total de predicciones correctas. Métrica general de
            desempeño.
          </div>
          <div>
            <strong>Precision (Precisión):</strong> De las anomalías que detectamos, cuántas son realmente ataques.
            Importa cuando falsos positivos son costosos.
          </div>
          <div>
            <strong>Recall (Sensibilidad):</strong> De todos los ataques reales, cuántos logramos detectar. Crítico en
            seguridad - queremos detectar la mayoría.
          </div>
          <div>
            <strong>F1-Score:</strong> Media armónica de Precision y Recall. Buen balance entre ambas métricas.
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={metricsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="name" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{ backgroundColor: "#1a1f3a", border: "1px solid #2d3748" }}
          />
          <Bar dataKey="value" fill="#3b82f6">
            {metricsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, idx) => (
          <Card key={idx} className="bg-card border-border p-4">
            <div className="text-sm text-muted mb-2">{metric.name}</div>
            <div className="text-3xl font-bold text-primary">{metric.value}%</div>
            <div className="w-full bg-muted/20 rounded-full h-2 mt-3">
              <div className="bg-primary h-full rounded-full" style={{ width: `${metric.value}%` }} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border p-6">
        <h3 className="font-semibold mb-4">Características del Dataset</h3>
        <div className="space-y-3">
          <div>
            <span className="text-muted">Desbalanceado: </span>
            <span className="text-foreground font-semibold">
              {data.dataset_characteristics.imbalanced ? "Sí" : "No"}
            </span>
            <p className="text-sm text-muted mt-1">{data.dataset_characteristics.challenge}</p>
          </div>
          <div>
            <span className="text-muted">Datos Reales: </span>
            <p className="text-sm text-foreground mt-1">{data.dataset_characteristics.real_world}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
