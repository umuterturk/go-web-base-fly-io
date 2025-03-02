package middleware

import (
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5/middleware"
)

// Logger is a middleware that logs the start and end of each request
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := middleware.GetReqID(r.Context())
		start := time.Now()

		log.Printf("Started [%s] %s %s", requestID, r.Method, r.URL.Path)

		ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)
		next.ServeHTTP(ww, r)

		log.Printf("Completed [%s] %s %s in %s with status %d",
			requestID, r.Method, r.URL.Path, time.Since(start), ww.Status())
	})
}
