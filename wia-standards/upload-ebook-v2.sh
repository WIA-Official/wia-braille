#!/bin/bash
# =============================================================================
# WIA Standards Ebook Uploader v2.0
# =============================================================================
# 사용법: ./upload-ebook-v2.sh <책태그명> <ebook경로> [언어코드]
# 예: ./upload-ebook-v2.sh "WIA AAC Communication" ./aac/ebook/en en
#     ./upload-ebook-v2.sh "WIA AAC Communication 한글" ./aac/ebook/ko ko
#
# 자동 설정:
# - 카테고리: 일반도서 > IT/프로그래밍 > 코딩/프로그래밍/언어 (ID: 926)
# - 제목: HTML <title> 또는 <h1> 태그에서 추출
# - 태그: 책 태그명으로 자동 생성
# - 상태: private (비공개)
# =============================================================================

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 기본 설정
WP_PATH="/var/www/wiabooks"
CATEGORY_SLUG="coding-programming"  # 코딩/프로그래밍/언어

# 인자 확인
if [ $# -lt 2 ]; then
    echo -e "${RED}사용법: $0 <책 태그명> <ebook 디렉토리> [언어코드]${NC}"
    echo -e "예: $0 'WIA AAC Communication' ./aac/ebook/en en"
    echo -e "    $0 'WIA AAC Communication 한글' ./aac/ebook/ko ko"
    exit 1
fi

BOOK_TAG="$1"
EBOOK_DIR="$2"
LANG_CODE="${3:-en}"

# 절대 경로 변환
if [[ ! "$EBOOK_DIR" = /* ]]; then
    EBOOK_DIR="/var/www/wiastandards/$EBOOK_DIR"
fi

if [ ! -d "$EBOOK_DIR" ]; then
    echo -e "${RED}오류: 디렉토리가 존재하지 않습니다: $EBOOK_DIR${NC}"
    exit 1
fi

cd "$WP_PATH"

echo -e "${BLUE}=============================================${NC}"
echo -e "${BLUE}    WIA Ebook Uploader v2.0${NC}"
echo -e "${BLUE}=============================================${NC}"
echo -e "📚 책: ${GREEN}$BOOK_TAG${NC}"
echo -e "📂 경로: $EBOOK_DIR"
echo -e "🌐 언어: $LANG_CODE"
echo -e "📁 카테고리: 코딩/프로그래밍/언어 ($CATEGORY_SLUG)"
echo ""

# [1/4] 태그 생성/확인
echo -e "${YELLOW}[1/4] 태그 확인...${NC}"
TAG_SLUG=$(echo "$BOOK_TAG" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9가-힣-]//g')

# 태그 존재 확인
TAG_ID=$(sudo -u apache wp term list post_tag --field=term_id --slug="$TAG_SLUG" 2>/dev/null)

if [ -z "$TAG_ID" ]; then
    # 새 태그 생성
    TAG_ID=$(sudo -u apache wp term create post_tag "$BOOK_TAG" --slug="$TAG_SLUG" --porcelain 2>/dev/null)
    echo -e "  ✨ 새 태그 생성: $BOOK_TAG (ID: $TAG_ID)"
else
    echo -e "  ✅ 기존 태그 사용: $BOOK_TAG (ID: $TAG_ID)"
fi

# [2/4] 챕터 파일 확인
echo -e "${YELLOW}[2/4] 챕터 파일 확인...${NC}"
CHAPTER_COUNT=$(ls -1 "$EBOOK_DIR"/chapter-*.html 2>/dev/null | wc -l)
echo -e "  📖 발견된 챕터: ${GREEN}$CHAPTER_COUNT개${NC}"

if [ "$CHAPTER_COUNT" -eq 0 ]; then
    echo -e "${RED}오류: 챕터 파일이 없습니다${NC}"
    exit 1
fi

# [3/4] 챕터 업로드
echo -e "${YELLOW}[3/4] 챕터 업로드...${NC}"
UPLOADED=0

for FILE in "$EBOOK_DIR"/chapter-*.html; do
    [ -f "$FILE" ] || continue
    FILENAME=$(basename "$FILE")
    
    # HTML에서 제목 추출 (우선순위: <title> > <h1>)
    TITLE=$(grep -oP '(?<=<title>)[^<]+' "$FILE" | head -1)
    if [ -z "$TITLE" ]; then
        TITLE=$(grep -oP '(?<=<h1>)[^<]+' "$FILE" | head -1)
    fi
    if [ -z "$TITLE" ]; then
        TITLE=$(grep -oP '(?<=<h1[^>]*>)[^<]+' "$FILE" | head -1)
    fi
    
    # 제목이 없으면 파일명에서 추출
    if [ -z "$TITLE" ]; then
        CHAPTER_NUM=$(echo "$FILENAME" | grep -oP '\d+')
        TITLE="Chapter $CHAPTER_NUM"
    fi
    
    # 제목에서 " - WIA" 이후 부분 제거 (너무 긴 경우)
    TITLE=$(echo "$TITLE" | sed 's/ - WIA.*$//')
    
    echo -e "  📄 ${FILENAME}"
    echo -e "     제목: ${GREEN}$TITLE${NC}"
    
    # 포스트 생성
    POST_ID=$(sudo -u apache wp post create "$FILE" \
        --post_title="$TITLE" \
        --post_status=private \
        --post_type=post \
        --porcelain 2>/dev/null)
    
    if [ -n "$POST_ID" ]; then
        # 카테고리 설정
        sudo -u apache wp post term set "$POST_ID" category "$CATEGORY_SLUG" 2>/dev/null
        
        # 태그 설정
        sudo -u apache wp post term add "$POST_ID" post_tag "$TAG_SLUG" 2>/dev/null
        
        echo -e "     → ID: ${GREEN}$POST_ID${NC} ✅"
        ((UPLOADED++))
    else
        echo -e "     → ${RED}업로드 실패${NC}"
    fi
done

# [4/4] 결과 요약
echo ""
echo -e "${YELLOW}[4/4] 결과 요약${NC}"
echo -e "${BLUE}=============================================${NC}"
echo -e "📚 책: ${GREEN}$BOOK_TAG${NC}"
echo -e "✅ 업로드: ${GREEN}$UPLOADED / $CHAPTER_COUNT${NC} 챕터"
echo -e "🏷️ 태그: $BOOK_TAG (ID: $TAG_ID)"
echo -e "📁 카테고리: 코딩/프로그래밍/언어 ($CATEGORY_SLUG)"
echo -e "${BLUE}=============================================${NC}"

# 업로드된 포스트 목록
echo ""
echo -e "${YELLOW}업로드된 포스트:${NC}"
sudo -u apache wp post list --post_status=private --tag="$TAG_SLUG" --fields=ID,post_title --format=table 2>/dev/null

echo ""
echo -e "${GREEN}완료!${NC}"
