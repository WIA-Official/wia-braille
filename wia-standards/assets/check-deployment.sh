#!/bin/bash
# WIA Standards 배포 검증 스크립트
# 표준 폴더 vs 메인 페이지 카드 비교

cd /var/www/wiastandards

echo "=============================================="
echo "    WIA Standards 배포 검증 스크립트"
echo "=============================================="
echo ""

# 시스템 폴더 (카드 불필요)
SYSTEM_FOLDERS="assets|cert|tools|backup|EN_|css|js|fonts|images|video|data|docs|donate|wp|infrastructure|\.backup|test|old|temp"

# 서브스탠다드 (상위 표준 카드에 포함됨)
# ai-embodiment 시리즈: ai-embodiment 카드에 포함
SUBSTANDARDS="ai-embodiment-ethics|ai-human-coexistence|ai-motor-control|ai-robot-interface|ai-safety-physical|ai-sensor-fusion"

# 실제 표준 폴더 찾기 (simulator 또는 ebook이 있는 폴더)
echo "📁 실제 표준 폴더 확인..."
STANDARD_FOLDERS=""
for dir in */; do
    dirname=$(basename "$dir")
    # 시스템 폴더 제외
    if echo "$dirname" | grep -qE "$SYSTEM_FOLDERS"; then
        continue
    fi
    # 서브스탠다드 제외
    if echo "$dirname" | grep -qE "^($SUBSTANDARDS)$"; then
        continue
    fi
    # simulator 또는 ebook이 있는 폴더만
    if [ -d "$dir/simulator" ] || [ -d "$dir/ebook" ]; then
        STANDARD_FOLDERS="$STANDARD_FOLDERS $dirname"
    fi
done

# 메인 페이지 카드 링크 추출
echo "🔗 메인 페이지 카드 확인..."
CARD_LINKS=$(grep 'class="card"' index.html | grep -oP 'href="[^"]*"' | sed 's/href="//;s/"$//')

# 누락된 표준 찾기
echo ""
echo "❌ 메인 페이지에 카드가 없는 표준:"
echo "=================================="
MISSING=0
for folder in $STANDARD_FOLDERS; do
    FOUND=0
    # 다양한 링크 형식 확인
    if echo "$CARD_LINKS" | grep -q "${folder}.wiastandards.com"; then
        FOUND=1
    fi
    if echo "$CARD_LINKS" | grep -q "/${folder}/"; then
        FOUND=1
    fi
    if echo "$CARD_LINKS" | grep -q "wia.live/${folder}"; then
        FOUND=1
    fi
    
    if [ $FOUND -eq 0 ]; then
        HAS_SIM=$([ -d "$folder/simulator" ] && echo "✅" || echo "❌")
        HAS_EBOOK=$([ -d "$folder/ebook" ] && echo "✅" || echo "❌")
        echo "  ❌ $folder (시뮬: $HAS_SIM, Ebook: $HAS_EBOOK)"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -eq 0 ]; then
    echo "  ✅ 모든 표준이 메인 페이지에 등록되어 있습니다!"
fi

echo ""
echo "=============================================="
echo "📊 요약"
echo "=============================================="
TOTAL_FOLDERS=$(echo $STANDARD_FOLDERS | wc -w)
CARD_COUNT=$(grep -c 'class="card"' index.html)
echo "  독립 표준 폴더: $TOTAL_FOLDERS"
echo "  서브스탠다드: $(echo "$SUBSTANDARDS" | tr '|' '\n' | wc -l)개 (통합 카드에 포함)"
echo "  메인 카드 수: $CARD_COUNT"
echo "  누락된 표준: $MISSING"
echo ""

# 누락이 있으면 경고
if [ $MISSING -gt 0 ]; then
    echo "⚠️  경고: $MISSING개 표준이 메인 페이지에 없습니다!"
    echo "    Step 3 (메인사이트 카드 추가)를 확인하세요."
    exit 1
fi

echo "✅ 배포 검증 완료!"
