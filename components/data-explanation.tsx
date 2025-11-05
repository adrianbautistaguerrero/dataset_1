"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function DataExplanation() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    features: true,
    attacks: false,
    metrics: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <section id="explanation" className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">Documentación del Dataset</h2>
        <p className="text-foreground/70">
          Información detallada sobre las características, tipos de ataques y métricas de evaluación
        </p>
      </div>

      <div className="space-y-4">
        {/* Características del Dataset */}
        <Card className="bg-card border-border">
          <button
            onClick={() => toggleSection("features")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/80 transition"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-foreground">Las 42 Características del Dataset</h3>
              <p className="text-sm text-foreground/60 mt-1">Descripción de cada atributo de la conexión de red</p>
            </div>
            {expandedSections.features ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedSections.features && (
            <div className="px-6 py-4 border-t border-border bg-background/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Características Básicas:</h4>
                  <ul className="text-foreground/75 space-y-1 text-xs">
                    <li>
                      • <strong>duration:</strong> Tiempo de conexión en segundos
                    </li>
                    <li>
                      • <strong>protocol_type:</strong> Protocolo (TCP, UDP, ICMP)
                    </li>
                    <li>
                      • <strong>service:</strong> Servicio destino (HTTP, FTP, etc.)
                    </li>
                    <li>
                      • <strong>flag:</strong> Estado normal/error de la conexión
                    </li>
                    <li>
                      • <strong>src_bytes:</strong> Bytes enviados del origen
                    </li>
                    <li>
                      • <strong>dst_bytes:</strong> Bytes recibidos en destino
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Indicadores de Contenido:</h4>
                  <ul className="text-foreground/75 space-y-1 text-xs">
                    <li>
                      • <strong>land:</strong> Si origen y destino son iguales (1/0)
                    </li>
                    <li>
                      • <strong>wrong_fragment:</strong> Fragmentos incorrectos
                    </li>
                    <li>
                      • <strong>urgent:</strong> Paquetes urgentes recibidos
                    </li>
                    <li>
                      • <strong>hot:</strong> Accesos a carpetas "hot"
                    </li>
                    <li>
                      • <strong>num_failed_logins:</strong> Intentos fallidos
                    </li>
                    <li>
                      • <strong>logged_in:</strong> Login exitoso (1/0)
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Estadísticas de Hosts:</h4>
                  <ul className="text-foreground/75 space-y-1 text-xs">
                    <li>
                      • <strong>count:</strong> Conexiones en últimos 2 segundos
                    </li>
                    <li>
                      • <strong>srv_count:</strong> Conexiones al mismo servicio
                    </li>
                    <li>
                      • <strong>serror_rate:</strong> % conexiones con errores SYN
                    </li>
                    <li>
                      • <strong>srv_serror_rate:</strong> % errores SYN por servicio
                    </li>
                    <li>
                      • <strong>rerror_rate:</strong> % conexiones rechazadas
                    </li>
                    <li>
                      • <strong>srv_rerror_rate:</strong> % rechazos por servicio
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Características de Ventana:</h4>
                  <ul className="text-foreground/75 space-y-1 text-xs">
                    <li>
                      • <strong>same_srv_rate:</strong> % conexiones al mismo servicio
                    </li>
                    <li>
                      • <strong>diff_srv_rate:</strong> % conexiones a servicios diferentes
                    </li>
                    <li>
                      • <strong>srv_diff_host_rate:</strong> % conexiones a hosts diferentes
                    </li>
                    <li>• Todos estos valores calculados en ventana de tiempo móvil</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Tipos de Ataques */}
        <Card className="bg-card border-border">
          <button
            onClick={() => toggleSection("attacks")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/80 transition"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-foreground">Tipos de Ataques en el Dataset</h3>
              <p className="text-sm text-foreground/60 mt-1">Clasificación de anomalías y ataques</p>
            </div>
            {expandedSections.attacks ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedSections.attacks && (
            <div className="px-6 py-4 border-t border-border bg-background/50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-2 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">DoS (Denial of Service)</h4>
                  <p className="text-sm text-foreground/80">
                    Ataques que buscan saturar un servidor. Ejemplos: SYN flood, UDP flood. Impiden que usuarios
                    legítimos accedan al servicio.
                  </p>
                </div>

                <div className="border-l-2 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-400 mb-2">Probing</h4>
                  <p className="text-sm text-foreground/80">
                    Reconocimiento de la red para encontrar vulnerabilidades. Ejemplos: port scanning, network mapping.
                    Los atacantes investigan qué puertos están abiertos.
                  </p>
                </div>

                <div className="border-l-2 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-400 mb-2">R2L (Remote to Local)</h4>
                  <p className="text-sm text-foreground/80">
                    Intentos de obtener acceso local desde una máquina remota. Ejemplos: password guessing, exploits.
                    Buscan obtener cuenta de usuario.
                  </p>
                </div>

                <div className="border-l-2 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-400 mb-2">U2R (User to Root)</h4>
                  <p className="text-sm text-foreground/80">
                    Un usuario intenta obtener privilegios de administrador. Ejemplos: buffer overflow, privesc
                    exploits. El atacante ya tiene acceso como usuario.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Métricas de Evaluación */}
        <Card className="bg-card border-border">
          <button
            onClick={() => toggleSection("metrics")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/80 transition"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-foreground">Métricas de Evaluación del Modelo</h3>
              <p className="text-sm text-foreground/60 mt-1">Cómo se mide el rendimiento de los modelos de detección</p>
            </div>
            {expandedSections.metrics ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedSections.metrics && (
            <div className="px-6 py-4 border-t border-border bg-background/50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Accuracy (Precisión Total)</h4>
                  <p className="text-foreground/80 mb-2">(TP + TN) / (TP + TN + FP + FN) × 100%</p>
                  <p className="text-xs text-foreground/70">
                    Porcentaje de predicciones correctas. Si es 95%, significa que de 100 conexiones, 95 fueron
                    clasificadas correctamente.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Precision (Precisión)</h4>
                  <p className="text-foreground/80 mb-2">TP / (TP + FP) × 100%</p>
                  <p className="text-xs text-foreground/70">
                    De todas las conexiones que el modelo marcó como ataque, ¿cuántas realmente lo eran? Evita falsos
                    positivos.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Recall (Sensibilidad)</h4>
                  <p className="text-foreground/80 mb-2">TP / (TP + FN) × 100%</p>
                  <p className="text-xs text-foreground/70">
                    De todos los ataques reales, ¿cuántos fueron detectados? Evita falsos negativos (ataques sin
                    detectar).
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">F1-Score</h4>
                  <p className="text-foreground/80 mb-2">2 × (Precision × Recall) / (Precision + Recall)</p>
                  <p className="text-xs text-foreground/70">
                    Media armónica de Precision y Recall. Buen balance entre detectar ataques sin generar falsas
                    alarmas.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded">
                <p className="text-sm text-foreground/80">
                  <strong className="text-blue-400">Nota importante:</strong> En seguridad, es mejor tener un recall
                  alto (detectar la mayoría de ataques) aunque haya más falsos positivos, que un precision alta pero con
                  muchos ataques sin detectar.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
