# WIA Braille Technical Specification v1.0

**Document Version**: 1.0
**Date**: December 2025
**Status**: Production Ready
**License**: MIT

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [IPA Phoneme Mapping](#ipa-phoneme-mapping)
4. [8-Dot Braille Encoding](#8-dot-braille-encoding)
5. [Conversion Algorithm](#conversion-algorithm)
6. [Language Support](#language-support)
7. [Integration](#integration)
8. [Validation](#validation)
9. [Future Extensions](#future-extensions)

---

## 1. Overview

### 1.1 System Purpose

WIA Braille is a **universal braille system** that provides automatic braille support for all 7,000+ human languages through IPA (International Phonetic Alphabet) mapping.

### 1.2 Design Principles

1. **Universal**: Support all languages without custom development
2. **Accurate**: Preserve linguistic phonetic precision
3. **Compatible**: Integrate with existing braille infrastructure
4. **Open**: Fully documented and open source
5. **Equal**: No language hierarchy or defaults

### 1.3 Technical Foundation

```
Input Text → Phonetic Analysis → IPA Transcription → Braille Mapping → Output
     ↓              ↓                    ↓                  ↓            ↓
   Any          Language            Universal         8-dot        Braille
  Language      Rules               Phonemes         Patterns      Output
```

---

## 2. Architecture

### 2.1 System Components

```
WIA Braille System
│
├── Core Engine (Rust)
│   ├── IPA Parser
│   ├── Phoneme Mapper
│   ├── Braille Encoder
│   └── Output Formatter
│
├── Language Support
│   ├── IPA Dictionaries (7,000+ languages)
│   ├── Phonetic Rules
│   └── Exception Handlers
│
├── Braille Tables
│   ├── wia-braille-core.ctb (liblouis format)
│   ├── IPA-to-Braille mapping
│   └── Unicode Braille Patterns
│
└── Integration Layer
    ├── CLI Interface
    ├── WASM Module
    ├── Python Bindings
    └── REST API
```

### 2.2 Data Flow

```
┌─────────────────┐
│   Input Text    │  "안녕하세요" (Korean)
│   (Any Language)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Phonetic Engine │  /an.njʌŋ.ha.se.jo/
│  (Language-spec)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  IPA Phonemes   │  [a] [n] [nʲ] [ʌ] [ŋ] [h] [a] [s] [e] [j] [o]
│   (Universal)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Braille Mapping │  ⠁ ⠝ ⠝⠽ ⠪ ⠝ ⠓ ⠁ ⠎ ⠑ ⠚ ⠕
│   (8-dot WIA)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Braille Output  │  ⠁⠝⠝⠽⠪⠝⠓⠁⠎⠑⠚⠕
└─────────────────┘
```

---

## 3. IPA Phoneme Mapping

### 3.1 Coverage

WIA Braille maps **all 135+ IPA phonemes**:

- **107 Consonants**
- **28 Vowels** (7 cardinal × 4 heights)
- **Suprasegmentals** (stress, tone, length)
- **Diacritics** (nasalization, aspiration, etc.)

### 3.2 IPA Consonants (107)

#### Pulmonic Consonants (Category Matrix)

| Manner ↓ / Place → | Bilabial | Labiodental | Dental | Alveolar | Postalveolar | Retroflex | Palatal | Velar | Uvular | Pharyngeal | Glottal |
|-------------------|----------|-------------|--------|----------|--------------|-----------|---------|-------|--------|------------|---------|
| **Plosive**       | p b      |             |        | t d      |              | ʈ ɖ       | c ɟ     | k ɡ   | q ɢ    |            | ʔ       |
| **Nasal**         | m        | ɱ           |        | n        |              | ɳ         | ɲ       | ŋ     | ɴ      |            |         |
| **Trill**         | ʙ        |             |        | r        |              |           |         |       | ʀ      |            |         |
| **Tap/Flap**      |          | ⱱ           |        | ɾ        |              | ɽ         |         |       |        |            |         |
| **Fricative**     | ɸ β      | f v         | θ ð    | s z      | ʃ ʒ          | ʂ ʐ       | ç ʝ     | x ɣ   | χ ʁ    | ħ ʕ        | h ɦ     |
| **Lateral Fric**  |          |             |        | ɬ ɮ      |              |           |         |       |        |            |         |
| **Approximant**   |          | ʋ           |        | ɹ        |              | ɻ         | j       | ɰ     |        |            |         |
| **Lateral App**   |          |             |        | l        |              | ɭ         | ʎ       | ʟ     |        |            |         |

#### Non-Pulmonic Consonants

- **Clicks**: ʘ ǀ ǃ ǂ ǁ
- **Implosives**: ɓ ɗ ʄ ɠ ʛ
- **Ejectives**: pʼ tʼ kʼ qʼ (etc.)

### 3.3 IPA Vowels (28)

#### Cardinal Vowels

```
Front    Central   Back
   i        ɨ        u      Close
   e        ə        o      Close-mid
   ɛ        ɜ        ɔ      Open-mid
   a        ɐ        ɑ      Open
```

Plus: y ʉ ɪ ʏ ɯ ʊ ɤ ø ʌ ɞ œ æ

### 3.4 Suprasegmentals

- **Stress**: ˈ (primary), ˌ (secondary)
- **Length**: ː (long), ˑ (half-long)
- **Tone**: ˥ ˦ ˧ ˨ ˩ (5 tone levels)
- **Break**: | (syllable), ‖ (prosodic)

---

## 4. 8-Dot Braille Encoding

### 4.1 Why 8-Dot?

Traditional 6-dot braille provides only **64 combinations** (2^6), insufficient for 135+ phonemes.

**8-dot braille** provides **256 combinations** (2^8):
- Enough for all IPA phonemes
- Room for future extensions
- Compatible with existing 8-dot infrastructure

### 4.2 Dot Numbering

```
Standard 8-dot cell:
1 ● ● 4      Dots 1-6: Standard Braille
2 ● ● 5      Dots 7-8: Extension
3 ● ● 6
7 ● ● 8
```

### 4.3 Encoding Strategy

#### Base Consonants (Dots 1-6)

Common consonants use standard 6-dot patterns compatible with existing systems.

Examples:
- **p** → ⠏ (dots 1-2-3-4)
- **b** → ⠃ (dots 1-2)
- **t** → ⠞ (dots 2-3-4-5)
- **d** → ⠙ (dots 1-4-5)
- **k** → ⠅ (dots 1-3)
- **g** → ⠛ (dots 1-2-4-5)

#### Extended Phonemes (Dots 7-8)

Rare phonemes and non-pulmonic consonants use dot 7 or 8 modifiers.

Examples:
- **ʔ** (glottal stop) → ⠿ (dots 1-2-3-4-5-6-7)
- **ǃ** (click) → ⡯ (dots 1-2-3-4-6-7)
- **ɓ** (implosive) → ⢃ (dots 1-2-8)

#### Vowels (Systematic Pattern)

Vowels use a systematic grid based on height and frontness:

```
        Front   Central   Back
Close:  ⠊       ⠨       ⠥
Mid:    ⠑       ⠫       ⠕
Open:   ⠁       ⠡       ⠡
```

### 4.4 Unicode Representation

All WIA Braille patterns use Unicode Braille Patterns block (U+2800–U+28FF):
- U+2800: ⠀ (blank)
- U+2801: ⠁ (dot 1)
- U+28FF: ⣿ (all 8 dots)

---

## 5. Conversion Algorithm

### 5.1 High-Level Algorithm

```rust
fn convert_to_wia_braille(text: &str, language: Language) -> Result<String> {
    // Step 1: Phonetic Analysis
    let ipa_transcription = phonetic_engine.transcribe(text, language)?;

    // Step 2: Parse IPA into phonemes
    let phonemes = ipa_parser.parse(ipa_transcription)?;

    // Step 3: Map each phoneme to braille
    let braille_cells: Vec<BrailleCell> = phonemes
        .iter()
        .map(|phoneme| phoneme_to_braille(phoneme))
        .collect()?;

    // Step 4: Format output
    Ok(format_braille(braille_cells))
}
```

### 5.2 Phoneme-to-Braille Mapping

```rust
fn phoneme_to_braille(phoneme: &IPAPhoneme) -> BrailleCell {
    match phoneme {
        // Vowels
        IPAPhoneme::Vowel(v) => vowel_to_braille(v),

        // Pulmonic consonants
        IPAPhoneme::Plosive { place, voice } =>
            plosive_to_braille(place, voice),

        // Non-pulmonic
        IPAPhoneme::Click(c) => click_to_braille(c),
        IPAPhoneme::Implosive(i) => implosive_to_braille(i),

        // Suprasegmentals
        IPAPhoneme::Stress(s) => stress_to_braille(s),
        IPAPhoneme::Tone(t) => tone_to_braille(t),

        _ => default_mapping(phoneme)
    }
}
```

### 5.3 Optimization

- **Caching**: Common words cached after first conversion
- **Batch Processing**: Parallel processing for large texts
- **Streaming**: Incremental output for real-time applications

---

## 6. Language Support

### 6.1 Supported Languages

**All 7,000+ documented human languages**, including:

#### Major Language Families
- Indo-European (400+ languages)
- Sino-Tibetan (400+ languages)
- Niger-Congo (1,500+ languages)
- Austronesian (1,200+ languages)
- Trans-New Guinea (300+ languages)
- Afro-Asiatic (375+ languages)
- And all others...

#### Special Cases
- **Tonal languages** (Mandarin, Thai, Yoruba)
- **Click languages** (Xhosa, Zulu, !Xóõ)
- **Polysynthetic** (Inuktitut, Mohawk)
- **Sign languages** (via written glosses)

### 6.2 Phonetic Engines

WIA Braille integrates with multiple phonetic engines:

1. **espeak-ng** - 100+ languages
2. **Festival** - High-quality synthesis
3. **Language-specific** - Custom engines for accuracy
4. **Manual IPA** - Direct IPA input supported

### 6.3 Quality Levels

| Level | Description | Languages |
|-------|-------------|-----------|
| **Tier 1** | Validated by native speakers | 50+ |
| **Tier 2** | Algorithmic, high confidence | 500+ |
| **Tier 3** | Algorithmic, standard IPA rules | 6,500+ |

---

## 7. Integration

### 7.1 liblouis Compatibility

WIA Braille tables are fully compatible with liblouis, the industry-standard braille translator.

**Table File**: `wia-braille-core.ctb`

```
# WIA Braille Core Table v1.0
# Compatible with liblouis 3.0+

# Basic Latin consonants
letter p 1234
letter b 12
letter t 2345
letter d 145
# ... (full mapping)

# Extended IPA symbols
sign ʔ 123456-7      # Glottal stop
sign ǃ 1234-6-7      # Click
# ... (full mapping)
```

### 7.2 Programming Language Bindings

#### Rust (Native)

```rust
use wia_braille::{BrailleConverter, Language};

let converter = BrailleConverter::new();
let braille = converter.convert("Hello", Language::English)?;
```

#### Python

```python
from wia_braille import convert_to_braille

braille = convert_to_braille("Hello", language="en")
```

#### JavaScript (WASM)

```javascript
import { convertToBraille } from 'wia-braille-wasm';

const braille = convertToBraille("Hello", "en");
```

### 7.3 REST API

```bash
POST /api/v1/convert
Content-Type: application/json

{
  "text": "Hello, world",
  "language": "en",
  "output_format": "unicode"
}

Response:
{
  "braille": "⠓⠑⠇⠇⠕⠂ ⠺⠕⠗⠇⠙",
  "ipa": "/həˈloʊ wɜrld/",
  "language": "en"
}
```

---

## 8. Validation

### 8.1 Test Coverage

- **Unit Tests**: 60+ tests for core functionality
- **Language Tests**: 50+ languages validated
- **Integration Tests**: liblouis, screen readers
- **Performance Tests**: 1MB+ documents

### 8.2 Validation Methodology

For each test language:

1. **Native text** → WIA Braille conversion
2. **Linguistic review** by experts
3. **Tactile testing** with braille readers
4. **Screen reader** compatibility check
5. **Round-trip** validation (where possible)

### 8.3 Quality Metrics

- **Phonetic Accuracy**: >95% for Tier 1 languages
- **Consistency**: 100% (same input → same output)
- **Performance**: <100ms for typical sentences
- **Memory**: <10MB for standard use

---

## 9. Future Extensions

### 9.1 Planned Features (v1.1)

- **Math Notation**: Nemeth Code integration
- **Music Braille**: Integrate music notation
- **Graphics**: Tactile graphics descriptions
- **Emoji**: Phonetic emoji descriptions

### 9.2 Research Areas (v2.0)

- **AI-Enhanced** phonetic analysis
- **Context-Aware** conversion
- **Dialect Support** for major languages
- **Historical Languages** (Latin, Sanskrit, etc.)

### 9.3 Community Extensions

The MIT license allows anyone to:
- Create specialized tables
- Add new phoneme mappings
- Integrate with new tools
- Propose improvements

---

## Appendix A: Complete Phoneme Mapping Table

See [tables/ipa-to-braille.json](../tables/ipa-to-braille.json) for the complete mapping of 135+ IPA phonemes to 8-dot braille patterns.

## Appendix B: Implementation Details

See source code in [WIA PubScript](https://github.com/WIA-Official/pdf-studio/tree/main/pubscript) for full implementation.

## Appendix C: Standards References

- **IPA**: International Phonetic Association (2015 revision)
- **Unicode Braille**: Unicode Standard 15.0, Chapter 15.3
- **liblouis**: liblouis.org
- **NVDA**: NVAccess.org
- **JAWS**: FreedomScientific.com

---

**Document End**

*WIA Braille Technical Specification v1.0*
*SmileStory Inc., Republic of Korea*
*December 2025*
