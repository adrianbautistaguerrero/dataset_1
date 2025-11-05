"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import LoadingSpinner from "./loading-spinner"

interface OverviewData {
  total_records: number
  total_features: number
  numeric_features: number
  categorical_features: number
  dataset_description: string
}

export default function OverviewCards() {
  const [data, setData] = useState<OverviewData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/overview/`)
        if (!response.ok) throw new Error("Error cargando datos")
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-destructive">{error}</div>
  if (!data) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-card border-border p-6">
        <div className="text-sm text-muted mb-2">Total de Registros</div>
        <div className="text-3xl font-bold text-primary">{data.total_records.toLocaleString()}</div>
        <div className="text-xs text-muted mt-2">Conexiones de red analizadas</div>
      </Card>

      <Card className="bg-card border-border p-6">
        <div className="text-sm text-muted mb-2">Características Totales</div>
        <div className="text-3xl font-bold text-accent">{data.total_features}</div>
        <div className="text-xs text-muted mt-2">Variables de análisis</div>
      </Card>

      <Card className="bg-card border-border p-6">
        <div className="text-sm text-muted mb-2">Características Numéricas</div>
        <div className="text-3xl font-bold text-chart-1">{data.numeric_features}</div>
        <div className="text-xs text-muted mt-2">Métricas cuantitativas</div>
      </Card>

      <Card className="bg-card border-border p-6">
        <div className="text-sm text-muted mb-2">Características Categóricas</div>
        <div className="text-3xl font-bold text-chart-2">{data.categorical_features}</div>
        <div className="text-xs text-muted mt-2">Clasificaciones cualitativas</div>
      </Card>
    </div>
  )
}
