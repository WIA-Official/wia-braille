#!/bin/bash

# SENIOR + OCEAN Quality Inspection Script
# 심층 품질 검사

echo "🔍 =============================================="
echo "   SENIOR + OCEAN 심층 품질 검사"
echo "   Deep Quality Inspection"
echo "=============================================="
echo ""

# Phase 1: OCEAN 파일명 검증
echo "📋 Phase 1: OCEAN 파일명 검증"
echo "-------------------------------------------"

error_count=0
total_checked=0

for std in standards/WIA-OCEAN-*/; do
    std_name=$(basename "$std")

    # Check EN files
    for i in {1..8}; do
        old_file="$std/ebook/en/chapter${i}.html"
        new_file="$std/ebook/en/chapter-0${i}.html"

        if [ -f "$old_file" ]; then
            echo "❌ $std_name/ebook/en/chapter${i}.html 여전히 존재!"
            ((error_count++))
        fi

        if [ ! -f "$new_file" ]; then
            echo "❌ $std_name/ebook/en/chapter-0${i}.html 없음!"
            ((error_count++))
        fi
        ((total_checked++))
    done

    # Check KO files
    for i in {1..8}; do
        old_file="$std/ebook/ko/chapter${i}.html"
        new_file="$std/ebook/ko/chapter-0${i}.html"

        if [ -f "$old_file" ]; then
            echo "❌ $std_name/ebook/ko/chapter${i}.html 여전히 존재!"
            ((error_count++))
        fi

        if [ ! -f "$new_file" ]; then
            echo "❌ $std_name/ebook/ko/chapter-0${i}.html 없음!"
            ((error_count++))
        fi
        ((total_checked++))
    done
done

if [ $error_count -eq 0 ]; then
    echo "✅ OCEAN 파일명: 모두 정상 ($total_checked 파일 확인)"
else
    echo "⚠️  OCEAN 파일명: $error_count 개 오류 발견"
fi
echo ""

# Phase 2: SENIOR 테마 색상 검증
echo "📋 Phase 2: SENIOR 테마 색상 검증"
echo "-------------------------------------------"

senior_old_color_count=0
senior_new_color_count=0

for std in standards/WIA-SENIOR-*/; do
    std_name=$(basename "$std")

    if grep -q "#F97316" "$std/index.html" 2>/dev/null; then
        echo "❌ $std_name/index.html: 구 색상 #F97316 발견!"
        ((senior_old_color_count++))
    fi

    if grep -q "#F97316" "$std/simulator/index.html" 2>/dev/null; then
        echo "❌ $std_name/simulator/index.html: 구 색상 #F97316 발견!"
        ((senior_old_color_count++))
    fi

    if grep -q "#64748B" "$std/index.html" 2>/dev/null; then
        ((senior_new_color_count++))
    fi

    if grep -q "#64748B" "$std/simulator/index.html" 2>/dev/null; then
        ((senior_new_color_count++))
    fi
done

echo "   구 색상(#F97316) 발견: $senior_old_color_count"
echo "   신 색상(#64748B) 발견: $senior_new_color_count"

if [ $senior_old_color_count -eq 0 ] && [ $senior_new_color_count -ge 20 ]; then
    echo "✅ SENIOR 테마 색상: 모두 정상"
else
    echo "⚠️  SENIOR 테마 색상: 검토 필요"
fi
echo ""

# Phase 3: OCEAN 테마 색상 검증
echo "📋 Phase 3: OCEAN 테마 색상 검증"
echo "-------------------------------------------"

ocean_old_color_count=0
ocean_new_color_count=0

for std in standards/WIA-OCEAN-*/; do
    std_name=$(basename "$std")

    if grep -q "#0891B2" "$std/index.html" 2>/dev/null; then
        echo "❌ $std_name/index.html: 구 색상 #0891B2 발견!"
        ((ocean_old_color_count++))
    fi

    if grep -q "#0891B2" "$std/simulator/index.html" 2>/dev/null; then
        echo "❌ $std_name/simulator/index.html: 구 색상 #0891B2 발견!"
        ((ocean_old_color_count++))
    fi

    if grep -q "#0EA5E9" "$std/index.html" 2>/dev/null; then
        ((ocean_new_color_count++))
    fi

    if grep -q "#0EA5E9" "$std/simulator/index.html" 2>/dev/null; then
        ((ocean_new_color_count++))
    fi
done

echo "   구 색상(#0891B2) 발견: $ocean_old_color_count"
echo "   신 색상(#0EA5E9) 발견: $ocean_new_color_count"

if [ $ocean_old_color_count -eq 0 ] && [ $ocean_new_color_count -ge 20 ]; then
    echo "✅ OCEAN 테마 색상: 모두 정상"
else
    echo "⚠️  OCEAN 테마 색상: 검토 필요"
fi
echo ""

# Phase 4: 99언어 검증
echo "📋 Phase 4: 99언어 Simulator 검증"
echo "-------------------------------------------"

echo "SENIOR Standards:"
for std in standards/WIA-SENIOR-*/simulator/index.html; do
    std_name=$(basename $(dirname $(dirname "$std")))
    count=$(grep -o "<option>" "$std" | wc -l)
    if [ $count -eq 99 ]; then
        echo "  ✅ $std_name: $count options"
    else
        echo "  ❌ $std_name: $count options (expected 99)"
    fi
done

echo ""
echo "OCEAN Standards:"
for std in standards/WIA-OCEAN-*/simulator/index.html; do
    std_name=$(basename $(dirname $(dirname "$std")))
    count=$(grep -o "<option>" "$std" | wc -l)
    # OCEAN has EN/KO buttons + 99 lang select + some other options
    if [ $count -ge 99 ]; then
        echo "  ✅ $std_name: $count options (includes 99-lang selector)"
    else
        echo "  ❌ $std_name: $count options (expected 99+)"
    fi
done

echo ""
echo "🎯 =============================================="
echo "   품질 검사 완료"
echo "=============================================="
