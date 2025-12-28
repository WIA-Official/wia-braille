#!/usr/bin/env bash

#######################################################################
# WIA-ENE-037: Seabed Resource Development Standard - CLI Tool
#
# @version 1.0.0
# @license CC BY 4.0
# @description Command-line interface for seabed resource management
#
# 弘益人間 (홍익인간) - Benefit All Humanity
#######################################################################

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
API_ENDPOINT="${WIA_ENE037_API_ENDPOINT:-https://api.wia.org/ene-037/v1}"
API_KEY="${WIA_ENE037_API_KEY:-}"
OPERATOR_ID="${WIA_ENE037_OPERATOR_ID:-}"

# Helper functions
print_header() {
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║  WIA-ENE-037: 해저 자원 개발 표준 CLI 🌊                  ║${NC}"
    echo -e "${CYAN}║  弘익人間 (홍익인간) - Benefit All Humanity               ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}" >&2
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

check_env() {
    if [[ -z "$API_KEY" ]]; then
        print_error "API key not set. Please set WIA_ENE037_API_KEY environment variable."
        exit 1
    fi
}

# API request helper
api_request() {
    local method="$1"
    local path="$2"
    local data="${3:-}"

    local url="${API_ENDPOINT}${path}"
    local curl_opts=(-s -X "$method" -H "Content-Type: application/json" -H "X-API-Key: $API_KEY")

    if [[ -n "$OPERATOR_ID" ]]; then
        curl_opts+=(-H "X-Operator-ID: $OPERATOR_ID")
    fi

    if [[ -n "$data" ]]; then
        curl_opts+=(-d "$data")
    fi

    curl "${curl_opts[@]}" "$url"
}

# Command: create-license
cmd_create_license() {
    print_header
    echo -e "${CYAN}새 라이선스 생성${NC}\n"

    check_env

    # Interactive input
    read -p "Operator ID: " operator_id
    echo "License Type:"
    echo "  1) exploration (탐사)"
    echo "  2) development (개발)"
    echo "  3) exploitation (상업 채굴)"
    read -p "선택 (1-3): " license_type_choice

    case $license_type_choice in
        1) license_type="exploration" ;;
        2) license_type="development" ;;
        3) license_type="exploitation" ;;
        *) print_error "Invalid choice"; exit 1 ;;
    esac

    echo "Resource Type:"
    echo "  1) polymetallic_nodules (다금속 단괴)"
    echo "  2) seafloor_massive_sulfides (해저 열수광상)"
    echo "  3) cobalt_crusts (코발트 각)"
    echo "  4) methane_hydrates (메탄 하이드레이트)"
    read -p "선택 (1-4): " resource_type_choice

    case $resource_type_choice in
        1) resource_type="polymetallic_nodules" ;;
        2) resource_type="seafloor_massive_sulfides" ;;
        3) resource_type="cobalt_crusts" ;;
        4) resource_type="methane_hydrates" ;;
        *) print_error "Invalid choice"; exit 1 ;;
    esac

    echo "Region:"
    echo "  1) CCZ (Clarion-Clipperton Zone)"
    echo "  2) Indian_Ocean"
    echo "  3) Mid_Atlantic_Ridge"
    echo "  4) Western_Pacific"
    echo "  5) Peru_Basin"
    read -p "선택 (1-5): " region_choice

    case $region_choice in
        1) region="CCZ" ;;
        2) region="Indian_Ocean" ;;
        3) region="Mid_Atlantic_Ridge" ;;
        4) region="Western_Pacific" ;;
        5) region="Peru_Basin" ;;
        *) print_error "Invalid choice"; exit 1 ;;
    esac

    read -p "Proposed Area (km²): " area_value
    read -p "Center Latitude: " latitude
    read -p "Center Longitude: " longitude
    read -p "Min Depth (meters): " min_depth
    read -p "Max Depth (meters): " max_depth

    # Create JSON payload
    local payload=$(cat <<EOF
{
  "operatorId": "$operator_id",
  "licenseType": "$license_type",
  "resourceType": "$resource_type",
  "region": "$region",
  "proposedArea": {
    "value": $area_value,
    "unit": "km²"
  },
  "location": {
    "zone": "abyssal_plain",
    "region": "$region",
    "coordinates": {
      "centerLatitude": $latitude,
      "centerLongitude": $longitude,
      "datum": "WGS84"
    },
    "depthRange": {
      "min": $min_depth,
      "max": $max_depth,
      "unit": "meters"
    }
  }
}
EOF
)

    print_info "Creating license..."
    local response=$(api_request POST "/licenses" "$payload")

    if echo "$response" | jq -e '.licenseNumber' > /dev/null 2>&1; then
        local license_number=$(echo "$response" | jq -r '.licenseNumber')
        print_success "License created successfully!"
        echo -e "\n${GREEN}License Number: $license_number${NC}\n"
    else
        print_error "Failed to create license"
        echo "$response" | jq '.'
        exit 1
    fi
}

# Command: get-license
cmd_get_license() {
    local license_number="$1"

    check_env

    print_info "Fetching license $license_number..."
    local response=$(api_request GET "/licenses/$license_number")

    echo "$response" | jq '.'
}

# Command: list-licenses
cmd_list_licenses() {
    check_env

    print_info "Fetching licenses..."
    local response=$(api_request GET "/licenses")

    echo "$response" | jq '.data[] | {licenseNumber, licenseType, resourceType, region, status}'
}

# Command: submit-production
cmd_submit_production() {
    local system_id="$1"

    print_header
    echo -e "${CYAN}일일 생산 데이터 제출${NC}\n"

    check_env

    read -p "Date (YYYY-MM-DD) [today]: " date_input
    date_input="${date_input:-$(date +%Y-%m-%d)}"

    read -p "Operating Hours: " operating_hours
    read -p "Nodules Collected - Wet Weight (tonnes): " wet_weight
    read -p "Nodules Collected - Dry Weight (tonnes): " dry_weight
    read -p "Sediment Collected (tonnes): " sediment
    read -p "Coverage Area (km²): " coverage_area
    read -p "Collector Track Length (km): " track_length
    read -p "Collector Uptime (%): " uptime
    read -p "Riser Efficiency (%): " efficiency
    read -p "Processing Rate (tonnes/hour): " processing_rate

    local payload=$(cat <<EOF
{
  "systemId": "$system_id",
  "production": {
    "date": "$date_input",
    "operatingHours": $operating_hours,
    "production": {
      "nodulesCollected": {
        "wetWeight": { "value": $wet_weight, "unit": "tonnes" },
        "dryWeight": { "value": $dry_weight, "unit": "tonnes" },
        "moistureContent": { "value": 10, "unit": "percent" }
      },
      "sedimentCollected": { "value": $sediment, "unit": "tonnes" },
      "coverageArea": { "value": $coverage_area, "unit": "km²" },
      "collectorTrackLength": { "value": $track_length, "unit": "km" }
    },
    "systemPerformance": {
      "collectorUptime": { "value": $uptime, "unit": "percent" },
      "riserEfficiency": { "value": $efficiency, "unit": "percent" },
      "processingRate": { "value": $processing_rate, "unit": "tonnes/hour" }
    }
  }
}
EOF
)

    print_info "Submitting production data..."
    local response=$(api_request POST "/mining/daily-production" "$payload")

    print_success "Production data submitted successfully!"
}

# Command: get-production
cmd_get_production() {
    local system_id="$1"
    local days="${2:-30}"

    check_env

    local start_date=$(date -d "$days days ago" +%Y-%m-%d)
    local end_date=$(date +%Y-%m-%d)

    print_info "Fetching production history for last $days days..."
    local response=$(api_request GET "/mining/production-history?systemId=$system_id&startDate=$start_date&endDate=$end_date")

    echo "$response" | jq '.data[] | {date: .date, operatingHours, production: .production.nodulesCollected.dryWeight}'
}

# Command: report-incident
cmd_report_incident() {
    local system_id="$1"

    print_header
    echo -e "${CYAN}환경 사고 보고${NC}\n"

    check_env

    echo "Incident Type:"
    echo "  1) sediment_plume_exceedance"
    echo "  2) equipment_failure"
    echo "  3) spill"
    echo "  4) biodiversity_impact"
    echo "  5) threshold_violation"
    read -p "선택 (1-5): " incident_choice

    case $incident_choice in
        1) incident_type="sediment_plume_exceedance" ;;
        2) incident_type="equipment_failure" ;;
        3) incident_type="spill" ;;
        4) incident_type="biodiversity_impact" ;;
        5) incident_type="threshold_violation" ;;
        *) print_error "Invalid choice"; exit 1 ;;
    esac

    echo "Severity:"
    echo "  1) minor"
    echo "  2) moderate"
    echo "  3) major"
    echo "  4) critical"
    read -p "선택 (1-4): " severity_choice

    case $severity_choice in
        1) severity="minor" ;;
        2) severity="moderate" ;;
        3) severity="major" ;;
        4) severity="critical" ;;
        *) print_error "Invalid choice"; exit 1 ;;
    esac

    read -p "Latitude: " latitude
    read -p "Longitude: " longitude
    read -p "Depth (meters): " depth
    read -p "Description: " description
    read -p "Immediate Actions: " actions

    local payload=$(cat <<EOF
{
  "systemId": "$system_id",
  "incidentType": "$incident_type",
  "severity": "$severity",
  "location": {
    "coordinates": {
      "latitude": $latitude,
      "longitude": $longitude,
      "datum": "WGS84"
    },
    "depth": { "value": $depth, "unit": "meters" }
  },
  "description": "$description",
  "immediateActions": "$actions"
}
EOF
)

    print_info "Reporting incident..."
    local response=$(api_request POST "/environmental/incidents" "$payload")

    if echo "$response" | jq -e '.incidentId' > /dev/null 2>&1; then
        local incident_id=$(echo "$response" | jq -r '.incidentId')
        print_success "Incident reported successfully!"
        echo -e "\n${GREEN}Incident ID: $incident_id${NC}\n"
    else
        print_error "Failed to report incident"
        echo "$response" | jq '.'
        exit 1
    fi
}

# Command: submit-environmental
cmd_submit_environmental() {
    local system_id="$1"

    print_header
    echo -e "${CYAN}환경 모니터링 데이터 제출${NC}\n"

    check_env

    read -p "License Number: " license_number
    read -p "Start Date (YYYY-MM-DD): " start_date
    read -p "End Date (YYYY-MM-DD): " end_date
    read -p "Background Turbidity (FTU): " bg_turbidity
    read -p "Near-field Turbidity (FTU): " nf_turbidity
    read -p "Far-field Turbidity (FTU): " ff_turbidity

    local payload=$(cat <<EOF
{
  "systemId": "$system_id",
  "licenseNumber": "$license_number",
  "reportingPeriod": {
    "startDate": "$start_date",
    "endDate": "$end_date"
  },
  "monitoringData": {
    "sedimentPlumes": [
      {
        "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
        "plumeType": "collector_plume",
        "measurements": {
          "turbidity": {
            "background": { "value": $bg_turbidity, "unit": "FTU" },
            "nearField": { "value": $nf_turbidity, "unit": "FTU" },
            "farField": { "value": $ff_turbidity, "unit": "FTU" }
          }
        }
      }
    ]
  }
}
EOF
)

    print_info "Submitting environmental data..."
    local response=$(api_request POST "/environmental/monitoring" "$payload")

    print_success "Environmental data submitted successfully!"
}

# Command: dashboard
cmd_dashboard() {
    check_env

    if [[ -z "$OPERATOR_ID" ]]; then
        print_error "OPERATOR_ID not set. Please set WIA_ENE037_OPERATOR_ID environment variable."
        exit 1
    fi

    print_header
    echo -e "${CYAN}Operator Dashboard${NC}\n"

    print_info "Fetching dashboard data..."
    local response=$(api_request GET "/operators/$OPERATOR_ID/dashboard")

    echo "$response" | jq '.'
}

# Command: help
cmd_help() {
    print_header
    cat <<EOF
${CYAN}사용법:${NC}
  seabed-resource <command> [arguments]

${CYAN}명령어:${NC}
  ${GREEN}create-license${NC}              새 라이선스 생성 (대화형)
  ${GREEN}get-license${NC} <license-id>    라이선스 조회
  ${GREEN}list-licenses${NC}               라이선스 목록

  ${GREEN}submit-production${NC} <system-id>      일일 생산 데이터 제출
  ${GREEN}get-production${NC} <system-id> [days]  생산 기록 조회 (기본: 30일)

  ${GREEN}submit-environmental${NC} <system-id>   환경 모니터링 데이터 제출
  ${GREEN}report-incident${NC} <system-id>        환경 사고 보고

  ${GREEN}dashboard${NC}                   운영자 대시보드
  ${GREEN}help${NC}                        이 도움말 표시

${CYAN}환경 변수:${NC}
  ${YELLOW}WIA_ENE037_API_KEY${NC}         API 인증 키 (필수)
  ${YELLOW}WIA_ENE037_OPERATOR_ID${NC}     운영자 ID
  ${YELLOW}WIA_ENE037_API_ENDPOINT${NC}    API 엔드포인트 (기본: https://api.wia.org/ene-037/v1)

${CYAN}예제:${NC}
  # 환경 변수 설정
  export WIA_ENE037_API_KEY="your-api-key"
  export WIA_ENE037_OPERATOR_ID="OP-DEEPSEA-01"

  # 새 라이선스 생성
  seabed-resource create-license

  # 생산 데이터 제출
  seabed-resource submit-production WIA-SB-2025-CCZ-001

  # 생산 기록 조회 (최근 30일)
  seabed-resource get-production WIA-SB-2025-CCZ-001 30

  # 환경 사고 보고
  seabed-resource report-incident WIA-SB-2025-CCZ-001

  # 대시보드 조회
  seabed-resource dashboard

${CYAN}문서:${NC}
  https://wia.org/standards/ene-037

${CYAN}지원:${NC}
  Email: seabed-resource@wia.org
  GitHub: https://github.com/WIA-Official/wia-standards

${CYAN}弘益人間 (홍익인간) - Benefit All Humanity${NC} 🌊
EOF
}

# Main command router
main() {
    case "${1:-help}" in
        create-license)
            cmd_create_license
            ;;
        get-license)
            if [[ -z "${2:-}" ]]; then
                print_error "License number required"
                exit 1
            fi
            cmd_get_license "$2"
            ;;
        list-licenses)
            cmd_list_licenses
            ;;
        submit-production)
            if [[ -z "${2:-}" ]]; then
                print_error "System ID required"
                exit 1
            fi
            cmd_submit_production "$2"
            ;;
        get-production)
            if [[ -z "${2:-}" ]]; then
                print_error "System ID required"
                exit 1
            fi
            cmd_get_production "$2" "${3:-30}"
            ;;
        submit-environmental)
            if [[ -z "${2:-}" ]]; then
                print_error "System ID required"
                exit 1
            fi
            cmd_submit_environmental "$2"
            ;;
        report-incident)
            if [[ -z "${2:-}" ]]; then
                print_error "System ID required"
                exit 1
            fi
            cmd_report_incident "$2"
            ;;
        dashboard)
            cmd_dashboard
            ;;
        help|--help|-h)
            cmd_help
            ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            cmd_help
            exit 1
            ;;
    esac
}

# Run main
main "$@"
