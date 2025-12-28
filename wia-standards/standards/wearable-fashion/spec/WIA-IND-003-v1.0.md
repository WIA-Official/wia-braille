# WIA-IND-003: Wearable Fashion Standard - Technical Specification v1.0

> **Standard ID:** WIA-IND-003
> **Version:** 1.0.0
> **Status:** Active
> **Release Date:** 2025-01-15
> **Category:** IND (Industry) - Indigo (#6366F1)
> **Emoji:** 👔

---

## Document Information

| Field | Value |
|-------|-------|
| **Title** | Wearable Fashion Standard |
| **Standard ID** | WIA-IND-003 |
| **Version** | 1.0.0 |
| **Authors** | WIA Fashion Technology Research Group |
| **Contributors** | Fashion designers, electronics engineers, textile specialists |
| **Status** | Active |
| **License** | MIT |
| **Copyright** | © 2025 SmileStory Inc. / WIA |

---

## Abstract

**弘익人間 (홍익인간) - Benefit All Humanity**

The WIA-IND-003 Wearable Fashion Standard establishes a comprehensive technical framework for integrating electronic components, sensors, displays, and interactive elements into clothing and accessories. This standard addresses the design, manufacturing, power management, user interaction, safety, and sustainability aspects of wearable fashion technology.

As technology becomes increasingly wearable, this standard aims to democratize tech-integrated fashion, making it accessible, safe, sustainable, and beneficial for all. From LED-embedded evening gowns to health-monitoring athletic wear, from heated jackets for extreme climates to solar-powered accessories, this standard provides the technical foundation for the future of fashion.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Scope](#2-scope)
3. [Normative References](#3-normative-references)
4. [Terms and Definitions](#4-terms-and-definitions)
5. [Wearable Fashion Architecture](#5-wearable-fashion-architecture)
6. [Technical Requirements](#6-technical-requirements)
7. [LED and Display Technologies](#7-led-and-display-technologies)
8. [Power Systems](#8-power-systems)
9. [Smart Materials](#9-smart-materials)
10. [Thermal Management](#10-thermal-management)
11. [Sensors and Interaction](#11-sensors-and-interaction)
12. [Connectivity](#12-connectivity)
13. [Manufacturing and Assembly](#13-manufacturing-and-assembly)
14. [Safety Requirements](#14-safety-requirements)
15. [Sustainability](#15-sustainability)
16. [Testing and Certification](#16-testing-and-certification)
17. [Appendices](#17-appendices)

---

## 1. Introduction

### 1.1 Purpose

This standard provides a unified technical framework for wearable fashion technology, enabling:
- Consistent design and manufacturing practices
- Interoperability between components and systems
- Safety and reliability standards
- Sustainable and ethical production methods
- Innovation in fashion technology

### 1.2 Philosophy

**弘益人間 (홍익인간)** - "Broadly benefiting humanity"

Wearable fashion technology should:
- Enhance personal expression and creativity
- Improve quality of life through smart functionality
- Be accessible to people of all backgrounds
- Respect environmental sustainability
- Prioritize user safety and comfort

### 1.3 Target Audience

- Fashion designers and brands
- Electronics engineers
- Textile manufacturers
- Product developers
- Quality assurance teams
- Certification bodies

---

## 2. Scope

### 2.1 Included

This standard covers:
- Smart jewelry (rings, bracelets, necklaces, earrings)
- LED and light-emitting garments
- Interactive clothing (touch-sensitive, gesture-controlled)
- Thermal regulation clothing (heating/cooling)
- Health monitoring fashion
- Energy harvesting garments
- Fashion accessories with integrated technology

### 2.2 Excluded

This standard does not cover:
- Purely functional wearable devices (smartwatches, fitness trackers)
- Medical devices requiring regulatory approval
- Military/tactical equipment
- Industrial protective clothing
- Virtual/augmented reality fashion

---

## 3. Normative References

The following standards are referenced:
- IEC 60529: IP Code (Ingress Protection)
- ISO 105: Textiles - Tests for color fastness
- OEKO-TEX Standard 100: Textile safety
- ISO 12402: Personal flotation devices
- IEC 62368-1: Audio/video equipment safety
- Bluetooth SIG specifications
- USB-IF specifications
- Qi wireless charging standard
- FCC Part 15: Radio frequency devices

---

## 4. Terms and Definitions

### 4.1 General Terms

**Wearable Fashion**: Clothing or accessories that integrate electronic components for aesthetic, functional, or interactive purposes.

**Smart Jewelry**: Jewelry items (rings, bracelets, necklaces) with embedded electronics, sensors, or displays.

**E-Textile**: Fabric with integrated electronic components or conductive materials.

**Conductive Thread**: Thread made with or coated with conductive materials for carrying electrical current.

**LED Garment**: Clothing item incorporating light-emitting diodes for illumination or display.

### 4.2 Technical Terms

**Duty Cycle**: Percentage of time a component is active vs. total time.

**IP Rating**: Ingress Protection rating indicating resistance to dust and water.

**mAh**: Milliampere-hour, unit of battery capacity.

**PWM**: Pulse Width Modulation, method for controlling LED brightness.

**Washability**: Ability of a garment to withstand cleaning processes.

**SAR**: Specific Absorption Rate, measure of electromagnetic field absorption.

---

## 5. Wearable Fashion Architecture

### 5.1 System Components

```
┌─────────────────────────────────────────────────────────┐
│                 Wearable Fashion System                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Power   │  │  Control │  │ Display/ │            │
│  │  System  │──│   Unit   │──│  Output  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│       │              │              │                  │
│       │              │              │                  │
│  ┌────▼────┐   ┌────▼────┐   ┌────▼────┐            │
│  │ Battery │   │ Sensors │   │   LED/  │            │
│  │Charging │   │  Input  │   │ Haptic  │            │
│  └─────────┘   └─────────┘   └─────────┘            │
│                                                         │
│  ┌──────────────────────────────────────────┐         │
│  │       Textile/Fashion Integration        │         │
│  └──────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Component Layers

1. **Fashion Layer**: Visible fabric, design elements
2. **Functional Layer**: Sensors, LEDs, displays
3. **Power Layer**: Battery, charging, power distribution
4. **Control Layer**: Microcontroller, wireless communication
5. **Structural Layer**: Support, mounting, protection

### 5.3 Design Principles

- **Modularity**: Components should be replaceable
- **Flexibility**: Design should accommodate body movement
- **Washability**: Electronics should be removable or waterproof
- **Comfort**: No sharp edges, proper weight distribution
- **Aesthetics**: Technology should enhance, not detract from design

---

## 6. Technical Requirements

### 6.1 Electrical Specifications

#### 6.1.1 Voltage Ranges

| Component Type | Nominal Voltage | Operating Range | Maximum |
|----------------|----------------|-----------------|---------|
| Low Power LEDs | 3.3V | 2.8-3.6V | 5V |
| Microcontroller | 3.3V | 2.5-3.6V | 5V |
| High Power LEDs | 5V | 4.5-5.5V | 12V |
| Heating Elements | 5-12V | 4-13V | 24V |
| Motors/Actuators | 3.3-5V | 3-6V | 12V |

#### 6.1.2 Current Specifications

- Maximum current per conductive thread: 1A
- Maximum current per LED: 60mA (RGB), 20mA (single color)
- Total garment current: <5A for wearable items
- Standby current: <1mA

#### 6.1.3 Power Consumption Classes

| Class | Power Range | Application | Battery Life |
|-------|-------------|-------------|--------------|
| Ultra Low | 0-100mW | Smart jewelry, sensors | 7-30 days |
| Low | 100mW-1W | Notification devices | 1-7 days |
| Medium | 1-5W | LED accessories | 4-24 hours |
| High | 5-20W | LED clothing | 2-8 hours |
| Very High | 20-100W | Heated garments | 1-4 hours |

### 6.2 Mechanical Requirements

#### 6.2.1 Flexibility

- Bend radius: Minimum 10mm for rigid components
- Flex cycles: >10,000 for conductive traces
- Stretch: Up to 30% for elastic integration

#### 6.2.2 Durability

- Abrasion resistance: ISO 12947 >10,000 cycles
- Tear resistance: ISO 13937 >25N
- Seam strength: ISO 13935 >300N

### 6.3 Environmental Requirements

#### 6.3.1 Operating Conditions

- Temperature: -10°C to +50°C
- Humidity: 10% to 90% non-condensing
- Altitude: Up to 3000m

#### 6.3.2 Storage Conditions

- Temperature: -20°C to +60°C
- Humidity: 5% to 95% non-condensing
- Battery storage: 40-60% charge level

---

## 7. LED and Display Technologies

### 7.1 LED Types

#### 7.1.1 Individual RGB LEDs

**WS2812B (Neopixel)**
```
Specifications:
- Voltage: 5V ± 0.5V
- Current per LED: 60mA (max, white at full brightness)
- Current per color: 20mA
- Data protocol: Single-wire addressable
- Refresh rate: >400Hz
- Color depth: 24-bit (16.7M colors)
```

**APA102 (DotStar)**
```
Specifications:
- Voltage: 5V ± 0.5V
- Current per LED: 60mA (max)
- Data protocol: SPI (clock + data)
- Refresh rate: >10kHz
- Color depth: 24-bit + 5-bit brightness
```

#### 7.1.2 Fiber Optic LED

```
Configuration:
- Central LED source: 1-3W high-power LED
- Fiber count: 10-1000 strands
- Fiber diameter: 0.25-3mm
- Light transmission: >70% at 1m
- Flexibility: Excellent (bend radius <5mm)
```

#### 7.1.3 EL Wire (Electroluminescent)

```
Specifications:
- Voltage: 100-120VAC (via inverter)
- Frequency: 1000-3000Hz
- Brightness: 80-200 cd/m²
- Power: 0.2-0.5W per meter
- Diameter: 1.3-5mm
- Lifespan: 3000-8000 hours
```

### 7.2 LED Integration Methods

#### 7.2.1 Surface Mount

- Direct fabric mounting with conductive thread
- PCB strips sewn or bonded to fabric
- Flexibility: Limited (bend radius >20mm)
- Durability: High
- Density: Up to 144 LEDs/meter

#### 7.2.2 Embedded

- LEDs enclosed in waterproof sleeves
- Integrated into fabric weave
- Flexibility: Good (bend radius 10-15mm)
- Washability: Excellent (IP67+)
- Density: 30-60 LEDs/meter

#### 7.2.3 Woven Integration

- LEDs woven into fabric structure
- Conductive threads in warp/weft
- Flexibility: Excellent (fabric-like)
- Washability: Good (IP65)
- Density: 10-30 LEDs/100cm²

### 7.3 LED Patterns and Control

#### 7.3.1 Static Patterns

```cpp
// Example: Solid color
void setSolidColor(uint8_t r, uint8_t g, uint8_t b) {
    for(int i = 0; i < LED_COUNT; i++) {
        leds[i].setRGB(r, g, b);
    }
    FastLED.show();
}
```

#### 7.3.2 Dynamic Patterns

- Rainbow cycle
- Color chase
- Breathing effect
- Sparkle/twinkle
- Fire simulation
- Music reactive

#### 7.3.3 Interactive Patterns

- Touch-responsive
- Motion-activated
- Proximity-based
- Environmental (temperature, light)
- Biometric (heart rate, breathing)

### 7.4 Power Management for LEDs

#### 7.4.1 Brightness Control

```
Power Reduction = 1 - (Brightness / 255)²

Example:
50% brightness = 75% power reduction
25% brightness = 94% power reduction
```

#### 7.4.2 Duty Cycle Optimization

```
Average Power = Peak Power × Duty Cycle

Example:
10W peak, 30% duty cycle = 3W average
```

---

## 8. Power Systems

### 8.1 Battery Technologies

#### 8.1.1 Lithium Polymer (LiPo)

```
Specifications:
- Voltage: 3.7V nominal (3.0-4.2V range)
- Capacity: 100-5000mAh (wearables)
- Energy density: 150-250 Wh/kg
- Discharge rate: 1C-20C
- Cycle life: 300-500 cycles
- Form factor: Flexible pouch
- Safety: Requires protection circuit
```

**Advantages:**
- Lightweight
- Flexible form factor
- High capacity options

**Disadvantages:**
- Requires careful handling
- Fire risk if damaged
- Limited cycle life

#### 8.1.2 Flexible Battery

```
Specifications:
- Voltage: 3.7V nominal
- Capacity: 50-500mAh
- Thickness: 0.4-2mm
- Flexibility: Can bend to 20mm radius
- Cycle life: 300-500 cycles
- Temperature range: -10°C to +50°C
```

**Applications:**
- Garments requiring flexibility
- Washable designs (when properly sealed)
- Comfortable wearables

#### 8.1.3 Coin Cell

```
Common Types:
- CR2032: 3V, 220mAh, 20mm diameter
- CR2025: 3V, 165mAh, 20mm diameter
- CR1632: 3V, 125mAh, 16mm diameter

Characteristics:
- Non-rechargeable (primary)
- Long shelf life (10 years)
- Stable voltage
- Low self-discharge
```

**Applications:**
- Low-power smart jewelry
- Emergency backup power
- Simple LED accessories

### 8.2 Charging Methods

#### 8.2.1 USB Charging

**USB-C (Recommended)**
```
Specifications:
- Voltage: 5V (USB 2.0 Power Delivery)
- Current: 500mA-3A
- Connector: Reversible, robust
- Data: Optional
- Waterproofing: Requires port cover or gasket
```

**Micro USB (Legacy)**
```
Specifications:
- Voltage: 5V
- Current: 500mA-2A
- Durability: ~5000 insertions
- Waterproofing: Difficult
```

#### 8.2.2 Wireless Charging

**Qi Standard**
```
Specifications:
- Power: 5-15W
- Efficiency: 70-80%
- Distance: 5-40mm
- Frequency: 110-205 kHz
- Alignment: Critical (±5mm)
```

**Implementation:**
- Receiver coil integrated into garment
- Transmitter pad for charging
- Foreign object detection
- Automatic power adjustment

#### 8.2.3 Magnetic Connector

```
Specifications:
- Pins: 2-4 (power, ground, data)
- Current: Up to 3A
- Magnetic force: 50-200g
- Waterproofing: Excellent (IP67-IP68)
- Alignment: Self-aligning
```

**Advantages:**
- Easy connection/disconnection
- Excellent waterproofing
- No port wear

### 8.3 Energy Harvesting

#### 8.3.1 Solar Energy

**Flexible Solar Cells**
```
Specifications:
- Efficiency: 15-23%
- Power density: 100-250 mW/10cm²
- Voltage: 0.5-6V (depending on cells in series)
- Flexibility: Bend radius >20mm
- Durability: >10,000 flex cycles
```

**Calculation:**
```
Power (mW) = Area (cm²) × Irradiance (mW/cm²) × Efficiency

Example:
200 cm² × 100 mW/cm² × 0.20 = 4000mW = 4W (peak)

Realistic outdoor average: 1-2W
Indoor lighting: 0.1-0.5W
```

#### 8.3.2 Kinetic Energy

**Piezoelectric Harvesting**
```
Power output: 0.1-10mW per element
Response time: <1ms
Voltage: 1-20V (requires regulation)
Placement: High-movement areas (shoulders, elbows, knees)
```

**Electromagnetic Induction**
```
Power output: 1-100mW
Requires: Magnetic field + motion
Efficiency: 20-40%
Applications: Walking, arm movement
```

#### 8.3.3 Thermoelectric

**Body Heat Harvesting**
```
Temperature differential: 5-10°C (skin to ambient)
Power output: 1-50mW per cm²
Efficiency: 3-8%
TEG voltage: 0.1-1V
```

**Applications:**
- Wristbands
- Headbands
- Areas with good skin contact

### 8.4 Power Distribution

#### 8.4.1 Conductive Pathways

**Conductive Thread**
```
Properties:
- Resistance: 0.1-30 Ω/m
- Current capacity: 0.5-1A
- Flexibility: Excellent
- Washability: Good (with proper technique)
- Materials: Silver, copper, stainless steel
```

**Conductive Fabric Traces**
```
Properties:
- Resistance: 0.01-1 Ω/sq
- Current capacity: 1-5A (depending on width)
- Width: 2-20mm typical
- Application: Screen printing, weaving
```

**Flexible PCB**
```
Properties:
- Thickness: 0.1-0.3mm
- Layers: 1-4
- Bend radius: 5-20mm
- Durability: >100,000 flex cycles
```

#### 8.4.2 Power Regulation

**Buck Converter (Step-down)**
```
Input: 5-12V
Output: 3.3V or 5V
Efficiency: 85-95%
Ripple: <50mV
Load regulation: ±2%
```

**Linear Regulator**
```
Input: 4-20V
Output: 3.3V or 5V
Efficiency: 50-85% (voltage dependent)
Noise: Very low
Applications: Sensitive sensors
```

### 8.5 Battery Life Calculations

#### 8.5.1 Simple Calculation

```
Battery Life (hours) = Battery Capacity (mAh) / Average Current (mA)

Example:
500mAh battery, 50mA average current
Battery life = 500 / 50 = 10 hours
```

#### 8.5.2 Detailed Calculation

```
Total Current = LED Current + Sensor Current + MCU Current + Wireless Current

LED Current = (Number of LEDs × Current per LED × Average Brightness × Duty Cycle)
Sensor Current = (Sensor Current × Sample Rate / Max Rate)
MCU Current = (Active Current × Active % + Sleep Current × Sleep %)
Wireless Current = (TX Current × TX % + RX Current × RX % + Idle Current × Idle %)

Battery Life = (Battery Capacity × DoD × Efficiency) / Total Current
```

**Example:**
```
Battery: 1000mAh LiPo
LEDs: 50 × 20mA × 0.5 brightness × 0.3 duty cycle = 150mA
Sensors: 5mA × (1Hz / 100Hz) = 0.05mA
MCU: 8mA × 0.3 + 0.05mA × 0.7 = 2.44mA
Bluetooth: 15mA × 0.01 + 5mA × 0.09 + 0.5mA × 0.9 = 1.05mA

Total: 150 + 0.05 + 2.44 + 1.05 = 153.54mA

Battery Life = (1000 × 0.9 × 0.95) / 153.54 = 5.57 hours
```

---

## 9. Smart Materials

### 9.1 Conductive Textiles

#### 9.1.1 Conductive Thread Types

**Silver-Plated Thread**
```
Specifications:
- Resistance: 0.1-1 Ω/m
- Core: Nylon or polyester
- Coating: 99% silver
- Diameter: 0.2-0.5mm
- Current capacity: 0.5-1A
- Washing: Hand wash recommended
- Oxidation: Moderate (can tarnish)
```

**Stainless Steel Thread**
```
Specifications:
- Resistance: 10-30 Ω/m
- Material: 316L stainless steel
- Diameter: 0.1-0.3mm
- Current capacity: 0.3-0.5A
- Washing: Machine washable
- Durability: Excellent
- Cost: Low
```

**Copper Thread**
```
Specifications:
- Resistance: 0.5-5 Ω/m
- Core: Polymer
- Coating: Copper
- Diameter: 0.2-0.4mm
- Current capacity: 0.5-0.8A
- Oxidation: High (requires coating)
```

#### 9.1.2 Conductive Fabrics

**Silver-Coated Fabric**
```
Properties:
- Sheet resistance: 0.01-1 Ω/sq
- Shielding effectiveness: >60dB (EMI)
- Stretchability: Minimal
- Applications: Touch sensors, EMI shielding
```

**Conductive Polymer Fabric**
```
Properties:
- Sheet resistance: 1-100 Ω/sq
- Stretch: Up to 200%
- Washability: Excellent
- Applications: Stretch sensors, flexible circuits
```

### 9.2 Thermal Materials

#### 9.2.1 Heating Materials

**Carbon Fiber Heating Elements**
```
Specifications:
- Power density: 0.5-2 W/cm²
- Resistance: 20-100 Ω/m
- Maximum temperature: 45-60°C
- Response time: 1-3 minutes
- Flexibility: Good
- Efficiency: >95%
```

**Resistance Wire (Nichrome)**
```
Specifications:
- Resistivity: 1.1 Ω·mm²/m
- Maximum temp: 50-100°C (garment applications)
- Power: 1-5W per element
- Form: Wire (28-36 AWG) or ribbon
```

#### 9.2.2 Cooling Materials

**Phase Change Materials (PCM)**
```
Properties:
- Phase transition: 18-28°C (comfort range)
- Latent heat: 150-250 J/g
- Encapsulation: Microencapsulated
- Duration: 1-4 hours
- Rechargeable: Yes (by temperature change)
```

**Moisture-Wicking Fabrics**
```
Properties:
- Evaporative cooling
- Moisture transfer rate: >3000 g/m²/24h
- Drying time: <2 hours
- Materials: Polyester, nylon, merino wool blends
```

### 9.3 Sensing Materials

#### 9.3.1 Pressure Sensors

**Piezoresistive Fabric**
```
Properties:
- Resistance change: 10-1000% under pressure
- Sensing area: 1-100cm²
- Response time: <10ms
- Pressure range: 1kPa-1MPa
- Applications: Touch interfaces, posture sensing
```

**Capacitive Sensing**
```
Properties:
- Capacitance change: 1-100pF
- Sensitivity: Can detect through 5mm fabric
- Noise immunity: Good
- Applications: Touch buttons, proximity
```

#### 9.3.2 Stretch Sensors

**Conductive Elastomer**
```
Properties:
- Strain range: 0-300%
- Resistance change: Linear or exponential
- Response time: <50ms
- Hysteresis: <10%
- Applications: Motion capture, fit detection
```

---

## 10. Thermal Management

### 10.1 Heating Systems

#### 10.1.1 Heating Element Design

**Zone Heating**
```
Body Zones:
- Core (chest, back): 10-20W, 35-40°C
- Extremities (hands, feet): 5-10W, 30-35°C
- Neck: 3-5W, 30-35°C

Total power budget: 20-35W typical
Battery: 5000-10000mAh for 2-4 hour operation
```

**Temperature Control**
```
Control methods:
1. PWM (Pulse Width Modulation)
   - Frequency: 1-100Hz
   - Resolution: 8-bit (256 levels)
   - Efficiency: >95%

2. Bang-bang (on/off)
   - Simple implementation
   - Temperature ripple: ±2°C
   - Efficiency: >98%

3. PID control
   - Precise temperature
   - Complex implementation
   - Adaptive to conditions
```

#### 10.1.2 Safety Features

**Thermal Cutoff**
```
Maximum temperatures:
- Skin contact: 45°C continuous, 50°C peak
- Internal: 60°C
- Battery proximity: 40°C

Implementation:
- NTC thermistor: 10kΩ at 25°C
- Thermal fuse: 60-70°C trip
- Microcontroller monitoring: 1Hz sample rate
- Automatic shutdown: >45°C for >5 minutes
```

### 10.2 Cooling Systems

#### 10.2.1 Active Cooling

**Peltier Modules**
```
Specifications:
- Cooling power: 2-10W
- Voltage: 5-12V
- Current: 0.5-3A
- Temperature differential: 5-20°C
- Efficiency (COP): 0.3-0.8
- Size: 20×20mm to 40×40mm
```

**Micro Fans**
```
Specifications:
- Size: 15-30mm diameter
- Airflow: 0.5-5 CFM
- Noise: 20-35 dBA
- Power: 0.5-2W
- Voltage: 3.3-5V
- Speed control: PWM
```

#### 10.2.2 Passive Cooling

**Heat Dissipation Fabrics**
```
Properties:
- Thermal conductivity: 0.1-0.5 W/m·K
- Air permeability: >100 mm/s
- Moisture management: Wicking
- Materials: Polyester blends, mesh structures
```

### 10.3 Thermal Comfort Calculations

#### 10.3.1 Heat Transfer

```
Heat Transfer Rate (W) = U × A × ΔT

Where:
U = Overall heat transfer coefficient (5-25 W/m²·K for clothing)
A = Surface area (m²)
ΔT = Temperature difference (°C)

Example:
U = 15 W/m²·K
A = 0.5 m² (chest heating pad)
ΔT = 10°C (35°C target - 25°C ambient)

Heat = 15 × 0.5 × 10 = 75W (required)

With insulation:
Heat = 75W × 0.3 = 22.5W (actual needed)
```

#### 10.3.2 Heating Time

```
Time (seconds) = (m × c × ΔT) / P

Where:
m = Mass (kg)
c = Specific heat capacity (J/kg·K)
ΔT = Temperature change (°C)
P = Heating power (W)

Example:
m = 0.5 kg (fabric + heating element)
c = 1500 J/kg·K (textile average)
ΔT = 15°C (20°C to 35°C)
P = 20W

Time = (0.5 × 1500 × 15) / 20 = 562.5 seconds ≈ 9.4 minutes
```

---

## 11. Sensors and Interaction

### 11.1 Input Sensors

#### 11.1.1 Touch Sensors

**Capacitive Touch**
```
Technology: Capacitance change detection
Sensitivity: 1-100pF range
Response time: <50ms
Sensing through: Up to 5mm fabric
Power consumption: 1-5mA
Implementation: Dedicated IC (e.g., TTP223) or MCU touch pins
```

**Resistive Touch**
```
Technology: Pressure-based resistance change
Activation force: 10-100g
Layers: Conductive fabric + separator + conductive fabric
Power: Only when pressed (<1μA standby)
Durability: >1 million presses
```

#### 11.1.2 Motion Sensors

**Accelerometer**
```
Specifications:
- Range: ±2g to ±16g
- Resolution: 10-16 bit
- Sample rate: 1-6400Hz
- Power: 0.1-3mA (active), <1μA (sleep)
- Interface: I2C or SPI
- Applications: Activity tracking, gesture recognition
```

**Gyroscope**
```
Specifications:
- Range: ±250 to ±2000°/s
- Resolution: 16 bit
- Noise: <0.01°/s/√Hz
- Power: 3-6mA
- Applications: Orientation, rotation detection
```

**IMU (Inertial Measurement Unit)**
```
Combined: Accelerometer + Gyroscope + Magnetometer
DOF: 9-axis (3 acc + 3 gyro + 3 mag)
Fusion: On-chip sensor fusion
Output: Quaternions, Euler angles
Update rate: Up to 1000Hz
```

#### 11.1.3 Biometric Sensors

**Heart Rate (PPG - Photoplethysmography)**
```
Technology: Optical blood flow detection
LEDs: Green (525nm) or IR (940nm)
Photodetector: Photodiode or phototransistor
Sampling: 25-100Hz
Accuracy: ±2 bpm (stationary), ±5 bpm (moving)
Power: 5-20mA continuous
Placement: Wrist, chest, finger
```

**Skin Temperature**
```
Sensor: NTC thermistor or digital (e.g., TMP117)
Range: 0-50°C
Accuracy: ±0.1-0.5°C
Response time: 1-30 seconds
Power: <1mA
```

**Galvanic Skin Response (GSR)**
```
Measurement: Skin conductance
Range: 0.1-20 μS
Application: Stress, emotion detection
Electrodes: Stainless steel or Ag/AgCl
Power: <1mA
```

### 11.2 Environmental Sensors

#### 11.2.1 Ambient Light

```
Sensor: Photodiode or ambient light IC (e.g., BH1750)
Range: 1-100000 lux
Resolution: 1 lux
Response time: <1 second
Power: 0.1-1mA
Applications: Automatic brightness adjustment
```

#### 11.2.2 Temperature/Humidity

```
Sensor: Combined T/H sensor (e.g., SHT31, DHT22)
Temperature:
  - Range: -40 to +125°C
  - Accuracy: ±0.2°C
Humidity:
  - Range: 0-100% RH
  - Accuracy: ±2%
Interface: I2C or 1-wire
Power: 0.3-1.5mA (measurement), <1μA (standby)
```

### 11.3 Haptic Feedback

#### 11.3.1 Vibration Motors

**ERM (Eccentric Rotating Mass)**
```
Specifications:
- Diameter: 6-12mm
- Voltage: 1.5-5V
- Current: 40-100mA
- Vibration frequency: 100-200Hz
- Response time: 50-100ms
- Cost: Low
```

**LRA (Linear Resonant Actuator)**
```
Specifications:
- Size: 7-25mm
- Voltage: 2-3.6V
- Current: 50-120mA
- Resonant frequency: 150-235Hz
- Response time: 10-30ms (faster than ERM)
- Efficiency: Higher than ERM
- Haptic effects: More precise
```

#### 11.3.2 Haptic Patterns

```cpp
// Example haptic patterns
void notificationBuzz() {
    vibrate(200, 100);  // 200ms on, 100ms off
    vibrate(200, 100);
}

void alertPattern() {
    vibrate(500, 200);  // Long buzz
    vibrate(100, 100);  // Short
    vibrate(100, 100);  // Short
}

void heartbeatPattern() {
    vibrate(50, 150);   // Beat
    vibrate(50, 600);   // Beat
}
```

### 11.4 User Interface

#### 11.4.1 Button Interfaces

- Single button: Mode cycling, power on/off
- Two buttons: Up/down, increase/decrease
- Three buttons: Mode, up, down
- Touch zones: Pattern selection, color choice

#### 11.4.2 Gesture Control

**Accelerometer-based Gestures**
```
- Tap: Quick acceleration spike
- Double tap: Two spikes within 500ms
- Shake: Sustained high-frequency movement
- Tilt: Orientation change
- Flip: 180° rotation
```

**Proximity Gestures**
```
- Hand wave: Reflectance change
- Hover: Distance <50mm
- Swipe: Direction of approach/retreat
```

---

## 12. Connectivity

### 12.1 Wireless Protocols

#### 12.1.1 Bluetooth Low Energy (BLE)

```
Standard: Bluetooth 5.0+
Range: 30-50m (open space)
Data rate: 1-2 Mbps
Power consumption:
  - TX: 8-15mA at 0dBm
  - RX: 8-12mA
  - Advertising: 0.5-2mA (periodic)
  - Connection idle: 0.5-3mA
  - Sleep: <1μA

Profile support:
- GATT (Generic Attribute Profile)
- Heart Rate Profile
- Battery Service
- Custom profiles

Advertising interval: 20ms-10.24s
Connection interval: 7.5ms-4s
```

#### 12.1.2 NFC (Near Field Communication)

```
Standard: ISO 14443
Range: <10cm (typically 0-5cm)
Frequency: 13.56 MHz
Data rate: 106-424 kbps
Power: <1mW (tag), 50-150mA (reader)

Applications:
- Pairing with smartphone
- Configuration transfer
- Contactless payment
- Identity verification
```

#### 12.1.3 WiFi

```
Standard: 802.11 b/g/n
Range: 50-100m
Data rate: 54-300 Mbps
Power consumption:
  - TX: 120-300mA
  - RX: 50-100mA
  - Sleep: 0.5-3mA

Use cases:
- High-bandwidth data transfer
- Cloud connectivity
- Firmware updates
- Video streaming (e.g., camera garments)

Limitations:
- High power consumption
- Less suitable for battery-powered wearables
```

### 12.2 Communication Protocols

#### 12.2.1 UART (Serial)

```
Baud rates: 9600-921600 bps
Pins: TX, RX, GND
Voltage: 3.3V or 5V logic
Use: Simple point-to-point communication
Applications: Debugging, simple peripherals
```

#### 12.2.2 I2C (Inter-Integrated Circuit)

```
Speed: 100 kHz (standard), 400 kHz (fast), 1 MHz (fast+)
Pins: SDA (data), SCL (clock), GND
Addressing: 7-bit or 10-bit
Multi-device: Yes (up to 127 devices)
Use: Sensors, displays, EEPROMs
```

#### 12.2.3 SPI (Serial Peripheral Interface)

```
Speed: Up to 10+ MHz
Pins: MOSI, MISO, SCK, CS, GND
Topology: Master-slave
Full-duplex: Yes
Use: High-speed communication (displays, LEDs, SD cards)
```

### 12.3 Data Management

#### 12.3.1 Data Types

```typescript
interface WearableData {
  timestamp: number;
  deviceId: string;

  // Sensor data
  heartRate?: number;        // bpm
  skinTemperature?: number;  // °C
  ambientLight?: number;     // lux
  motion?: {
    accel: [number, number, number];  // g
    gyro: [number, number, number];   // °/s
  };

  // Device status
  batteryLevel: number;      // 0-100%
  mode: string;
  ledPattern: string;
  brightness: number;        // 0-100%
}
```

#### 12.3.2 Data Transmission

**Efficient Data Encoding**
```
Binary format (vs JSON):
- Size reduction: 60-80%
- Parsing speed: 5-10x faster
- Power saving: Proportional to size reduction

Example:
JSON: {"heartRate":72,"temp":36.5,"battery":85}  // 47 bytes
Binary: [0x48, 0x00, 0xB5, 0x01, 0x55]          // 5 bytes
```

---

## 13. Manufacturing and Assembly

### 13.1 Production Methods

#### 13.1.1 Component Attachment

**Sewing**
```
Method: Hand or machine sewing
Materials: Conductive thread for connections
Advantages:
  - Traditional technique
  - No special equipment
  - Repairable
Disadvantages:
  - Time-consuming
  - Skill-dependent
  - Limited precision

Stitch types:
  - Running stitch: Simple connections
  - Backstitch: Stronger mechanical bond
  - Zigzag: Flexible connections
```

**Adhesive Bonding**
```
Adhesives:
  - Textile adhesive: Washable, flexible
  - Epoxy: Strong, rigid
  - Silicone: Waterproof, flexible
  - Conductive adhesive: For electrical connections

Process:
  1. Surface preparation
  2. Adhesive application (screen printing, manual)
  3. Component placement
  4. Curing (heat, UV, or time)

Advantages: Fast, precise, automated
Disadvantages: Less repairable, curing time
```

**Ultrasonic Welding**
```
Process: High-frequency vibration creates heat, bonds materials
Frequency: 20-40 kHz
Applications: Synthetic fabrics (polyester, nylon)
Advantages:
  - Fast (< 1 second)
  - No consumables
  - Strong bond
  - Sealed seams (waterproof)
```

#### 13.1.2 Circuit Integration

**Embroidered Circuits**
```
Method: Computerized embroidery with conductive thread
Precision: ±0.5mm
Trace width: 1-5mm
Resistance: Depends on thread (0.1-30 Ω/m)
Applications:
  - Simple circuits
  - Antennas
  - Touch sensors
```

**Printed Electronics**
```
Methods:
  - Screen printing
  - Inkjet printing
  - 3D printing

Inks:
  - Silver (high conductivity, expensive)
  - Copper (good conductivity, oxidation)
  - Carbon (moderate conductivity, cheap)

Applications:
  - Flexible PCBs
  - Sensors
  - Heating elements
```

**Woven Circuits**
```
Method: Conductive fibers woven into fabric structure
Integration: Warp or weft threads
Complexity: Limited to simple circuits
Advantages:
  - Inherently flexible
  - Durable
  - Washable
```

### 13.2 Assembly Process

#### 13.2.1 Standard Assembly Flow

```
1. Fabric Cutting
   ↓
2. Circuit Integration (embroidery/printing/weaving)
   ↓
3. Component Attachment (LEDs, sensors, etc.)
   ↓
4. Power System Integration
   ↓
5. Functional Testing
   ↓
6. Garment Assembly (sewing pieces together)
   ↓
7. Final Testing & QC
   ↓
8. Waterproofing/Encapsulation (if applicable)
   ↓
9. Packaging
```

#### 13.2.2 Quality Control Points

**Visual Inspection**
- Component orientation
- Solder quality (if applicable)
- Thread tension and routing
- Fabric defects

**Electrical Testing**
- Continuity testing
- Resistance measurement
- Insulation testing
- Functional testing (LEDs, sensors)

**Mechanical Testing**
- Flex testing
- Pull strength
- Abrasion resistance
- Seam strength

**Environmental Testing**
- Water resistance (IP rating)
- Temperature cycling
- Humidity exposure

### 13.3 Waterproofing

#### 13.3.1 IP Ratings

```
IP Code: IP XY
  X = Dust protection (0-6)
  Y = Water protection (0-9K)

Common ratings for wearables:
- IP54: Dust protected, splash resistant
- IP65: Dust tight, water jets
- IP67: Dust tight, temporary immersion (1m, 30min)
- IP68: Dust tight, continuous immersion (manufacturer specified)
```

#### 13.3.2 Waterproofing Methods

**Conformal Coating**
```
Materials: Acrylic, silicone, polyurethane, parylene
Thickness: 25-250 μm
Application: Spray, dip, brush
Protection: Moisture, dust, chemicals
Allows washing: Yes (hand wash typically)
```

**Encapsulation**
```
Materials: Silicone, polyurethane, epoxy
Method: Potting, overmolding
Protection: Complete sealing
Repairability: Difficult
Applications: Critical electronics (battery, controller)
```

**Sealed Connectors**
```
Types: O-ring sealed, overmolded, magnetic
Rating: Up to IP68
Applications: Charging ports, external connections
```

---

## 14. Safety Requirements

### 14.1 Electrical Safety

#### 14.1.1 Voltage Limits

```
Safety Extra Low Voltage (SELV):
- Maximum: 50VAC or 120VDC
- Typical wearable: 3.7-12VDC
- Isolated from mains power

Current Limits:
- Continuous: <5A total
- Per trace: <1A (conductive thread)
- Short circuit protection: Required
```

#### 14.1.2 Insulation

```
Requirements:
- All conductive parts insulated from skin
- Minimum insulation thickness: 0.5mm
- Insulation testing: 500V DC for 1 minute
- No breakdown or excessive leakage (<1mA)
```

#### 14.1.3 Overcurrent Protection

```
Methods:
- Fuse: Thermal or resetable (PTC)
- Current limiting IC
- Microcontroller monitoring

Implementation:
- Battery output: Fuse or BMS
- LED circuits: Current limiting resistors or IC
- Heating elements: Thermal fuse + temperature monitoring
```

### 14.2 Thermal Safety

#### 14.2.1 Temperature Limits

```
Skin Contact Surfaces:
- Continuous: ≤43°C
- Short term (<10 min): ≤45°C
- Peak (<1 min): ≤48°C
- NEVER exceed: 50°C

Internal Components:
- Battery: ≤60°C
- Electronics: Per component specs (typically 85°C)
- Heated elements: ≤65°C (with insulation)
```

#### 14.2.2 Thermal Protection

```
Monitoring:
- NTC thermistors at key points
- Sampling rate: ≥1Hz
- Microcontroller with ADC

Response:
- >43°C: Warning (LED, vibration)
- >45°C: Power reduction
- >48°C: Automatic shutdown
- Thermal fuse: Backup at 60-70°C
```

### 14.3 Chemical Safety

#### 14.3.1 Material Requirements

```
Textiles:
- OEKO-TEX Standard 100 certified
- No harmful dyes or chemicals
- pH: 4.0-7.5 (skin friendly)

Electronics:
- RoHS compliant (lead-free)
- No toxic materials in coatings
- Hypoallergenic when skin contact
```

#### 14.3.2 Biocompatibility

```
Testing Standards:
- ISO 10993: Biological evaluation
- Cytotoxicity testing
- Skin sensitization
- Skin irritation

Materials:
- Prefer: Medical-grade silicone, stainless steel
- Avoid: Nickel (allergies), latex (allergies)
- Test: Any new material in contact with skin
```

### 14.4 Mechanical Safety

#### 14.4.1 Physical Hazards

```
Requirements:
- No sharp edges or points
- Smooth encapsulation of rigid components
- Secure attachment (no detachment hazard)
- No pinch points

Testing:
- Pull test: 50N minimum retention
- Abrasion test: No exposure after 10,000 cycles
- Impact test: No sharp fragments
```

#### 14.4.2 Choking Hazards

```
For garments accessible to children:
- Small parts must pass small parts cylinder test
  (31.75mm diameter, 57.15mm depth)
- Secure attachment of batteries
- No easily detachable components <32mm
```

### 14.5 EMF/RF Safety

#### 14.5.1 RF Exposure

```
SAR (Specific Absorption Rate):
- Limit: 1.6 W/kg (averaged over 1g of tissue) - FCC
- Limit: 2.0 W/kg (averaged over 10g) - ICNIRP
- Typical BLE: <0.1 W/kg (well below limits)
- WiFi: 0.2-1.0 W/kg

Testing:
- Required for devices >10mW radiated power
- Proximity to body: <20cm separation
```

#### 14.5.2 EMC (Electromagnetic Compatibility)

```
Emissions:
- FCC Part 15: Unintentional radiators
- Conducted emissions: <150kHz-30MHz
- Radiated emissions: >30MHz

Immunity:
- ESD: ±4kV contact, ±8kV air
- RF susceptibility: 80MHz-6GHz
- Burst/surge: Per IEC 61000-4-4/5
```

---

## 15. Sustainability

### 15.1 Eco-Friendly Materials

#### 15.1.1 Sustainable Textiles

**Natural Fibers**
```
Organic Cotton:
- No pesticides or synthetic fertilizers
- Biodegradable
- Certification: GOTS (Global Organic Textile Standard)

Bamboo:
- Fast-growing, renewable
- Low water requirements
- Mechanical processing preferred over chemical

Hemp:
- Very sustainable (little water, no pesticides)
- Strong, durable
- Biodegradable
```

**Recycled Synthetics**
```
Recycled Polyester (rPET):
- From plastic bottles or textile waste
- 50-75% less CO2 emissions vs virgin
- Same performance as virgin polyester

Recycled Nylon:
- From fishing nets, carpet waste
- 80% less emissions vs virgin
- High quality and durability
```

#### 15.1.2 Sustainable Electronics

**Biodegradable Electronics**
```
Research areas:
- Cellulose-based substrates
- Organic semiconductors
- Biodegradable conductive inks
- Dissolvable sensors

Status: Emerging technology, limited applications
Timeline: 5-10 years for commercial viability
```

**Conflict-Free Materials**
```
Sourcing:
- Conflict-free minerals (tin, tungsten, tantalum, gold)
- Ethical supply chain verification
- RBA (Responsible Business Alliance) membership
```

### 15.2 Energy Efficiency

#### 15.2.1 Low Power Design

**Microcontroller Selection**
```
Ultra-low power MCUs:
- Active: 50-150 μA/MHz
- Sleep: <1 μA
- Deep sleep: <0.1 μA

Strategies:
- Use sleep modes aggressively
- Wake on interrupt (buttons, sensors)
- Reduce clock speed when possible
- Disable unused peripherals
```

**Efficient LED Usage**
```
Strategies:
- Dynamic brightness: Reduce when not needed
- Time-based dimming: Dimmer at night
- Motion-activated: LEDs on only when worn
- Efficient patterns: Minimize number of lit LEDs

Power savings: 50-90% vs. full brightness continuous
```

#### 15.2.2 Energy Harvesting Integration

**Solar Power**
```
Benefits:
- Extends battery life 2-10x
- Reduces charging frequency
- Sustainable energy source

Implementation:
- Flexible solar cells on shoulders, back
- MPPT (Maximum Power Point Tracking)
- Hybrid with battery for continuous operation
```

**Kinetic Energy**
```
Benefits:
- Always available when worn
- No external dependencies
- Perpetual operation possible for low-power devices

Implementation:
- Piezoelectric at high-movement joints
- Electromagnetic at arms/legs
- 10-100mW typical output
```

### 15.3 Circular Economy

#### 15.3.1 Design for Disassembly

**Modular Design**
```
Principles:
- Electronics in removable modules
- Standard connectors (e.g., JST)
- No permanent adhesives where avoidable
- Clear disassembly instructions

Benefits:
- Easy repair
- Component reuse
- Material recovery
- Upgradability
```

**Fastening Methods**
```
Preferred:
- Snaps
- Hook-and-loop (Velcro)
- Zippers
- Magnetic connectors

Avoid:
- Permanent adhesives
- Ultrasonically welded enclosures
- Non-standard proprietary fasteners
```

#### 15.3.2 End-of-Life Management

**Take-Back Programs**
```
Manufacturer responsibilities:
- Accept returned products
- Proper battery disposal
- Electronic waste recycling
- Material recovery and reuse

Implementation:
- Prepaid return shipping
- Trade-in programs
- Recycling partnerships
```

**Material Recovery**
```
Recyclable components:
- Textiles: 90%+ (if pure material)
- PCBs: Metal recovery (copper, gold)
- Batteries: Lithium, cobalt recovery
- Plastics: Mechanical or chemical recycling

Target: >85% material recovery rate
```

### 15.4 Carbon Footprint

#### 15.4.1 Lifecycle Assessment

**Emission Sources**
```
Materials: 40-60% of total emissions
- Textiles: 5-20 kg CO2e per kg
- Electronics: 50-200 kg CO2e per kg
- Batteries: 50-100 kg CO2e per kWh

Manufacturing: 10-20%
- Energy consumption
- Water usage
- Chemical processing

Transport: 5-15%
- Material shipping
- Product distribution

Use: 5-15%
- Charging energy
- Heating power consumption

End-of-life: 1-5%
- Waste management
- Recycling processes
```

#### 15.4.2 Carbon Reduction Strategies

```
Target: <50% emissions vs. conventional production

Strategies:
1. Renewable energy in manufacturing (30-50% reduction)
2. Recycled materials (20-70% reduction)
3. Local production and sourcing (5-15% reduction)
4. Energy-efficient use (10-30% reduction)
5. Long product life (amortized emissions)
6. Efficient end-of-life processing (5-10% reduction)
```

---

## 16. Testing and Certification

### 16.1 Performance Testing

#### 16.1.1 Electrical Testing

**Battery Performance**
```
Tests:
- Capacity test: Charge/discharge cycles
- Internal resistance: AC impedance
- Cycle life: 300+ cycles to 80% capacity
- Safety: Overcharge, short circuit, crush, puncture

Pass criteria:
- Capacity: >90% of rated
- Resistance: <50% increase over life
- No fire, explosion, or leakage in safety tests
```

**LED Performance**
```
Tests:
- Brightness uniformity: <20% variation
- Color accuracy: ΔE <5 (if specified color)
- Lifespan: >10,000 hours to 70% brightness
- Flickering: <10% modulation at normal operation

Measurement:
- Integrating sphere for luminous flux
- Spectrometer for color
- Long-term aging test
```

#### 16.1.2 Mechanical Testing

**Flex Testing**
```
Method: Cyclic bending at specified radius
Cycles: 10,000-100,000 depending on application
Radius: 10-50mm typical
Frequency: 0.5-2 Hz

Pass criteria:
- No electrical failures
- No visible damage
- Resistance change <10%
```

**Wash Testing**
```
Method: Standard washing machine cycles
Cycles: 20-50 washes
Temperature: 30-40°C
Detergent: Standard, non-corrosive

Pass criteria:
- Full functionality after drying
- IP rating maintained
- No component detachment
- Appearance acceptable
```

**Abrasion Testing**
```
Method: Martindale abrasion tester
Cycles: 10,000-50,000
Pressure: 9-12 kPa

Pass criteria:
- No conductor exposure
- Functional integrity
- Acceptable appearance change
```

#### 16.1.3 Environmental Testing

**Temperature Cycling**
```
Range: -10°C to +50°C
Cycles: 100
Dwell time: 30 minutes per extreme
Transition: <1°C/minute

Pass criteria:
- Full function at all temperatures
- No permanent damage
- Specifications maintained
```

**Humidity Testing**
```
Conditions: 85% RH, 40°C
Duration: 48-168 hours

Pass criteria:
- No corrosion
- Insulation resistance >10MΩ
- Full functionality
```

### 16.2 Safety Certification

#### 16.2.1 Required Certifications

**Electrical Safety**
```
Standards:
- IEC 62368-1: Audio/video equipment
- UL 2089: Wearable lights and displays (if applicable)

Requirements:
- Electrical insulation
- Temperature limits
- Mechanical strength
- Markings and instructions
```

**RF Certification**
```
FCC (USA):
- Part 15: Unintentional radiators
- Part 15C: Intentional radiators (BLE, WiFi)

CE (Europe):
- RED Directive: Radio Equipment
- EMC Directive: Electromagnetic compatibility

IC (Canada):
- RSS-247: WiFi and Bluetooth
```

**Textile Certification**
```
OEKO-TEX Standard 100:
- No harmful substances
- Skin-friendly pH
- Colorfast
- Free of allergens

GOTS (if organic):
- Organic fiber content
- Environmental processing
- Social responsibility
```

#### 16.2.2 Voluntary Certifications

**Sustainability**
```
- GRS (Global Recycle Standard)
- Cradle to Cradle
- Fair Trade
- B Corporation
```

**Quality**
```
- ISO 9001: Quality management
- ISO 14001: Environmental management
```

### 16.3 User Testing

#### 16.3.1 Comfort Testing

```
Participants: 20-50 diverse users
Duration: 2-8 hours of wear
Conditions: Various activities, temperatures

Metrics:
- Comfort rating (1-10 scale)
- Pressure points identification
- Heat/cold spots
- Chafing or irritation
- Weight perception
- Movement restriction

Target: >8/10 average comfort rating
```

#### 16.3.2 Usability Testing

```
Tasks:
- Power on/off
- Mode changes
- Charging connection
- Cleaning/maintenance

Metrics:
- Task success rate (>95%)
- Time to complete
- Error rate (<5%)
- User satisfaction

Observation:
- Intuitive use without manual
- Confusion points
- Improvement suggestions
```

---

## 17. Appendices

### Appendix A: Material Properties

**Conductive Materials**

| Material | Resistivity (Ω·m) | Conductivity (%IACS) | Flexibility | Cost |
|----------|-------------------|---------------------|-------------|------|
| Silver | 1.59×10⁻⁸ | 105 | Poor (pure) | Very High |
| Copper | 1.68×10⁻⁸ | 100 | Moderate | Moderate |
| Gold | 2.44×10⁻⁸ | 70 | Poor | Extremely High |
| Aluminum | 2.82×10⁻⁸ | 61 | Good | Low |
| Stainless Steel | 6.9×10⁻⁷ | 2.5 | Excellent | Low |
| Conductive Polymer | 10⁻³-10⁻⁵ | <0.01 | Excellent | Moderate |

**Textile Properties**

| Property | Cotton | Polyester | Nylon | Wool | Silk |
|----------|--------|-----------|-------|------|------|
| Tensile Strength | 3-5 g/den | 4-6 g/den | 4-7 g/den | 1-2 g/den | 3-5 g/den |
| Moisture Regain | 8.5% | 0.4% | 4% | 14% | 11% |
| Melting Point | Decomposes | 260°C | 220°C | Decomposes | Decomposes |
| Elasticity | Low | Medium | High | High | Low |
| Washability | Excellent | Excellent | Excellent | Delicate | Delicate |

### Appendix B: Power Calculations Reference

**Battery Capacity Conversion**
```
1 Ah = 1000 mAh
Wh = V × Ah
Example: 3.7V 1000mAh = 3.7Wh
```

**LED Power Calculation**
```
Power per LED (W) = Voltage (V) × Current (A)
Total Power (W) = Power per LED × Number of LEDs × Duty Cycle × Brightness

Example:
50 LEDs, 5V, 20mA each, 50% brightness, 30% duty cycle
Power = (5 × 0.02) × 50 × 0.5 × 0.3 = 0.75W
```

**Heating Power Calculation**
```
Power (W) = Voltage² / Resistance
Power (W) = Current² × Resistance
Power (W) = Voltage × Current

Example:
12V, 20Ω heating element
Power = 12² / 20 = 7.2W
```

### Appendix C: Sizing Guidelines

**Battery Sizing**
```
Required Capacity (mAh) = (Average Current × Operating Time) / (DoD × Efficiency)

Example:
100mA average, 10 hour target, 0.8 DoD, 0.9 efficiency
Capacity = (100 × 10) / (0.8 × 0.9) = 1389 mAh
Select: 1500-2000 mAh battery
```

**Conductive Thread Sizing**
```
Minimum Strands = Required Current / Current per Strand

Example:
500mA required, thread rated 100mA per strand
Strands = 500 / 100 = 5 strands minimum
Use: 6-8 strands for safety margin
```

### Appendix D: Common Failure Modes

**Electrical Failures**
```
1. Thread breakage: Excessive flexing, poor routing
   Solution: Larger bend radius, strain relief

2. Corrosion: Moisture, sweat, washing
   Solution: Better waterproofing, corrosion-resistant materials

3. Short circuit: Frayed threads, damaged insulation
   Solution: Proper insulation, protective routing

4. Battery degradation: Overcharge, deep discharge, heat
   Solution: BMS, proper charging, thermal management
```

**Mechanical Failures**
```
1. Component detachment: Weak bonding, mechanical stress
   Solution: Stronger attachment, stress distribution

2. Fabric tearing: Concentrated stress, poor reinforcement
   Solution: Reinforcement patches, load distribution

3. Waterproofing failure: Seal degradation, mechanical damage
   Solution: Robust sealing method, protection from wear
```

### Appendix E: Troubleshooting Guide

**LED Issues**
```
Problem: LEDs not lighting
- Check power voltage and current
- Verify data line connection
- Test with simple single-color pattern
- Check LED orientation

Problem: Flickering
- Insufficient power supply
- Poor ground connection
- EMI interference
- Code timing issues

Problem: Wrong colors
- Incorrect LED type in software
- Damaged LEDs
- Voltage drop in long runs
- Color calibration needed
```

**Power Issues**
```
Problem: Short battery life
- Excessive current draw (measure with ammeter)
- Poor sleep mode implementation
- Battery degradation (check capacity)
- Inefficient code

Problem: Not charging
- Check charger voltage/current
- Verify charging circuit
- Test battery with multimeter
- Check temperature (charging disabled if too hot/cold)
```

### Appendix F: Regulatory Compliance Checklist

**Pre-Market Requirements**
```
☐ Electrical safety testing (IEC 62368-1)
☐ RF certification (FCC, CE, IC if wireless)
☐ Battery safety (IEC 62133, UN 38.3 for shipping)
☐ Textile safety (OEKO-TEX or equivalent)
☐ Flammability testing (16 CFR 1610 if applicable)
☐ Labeling requirements (care instructions, warnings)
☐ User manual (safety instructions, specifications)
☐ Declaration of Conformity (CE)
☐ Country-specific requirements (e.g., CCC for China)
```

### Appendix G: Glossary

**IACS**: International Annealed Copper Standard, reference for electrical conductivity

**DoD**: Depth of Discharge, percentage of battery capacity used

**EMI**: Electromagnetic Interference

**ESD**: Electrostatic Discharge

**GOTS**: Global Organic Textile Standard

**IMU**: Inertial Measurement Unit (accelerometer + gyroscope + magnetometer)

**IP Code**: Ingress Protection rating for dust and water resistance

**LED**: Light Emitting Diode

**LiPo**: Lithium Polymer battery

**MCU**: Microcontroller Unit

**NFC**: Near Field Communication

**NTC**: Negative Temperature Coefficient (thermistor)

**OEKO-TEX**: International textile testing and certification standard

**PCM**: Phase Change Material

**PPG**: Photoplethysmography (optical heart rate sensing)

**PWM**: Pulse Width Modulation

**RoHS**: Restriction of Hazardous Substances

**SAR**: Specific Absorption Rate (RF energy absorption)

**SOC**: State of Charge (battery level)

**SOH**: State of Health (battery degradation)

**TEG**: Thermoelectric Generator

---

## Document History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-01-15 | Initial release | WIA Fashion Technology Research Group |

---

## Contact Information

**WIA (World Certification Industry Association)**
- Website: [wiastandards.com](https://wiastandards.com)
- Email: standards@wiastandards.com
- GitHub: [github.com/WIA-Official/wia-standards](https://github.com/WIA-Official/wia-standards)

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*© 2025 SmileStory Inc. / WIA*
*MIT License*
