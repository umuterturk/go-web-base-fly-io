package handlers

import (
	"encoding/json"
	"net/http"
)

// Response represents a standard API response
type Response struct {
	Message string `json:"message"`
}

// HelloHandler returns a greeting message
func HelloHandler(w http.ResponseWriter, _ *http.Request) {
	resp := Response{
		Message: "Hello, World!",
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
