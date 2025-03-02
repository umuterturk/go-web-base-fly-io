package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/umuterturk/go-web-base-fly-io/internal/api"
	"github.com/umuterturk/go-web-base-fly-io/internal/config"
)

func main() {
	cfg := config.New()

	router := api.NewRouter()

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.Port),
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Server starting on port %d", cfg.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Create a deadline for server shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	// Run shutdown and store error
	shutdownErr := server.Shutdown(ctx)

	// Now we can safely cancel the context
	cancel()

	if shutdownErr != nil {
		log.Printf("Server shutdown error: %v", shutdownErr)
		os.Exit(1)
	}

	log.Println("Server exited gracefully")
}
