#!/bin/bash
# =============================================================================
# WIA Ebook Posts Fix Script
# 기존 포스트에서 전체 HTML → body 내용만으로 업데이트
# =============================================================================

cd /var/www/wiabooks
export LC_ALL=C && export LANG=C

STANDARDS_DIR="/var/www/wiastandards"
UPDATED=0
FAILED=0
SKIPPED=0

echo "=== WIA Ebook Posts Fix Script ==="
echo ""

# 모든 private 포스트 ID 가져오기
POST_IDS=$(sudo -u apache wp post list --post_status=private --post_type=post --field=ID 2>/dev/null)

TOTAL=$(echo "$POST_IDS" | wc -l)
echo "총 포스트: $TOTAL"
echo ""

COUNT=0
for POST_ID in $POST_IDS; do
    COUNT=$((COUNT + 1))
    
    # 포스트 내용 첫 줄 확인 (<!DOCTYPE 또는 <html 로 시작하면 수정 필요)
    FIRST_LINE=$(sudo -u apache wp post get $POST_ID --field=post_content 2>/dev/null | head -1)
    
    if [[ "$FIRST_LINE" == *"<!DOCTYPE"* ]] || [[ "$FIRST_LINE" == *"<html"* ]]; then
        # 수정 필요 - body 추출
        CONTENT=$(sudo -u apache wp post get $POST_ID --field=post_content 2>/dev/null)
        BODY=$(echo "$CONTENT" | sed -n '/<body[^>]*>/,/<\/body>/p' | sed '1d;$d')
        
        if [ -n "$BODY" ]; then
            # 임시 파일에 저장
            TEMP_FILE=$(mktemp)
            echo "$BODY" > "$TEMP_FILE"
            
            # 업데이트
            sudo -u apache wp post update $POST_ID --post_content="$(cat $TEMP_FILE)" 2>/dev/null
            
            if [ $? -eq 0 ]; then
                UPDATED=$((UPDATED + 1))
                if [ $((UPDATED % 50)) -eq 0 ]; then
                    echo "진행: $COUNT / $TOTAL (업데이트: $UPDATED)"
                fi
            else
                FAILED=$((FAILED + 1))
            fi
            
            rm -f "$TEMP_FILE"
        else
            FAILED=$((FAILED + 1))
        fi
    else
        SKIPPED=$((SKIPPED + 1))
    fi
done

echo ""
echo "=== 완료 ==="
echo "✅ 업데이트: $UPDATED"
echo "⏭️ 스킵 (이미 정상): $SKIPPED"
echo "❌ 실패: $FAILED"
