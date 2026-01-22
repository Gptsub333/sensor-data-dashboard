"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart as LineChartIcon, Activity, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SENSOR_CONFIG } from "@/lib/sensor-utils";

export function SensorChart({
  chartData,
  selectedSensors,
  onToggleSensor,
  selectedClassroom,
  isLoading,
  error,
}) {
  return (
    <Card className="mb-6 sm:mb-8 border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="bg-card border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <LineChartIcon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-foreground">
              Sensor Data
            </span>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 border border-border">
            <Activity className="h-4 w-4 text-primary" />
            <span className="font-medium">
              {selectedClassroom?.classroom || "Outdoor Air Quality Monitor"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Sensor Selection */}
        <div className="mb-6 bg-muted/50 p-4 rounded-xl border border-border">
          <p className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
            <span className="w-1 h-4 bg-primary rounded-full"></span>
            Select Sensors:
          </p>
          <div className="flex flex-wrap gap-3">
            {SENSOR_CONFIG.map((sensor) => (
              <label
                key={sensor.key}
                className={`
                  flex items-center gap-2 cursor-pointer 
                  px-3 py-2 rounded-lg border transition-all
                  ${selectedSensors.includes(sensor.key)
                    ? 'bg-primary/10 border-primary shadow-sm'
                    : 'bg-background border-border hover:border-primary/50 hover:bg-muted'
                  }
                `}
              >
                <Checkbox
                  checked={selectedSensors.includes(sensor.key)}
                  onCheckedChange={() => onToggleSensor(sensor.key)}
                />
                <span
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: selectedSensors.includes(sensor.key) ? sensor.color : undefined }}
                >
                  {sensor.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Chart */}
        {isLoading ? (
          <div className="h-[300px] sm:h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
              <p className="text-sm text-muted-foreground">Loading chart data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-[300px] sm:h-[400px] flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-500/10 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Chart</h3>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <p className="text-xs text-muted-foreground">Please select another classroom or try again later.</p>
            </div>
          </div>
        ) : (
          <div className="bg-muted/30 p-4 rounded-xl border border-border">
            <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-20" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "currentColor", strokeOpacity: 0.2 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "currentColor", strokeOpacity: 0.2 }}
                  label={{
                    value: "Sensor Value",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fontSize: 11 },
                  }}
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                {SENSOR_CONFIG.filter((s) => selectedSensors.includes(s.key)).map(
                  (sensor) => (
                    <Line
                      key={sensor.key}
                      type="monotone"
                      dataKey={sensor.dataKey}
                      name={sensor.label}
                      stroke={sensor.color}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  )
                )}
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3">Time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
