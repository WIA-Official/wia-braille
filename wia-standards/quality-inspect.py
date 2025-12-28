#!/usr/bin/env python3
"""
SENIOR + OCEAN Deep Quality Inspection
심층 품질 검사
"""

import os
import re
from pathlib import Path

print("🔍 " + "="*50)
print("   SENIOR + OCEAN 심층 품질 검사")
print("   Deep Quality Inspection")
print("="*50)
print()

errors = []
warnings = []

# Phase 1: OCEAN 파일명 검증
print("📋 Phase 1: OCEAN 파일명 검증")
print("-" * 50)

ocean_standards = [f'WIA-OCEAN-{str(i).zfill(3)}-' for i in range(1, 11)]
total_checked = 0
filename_errors = 0

for std_prefix in ocean_standards:
    std_dirs = list(Path('standards').glob(f'{std_prefix}*'))

    for std_dir in std_dirs:
        std_name = std_dir.name

        # Check EN files
        for i in range(1, 9):
            old_file = std_dir / 'ebook' / 'en' / f'chapter{i}.html'
            new_file = std_dir / 'ebook' / 'en' / f'chapter-0{i}.html'

            if old_file.exists():
                msg = f"❌ {std_name}/ebook/en/chapter{i}.html 여전히 존재!"
                print(msg)
                errors.append(msg)
                filename_errors += 1

            if not new_file.exists():
                msg = f"❌ {std_name}/ebook/en/chapter-0{i}.html 없음!"
                print(msg)
                errors.append(msg)
                filename_errors += 1

            total_checked += 1

        # Check KO files
        for i in range(1, 9):
            old_file = std_dir / 'ebook' / 'ko' / f'chapter{i}.html'
            new_file = std_dir / 'ebook' / 'ko' / f'chapter-0{i}.html'

            if old_file.exists():
                msg = f"❌ {std_name}/ebook/ko/chapter{i}.html 여전히 존재!"
                print(msg)
                errors.append(msg)
                filename_errors += 1

            if not new_file.exists():
                msg = f"❌ {std_name}/ebook/ko/chapter-0{i}.html 없음!"
                print(msg)
                errors.append(msg)
                filename_errors += 1

            total_checked += 1

if filename_errors == 0:
    print(f"✅ OCEAN 파일명: 모두 정상 ({total_checked} 파일 확인)")
else:
    print(f"⚠️  OCEAN 파일명: {filename_errors} 개 오류 발견")
print()

# Phase 2: SENIOR 테마 색상 검증
print("📋 Phase 2: SENIOR 테마 색상 검증")
print("-" * 50)

senior_standards = [f'WIA-SENIOR-{str(i).zfill(3)}-' for i in range(1, 11)]
senior_old_color_count = 0
senior_new_color_count = 0

for std_prefix in senior_standards:
    std_dirs = list(Path('standards').glob(f'{std_prefix}*'))

    for std_dir in std_dirs:
        std_name = std_dir.name

        # Check index.html
        index_file = std_dir / 'index.html'
        if index_file.exists():
            content = index_file.read_text(encoding='utf-8')
            if '#F97316' in content:
                msg = f"❌ {std_name}/index.html: 구 색상 #F97316 발견!"
                print(msg)
                errors.append(msg)
                senior_old_color_count += 1
            if '#64748B' in content:
                senior_new_color_count += 1

        # Check simulator/index.html
        sim_file = std_dir / 'simulator' / 'index.html'
        if sim_file.exists():
            content = sim_file.read_text(encoding='utf-8')
            if '#F97316' in content:
                msg = f"❌ {std_name}/simulator/index.html: 구 색상 #F97316 발견!"
                print(msg)
                errors.append(msg)
                senior_old_color_count += 1
            if '#64748B' in content:
                senior_new_color_count += 1

print(f"   구 색상(#F97316) 발견: {senior_old_color_count}")
print(f"   신 색상(#64748B) 발견: {senior_new_color_count}")

if senior_old_color_count == 0 and senior_new_color_count >= 20:
    print("✅ SENIOR 테마 색상: 모두 정상")
else:
    msg = f"⚠️  SENIOR 테마 색상: 검토 필요 (기대값 20, 실제값 {senior_new_color_count})"
    print(msg)
    warnings.append(msg)
print()

# Phase 3: OCEAN 테마 색상 검증
print("📋 Phase 3: OCEAN 테마 색상 검증")
print("-" * 50)

ocean_old_color_count = 0
ocean_new_color_count = 0

for std_prefix in ocean_standards:
    std_dirs = list(Path('standards').glob(f'{std_prefix}*'))

    for std_dir in std_dirs:
        std_name = std_dir.name

        # Check index.html
        index_file = std_dir / 'index.html'
        if index_file.exists():
            content = index_file.read_text(encoding='utf-8')
            if '#0891B2' in content:
                msg = f"❌ {std_name}/index.html: 구 색상 #0891B2 발견!"
                print(msg)
                errors.append(msg)
                ocean_old_color_count += 1
            if '#0EA5E9' in content:
                ocean_new_color_count += 1

        # Check simulator/index.html
        sim_file = std_dir / 'simulator' / 'index.html'
        if sim_file.exists():
            content = sim_file.read_text(encoding='utf-8')
            if '#0891B2' in content:
                msg = f"❌ {std_name}/simulator/index.html: 구 색상 #0891B2 발견!"
                print(msg)
                errors.append(msg)
                ocean_old_color_count += 1
            if '#0EA5E9' in content:
                ocean_new_color_count += 1

print(f"   구 색상(#0891B2) 발견: {ocean_old_color_count}")
print(f"   신 색상(#0EA5E9) 발견: {ocean_new_color_count}")

if ocean_old_color_count == 0 and ocean_new_color_count >= 20:
    print("✅ OCEAN 테마 색상: 모두 정상")
else:
    msg = f"⚠️  OCEAN 테마 색상: 검토 필요 (기대값 20, 실제값 {ocean_new_color_count})"
    print(msg)
    warnings.append(msg)
print()

# Phase 4: 99언어 검증
print("📋 Phase 4: 99언어 Simulator 검증")
print("-" * 50)

print("SENIOR Standards:")
for std_prefix in senior_standards:
    std_dirs = list(Path('standards').glob(f'{std_prefix}*'))

    for std_dir in std_dirs:
        std_name = std_dir.name
        sim_file = std_dir / 'simulator' / 'index.html'

        if sim_file.exists():
            content = sim_file.read_text(encoding='utf-8')
            count = content.count('<option>')

            if count == 99:
                print(f"  ✅ {std_name}: {count} options")
            else:
                msg = f"  ⚠️  {std_name}: {count} options (expected 99)"
                print(msg)
                warnings.append(msg)

print()
print("OCEAN Standards:")
for std_prefix in ocean_standards:
    std_dirs = list(Path('standards').glob(f'{std_prefix}*'))

    for std_dir in std_dirs:
        std_name = std_dir.name
        sim_file = std_dir / 'simulator' / 'index.html'

        if sim_file.exists():
            content = sim_file.read_text(encoding='utf-8')
            count = content.count('<option>')

            # OCEAN has EN/KO buttons + allLangs select (99 options)
            # Total should be around 106 (99 in allLangs + 7 from other selects)
            if count >= 99:
                print(f"  ✅ {std_name}: {count} options (includes 99-lang selector)")
            else:
                msg = f"  ❌ {std_name}: {count} options (expected 99+)"
                print(msg)
                errors.append(msg)

print()

# Phase 5: HTML 문법 검증 (기본)
print("📋 Phase 5: HTML 기본 문법 검증")
print("-" * 50)

html_errors = 0

# Check SENIOR simulators
for std_prefix in senior_standards:
    std_dirs = list(Path('standards').glob(f'{std_prefix}*'))

    for std_dir in std_dirs:
        sim_file = std_dir / 'simulator' / 'index.html'

        if sim_file.exists():
            content = sim_file.read_text(encoding='utf-8')

            # Check for unclosed tags
            if content.count('<select') != content.count('</select>'):
                msg = f"⚠️  {std_dir.name}: select 태그 불균형"
                print(msg)
                warnings.append(msg)
                html_errors += 1

# Check OCEAN simulators
for std_prefix in ocean_standards:
    std_dirs = list(Path('standards').glob(f'{std_prefix}*'))

    for std_dir in std_dirs:
        sim_file = std_dir / 'simulator' / 'index.html'

        if sim_file.exists():
            content = sim_file.read_text(encoding='utf-8')

            # Check for unclosed tags
            if content.count('<select') != content.count('</select>'):
                msg = f"⚠️  {std_dir.name}: select 태그 불균형"
                print(msg)
                warnings.append(msg)
                html_errors += 1

if html_errors == 0:
    print("✅ HTML 기본 문법: 이상 없음")
else:
    print(f"⚠️  HTML 문법: {html_errors}개 경고")

print()

# Final Report
print("🎯 " + "="*50)
print("   최종 품질 검사 리포트")
print("="*50)
print()
print(f"총 오류: {len(errors)}")
print(f"총 경고: {len(warnings)}")
print()

if len(errors) == 0 and len(warnings) == 0:
    print("✅ 모든 검사 통과! 품질 보증됨.")
    print()
    print("📊 검사 항목:")
    print("  ✅ OCEAN 파일명 (160개)")
    print("  ✅ SENIOR 테마 색상 (20개)")
    print("  ✅ OCEAN 테마 색상 (20개)")
    print("  ✅ 99언어 Simulator (20개)")
    print("  ✅ HTML 기본 문법")
else:
    print("⚠️  일부 항목 검토 필요")

    if errors:
        print()
        print("심각한 오류:")
        for err in errors[:10]:  # Show first 10
            print(f"  - {err}")
        if len(errors) > 10:
            print(f"  ... 외 {len(errors) - 10}개")

    if warnings:
        print()
        print("경고:")
        for warn in warnings[:10]:  # Show first 10
            print(f"  - {warn}")
        if len(warnings) > 10:
            print(f"  ... 외 {len(warnings) - 10}개")

print()
print("弘益人間 · Benefit All Humanity")
print("="*50)
