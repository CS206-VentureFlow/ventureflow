"use client"

import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { SlidersHorizontal } from "lucide-react"

type MetricFilterProps = {
  metrics: string[]
  selectedMetrics: string[]
  onMetricToggle: (metric: string) => void
}

const MetricFilter: React.FC<MetricFilterProps> = ({ metrics, selectedMetrics, onMetricToggle }) => {
  const selectedCount = selectedMetrics.length
  const totalCount = metrics.length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filter Metrics
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {selectedCount}/{totalCount}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Filter Metrics</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                metrics.forEach((metric) => {
                  if (!selectedMetrics.includes(metric)) {
                    onMetricToggle(metric)
                  }
                })
              }}
              className="h-auto px-2 text-xs"
            >
              Select All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {metrics.map((metric) => (
              <div key={metric} className="flex items-center space-x-2">
                <Checkbox
                  id={metric}
                  checked={selectedMetrics.includes(metric)}
                  onCheckedChange={() => onMetricToggle(metric)}
                />
                <Label htmlFor={metric} className="text-sm">
                  {metric}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MetricFilter

