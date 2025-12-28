#!/bin/bash

# WIA-ENE-041: Rare Earth Mining Standard - CLI Tool
# 弘益人間 (홍익인간) - Benefit All Humanity
#
# This CLI tool provides command-line access to the WIA-ENE-041 API

set -e

# Configuration
API_ENDPOINT="${WIA_ENE041_ENDPOINT:-https://api.wia.org/ree-041/v1}"
API_KEY="${WIA_ENE041_API_KEY:-}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1" >&2
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

print_warning() {
    echo -e "${MAGENTA}⚠${NC} $1"
}

print_json() {
    if command -v jq &> /dev/null; then
        echo "$1" | jq .
    else
        echo "$1"
    fi
}

check_api_key() {
    if [ -z "$API_KEY" ]; then
        print_error "API 키가 설정되지 않았습니다."
        print_info "환경 변수 WIA_ENE041_API_KEY를 설정하거나 --api-key 옵션을 사용하세요."
        exit 1
    fi
}

api_request() {
    local method="$1"
    local endpoint="$2"
    local data="$3"

    check_api_key

    local curl_opts=(
        -X "$method"
        -H "Content-Type: application/json"
        -H "Authorization: Bearer $API_KEY"
        -s
    )

    if [ -n "$data" ]; then
        curl_opts+=(-d "$data")
    fi

    local response=$(curl "${curl_opts[@]}" "${API_ENDPOINT}${endpoint}")
    echo "$response"
}

# Commands
cmd_register_mine() {
    print_header "광산 등록"

    local name=""
    local operator=""
    local country=""
    local lat=""
    local lon=""
    local mine_type="OPEN_PIT"
    local ore_type="BASTNASITE"
    local capacity=""
    local treo_grade=""

    while [[ $# -gt 0 ]]; do
        case $1 in
            --name) name="$2"; shift 2 ;;
            --operator) operator="$2"; shift 2 ;;
            --country) country="$2"; shift 2 ;;
            --lat) lat="$2"; shift 2 ;;
            --lon) lon="$2"; shift 2 ;;
            --mine-type) mine_type="$2"; shift 2 ;;
            --ore-type) ore_type="$2"; shift 2 ;;
            --capacity) capacity="$2"; shift 2 ;;
            --treo-grade) treo_grade="$2"; shift 2 ;;
            *) print_error "알 수 없는 옵션: $1"; exit 1 ;;
        esac
    done

    # Validate required fields
    if [ -z "$name" ] || [ -z "$operator" ] || [ -z "$country" ] || [ -z "$lat" ] || [ -z "$lon" ] || [ -z "$treo_grade" ]; then
        print_error "필수 항목이 누락되었습니다."
        echo "사용법: $0 register-mine --name NAME --operator OPERATOR --country COUNTRY"
        echo "        --lat LAT --lon LON --treo-grade GRADE"
        echo "        [--mine-type TYPE] [--ore-type TYPE] [--capacity TONS]"
        exit 1
    fi

    # Build JSON payload
    local payload=$(cat <<EOF
{
  "mine": {
    "name": "$name",
    "operator": "$operator",
    "location": {
      "lat": $lat,
      "lon": $lon,
      "country": "$country"
    },
    "mineType": "$mine_type",
    "oreType": "$ore_type",
    "treoGrade_percent": $treo_grade,
    "capacity_tons_per_year": ${capacity:-10000},
    "status": "OPERATIONAL"
  },
  "composition": {
    "TREO_percent": $treo_grade
  },
  "radioactive": {
    "thorium_ppm": 100,
    "uranium_ppm": 10,
    "totalRadioactivity_Bq_g": 50,
    "wasteLevel": "LOW_LEVEL"
  },
  "environmental": {
    "waterUsage_m3_per_ton": 8.5,
    "restorationRequired": true
  }
}
EOF
)

    print_info "광산 등록 중..."
    response=$(api_request POST "/mines/register" "$payload")

    if echo "$response" | grep -q "mineId"; then
        print_success "광산이 성공적으로 등록되었습니다!"
        echo ""
        print_json "$response"

        # Extract mineId
        if command -v jq &> /dev/null; then
            mine_id=$(echo "$response" | jq -r '.data.mineId')
            tracking_url=$(echo "$response" | jq -r '.data.trackingUrl')
            echo ""
            print_info "광산 ID: $mine_id"
            print_info "추적 URL: $tracking_url"
        fi
    else
        print_error "광산 등록 실패"
        print_json "$response"
        exit 1
    fi
}

cmd_submit_batch() {
    print_header "생산 배치 제출"

    local batch_id=""
    local mine_id=""
    local facility_id=""
    local nd_kg=0
    local dy_kg=0
    local tb_kg=0
    local treo_percent=60

    while [[ $# -gt 0 ]]; do
        case $1 in
            --batch-id) batch_id="$2"; shift 2 ;;
            --mine-id) mine_id="$2"; shift 2 ;;
            --facility-id) facility_id="$2"; shift 2 ;;
            --nd) nd_kg="$2"; shift 2 ;;
            --dy) dy_kg="$2"; shift 2 ;;
            --tb) tb_kg="$2"; shift 2 ;;
            --treo) treo_percent="$2"; shift 2 ;;
            *) print_error "알 수 없는 옵션: $1"; exit 1 ;;
        esac
    done

    if [ -z "$batch_id" ] || [ -z "$mine_id" ] || [ -z "$facility_id" ]; then
        print_error "필수 항목이 누락되었습니다."
        echo "사용법: $0 submit-batch --batch-id ID --mine-id MINE_ID --facility-id FACILITY_ID"
        echo "        [--nd KG] [--dy KG] [--tb KG] [--treo PERCENT]"
        exit 1
    fi

    local payload=$(cat <<EOF
{
  "batchId": "$batch_id",
  "mineId": "$mine_id",
  "facilityId": "$facility_id",
  "productionDate": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "stages": [
    {
      "stage": "EXTRACTION",
      "method": "FLOTATION",
      "date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
      "recovery_percent": 85
    },
    {
      "stage": "SOLVENT_EXTRACTION",
      "method": "SOLVENT_EXTRACTION",
      "date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
      "purity_percent": 99.5
    }
  ],
  "composition": {
    "Nd2O3_percent": 12.0,
    "Dy2O3_percent": 0.5,
    "TREO_percent": $treo_percent
  },
  "products": [
    {
      "element": "Nd",
      "compound": "Nd2O3",
      "form": "OXIDE",
      "quantity_kg": $nd_kg,
      "purity_percent": 99.5
    },
    {
      "element": "Dy",
      "compound": "Dy2O3",
      "form": "OXIDE",
      "quantity_kg": $dy_kg,
      "purity_percent": 99.0
    }
  ],
  "waste": {
    "tailings_tons": 100,
    "radioactiveWaste_kg": 5,
    "radioactivity_Bq": 250
  },
  "environmentalImpact": {
    "waterUsage_m3_per_ton": 8.5,
    "co2Emissions_tons": 2.5,
    "energyConsumption_MWh": 15
  }
}
EOF
)

    print_info "배치 제출 중..."
    response=$(api_request POST "/batches/submit" "$payload")

    if echo "$response" | grep -q "batchId"; then
        print_success "배치가 성공적으로 제출되었습니다!"
        echo ""
        print_json "$response"
    else
        print_error "배치 제출 실패"
        print_json "$response"
        exit 1
    fi
}

cmd_track() {
    local batch_id="$1"

    if [ -z "$batch_id" ]; then
        print_error "배치 ID를 입력하세요."
        echo "사용법: $0 track BATCH_ID"
        exit 1
    fi

    print_header "공급망 추적: $batch_id"
    print_info "추적 정보 조회 중..."

    response=$(api_request GET "/batches/$batch_id/supply-chain" "")

    if echo "$response" | grep -q "origin"; then
        print_success "추적 정보를 찾았습니다!"
        echo ""
        print_json "$response"
    else
        print_error "추적 정보를 찾을 수 없습니다."
        print_json "$response"
        exit 1
    fi
}

cmd_prices() {
    print_header "희토류 가격 조회"
    print_info "현재 가격 조회 중..."

    response=$(api_request GET "/prices/current" "")

    if echo "$response" | grep -q "prices"; then
        print_success "가격 정보를 조회했습니다!"
        echo ""
        print_json "$response"
    else
        print_error "가격 정보 조회 실패"
        print_json "$response"
        exit 1
    fi
}

cmd_price() {
    local element="${1:-Nd}"

    print_header "희토류 가격 조회: $element"
    print_info "가격 조회 중..."

    response=$(api_request GET "/prices/$element" "")

    if echo "$response" | grep -q "price"; then
        print_success "가격 정보를 조회했습니다!"
        echo ""
        print_json "$response"
    else
        print_error "가격 정보 조회 실패"
        print_json "$response"
        exit 1
    fi
}

cmd_verify() {
    local batch_id="$1"

    if [ -z "$batch_id" ]; then
        print_error "배치 ID를 입력하세요."
        echo "사용법: $0 verify BATCH_ID"
        exit 1
    fi

    print_header "배치 검증: $batch_id"
    print_info "검증 중..."

    response=$(api_request GET "/batches/$batch_id/verify" "")

    if echo "$response" | grep -q "verified"; then
        verified=$(echo "$response" | jq -r '.data.verified')
        if [ "$verified" = "true" ]; then
            print_success "배치가 검증되었습니다!"
        else
            print_warning "배치 검증 실패"
        fi
        echo ""
        print_json "$response"
    else
        print_error "검증 정보를 찾을 수 없습니다."
        print_json "$response"
        exit 1
    fi
}

cmd_estimate() {
    local nd_percent="${1:-12.0}"
    local dy_percent="${2:-0.5}"
    local total_kg="${3:-1000}"

    print_header "배치 가치 추정"
    print_info "Nd: ${nd_percent}%, Dy: ${dy_percent}%, Total: ${total_kg}kg"

    local payload=$(cat <<EOF
{
  "composition": {
    "Nd2O3_percent": $nd_percent,
    "Dy2O3_percent": $dy_percent,
    "TREO_percent": 60.0
  },
  "totalWeight_kg": $total_kg
}
EOF
)

    response=$(api_request POST "/utilities/estimate-value" "$payload")

    if echo "$response" | grep -q "totalValue_USD"; then
        print_success "가치를 추정했습니다!"
        echo ""
        print_json "$response"
    else
        print_error "가치 추정 실패"
        print_json "$response"
        exit 1
    fi
}

cmd_help() {
    cat <<EOF
${BLUE}WIA-ENE-041: 희토류 채굴 표준 CLI${NC}
${CYAN}弘益人間 (홍익인간) - Benefit All Humanity${NC}

사용법: $0 <명령어> [옵션]

${YELLOW}명령어:${NC}
  register-mine   새 광산 등록
  submit-batch    생산 배치 제출
  track           공급망 추적
  prices          전체 희토류 가격 조회
  price           특정 원소 가격 조회
  verify          배치 검증
  estimate        배치 가치 추정
  help            도움말 표시

${YELLOW}환경 변수:${NC}
  WIA_ENE041_API_KEY      API 키 (필수)
  WIA_ENE041_ENDPOINT     API 엔드포인트 (기본값: https://api.wia.org/ree-041/v1)

${YELLOW}예제:${NC}
  # 광산 등록
  $0 register-mine --name "Mountain Pass" --operator "MP Materials" \\
     --country USA --lat 35.4887 --lon -115.5470 --treo-grade 7.8

  # 배치 제출
  $0 submit-batch --batch-id REE-BATCH-001 --mine-id REE-MINE-USA-001 \\
     --facility-id REE-PROC-001 --nd 1280 --dy 50 --tb 20

  # 공급망 추적
  $0 track REE-BATCH-2025-MP-0012345

  # 가격 조회
  $0 prices           # 전체 가격
  $0 price Nd         # 네오디뮴 가격

  # 배치 검증
  $0 verify REE-BATCH-2025-MP-0012345

  # 가치 추정 (Nd%, Dy%, total_kg)
  $0 estimate 12.0 0.5 1000

${CYAN}💎 희토류를 지속가능하게! 전략 자원의 투명한 공급망을 함께 만들어갑니다.${NC}
EOF
}

# Main
main() {
    if [ $# -eq 0 ]; then
        cmd_help
        exit 0
    fi

    local command="$1"
    shift

    case "$command" in
        register-mine) cmd_register_mine "$@" ;;
        submit-batch) cmd_submit_batch "$@" ;;
        track) cmd_track "$@" ;;
        prices) cmd_prices ;;
        price) cmd_price "$@" ;;
        verify) cmd_verify "$@" ;;
        estimate) cmd_estimate "$@" ;;
        help|--help|-h) cmd_help ;;
        *)
            print_error "알 수 없는 명령어: $command"
            echo ""
            cmd_help
            exit 1
            ;;
    esac
}

main "$@"
