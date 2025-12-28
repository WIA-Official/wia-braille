#!/bin/bash

STANDARDS=(
ai-embodiment
battery-passport
bionic-eye
carbon-credit-micro
ci
climate
cognitive-aac
digital-erasure
digital-executor
digital-funeral
digital-memorial
digital-twin-city
digital-will
dpki
edu
exoskeleton
eye-gaze
fintech
food-allergy-passport
game
haptic
health
home
intent-lang
material
medical
myoelectric
nano
ocean-plastic-track
omni-api
physics
pq-crypto
pubscript
quantum
robot
security
smart-wheelchair
smarthome
social
space
tls-lite
voice
xr
)

echo "=== WIA Standards 업로드 현황 ==="
echo ""
echo "📊 총 표준 수: ${#STANDARDS[@]}"
echo ""

uploaded_en=0
uploaded_ko=0
not_uploaded=0

for std in "${STANDARDS[@]}"; do
  # WP에서 확인
  en_count=$(sudo -u apache wp db query "SELECT COUNT(*) FROM wp_terms t JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id LEFT JOIN wp_term_relationships tr ON tt.term_taxonomy_id = tr.term_taxonomy_id WHERE tt.taxonomy = 'post_tag' AND t.name = 'WIA $std' GROUP BY t.term_id" --skip-column-names 2>/dev/null || echo "0")
  ko_count=$(sudo -u apache wp db query "SELECT COUNT(*) FROM wp_terms t JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id LEFT JOIN wp_term_relationships tr ON tt.term_taxonomy_id = tr.term_taxonomy_id WHERE tt.taxonomy = 'post_tag' AND t.name = 'WIA $std 한글' GROUP BY t.term_id" --skip-column-names 2>/dev/null || echo "0")
  
  en_count=$(echo $en_count | xargs)
  ko_count=$(echo $ko_count | xargs)
  
  if [ "$en_count" != "0" ] || [ "$ko_count" != "0" ]; then
    echo "✅ $std: EN=$en_count, KO=$ko_count"
    if [ "$en_count" != "0" ]; then ((uploaded_en++)); fi
    if [ "$ko_count" != "0" ]; then ((uploaded_ko++)); fi
  else
    echo "❌ $std: 업로드 안됨"
    ((not_uploaded++))
  fi
done

echo ""
echo "=== 요약 ==="
echo "✅ EN 업로드 완료: $uploaded_en"
echo "✅ KO 업로드 완료: $uploaded_ko"
echo "❌ 업로드 필요: $not_uploaded"
echo "📈 진행률: $((uploaded_en * 100 / ${#STANDARDS[@]}))% (EN), $((uploaded_ko * 100 / ${#STANDARDS[@]}))% (KO)"
