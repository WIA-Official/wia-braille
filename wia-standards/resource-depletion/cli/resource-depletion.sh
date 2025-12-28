#!/bin/bash

################################################################################
# WIA-ENE-039: Resource Depletion Response Standard - CLI Tool
#
# 弘益人間 (홍익人간) - Benefit All Humanity
#
# This CLI tool provides command-line access to the WIA-ENE-039
# Resource Depletion Response Standard API.
#
# Usage:
#   resource-depletion.sh <command> [options]
#
# Commands:
#   status           Get resource status
#   forecast         Get depletion forecast
#   alerts           Manage early warning alerts
#   strategies       Manage mitigation strategies
#   reserves         Manage strategic reserves
#   alternatives     Search alternative materials
#   dashboard        View KPI dashboard
#   report           Generate reports
#   help             Show this help
#
# Version: 1.0.0
# License: MIT
################################################################################

set -e  # Exit on error

# Configuration
VERSION="1.0.0"
API_ENDPOINT="${WIA_API_ENDPOINT:-https://api.wia.org/ene-039/v1}"
API_KEY="${WIA_API_KEY:-}"
CONFIG_FILE="${HOME}/.wia/resource-depletion.conf"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

################################################################################
# Helper Functions
################################################################################

print_header() {
  echo -e "${BLUE}"
  echo "╔════════════════════════════════════════════════════════════════╗"
  echo "║                                                                ║"
  echo "║     ⚠️  WIA-ENE-039: Resource Depletion Response CLI v${VERSION}  ║"
  echo "║                                                                ║"
  echo "║              弘益人間 · Benefit All Humanity                   ║"
  echo "║                                                                ║"
  echo "╚════════════════════════════════════════════════════════════════╝"
  echo -e "${NC}"
}

print_success() {
  echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
  echo -e "${RED}[✗]${NC} $1" >&2
}

print_warning() {
  echo -e "${YELLOW}[⚠]${NC} $1"
}

print_info() {
  echo -e "${BLUE}[ℹ]${NC} $1"
}

# Check if jq is available
has_jq() {
  command -v jq &> /dev/null
}

# Pretty print JSON
pretty_json() {
  local json="$1"
  if has_jq; then
    echo "$json" | jq '.'
  else
    echo "$json"
  fi
}

# Load configuration
load_config() {
  if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
    if [ -n "${WIA_API_KEY_CONF:-}" ]; then
      API_KEY="${WIA_API_KEY_CONF}"
    fi
    if [ -n "${WIA_API_ENDPOINT_CONF:-}" ]; then
      API_ENDPOINT="${WIA_API_ENDPOINT_CONF}"
    fi
  fi
}

# Save configuration
save_config() {
  mkdir -p "$(dirname "$CONFIG_FILE")"
  cat > "$CONFIG_FILE" <<EOF
# WIA-ENE-039 Resource Depletion Response CLI Configuration
WIA_API_KEY_CONF="${API_KEY}"
WIA_API_ENDPOINT_CONF="${API_ENDPOINT}"
EOF
  chmod 600 "$CONFIG_FILE"
  print_success "Configuration saved to $CONFIG_FILE"
}

# Make API request
api_request() {
  local method="$1"
  local path="$2"
  local data="${3:-}"

  if [ -z "$API_KEY" ]; then
    print_error "API key not set. Use: export WIA_API_KEY=your-key or run 'config' command"
    exit 1
  fi

  local url="${API_ENDPOINT}${path}"
  local response

  if [ "$method" = "GET" ]; then
    response=$(curl -s -X GET "$url" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -H "X-WIA-Standard: ENE-039" \
      -H "X-WIA-Version: 1.0.0")
  else
    response=$(curl -s -X "$method" "$url" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -H "X-WIA-Standard: ENE-039" \
      -H "X-WIA-Version: 1.0.0" \
      -d "$data")
  fi

  echo "$response"
}

################################################################################
# Commands
################################################################################

cmd_config() {
  print_header
  echo "Configuration Setup"
  echo ""

  read -p "API Endpoint [${API_ENDPOINT}]: " input_endpoint
  if [ -n "$input_endpoint" ]; then
    API_ENDPOINT="$input_endpoint"
  fi

  read -sp "API Key: " input_key
  echo ""
  if [ -n "$input_key" ]; then
    API_KEY="$input_key"
  fi

  save_config
  echo ""
  print_success "Configuration complete!"
}

cmd_status() {
  local resource_id="${1:-}"

  if [ -z "$resource_id" ]; then
    echo "Usage: $0 status RESOURCE_ID"
    echo ""
    echo "Examples:"
    echo "  $0 status lithium"
    echo "  $0 status copper"
    exit 1
  fi

  print_info "Fetching status for resource: $resource_id"
  local response=$(api_request "GET" "/api/v1/resources/$resource_id/status")

  if has_jq && echo "$response" | jq -e '.success' > /dev/null 2>&1; then
    echo ""
    echo -e "${CYAN}Resource Status:${NC}"
    echo "$response" | jq -r '.data |
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Resource: \(.name)",
      "Category: \(.resourceCode)",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Reserves:",
      "  Proven: \(.reserves.proven | tonumber | . / 1e6 | floor) million tons",
      "  R/P Ratio: \(.depletion.rpRatio) years",
      "  Risk Level: \(.depletion.riskLevel)",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Production: \(.production.annual | tonumber | . / 1e6 | floor) million tons/year",
      "Consumption: \(.consumption.annual | tonumber | . / 1e6 | floor) million tons/year",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Circularity:",
      "  Recycling Rate: \(.circularity.recyclingRate)%",
      "  Circularity Index: \(.circularity.circularityIndex)",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'
  else
    print_error "Failed to fetch resource status"
    echo "$response"
    exit 1
  fi
}

cmd_forecast() {
  local resource_id="${1:-}"
  local model="${2:-linear}"

  if [ -z "$resource_id" ]; then
    echo "Usage: $0 forecast RESOURCE_ID [MODEL_TYPE]"
    echo ""
    echo "Model Types: linear, exponential, logistic, monte_carlo, hubbert"
    echo ""
    echo "Examples:"
    echo "  $0 forecast lithium"
    echo "  $0 forecast copper exponential"
    exit 1
  fi

  print_info "Fetching depletion forecast for: $resource_id (model: $model)"
  local response=$(api_request "GET" "/api/v1/resources/$resource_id/forecast?modelType=$model")

  pretty_json "$response"
}

cmd_alerts() {
  local action="${1:-list}"
  local resource_id="${2:-}"

  case "$action" in
    list)
      print_info "Fetching active alerts..."
      local path="/api/v1/alerts/active"
      if [ -n "$resource_id" ]; then
        path="$path?resourceId=$resource_id"
      fi
      local response=$(api_request "GET" "$path")

      if has_jq && echo "$response" | jq -e '.success' > /dev/null 2>&1; then
        echo ""
        echo -e "${CYAN}Active Alerts:${NC}"
        echo "$response" | jq -r '.data[] |
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "Alert: \(.indicator.name)",
          "Resource: \(.resourceId)",
          "Level: \(.alert.level | ascii_upcase)",
          "Value: \(.indicator.value) \(.indicator.unit)",
          "Message: \(.alert.message)",
          "Triggered: \(.alert.triggerDate // "N/A")",
          ""'
      else
        pretty_json "$response"
      fi
      ;;
    subscribe)
      print_info "Subscribing to alerts..."
      local data='{"channels":["email"],"alertLevels":["warning","critical"]}'
      local response=$(api_request "POST" "/api/v1/alerts/subscribe" "$data")
      pretty_json "$response"
      ;;
    *)
      echo "Usage: $0 alerts <list|subscribe> [RESOURCE_ID]"
      exit 1
      ;;
  esac
}

cmd_strategies() {
  local action="${1:-list}"
  local resource_id="${2:-}"

  case "$action" in
    list)
      if [ -z "$resource_id" ]; then
        echo "Usage: $0 strategies list RESOURCE_ID"
        exit 1
      fi
      print_info "Fetching strategies for: $resource_id"
      local response=$(api_request "GET" "/api/v1/strategies?resourceId=$resource_id")
      pretty_json "$response"
      ;;
    get)
      local strategy_id="${resource_id}"
      if [ -z "$strategy_id" ]; then
        echo "Usage: $0 strategies get STRATEGY_ID"
        exit 1
      fi
      print_info "Fetching strategy: $strategy_id"
      local response=$(api_request "GET" "/api/v1/strategies/$strategy_id")
      pretty_json "$response"
      ;;
    *)
      echo "Usage: $0 strategies <list|get> [ID]"
      exit 1
      ;;
  esac
}

cmd_reserves() {
  local action="${1:-list}"
  local reserve_id="${2:-}"

  case "$action" in
    list)
      print_info "Fetching strategic reserves..."
      local response=$(api_request "GET" "/api/v1/reserves")

      if has_jq && echo "$response" | jq -e '.success' > /dev/null 2>&1; then
        echo ""
        echo -e "${CYAN}Strategic Reserves:${NC}"
        echo "$response" | jq -r '.data[] |
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "Reserve: \(.name)",
          "Resource: \(.resourceId)",
          "Status: \(.status | ascii_upcase)",
          "Quantity: \(.inventory.quantity | tonumber | . / 1e3 | floor) thousand tons",
          "Days of Supply: \(.inventory.daysOfSupply)",
          "Capacity: \(.inventory.capacity / .inventory.quantity * 100 | floor)% utilized",
          ""'
      else
        pretty_json "$response"
      fi
      ;;
    get)
      if [ -z "$reserve_id" ]; then
        echo "Usage: $0 reserves get RESERVE_ID"
        exit 1
      fi
      print_info "Fetching reserve: $reserve_id"
      local response=$(api_request "GET" "/api/v1/reserves/$reserve_id")
      pretty_json "$response"
      ;;
    check)
      if [ -z "$reserve_id" ]; then
        echo "Usage: $0 reserves check RESERVE_ID"
        exit 1
      fi
      print_info "Checking release criteria for: $reserve_id"
      local response=$(api_request "GET" "/api/v1/reserves/$reserve_id/check-criteria")
      pretty_json "$response"
      ;;
    *)
      echo "Usage: $0 reserves <list|get|check> [RESERVE_ID]"
      exit 1
      ;;
  esac
}

cmd_alternatives() {
  local resource_id="${1:-}"
  local application="${2:-}"

  if [ -z "$resource_id" ]; then
    echo "Usage: $0 alternatives RESOURCE_ID [APPLICATION]"
    echo ""
    echo "Examples:"
    echo "  $0 alternatives lithium batteries"
    echo "  $0 alternatives rare-earth magnets"
    exit 1
  fi

  local path="/api/v1/alternatives?resourceId=$resource_id"
  if [ -n "$application" ]; then
    path="$path&application=$application"
  fi

  print_info "Searching alternatives for: $resource_id"
  local response=$(api_request "GET" "$path")

  if has_jq && echo "$response" | jq -e '.success' > /dev/null 2>&1; then
    echo ""
    echo -e "${CYAN}Alternative Materials:${NC}"
    echo "$response" | jq -r '.data[] |
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Material: \(.name)",
      "Feasibility: \(.substitutionFor.feasibility | ascii_upcase)",
      "Performance: \(.substitutionFor.performanceRatio)% of original",
      "Cost Ratio: \(.economics.costRatio)%",
      "Market Readiness: \(.economics.marketReadiness)",
      ""'
  else
    pretty_json "$response"
  fi
}

cmd_dashboard() {
  local region="${1:-}"

  local path="/api/v1/analytics/dashboard"
  if [ -n "$region" ]; then
    path="$path?region=$region"
  fi

  print_info "Fetching KPI dashboard..."
  local response=$(api_request "GET" "$path")

  if has_jq && echo "$response" | jq -e '.success' > /dev/null 2>&1; then
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                      KPI DASHBOARD                             ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${GREEN}Depletion Prevention:${NC}"
    echo "$response" | jq -r '.data.depletionPrevention |
      "  Average R/P Ratio: \(.averageRPRatio) years",
      "  Depletion Rate Reduction: \(.depletionRateReduction)%",
      "  Circularity Rate: \(.circularityRate)%",
      "  Average Recycling Rate: \(.averageRecyclingRate)%",
      "  Resources Saved: \(.resourcesSaved | tonumber | . / 1e6 | floor) million tons/year"'
    echo ""
    echo -e "${BLUE}Economic Performance:${NC}"
    echo "$response" | jq -r '.data.economic |
      "  Resource Productivity: $\(.resourceProductivity)",
      "  Material Intensity: \(.materialIntensity)",
      "  Circular Economy GDP: \(.circularEconomyGDP)%",
      "  Investment ROI: \(.investmentROI)%"'
    echo ""
    echo -e "${MAGENTA}Social Impact:${NC}"
    echo "$response" | jq -r '.data.social |
      "  Resource Security Index: \(.resourceSecurityIndex)/100",
      "  Intergenerational Equity: \(.intergenerationEquity)/100",
      "  Jobs Created: \(.jobsCreated)",
      "  Public Awareness: \(.publicAwareness)/100"'
    echo ""
    echo -e "${CYAN}Overall Score: ${NC}" && echo "$response" | jq -r '.data.overallScore // "N/A"'
  else
    pretty_json "$response"
  fi
}

cmd_report() {
  local report_type="${1:-monthly}"
  local start_date="${2:-}"
  local end_date="${3:-}"

  if [ -z "$start_date" ] || [ -z "$end_date" ]; then
    echo "Usage: $0 report TYPE START_DATE END_DATE"
    echo ""
    echo "Report Types: daily, weekly, monthly, quarterly, annual"
    echo ""
    echo "Examples:"
    echo "  $0 report monthly 2025-01-01 2025-01-31"
    echo "  $0 report annual 2025-01-01 2025-12-31"
    exit 1
  fi

  local data=$(cat <<EOF
{
  "reportType": "$report_type",
  "period": {
    "start": "${start_date}T00:00:00Z",
    "end": "${end_date}T23:59:59Z"
  }
}
EOF
)

  print_info "Generating $report_type report..."
  local response=$(api_request "POST" "/api/v1/analytics/report" "$data")
  pretty_json "$response"
}

cmd_help() {
  print_header
  cat <<EOF
${CYAN}Commands:${NC}

  ${GREEN}config${NC}
    Configure API endpoint and key

  ${GREEN}status${NC} RESOURCE_ID
    Get comprehensive resource status
    Example: $0 status lithium

  ${GREEN}forecast${NC} RESOURCE_ID [MODEL_TYPE]
    Get depletion forecast
    Models: linear, exponential, logistic, monte_carlo, hubbert
    Example: $0 forecast copper exponential

  ${GREEN}alerts${NC} <list|subscribe> [RESOURCE_ID]
    Manage early warning alerts
    - list [RESOURCE_ID]: List active alerts
    - subscribe: Subscribe to alert notifications

  ${GREEN}strategies${NC} <list|get> ID
    Manage mitigation strategies
    - list RESOURCE_ID: List strategies for resource
    - get STRATEGY_ID: Get strategy details

  ${GREEN}reserves${NC} <list|get|check> [RESERVE_ID]
    Manage strategic reserves
    - list: List all reserves
    - get RESERVE_ID: Get reserve details
    - check RESERVE_ID: Check release criteria

  ${GREEN}alternatives${NC} RESOURCE_ID [APPLICATION]
    Search alternative materials
    Example: $0 alternatives lithium batteries

  ${GREEN}dashboard${NC} [REGION]
    View comprehensive KPI dashboard
    Example: $0 dashboard global

  ${GREEN}report${NC} TYPE START_DATE END_DATE
    Generate resource report
    Types: daily, weekly, monthly, quarterly, annual
    Example: $0 report monthly 2025-01-01 2025-01-31

  ${GREEN}help${NC}
    Show this help

${CYAN}Environment Variables:${NC}

  ${YELLOW}WIA_API_KEY${NC}         API authentication key
  ${YELLOW}WIA_API_ENDPOINT${NC}    API endpoint (default: https://api.wia.org/ene-039/v1)

${CYAN}More Information:${NC}

  Documentation: https://docs.wia.org/ene-039
  GitHub: https://github.com/WIA-Official/wia-standards
  Website: https://wia.org/standards/ene-039

${BLUE}════════════════════════════════════════════════════════════════${NC}
${GREEN}         弘益人間 (홍익인간) · Benefit All Humanity${NC}
${BLUE}════════════════════════════════════════════════════════════════${NC}
EOF
}

################################################################################
# Main
################################################################################

# Load configuration
load_config

# Parse command
COMMAND="${1:-help}"
shift || true

case "$COMMAND" in
  config)
    cmd_config
    ;;
  status)
    cmd_status "$@"
    ;;
  forecast)
    cmd_forecast "$@"
    ;;
  alerts)
    cmd_alerts "$@"
    ;;
  strategies)
    cmd_strategies "$@"
    ;;
  reserves)
    cmd_reserves "$@"
    ;;
  alternatives)
    cmd_alternatives "$@"
    ;;
  dashboard)
    cmd_dashboard "$@"
    ;;
  report)
    cmd_report "$@"
    ;;
  help|--help|-h)
    cmd_help
    ;;
  version|--version|-v)
    echo "WIA-ENE-039 Resource Depletion Response CLI v${VERSION}"
    ;;
  *)
    print_error "Unknown command: $COMMAND"
    echo ""
    echo "Run '$0 help' for usage information"
    exit 1
    ;;
esac
