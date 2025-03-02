# Go Web API Base

[![Go Report Card](https://goreportcard.com/badge/github.com/umuterturk/go-web-base-fly-io)](https://goreportcard.com/report/github.com/umuterturk/go-web-base-fly-io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg)](https://www.buymeacoffee.com/codeonbrew)
[![Twitter Follow](https://img.shields.io/badge/follow-%40codeonbrew-1DA1F2?logo=twitter&style=social)](https://twitter.com/codeonbrew)

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
- ✅ Retro pixel art landing page demo
- ✅ GitHub Actions CI/CD workflows

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

# Access the retro landing page
open http://localhost:8080
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
├── .github/               # GitHub configuration
│   └── workflows/         # GitHub Actions workflows
├── cmd/                   # Application entry points
│   └── api/               # API server
├── internal/              # Private application code
│   ├── api/               # API-specific code
│   │   ├── handlers/      # HTTP handlers
│   │   ├── middleware/    # HTTP middleware
│   │   └── router.go      # Router setup
│   └── config/            # Configuration
├── static/                # Static assets
│   ├── css/               # CSS stylesheets
│   ├── js/                # JavaScript files
│   ├── img/               # Images and graphics
│   └── index.html         # Landing page
├── tests/                 # Test suites
│   ├── acceptance/        # End-to-end tests
│   ├── integration/       # Integration tests
│   └── unit/              # Unit tests
├── .golangci.yml          # Linter configuration
├── Dockerfile             # Container definition
├── fly.toml               # Fly.io configuration
├── go.mod                 # Go module definition
└── README.md              # This file
```

## Development Workflow

### GitHub Actions Workflows

The project includes GitHub Actions workflows for automated CI/CD:

- **Tests Workflow** (`.github/workflows/tests.yml`): 
  - Triggers on pushes/PRs to the main branch
  - Sets up Go environment
  - Installs dependencies
  - Runs linter checks with golangci-lint
  - Executes all tests with race condition detection

- **Deployment Workflow** (`.github/workflows/deploy.yml.base`):
  - Activates after successful test workflow completion
  - Deploys to Fly.io when commit messages contain "deploy to fly.io"
  - Requires setting up a `FLY_API_TOKEN` secret in your repository
  - Rename from `.base` extension and customize as needed

To enable the deployment workflow:
```bash
# Rename the base file to activate it
mv .github/workflows/deploy.yml.base .github/workflows/deploy.yml

# Add your Fly.io API token as a repository secret named FLY_API_TOKEN
```

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

### Retro Landing Page

The project includes a retro pixel art style landing page to demonstrate static file serving:

- Visit `http://localhost:8080/` after starting the server
- Features interactive elements and API integration
- Includes a theme switcher and Konami code easter egg (↑↑↓↓←→←→BA)
- Demonstrates serving static assets (HTML, CSS, JS, SVG)

![Retro Landing Page](https://i.imgur.com/placeholder-image.png)

### Working with Static Pages

This project demonstrates handling static files in a Go web application:

1. **File Structure**
   - All static assets are in the `static/` directory
   - `index.html` serves as the main landing page
   - CSS, JavaScript, and images are in separate subdirectories

2. **Router Configuration** (in `internal/api/router.go`)
   ```go
   // Serve static files
   fileServer := http.FileServer(http.Dir("static"))
   r.Handle("/*", fileServer)
   
   // API routes under /api prefix
   r.Route("/api", func(r chi.Router) {
       r.Get("/health", handlers.HealthHandler)
       r.Get("/hello", handlers.HelloHandler)
   })
   ```

3. **Adding New Pages**
   - Place HTML files in the `static/` directory
   - Add CSS and JavaScript in respective subdirectories
   - Reference them with paths relative to the static root (e.g., `/css/styles.css`)

4. **Best Practices**
   - Use relative paths for assets instead of hardcoded URLs
   - Minify assets for production deployment
   - Consider using a build step for complex frontend applications
   - Keep API endpoints separate under the `/api` prefix

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

This project is configured for easy deployment to [Fly.io](https://fly.io), a platform for running full-stack apps globally.

<details>
<summary><b>Initial Setup</b></summary>

1. Install the Fly.io CLI:
   ```bash
   # macOS / Linux
   curl -L https://fly.io/install.sh | sh
   
   # Windows PowerShell
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. Add flyctl to your PATH (if the installer didn't do it automatically)

3. Sign up or log in to Fly.io:
   ```bash
   # Sign up
   fly auth signup
   
   # Or log in
   fly auth login
   ```

4. Verify your installation:
   ```bash
   fly version
   ```
</details>

<details>
<summary><b>Deploying After Forking</b></summary>

If you've forked this repository, you'll need to update the app name in `fly.toml`:

1. Open `fly.toml` and update the app name:
   ```toml
   app = "your-app-name" # Change this to a unique name
   ```

2. Launch the app for the first time:
   ```bash
   fly launch
   ```
   - When prompted, select "No" to creating a new app
   - Select "Yes" to use an existing configuration
   - Choose your preferred region
   - Select "No" to setting up a PostgreSQL database
   - Select "No" to setting up a Redis database
   - Select "Yes" to deploy now

3. For subsequent deployments:
   ```bash
   fly deploy
   ```

4. View your deployed app:
   ```bash
   fly open
   ```

5. Check app status:
   ```bash
   fly status
   ```

6. View logs:
   ```bash
   fly logs
   ```

To use the GitHub Actions deployment workflow:

1. Generate a Fly.io API token:
   ```bash
   fly auth token
   ```

2. Add the token as a secret in your GitHub repository:
   - Go to Settings > Secrets and variables > Actions > New repository secret
   - Name: `FLY_API_TOKEN`
   - Value: Your Fly.io API token

3. Rename the deployment workflow file:
   ```bash
   mv .github/workflows/deploy.yml.base .github/workflows/deploy.yml
   ```

4. When ready to deploy, include "deploy to fly.io" in your commit message:
   ```bash
   git commit -m "Updated application features - deploy to fly.io"
   ```

5. Push to main branch, and the workflow will automatically deploy
</details>

<details>
<summary><b>Environment Variables</b></summary>

Set environment variables for your Fly.io deployment:

```bash
# Set a single environment variable
fly secrets set PORT=8080

# Set multiple environment variables
fly secrets set PORT=8080 LOG_LEVEL=info

# View current secrets
fly secrets list
```
</details>

<details>
<summary><b>Scaling</b></summary>

Scale your application on Fly.io:

```bash
# Scale to multiple instances
fly scale count 2

# Scale machine size
fly scale vm shared-cpu-1x

# View current scale
fly status
```
</details>

<details>
<summary><b>Monitoring</b></summary>

Monitor your application:

```bash
# View logs
fly logs

# View metrics dashboard
fly dashboard

# SSH into the VM
fly ssh console
```
</details>

<details>
<summary><b>Troubleshooting</b></summary>

Common issues and solutions:

1. **Deployment fails with "App name already exists"**:
   - Change the app name in `fly.toml`
   - Or create a new app with `fly apps create your-app-name`

2. **Port binding issues**:
   - Ensure your app is listening on the port specified by the `PORT` environment variable
   - The default port in this template is 8080

3. **Resource constraints**:
   - Scale up your VM with `fly scale vm shared-cpu-2x`
   - Or add more memory with `fly scale memory 1024`

4. **Networking issues**:
   - Check your firewall settings with `fly status`
   - Ensure your app is properly handling HTTP requests
</details>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Supporting the Project

If you find this project helpful and would like to support its development:

- ☕ [Buy me a coffee](https://www.buymeacoffee.com/codeonbrew)
- 🐦 Follow me on [X/Twitter](https://x.com/codeonbrew) for updates
- ⭐ Star the repository on GitHub
- 🐛 Report bugs or suggest features through GitHub issues

## License

This project is licensed under the MIT License - see the LICENSE file for details. 