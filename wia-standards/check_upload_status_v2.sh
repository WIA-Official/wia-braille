#!/bin/bash

cd /var/www/wiabooks

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

uploaded_en=0
uploaded_ko=0
not_uploaded=0

for std in "${STANDARDS[@]}"; do
  # EN 태그 확인
  en_slug="wia-$std"
  ko_slug="wia-$std-한글"
  
  en_count=$(sudo -u apache wp post list --tag="$en_slug" --format=count 2>/dev/null || echo "0")
  ko_count=$(sudo -u apache wp post list --tag="$ko_slug" --format=count 2>/dev/null || echo "0")
  
  if [ "$en_count" != "0" ] || [ "$ko_count" != "0" ]; then
    echo "✅ $std: EN=$en_count, KO=$ko_count"
    if [ "$en_count" != "0" ]; then ((uploaded_en++)); fi
    if [ "$ko_count" != "0" ]; then ((uploaded_ko++)); fi
  else
    echo "❌ $std"
    ((not_uploaded++))
  fi
done

echo ""
echo "=== 요약 ==="
echo "✅ EN 업로드 완료: $uploaded_en/43"
echo "✅ KO 업로드 완료: $uploaded_ko/43"
echo "❌ 업로드 필요: $not_uploaded"
echo "📈 진행률: $((uploaded_en * 100 / 43))% (EN), $((uploaded_ko * 100 / 43))% (KO)"
