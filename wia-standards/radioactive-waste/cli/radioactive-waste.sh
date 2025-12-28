#!/bin/bash

###############################################################################
# WIA-ENE-026: Radioactive Waste Management CLI Tool
#
# Description: Command-line interface for radioactive waste package management,
#              monitoring, and dose calculations
#
# Version: 1.0.0
# License: CC BY 4.0
#
# 弘益人間 (홍익인간) - Benefit All Humanity
###############################################################################

set -e

# Configuration
API_ENDPOINT="${WIA_ENE026_ENDPOINT:-https://api.wia.org/ene-026/v1}"
API_KEY="${WIA_ENE026_API_KEY}"
FACILITY_ID="${WIA_ENE026_FACILITY_ID}"
FACILITY_LICENSE="${WIA_ENE026_FACILITY_LICENSE}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Emoji
RADIO="☢️ "
CHECK="✅"
CROSS="❌"
WARN="⚠️ "
INFO="ℹ️ "
ROCKET="🚀"

###############################################################################
# Helper Functions
###############################################################################

print_header() {
    echo -e "${BOLD}${MAGENTA}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║  ${RADIO}WIA-ENE-026: Radioactive Waste Management CLI      ║"
    echo "║  弘益人間 (홍익인간) - Benefit All Humanity                 ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_success() {
    echo -e "${GREEN}${CHECK} $1${NC}"
}

print_error() {
    echo -e "${RED}${CROSS} Error: $1${NC}" >&2
}

print_warning() {
    echo -e "${YELLOW}${WARN} Warning: $1${NC}"
}

print_info() {
    echo -e "${CYAN}${INFO} $1${NC}"
}

check_dependencies() {
    if ! command -v curl &> /dev/null; then
        print_error "curl is required but not installed. Please install curl."
        exit 1
    fi

    if ! command -v jq &> /dev/null; then
        print_error "jq is required but not installed. Please install jq."
        exit 1
    fi
}

check_api_key() {
    if [ -z "$API_KEY" ]; then
        print_error "API key not set. Please set WIA_ENE026_API_KEY environment variable."
        echo -e "${INFO} Example: export WIA_ENE026_API_KEY=\"your-api-key\""
        exit 1
    fi
}

make_api_request() {
    local method=$1
    local endpoint=$2
    local data=$3

    local headers=(
        -H "Content-Type: application/json"
        -H "X-API-Key: $API_KEY"
        -H "User-Agent: WIA-ENE-026-CLI/1.0.0"
    )

    if [ -n "$FACILITY_ID" ]; then
        headers+=(-H "X-Facility-ID: $FACILITY_ID")
    fi

    if [ -n "$FACILITY_LICENSE" ]; then
        headers+=(-H "X-Facility-License: $FACILITY_LICENSE")
    fi

    if [ "$method" = "GET" ] || [ "$method" = "DELETE" ]; then
        curl -s -X "$method" "${headers[@]}" "$API_ENDPOINT$endpoint"
    else
        curl -s -X "$method" "${headers[@]}" -d "$data" "$API_ENDPOINT$endpoint"
    fi
}

###############################################################################
# Package Management Commands
###############################################################################

cmd_register_package() {
    print_info "Registering new radioactive waste package..."

    # Interactive input
    read -p "Waste Class (HLW-1/ILW-2/LLW-3/SRW-1): " waste_class
    read -p "Container Type (spent_fuel_cask/drum_200L/concrete_box): " container_type
    read -p "Total Activity (Bq): " total_activity
    read -p "Primary Isotope (e.g., Cs-137): " isotope
    read -p "Isotope Activity (Bq): " isotope_activity
    read -p "Isotope Half-life (years): " half_life

    # Build JSON payload
    local payload=$(cat <<EOF
{
  "wasteClass": "$waste_class",
  "facilityId": "$FACILITY_ID",
  "containerInfo": {
    "containerType": "$container_type",
    "material": "stainless_steel_304",
    "dimensions": {
      "height": 4.5,
      "diameter": 2.2,
      "unit": "meters"
    },
    "weight": {
      "empty": 25000,
      "loaded": 45000,
      "unit": "kg"
    }
  },
  "radiologicalData": {
    "totalActivity": {
      "value": $total_activity,
      "unit": "Bq"
    },
    "referenceDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "doseRate": {
      "contact": { "value": 2.5, "unit": "Sv/h" },
      "oneMeter": { "value": 0.25, "unit": "Sv/h" }
    },
    "isotopes": [
      {
        "isotope": "$isotope",
        "activity": { "value": $isotope_activity, "unit": "Bq" },
        "halfLife": { "value": $half_life, "unit": "years" },
        "decayConstant": $(echo "scale=12; 0.693147 / ($half_life * 31557600)" | bc),
        "radiationType": ["beta", "gamma"],
        "energy": { "beta": 0.512, "gamma": 0.662, "unit": "MeV" }
      }
    ]
  },
  "physicalProperties": {
    "form": "solid",
    "matrix": "metal",
    "volume": { "value": 8.5, "unit": "m3" }
  },
  "processing": {
    "method": "none",
    "processingDate": "$(date -u +"%Y-%m-%d")",
    "processingFacility": "$FACILITY_ID",
    "qualityControl": {
      "qcPassed": true,
      "qcDate": "$(date -u +"%Y-%m-%d")",
      "inspector": "CLI User",
      "certificate": "CLI-$(date +%s)"
    }
  },
  "storage": {
    "storageType": "dry_storage",
    "storageDuration": { "planned": 50, "maximum": 100, "unit": "years" },
    "storageConditions": {
      "temperature": { "value": 25, "max": 85, "unit": "celsius" }
    },
    "retrievable": true,
    "storageLocation": {
      "facilityId": "$FACILITY_ID",
      "building": "A",
      "row": "1",
      "column": "1"
    }
  }
}
EOF
)

    local response=$(make_api_request "POST" "/packages" "$payload")
    local package_id=$(echo "$response" | jq -r '.packageId')

    if [ -n "$package_id" ] && [ "$package_id" != "null" ]; then
        print_success "Package registered successfully!"
        echo -e "${BOLD}Package ID:${NC} $package_id"
    else
        print_error "Failed to register package"
        echo "$response" | jq '.'
        exit 1
    fi
}

cmd_get_package() {
    local package_id=$1

    if [ -z "$package_id" ]; then
        print_error "Package ID is required"
        echo "Usage: $0 get-package <package-id>"
        exit 1
    fi

    print_info "Retrieving package: $package_id"

    local response=$(make_api_request "GET" "/packages/$package_id")
    echo "$response" | jq '.'
}

cmd_list_packages() {
    print_info "Listing packages..."

    local page=${1:-1}
    local limit=${2:-10}

    local response=$(make_api_request "GET" "/packages?page=$page&limit=$limit")

    echo -e "\n${BOLD}Packages:${NC}"
    echo "$response" | jq -r '.data[] | "\(.packageId) - \(.wasteClass) - Activity: \(.radiologicalData.totalActivity.value) \(.radiologicalData.totalActivity.unit)"'

    echo -e "\n${BOLD}Pagination:${NC}"
    echo "$response" | jq '.pagination'
}

cmd_search_isotope() {
    local isotope=$1

    if [ -z "$isotope" ]; then
        print_error "Isotope is required"
        echo "Usage: $0 search-isotope <isotope>"
        echo "Example: $0 search-isotope Cs-137"
        exit 1
    fi

    print_info "Searching packages containing: $isotope"

    local response=$(make_api_request "GET" "/packages?isotope=$isotope")

    echo -e "\n${BOLD}Results:${NC}"
    echo "$response" | jq -r '.data[] | "\(.packageId) - \(.wasteClass)"'
}

###############################################################################
# Monitoring Commands
###############################################################################

cmd_get_alerts() {
    local severity=${1:-all}

    print_info "Retrieving alerts (severity: $severity)..."

    local endpoint="/monitoring/alerts"
    if [ "$severity" != "all" ]; then
        endpoint="$endpoint?severity=$severity"
    fi

    local response=$(make_api_request "GET" "$endpoint")

    echo -e "\n${BOLD}Active Alerts:${NC}"
    echo "$response" | jq -r '.data[] | "\(.severity | ascii_upcase) - \(.message) (\(.timestamp))"'
}

cmd_acknowledge_alert() {
    local alert_id=$1
    local acknowledged_by=${2:-"CLI User"}

    if [ -z "$alert_id" ]; then
        print_error "Alert ID is required"
        echo "Usage: $0 acknowledge-alert <alert-id> [acknowledged-by]"
        exit 1
    fi

    print_info "Acknowledging alert: $alert_id"

    local payload="{\"acknowledgedBy\": \"$acknowledged_by\"}"
    local response=$(make_api_request "PUT" "/monitoring/alerts/$alert_id/acknowledge" "$payload")

    print_success "Alert acknowledged"
}

###############################################################################
# Dose Calculation Commands
###############################################################################

cmd_calculate_dose() {
    local package_id=$1
    local distance=${2:-1.0}
    local duration=${3:-3600}

    if [ -z "$package_id" ]; then
        print_error "Package ID is required"
        echo "Usage: $0 calculate-dose <package-id> [distance-meters] [duration-seconds]"
        echo "Example: $0 calculate-dose RW-2025-001 1.0 3600"
        exit 1
    fi

    print_info "Calculating dose for package: $package_id"
    print_info "Distance: ${distance}m, Duration: ${duration}s"

    local payload=$(cat <<EOF
{
  "packageId": "$package_id",
  "distance": $distance,
  "duration": $duration,
  "shielding": {
    "material": "concrete",
    "thickness": 0.5,
    "unit": "meters"
  }
}
EOF
)

    local response=$(make_api_request "POST" "/dose/calculate" "$payload")

    echo -e "\n${BOLD}Dose Calculation Result:${NC}"
    echo "$response" | jq '.'

    local effective_dose=$(echo "$response" | jq -r '.effectiveDose.value')
    local dose_unit=$(echo "$response" | jq -r '.effectiveDose.unit')

    echo -e "\n${YELLOW}${WARN} Effective Dose: $effective_dose $dose_unit${NC}"
}

cmd_calculate_decay() {
    local isotope=$1
    local initial_activity=$2
    local decay_time=$3
    local time_unit=${4:-years}

    if [ -z "$isotope" ] || [ -z "$initial_activity" ] || [ -z "$decay_time" ]; then
        print_error "Isotope, initial activity, and decay time are required"
        echo "Usage: $0 calculate-decay <isotope> <initial-activity-Bq> <decay-time> [unit]"
        echo "Example: $0 calculate-decay Cs-137 1.0e14 30 years"
        exit 1
    fi

    print_info "Calculating decay for $isotope"
    print_info "Initial activity: $initial_activity Bq, Time: $decay_time $time_unit"

    local payload=$(cat <<EOF
{
  "isotope": "$isotope",
  "initialActivity": $initial_activity,
  "decayTime": $decay_time,
  "unit": "$time_unit"
}
EOF
)

    local response=$(make_api_request "POST" "/dose/decay" "$payload")

    echo -e "\n${BOLD}Decay Calculation Result:${NC}"
    echo "$response" | jq '.'

    local final_activity=$(echo "$response" | jq -r '.finalActivity.value')
    local activity_unit=$(echo "$response" | jq -r '.finalActivity.unit')
    local remaining_fraction=$(echo "$response" | jq -r '.remainingFraction')

    echo -e "\n${CYAN}Final Activity: $final_activity $activity_unit ($(echo "$remaining_fraction * 100" | bc)% remaining)${NC}"
}

###############################################################################
# Facility Commands
###############################################################################

cmd_get_facility() {
    local facility_id=${1:-$FACILITY_ID}

    if [ -z "$facility_id" ]; then
        print_error "Facility ID is required"
        echo "Usage: $0 get-facility [facility-id]"
        exit 1
    fi

    print_info "Retrieving facility: $facility_id"

    local response=$(make_api_request "GET" "/facilities/$facility_id")
    echo "$response" | jq '.'
}

cmd_facility_inventory() {
    local facility_id=${1:-$FACILITY_ID}

    if [ -z "$facility_id" ]; then
        print_error "Facility ID is required"
        echo "Usage: $0 facility-inventory [facility-id]"
        exit 1
    fi

    print_info "Retrieving inventory for facility: $facility_id"

    local response=$(make_api_request "GET" "/facilities/$facility_id/inventory")

    echo -e "\n${BOLD}Facility Inventory:${NC}"
    echo "$response" | jq '.'
}

###############################################################################
# Help & Version
###############################################################################

show_help() {
    print_header
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "${BOLD}Package Management:${NC}"
    echo "  register-package            Register a new waste package (interactive)"
    echo "  get-package <id>            Get package details"
    echo "  list-packages [page] [lim]  List all packages"
    echo "  search-isotope <isotope>    Search packages by isotope"
    echo ""
    echo "${BOLD}Monitoring:${NC}"
    echo "  get-alerts [severity]       Get active alerts"
    echo "  acknowledge-alert <id>      Acknowledge an alert"
    echo ""
    echo "${BOLD}Dose Calculations:${NC}"
    echo "  calculate-dose <pkg> [d] [t]  Calculate dose (distance, duration)"
    echo "  calculate-decay <iso> <act> <time> [unit]  Calculate radioactive decay"
    echo ""
    echo "${BOLD}Facility:${NC}"
    echo "  get-facility [id]           Get facility information"
    echo "  facility-inventory [id]     Get facility inventory"
    echo ""
    echo "${BOLD}General:${NC}"
    echo "  help                        Show this help message"
    echo "  version                     Show version information"
    echo ""
    echo "${BOLD}Environment Variables:${NC}"
    echo "  WIA_ENE026_API_KEY          API key (required)"
    echo "  WIA_ENE026_ENDPOINT         API endpoint (optional)"
    echo "  WIA_ENE026_FACILITY_ID      Facility ID (optional)"
    echo "  WIA_ENE026_FACILITY_LICENSE Facility license (optional)"
    echo ""
    echo "${BOLD}Examples:${NC}"
    echo "  $0 register-package"
    echo "  $0 get-package RW-2025-KR-00001234"
    echo "  $0 calculate-dose RW-2025-001 1.0 3600"
    echo "  $0 calculate-decay Cs-137 1.0e14 30 years"
    echo ""
    echo "弘益人間 (홍익인간) - Benefit All Humanity"
}

show_version() {
    print_header
    echo "WIA-ENE-026 CLI Tool"
    echo "Version: 1.0.0"
    echo "License: CC BY 4.0"
    echo "© 2025 WIA - World Certification Industry Association"
    echo ""
    echo "弘익人間 (홍익인간) - Benefit All Humanity"
}

###############################################################################
# Main
###############################################################################

main() {
    check_dependencies

    local command=${1:-help}
    shift || true

    case "$command" in
        register-package)
            check_api_key
            cmd_register_package "$@"
            ;;
        get-package)
            check_api_key
            cmd_get_package "$@"
            ;;
        list-packages)
            check_api_key
            cmd_list_packages "$@"
            ;;
        search-isotope)
            check_api_key
            cmd_search_isotope "$@"
            ;;
        get-alerts)
            check_api_key
            cmd_get_alerts "$@"
            ;;
        acknowledge-alert)
            check_api_key
            cmd_acknowledge_alert "$@"
            ;;
        calculate-dose)
            check_api_key
            cmd_calculate_dose "$@"
            ;;
        calculate-decay)
            check_api_key
            cmd_calculate_decay "$@"
            ;;
        get-facility)
            check_api_key
            cmd_get_facility "$@"
            ;;
        facility-inventory)
            check_api_key
            cmd_facility_inventory "$@"
            ;;
        help|--help|-h)
            show_help
            ;;
        version|--version|-v)
            show_version
            ;;
        *)
            print_error "Unknown command: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"
