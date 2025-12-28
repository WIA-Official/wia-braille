# WIA-COMM-013: Data Center Specification v1.0

> **Standard ID:** WIA-COMM-013
> **Version:** 1.0.0
> **Published:** 2025-12-26
> **Status:** Active
> **Authors:** WIA Data Center Infrastructure Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Tier Classification System](#2-tier-classification-system)
3. [Power Infrastructure](#3-power-infrastructure)
4. [Cooling Systems](#4-cooling-systems)
5. [Network Architecture](#5-network-architecture)
6. [Rack Design and Layout](#6-rack-design-and-layout)
7. [Physical Security](#7-physical-security)
8. [Fire Suppression](#8-fire-suppression)
9. [DCIM and Monitoring](#9-dcim-and-monitoring)
10. [Edge Data Centers](#10-edge-data-centers)
11. [Green Data Centers](#11-green-data-centers)
12. [Disaster Recovery](#12-disaster-recovery)
13. [Implementation Guidelines](#13-implementation-guidelines)
14. [References](#14-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines comprehensive standards for data center design, construction, and operation, covering physical infrastructure, power systems, cooling, networking, security, and management across all facility types from edge to hyperscale.

### 1.2 Scope

The standard covers:
- Tier I-IV classification and compliance requirements
- Electrical power distribution and redundancy
- Mechanical cooling and thermal management
- Network topology and connectivity
- Physical and logical security measures
- Monitoring, automation, and DCIM systems
- Edge computing and distributed facilities
- Sustainability and green energy practices

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - Data centers are the foundation of modern digital infrastructure. This standard promotes efficient, reliable, and sustainable facilities that serve society while minimizing environmental impact.

### 1.4 Terminology

- **PUE**: Power Usage Effectiveness (Total Facility Power / IT Equipment Power)
- **CRAC**: Computer Room Air Conditioner
- **CRAH**: Computer Room Air Handler
- **UPS**: Uninterruptible Power Supply
- **PDU**: Power Distribution Unit
- **SLA**: Service Level Agreement
- **DCIM**: Data Center Infrastructure Management
- **kW**: Kilowatt (1,000 watts)
- **MW**: Megawatt (1,000 kilowatts)
- **N+1**: One redundant component beyond operational requirement
- **2N**: Fully redundant parallel systems

---

## 2. Tier Classification System

### 2.1 Tier Standards Overview

Data center tiers define reliability, redundancy, and availability levels:

```
┌──────────┬───────────────────────┬──────────────┬──────────────┐
│   Tier   │   Classification      │ Availability │ Downtime/yr  │
├──────────┼───────────────────────┼──────────────┼──────────────┤
│ Tier I   │ Basic Capacity        │   99.671%    │  28.8 hours  │
│ Tier II  │ Redundant Capacity    │   99.741%    │  22.0 hours  │
│ Tier III │ Concurrent Maintain.  │   99.982%    │   1.6 hours  │
│ Tier IV  │ Fault Tolerant        │   99.995%    │   0.4 hours  │
└──────────┴───────────────────────┴──────────────┴──────────────┘
```

### 2.2 Tier I: Basic Capacity

**Requirements:**
- Single, non-redundant distribution path
- Single capacity components
- No redundant components
- Vulnerable to planned and unplanned outages

**Infrastructure:**
- Single UPS module
- Single generator (N configuration)
- Single path for power and cooling
- No concurrent maintenance capability

**Use Cases:**
- Small businesses
- Development environments
- Non-critical workloads

### 2.3 Tier II: Redundant Capacity Components

**Requirements:**
- Single distribution path
- Redundant capacity components (N+1)
- Partial redundancy
- Vulnerable to planned outages

**Infrastructure:**
- Multiple UPS modules (N+1)
- Multiple generators (N+1)
- Single active power path
- Maintenance requires partial shutdown

**Use Cases:**
- SMB data centers
- Regional offices
- Low-criticality applications

### 2.4 Tier III: Concurrently Maintainable

**Requirements:**
- Multiple active distribution paths (1 active, 1 passive)
- N+1 redundancy
- Concurrent maintenance without downtime
- Protected against planned outages

**Infrastructure:**
- Dual-powered equipment
- Multiple UPS systems (N+1 per path)
- Multiple generators (N+1)
- Dual power distribution
- 72 hours of fuel for generators

**Use Cases:**
- Enterprise data centers
- E-commerce platforms
- Financial services
- Healthcare systems

### 2.5 Tier IV: Fault Tolerant

**Requirements:**
- Multiple active distribution paths (2N or 2N+1)
- Fault-tolerant capability
- Concurrent maintenance and fault tolerance
- Protected against planned and unplanned outages

**Infrastructure:**
- Fully redundant systems (2N+1)
- Multiple independent power paths
- Multiple independent cooling systems
- Compartmentalized architecture
- 96 hours of fuel storage minimum
- Automatic failover mechanisms

**Use Cases:**
- Mission-critical applications
- Government facilities
- Major financial institutions
- Large-scale cloud providers

---

## 3. Power Infrastructure

### 3.1 Electrical Distribution Architecture

```
Power Flow (Top to Bottom):

1. Utility Service
   ├─ Primary Feed (Grid A)
   └─ Secondary Feed (Grid B) [Tier III+]

2. Automatic Transfer Switch (ATS)
   ├─ Monitors utility power
   └─ Switches to generator on failure

3. Generator
   ├─ Diesel/Natural Gas
   ├─ Capacity: 125-150% of peak load
   └─ Startup time: <10 seconds

4. UPS (Uninterruptible Power Supply)
   ├─ Online double-conversion
   ├─ Battery runtime: 5-15 minutes
   └─ Efficiency: 94-98%

5. STS (Static Transfer Switch) [Tier III+]
   ├─ Sub-millisecond transfer
   └─ Dual UPS path synchronization

6. PDU (Power Distribution Unit)
   ├─ Primary distribution (480V)
   └─ Secondary distribution (208V/120V)

7. RPP (Remote Power Panel)
   └─ Zone-level distribution

8. Rack PDU
   └─ Server-level power (120V/208V)
```

### 3.2 UPS Sizing and Configuration

**Capacity Calculation:**
```
UPS Capacity (kVA) = (Total IT Load + Cooling + Lighting) / Efficiency / Power Factor × Safety Margin

Example:
IT Load: 1000 kW
Cooling: 200 kW (PUE 1.2)
Lighting: 20 kW
Efficiency: 0.96
Power Factor: 0.9
Safety Margin: 1.25

UPS Capacity = (1000 + 200 + 20) / 0.96 / 0.9 × 1.25
             = 1768 kVA
```

**UPS Topologies:**
1. **N Configuration**: Single UPS, no redundancy
2. **N+1 Configuration**: N UPS modules + 1 redundant
3. **2N Configuration**: Fully redundant parallel systems
4. **2N+1 Configuration**: Dual systems + extra redundancy

### 3.3 Generator Systems

**Specifications:**
- **Fuel Type**: Diesel (most common), natural gas, propane
- **Capacity**: 125-150% of total facility load
- **Startup Time**: <10 seconds from utility failure
- **Transfer Time**: <200ms with UPS bridge
- **Runtime**: 48-96 hours at full load
- **Maintenance**: Monthly tests, annual full-load tests

**Fuel Storage:**
```
Tier III: 72 hours minimum
Tier IV: 96 hours minimum
Hyperscale: 7-14 days typical

Fuel Calculation:
Fuel Consumption (gal/hr) = Load (kW) × Fuel Factor
(Diesel fuel factor: ~0.06-0.08 gal/hr/kW at full load)

Example (1 MW load, 96 hours):
1000 kW × 0.07 gal/hr/kW × 96 hrs = 6,720 gallons
```

### 3.4 Power Monitoring

**Key Metrics:**
- **Voltage**: Monitor phase voltage (480V/208V/120V)
- **Current**: Track amperage per circuit
- **Power Factor**: Maintain >0.95 for efficiency
- **Harmonics**: Keep THD <5%
- **Frequency**: 60 Hz ±0.1 Hz (US) or 50 Hz (EU)

---

## 4. Cooling Systems

### 4.1 PUE (Power Usage Effectiveness)

**Definition:**
```
PUE = Total Facility Power / IT Equipment Power

Example:
Total Facility Power: 1200 kW
IT Equipment Power: 1000 kW
PUE = 1200 / 1000 = 1.2
```

**Industry Benchmarks:**
- **Legacy Data Centers**: PUE 1.8-2.0
- **Typical Enterprise**: PUE 1.5-1.7
- **Modern Efficient**: PUE 1.2-1.4
- **Hyperscale Best Practice**: PUE 1.1-1.15
- **Theoretical Minimum**: PUE 1.0

**Google Fleet Average (2024)**: PUE 1.10
**Facebook/Meta Average**: PUE 1.09

### 4.2 Cooling Technologies

#### 4.2.1 CRAC (Computer Room Air Conditioner)

```
Specifications:
- Capacity: 10-30 tons (35-105 kW)
- Technology: Direct expansion (DX)
- Refrigerant: R410A, R134a, or eco-friendly
- COP (Coefficient of Performance): 2.5-3.5
- Layout: Perimeter or in-row placement
- Control: Thermostat or BMS integration

Advantages:
+ Self-contained system
+ Easier installation
+ Lower upfront cost

Disadvantages:
- Lower efficiency than CRAH
- Refrigerant leaks
- Shorter lifespan
```

#### 4.2.2 CRAH (Computer Room Air Handler)

```
Specifications:
- Capacity: 20-100 tons (70-350 kW)
- Technology: Chilled water
- Water temp: 7-12°C (45-54°F)
- COP: 3.5-5.0
- Fan control: Variable speed (VFD)

Advantages:
+ Higher efficiency
+ Centralized chiller plant
+ Better scalability

Disadvantages:
- Requires chilled water infrastructure
- Higher upfront cost
- More complex piping
```

#### 4.2.3 In-Row Cooling

```
Placement: Between server racks
Capacity: 20-40 kW per unit
Ideal for: High-density racks (10-30 kW)

Benefits:
+ Localized cooling
+ Shorter airflow path
+ Better hot spot management
+ Supports higher rack densities
```

#### 4.2.4 Liquid Cooling

**Direct-to-Chip (Cold Plate):**
```
Working Principle:
- Liquid flows through cold plates on CPUs/GPUs
- Heat transferred to liquid
- Liquid cooled in heat exchanger
- Recirculated

Specifications:
- Coolant: Water, glycol, or dielectric fluid
- Temperature: 25-40°C
- Rack density: 50-100 kW
- PUE improvement: 1.05-1.15

Use Cases:
- HPC (High-Performance Computing)
- AI/ML training
- GPU clusters
```

**Immersion Cooling:**
```
Types:
1. Single-phase: Servers submerged, fluid doesn't boil
2. Two-phase: Fluid boils, vapor condenses

Specifications:
- Dielectric fluid (non-conductive)
- Rack density: 100-250 kW
- PUE: <1.05
- No fans required

Advantages:
+ Highest density
+ Ultra-low PUE
+ Reduced noise
+ Better reliability (no dust)

Challenges:
- High upfront cost
- Maintenance complexity
- Limited vendor support
```

### 4.3 Airflow Management

**Hot Aisle / Cold Aisle Configuration:**
```
Layout:
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Rack   │  │  Rack   │  │  Rack   │
│ ◄─────  │  │ ◄─────  │  │ ◄─────  │  Cold Aisle
└─────────┘  └─────────┘  └─────────┘
     ▲            ▲            ▲
     │            │            │
     │   Hot Aisle (Contained) │
     │            │            │
     ▼            ▼            ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│  ─────► │  │  ─────► │  │  ─────► │
│  Rack   │  │  Rack   │  │  Rack   │
└─────────┘  └─────────┘  └─────────┘

Containment Options:
1. Cold Aisle Containment (CAC): Enclose cold aisle
2. Hot Aisle Containment (HAC): Enclose hot aisle (more efficient)
3. Chimney/Duct: Exhaust heat directly to return
```

**Best Practices:**
- **Rack fronts** face cold aisle
- **Blanking panels** fill empty rack spaces
- **Cable management** avoid blocking airflow
- **Floor tiles** perforate in cold aisle only (60% open area)
- **Ceiling height** 10-12 feet minimum
- **Raised floor** 24-36 inches for optimal airflow

### 4.4 Free Cooling (Economizers)

**Air-Side Economizer:**
```
Use outside air when ambient < 15°C (59°F)
PUE reduction: 0.1-0.3
Annual savings: 30-60% cooling energy
```

**Water-Side Economizer:**
```
Use cooling tower water directly
Wet-bulb temp < 10°C (50°F)
PUE reduction: 0.1-0.2
More reliable than air-side
```

---

## 5. Network Architecture

### 5.1 Spine-Leaf Topology

```
Modern Standard Architecture:

        [Core/Spine Layer]
      ┌──────┬──────┬──────┐
      │Spine1│Spine2│Spine3│ (40/100G uplinks)
      └──┬───┴───┬──┴───┬──┘
         │       │      │
    ┌────┴───────┴──────┴────┐
    │                         │
[Leaf/ToR Layer]         [Leaf/ToR Layer]
┌─────┬─────┬─────┐      ┌─────┬─────┐
│Leaf1│Leaf2│Leaf3│      │Leaf4│Leaf5│ (10/25G downlinks)
└──┬──┴──┬──┴──┬──┘      └──┬──┴──┬──┘
   │     │     │            │     │
 Racks Racks Racks        Racks Racks

Characteristics:
✓ Non-blocking bandwidth
✓ Predictable latency
✓ East-west traffic optimization
✓ Horizontal scalability
✓ No spanning tree required
```

### 5.2 Network Equipment

**Top-of-Rack (ToR) Switches:**
- **Ports**: 48-64 × 10/25GbE downlinks
- **Uplinks**: 4-8 × 40/100GbE to spine
- **Redundancy**: Dual switches per rack (Tier III+)
- **Protocols**: BGP, VXLAN, EVPN

**Spine Switches:**
- **Ports**: 32-64 × 40/100/400GbE
- **Capacity**: 12.8-25.6 Tbps
- **Redundancy**: N+1 or 2N configuration
- **Buffers**: Deep buffers for incast

**Core Routers:**
- **Capacity**: 100+ Tbps
- **Uplinks**: Multiple 100/400GbE WAN
- **Redundancy**: Geographic diversity
- **Features**: DDoS protection, traffic shaping

### 5.3 Cabling Standards

| Type | Use Case | Distance | Bandwidth |
|------|----------|----------|-----------|
| Cat6A | Server to ToR | 100m | 10GbE |
| Cat8 | High-density ToR | 30m | 25/40GbE |
| Single-Mode Fiber | Rack to spine | 10km+ | 100GbE+ |
| Multi-Mode Fiber (OM4) | Rack to spine | 550m | 100GbE |
| DAC (Direct Attach Copper) | In-rack | 7m | 100GbE |

### 5.4 Software-Defined Networking (SDN)

**Components:**
- **Controller**: Centralized network management (OpenFlow, NETCONF)
- **Orchestration**: Automated provisioning
- **Telemetry**: Real-time monitoring
- **Automation**: Intent-based networking

**Benefits:**
- Faster deployment
- Network virtualization
- Improved troubleshooting
- Better resource utilization

---

## 6. Rack Design and Layout

### 6.1 Standard Rack Specifications

```
Standard 19-inch Rack:
- Height: 42U-48U
- Width: 19 inches (482.6 mm)
- Depth: 36-48 inches (914-1219 mm)
- Weight capacity: 1000-3000 lbs (450-1360 kg)
- Power: 2-4 PDUs per rack
```

### 6.2 Rack Density Classifications

| Density Class | Power per Rack | Typical Workload |
|---------------|----------------|------------------|
| Low | 2-5 kW | Storage, networking |
| Medium | 5-10 kW | General servers |
| High | 10-20 kW | Virtualization, database |
| Very High | 20-30 kW | GPU, HPC |
| Ultra-High | 30-100 kW | AI/ML, liquid-cooled |

### 6.3 Floor Layout Planning

**Capacity Calculation:**
```
Total Raised Floor Area: 10,000 sq ft
Racks: 40 (arranged in 5 rows × 8 racks)
Rack footprint: 2 ft × 4 ft = 8 sq ft
Aisle width: 4 ft (cold), 5 ft (hot)
Support space: 30% (power, cooling, walkways)

Usable area = 10,000 × 0.7 = 7,000 sq ft
Rack area = 40 × 8 = 320 sq ft
Utilization = 320 / 7,000 = 4.6%
```

**Best Practices:**
- **Cold aisle width**: 3-4 feet
- **Hot aisle width**: 4-5 feet
- **Equipment spacing**: 6-inch clearance
- **Emergency exits**: <200 feet from any point
- **Loading dock**: Direct access to data hall

---

## 7. Physical Security

### 7.1 Security Layers

```
Defense in Depth:

Layer 1: Perimeter
├─ Fencing (8-10 ft with barbed wire)
├─ Security lighting
├─ CCTV cameras (360° coverage)
└─ Vehicle barriers (bollards)

Layer 2: Building Entry
├─ Security guard/reception
├─ Mantrap/turnstiles
├─ ID verification
└─ Visitor logging

Layer 3: Data Hall Entry
├─ Biometric access (fingerprint/iris)
├─ Two-factor authentication
├─ Keycards (RFID/NFC)
└─ PIN codes

Layer 4: Cage/Suite
├─ Individual customer cages
├─ Locked cabinets
└─ Surveillance cameras

Layer 5: Server Level
├─ Locked racks
├─ Individual rack access logs
└─ Tamper detection
```

### 7.2 Access Control

**Multi-Factor Authentication:**
1. **Something you have**: Keycard, token
2. **Something you know**: PIN, password
3. **Something you are**: Biometric (fingerprint, iris, facial)

**Access Levels:**
- **Level 1**: Public areas (lobby, restrooms)
- **Level 2**: Office areas
- **Level 3**: Data hall viewing
- **Level 4**: Customer cage access
- **Level 5**: Rack-level access (escort required)

### 7.3 Surveillance

**CCTV Coverage:**
- **Exterior**: 24/7 recording, 90-day retention
- **Entry points**: All doors, mantraps
- **Data halls**: 360° coverage, no blind spots
- **Resolution**: 1080p minimum, 4K preferred
- **Storage**: Redundant NVR systems

---

## 8. Fire Suppression

### 8.1 Detection Systems

**Early Warning Fire Detection (EWFD):**
- **VESDA (Very Early Smoke Detection Apparatus)**
- **Air sampling**: Continuous monitoring
- **Sensitivity**: 100x more sensitive than standard smoke detectors
- **Alert levels**: Alert, Action, Fire 1, Fire 2

### 8.2 Suppression Systems

#### 8.2.1 Clean Agent Systems

**FM-200 (HFC-227ea):**
```
Characteristics:
- Discharge time: <10 seconds
- Concentration: 7-9%
- Safe for electronics
- Safe for occupied spaces
- Hold time: 10 minutes minimum
```

**Novec 1230:**
```
Characteristics:
- Environmentally friendly (0 ODP, low GWP)
- Concentration: 4-6%
- No residue
- Safe for electronics and people
```

**Inergen (IG-541):**
```
Composition: 52% N₂, 40% Ar, 8% CO₂
Characteristics:
- Natural gases
- Concentration: 35-43%
- Environmentally safe
- Requires larger storage
```

#### 8.2.2 Water-Based Systems

**Pre-Action Sprinkler:**
```
Activation:
1. Fire detected (smoke/heat)
2. Pre-action valve opens
3. Water fills pipes
4. Sprinkler head activates (heat)
5. Water discharge

Benefits:
+ Prevents accidental discharge
+ Early warning
+ Time for manual suppression
```

**Dry Pipe Sprinkler:**
```
Use Case: Unheated spaces, freezing risk
Pros: No water in pipes (prevents freezing)
Cons: Slower activation than wet pipe
```

### 8.3 Best Practices

- **Zoning**: Separate zones for data hall, UPS room, generator room
- **EPO (Emergency Power Off)**: Large red button near exits
- **Manual override**: Ability to delay suppression (30-60 sec)
- **Exhaust fans**: Smoke removal after suppression
- **Regular testing**: Quarterly for detection, annual for suppression

---

## 9. DCIM and Monitoring

### 9.1 DCIM (Data Center Infrastructure Management)

**Core Functions:**
1. **Asset Management**: Track all equipment (servers, racks, cables)
2. **Capacity Planning**: Power, cooling, space utilization
3. **Environmental Monitoring**: Temperature, humidity, airflow
4. **Power Monitoring**: Real-time power consumption, PUE
5. **Change Management**: Workflow automation
6. **Visualization**: 3D floor plans, thermal maps

**Leading Platforms:**
- Schneider Electric (EcoStruxure)
- Vertiv (Trellis)
- Nlyte
- Sunbird (dcTrack)
- CA (Nimsoft)

### 9.2 Environmental Monitoring

**Key Sensors:**
```
Temperature Sensors:
- Placement: Every 10 feet, top and bottom of racks
- Accuracy: ±0.5°C
- Range: 0-50°C

Humidity Sensors:
- Placement: Every 20 feet
- Accuracy: ±2% RH
- Range: 10-90% RH

Airflow Sensors:
- Placement: Cold aisle, hot aisle, CRAC/CRAH
- Measurement: CFM (cubic feet per minute)

Water Leak Detection:
- Placement: Under raised floor, around CRAC/CRAH
- Type: Rope sensor or spot detector
```

### 9.3 Power Monitoring

**Metering Points:**
```
Hierarchy:
1. Utility meter → Total facility power
2. UPS input/output → UPS efficiency
3. PDU → Distribution efficiency
4. Rack PDU → Rack-level power
5. Outlet level → Individual device power

Metrics:
- Real power (kW)
- Apparent power (kVA)
- Power factor
- Voltage, current, frequency
- Energy consumption (kWh)
```

### 9.4 Thermal Management

**Thermal Mapping:**
- **CFD (Computational Fluid Dynamics)**: Simulate airflow
- **Thermal cameras**: Identify hot spots
- **RTU (Real-Time Updates)**: Continuous monitoring

**Thresholds:**
- **Cold aisle**: 18-24°C (64-75°F)
- **Hot aisle**: <38°C (100°F)
- **Differential**: 10-15°C (18-27°F)
- **Alarm**: >27°C cold aisle, >40°C hot aisle

---

## 10. Edge Data Centers

### 10.1 Edge vs. Centralized

| Characteristic | Centralized | Edge |
|----------------|-------------|------|
| Location | Metro area | Distributed (near users) |
| Size | 10-100+ MW | 50-500 kW |
| Latency | 10-50 ms | <5 ms |
| Staffing | 24/7 on-site | Remote/automated |
| Redundancy | Tier III-IV | Tier II-III |
| Use Case | Cloud, storage | IoT, 5G, CDN |

### 10.2 Edge Design Considerations

**Form Factors:**
1. **Micro (1-10 kW)**: Single rack, IT closet
2. **Modular (10-100 kW)**: Container, prefab
3. **Mini (100-500 kW)**: Small building

**Challenges:**
- **Limited space**: Compact, high-density design
- **Remote management**: Lights-out operation
- **Harsh environments**: Industrial, outdoor
- **Limited power**: Grid constraints
- **Cooling**: No CRAC/CRAH, direct-expansion

**Solutions:**
- **All-in-one units**: Integrated rack, cooling, UPS
- **Automated**: Self-monitoring, self-healing
- **Ruggedized**: Temperature extremes (-40°C to 55°C)
- **Cellular backup**: 4G/5G connectivity

---

## 11. Green Data Centers

### 11.1 Renewable Energy

**Energy Sources:**
```
1. Solar (PV):
   - Rooftop or ground-mounted arrays
   - Typical capacity: 500 kW - 10 MW
   - Offset: 10-30% of facility load

2. Wind:
   - On-site or power purchase agreement (PPA)
   - Offset: 50-100% (with grid tie)

3. Fuel Cells:
   - Natural gas or biogas
   - Capacity: 1-10 MW
   - 24/7 baseload power

4. Hydroelectric:
   - Near water sources
   - 24/7 renewable power
```

### 11.2 Carbon Neutrality

**Strategies:**
1. **Renewable Energy Credits (RECs)**: Purchase green energy
2. **Power Purchase Agreements (PPAs)**: Long-term renewable contracts
3. **Carbon Offsets**: Invest in carbon reduction projects
4. **Efficiency Improvements**: Reduce total consumption

**Examples:**
- **Google**: 100% renewable energy match (2017+)
- **Microsoft**: Carbon negative by 2030
- **Apple**: 100% renewable for data centers
- **Meta**: 100% renewable energy (2020+)

### 11.3 Water Conservation

**Cooling Water Usage:**
```
Traditional Evaporative Cooling:
Water Usage Effectiveness (WUE) = Annual Water / IT Energy
Industry average: 1.8 L/kWh

Best Practices:
- Air-cooled chillers: WUE <0.5 L/kWh
- Closed-loop systems: Minimal water use
- Rainwater harvesting: Reuse for cooling
- Wastewater treatment: Recycle gray water
```

### 11.4 Waste Heat Recovery

**Reuse Applications:**
- **District heating**: Nearby buildings, greenhouses
- **Desalination**: Heat-driven water purification
- **Aquaculture**: Fish farming
- **Industrial processes**: Manufacturing

**Example:**
```
Stockholm Data Parks (Sweden):
- Data center waste heat → District heating
- Heats 10,000 homes
- Saves 10,000 tons CO₂/year
```

---

## 12. Disaster Recovery

### 12.1 Business Continuity Planning

**RTO (Recovery Time Objective):**
- Maximum acceptable downtime
- Tier I: 24-48 hours
- Tier II: 12-24 hours
- Tier III: 2-4 hours
- Tier IV: <1 hour (near-zero downtime)

**RPO (Recovery Point Objective):**
- Maximum acceptable data loss
- Mission-critical: <1 minute (synchronous replication)
- Critical: 5-15 minutes (async replication)
- Important: 1-24 hours (snapshots)

### 12.2 Redundancy Strategies

**Geographic Redundancy:**
```
Primary Data Center → Active
└─ Location: City A

Secondary Data Center → Hot Standby
└─ Location: City B (100+ miles away)

Tertiary Data Center → Cold Standby (Optional)
└─ Location: City C (different region)

Requirements:
- Diverse network paths
- Separate power grids
- Different seismic zones
- Asynchronous data replication
```

### 12.3 Disaster Scenarios

**Natural Disasters:**
- Earthquake, flood, hurricane, tornado
- Mitigation: Geographic diversity, elevated equipment

**Man-Made Disasters:**
- Fire, vandalism, terrorism, cyberattack
- Mitigation: Security, fire suppression, backup systems

**Technical Failures:**
- Power outage, cooling failure, network outage
- Mitigation: Redundancy (N+1, 2N), monitoring, failover

### 12.4 Testing and Drills

**Recommended Schedule:**
- **Monthly**: Failover testing (non-production)
- **Quarterly**: Generator load bank testing
- **Semi-annual**: Full DR simulation
- **Annual**: Table-top exercise with stakeholders

---

## 13. Implementation Guidelines

### 13.1 Design Phases

```
Phase 1: Requirements (2-4 weeks)
├─ Capacity planning (IT load, growth)
├─ Tier selection
├─ Site selection
└─ Budget estimation

Phase 2: Design (3-6 months)
├─ Architectural drawings
├─ Electrical design (single-line diagrams)
├─ Mechanical design (cooling, airflow)
├─ Network topology
└─ Security design

Phase 3: Construction (6-18 months)
├─ Site preparation
├─ Electrical installation
├─ Mechanical installation
├─ Network cabling
└─ Testing and commissioning

Phase 4: Commissioning (1-3 months)
├─ System testing
├─ Load testing
├─ Failover testing
└─ Documentation

Phase 5: Operations (Ongoing)
├─ Monitoring
├─ Maintenance
├─ Capacity management
└─ Continuous improvement
```

### 13.2 Cost Estimation

**CapEx (Capital Expenditure):**
```
Typical Breakdown (per kW of IT capacity):

Construction:
- Building shell: $500-1,000/sq ft
- Raised floor: $50-100/sq ft
- Total: 30-40% of budget

Electrical:
- UPS: $200-500/kW
- Generators: $300-600/kW
- Distribution: $100-200/kW
- Total: 30-35% of budget

Mechanical:
- CRAC/CRAH: $300-700/kW
- Chillers: $200-400/kW
- Total: 20-25% of budget

Network/IT:
- Switches, routers: $50-200/kW
- Cabling: $50-100/kW
- Total: 5-10% of budget

Security/Fire:
- Access control: $20-50/kW
- Fire suppression: $30-80/kW
- Total: 5-10% of budget

Grand Total: $2,000-5,000/kW (varies by tier)
```

**OpEx (Operating Expenditure):**
```
Annual costs:
- Electricity: $800-1,500/kW/year (largest expense)
- Maintenance: $50-150/kW/year
- Staffing: $100-300/kW/year
- Cooling: Included in electricity
- Total: $1,000-2,000/kW/year
```

### 13.3 Capacity Planning

**Growth Model:**
```
Year 1: Baseline (1000 kW IT load)
Year 2: +15% (1150 kW)
Year 3: +15% (1323 kW)
Year 4: +15% (1521 kW)
Year 5: +15% (1749 kW)

Design capacity = Year 5 + 20% buffer = 2100 kW

UPS capacity = 2100 kW / 0.95 efficiency = 2211 kVA
Generator capacity = 2100 kW × 1.25 = 2625 kW
Cooling capacity = 2100 kW × (PUE - 1) = 2100 × 0.2 = 420 kW
```

### 13.4 Vendor Selection

**Key Criteria:**
1. **Reliability**: Uptime track record, MTBF
2. **Support**: 24/7 availability, SLA
3. **Scalability**: Future expansion capability
4. **Cost**: Total cost of ownership (TCO)
5. **Compliance**: Certifications, standards

**Top Vendors by Category:**
- **UPS**: Schneider Electric, Eaton, Vertiv
- **Cooling**: Schneider, Vertiv, Stulz
- **Generators**: Caterpillar, Cummins, Generac
- **PDU**: Raritan, Server Technology, APC
- **DCIM**: Schneider, Vertiv, Nlyte
- **Network**: Cisco, Arista, Juniper

---

## 14. References

### Standards Bodies
- **Uptime Institute**: Tier Standard (Topology, TSI)
- **TIA-942**: Telecommunications Infrastructure Standard
- **ASHRAE TC 9.9**: Thermal Guidelines
- **ISO 27001**: Information Security Management
- **NFPA 75**: Fire Protection for IT Equipment
- **IEC 62368-1**: Audio/video and IT equipment safety

### Industry Organizations
- **Uptime Institute**: Data center design and operations
- **The Green Grid**: Energy efficiency (PUE, DCiE)
- **AFCOM**: Data center management association
- **7x24 Exchange**: Availability and reliability

### Research Papers
1. "Data Center Efficiency Benchmarking" (Lawrence Berkeley Lab, 2023)
2. "Liquid Cooling Technologies for High-Density Computing" (DOE, 2024)
3. "Edge Data Center Best Practices" (Gartner, 2024)
4. "Carbon-Neutral Data Centers: A Roadmap" (IDC, 2025)

### WIA Standards
- **WIA-ENERGY**: Energy management and optimization
- **WIA-CLOUD**: Cloud infrastructure standards
- **WIA-SECURITY**: Physical and cyber security
- **WIA-NETWORK**: Advanced networking protocols
- **WIA-IOT**: Edge computing and IoT integration

---

**弘益人間 (Benefit All Humanity)**

*This specification is maintained by the WIA Data Center Infrastructure Group and is continuously updated to reflect the latest advancements in data center technology, sustainability, and operational excellence.*

*© 2025 SmileStory Inc. / WIA - MIT License*
