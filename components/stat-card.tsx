"use client"

import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StatCardProps {
  title: string
  value: string
  icon: string
  description: string
  explanation?: string
  color?: "blue" | "green" | "yellow" | "purple" | "indigo"
}

const colorClasses = {
  blue: "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20",
  green: "bg-green-500/10 border-green-500/30 hover:bg-green-500/20",
  yellow: "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20",
  purple: "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20",
  indigo: "bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20",
}

export default function StatCard({ title, value, icon, description, explanation, color = "blue" }: StatCardProps) {
  return (
    <TooltipProvider>
      <div className={`${colorClasses[color]} border rounded-lg p-6 hover:shadow-lg transition-all cursor-help`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm text-muted">{title}</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-2">
                    <p className="font-semibold text-sm">{description}</p>
                    {explanation && <p className="text-xs text-gray-300">{explanation}</p>}
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
    </TooltipProvider>
  )
}
