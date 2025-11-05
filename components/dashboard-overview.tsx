"use client"

import { useEffect, useState } from "react"
import StatCard from "./stat-card"

interface DashboardStats {
  totalRecords: number
  trainingRecords: number
  testRecords: number
  totalFeatures: number
  normalConnections: number
  anomalyConnections: number
  datasetName: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_URL}/api/dataset-info/`)
        if (!response.ok) throw new Error("Error fetching data")
        const data = await response.json()

        setStats({
          totalRecords: data.total_records || 125973,
          trainingRecords: data.training_records || 125973,
          testRecords: data.test_records || 0,
          totalFeatures: data.total_features || 42,
          normalConnections: data.normal_class || 67343,
          anomalyConnections: data.anomaly_class || 58630,
          datasetName: data.dataset_name || "NSL-KDD 2009",
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading data")
        setStats({
          totalRecords: 125973,
          trainingRecords: 125973,
          testRecords: 0,
          totalFeatures: 42,
          normalConnections: 67343,
          anomalyConnections: 58630,
          datasetName: "NSL-KDD 2009",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOverview()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">Cargando datos...</div>
  }

  return (
    <section id="overview" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Dataset Overview (NSL-KDD 2009)</h2>
        <p className="text-muted max-w-2xl">
          El dataset NSL-KDD es una versión mejorada del dataset KDD Cup 1999. Contiene datos de tráfico de red
          etiquetados como conexiones normales o ataques. Se utiliza para entrenar modelos de detección de intrusiones
          en sistemas de seguridad.
        </p>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-400 mb-2">¿Qué es este dataset?</h3>
        <p className="text-sm text-muted">
          NSL-KDD (Network Security Lab - KDD) contiene características de conexiones TCP/IP que pueden ser clasificadas
          como legítimas o maliciosas. Cada registro tiene 42 atributos que describen aspectos de la conexión de red,
          como duración, protocolo, puertos, bytes transferidos, errores detectados, etc.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total de Registros"
          value={stats?.totalRecords.toLocaleString() || "0"}
          icon="📊"
          description="Cantidad total de conexiones de red en el dataset"
          explanation="Este es el número total de filas/registros que contiene el dataset. Cada registro representa una única conexión TCP/IP con todas sus características."
          color="blue"
        />
        <StatCard
          title="Conexiones Normales"
          value={stats?.normalConnections.toLocaleString() || "0"}
          icon="✅"
          description="Tráfico legítimo y seguro"
          explanation="Conexiones TCP/IP normales que no representan un ataque. El modelo aprende a identificar estas conexiones seguras para diferenciarlas de los ataques."
          color="green"
        />
        <StatCard
          title="Anomalías Detectadas"
          value={stats?.anomalyConnections.toLocaleString() || "0"}
          icon="⚠️"
          description="Intentos de ataque o conexiones sospechosas"
          explanation="Conexiones clasificadas como anomalías/ataques. Incluyen varios tipos: DoS, Probing, R2L (Remote to Local) y U2R (User to Root)."
          color="yellow"
        />
        <StatCard
          title="Total de Características"
          value={stats?.totalFeatures.toString() || "0"}
          icon="🔍"
          description="Número de atributos por conexión"
          explanation="Cada conexión tiene 42 características que incluyen: duración, protocolo, puerto destino, bytes enviados/recibidos, errores de red, banderas, conteos de conexiones, etc."
          color="purple"
        />
        <StatCard
          title="Registros de Entrenamiento"
          value={stats?.trainingRecords.toLocaleString() || "0"}
          icon="📈"
          description="Datos usados para entrenar el modelo"
          explanation="Cantidad de registros utilizados para entrenar el modelo de machine learning. Con estos datos el modelo aprende patrones de ataque y tráfico normal."
          color="blue"
        />
        <StatCard
          title="Registros de Prueba"
          value={stats?.testRecords.toLocaleString() || "0"}
          icon="🧪"
          description="Datos para validar el rendimiento del modelo"
          explanation="Registros separados no usados durante el entrenamiento. Sirven para probar qué tan bien el modelo generaliza a datos nuevos que nunca ha visto."
          color="indigo"
        />
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg">
          <p className="font-semibold mb-1">Nota:</p>
          <p>{error}. Usando datos de ejemplo para demostración.</p>
        </div>
      )}
    </section>
  )
}
