import { AlertCircle } from "lucide-react"

interface ErrorAlertProps {
  message: string
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 m-4 flex gap-3">
      <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-semibold text-destructive">Error</h3>
        <p className="text-sm text-destructive/80">{message}</p>
      </div>
    </div>
  )
}
