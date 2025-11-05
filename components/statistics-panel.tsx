"use client"

import { useEffect, useState } from "react"

interface ClassDistribution {
  normal: number
  anomaly: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function StatisticsPanel() {
  const [distribution, setDistribution] = useState<ClassDistribution>({
    normal: 67343,
    anomaly: 58630,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const response = await fetch(`${API_URL}/api/class-distribution/`)
        if (response.ok) {
          const data = await response.json()
          setDistribution({
            normal: data.normal_class || 67343,
            anomaly: data.anomaly_class || 58630,
          })
        }
      } catch (err) {
        console.log("Using default distribution data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDistribution()
  }, [])

  const total = distribution.normal + distribution.anomaly
  const normalPercentage = (distribution.normal / total) * 100
  const anomalyPercentage = (distribution.anomaly / total) * 100

  return (
    <section id="statistics" className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Estadísticas Clave</h2>
        <p className="text-muted">Distribución y análisis de las clases del dataset</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribución de Clases */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-6">Distribución de Clases</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground font-semibold">Conexiones Normales</span>
                <span className="text-accent font-bold">{normalPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-500"
                  style={{ width: `${normalPercentage}%` }}
                />
              </div>
              <p className="text-sm text-muted mt-1">{distribution.normal.toLocaleString()} registros</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground font-semibold">Anomalías</span>
                <span className="text-error font-bold">{anomalyPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                <div
                  className="bg-error h-full transition-all duration-500"
                  style={{ width: `${anomalyPercentage}%` }}
                />
              </div>
              <p className="text-sm text-muted mt-1">{distribution.anomaly.toLocaleString()} registros</p>
            </div>
          </div>
        </div>

        {/* Características del Dataset */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-6">Características del Dataset</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <div>
                <p className="font-semibold">42 Características</p>
                <p className="text-muted text-xs">Atributos de conexión y estadísticas de red</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <div>
                <p className="font-semibold">125,973 Registros Totales</p>
                <p className="text-muted text-xs">Conexiones de red etiquetadas y verificadas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <div>
                <p className="font-semibold">2 Clases de Salida</p>
                <p className="text-muted text-xs">Normal vs Anomalía (ataque)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <div>
                <p className="font-semibold">Mejora sobre KDD'99</p>
                <p className="text-muted text-xs">Datos más limpios y representativos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
