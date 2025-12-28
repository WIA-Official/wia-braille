#!/usr/bin/env python3
"""
Final Comprehensive WIA-CHILD Standards Quality Inspection
With corrected navigation detection
"""

import os
import re
from pathlib import Path

BASE_DIR = Path("/home/user/wia-standards/standards")
PRIMARY_COLOR = "#F59E0B"
MIN_CHAPTER_SIZE = 15 * 1024  # 15KB
REQUIRED_LANGUAGES = 99

def check_simulator(standard_dir):
    """Check simulator quality with improved language detection"""
    simulator_file = standard_dir / "simulator" / "index.html"
    issues = []
    warnings = []

    if not simulator_file.exists():
        return False, ["Simulator file missing"], []

    content = simulator_file.read_text(encoding='utf-8', errors='ignore')

    # Check for 99 languages - look for JavaScript array
    lang_array_pattern = r'const\s+languages\s*=\s*\[(.*?)\];'
    lang_match = re.search(lang_array_pattern, content, re.DOTALL)

    if lang_match:
        # Count items in array by counting commas + 1
        lang_content = lang_match.group(1)
        # Count quoted strings
        lang_items = re.findall(r"'[^']*'|\"[^\"]*\"", lang_content)
        lang_count = len(lang_items)

        if lang_count < REQUIRED_LANGUAGES:
            issues.append(f"Only {lang_count} languages (need {REQUIRED_LANGUAGES})")
        elif lang_count > REQUIRED_LANGUAGES:
            warnings.append(f"{lang_count} languages (expected {REQUIRED_LANGUAGES})")
    else:
        issues.append("No languages array found")

    # Check for primary color #F59E0B
    if PRIMARY_COLOR not in content:
        # Check what color is actually used
        primary_color_match = re.search(r'--primary:\s*(#[A-Fa-f0-9]{6})', content)
        if primary_color_match:
            actual_color = primary_color_match.group(1)
            issues.append(f"Wrong primary color: {actual_color} (need {PRIMARY_COLOR})")
        else:
            issues.append(f"Missing primary color {PRIMARY_COLOR}")

    return len(issues) == 0, issues, warnings

def check_ebook_chapters(standard_dir):
    """Check ebook chapter files"""
    ebook_dir = standard_dir / "ebook" / "en"
    issues = []
    warnings = []
    stats = {}

    if not ebook_dir.exists():
        return False, ["ebook/en directory missing"], [], {}

    # Check for new format chapters (chapter-01.html through chapter-08.html)
    new_format_files = []
    old_format_files = []
    sizes = []
    color_issues = set()

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
                # Find what color is actually used
                primary_color_match = re.search(r'--primary:\s*(#[A-Fa-f0-9]{6})', content)
                if primary_color_match:
                    actual_color = primary_color_match.group(1).upper()
                    color_issues.add(actual_color)
        else:
            issues.append(f"Missing chapter-{i:02d}.html")

        # Check for old format (should not exist)
        if old_file.exists():
            old_format_files.append(old_file)
            issues.append(f"Old format chapter{i}.html exists")

    # Report color issues
    if color_issues:
        issues.append(f"Wrong color in chapters: {', '.join(sorted(color_issues))} (need {PRIMARY_COLOR})")

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

    return len(issues) == 0 and len(new_format_files) == 8, issues, warnings, stats

def check_chapter_quality(chapter_file):
    """Check chapter content quality with improved navigation detection"""
    if not chapter_file.exists():
        return False, ["File not found"], []

    content = chapter_file.read_text(encoding='utf-8', errors='ignore')
    issues = []
    warnings = []

    # Check for required elements
    checks = {
        'tables': ('<table', 'No tables'),
        'code': ('<pre><code', 'No code examples'),
        'takeaways': ('Key Takeaways', 'No Key Takeaways section'),
        'questions': ('Review Questions', 'No Review Questions section'),
        'philosophy': ('弘益人間', 'No 弘익人間 Philosophy section'),
        'navigation': (None, 'No navigation buttons')  # Multiple patterns
    }

    for element, (pattern, error) in checks.items():
        if element == 'navigation':
            # Check multiple navigation patterns
            has_nav = any([
                'navigation-buttons' in content,
                'class="nav"' in content and ('Previous' in content or 'Next' in content),
                'btn-prev' in content,
                'btn-next' in content,
                'href="chapter-' in content and ('&larr;' in content or '&rarr;' in content)
            ])
            if not has_nav:
                issues.append(error)
        elif element == 'code':
            # Check for alternative code patterns
            if pattern not in content and 'class="code"' not in content and '<code>' not in content:
                issues.append(error)
        else:
            if pattern not in content:
                issues.append(error)

    return len(issues) == 0, issues, warnings

def generate_final_report():
    """Generate comprehensive final report"""
    print("═" * 75)
    print("WIA-CHILD STANDARDS - FINAL COMPREHENSIVE QUALITY INSPECTION REPORT")
    print("═" * 75)
    print()
    print(f"Inspection Date: 2025-12-28")
    print(f"Standards Inspected: CHILD-001 through CHILD-012 (12 total)")
    print(f"Quality Criteria:")
    print(f"  - Primary Color: {PRIMARY_COLOR} (Warm Orange for Child Theme)")
    print(f"  - Simulator Languages: {REQUIRED_LANGUAGES}")
    print(f"  - Minimum Chapter Size: 15KB")
    print(f"  - Chapter Files: chapter-01.html through chapter-08.html")
    print()

    total_standards = 12
    passed_standards = 0
    failed_standards = 0
    partial_pass = 0

    results = []
    detailed_issues = {}

    # Inspect each standard
    for i in range(1, 13):
        std_num = f"{i:03d}"
        std_dirs = list(BASE_DIR.glob(f"WIA-CHILD-{std_num}-*"))

        if not std_dirs:
            results.append({
                'num': std_num,
                'name': 'NOT FOUND',
                'simulator': '❌',
                'ebooks': '❌',
                'quality': '❌',
                'overall': '❌'
            })
            detailed_issues[std_num] = ["Directory not found"]
            failed_standards += 1
            continue

        std_dir = std_dirs[0]
        std_name = std_dir.name

        all_issues = []

        # Check simulator
        sim_passed, sim_issues, sim_warnings = check_simulator(std_dir)
        sim_status = "✅" if sim_passed else "❌"

        # Check ebook chapters
        ebook_passed, ebook_issues, ebook_warnings, ebook_stats = check_ebook_chapters(std_dir)
        ebook_status = "✅" if ebook_passed else "❌"

        # Sample chapter quality check (chapter-04.html)
        sample_chapter = std_dir / "ebook" / "en" / "chapter-04.html"
        quality_passed, quality_issues, quality_warnings = check_chapter_quality(sample_chapter)
        quality_status = "✅" if quality_passed else "❌"

        # Overall standard status
        if sim_passed and ebook_passed and quality_passed:
            overall = "✅"
            passed_standards += 1
        else:
            overall = "❌"
            failed_standards += 1
            if (sim_passed or ebook_passed or quality_passed):
                partial_pass += 1

        # Collect issues
        if not sim_passed:
            all_issues.extend([f"[SIMULATOR] {iss}" for iss in sim_issues])
        if not ebook_passed:
            all_issues.extend([f"[EBOOK] {iss}" for iss in ebook_issues])
        if not quality_passed:
            all_issues.extend([f"[QUALITY] {iss}" for iss in quality_issues])

        results.append({
            'num': std_num,
            'name': std_name,
            'simulator': sim_status,
            'ebooks': ebook_status,
            'quality': quality_status,
            'overall': overall,
            'stats': ebook_stats
        })

        if all_issues:
            detailed_issues[std_num] = all_issues

    # Print detailed results
    print("─" * 75)
    print("DETAILED INSPECTION RESULTS")
    print("─" * 75)
    print()

    for result in results:
        std_num = result['num']
        print(f"📋 CHILD-{std_num}: {result['name']}")
        print(f"   Simulator:     {result['simulator']}")
        print(f"   Ebook Files:   {result['ebooks']}")
        if result.get('stats'):
            stats = result['stats']
            print(f"                  {stats['count']}/8 files | "
                  f"Min:{stats['min_kb']:.0f}KB Max:{stats['max_kb']:.0f}KB Avg:{stats['avg_kb']:.0f}KB")
        print(f"   Content:       {result['quality']}")
        print(f"   Overall:       {result['overall']}")
        if std_num in detailed_issues:
            for issue in detailed_issues[std_num]:
                print(f"                  • {issue}")
        print()

    # Summary statistics
    print("═" * 75)
    print("EXECUTIVE SUMMARY")
    print("═" * 75)
    print()
    print(f"Total Standards:     {total_standards}")
    print(f"✅ Fully Passed:     {passed_standards} ({(passed_standards * 100) // total_standards}%)")
    print(f"❌ Failed:           {failed_standards} ({(failed_standards * 100) // total_standards}%)")
    print(f"⚠️  Partial Pass:    {partial_pass}")
    print()

    # Component breakdown
    sim_pass = sum(1 for r in results if r['simulator'] == '✅')
    ebook_pass = sum(1 for r in results if r['ebooks'] == '✅')
    quality_pass = sum(1 for r in results if r['quality'] == '✅')

    print("COMPONENT BREAKDOWN:")
    print(f"  Simulators:      {sim_pass}/12 passed ({(sim_pass * 100) // 12}%)")
    print(f"  Ebook Files:     {ebook_pass}/12 passed ({(ebook_pass * 100) // 12}%)")
    print(f"  Content Quality: {quality_pass}/12 passed ({(quality_pass * 100) // 12}%)")
    print()

    # Quick reference table
    print("QUICK REFERENCE TABLE")
    print("─" * 75)
    print(f"{'Standard':<38} | {'Sim':<4} | {'Ebook':<6} | {'Quality':<8} | {'Overall':<7}")
    print("─" * 75)

    for result in results:
        name = result['name']
        if len(name) > 36:
            name = name[:33] + "..."
        print(f"{name:<38} | {result['simulator']:<4} | {result['ebooks']:<6} | {result['quality']:<8} | {result['overall']:<7}")

    print("─" * 75)
    print()

    # Common issues analysis
    print("COMMON ISSUES ANALYSIS:")
    print()

    all_issue_types = {}
    for issues in detailed_issues.values():
        for issue in issues:
            if issue in all_issue_types:
                all_issue_types[issue] += 1
            else:
                all_issue_types[issue] = 1

    # Group by category
    sim_issues = [k for k in all_issue_types.keys() if '[SIMULATOR]' in k]
    ebook_issues = [k for k in all_issue_types.keys() if '[EBOOK]' in k]
    quality_issues = [k for k in all_issue_types.keys() if '[QUALITY]' in k]

    if sim_issues:
        print("Simulator Issues:")
        for issue in sorted(sim_issues, key=lambda x: all_issue_types[x], reverse=True):
            count = all_issue_types[issue]
            print(f"  • {issue.replace('[SIMULATOR] ', '')} ({count} standards)")

    if ebook_issues:
        print()
        print("Ebook Issues:")
        for issue in sorted(ebook_issues, key=lambda x: all_issue_types[x], reverse=True):
            count = all_issue_types[issue]
            print(f"  • {issue.replace('[EBOOK] ', '')} ({count} standards)")

    if quality_issues:
        print()
        print("Content Quality Issues:")
        for issue in sorted(quality_issues, key=lambda x: all_issue_types[x], reverse=True):
            count = all_issue_types[issue]
            print(f"  • {issue.replace('[QUALITY] ', '')} ({count} standards)")

    print()
    print("═" * 75)
    print("END OF REPORT")
    print("═" * 75)

if __name__ == "__main__":
    generate_final_report()
