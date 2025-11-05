"use client"

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary/20 to-accent/20 py-20 border-b border-border">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 text-foreground">NSL-KDD 2009 Dataset</h1>
        <p className="text-xl text-muted mb-6">
          Análisis interactivo y visualización de datos para detección de intrusiones en redes
        </p>
        <div className="bg-card/50 p-6 rounded-lg border border-border max-w-2xl mx-auto">
          <p className="text-sm text-muted leading-relaxed">
            El dataset NSL-KDD es una versión mejorada del KDD'99, utilizado para entrenar y evaluar sistemas de
            detección de intrusiones (IDS). Contiene 125,973 registros clasificados como conexiones normales (67%) o
            anomalías/ataques (33%), con 43 características de tráfico de red.
          </p>
        </div>
      </div>
    </section>
  )
}
