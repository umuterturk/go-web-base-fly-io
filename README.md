# Go Web API Base

[![Go Report Card](https://goreportcard.com/badge/github.com/umuterturk/go-web-base-fly-io)](https://goreportcard.com/report/github.com/umuterturk/go-web-base-fly-io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A production-ready Go web API starter template with proper configuration, testing, and development tooling. Deploy to [Fly.io](https://fly.io) with ease.

## Features

- ✅ Modern Go project structure
- ✅ Chi router with middleware
- ✅ Prometheus metrics
- ✅ Comprehensive test suite (unit, integration, acceptance)
- ✅ Docker support
- ✅ Fly.io deployment configuration
- ✅ Git hooks for code quality
- ✅ VSCode integration
- ✅ Strict linting with performance focus

## Prerequisites

- Go 1.21 or later
- golangci-lint (for code linting)
- Git
- Visual Studio Code (recommended IDE)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/umuterturk/go-web-base-fly-io.git
cd go-web-base-fly-io

# Install dependencies
go mod download

# Run the server
go run cmd/api/main.go
```

## Detailed Setup Guide

### Go Installation

<details>
<summary><b>Linux</b></summary>

```bash
# Ubuntu/Debian
wget https://go.dev/dl/go1.21.6.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz

# Add to ~/.bashrc or ~/.zshrc
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc

# Verify installation
go version
```
</details>

<details>
<summary><b>macOS</b></summary>

```bash
# Using Homebrew
brew install go

# Or manual installation
wget https://go.dev/dl/go1.21.6.darwin-amd64.pkg
open go1.21.6.darwin-amd64.pkg
# Follow the installer instructions

# Add to ~/.zshrc or ~/.bash_profile
echo 'export GOPATH=$HOME/go' >> ~/.zshrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.zshrc
source ~/.zshrc

# Verify installation
go version
```
</details>

<details>
<summary><b>Windows</b></summary>

1. Download the installer from [golang.org/dl](https://golang.org/dl/)
2. Run the installer and follow the prompts
3. Verify installation by opening Command Prompt or PowerShell:
   ```
   go version
   ```
4. Set up environment variables (if not done by installer):
   - Right-click on "This PC" > Properties > Advanced system settings > Environment Variables
   - Add/update the following:
     - GOPATH: `%USERPROFILE%\go`
     - Add to PATH: `%USERPROFILE%\go\bin`
</details>

### Install golangci-lint

<details>
<summary><b>Linux</b></summary>

```bash
# Binary installation
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

# Using Snap
sudo snap install golangci-lint

# Verify installation
golangci-lint --version
```
</details>

<details>
<summary><b>macOS</b></summary>

```bash
# Using Homebrew
brew install golangci-lint

# Verify installation
golangci-lint --version
```
</details>

<details>
<summary><b>Windows</b></summary>

```powershell
# Using Scoop
scoop install golangci-lint

# Using Chocolatey
choco install golangci-lint

# Manual installation
# Download from https://github.com/golangci/golangci-lint/releases
# Extract and add to PATH

# Verify installation
golangci-lint --version
```
</details>

### Install Go Tools

These tools enhance your Go development experience:

```bash
# Essential Go development tools
go install golang.org/x/tools/gopls@latest                  # Go language server
go install golang.org/x/tools/cmd/goimports@latest          # Import organization
go install github.com/go-delve/delve/cmd/dlv@latest         # Debugger
go install github.com/fatih/gomodifytags@latest             # JSON/YAML tag management
go install github.com/josharian/impl@latest                 # Interface implementation generator
go install honnef.co/go/tools/cmd/staticcheck@latest        # Static analysis
go install golang.org/x/tools/cmd/godoc@latest              # Documentation server
```

### VSCode Setup

1. Install [Visual Studio Code](https://code.visualstudio.com/)

2. Install the recommended extensions:
   - [Go](https://marketplace.visualstudio.com/items?itemName=golang.go)
   - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
   - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
   - [markdownlint](https://marketplace.visualstudio.com/items?itemName=davidanson.vscode-markdownlint)
   - [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

3. Open the project in VSCode:
   ```bash
   code .
   ```

4. When prompted, install the Go tools that VSCode recommends

## Project Structure

```
.
├── cmd/                  # Application entry points
│   └── api/              # API server
├── internal/             # Private application code
│   ├── api/              # API-specific code
│   │   ├── handlers/     # HTTP handlers
│   │   ├── middleware/   # HTTP middleware
│   │   └── router.go     # Router setup
│   └── config/           # Configuration
├── tests/                # Test suites
│   ├── acceptance/       # End-to-end tests
│   ├── integration/      # Integration tests
│   └── unit/             # Unit tests
├── .golangci.yml         # Linter configuration
├── Dockerfile            # Container definition
├── fly.toml              # Fly.io configuration
├── go.mod                # Go module definition
└── README.md             # This file
```

## Development Workflow

### Git Hooks

The project includes Git hooks for code quality:

- **pre-commit**: Runs linting checks before each commit
- **pre-push**: Runs all tests before pushing to remote

### Running the API

```bash
# Terminal
go run cmd/api/main.go

# VSCode
F5 or Run > Start Debugging (Launch API configuration)
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `LOG_LEVEL` | Logging level (debug, info, warn, error) | `info` |
| `API_BASE_URL` | Base URL for acceptance tests | - |

### Testing

```bash
# Run all tests
go test ./...

# Run specific test suites
go test ./tests/unit          # Unit tests
go test ./tests/integration   # Integration tests
go test ./tests/acceptance    # Acceptance tests (requires API_BASE_URL)

# Run with coverage
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out -o coverage.html
```

In VSCode:
- Run > Start Debugging > Test Current File
- Run > Start Debugging > Test All

### Code Quality

```bash
# Run linter
golangci-lint run ./...

# In VSCode
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

## Deployment

### Docker

```bash
# Build the image
docker build -t go-web-api .

# Run the container
docker run -p 8080:8080 go-web-api
```

### Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
fly auth login

# Deploy the application
fly deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 