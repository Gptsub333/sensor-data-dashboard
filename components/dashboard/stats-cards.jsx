"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building2, Calendar, Activity, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export function StatsCards({ totalClassrooms }) {
  const [daysMonitored, setDaysMonitored] = useState(0);
  const [dataPointsCollected, setDataPointsCollected] = useState(0);
  const [detectedAnomalies, setDetectedAnomalies] = useState(0);

  useEffect(() => {
    // Calculate days monitored (you can replace this with real data from API)
    // For now, calculating days since a start date
    const startDate = new Date('2024-01-01');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysMonitored(diffDays);

    // Simulate data points (you can calculate from actual API data)
    // Assuming ~288 readings per day per classroom (every 5 minutes)
    const estimatedDataPoints = totalClassrooms * diffDays * 288;
    setDataPointsCollected(estimatedDataPoints);

    // Simulate detected anomalies (you can get from API)
    // This could be the count of anomalies detected across all classrooms
    // For now, simulating 15-30 anomalies
    const simulatedAnomalies = Math.floor(Math.random() * 16) + 15;
    setDetectedAnomalies(simulatedAnomalies);
  }, [totalClassrooms]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <Card className="border border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-4 pb-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-muted rounded-full">
              <Building2 className="h-4 w-4 text-foreground" />
            </div>
          </div>
          <p className="text-muted-foreground font-medium mb-1 text-xs">Total Classrooms</p>
          <p className="text-3xl font-bold text-foreground">{totalClassrooms}</p>
        </CardContent>
      </Card>
      
      <Card className="border border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-4 pb-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <p className="text-muted-foreground font-medium mb-1 text-xs">Days Monitored</p>
          <p className="text-3xl font-bold text-blue-600">{daysMonitored}</p>
          <p className="text-[10px] text-blue-600/70 mt-1">Continuous tracking</p>
        </CardContent>
      </Card>

      <Card className="border border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-4 pb-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Activity className="h-4 w-4 text-purple-600" />
            </div>
          </div>
          <p className="text-muted-foreground font-medium mb-1 text-xs">Data Points</p>
          <p className="text-3xl font-bold text-purple-600">
            {(dataPointsCollected / 1000000).toFixed(1)}M
          </p>
          <p className="text-[10px] text-purple-600/70 mt-1">Readings collected</p>
        </CardContent>
      </Card>

      <Card className="border border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-4 pb-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-orange-500/10 rounded-full">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
          </div>
          <p className="text-muted-foreground font-medium mb-1 text-xs">Detected Anomalies</p>
          <p className="text-3xl font-bold text-orange-600">{detectedAnomalies}</p>
          <p className="text-[10px] text-orange-600/70 mt-1">Last 30 days</p>
        </CardContent>
      </Card>
    </div>
  );
}
