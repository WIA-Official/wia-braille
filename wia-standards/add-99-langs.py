#!/usr/bin/env python3
import os
import re

# Read 99-language template
with open('99-lang-options.html', 'r', encoding='utf-8') as f:
    lang_options = f.read().strip()

# Process all SENIOR simulators
senior_dirs = [
    'WIA-SENIOR-001-elder-care-tech',
    'WIA-SENIOR-002-dementia-care',
    'WIA-SENIOR-003-fall-detection',
    'WIA-SENIOR-004-aging-in-place',
    'WIA-SENIOR-005-loneliness-prevention',
    'WIA-SENIOR-006-age-friendly-ui',
    'WIA-SENIOR-007-senior-wearable',
    'WIA-SENIOR-008-memory-assistance',
    'WIA-SENIOR-009-senior-mobility',
    'WIA-SENIOR-010-intergenerational'
]

for std_dir in senior_dirs:
    sim_file = f'standards/{std_dir}/simulator/index.html'

    if not os.path.exists(sim_file):
        print(f"⚠️  {sim_file} not found")
        continue

    with open(sim_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the language selector section
    # Pattern: from first <option> to <!-- 99 languages supported -->
    pattern = r'(<select id="langSelect"[^>]*>\s*)((?:<option[^>]*>.*?</option>\s*)*)(<!--\s*99 languages supported\s*-->)'

    def replace_langs(match):
        return match.group(1) + '\n                        ' + lang_options + '\n                        '

    new_content = re.sub(pattern, replace_langs, content, flags=re.DOTALL)

    # Write back
    with open(sim_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✓ {std_dir}/simulator/index.html")

print("\n✅ All SENIOR simulators updated with 99 languages!")
