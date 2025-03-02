package api

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/prometheus/client_golang/prometheus/promhttp"

	"github.com/yourusername/go-web-api/internal/api/handlers"
	custommiddleware "github.com/yourusername/go-web-api/internal/api/middleware"
)

// NewRouter creates and configures a new router
func NewRouter() chi.Router {
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(custommiddleware.Logger)
	r.Use(middleware.Recoverer)

	// Routes
	r.Get("/", handlers.HelloHandler)
	r.Get("/health", handlers.HealthHandler)
	r.Handle("/metrics", promhttp.Handler())

	return r
}
