"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import OverviewCards from "@/components/overview-cards"
import ClassDistributionChart from "@/components/charts/class-distribution"
import StatisticsPanel from "@/components/statistics-panel"
import CorrelationHeatmap from "@/components/charts/correlation-heatmap"
import FeatureDistributions from "@/components/charts/feature-distributions"
import AnomalyAnalysis from "@/components/charts/anomaly-analysis"
import ModelMetrics from "@/components/model-metrics"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorAlert from "@/components/error-alert"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {error && <ErrorAlert message={error} />}

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Tarjetas de visión general */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Información del Dataset</h2>
          <OverviewCards />
        </section>

        {/* Distribución de clases */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Distribución de Clases</h2>
          <div className="bg-card rounded-lg p-6 border border-border">
            <ClassDistributionChart />
          </div>
        </section>

        {/* Estadísticas */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Estadísticas Descriptivas</h2>
          <StatisticsPanel />
        </section>

        {/* Matriz de correlación */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Matriz de Correlación</h2>
          <div className="bg-card rounded-lg p-6 border border-border">
            <CorrelationHeatmap />
          </div>
        </section>

        {/* Distribuciones de características */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Distribución de Características</h2>
          <FeatureDistributions />
        </section>

        {/* Análisis de anomalías */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Análisis de Anomalías</h2>
          <AnomalyAnalysis />
        </section>

        {/* Métricas del modelo */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Métricas Esperadas del Modelo</h2>
          <ModelMetrics />
        </section>
      </div>
    </main>
  )
}
