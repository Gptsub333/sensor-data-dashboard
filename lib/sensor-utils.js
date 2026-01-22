export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://44.210.86.189";

// Mock data for demonstration when API is not available
export const MOCK_CLASSROOMS = [
  { classroom: "217-ESSR-Classroom 106", current: { temp_F: 69.5, humidity: 22.1, co2: 712, voc: 1850, pm1: 0.3, pm2_5: 0.4, pm10: 1.2 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSE-Classroom 125", current: { temp_F: 71.8, humidity: 23.5, co2: 680, voc: 1720, pm1: 0.2, pm2_5: 0.3, pm10: 1.1 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSR-Classroom 129", current: { temp_F: 70.9, humidity: 24.1, co2: 745, voc: 1900, pm1: 0.3, pm2_5: 0.4, pm10: 1.4 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSR-Classroom 121", current: { temp_F: 71.2, humidity: 23.3, co2: 766, voc: 1968, pm1: 0.3, pm2_5: 0.4, pm10: 1.5 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSR-Classroom 109", current: { temp_F: 73.5, humidity: 21.8, co2: 698, voc: 1650, pm1: 0.2, pm2_5: 0.3, pm10: 1.0 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSR-Classroom 119", current: { temp_F: 72.1, humidity: 22.9, co2: 720, voc: 1780, pm1: 0.3, pm2_5: 0.4, pm10: 1.3 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSR-Classroom 108", current: { temp_F: 73.9, humidity: 21.5, co2: 690, voc: 1620, pm1: 0.2, pm2_5: 0.3, pm10: 1.1 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSR-Classroom 107", current: { temp_F: 73.1, humidity: 22.0, co2: 705, voc: 1700, pm1: 0.3, pm2_5: 0.4, pm10: 1.2 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSE-Classroom 132", current: { temp_F: 72.5, humidity: 23.0, co2: 730, voc: 1800, pm1: 0.3, pm2_5: 0.4, pm10: 1.3 }, last_updated: "2026-01-22T20:59:59Z" },
  { classroom: "217-ESSR-Classroom 105", current: { temp_F: 71.2, humidity: 24.5, co2: 850, voc: 2100, pm1: 0.4, pm2_5: 0.5, pm10: 1.6 }, last_updated: "2026-01-22T20:59:59Z" },
];

export const MOCK_OUTDOOR = {
  temp_F: 70.9,
  humidity: 16.4,
  co2: 411,
  voc: 225,
  pm1: 0.4,
  pm2_5: 0.4,
  pm10: 4.3,
  last_updated: "2025-11-18T16:00:00Z",
};

export const MOCK_INDOOR_AVERAGE = {
  temp_F: 72.4,
  humidity: 23.3,
  co2: 766,
  voc: 1968,
  pm1: 0.3,
  pm2_5: 0.4,
  pm10: 1.5,
  last_updated: "2025-11-18T16:30:00Z",
};

// Generate mock chart data
export function generateMockChartData(classroomName) {
  const data = [];
  const baseTemp = classroomName?.includes("Outdoor") ? 60 : 70;
  const startDate = new Date("2025-11-12T00:00:00Z");
  
  for (let i = 0; i < 700; i++) {
    const time = new Date(startDate.getTime() + i * 60 * 60 * 1000); // hourly data
    const hour = time.getHours();
    
    // Create realistic daily patterns
    const tempVariation = classroomName?.includes("Outdoor") 
      ? Math.sin((hour - 6) * Math.PI / 12) * 25 // Outdoor: big swings
      : Math.sin((hour - 6) * Math.PI / 12) * 2; // Indoor: small swings
    
    data.push({
      Time: time.toISOString(),
      "Temperature (F) - Average": baseTemp + tempVariation + (Math.random() - 0.5) * 2,
      "Humidity (%) - Average": 20 + Math.random() * 10,
      "Carbon Dioxide (CO2) (ppm) - Average": 400 + Math.random() * 600,
      "Volatile Organic Compounds (VOC) (ppb) - Average": 200 + Math.random() * 1800,
      "PM1.0 Mass Concentration (µg/m3) - Average": 0.2 + Math.random() * 0.3,
      "PM2.5 Mass Concentration (µg/m3) - Average": 0.3 + Math.random() * 0.3,
      "PM10 Mass Concentration (µg/m3) - Average": 1 + Math.random() * 2,
    });
  }
  
  return data;
}

export const SENSOR_CONFIG = [
  { key: "temp_F", label: "Temperature (°F)", dataKey: "Temperature (F) - Average", color: "#2563eb" },
  { key: "humidity", label: "Humidity (%)", dataKey: "Humidity (%) - Average", color: "#16a34a" },
  { key: "co2", label: "CO₂ (ppm)", dataKey: "Carbon Dioxide (CO2) (ppm) - Average", color: "#ea580c" },
  { key: "voc", label: "VOC (ppb)", dataKey: "Volatile Organic Compounds (VOC) (ppb) - Average", color: "#9333ea" },
  { key: "pm1", label: "PM1.0 (µg/m³)", dataKey: "PM1.0 Mass Concentration (µg/m3) - Average", color: "#dc2626" },
  { key: "pm2_5", label: "PM2.5 (µg/m³)", dataKey: "PM2.5 Mass Concentration (µg/m3) - Average", color: "#0891b2" },
  { key: "pm10", label: "PM10 (µg/m³)", dataKey: "PM10 Mass Concentration (µg/m3) - Average", color: "#65a30d" },
];

export function getHealthStatus(classroom) {
  const temp = classroom?.current?.temp_F || 0;
  const voc = classroom?.current?.voc || 0;
  const co2 = classroom?.current?.co2 || 0;

  if (temp < 65 || temp > 78 || voc > 2000 || co2 > 1000) {
    return "warning";
  }
  if (temp < 60 || temp > 82 || voc > 5000 || co2 > 1500) {
    return "critical";
  }
  return "healthy";
}

export function getStatusColor(status) {
  switch (status) {
    case "critical":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function generateRecommendations(classroom) {
  const alerts = [];
  const reasons = [];
  const recommendations = [];
  let severity = "low";

  const current = classroom?.current;
  if (!current) return null;

  const temp = current.temp_F || 0;
  const voc = current.voc || 0;
  const co2 = current.co2 || 0;

  if (temp < 69 || temp > 78) {
    reasons.push("Room temperature has been outside the comfortable 69-78°F range for over 4 hours");
    recommendations.push("Check HVAC settings and thermostat calibration for this specific classroom");
    severity = "medium";
  }

  if (voc > 500) {
    reasons.push("VOC levels have been elevated above 500 ppb during school hours for an extended period");
    recommendations.push("Inspect for potential VOC sources like new furniture, cleaning products, or art supplies");
    recommendations.push("Increase ventilation rates temporarily while addressing the root causes");
    severity = "medium";
  }

  if (co2 > 1000) {
    reasons.push("CO₂ levels exceed 1000 ppm indicating poor ventilation");
    recommendations.push("Increase fresh air intake and check ventilation system");
    severity = "high";
  }

  if (reasons.length === 0) {
    return {
      message: "All parameters are within normal ranges. No immediate action required.",
      severity: "healthy",
      reasons: [],
      recommendations: [],
    };
  }

  const classroomName = classroom.classroom?.split("-").pop() || "Room";
  alerts.push(
    `${classroomName} is experiencing temperature regulation issues and elevated VOC levels that need attention, though outdoor conditions are within normal parameters.`
  );

  return {
    alerts,
    reasons,
    recommendations,
    severity,
  };
}

export function transformChartData(data) {
  return data.map((item) => ({
    ...item,
    time: new Date(item.Time).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));
}
