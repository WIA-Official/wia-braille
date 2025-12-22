#!/usr/bin/env python3
"""
WIHP-Braille Integration Script
================================
Bridges WIHP (WIA International Hangul Phonology) and WIA-Braille systems.

Pipeline: Source Language -> IPA -> WIHP Hangul -> WIA-Braille

Usage:
    python wihp_braille_integration.py --text "hello" --lang en
    python wihp_braille_integration.py --ipa "/həˈloʊ/"
    python wihp_braille_integration.py --hangul "헬로"

Copyright (c) 2025 SmileStory Inc. / WIA
License: MIT
Philosophy: 홍익인간 (弘益人間) - Benefit All Humanity
"""

import json
import re
import argparse
import os
from pathlib import Path

# Korean Hangul Braille Mapping (한국 점자 규정)
HANGUL_INITIAL = {
    'ㄱ': '⠈', 'ㄴ': '⠉', 'ㄷ': '⠊', 'ㄹ': '⠐', 'ㅁ': '⠑',
    'ㅂ': '⠘', 'ㅅ': '⠠', 'ㅇ': '⠛', 'ㅈ': '⠨', 'ㅊ': '⠰',
    'ㅋ': '⠋', 'ㅌ': '⠓', 'ㅍ': '⠙', 'ㅎ': '⠚',
    'ㄲ': '⠠⠈', 'ㄸ': '⠠⠊', 'ㅃ': '⠠⠘', 'ㅆ': '⠠⠠', 'ㅉ': '⠠⠨'
}

HANGUL_VOWEL = {
    'ㅏ': '⠣', 'ㅑ': '⠜', 'ㅓ': '⠎', 'ㅕ': '⠱', 'ㅗ': '⠥',
    'ㅛ': '⠬', 'ㅜ': '⠍', 'ㅠ': '⠹', 'ㅡ': '⠪', 'ㅣ': '⠕',
    'ㅐ': '⠗', 'ㅔ': '⠝', 'ㅚ': '⠽', 'ㅟ': '⠍⠗', 'ㅘ': '⠧',
    'ㅙ': '⠧⠗', 'ㅝ': '⠻', 'ㅞ': '⠻⠗', 'ㅢ': '⠺',
    'ㅒ': '⠜⠗', 'ㅖ': '⠱⠝'
}

HANGUL_FINAL = {
    'ㄱ': '⠁', 'ㄴ': '⠒', 'ㄷ': '⠔', 'ㄹ': '⠂', 'ㅁ': '⠢',
    'ㅂ': '⠃', 'ㅅ': '⠄', 'ㅇ': '⠶', 'ㅈ': '⠅', 'ㅊ': '⠆',
    'ㅋ': '⠖', 'ㅌ': '⠦', 'ㅍ': '⠲', 'ㅎ': '⠴',
    'ㄲ': '⠁⠁', 'ㅆ': '⠄⠄',
    'ㄳ': '⠁⠄', 'ㄵ': '⠒⠅', 'ㄶ': '⠒⠴', 'ㄺ': '⠂⠁', 'ㄻ': '⠂⠢',
    'ㄼ': '⠂⠃', 'ㄽ': '⠂⠄', 'ㄾ': '⠂⠦', 'ㄿ': '⠂⠲', 'ㅀ': '⠂⠴', 'ㅄ': '⠃⠄'
}

# IPA to Braille (from wia-braille-mapping.json)
IPA_BRAILLE = {
    # Vowels
    'i': '⠊', 'y': '⠽', 'ɨ': '⠌', 'ʉ': '⠳', 'ɯ': '⠍⠥', 'u': '⠥',
    'ɪ': '⠊⠄', 'ʏ': '⠽⠄', 'ʊ': '⠥⠄',
    'e': '⠑', 'ø': '⠪', 'ɘ': '⠢', 'ɵ': '⠹', 'ɤ': '⠔', 'o': '⠕',
    'ə': '⠜', 'ɛ': '⠣', 'œ': '⠪⠑', 'ɜ': '⠻', 'ɞ': '⠣⠕', 'ʌ': '⠡', 'ɔ': '⠪⠕',
    'æ': '⠁⠑', 'ɐ': '⠁⠄', 'a': '⠁', 'ɶ': '⠪⠁', 'ɑ': '⠡⠁', 'ɒ': '⠪⠁⠕',

    # Consonants
    'p': '⠏', 'b': '⠃', 't': '⠞', 'd': '⠙', 'ʈ': '⠞⠄', 'ɖ': '⠙⠄',
    'c': '⠉', 'ɟ': '⠚⠄', 'k': '⠅', 'g': '⠛', 'q': '⠟', 'ɢ': '⠛⠄', 'ʔ': '⠦',
    'm': '⠍', 'ɱ': '⠍⠄', 'n': '⠝', 'ɳ': '⠝⠄', 'ɲ': '⠝⠽', 'ŋ': '⠝⠛', 'ɴ': '⠝⠶',
    'ʙ': '⠃⠗', 'r': '⠗', 'ʀ': '⠗⠶', 'ⱱ': '⠧⠄', 'ɾ': '⠗⠄', 'ɽ': '⠗⠲',
    'ɸ': '⠋⠄', 'β': '⠃⠧', 'f': '⠋', 'v': '⠧',
    'θ': '⠹⠄', 'ð': '⠙⠓', 's': '⠎', 'z': '⠵',
    'ʃ': '⠩', 'ʒ': '⠵⠓', 'ʂ': '⠎⠄', 'ʐ': '⠵⠄',
    'ç': '⠉⠄', 'ʝ': '⠚⠧', 'x': '⠭', 'ɣ': '⠛⠓', 'χ': '⠭⠄', 'ʁ': '⠗⠓',
    'ħ': '⠓⠄', 'ʕ': '⠦⠄', 'h': '⠓', 'ɦ': '⠓⠦',
    'ɬ': '⠇⠄', 'ɮ': '⠇⠵', 'ʋ': '⠧⠥', 'ɹ': '⠗⠺', 'ɻ': '⠗⠻',
    'j': '⠚', 'ɰ': '⠍⠺', 'l': '⠇', 'ɭ': '⠇⠄', 'ʎ': '⠇⠽', 'ʟ': '⠇⠶',
    'w': '⠺', 'ʍ': '⠺⠓', 'ɥ': '⠓⠽',

    # Suprasegmentals
    'ˈ': '⠄', 'ˌ': '⠠⠄', 'ː': '⠒', 'ˑ': '⠐',
}

# WIHP IPA to Hangul mapping
IPA_HANGUL = {
    # Consonants
    'p': 'ㅂ', 'pʰ': 'ㅍ', 'p͈': 'ㅃ',
    'b': 'ㅂ',
    't': 'ㄷ', 'tʰ': 'ㅌ', 't͈': 'ㄸ',
    'd': 'ㄷ',
    'k': 'ㄱ', 'kʰ': 'ㅋ', 'k͈': 'ㄲ',
    'g': 'ㄱ',
    'ʔ': 'ㅇ',
    'm': 'ㅁ', 'n': 'ㄴ', 'ŋ': 'ㅇ',
    'f': 'ㅍ', 'v': 'ㅂ',
    's': 'ㅅ', 'z': 'ㅈ', 's͈': 'ㅆ',
    'ʃ': 'ㅅ', 'ʒ': 'ㅈ',
    'tʃ': 'ㅊ', 'dʒ': 'ㅈ',
    'ts': 'ㅈ', 'dz': 'ㅈ',
    'h': 'ㅎ',
    'l': 'ㄹ', 'r': 'ㄹ', 'ɾ': 'ㄹ',
    'j': 'ㅇ', 'w': 'ㅇ',
    'θ': 'ㅅ', 'ð': 'ㄷ',

    # Vowels
    'i': 'ㅣ', 'ɪ': 'ㅣ',
    'e': 'ㅔ', 'ɛ': 'ㅐ', 'æ': 'ㅐ',
    'a': 'ㅏ', 'ɑ': 'ㅏ', 'ɐ': 'ㅏ',
    'o': 'ㅗ', 'ɔ': 'ㅗ',
    'u': 'ㅜ', 'ʊ': 'ㅜ',
    'ə': 'ㅓ', 'ʌ': 'ㅓ',
    'ɯ': 'ㅡ',

    # Diphthongs
    'aɪ': 'ㅏㅣ', 'aʊ': 'ㅏㅜ',
    'eɪ': 'ㅔㅣ', 'oʊ': 'ㅗㅜ',
    'ɔɪ': 'ㅗㅣ', 'ɪə': 'ㅣㅓ',
    'ʊə': 'ㅜㅓ', 'eə': 'ㅔㅓ',
}


def decompose_hangul(char):
    """Decompose a Hangul syllable into initial, vowel, final components."""
    if not '\uAC00' <= char <= '\uD7A3':
        return None

    code = ord(char) - 0xAC00
    initial_idx = code // 588
    vowel_idx = (code % 588) // 28
    final_idx = code % 28

    initials = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
                'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
    vowels = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
              'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
    finals = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
              'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
              'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

    return {
        'initial': initials[initial_idx],
        'vowel': vowels[vowel_idx],
        'final': finals[final_idx] if final_idx > 0 else None
    }


def hangul_to_braille(text):
    """Convert Korean Hangul text to Korean Braille."""
    result = []

    for char in text:
        if '\uAC00' <= char <= '\uD7A3':
            # Decompose Hangul syllable
            parts = decompose_hangul(char)
            if parts:
                # Initial consonant (if not ㅇ as silent)
                if parts['initial'] in HANGUL_INITIAL:
                    result.append(HANGUL_INITIAL[parts['initial']])

                # Vowel
                if parts['vowel'] in HANGUL_VOWEL:
                    result.append(HANGUL_VOWEL[parts['vowel']])

                # Final consonant
                if parts['final'] and parts['final'] in HANGUL_FINAL:
                    result.append(HANGUL_FINAL[parts['final']])

        elif char in 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ':
            # Standalone initial consonant
            if char in HANGUL_INITIAL:
                result.append(HANGUL_INITIAL[char])

        elif char in 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅔㅚㅟㅘㅙㅝㅞㅢㅒㅖ':
            # Standalone vowel
            if char in HANGUL_VOWEL:
                result.append(HANGUL_VOWEL[char])

        elif char == ' ':
            result.append(' ')

        elif char.isascii() and char.isalpha():
            # Pass through ASCII letters (could add English braille)
            result.append(char)

    return ''.join(result)


def ipa_to_braille(ipa_text):
    """Convert IPA text directly to Braille."""
    result = []
    i = 0
    ipa = ipa_text.replace('/', '').replace('[', '').replace(']', '')

    while i < len(ipa):
        # Try longest match first (2 chars, then 1 char)
        matched = False
        for length in [2, 1]:
            if i + length <= len(ipa):
                segment = ipa[i:i+length]
                if segment in IPA_BRAILLE:
                    result.append(IPA_BRAILLE[segment])
                    i += length
                    matched = True
                    break

        if not matched:
            # Skip unknown characters
            i += 1

    return ''.join(result)


def ipa_to_hangul(ipa_text):
    """Convert IPA text to WIHP Hangul approximation."""
    result = []
    i = 0
    ipa = ipa_text.replace('/', '').replace('[', '').replace(']', '')

    while i < len(ipa):
        matched = False
        # Try longest match first
        for length in [3, 2, 1]:
            if i + length <= len(ipa):
                segment = ipa[i:i+length]
                if segment in IPA_HANGUL:
                    result.append(IPA_HANGUL[segment])
                    i += length
                    matched = True
                    break

        if not matched:
            i += 1

    return ''.join(result)


def full_conversion(text=None, ipa=None, hangul=None):
    """
    Perform full conversion pipeline.

    Returns dict with:
    - source: Original input
    - ipa: IPA representation (if available)
    - hangul: WIHP Hangul representation
    - braille: WIA-Braille output
    - unicode: Braille unicode codepoints
    """
    result = {
        'source': text or ipa or hangul,
        'ipa': None,
        'hangul': None,
        'braille': None,
        'unicode': None
    }

    if ipa:
        result['ipa'] = ipa
        result['hangul'] = ipa_to_hangul(ipa)
        result['braille'] = hangul_to_braille(result['hangul'])
        # Also provide direct IPA to braille
        result['braille_direct'] = ipa_to_braille(ipa)

    elif hangul:
        result['hangul'] = hangul
        result['braille'] = hangul_to_braille(hangul)

    elif text:
        # For plain text, just show hangul -> braille if it's Korean
        if any('\uAC00' <= c <= '\uD7A3' for c in text):
            result['hangul'] = text
            result['braille'] = hangul_to_braille(text)
        else:
            result['note'] = 'Use --ipa for IPA input or --hangul for Korean input'

    # Add unicode codepoints for braille
    if result['braille']:
        result['unicode'] = ' '.join(f'U+{ord(c):04X}' for c in result['braille'] if c != ' ')

    return result


def demo():
    """Run demonstration of the integration."""
    print("=" * 60)
    print("WIHP-Braille Integration Demo")
    print("홍익인간 (弘益人間) - Benefit All Humanity")
    print("=" * 60)

    examples = [
        ("English", "/həˈloʊ/", "hello"),
        ("Korean", None, "안녕하세요"),
        ("Japanese", "/konnitɕiwa/", "konnichiwa"),
        ("Spanish", "/ˈɡɾaθjas/", "gracias"),
        ("Arabic", "/maɾħaba/", "marhaba"),
    ]

    for lang, ipa, word in examples:
        print(f"\n{lang}: {word}")
        print("-" * 40)

        if ipa:
            result = full_conversion(ipa=ipa)
            print(f"  IPA:     {result['ipa']}")
            print(f"  Hangul:  {result['hangul']}")
            print(f"  Braille: {result['braille']}")
            print(f"  Unicode: {result['unicode']}")
        else:
            result = full_conversion(hangul=word)
            print(f"  Hangul:  {result['hangul']}")
            print(f"  Braille: {result['braille']}")
            print(f"  Unicode: {result['unicode']}")

    print("\n" + "=" * 60)
    print("Pipeline: Source -> IPA -> WIHP Hangul -> WIA-Braille")
    print("=" * 60)


def main():
    parser = argparse.ArgumentParser(
        description='WIHP-Braille Integration: Convert between IPA, Hangul, and Braille',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  %(prog)s --text "안녕하세요"
  %(prog)s --ipa "/həˈloʊ/"
  %(prog)s --hangul "헬로"
  %(prog)s --demo

Pipeline: Source Language -> IPA -> WIHP Hangul -> WIA-Braille

Philosophy: 홍익인간 (弘益人間) - Benefit All Humanity
Copyright (c) 2025 SmileStory Inc. / WIA
        '''
    )

    parser.add_argument('--text', '-t', help='Input text (auto-detect type)')
    parser.add_argument('--ipa', '-i', help='IPA input (e.g., /həˈloʊ/)')
    parser.add_argument('--hangul', '-k', help='Korean Hangul input')
    parser.add_argument('--demo', '-d', action='store_true', help='Run demonstration')
    parser.add_argument('--json', '-j', action='store_true', help='Output as JSON')

    args = parser.parse_args()

    if args.demo:
        demo()
        return

    if not any([args.text, args.ipa, args.hangul]):
        parser.print_help()
        return

    result = full_conversion(text=args.text, ipa=args.ipa, hangul=args.hangul)

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print("\n=== WIHP-Braille Conversion ===")
        print(f"Source:  {result['source']}")
        if result.get('ipa'):
            print(f"IPA:     {result['ipa']}")
        if result.get('hangul'):
            print(f"Hangul:  {result['hangul']}")
        if result.get('braille'):
            print(f"Braille: {result['braille']}")
        if result.get('braille_direct'):
            print(f"Braille (direct from IPA): {result['braille_direct']}")
        if result.get('unicode'):
            print(f"Unicode: {result['unicode']}")
        if result.get('note'):
            print(f"Note:    {result['note']}")


if __name__ == '__main__':
    main()
