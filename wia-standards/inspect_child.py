#!/usr/bin/env python3
"""
Comprehensive WIA-CHILD Standards Quality Inspection
Checks all 12 WIA-CHILD standards for quality compliance
"""

import os
import re
from pathlib import Path

BASE_DIR = Path("/home/user/wia-standards/standards")
PRIMARY_COLOR = "#F59E0B"
MIN_CHAPTER_SIZE = 15 * 1024  # 15KB
REQUIRED_LANGUAGES = 99

def check_simulator(standard_dir):
    """Check simulator quality"""
    simulator_file = standard_dir / "simulator" / "index.html"
    issues = []

    if not simulator_file.exists():
        return False, ["Simulator file missing"]

    content = simulator_file.read_text(encoding='utf-8', errors='ignore')

    # Check for 99 languages
    lang_pattern = r'value="[a-z]{2}"'
    languages = re.findall(lang_pattern, content)
    if len(languages) < REQUIRED_LANGUAGES:
        issues.append(f"Only {len(languages)} languages (need {REQUIRED_LANGUAGES})")

    # Check for primary color
    if PRIMARY_COLOR not in content:
        issues.append(f"Missing primary color {PRIMARY_COLOR}")

    return len(issues) == 0, issues

def check_ebook_chapters(standard_dir):
    """Check ebook chapter files"""
    ebook_dir = standard_dir / "ebook" / "en"
    issues = []
    stats = {}

    if not ebook_dir.exists():
        return False, ["ebook/en directory missing"], {}

    # Check for new format chapters (chapter-01.html through chapter-08.html)
    new_format_files = []
    old_format_files = []
    sizes = []

    for i in range(1, 9):
        new_file = ebook_dir / f"chapter-{i:02d}.html"
        old_file = ebook_dir / f"chapter{i}.html"

        # Check new format
        if new_file.exists():
            new_format_files.append(new_file)
            size = new_file.stat().st_size
            sizes.append(size)

            # Check size
            if size < MIN_CHAPTER_SIZE:
                issues.append(f"chapter-{i:02d}.html too small ({size/1024:.1f}KB)")

            # Check color
            content = new_file.read_text(encoding='utf-8', errors='ignore')
            if PRIMARY_COLOR not in content:
                issues.append(f"chapter-{i:02d}.html missing color")
        else:
            issues.append(f"Missing chapter-{i:02d}.html")

        # Check for old format (should not exist)
        if old_file.exists():
            old_format_files.append(old_file)
            issues.append(f"Old format chapter{i}.html exists")

    # Calculate stats
    if sizes:
        stats = {
            'count': len(new_format_files),
            'min_kb': min(sizes) / 1024,
            'max_kb': max(sizes) / 1024,
            'avg_kb': sum(sizes) / len(sizes) / 1024
        }
    else:
        stats = {'count': 0, 'min_kb': 0, 'max_kb': 0, 'avg_kb': 0}

    return len(issues) == 0 and len(new_format_files) == 8, issues, stats

def check_chapter_quality(chapter_file):
    """Check chapter content quality"""
    if not chapter_file.exists():
        return False, ["File not found"]

    content = chapter_file.read_text(encoding='utf-8', errors='ignore')
    issues = []

    # Check for required elements
    checks = {
        'tables': ('<table', 'No tables'),
        'code': ('<pre><code', 'No code examples'),
        'takeaways': ('Key Takeaways', 'No Key Takeaways section'),
        'questions': ('Review Questions', 'No Review Questions section'),
        'philosophy': ('弘益人間', 'No 弘益人間 Philosophy section'),
        'navigation': ('navigation-buttons', 'No navigation buttons')
    }

    for element, (pattern, error) in checks.items():
        if pattern not in content:
            issues.append(error)

    return len(issues) == 0, issues

def main():
    print("═" * 70)
    print("WIA-CHILD STANDARDS COMPREHENSIVE QUALITY INSPECTION")
    print("═" * 70)
    print()
    print("Inspecting 12 standards: CHILD-001 through CHILD-012")
    print(f"Primary color requirement: {PRIMARY_COLOR} (warm orange)")
    print(f"Minimum chapter size: 15KB")
    print(f"Required languages: {REQUIRED_LANGUAGES}")
    print()

    total_standards = 12
    passed_standards = 0
    failed_standards = 0

    results = []

    # Inspect each standard
    for i in range(1, 13):
        std_num = f"{i:03d}"
        # Find the standard directory
        std_dirs = list(BASE_DIR.glob(f"WIA-CHILD-{std_num}-*"))

        if not std_dirs:
            print(f"❌ CHILD-{std_num}: Directory not found")
            failed_standards += 1
            results.append({
                'num': std_num,
                'name': 'NOT FOUND',
                'simulator': '❌',
                'ebooks': '❌',
                'quality': '❌'
            })
            continue

        std_dir = std_dirs[0]
        std_name = std_dir.name

        print("─" * 70)
        print(f"📋 CHILD-{std_num}: {std_name}")
        print("─" * 70)

        # Check simulator
        print("  [SIMULATOR] ", end="")
        sim_passed, sim_issues = check_simulator(std_dir)
        if sim_passed:
            print("✅ PASS")
            sim_status = "✅"
        else:
            print(f"❌ FAIL: {'; '.join(sim_issues)}")
            sim_status = "❌"

        # Check ebook chapters
        print("  [EBOOK CHAPTERS] ", end="")
        ebook_passed, ebook_issues, ebook_stats = check_ebook_chapters(std_dir)
        if ebook_passed:
            print(f"✅ PASS - {ebook_stats['count']}/8 files, "
                  f"Min:{ebook_stats['min_kb']:.0f}KB "
                  f"Max:{ebook_stats['max_kb']:.0f}KB "
                  f"Avg:{ebook_stats['avg_kb']:.0f}KB")
            ebook_status = "✅"
        else:
            print(f"❌ FAIL: {'; '.join(ebook_issues)}")
            if ebook_stats.get('count', 0) > 0:
                print(f"         Stats: {ebook_stats['count']}/8 files, "
                      f"Min:{ebook_stats['min_kb']:.0f}KB "
                      f"Max:{ebook_stats['max_kb']:.0f}KB "
                      f"Avg:{ebook_stats['avg_kb']:.0f}KB")
            ebook_status = "❌"

        # Sample chapter quality check (chapter-04.html)
        sample_chapter = std_dir / "ebook" / "en" / "chapter-04.html"
        print("  [CONTENT QUALITY] Sampling chapter-04.html... ", end="")
        quality_passed, quality_issues = check_chapter_quality(sample_chapter)
        if quality_passed:
            print("✅ PASS")
            quality_status = "✅"
        else:
            print(f"❌ FAIL: {'; '.join(quality_issues)}")
            quality_status = "❌"

        # Overall standard status
        if sim_passed and ebook_passed and quality_passed:
            print("  ✅ OVERALL: PASS")
            passed_standards += 1
            overall = "✅"
        else:
            print("  ❌ OVERALL: FAIL")
            failed_standards += 1
            overall = "❌"

        print()

        results.append({
            'num': std_num,
            'name': std_name,
            'simulator': sim_status,
            'ebooks': ebook_status,
            'quality': quality_status,
            'overall': overall
        })

    # Summary
    print("═" * 70)
    print("SUMMARY")
    print("═" * 70)
    print()
    print(f"Total Standards Inspected: {total_standards}")
    print(f"✅ Passed: {passed_standards}")
    print(f"❌ Failed: {failed_standards}")
    print(f"Success Rate: {(passed_standards * 100) // total_standards}%")
    print()

    # Summary table
    print("STANDARDS SUMMARY TABLE")
    print("─" * 70)
    print(f"{'Standard':<37} | {'Simulator':<10} | {'Ebooks':<10} | {'Quality':<10}")
    print("─" * 70)

    for result in results:
        name = result['name']
        if len(name) > 35:
            name = name[:32] + "..."
        print(f"{name:<37} | {result['simulator']:<10} | {result['ebooks']:<10} | {result['quality']:<10}")

    print("─" * 70)
    print()
    print("Inspection complete!")

if __name__ == "__main__":
    main()
