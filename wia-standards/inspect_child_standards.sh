#!/bin/bash

# Comprehensive CHILD Standards Quality Inspection
# Checks all 12 WIA-CHILD standards for quality compliance

BASE_DIR="/home/user/wia-standards/standards"
PRIMARY_COLOR="#F59E0B"
MIN_CHAPTER_SIZE=15360  # 15KB in bytes
REQUIRED_LANGUAGES=99

echo "═══════════════════════════════════════════════════════════════════"
echo "WIA-CHILD STANDARDS COMPREHENSIVE QUALITY INSPECTION"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "Inspecting 12 standards: CHILD-001 through CHILD-012"
echo "Primary color requirement: $PRIMARY_COLOR (warm orange)"
echo "Minimum chapter size: 15KB"
echo "Required languages: $REQUIRED_LANGUAGES"
echo ""

# Initialize counters
total_standards=12
passed_standards=0
failed_standards=0

# Arrays to store results
declare -a simulator_status
declare -a ebook_status
declare -a issues_found

# Function to check simulator
check_simulator() {
    local standard_dir=$1
    local standard_name=$(basename "$standard_dir")
    local simulator_file="$standard_dir/simulator/index.html"
    local status="✅"
    local issues=""

    # Check if file exists
    if [ ! -f "$simulator_file" ]; then
        status="❌"
        issues+="Missing simulator/index.html; "
    else
        # Check for 99 languages
        local lang_count=$(grep -o "value=\"[a-z][a-z]\"" "$simulator_file" | wc -l)
        if [ "$lang_count" -lt "$REQUIRED_LANGUAGES" ]; then
            status="❌"
            issues+="Only $lang_count languages (need $REQUIRED_LANGUAGES); "
        fi

        # Check for primary color
        if ! grep -q "$PRIMARY_COLOR" "$simulator_file"; then
            status="❌"
            issues+="Missing primary color $PRIMARY_COLOR; "
        fi
    fi

    echo "$status|$issues"
}

# Function to check ebook chapters
check_ebook_chapters() {
    local standard_dir=$1
    local standard_name=$(basename "$standard_dir")
    local ebook_dir="$standard_dir/ebook/en"
    local status="✅"
    local issues=""
    local chapter_stats=""

    # Check if ebook/en directory exists
    if [ ! -d "$ebook_dir" ]; then
        echo "❌|Missing ebook/en directory|N/A"
        return
    fi

    # Check for new format chapters (chapter-01.html through chapter-08.html)
    local new_format_count=0
    local old_format_count=0
    local undersized_chapters=0
    local min_size=999999999
    local max_size=0
    local total_size=0

    for i in {1..8}; do
        local new_file="$ebook_dir/chapter-0$i.html"
        local old_file="$ebook_dir/chapter$i.html"

        # Check for new format
        if [ -f "$new_file" ]; then
            ((new_format_count++))
            local size=$(stat -c%s "$new_file" 2>/dev/null || echo 0)
            total_size=$((total_size + size))

            if [ "$size" -lt "$min_size" ]; then
                min_size=$size
            fi
            if [ "$size" -gt "$max_size" ]; then
                max_size=$size
            fi

            # Check size requirement
            if [ "$size" -lt "$MIN_CHAPTER_SIZE" ]; then
                ((undersized_chapters++))
                issues+="chapter-0$i.html too small (${size}B); "
            fi

            # Check for primary color
            if ! grep -q "$PRIMARY_COLOR" "$new_file"; then
                issues+="chapter-0$i.html missing color; "
            fi
        else
            issues+="Missing chapter-0$i.html; "
        fi

        # Check for old format (should not exist)
        if [ -f "$old_file" ]; then
            ((old_format_count++))
            issues+="Old format chapter$i.html exists; "
        fi
    done

    # Calculate average
    if [ "$new_format_count" -gt 0 ]; then
        local avg_size=$((total_size / new_format_count))
        chapter_stats="${new_format_count}/8 files, Min:$((min_size/1024))KB Max:$((max_size/1024))KB Avg:$((avg_size/1024))KB"
    else
        chapter_stats="No chapters found"
    fi

    # Determine status
    if [ "$new_format_count" -eq 8 ] && [ "$old_format_count" -eq 0 ] && [ "$undersized_chapters" -eq 0 ] && [ -z "$issues" ]; then
        status="✅"
    else
        status="❌"
    fi

    echo "$status|$issues|$chapter_stats"
}

# Function to check chapter content quality
check_chapter_quality() {
    local chapter_file=$1
    local has_tables=false
    local has_code=false
    local has_takeaways=false
    local has_questions=false
    local has_philosophy=false
    local has_navigation=false

    if [ ! -f "$chapter_file" ]; then
        echo "❌|File not found"
        return
    fi

    # Check for tables
    if grep -q "<table" "$chapter_file"; then
        has_tables=true
    fi

    # Check for code examples
    if grep -q "<pre><code" "$chapter_file" || grep -q "class=\"code" "$chapter_file"; then
        has_code=true
    fi

    # Check for Key Takeaways
    if grep -q "Key Takeaways" "$chapter_file"; then
        has_takeaways=true
    fi

    # Check for Review Questions
    if grep -q "Review Questions" "$chapter_file"; then
        has_questions=true
    fi

    # Check for Philosophy section
    if grep -q "弘益人間" "$chapter_file"; then
        has_philosophy=true
    fi

    # Check for navigation buttons
    if grep -q "navigation-buttons" "$chapter_file" || grep -q "btn-prev" "$chapter_file"; then
        has_navigation=true
    fi

    local quality_issues=""
    [ "$has_tables" = false ] && quality_issues+="No tables; "
    [ "$has_code" = false ] && quality_issues+="No code; "
    [ "$has_takeaways" = false ] && quality_issues+="No Key Takeaways; "
    [ "$has_questions" = false ] && quality_issues+="No Review Questions; "
    [ "$has_philosophy" = false ] && quality_issues+="No 弘益人間; "
    [ "$has_navigation" = false ] && quality_issues+="No navigation; "

    if [ -z "$quality_issues" ]; then
        echo "✅|All quality elements present"
    else
        echo "❌|$quality_issues"
    fi
}

# Main inspection loop
for i in {1..12}; do
    std_num=$(printf "%03d" $i)
    std_dir=$(find "$BASE_DIR" -type d -name "WIA-CHILD-${std_num}-*" | head -1)

    if [ -z "$std_dir" ]; then
        echo "❌ CHILD-$std_num: Directory not found"
        ((failed_standards++))
        continue
    fi

    std_name=$(basename "$std_dir")

    echo "───────────────────────────────────────────────────────────────────"
    echo "📋 CHILD-$std_num: $std_name"
    echo "───────────────────────────────────────────────────────────────────"

    # Check simulator
    echo -n "  [SIMULATOR] "
    sim_result=$(check_simulator "$std_dir")
    sim_status=$(echo "$sim_result" | cut -d'|' -f1)
    sim_issues=$(echo "$sim_result" | cut -d'|' -f2)

    if [ "$sim_status" = "✅" ]; then
        echo "✅ PASS"
    else
        echo "❌ FAIL: $sim_issues"
    fi

    # Check ebook chapters
    echo -n "  [EBOOK CHAPTERS] "
    ebook_result=$(check_ebook_chapters "$std_dir")
    ebook_status=$(echo "$ebook_result" | cut -d'|' -f1)
    ebook_issues=$(echo "$ebook_result" | cut -d'|' -f2)
    ebook_stats=$(echo "$ebook_result" | cut -d'|' -f3)

    if [ "$ebook_status" = "✅" ]; then
        echo "✅ PASS - $ebook_stats"
    else
        echo "❌ FAIL: $ebook_issues"
        echo "         Stats: $ebook_stats"
    fi

    # Sample chapter quality check (chapter-04.html)
    sample_chapter="$std_dir/ebook/en/chapter-04.html"
    echo -n "  [CONTENT QUALITY] Sampling chapter-04.html... "
    quality_result=$(check_chapter_quality "$sample_chapter")
    quality_status=$(echo "$quality_result" | cut -d'|' -f1)
    quality_issues=$(echo "$quality_result" | cut -d'|' -f2)

    if [ "$quality_status" = "✅" ]; then
        echo "✅ PASS"
    else
        echo "❌ FAIL: $quality_issues"
    fi

    # Overall standard status
    if [ "$sim_status" = "✅" ] && [ "$ebook_status" = "✅" ] && [ "$quality_status" = "✅" ]; then
        echo "  ✅ OVERALL: PASS"
        ((passed_standards++))
    else
        echo "  ❌ OVERALL: FAIL"
        ((failed_standards++))
    fi

    echo ""
done

# Summary
echo "═══════════════════════════════════════════════════════════════════"
echo "SUMMARY"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "Total Standards Inspected: $total_standards"
echo "✅ Passed: $passed_standards"
echo "❌ Failed: $failed_standards"
echo "Success Rate: $(( (passed_standards * 100) / total_standards ))%"
echo ""

# Summary table
echo "STANDARDS SUMMARY TABLE"
echo "───────────────────────────────────────────────────────────────────"
printf "%-35s | %-10s | %-10s | %-10s\n" "Standard" "Simulator" "Ebooks" "Quality"
echo "───────────────────────────────────────────────────────────────────"

for i in {1..12}; do
    std_num=$(printf "%03d" $i)
    std_dir=$(find "$BASE_DIR" -type d -name "WIA-CHILD-${std_num}-*" | head -1)

    if [ -z "$std_dir" ]; then
        printf "%-35s | %-10s | %-10s | %-10s\n" "CHILD-$std_num" "❌ N/A" "❌ N/A" "❌ N/A"
        continue
    fi

    std_name=$(basename "$std_dir")

    # Quick checks
    sim_result=$(check_simulator "$std_dir")
    sim_status=$(echo "$sim_result" | cut -d'|' -f1)

    ebook_result=$(check_ebook_chapters "$std_dir")
    ebook_status=$(echo "$ebook_result" | cut -d'|' -f1)

    quality_result=$(check_chapter_quality "$std_dir/ebook/en/chapter-04.html")
    quality_status=$(echo "$quality_result" | cut -d'|' -f1)

    printf "%-35s | %-10s | %-10s | %-10s\n" "$std_name" "$sim_status" "$ebook_status" "$quality_status"
done

echo "───────────────────────────────────────────────────────────────────"
echo ""
echo "Inspection complete!"
