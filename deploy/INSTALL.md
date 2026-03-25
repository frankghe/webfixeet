# WebFixeet — Production Installation Guide

Step-by-step instructions for deploying WebFixeet on the OVH VPS.

This guide covers two scenarios:
- **Part A**: First-time installation (fresh setup)
- **Part B**: Ongoing deployments (CI/CD and manual)

## Architecture Overview

```
Internet
   │
   ▼
Caddy (host-level, :80/:443)     ← automatic HTTPS via Let's Encrypt
   │
   ├── fixeet.com                 → 127.0.0.1:3001  (webfixeet container)
   ├── meetr.aigent.biz           → 127.0.0.1:8000-8002 (aigent containers)
   └── meetr.fixeet.co            → 127.0.0.1:8000-8002 (aigent containers)
```

All application containers bind to `127.0.0.1` — only Caddy is exposed to the internet.

---

## Part A: First-Time Installation

### Prerequisites

- OVH VPS running Ubuntu 24.04
- SSH access (as `meetr` user, set up by aigent's `setup-vps.sh`)
- Domain `fixeet.com` DNS A record pointing to the VPS IP
- Domain `www.fixeet.com` DNS A record (or CNAME) pointing to the VPS IP
- Docker installed on the VPS (done by aigent's `setup-vps.sh`)

### Step 1: SSH into the VPS

```bash
ssh meetr@<VPS_IP>
```

### Step 2: Install Caddy on the host

> **Skip this step** if Caddy is already installed as a host service.
> Check with: `systemctl status caddy`

Caddy runs as a host-level systemd service, not inside Docker. This allows it to serve all projects on the VPS.

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy
```

Stop Caddy for now — we'll configure and start it after everything is ready:

```bash
sudo systemctl stop caddy
```

### Step 3: Set up a deploy key for the repository

Generate an SSH key on the VPS for cloning from GitHub:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/webfixeet_deploy -N ""
cat ~/.ssh/webfixeet_deploy.pub
```

Add the public key to GitHub:
1. Go to https://github.com/frankghe/webfixeet/settings/keys
2. Click **Add deploy key**
3. Paste the public key, give it a title (e.g. "VPS deploy key")
4. **Do not** check "Allow write access" (read-only is sufficient)

Configure SSH to use this key for the repo:

```bash
cat >> ~/.ssh/config << 'EOF'
Host github.com-webfixeet
    HostName github.com
    User git
    IdentityFile ~/.ssh/webfixeet_deploy
    IdentitiesOnly yes
EOF
```

### Step 4: Clone the repository

```bash
sudo mkdir -p /opt/webfixeet
sudo chown meetr:meetr /opt/webfixeet
git clone git@github.com-webfixeet:frankghe/webfixeet.git /opt/webfixeet
```

> If you already have a single deploy key for all repos on github.com, you can
> skip the SSH config and clone directly:
> `git clone git@github.com:frankghe/webfixeet.git /opt/webfixeet`

### Step 5: Configure environment variables

```bash
cd /opt/webfixeet
cp deploy/.env.template .env.local
nano .env.local
```

Fill in the actual values:

| Variable | Example | Description |
|----------|---------|-------------|
| `SMTP_HOST` | `smtp.gmail.com` | SMTP server |
| `SMTP_PORT` | `587` | SMTP port (TLS) |
| `SMTP_USER` | `noreply@fixeet.com` | SMTP login |
| `SMTP_PASS` | `app-password-here` | SMTP password / app password |
| `CONTACT_EMAIL` | `contact@fixeet.com` | Where contact form emails go |
| `NEXT_PUBLIC_SITE_URL` | `https://fixeet.com` | Public URL for meta tags |

### Step 6: Install the unified Caddyfile

This Caddyfile handles all domains on the VPS. It replaces both the webfixeet Caddy snippet and the aigent Docker Caddy.

```bash
sudo cp /opt/webfixeet/deploy/Caddyfile /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
```

If validation passes, you'll see `Valid configuration`.

### Step 7: Migrate aigent from Docker Caddy to host Caddy

> **Skip this step** if aigent has already been migrated.

This is the only step that causes downtime (~30 seconds).

1. Pull the updated aigent code (with Caddy removed from its Docker setup):

```bash
cd /opt/aigent
git pull
```

2. Restart the aigent Docker stack:

```bash
docker compose -f scripts/config_server/docker-compose.prod.yml up -d --build --remove-orphans
```

This removes the old Caddy container and exposes aigent services on `127.0.0.1`.

### Step 8: Start host-level Caddy

```bash
sudo systemctl enable caddy
sudo systemctl start caddy
```

Caddy will automatically obtain TLS certificates for all configured domains.

### Step 9: Build and start WebFixeet

```bash
cd /opt/webfixeet
docker compose -f deploy/docker-compose.prod.yml up -d --build
```

### Step 10: Verify everything works

```bash
echo "=== Container status ==="
docker compose -f deploy/docker-compose.prod.yml ps

echo "=== Local health checks ==="
echo -n "webfixeet: "; curl -sf -o /dev/null -w "%{http_code}" http://localhost:3001/ ; echo
echo -n "meetr:     "; curl -sf http://localhost:8001/health && echo " OK" || echo " FAIL"
echo -n "callr:     "; curl -sf http://localhost:8000/health && echo " OK" || echo " FAIL"

echo "=== External (via Caddy) ==="
echo -n "fixeet.com:         "; curl -sf -o /dev/null -w "%{http_code}" https://fixeet.com/ ; echo
echo -n "meetr.aigent.biz:   "; curl -sf -o /dev/null -w "%{http_code}" https://meetr.aigent.biz/health ; echo
echo -n "meetr.fixeet.co:    "; curl -sf -o /dev/null -w "%{http_code}" https://meetr.fixeet.co/health ; echo

echo "=== Caddy TLS status ==="
sudo journalctl -u caddy --no-pager -n 10 | grep -i "tls\|certificate\|error" || echo "No TLS issues"
```

Expected results:
- `webfixeet`: `307` (locale redirect — this is correct)
- `meetr` / `callr`: `200` with health response
- External URLs: `200` or `307` (confirms Caddy is proxying and TLS works)

---

## Part B: Ongoing Deployments

### Option 1: CI/CD via GitHub Actions (recommended)

#### One-time setup

1. **Add GitHub secrets** to the repository (Settings → Secrets and variables → Actions):

   | Secret | Value |
   |--------|-------|
   | `VPS_HOST` | VPS IP address or hostname |
   | `VPS_USER` | `meetr` |
   | `VPS_SSH_KEY` | Contents of `~/.ssh/webfixeet_deploy` (private key) |

2. **Activate the workflow**:

   ```bash
   # On your local machine
   cd /path/to/webfixeet
   mkdir -p .github/workflows
   cp deploy/deploy.yml .github/workflows/deploy.yml
   git add .github/workflows/deploy.yml
   git commit -m "Activate deployment workflow"
   git push
   ```

3. **Create deployment branches** (first time only):

   ```bash
   git checkout -b deploy/prod
   git push -u origin deploy/prod
   git checkout -b deploy/test
   git push -u origin deploy/test
   git checkout main
   ```

#### Deploy to production

```bash
git checkout deploy/prod
git merge main
git push origin deploy/prod
```

GitHub Actions will:
1. Run `npm run lint` and `npm test`
2. SSH into the VPS
3. Pull the code
4. `docker compose build` + `up -d`
5. Run a health check

Monitor the workflow at: https://github.com/frankghe/webfixeet/actions

#### Deploy to staging

```bash
git checkout deploy/test
git merge main
git push origin deploy/test
```

### Option 2: Manual deployment

```bash
ssh meetr@<VPS_IP>
cd /opt/webfixeet
git pull
docker compose -f deploy/docker-compose.prod.yml up -d --build
```

Verify:

```bash
docker compose -f deploy/docker-compose.prod.yml ps
curl -sf -o /dev/null -w "%{http_code}" http://localhost:3001/
```

---

## Updating the Caddyfile

When `deploy/Caddyfile` changes (e.g. adding a new domain):

```bash
ssh meetr@<VPS_IP>
cd /opt/webfixeet
git pull
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

---

## Rollback

### Roll back WebFixeet

```bash
ssh meetr@<VPS_IP>
cd /opt/webfixeet
git log --oneline -5                  # find the last good commit
git checkout <commit-hash>
docker compose -f deploy/docker-compose.prod.yml up -d --build
```

### Roll back to Docker Caddy (emergency)

If the host-level Caddy migration fails and you need to revert:

```bash
sudo systemctl stop caddy
sudo systemctl disable caddy
cd /opt/aigent
git checkout <commit-before-caddy-removal>
docker compose -f scripts/config_server/docker-compose.prod.yml up -d --build
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker compose -f deploy/docker-compose.prod.yml logs --tail 50

# Check if port 3001 is already in use
sudo ss -tlnp | grep 3001

# Rebuild from scratch
docker compose -f deploy/docker-compose.prod.yml down
docker compose -f deploy/docker-compose.prod.yml up -d --build --force-recreate
```

### Caddy won't start or TLS errors

```bash
# Validate config
sudo caddy validate --config /etc/caddy/Caddyfile

# Check logs
sudo journalctl -u caddy -f

# Check if ports 80/443 are free
sudo ss -tlnp | grep -E ':80|:443'

# Common issue: old Docker Caddy still running
docker ps | grep caddy
```

### Site returns 502 Bad Gateway

Caddy is running but can't reach the container:

```bash
# Is the container running?
docker compose -f deploy/docker-compose.prod.yml ps

# Is it listening on the right port?
curl -v http://localhost:3001/

# Check container health
docker inspect --format='{{json .State.Health}}' $(docker compose -f deploy/docker-compose.prod.yml ps -q)
```

### DNS not resolving

```bash
# Check DNS
dig fixeet.com +short

# Should return the VPS IP. If not, update DNS and wait for propagation.
# Caddy will retry TLS certificate issuance automatically.
```
