#!/bin/bash
# =============================================================================
# WIA Standards Ebook Uploader v3.0
# =============================================================================
# 변경사항: HTML 전체가 아닌 <body> 내용만 추출해서 업로드
# =============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

WP_PATH="/var/www/wiabooks"
CATEGORY_SLUG="coding-programming"

if [ $# -lt 2 ]; then
    echo -e "${RED}사용법: $0 <책 태그명> <ebook 디렉토리> [언어코드]${NC}"
    exit 1
fi

BOOK_TAG="$1"
EBOOK_DIR="$2"
LANG_CODE="${3:-en}"

if [[ ! "$EBOOK_DIR" = /* ]]; then
    EBOOK_DIR="/var/www/wiastandards/$EBOOK_DIR"
fi

if [ ! -d "$EBOOK_DIR" ]; then
    echo -e "${RED}오류: 디렉토리가 존재하지 않습니다: $EBOOK_DIR${NC}"
    exit 1
fi

cd "$WP_PATH"

echo -e "${BLUE}=============================================${NC}"
echo -e "${BLUE}    WIA Ebook Uploader v3.0${NC}"
echo -e "${BLUE}=============================================${NC}"
echo -e "📚 책: ${GREEN}$BOOK_TAG${NC}"
echo -e "📂 경로: $EBOOK_DIR"
echo ""

# 태그 생성/확인
echo -e "${YELLOW}[1/4] 태그 확인...${NC}"
TAG_SLUG=$(echo "$BOOK_TAG" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9가-힣-]//g')
TAG_ID=$(sudo -u apache wp term list post_tag --field=term_id --slug="$TAG_SLUG" 2>/dev/null)

if [ -z "$TAG_ID" ]; then
    TAG_ID=$(sudo -u apache wp term create post_tag "$BOOK_TAG" --slug="$TAG_SLUG" --porcelain 2>/dev/null)
    echo -e "  ✨ 새 태그 생성: $BOOK_TAG (ID: $TAG_ID)"
else
    echo -e "  ✅ 기존 태그 사용: $BOOK_TAG (ID: $TAG_ID)"
fi

# 챕터 파일 확인
echo -e "${YELLOW}[2/4] 챕터 파일 확인...${NC}"
CHAPTER_COUNT=$(ls -1 "$EBOOK_DIR"/chapter-*.html 2>/dev/null | wc -l)
echo -e "  📖 발견된 챕터: ${GREEN}$CHAPTER_COUNT개${NC}"

if [ "$CHAPTER_COUNT" -eq 0 ]; then
    echo -e "${RED}오류: 챕터 파일이 없습니다${NC}"
    exit 1
fi

# 챕터 업로드
echo -e "${YELLOW}[3/4] 챕터 업로드...${NC}"
UPLOADED=0
TEMP_FILE=$(mktemp)

for FILE in "$EBOOK_DIR"/chapter-*.html; do
    [ -f "$FILE" ] || continue
    FILENAME=$(basename "$FILE")
    
    # HTML에서 제목 추출
    TITLE=$(grep -oP '(?<=<title>)[^<]+' "$FILE" | head -1)
    if [ -z "$TITLE" ]; then
        TITLE=$(grep -oP '(?<=<h1[^>]*>)[^<]+' "$FILE" | head -1)
    fi
    if [ -z "$TITLE" ]; then
        CHAPTER_NUM=$(echo "$FILENAME" | grep -oP '\d+')
        TITLE="Chapter $CHAPTER_NUM"
    fi
    TITLE=$(echo "$TITLE" | sed 's/ - WIA.*$//')
    
    echo -e "  📄 ${FILENAME}"
    echo -e "     제목: ${GREEN}$TITLE${NC}"
    
    # ★ 핵심: <body> 내용만 추출
    sed -n '/<body[^>]*>/,/<\/body>/p' "$FILE" | sed '1d;$d' > "$TEMP_FILE"
    chmod 644 "$TEMP_FILE"
    
    # 포스트 생성 (body 내용만)
    POST_ID=$(sudo -u apache wp post create "$TEMP_FILE" \
        --post_title="$TITLE" \
        --post_status=private \
        --post_type=post \
        --porcelain 2>/dev/null)
    
    if [ -n "$POST_ID" ]; then
        sudo -u apache wp post term set "$POST_ID" category "$CATEGORY_SLUG" 2>/dev/null
        sudo -u apache wp post term add "$POST_ID" post_tag "$TAG_SLUG" 2>/dev/null
        echo -e "     → ID: ${GREEN}$POST_ID${NC} ✅"
        ((UPLOADED++))
    else
        echo -e "     → ${RED}업로드 실패${NC}"
    fi
done

rm -f "$TEMP_FILE"

# 결과 요약
echo ""
echo -e "${YELLOW}[4/4] 결과 요약${NC}"
echo -e "${BLUE}=============================================${NC}"
echo -e "📚 책: ${GREEN}$BOOK_TAG${NC}"
echo -e "✅ 업로드: ${GREEN}$UPLOADED / $CHAPTER_COUNT${NC} 챕터"
echo -e "${BLUE}=============================================${NC}"

sudo -u apache wp post list --post_status=private --tag="$TAG_SLUG" --fields=ID,post_title --format=table 2>/dev/null

echo -e "${GREEN}완료!${NC}"
