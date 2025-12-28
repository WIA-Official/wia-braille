# WIA-IND-016: Hotel Tech Specification v1.0

> **Standard ID:** WIA-IND-016
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Industry Standards Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Property Management Systems (PMS)](#2-property-management-systems-pms)
3. [Reservation Management](#3-reservation-management)
4. [Room Operations](#4-room-operations)
5. [Smart Room Technology](#5-smart-room-technology)
6. [Keyless Entry Systems](#6-keyless-entry-systems)
7. [Housekeeping Management](#7-housekeeping-management)
8. [Revenue Management](#8-revenue-management)
9. [Channel Manager Integration](#9-channel-manager-integration)
10. [Guest Services](#10-guest-services)
11. [Point of Sale (POS) Integration](#11-point-of-sale-pos-integration)
12. [Guest Feedback & Reputation](#12-guest-feedback--reputation)
13. [Security & Compliance](#13-security--compliance)
14. [API Specifications](#14-api-specifications)
15. [Data Models](#15-data-models)
16. [Implementation Guidelines](#16-implementation-guidelines)

---

## 1. Introduction

### 1.1 Purpose

This specification defines comprehensive standards for hotel technology systems, enabling seamless integration across all aspects of hotel operations from guest discovery to post-stay feedback.

### 1.2 Scope

The standard covers:
- Property Management System (PMS) core functionality
- Multi-channel reservation management
- Smart room automation and IoT integration
- Keyless entry and access control
- Housekeeping coordination and room status
- Dynamic pricing and revenue optimization
- Channel manager and OTA distribution
- Guest services and concierge automation
- Payment processing and PCI compliance
- Guest feedback and review management

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to democratize access to advanced hotel technology, enabling properties of all sizes to deliver exceptional guest experiences while improving operational efficiency and sustainability.

### 1.4 Terminology

- **PMS**: Property Management System - central hotel operations platform
- **OTA**: Online Travel Agency (e.g., Booking.com, Expedia)
- **GDS**: Global Distribution System
- **ADR**: Average Daily Rate
- **RevPAR**: Revenue Per Available Room
- **Occupancy**: Percentage of rooms occupied
- **BAR**: Best Available Rate
- **LOS**: Length of Stay
- **PAX**: Passengers/Guests

---

## 2. Property Management Systems (PMS)

### 2.1 Core PMS Functions

#### 2.1.1 Front Desk Operations

The PMS SHALL provide front desk functionality including:

```
Front Desk Operations:
1. Guest check-in/check-out
2. Room assignment and management
3. Walk-in reservations
4. Room moves and changes
5. Guest profile management
6. Folio management
7. Payment processing
8. Wake-up call scheduling
```

#### 2.1.2 Reservation Management

**Reservation Creation**:
```json
{
  "confirmationNumber": "ABC123",
  "guestProfile": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "USA"
    }
  },
  "stayDetails": {
    "checkIn": "2025-01-15",
    "checkOut": "2025-01-18",
    "nights": 3,
    "roomType": "deluxe-king",
    "adults": 2,
    "children": 0
  },
  "rateDetails": {
    "rateCode": "BAR",
    "roomRate": 250.00,
    "totalAmount": 862.50,
    "taxesAndFees": 112.50,
    "currency": "USD"
  }
}
```

#### 2.1.3 Guest Profile Management

Guest profiles SHALL store:
- Personal information (name, contact, nationality)
- Stay history and preferences
- Loyalty program membership
- Payment methods
- Special requirements
- Communication preferences
- Marketing consent

**Profile Data Structure**:
```json
{
  "guestId": "guest-12345",
  "personalInfo": {
    "title": "Mr.",
    "firstName": "John",
    "lastName": "Smith",
    "dateOfBirth": "1985-06-15",
    "nationality": "US"
  },
  "preferences": {
    "roomLocation": "high-floor",
    "bedType": "king",
    "pillowType": "firm",
    "temperature": 21,
    "newspaper": "Wall Street Journal"
  },
  "loyaltyMembership": {
    "program": "Elite Rewards",
    "memberNumber": "ELT789456",
    "tier": "Gold",
    "points": 25000
  },
  "stayHistory": [
    {
      "propertyId": "hotel-001",
      "checkIn": "2024-12-01",
      "checkOut": "2024-12-05",
      "totalSpent": 1200.00
    }
  ]
}
```

### 2.2 PMS Integration Architecture

#### 2.2.1 System Integration Diagram

```
┌─────────────────┐
│   Web Booking   │
│     Engine      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  Central PMS    │◄────►│  Channel     │
│    (Core Hub)   │      │  Manager     │
└────────┬────────┘      └──────────────┘
         │
         ├──────────┬──────────┬──────────┬──────────┐
         ▼          ▼          ▼          ▼          ▼
    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
    │  Room  │ │Revenue │ │  POS   │ │  CRM   │ │  IoT   │
    │Controls│ │ Mgmt   │ │        │ │        │ │Gateway │
    └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

#### 2.2.2 API Integration Standards

All PMS integrations SHALL support:
- RESTful API with JSON payload
- OAuth 2.0 authentication
- Webhook notifications for real-time updates
- Rate limiting (100 requests/minute)
- SSL/TLS encryption (minimum TLS 1.2)

### 2.3 Reporting and Analytics

#### 2.3.1 Standard Reports

The PMS SHALL generate:

1. **Daily Operations Report**:
   - Arrivals, departures, stayovers
   - Room status summary
   - Revenue breakdown
   - Occupancy percentage

2. **Financial Reports**:
   - Daily revenue report
   - Department breakdown
   - Payment method summary
   - Outstanding balances

3. **Forecasting Reports**:
   - 30/60/90 day occupancy forecast
   - Revenue projections
   - Pickup reports
   - Pace reports

#### 2.3.2 Key Performance Indicators

```
KPI Calculations:

Occupancy Rate = (Rooms Occupied / Total Rooms) × 100

ADR = Total Room Revenue / Rooms Sold

RevPAR = Total Room Revenue / Total Available Rooms
       = Occupancy Rate × ADR

GOPPAR = Gross Operating Profit / Total Available Rooms
```

---

## 3. Reservation Management

### 3.1 Reservation Lifecycle

#### 3.1.1 Reservation States

```
Reservation State Machine:

Inquiry → Quoted → Confirmed → Guaranteed
                      ↓
                  Modified ←→ Confirmed
                      ↓
              ┌───────┴───────┐
              ↓               ↓
         Checked-In      Cancelled
              ↓               ↓
         Checked-Out      No-Show
              ↓
         Completed
```

#### 3.1.2 Modification Rules

**Allowed Modifications**:
- Date changes (subject to availability)
- Room type upgrades/downgrades
- Guest count changes
- Rate adjustments (with authorization)
- Additional services

**Modification Constraints**:
```javascript
function canModifyReservation(reservation, modification) {
  const now = new Date();
  const checkIn = new Date(reservation.checkIn);
  const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);

  if (reservation.status === 'checked-in' ||
      reservation.status === 'checked-out') {
    return false;
  }

  if (modification.type === 'dates' && hoursUntilCheckIn < 24) {
    return false; // Cannot modify dates within 24 hours
  }

  return true;
}
```

### 3.2 Rate Management

#### 3.2.1 Rate Plan Types

| Rate Code | Description | Restrictions | Cancellation |
|-----------|-------------|--------------|--------------|
| BAR | Best Available Rate | None | Flexible |
| CORP | Corporate Rate | ID required | Moderate |
| GOV | Government Rate | ID required | Flexible |
| AAA | AAA Member Rate | Membership | Flexible |
| PROMO | Promotional Rate | Advance purchase | Strict |
| PKG | Package Rate | Includes amenities | Moderate |
| GROUP | Group Rate | Min 10 rooms | Custom |
| LRA | Last Room Available | Non-refundable | None |

#### 3.2.2 Rate Calculation

**Base Rate Calculation**:
```
FinalRate = BaseRate × SeasonMultiplier × DOWMultiplier × LOSMultiplier

Where:
- BaseRate: Room type base price
- SeasonMultiplier: Seasonal adjustment (0.8 - 1.5)
- DOWMultiplier: Day of week adjustment (0.9 - 1.2)
- LOSMultiplier: Length of stay discount (0.85 - 1.0)
```

**Example**:
```
Deluxe King Room:
Base Rate: $250
High Season: × 1.3 = $325
Weekend: × 1.1 = $357.50
3+ nights: × 0.95 = $339.63

Final Rate: $340/night
```

### 3.3 Cancellation Policies

#### 3.3.1 Policy Types

**Flexible Policy**:
```json
{
  "type": "flexible",
  "freeCancellationHours": 24,
  "penalty": {
    "within24Hours": "1 night charge",
    "noShow": "full stay charge"
  }
}
```

**Moderate Policy**:
```json
{
  "type": "moderate",
  "freeCancellationDays": 7,
  "penalty": {
    "7to3Days": "50% charge",
    "within3Days": "100% charge",
    "noShow": "full stay + 1 night"
  }
}
```

**Strict/Non-Refundable**:
```json
{
  "type": "non-refundable",
  "refundAmount": 0,
  "benefits": {
    "discount": "20-30% lower rate",
    "pointsBonus": "double loyalty points"
  }
}
```

#### 3.3.2 Cancellation Processing

```javascript
function processCancellation(reservation) {
  const now = new Date();
  const checkIn = new Date(reservation.checkIn);
  const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);

  let penalty = 0;
  let refund = reservation.totalAmount;

  if (reservation.cancellationPolicy.type === 'non-refundable') {
    penalty = reservation.totalAmount;
    refund = 0;
  } else if (hoursUntilCheckIn < 24) {
    penalty = reservation.roomRate; // 1 night
    refund = reservation.totalAmount - penalty;
  }

  return {
    refundAmount: refund,
    penaltyAmount: penalty,
    processingFee: 0
  };
}
```

---

## 4. Room Operations

### 4.1 Room Inventory Management

#### 4.1.1 Room Status Types

```
Room Status Workflow:

┌─────────────┐
│  Available  │◄──────┐
└──────┬──────┘       │
       │              │
       ▼              │
┌─────────────┐       │
│  Reserved   │       │
└──────┬──────┘       │
       │              │
       ▼              │
┌─────────────┐       │
│  Occupied   │       │
└──────┬──────┘       │
       │              │
       ▼              │
┌─────────────┐       │
│    Dirty    │       │
└──────┬──────┘       │
       │              │
       ▼              │
┌─────────────┐       │
│  Cleaning   │       │
└──────┬──────┘       │
       │              │
       ▼              │
┌─────────────┐       │
│    Clean    │       │
└──────┬──────┘       │
       │              │
       ▼              │
┌─────────────┐       │
│  Inspected  │───────┘
└─────────────┘
```

#### 4.1.2 Room Blocking

**Block Types**:
- **Out of Order (OOO)**: Room unusable due to maintenance
- **Out of Service (OOS)**: Room temporarily unavailable
- **House Use**: Staff or complimentary use
- **Do Not Rent**: Management restriction

**Block Management**:
```json
{
  "roomNumber": "305",
  "blockType": "out-of-order",
  "reason": "HVAC repair",
  "blockedFrom": "2025-01-15",
  "blockedUntil": "2025-01-17",
  "estimatedRevenueLoss": 500.00,
  "maintenanceTicket": "MNT-12345"
}
```

### 4.2 Room Assignment

#### 4.2.1 Auto-Assignment Algorithm

```javascript
function autoAssignRoom(reservation, availableRooms) {
  const preferences = reservation.guest.preferences;

  // Score each room
  const scoredRooms = availableRooms.map(room => {
    let score = 0;

    // Floor preference
    if (preferences.roomLocation === 'high-floor' && room.floor >= 5) {
      score += 10;
    } else if (preferences.roomLocation === 'low-floor' && room.floor <= 3) {
      score += 10;
    }

    // View preference
    if (preferences.view && room.view === preferences.view) {
      score += 15;
    }

    // Quiet area
    if (preferences.quiet && room.quietArea) {
      score += 10;
    }

    // Recent cleaning
    const hoursSinceCleaned = (Date.now() - room.lastCleaned) / (1000 * 60 * 60);
    if (hoursSinceCleaned < 2) {
      score += 5;
    }

    // VIP preference for better rooms
    if (reservation.guest.vipStatus === 'platinum') {
      score += room.floor * 2; // Higher floors for VIPs
    }

    return { room, score };
  });

  // Sort by score and return best match
  scoredRooms.sort((a, b) => b.score - a.score);
  return scoredRooms[0].room;
}
```

#### 4.2.2 Upgrade Logic

```javascript
function shouldOfferUpgrade(reservation, currentOccupancy) {
  // Upgrade criteria
  const isLoyaltyMember = reservation.guest.loyaltyMembership !== null;
  const isVIP = reservation.guest.vipStatus !== 'standard';
  const isLowOccupancy = currentOccupancy < 0.6;
  const isLongStay = reservation.nights >= 5;
  const isSpecialOccasion = reservation.specialRequests?.includes('honeymoon') ||
                            reservation.specialRequests?.includes('anniversary');

  // Upgrade priority score
  let upgradeScore = 0;
  if (isVIP) upgradeScore += 30;
  if (isLoyaltyMember) upgradeScore += 20;
  if (isLongStay) upgradeScore += 15;
  if (isSpecialOccasion) upgradeScore += 25;
  if (isLowOccupancy) upgradeScore += 10;

  // Offer upgrade if score > threshold
  return upgradeScore >= 40;
}
```

---

## 5. Smart Room Technology

### 5.1 IoT Device Integration

#### 5.1.1 Supported Device Types

**Climate Control**:
```json
{
  "deviceType": "thermostat",
  "model": "Nest Thermostat E",
  "protocol": "MQTT",
  "capabilities": {
    "modes": ["heat", "cool", "auto", "off"],
    "temperatureRange": {
      "min": 16,
      "max": 30,
      "unit": "celsius"
    },
    "scheduling": true,
    "occupancyDetection": true,
    "remoteControl": true
  }
}
```

**Lighting Control**:
```json
{
  "deviceType": "lighting",
  "model": "Philips Hue",
  "protocol": "Zigbee",
  "capabilities": {
    "zones": ["bedroom", "bathroom", "closet"],
    "dimming": true,
    "colorTemperature": {
      "min": 2000,
      "max": 6500,
      "unit": "kelvin"
    },
    "scenes": ["welcome", "reading", "evening", "sleep"],
    "voiceControl": true
  }
}
```

**Smart Lock**:
```json
{
  "deviceType": "door-lock",
  "model": "Yale Assure Lock",
  "protocol": "Z-Wave",
  "capabilities": {
    "accessMethods": ["mobile-key", "rfid", "pin", "biometric"],
    "autoLock": true,
    "unlockLogging": true,
    "temporaryAccess": true,
    "integrateWithPMS": true
  }
}
```

#### 5.1.2 Room Scenes

**Pre-defined Scenes**:

1. **Welcome Scene** (activated on check-in):
   ```
   - Lights: 80% brightness, warm white (3000K)
   - Temperature: Set to guest preference or 22°C
   - Curtains: 50% open
   - TV: Display welcome message
   - Music: Soft background music (optional)
   ```

2. **Reading Scene**:
   ```
   - Lights: Bedside lamps 100%, others 30%
   - Color temperature: 4000K
   - Climate: Maintain current setting
   ```

3. **Sleep Scene**:
   ```
   - Lights: All off except nightlight (5%)
   - Temperature: Reduce by 1°C
   - Curtains: Fully closed
   - Do Not Disturb: Activated
   ```

4. **Wake Up Scene**:
   ```
   - Lights: Gradual increase over 15 minutes
   - Curtains: Gradual open over 10 minutes
   - Temperature: Increase to day setting
   - Music: Gentle alarm (if set)
   ```

#### 5.1.3 Energy Management

**Occupancy-Based Control**:
```javascript
function adjustRoomEnergyMode(room, occupancyStatus) {
  if (occupancyStatus === 'occupied') {
    return {
      hvac: 'comfort-mode',
      temperatureRange: [20, 24],
      lighting: 'auto',
      powerOutlets: 'enabled'
    };
  } else if (occupancyStatus === 'vacant-reserved') {
    return {
      hvac: 'eco-mode',
      temperatureRange: [18, 26],
      lighting: 'off',
      powerOutlets: 'standby'
    };
  } else { // vacant-available
    return {
      hvac: 'deep-eco-mode',
      temperatureRange: [16, 28],
      lighting: 'off',
      powerOutlets: 'disabled'
    };
  }
}
```

**Energy Savings Calculation**:
```
Daily Energy Consumption:

Occupied Mode: 25 kWh/day
Eco Mode: 10 kWh/day (60% reduction)
Deep Eco Mode: 3 kWh/day (88% reduction)

Annual Savings (100-room hotel, 70% occupancy):
= 30 vacant rooms × 15 kWh savings × 365 days
= 164,250 kWh/year
= ~$24,600/year (at $0.15/kWh)
```

### 5.2 Voice Assistant Integration

#### 5.2.1 Supported Commands

**Room Control**:
- "Set temperature to 22 degrees"
- "Turn on the lights"
- "Close the curtains"
- "Play some relaxing music"
- "Set wake-up call for 7 AM"

**Hotel Services**:
- "Call the front desk"
- "Order room service"
- "Request housekeeping"
- "Book a spa appointment"
- "Extend my check-out time"

**Information**:
- "What time is breakfast?"
- "Where is the gym?"
- "Recommend a nearby restaurant"
- "Check out times"

#### 5.2.2 Multi-Language Support

Required languages:
- English (en-US, en-GB, en-AU)
- Spanish (es-ES, es-MX)
- French (fr-FR)
- German (de-DE)
- Mandarin Chinese (zh-CN)
- Japanese (ja-JP)
- Korean (ko-KR)

---

## 6. Keyless Entry Systems

### 6.1 Mobile Key Technology

#### 6.1.1 Mobile Key Generation

**Key Creation Process**:
```
1. Guest checks in (online or at desk)
2. PMS triggers key generation
3. Encryption key generated
4. Key sent to guest's mobile app
5. Key activated at check-in time
6. Key expires at check-out + buffer period
```

**Mobile Key Data Structure**:
```json
{
  "keyId": "KEY-20250115-ABC123",
  "guestId": "guest-12345",
  "roomNumber": "305",
  "propertyId": "hotel-001",
  "validFrom": "2025-01-15T15:00:00Z",
  "validUntil": "2025-01-18T13:00:00Z",
  "accessLevel": {
    "room": true,
    "elevator": true,
    "pool": true,
    "gym": true,
    "executiveLounge": true,
    "parkingGate": true
  },
  "encryptionKey": "AES256-encrypted-key",
  "issueDate": "2025-01-14T10:30:00Z",
  "revoked": false
}
```

#### 6.1.2 Security Protocols

**Encryption Standards**:
- AES-256 encryption for key data
- TLS 1.3 for transmission
- Time-based one-time passwords (TOTP)
- Bluetooth Low Energy (BLE) with encrypted handshake

**Access Verification**:
```javascript
function verifyMobileKeyAccess(key, door, timestamp) {
  // Check key validity period
  if (timestamp < key.validFrom || timestamp > key.validUntil) {
    return { granted: false, reason: 'Key expired or not yet valid' };
  }

  // Check if key is revoked
  if (key.revoked) {
    return { granted: false, reason: 'Key has been revoked' };
  }

  // Check room access
  if (door.type === 'room' && door.number !== key.roomNumber) {
    return { granted: false, reason: 'Not authorized for this room' };
  }

  // Check area access
  if (door.type === 'facility') {
    const facilityName = door.name.toLowerCase();
    if (!key.accessLevel[facilityName]) {
      return { granted: false, reason: `Not authorized for ${door.name}` };
    }
  }

  // Log access
  logAccess(key.keyId, door, timestamp, true);

  return { granted: true };
}
```

### 6.2 RFID Card Systems

#### 6.2.1 Card Encoding

**RFID Card Format** (MIFARE Classic):
```
Sector 0, Block 0: Manufacturer data (read-only)
Sector 0, Block 1: Hotel ID + Property ID
Sector 0, Block 2: Room number + Valid from/until
Sector 1, Block 0: Guest ID + Access level bits
Sector 1, Block 1: Encryption checksum
```

**Encoding Process**:
```javascript
function encodeRFIDCard(reservation) {
  const cardData = {
    hotelId: 'HTL001',
    propertyId: reservation.propertyId,
    roomNumber: reservation.roomNumber,
    validFrom: reservation.checkIn,
    validUntil: addHours(reservation.checkOut, 2), // 2-hour buffer
    guestId: reservation.guest.guestId,
    accessLevel: calculateAccessLevel(reservation.guest)
  };

  // Encode with AES-128
  const encodedData = encryptAES128(cardData, HOTEL_MASTER_KEY);

  // Write to card
  return writeToRFIDCard(encodedData);
}
```

### 6.3 Access Logging

#### 6.3.1 Access Log Entry

```json
{
  "logId": "access-20250115-001234",
  "timestamp": "2025-01-15T16:45:32Z",
  "keyId": "KEY-20250115-ABC123",
  "guestId": "guest-12345",
  "location": "Room 305",
  "accessMethod": "mobile-key",
  "result": "granted",
  "deviceId": "lock-305",
  "ipAddress": "10.0.1.105"
}
```

#### 6.3.2 Audit Trail

Access logs SHALL be retained for:
- Minimum 90 days for regulatory compliance
- 1 year for security investigations
- Encrypted at rest
- Access restricted to authorized personnel

---

## 7. Housekeeping Management

### 7.1 Room Assignment

#### 7.1.1 Assignment Algorithm

**Priority Factors**:
```javascript
function assignHousekeepingTasks(rooms, staff) {
  const assignments = [];

  rooms.forEach(room => {
    let priority = 0;

    // Check-in today
    if (room.arrivalToday) priority += 100;

    // VIP guest
    if (room.vipGuest) priority += 50;

    // Checkout dirty room
    if (room.status === 'dirty' && room.departureToday) priority += 80;

    // Stayover service
    if (room.status === 'occupied' && room.stayover) priority += 30;

    // Deep clean scheduled
    if (room.deepCleanScheduled) priority += 40;

    room.priority = priority;
  });

  // Sort by priority
  rooms.sort((a, b) => b.priority - a.priority);

  // Assign to available staff
  // ... assignment logic
}
```

#### 7.1.2 Task Types

| Task Type | Duration | Priority | Requirements |
|-----------|----------|----------|--------------|
| Checkout Clean | 30 min | High | Full clean + inspection |
| Stayover Service | 15 min | Medium | Refresh + tidy |
| Deep Clean | 60 min | Medium | Monthly rotation |
| Rush Clean | 20 min | Urgent | For early check-in |
| Turndown Service | 10 min | Low | Evening service |

### 7.2 Cleaning Standards

#### 7.2.1 Checkout Room Cleaning

**Standard Procedure**:
```
1. Knock and announce (wait 30 seconds)
2. Enter and prop door open
3. Remove all linens and towels
4. Empty all trash bins
5. Clean bathroom (15 min):
   - Toilet, sink, shower/tub
   - Mirror and fixtures
   - Restock amenities
6. Dust and vacuum bedroom (10 min)
7. Make bed with fresh linens
8. Restock coffee/tea
9. Final inspection
10. Update room status in system
```

**Quality Checklist**:
- [ ] Bed properly made (hospital corners)
- [ ] Bathroom spotless
- [ ] All surfaces dusted
- [ ] Carpet vacuumed (no visible dirt)
- [ ] Amenities fully stocked
- [ ] TV and AC remotes present
- [ ] No items left behind
- [ ] Room smells fresh

#### 7.2.2 Stayover Service

```
1. Knock and announce
2. Ask guest preferences
3. If guest absent:
   - Make bed (if unmade)
   - Replace towels (if on floor)
   - Empty trash
   - Refresh amenities
   - Quick tidy
4. Update room status
```

### 7.3 Inventory Management

#### 7.3.1 Linen Management

**Par Levels**:
```
Per Room:
- Sheets: 3 sets
- Pillowcases: 6
- Bath towels: 4
- Hand towels: 4
- Face towels: 4
- Bath mat: 2

Total Property (100 rooms):
- Sheets: 300 sets
- Towels: 1,200 bath + 1,200 hand
- Replacement cycle: 12-18 months
```

**Automated Reorder**:
```javascript
function checkInventoryLevels(inventory, parLevels) {
  const reorderList = [];

  for (const [item, quantity] of Object.entries(inventory)) {
    const par = parLevels[item];
    const reorderPoint = par * 0.3; // 30% of par level

    if (quantity < reorderPoint) {
      reorderList.push({
        item: item,
        currentQty: quantity,
        parLevel: par,
        orderQty: par - quantity,
        urgency: quantity < (reorderPoint * 0.5) ? 'urgent' : 'normal'
      });
    }
  }

  return reorderList;
}
```

---

## 8. Revenue Management

### 8.1 Dynamic Pricing

#### 8.1.1 Pricing Factors

**Demand-Based Pricing Model**:
```
OptimalRate = BaseRate × DemandMultiplier × SeasonalMultiplier ×
              CompetitorAdjustment × SpecialEventMultiplier

Where:
DemandMultiplier = f(CurrentOccupancy, PickupRate, DaysToArrival)
SeasonalMultiplier ∈ [0.8, 1.5]
CompetitorAdjustment ∈ [0.9, 1.1]
SpecialEventMultiplier ∈ [1.0, 2.0]
```

**Demand Multiplier Calculation**:
```javascript
function calculateDemandMultiplier(occupancy, pickupRate, daysToArrival) {
  let multiplier = 1.0;

  // Occupancy-based adjustment
  if (occupancy > 0.90) multiplier = 1.30;
  else if (occupancy > 0.80) multiplier = 1.20;
  else if (occupancy > 0.70) multiplier = 1.10;
  else if (occupancy < 0.50) multiplier = 0.85;
  else if (occupancy < 0.60) multiplier = 0.90;

  // Pickup rate adjustment (how fast bookings are coming in)
  if (pickupRate > 1.5) multiplier *= 1.10; // High pickup
  else if (pickupRate < 0.5) multiplier *= 0.95; // Low pickup

  // Days to arrival adjustment
  if (daysToArrival < 3 && occupancy < 0.70) {
    multiplier *= 0.90; // Last-minute discount
  } else if (daysToArrival > 60) {
    multiplier *= 0.95; // Advance purchase discount
  }

  return multiplier;
}
```

#### 8.1.2 Competitive Pricing

**Rate Shopping**:
```javascript
async function shopCompetitorRates(property, date, roomType) {
  const competitors = property.competitorSet;
  const rates = [];

  for (const competitor of competitors) {
    const rate = await fetchCompetitorRate(competitor.id, date, roomType);
    rates.push({
      competitorId: competitor.id,
      competitorName: competitor.name,
      rate: rate,
      starRating: competitor.stars,
      distance: competitor.distanceKm
    });
  }

  // Calculate competitive position
  const myRate = calculateMyRate(property, date, roomType);
  const avgCompRate = rates.reduce((sum, r) => sum + r.rate, 0) / rates.length;

  return {
    myRate: myRate,
    competitorRates: rates,
    avgCompetitorRate: avgCompRate,
    positioning: myRate / avgCompRate, // 1.0 = at parity
    recommendation: generatePricingRecommendation(myRate, rates)
  };
}
```

### 8.2 Yield Optimization

#### 8.2.1 Length of Stay (LOS) Controls

**Minimum LOS Strategy**:
```javascript
function setMinimumLOS(date, occupancy, demandLevel) {
  // High demand periods - require longer stays
  if (demandLevel === 'very-high' && occupancy > 0.85) {
    return 3; // Minimum 3-night stay
  } else if (demandLevel === 'high' && occupancy > 0.75) {
    return 2; // Minimum 2-night stay
  }

  // Special events
  if (isSpecialEvent(date)) {
    return getEventMinimumLOS(date);
  }

  return 1; // No minimum
}
```

**Closed to Arrival (CTA)**:
```javascript
function shouldCloseTo Arrival(date, occupancy, nextDayOccupancy) {
  // Close one-night stays on peak nights to encourage longer stays
  if (occupancy > 0.90 && nextDayOccupancy < 0.60) {
    return true; // Don't want checkouts on high-demand night
  }

  return false;
}
```

#### 8.2.2 Overbooking Strategy

**Safe Overbooking Level**:
```
Optimal Overbooking = Historical No-Show Rate + Safety Buffer

Example:
No-show rate: 5%
Cancellation rate: 8%
Safety buffer: 2%

Maximum overbooking = 5% + (8% × 0.5) + 2% = 11%

For 100-room hotel:
Sellable inventory = 100 + (100 × 0.11) = 111 rooms
```

**Walk Management**:
```javascript
function handleOverbooking(arrivals, capacity) {
  const oversold = arrivals.length - capacity;

  if (oversold > 0) {
    // Prioritize who to walk (relocate to another hotel)
    const walkCandidates = arrivals
      .filter(r => !r.guest.vipStatus && !r.prePaid)
      .sort((a, b) => a.nights - b.nights); // Walk shorter stays first

    const toWalk = walkCandidates.slice(0, oversold);

    toWalk.forEach(reservation => {
      relocateGuest(reservation, {
        hotelClass: 'same-or-better',
        transportationProvided: true,
        compensationOffered: true,
        futureNightCredit: 1
      });
    });
  }
}
```

### 8.3 Forecasting

#### 8.3.1 Demand Forecasting Model

**Time Series Forecasting**:
```
Forecast = Trend + Seasonality + Events + RandomVariation

Trend: Long-term growth/decline
Seasonality: Recurring patterns (day of week, month)
Events: Conferences, holidays, special events
RandomVariation: Unexplained variance
```

**Example Calculation**:
```javascript
function forecastOccupancy(date, historicalData, events) {
  // Get historical average for this day of year
  const historicalAvg = getHistoricalAverage(date, historicalData);

  // Apply trend
  const trend = calculateTrend(historicalData);
  const trendAdjusted = historicalAvg * (1 + trend);

  // Apply events multiplier
  const eventMultiplier = getEventImpact(date, events);
  const eventAdjusted = trendAdjusted * eventMultiplier;

  // Day of week adjustment
  const dowMultiplier = getDayOfWeekMultiplier(date);
  const forecast = eventAdjusted * dowMultiplier;

  return {
    forecastedOccupancy: Math.min(forecast, 1.0),
    confidence: calculateConfidence(historicalData, events),
    upperBound: forecast * 1.1,
    lowerBound: forecast * 0.9
  };
}
```

---

## 9. Channel Manager Integration

### 9.1 OTA Connectivity

#### 9.1.1 Supported Channels

**Major OTAs**:
- Booking.com (largest global OTA)
- Expedia Group (Expedia, Hotels.com, Vrbo)
- Airbnb (vacation rentals)
- Agoda (Asia-Pacific focus)
- Trip.com (China market)

**GDS Systems**:
- Amadeus
- Sabre
- Galileo/Apollo

#### 9.1.2 Real-Time Updates

**Update Types**:

1. **Rate Update** (ARI - Availability, Rates, Inventory):
```json
{
  "updateType": "rate",
  "propertyId": "hotel-001",
  "roomType": "deluxe-king",
  "ratePlan": "BAR",
  "dateRange": {
    "start": "2025-01-15",
    "end": "2025-01-31"
  },
  "rates": [
    {
      "date": "2025-01-15",
      "rate": 250.00,
      "currency": "USD",
      "availability": 5,
      "restrictions": {
        "minLOS": 1,
        "maxLOS": 14,
        "closedToArrival": false,
        "closedToDeparture": false,
        "stopSell": false
      }
    }
  ]
}
```

2. **Inventory Update**:
```json
{
  "updateType": "inventory",
  "propertyId": "hotel-001",
  "roomType": "deluxe-king",
  "date": "2025-01-15",
  "available": 5,
  "totalInventory": 10
}
```

3. **Booking Import**:
```json
{
  "updateType": "booking",
  "source": "booking.com",
  "confirmationNumber": "BDC-789456123",
  "guest": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com"
  },
  "stayDetails": {
    "checkIn": "2025-01-15",
    "checkOut": "2025-01-17",
    "roomType": "deluxe-king",
    "adults": 2
  },
  "paymentDetails": {
    "totalAmount": 500.00,
    "currency": "USD",
    "status": "prepaid"
  }
}
```

### 9.2 Rate Parity Management

#### 9.2.1 Parity Monitoring

**Automated Rate Shopping**:
```javascript
async function monitorRateParity(property) {
  const channels = property.channels;
  const dates = getNext30Days();

  for (const date of dates) {
    const rates = {};

    for (const channel of channels) {
      const rate = await fetchRateFromChannel(channel, date);
      rates[channel.name] = rate;
    }

    // Check for parity violations
    const uniqueRates = new Set(Object.values(rates));
    if (uniqueRates.size > 1) {
      reportParityViolation({
        date: date,
        rates: rates,
        expected: property.baseRate,
        severity: calculateSeverity(rates)
      });
    }
  }
}
```

#### 9.2.2 Commission Management

**Channel Commission Rates**:
```
Booking.com: 15-25% (negotiable)
Expedia: 18-25%
Airbnb: 3% guest fee + 14-16% host fee
Agoda: 18-20%
Direct booking: 0% + credit card fees (2-3%)
```

**Net Rate Calculation**:
```javascript
function calculateNetRate(grossRate, channel) {
  const commission = channel.commissionRate;
  const creditCardFee = 0.03;

  // Net rate after commissions
  const netRate = grossRate * (1 - commission - creditCardFee);

  return {
    grossRate: grossRate,
    commission: grossRate * commission,
    creditCardFee: grossRate * creditCardFee,
    netRate: netRate,
    profitMargin: (netRate / grossRate) * 100
  };
}
```

---

## 10. Guest Services

### 10.1 Concierge Automation

#### 10.1.1 AI-Powered Recommendations

**Personalization Engine**:
```javascript
function generateRecommendations(guest, context) {
  const preferences = guest.preferences;
  const history = guest.stayHistory;

  // Analyze past behavior
  const diningPreferences = analyzeDiningHistory(history);
  const activityPreferences = analyzeActivityHistory(history);

  // Get local options
  const restaurants = getNearbyRestaurants(context.location);
  const attractions = getNearbyAttractions(context.location);

  // Score and rank
  const recommendations = {
    restaurants: scoreOptions(restaurants, diningPreferences),
    attractions: scoreOptions(attractions, activityPreferences),
    events: getUpcomingEvents(context.date, preferences)
  };

  return recommendations;
}
```

**Restaurant Recommendation**:
```json
{
  "recommendationId": "rec-rest-001",
  "name": "The Gourmet Bistro",
  "type": "restaurant",
  "cuisine": "French",
  "priceLevel": 3,
  "rating": 4.5,
  "distance": 500,
  "walkingTime": 7,
  "matchScore": 0.92,
  "matchReasons": [
    "Matches your preference for French cuisine",
    "Within preferred price range",
    "Highly rated by other guests"
  ],
  "reservationAvailable": true,
  "reservationLink": "https://...",
  "menuLink": "https://..."
}
```

#### 10.1.2 Request Management

**Service Request Types**:
- Wake-up call
- Room service
- Housekeeping
- Maintenance
- Transportation
- Restaurant reservations
- Tour bookings
- Spa appointments

**Request Processing**:
```javascript
function processServiceRequest(request) {
  const {type, guestId, roomNumber, details, urgency} = request;

  // Route to appropriate department
  const department = routeRequest(type);

  // Create work order
  const workOrder = {
    requestId: generateRequestId(),
    type: type,
    guestId: guestId,
    roomNumber: roomNumber,
    department: department,
    status: 'pending',
    priority: calculatePriority(urgency, type),
    details: details,
    createdAt: new Date()
  };

  // Assign to available staff
  const assignedStaff = assignToStaff(workOrder);

  // Notify guest
  notifyGuest(guestId, {
    message: `Your ${type} request has been received`,
    estimatedTime: estimateCompletionTime(type),
    assignedTo: assignedStaff.name
  });

  return workOrder;
}
```

### 10.2 Guest Communication

#### 10.2.1 Pre-Arrival Communication

**Timeline**:
```
T-30 days: Booking confirmation
T-14 days: Pre-arrival email (special requests)
T-7 days: Reminder + upgrade offers
T-3 days: Pre-check-in invitation
T-1 day: Arrival confirmation + directions
```

**Pre-Check-In Email**:
```html
Subject: Welcome to [Hotel Name] - Check-in Tomorrow!

Dear [Guest Name],

We're excited to welcome you tomorrow!

Reservation Details:
- Confirmation: ABC123
- Check-in: January 15, 2025 at 3:00 PM
- Check-out: January 18, 2025 at 11:00 AM
- Room: Deluxe King

Pre-Check-In:
Complete check-in online and receive your mobile key:
[Pre-Check-In Link]

Special Requests:
- High floor ✓
- King bed ✓
- Extra pillows ✓

Getting Here:
[Directions Link]
Parking: Complimentary valet

Questions? Reply to this email or call us at [Phone].

Best regards,
The [Hotel Name] Team
```

#### 10.2.2 During-Stay Communication

**Channels**:
- Mobile app notifications
- SMS
- In-room tablet
- Email
- WhatsApp/WeChat (international guests)

**Message Types**:
- Service confirmations
- Promotional offers
- Event notifications
- Feedback requests
- Emergency alerts

---

## 11. Point of Sale (POS) Integration

### 11.1 POS Systems

#### 11.1.1 Integration Points

**Restaurant POS**:
```json
{
  "transactionId": "POS-123456",
  "timestamp": "2025-01-15T19:30:00Z",
  "outlet": "Main Restaurant",
  "server": "John Doe",
  "roomCharge": {
    "roomNumber": "305",
    "guestName": "John Smith",
    "items": [
      {
        "description": "Ribeye Steak",
        "quantity": 1,
        "price": 45.00
      },
      {
        "description": "House Wine",
        "quantity": 2,
        "price": 12.00
      }
    ],
    "subtotal": 69.00,
    "tax": 6.21,
    "gratuity": 13.80,
    "total": 89.01,
    "signature": "[Guest Signature]"
  }
}
```

**Folio Integration**:
```javascript
function postChargeToFolio(roomNumber, charge) {
  const reservation = getActiveReservation(roomNumber);

  if (!reservation) {
    return {success: false, error: 'No active reservation'};
  }

  // Add charge to folio
  const folioEntry = {
    date: new Date(),
    description: `${charge.outlet} - ${charge.description}`,
    amount: charge.total,
    department: charge.outlet,
    reference: charge.transactionId
  };

  reservation.folio.push(folioEntry);

  // Update total amount
  reservation.totalAmount += charge.total;

  return {success: true, folioEntry: folioEntry};
}
```

### 11.2 Folio Management

#### 11.2.1 Folio Structure

```json
{
  "folioNumber": "F-20250115-001",
  "confirmationNumber": "ABC123",
  "guestName": "John Smith",
  "roomNumber": "305",
  "checkIn": "2025-01-15",
  "checkOut": "2025-01-18",
  "charges": [
    {
      "date": "2025-01-15",
      "description": "Room Charge - Night 1",
      "amount": 250.00,
      "department": "Rooms"
    },
    {
      "date": "2025-01-15",
      "description": "Main Restaurant",
      "amount": 89.01,
      "department": "F&B"
    },
    {
      "date": "2025-01-16",
      "description": "Mini Bar",
      "amount": 35.00,
      "department": "Mini Bar"
    }
  ],
  "payments": [
    {
      "date": "2025-01-15",
      "description": "Deposit",
      "amount": 250.00,
      "method": "Credit Card"
    }
  ],
  "balance": 124.01
}
```

#### 11.2.2 Split Folio

**Company/Personal Split**:
```javascript
function splitFolio(folio, splitRules) {
  const primaryFolio = {...folio, charges: []};
  const secondaryFolio = {...folio, charges: [], folioNumber: folio.folioNumber + '-2'};

  folio.charges.forEach(charge => {
    if (splitRules.companyDepartments.includes(charge.department)) {
      primaryFolio.charges.push(charge);
    } else {
      secondaryFolio.charges.push(charge);
    }
  });

  return {
    companyFolio: primaryFolio,
    personalFolio: secondaryFolio
  };
}
```

---

## 12. Guest Feedback & Reputation

### 12.1 Feedback Collection

#### 12.1.1 Survey Distribution

**Post-Stay Survey Timing**:
```
Day 0 (check-out): Thank you email
Day 1: Feedback survey email
Day 3: Reminder (if not completed)
Day 7: Final reminder
```

**Survey Questions**:
```json
{
  "survey": {
    "title": "How was your stay?",
    "questions": [
      {
        "id": 1,
        "type": "rating",
        "question": "Overall satisfaction",
        "scale": "1-5 stars"
      },
      {
        "id": 2,
        "type": "rating",
        "question": "Room cleanliness",
        "scale": "1-5 stars"
      },
      {
        "id": 3,
        "type": "rating",
        "question": "Staff friendliness",
        "scale": "1-5 stars"
      },
      {
        "id": 4,
        "type": "rating",
        "question": "Value for money",
        "scale": "1-5 stars"
      },
      {
        "id": 5,
        "type": "text",
        "question": "What did you enjoy most?"
      },
      {
        "id": 6,
        "type": "text",
        "question": "How can we improve?"
      },
      {
        "id": 7,
        "type": "boolean",
        "question": "Would you recommend us?"
      }
    ]
  }
}
```

#### 12.1.2 Sentiment Analysis

**Automated Analysis**:
```javascript
function analyzeFeedback(feedback) {
  const text = feedback.comments;

  // Sentiment analysis
  const sentiment = analyzeTextSentiment(text);

  // Extract keywords
  const keywords = extractKeywords(text);

  // Identify issues
  const issues = detectIssues(text, keywords);

  // Calculate Net Promoter Score (NPS)
  const nps = calculateNPS(feedback.wouldRecommend);

  return {
    overallSentiment: sentiment, // positive/neutral/negative
    sentimentScore: sentiment.score, // -1 to +1
    keywords: keywords,
    detectedIssues: issues,
    nps: nps,
    requiresResponse: sentiment.score < 0.5 || issues.length > 0
  };
}
```

### 12.2 Review Management

#### 12.2.1 Review Response

**Response Guidelines**:
```
Positive Reviews (4-5 stars):
- Thank the guest
- Mention specific details they liked
- Invite them back
- Response time: within 24 hours

Negative Reviews (1-3 stars):
- Apologize for the experience
- Address specific concerns
- Explain corrective actions
- Offer to make it right
- Response time: within 12 hours
```

**Response Template**:
```
Dear [Guest Name],

Thank you for your recent stay and for taking the time to share your feedback.

[For Positive]:
We're delighted to hear you enjoyed [specific aspect]. Our team works hard to [related effort], and it's wonderful to know it made a difference in your experience.

[For Negative]:
We sincerely apologize that your stay didn't meet expectations, particularly regarding [specific issue]. We've addressed this with our team and have implemented [corrective action] to prevent this from happening again.

We hope to have the opportunity to welcome you back and provide the experience you deserve.

Warm regards,
[Manager Name]
[Title]
[Hotel Name]
```

### 12.3 Reputation Metrics

#### 12.3.1 Key Metrics

**Reputation Score**:
```
Overall Score = (Σ(Rating_i × Weight_i)) / Σ(Weight_i)

Where:
Rating_i = Rating from source i
Weight_i = Weight of source i

Weights:
- Google Reviews: 30%
- Booking.com: 25%
- TripAdvisor: 20%
- Expedia: 15%
- Direct surveys: 10%
```

**Net Promoter Score (NPS)**:
```
NPS = % Promoters (9-10) - % Detractors (0-6)

Scale:
>70: World class
50-70: Excellent
30-50: Good
0-30: Needs improvement
<0: Critical
```

---

## 13. Security & Compliance

### 13.1 Payment Security

#### 13.1.1 PCI DSS Compliance

**Requirements**:
1. **Network Security**:
   - Firewall configuration
   - No default passwords
   - Encrypted transmission

2. **Cardholder Data Protection**:
   - Encrypt stored data
   - Mask PAN (show only last 4 digits)
   - Secure key management

3. **Access Control**:
   - Unique user IDs
   - Role-based access
   - Multi-factor authentication

4. **Monitoring**:
   - Log all access to cardholder data
   - Regular security testing
   - Incident response plan

**Card Data Handling**:
```javascript
function processPayment(cardData, amount) {
  // Tokenize card data immediately
  const token = tokenizeCard(cardData);

  // Never store full PAN
  const maskedPAN = maskCardNumber(cardData.pan);

  // Process payment via secure gateway
  const result = paymentGateway.charge({
    token: token,
    amount: amount,
    currency: 'USD'
  });

  // Store only token and masked number
  return {
    success: result.success,
    transactionId: result.transactionId,
    maskedPAN: maskedPAN,
    // Original card data is never stored
  };
}
```

### 13.2 Data Privacy

#### 13.2.1 GDPR Compliance

**Guest Data Rights**:
1. Right to access
2. Right to rectification
3. Right to erasure (right to be forgotten)
4. Right to data portability
5. Right to object
6. Right to restrict processing

**Data Retention**:
```
Guest profiles: 7 years (or last stay + 3 years)
Financial records: 7 years (tax requirement)
Marketing consent: Until withdrawn
Security logs: 90 days minimum
```

**Data Export**:
```javascript
async function exportGuestData(guestId) {
  const data = {
    personalInfo: await getGuestProfile(guestId),
    stayHistory: await getStayHistory(guestId),
    preferences: await getPreferences(guestId),
    communications: await getCommunications(guestId),
    marketingConsent: await getMarketingConsent(guestId)
  };

  // Format as JSON
  const jsonData = JSON.stringify(data, null, 2);

  // Encrypt for transmission
  const encrypted = encryptData(jsonData);

  return {
    data: encrypted,
    format: 'JSON',
    encryptionType: 'AES-256'
  };
}
```

### 13.3 System Security

#### 13.3.1 Authentication

**Multi-Factor Authentication**:
```
Staff Login:
1. Username + Password
2. SMS/Email OTP or Authenticator app
3. Optional: Biometric (fingerprint/face)

Session timeout: 30 minutes of inactivity
Password requirements:
- Minimum 12 characters
- Uppercase + lowercase + numbers + symbols
- No common words
- Change every 90 days
```

#### 13.3.2 Audit Logging

**Logged Events**:
```json
{
  "eventId": "audit-20250115-001234",
  "timestamp": "2025-01-15T10:30:45Z",
  "userId": "user-123",
  "userName": "john.smith",
  "action": "view-guest-profile",
  "resource": "guest-12345",
  "ipAddress": "192.168.1.100",
  "deviceId": "workstation-05",
  "result": "success",
  "details": {
    "accessReason": "guest check-in",
    "dataAccessed": ["name", "contact", "preferences"]
  }
}
```

---

## 14. API Specifications

### 14.1 RESTful API Design

#### 14.1.1 Authentication

**OAuth 2.0 Flow**:
```
POST /api/v1/auth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "your-client-id",
  "client_secret": "your-client-secret"
}

Response:
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

**Using Token**:
```
GET /api/v1/reservations/ABC123
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### 14.1.2 Endpoint Structure

**Reservations API**:

```
GET    /api/v1/reservations           - List reservations
POST   /api/v1/reservations           - Create reservation
GET    /api/v1/reservations/{id}      - Get reservation
PUT    /api/v1/reservations/{id}      - Update reservation
DELETE /api/v1/reservations/{id}      - Cancel reservation

GET    /api/v1/availability           - Check availability
POST   /api/v1/reservations/{id}/checkin   - Check in
POST   /api/v1/reservations/{id}/checkout  - Check out
```

**Rooms API**:

```
GET    /api/v1/rooms                  - List rooms
GET    /api/v1/rooms/{number}         - Get room details
PUT    /api/v1/rooms/{number}/status  - Update room status
GET    /api/v1/rooms/availability     - Check room availability
```

**Guests API**:

```
GET    /api/v1/guests                 - List guests
POST   /api/v1/guests                 - Create guest profile
GET    /api/v1/guests/{id}            - Get guest profile
PUT    /api/v1/guests/{id}            - Update guest profile
GET    /api/v1/guests/{id}/history    - Get stay history
```

#### 14.1.3 Response Format

**Success Response**:
```json
{
  "success": true,
  "data": {
    "confirmationNumber": "ABC123",
    "status": "confirmed",
    ...
  },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "requestId": "req-123456"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "ROOM_NOT_AVAILABLE",
    "message": "Requested room type not available for selected dates",
    "details": {
      "roomType": "deluxe-king",
      "checkIn": "2025-01-15",
      "checkOut": "2025-01-18"
    }
  },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "requestId": "req-123456"
  }
}
```

---

## 15. Data Models

### 15.1 Core Entities

#### 15.1.1 Entity Relationship Diagram

```
┌──────────────┐
│   Property   │
└───────┬──────┘
        │
        │ 1:N
        ▼
┌──────────────┐
│  Room Type   │
└───────┬──────┘
        │
        │ 1:N
        ▼
┌──────────────┐       1:N      ┌──────────────┐
│     Room     │◄────────────────│ Reservation  │
└──────────────┘                 └───────┬──────┘
                                         │
                                         │ N:1
                                         ▼
                                 ┌──────────────┐
                                 │    Guest     │
                                 └──────────────┘
```

### 15.2 Database Schema

#### 15.2.1 Reservations Table

```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY,
  confirmation_number VARCHAR(10) UNIQUE NOT NULL,
  property_id UUID NOT NULL,
  guest_id UUID NOT NULL,
  room_type_id UUID NOT NULL,
  room_number VARCHAR(10),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER DEFAULT 0,
  rate_code VARCHAR(10) NOT NULL,
  room_rate DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  taxes_and_fees DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (guest_id) REFERENCES guests(id),
  FOREIGN KEY (room_type_id) REFERENCES room_types(id)
);

CREATE INDEX idx_reservations_confirmation ON reservations(confirmation_number);
CREATE INDEX idx_reservations_guest ON reservations(guest_id);
CREATE INDEX idx_reservations_dates ON reservations(check_in, check_out);
CREATE INDEX idx_reservations_status ON reservations(status);
```

---

## 16. Implementation Guidelines

### 16.1 Integration Checklist

- [ ] PMS core functionality implemented
- [ ] Reservation management operational
- [ ] Room status tracking enabled
- [ ] Payment processing integrated (PCI compliant)
- [ ] Channel manager connected
- [ ] Mobile key system deployed
- [ ] Smart room controls configured
- [ ] Revenue management active
- [ ] Guest feedback system live
- [ ] API endpoints documented
- [ ] Security measures in place
- [ ] Staff training completed

### 16.2 Best Practices

1. **Data Synchronization**:
   - Real-time sync for critical data (reservations, room status)
   - Batch sync for analytics (nightly)
   - Conflict resolution strategy

2. **Scalability**:
   - Design for 10x current load
   - Use caching for frequent queries
   - Implement rate limiting

3. **Monitoring**:
   - System uptime (target: 99.9%)
   - API response times (<500ms)
   - Error rates (<0.1%)
   - User satisfaction scores

4. **Backup and Recovery**:
   - Daily automated backups
   - Point-in-time recovery
   - Disaster recovery plan
   - Regular backup testing

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA - World Certification Industry Association*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
