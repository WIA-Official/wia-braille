#!/bin/bash

# WIA-CITY-010: Smart HVAC System Installation Script
# 弘益人間 (Hongik Ingan) - Benefit All Humanity

set -e

echo "========================================"
echo "WIA-CITY-010: Smart HVAC System"
echo "Installation Script v1.0"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

echo -e "${BLUE}Installing WIA-CITY-010 Smart HVAC System...${NC}"
echo ""

# Install Node.js dependencies for API
echo -e "${BLUE}[1/5] Installing Node.js dependencies...${NC}"
cd api/typescript
npm install
npm run build
cd ../..

# Set up CLI tools
echo -e "${BLUE}[2/5] Setting up CLI tools...${NC}"
chmod +x cli/hvac-system.sh
ln -sf "$(pwd)/cli/hvac-system.sh" /usr/local/bin/wia-hvac

# Install system dependencies
echo -e "${BLUE}[3/5] Installing system dependencies...${NC}"
apt-get update
apt-get install -y \
    mosquitto \
    mosquitto-clients \
    python3-pip \
    python3-dev \
    build-essential

# Install Python packages for sensors
echo -e "${BLUE}[4/5] Installing Python sensor libraries...${NC}"
pip3 install \
    adafruit-circuitpython-dht \
    adafruit-circuitpython-bme280 \
    paho-mqtt \
    requests

# Create configuration directory
echo -e "${BLUE}[5/5] Creating configuration...${NC}"
mkdir -p /etc/wia-hvac
cat > /etc/wia-hvac/config.json <<EOF
{
  "version": "1.0.0",
  "standard": "WIA-CITY-010",
  "certificationLevel": "bronze",
  "mqtt": {
    "broker": "localhost",
    "port": 1883
  },
  "sensors": {
    "temperature": {
      "enabled": true,
      "updateInterval": 60
    },
    "humidity": {
      "enabled": true,
      "updateInterval": 60
    },
    "co2": {
      "enabled": false,
      "updateInterval": 300
    }
  },
  "zones": []
}
EOF

echo ""
echo -e "${GREEN}========================================"
echo "Installation Complete!"
echo "========================================${NC}"
echo ""
echo "Quick Start:"
echo "  wia-hvac start    # Start HVAC system"
echo "  wia-hvac status   # Check system status"
echo "  wia-hvac optimize # Run energy optimization"
echo ""
echo "Configuration: /etc/wia-hvac/config.json"
echo "Documentation: ./ebook/en/index.html"
echo "Simulator: ./simulator/index.html"
echo ""
echo "弘益人間 - Benefit All Humanity"
echo ""
