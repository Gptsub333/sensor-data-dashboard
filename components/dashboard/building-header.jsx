"use client";

import { Building, Clock, TrendingUp } from "lucide-react";
import { formatDateTime } from "@/lib/sensor-utils";

export function BuildingHeader({ lastUpdated }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Building className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Building Overview
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                Real-time monitoring system
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2 border border-border self-start sm:self-auto">
            <Clock className="h-4 w-4 text-primary" />
            <div className="text-xs sm:text-sm">
              <p className="text-muted-foreground">Last updated</p>
              <p className="font-semibold text-foreground">{formatDateTime(lastUpdated)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
