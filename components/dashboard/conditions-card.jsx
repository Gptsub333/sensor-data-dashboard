"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Wind, Droplets, Cloud } from "lucide-react";
import { formatDateTime } from "@/lib/sensor-utils";

export function OutdoorConditionsCard({ data }) {
  if (!data) return null;

  return (
    <Card className="border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="bg-card border-b border-border">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Thermometer className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground">
            Outdoor Conditions
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Temperature</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.temperature_F?.toFixed(1)}°F
            </p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">CO₂</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.co2?.toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground">ppm</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <Cloud className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Particulate Matter</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs"><span className="font-semibold">PM1:</span> {data.pm1?.toFixed(1)} µg/m³</p>
              <p className="text-xs"><span className="font-semibold">PM2.5:</span> {data.pm2_5?.toFixed(1)} µg/m³</p>
              <p className="text-xs"><span className="font-semibold">PM10:</span> {data.pm10?.toFixed(1)} µg/m³</p>
            </div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.humidity?.toFixed(1)}%
            </p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">VOC</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.voc?.toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground">ppb</p>
          </div>
        </div>
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

export function IndoorConditionsCard({ data }) {
  if (!data) return null;

  return (
    <Card className="border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="bg-card border-b border-border">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Wind className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground">
            Average Indoor Conditions
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Temperature</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.current?.temp_F?.toFixed(1)}°F
            </p>
          </div>
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
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <Cloud className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Particulate Matter</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs"><span className="font-semibold">PM1:</span> {data.current?.pm1?.toFixed(1)} µg/m³</p>
              <p className="text-xs"><span className="font-semibold">PM2.5:</span> {data.current?.pm2_5?.toFixed(1)} µg/m³</p>
              <p className="text-xs"><span className="font-semibold">PM10:</span> {data.current?.pm10?.toFixed(1)} µg/m³</p>
            </div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {data.current?.humidity?.toFixed(1)}%
            </p>
          </div>
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
        </div>
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
