#!/usr/bin/env python3
import os
import re

# Read 99-language template
with open('99-lang-options.html', 'r', encoding='utf-8') as f:
    lang_options = f.read().strip()

# Process all OCEAN simulators
ocean_dirs = [
    'WIA-OCEAN-001-deep-sea-exploration',
    'WIA-OCEAN-002-underwater-drone',
    'WIA-OCEAN-003-underwater-communication',
    'WIA-OCEAN-004-marine-biology-data',
    'WIA-OCEAN-005-ocean-floor-mapping',
    'WIA-OCEAN-006-submarine-tech',
    'WIA-OCEAN-007-marine-sensor',
    'WIA-OCEAN-008-port-automation',
    'WIA-OCEAN-009-ship-autonomous',
    'WIA-OCEAN-010-ocean-resource'
]

for std_dir in ocean_dirs:
    sim_file = f'standards/{std_dir}/simulator/index.html'

    if not os.path.exists(sim_file):
        print(f"⚠️  {sim_file} not found")
        continue

    with open(sim_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Count current options
    current_count = content.count('<option>')

    # Replace the language selector section
    # Pattern: from <select id="allLangs" to </select>
    pattern = r'(<select id="allLangs"[^>]*>)(.*?)(</select>)'

    def replace_langs(match):
        return match.group(1) + '\n                    ' + lang_options + '\n                ' + match.group(3)

    new_content = re.sub(pattern, replace_langs, content, flags=re.DOTALL)

    # Write back
    with open(sim_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    new_count = new_content.count('<option>')
    print(f"✓ {std_dir}: {current_count} → {new_count} options")

print("\n✅ All OCEAN simulators standardized to 99 languages!")
