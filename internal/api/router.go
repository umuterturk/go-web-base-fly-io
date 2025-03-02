package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/prometheus/client_golang/prometheus/promhttp"

	"github.com/umuterturk/go-web-base-fly-io/internal/api/handlers"
	customMiddleware "github.com/umuterturk/go-web-base-fly-io/internal/api/middleware"
)

func NewRouter() chi.Router {
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(customMiddleware.Logger)
	r.Use(middleware.Recoverer)

	// Setup static file handlers
	setupStaticFileHandlers(r)

	// API Routes
	setupApiRoutes(r)

	// Metrics endpoint
	r.Handle("/metrics", promhttp.Handler())

	return r
}

func setupApiRoutes(r chi.Router) {
	r.Route("/api/v1", func(r chi.Router) {
		r.Get("/hello", handlers.HelloHandler)
		r.Get("/health", handlers.HealthHandler)
	})
}

func setupStaticFileHandlers(r chi.Router) {
	fileServer := http.FileServer(http.Dir("./docs"))
	r.Handle("/docs/*", http.StripPrefix("/docs", fileServer))

	r.Handle("/css/*", http.StripPrefix("/css", http.FileServer(http.Dir("./docs/css"))))
	r.Handle("/js/*", http.StripPrefix("/js", http.FileServer(http.Dir("./docs/js"))))
	r.Handle("/img/*", http.StripPrefix("/img", http.FileServer(http.Dir("./docs/img"))))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./docs/index.html")
	})
}
