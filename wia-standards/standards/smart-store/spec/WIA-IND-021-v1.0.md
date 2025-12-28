# WIA-IND-021: Smart Store Specification v1.0

> **Standard ID:** WIA-IND-021
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Industry Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Architecture Overview](#2-architecture-overview)
3. [Automated Checkout System](#3-automated-checkout-system)
4. [Computer Vision System](#4-computer-vision-system)
5. [Smart Shelf Technology](#5-smart-shelf-technology)
6. [Customer Tracking and Analytics](#6-customer-tracking-and-analytics)
7. [Digital Signage System](#7-digital-signage-system)
8. [Electronic Shelf Labels](#8-electronic-shelf-labels)
9. [Smart Shopping Carts](#9-smart-shopping-carts)
10. [Indoor Navigation System](#10-indoor-navigation-system)
11. [Personalized Recommendations](#11-personalized-recommendations)
12. [IoT Inventory Sensors](#12-iot-inventory-sensors)
13. [Payment Processing](#13-payment-processing)
14. [Security and Privacy](#14-security-and-privacy)
15. [Integration Protocols](#15-integration-protocols)
16. [Performance Requirements](#16-performance-requirements)
17. [Implementation Guidelines](#17-implementation-guidelines)
18. [References](#18-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the Smart Store standard, covering automated checkout systems, computer vision-based product recognition, intelligent inventory management, and customer analytics for next-generation retail environments.

### 1.2 Scope

The standard covers:
- Automated checkout and walk-out shopping experiences
- Computer vision systems for product recognition and tracking
- Smart shelf technology with sensors and real-time monitoring
- Customer tracking, analytics, and heatmap generation
- Digital signage and electronic shelf label systems
- Smart shopping carts with self-scanning capabilities
- Indoor navigation and wayfinding systems
- AI-powered personalized recommendations
- IoT sensor networks for inventory management
- Secure payment processing and fraud detection

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - Smart Store technology aims to revolutionize retail by providing seamless shopping experiences, reducing wait times, improving inventory accuracy, and enabling data-driven insights while respecting customer privacy.

### 1.4 Terminology

- **Cashierless Store**: Retail environment with automated checkout
- **Just Walk Out (JWO)**: Technology enabling walk-in, grab, and go shopping
- **Computer Vision**: AI-powered visual recognition and tracking
- **RFID**: Radio-Frequency Identification for product tagging
- **ESL**: Electronic Shelf Labels with digital displays
- **SKU**: Stock Keeping Unit (product identifier)
- **Heatmap**: Visual representation of customer density and movement
- **Edge Computing**: Local data processing for real-time response
- **Digital Twin**: Virtual replica of physical store
- **Planogram**: Visual diagram of product placement

---

## 2. Architecture Overview

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Smart Store Platform                       │
├─────────────────────────────────────────────────────────────┤
│  Application Layer                                           │
│  ├─ Customer App (iOS/Android)                              │
│  ├─ Staff Management Dashboard                              │
│  ├─ Analytics & Reporting                                   │
│  └─ Admin Console                                           │
├─────────────────────────────────────────────────────────────┤
│  Business Logic Layer                                        │
│  ├─ Checkout Orchestration                                  │
│  ├─ Inventory Management                                    │
│  ├─ Customer Analytics                                      │
│  ├─ Recommendation Engine                                   │
│  └─ Payment Processing                                      │
├─────────────────────────────────────────────────────────────┤
│  AI/ML Layer                                                 │
│  ├─ Computer Vision (Product Recognition)                   │
│  ├─ Customer Tracking (Pose Estimation)                     │
│  ├─ Behavior Analysis (Pattern Recognition)                 │
│  ├─ Demand Forecasting                                      │
│  └─ Fraud Detection                                         │
├─────────────────────────────────────────────────────────────┤
│  IoT Device Layer                                            │
│  ├─ Cameras (RGB, Depth, Thermal)                          │
│  ├─ Smart Shelves (Weight, RFID, Optical)                  │
│  ├─ Digital Signage Displays                                │
│  ├─ Electronic Shelf Labels                                 │
│  ├─ Smart Shopping Carts                                    │
│  ├─ Entry/Exit Gates                                        │
│  └─ Environmental Sensors                                   │
├─────────────────────────────────────────────────────────────┤
│  Edge Computing Layer                                        │
│  ├─ Real-time Video Processing                              │
│  ├─ Local Model Inference                                   │
│  ├─ Data Aggregation                                        │
│  └─ Failover Mechanism                                      │
├─────────────────────────────────────────────────────────────┤
│  Network Layer                                               │
│  ├─ 5G/WiFi 6 Connectivity                                  │
│  ├─ Edge-to-Cloud Sync                                      │
│  ├─ Secure VPN Tunnels                                      │
│  └─ Load Balancing                                          │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Store Zones

Smart stores are divided into functional zones:

| Zone | Purpose | Technologies | Coverage |
|------|---------|--------------|----------|
| Entry | Customer identification | Face recognition, QR scanner | 100% |
| Shopping | Product browsing | Cameras, smart shelves | 100% |
| Hot Zones | High-traffic areas | Dense sensors, analytics | Targeted |
| Checkout | Payment processing | POS, automated gates | 100% |
| Exit | Verification | RFID gates, weight check | 100% |
| Backroom | Inventory storage | RFID readers, temp sensors | 100% |

### 2.3 Data Flow

```
Customer Entry → Authentication → Tracking Initiation
                                          ↓
Product Interaction → Vision Recognition → Cart Update
                                          ↓
Movement Tracking → Analytics Update → Heatmap Generation
                                          ↓
Customer Exit → Cart Finalization → Payment Processing
                                          ↓
Receipt Generation → Feedback Collection → Session Close
```

---

## 3. Automated Checkout System

### 3.1 Just Walk Out Technology

The automated checkout system eliminates traditional checkout lines:

**Entry Process:**
1. Customer opens mobile app or taps payment card at entry gate
2. System creates unique session ID and activates tracking
3. Entry gate opens, customer enters store
4. Computer vision begins tracking customer position

**Shopping Process:**
1. Customer browses products normally
2. Picking up item triggers detection:
   - Computer vision identifies product
   - Shelf sensor confirms removal (weight change)
   - RFID reader validates product tag
   - Item added to virtual cart
3. Putting back item triggers reverse process:
   - Vision detects replacement action
   - Shelf sensor confirms return (weight increase)
   - Item removed from virtual cart

**Exit Process:**
1. Customer walks toward exit gate
2. System finalizes virtual cart
3. Payment automatically processed
4. Exit gate opens upon successful payment
5. Digital receipt sent to customer app/email

### 3.2 Checkout Accuracy

Multi-modal verification ensures high accuracy:

```
Product Recognition Confidence Score:
- Vision confidence: 0.95+
- Shelf weight change: Confirmed
- RFID detection: Validated
→ Combined confidence: 0.995+

If confidence < 0.90:
→ Flag for manual review
→ Request customer confirmation via app
→ Activate additional cameras for verification
```

### 3.3 Session Management

```typescript
interface CheckoutSession {
  sessionId: string;
  customerId: string;
  entryTime: Date;
  exitTime?: Date;
  authMethod: 'app' | 'card' | 'biometric';
  virtualCart: CartItem[];
  totalAmount: number;
  status: 'active' | 'completed' | 'disputed' | 'cancelled';
  confidence: number;
}

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  addedAt: Date;
  confidence: number;
  detectionMethod: 'vision' | 'rfid' | 'weight' | 'hybrid';
}
```

### 3.4 Dispute Resolution

Handling checkout discrepancies:

1. **Low Confidence Items**: Flagged for manual review
2. **Customer Dispute**: Review video footage (privacy-compliant)
3. **Missing Products**: Cross-reference multiple sensor data
4. **Refund Process**: Automated for verified disputes
5. **Audit Trail**: Complete session recording for 30 days

---

## 4. Computer Vision System

### 4.1 Camera Network

Dense camera deployment for complete coverage:

**Camera Specifications:**
- **Type**: RGB-D (color + depth) cameras
- **Resolution**: 4K (3840x2160) @ 60 FPS
- **Depth Sensing**: Time-of-Flight (ToF) or structured light
- **Field of View**: 110° horizontal, 70° vertical
- **Coverage**: Overlapping zones for redundancy
- **Placement**: Ceiling-mounted, angled for optimal view

**Camera Density:**
- Shopping area: 1 camera per 15-20 m²
- Hot zones: 1 camera per 8-10 m²
- Checkout area: 1 camera per 5 m²
- Total for 500m² store: 40-60 cameras

### 4.2 Product Recognition

Deep learning models for product identification:

**Model Architecture:**
```
Input: RGB-D Image (4K + Depth)
    ↓
Backbone: EfficientNet-B7 / ResNet-152
    ↓
Feature Extraction: Multi-scale features
    ↓
Detection Head: YOLO v8 / Faster R-CNN
    ↓
Classification: Product SKU identification
    ↓
Output: {product_id, confidence, bbox, depth}
```

**Training Data:**
- 100+ images per product SKU from multiple angles
- Augmentation: rotation, lighting, occlusion
- Regular retraining with new products
- Transfer learning for similar products

**Performance Metrics:**
- Detection accuracy: 99.5%+
- Processing time: <50ms per frame
- False positive rate: <0.1%
- False negative rate: <0.3%

### 4.3 Customer Tracking

Pose estimation and tracking algorithms:

**Tracking Pipeline:**
```
1. Person Detection: Identify all customers in frame
2. Pose Estimation: 17-keypoint skeleton (OpenPose/MediaPipe)
3. Re-identification: Match customer across cameras
4. Trajectory Tracking: Kalman filter for smooth paths
5. Action Recognition: Classify interactions (pick, return, examine)
```

**Privacy-Preserving Tracking:**
- Face blurring in stored footage
- Anonymous person IDs (no PII in tracking data)
- Skeleton-only representation (no facial features)
- Automatic deletion after session completion

### 4.4 Action Recognition

Detecting product interactions:

| Action | Visual Cues | Confidence Threshold |
|--------|-------------|---------------------|
| Pick up | Hand reaches, grasps, lifts | 0.95+ |
| Put back | Hand extends, releases to shelf | 0.95+ |
| Examine | Hand holds, no shelf change | 0.85+ |
| Compare | Multiple products in hands | 0.90+ |
| Move to cart | Product moves to bag/cart area | 0.92+ |

---

## 5. Smart Shelf Technology

### 5.1 Sensor Types

Multi-sensor shelves for accurate inventory tracking:

**Weight Sensors:**
- Type: Load cells with 0.1g precision
- Capacity: 10kg per shelf section
- Sampling rate: 100 Hz
- Calibration: Auto-calibration every 24 hours
- Power: Low-power, battery or PoE

**RFID Readers:**
- Standard: UHF Gen 2 (860-960 MHz)
- Read range: Up to 15 meters
- Read rate: 1000+ tags/second
- Antenna: Directional, per shelf section
- Integration: Wired or wireless to edge gateway

**Optical Sensors:**
- Type: Infrared beam break sensors
- Purpose: Detect product removal/return
- Placement: Front of shelf, 5cm intervals
- Response time: <10ms
- Power: Ultra-low power LEDs

**Temperature Sensors:**
- Use case: Cold chain monitoring (dairy, frozen)
- Range: -20°C to +50°C
- Accuracy: ±0.5°C
- Sampling: Every 60 seconds
- Alerts: Real-time threshold violations

### 5.2 Smart Shelf Configuration

```typescript
interface SmartShelf {
  shelfId: string;
  location: {
    zone: string;
    aisle: string;
    section: string;
    level: number; // 1=bottom, 5=top
  };
  sensors: {
    weightSensors: WeightSensor[];
    rfidReaders: RFIDReader[];
    opticalSensors: OpticalSensor[];
    tempSensor?: TempSensor;
  };
  products: ShelfProduct[];
  capacity: {
    maxWeight: number; // kg
    maxProducts: number;
  };
  status: 'active' | 'maintenance' | 'offline';
}

interface ShelfProduct {
  productId: string;
  sku: string;
  name: string;
  expectedWeight: number; // grams
  rfidTag: string;
  quantity: number;
  minStock: number; // reorder threshold
  maxStock: number;
  position: {
    x: number; // cm from left
    y: number; // cm from front
    facings: number; // number of items facing forward
  };
}
```

### 5.3 Inventory Monitoring

Real-time stock tracking:

**Stock Level Detection:**
```
Current Stock = floor(Total Weight / Unit Weight)

Example:
- Product: Milk carton (1000g each)
- Shelf weight: 8500g
- Tray weight: 500g
- Product weight: 8000g
- Stock level: 8000g / 1000g = 8 units

Validation:
- RFID count: 8 tags detected ✓
- Optical sensors: 8 facings detected ✓
- Confidence: HIGH
```

**Restock Alerts:**
```
if (currentStock <= minStock) {
  alert = {
    priority: currentStock == 0 ? 'CRITICAL' : 'HIGH',
    shelfId: shelf.id,
    productId: product.id,
    currentStock: currentStock,
    neededQuantity: maxStock - currentStock,
    message: `Restock ${product.name} at ${shelf.location}`
  };
  sendToStaffApp(alert);
}
```

### 5.4 Planogram Compliance

Ensure products are placed according to plan:

```typescript
interface Planogram {
  storeId: string;
  version: string;
  effectiveDate: Date;
  shelves: PlanogramShelf[];
}

interface PlanogramShelf {
  shelfId: string;
  products: PlanogramProduct[];
}

interface PlanogramProduct {
  productId: string;
  position: { x: number; y: number; };
  facings: number;
  priority: number; // Eye-level = highest priority
}

// Compliance checking
function checkPlanogramCompliance(shelf, planogram) {
  const compliance = {
    isCompliant: true,
    issues: [],
    score: 1.0
  };

  // Check each product position
  for (const planned of planogram.products) {
    const actual = shelf.products.find(p => p.productId === planned.productId);

    if (!actual) {
      compliance.issues.push(`Missing: ${planned.productId}`);
      compliance.score -= 0.1;
    } else if (
      Math.abs(actual.position.x - planned.position.x) > 5 || // 5cm tolerance
      actual.facings !== planned.facings
    ) {
      compliance.issues.push(`Misplaced: ${planned.productId}`);
      compliance.score -= 0.05;
    }
  }

  compliance.isCompliant = compliance.score >= 0.9;
  return compliance;
}
```

---

## 6. Customer Tracking and Analytics

### 6.1 Movement Tracking

Track customer paths through the store:

**Position Estimation:**
```
Methods:
1. Camera Triangulation: Use multiple cameras to determine 3D position
2. WiFi Fingerprinting: Approximate location via WiFi signal strength
3. Sensor Fusion: Combine vision + WiFi for accuracy

Position Data:
- X, Y coordinates: Meters from store origin (0, 0)
- Z coordinate: Floor level (for multi-story stores)
- Timestamp: Millisecond precision
- Accuracy: ±0.5 meters
```

**Trajectory Tracking:**
```typescript
interface CustomerTrajectory {
  sessionId: string;
  customerId: string; // Anonymous ID
  path: PathPoint[];
  totalDistance: number; // meters
  avgSpeed: number; // meters/second
  visitedZones: string[];
  dwellTimes: Map<string, number>; // zone -> milliseconds
  startTime: Date;
  endTime?: Date;
}

interface PathPoint {
  x: number;
  y: number;
  timestamp: Date;
  zone: string;
  action?: 'browsing' | 'picking' | 'examining' | 'moving';
}
```

### 6.2 Heatmap Generation

Visualize customer density and movement:

**Heatmap Types:**

1. **Density Heatmap**: Where customers spend time
   ```
   Grid: Divide store into 1m x 1m cells
   Value: Sum of time spent in each cell
   Visualization: Color gradient (blue=low, red=high)
   ```

2. **Flow Heatmap**: Direction and volume of movement
   ```
   Vector field: Direction arrows
   Magnitude: Customer count passing through
   Use: Identify traffic patterns, bottlenecks
   ```

3. **Engagement Heatmap**: Product interaction hotspots
   ```
   Overlay on product locations
   Value: Number of interactions per product
   Use: Identify popular products, optimize placement
   ```

**Heatmap Generation Algorithm:**
```python
def generate_heatmap(trajectories, grid_size=1.0):
    # Initialize grid
    max_x = store.width
    max_y = store.length
    grid = np.zeros((int(max_y/grid_size), int(max_x/grid_size)))

    # Accumulate dwell times
    for traj in trajectories:
        for i in range(len(traj.path) - 1):
            p1, p2 = traj.path[i], traj.path[i+1]

            # Cell coordinates
            cell_x = int(p1.x / grid_size)
            cell_y = int(p1.y / grid_size)

            # Dwell time (seconds)
            dwell = (p2.timestamp - p1.timestamp).total_seconds()

            # Accumulate
            grid[cell_y, cell_x] += dwell

    # Normalize
    grid = grid / len(trajectories)

    return grid
```

### 6.3 Dwell Time Analysis

Measure time spent in zones and at products:

**Zone Dwell Time:**
```typescript
interface ZoneDwellTime {
  zone: string;
  totalCustomers: number;
  avgDwellTime: number; // seconds
  minDwellTime: number;
  maxDwellTime: number;
  percentile50: number; // median
  percentile90: number;
}

// Dwell time benchmarks
const DWELL_BENCHMARKS = {
  'entrance': { avg: 5, target: 3 }, // Reduce entry friction
  'produce': { avg: 120, target: 90 }, // Browsing zone
  'dairy': { avg: 30, target: 30 }, // Quick pick
  'checkout': { avg: 180, target: 30 }, // Minimize wait
  'total': { avg: 600, target: 480 } // 8 minutes total
};
```

**Product Dwell Time:**
```
Engagement Score = (Dwell Time) × (Interaction Count) × (View Count)

High Engagement (Score > 100):
→ Popular product, good placement
→ Maintain visibility

Low Engagement (Score < 20):
→ Poor placement or unpopular
→ Consider repositioning or promotion
```

### 6.4 Conversion Funnel Analysis

Track the customer journey from entry to purchase:

```
Funnel Stages:
1. Store Entry: All customers (100%)
2. Zone Visit: Visited product category (85%)
3. Product Interaction: Picked up product (60%)
4. Cart Addition: Kept product (45%)
5. Purchase: Completed checkout (40%)

Conversion Rate = Purchases / Store Entries = 40%

Drop-off Analysis:
- Entry → Visit: 15% drop (improve signage/layout)
- Visit → Interaction: 25% drop (enhance product visibility)
- Interaction → Cart: 15% drop (pricing/quality concerns)
- Cart → Purchase: 5% drop (normal abandonment rate)
```

### 6.5 A/B Testing

Test store layout and product placement:

```typescript
interface ABTest {
  testId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  variants: {
    control: TestVariant;
    treatment: TestVariant;
  };
  metrics: {
    conversionRate: number;
    avgBasketSize: number;
    dwellTime: number;
    revenue: number;
  };
  sampleSize: number;
  significance: number; // p-value
  winner?: 'control' | 'treatment';
}

interface TestVariant {
  name: string;
  changes: string[]; // Description of changes
  allocation: number; // % of traffic (50/50 or 80/20)
  results: ABTestResults;
}

// Example test
const test = {
  testId: 'test-001',
  name: 'Dairy Section Placement',
  variants: {
    control: {
      name: 'Current Layout',
      changes: ['Dairy at back of store'],
      allocation: 0.5
    },
    treatment: {
      name: 'Front Placement',
      changes: ['Dairy at front-right'],
      allocation: 0.5
    }
  }
};
```

---

## 7. Digital Signage System

### 7.1 Display Types

Various digital display formats:

| Type | Size | Resolution | Purpose | Location |
|------|------|------------|---------|----------|
| Video Wall | 4x4 55" | 4K per panel | Promotions, branding | Entrance |
| Shelf Display | 32" | 1080p | Product info, pricing | End caps |
| Wayfinding | 43" | 1080p | Store map, navigation | Aisles |
| Checkout Display | 24" | 1080p | Offers, upsells | Checkout |
| Small Display | 10" | 720p | Product details | Shelves |

### 7.2 Content Management

Dynamic content delivery:

```typescript
interface DigitalSignage {
  displayId: string;
  location: {
    zone: string;
    coordinates: { x: number; y: number; };
  };
  hardware: {
    size: string; // "32-inch"
    resolution: string; // "1920x1080"
    orientation: 'portrait' | 'landscape';
  };
  content: {
    currentPlaylist: Playlist;
    schedule: ContentSchedule[];
  };
  capabilities: {
    touchscreen: boolean;
    audio: boolean;
    camera: boolean;
  };
  status: 'online' | 'offline' | 'error';
}

interface Playlist {
  playlistId: string;
  name: string;
  items: ContentItem[];
  duration: number; // seconds
  loopMode: 'continuous' | 'scheduled';
}

interface ContentItem {
  itemId: string;
  type: 'video' | 'image' | 'html' | 'live-data';
  source: string; // URL or file path
  duration: number; // seconds (for images)
  transition: 'fade' | 'slide' | 'none';
  triggers?: Trigger[];
}

interface Trigger {
  type: 'time' | 'proximity' | 'weather' | 'inventory';
  condition: string;
  action: 'play' | 'skip' | 'switch-playlist';
}
```

### 7.3 Personalized Content

Context-aware content delivery:

**Proximity-Based:**
```
When customer approaches display (< 3m):
→ Play attention-grabbing content
→ Show personalized offers (if customer identified)
→ Highlight nearby products

When customer is engaged (looking at display):
→ Show detailed product information
→ Offer interactive features (touchscreen)
→ Display QR code for mobile app
```

**Time-Based:**
```
Morning (6-11 AM): Breakfast items, coffee
Lunch (11 AM-2 PM): Quick meals, snacks
Evening (5-8 PM): Dinner items, beverages
Night (8 PM-close): Convenience items, discounts
```

**Weather-Based:**
```
Rainy day: Umbrellas, hot beverages, comfort food
Hot day: Cold drinks, ice cream, sunscreen
Cold day: Hot soup, winter clothing
```

**Inventory-Based:**
```
High stock → Promote heavily (prevent waste)
Low stock → De-emphasize (avoid stockouts)
New arrivals → Highlight prominently
```

### 7.4 Interactive Features

Touchscreen and gesture-based interaction:

```typescript
interface InteractiveFeatures {
  productSearch: {
    enabled: boolean;
    searchMethods: ['text', 'voice', 'barcode'];
  };
  nutritionInfo: {
    enabled: boolean;
    allergenFilters: boolean;
  };
  recipeIdeas: {
    enabled: boolean;
    ingredientBasedSearch: boolean;
  };
  storeMap: {
    enabled: boolean;
    productLocator: boolean;
    routeGuidance: boolean;
  };
  promotions: {
    enabled: boolean;
    digitalCoupons: boolean;
    instantDiscounts: boolean;
  };
}
```

---

## 8. Electronic Shelf Labels

### 8.1 ESL Technology

E-paper displays for dynamic pricing:

**Display Specifications:**
- Technology: E-ink / E-paper (low power)
- Size: 2.9" to 7.5" diagonal
- Resolution: 296x128 to 800x480 pixels
- Colors: Black/white, or 3-color (red/yellow accent)
- Refresh rate: Full refresh every 2-15 seconds
- Battery life: 5-10 years (depending on update frequency)

**Communication:**
- Protocol: 2.4 GHz wireless, sub-GHz, or NFC
- Range: Up to 30 meters from base station
- Update speed: 1-5 seconds per label
- Reliability: 99.9% delivery rate

### 8.2 Label Information

```typescript
interface ElectronicShelfLabel {
  labelId: string;
  productId: string;
  shelfId: string;
  display: {
    size: string; // "2.9-inch"
    template: 'standard' | 'promotional' | 'nutritional';
  };
  content: {
    productName: string;
    price: number;
    unit: string; // "per kg", "each"
    promotionTag?: string; // "SALE", "NEW"
    barcode: string; // QR or 1D barcode
    additionalInfo?: string;
  };
  battery: {
    level: number; // 0-100%
    lastChanged: Date;
  };
  lastUpdate: Date;
  updateFrequency: 'realtime' | 'hourly' | 'daily';
}
```

### 8.3 Dynamic Pricing

Real-time price optimization:

**Pricing Rules:**
```typescript
interface DynamicPricingRule {
  ruleId: string;
  productId: string;
  priority: number; // Higher = applied first
  conditions: PricingCondition[];
  priceModifier: {
    type: 'percentage' | 'absolute' | 'fixed';
    value: number;
  };
  validFrom: Date;
  validUntil: Date;
}

interface PricingCondition {
  type: 'time' | 'inventory' | 'competitor' | 'demand' | 'expiry';
  operator: '>' | '<' | '=' | 'between';
  value: any;
}

// Example rules
const pricingRules = [
  {
    // Happy hour discount
    ruleId: 'rule-001',
    productId: 'prod-beer',
    conditions: [
      { type: 'time', operator: 'between', value: ['17:00', '19:00'] }
    ],
    priceModifier: { type: 'percentage', value: -20 }
  },
  {
    // Expiry-based discount
    ruleId: 'rule-002',
    productId: 'prod-milk',
    conditions: [
      { type: 'expiry', operator: '<', value: 2 } // 2 days until expiry
    ],
    priceModifier: { type: 'percentage', value: -30 }
  },
  {
    // Inventory clearance
    ruleId: 'rule-003',
    productId: 'prod-seasonal',
    conditions: [
      { type: 'inventory', operator: '>', value: 100 }
    ],
    priceModifier: { type: 'percentage', value: -40 }
  }
];
```

**Price Update Process:**
```
1. Pricing engine calculates new price based on rules
2. Price change request sent to ESL management system
3. ESL receives update via wireless protocol
4. Label display refreshes with new price
5. Update confirmation sent back to system
6. Price change logged in audit trail
```

### 8.4 Label Templates

Customizable display layouts:

```
Standard Template:
┌──────────────────────┐
│ Product Name         │
│                      │
│ $4.99 /unit         │
│ [QR Code]           │
└──────────────────────┘

Promotional Template:
┌──────────────────────┐
│ SALE! Product Name   │
│ $3.99 was $4.99     │
│ SAVE $1.00          │
│ [QR Code]           │
└──────────────────────┘

Nutritional Template:
┌──────────────────────┐
│ Product Name         │
│ Calories: 150        │
│ Protein: 8g          │
│ $4.99 /unit         │
│ [QR Code]           │
└──────────────────────┘
```

---

## 9. Smart Shopping Carts

### 9.1 Cart Technology

Intelligent shopping carts with built-in features:

**Hardware Components:**
- **Weight Sensors**: Track items added/removed
- **Barcode Scanner**: Self-scanning option
- **Display Screen**: 10" touchscreen
- **Camera**: Computer vision for auto-detection
- **RFID Reader**: Passive tag reading
- **Battery**: 12-24 hours of operation
- **Wheels**: Motorized with anti-theft lock
- **Connectivity**: WiFi, 4G/5G, Bluetooth

### 9.2 Smart Cart Features

```typescript
interface SmartShoppingCart {
  cartId: string;
  sessionId?: string;
  customerId?: string;
  location: {
    x: number;
    y: number;
    lastUpdate: Date;
  };
  items: CartItem[];
  totalWeight: number; // kg
  totalValue: number; // currency
  battery: {
    level: number; // 0-100%
    charging: boolean;
  };
  navigation: {
    enabled: boolean;
    destination?: string; // Product or zone
    route?: PathPoint[];
  };
  features: {
    selfCheckout: boolean;
    productRecommendations: boolean;
    couponNotifications: boolean;
    receiptPrinting: boolean;
  };
  status: 'available' | 'in-use' | 'charging' | 'maintenance';
}
```

### 9.3 Self-Scanning Workflow

Customer self-scanning process:

```
1. Customer picks up smart cart
2. Scans loyalty card or opens app to link session
3. Browses store and picks items
4. For each item:
   a. Customer scans barcode manually, OR
   b. Cart camera auto-detects product, OR
   c. Cart RFID reader detects tagged item
   d. Item added to cart display
   e. Running total updated
5. Cart display shows:
   - Items in cart
   - Running total
   - Available coupons
   - Savings summary
6. At exit:
   - Customer taps "Pay" on cart display
   - Payment processed via linked card/app
   - Cart verified (weight check, random audit)
   - Receipt printed or emailed
```

### 9.4 Navigation Assistance

Guide customers to products:

**Product Locator:**
```typescript
function findProduct(productName: string) {
  // Search product database
  const product = productDB.search(productName);

  // Get shelf location
  const shelf = shelfDB.find(s =>
    s.products.some(p => p.productId === product.id)
  );

  // Calculate route from current cart position
  const route = calculateRoute(
    cart.location,
    shelf.location,
    { avoidCrowds: true, shortestPath: true }
  );

  // Display on cart screen
  cart.navigation = {
    enabled: true,
    destination: product.name,
    route: route,
    distance: calculateDistance(route),
    estimatedTime: estimateTime(route, cart.location.speed)
  };

  return route;
}
```

**Turn-by-Turn Directions:**
```
Display on cart screen:
→ "Turn left at end of aisle"
→ "Continue straight for 10 meters"
→ "Milk is on your right, shelf 3, level 2"
→ "Arrived at destination"

Visual aids:
- Arrow indicators on screen
- Augmented reality overlay (future)
- LED strip on cart handle (left/right/straight)
```

### 9.5 Anti-Theft Measures

Prevent cart theft and fraud:

```
Geofencing:
- Cart locked to store perimeter
- If cart crosses boundary → wheels lock
- Alert sent to security

Exit Verification:
- Random audits (10-20% of carts)
- Weight verification: Cart weight vs. expected weight
- RFID scan: Verify all tagged items accounted for
- Video review: If discrepancy detected

Cart Recovery:
- GPS tracking for stolen carts
- Remote wheel lock activation
- Audible alarm
```

---

## 10. Indoor Navigation System

### 10.1 Positioning Technologies

Accurate indoor location tracking:

**Positioning Methods:**

1. **WiFi Fingerprinting**:
   - Accuracy: 3-5 meters
   - Setup: WiFi access points throughout store
   - Method: RSSI-based positioning
   - Pros: Works with customer smartphones
   - Cons: Lower accuracy than other methods

2. **Bluetooth Beacons**:
   - Accuracy: 1-3 meters
   - Setup: BLE beacons every 5-10 meters
   - Method: Trilateration using signal strength
   - Pros: Good accuracy, low power
   - Cons: Requires beacons infrastructure

3. **Ultra-Wideband (UWB)**:
   - Accuracy: 10-30 cm
   - Setup: UWB anchors at known positions
   - Method: Time-of-flight measurement
   - Pros: Very high accuracy
   - Cons: Requires UWB-enabled devices

4. **Computer Vision**:
   - Accuracy: <1 meter
   - Setup: Ceiling cameras with known positions
   - Method: Visual tracking and triangulation
   - Pros: No device required, accurate
   - Cons: Privacy concerns, compute-intensive

### 10.2 Store Mapping

Digital representation of store layout:

```typescript
interface StoreMap {
  storeId: string;
  version: string;
  dimensions: {
    width: number; // meters
    length: number; // meters
    height: number; // meters
  };
  origin: { x: 0, y: 0 }; // Reference point (usually entrance)
  zones: Zone[];
  aisles: Aisle[];
  shelves: Shelf[];
  landmarks: Landmark[];
  obstacles: Obstacle[];
}

interface Zone {
  zoneId: string;
  name: string;
  category: string; // "produce", "dairy", "bakery"
  polygon: Point[]; // Boundary coordinates
  floor: number;
}

interface Aisle {
  aisleId: string;
  number: string; // "Aisle 1", "Aisle 2"
  start: Point;
  end: Point;
  width: number;
  products: string[]; // Product categories in this aisle
}

interface Landmark {
  landmarkId: string;
  name: string; // "Main Entrance", "Checkout 1"
  position: Point;
  type: 'entrance' | 'exit' | 'checkout' | 'restroom' | 'service-desk';
}
```

### 10.3 Routing Algorithm

Optimal path calculation:

```typescript
interface RouteRequest {
  start: Point;
  destination: Point | string; // Coordinates or product name
  preferences: {
    shortest: boolean;
    avoidCrowds: boolean;
    accessibility: boolean; // Wheelchair-friendly
  };
}

interface Route {
  waypoints: Waypoint[];
  distance: number; // meters
  estimatedTime: number; // seconds
  instructions: Instruction[];
}

interface Waypoint {
  position: Point;
  type: 'start' | 'turn' | 'destination' | 'intermediate';
  direction?: number; // degrees from north
}

interface Instruction {
  text: string;
  distance: number; // meters to this instruction
  icon: 'straight' | 'left' | 'right' | 'uturn';
}

// A* pathfinding algorithm
function calculateRoute(request: RouteRequest): Route {
  const start = request.start;
  const goal = resolveDestination(request.destination);

  // A* algorithm
  const openSet = new PriorityQueue();
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  openSet.enqueue(start, 0);
  gScore.set(start, 0);
  fScore.set(start, heuristic(start, goal));

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue();

    if (current.equals(goal)) {
      return reconstructPath(cameFrom, current);
    }

    for (const neighbor of getNeighbors(current)) {
      const tentativeGScore = gScore.get(current) + distance(current, neighbor);

      // Apply crowd penalty
      if (request.preferences.avoidCrowds) {
        tentativeGScore += getCrowdDensity(neighbor) * 10;
      }

      if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));

        if (!openSet.contains(neighbor)) {
          openSet.enqueue(neighbor, fScore.get(neighbor));
        }
      }
    }
  }

  return null; // No path found
}
```

### 10.4 Wayfinding UI

User interface for navigation:

**Mobile App Display:**
```
┌──────────────────────────────────┐
│  Store Map                    [X]│
├──────────────────────────────────┤
│                                  │
│      [Your location: 📍]        │
│           ↓                      │
│      ┌─────┐                     │
│      │ A1  │  ← Turn left here   │
│      └─────┘                     │
│           ↓                      │
│      ┌─────┐                     │
│      │ A2  │                     │
│      └─────┘                     │
│           ↓                      │
│      ┌─────┐                     │
│      │ A3  │  ← Milk (🎯)        │
│      └─────┘                     │
│                                  │
│  Distance: 25m  |  ETA: 1 min   │
└──────────────────────────────────┘
```

**Smart Cart Display:**
```
Simple directional arrows:
→ Straight ahead (15m)
← Turn left (Aisle 3)
🎯 Destination ahead (5m)
✓ Arrived
```

---

## 11. Personalized Recommendations

### 11.1 Recommendation Engine

AI-powered product suggestions:

**Recommendation Types:**

1. **Collaborative Filtering**: "Customers who bought X also bought Y"
2. **Content-Based**: Based on product attributes and past purchases
3. **Contextual**: Time, location, weather-based
4. **Complementary**: Items that go together (bread + butter)
5. **Upsell**: Premium version of viewed product
6. **Cross-sell**: Related category products

**Algorithm:**
```typescript
interface RecommendationRequest {
  customerId: string;
  context: {
    currentLocation?: Zone;
    cartItems?: string[]; // Product IDs
    time: Date;
    weather?: WeatherCondition;
  };
  limit: number; // Max recommendations
}

interface Recommendation {
  productId: string;
  score: number; // 0-1 relevance score
  reason: string; // Explanation
  type: 'collaborative' | 'content' | 'contextual' | 'complementary';
}

function generateRecommendations(request: RecommendationRequest): Recommendation[] {
  const customer = getCustomerProfile(request.customerId);
  const recommendations: Recommendation[] = [];

  // 1. Collaborative filtering
  const collaborative = getCollaborativeRecommendations(customer, 10);
  recommendations.push(...collaborative);

  // 2. Content-based
  const contentBased = getContentBasedRecommendations(customer.preferences, 10);
  recommendations.push(...contentBased);

  // 3. Contextual
  if (request.context.currentLocation) {
    const contextual = getContextualRecommendations(
      request.context.currentLocation,
      request.context.time,
      5
    );
    recommendations.push(...contextual);
  }

  // 4. Complementary to cart items
  if (request.context.cartItems?.length) {
    const complementary = getComplementaryProducts(request.context.cartItems, 5);
    recommendations.push(...complementary);
  }

  // Deduplicate and score
  const unique = deduplicateAndRank(recommendations);

  // Filter out items already in cart
  const filtered = unique.filter(r =>
    !request.context.cartItems?.includes(r.productId)
  );

  // Return top N
  return filtered.slice(0, request.limit);
}
```

### 11.2 Customer Profiling

Build customer preference profiles:

```typescript
interface CustomerProfile {
  customerId: string;
  demographics: {
    ageGroup?: string; // "18-24", "25-34", etc.
    location?: string;
  };
  preferences: {
    categories: Map<string, number>; // Category → affinity score
    brands: Map<string, number>;
    priceRange: { min: number; max: number; };
    dietaryRestrictions: string[]; // "vegetarian", "gluten-free"
  };
  purchaseHistory: {
    totalPurchases: number;
    avgBasketSize: number;
    avgVisitFrequency: number; // days
    favoriteProducts: string[];
    lastPurchase: Date;
  };
  behavior: {
    avgDwellTime: number; // seconds
    preferredShoppingTime: string; // "morning", "evening"
    avgPathLength: number; // meters
    visitedZones: Map<string, number>; // Zone → visit count
  };
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

// Update profile based on session
function updateCustomerProfile(customerId: string, session: CheckoutSession) {
  const profile = getCustomerProfile(customerId);

  // Update purchase history
  profile.purchaseHistory.totalPurchases++;
  profile.purchaseHistory.lastPurchase = session.exitTime;
  profile.purchaseHistory.avgBasketSize =
    (profile.purchaseHistory.avgBasketSize * (profile.purchaseHistory.totalPurchases - 1) +
     session.virtualCart.length) / profile.purchaseHistory.totalPurchases;

  // Update category preferences
  for (const item of session.virtualCart) {
    const product = getProduct(item.productId);
    const currentAffinity = profile.preferences.categories.get(product.category) || 0;
    profile.preferences.categories.set(product.category, currentAffinity + 1);
  }

  // Update behavior
  const sessionDuration =
    (session.exitTime.getTime() - session.entryTime.getTime()) / 1000;
  profile.behavior.avgDwellTime =
    (profile.behavior.avgDwellTime * (profile.purchaseHistory.totalPurchases - 1) +
     sessionDuration) / profile.purchaseHistory.totalPurchases;

  saveCustomerProfile(profile);
}
```

### 11.3 Real-Time Suggestions

In-store and app notifications:

**Trigger Points:**
```
1. Zone Entry:
   Customer enters produce section
   → "Fresh organic apples on sale today! 🍎"

2. Product Proximity:
   Customer within 2m of promoted product
   → "Try our new yogurt flavor! Sample available."

3. Cart Analysis:
   Customer has pasta in cart, no sauce
   → "Don't forget pasta sauce! Aisle 7."

4. Complementary:
   Customer has burger buns in cart
   → "Burger patties on promotion, 20% off today!"

5. Abandonment Prevention:
   Customer dwells long, no items picked
   → "Need help finding something? Ask our staff!"
```

**Delivery Channels:**
- **Mobile App**: Push notifications
- **Digital Signage**: Personalized displays as customer passes
- **Smart Cart Screen**: Recommendations on cart display
- **ESL**: Highlighted pricing near customer

---

## 12. IoT Inventory Sensors

### 12.1 Sensor Network

Comprehensive inventory monitoring:

**Sensor Types and Placement:**

1. **Shelf Sensors** (every shelf):
   - Weight sensors (load cells)
   - RFID readers
   - Optical sensors

2. **Freezer/Refrigerator Sensors**:
   - Temperature sensors (every unit)
   - Door open/close sensors
   - Defrost cycle monitors

3. **Warehouse Sensors**:
   - Pallet weight sensors
   - RFID gate readers
   - Environmental sensors (temp, humidity)

4. **Expiry Monitors**:
   - Camera-based date recognition
   - RFID tags with expiry data
   - FIFO compliance tracking

### 12.2 Real-Time Inventory Tracking

```typescript
interface InventoryItem {
  productId: string;
  sku: string;
  locations: ItemLocation[];
  totalStock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstock';
  reorderPoint: number;
  reorderQuantity: number;
  expiryTracking: boolean;
}

interface ItemLocation {
  locationType: 'shelf' | 'backroom' | 'warehouse' | 'transit';
  locationId: string;
  quantity: number;
  lastCounted: Date;
  lastMovement?: Date;
  expiryDates?: Date[]; // For perishables
}

// Real-time stock update
function updateInventory(event: InventoryEvent) {
  const item = getInventoryItem(event.productId);
  const location = item.locations.find(l => l.locationId === event.locationId);

  switch (event.type) {
    case 'sale':
      location.quantity -= event.quantity;
      item.totalStock -= event.quantity;
      break;

    case 'restock':
      location.quantity += event.quantity;
      item.totalStock += event.quantity;
      if (event.expiryDate) {
        location.expiryDates.push(event.expiryDate);
      }
      break;

    case 'shrinkage':
      location.quantity -= event.quantity;
      item.totalStock -= event.quantity;
      logShrinkage(event);
      break;
  }

  // Update status
  if (item.totalStock === 0) {
    item.status = 'out-of-stock';
    sendAlert({ type: 'stockout', productId: item.productId });
  } else if (item.totalStock <= item.reorderPoint) {
    item.status = 'low-stock';
    sendAlert({ type: 'reorder', productId: item.productId });
  }

  // Broadcast to connected systems
  broadcastInventoryUpdate(item);

  saveInventoryItem(item);
}
```

### 12.3 Automated Reordering

Smart replenishment system:

```typescript
interface ReorderRule {
  productId: string;
  method: 'fixed-point' | 'periodic' | 'predictive';
  parameters: {
    reorderPoint?: number; // Units
    reorderQuantity?: number;
    reviewPeriod?: number; // Days
    leadTime: number; // Days
    safetyStock: number;
  };
  supplier: string;
  autoApprove: boolean; // Auto-submit order or require approval
}

// Predictive reordering
function predictiveReorder(productId: string) {
  const item = getInventoryItem(productId);
  const history = getSalesHistory(productId, 90); // Last 90 days

  // Calculate average daily sales
  const avgDailySales = history.reduce((sum, day) => sum + day.quantity, 0) / 90;

  // Predict next 30 days demand
  const forecast = forecastDemand(history, 30);
  const predictedDemand = forecast.reduce((sum, day) => sum + day.quantity, 0);

  // Current stock
  const currentStock = item.totalStock;

  // Lead time demand
  const leadTimeDemand = avgDailySales * item.reorderRule.parameters.leadTime;

  // Safety stock (2 weeks of average sales)
  const safetyStock = avgDailySales * 14;

  // Reorder point
  const reorderPoint = leadTimeDemand + safetyStock;

  // Check if reorder needed
  if (currentStock < reorderPoint) {
    const reorderQty = predictedDemand + safetyStock - currentStock;

    createPurchaseOrder({
      productId: productId,
      quantity: Math.ceil(reorderQty),
      supplier: item.reorderRule.supplier,
      expectedDelivery: addDays(new Date(), item.reorderRule.parameters.leadTime),
      reason: 'predictive-reorder',
      autoApprove: item.reorderRule.autoApprove
    });
  }
}
```

### 12.4 Shrinkage Detection

Identify inventory loss:

```
Shrinkage = (Book Inventory - Physical Inventory) / Book Inventory × 100%

Causes:
1. Theft (shoplifting, employee theft): 60-70%
2. Administrative errors (pricing, scanning): 15-20%
3. Vendor fraud: 5-10%
4. Damage/expiry: 5-10%

Detection Methods:
1. Continuous monitoring: Real-time sensor discrepancies
2. Cycle counting: Regular physical counts vs. system
3. Variance analysis: Expected vs. actual stock levels
4. Video audit: Review footage for theft events
```

```typescript
function detectShrinkage(productId: string, locationId: string) {
  const bookQty = getBookInventory(productId, locationId);
  const physicalQty = getPhysicalInventory(productId, locationId);

  const variance = bookQty - physicalQty;
  const shrinkageRate = (variance / bookQty) * 100;

  if (Math.abs(shrinkageRate) > 2) { // 2% threshold
    const alert: ShrinkageAlert = {
      productId: productId,
      locationId: locationId,
      bookQuantity: bookQty,
      physicalQuantity: physicalQty,
      variance: variance,
      shrinkageRate: shrinkageRate,
      timestamp: new Date(),
      severity: shrinkageRate > 10 ? 'high' : 'medium',
      suggestedAction: shrinkageRate > 10 ?
        'Immediate investigation required' :
        'Schedule cycle count'
    };

    // Log and alert
    logShrinkageEvent(alert);
    sendAlertToManagement(alert);

    // Trigger video review if available
    if (shrinkageRate > 5) {
      requestVideoAudit(locationId, getLastHours(24));
    }
  }
}
```

---

## 13. Payment Processing

### 13.1 Payment Methods

Multiple payment options:

| Method | Description | Authentication | Processing Time |
|--------|-------------|----------------|-----------------|
| App-linked | Pre-registered card/account | Biometric, PIN | <1 second |
| Tap-to-pay | NFC credit/debit card | Card chip | 2-3 seconds |
| QR Code | Mobile wallet (Alipay, WeChat Pay) | App authentication | 2-4 seconds |
| Biometric | Face, fingerprint payment | Liveness detection | 1-2 seconds |
| Traditional | Cashier checkout | Signature, PIN | 30-60 seconds |

### 13.2 Automated Payment Flow

Walk-out payment process:

```
1. Customer Identification (Entry):
   - Scan app QR code, OR
   - Tap payment card at gate, OR
   - Face recognition (if enrolled)
   → Session created, payment method linked

2. Shopping:
   - Items tracked via computer vision + sensors
   - Virtual cart updated in real-time
   - Running total calculated

3. Exit Process:
   - Customer approaches exit gate
   - System finalizes cart (grace period for last-second adds/removes)
   - Total calculated with taxes, discounts
   - Payment authorization requested

4. Payment Authorization:
   - Linked payment method charged
   - Transaction processed (tokenized, PCI-compliant)
   - Authorization received (or declined)

5. Exit Confirmation:
   - If approved → Gate opens, receipt sent
   - If declined → Gate closed, alternative payment requested
   - Random audit (10-20% of transactions)

6. Post-Transaction:
   - Digital receipt emailed/app-delivered
   - Loyalty points awarded
   - Transaction logged for audit
```

### 13.3 Security Measures

PCI-DSS compliant payment security:

```typescript
interface PaymentSecurity {
  tokenization: {
    enabled: true; // Never store raw card numbers
    provider: 'stripe' | 'braintree' | 'adyen';
  };
  encryption: {
    inTransit: 'TLS 1.3';
    atRest: 'AES-256';
  };
  authentication: {
    twoFactor: boolean;
    biometric: boolean;
    deviceFingerprinting: boolean;
  };
  fraudDetection: {
    velocityChecks: boolean; // Limit transactions per time period
    geolocation: boolean; // Verify location vs. card
    behaviorAnalysis: boolean; // AI-based anomaly detection
  };
  compliance: {
    pciDss: 'Level 1';
    gdpr: boolean;
    ccpa: boolean;
  };
}

// Fraud detection
function detectFraud(transaction: Transaction): FraudAssessment {
  let riskScore = 0;
  const flags: string[] = [];

  // Velocity check
  const recentTransactions = getRecentTransactions(
    transaction.customerId,
    3600 // Last hour
  );
  if (recentTransactions.length > 5) {
    riskScore += 30;
    flags.push('High transaction frequency');
  }

  // Amount check
  const avgTransaction = getAvgTransactionAmount(transaction.customerId);
  if (transaction.amount > avgTransaction * 3) {
    riskScore += 20;
    flags.push('Unusually high amount');
  }

  // Location check
  const customerLocation = getCustomerLocation(transaction.customerId);
  const cardLocation = getCardIssuedCountry(transaction.paymentMethodId);
  if (customerLocation !== cardLocation) {
    riskScore += 10;
    flags.push('Location mismatch');
  }

  // Behavior analysis (AI model)
  const behaviorScore = mlModel.predict(transaction);
  riskScore += behaviorScore * 40;

  return {
    riskScore: riskScore, // 0-100
    riskLevel: riskScore < 30 ? 'low' : riskScore < 70 ? 'medium' : 'high',
    flags: flags,
    action: riskScore > 70 ? 'decline' : riskScore > 40 ? 'review' : 'approve'
  };
}
```

### 13.4 Dispute Handling

Process for customer disputes:

```
1. Customer Reports Dispute:
   - Claim: "Charged for items I didn't take"
   - Evidence: "Receipt shows 3 apples, I only took 2"

2. Automated Review:
   - Pull session video footage (privacy-compliant)
   - Review sensor data (shelf weight, RFID)
   - Check computer vision logs with confidence scores

3. Evidence Analysis:
   - Vision log: 3 apples detected (confidence: 0.87, 0.92, 0.74)
   - Shelf sensor: Weight change = 3 × 180g
   - RFID: 3 tags detected
   → Conflict: 3 sensors agree vs. customer claim

4. Human Review (if needed):
   - Customer service reviews video
   - Third apple confidence low (0.74)
   - Video shows customer examined but replaced third apple

5. Resolution:
   - Refund customer for 1 apple
   - Adjust ML model (retrain with this case)
   - Thank customer for feedback

6. Continuous Improvement:
   - Use dispute cases to improve vision models
   - Adjust confidence thresholds
   - Reduce future disputes
```

---

## 14. Security and Privacy

### 14.1 Data Privacy

GDPR, CCPA, and global privacy compliance:

**Privacy Principles:**
1. **Data Minimization**: Collect only necessary data
2. **Purpose Limitation**: Use data only for stated purposes
3. **Storage Limitation**: Retain data only as long as needed
4. **Transparency**: Clear privacy policies and notices
5. **User Control**: Easy opt-in/opt-out mechanisms

**Personal Data Handling:**
```typescript
interface PrivacySettings {
  customerId: string;
  consents: {
    essentialTracking: boolean; // Required for checkout
    analyticsTracking: boolean; // Heatmaps, dwell time
    personalizedOffers: boolean; // Recommendations
    videoRecording: boolean; // Consent to be recorded
    dataSharing: boolean; // Share with partners
  };
  dataRetention: {
    transactionHistory: number; // days
    videoFootage: number; // days (default: 30)
    analyticsData: number; // days (default: 365)
  };
  rights: {
    accessRequest: boolean; // GDPR Article 15
    rectification: boolean; // GDPR Article 16
    erasure: boolean; // GDPR Article 17 (Right to be forgotten)
    portability: boolean; // GDPR Article 20
  };
}
```

**Video Privacy:**
```
Processing:
1. Face blurring in real-time for stored footage
2. Skeleton-only representation for analytics
3. Encrypted storage with access controls
4. Automatic deletion after retention period

Access:
- Restricted to authorized personnel only
- Audit trail of all access
- Customer can request their footage
- Law enforcement requires warrant
```

### 14.2 Physical Security

Prevent theft and ensure safety:

**Anti-Theft Measures:**
1. **Entry/Exit Gates**:
   - RFID scanners detect tagged items
   - Weight verification (cart weight vs. charged items)
   - Random audits (10-20% of exits)

2. **Security Personnel**:
   - Staff monitors suspicious behavior alerts
   - Respond to system flags (low confidence checkouts)
   - Handle disputes and investigations

3. **Video Surveillance**:
   - 24/7 recording of entire store
   - AI-powered suspicious behavior detection
   - Facial recognition for banned individuals (where legal)

4. **Inventory Control**:
   - Real-time shrinkage detection
   - RFID tag compliance
   - Surprise audits

**Safety Features:**
1. **Emergency Response**:
   - Panic buttons throughout store
   - Integration with fire/security alarms
   - Automated emergency exits unlock

2. **Health Monitoring**:
   - Temperature sensors (cold chain compliance)
   - Air quality monitoring
   - Occupancy limits enforcement

3. **Accessibility**:
   - Wheelchair-accessible routes
   - Audio assistance for visually impaired
   - Clear signage and navigation

### 14.3 Cybersecurity

Protect against digital threats:

**Security Layers:**
```
1. Network Security:
   - Firewall (hardware + software)
   - Intrusion detection/prevention systems (IDS/IPS)
   - Network segmentation (IoT devices isolated)
   - VPN for remote access

2. Data Security:
   - Encryption at rest (AES-256)
   - Encryption in transit (TLS 1.3)
   - Database encryption
   - Secure key management (HSM)

3. Application Security:
   - Input validation
   - SQL injection prevention
   - XSS protection
   - Regular security audits & penetration testing

4. Access Control:
   - Role-based access control (RBAC)
   - Multi-factor authentication (MFA)
   - Principle of least privilege
   - Regular access reviews

5. Monitoring:
   - 24/7 security operations center (SOC)
   - SIEM (Security Information and Event Management)
   - Anomaly detection
   - Incident response plan
```

---

## 15. Integration Protocols

### 15.1 API Architecture

RESTful and real-time APIs:

**REST API Endpoints:**
```
Authentication:
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh

Checkout:
POST   /api/v1/checkout/session/create
GET    /api/v1/checkout/session/{sessionId}
PUT    /api/v1/checkout/session/{sessionId}/cart
POST   /api/v1/checkout/session/{sessionId}/complete

Inventory:
GET    /api/v1/inventory/products
GET    /api/v1/inventory/products/{productId}
PUT    /api/v1/inventory/products/{productId}/stock
GET    /api/v1/inventory/shelves/{shelfId}

Analytics:
GET    /api/v1/analytics/heatmap?zone={zone}&date={date}
GET    /api/v1/analytics/traffic?period={period}
GET    /api/v1/analytics/conversion?startDate={start}&endDate={end}

Customer:
GET    /api/v1/customers/{customerId}
GET    /api/v1/customers/{customerId}/history
POST   /api/v1/customers/{customerId}/preferences
```

**WebSocket Endpoints:**
```
Real-time inventory updates:
ws://api.example.com/v1/ws/inventory

Real-time customer tracking:
ws://api.example.com/v1/ws/tracking

Live store status:
ws://api.example.com/v1/ws/store-status
```

### 15.2 Third-Party Integrations

Connect with external systems:

| System | Purpose | Protocol | Sync Frequency |
|--------|---------|----------|----------------|
| ERP | Inventory, purchasing | REST API | Real-time |
| POS | Backup checkout | REST API | Real-time |
| CRM | Customer data | REST API | Hourly |
| Accounting | Financial data | REST API | Daily |
| E-commerce | Online/offline sync | REST API | Real-time |
| Suppliers | Auto-reordering | EDI/API | As needed |
| Analytics | BI dashboards | Data export | Hourly |

### 15.3 Data Exchange Format

```typescript
// Standard product data format
interface ProductData {
  id: string; // UUID
  sku: string;
  name: string;
  category: string;
  brand: string;
  price: {
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  };
  weight: {
    value: number;
    unit: 'g' | 'kg' | 'lb' | 'oz';
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  barcode: string; // UPC/EAN
  rfidTag?: string;
  images: string[]; // URLs
  metadata: Record<string, any>;
}

// Transaction data format
interface TransactionData {
  transactionId: string;
  storeId: string;
  customerId: string;
  timestamp: string; // ISO 8601
  items: TransactionItem[];
  subtotal: number;
  tax: number;
  discounts: number;
  total: number;
  currency: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'refunded' | 'disputed';
}
```

---

## 16. Performance Requirements

### 16.1 System Performance

**Response Time Requirements:**
| Operation | Target | Max Acceptable |
|-----------|--------|----------------|
| Product recognition | <50ms | <100ms |
| Cart update | <100ms | <200ms |
| Payment processing | <1s | <3s |
| API request | <200ms | <500ms |
| Navigation route | <500ms | <1s |
| Heatmap generation | <2s | <5s |

**Throughput Requirements:**
| Metric | Capacity |
|--------|----------|
| Concurrent customers | 500+ |
| Transactions/hour | 1000+ |
| API requests/second | 10,000+ |
| Video frames/second | 60 FPS per camera |
| Sensor reads/second | 1000+ |

### 16.2 Reliability

**Uptime Requirements:**
- Smart store system: 99.9% uptime (8.76 hours downtime/year)
- Payment processing: 99.99% uptime (52.6 minutes/year)
- Core infrastructure: 99.95% uptime

**Failover Mechanisms:**
1. **Graceful Degradation**:
   - Vision system down → Fall back to RFID/weight sensors
   - Network down → Local edge processing
   - Payment gateway down → Queue transactions for later

2. **Redundancy**:
   - Dual internet connections
   - Backup power (UPS + generator)
   - Redundant edge servers
   - Database replication

### 16.3 Scalability

**Horizontal Scaling:**
- Add more cameras for coverage
- Add more edge nodes for processing
- Add more API servers for load

**Vertical Scaling:**
- Upgrade camera resolution (4K → 8K)
- Upgrade edge compute (GPU acceleration)
- Increase sensor density

**Store Size Scalability:**
- Small (100-200 m²): 20-30 cameras, 2 edge nodes
- Medium (500-1000 m²): 50-80 cameras, 5 edge nodes
- Large (2000+ m²): 150+ cameras, 10+ edge nodes

---

## 17. Implementation Guidelines

### 17.1 Deployment Phases

**Phase 1: Pilot (Month 1-3)**
- Deploy in 1 small store (100-200 m²)
- Limited product SKUs (500-1000)
- Manual fallback checkout available
- Intensive monitoring and optimization

**Phase 2: Beta (Month 4-6)**
- Expand to 2-3 stores
- Increase SKU coverage (3000-5000)
- Refine ML models based on pilot data
- Gather customer feedback

**Phase 3: Limited Rollout (Month 7-12)**
- Deploy to 10-20 stores
- Full SKU coverage
- Automation of most operations
- Regional variations support

**Phase 4: Full Rollout (Month 13+)**
- All stores converted
- Continuous improvement based on analytics
- Expansion to new markets

### 17.2 Hardware Requirements

**For 500 m² Store:**

| Component | Quantity | Unit Cost | Total |
|-----------|----------|-----------|-------|
| RGB-D Cameras (4K) | 50 | $500 | $25,000 |
| Smart Shelves | 100 | $300 | $30,000 |
| Digital Signage Displays | 10 | $1,000 | $10,000 |
| Electronic Shelf Labels | 1,000 | $15 | $15,000 |
| Smart Shopping Carts | 20 | $2,000 | $40,000 |
| Entry/Exit Gates | 4 | $5,000 | $20,000 |
| Edge Compute Servers | 5 | $5,000 | $25,000 |
| Networking Equipment | 1 set | $10,000 | $10,000 |
| **Total Hardware** | | | **$175,000** |

**Software & Services:**
- Cloud infrastructure: $2,000/month
- Software licenses: $5,000/month
- Support & maintenance: $3,000/month

### 17.3 ROI Calculation

**Cost Savings:**
1. **Labor**: 60% reduction in checkout staff
   - Before: 10 cashiers × $30,000/year = $300,000
   - After: 4 attendants × $30,000/year = $120,000
   - Savings: $180,000/year

2. **Shrinkage**: 50% reduction
   - Before: 2% of revenue (avg. $4M/year store) = $80,000
   - After: 1% = $40,000
   - Savings: $40,000/year

3. **Inventory**: 30% reduction in holding costs
   - Before: $100,000/year
   - After: $70,000/year
   - Savings: $30,000/year

**Revenue Increase:**
1. **Customer Satisfaction**: 15% increase in visits
   - Additional revenue: $600,000/year

2. **Basket Size**: 10% increase due to recommendations
   - Additional revenue: $400,000/year

**Total Annual Benefit:**
- Cost savings: $250,000
- Revenue increase: $1,000,000
- **Total: $1,250,000/year**

**Payback Period:**
- Initial investment: $175,000 (hardware) + $50,000 (installation) = $225,000
- Annual benefit: $1,250,000
- **Payback: 2.2 months**

---

## 18. References

### 18.1 Technical Standards

- **ISO 18092**: NFC/RFID communication protocol
- **ISO/IEC 15693**: RFID for item management
- **IEEE 802.11ax**: WiFi 6 standard
- **IEEE 802.15.4**: Low-power wireless networks (IoT)
- **ISO/IEC 27001**: Information security management
- **PCI DSS**: Payment card industry data security

### 18.2 Retail Standards

- **GS1**: Global product identification (barcodes, GTIN)
- **ECR**: Efficient Consumer Response
- **ARTS**: Association for Retail Technology Standards
- **NRF**: National Retail Federation guidelines

### 18.3 AI/ML Frameworks

- **TensorFlow**: Deep learning framework
- **PyTorch**: ML research and production
- **YOLO**: Real-time object detection
- **OpenPose**: Human pose estimation
- **MediaPipe**: Cross-platform ML solutions

### 18.4 Related WIA Standards

- **WIA-INTENT**: Intent-based operation commands
- **WIA-OMNI-API**: Universal API gateway
- **WIA-IOT**: IoT device integration
- **WIA-AI**: AI/ML standardization
- **WIA-PAYMENT**: Payment processing standards
- **WIA-IDENTITY**: Identity and authentication

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA - World Certification Industry Association*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
