package integration

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/yourusername/go-web-api/internal/api"
	"github.com/yourusername/go-web-api/internal/api/handlers"
)

func TestAPIEndpoints(t *testing.T) {
	router := api.NewRouter()
	server := httptest.NewServer(router)
	defer server.Close()

	t.Run("Hello endpoint", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/api/v1/hello")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer func() {
			if err := resp.Body.Close(); err != nil {
				t.Errorf("Failed to close response body: %v", err)
			}
		}()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Expected status OK, got %v", resp.Status)
		}

		var response handlers.Response
		if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if response.Message != "Hello, World!" {
			t.Errorf("Expected 'Hello, World!', got '%s'", response.Message)
		}
	})

	t.Run("Health endpoint", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/api/v1/health")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer func() {
			if err := resp.Body.Close(); err != nil {
				t.Errorf("Failed to close response body: %v", err)
			}
		}()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Expected status OK, got %v", resp.Status)
		}

		var response handlers.HealthResponse
		if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if response.Status != "ok" {
			t.Errorf("Expected 'ok', got '%s'", response.Status)
		}
	})
}
