#!/bin/bash

# UNESCO 제출용 PDF 생성 스크립트
# Markdown to PDF using pandoc (when installed)

echo "📄 UNESCO 제출 문서 PDF 변환 중..."

# 출력 디렉토리 생성
mkdir -p unesco/pdfs

# 3개 주요 문서 변환
FILES=(
  "unesco/COVER_LETTER.md"
  "unesco/EXECUTIVE_SUMMARY.md"
  "unesco/PROPOSAL.md"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    filename=$(basename "$file" .md)
    output="unesco/pdfs/${filename}.pdf"

    echo "변환 중: $file → $output"

    # pandoc으로 PDF 생성
    pandoc "$file" \
      -o "$output" \
      --pdf-engine=xelatex \
      -V geometry:margin=1in \
      -V fontsize=11pt \
      --toc \
      --highlight-style=tango \
      2>/dev/null

    if [ $? -eq 0 ]; then
      echo "✅ 완료: $output"
    else
      echo "❌ 실패: $file (pandoc 미설치 또는 오류)"
    fi
  fi
done

echo ""
echo "📧 UNESCO 제출:"
echo "   1. Cover Letter: unesco/pdfs/COVER_LETTER.pdf"
echo "   2. Executive Summary: unesco/pdfs/EXECUTIVE_SUMMARY.pdf"
echo "   3. Full Proposal: unesco/pdfs/PROPOSAL.pdf"
echo ""
echo "📮 이메일:"
echo "   - ge.vernizzi@unesco.org"
echo "   - a.melo@unesco.org"
echo ""
echo "제목: Proposal for WIA Braille - Universal Braille System for 7,000+ Languages"
