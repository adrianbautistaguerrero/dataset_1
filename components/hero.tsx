export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-card to-background py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Análisis del Dataset
            <span className="block text-primary">NSL-KDD 2009</span>
          </h1>
          <p className="text-lg text-muted mb-8">
            Visualización interactiva y análisis estadístico del dataset de detección de intrusiones en redes. Explora
            correlaciones, distribuciones y patrones de seguridad en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition">
              Explorar Dashboard
            </button>
            <button className="border border-border hover:bg-card text-foreground font-semibold py-3 px-8 rounded-lg transition">
              Ver Documentación
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
