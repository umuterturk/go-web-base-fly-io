# Go Web API Base

A base Go web API project with proper configuration, testing, and development tooling.

## Prerequisites

- Go 1.21 or later
- golangci-lint (for code linting)

## Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd go-web-api
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Install golangci-lint:
   ```bash
   # macOS
   brew install golangci-lint

   # Windows
   scoop install golangci-lint

   # Linux
   curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin
   ```

## Development

The project includes Git hooks for code quality:

- **pre-commit**: Runs linting checks before each commit
- **pre-push**: Runs all tests before pushing to remote

### Running Locally

```bash
go run cmd/api/main.go
```

### Environment Variables

- `PORT`: Server port (default: 8080)
- `LOG_LEVEL`: Logging level (default: "info")
- `API_BASE_URL`: Base URL for acceptance tests

### Running Tests

```bash
# Run all tests
go test ./...

# Run specific test suite
go test ./tests/unit
go test ./tests/integration
go test ./tests/acceptance
```

### Code Quality

```bash
# Run linter
golangci-lint run ./...
```

## License

[Your chosen license] 