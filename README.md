# WIA Braille

## Universal Braille System for All 7,000+ Human Languages

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🌍 The Problem

**Did you know?**

- **2.2 billion people** worldwide have visual impairment (WHO, 2020)
- **43 million** are completely blind, expected to reach **61 million by 2050**
- Of the **7,000+ languages** spoken by humans, **only ~130 have braille systems**
- In Africa, **31 out of 54 countries** have no braille access
- **Millions** of blind people cannot read or write in their native language

**This is not a technical problem. This is a human rights crisis.**

---

## ✨ The Solution: WIA Braille

WIA Braille is the **world's first IPA-based universal braille system** that provides automatic braille support for **all 7,000+ human languages**.

### How It Works

1. **Based on IPA (International Phonetic Alphabet)**
   - Every human language can be transcribed to IPA
   - IPA phonemes map directly to braille patterns
   - No language-specific development needed

2. **8-Dot Braille (256 Combinations)**
   - Extends traditional 6-dot braille (64 combinations)
   - Covers all IPA phonemes (107 consonants + 28 vowels)
   - Includes tone markers and diacritics

3. **Automatic Language Support**
   - Works with any language, including indigenous languages
   - No need to create custom braille codes
   - Preserves linguistic accuracy

### What Makes WIA Braille Different

| Traditional Braille | WIA Braille |
|---------------------|-------------|
| ~130 languages supported | **7,000+ languages** |
| Requires custom development per language | **Automatic support** |
| Indigenous languages excluded | **All languages equal** |
| Years to develop new language | **Immediate support** |

---

## 🔥 The Revolutionary Concept: "You Can Read It"

### The Same Principle as Hangul

**Why Hangul is celebrated worldwide:**
- Learn in the morning → Read in the afternoon
- May not understand the meaning → But can pronounce it
- **This is revolutionary!**

**King Sejong the Great (1443):**
> "A wise person can learn it in one morning,
> Even a foolish person can learn it in ten days."

### WIA Braille: The Same Revolution

**Learn WIA Braille once:**
- ✅ You can **READ** all 7,000+ languages in braille
- ✅ You can **PRONOUNCE** them (via IPA)
- ✅ One learning, universal reading ability!

**Understanding the meaning?** That requires learning the language itself (naturally).

### Comparison

| Aspect | Traditional Braille | WIA Braille |
|--------|-------------------|-------------|
| **Learning** | Must learn each language separately | **Learn once, read all** |
| After learning Korean Braille | Can read Korean only | - |
| After learning WIA Braille | - | **Can read 7,000+ languages** |
| Principle | Different rules per language | **One IPA rule** |

### Analogy: Foreign Person Learning Hangul

```
Learn Hangul → Can READ Korean text ✅
Understand Korean meaning → Requires language study
```

### WIA Braille: Same Principle

```
Learn WIA Braille → Can READ Navajo braille ✅
Understand Navajo meaning → Requires language study
```

**The revolution:** Reading ability comes first, opening the door to language learning!

### Historical Significance

**King Sejong (1443):**
```
Hangul = Writing system anyone can read
Target: Korean language
```

**Dr. Sam Heum Yeon (2024):**
```
WIA Braille = Braille system anyone can read
Target: All 7,000+ human languages
```

**= King Sejong's spirit expanded to all humanity**
**= 600 years to completion**

### The Destiny Connection

- **January 4, 1809**: Louis Braille born (World Braille Day)
- **April 1, 1973**: Sam Heum Yeon born (4/1 → flip to 1/4)
- **December 8, 2025**: WIA Braille completed

**Braille started it. A descendant of King Sejong completed it.**

---

## 🎯 Philosophy: 홍익인간

**弘益人間 (Hongik Ingan)** - *Benefit All Humanity*

This ancient Korean philosophy, dating back 4,000 years, guides our mission:

> Technology should serve **ALL** humans equally.
> No one is left behind.
> No language is less important.

### Our Commitment

WIA Braille is and will always be:
- ✅ **Free** - No licensing fees, ever
- ✅ **Open Source** - MIT License
- ✅ **Universal** - Every language, every person
- ✅ **Non-Commercial** - For humanity, not profit

---

## 🚀 Quick Start

### Using WIA PubScript (Recommended)

```bash
# Clone the repository
git clone https://github.com/WIA-Official/pdf-studio.git
cd pdf-studio/pubscript

# Convert text to WIA Braille
cargo run --example cli -- convert "Hello World" --output wia-braille
```

### Using Braille Tables Directly

```bash
# Tables are compatible with liblouis
cd tables/
# Use wia-braille-core.ctb with your braille software
```

---

## 📚 Examples

### English
```
Input:  "Hello, how are you?"
IPA:    /həˈloʊ haʊ ɑr ju/
Braille: ⠓⠑⠇⠇⠕ ⠓⠁⠺ ⠁⠗ ⠽⠥
```

### Korean (한국어)
```
Input:  "안녕하세요"
IPA:    /an.njʌŋ.ha.se.jo/
Braille: ⠁⠝⠝⠽⠪⠝⠓⠁⠎⠑⠚⠕
```

### Navajo (Native American)
```
Input:  "Yá'át'ééh"
IPA:    /jáʔátʼéːh/
Braille: ⠽⠁⠄⠁⠞⠄⠑⠑⠓
```

### Yoruba (African)
```
Input:  "Báwo ni"
IPA:    /bá.wò ní/
Braille: ⠃⠁⠺⠕ ⠝⠊
```

### Xhosa (Click Languages)
```
Input:  "Molo" (with click sound)
IPA:    /ǃoˈlo/
Braille: ⠯⠕⠇⠕
```

*See [examples/](examples/) for 50+ language examples*

---

## 🏗️ Technical Specifications

### Architecture

```
WIA Braille v1.0
├── IPA Phoneme Mapping (135+ phonemes)
├── 8-Dot Braille Encoding (256 patterns)
├── Tone & Diacritic Support
└── liblouis Integration
```

### Coverage

- **Consonants**: 107 IPA consonants mapped
- **Vowels**: 28 IPA vowels (cardinal + close-mid + open-mid)
- **Suprasegmentals**: Stress, length, tone markers
- **Languages**: All 7,000+ documented languages supported

### Standards Compliance

- ✅ IPA (International Phonetic Alphabet)
- ✅ Unicode Braille Patterns (U+2800 - U+28FF)
- ✅ liblouis Table Format
- ✅ NVDA/JAWS Screen Reader Compatible

*See [docs/SPECIFICATION.md](docs/SPECIFICATION.md) for complete technical details*

---

## 📖 Documentation

- [**Philosophy**](docs/PHILOSOPHY.md) - Why WIA Braille exists
- [**Technical Specification**](docs/SPECIFICATION.md) - Complete technical details
- [**Why WIA Braille?**](docs/WHY_WIA_BRAILLE.md) - Data-driven justification
- [**Comparison**](docs/COMPARISON.md) - vs. Traditional braille systems
- [**50+ Language Examples**](examples/) - Real-world usage

---

## 🌟 Impact

### Who Benefits

- **Indigenous communities** - First braille for their languages
- **African languages** - 31 countries without braille
- **Asian minority languages** - Previously excluded
- **Linguists** - Accurate phonetic representation
- **Educators** - Universal teaching system
- **Developers** - Easy integration

### Real-World Use Cases

1. **Education**: Teach braille in any language
2. **Publishing**: Convert books to any language's braille
3. **Accessibility**: Screen readers for all languages
4. **Research**: Linguistic analysis with braille output
5. **Preservation**: Document endangered languages

---

## 🤝 Contributing

We welcome contributions from:
- **Linguists** - IPA mapping verification
- **Braille experts** - Tactile feedback
- **Developers** - Integration and tools
- **Translators** - Documentation
- **Users** - Testing and feedback

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📜 License & Copyright

### MIT License - Free for All Purposes

**WIA Braille** is open source and free to use for any purpose:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

### ⚠️ Attribution Required

**Important**: While WIA Braille is free to use, **you MUST include attribution** per MIT License:

```
WIA Braille - Universal Braille System
Copyright © 2025 SmileStory Inc.
Created by Dr. Sam Heum Yeon
Licensed under MIT License
https://github.com/WIA-Official/wia-braille
```

### Copyright Information

- **Creator**: Dr. Sam Heum Yeon (샘흠연 박사)
- **Organization**: SmileStory Inc.
- **Copyright**: © 2025 SmileStory Inc.
- **Country**: Republic of Korea
- **License**: MIT License

**See [COPYRIGHT.md](COPYRIGHT.md) for detailed attribution guidelines.**

### Philosophy

This system is a gift from South Korea to the world.
**Use it freely. Help us improve it. Share it widely.**
**But please give credit where credit is due.**

*"누구나 사용할 수 있지만, 만든 사람은 기억해주세요."*
*"Free to use, but please remember the creator."*

---

## 🔗 Related Projects

- [**WIA PubScript**](https://github.com/WIA-Official/pdf-studio/tree/main/pubscript) - Complete accessible publishing system
- [**liblouis**](https://github.com/liblouis/liblouis) - Open-source braille translator
- [**IPA**](https://www.internationalphoneticassociation.org/) - International Phonetic Alphabet

---

## 📬 Contact

**UNESCO Submission**: See [unesco/](unesco/) folder

**SmileStory Inc.**
Republic of Korea

**For UNESCO Officials**:
This proposal is submitted to advance UNESCO's mission of inclusive education and accessibility for all.

---

## 🙏 Acknowledgments

- **King Sejong the Great** (1397-1450) - Inspiration from Hangul creation
- **Louis Braille** (1809-1852) - Foundation of tactile reading
- **UNESCO** - Global advocacy for disability inclusion
- **All contributors** - Making universal braille a reality

---

**홍익인간 - 弘益人間 - Benefit All Humanity**

*From Korea to the world, with love and respect.*

---

<p align="center">
  <strong>WIA Braille: Because every human deserves to read in their own language.</strong>
</p>
