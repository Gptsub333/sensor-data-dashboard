"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Info, Lightbulb, Clock, Loader2 } from "lucide-react";
import { formatDateTime } from "@/lib/sensor-utils";

export function Recommendations({ recommendations, isLoading, classroom, error }) {
  if (isLoading) {
    return (
      <Card className="border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-card border-b border-border">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <span className="text-foreground">Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Loading recommendations...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-2 border-red-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-card border-b border-border">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-foreground">Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Recommendations</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <div className="bg-muted/50 p-4 rounded-lg max-w-md mx-auto">
              <p className="text-xs text-muted-foreground text-left">
                <span className="font-semibold">API Endpoint:</span><br />
                http://44.222.114.155/api/get-classroom-recommendation/{classroom?.classroom}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) return null;

  // Check which API format we have
  const hasAnalysis = recommendations.analysis !== undefined;
  const hasLLMSummary = recommendations.llm_summary !== undefined;

  return (
    <Card className="border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="bg-card border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <span className="text-foreground">
              Recommendations
            </span>
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 border border-border">
            <Clock className="h-3 w-3" />
            <span>Last updated: {formatDateTime(new Date().toISOString())}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Handle new analysis format */}
        {hasAnalysis ? (
          <>
            {/* Analysis Header */}
            <div className="mb-6 bg-muted/50 p-4 sm:p-6 rounded-xl border border-border">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    {recommendations.analysis.primary_issue}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-lg border border-border">
                      <span className="text-xs text-muted-foreground">Trend:</span>
                      <span className="text-xs font-semibold text-foreground">{recommendations.analysis.trend}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-lg border border-border">
                      <span className="text-xs text-muted-foreground">Confidence:</span>
                      <span className="text-xs font-semibold text-primary">{recommendations.analysis.assurance_percentage}%</span>
                    </div>
                  </div>
                </div>
                <div className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border-2 self-start
                  ${recommendations.analysis.severity === "High" || recommendations.analysis.severity === "high"
                    ? "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400"
                    : recommendations.analysis.severity === "Medium" || recommendations.analysis.severity === "medium"
                      ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500 text-yellow-700 dark:text-yellow-400"
                      : "bg-green-50 dark:bg-green-950/30 border-green-500 text-green-700 dark:text-green-400"
                  }
                `}>
                  <AlertTriangle className="h-4 w-4" />
                  <span>Severity: {recommendations.analysis.severity.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Probable Reasons and Recommended Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Probable Reasons */}
              {recommendations.probable_reasons && recommendations.probable_reasons.length > 0 && (
                <div className="bg-muted/50 p-4 sm:p-6 rounded-xl border border-border">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-base sm:text-lg">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    Probable Reasons
                  </h4>
                  <div className="space-y-3">
                    {recommendations.probable_reasons.map((reason, index) => (
                      <div
                        key={index}
                        className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary group-hover:scale-110 transition-transform">
                            {index + 1}
                          </span>
                          <p className="text-sm text-foreground">{reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Actions */}
              {recommendations.recommended_actions && recommendations.recommended_actions.length > 0 && (
                <div className="bg-muted/50 p-4 sm:p-6 rounded-xl border border-border">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-base sm:text-lg">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    Recommended Actions
                  </h4>
                  <div className="space-y-3">
                    {recommendations.recommended_actions.map((action, index) => (
                      <div
                        key={index}
                        className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <p className="text-sm text-foreground">{action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : hasLLMSummary ? (
          /* Handle LLM summary format */
          <>
            {/* Classroom Name */}
            <div className="mb-4 pb-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">{recommendations.classroom}</h3>
              {recommendations.llm_summary?.Summary && (
                <p className="text-sm text-muted-foreground mt-2">{recommendations.llm_summary.Summary}</p>
              )}
            </div>

            {/* Anomalies Section */}
            {recommendations.anomalies && recommendations.anomalies.length > 0 && (
              <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 p-4 sm:p-6 rounded-xl border-2 border-red-200 dark:border-red-800 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 dark:text-red-300">Detected Anomalies</span>
                </h3>
                <div className="space-y-3">
                  {recommendations.anomalies.map((anomaly, index) => (
                    <div key={index} className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border">
                      <div className="flex items-start gap-2 mb-2">
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded text-xs font-semibold
                          ${anomaly.priority === 'PRIORITY_1' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            anomaly.priority === 'PRIORITY_2' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                              'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}
                        `}>
                          {anomaly.priority.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground"><span className="font-semibold">Reason:</span> {anomaly.reason}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground"><span className="font-semibold">Recommendation:</span> {anomaly.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LLM Summary Section */}
            {recommendations.llm_summary && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Key Reasons */}
                {recommendations.llm_summary.key_reasons && recommendations.llm_summary.key_reasons.length > 0 && (
                  <div className="bg-muted/50 p-4 sm:p-6 rounded-xl border border-border">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-base sm:text-lg">
                      <div className="w-1 h-5 bg-primary rounded-full"></div>
                      Key Reasons
                    </h4>
                    <div className="space-y-3">
                      {recommendations.llm_summary.key_reasons.map((reason, index) => (
                        <div
                          key={index}
                          className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary group-hover:scale-110 transition-transform">
                              {index + 1}
                            </span>
                            <p className="text-sm text-foreground">{reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Recommendations */}
                {recommendations.llm_summary.key_recommendations && recommendations.llm_summary.key_recommendations.length > 0 && (
                  <div className="bg-muted/50 p-4 sm:p-6 rounded-xl border border-border">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-base sm:text-lg">
                      <div className="w-1 h-5 bg-primary rounded-full"></div>
                      Key Recommendations
                    </h4>
                    <div className="space-y-3">
                      {recommendations.llm_summary.key_recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                            <p className="text-sm text-foreground">{rec}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Severity Badge */}
            {recommendations.llm_summary?.severity && (
              <div className="mt-6 flex items-center justify-center">
                <div className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2
                  ${recommendations.llm_summary.severity === "high"
                    ? "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400"
                    : recommendations.llm_summary.severity === "medium"
                      ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500 text-yellow-700 dark:text-yellow-400"
                      : "bg-green-50 dark:bg-green-950/30 border-green-500 text-green-700 dark:text-green-400"
                  }
                `}>
                  <AlertTriangle className="h-4 w-4" />
                  <span>Severity: {recommendations.llm_summary.severity.toUpperCase()}</span>
                </div>
              </div>
            )}
          </>
        ) : recommendations.severity === "healthy" ? (
          /* Healthy status */
          <div className="flex items-center gap-3 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-lg">
            <div className="p-2 bg-green-500/20 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-green-800 dark:text-green-200 font-medium">{recommendations.message}</p>
          </div>
        ) : recommendations.alerts ? (
          /* Original format with alerts */
          <>
            {/* Critical Alerts */}
            {recommendations.alerts && recommendations.alerts.length > 0 && (
              <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 p-4 sm:p-6 rounded-xl border-2 border-red-200 dark:border-red-800 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 dark:text-red-300">Critical Alerts</span>
                </h3>
                <div className="space-y-2">
                  {recommendations.alerts?.map((alert, index) => (
                    <div key={index} className="flex items-start gap-2 bg-background/50 backdrop-blur-sm p-3 rounded-lg">
                      <Info className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{alert}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reasons and Recommendations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Reasons */}
              <div className="bg-muted/50 p-4 sm:p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-base sm:text-lg">
                  <div className="w-1 h-5 bg-primary rounded-full"></div>
                  Key Reasons
                </h4>
                <div className="space-y-3">
                  {recommendations.reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary group-hover:scale-110 transition-transform">
                          {index + 1}
                        </span>
                        <p className="text-sm text-foreground">{reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Recommendations */}
              <div className="bg-muted/50 p-4 sm:p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-base sm:text-lg">
                  <div className="w-1 h-5 bg-primary rounded-full"></div>
                  Key Recommendations
                </h4>
                <div className="space-y-3">
                  {recommendations.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <p className="text-sm text-foreground">{rec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Severity Badge */}
            <div className="mt-6 flex items-center justify-center">
              <div className={`
                inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2
                ${recommendations.severity === "high"
                  ? "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400"
                  : recommendations.severity === "medium"
                    ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500 text-yellow-700 dark:text-yellow-400"
                    : "bg-green-50 dark:bg-green-950/30 border-green-500 text-green-700 dark:text-green-400"
                }
              `}>
                <AlertTriangle className="h-4 w-4" />
                <span>Severity: {recommendations.severity.toUpperCase()}</span>
              </div>
            </div>
          </>
        ) : (
          /* No data available */
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No recommendation data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
