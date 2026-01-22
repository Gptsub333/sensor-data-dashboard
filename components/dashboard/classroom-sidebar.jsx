"use client";

import { Building2, ChevronRight, Thermometer } from "lucide-react";
import { getHealthStatus, getStatusColor } from "@/lib/sensor-utils";

export function ClassroomSidebar({ classrooms, selectedClassroom, onClassroomSelect, isOpen }) {
  return (
    <aside 
      className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 h-screen bg-background/95 backdrop-blur-md 
        border-r border-border 
        overflow-hidden
        transition-transform duration-300 ease-in-out
        shadow-2xl lg:shadow-none
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="p-6 border-b border-border bg-background flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Classrooms</h1>
            <p className="text-xs text-muted-foreground">{classrooms.length} rooms monitored</p>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2 flex-1 overflow-y-auto overflow-x-hidden">
        {classrooms.map((classroom) => {
          const status = getHealthStatus(classroom);
          const isSelected = selectedClassroom?.classroom === classroom.classroom;
          return (
            <button
              key={classroom.classroom}
              onClick={() => onClassroomSelect(classroom)}
              className={`
                w-full flex items-center justify-between p-4 rounded-xl 
                transition-all duration-200 group
                ${
                  isSelected
                    ? "bg-primary/10 border-l-4 border-primary shadow-md"
                    : "hover:bg-muted/50 hover:shadow-sm"
                }
              `}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${getStatusColor(status)} ${
                    status === "healthy" ? "animate-pulse" : ""
                  }`}
                ></span>
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span
                    className={`text-sm truncate w-full text-left ${
                      isSelected ? "font-semibold text-primary" : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {classroom.classroom}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">
                    Status: {status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 bg-background/50 rounded-lg px-2 py-1">
                  <Thermometer className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">
                    {classroom.current?.temp_F?.toFixed(1)}°F
                  </span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? "text-primary" : "text-muted-foreground"} group-hover:translate-x-1`} />
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
