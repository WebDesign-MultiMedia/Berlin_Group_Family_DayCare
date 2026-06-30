#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
#  Berlin Group Family Daycare — local dev server
#  Opens the site at http://localhost:3000
#  Requires: Node.js  (https://nodejs.org)
# ──────────────────────────────────────────────────────────────
cd "$(dirname "$0")"

# Try npx serve first (zero-install)
if command -v npx &>/dev/null; then
  echo "Starting server at http://localhost:3000 …"
  open "http://localhost:3000"
  npx --yes serve . --listen 3000
# Fall back to Python 3
elif command -v python3 &>/dev/null; then
  echo "Starting Python server at http://localhost:3000 …"
  open "http://localhost:3000"
  python3 -m http.server 3000
# Fall back to Python 2
elif command -v python &>/dev/null; then
  echo "Starting Python server at http://localhost:3000 …"
  open "http://localhost:3000"
  python -m SimpleHTTPServer 3000
else
  echo "ERROR: Node.js or Python is required to run a local server."
  echo "Install Node.js from https://nodejs.org and try again."
  exit 1
fi
