#!/bin/bash
cd /var/www/wiastandards
export LC_ALL=C && export LANG=C

STDS="air-power air-shield auto bci bio bionic-eye carbon-credit-micro carebot ci climate cognitive-aac digital-erasure digital-executor digital-funeral digital-memorial digital-twin-city digital-will dpki edu exoskeleton eye-gaze fintech food-allergy-passport game haptic home intent-lang material medical myoelectric nano ocean-plastic-track omni-api physics pq-crypto pubscript quantum security smart-wheelchair smarthome social space tls-lite voice xr"

for STD in $STDS; do
    echo "$(date): [$STD] 시작" >> /tmp/upload-log.txt
    ./upload-ebook-v2.sh "WIA ${STD}" ./${STD}/ebook/en en >> /tmp/upload-log.txt 2>&1
    ./upload-ebook-v2.sh "WIA ${STD} 한글" ./${STD}/ebook/ko ko >> /tmp/upload-log.txt 2>&1
    echo "$(date): [$STD] 완료" >> /tmp/upload-log.txt
    echo "" >> /tmp/upload-log.txt
done

echo "=== 모든 업로드 완료 ===" >> /tmp/upload-log.txt
