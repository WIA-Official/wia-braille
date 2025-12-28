#!/bin/bash

#############################################################################
# WIA-ENE-023: Recycling System Standard - CLI Tool
#
# Command-line interface for interacting with WIA-ENE-023 recycling API
#
# 弘익人間 (홍익인간) - Benefit All Humanity
#
# © 2025 SmileStory Inc. / WIA
# License: CC BY 4.0
#############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# API Configuration
API_ENDPOINT="${WIA_API_ENDPOINT:-https://api.wia.org/ene-023/v1}"
API_KEY="${WIA_API_KEY}"

# Check for API key
check_api_key() {
    if [ -z "$API_KEY" ]; then
        echo -e "${RED}Error: WIA_API_KEY environment variable not set${NC}" >&2
        echo -e "${YELLOW}Get your API key at: https://wia.org/api/keys${NC}" >&2
        echo -e "${YELLOW}Then set it: export WIA_API_KEY='your-api-key'${NC}" >&2
        exit 1
    fi
}

# Make API request
api_request() {
    local method="$1"
    local endpoint="$2"
    local data="$3"

    local url="${API_ENDPOINT}${endpoint}"

    if [ "$method" = "GET" ]; then
        curl -s -X GET \
            -H "X-API-Key: ${API_KEY}" \
            -H "Content-Type: application/json" \
            "$url"
    else
        curl -s -X "$method" \
            -H "X-API-Key: ${API_KEY}" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$url"
    fi
}

# Format JSON output
format_json() {
    if command -v jq &> /dev/null; then
        jq '.'
    else
        cat
    fi
}

# Display help
show_help() {
    echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                               ║${NC}"
    echo -e "${CYAN}║       WIA-ENE-023: Recycling System Standard - CLI ♻️        ║${NC}"
    echo -e "${CYAN}║                                                               ║${NC}"
    echo -e "${CYAN}║         弘益人間 (홍익인간) - Benefit All Humanity           ║${NC}"
    echo -e "${CYAN}║                                                               ║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${GREEN}USAGE:${NC}"
    echo -e "  recycling.sh <command> [options]"
    echo ""
    echo -e "${GREEN}COMMANDS:${NC}"
    echo ""
    echo -e "  ${BLUE}submit${NC}                Submit a new recycling event"
    echo -e "  ${BLUE}get-event${NC}             Get event details by ID"
    echo -e "  ${BLUE}list-events${NC}           List events with optional filters"
    echo -e "  ${BLUE}facility${NC}              Get facility information"
    echo -e "  ${BLUE}list-facilities${NC}       List all facilities"
    echo -e "  ${BLUE}performance${NC}           Get facility performance metrics"
    echo -e "  ${BLUE}analytics${NC}             Get analytics and statistics"
    echo -e "  ${BLUE}carbon-savings${NC}        Calculate carbon savings"
    echo -e "  ${BLUE}materials${NC}             List all material codes"
    echo -e "  ${BLUE}help${NC}                  Show this help message"
    echo ""
    echo -e "${GREEN}SUBMIT EVENT OPTIONS:${NC}"
    echo -e "  --facility <id>          Facility ID (required)"
    echo -e "  --type <type>            Event type: collection, sorting, processing, remanufacturing"
    echo -e "  --material <code>        Material code (e.g., PL-01, ME-01)"
    echo -e "  --quantity <value>       Quantity value"
    echo -e "  --unit <unit>            Unit: kg, tonnes, lbs, m3, pieces"
    echo -e "  --grade <grade>          Quality grade: A, B, C, D"
    echo -e "  --source <source>        Source: residential, commercial, industrial"
    echo ""
    echo -e "${GREEN}EXAMPLES:${NC}"
    echo ""
    echo -e "  # Submit a recycling event"
    echo -e "  ${CYAN}recycling.sh submit --facility FAC-MRF-001 --material PL-01 \\"
    echo -e "    --quantity 1250.5 --unit kg --grade A --source residential${NC}"
    echo ""
    echo -e "  # Get event details"
    echo -e "  ${CYAN}recycling.sh get-event REC-2025-001234${NC}"
    echo ""
    echo -e "  # List events for a facility"
    echo -e "  ${CYAN}recycling.sh list-events --facility FAC-MRF-001${NC}"
    echo ""
    echo -e "  # Get facility performance"
    echo -e "  ${CYAN}recycling.sh performance FAC-MRF-001${NC}"
    echo ""
    echo -e "  # Get analytics"
    echo -e "  ${CYAN}recycling.sh analytics --material PL-01 --period monthly${NC}"
    echo ""
    echo -e "  # Calculate carbon savings"
    echo -e "  ${CYAN}recycling.sh carbon-savings --facility FAC-MRF-001 \\"
    echo -e "    --start 2025-01-01 --end 2025-12-31${NC}"
    echo ""
    echo -e "${GREEN}ENVIRONMENT VARIABLES:${NC}"
    echo -e "  WIA_API_KEY              API key for authentication (required)"
    echo -e "  WIA_API_ENDPOINT         API endpoint (default: https://api.wia.org/ene-023/v1)"
    echo ""
    echo -e "${GREEN}DOCUMENTATION:${NC}"
    echo -e "  Website:  ${BLUE}https://wia.org/standards/ene-023${NC}"
    echo -e "  GitHub:   ${BLUE}https://github.com/WIA-Official/wia-standards${NC}"
    echo ""
}

# Submit recycling event
cmd_submit() {
    check_api_key

    local facility_id=""
    local event_type="collection"
    local material_code=""
    local quantity=""
    local unit="kg"
    local grade="A"
    local source="residential"

    while [[ $# -gt 0 ]]; do
        case $1 in
            --facility) facility_id="$2"; shift 2 ;;
            --type) event_type="$2"; shift 2 ;;
            --material) material_code="$2"; shift 2 ;;
            --quantity) quantity="$2"; shift 2 ;;
            --unit) unit="$2"; shift 2 ;;
            --grade) grade="$2"; shift 2 ;;
            --source) source="$2"; shift 2 ;;
            *) echo -e "${RED}Unknown option: $1${NC}" >&2; exit 1 ;;
        esac
    done

    if [ -z "$facility_id" ] || [ -z "$material_code" ] || [ -z "$quantity" ]; then
        echo -e "${RED}Error: --facility, --material, and --quantity are required${NC}" >&2
        exit 1
    fi

    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local batch_id="BATCH-$(date +%Y%m%d)-$(printf '%03d' $RANDOM)"

    local payload=$(cat <<EOF
{
  "facilityId": "$facility_id",
  "eventType": "$event_type",
  "materials": [
    {
      "materialCode": "$material_code",
      "quantity": {
        "value": $quantity,
        "unit": "$unit"
      },
      "quality": {
        "grade": "$grade",
        "contamination": 2.5,
        "moisture": 0.8
      },
      "source": "$source",
      "batchId": "$batch_id"
    }
  ]
}
EOF
)

    echo -e "${BLUE}Submitting recycling event...${NC}"
    local response=$(api_request POST "/events" "$payload")

    echo -e "${GREEN}✓ Event submitted successfully!${NC}"
    echo "$response" | format_json
}

# Get event details
cmd_get_event() {
    check_api_key

    local event_id="$1"
    if [ -z "$event_id" ]; then
        echo -e "${RED}Error: Event ID required${NC}" >&2
        echo -e "Usage: recycling.sh get-event <event-id>" >&2
        exit 1
    fi

    echo -e "${BLUE}Fetching event: $event_id${NC}"
    api_request GET "/events/$event_id" | format_json
}

# List events
cmd_list_events() {
    check_api_key

    local query_params=""

    while [[ $# -gt 0 ]]; do
        case $1 in
            --facility) query_params="${query_params}&facilityId=$2"; shift 2 ;;
            --material) query_params="${query_params}&materialCode=$2"; shift 2 ;;
            --start) query_params="${query_params}&startDate=$2"; shift 2 ;;
            --end) query_params="${query_params}&endDate=$2"; shift 2 ;;
            --page) query_params="${query_params}&page=$2"; shift 2 ;;
            --limit) query_params="${query_params}&limit=$2"; shift 2 ;;
            *) echo -e "${RED}Unknown option: $1${NC}" >&2; exit 1 ;;
        esac
    done

    echo -e "${BLUE}Fetching events...${NC}"
    api_request GET "/events?${query_params}" | format_json
}

# Get facility
cmd_facility() {
    check_api_key

    local facility_id="$1"
    if [ -z "$facility_id" ]; then
        echo -e "${RED}Error: Facility ID required${NC}" >&2
        echo -e "Usage: recycling.sh facility <facility-id>" >&2
        exit 1
    fi

    echo -e "${BLUE}Fetching facility: $facility_id${NC}"
    api_request GET "/facilities/$facility_id" | format_json
}

# List facilities
cmd_list_facilities() {
    check_api_key

    local query_params=""

    while [[ $# -gt 0 ]]; do
        case $1 in
            --type) query_params="${query_params}&type=$2"; shift 2 ;;
            --country) query_params="${query_params}&country=$2"; shift 2 ;;
            --material) query_params="${query_params}&materialCode=$2"; shift 2 ;;
            *) echo -e "${RED}Unknown option: $1${NC}" >&2; exit 1 ;;
        esac
    done

    echo -e "${BLUE}Fetching facilities...${NC}"
    api_request GET "/facilities?${query_params}" | format_json
}

# Get performance
cmd_performance() {
    check_api_key

    local facility_id="$1"
    if [ -z "$facility_id" ]; then
        echo -e "${RED}Error: Facility ID required${NC}" >&2
        echo -e "Usage: recycling.sh performance <facility-id>" >&2
        exit 1
    fi

    echo -e "${BLUE}Fetching performance metrics for: $facility_id${NC}"
    api_request GET "/facilities/$facility_id" | format_json | jq '.performance'
}

# Get analytics
cmd_analytics() {
    check_api_key

    local query_params=""

    while [[ $# -gt 0 ]]; do
        case $1 in
            --material) query_params="${query_params}&materialCode=$2"; shift 2 ;;
            --country) query_params="${query_params}&country=$2"; shift 2 ;;
            --period) query_params="${query_params}&period=$2"; shift 2 ;;
            *) echo -e "${RED}Unknown option: $1${NC}" >&2; exit 1 ;;
        esac
    done

    echo -e "${BLUE}Fetching analytics...${NC}"
    api_request GET "/analytics/recovery-rate?${query_params}" | format_json
}

# Calculate carbon savings
cmd_carbon_savings() {
    check_api_key

    local facility_id=""
    local start_date=""
    local end_date=""

    while [[ $# -gt 0 ]]; do
        case $1 in
            --facility) facility_id="$2"; shift 2 ;;
            --start) start_date="$2"; shift 2 ;;
            --end) end_date="$2"; shift 2 ;;
            *) echo -e "${RED}Unknown option: $1${NC}" >&2; exit 1 ;;
        esac
    done

    if [ -z "$start_date" ] || [ -z "$end_date" ]; then
        echo -e "${RED}Error: --start and --end dates are required${NC}" >&2
        exit 1
    fi

    local query_params="startDate=$start_date&endDate=$end_date"
    if [ -n "$facility_id" ]; then
        query_params="${query_params}&facilityId=$facility_id"
    fi

    echo -e "${BLUE}Calculating carbon savings...${NC}"
    api_request GET "/analytics/carbon-savings?${query_params}" | format_json
}

# List material codes
cmd_materials() {
    echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                     Material Codes ♻️                        ║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${GREEN}PLASTICS (PL):${NC}"
    echo -e "  ${BLUE}PL-01${NC}  PET (Polyethylene Terephthalate) ♳ 1"
    echo -e "  ${BLUE}PL-02${NC}  HDPE (High-Density Polyethylene) ♴ 2"
    echo -e "  ${BLUE}PL-03${NC}  PVC (Polyvinyl Chloride) ♵ 3"
    echo -e "  ${BLUE}PL-04${NC}  LDPE (Low-Density Polyethylene) ♶ 4"
    echo -e "  ${BLUE}PL-05${NC}  PP (Polypropylene) ♷ 5"
    echo -e "  ${BLUE}PL-06${NC}  PS (Polystyrene) ♸ 6"
    echo -e "  ${BLUE}PL-07${NC}  Other Plastics ♹ 7"
    echo ""
    echo -e "${GREEN}METALS (ME):${NC}"
    echo -e "  ${BLUE}ME-01${NC}  Aluminum"
    echo -e "  ${BLUE}ME-02${NC}  Iron/Steel"
    echo -e "  ${BLUE}ME-03${NC}  Copper"
    echo -e "  ${BLUE}ME-04${NC}  Brass"
    echo -e "  ${BLUE}ME-05${NC}  Stainless Steel"
    echo -e "  ${BLUE}ME-06${NC}  Lead"
    echo ""
    echo -e "${GREEN}PAPER (PA):${NC}"
    echo -e "  ${BLUE}PA-01${NC}  Cardboard"
    echo -e "  ${BLUE}PA-02${NC}  Newspaper"
    echo -e "  ${BLUE}PA-03${NC}  Office Paper"
    echo -e "  ${BLUE}PA-04${NC}  Magazine/Glossy"
    echo -e "  ${BLUE}PA-05${NC}  Coated Paper"
    echo -e "  ${BLUE}PA-06${NC}  Mixed Paper"
    echo ""
    echo -e "${GREEN}GLASS (GL):${NC}"
    echo -e "  ${BLUE}GL-01${NC}  Clear Glass"
    echo -e "  ${BLUE}GL-02${NC}  Green Glass"
    echo -e "  ${BLUE}GL-03${NC}  Brown Glass"
    echo -e "  ${BLUE}GL-04${NC}  Mixed Glass"
    echo ""
    echo -e "${GREEN}ORGANIC (OR):${NC}"
    echo -e "  ${BLUE}OR-01${NC}  Food Waste"
    echo -e "  ${BLUE}OR-02${NC}  Yard Waste"
    echo -e "  ${BLUE}OR-03${NC}  Wood"
    echo -e "  ${BLUE}OR-04${NC}  Textile"
    echo ""
    echo -e "${GREEN}E-WASTE (EW):${NC}"
    echo -e "  ${BLUE}EW-01${NC}  Large Appliances"
    echo -e "  ${BLUE}EW-02${NC}  Small Appliances"
    echo -e "  ${BLUE}EW-03${NC}  IT Equipment"
    echo -e "  ${BLUE}EW-04${NC}  Batteries"
    echo -e "  ${BLUE}EW-05${NC}  Lighting"
    echo ""
}

# Main command dispatcher
main() {
    if [ $# -eq 0 ]; then
        show_help
        exit 0
    fi

    local command="$1"
    shift

    case "$command" in
        submit)
            cmd_submit "$@"
            ;;
        get-event)
            cmd_get_event "$@"
            ;;
        list-events)
            cmd_list_events "$@"
            ;;
        facility)
            cmd_facility "$@"
            ;;
        list-facilities)
            cmd_list_facilities "$@"
            ;;
        performance)
            cmd_performance "$@"
            ;;
        analytics)
            cmd_analytics "$@"
            ;;
        carbon-savings)
            cmd_carbon_savings "$@"
            ;;
        materials)
            cmd_materials
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}Unknown command: $command${NC}" >&2
            echo -e "Run '${CYAN}recycling.sh help${NC}' for usage information" >&2
            exit 1
            ;;
    esac
}

# Run main
main "$@"
