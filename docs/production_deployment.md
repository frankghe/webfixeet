# Production Deployment Guide

| Field | Value |
|-------|-------|
| Last Updated | 2026-03-24 |
| Target | OVH VPS (shared with AIgent website and Meetr platform) |

## Prerequisites

- OVH VPS with root/sudo access
- Domain `fixeet.co` DNS A record pointing to the VPS IP
- Caddy already installed and running
- Node.js >= 20 installed (via nvm or system package)
- Git installed

## First-Time Deployment

### 0. Install Node.js

If Node.js is not already installed on the VPS, install it via nvm:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# Install Node.js 20 (LTS)
nvm install 20

# Verify
node -v   # should print v20.x.x
npm -v    # should print 10.x.x
```

### 1. Clone the Repository

```bash
ssh user@your-vps-ip
cd /opt
sudo git clone <repository-url> webfixeet
sudo chown -R $USER:$USER /opt/webfixeet
cd /opt/webfixeet
```

> **Quick setup:** You can run `./setup.sh --production` to handle steps 0 and 2-4 automatically. Then continue from step 5.

### 2. Install Dependencies

```bash
npm ci --production
```

### 3. Configure Environment

```bash
cp deploy/.env.template .env.local
# Edit .env.local with actual values
nano .env.local
```

Environment variables:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | Hostname of the SMTP server used to send contact form emails |
| `SMTP_PORT` | SMTP server port (typically 587 for STARTTLS or 465 for SSL) |
| `SMTP_USER` | Username for SMTP authentication |
| `SMTP_PASS` | Password for SMTP authentication |
| `CONTACT_EMAIL` | Email address that receives contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Public-facing URL of the site, used for meta tags and OG images |

### 4. Build the Application

```bash
npm run build
```

### 5. Configure Caddy

Add the `fixeet.co` block to the existing Caddyfile.

```bash
# Option A: Add the block directly to /etc/caddy/Caddyfile
sudo nano /etc/caddy/Caddyfile
# Paste the contents of deploy/Caddyfile.snippet at the end of the file

# Option B: Use Caddy's import directive
# Add this line to /etc/caddy/Caddyfile:
#   import /opt/webfixeet/deploy/Caddyfile.snippet

# Reload Caddy to apply changes
sudo caddy reload --config /etc/caddy/Caddyfile
```

### 6. Install systemd Service

```bash
sudo cp deploy/webfixeet.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable webfixeet
sudo systemctl start webfixeet
```

### 7. Verify Deployment

```bash
# Check service status
sudo systemctl status webfixeet

# Check Caddy is routing correctly
curl -I https://fixeet.co

# Check application logs
sudo journalctl -u webfixeet -f
```

## Updating (Deploying Changes)

### Standard Update

```bash
cd /opt/webfixeet
git pull origin main
npm ci --production
npm run build
sudo systemctl restart webfixeet
```

### Quick Reference

| Step | Command |
|------|---------|
| Pull latest code | `git pull origin main` |
| Install deps | `npm ci --production` |
| Build | `npm run build` |
| Restart | `sudo systemctl restart webfixeet` |
| Check status | `sudo systemctl status webfixeet` |
| View logs | `sudo journalctl -u webfixeet -f` |

### When Caddy Config Changes

If `deploy/Caddyfile.snippet` was updated:

```bash
sudo nano /etc/caddy/Caddyfile
sudo caddy reload --config /etc/caddy/Caddyfile
```

## Rollback

```bash
cd /opt/webfixeet
git log --oneline -5          # Find the commit to roll back to
git checkout <commit-hash>
npm ci --production
npm run build
sudo systemctl restart webfixeet
```

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Site not loading | `sudo systemctl status webfixeet` -- is the process running? |
| 502 Bad Gateway | Next.js not running or wrong port. Check `journalctl -u webfixeet` |
| TLS/certificate error | `sudo systemctl status caddy` -- Caddy manages certs automatically |
| Contact form not sending | Check `.env.local` SMTP settings. Check logs for email errors |
| Build fails | Check Node.js version (`node -v`), try `rm -rf .next && npm run build` |
| Port conflict | `sudo lsof -i :3001` -- check if another process is using port 3001 |

## Directory Layout on VPS

```
/opt/webfixeet/           # Application root
├── .env.local            # Environment variables (not in git)
├── .next/                # Build output
├── deploy/               # Deployment config files
├── docs/                 # Documentation
├── node_modules/         # Dependencies
├── public/               # Static assets
└── src/                  # Source code

/etc/caddy/Caddyfile      # Caddy configuration
/etc/systemd/system/webfixeet.service  # systemd unit
```
