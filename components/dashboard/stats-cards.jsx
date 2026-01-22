"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle2, AlertTriangle } from "lucide-react";

export function StatsCards({ totalClassrooms, healthyCount, attentionCount }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <Card className="border border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-muted rounded-full">
              <Building2 className="h-6 w-6 text-foreground" />
            </div>
          </div>
          <p className="text-muted-foreground font-medium mb-2 text-sm sm:text-base">Total Classrooms</p>
          <p className="text-4xl sm:text-5xl font-bold text-foreground">{totalClassrooms}</p>
        </CardContent>
      </Card>
      <Card className="border border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-green-500/10 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-muted-foreground font-medium mb-2 text-sm sm:text-base">Healthy</p>
          <p className="text-4xl sm:text-5xl font-bold text-green-600">{healthyCount}</p>
          <p className="text-xs text-green-600/70 mt-2">Optimal conditions</p>
        </CardContent>
      </Card>
      <Card className="border border-border hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-yellow-500/10 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-muted-foreground font-medium mb-2 text-sm sm:text-base">Needs Attention</p>
          <p className="text-4xl sm:text-5xl font-bold text-yellow-600">{attentionCount}</p>
          <p className="text-xs text-yellow-600/70 mt-2">Requires monitoring</p>
        </CardContent>
      </Card>
    </div>
  );
}
