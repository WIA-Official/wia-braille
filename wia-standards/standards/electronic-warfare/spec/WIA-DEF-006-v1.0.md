# WIA-DEF-006: Electronic Warfare Specification v1.0

> **Standard ID:** WIA-DEF-006
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Defense & Security Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Electronic Warfare Fundamentals](#2-electronic-warfare-fundamentals)
3. [Electronic Attack (EA)](#3-electronic-attack-ea)
4. [Electronic Protection (EP)](#4-electronic-protection-ep)
5. [Electronic Support (ES)](#5-electronic-support-es)
6. [Spectrum Management](#6-spectrum-management)
7. [Signal Intelligence](#7-signal-intelligence)
8. [Jamming Techniques](#8-jamming-techniques)
9. [Countermeasures](#9-countermeasures)
10. [Implementation Guidelines](#10-implementation-guidelines)
11. [Safety Protocols](#11-safety-protocols)
12. [References](#12-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the comprehensive framework for Electronic Warfare (EW) operations in modern defense systems, covering the full electromagnetic spectrum from HF through EHF frequencies.

### 1.2 Scope

The standard covers:
- Electronic attack operations and techniques
- Electronic protection and defensive measures
- Electronic support and signal intelligence
- Spectrum management and coordination
- Jamming and countermeasure systems
- Safety and regulatory compliance

### 1.3 Philosophy

**弘익人間 (Benefit All Humanity)** - This standard aims to provide defensive electronic warfare capabilities that protect civilian infrastructure, minimize collateral effects, and ensure compliance with international humanitarian law.

### 1.4 Terminology

- **EW**: Electronic Warfare - Military action involving electromagnetic spectrum
- **EA**: Electronic Attack - Offensive EW operations
- **EP**: Electronic Protection - Defensive EW operations
- **ES**: Electronic Support - Intelligence gathering and threat warning
- **SIGINT**: Signals Intelligence - Intelligence from electromagnetic emissions
- **ECM**: Electronic Countermeasures - Techniques to disrupt enemy systems
- **ECCM**: Electronic Counter-Countermeasures - Techniques to resist ECM
- **EMI**: Electromagnetic Interference - Disruption of electronic systems
- **EMCON**: Emission Control - Restriction of electromagnetic emissions

---

## 2. Electronic Warfare Fundamentals

### 2.1 The Electromagnetic Spectrum

The EW spectrum is divided into frequency bands:

```
Band  | Frequency      | Wavelength    | Applications
------|----------------|---------------|------------------
HF    | 3-30 MHz       | 100-10 m      | Long-range comms
VHF   | 30-300 MHz     | 10-1 m        | Air traffic, FM
UHF   | 300-3000 MHz   | 1-0.1 m       | Radar, GPS, TV
SHF   | 3-30 GHz       | 10-1 cm       | Satellite, radar
EHF   | 30-300 GHz     | 10-1 mm       | Mil-sat, radar
```

### 2.2 Fundamental Equations

#### 2.2.1 Friis Transmission Equation

```
Pr = Pt × Gt × Gr × (λ / 4πR)²
```

Where:
- `Pr` = Received power (watts)
- `Pt` = Transmitted power (watts)
- `Gt` = Transmitter antenna gain
- `Gr` = Receiver antenna gain
- `λ` = Wavelength (meters)
- `R` = Distance (meters)

#### 2.2.2 Path Loss

```
PL = 20 log₁₀(d) + 20 log₁₀(f) + 32.45
```

Where:
- `PL` = Path loss (dB)
- `d` = Distance (km)
- `f` = Frequency (MHz)

#### 2.2.3 Link Budget

```
Pr (dBm) = Pt (dBm) + Gt (dBi) + Gr (dBi) - PL (dB) - L (dB)
```

Where:
- `L` = Additional losses (cables, atmospheric, etc.)

### 2.3 Power and Energy

#### 2.3.1 Effective Isotropic Radiated Power (EIRP)

```
EIRP = Pt × Gt
```

Or in dB:
```
EIRP (dBm) = Pt (dBm) + Gt (dBi)
```

#### 2.3.2 Power Flux Density

```
S = EIRP / (4πR²)
```

Where:
- `S` = Power flux density (W/m²)
- `R` = Distance from source (meters)

---

## 3. Electronic Attack (EA)

### 3.1 Jamming Fundamentals

Jamming is the deliberate radiation or reflection of electromagnetic energy to disrupt enemy use of electronic systems.

#### 3.1.1 Jamming-to-Signal Ratio

```
J/S = (Pj × Gj × Gr) / (Ps × Gs × Gr × (Rs/Rj)²)
```

Simplified:
```
J/S = (Pj × Gj) / (Ps × Gs) × (Rs/Rj)²
```

Where:
- `J/S` = Jamming-to-Signal ratio
- `Pj` = Jammer power (watts)
- `Gj` = Jammer antenna gain
- `Ps` = Signal power (watts)
- `Gs` = Signal antenna gain
- `Rs` = Distance to signal source
- `Rj` = Distance to jammer

#### 3.1.2 Effective Radiated Power (ERP) Requirement

For effective jamming, typically require:
```
J/S ≥ 10 dB (for noise jamming)
J/S ≥ 20 dB (for deception jamming)
```

### 3.2 Jamming Techniques

#### 3.2.1 Noise Jamming

- **Barrage Noise**: Wideband noise across entire frequency range
- **Spot Noise**: Narrowband noise at specific frequency
- **Swept Noise**: Noise swept across frequency range

Energy requirement:
```
Ej = Pj × BW × t
```

Where:
- `Ej` = Jamming energy (joules)
- `BW` = Bandwidth (Hz)
- `t` = Time (seconds)

#### 3.2.2 Deception Jamming

- **False Target Generation**: Create fake radar returns
- **Range Gate Pull-Off (RGPO)**: Deceive tracking radars
- **Velocity Gate Pull-Off (VGPO)**: Spoof Doppler tracking

Deception signal:
```
Sd(t) = A × cos(2πft + φ + δ(t))
```

Where:
- `A` = Amplitude
- `f` = Frequency
- `φ` = Phase
- `δ(t)` = Time-varying deception parameter

#### 3.2.3 Protocol Jamming

Target communication protocols:
- **Message Injection**: Insert false messages
- **Timing Disruption**: Interfere with sync signals
- **Control Channel Jamming**: Disrupt command channels

### 3.3 Specific Attack Types

#### 3.3.1 Communications Jamming

Target parameters:
- Frequency: 30 MHz - 3 GHz (typical)
- Power: 10 W - 1 kW
- Bandwidth: 100 kHz - 20 MHz

Effectiveness metric:
```
BER_jamming = Q(√(SNR / (1 + J/S)))
```

Where:
- `BER` = Bit Error Rate
- `Q` = Q-function (error function)
- `SNR` = Signal-to-Noise Ratio

#### 3.3.2 Radar Jamming

Radar equation with jamming:
```
R_jam = R_max × ⁴√(Pj × Gj / (Ps × Gs × σ))
```

Where:
- `R_jam` = Effective jamming range
- `R_max` = Radar maximum range
- `σ` = Target radar cross-section

#### 3.3.3 GPS Spoofing

GPS signal characteristics:
- L1 frequency: 1575.42 MHz
- L2 frequency: 1227.60 MHz
- Power: -130 dBm (received)

Spoofing power requirement:
```
P_spoof > P_GPS + 6 dB (minimum)
P_spoof > P_GPS + 20 dB (effective)
```

---

## 4. Electronic Protection (EP)

### 4.1 Anti-Jamming Techniques

#### 4.1.1 Frequency Hopping Spread Spectrum (FHSS)

Hop rate:
```
R_hop = N_channels / T_frame
```

Where:
- `R_hop` = Hopping rate (hops/second)
- `N_channels` = Number of frequency channels
- `T_frame` = Frame time (seconds)

Processing gain:
```
PG = 10 log₁₀(BW_ss / BW_info)
```

Where:
- `BW_ss` = Spread spectrum bandwidth
- `BW_info` = Information bandwidth

#### 4.1.2 Direct Sequence Spread Spectrum (DSSS)

Processing gain:
```
PG = 10 log₁₀(R_chip / R_data)
```

Where:
- `R_chip` = Chip rate (chips/second)
- `R_data` = Data rate (bits/second)

Jamming margin:
```
JM = PG - L_impl - M_req
```

Where:
- `L_impl` = Implementation loss
- `M_req` = Required margin

#### 4.1.3 Adaptive Nulling

Antenna pattern nulling:
```
G(θ) = G₀ × [1 - Σ(w_i × exp(j × k × d × sin(θ_i)))]
```

Where:
- `G(θ)` = Antenna gain at angle θ
- `w_i` = Weighting coefficient
- `k` = Wave number (2π/λ)
- `d` = Element spacing

### 4.2 Signal Hardening

#### 4.2.1 Error Correction Coding

Coding gain:
```
CG = 10 log₁₀(BER_uncoded / BER_coded)
```

Common codes:
- **Reed-Solomon**: CG = 3-6 dB
- **Convolutional**: CG = 4-7 dB
- **Turbo Codes**: CG = 6-10 dB
- **LDPC**: CG = 8-12 dB

#### 4.2.2 Power Management

Adaptive power control:
```
P_tx(t) = P_min + ΔP × (SINR_target - SINR_measured)
```

Where:
- `P_tx(t)` = Transmit power at time t
- `SINR` = Signal-to-Interference-plus-Noise Ratio

### 4.3 Emission Control (EMCON)

EMCON levels:

| Level | Description | Restrictions |
|-------|-------------|--------------|
| 1 | Maximum radiation | No restrictions |
| 2 | Limited radiation | Non-essential emitters off |
| 3 | Minimal radiation | Only critical systems |
| 4 | Radio silence | All emitters off |

---

## 5. Electronic Support (ES)

### 5.1 Signal Detection

#### 5.1.1 Receiver Sensitivity

```
P_min = kTB + NF + SNR_min
```

Where:
- `k` = Boltzmann constant (1.38 × 10⁻²³ J/K)
- `T` = Temperature (Kelvin)
- `B` = Bandwidth (Hz)
- `NF` = Noise Figure (dB)
- `SNR_min` = Minimum required SNR

#### 5.1.2 Intercept Range

```
R_int = ⁴√(Pt × Gt × Gr × λ² / (16π² × P_min))
```

For EIRP:
```
R_int = √(EIRP × Gr × λ² / (4π × P_min))
```

### 5.2 Direction Finding

#### 5.2.1 Phase Interferometry

Angle of arrival:
```
θ = arcsin(Δφ × λ / (2π × d))
```

Where:
- `θ` = Angle of arrival
- `Δφ` = Phase difference
- `d` = Baseline distance

Accuracy:
```
σ_θ = λ / (2π × d × SNR)
```

#### 5.2.2 Time Difference of Arrival (TDOA)

Position from TDOA:
```
c × Δt_ij = √((x-x_i)² + (y-y_i)²) - √((x-x_j)² + (y-y_j)²)
```

Where:
- `c` = Speed of light
- `Δt_ij` = Time difference between receivers i and j
- `(x,y)` = Target position
- `(x_i,y_i)`, `(x_j,y_j)` = Receiver positions

### 5.3 Signal Analysis

#### 5.3.1 Modulation Recognition

Feature extraction:
- **Instantaneous Amplitude**: `A(t) = |s(t)|`
- **Instantaneous Frequency**: `f(t) = (1/2π) × d/dt[arg(s(t))]`
- **Instantaneous Phase**: `φ(t) = arg(s(t))`

#### 5.3.2 Spectral Analysis

Power Spectral Density:
```
S(f) = lim(T→∞) [1/T × |∫ s(t)e^(-j2πft) dt|²]
```

Resolution:
```
Δf = 1 / T_obs
```

Where `T_obs` = Observation time

---

## 6. Spectrum Management

### 6.1 Frequency Allocation

#### 6.1.1 Dynamic Spectrum Access

Channel availability:
```
P_avail(f,t) = 1 - P_occupied(f,t)
```

Spectrum efficiency:
```
η = Σ(BW_used × t_used) / (BW_total × t_total)
```

#### 6.1.2 Cognitive Radio

Sensing period:
```
T_sense = 1 / (f_sense)
```

Detection probability:
```
P_d = Q((Q⁻¹(P_fa) - SNR × √N) / √(1 + 2×SNR))
```

Where:
- `P_fa` = Probability of false alarm
- `N` = Number of samples

### 6.2 Interference Management

#### 6.2.1 Co-channel Interference

Carrier-to-Interference Ratio:
```
C/I = Pt × Gt × Gr / (Pi × Gi × Gr × (Rs/Ri)²)
```

Where:
- `Pi` = Interferer power
- `Ri` = Distance to interferer

#### 6.2.2 Adjacent Channel Interference

```
ACIR = ACLR + ACS
```

Where:
- `ACIR` = Adjacent Channel Interference Ratio
- `ACLR` = Adjacent Channel Leakage Ratio
- `ACS` = Adjacent Channel Selectivity

---

## 7. Signal Intelligence

### 7.1 SIGINT Collection

#### 7.1.1 Collection Parameters

| Parameter | Definition | Typical Range |
|-----------|------------|---------------|
| Frequency | Signal center frequency | 3 MHz - 300 GHz |
| Bandwidth | Signal bandwidth | 1 kHz - 100 MHz |
| Power | Received signal power | -140 to -30 dBm |
| Duration | Signal duration | 1 ms - continuous |
| PRF | Pulse repetition frequency | 100 Hz - 100 kHz |
| PW | Pulse width | 0.1 - 1000 μs |

#### 7.1.2 Signal Classification

Decision tree:
1. **Bandwidth**: Narrowband (<1 MHz) vs. Wideband (>1 MHz)
2. **Modulation**: AM, FM, PM, Digital
3. **Pulse**: CW, Pulsed, Chirped
4. **Application**: Comm, Radar, Datalink, Telemetry

### 7.2 Emitter Identification

#### 7.2.1 Parametric Fingerprinting

Features:
- Carrier frequency stability: `Δf/f`
- Phase noise: `L(f) = 10 log₁₀(P_sideband / P_carrier)`
- Spurious emissions
- Modulation characteristics

#### 7.2.2 Specific Emitter Identification (SEI)

Unique features:
```
F = {f₁, f₂, ..., f_n}
```

Matching metric:
```
d(F_x, F_y) = √(Σ(f_xi - f_yi)² × w_i)
```

Where `w_i` = feature weights

---

## 8. Jamming Techniques

### 8.1 Power Calculations

#### 8.1.1 Self-Screening Jammer

Required power:
```
Pj = Ps × (Rs/Rj)² × (Gs/Gj) × J/S_required
```

#### 8.1.2 Stand-off Jammer

Burn-through range:
```
R_bt = ⁴√(Pt × Gt² × λ² × σ / (64π³ × P_min × J/S))
```

### 8.2 Waveform Design

#### 8.2.1 Noise Generation

White Gaussian Noise:
```
n(t) ~ N(0, σ²)
```

Power spectral density:
```
N₀ = Pj / BW
```

#### 8.2.2 Chirp Jamming

Linear chirp:
```
s(t) = A × cos(2πf₀t + πkt²)
```

Where:
- `k` = Chirp rate (Hz/s)
- `BW = k × T`

---

## 9. Countermeasures

### 9.1 Anti-Jamming

#### 9.1.1 Spatial Filtering

Beamforming weights:
```
w = (R⁻¹ × s) / (s^H × R⁻¹ × s)
```

Where:
- `R` = Covariance matrix
- `s` = Steering vector

#### 9.1.2 Temporal Filtering

Wiener filter:
```
H(f) = S_ss*(f) / (S_ss(f) + S_nn(f))
```

Where:
- `S_ss(f)` = Signal power spectrum
- `S_nn(f)` = Noise power spectrum

### 9.2 Radar ECCM

#### 9.2.1 Pulse Compression

Compression ratio:
```
CR = T × BW
```

Processing gain:
```
PG = 10 log₁₀(CR)
```

#### 9.2.2 Moving Target Indication (MTI)

Clutter rejection:
```
MTI_improvement = 20 log₁₀(v_clutter / v_target)
```

---

## 10. Implementation Guidelines

### 10.1 System Architecture

#### 10.1.1 EW System Components

```
┌─────────────┐
│   Antenna   │
└──────┬──────┘
       │
┌──────▼──────┐
│  RF Front   │
│    End      │
└──────┬──────┘
       │
┌──────▼──────┐
│   Signal    │
│  Processing │
└──────┬──────┘
       │
┌──────▼──────┐
│  Analysis   │
│   Engine    │
└──────┬──────┘
       │
┌──────▼──────┐
│   Control   │
│   System    │
└─────────────┘
```

#### 10.1.2 API Interface

```typescript
interface EWOperation {
  type: 'EA' | 'EP' | 'ES';
  frequency: number;        // Hz
  bandwidth: number;        // Hz
  power: number;           // watts
  duration: number;        // seconds
  mode: string;
}

interface JammingParams {
  targetFrequency: number;  // MHz
  targetDistance: number;   // meters
  targetPower: number;      // watts
  requiredJSRatio: number; // dB
  jammingType: 'noise' | 'deception' | 'protocol';
}

interface SIGINTResult {
  frequency: number;
  bandwidth: number;
  modulation: string;
  signalType: string;
  emitterLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  confidence: number;      // 0-1
}
```

### 10.2 Data Formats

#### 10.2.1 Signal Description

```json
{
  "signal_id": "SIG-20251227-001",
  "timestamp": "2025-12-27T12:00:00Z",
  "frequency": 2450.0,
  "bandwidth": 20.0,
  "power": -65.0,
  "modulation": "OFDM",
  "duration": 1.5,
  "location": {
    "latitude": 37.5665,
    "longitude": 126.9780,
    "altitude": 100
  },
  "classification": {
    "type": "communication",
    "protocol": "802.11ac",
    "confidence": 0.95
  }
}
```

### 10.3 Error Handling

Standard error codes:

| Code | Meaning | Action |
|------|---------|--------|
| EW001 | Insufficient power | Increase transmitter power |
| EW002 | Frequency out of range | Adjust frequency |
| EW003 | Jamming ineffective | Change technique |
| EW004 | Spectrum conflict | Coordinate frequencies |
| EW005 | Safety violation | Emergency shutdown |
| EW006 | Equipment failure | System diagnostics |

---

## 11. Safety Protocols

### 11.1 RF Safety

#### 11.1.1 Maximum Permissible Exposure (MPE)

```
MPE = 180/f² (mW/cm²) for 0.3-3 GHz
MPE = 1.0 (mW/cm²) for 3-15 GHz
MPE = f/15 (mW/cm²) for 15-300 GHz
```

Where `f` = frequency in MHz

#### 11.1.2 Safe Distance

```
R_safe = √(EIRP / (4π × MPE))
```

### 11.2 Operational Safety

1. **Pre-operation Checks**:
   - Verify frequency clearance
   - Confirm no civilian interference
   - Check safety zones
   - Validate ROE compliance

2. **During Operation**:
   - Monitor power levels
   - Track spectrum usage
   - Log all activities
   - Maintain safety margins

3. **Post-operation**:
   - Shutdown verification
   - Effect assessment
   - Incident reporting
   - Equipment inspection

### 11.3 Regulatory Compliance

Adhere to:
- ITU Radio Regulations
- National spectrum policies
- Military frequency allocation
- International humanitarian law

---

## 12. References

### 12.1 Technical Standards

1. IEEE 802.11 - Wireless LAN
2. IEEE 802.16 - Broadband Wireless
3. ITU-R SM.1138 - Spectrum monitoring
4. MIL-STD-461 - EMI requirements
5. NATO STANAG 4357 - EW terminology

### 12.2 Scientific Literature

1. Adamy, D. (2009). "EW 101: A First Course in Electronic Warfare"
2. Poisel, R. (2013). "Modern Communications Jamming"
3. Schleher, D.C. (1999). "Electronic Warfare in the Information Age"
4. Wiley, R.G. (2006). "ELINT: The Interception and Analysis of Radar Signals"

### 12.3 Physical Constants

| Constant | Symbol | Value |
|----------|--------|-------|
| Speed of light | c | 2.998 × 10⁸ m/s |
| Boltzmann constant | k | 1.381 × 10⁻²³ J/K |
| Standard temperature | T₀ | 290 K |
| Free space impedance | Z₀ | 377 Ω |

### 12.4 WIA Standards

- WIA-INTENT: Intent-based system control
- WIA-OMNI-API: Universal API gateway
- WIA-SOCIAL: Coordination protocols
- WIA-QUANTUM: Quantum-resistant communications

---

## Appendix A: Example Calculations

### A.1 Communications Jamming

```
Given:
- Target frequency: 2400 MHz
- Target power: 100 watts
- Target antenna gain: 3 dBi (2.0 linear)
- Target distance: 10 km
- Jammer antenna gain: 6 dBi (4.0 linear)
- Required J/S: 20 dB (100 linear)

Calculation:
Pj = Ps × (Rs/Rj)² × (Gs/Gj) × J/S
Pj = 100 × (10000/5000)² × (2.0/4.0) × 100
Pj = 100 × 4 × 0.5 × 100
Pj = 20,000 watts (20 kW)
```

### A.2 Intercept Range

```
Given:
- EIRP: 1000 watts
- Receiver gain: 10 dBi (10 linear)
- Frequency: 10 GHz (λ = 0.03 m)
- Receiver sensitivity: -100 dBm (1 × 10⁻¹³ W)

Calculation:
R_int = √(EIRP × Gr × λ² / (4π × P_min))
R_int = √(1000 × 10 × 0.03² / (4π × 1×10⁻¹³))
R_int ≈ 260 km
```

---

**弘익人間 (홍익인간) · Benefit All Humanity**

*WIA-DEF-006 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
