#!/bin/bash
# WIA Standards Ebook Universal Uploader
# 사용법: ./upload-ebook.sh <표준명> <ebook경로>
# 예: ./upload-ebook.sh "WIA Pet Health Passport" ./pet-health-passport/ebook

if [ $# -lt 2 ]; then
    echo "사용법: $0 <책 태그명> <ebook 디렉토리>"
    echo "예: $0 'WIA Pet Health Passport' ./pet-health-passport/ebook"
    exit 1
fi

BOOK_TAG="$1"
EBOOK_DIR="$2"
WP_PATH="/var/www/wiabooks"

# 절대 경로 변환
if [[ ! "$EBOOK_DIR" = /* ]]; then
    EBOOK_DIR="/var/www/wiastandards/$EBOOK_DIR"
fi

if [ ! -d "$EBOOK_DIR" ]; then
    echo "오류: 디렉토리가 존재하지 않습니다: $EBOOK_DIR"
    exit 1
fi

cd "$WP_PATH"

echo "=== WIA Ebook Uploader ==="
echo "책: $BOOK_TAG"
echo "경로: $EBOOK_DIR"
echo ""

# 1. 태그 생성/확인
echo "[1/3] 태그 확인..."
TAG_SLUG=$(echo "$BOOK_TAG" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
sudo -u apache wp term create post_tag "$BOOK_TAG" --slug="$TAG_SLUG" --porcelain --allow-root 2>/dev/null || true
echo "태그: $BOOK_TAG (slug: $TAG_SLUG)"

# 2. 챕터 파일 처리
echo ""
echo "[2/3] 챕터 업로드..."
count=0

for chapter_file in "$EBOOK_DIR"/chapter-*.html; do
    [ -f "$chapter_file" ] || continue
    
    filename=$(basename "$chapter_file")
    chapter_num=$(echo "$filename" | sed 's/chapter-0*\([0-9]*\)\.html/\1/')
    
    # 제목 추출 (data-en 속성에서)
    title=$(grep -oP 'data-en="Chapter [^"]+' "$chapter_file" | head -1 | sed 's/data-en="//')
    [ -z "$title" ] && title="Chapter $chapter_num"
    
    echo ""
    echo "처리: $filename → $title"
    
    # article.content 추출
    content=$(awk '/<article class="content">/,/<\/article>/' "$chapter_file" | sed '1d;$d')
    
    # 임시 파일
    temp_content="/tmp/chapter_${chapter_num}_$$.html"
    echo "$content" > "$temp_content"
    
    # 포스트 생성
    POST_ID=$(sudo -u apache wp post create "$temp_content" \
        --post_title="$title" \
        --post_status=private \
        --post_type=post \
        --porcelain \
        --allow-root 2>/dev/null)
    
    if [ -n "$POST_ID" ] && [ "$POST_ID" -gt 0 ] 2>/dev/null; then
        sudo -u apache wp post term add $POST_ID post_tag "$TAG_SLUG" --allow-root 2>/dev/null
        echo "  → 생성됨: ID=$POST_ID"
        ((count++))
    else
        echo "  → 실패"
    fi
    
    rm -f "$temp_content"
done

# 3. 결과
echo ""
echo "[3/3] 결과"
echo "총 $count 개 챕터 업로드됨"
echo ""
sudo -u apache wp post list --post_status=private --tag="$TAG_SLUG" --fields=ID,post_title --allow-root 2>/dev/null

echo ""
echo "완료!"
