"use client";

import { useState, useEffect } from "react";
import { Menu, X, AlertTriangle } from "lucide-react";
import { ClassroomSidebar } from "@/components/dashboard/classroom-sidebar";
import { BuildingHeader } from "@/components/dashboard/building-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { OutdoorConditionsCard, IndoorConditionsCard } from "@/components/dashboard/conditions-card";
import { SensorChart } from "@/components/dashboard/sensor-chart";
import { Recommendations } from "@/components/dashboard/recommendations";
import { Feedback } from "@/components/dashboard/feedback";
import { LoadingSpinner } from "@/components/dashboard/loading-spinner";
import {
  API_BASE,
  getHealthStatus,
  transformChartData,
} from "@/lib/sensor-utils";

export default function SensorDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [outdoorData, setOutdoorData] = useState(null);
  const [indoorAverage, setIndoorAverage] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState(["temp_F"]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartError, setChartError] = useState(null);
  const [recommendationsError, setRecommendationsError] = useState(null);

  useEffect(() => {
    async function fetchInitialData() {
      setError(null);

      try {
        // Fetch all initial data
        const [classroomsRes, outdoorRes, indoorRes] = await Promise.all([
          fetch(`${API_BASE}/api/latest-classroom-data`),
          fetch(`${API_BASE}/api/outside`),
          fetch(`${API_BASE}/api/average-latest-indoor`),
        ]);

        // Check each response
        if (!classroomsRes.ok) {
          throw new Error(`Failed to fetch classroom data: ${classroomsRes.status} ${classroomsRes.statusText}`);
        }
        if (!outdoorRes.ok) {
          throw new Error(`Failed to fetch outdoor data: ${outdoorRes.status} ${outdoorRes.statusText}`);
        }
        if (!indoorRes.ok) {
          throw new Error(`Failed to fetch indoor data: ${indoorRes.status} ${indoorRes.statusText}`);
        }

        const classroomsData = await classroomsRes.json();
        const outdoorDataRes = await outdoorRes.json();
        const indoorDataRes = await indoorRes.json();

        setClassrooms(classroomsData);
        setOutdoorData(outdoorDataRes);
        setIndoorAverage(indoorDataRes);

        // Load outdoor chart data by default
        const chartRes = await fetch(
          `${API_BASE}/api/last-700-data/217-Outdoor%20Air%20Quality%20Monitor`
        );

        if (!chartRes.ok) {
          throw new Error(`Failed to fetch chart data: ${chartRes.status} ${chartRes.statusText}`);
        }

        const chartDataRes = await chartRes.json();
        setChartData(transformChartData(chartDataRes));
      } catch (error) {
        console.error("API Error:", error);
        setError(error.message || "Failed to connect to the API server. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  async function handleClassroomSelect(classroom) {
    setSelectedClassroom(classroom);
    setChartLoading(true);
    setRecommendationsLoading(true);
    setChartError(null);
    setRecommendationsError(null);

    // Fetch chart data
    try {
      const encodedName = encodeURIComponent(classroom.classroom);
      const chartRes = await fetch(`${API_BASE}/api/last-700-data/${encodedName}`);

      if (!chartRes.ok) {
        throw new Error(`Failed to fetch chart data: ${chartRes.status} ${chartRes.statusText}`);
      }

      const chartDataRes = await chartRes.json();
      setChartData(transformChartData(chartDataRes));
    } catch (error) {
      console.error("Chart API Error:", error);
      setChartError(error.message || "Failed to load chart data. Please try again.");
      setChartData([]);
    } finally {
      setChartLoading(false);
    }

    // Fetch classroom recommendations
    try {
      const encodedName = encodeURIComponent(classroom.classroom);
      const recommendationsRes = await fetch(
        `http://44.222.114.155/api/get-classroom-recommendation/${encodedName}`
      );

      if (!recommendationsRes.ok) {
        throw new Error(`Failed to fetch recommendations: ${recommendationsRes.status} ${recommendationsRes.statusText}`);
      }

      const recommendationsData = await recommendationsRes.json();
      setRecommendations(recommendationsData);
    } catch (error) {
      console.error("Recommendations API Error:", error);
      setRecommendationsError(error.message || "Failed to load recommendations. Please try again.");
      setRecommendations(null);
    } finally {
      setRecommendationsLoading(false);
    }
  }

  function toggleSensor(sensorKey) {
    setSelectedSensors((prev) =>
      prev.includes(sensorKey)
        ? prev.filter((s) => s !== sensorKey)
        : [...prev, sensorKey]
    );
  }

  const healthyCount = classrooms.filter((c) => getHealthStatus(c) === "healthy").length;
  const attentionCount = classrooms.length - healthyCount;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border-2 border-red-500/50 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-500/10 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Unable to Load Data</h2>
          </div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <p className="text-sm font-semibold text-foreground mb-2">Troubleshooting:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Check if the API server is running</li>
              <li>Verify your network connection</li>
              <li>Confirm the API endpoint is correct: {API_BASE}</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-muted/30 flex relative overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background/90 backdrop-blur-sm border border-border rounded-lg shadow-lg hover:bg-accent transition-all"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <ClassroomSidebar
        classrooms={classrooms}
        selectedClassroom={selectedClassroom}
        onClassroomSelect={(classroom) => {
          handleClassroomSelect(classroom);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
      />

      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <BuildingHeader lastUpdated={indoorAverage?.last_updated} />

          <StatsCards
            totalClassrooms={classrooms.length}
            healthyCount={healthyCount}
            attentionCount={attentionCount}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <OutdoorConditionsCard data={outdoorData} />
            <IndoorConditionsCard data={indoorAverage} />
          </div>

          <SensorChart
            chartData={chartData}
            selectedSensors={selectedSensors}
            onToggleSensor={toggleSensor}
            selectedClassroom={selectedClassroom}
            isLoading={chartLoading}
            error={chartError}
          />

          {selectedClassroom && (
            <Recommendations
              recommendations={recommendations}
              isLoading={recommendationsLoading}
              classroom={selectedClassroom}
              error={recommendationsError}
            />
          )}

          <Feedback classroom={selectedClassroom} />
        </div>
      </main>
    </div>
  );
}
