# WIA-IND-004: Beauty Tech Specification v1.0

> **Standard ID:** WIA-IND-004
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Beauty Technology Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Skin Analysis Technology](#2-skin-analysis-technology)
3. [Virtual Makeup Try-On](#3-virtual-makeup-try-on)
4. [Beauty Device IoT](#4-beauty-device-iot)
5. [Personalized Skincare](#5-personalized-skincare)
6. [Hair Analysis and Care](#6-hair-analysis-and-care)
7. [Ingredient Database](#7-ingredient-database)
8. [Progress Tracking](#8-progress-tracking)
9. [Color Science](#9-color-science)
10. [Data Formats](#10-data-formats)
11. [API Interface](#11-api-interface)
12. [Privacy and Security](#12-privacy-and-security)
13. [Safety Standards](#13-safety-standards)
14. [References](#14-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the comprehensive framework for beauty technology applications, providing standardized methods for skin analysis, virtual makeup try-on, beauty device integration, personalized skincare recommendations, and hair care technology. The standard enables consistent implementation across beauty tech platforms, devices, and applications.

### 1.2 Scope

The standard covers:
- AI-powered skin analysis using computer vision and machine learning
- Virtual makeup try-on with augmented reality and real-time rendering
- Beauty device IoT protocols for smart devices (cleansing, LED therapy, etc.)
- Personalized skincare formulation and routine optimization
- Hair and scalp analysis technology
- Comprehensive ingredient safety database (10,000+ ingredients)
- Before/after progress tracking with quantitative metrics
- Professional integration tools for dermatologists and aestheticians
- E-commerce integration for product recommendations

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to democratize access to professional-grade beauty analysis and personalized skincare. By providing open, standardized interfaces, we enable everyone to receive expert-level beauty consultations regardless of their location or economic resources, promoting self-care, confidence, and well-being for all humanity.

### 1.4 Terminology

- **Stratum Corneum**: Outermost layer of the epidermis
- **Melanin**: Pigment responsible for skin color
- **Sebum**: Natural oil produced by sebaceous glands
- **TEWL**: Trans-Epidermal Water Loss
- **Fitzpatrick Scale**: Skin type classification (I-VI)
- **Baumann Scale**: 16-type skin classification system
- **AR**: Augmented Reality
- **CV**: Computer Vision
- **ML**: Machine Learning
- **CIELAB**: Perceptually uniform color space
- **IoT**: Internet of Things
- **BLE**: Bluetooth Low Energy
- **SPF**: Sun Protection Factor
- **PA**: Protection Grade of UVA
- **AHA**: Alpha Hydroxy Acid
- **BHA**: Beta Hydroxy Acid
- **PHA**: Poly Hydroxy Acid

---

## 2. Skin Analysis Technology

### 2.1 Image Acquisition

#### 2.1.1 Camera Requirements

**Minimum Specifications:**
- Resolution: 8MP (3264×2448) minimum, 12MP+ recommended
- Color Depth: 24-bit RGB minimum, 48-bit RAW preferred
- Lens: Fixed focal length 28mm equivalent, f/2.0 or wider
- Auto-focus: Phase detection or contrast detection
- Color Accuracy: ΔE < 3 in sRGB color space

**Lighting Conditions:**
- Natural daylight (D65 illuminant) preferred
- Controlled studio lighting (5000K-6500K color temperature)
- Minimum illumination: 500 lux
- Maximum variation: ±10% across face area
- Flash disabled to avoid specular reflection

#### 2.1.2 Image Capture Protocol

```
Standard Protocol:
1. Subject positioning: 30-50cm from camera
2. Angle: 0° (frontal), ±45° (profile), 90° (lateral)
3. Expression: Neutral, relaxed face
4. Preparation: Clean, makeup-free skin
5. Environment: Controlled lighting, neutral background
6. Multiple captures: 3-5 images per session for consistency
```

#### 2.1.3 Image Preprocessing

```
Processing Pipeline:
1. Color calibration using ColorChecker reference
2. White balance adjustment (D65 standard illuminant)
3. Gamma correction (γ = 2.2)
4. Noise reduction (bilateral filter, σ = 1.5)
5. Face detection and alignment
6. Region of interest (ROI) extraction
7. Normalization to standard size (1024×1024)
```

### 2.2 Skin Type Classification

#### 2.2.1 Fitzpatrick Phototype (I-VI)

**Classification Method:**
```
Melanin Index (MI) = log₁₀(1/R₆₈₀) - log₁₀(1/R₄₂₀)

Type I:   MI < 35   (Very fair, always burns)
Type II:  MI 35-42  (Fair, usually burns)
Type III: MI 42-48  (Medium, sometimes burns)
Type IV:  MI 48-55  (Olive, rarely burns)
Type V:   MI 55-65  (Brown, very rarely burns)
Type VI:  MI > 65   (Very dark, never burns)
```

**Spectrophotometric Measurement:**
- Red channel (620-750nm): Hemoglobin absorption
- Green channel (495-570nm): Melanin and hemoglobin
- Blue channel (450-495nm): Melanin absorption
- UV response: Minimal erythema dose (MED) testing

#### 2.2.2 Baumann Skin Type (16 Types)

**Four Binary Characteristics:**

**1. Oily (O) vs Dry (D)**
```
Sebum Level Measurement:
- Photometric sebum tape analysis
- Impedance measurement
- Visual assessment (Sebumeter® SM 815)

Threshold: Sebum > 150 μg/cm² → Oily
          Sebum < 100 μg/cm² → Dry
```

**2. Sensitive (S) vs Resistant (R)**
```
Sensitivity Indicators:
- Erythema index > 300
- Visible capillaries > 10/cm²
- Self-reported reactions to cosmetics
- Lactic acid sting test positive
- TEWL > 20 g/m²/h
```

**3. Pigmented (P) vs Non-Pigmented (N)**
```
Pigmentation Assessment:
- Melanin index standard deviation > 15
- Visible hyperpigmentation > 5 spots
- Post-inflammatory hyperpigmentation history
- Melasma or age spots present
```

**4. Wrinkle-prone (W) vs Tight (T)**
```
Aging Indicators:
- Wrinkle depth > 0.5mm (crow's feet)
- Elasticity score < 70/100
- Sagging assessment (visual grading scale)
- Pore size increase > 20% vs age 20
- Loss of facial volume
```

### 2.3 Quantitative Skin Metrics

#### 2.3.1 Hydration Measurement

**Methods:**
1. **Capacitance Measurement (Corneometer®)**
   - Range: 0-130 arbitrary units
   - < 30: Very dry
   - 30-40: Dry
   - 40-60: Normal
   - > 60: Well hydrated

2. **Trans-Epidermal Water Loss (TEWL)**
   ```
   TEWL (g/m²/h) = k × (P₁ - P₂) / d

   Where:
   - k = constant (0.0625)
   - P₁ = water vapor pressure at sensor 1
   - P₂ = water vapor pressure at sensor 2
   - d = distance between sensors (cm)

   Normal: < 15 g/m²/h
   Dry: 15-25 g/m²/h
   Very dry: > 25 g/m²/h
   ```

3. **Image-based Estimation**
   ```
   Hydration Score = 100 × (1 - (Wrinkle Density × 0.4 + Flakiness × 0.3 + Dullness × 0.3))
   ```

#### 2.3.2 Elasticity and Firmness

**Cutometer® Measurement:**
```
Parameters:
- R0: Immediate deformation (skin firmness)
- R2: Gross elasticity (Ua/Uf ratio)
- R5: Net elasticity
- R7: Biological elasticity

Elasticity Score = (R2 × 0.4) + (R5 × 0.35) + (R7 × 0.25)

Age-adjusted normal ranges:
Age 20-30: R2 > 0.80
Age 30-40: R2 > 0.75
Age 40-50: R2 > 0.70
Age 50-60: R2 > 0.65
Age 60+:    R2 > 0.60
```

**Suction Method:**
```
Firmness (N/mm) = Force applied / Skin displacement

Young skin: > 0.15 N/mm
Mature skin: 0.10-0.15 N/mm
Aged skin: < 0.10 N/mm
```

#### 2.3.3 Pore Analysis

**Computer Vision Detection:**
```
Pore Detection Algorithm:
1. Convert to grayscale
2. Apply Gaussian blur (σ = 1.0)
3. Adaptive thresholding (block size = 11)
4. Morphological opening (kernel = 3×3)
5. Contour detection (min area = 4 pixels)
6. Ellipse fitting for each pore

Metrics:
- Pore Count: Number per cm²
- Average Diameter: μm
- Size Distribution: Histogram
- Pore Density: % of skin surface

Classification:
Small pores: < 250 μm
Medium pores: 250-400 μm
Large pores: > 400 μm
```

**Pore Quality Score:**
```
Pore Score = 100 - (Count_normalized × 0.4 + Size_normalized × 0.4 + Distribution_variance × 0.2)

Where:
Count_normalized = min(100, (count - 20) × 2)
Size_normalized = min(100, (avg_diameter - 200) / 3)
```

#### 2.3.4 Wrinkle Assessment

**3D Surface Profiling:**
```
Wrinkle Metrics:
- Ra: Average roughness (μm)
- Rz: Maximum peak-to-valley height (μm)
- Rmax: Maximum wrinkle depth (μm)
- Wrinkle length: Total length in ROI (mm)
- Wrinkle area: % of surface area

Depth Classification:
Superficial: < 0.2 mm (fine lines)
Medium: 0.2-0.5 mm (expression lines)
Deep: > 0.5 mm (static wrinkles)
```

**Age-based Wrinkle Severity:**
```
Wrinkle Score = Σ(Depth_i × Length_i) / Area

Severity Scale (0-10):
0-2: Minimal (age 20-30)
2-4: Mild (age 30-40)
4-6: Moderate (age 40-50)
6-8: Significant (age 50-60)
8-10: Severe (age 60+)
```

#### 2.3.5 Pigmentation Analysis

**Melanin and Hemoglobin Quantification:**
```
RGB to Melanin/Hemoglobin Decomposition:

Melanin Index = -100 × log₁₀((1/R) / (1/G))
Hemoglobin Index = -100 × log₁₀((1/R) / (1/B))

Normalized values:
MI_norm = (MI - MI_min) / (MI_max - MI_min) × 100
HI_norm = (HI - HI_min) / (HI_max - HI_min) × 100
```

**Spot Detection:**
```
Pigmentation Spot Algorithm:
1. Convert to LAB color space
2. Extract L* channel (lightness)
3. Calculate local contrast: C = |L*_pixel - L*_mean| / σ
4. Threshold: C > 2.0 for hyperpigmentation
5. Morphological filtering (min size = 2mm²)
6. Classification: Freckles, age spots, melasma

Spot Metrics:
- Total count
- Average size (mm²)
- Color intensity (ΔE from surrounding skin)
- Distribution uniformity
```

**Evenness Score:**
```
Tone Evenness = 100 × (1 - (σ_melanin / μ_melanin))

Excellent: > 90
Good: 80-90
Fair: 70-80
Poor: < 70
```

#### 2.3.6 Redness and Inflammation

**Erythema Index:**
```
EI = 100 × (R - G) / G

Where:
R = Red channel intensity (0-255)
G = Green channel intensity (0-255)

Classification:
Normal: EI < 150
Mild redness: 150-250
Moderate: 250-400
Severe: > 400
```

**Vascular Pattern Analysis:**
```
Capillary Detection:
1. Multi-scale vessel enhancement filter
2. Frangi vesselness measure
3. Hysteresis thresholding
4. Skeleton extraction

Metrics:
- Vessel density (% area)
- Average vessel diameter (μm)
- Tortuosity index
- Distribution pattern

Conditions:
Rosacea: Vessel density > 15%
Spider veins: Large vessels (> 300 μm)
Sensitive skin: High capillary density
```

### 2.4 Overall Skin Health Score

**Composite Scoring Algorithm:**
```
Skin Health Score (0-100) =
  Hydration × 0.25 +
  Elasticity × 0.25 +
  Texture_smoothness × 0.20 +
  Tone_evenness × 0.15 +
  Pore_quality × 0.15

Component calculations:
- Hydration: Corneometer reading normalized to 0-100
- Elasticity: Cutometer R2 × 100
- Texture: 100 - (Roughness / 50)
- Tone: Melanin distribution uniformity
- Pore: Based on size and density

Interpretation:
90-100: Excellent (optimal skin health)
80-89: Very Good (minor improvements possible)
70-79: Good (some concerns to address)
60-69: Fair (multiple concerns)
< 60: Poor (significant concerns)
```

**Skin Age Estimation:**
```
Skin Age = Chronological Age + Age_offset

Age_offset =
  (Wrinkle_score - Wrinkle_expected) × 0.35 +
  (Elasticity_expected - Elasticity_score) × 0.30 +
  (Pigmentation_score - Pigmentation_expected) × 0.20 +
  (Texture_expected - Texture_score) × 0.15

Typical ranges:
Younger than chronological: -10 to 0 years
Same as chronological: ±2 years
Older than chronological: +5 to +20 years
```

---

## 3. Virtual Makeup Try-On

### 3.1 Facial Landmark Detection

#### 3.1.1 Key Point Detection

**468-Point Facial Mesh:**
```
Face regions:
- Face oval: 0-16 (17 points)
- Eyebrows: 17-26, 27-36 (20 points)
- Eyes: 36-47, 48-59 (24 points)
- Nose: 60-87 (28 points)
- Mouth: 88-107 (20 points)
- Jawline: 108-126 (19 points)
- Full mesh: 0-467 (468 points)

Detection methods:
1. MediaPipe Face Mesh (real-time)
2. Dlib 68-point detector (classic)
3. Custom CNN-based detector
4. 3D morphable model fitting
```

#### 3.1.2 3D Face Reconstruction

**Structure from Motion:**
```
3D Reconstruction Pipeline:
1. Multi-view stereo matching
2. Depth map generation
3. Point cloud construction
4. Mesh generation (Poisson surface reconstruction)
5. Texture mapping

Or using single image:
1. Deep learning depth estimation
2. 3DMM (3D Morphable Model) fitting
3. Photometric stereo refinement
```

### 3.2 Makeup Product Categories

#### 3.2.1 Foundation and Base

**Foundation Rendering:**
```
Blending Algorithm:
Result = Base_skin × (1 - Coverage × Alpha) + Foundation_color × Coverage × Alpha

Where:
- Coverage: 0.3 (sheer), 0.6 (medium), 0.9 (full)
- Alpha: Edge feathering (Gaussian blur σ = 5-10)
- Base_skin: Original skin tone (RGB)
- Foundation_color: Product color (RGB)

Finish types:
- Matte: Specular reflection × 0.3
- Satin: Specular reflection × 0.6
- Dewy: Specular reflection × 1.0 + highlight areas
```

**Shade Matching:**
```
Color Match Score = 100 × exp(-ΔE / 10)

Where ΔE (CIELAB color difference):
ΔE = √((L₁* - L₂*)² + (a₁* - a₂*)² + (b₁* - b₂*)²)

Undertone classification:
If b* > 0 and a* > 0: Warm (golden/yellow)
If b* < 0 and a* < 0: Cool (pink/blue)
If |b*| < 5 and |a*| < 5: Neutral
```

#### 3.2.2 Eye Makeup

**Eyeshadow Application:**
```
Region segmentation:
1. Lid space: From lash line to crease
2. Crease: Natural eye fold
3. Brow bone: Below eyebrow
4. Inner corner: Highlight area
5. Outer corner: Depth area

Blending zones:
- Hard edge: 0% blend (eyeliner)
- Soft edge: 30% blend (lid color)
- Full blend: 60% blend (crease, outer V)

Color application:
Color_final = Base_color × (1 - Intensity) + Shadow_color × Intensity
Intensity: 0.3 (sheer), 0.6 (medium), 0.9 (opaque)
```

**Eyeliner Rendering:**
```
Stroke generation:
1. Upper lash line detection
2. Bezier curve fitting
3. Thickness control (1-5 pixels)
4. Wing angle and length (optional)

Styles:
- Pencil: Soft edge, matte finish
- Liquid: Sharp edge, glossy finish
- Gel: Medium edge, semi-matte
```

**Mascara Simulation:**
```
Lash enhancement:
1. Individual lash detection
2. Length extension (+20-50%)
3. Thickness increase (+30-80%)
4. Curl adjustment (lift angle)
5. Color application (black, brown, blue, etc.)

Volume calculation:
Volume = Base_volume × (1 + Intensity × 0.8)
Intensity: 0.3 (natural), 0.6 (volumizing), 0.9 (dramatic)
```

#### 3.2.3 Lip Products

**Lip Segmentation:**
```
Lip detection:
1. Upper lip: Cupid's bow, philtrum ridges
2. Lower lip: Center fullness, corners
3. Vermillion border: Edge definition
4. Highlight area: Center top and bottom

Color application:
Lip_final = Lip_original × (1 - Opacity) + Product_color × Opacity

Opacity by product type:
- Lip gloss: 0.3-0.5
- Tinted balm: 0.4-0.6
- Satin lipstick: 0.7-0.85
- Matte lipstick: 0.9-1.0
- Liquid lipstick: 0.95-1.0
```

**Finish Simulation:**
```
Matte:
- Specular reflection: 0.1
- Surface roughness: High
- Color intensity: 100%

Satin:
- Specular reflection: 0.5
- Surface roughness: Medium
- Color intensity: 95%

Glossy:
- Specular reflection: 0.9
- Surface roughness: Low
- Color intensity: 70%
- Highlight overlay: +30% brightness

Metallic:
- Specular reflection: 0.8
- Metallic particles: Random sparkle overlay
- Color shift: Angle-dependent hue rotation
```

#### 3.2.4 Blush and Contour

**Application Zones:**
```
Blush placement:
1. Apple of cheeks (smile detection)
2. High on cheekbones (lifted effect)
3. Draping style (temple to apple)

Blend area:
- Center: 100% color intensity
- Edge (5-15mm): Gradient fade to 0%
- Feathering: Gaussian blur (σ = 8-12)

Contour zones:
1. Cheekbones: Below natural shadow
2. Jawline: Edge definition
3. Nose bridge: Slimming effect
4. Forehead: Hairline shadow

Contour intensity:
Darken = Original × (1 - Intensity × 0.3)
Intensity: 0.3 (subtle), 0.6 (medium), 0.9 (dramatic)
```

#### 3.2.5 Highlighter

**Placement Algorithm:**
```
Highlight zones:
1. Cheekbone tops (C-shaped curve)
2. Brow bone (below eyebrow arch)
3. Nose bridge (thin line)
4. Cupid's bow (upper lip)
5. Inner eye corners
6. Center of chin

Glow effect:
Highlight = Base × 1.3 + Shimmer_particle × 0.4

Shimmer types:
- Pearl: White/pink shift, fine particles
- Gold: Warm metallic, medium particles
- Champagne: Neutral metallic, fine particles
- Holographic: Multi-color shift, ultra-fine
```

### 3.3 Real-Time AR Rendering

#### 3.3.1 Performance Optimization

**Frame Rate Requirements:**
```
Target: 30 FPS minimum, 60 FPS ideal
Latency: < 100ms end-to-end

Optimization strategies:
1. GPU acceleration (Metal, OpenGL ES)
2. Texture atlasing for products
3. LOD (Level of Detail) based on distance
4. Occlusion culling
5. Predictive tracking (Kalman filter)
```

#### 3.3.2 Lighting Compensation

**Environment Lighting Estimation:**
```
Illumination detection:
1. Spherical harmonics (9 coefficients)
2. Image-based lighting (IBL)
3. Shadow map generation

Color temperature adaptation:
If detected_temp < 4000K: Warm compensation (+yellow)
If detected_temp > 7000K: Cool compensation (+blue)

Dynamic range adjustment:
Makeup_adjusted = Makeup_base × (Detected_brightness / Reference_brightness)
```

---

## 4. Beauty Device IoT

### 4.1 Device Categories and Protocols

#### 4.1.1 Cleansing Devices

**Smart Sonic Cleanser:**
```
Device capabilities:
- Frequency: 100-300 Hz (adjustable)
- Amplitude: 0.5-2.0 mm
- Timer: 60-180 seconds
- Zones: T-zone, U-zone detection
- Pressure sensor: 0-500g force

BLE Communication Protocol:
Service UUID: 0x1800 (Device Information)
Characteristic UUID: 0x2A00 (Device Name)
Custom Service: 0xBEA0 (Beauty Device Service)

Commands:
0x01: Start cleansing
0x02: Stop
0x03: Set frequency (1 byte, 0-255)
0x04: Set timer (2 bytes, seconds)
0x05: Get session data

Data format:
[Timestamp][Duration][Avg_pressure][Zone_coverage][Battery]
```

**Silicone Sonic Cleanser:**
```
Features:
- Pulsation patterns: 8000 pulses/min
- Heat therapy: 37-42°C optional
- Material: Medical-grade silicone
- Waterproof: IPX7 rating

Usage tracking:
- Sessions per week
- Average duration
- Pressure distribution heatmap
- Skin zone coverage (%)
```

#### 4.1.2 LED Light Therapy Devices

**Multi-wavelength LED Mask:**
```
Wavelength specifications:
- Red (630-660 nm): Collagen stimulation, anti-aging
- Blue (405-420 nm): Acne treatment, antibacterial
- Yellow (570-590 nm): Redness reduction, calming
- Green (525-550 nm): Hyperpigmentation, brightening
- Infrared (850-900 nm): Deep tissue healing

Power density: 20-40 mW/cm²
Treatment time: 10-20 minutes
Safety: Automatic shutoff, eye protection

Protocol specification:
Mode selection:
0x10: Red only
0x11: Blue only
0x12: Red + Infrared
0x13: Yellow + Green
0x14: Custom program

Intensity levels: 0-100 (%)
Duration: 1-30 minutes
Pulsed mode: On/off intervals

Data logging:
- Total usage time per wavelength
- Session effectiveness rating (user input)
- Temperature monitoring
- Safety alerts
```

#### 4.1.3 Microcurrent Devices

**Facial Toning Device:**
```
Electrical specifications:
- Current: 100-500 μA (microamps)
- Frequency: 0.1-500 Hz
- Waveform: Sinusoidal, square, or custom
- Safety limit: < 1000 μA maximum

Treatment modes:
1. Lift mode: 300 μA, 0.5 Hz
2. Tone mode: 400 μA, 1.0 Hz
3. Contour mode: 350 μA, 0.3 Hz

Skin contact detection:
- Impedance measurement: 10-100 kΩ
- Auto-shutoff if no contact > 5 seconds
- Gel/conductor required warning

IoT features:
- Session progress tracking
- Personalized intensity adjustment
- Treatment area mapping
- Results photo comparison
```

#### 4.1.4 Skin Analysis Devices

**Smart Skin Scanner:**
```
Sensors:
1. RGB camera: 12MP, macro lens
2. UV camera: 1.3MP, 365nm LED
3. Moisture sensor: Capacitance-based
4. Oil sensor: Photometric
5. Temperature sensor: Infrared

Measurements:
- Hydration: 0-100 arbitrary units
- Oil level: 0-100 (Sebumeter equivalent)
- Temperature: ±0.1°C accuracy
- Pigmentation: Melanin index
- Pore count and size

Data transmission:
- Bluetooth 5.0
- WiFi (2.4GHz/5GHz)
- Cloud sync enabled
- Offline mode with 1000 measurement buffer

Analysis outputs:
- Instant skin health score
- 7-day trend graphs
- Product recommendations
- Treatment effectiveness tracking
```

### 4.2 Device Integration API

**Universal Beauty Device Protocol (UBDP):**
```json
{
  "protocol_version": "1.0",
  "device": {
    "id": "uuid",
    "type": "led_mask | cleanser | scanner | toning",
    "manufacturer": "string",
    "model": "string",
    "firmware_version": "string"
  },
  "capabilities": {
    "modes": ["mode1", "mode2"],
    "intensity_levels": 10,
    "timer_range": [60, 1800],
    "sensors": ["temperature", "pressure"]
  },
  "session": {
    "start_time": "ISO8601",
    "duration": "seconds",
    "mode": "string",
    "settings": {
      "intensity": 75,
      "temperature": 38
    },
    "measurements": {
      "avg_pressure": 250,
      "coverage": 95
    }
  }
}
```

---

## 5. Personalized Skincare

### 5.1 Skin Profiling

**Comprehensive Skin Profile:**
```json
{
  "user_id": "uuid",
  "age": 28,
  "gender": "female",
  "ethnicity": "asian",
  "fitzpatrick_type": "III",
  "baumann_type": "OSPT",

  "measurements": {
    "hydration": 65,
    "oil_level": 78,
    "elasticity": 82,
    "pore_quality": 70,
    "pigmentation_evenness": 75,
    "wrinkle_score": 15,
    "redness_index": 180,
    "skin_age": 26
  },

  "concerns": [
    "large_pores",
    "occasional_breakouts",
    "dark_spots",
    "oily_t_zone"
  ],

  "goals": [
    "minimize_pores",
    "prevent_aging",
    "even_skin_tone",
    "control_oil"
  ],

  "preferences": {
    "natural_ingredients": true,
    "fragrance_free": true,
    "cruelty_free": true,
    "budget": "moderate",
    "routine_complexity": "moderate"
  },

  "allergies": [
    "parabens",
    "artificial_fragrance"
  ],

  "environment": {
    "climate": "humid_subtropical",
    "pollution_level": "moderate",
    "uv_index_avg": 7,
    "indoor_heating": true
  }
}
```

### 5.2 Product Recommendation Algorithm

**Multi-factor Scoring System:**
```
Recommendation Score =
  Ingredient_efficacy × 0.35 +
  Safety_score × 0.30 +
  Skin_type_match × 0.20 +
  User_reviews × 0.10 +
  Price_value × 0.05

Ingredient Efficacy:
- Clinical studies (gold standard)
- Concentration (% active ingredient)
- Formulation stability
- Penetration enhancers
- Synergistic combinations

Safety Score:
- EWG rating (1-10 scale)
- CIR safety assessment
- EU Cosmetics Regulation compliance
- Allergen content
- Irritation potential

Skin Type Match:
- pH compatibility (4.5-6.5 ideal)
- Texture (gel for oily, cream for dry)
- Comedogenicity rating (0-5 scale)
- Specific concern targeting

User Reviews:
- Average rating (1-5 stars)
- Number of reviews (weight factor)
- Verified purchases only
- Filtered by similar skin type

Price Value:
- Cost per ml
- Expected usage duration
- Concentration of actives
- Multi-function benefits
```

### 5.3 Routine Optimization

**Personalized Regimen Builder:**
```
Morning Routine (4-7 steps):
1. Cleanser (optional if no overnight treatment)
2. Toner/Essence (pH balancing, hydration prep)
3. Treatment serum (vitamin C, niacinamide)
4. Eye cream (optional, if concerns)
5. Moisturizer (SPF if combined)
6. Sunscreen (SPF 30+ PA+++ minimum)

Evening Routine (6-10 steps):
1. Oil cleanser / Makeup remover
2. Water-based cleanser (double cleanse)
3. Exfoliant (2-3x per week)
4. Toner/Essence
5. Treatment serum (retinol, acids)
6. Eye cream
7. Moisturizer
8. Sleeping mask (1-2x per week)
9. Spot treatment (as needed)

Layering principles:
- Thinnest to thickest consistency
- Water-based before oil-based
- pH-dependent order (acids first)
- Wait time between actives (3-5 min)
- Avoid incompatible combinations
```

**Ingredient Conflict Detection:**
```
Incompatible combinations (avoid same routine):
- Retinol + AHA/BHA (irritation risk)
- Vitamin C + Niacinamide (old myth, but pH conflict)
- Retinol + Benzoyl Peroxide (deactivation)
- Multiple acids (over-exfoliation)

Synergistic combinations (enhance together):
- Vitamin C + Vitamin E + Ferulic Acid
- Niacinamide + Zinc
- Hyaluronic Acid + Ceramides
- Retinol + Peptides

pH considerations:
- AHA/BHA: pH 3.0-4.0
- Vitamin C (LAA): pH 2.5-3.5
- Niacinamide: pH 5.0-7.0
- Retinol: pH 5.5-6.0
- Peptides: pH 4.0-7.0
```

### 5.4 Product Database Schema

**Comprehensive Product Information:**
```json
{
  "product_id": "uuid",
  "name": "string",
  "brand": "string",
  "category": "cleanser|serum|moisturizer|sunscreen|etc",
  "sub_category": "string",

  "ingredients": [
    {
      "name": "Niacinamide",
      "inci_name": "Niacinamide",
      "concentration": 5.0,
      "function": ["brightening", "anti-aging", "oil_control"],
      "safety_rating": 1,
      "allergen_potential": "low"
    }
  ],

  "formulation": {
    "ph": 5.5,
    "texture": "gel-cream",
    "color": "white",
    "fragrance": "unscented",
    "preservative_system": ["phenoxyethanol", "ethylhexylglycerin"]
  },

  "suitability": {
    "skin_types": ["oily", "combination", "normal"],
    "concerns": ["large_pores", "dullness", "uneven_tone"],
    "age_range": [20, 50],
    "pregnancy_safe": true,
    "vegan": true,
    "cruelty_free": true
  },

  "usage": {
    "frequency": "twice_daily",
    "when": ["morning", "evening"],
    "amount": "1-2 pumps",
    "duration_months": 3
  },

  "clinical_data": {
    "studies_count": 12,
    "efficacy_proven": true,
    "improvement_percentage": 35,
    "time_to_results_weeks": 4
  },

  "ratings": {
    "average": 4.5,
    "count": 2847,
    "by_skin_type": {
      "oily": 4.7,
      "dry": 4.2,
      "combination": 4.6
    }
  },

  "price": {
    "amount": 39.00,
    "currency": "USD",
    "size_ml": 50,
    "price_per_ml": 0.78
  }
}
```

---

## 6. Hair Analysis and Care

### 6.1 Scalp Analysis

**Scalp Health Metrics:**
```
Scalp condition assessment:
1. Sebum level (oil production)
2. Hydration status
3. pH level (ideal: 4.5-5.5)
4. Inflammation/redness
5. Flakiness (dandruff)
6. Sensitivity

Microscopic analysis:
- Follicle density: Follicles per cm²
- Pore condition: Clean vs blocked
- Fungal/bacterial presence
- Blood circulation (thermal imaging)

Classification:
- Oily scalp: Sebum > 200 μg/cm², needs frequent washing
- Dry scalp: Sebum < 100 μg/cm², flakiness without oil
- Balanced: Sebum 100-200 μg/cm², healthy range
- Sensitive: Redness, irritation, inflammation
```

### 6.2 Hair Structure Analysis

**Hair Fiber Assessment:**
```
Thickness measurement:
- Fine: < 50 μm diameter
- Medium: 50-70 μm
- Thick: > 70 μm

Density calculation:
Total density = (Hair count in 1 cm²) × (Average hairs per follicle)

Low: < 100 hairs/cm²
Medium: 100-150 hairs/cm²
High: > 150 hairs/cm²

Porosity test:
- Low porosity: Cuticle tightly closed, water repels
- Medium porosity: Normal moisture absorption
- High porosity: Cuticle damaged, over-absorbs

Elasticity test:
Healthy hair: Stretches 30-50% before breaking
Damaged hair: Breaks with minimal stretching

Damage assessment:
- Cuticle integrity (microscopy)
- Split ends percentage
- Breakage frequency
- Color damage (if applicable)
- Chemical damage (perm, relaxer)
```

### 6.3 Hair Color Analysis and Recommendation

**Natural Hair Color Classification:**
```
Level system (1-10):
1: Black
2-3: Darkest to dark brown
4-5: Medium to light brown
6-7: Dark to medium blonde
8-9: Light to very light blonde
10: Lightest blonde/platinum

Undertone:
- Warm: Golden, red, copper tones
- Cool: Ash, blue, violet tones
- Neutral: Balance of warm and cool

Melanin composition:
- Eumelanin: Brown-black pigment
- Pheomelanin: Red-yellow pigment
- Ratio determines natural color
```

**Virtual Hair Color Try-On:**
```
Hair segmentation algorithm:
1. Semantic segmentation (U-Net, DeepLab)
2. Hair mask refinement
3. Strand-level detail preservation
4. Lighting estimation

Color application:
Result = Base_hair × (1 - Intensity) + New_color × Intensity

Realistic rendering:
- Highlight preservation
- Root shadow gradient
- Natural variation (±10% color shift)
- Shine/gloss simulation
- Dimension (multiple tones)

Maintenance prediction:
- Fade timeline (6-8 weeks typical)
- Root regrowth visibility
- Color refresh frequency
- Damage potential assessment
```

### 6.4 Hair Loss and Growth Tracking

**Trichometry Measurements:**
```
Hair count tracking:
- Total hair count in defined area
- Percentage change over time
- Growth vs resting phase ratio

Growth rate:
Average: 0.3-0.5 mm per day (1 cm per month)
Measurement: Photo tracking of marked area

Miniaturization assessment:
- Follicle size reduction
- Vellus vs terminal hair ratio
- Pattern baldness progression (Norwood, Ludwig scales)

Shedding analysis:
Normal: 50-100 hairs per day
Excessive: > 150 hairs per day

Telogen effluvium detection:
- Increased shedding (2-3 months after trigger)
- Hair pull test (> 6 hairs per pull = positive)
- Trichogram analysis
```

---

## 7. Ingredient Database

### 7.1 Active Ingredients

**Anti-Aging Actives:**
```
Retinoids:
- Retinol: 0.01-1.0%
  - Entry level: 0.01-0.1%
  - Moderate: 0.3-0.5%
  - Advanced: 0.5-1.0%
  - Stability: Requires airless packaging
  - pH: 5.5-6.0
  - Efficacy: Wrinkle reduction 20-30% in 12 weeks

- Retinaldehyde: 0.01-0.1%
  - Faster conversion to retinoic acid
  - Less irritating than retinol
  - Antibacterial properties

- Adapalene: 0.1-0.3%
  - Prescription strength for acne
  - Photostable vs retinol
  - Less irritation

Peptides:
- Matrixyl 3000: 2-10%
  - Palmitoyl tripeptide-1
  - Palmitoyl tetrapeptide-7
  - Collagen synthesis stimulation

- Argireline: 5-10%
  - Acetyl hexapeptide-8
  - "Botox-like" effect (muscle relaxation)
  - Expression line reduction

- Copper peptides: 0.05-2%
  - GHK-Cu
  - Wound healing, anti-inflammatory
  - Collagen and elastin production

Antioxidants:
- Vitamin C (L-Ascorbic Acid): 5-20%
  - pH: 2.5-3.5 (optimal stability)
  - Concentration: 10-15% most effective
  - Paired with Vitamin E and Ferulic Acid

- Vitamin E (Tocopherol): 0.1-5%
  - Oil-soluble antioxidant
  - Moisturizing properties
  - Synergy with Vitamin C

- Ferulic Acid: 0.5-1%
  - Photoprotection enhancement
  - Stabilizes Vitamin C and E
  - Brown spot reduction

- Resveratrol: 0.5-5%
  - Polyphenol antioxidant
  - Anti-inflammatory
  - Sirtuin activation (longevity)

- Coenzyme Q10: 0.01-0.3%
  - Ubiquinone
  - Cellular energy production
  - Wrinkle reduction
```

**Hydration Ingredients:**
```
Humectants:
- Hyaluronic Acid: 0.1-2%
  - Multiple molecular weights
  - Low MW: Penetration (< 50 kDa)
  - Medium MW: Surface hydration (50-1000 kDa)
  - High MW: Film formation (> 1000 kDa)
  - Binds 1000× its weight in water

- Glycerin: 3-10%
  - Most common humectant
  - Safe, effective, inexpensive
  - Can be drying if > 10%

- Sodium PCA: 0.2-2%
  - Natural moisturizing factor (NMF)
  - Superior to glycerin at low humidity

- Panthenol (Pro-Vitamin B5): 1-5%
  - Humectant and emollient
  - Anti-inflammatory
  - Wound healing

Occlusives:
- Petrolatum: 1-100%
  - Most effective occlusive (98% TEWL reduction)
  - Non-comedogenic despite myth
  - Inert, hypoallergenic

- Dimethicone: 1-10%
  - Silicone-based
  - Smooth, non-greasy feel
  - Breathable occlusive

Emollients:
- Ceramides: 0.5-5%
  - Skin barrier repair
  - Lipid bilayer components
  - Types 1, 3, 6 most important

- Squalane: 1-10%
  - Biomimetic lipid
  - Non-comedogenic
  - Antioxidant properties

- Niacinamide (Vitamin B3): 2-10%
  - Barrier strengthening
  - Ceramide synthesis stimulation
  - Multi-functional active
```

**Exfoliants:**
```
Alpha Hydroxy Acids (AHA):
- Glycolic Acid: 5-30%
  - Smallest molecule, best penetration
  - Anti-aging, texture improvement
  - pH 3.0-4.0

- Lactic Acid: 5-30%
  - Larger than glycolic, gentler
  - Hydrating properties
  - pH 3.0-4.0

- Mandelic Acid: 5-15%
  - Largest AHA, most gentle
  - Antibacterial (acne treatment)
  - Safe for darker skin tones

Beta Hydroxy Acid (BHA):
- Salicylic Acid: 0.5-2%
  - Oil-soluble, penetrates pores
  - Anti-inflammatory
  - Acne treatment gold standard
  - pH 3.0-4.0

Poly Hydroxy Acids (PHA):
- Gluconolactone: 4-10%
  - Gentle, no sun sensitivity
  - Antioxidant properties
  - Suitable for sensitive skin

- Lactobionic Acid: 4-10%
  - Hydrating exfoliant
  - Chelating agent
```

**Brightening Ingredients:**
```
- Niacinamide: 2-10%
  - Melanin transfer inhibition
  - Reduces dark spots 30-40% in 8 weeks
  - Multi-functional (also oil control, barrier)

- Alpha Arbutin: 1-2%
  - Tyrosinase inhibitor
  - Stable form of hydroquinone
  - No irritation or sensitization

- Kojic Acid: 1-4%
  - Tyrosinase inhibitor
  - Can cause sensitization > 2%
  - Often paired with Vitamin C

- Tranexamic Acid: 2-5%
  - Melanocyte activation inhibitor
  - Particularly effective for melasma
  - Anti-inflammatory

- Vitamin C (various forms): 5-20%
  - Melanin reduction
  - Photoprotection
  - Collagen synthesis

- Licorice Extract: 1-5%
  - Glabridin (active component)
  - Gentle brightening
  - Anti-inflammatory
```

**Acne Treatment:**
```
- Benzoyl Peroxide: 2.5-10%
  - Antibacterial (kills P. acnes)
  - Keratolytic
  - Can bleach fabrics
  - Start with 2.5% (as effective as 10%, less irritating)

- Salicylic Acid: 0.5-2%
  - Comedolytic
  - Anti-inflammatory
  - Oil-soluble penetration

- Niacinamide: 4-10%
  - Sebum regulation
  - Anti-inflammatory
  - Post-acne mark reduction

- Azelaic Acid: 10-20%
  - Antimicrobial
  - Keratolytic
  - Brightening (PIH treatment)
  - Rosacea treatment

- Sulfur: 3-10%
  - Keratolytic
  - Antibacterial
  - Absorbs excess oil

- Tea Tree Oil: 2.5-5%
  - Natural antimicrobial
  - Anti-inflammatory
  - Can cause sensitization if too high
```

### 7.2 Ingredient Safety Database

**EWG Scoring System (0-10):**
```
0-2: Low hazard (green)
3-6: Moderate hazard (yellow)
7-10: High hazard (red)

Factors considered:
- Cancer risk
- Developmental & reproductive toxicity
- Allergies & immunotoxicity
- Use restrictions
- Data availability

Common high-concern ingredients:
- Parabens (4-7): Endocrine disruption concerns
- Oxybenzone (8): Hormone disruption
- Formaldehyde releasers (7-9): Carcinogen
- Fragrance (8): Allergen, undisclosed ingredients
- Hydroquinone (7): Restricted, carcinogen concerns
```

**Common Allergens:**
```
Preservatives:
- Formaldehyde releasers
- Methylisothiazolinone (MIT)
- Iodopropynyl butylcarbamate

Fragrances:
- Linalool
- Limonene
- Geraniol
- Citronellol
- Eugenol

Others:
- Propylene glycol
- Lanolin
- Essential oils (various)
```

### 7.3 Ingredient Interaction Matrix

**Safe Combinations:**
```
✓ Vitamin C + Vitamin E + Ferulic Acid
✓ Niacinamide + Hyaluronic Acid
✓ Retinol + Peptides (different times)
✓ AHA + Niacinamide (pH buffered)
✓ Vitamin C + SPF (daytime)
```

**Avoid Combinations:**
```
✗ Retinol + Vitamin C (pH conflict, irritation)
✗ Retinol + AHA/BHA (over-exfoliation)
✗ Retinol + Benzoyl Peroxide (deactivation)
✗ Multiple strong acids (irritation)
✗ Copper peptides + Vitamin C (oxidation)
```

---

## 8. Progress Tracking

### 8.1 Photo Standardization

**Consistent Documentation Protocol:**
```
Camera settings:
- Resolution: 12MP minimum
- Flash: Off
- HDR: Off
- Filters: None
- Format: RAW or highest quality JPEG

Positioning:
- Distance: 30 cm from face
- Angles: 0° (frontal), ±45° (oblique), 90° (profile)
- Facial expression: Neutral, relaxed
- Eyes: Open, looking at camera

Lighting:
- Source: D65 daylight equivalent (6500K)
- Intensity: 800-1000 lux
- Direction: Frontal, 45° elevation
- Background: Neutral gray (18% gray card)

Timing:
- Frequency: Weekly or bi-weekly
- Time of day: Same time each session
- Skin preparation: Clean, no products for 2 hours
```

### 8.2 Quantitative Comparison

**Image Registration and Alignment:**
```
Alignment algorithm:
1. Facial landmark detection (68-point or 468-point)
2. Affine transformation (rotation, scale, translation)
3. Perspective correction
4. ROI extraction (same regions)

Metrics for comparison:
- Pixel-wise difference (MSE, SSIM)
- Feature-based matching (SIFT, ORB)
- Histogram comparison (Chi-square distance)
- Perceptual difference (LPIPS)
```

**Quantified Improvements:**
```
Wrinkle reduction:
- Wrinkle length: Baseline vs current (% reduction)
- Wrinkle depth: 3D profiling (mm decrease)
- Wrinkle area: % of skin surface

Pigmentation improvement:
- Spot count: Number reduction
- Spot size: Average area reduction (mm²)
- Color intensity: ΔE reduction
- Evenness score: Increase in uniformity

Texture enhancement:
- Roughness (Ra): Decrease in microns
- Pore size: Average diameter reduction
- Smoothness score: 0-100 scale increase

Hydration increase:
- Corneometer reading: Baseline vs current
- TEWL reduction: g/m²/h decrease
- Visual radiance: Luminosity increase

Overall skin health score:
- Composite metric: 0-100 scale
- Week-over-week change
- Statistical significance (p-value)
```

### 8.3 Timeline Analysis

**Treatment Response Curves:**
```
Typical timelines:
- Hydration: 1-3 days (immediate)
- Exfoliation glow: 3-7 days
- Acne improvement: 2-4 weeks
- Brightening: 4-8 weeks
- Anti-aging (peptides): 8-12 weeks
- Retinol effects: 12-24 weeks
- Scar fading: 3-12 months

Progress tracking intervals:
- Acute conditions (acne): Weekly
- Active treatment (retinol): Bi-weekly
- Maintenance: Monthly
- Long-term (anti-aging): Quarterly

Plateau detection:
- No improvement for 3 consecutive measurements
- Recommendation: Adjust routine or increase concentration
```

---

## 9. Color Science

### 9.1 Color Spaces

**RGB (Red-Green-Blue):**
```
Device-dependent color space
Range: 0-255 per channel (8-bit)
Total colors: 16.7 million (2^24)

sRGB: Standard RGB (web, consumer devices)
Adobe RGB: Wider gamut (professional)
ProPhoto RGB: Widest gamut (editing)

Not perceptually uniform: ΔE ≠ perceived difference
```

**CIELAB (L\*a\*b\*):**
```
Perceptually uniform color space
Standard illuminant: D65 (daylight)

L*: Lightness (0-100)
  - 0 = black
  - 50 = middle gray
  - 100 = white

a*: Green (-) to Red (+)
  - Range: -128 to +127
  - Negative = green
  - Positive = red

b*: Blue (-) to Yellow (+)
  - Range: -128 to +127
  - Negative = blue
  - Positive = yellow

Color difference (ΔE):
ΔE = √((L₁* - L₂*)² + (a₁* - a₂*)² + (b₁* - b₂*)²)

Perceptual interpretation:
ΔE < 1: Not perceptible
ΔE 1-2: Perceptible through close observation
ΔE 2-3.5: Perceptible at a glance
ΔE 3.5-5: Clear difference
ΔE > 5: Colors are more different than similar
```

### 9.2 Skin Tone Classification

**Individual Typology Angle (ITA):**
```
ITA = [arctan((L* - 50) / b*)] × (180 / π)

Classification:
ITA > 55°: Very light
ITA 41-55°: Light
ITA 28-41°: Intermediate
ITA 19-28°: Tan
ITA 10-19°: Brown
ITA < 10°: Dark
```

**Undertone Detection:**
```
Undertone classification:
If b* > 0 and a* > 0: Warm (golden/yellow)
If b* < 0 and a* < 0: Cool (pink/blue)
If |b*| < 5 and |a*| < 5: Neutral
If a* > 0 and b* < 0: Olive (rare)

Vein test correlation:
- Green veins → Warm undertone
- Blue/purple veins → Cool undertone
- Both/unsure → Neutral undertone

Jewelry test:
- Gold looks better → Warm
- Silver looks better → Cool
- Both → Neutral
```

### 9.3 Foundation Matching

**Shade Matching Algorithm:**
```
1. Measure skin tone (L*, a*, b*)
2. Determine undertone (warm/cool/neutral)
3. Calculate ΔE for all foundations in database
4. Filter by undertone category
5. Rank by lowest ΔE
6. Consider oxidation (foundation darkens over time)

Oxidation adjustment:
Final_match = Initial_color + Oxidation_shift
Oxidation typically: +5 to +10 in L* over 2-4 hours

Top 5 matches presented:
1. Exact match (ΔE < 2)
2. Slightly lighter (L* + 2)
3. Slightly darker (L* - 2)
4. Alternative undertone
5. Different formula (matte vs dewy)
```

---

## 10. Data Formats

### 10.1 Skin Analysis Report (JSON)

```json
{
  "report_id": "uuid",
  "user_id": "uuid",
  "timestamp": "2025-12-27T10:30:00Z",
  "version": "1.0",

  "image_metadata": {
    "resolution": "4032x3024",
    "camera": "iPhone 15 Pro",
    "lighting": "natural_daylight",
    "distance_cm": 35,
    "angle": "frontal"
  },

  "classification": {
    "fitzpatrick_type": "III",
    "baumann_type": "OSPT",
    "ita_value": 38.5,
    "undertone": "warm"
  },

  "measurements": {
    "hydration": {
      "value": 68,
      "method": "capacitance",
      "unit": "AU",
      "zone_breakdown": {
        "forehead": 70,
        "cheeks": 72,
        "t_zone": 62
      }
    },
    "elasticity": {
      "value": 0.78,
      "method": "cutometer_R2",
      "age_adjusted": 82
    },
    "pores": {
      "count_per_cm2": 45,
      "average_diameter_um": 320,
      "quality_score": 68
    },
    "wrinkles": {
      "severity_score": 22,
      "depth_max_mm": 0.35,
      "total_length_mm": 145,
      "zones": {
        "forehead": 3,
        "crows_feet": 4,
        "smile_lines": 2
      }
    },
    "pigmentation": {
      "melanin_index": 45,
      "evenness_score": 74,
      "spot_count": 12,
      "hyperpigmentation_area_percent": 3.2
    },
    "redness": {
      "erythema_index": 185,
      "severity": "mild",
      "vessel_density_percent": 8.5
    }
  },

  "overall_scores": {
    "skin_health": 76,
    "skin_age": 27,
    "chronological_age": 30
  },

  "concerns_detected": [
    {
      "concern": "large_pores",
      "severity": "moderate",
      "affected_area": "t_zone"
    },
    {
      "concern": "fine_lines",
      "severity": "mild",
      "affected_area": "eye_area"
    }
  ],

  "recommendations": {
    "immediate": [
      "increase_hydration",
      "add_antioxidant_serum"
    ],
    "long_term": [
      "introduce_retinol",
      "consistent_sunscreen_use"
    ],
    "products": [
      {
        "product_id": "uuid",
        "name": "Hyaluronic Acid Serum",
        "purpose": "hydration",
        "priority": 1
      }
    ]
  }
}
```

### 10.2 Virtual Makeup Session (JSON)

```json
{
  "session_id": "uuid",
  "user_id": "uuid",
  "timestamp": "2025-12-27T14:15:00Z",

  "base_image": {
    "url": "s3://bucket/user_images/original.jpg",
    "hash": "sha256_hash",
    "resolution": "1920x1080"
  },

  "facial_landmarks": {
    "method": "mediapipe_468",
    "confidence": 0.96,
    "points": [
      {"id": 0, "x": 960, "y": 540, "z": 0.1},
      // ... 467 more points
    ]
  },

  "products_applied": [
    {
      "type": "foundation",
      "brand": "Example Brand",
      "name": "Luminous Foundation",
      "shade": "Natural Beige 4.5",
      "coverage": 0.7,
      "finish": "satin",
      "color_lab": {
        "L": 68.5,
        "a": 8.2,
        "b": 18.3
      }
    },
    {
      "type": "blush",
      "brand": "Example Brand",
      "name": "Peachy Glow",
      "color_hex": "#FF9A9E",
      "intensity": 0.6,
      "placement": "apples_of_cheeks",
      "blend_radius": 12
    },
    {
      "type": "lipstick",
      "brand": "Example Brand",
      "name": "Bold Red",
      "color_hex": "#DC143C",
      "finish": "matte",
      "opacity": 0.95
    }
  ],

  "rendering_settings": {
    "lighting_model": "pbr",
    "environment_map": "natural_daylight",
    "skin_subsurface_scattering": true,
    "quality": "high"
  },

  "result_image": {
    "url": "s3://bucket/results/session_uuid.jpg",
    "thumbnail_url": "s3://bucket/results/session_uuid_thumb.jpg"
  },

  "user_feedback": {
    "rating": 5,
    "saved": true,
    "shared": false,
    "purchased": ["product_id_1", "product_id_2"]
  }
}
```

---

## 11. API Interface

### 11.1 RESTful API Endpoints

**Skin Analysis:**
```
POST /api/v1/skin/analyze
Content-Type: multipart/form-data

Request:
{
  "image": <file>,
  "options": {
    "depth": "comprehensive" | "quick",
    "detect_pores": true,
    "detect_wrinkles": true,
    "detect_pigmentation": true,
    "detect_redness": true
  }
}

Response:
{
  "status": "success",
  "report_id": "uuid",
  "data": { /* SkinAnalysisReport */ }
}
```

**Virtual Makeup:**
```
POST /api/v1/makeup/try-on
Content-Type: application/json

Request:
{
  "image_url": "string",
  "products": [
    {
      "type": "lipstick",
      "color": "#DC143C",
      "finish": "matte"
    }
  ],
  "options": {
    "auto_adjust": true,
    "lighting": "natural"
  }
}

Response:
{
  "status": "success",
  "session_id": "uuid",
  "result_url": "string",
  "landmarks": { /* facial landmarks */ }
}
```

**Product Recommendations:**
```
POST /api/v1/recommendations/products
Content-Type: application/json

Request:
{
  "skin_profile": {
    "type": "oily",
    "concerns": ["acne", "large_pores"]
  },
  "preferences": {
    "budget": "moderate",
    "natural": true
  }
}

Response:
{
  "status": "success",
  "recommendations": [
    {
      "product_id": "uuid",
      "score": 92,
      "reasoning": "..."
    }
  ]
}
```

### 11.2 WebSocket API (Real-time AR)

```
wss://api.wia-beauty.com/v1/ar/makeup

Connection message:
{
  "action": "connect",
  "api_key": "string",
  "session_id": "uuid"
}

Frame update:
{
  "action": "frame",
  "image": "base64_encoded_jpg",
  "timestamp": 1234567890
}

Product change:
{
  "action": "apply_product",
  "product": {
    "type": "lipstick",
    "color": "#DC143C"
  }
}

Response (rendered frame):
{
  "action": "frame_result",
  "image": "base64_encoded_jpg",
  "landmarks": [...],
  "latency_ms": 45
}
```

---

## 12. Privacy and Security

### 12.1 Data Protection

**Encryption:**
```
At rest: AES-256-GCM
In transit: TLS 1.3
Key management: AWS KMS / Azure Key Vault

Image storage:
- Original images: Encrypted S3 bucket
- Retention: User-defined (default 1 year)
- Deletion: Immediate upon request
- Anonymization: Face detection with blur/removal option
```

**GDPR Compliance:**
```
Rights provided:
1. Right to access (data export)
2. Right to rectification (update profile)
3. Right to erasure ("right to be forgotten")
4. Right to data portability (JSON export)
5. Right to object (opt-out of processing)

Data minimization:
- Only collect necessary data
- Automatic deletion after retention period
- Anonymization for analytics
```

### 12.2 Authentication and Authorization

**OAuth 2.0 + OpenID Connect:**
```
Authentication flow:
1. User login via provider (Google, Apple, etc.)
2. Receive JWT access token
3. Include in Authorization header

Token format:
Authorization: Bearer <jwt_token>

Token expiration: 1 hour
Refresh token: 30 days
```

**API Key Management:**
```
For partner integrations:
- API key generation (SHA-256 hash stored)
- Rate limiting (1000 req/hour default)
- Usage analytics
- Key rotation support
```

---

## 13. Safety Standards

### 13.1 Cosmetic Regulations

**FDA (United States):**
```
- Color additives: FDA-approved list
- Prohibited ingredients: Lead acetate, mercury compounds
- Labeling requirements: INCI names, warnings
- OTC drug classification: Sunscreen, acne treatments
```

**EU Cosmetics Regulation:**
```
- Banned substances: 1300+ ingredients
- Restricted substances: Concentration limits
- Preservatives: Positive list (parabens limited to 0.4%)
- CMR substances: Carcinogens, mutagens, reprotoxic
- Nanomaterials: Special labeling required
```

### 13.2 Clinical Testing Standards

**Safety Assessment:**
```
Required tests:
1. Patch test (skin irritation)
2. HRIPT (Human Repeat Insult Patch Test)
3. Phototoxicity test
4. Eye irritation test (in vitro alternatives)
5. Sensitization test

Efficacy testing:
1. Instrumental measurements (Corneometer, etc.)
2. Expert grading (dermatologist assessment)
3. Consumer perception studies
4. Statistical analysis (p < 0.05 significance)
```

---

## 14. References

1. Skin Analysis and Measurement:
   - Fluhr, J.W., et al. "Bioengineering of the Skin" (2006)
   - Dobrev, H. "In vivo study of skin mechanical properties" (2000)

2. Color Science:
   - CIE (Commission Internationale de l'Eclairage) Standards
   - Chardon, A., et al. "Skin colour typology and suntanning pathways" (1991)

3. Cosmetic Science:
   - Baumann, L. "Cosmetic Dermatology" (2009)
   - Draelos, Z.D. "Cosmeceuticals" (2009)

4. Ingredients and Formulation:
   - Cosmetic Ingredient Review (CIR) Database
   - Environmental Working Group (EWG) Skin Deep Database
   - European Commission Cosmetic Ingredients Database (CosIng)

5. Regulations:
   - FDA Cosmetics Guidance Documents
   - EU Cosmetics Regulation (EC) No 1223/2009
   - ISO 22715:2006 Cosmetics -- Packaging and labelling

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*This specification is maintained by the WIA Beauty Technology Research Group*
*For updates and contributions, visit: https://github.com/WIA-Official/wia-standards*

*© 2025 SmileStory Inc. / WIA*
*Version 1.0.0 - Published 2025-12-27*
