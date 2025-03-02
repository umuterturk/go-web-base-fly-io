package handlers

import (
	"encoding/json"
	"net/http"
)

// HealthResponse represents a health check response
type HealthResponse struct {
	Status string `json:"status"`
}

// HealthHandler returns the service health status
func HealthHandler(w http.ResponseWriter, _ *http.Request) {
	resp := HealthResponse{
		Status: "ok",
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
