# Go Web API Base

A base Go web API project with proper configuration, testing, and development tooling.

## Prerequisites

- Go 1.21 or later
- golangci-lint (for code linting)
- Visual Studio Code (recommended IDE)

## Go Setup

1. Install Go:
   ```bash
   # Ubuntu/Debian
   wget https://go.dev/dl/go1.21.6.linux-amd64.tar.gz
   sudo rm -rf /usr/local/go
   sudo tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz
   
   # Add to ~/.bashrc or ~/.zshrc
   export PATH=$PATH:/usr/local/go/bin
   export GOPATH=$HOME/go
   export PATH=$PATH:$GOPATH/bin
   ```

2. Verify installation:
   ```bash
   go version
   ```

3. Install Go tools:
   ```bash
   # Install essential Go tools
   go install golang.org/x/tools/gopls@latest
   go install golang.org/x/tools/cmd/goimports@latest
   go install github.com/go-delve/delve/cmd/dlv@latest
   go install github.com/fatih/gomodifytags@latest
   go install github.com/josharian/impl@latest
   go install honnef.co/go/tools/cmd/staticcheck@latest
   go install golang.org/x/tools/cmd/godoc@latest
   ```

## VSCode Setup

1. Install VSCode Extensions:
   - Go (golang.go)
   - GitLens (eamodio.gitlens)
   - Code Spell Checker (streetsidesoftware.code-spell-checker)
   - markdownlint (davidanson.vscode-markdownlint)
   - Docker (ms-azuretools.vscode-docker)

2. Install golangci-lint:
   ```bash
   # macOS
   brew install golangci-lint

   # Windows
   scoop install golangci-lint

   # Linux
   curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin
   ```

3. VSCode Features Enabled:
   - Go language server (gopls)
   - Automatic formatting on save
   - Import organization
   - Code coverage highlighting
   - Integrated debugging
   - Linting with golangci-lint

## Project Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd go-web-api
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Open in VSCode:
   ```bash
   code .
   ```

## Development

The project includes Git hooks for code quality:

- **pre-commit**: Runs linting checks before each commit
- **pre-push**: Runs all tests before pushing to remote

### Running Locally

```bash
# Terminal
go run cmd/api/main.go

# VSCode
F5 or Run > Start Debugging (Launch API configuration)
```

### Environment Variables

- `PORT`: Server port (default: 8080)
- `LOG_LEVEL`: Logging level (default: "info")
- `API_BASE_URL`: Base URL for acceptance tests

### Running Tests

```bash
# Terminal
go test ./...                  # Run all tests
go test ./tests/unit          # Run unit tests
go test ./tests/integration   # Run integration tests
go test ./tests/acceptance    # Run acceptance tests

# VSCode
Run > Start Debugging > Test Current File
Run > Start Debugging > Test All
```

### Code Quality

```bash
# Terminal
golangci-lint run ./...

# VSCode
View > Command Palette > Go: Lint Workspace
```

### Debugging

1. Set breakpoints by clicking the gutter or pressing F9
2. Start debugging with F5
3. Use the Debug toolbar for:
   - Continue (F5)
   - Step Over (F10)
   - Step Into (F11)
   - Step Out (Shift+F11)
   - Restart (Ctrl+Shift+F5)
   - Stop (Shift+F5)

## License

[Your chosen license] 