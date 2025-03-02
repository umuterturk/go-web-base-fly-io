package api

import (
	"net/http"

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

	// Static file server for the landing page and assets
	fileServer := http.FileServer(http.Dir("./static"))
	r.Handle("/static/*", http.StripPrefix("/static", fileServer))

	// Serve static files from root paths
	r.Handle("/css/*", http.StripPrefix("/css", http.FileServer(http.Dir("./static/css"))))
	r.Handle("/js/*", http.StripPrefix("/js", http.FileServer(http.Dir("./static/js"))))
	r.Handle("/img/*", http.StripPrefix("/img", http.FileServer(http.Dir("./static/img"))))

	// Serve the landing page at root
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/index.html")
	})

	// API Routes
	r.Route("/api", func(r chi.Router) {
		r.Get("/hello", handlers.HelloHandler)
		r.Get("/health", handlers.HealthHandler)
	})

	// Metrics endpoint
	r.Handle("/metrics", promhttp.Handler())

	return r
}
