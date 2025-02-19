import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type MetricFilterProps = {
  metrics: string[]
  selectedMetrics: string[]
  onMetricToggle: (metric: string) => void
}

const MetricFilter: React.FC<MetricFilterProps> = ({ metrics, selectedMetrics, onMetricToggle }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Filter Metrics</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {metrics.map((metric) => (
          <div key={metric} className="flex items-center space-x-2">
            <Checkbox
              id={metric}
              checked={selectedMetrics.includes(metric)}
              onCheckedChange={() => onMetricToggle(metric)}
            />
            <Label htmlFor={metric}>{metric}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MetricFilter

