# WIA-IND-009: Food Delivery Standard Specification v1.0

> **Standard ID:** WIA-IND-009
> **Title:** Food Delivery Standard
> **Version:** 1.0.0
> **Status:** Active
> **Category:** IND (Industry)
> **Color:** Indigo (#6366F1)
> **Authors:** WIA Food Delivery Working Group
> **Date:** 2025-01-15
> **License:** MIT

---

## Abstract

This specification defines a comprehensive standard for food delivery systems, encompassing order management, driver logistics, route optimization, temperature monitoring, quality assurance, and customer experience. The standard provides interoperability between restaurants, delivery platforms, drivers, and customers while ensuring food safety, efficiency, and reliability.

**弘益人間 (Benefit All Humanity)** - This standard aims to democratize food delivery technology, improve food accessibility, reduce waste, and ensure safe food transportation for all communities worldwide.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Architecture](#2-architecture)
3. [Order Management](#3-order-management)
4. [Driver Management](#4-driver-management)
5. [Route Optimization](#5-route-optimization)
6. [Temperature Monitoring](#6-temperature-monitoring)
7. [Time Estimation](#7-time-estimation)
8. [Cost Calculation](#8-cost-calculation)
9. [Quality Assurance](#9-quality-assurance)
10. [Safety & Compliance](#10-safety--compliance)
11. [API Specification](#11-api-specification)
12. [Data Models](#12-data-models)
13. [Security](#13-security)
14. [Performance Requirements](#14-performance-requirements)
15. [Integration Guidelines](#15-integration-guidelines)

---

## 1. Introduction

### 1.1 Purpose

The WIA-IND-009 standard provides a unified framework for food delivery operations, enabling:
- Seamless integration between restaurants and delivery platforms
- Efficient driver assignment and routing
- Real-time order tracking and status updates
- Food safety compliance through temperature monitoring
- Performance optimization and analytics

### 1.2 Scope

This standard covers:
- **Order Lifecycle**: From placement to completion
- **Driver Operations**: Assignment, tracking, navigation
- **Route Optimization**: Single and multi-stop routing
- **Temperature Control**: Hot, cold, and frozen food handling
- **Quality Metrics**: Performance tracking and KPIs
- **Customer Experience**: Tracking, notifications, feedback

### 1.3 Terminology

| Term | Definition |
|------|------------|
| **Order** | Complete delivery request including items, locations, and requirements |
| **Driver** | Delivery personnel (employee, contractor, or gig worker) |
| **Restaurant** | Food preparation and pickup location |
| **Customer** | Delivery recipient |
| **Route** | Optimized path from pickup(s) to delivery location(s) |
| **Batch** | Multiple orders assigned to single driver trip |
| **ETA** | Estimated Time of Arrival |
| **Prep Time** | Food preparation duration at restaurant |
| **Transit Time** | Travel time from pickup to delivery |
| **Last Mile** | Final segment of delivery to customer |
| **Cold Chain** | Temperature-controlled supply chain |
| **HACCP** | Hazard Analysis Critical Control Points (food safety) |

### 1.4 Design Principles

1. **Food Safety First**: Temperature compliance and hygiene standards
2. **Driver Welfare**: Fair compensation and working conditions
3. **Customer Experience**: Transparency and reliability
4. **Efficiency**: Optimal routing and resource utilization
5. **Scalability**: Support from single restaurant to global platform
6. **Interoperability**: Standard APIs for ecosystem integration

---

## 2. Architecture

### 2.1 System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Customer Applications                     │
│              (Web, iOS, Android, Voice, Chat)               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   WIA-IND-009 API Gateway                    │
│  (Order Management, Tracking, Routing, Temperature)         │
└─────┬──────────┬──────────┬──────────┬──────────┬──────────┘
      │          │          │          │          │
┌─────▼────┐ ┌──▼──────┐ ┌─▼────────┐ ┌▼─────────┐ ┌▼────────┐
│ Order    │ │ Driver  │ │ Route    │ │ Temp     │ │ Payment │
│ Service  │ │ Service │ │ Optimizer│ │ Monitor  │ │ Service │
└─────┬────┘ └──┬──────┘ └─┬────────┘ └┬─────────┘ └┬────────┘
      │          │          │          │          │
┌─────▼──────────▼──────────▼──────────▼──────────▼──────────┐
│                   Data & Analytics Layer                     │
│     (PostgreSQL, Redis, TimescaleDB, Elasticsearch)         │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  External Integrations                       │
│  (Restaurant POS, Maps, Weather, Traffic, IoT Sensors)      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

**Order Creation Flow:**
```
Customer → Order API → Validation → Restaurant Notification
→ Driver Assignment → Route Optimization → Driver App → Pickup
→ Transit → Delivery → Completion → Payment → Feedback
```

**Real-time Tracking Flow:**
```
Driver GPS → Location Service → Order Service → WebSocket
→ Customer App (Real-time updates every 10-30 seconds)
```

### 2.3 Technology Stack

**Required Components:**
- RESTful API with JSON payloads
- WebSocket for real-time tracking
- GPS/GNSS for location services
- PostgreSQL or compatible relational database
- Redis for caching and real-time data
- Message queue (Kafka, RabbitMQ, etc.)

**Optional Components:**
- TimescaleDB for time-series temperature data
- Elasticsearch for search and analytics
- GraphQL for flexible client queries
- IoT sensors for temperature monitoring

---

## 3. Order Management

### 3.1 Order Lifecycle States

```
PENDING → CONFIRMED → PREPARING → READY → ASSIGNED
→ PICKED_UP → IN_TRANSIT → ARRIVING → DELIVERED → COMPLETED

Alternative paths:
PENDING → REJECTED
* → CANCELLED (any state before PICKED_UP)
* → FAILED (after PICKED_UP, with refund)
```

### 3.2 Order Creation

**Minimum Required Fields:**
```json
{
  "restaurantId": "string (UUID)",
  "customerId": "string (UUID)",
  "items": [
    {
      "itemId": "string",
      "name": "string",
      "quantity": "integer (>0)",
      "price": "decimal (≥0)",
      "temperature": "hot|cold|ambient|frozen"
    }
  ],
  "pickupLocation": {
    "latitude": "decimal (-90 to 90)",
    "longitude": "decimal (-180 to 180)",
    "address": "string"
  },
  "deliveryLocation": {
    "latitude": "decimal",
    "longitude": "decimal",
    "address": "string",
    "instructions": "string (optional)"
  }
}
```

**Optional Fields:**
- `scheduledTime`: ISO 8601 timestamp for scheduled delivery
- `deliveryWindow`: Start and end time range
- `contactlessDelivery`: Boolean flag
- `utensils`: Boolean flag for including utensils
- `specialInstructions`: Free text field (max 500 chars)
- `promoCode`: Discount code
- `tip`: Pre-specified tip amount

### 3.3 Order Validation Rules

**Restaurant Validation:**
1. Restaurant must be active and accepting orders
2. Restaurant must be within service area
3. Restaurant operating hours must cover delivery time
4. Minimum order value must be met (if applicable)

**Customer Validation:**
1. Delivery address must be within service radius
2. Customer must have valid payment method
3. Customer account must be in good standing

**Item Validation:**
1. All items must be available in restaurant menu
2. Item prices must match current menu prices
3. Quantities must be within allowed limits
4. Item modifications must be valid options

**Logistics Validation:**
1. Estimated delivery time must be feasible
2. Driver availability for estimated time
3. Temperature requirements must be compatible
4. Distance must be within maximum delivery range

### 3.4 Order Assignment

**Driver Assignment Algorithm:**

```python
def assign_driver(order):
    # 1. Filter available drivers
    available_drivers = get_available_drivers(
        location=order.pickup_location,
        radius=10_km,
        vehicle_type=order.required_vehicle
    )

    # 2. Score each driver
    for driver in available_drivers:
        score = calculate_driver_score(
            distance_to_pickup=haversine(driver.location, order.pickup_location),
            driver_rating=driver.avg_rating,
            completion_rate=driver.completion_rate,
            current_batch_size=len(driver.active_orders),
            temperature_capability=driver.equipment.temperature_control
        )
        driver.assignment_score = score

    # 3. Sort by score (descending)
    drivers_ranked = sorted(available_drivers, key=lambda d: d.assignment_score, reverse=True)

    # 4. Assign to highest scored driver
    if drivers_ranked:
        return drivers_ranked[0]
    else:
        return None  # Enter queue for next available driver
```

**Scoring Factors:**
- Distance to pickup: 40% weight
- Driver rating: 25% weight
- Completion rate: 20% weight
- Current load: 10% weight
- Equipment capability: 5% weight

### 3.5 Batching Strategy

**Batching Criteria:**
```
Can batch orders A and B if:
1. |pickup_A.location - pickup_B.location| < 1 km
2. |delivery_A.location - delivery_B.location| < 2 km
3. |expected_time_A - expected_time_B| < 15 minutes
4. temperature_requirements(A) == temperature_requirements(B)
5. total_batch_size ≤ 4 orders
6. total_batch_weight ≤ driver.capacity
```

**Batch Optimization:**
```
Maximize: (Orders in batch) / (Total delivery time)
Subject to:
- Each order delivered within promised window
- Temperature maintained for all items
- Total weight ≤ vehicle capacity
- Total volume ≤ container capacity
```

---

## 4. Driver Management

### 4.1 Driver States

```
OFFLINE → ONLINE → AVAILABLE → ASSIGNED → EN_ROUTE_TO_PICKUP
→ AT_RESTAURANT → PICKING_UP → LOADED → IN_TRANSIT
→ ARRIVING → DELIVERING → COMPLETED → AVAILABLE
```

### 4.2 Driver Profile

**Required Information:**
```json
{
  "driverId": "string (UUID)",
  "name": "string",
  "phone": "string (E.164 format)",
  "email": "string",
  "vehicleType": "bike|ebike|scooter|motorcycle|car",
  "licensePlate": "string",
  "rating": "decimal (0-5)",
  "completionRate": "decimal (0-1)",
  "equipment": {
    "hotBag": "boolean",
    "coldBag": "boolean",
    "temperatureSensor": "boolean",
    "smartphoneModel": "string"
  },
  "location": {
    "latitude": "decimal",
    "longitude": "decimal",
    "accuracy": "decimal (meters)",
    "timestamp": "ISO 8601"
  },
  "status": "string (driver state)"
}
```

### 4.3 Location Tracking

**Update Frequency:**
- `AVAILABLE`: Every 60 seconds
- `EN_ROUTE_TO_PICKUP`: Every 30 seconds
- `IN_TRANSIT`: Every 10 seconds
- `ARRIVING`: Every 5 seconds

**Location Accuracy Requirements:**
- Minimum accuracy: 50 meters
- Preferred accuracy: 10 meters
- Urban areas: GPS + WiFi triangulation
- Indoor (restaurants): WiFi or Bluetooth beacons

**Privacy Considerations:**
- Location tracking only when driver is online
- Historical location data retention: 30 days
- Anonymization for analytics after 90 days

### 4.4 Driver Performance Metrics

**Core KPIs:**
```typescript
interface DriverMetrics {
  // Efficiency
  ordersPerHour: number;              // Target: 2-3
  avgDeliveryTime: number;            // Minutes
  avgDistancePerOrder: number;        // Kilometers
  utilizationRate: number;            // Active time / Online time

  // Quality
  onTimeDeliveryRate: number;         // Target: >90%
  customerRating: number;             // Target: >4.5/5
  orderAccuracy: number;              // Target: >99%
  temperatureCompliance: number;      // Target: >95%

  // Reliability
  completionRate: number;             // Target: >98%
  cancellationRate: number;           // Target: <2%
  responseTime: number;               // Seconds to accept order

  // Earnings
  totalEarnings: number;              // Currency
  avgEarningsPerHour: number;         // Currency
  avgEarningsPerDelivery: number;     // Currency
}
```

**Performance Tiers:**
```
Bronze: <100 deliveries, rating >4.0
Silver: 100-500 deliveries, rating >4.3, on-time >85%
Gold: 500-2000 deliveries, rating >4.6, on-time >90%
Platinum: >2000 deliveries, rating >4.8, on-time >95%
```

### 4.5 Driver Compensation

**Base Pay Structure:**
```
Earnings = Base Fee + Distance Pay + Time Pay + Tips + Bonuses - Fees

Base Fee = $2.50 - $5.00 per delivery
Distance Pay = $0.50 - $1.50 per km
Time Pay = $0.10 - $0.30 per minute (active time)
Peak Hour Bonus = 1.2x - 2.0x base pay
Quest Bonuses = Additional for completing X orders in timeframe
```

**Expense Considerations:**
- Fuel/electricity: ~$0.15-0.30 per km
- Vehicle maintenance: ~$0.05-0.10 per km
- Insurance: ~$100-300 per month
- Equipment: ~$50-200 one-time + $20/month replacement

---

## 5. Route Optimization

### 5.1 Single-Stop Routing

**Objective:** Minimize delivery time from pickup to dropoff

**Algorithm: Dijkstra's Shortest Path with Time Weights**

```python
def calculate_single_route(pickup, delivery, current_time):
    """
    Calculate optimal route considering:
    - Real-time traffic
    - Road restrictions
    - Weather conditions
    - Historical patterns
    """

    # Get road network graph
    graph = get_road_network(
        bounds=bounding_box(pickup, delivery)
    )

    # Apply time-dependent weights
    for edge in graph.edges:
        base_time = edge.distance / speed_limit(edge)
        traffic_factor = get_traffic_factor(edge, current_time)
        weather_factor = get_weather_factor(edge, current_time)

        edge.weight = base_time * traffic_factor * weather_factor

    # Find shortest path
    path = dijkstra(graph, pickup, delivery)

    # Calculate ETA
    total_time = sum(edge.weight for edge in path)
    eta = current_time + timedelta(seconds=total_time)

    return {
        'path': path,
        'distance': sum(edge.distance for edge in path),
        'duration': total_time,
        'eta': eta,
        'waypoints': get_turn_by_turn_directions(path)
    }
```

### 5.2 Multi-Stop Routing

**Problem:** Traveling Salesman Problem (TSP) with time windows

**Objective:** Minimize total route time while meeting delivery windows

**Algorithm: 2-Opt with Time Window Constraints**

```python
def optimize_multi_stop_route(orders):
    """
    Optimize route for multiple pickups and deliveries

    Constraints:
    - Each pickup must occur before its delivery
    - Delivery must occur within promised time window
    - Temperature requirements must be maintained
    - Vehicle capacity must not be exceeded
    """

    # Create stops list (pickups and deliveries)
    stops = []
    for order in orders:
        stops.append({
            'type': 'pickup',
            'order_id': order.id,
            'location': order.pickup_location,
            'time_window': order.pickup_window,
            'duration': 5  # minutes
        })
        stops.append({
            'type': 'delivery',
            'order_id': order.id,
            'location': order.delivery_location,
            'time_window': order.delivery_window,
            'duration': 3  # minutes
        })

    # Initial route using nearest neighbor
    route = nearest_neighbor_tsp(stops)

    # Validate pickup-before-delivery constraint
    route = enforce_precedence(route)

    # Optimize using 2-opt
    improved = True
    while improved:
        improved = False
        for i in range(len(route) - 1):
            for j in range(i + 2, len(route)):
                new_route = two_opt_swap(route, i, j)

                if (is_valid(new_route) and
                    route_cost(new_route) < route_cost(route)):
                    route = new_route
                    improved = True

    return route

def route_cost(route):
    """Calculate total cost (time + penalties)"""
    total_time = 0
    penalty = 0
    current_time = now()

    for i in range(len(route) - 1):
        # Travel time
        travel_time = calculate_travel_time(route[i], route[i+1])
        total_time += travel_time
        current_time += travel_time

        # Stop duration
        total_time += route[i+1]['duration']
        current_time += route[i+1]['duration']

        # Late delivery penalty
        if current_time > route[i+1]['time_window']['end']:
            penalty += 1000 * (current_time - route[i+1]['time_window']['end']).seconds

    return total_time + penalty
```

### 5.3 Dynamic Re-routing

**Triggers for Re-routing:**
1. Traffic incident on current route
2. New order added to batch
3. Restaurant delay (prep time extended)
4. Driver deviation from route
5. Road closure or weather event

**Re-routing Decision:**
```python
def should_reroute(current_route, new_conditions):
    """
    Decide if re-routing is beneficial

    Re-route if:
    - New route saves >5 minutes AND >10% time
    - Current route becomes infeasible
    - Critical alert (accident, road closure)
    """

    new_route = calculate_route(new_conditions)

    time_saved = current_route.eta - new_route.eta
    percent_saved = time_saved / current_route.duration

    if current_route.is_infeasible():
        return True, new_route

    if time_saved > 300 and percent_saved > 0.10:  # 5 min and 10%
        return True, new_route

    return False, current_route
```

### 5.4 Zone-Based Optimization

**Geofencing Strategy:**
```
City divided into zones:
- Downtown: 2km x 2km high-density
- Urban: 5km x 5km medium-density
- Suburban: 10km x 10km low-density

Zone assignment:
- Restaurants belong to zone of location
- Drivers assigned to zone(s) based on location
- Orders matched within zone first, then adjacent zones
```

**Benefits:**
- Reduced average pickup distance (30-40%)
- Better driver familiarity with area
- Improved ETA accuracy
- Easier capacity planning

---

## 6. Temperature Monitoring

### 6.1 Temperature Requirements

**Food Safety Zones:**
```
Danger Zone: 4°C - 60°C (bacteria growth)
Hot Food Safety: ≥60°C (140°F)
Cold Food Safety: ≤4°C (39°F)
Frozen Food: ≤-18°C (0°F)
Ambient: 15-25°C
```

**Maximum Transit Times:**
```
Hot Food: 45 minutes (before falling below 60°C)
Cold Food: 60 minutes (before rising above 4°C)
Frozen: 30 minutes (before thawing begins)
Ambient: 90 minutes (quality degradation)
```

### 6.2 Temperature Monitoring System

**IoT Sensor Specifications:**
```json
{
  "sensorId": "string (UUID)",
  "type": "bluetooth|wifi|cellular",
  "accuracy": "±0.5°C",
  "range": "-20°C to 100°C",
  "batteryLife": "180 days",
  "reportingInterval": "60 seconds",
  "alertThresholds": {
    "hot_min": 60,
    "cold_max": 4,
    "frozen_max": -15
  }
}
```

**Data Collection:**
```typescript
interface TemperatureReading {
  timestamp: Date;
  orderId: string;
  sensorId: string;
  temperature: number;  // Celsius
  humidity?: number;    // Percentage
  batteryLevel: number; // Percentage
  location: {
    latitude: number;
    longitude: number;
  };
}
```

**Storage:**
- Time-series database (TimescaleDB, InfluxDB)
- Retention: 90 days for compliance
- Compression: After 7 days
- Aggregation: 1-minute averages after 30 days

### 6.3 Temperature Alerts

**Alert Levels:**
```
WARNING: Temperature within 5°C of threshold for >2 minutes
CRITICAL: Temperature exceeds threshold for >5 minutes
SEVERE: Temperature in danger zone for >15 minutes
```

**Alert Actions:**
```python
def handle_temperature_alert(reading, order):
    """Process temperature alert"""

    if reading.alert_level == 'WARNING':
        # Notify driver
        send_driver_notification(order.driver_id,
            "Temperature warning: Check food container")

    elif reading.alert_level == 'CRITICAL':
        # Notify driver and support team
        send_driver_notification(order.driver_id,
            "CRITICAL: Temperature out of range")
        create_support_ticket(order.id,
            priority='high',
            reason='temperature_violation')

    elif reading.alert_level == 'SEVERE':
        # Notify all parties, flag for refund
        send_multi_channel_alert(order)
        flag_for_quality_review(order.id)
        automatic_refund(order.id,
            reason='food_safety_violation')
```

### 6.4 Insulation Requirements

**Thermal Bag Specifications:**

| Food Type | Min R-Value | Max Heat Loss | Duration |
|-----------|-------------|---------------|----------|
| Hot | R-8 | 1°C per 10 min | 45 min |
| Cold | R-10 | 1°C per 15 min | 60 min |
| Frozen | R-12 + ice packs | 2°C per 30 min | 90 min |

**Active Temperature Control:**
```
Electric Hot Bag:
- Heating element: 50-100W
- Target temp: 65-75°C
- Power source: 12V vehicle or battery pack
- Auto shutoff: At delivery

Electric Cold Bag:
- Peltier cooling: 20-40W
- Target temp: 0-4°C
- Power source: 12V vehicle or battery pack
- Backup: Phase change materials (PCM)
```

---

## 7. Time Estimation

### 7.1 Delivery Time Formula

```
Total Delivery Time = T_prep + T_assign + T_pickup + T_transit + T_dropoff

Where:
T_prep = Restaurant preparation time (historical avg + current load)
T_assign = Driver assignment time (median: 2 min)
T_pickup = Driver arrival at restaurant + waiting + loading (5-10 min)
T_transit = Route distance / avg_speed × traffic_factor
T_dropoff = Parking + walking + handoff (3-5 min)
```

### 7.2 Preparation Time Prediction

**Machine Learning Model:**
```python
def predict_prep_time(restaurant_id, order_items, current_time):
    """
    Predict food preparation time using ML model

    Features:
    - Restaurant historical avg prep time
    - Number of items in order
    - Complexity of items (simple/complex)
    - Current restaurant load (pending orders)
    - Time of day (rush hour factor)
    - Day of week
    - Special events/holidays
    """

    features = {
        'restaurant_avg': get_restaurant_avg_prep(restaurant_id),
        'item_count': len(order_items),
        'complexity_score': calculate_complexity(order_items),
        'current_load': get_pending_orders(restaurant_id),
        'hour': current_time.hour,
        'is_peak': is_peak_hour(current_time),
        'day_of_week': current_time.weekday()
    }

    # Random Forest Regression model
    predicted_time = prep_time_model.predict(features)

    # Add confidence interval
    confidence = prep_time_model.predict_confidence(features)

    return {
        'expected': predicted_time,
        'min': predicted_time * 0.8,
        'max': predicted_time * 1.3,
        'confidence': confidence
    }
```

### 7.3 Transit Time Calculation

**Speed Estimation by Vehicle Type:**
```
Bike: 15 km/h average (urban)
E-bike: 20 km/h average
Scooter: 25 km/h average
Motorcycle: 35 km/h average
Car: 30 km/h average (urban), 60 km/h (suburban)
```

**Traffic Factors:**
```python
def get_traffic_factor(route, time):
    """
    Calculate traffic multiplier for route

    Returns multiplier: 1.0 (no traffic) to 3.0 (heavy congestion)
    """

    # Historical traffic patterns
    historical = get_historical_traffic(route, time.hour, time.weekday())

    # Real-time traffic data
    realtime = get_realtime_traffic(route)

    # Weighted average (70% realtime, 30% historical)
    traffic_factor = 0.7 * realtime + 0.3 * historical

    # Weather adjustment
    weather = get_weather_conditions()
    if weather.precipitation > 0:
        traffic_factor *= (1 + 0.2 * weather.precipitation)  # Max +20%

    return min(traffic_factor, 3.0)  # Cap at 3x
```

### 7.4 ETA Updates

**Update Frequency:**
```
Initial ETA: At order confirmation
Update 1: When driver assigned (based on driver location)
Update 2: When driver picks up (based on actual route)
Update 3: Every 2 minutes during transit
Final: When driver is <2 min away
```

**ETA Accuracy Targets:**
```
Confidence Level  | Accuracy Target | Use Case
------------------|-----------------|----------
50% confidence   | ±5 minutes      | Initial estimate
80% confidence   | ±3 minutes      | Post-assignment
95% confidence   | ±1 minute       | During transit
99% confidence   | ±30 seconds     | Final approach
```

---

## 8. Cost Calculation

### 8.1 Pricing Components

**Base Delivery Fee:**
```python
def calculate_base_fee(distance_km):
    """
    Base fee increases with distance
    """
    if distance_km <= 2:
        return 2.99
    elif distance_km <= 5:
        return 3.99
    elif distance_km <= 10:
        return 5.99
    else:
        return 5.99 + (distance_km - 10) * 0.50
```

**Distance Fee:**
```
Distance Fee = distance_km × per_km_rate

per_km_rate varies by:
- Vehicle type (bike: $0.30, car: $0.50)
- Region (urban: lower, rural: higher)
- Time (peak: higher, off-peak: lower)
```

**Time Fee:**
```
Time Fee = estimated_minutes × per_minute_rate

per_minute_rate = $0.10 - $0.20
(compensates driver for time spent)
```

**Small Order Fee:**
```
if order_subtotal < minimum_order:
    small_order_fee = minimum_order - order_subtotal
else:
    small_order_fee = 0

Typical minimum: $10-15
```

**Service Fee:**
```
Service Fee = order_subtotal × service_rate

service_rate = 10-20% (platform commission)
```

**Surge Pricing:**
```python
def calculate_surge_multiplier(zone, time):
    """
    Dynamic surge pricing based on demand/supply
    """

    demand = count_active_orders(zone)
    supply = count_available_drivers(zone)

    ratio = demand / max(supply, 1)

    if ratio < 1.0:
        surge = 1.0  # No surge
    elif ratio < 2.0:
        surge = 1.0 + 0.25 * (ratio - 1.0)  # Up to 1.25x
    elif ratio < 4.0:
        surge = 1.25 + 0.375 * (ratio - 2.0)  # Up to 2.0x
    else:
        surge = min(2.0 + 0.25 * (ratio - 4.0), 3.0)  # Cap at 3.0x

    return surge
```

### 8.2 Total Cost Breakdown

```typescript
interface DeliveryCost {
  // Customer-facing
  subtotal: number;           // Food items total
  deliveryFee: number;        // Base + distance + time
  serviceFee: number;         // Platform commission
  smallOrderFee: number;      // If below minimum
  tax: number;                // Sales tax
  tip: number;                // Customer tip
  discount: number;           // Promo code discount
  total: number;              // Grand total

  // Internal breakdown
  driverPay: number;          // Amount to driver
  restaurantPayout: number;   // Amount to restaurant
  platformRevenue: number;    // Platform earnings

  // Surge
  surgeMultiplier: number;    // 1.0 - 3.0
  isSurge: boolean;
}
```

**Example Calculation:**
```
Order Subtotal: $25.00
Delivery Fee:   $4.99 (2 km, 15 min)
Service Fee:    $3.75 (15% of subtotal)
Tax:            $2.69 (9% of subtotal + fees)
Tip:            $5.00 (20%)
Discount:       -$3.00 (promo code)
----------------------------
Total:          $38.43

Breakdown:
- To Driver:    $9.99 ($4.99 delivery + $5.00 tip)
- To Restaurant: $25.00
- To Platform:  $3.44 ($3.75 service - $0.31 payment processing)
```

---

## 9. Quality Assurance

### 9.1 Quality Metrics

**Order Accuracy:**
```
Accuracy = (Correct Orders / Total Orders) × 100%

Correct Order = All items present AND correct items AND no damage

Target: >99%
```

**Customer Satisfaction:**
```
Satisfaction Score = Average(Rating_Food, Rating_Delivery, Rating_Driver)

Rating scale: 1-5 stars
Target: >4.5/5
```

**Freshness Score:**
```python
def calculate_freshness_score(order):
    """
    Freshness based on temperature compliance and time
    """

    temp_compliance = (
        time_in_safe_range / total_transit_time
    )

    time_factor = max(0, 1 - (transit_time / max_recommended_time))

    freshness = (0.6 * temp_compliance) + (0.4 * time_factor)

    return freshness * 100  # 0-100 score
```

### 9.2 Quality Control Checkpoints

**Restaurant Checkpoint:**
```
- Photo of packaged order (optional but recommended)
- Verify all items present
- Seal bag for tampering prevention
- Add temperature indicator sticker
- Timestamp of handoff
```

**Driver Checkpoint:**
```
- Confirm items match order
- Check temperature of bag
- Verify container is properly sealed
- Note any concerns or special handling
```

**Delivery Checkpoint:**
```
- Photo proof of delivery
- Customer signature (if required)
- Contactless confirmation
- Note delivery location
- Verify customer received order
```

### 9.3 Feedback System

**Rating Collection:**
```typescript
interface OrderRating {
  orderId: string;
  customerId: string;

  // Ratings (1-5 stars)
  foodQuality: number;
  foodTemperature: number;
  packaging: number;
  deliverySpeed: number;
  driverProfessionalism: number;
  communication: number;
  overallExperience: number;

  // Feedback
  comments: string;
  wouldRecommend: boolean;

  // Issues (optional)
  issues?: string[];  // ['missing_item', 'cold_food', 'late_delivery']
  photos?: string[];  // Evidence photos
}
```

**Automated Quality Flags:**
```python
def check_quality_flags(order):
    """
    Automatically flag orders with potential issues
    """

    flags = []

    # Temperature violation
    if order.temperature_violations > 0:
        flags.append('temperature_violation')

    # Excessive delay
    if order.actual_time > order.promised_time * 1.5:
        flags.append('excessive_delay')

    # Multiple re-routes
    if order.reroute_count > 3:
        flags.append('routing_issues')

    # Driver deviation
    if order.route_deviation_distance > 2_km:
        flags.append('route_deviation')

    # Low rating pattern
    if order.restaurant.recent_rating < 4.0:
        flags.append('restaurant_quality_concern')

    return flags
```

---

## 10. Safety & Compliance

### 10.1 Food Safety Standards

**HACCP Principles:**
1. **Hazard Analysis**: Identify biological, chemical, physical hazards
2. **Critical Control Points**: Temperature, time, contamination prevention
3. **Critical Limits**: Temperature thresholds, time limits
4. **Monitoring**: Continuous temperature tracking
5. **Corrective Actions**: Alerts, order rejection, refunds
6. **Verification**: Audits, sensor calibration
7. **Record-keeping**: 90-day temperature logs

**FDA Food Code Compliance:**
```
Hot Food: Maintain ≥135°F (57°C) during transport
Cold Food: Maintain ≤41°F (5°C) during transport
Time Limit: <4 hours from cooking to consumption
Contamination: Sealed containers, no bare-hand contact
```

### 10.2 Driver Safety

**Background Checks:**
- Criminal background check (state/national)
- Driving record check (MVR)
- Identity verification
- Right to work verification

**Training Requirements:**
- Food safety certification
- Defensive driving course
- Customer service training
- App and equipment usage
- Emergency procedures

**Safety Equipment:**
- Reflective vest (for bike/scooter drivers)
- Helmet (required for 2-wheeled vehicles)
- First aid kit
- Phone mount for navigation
- Flashlight for night deliveries

**Incident Reporting:**
```typescript
interface SafetyIncident {
  incidentId: string;
  driverId: string;
  orderId?: string;
  timestamp: Date;
  type: 'accident' | 'theft' | 'harassment' | 'injury' | 'other';
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  description: string;
  location: GeoLocation;
  policeReport?: string;
  witnesses?: string[];
  photos?: string[];
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
}
```

### 10.3 Data Privacy

**GDPR/CCPA Compliance:**
```
Personal Data Collection:
- Name, phone, email, address (required for delivery)
- Payment information (PCI-DSS compliant)
- Location data (only when app active)
- Order history (for personalization)

User Rights:
- Right to access data
- Right to delete account and data
- Right to port data
- Right to opt-out of marketing

Data Retention:
- Active users: Indefinitely
- Inactive users (>2 years): Anonymization
- Deleted accounts: 30-day grace period, then permanent deletion
```

**Location Data Privacy:**
```
Driver Location:
- Shared with customer only for active order
- Aggregated/anonymized for analytics
- Not sold to third parties
- Retained for 30 days maximum

Customer Location:
- Encrypted at rest and in transit
- Access limited to need-to-know
- Not shared with drivers after delivery
```

### 10.4 Insurance Requirements

**Platform Insurance:**
- General liability: $1M per occurrence
- Auto liability: $1M per accident
- Cyber liability: $5M coverage
- Workers' compensation: As required by jurisdiction

**Driver Insurance:**
```
Personal Auto Policy: Minimum state requirements
Commercial Policy: $1M liability (if using personal vehicle)
Occupational Accident: $1M coverage
Uninsured Motorist: $100K/$300K
```

---

## 11. API Specification

### 11.1 RESTful Endpoints

**Base URL:** `https://api.wia-ind-009.com/v1`

**Authentication:** Bearer token (JWT)

```
POST   /orders                    Create new order
GET    /orders/:id                Get order details
GET    /orders                    List orders (with filters)
PATCH  /orders/:id                Update order
DELETE /orders/:id                Cancel order

GET    /orders/:id/tracking       Real-time tracking
GET    /orders/:id/temperature    Temperature history

POST   /drivers                   Register driver
GET    /drivers/:id               Get driver profile
PATCH  /drivers/:id               Update driver profile
GET    /drivers/:id/metrics       Driver performance metrics

POST   /routes/optimize           Optimize multi-stop route
GET    /routes/:id                Get route details

POST   /ratings                   Submit rating/feedback
GET    /ratings/:orderId          Get order ratings

GET    /analytics/dashboard       Platform analytics
GET    /analytics/reports         Generate reports
```

### 11.2 WebSocket Events

**Connection:** `wss://ws.wia-ind-009.com/tracking`

**Client → Server:**
```json
{
  "action": "subscribe",
  "orderId": "order_123",
  "userId": "user_456"
}
```

**Server → Client:**
```json
{
  "event": "location_update",
  "orderId": "order_123",
  "timestamp": "2025-01-15T14:30:00Z",
  "data": {
    "driver": {
      "location": {"lat": 37.7749, "lng": -122.4194},
      "heading": 45,
      "speed": 25
    },
    "eta": "2025-01-15T14:45:00Z",
    "distance": 2.5,
    "status": "in_transit"
  }
}
```

### 11.3 Webhook Notifications

**Webhook Events:**
```
order.created
order.confirmed
order.preparing
order.ready
order.picked_up
order.in_transit
order.delivered
order.cancelled
order.temperature_alert
order.delayed
driver.assigned
driver.arrived
```

**Webhook Payload:**
```json
{
  "event": "order.delivered",
  "timestamp": "2025-01-15T15:00:00Z",
  "data": {
    "orderId": "order_123",
    "status": "delivered",
    "deliveryTime": "2025-01-15T15:00:00Z",
    "photo": "https://cdn.example.com/proof_123.jpg"
  },
  "signature": "sha256_hmac_signature"
}
```

### 11.4 Rate Limiting

```
Authenticated Requests:
- Standard tier: 100 requests/minute
- Premium tier: 1000 requests/minute
- Enterprise tier: 10000 requests/minute

WebSocket Connections:
- Max 10 concurrent connections per user
- Max 100 subscriptions per connection

Burst Allowance:
- 2x rate for up to 10 seconds
- Then throttled to standard rate
```

---

## 12. Data Models

### 12.1 Order Entity

```typescript
interface Order {
  // Identity
  id: string;                    // UUID
  externalId?: string;           // Partner system ID

  // Parties
  restaurantId: string;
  customerId: string;
  driverId?: string;

  // Items
  items: OrderItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;

  // Locations
  pickupLocation: Location;
  deliveryLocation: Location;

  // Timing
  createdAt: Date;
  confirmedAt?: Date;
  preparedAt?: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
  estimatedDelivery: Date;
  actualDelivery?: Date;

  // Status
  status: OrderStatus;
  statusHistory: StatusChange[];

  // Logistics
  route?: Route;
  temperature?: TemperatureLog[];
  distance: number;              // km
  duration: number;              // minutes

  // Preferences
  contactlessDelivery: boolean;
  specialInstructions?: string;

  // Quality
  rating?: OrderRating;
  issues?: string[];

  // Metadata
  metadata?: Record<string, any>;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  temperature: 'hot' | 'cold' | 'ambient' | 'frozen';
  modifiers?: string[];
  specialRequests?: string;
}

type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'assigned'
  | 'picked_up'
  | 'in_transit'
  | 'arriving'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'failed';
```

### 12.2 Driver Entity

```typescript
interface Driver {
  // Identity
  id: string;
  externalId?: string;

  // Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo?: string;

  // Vehicle
  vehicleType: VehicleType;
  licensePlate?: string;
  vehicleModel?: string;
  vehicleYear?: number;

  // Status
  status: DriverStatus;
  isOnline: boolean;
  location: Location;
  lastLocationUpdate: Date;

  // Performance
  rating: number;
  totalDeliveries: number;
  completionRate: number;
  onTimeRate: number;

  // Equipment
  equipment: {
    hasHotBag: boolean;
    hasColdBag: boolean;
    hasTemperatureSensor: boolean;
    hasInsulatedContainer: boolean;
  };

  // Capacity
  maxOrders: number;
  currentOrders: string[];       // Order IDs

  // Financials
  earnings: {
    today: number;
    week: number;
    month: number;
    allTime: number;
  };

  // Verification
  backgroundCheckStatus: 'pending' | 'approved' | 'rejected';
  licenseVerified: boolean;
  insuranceVerified: boolean;

  // Metadata
  createdAt: Date;
  lastActiveAt: Date;
  metadata?: Record<string, any>;
}

type VehicleType =
  | 'bike'
  | 'ebike'
  | 'scooter'
  | 'motorcycle'
  | 'car';

type DriverStatus =
  | 'offline'
  | 'online'
  | 'available'
  | 'assigned'
  | 'picking_up'
  | 'in_transit'
  | 'delivering';
```

### 12.3 Route Entity

```typescript
interface Route {
  id: string;
  driverId: string;
  orders: string[];              // Order IDs

  // Route details
  stops: RouteStop[];
  totalDistance: number;         // km
  totalDuration: number;         // minutes
  optimizationAlgorithm: string;

  // Waypoints
  waypoints: GeoPoint[];
  encodedPolyline?: string;      // Google polyline encoding

  // Performance
  estimatedCost: number;
  fuelConsumption?: number;
  co2Emissions?: number;

  // Status
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  startedAt?: Date;
  completedAt?: Date;

  // Deviations
  deviations: RouteDeviation[];
}

interface RouteStop {
  sequence: number;
  type: 'pickup' | 'delivery';
  orderId: string;
  location: Location;
  arrivalTime: Date;
  departureTime?: Date;
  duration: number;              // minutes
  completed: boolean;
}

interface RouteDeviation {
  timestamp: Date;
  location: Location;
  reason: string;
  distanceOff: number;           // meters
  timeImpact: number;            // minutes
}
```

---

## 13. Security

### 13.1 Authentication & Authorization

**JWT Token Structure:**
```json
{
  "sub": "user_123",
  "role": "customer|driver|restaurant|admin",
  "permissions": ["order:create", "order:read", "order:update"],
  "exp": 1642262400,
  "iat": 1642176000
}
```

**Role-Based Access Control (RBAC):**
```
Customer:
- Create orders
- Track own orders
- Rate deliveries
- Manage payment methods

Driver:
- Accept orders
- Update order status
- Update location
- View assigned orders

Restaurant:
- Receive orders
- Update prep status
- Manage menu
- View analytics

Admin:
- Full access
- Platform configuration
- User management
- Analytics and reports
```

### 13.2 Data Encryption

**Encryption at Rest:**
- AES-256 for database
- Customer PII encrypted with separate keys
- Payment data: PCI-DSS Level 1 compliant

**Encryption in Transit:**
- TLS 1.3 for all API connections
- Certificate pinning for mobile apps
- WebSocket: WSS (secure WebSocket)

### 13.3 API Security

**Request Signing:**
```
X-WIA-Signature: HMAC-SHA256(secret, timestamp + method + path + body)
X-WIA-Timestamp: Unix timestamp (reject if >5 min old)
```

**Input Validation:**
```python
def validate_order_input(data):
    """
    Validate all inputs to prevent injection attacks
    """

    # Required fields
    assert 'restaurantId' in data
    assert 'customerId' in data
    assert 'items' in data and len(data['items']) > 0

    # Type checking
    assert isinstance(data['items'], list)
    assert all(isinstance(item['quantity'], int) for item in data['items'])

    # Range checking
    assert all(item['quantity'] > 0 for item in data['items'])
    assert all(item['price'] >= 0 for item in data['items'])

    # String sanitization
    for item in data['items']:
        item['name'] = sanitize_html(item['name'])
        if 'specialRequests' in item:
            item['specialRequests'] = sanitize_html(item['specialRequests'])

    # Geo validation
    assert -90 <= data['deliveryLocation']['latitude'] <= 90
    assert -180 <= data['deliveryLocation']['longitude'] <= 180

    return True
```

**Rate Limiting:**
```
Implement exponential backoff for repeated failures:
1st failure: No delay
2nd failure: 1 second
3rd failure: 2 seconds
4th failure: 4 seconds
...
Max delay: 60 seconds
```

---

## 14. Performance Requirements

### 14.1 Response Time SLAs

```
API Endpoint              | P50  | P95   | P99
--------------------------|------|-------|-------
GET /orders/:id          | 50ms | 100ms | 200ms
POST /orders             | 100ms| 300ms | 500ms
GET /orders/:id/tracking | 50ms | 100ms | 150ms
POST /routes/optimize    | 500ms| 2s    | 5s
WebSocket message        | 100ms| 200ms | 500ms
```

### 14.2 Scalability Targets

```
Concurrent Users:
- 100,000 active customers
- 10,000 active drivers
- 5,000 active restaurants

Throughput:
- 10,000 orders per hour (peak)
- 100,000 location updates per minute
- 500,000 tracking requests per minute

Database:
- 10M orders per month
- 100M location points per month
- 1B temperature readings per month
```

### 14.3 Availability

```
Service Level: 99.9% uptime (43 minutes downtime per month)

Component SLAs:
- API Gateway: 99.99%
- Database: 99.95%
- WebSocket: 99.9%
- Background jobs: 99.5%

Disaster Recovery:
- RPO (Recovery Point Objective): 1 hour
- RTO (Recovery Time Objective): 4 hours
```

---

## 15. Integration Guidelines

### 15.1 Restaurant POS Integration

**Supported Formats:**
- ODATA (Open Data Protocol)
- REST API
- Webhook callbacks
- FTP/SFTP file exchange

**Integration Flow:**
```
POS System → Order Created → WIA API → Driver Assigned
→ Driver Arrives → POS Notification → Order Ready
→ Driver Picks Up → POS Complete
```

### 15.2 Third-Party Delivery Platform Integration

**Multi-platform Aggregation:**
```
UberEats   ────┐
DoorDash   ────┤
GrubHub    ────┼──→ WIA-IND-009 Aggregator ──→ Unified Dashboard
Postmates  ────┤
Custom     ────┘
```

**Benefits:**
- Single dashboard for all orders
- Unified driver management
- Consolidated analytics
- Centralized customer communication

### 15.3 Mapping Services

**Supported Providers:**
- Google Maps Platform
- Mapbox
- HERE Maps
- OpenStreetMap (OSRM)

**Required APIs:**
- Geocoding (address → coordinates)
- Reverse geocoding (coordinates → address)
- Directions (route calculation)
- Distance Matrix (multi-point distances)
- Real-time traffic

### 15.4 Payment Processing

**Supported Gateways:**
- Stripe
- Square
- PayPal
- Braintree
- Adyen

**Payment Flow:**
```
Order Created → Payment Authorization → Order Confirmed
→ ... Delivery ... → Payment Capture → Settlement

Refund scenarios:
- Order cancelled before pickup: Full refund
- Order cancelled after pickup: Partial refund (delivery fee retained)
- Quality issue: Variable refund based on severity
```

---

## 16. Appendices

### Appendix A: Error Codes

```
1000-1099: Authentication/Authorization errors
2000-2099: Validation errors
3000-3099: Resource not found errors
4000-4099: Business logic errors
5000-5099: External service errors
6000-6099: System errors

Examples:
1001: Invalid or expired token
2001: Missing required field
2010: Invalid location coordinates
3001: Order not found
4001: Restaurant not accepting orders
4010: Driver not available
5001: Mapping service unavailable
6001: Database connection error
```

### Appendix B: Units and Conversions

```
Distance:
- SI: kilometers (km), meters (m)
- Imperial: miles (mi), feet (ft)
- Conversion: 1 mi = 1.60934 km

Temperature:
- SI: Celsius (°C)
- Imperial: Fahrenheit (°F)
- Conversion: °F = (°C × 9/5) + 32

Speed:
- SI: kilometers per hour (km/h)
- Imperial: miles per hour (mph)
- Conversion: 1 mph = 1.60934 km/h

Weight:
- SI: kilograms (kg)
- Imperial: pounds (lb)
- Conversion: 1 lb = 0.453592 kg
```

### Appendix C: References

1. FDA Food Code 2022
2. HACCP Principles & Application Guidelines
3. GDPR (General Data Protection Regulation)
4. CCPA (California Consumer Privacy Act)
5. PCI DSS v4.0
6. ISO 22000:2018 Food Safety Management
7. Google Maps Platform Documentation
8. REST API Design Best Practices (RFC 7231)

---

## 17. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-01-15 | WIA Food Delivery WG | Initial release |

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*This specification is maintained by the WIA Food Delivery Working Group*
*© 2025 SmileStory Inc. / WIA*
*MIT License*

**For questions or contributions:**
- GitHub: https://github.com/WIA-Official/wia-standards
- Email: standards@wiastandards.com
- Web: https://wiastandards.com/ind-009
