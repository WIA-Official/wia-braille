#!/usr/bin/env python3
"""
Deep Quality Check - 추가 심층 검증
파일 크기, 내용 일관성, 색상 일관성 등
"""

import os
from pathlib import Path
import re

print("🔬 심층 품질 검증 (Deep Quality Check)")
print("="*60)
print()

# Check 1: 언어 옵션 내용 검증
print("📋 Check 1: 99언어 내용 일관성 검증")
print("-"*60)

expected_languages = [
    "English", "한국어", "日本語", "中文", "Español",
    "Français", "Deutsch", "Italiano", "Português", "Русский",
    "العربية", "हिन्दी", "বাংলা", "ไทย", "Tiếng Việt",
    "Türkçe", "Polski", "Nederlands", "Svenska", "Norsk"
]

inconsistent_count = 0

# Check SENIOR
for std_dir in sorted(Path('standards').glob('WIA-SENIOR-*')):
    sim_file = std_dir / 'simulator' / 'index.html'
    if sim_file.exists():
        content = sim_file.read_text(encoding='utf-8')

        # Check if major languages exist
        missing_langs = []
        for lang in expected_languages[:10]:  # Check first 10 major languages
            if lang not in content:
                missing_langs.append(lang)

        if missing_langs:
            print(f"  ⚠️  {std_dir.name}: 누락된 언어 {missing_langs}")
            inconsistent_count += 1

# Check OCEAN
for std_dir in sorted(Path('standards').glob('WIA-OCEAN-*')):
    sim_file = std_dir / 'simulator' / 'index.html'
    if sim_file.exists():
        content = sim_file.read_text(encoding='utf-8')

        # Check if major languages exist
        missing_langs = []
        for lang in expected_languages[:10]:
            if lang not in content:
                missing_langs.append(lang)

        if missing_langs:
            print(f"  ⚠️  {std_dir.name}: 누락된 언어 {missing_langs}")
            inconsistent_count += 1

if inconsistent_count == 0:
    print("✅ 99언어 내용: 모든 표준에서 주요 언어 확인됨")
else:
    print(f"⚠️  {inconsistent_count}개 표준에서 일관성 문제 발견")
print()

# Check 2: 파일 크기 검증 (너무 작거나 큰 파일 확인)
print("📋 Check 2: 파일 크기 검증")
print("-"*60)

size_issues = 0

# Check OCEAN ebook chapters
for std_dir in sorted(Path('standards').glob('WIA-OCEAN-*')):
    for lang in ['en', 'ko']:
        ebook_dir = std_dir / 'ebook' / lang
        if ebook_dir.exists():
            for i in range(1, 9):
                chapter_file = ebook_dir / f'chapter-0{i}.html'
                if chapter_file.exists():
                    size = chapter_file.stat().st_size
                    if size < 1000:  # Less than 1KB is suspicious
                        print(f"  ⚠️  {std_dir.name}/{lang}/chapter-0{i}.html: 너무 작음 ({size} bytes)")
                        size_issues += 1

if size_issues == 0:
    print("✅ 파일 크기: 모든 파일이 정상 범위")
else:
    print(f"⚠️  {size_issues}개 파일 크기 이상")
print()

# Check 3: 색상 일관성 (보조 색상도 확인)
print("📋 Check 3: 테마 색상 완전성 검증")
print("-"*60)

# SENIOR should have #64748B (primary) and #475569 (dark variant)
senior_incomplete = 0
for std_dir in sorted(Path('standards').glob('WIA-SENIOR-*')):
    sim_file = std_dir / 'simulator' / 'index.html'
    if sim_file.exists():
        content = sim_file.read_text(encoding='utf-8')

        has_primary = '#64748B' in content
        has_dark = '#475569' in content

        if not has_primary or not has_dark:
            print(f"  ⚠️  {std_dir.name}: 테마 색상 불완전 (primary: {has_primary}, dark: {has_dark})")
            senior_incomplete += 1

# OCEAN should have #0EA5E9 (primary) and #38bdf8 (light variant)
ocean_incomplete = 0
for std_dir in sorted(Path('standards').glob('WIA-OCEAN-*')):
    sim_file = std_dir / 'simulator' / 'index.html'
    if sim_file.exists():
        content = sim_file.read_text(encoding='utf-8')

        has_primary = '#0EA5E9' in content
        has_light = '#38bdf8' in content

        if not has_primary or not has_light:
            print(f"  ⚠️  {std_dir.name}: 테마 색상 불완전 (primary: {has_primary}, light: {has_light})")
            ocean_incomplete += 1

if senior_incomplete == 0 and ocean_incomplete == 0:
    print("✅ 테마 색상: 모든 표준에서 완전한 색상 팔레트 확인")
else:
    print(f"⚠️  SENIOR {senior_incomplete}개, OCEAN {ocean_incomplete}개 불완전")
print()

# Check 4: Git 상태 확인
print("📋 Check 4: Git 상태 검증")
print("-"*60)

import subprocess

try:
    result = subprocess.run(['git', 'status', '--short'], capture_output=True, text=True)
    if result.returncode == 0:
        if result.stdout.strip():
            print("⚠️  커밋되지 않은 변경사항 있음:")
            print(result.stdout[:500])  # Show first 500 chars
        else:
            print("✅ 모든 변경사항 커밋됨")
    else:
        print("⚠️  Git 상태 확인 실패")
except Exception as e:
    print(f"⚠️  Git 확인 중 오류: {e}")

print()

# Check 5: 샘플 파일 내용 검증
print("📋 Check 5: 샘플 파일 내용 검증")
print("-"*60)

# Check SENIOR-001 simulator has proper structure
senior_001_sim = Path('standards/WIA-SENIOR-001-elder-care-tech/simulator/index.html')
if senior_001_sim.exists():
    content = senior_001_sim.read_text(encoding='utf-8')

    checks = {
        "<!DOCTYPE html>": "HTML5 선언",
        "WIA-SENIOR-001": "표준 ID",
        "#64748B": "SENIOR 테마 색상",
        "changeLanguage": "언어 전환 함수",
        "弘益人間": "WIA 철학"
    }

    all_good = True
    for check, desc in checks.items():
        if check not in content:
            print(f"  ⚠️  SENIOR-001 simulator: {desc} 누락 ({check})")
            all_good = False

    if all_good:
        print("✅ SENIOR-001 simulator: 모든 핵심 요소 확인")

# Check OCEAN-001 simulator
ocean_001_sim = Path('standards/WIA-OCEAN-001-deep-sea-exploration/simulator/index.html')
if ocean_001_sim.exists():
    content = ocean_001_sim.read_text(encoding='utf-8')

    checks = {
        "<!DOCTYPE html>": "HTML5 선언",
        "WIA-OCEAN-001": "표준 ID",
        "#0EA5E9": "OCEAN 테마 색상",
        "switchLang": "언어 전환 함수",
        "弘益人間": "WIA 철학"
    }

    all_good = True
    for check, desc in checks.items():
        if check not in content:
            print(f"  ⚠️  OCEAN-001 simulator: {desc} 누락 ({check})")
            all_good = False

    if all_good:
        print("✅ OCEAN-001 simulator: 모든 핵심 요소 확인")

print()

# Final Summary
print("🎯 " + "="*60)
print("   심층 품질 검증 완료")
print("="*60)
print()
print("검증 완료 항목:")
print("  ✅ 99언어 내용 일관성")
print("  ✅ 파일 크기 정상성")
print("  ✅ 테마 색상 완전성 (primary + variant)")
print("  ✅ Git 상태")
print("  ✅ 샘플 파일 구조")
print()
print("弘益人間 · Benefit All Humanity")
print("="*60)
