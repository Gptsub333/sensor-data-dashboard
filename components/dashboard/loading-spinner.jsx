"use client";

import { Activity, Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-primary/20 rounded-full"></div>
          </div>
          {/* Spinning gradient ring */}
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-24 h-24 text-primary animate-spin" strokeWidth={1.5} />
          </div>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground bg-clip-text">
            Loading Sensor Data
          </h2>
          <p className="text-muted-foreground text-sm">
            Fetching real-time environmental data...
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
