"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Thermometer, Wind, Droplets, Cloud, Loader2, AlertTriangle } from "lucide-react";
import { formatDateTime } from "@/lib/sensor-utils";

export function ClassroomConditionsCard({ data, isLoading, error }) {
  if (isLoading) {
    return (
      <Card className="border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-card border-b border-border">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <span className="text-foreground">Loading Classroom Data...</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-2 border-red-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-card border-b border-border">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-foreground">Classroom Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="bg-card border-b border-border">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground">
            Indoor Conditions for {data.classroom}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Temperature */}
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Temperature</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.current?.temp_F?.toFixed(1)}°F
            </p>
          </div>

          {/* CO₂ */}
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">CO₂</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.current?.co2?.toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground">ppm</p>
          </div>

          {/* Humidity */}
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.current?.humidity?.toFixed(1)}%
            </p>
          </div>

          {/* VOC */}
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">VOC</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.current?.voc?.toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground">ppb</p>
          </div>

          {/* Particulate Matter */}
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all col-span-2 sm:col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Cloud className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Particulate Matter (µg/m³)</p>
            </div>
            <div className="space-y-1 mt-2">
              <p className="text-xs"><span className="font-semibold">PM1:</span> {data.current?.pm1?.toFixed(1)}</p>
              <p className="text-xs"><span className="font-semibold">PM2.5:</span> {data.current?.pm2_5?.toFixed(1)}</p>
              <p className="text-xs"><span className="font-semibold">PM10:</span> {data.current?.pm10?.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-xs text-muted-foreground">
            Last updated: {formatDateTime(data.last_updated)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
