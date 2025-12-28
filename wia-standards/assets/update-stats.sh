#!/bin/bash
# WIA Standards 통계 업데이트 스크립트

cd /var/www/wiastandards

# 통계 계산
CARDS=$(grep -c 'class="card"' index.html)
SIMULATORS=$(find . -maxdepth 2 -type d -name "simulator" | wc -l)
EBOOKS=$(find . -maxdepth 3 -type d -name "ebook" | wc -l)

# Developer Tools: 고정 6개
TOOLS=6

# Standards 코드 줄 수
HTML_LINES=$(find . -name "*.html" -type f | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
JS_LINES=$(find . -name "*.js" -type f | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
CSS_LINES=$(find . -name "*.css" -type f | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')

# Tools Bash 스크립트 줄 수 (정확한 경로)
BASH_LINES=0
for script in ./tools/auto-secure/wia-secure-install.sh \
              ./tools/auto-backup/auto-backup.sh \
              ./tools/auto-deploy/auto-deploy.sh \
              ./tools/auto-monitor/auto-monitor.sh \
              ./tools/auto-health/auto-health.sh \
              ./tools/auto-database/auto-database.sh \
              ./tools/install.sh; do
    if [ -f "$script" ]; then
        lines=$(wc -l < "$script")
        BASH_LINES=$((BASH_LINES + lines))
    fi
done

TOTAL_LINES=$((HTML_LINES + JS_LINES + CSS_LINES + BASH_LINES))

# JSON 파일 생성
cat > assets/stats.json << JSONEOF
{
  "updated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "standards": $CARDS,
  "substandards": 620,
  "simulators": $SIMULATORS,
  "ebooks": $EBOOKS,
  "tools": $TOOLS,
  "lines": {
    "standards_html": $HTML_LINES,
    "standards_js": $JS_LINES,
    "standards_css": $CSS_LINES,
    "tools_bash": $BASH_LINES,
    "total": $TOTAL_LINES
  }
}
JSONEOF

echo "Stats updated: $(date)"
cat assets/stats.json
