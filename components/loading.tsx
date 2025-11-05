export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
        </div>
        <p className="text-foreground font-semibold">Inicializando Dashboard...</p>
        <p className="text-muted text-sm">Por favor espera mientras cargamos los datos</p>
      </div>
    </div>
  )
}
