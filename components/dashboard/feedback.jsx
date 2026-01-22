"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle2, Loader2, AlertCircle, Star } from "lucide-react";
import { useState } from "react";

const FEEDBACK_OPTIONS = [
  { value: "outdoor_conditions", label: "Outdoor Conditions" },
  { value: "outdoor_temperature", label: "Outdoor Temperature" },
  { value: "more_occupancy", label: "More Occupancy" },
  { value: "indoor_system_failure", label: "Indoor System failure" },
  { value: "window_opened", label: "Window opened" },
  { value: "empty_rooms", label: "Empty Rooms" },
];

export function Feedback({ classroom }) {
  const [selection, setSelection] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    if (!selection || !message.trim()) {
      setSubmitError("Please select a category and enter a message.");
      return;
    }

    if (rating === 0) {
      setSubmitError("Please select a rating.");
      return;
    }

    if (!classroom) {
      setSubmitError("Please select a classroom first.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const payload = {
      classroom: classroom.classroom,
      rating: rating,
      feedback_text: `${selection}: ${message}`,
      submitted_by: "user",
    };

    console.log("Submitting feedback:", payload);

    try {
      const response = await fetch("http://44.210.86.189/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("API Response status:", response.status);
      console.log("API Response statusText:", response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText || "Failed to submit feedback"}`);
      }

      const data = await response.json();
      console.log("Feedback submitted successfully:", data);

      
      setSubmitSuccess(true);
      setSelection("");
      setMessage("");
      setRating(0);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Feedback submission error:", error);
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);
      
      let errorMessage = error.message;
      
      // Check for specific error types
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage = "Network error: Unable to connect to server. Check if the API server is running and accessible.";
      } else if (error.message.includes("CORS")) {
        errorMessage = "CORS error: The server needs to allow requests from this domain.";
      } else if (error.message.includes("404")) {
        errorMessage = "Endpoint not found (404). Verify the API URL: http://44.210.86.189/submit-feedback";
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-border hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-card border-b border-border">
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground">Feedback</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {!classroom ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-muted rounded-full">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Please select a classroom from the sidebar to submit feedback
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected Classroom */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Selected Classroom</p>
              <p className="text-sm font-semibold text-foreground">{classroom.classroom}</p>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={isSubmitting}
                    className="transition-transform hover:scale-110 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating} / 5
                  </span>
                )}
              </div>
            </div>

            {/* Selection Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Selection</label>
              <Select value={selection} onValueChange={setSelection}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose..." />
                </SelectTrigger>
                <SelectContent>
                  {FEEDBACK_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your feedback message..."
                className="min-h-[120px] resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  Feedback submitted successfully!
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="text-sm text-red-700 dark:text-red-400 font-semibold">Error</p>
                </div>
                <p className="text-sm text-red-700 dark:text-red-400 ml-7">{submitError}</p>
                <div className="mt-2 ml-7 text-xs text-red-600 dark:text-red-500">
                  <p>Check browser console (F12) for more details</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !selection || !message.trim() || rating === 0}
              className="w-full sm:w-auto px-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
