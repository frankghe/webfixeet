#!/usr/bin/env bash
set -euo pipefail

# --- Defaults ---
MODE="dev"

# --- Argument parsing ---
for arg in "$@"; do
  case "$arg" in
    --dev)
      MODE="dev"
      ;;
    --production)
      MODE="production"
      ;;
    --help|-h)
      echo "Usage: $0 [--dev|--production] [--help]"
      echo ""
      echo "Flags:"
      echo "  --dev          Dev setup (default): installs all deps including devDependencies,"
      echo "                 checks shadcn/ui init, verifies build."
      echo "  --production   Production setup: clean install without devDependencies,"
      echo "                 copies .env.template if .env.local is missing, verifies build."
      echo "  --help, -h     Show this help message."
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg"
      echo "Run '$0 --help' for usage."
      exit 1
      ;;
  esac
done

echo "=== WebFixeet Environment Setup (mode: $MODE) ==="

# --- Node.js via nvm ---
REQUIRED_NODE_MAJOR=20

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  echo "Installing nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi

# shellcheck source=/dev/null
. "$NVM_DIR/nvm.sh"

echo "Installing Node.js $REQUIRED_NODE_MAJOR..."
nvm install "$REQUIRED_NODE_MAJOR"
nvm use "$REQUIRED_NODE_MAJOR"

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# --- npm dependencies ---
if [ "$MODE" = "production" ]; then
  echo "Installing npm dependencies (production only)..."
  npm ci --production
else
  echo "Installing npm dependencies..."
  npm install
fi

# --- shadcn/ui (dev mode only: already initialized, but ensure components.json exists) ---
if [ "$MODE" = "dev" ]; then
  if [ ! -f components.json ]; then
    echo "Initializing shadcn/ui..."
    npx shadcn@latest init --defaults --yes
  fi
fi

# --- Production environment setup ---
if [ "$MODE" = "production" ]; then
  if [ ! -f .env.local ]; then
    if [ -f deploy/.env.template ]; then
      echo "Copying deploy/.env.template to .env.local..."
      cp deploy/.env.template .env.local
      echo ""
      echo "IMPORTANT: Edit .env.local with your actual environment values before starting the service."
      echo ""
    else
      echo "Warning: deploy/.env.template not found. Create .env.local manually before starting the service."
    fi
  fi
fi

# --- Playwright (dev mode only) ---
if [ "$MODE" = "dev" ]; then
  echo "Installing Playwright browsers..."
  if ! npx playwright install chromium; then
    echo ""
    echo "NOTE: Playwright browser install failed. You may need to install system dependencies:"
    echo "  sudo npx playwright install-deps chromium"
    echo "Then re-run: npx playwright install chromium"
  fi
fi

# --- Verify build ---
echo "Verifying production build..."
npm run build

echo ""
echo "=== Setup complete ==="
if [ "$MODE" = "production" ]; then
  echo "Run 'sudo systemctl start webfixeet' to start the service."
else
  echo "Run 'nvm use' then 'npm run dev' to start developing."
fi
