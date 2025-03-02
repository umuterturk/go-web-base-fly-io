package acceptance

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"testing"
)

// These tests are meant to be run against a deployed instance
// They can be skipped during normal test runs

func TestLiveEndpoints(t *testing.T) {
	baseURL := os.Getenv("API_BASE_URL")
	if baseURL == "" {
		t.Skip("Skipping acceptance tests: API_BASE_URL not set")
	}

	t.Run("Hello endpoint", func(t *testing.T) {
		resp, err := http.Get(fmt.Sprintf("%s/", baseURL))
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

		var response struct {
			Message string `json:"message"`
		}
		if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if response.Message != "Hello, World!" {
			t.Errorf("Expected 'Hello, World!', got '%s'", response.Message)
		}
	})

	t.Run("Health endpoint", func(t *testing.T) {
		resp, err := http.Get(fmt.Sprintf("%s/health", baseURL))
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

		var response struct {
			Status string `json:"status"`
		}
		if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if response.Status != "ok" {
			t.Errorf("Expected 'ok', got '%s'", response.Status)
		}
	})

	t.Run("Metrics endpoint", func(t *testing.T) {
		resp, err := http.Get(fmt.Sprintf("%s/metrics", baseURL))
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
	})
}
