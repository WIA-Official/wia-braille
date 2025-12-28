# WIA-IND-014: Smart Gym Specification v1.0

> **Standard ID:** WIA-IND-014
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Fitness Technology Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Smart Gym Architecture](#2-smart-gym-architecture)
3. [Connected Equipment Systems](#3-connected-equipment-systems)
4. [Member Management](#4-member-management)
5. [Automated Workout Programs](#5-automated-workout-programs)
6. [Facility IoT](#6-facility-iot)
7. [Virtual Training Systems](#7-virtual-training-systems)
8. [Performance Analytics](#8-performance-analytics)
9. [Safety and Monitoring](#9-safety-and-monitoring)
10. [Data Formats](#10-data-formats)
11. [API Interface](#11-api-interface)
12. [Security and Privacy](#12-security-and-privacy)
13. [References](#13-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines a comprehensive technical framework for smart gym facilities that integrate connected fitness equipment, automated member management, AI-powered workout planning, facility IoT sensors, virtual training capabilities, and advanced performance analytics to create an optimal fitness environment.

### 1.2 Scope

The standard covers:
- Connected fitness equipment specifications and data protocols
- Member management systems with automated check-in and tracking
- AI-powered personalized workout program generation
- Facility IoT sensor networks for environmental and operational monitoring
- Virtual training platforms including live streaming and AR/VR
- Performance analytics and progress tracking systems
- Safety monitoring including form analysis and injury prevention
- Integration with wearable devices and mobile applications

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to democratize access to professional-grade fitness technology, making high-quality training available to everyone regardless of economic status, while optimizing gym operations and creating healthier communities through intelligent automation.

### 1.4 Terminology

- **Smart Equipment**: Fitness machines with embedded IoT sensors and connectivity
- **Member Profile**: Comprehensive data including goals, restrictions, preferences, history
- **Progressive Overload**: Systematic increase in training stress for adaptation
- **Training Volume**: Total work performed (Weight × Reps × Sets)
- **1RM (One-Rep Max)**: Maximum weight lifted for one repetition
- **RPE (Rate of Perceived Exertion)**: Subjective difficulty scale (1-10)
- **MET (Metabolic Equivalent)**: Energy expenditure measure
- **VO2 Max**: Maximum oxygen uptake capacity
- **Form Analysis**: Computer vision-based movement quality assessment
- **Virtual PT**: Remote personal training via video/AR

---

## 2. Smart Gym Architecture

### 2.1 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Smart Gym Facility                         │
├─────────────────────────────────────────────────────────────────┤
│  Equipment Layer                                                 │
│  ├── Cardio Machines (Treadmills, Bikes, Rowers, Ellipticals)  │
│  ├── Strength Machines (Cables, Presses, Leg Equipment)        │
│  ├── Free Weight Area (Barbells, Dumbbells, Kettlebells)       │
│  ├── Functional Training Zone (TRX, Plyometrics, CrossFit)     │
│  └── Group Exercise Rooms (Spin, Yoga, HIIT Studios)           │
├─────────────────────────────────────────────────────────────────┤
│  IoT Sensor Network                                              │
│  ├── Equipment Sensors (Load, Position, Usage, HR Integration) │
│  ├── Environmental Sensors (Temp, Humidity, CO2, Air Quality)  │
│  ├── Occupancy Sensors (Cameras, IR, Weight Pads)              │
│  ├── Access Control (RFID, NFC, Biometric, Mobile App)         │
│  └── Safety Systems (Emergency Buttons, AED Monitors)          │
├─────────────────────────────────────────────────────────────────┤
│  Edge Computing Layer                                            │
│  ├── Local Equipment Controllers                                │
│  ├── Computer Vision Processors (Form Analysis)                │
│  ├── Real-time Analytics Engine                                │
│  └── Local Data Storage (Edge Cache)                           │
├─────────────────────────────────────────────────────────────────┤
│  Connectivity Layer                                              │
│  ├── WiFi 6 (802.11ax) - Primary network                       │
│  ├── Bluetooth 5.2 - Equipment pairing                         │
│  ├── Zigbee/Z-Wave - IoT sensors                               │
│  └── 5G/LTE - Backup & mobile apps                             │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      Cloud Platform                              │
├─────────────────────────────────────────────────────────────────┤
│  Member Management                                               │
│  ├── Registration & Profiles                                    │
│  ├── Membership Plans & Billing                                │
│  ├── Check-in/out Tracking                                     │
│  └── Mobile App Backend                                        │
├─────────────────────────────────────────────────────────────────┤
│  AI/ML Services                                                  │
│  ├── Workout Plan Generator                                    │
│  ├── Form Analysis Models                                      │
│  ├── Injury Risk Prediction                                    │
│  ├── Member Retention Prediction                               │
│  └── Equipment Maintenance Forecasting                         │
├─────────────────────────────────────────────────────────────────┤
│  Data & Analytics                                                │
│  ├── Workout History Database                                  │
│  ├── Performance Metrics Warehouse                             │
│  ├── Equipment Usage Analytics                                 │
│  ├── Facility Optimization Engine                              │
│  └── Business Intelligence Dashboard                           │
├─────────────────────────────────────────────────────────────────┤
│  Virtual Training                                                │
│  ├── Live Class Streaming (WebRTC)                             │
│  ├── On-Demand Video Library                                   │
│  ├── Virtual PT Sessions                                       │
│  ├── AR/VR Workout Environments                                │
│  └── Social Features & Challenges                              │
├─────────────────────────────────────────────────────────────────┤
│  Integration Layer                                               │
│  ├── Wearable Device APIs (Fitbit, Garmin, Apple Watch)       │
│  ├── Nutrition Apps (MyFitnessPal, etc.)                      │
│  ├── Health Records (FHIR/HL7)                                │
│  └── Third-party Equipment (Peloton, Mirror, etc.)            │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow Patterns

#### 2.2.1 Member Check-in Flow

```
1. Member → Access Control (RFID/App/Biometric)
2. Access System → Verify Membership Status
3. System → Load Member Profile & Today's Workout
4. Display → Welcome Message + Recommended Equipment
5. Analytics → Update Attendance Tracking
6. Notifications → Send to Member's App
```

#### 2.2.2 Workout Session Flow

```
1. Member → Selects Equipment
2. Equipment → Reads Member ID (NFC/QR/Manual)
3. System → Loads Member Settings & Last Workout
4. Equipment → Configures (Seat height, resistance, etc.)
5. Member → Starts Workout
6. Equipment → Streams Real-time Data
   • Speed/Resistance/Weight
   • Heart Rate (if connected)
   • Form metrics (camera)
   • Power output
7. AI → Analyzes Performance & Provides Feedback
8. System → Detects Workout Completion
9. Database → Saves Session Data
10. Member → Receives Summary & Recommendations
```

#### 2.2.3 Virtual Class Flow

```
1. Member → Books Class via App
2. System → Sends Reminder Notifications
3. Class Time → Member Joins (Mobile/Studio Screen)
4. Instructor → Streams Live Video + Audio
5. System → Overlays Member Metrics (HR, Calories)
6. Analytics → Tracks Participation & Performance
7. Post-Class → Saves Recording + Member Stats
8. System → Sends Follow-up & Next Class Suggestions
```

---

## 3. Connected Equipment Systems

### 3.1 Cardio Equipment

#### 3.1.1 Treadmill Specifications

**Hardware Requirements:**
- Motor: 2.5-4.0 HP continuous duty
- Speed Range: 0-20 km/h (0-12.5 mph)
- Incline Range: 0-15% (motorized)
- Belt Size: Minimum 140cm × 50cm
- Weight Capacity: 150 kg minimum

**IoT Sensors:**
- Speed sensor: ±0.1 km/h accuracy
- Incline sensor: ±0.5% accuracy
- Heart rate: Dual-mode (handlebar + chest strap)
- Footstrike sensors: 16-point pressure mapping
- Emergency stop: Magnetic safety key + button

**Data Collection (1 Hz minimum):**
```json
{
  "timestamp": "2025-12-27T10:30:45Z",
  "deviceId": "TREAD-001",
  "memberId": "MEM-12345",
  "speed": 10.5,
  "incline": 5.0,
  "distance": 3.25,
  "duration": 1860,
  "heartRate": 155,
  "caloriesBurned": 287,
  "stepCount": 4250,
  "avgStepLength": 0.76,
  "footstrikePattern": "midfoot",
  "cadence": 168,
  "verticalOscillation": 8.2,
  "groundContactTime": 245
}
```

**Advanced Features:**
- Auto-speed adjustment based on heart rate zones
- Virtual running trails with terrain simulation
- Form analysis via side-mounted camera
- Social running: Race against other members
- Integration with running apps (Strava, Nike Run Club)

#### 3.1.2 Exercise Bike Specifications

**Hardware Requirements:**
- Resistance: Magnetic or electronic (20+ levels)
- Flywheel: 15 kg minimum for smooth ride
- Adjustability: Seat (vertical/horizontal), handlebar height
- Pedals: SPD-compatible with toe cages
- Display: Touch screen 10"+ with Bluetooth

**IoT Sensors:**
- Cadence sensor: ±1 RPM accuracy
- Power meter: ±2% accuracy
- Heart rate: Dual-mode
- Seat pressure sensor: Comfort optimization

**Data Collection:**
```json
{
  "timestamp": "2025-12-27T10:30:45Z",
  "deviceId": "BIKE-015",
  "memberId": "MEM-12345",
  "resistance": 12,
  "cadence": 85,
  "power": 185,
  "distance": 12.5,
  "duration": 2400,
  "heartRate": 148,
  "caloriesBurned": 320,
  "ftp": 210,
  "normalizedPower": 192,
  "intensityFactor": 0.91,
  "trainingStressScore": 45
}
```

#### 3.1.3 Rowing Machine Specifications

**Hardware Requirements:**
- Resistance: Air, water, or magnetic
- Rail Length: Accommodate 220 cm height
- Monitor: PM5 or equivalent
- Footrests: Adjustable with secure straps

**Data Collection:**
```json
{
  "timestamp": "2025-12-27T10:30:45Z",
  "deviceId": "ROW-008",
  "memberId": "MEM-12345",
  "strokeRate": 28,
  "pace": "1:52.3",
  "distance": 5000,
  "duration": 1200,
  "power": 165,
  "caloriesPerHour": 720,
  "heartRate": 162,
  "splitTimes": {
    "500m": ["1:55.2", "1:52.8", "1:51.5", "1:50.9", "1:49.8"],
    "1000m": ["1:54.0", "1:52.3", "1:50.3"]
  },
  "strokeAnalysis": {
    "driveTime": 1.2,
    "recoveryTime": 1.8,
    "driveRecoveryRatio": 1.5,
    "peakForce": 520
  }
}
```

### 3.2 Strength Equipment

#### 3.2.1 Smart Weight Machines

**Cable Machine Specifications:**
- Load cell sensors: ±0.5 kg accuracy
- Position sensors: Track range of motion
- Rep counter: Automatic via load pattern
- Safety features: Overload detection

**Data Collection:**
```json
{
  "timestamp": "2025-12-27T10:30:45Z",
  "deviceId": "CABLE-003",
  "memberId": "MEM-12345",
  "exercise": "lat-pulldown",
  "weight": 70,
  "reps": 12,
  "sets": 3,
  "rangeOfMotion": {
    "min": 45,
    "max": 175,
    "avgROM": 130
  },
  "repTempo": {
    "concentric": 1.2,
    "pause": 0.5,
    "eccentric": 2.0
  },
  "timeUnderTension": 44,
  "peakForce": 85,
  "avgForce": 72,
  "powerOutput": 145,
  "formScore": 8.5,
  "restTime": 90
}
```

#### 3.2.2 Free Weight Tracking

**RFID Weight Plate System:**
- Embedded RFID chips in plates
- Detection mats under lifting areas
- Barbell sleeves with RFID readers
- Automatic exercise recognition

**Computer Vision Tracking:**
- Overhead cameras with pose estimation
- Real-time form analysis
- Rep counting and tempo tracking
- Safety monitoring (spotter alerts)

**Data Collection:**
```json
{
  "timestamp": "2025-12-27T10:30:45Z",
  "location": "FREE-ZONE-A",
  "memberId": "MEM-12345",
  "exercise": "barbell-squat",
  "detectedBy": "computer-vision",
  "weight": 100,
  "reps": 8,
  "sets": 4,
  "depth": {
    "avg": "parallel",
    "min": "parallel-plus-2cm",
    "max": "atg"
  },
  "formAnalysis": {
    "kneeValgus": "none",
    "spineNeutrality": "good",
    "barPath": "vertical",
    "hipDrive": "excellent",
    "overallScore": 9.2
  },
  "velocity": {
    "avg": 0.65,
    "peak": 1.2,
    "lossFactor": 0.15
  },
  "estimated1RM": 125,
  "relativeStrength": 1.67
}
```

---

## 4. Member Management

### 4.1 Member Profile Structure

```typescript
interface MemberProfile {
  // Basic Information
  memberId: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  };

  // Membership Details
  membership: {
    type: 'basic' | 'premium' | 'vip' | 'corporate';
    status: 'active' | 'frozen' | 'expired' | 'cancelled';
    startDate: Date;
    expiryDate: Date;
    billingCycle: 'monthly' | 'quarterly' | 'annual';
    autoRenew: boolean;
    accessHours: string; // e.g., "24/7" or "06:00-22:00"
    includedFeatures: string[];
  };

  // Physical Metrics
  physicalProfile: {
    height: number; // cm
    weight: number; // kg
    bodyFatPercentage?: number;
    muscleMass?: number;
    bmi: number;
    restingHeartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    vo2Max?: number;
    measurementHistory: Array<{
      date: Date;
      weight: number;
      bodyFat?: number;
      muscleMass?: number;
    }>;
  };

  // Fitness Profile
  fitnessProfile: {
    experience: 'beginner' | 'intermediate' | 'advanced' | 'athlete';
    primaryGoals: Array<'weight-loss' | 'muscle-gain' | 'strength' |
                        'endurance' | 'flexibility' | 'general-fitness' |
                        'sport-specific' | 'rehabilitation'>;
    currentFitnessLevel: {
      cardiovascular: 1 | 2 | 3 | 4 | 5;
      strength: 1 | 2 | 3 | 4 | 5;
      flexibility: 1 | 2 | 3 | 4 | 5;
      overall: number;
    };
    preferredActivities: string[];
    dislikedActivities: string[];
  };

  // Medical & Safety
  medicalInfo: {
    medicalClearance: boolean;
    clearanceDate?: Date;
    clearanceExpiry?: Date;
    conditions: string[];
    injuries: Array<{
      type: string;
      area: string;
      date: Date;
      severity: 'minor' | 'moderate' | 'severe';
      restrictions: string[];
      recoveryStatus: 'acute' | 'recovery' | 'chronic' | 'healed';
    }>;
    medications: string[];
    allergies: string[];
    restrictions: string[];
  };

  // Training Preferences
  preferences: {
    workoutFrequency: number; // days per week
    sessionDuration: number; // minutes
    preferredTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
    trainingStyle: 'solo' | 'group-class' | 'personal-trainer' | 'mixed';
    equipment: {
      cardio: boolean;
      freeWeights: boolean;
      machines: boolean;
      functional: boolean;
      groupClasses: string[];
    };
    notifications: {
      workoutReminders: boolean;
      classBookings: boolean;
      achievements: boolean;
      challenges: boolean;
      marketing: boolean;
    };
  };

  // Activity Tracking
  activity: {
    totalWorkouts: number;
    totalMinutes: number;
    currentStreak: number;
    longestStreak: number;
    lastVisit: Date;
    avgWorkoutsPerWeek: number;
    favoriteEquipment: string[];
    peakWorkoutTime: string;
  };
}
```

### 4.2 Access Control Systems

#### 4.2.1 Check-in Methods

**1. RFID Card/Fob:**
```typescript
interface RFIDCheckIn {
  method: 'rfid';
  cardId: string;
  readerId: string;
  location: 'main-entrance' | 'side-door' | 'locker-room';
  timestamp: Date;
  validationTime: number; // ms
}
```

**2. Mobile App (QR Code):**
```typescript
interface MobileCheckIn {
  method: 'mobile-app';
  qrCode: string;
  appVersion: string;
  deviceInfo: {
    platform: 'ios' | 'android';
    model: string;
    osVersion: string;
  };
  location: string;
  timestamp: Date;
}
```

**3. Biometric (Fingerprint/Face):**
```typescript
interface BiometricCheckIn {
  method: 'biometric';
  type: 'fingerprint' | 'facial-recognition';
  biometricId: string; // hashed
  confidence: number; // 0-1
  location: string;
  timestamp: Date;
  fallbackUsed: boolean;
}
```

#### 4.2.2 Occupancy Management

**Real-time Capacity Tracking:**
```typescript
interface OccupancyStatus {
  current: number;
  maximum: number;
  percentage: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  forecast: {
    nextHour: number;
    peakTimeToday: { time: string; expected: number };
  };
  zoneOccupancy: {
    cardio: { current: number; max: number };
    weights: { current: number; max: number };
    functional: { current: number; max: number };
    groupClasses: { current: number; max: number };
    lockerRooms: { current: number; max: number };
  };
}
```

---

## 5. Automated Workout Programs

### 5.1 AI Workout Generation

#### 5.1.1 Progressive Overload Algorithm

**Base Formula:**
```
Training Load = Volume × Intensity × Frequency

Volume = Σ(Weight × Reps × Sets) for all exercises
Intensity = % of 1RM or RPE scale
Frequency = Workouts per week

Progressive Increase Per Week:
  Beginner: 5-10% volume increase
  Intermediate: 2-5% volume increase
  Advanced: 1-3% volume increase

Deload Week (every 4-6 weeks):
  Volume: 40-60% of peak week
  Intensity: Maintain or slight decrease
```

#### 5.1.2 Exercise Selection Matrix

**Compound Movement Priority:**
```typescript
interface ExerciseDatabase {
  id: string;
  name: string;
  category: 'compound' | 'isolation' | 'cardio' | 'flexibility';
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  injuryRisk: 'low' | 'medium' | 'high';
  learningCurve: 'easy' | 'moderate' | 'difficult';
  alternatives: string[]; // substitute exercises
  contraindications: string[]; // injuries/conditions to avoid
  biomechanics: {
    movementPlane: 'sagittal' | 'frontal' | 'transverse' | 'multi-plane';
    movementPattern: 'push' | 'pull' | 'squat' | 'hinge' | 'carry' | 'rotate';
    rangeOfMotion: 'full' | 'partial';
  };
}
```

**Weekly Split Patterns:**

```typescript
// Push/Pull/Legs (PPL) - 6 days
const pplSplit = {
  day1: { focus: 'push-upper', exercises: ['bench-press', 'overhead-press', 'triceps'] },
  day2: { focus: 'pull-upper', exercises: ['deadlift', 'rows', 'biceps'] },
  day3: { focus: 'legs', exercises: ['squat', 'leg-press', 'calves'] },
  day4: { focus: 'push-upper', exercises: ['incline-press', 'dips', 'lateral-raises'] },
  day5: { focus: 'pull-upper', exercises: ['pull-ups', 'cable-rows', 'face-pulls'] },
  day6: { focus: 'legs', exercises: ['front-squat', 'romanian-deadlift', 'lunges'] },
  day7: { focus: 'rest' }
};

// Upper/Lower - 4 days
const upperLowerSplit = {
  day1: { focus: 'upper-strength', exercises: ['bench-press', 'rows', 'overhead-press'] },
  day2: { focus: 'lower-strength', exercises: ['squat', 'deadlift', 'leg-curl'] },
  day3: { focus: 'rest' },
  day4: { focus: 'upper-hypertrophy', exercises: ['incline-db-press', 'pull-ups', 'curls'] },
  day5: { focus: 'lower-hypertrophy', exercises: ['leg-press', 'rdl', 'leg-extension'] },
  day6: { focus: 'rest' },
  day7: { focus: 'rest' }
};

// Full Body - 3 days
const fullBodySplit = {
  day1: { focus: 'full-body-a', exercises: ['squat', 'bench-press', 'rows', 'abs'] },
  day2: { focus: 'rest' },
  day3: { focus: 'full-body-b', exercises: ['deadlift', 'overhead-press', 'pull-ups', 'core'] },
  day4: { focus: 'rest' },
  day5: { focus: 'full-body-c', exercises: ['front-squat', 'incline-press', 'cable-rows'] },
  day6: { focus: 'rest' },
  day7: { focus: 'rest' }
};
```

### 5.2 Periodization Models

#### 5.2.1 Linear Periodization (12 weeks)

```
Phase 1: Hypertrophy (Weeks 1-4)
  Sets: 3-4
  Reps: 8-12
  Intensity: 65-75% 1RM
  Rest: 60-90 seconds
  Volume: High

Phase 2: Strength (Weeks 5-8)
  Sets: 4-5
  Reps: 4-6
  Intensity: 80-85% 1RM
  Rest: 2-3 minutes
  Volume: Medium-High

Phase 3: Power (Weeks 9-11)
  Sets: 3-5
  Reps: 1-3
  Intensity: 85-95% 1RM
  Rest: 3-5 minutes
  Volume: Medium

Week 12: Deload/Test
  Test 1RM on key lifts
  Active recovery
  Plan next cycle
```

#### 5.2.2 Undulating Periodization (Weekly)

```
Monday: Power Day
  Focus: Explosive movements
  Intensity: 75-85% 1RM
  Reps: 3-5
  Exercises: Olympic lifts, jump squats, plyometrics

Wednesday: Hypertrophy Day
  Focus: Muscle growth
  Intensity: 65-75% 1RM
  Reps: 8-12
  Exercises: Isolation work, volume training

Friday: Strength Day
  Focus: Maximum strength
  Intensity: 85-95% 1RM
  Reps: 2-4
  Exercises: Heavy compound lifts
```

### 5.3 Auto-Regulation Features

**RPE-Based Adjustment:**
```typescript
interface AutoRegulation {
  plannedLoad: {
    exercise: string;
    sets: number;
    reps: number;
    weight: number;
    targetRPE: number;
  };

  actualPerformance: {
    completedSets: number;
    completedReps: number[];
    actualRPE: number[];
    barVelocity?: number[]; // m/s if VBT sensors available
  };

  adjustment: {
    nextSession: {
      weight: number; // adjusted based on RPE
      reps: number; // adjusted if RPE too high/low
      sets: number;
    };
    reason: string;
    confidence: number; // AI confidence in adjustment
  };
}
```

**Fatigue Monitoring:**
```typescript
interface FatigueScore {
  readinessScore: number; // 1-10
  factors: {
    sleepQuality: number;
    sleepDuration: number;
    muscularSoreness: number;
    stressLevel: number;
    restingHeartRate: number;
    hrvScore: number;
  };
  recommendation: {
    action: 'proceed-as-planned' | 'reduce-volume' | 'deload' | 'rest-day';
    volumeAdjustment: number; // percentage
    intensityAdjustment: number; // percentage
  };
}
```

---

## 6. Facility IoT

### 6.1 Environmental Monitoring

#### 6.1.1 Air Quality Sensors

**Measurement Parameters:**
```typescript
interface AirQuality {
  timestamp: Date;
  location: string;

  temperature: {
    value: number; // Celsius
    ideal: { min: 18, max: 22 };
    status: 'too-cold' | 'optimal' | 'too-warm';
  };

  humidity: {
    value: number; // percentage
    ideal: { min: 40, max: 60 };
    status: 'too-dry' | 'optimal' | 'too-humid';
  };

  co2: {
    value: number; // ppm
    levels: {
      excellent: '< 600',
      good: '600-1000',
      acceptable: '1000-1500',
      poor: '1500-2000',
      bad: '> 2000'
    };
    status: 'excellent' | 'good' | 'acceptable' | 'poor' | 'bad';
    action: string; // "Increase ventilation" if poor/bad
  };

  pm25: {
    value: number; // μg/m³
    status: 'good' | 'moderate' | 'unhealthy';
  };

  voc: {
    value: number; // ppb (parts per billion)
    status: 'low' | 'medium' | 'high';
  };
}
```

**HVAC Integration:**
```typescript
interface HVACControl {
  zone: string;
  mode: 'auto' | 'cooling' | 'heating' | 'ventilation';
  targetTemperature: number;
  fanSpeed: 'low' | 'medium' | 'high' | 'auto';

  triggers: {
    co2Threshold: 1200; // ppm - increase ventilation
    temperatureDeviation: 2; // degrees - adjust HVAC
    occupancyFactor: true; // adjust based on crowd
    peakHourPreCool: true; // cool before peak hours
  };

  energyOptimization: {
    enabled: boolean;
    schedules: Array<{
      time: string;
      temperature: number;
      reason: string;
    }>;
  };
}
```

#### 6.1.2 Equipment Availability Sensors

**Real-time Equipment Status:**
```typescript
interface EquipmentAvailability {
  equipmentType: string;
  total: number;
  available: number;
  inUse: number;
  outOfService: number;
  reserved: number;

  currentUsers: Array<{
    equipmentId: string;
    memberId: string;
    startTime: Date;
    estimatedEndTime: Date;
    currentDuration: number;
  }>;

  waitlist: Array<{
    memberId: string;
    priority: number;
    waitingSince: Date;
    notified: boolean;
  }>;

  forecast: {
    availableIn5Min: number;
    availableIn15Min: number;
    peakWaitTime: number; // minutes
  };
}
```

### 6.2 Safety Systems

#### 6.2.1 Emergency Response

**Emergency Protocol:**
```typescript
interface EmergencySystem {
  emergencyButtons: Array<{
    id: string;
    location: string;
    type: 'panic' | 'medical' | 'fire';
    status: 'armed' | 'triggered' | 'acknowledged';
  }>;

  aedLocations: Array<{
    id: string;
    location: string;
    lastInspection: Date;
    batteryStatus: number;
    padsExpiry: Date;
  }>;

  staffAlerts: {
    onDutyStaff: string[];
    nearestStaff: Array<{
      staffId: string;
      location: string;
      distanceToIncident: number; // meters
      estimatedArrival: number; // seconds
    }>;
    externalEmergency: {
      policeNotified: boolean;
      ambulanceNotified: boolean;
      estimatedArrival: number; // minutes
    };
  };

  memberSafety: {
    evacuationRoutes: string[];
    assemblyPoints: string[];
    memberCount: {
      total: number;
      evacuated: number;
      unaccounted: number;
    };
  };
}
```

#### 6.2.2 Form Analysis & Injury Prevention

**Computer Vision Form Analysis:**
```typescript
interface FormAnalysis {
  exercise: string;
  cameraAngle: 'front' | 'side' | 'rear' | 'multi';

  poseKeypoints: {
    head: { x: number; y: number; confidence: number };
    shoulders: { left: Point; right: Point };
    elbows: { left: Point; right: Point };
    wrists: { left: Point; right: Point };
    hips: { left: Point; right: Point };
    knees: { left: Point; right: Point };
    ankles: { left: Point; right: Point };
  };

  angles: {
    kneeAngle: { left: number; right: number };
    hipAngle: { left: number; right: number };
    spineAngle: number;
    shoulderAngle: { left: number; right: number };
  };

  formScore: {
    overall: number; // 0-10
    components: {
      depth: number; // e.g., squat depth
      barPath: number; // vertical vs curved
      symmetry: number; // left/right balance
      tempo: number; // controlled vs jerky
      range: number; // full ROM vs partial
    };
  };

  warnings: Array<{
    severity: 'info' | 'warning' | 'danger';
    issue: string;
    description: string;
    recommendation: string;
  }>;

  injuryRisk: {
    overall: number; // 0-1
    areas: {
      lowerBack: number;
      knees: number;
      shoulders: number;
      wrists: number;
    };
    recommendation: 'continue' | 'reduce-weight' | 'stop-immediately';
  };
}
```

---

## 7. Virtual Training Systems

### 7.1 Live Streaming Classes

#### 7.1.1 WebRTC Architecture

**Streaming Configuration:**
```typescript
interface LiveClassStream {
  classId: string;
  instructor: {
    id: string;
    name: string;
    camera: {
      resolution: '1080p' | '4K';
      fps: 30 | 60;
      bitrate: number; // kbps
    };
    microphone: {
      sampleRate: 48000; // Hz
      bitrate: 128; // kbps
      noiseSuppression: boolean;
    };
  };

  participants: Array<{
    memberId: string;
    joinTime: Date;
    connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
    videoEnabled: boolean;
    audioEnabled: boolean;
    heartRateSharing: boolean;
    currentHeartRate?: number;
  }>;

  overlays: {
    instructorMetrics: boolean;
    leaderboard: boolean;
    personalStats: boolean;
    chatMessages: boolean;
  };

  interactivity: {
    participantVideo: boolean; // show participant cameras
    voiceInteraction: boolean;
    reactions: boolean; // emoji reactions
    polls: boolean;
  };
}
```

#### 7.1.2 Class Types

**Group Class Categories:**
```typescript
const classTypes = {
  spin: {
    duration: [30, 45, 60],
    intensity: ['beginner', 'intermediate', 'advanced'],
    style: ['endurance', 'intervals', 'climb', 'race'],
    equipment: ['stationary-bike'],
    maxParticipants: 30
  },

  hiit: {
    duration: [20, 30, 45],
    intensity: ['moderate', 'high', 'extreme'],
    style: ['bodyweight', 'kettlebell', 'mixed'],
    equipment: ['mat', 'dumbbells', 'kettlebells'],
    maxParticipants: 20
  },

  yoga: {
    duration: [30, 60, 90],
    intensity: ['gentle', 'moderate', 'power'],
    style: ['hatha', 'vinyasa', 'yin', 'restorative'],
    equipment: ['mat', 'blocks', 'straps'],
    maxParticipants: 25
  },

  strength: {
    duration: [45, 60],
    intensity: ['beginner', 'intermediate', 'advanced'],
    style: ['full-body', 'upper-body', 'lower-body', 'core'],
    equipment: ['barbell', 'dumbbells', 'resistance-bands'],
    maxParticipants: 15
  }
};
```

### 7.2 AR/VR Workouts

#### 7.2.1 Augmented Reality Features

**AR Overlay System:**
```typescript
interface ARWorkout {
  device: 'smartphone' | 'tablet' | 'ar-glasses';

  overlays: {
    exerciseDemo: {
      enabled: boolean;
      3dModel: string;
      animation: 'skeleton' | 'muscular' | 'full-body';
      opacity: number;
      position: 'mirror' | 'side-by-side';
    };

    formGuides: {
      enabled: boolean;
      alignmentLines: boolean;
      depthIndicators: boolean;
      angleMarkers: boolean;
      colorCoding: {
        good: 'green';
        warning: 'yellow';
        danger: 'red';
      };
    };

    liveMetrics: {
      heartRate: boolean;
      calories: boolean;
      repCount: boolean;
      setProgress: boolean;
      restTimer: boolean;
    };

    virtualTrainer: {
      enabled: boolean;
      avatar: string;
      voiceCoaching: boolean;
      motivationalMessages: boolean;
    };
  };

  gamification: {
    points: number;
    achievements: string[];
    challenges: Array<{
      name: string;
      progress: number;
      target: number;
      reward: string;
    }>;
  };
}
```

#### 7.2.2 Virtual Reality Environments

**VR Workout Scenarios:**
```typescript
interface VRWorkout {
  headset: 'meta-quest' | 'psvr' | 'htc-vive';

  environment: {
    scene: 'beach' | 'mountain' | 'forest' | 'gym' | 'space' | 'custom';
    weather: 'sunny' | 'rainy' | 'snowy' | 'foggy';
    timeOfDay: 'sunrise' | 'day' | 'sunset' | 'night';
    ambiance: {
      soundscape: boolean;
      music: string;
      visualEffects: boolean;
    };
  };

  workout: {
    type: 'boxing' | 'cycling' | 'rowing' | 'yoga' | 'dance';
    difficulty: 1 | 2 | 3 | 4 | 5;
    opponents?: Array<{ name: string; difficulty: number }>; // for boxing
    course?: { distance: number; terrain: string }; // for cycling
  };

  multiplayer: {
    enabled: boolean;
    participants: string[];
    mode: 'cooperative' | 'competitive';
    voiceChat: boolean;
  };

  biometrics: {
    heartRateMonitor: boolean;
    calorieTracking: boolean;
    motionTracking: '3dof' | '6dof';
  };
}
```

---

## 8. Performance Analytics

### 8.1 Progress Tracking Metrics

#### 8.1.1 Strength Progress

**One-Rep Max Calculations:**
```
Epley Formula:
  1RM = Weight × (1 + Reps / 30)

Brzycki Formula:
  1RM = Weight × (36 / (37 - Reps))

Lombardi Formula:
  1RM = Weight × Reps^0.1

Velocity-Based (if VBT available):
  1RM = Weight / (1.15 × Velocity - 0.05)
```

**Strength Standards (Relative to Bodyweight):**
```typescript
const strengthStandards = {
  squat: {
    beginner: { male: 0.75, female: 0.50 },
    intermediate: { male: 1.25, female: 0.90 },
    advanced: { male: 1.75, female: 1.25 },
    elite: { male: 2.25, female: 1.75 }
  },
  deadlift: {
    beginner: { male: 1.00, female: 0.65 },
    intermediate: { male: 1.50, female: 1.05 },
    advanced: { male: 2.00, female: 1.50 },
    elite: { male: 2.75, female: 2.00 }
  },
  benchPress: {
    beginner: { male: 0.50, female: 0.30 },
    intermediate: { male: 0.85, female: 0.50 },
    advanced: { male: 1.25, female: 0.75 },
    elite: { male: 1.75, female: 1.10 }
  }
};
```

#### 8.1.2 Cardiovascular Progress

**VO2 Max Estimation:**
```
Rockport Walking Test:
  VO2max = 132.853 - (0.0769 × Weight_lbs) - (0.3877 × Age)
           + (6.315 × Gender) - (3.2649 × Time_min)
           - (0.1565 × HeartRate)
  where Gender: male = 1, female = 0

Cooper 12-Minute Run Test:
  VO2max = (Distance_meters - 505) / 45

1.5 Mile Run Test:
  VO2max = 483 / Time_minutes + 3.5
```

**Cardiovascular Fitness Levels:**
```typescript
const vo2maxStandards = {
  age20_29: {
    male: { poor: '<38', fair: '38-43', average: '44-51', good: '52-56', excellent: '>56' },
    female: { poor: '<28', fair: '28-32', average: '33-38', good: '39-43', excellent: '>43' }
  },
  age30_39: {
    male: { poor: '<35', fair: '35-39', average: '40-47', good: '48-51', excellent: '>51' },
    female: { poor: '<27', fair: '27-31', average: '32-36', good: '37-41', excellent: '>41' }
  },
  // ... more age groups
};
```

### 8.2 Body Composition Tracking

#### 8.2.1 Measurement Methods

**Bioelectrical Impedance Analysis (BIA):**
```typescript
interface BIAMeasurement {
  timestamp: Date;
  memberId: string;

  impedance: {
    wholebody: number; // ohms
    rightArm: number;
    leftArm: number;
    trunk: number;
    rightLeg: number;
    leftLeg: number;
  };

  results: {
    weight: number; // kg
    bodyFatPercentage: number;
    fatMass: number; // kg
    leanBodyMass: number; // kg
    muscleMass: number; // kg
    boneMass: number; // kg
    totalBodyWater: number; // kg
    visceralFat: number; // level 1-59
    bmi: number;
    bmr: number; // kcal/day
    metabolicAge: number; // years
  };

  segmentalAnalysis: {
    rightArm: { fatPercent: number; muscleMass: number };
    leftArm: { fatPercent: number; muscleMass: number };
    trunk: { fatPercent: number; muscleMass: number };
    rightLeg: { fatPercent: number; muscleMass: number };
    leftLeg: { fatPercent: number; muscleMass: number };
  };
}
```

**3D Body Scanning:**
```typescript
interface BodyScan3D {
  timestamp: Date;
  memberId: string;

  circumferences: {
    neck: number; // cm
    shoulders: number;
    chest: number;
    waist: number;
    hips: number;
    rightThigh: number;
    leftThigh: number;
    rightCalf: number;
    leftCalf: number;
    rightBicep: number;
    leftBicep: number;
    rightForearm: number;
    leftForearm: number;
  };

  volumes: {
    total: number; // liters
    trunk: number;
    rightArm: number;
    leftArm: number;
    rightLeg: number;
    leftLeg: number;
  };

  posture: {
    shoulderAsymmetry: number; // degrees
    hipAsymmetry: number;
    spinalCurvature: number;
    headTilt: number;
    forwardHeadPosture: number; // cm
  };

  comparison: {
    previousScan: Date;
    totalVolumeChange: number; // liters
    waistChange: number; // cm
    muscleGain: number; // estimated kg
  };
}
```

---

## 9. Safety and Monitoring

### 9.1 Injury Risk Assessment

**Machine Learning Risk Model:**
```typescript
interface InjuryRiskAssessment {
  memberId: string;
  timestamp: Date;

  inputFactors: {
    trainingLoad: {
      acuteLoad: number; // 7-day average
      chronicLoad: number; // 28-day average
      acuteChronicRatio: number; // ACWR
    };

    recoverMetrics: {
      sleepQuality: number; // 1-10
      sleepDuration: number; // hours
      muscularSoreness: number; // 1-10
      hrvScore: number;
      restingHeartRate: number;
    };

    biomechanics: {
      movementAsymmetry: number; // percentage
      formScoreAvg: number; // 1-10
      rangeOfMotionDeficits: string[];
    };

    history: {
      previousInjuries: Array<{
        type: string;
        severity: string;
        daysAgo: number;
        fullyRecovered: boolean;
      }>;
      ageFactorRisk: number; // based on age
    };
  };

  riskScores: {
    overall: number; // 0-1 (0 = low risk, 1 = high risk)
    areas: {
      lowerBack: number;
      shoulders: number;
      knees: number;
      elbows: number;
      ankles: number;
      wrists: number;
    };
    timeframe: '24hours' | '3days' | '1week';
  };

  recommendations: {
    action: 'train-normally' | 'modify-workout' | 'active-recovery' | 'full-rest';
    modifications: string[];
    focusRecovery: string[];
    medicalConsult: boolean;
  };
}
```

### 9.2 Equipment Maintenance Prediction

**Predictive Maintenance:**
```typescript
interface EquipmentMaintenance {
  equipmentId: string;
  type: string;

  usageMetrics: {
    totalHours: number;
    totalSessions: number;
    avgLoadPerSession: number;
    peakLoad: number;
  };

  sensorData: {
    vibration: number; // accelerometer
    temperature: number; // bearing temp
    soundLevel: number; // unusual noise
    calibrationDrift: number; // sensor accuracy
  };

  healthScore: number; // 0-100

  prediction: {
    estimatedRemainingLife: number; // hours
    failureRisk: {
      next7Days: number; // probability
      next30Days: number;
      next90Days: number;
    };
    recommendedAction: {
      urgency: 'immediate' | 'soon' | 'scheduled' | 'monitor';
      task: 'repair' | 'replace-part' | 'full-service' | 'calibration';
      estimatedDowntime: number; // hours
      costEstimate: number;
    };
  };

  maintenanceHistory: Array<{
    date: Date;
    type: 'routine' | 'repair' | 'replacement';
    description: string;
    cost: number;
    performedBy: string;
  }>;
}
```

---

## 10. Data Formats

### 10.1 Workout Session Schema

**Complete Workout JSON:**
```json
{
  "standardId": "WIA-IND-014",
  "version": "1.0.0",
  "sessionId": "SESSION-2025-1227-0001",
  "facilityId": "GYM-2025-001",
  "memberId": "MEM-12345",
  "timestamp": {
    "start": "2025-12-27T10:00:00Z",
    "end": "2025-12-27T11:15:00Z",
    "duration": 4500
  },
  "sessionType": "strength-training",
  "exercises": [
    {
      "exerciseId": "EX-001",
      "name": "Barbell Back Squat",
      "equipment": "barbell",
      "muscleGroups": ["quadriceps", "glutes", "hamstrings", "core"],
      "sets": [
        {
          "setNumber": 1,
          "type": "warmup",
          "weight": 60,
          "reps": 10,
          "rpe": 5,
          "restTime": 90,
          "formScore": 8.5,
          "avgVelocity": 0.75,
          "peakVelocity": 1.2,
          "rangeOfMotion": "full",
          "tempo": { "eccentric": 2.5, "pause": 1.0, "concentric": 1.0 }
        },
        {
          "setNumber": 2,
          "type": "working",
          "weight": 100,
          "reps": 8,
          "rpe": 7,
          "restTime": 180,
          "formScore": 9.2,
          "avgVelocity": 0.65,
          "peakVelocity": 1.0,
          "rangeOfMotion": "full",
          "tempo": { "eccentric": 2.0, "pause": 1.0, "concentric": 1.2 }
        }
      ],
      "totalVolume": 1400,
      "estimated1RM": 125,
      "notes": "Excellent depth and bar path"
    }
  ],
  "summary": {
    "totalExercises": 8,
    "totalSets": 24,
    "totalReps": 192,
    "totalVolume": 12500,
    "avgHeartRate": 135,
    "maxHeartRate": 172,
    "caloriesBurned": 485,
    "timeUnderTension": 1260,
    "avgRestTime": 120
  },
  "memberStats": {
    "preWorkout": {
      "weight": 75.2,
      "heartRate": 62,
      "bloodPressure": { "systolic": 118, "diastolic": 76 },
      "readinessScore": 8.5
    },
    "postWorkout": {
      "weight": 74.8,
      "heartRate": 88,
      "perceivedExertion": 8,
      "muscleSoreness": 5
    }
  },
  "achievements": [
    { "type": "personal-record", "exercise": "squat", "value": 125, "unit": "kg" },
    { "type": "volume-milestone", "description": "50,000 kg total volume this month" }
  ]
}
```

---

## 11. API Interface

### 11.1 RESTful Endpoints

**Base URL:** `https://api.smart-gym.wia.com/v1`

#### Member Management

```
POST   /members                     - Register new member
GET    /members/:id                 - Get member profile
PUT    /members/:id                 - Update member profile
DELETE /members/:id                 - Deactivate membership

POST   /members/:id/checkin         - Check-in member
POST   /members/:id/checkout        - Check-out member
GET    /members/:id/visits          - Get visit history
```

#### Workout Sessions

```
POST   /sessions                    - Start workout session
PUT    /sessions/:id                - Update session
POST   /sessions/:id/complete       - Complete session
GET    /sessions/:id                - Get session details
GET    /sessions/member/:memberId   - Get member's sessions

POST   /sessions/:id/exercises      - Log exercise
PUT    /sessions/:id/exercises/:exId - Update exercise
```

#### Equipment

```
GET    /equipment                   - List all equipment
GET    /equipment/:id               - Get equipment details
GET    /equipment/available         - Get available equipment
POST   /equipment/:id/reserve       - Reserve equipment
DELETE /equipment/:id/reserve       - Cancel reservation

GET    /equipment/:id/maintenance   - Get maintenance schedule
POST   /equipment/:id/maintenance   - Log maintenance
```

#### Workout Plans

```
POST   /plans/generate              - Generate AI workout plan
GET    /plans/:id                   - Get plan details
PUT    /plans/:id                   - Update plan
GET    /plans/member/:memberId      - Get member's plans
```

#### Analytics

```
GET    /analytics/member/:id        - Member analytics
GET    /analytics/facility          - Facility analytics
GET    /analytics/equipment/:id     - Equipment usage analytics
```

#### Virtual Training

```
GET    /classes                     - List scheduled classes
GET    /classes/:id                 - Get class details
POST   /classes/:id/join            - Join live class
POST   /classes/:id/book            - Book class
DELETE /classes/:id/booking         - Cancel booking
```

### 11.2 WebSocket Events

**Real-time Updates:**

```typescript
// Equipment status updates
socket.on('equipment:status', (data: {
  equipmentId: string;
  status: 'available' | 'in-use' | 'reserved' | 'maintenance';
  memberId?: string;
  estimatedEndTime?: Date;
}));

// Live workout metrics
socket.on('workout:metrics', (data: {
  sessionId: string;
  heartRate: number;
  calories: number;
  duration: number;
  currentExercise: string;
}));

// Form analysis warnings
socket.on('form:warning', (data: {
  sessionId: string;
  severity: 'info' | 'warning' | 'danger';
  message: string;
  recommendation: string;
}));

// Facility occupancy
socket.on('facility:occupancy', (data: {
  current: number;
  max: number;
  zones: Record<string, number>;
}));
```

---

## 12. Security and Privacy

### 12.1 Data Protection

**GDPR Compliance:**
- Member data encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Right to access, modify, delete personal data
- Data retention policies (workout data: 7 years, video: 30 days)
- Consent management for video recording in facility
- Anonymized analytics data

**Access Control:**
```typescript
interface AccessControl {
  roles: {
    member: ['view-own-data', 'book-classes', 'use-equipment'];
    trainer: ['view-client-data', 'create-plans', 'conduct-classes'];
    staff: ['checkin-members', 'manage-equipment', 'view-facility-stats'];
    manager: ['manage-members', 'financial-reports', 'staff-management'];
    admin: ['full-access'];
  };

  dataAccess: {
    ownWorkouts: 'member',
    allWorkouts: 'admin',
    personalInfo: 'member+staff',
    healthData: 'member+trainer',
    financialData: 'manager+admin',
    facilityControls: 'staff+manager+admin'
  };
}
```

### 12.2 Video & Camera Privacy

**Camera Zones:**
```typescript
interface CameraPrivacy {
  zones: {
    publicAreas: {
      recording: true;
      retention: '30days';
      purpose: 'security+analytics';
      signageRequired: true;
    };

    workoutFloor: {
      recording: true;
      retention: '7days';
      purpose: 'form-analysis+safety';
      optOut: true; // members can opt-out of form analysis
      faceBlurring: true; // auto-blur faces in stored videos
    };

    lockerRooms: {
      recording: false;
      cameras: 'entrance-only'; // never inside
    };

    privateTraining: {
      recording: 'consent-required';
      retention: '90days';
      memberOwned: true; // member owns the video
    };
  };
}
```

---

## 13. References

### 13.1 Related Standards

- **WIA-IND-012**: Fitness Tracking Standard
- **WIA-IND-011**: Sports Tech Standard
- **WIA-MED-001**: Health Records Integration
- **WIA-IOT-005**: IoT Sensor Networks
- **ISO 20957**: Stationary training equipment standards
- **EN 957**: Fitness equipment safety standards

### 13.2 Scientific References

- ACSM's Guidelines for Exercise Testing and Prescription (11th Edition)
- NSCA's Essentials of Strength Training and Conditioning (4th Edition)
- Periodization Training for Sports (Tudor Bompa, 3rd Edition)
- Science and Practice of Strength Training (Zatsiorsky & Kraemer, 3rd Edition)

### 13.3 Technical Standards

- **MQTT**: IoT messaging protocol
- **WebRTC**: Real-time video streaming
- **FHIR**: Healthcare data exchange
- **IEEE 802.11ax**: WiFi 6 standard
- **Bluetooth 5.2**: BLE connectivity

---

**弘익人間 (홍익인간) · Benefit All Humanity**

*WIA - World Certification Industry Association*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
