#!/bin/bash

# WIA-CITY-014: Security System Installation Script
# 弘益人間 (Hongik Ingan) - Benefit All Humanity

set -e

echo "========================================"
echo "WIA-CITY-014: Security System System"
echo "Installation Script v1.0"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

echo -e "${BLUE}Installing WIA-CITY-014 Security System System...${NC}"
echo ""

# Install Node.js dependencies
echo -e "${BLUE}[1/4] Installing Node.js dependencies...${NC}"
cd api/typescript
npm install
npm run build
cd ../..

# Set up CLI tools
echo -e "${BLUE}[2/4] Setting up CLI tools...${NC}"
chmod +x cli/security-system-city.sh
ln -sf "$(pwd)/cli/security-system-city.sh" /usr/local/bin/wia-security-system-city

# Install system dependencies
echo -e "${BLUE}[3/4] Installing system dependencies...${NC}"
apt-get update
apt-get install -y mosquitto mosquitto-clients python3-pip

# Create configuration
echo -e "${BLUE}[4/4] Creating configuration...${NC}"
mkdir -p /etc/wia-security-system-city
cat > /etc/wia-security-system-city/config.json <<CONFEOF
{
  "version": "1.0.0",
  "standard": "WIA-CITY-014",
  "certificationLevel": "bronze",
  "zones": []
}
CONFEOF

echo ""
echo -e "${GREEN}========================================"
echo "Installation Complete!"
echo "========================================${NC}"
echo ""
echo "Quick Start:"
echo "  wia-security-system-city on       # Turn on lights"
echo "  wia-security-system-city status   # Check status"
echo "  wia-security-system-city optimize # Optimize energy"
echo ""
echo "Configuration: /etc/wia-security-system-city/config.json"
echo "Documentation: ./ebook/en/index.html"
echo "Simulator: ./simulator/index.html"
echo ""
echo "弘益人間 - Benefit All Humanity"
echo ""
