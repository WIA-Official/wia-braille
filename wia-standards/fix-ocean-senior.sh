#!/bin/bash

# Fix script for OCEAN and SENIOR standards quality improvement
# Task:
# 1. Rename OCEAN chapter files: chapterX.html → chapter-0X.html
# 2. Update theme colors
# 3. Add 99-language simulator

set -e

echo "🌊 Starting OCEAN + SENIOR Quality Fix..."
echo ""

# Part 1: Rename OCEAN chapter files
echo "📝 Part 1: Renaming OCEAN chapter files (chapter1.html → chapter-01.html)..."
for std in standards/WIA-OCEAN-*/; do
    std_name=$(basename "$std")
    echo "  Processing $std_name..."

    # Process EN files
    if [ -d "$std/ebook/en" ]; then
        cd "$std/ebook/en"
        for i in {1..9}; do
            if [ -f "chapter${i}.html" ]; then
                mv "chapter${i}.html" "chapter-0${i}.html"
                echo "    ✓ EN: chapter${i}.html → chapter-0${i}.html"
            fi
        done
        cd - > /dev/null
    fi

    # Process KO files
    if [ -d "$std/ebook/ko" ]; then
        cd "$std/ebook/ko"
        for i in {1..9}; do
            if [ -f "chapter${i}.html" ]; then
                mv "chapter${i}.html" "chapter-0${i}.html"
                echo "    ✓ KO: chapter${i}.html → chapter-0${i}.html"
            fi
        done
        cd - > /dev/null
    fi
done

echo ""
echo "✅ Part 1 Complete: All OCEAN chapter files renamed!"
echo ""
echo "Script completed successfully! 🎉"
