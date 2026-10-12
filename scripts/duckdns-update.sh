#!/bin/bash
# BooklyPro - DuckDNS Auto-Updater script
# Usage: ./scripts/duckdns-update.sh <subdomain> <token>
# Example: ./scripts/duckdns-update.sh salon-amina a7c4d0ad-114e-40ef-ba1d-d217904a50f2

SUBDOMAIN=$1
TOKEN=$2

if [ -z "$SUBDOMAIN" ] || [ -z "$TOKEN" ]; then
  echo "Error: Missing parameters."
  echo "Usage: ./scripts/duckdns-update.sh <duckdns-subdomain> <duckdns-token>"
  exit 1
fi

RESPONSE=$(curl -s "https://www.duckdns.org/update?domains=${SUBDOMAIN}&token=${TOKEN}&ip=")
if [ "$RESPONSE" = "OK" ]; then
  echo "[SUCCESS] DuckDNS updated: https://${SUBDOMAIN}.duckdns.org now points to this server IP."
else
  echo "[ERROR] DuckDNS update failed. Response: $RESPONSE"
  exit 1
fi
