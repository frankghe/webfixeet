# Deployment Guide

WebFixeet runs as a Docker container behind a host-level Caddy reverse proxy on an OVH VPS. Deployments are triggered by pushing to `deploy/prod` or `deploy/test` branches via GitHub Actions.

## Prerequisites

- OVH VPS running Ubuntu 24.04 (shared with aigent services)
- SSH access to the VPS
- Docker installed on the VPS
- Domain `fixeet.co` pointing to the VPS IP

## First-Time Server Setup

These steps are performed once on a fresh VPS.

### 1. Install Caddy on the host

Caddy runs as a host-level systemd service (not in Docker) so it can route traffic to all projects on the VPS.

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy
```

### 2. Install the unified Caddyfile

The Caddyfile handles routing for all domains on the VPS (`fixeet.co`, `meetr.aigent.biz`, `meetr.fixeet.co`).

```bash
sudo cp /opt/webfixeet/deploy/Caddyfile /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

### 3. Install Docker

If not already installed (the aigent VPS setup script handles this):

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

### 4. Clone the repository

```bash
sudo mkdir -p /opt/webfixeet
sudo chown $USER:$USER /opt/webfixeet
git clone git@github.com:<your-org>/webfixeet.git /opt/webfixeet
```

### 5. Configure environment variables

```bash
cp /opt/webfixeet/deploy/.env.template /opt/webfixeet/.env.local
```

Edit `.env.local` with actual values:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (typically 587) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `CONTACT_EMAIL` | Contact form recipient email |
| `NEXT_PUBLIC_SITE_URL` | `https://fixeet.co` |

### 6. Build and start the container

```bash
cd /opt/webfixeet
docker compose -f deploy/docker-compose.prod.yml up -d --build
```

### 7. Verify

```bash
# Check container is running
docker compose -f deploy/docker-compose.prod.yml ps

# Health check (expect 307 redirect to locale)
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/

# Check Caddy is proxying correctly
curl -s -o /dev/null -w "%{http_code}" https://fixeet.co/
```

## Migrating Aigent from Docker Caddy to Host Caddy

When moving to the host-level Caddy, the aigent project needs these changes:

### In `scripts/config_server/docker-compose.prod.yml`:

1. **Remove** the `caddy` service entirely
2. **Remove** `caddy_data` and `caddy_config` from the `volumes:` section
3. **Add host-bound ports** to each service:

```yaml
callr:
  ports:
    - "127.0.0.1:8000:8000"
  # ... rest unchanged

meetr:
  ports:
    - "127.0.0.1:8001:8001"
  # ... rest unchanged

sample_app:
  ports:
    - "127.0.0.1:8002:8002"
  # ... rest unchanged

grafana:
  ports:
    - "127.0.0.1:3000:3000"
  # ... rest unchanged
```

4. **Update `prometheus.yml`**: remove or update the `caddy:2019` scrape target
5. **Update `deploy.yml`**: add `sudo systemctl reload caddy` after `docker compose up`

Binding to `127.0.0.1` ensures only the host-level Caddy can reach the containers — they are not exposed to the internet directly.

## CI/CD Deployment

Deployments are triggered by GitHub Actions when pushing to deployment branches.

### Setup GitHub secrets

In your GitHub repo settings, add:

| Secret | Value |
|--------|-------|
| `VPS_HOST` | Server IP or hostname |
| `VPS_USER` | SSH user (e.g. `meetr`) |
| `VPS_SSH_KEY` | Private SSH key for the user |

### Activate the workflow

```bash
mkdir -p .github/workflows
cp deploy/deploy.yml .github/workflows/deploy.yml
git add .github/workflows/deploy.yml
git commit -m "Add deployment workflow"
git push
```

### Deploy to production

```bash
git checkout -b deploy/prod
git merge main
git push origin deploy/prod
```

GitHub Actions will:
1. Run lint and tests
2. SSH into the VPS
3. Pull the latest code
4. Build the Docker image
5. Restart the container
6. Run a health check

### Deploy to staging

```bash
git checkout -b deploy/test
git merge main
git push origin deploy/test
```

## Manual Deployment

If you need to deploy without CI/CD:

```bash
ssh $VPS_USER@$VPS_HOST
cd /opt/webfixeet
git pull
docker compose -f deploy/docker-compose.prod.yml up -d --build
```

## Updating the Caddyfile

After modifying `deploy/Caddyfile`:

```bash
sudo cp /opt/webfixeet/deploy/Caddyfile /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

## Troubleshooting

### Check container logs

```bash
docker compose -f deploy/docker-compose.prod.yml logs -f
```

### Check Caddy logs

```bash
sudo journalctl -u caddy -f
```

### Rebuild from scratch

```bash
docker compose -f deploy/docker-compose.prod.yml down
docker compose -f deploy/docker-compose.prod.yml up -d --build --force-recreate
```

### Container health

```bash
docker compose -f deploy/docker-compose.prod.yml ps
docker inspect --format='{{.State.Health.Status}}' webfixeet
```

## Architecture

```
Internet
   │
   ▼
Caddy (host, :80/:443)     ← automatic HTTPS via Let's Encrypt
   │
   ├── fixeet.co           → 127.0.0.1:3001 (webfixeet Docker container)
   ├── meetr.aigent.biz     → 127.0.0.1:8000-8002 (aigent Docker containers)
   └── meetr.fixeet.co      → 127.0.0.1:8000-8002 (aigent Docker containers)
```

Each project runs its own independent Docker Compose stack. Only Caddy exposes ports 80/443 to the internet.
