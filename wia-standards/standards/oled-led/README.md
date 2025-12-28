# WIA-SEMI-009: OLED/LED Display Technology Standard

## Comprehensive Standard for Display Illumination Technologies

**Standard ID:** WIA-SEMI-009
**Version:** 1.0
**Release Date:** 2025-01-15
**Status:** Official Standard

---

## Overview

WIA-SEMI-009 establishes comprehensive specifications, measurement methodologies, and quality requirements for OLED (Organic Light-Emitting Diode) and LED (Light-Emitting Diode) display illumination technologies.

### Coverage

This standard covers:
- **WOLED** (White OLED with color filters)
- **QD-OLED** (Quantum Dot OLED)
- **Tandem OLED** (Multi-stack OLED architectures)
- **RGB OLED** (Direct RGB emission)
- **Mini-LED** (100-500μm LED backlights with local dimming)
- **Traditional LED LCD** (Edge-lit and direct-lit backlights)
- **Emerging technologies** (Micro-LED, QD-EL)

### Applications

- Consumer displays (TVs, monitors, smartphones, tablets)
- Professional displays (broadcast, medical, CAD/design)
- Automotive displays (instrument clusters, infotainment)
- Commercial displays (signage, retail, public information)
- Specialty applications (AR/VR, wearables, industrial)

---

## Directory Structure

```
standards/oled-led/
├── index.html              # Landing page with overview
├── simulator/
│   └── index.html          # Interactive 5-tab simulator (99 languages)
├── ebook/
│   ├── en/                 # 9 comprehensive English chapters
│   │   ├── 01-cover.md
│   │   ├── 02-technology-comparison.md
│   │   ├── 03-market-analysis.md
│   │   ├── 04-woled-technology.md
│   │   ├── 05-qd-oled-technology.md
│   │   ├── 06-tandem-oled.md
│   │   ├── 07-lifetime-burnin.md
│   │   ├── 08-miniled-dimming.md
│   │   └── 09-future-conclusion.md
│   └── ko/                 # 9 Korean chapters
│       └── (same structure as en/)
├── spec/                   # Technical specifications
│   ├── WIA-SEMI-009-core-v1.0.md
│   ├── WIA-SEMI-009-measurement-v1.0.md
│   ├── WIA-SEMI-009-mini-led-v1.0.md
│   └── WIA-SEMI-009-oled-lifetime-v1.0.md
├── api/
│   └── typescript/         # TypeScript SDK
│       ├── src/
│       │   ├── types.ts
│       │   ├── index.ts
│       │   ├── calculations.ts
│       │   ├── validators.ts
│       │   └── standards.ts
│       ├── package.json
│       └── tsconfig.json
└── README.md               # This file
```

---

## Quick Start

### 1. Explore the Landing Page

Open `index.html` in your browser to access:
- Standard overview
- Technology comparison
- 4-phase implementation roadmap
- Links to simulator, ebook, and specifications

### 2. Use the Simulator

Navigate to `simulator/index.html` for interactive tools:
- **Tab 1:** OLED/LED specifications database
- **Tab 2:** Luminance & efficiency calculator
- **Tab 3:** Dimming protocol simulator
- **Tab 4:** Backlight integration designer
- **Tab 5:** Optical testing & burn-in analysis

Features:
- 99 language support
- Real-time calculations
- Technology comparisons

### 3. Read the Ebook

Comprehensive guides available in `ebook/en/` (English) and `ebook/ko/` (Korean):

1. **Introduction** - Standard overview and history
2. **Technology Comparison** - OLED vs LCD+LED vs Mini-LED
3. **Market Analysis** - Samsung, LG, Sony, TCL, BOE
4. **WOLED Technology** - White OLED architecture
5. **QD-OLED Technology** - Quantum dot color conversion
6. **Tandem OLED** - Stacked structures for extended lifetime
7. **Lifetime & Burn-in** - Degradation and prevention
8. **Mini-LED & Dimming** - Advanced backlight technology
9. **Future Trends** - Emerging technologies and forecasts

### 4. Reference the Specifications

Technical documentation in `spec/`:
- **Core Specification** - Overall standard requirements
- **Measurement Protocols** - Detailed testing procedures
- **Mini-LED Specification** - Backlight-specific requirements
- **OLED Lifetime** - Aging and reliability testing

### 5. Integrate with TypeScript SDK

```typescript
import { WIASEMI009, DisplayTechnology, ApplicationCategory, CertificationLevel } from '@wia/oled-led-sdk';

// Define a display specification
const myDisplay = {
  technology: DisplayTechnology.QD_OLED,
  application: ApplicationCategory.TV_PREMIUM,
  screenSize: 65,
  resolution: { width: 3840, height: 2160 },
  luminance: {
    fullScreen: 300,
    peak10Percent: 1200,
    blackLevel: 0.0005,
    temperature: 25,
  },
  contrast: {
    native: Infinity,
    ansi: 150000,
  },
  color: {
    gamut: { 'DCI-P3': 99, 'Rec.2020': 87 },
    accuracy: { average: 1.5, maximum: 2.8 },
  },
  responseTime: {
    grayToGray: 0.1,
  },
};

// Validate against standard
const result = WIASEMI009.validate(myDisplay, CertificationLevel.PREMIUM);

console.log(`Certified: ${result.certified}`);
console.log(`Certificate: ${result.certificateNumber}`);
result.tests.forEach(test => {
  console.log(`${test.testName}: ${test.passed ? 'PASS' : 'FAIL'}`);
});
```

---

## Key Technologies

### OLED (Organic Light-Emitting Diode)

**Advantages:**
- Self-emissive (perfect blacks, infinite contrast)
- Fast response time (<0.1ms)
- Wide viewing angles
- Thin form factor

**Challenges:**
- Lifetime limitations (LT95: 50,000-100,000 hours)
- Burn-in risk with static content
- Lower peak brightness than LED
- Higher manufacturing cost

**Types:**
- **WOLED** (LG) - White OLED + color filters
- **QD-OLED** (Samsung/Sony) - Blue OLED + quantum dots
- **RGB OLED** - Direct RGB emission (smartphones)
- **Tandem OLED** - Stacked for 2× lifetime/brightness

### Mini-LED Backlit LCD

**Advantages:**
- High peak brightness (1,000-5,000 Cd/m²)
- Long lifetime (>100,000 hours)
- No burn-in risk
- Cost-competitive with OLED

**Challenges:**
- Some blooming (vs OLED perfect blacks)
- Thicker than OLED
- Slower response time than OLED

**Classifications:**
- **Entry:** 500-2,000 LEDs, 100-500 zones
- **Standard:** 2,000-8,000 LEDs, 500-2,000 zones
- **Premium:** 8,000-15,000 LEDs, 2,000-5,000 zones
- **Ultra:** >15,000 LEDs, >5,000 zones

---

## Performance Metrics

### Luminance (Cd/m² or nits)

| Technology | Full-Screen | Peak (10%) |
|------------|-------------|------------|
| WOLED | 200-300 | 600-1,000 |
| QD-OLED | 300-400 | 1,000-1,500 |
| Tandem OLED | 400-600 | 1,500-2,000 |
| Mini-LED | 300-500 | 1,000-5,000 |
| Edge LED | 200-400 | 400-800 |

### Contrast Ratio

| Technology | Native | ANSI | Black Level |
|------------|--------|------|-------------|
| OLED | Infinite | >100,000:1 | <0.001 Cd/m² |
| Mini-LED (2,000+ zones) | 5,000:1 | 50,000:1 | <0.02 Cd/m² |
| Mini-LED (500+ zones) | 3,000:1 | 10,000:1 | <0.05 Cd/m² |
| VA LCD | 3,000:1 | 1,500:1 | <0.1 Cd/m² |
| IPS LCD | 1,000:1 | 600:1 | <0.3 Cd/m² |

### Color Gamut (DCI-P3 Coverage)

| Technology | Typical Coverage |
|------------|------------------|
| QD-OLED | 98-100% |
| QD Mini-LED | 95-98% |
| WOLED | 90-95% |
| Standard LCD | 70-80% |

### Response Time

| Technology | Gray-to-Gray |
|------------|--------------|
| OLED | <0.1ms |
| LCD (Fast) | 1-3ms |
| LCD (Standard) | 5-12ms |

### Lifetime (LT95)

| Technology | Hours |
|------------|-------|
| Tandem OLED | 100,000+ |
| Standard OLED | 50,000-80,000 |
| LED LCD | >100,000 |

---

## Measurement Standards

All measurements per WIA-SEMI-009 specifications:

- **Environment:** 25±2°C, 50±10% RH, <1 lux ambient
- **Warm-up:** 30 minutes minimum
- **Equipment:** Calibrated colorimeter/spectroradiometer
- **Patterns:** Standardized test patterns
- **Reporting:** Uncertainty and confidence intervals required

### Key Measurements

1. **Luminance:** Full-screen, peak (3%, 10% windows), black level
2. **Contrast:** ANSI (16×16 checkerboard), sequential
3. **Color:** Gamut coverage (sRGB, DCI-P3, Rec.2020), ΔE accuracy
4. **Temporal:** Response time (GtG), input lag
5. **Lifetime:** LT95 with accelerated testing (OLED)
6. **Uniformity:** 9 or 25-point grid, ±% deviation
7. **Burn-in:** Static pattern test, uniformity after aging

---

## Certification Levels

### Level 1 - Basic Compliance
- Meets minimum specifications
- Basic testing performed
- Suitable for budget applications

### Level 2 - Standard Compliance
- Meets standard requirements
- Comprehensive testing
- Typical consumer and professional use

### Level 3 - Premium Compliance
- Exceeds specifications by >20%
- Extended testing and validation
- Professional, medical, automotive applications

---

## Applications Guide

### Consumer TVs
- **Dark Room / Home Theater:** WOLED or QD-OLED
- **Bright Living Room:** Mini-LED
- **Budget:** Traditional LCD + LED

### Gaming
- **Competitive Gaming:** OLED (fast response) or high-refresh LCD
- **HDR Gaming:** Mini-LED (high brightness) or QD-OLED

### Professional
- **Content Creation:** Calibrated OLED or professional LCD
- **Medical Imaging:** High-precision LCD or Tandem OLED
- **24/7 Operation:** Mini-LED or traditional LCD (no burn-in)

### Mobile
- **Smartphones:** OLED (thin, power-efficient)
- **Tablets:** OLED or high-end LCD

### Automotive
- **Premium:** Tandem OLED (lifetime, brightness)
- **Standard:** Mini-LED (reliability, sunlight readability)

---

## Resources

### Documentation
- **Specifications:** See `spec/` directory
- **Ebook:** Comprehensive guides in `ebook/en/` and `ebook/ko/`
- **API Reference:** TypeScript SDK documentation

### Interactive Tools
- **Simulator:** `simulator/index.html` - 5-tab calculator/analyzer
- **Landing Page:** `index.html` - Overview and navigation

### External Links
- **WIA Website:** https://wiabooks.store/tag/wia-oled-led/
- **GitHub Repository:** https://github.com/WIA-Official/wia-standards
- **Ebook Store:** https://wiabooks.store/tag/wia-oled-led/

### Support
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Email:** Contact via WIA website

---

## Standards Compliance

This standard references and builds upon:
- **VESA DisplayHDR** - HDR display specifications
- **IEC 61966-2-1** - sRGB color space
- **ITU-R BT.2020** - UHDTV color gamut
- **CIE Standards** - Color measurement and specification
- **IEC 62471** - Photobiological safety

---

## Contributing

Contributions to WIA-SEMI-009 are welcome:

1. **Suggestions:** Open GitHub issue with proposed changes
2. **Data:** Submit test data for standard validation
3. **Translations:** Additional language support welcome
4. **Code:** Improve simulator or SDK functionality

All contributions subject to WIA review and approval.

---

## License

© 2025 SmileStory Inc. / WIA

This standard is published under open access principles:
- **Specifications:** Freely available for implementation
- **Software:** MIT License (see individual components)
- **Documentation:** Creative Commons Attribution 4.0

**Attribution Required:** "Based on WIA-SEMI-009 Standard"

---

## Philosophy

**弘익人間 (Hongik Ingan) - Benefit All Humanity**

The World Certification Industry Association develops standards that promote:
- Global interoperability
- Quality and safety
- Innovation through open standards
- Environmental responsibility
- Benefit to all stakeholders

WIA-SEMI-009 embodies these principles by establishing clear, achievable, and universally applicable standards for display technologies that serve humanity worldwide.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-15 | Initial release covering OLED, LED, and Mini-LED technologies |

---

## Contact

**World Certification Industry Association (WIA)**

- **Website:** https://wiabooks.store
- **GitHub:** https://github.com/WIA-Official/wia-standards
- **Standards Portal:** https://wiabooks.store/tag/wia-oled-led/

For certification inquiries, technical support, or partnership opportunities, please contact us through the website.

---

**弘益人間 · Benefit All Humanity**

© 2025 SmileStory Inc. / WIA. All rights reserved.
