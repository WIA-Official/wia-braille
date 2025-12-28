# WIA-IND-010: Restaurant Tech Specification v1.0

> **Standard ID:** WIA-IND-010
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Industry Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Point of Sale (POS) Systems](#2-point-of-sale-pos-systems)
3. [Reservation Management](#3-reservation-management)
4. [Kitchen Display Systems](#4-kitchen-display-systems)
5. [Staff Scheduling](#5-staff-scheduling)
6. [Inventory Management](#6-inventory-management)
7. [Customer Analytics](#7-customer-analytics)
8. [Menu Engineering](#8-menu-engineering)
9. [Payment Processing](#9-payment-processing)
10. [Multi-Location Management](#10-multi-location-management)
11. [Reporting & Analytics](#11-reporting--analytics)
12. [Data Formats](#12-data-formats)
13. [API Interface](#13-api-interface)
14. [Security & Compliance](#14-security--compliance)
15. [Integration Standards](#15-integration-standards)
16. [References](#16-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the comprehensive framework for restaurant technology systems, providing standardized methods for managing all aspects of restaurant operations from order processing to customer analytics. The standard enables consistent implementation across different restaurant types, sizes, and cuisines.

### 1.2 Scope

The standard covers:
- Point of Sale (POS) systems for order processing and payment handling
- Reservation and table management systems
- Kitchen Display Systems (KDS) for order routing and preparation tracking
- Staff scheduling and labor management
- Inventory control and procurement
- Customer relationship management and analytics
- Menu engineering and profitability analysis
- Payment processing and financial reporting
- Multi-location chain management
- Third-party delivery integration

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to revolutionize the restaurant industry by providing open, accessible technology frameworks that improve operations for restaurants of all sizes. By standardizing these systems, we enable smaller establishments to compete with larger chains, improve working conditions for staff through better scheduling, reduce food waste through intelligent inventory management, and enhance dining experiences for customers worldwide. Our goal is to make the restaurant industry more sustainable, efficient, and equitable for all participants.

### 1.4 Terminology

- **POS**: Point of Sale - system for processing orders and payments
- **KDS**: Kitchen Display System - digital order display for kitchen staff
- **Cover**: One customer/guest (industry standard unit)
- **Table Turn**: Complete service cycle for one party at a table
- **RevPASH**: Revenue Per Available Seat Hour
- **Par Level**: Minimum inventory quantity to maintain
- **86'd**: Item temporarily unavailable (industry slang)
- **Ticket Time**: Duration from order placed to food ready
- **COGS**: Cost of Goods Sold
- **Prime Cost**: Combined food and labor costs
- **FOH**: Front of House (dining area, customer-facing)
- **BOH**: Back of House (kitchen, prep areas)

---

## 2. Point of Sale (POS) Systems

### 2.1 Order Processing

#### 2.1.1 Order Types

The POS system must support multiple order types:

```typescript
enum OrderType {
  DINE_IN = 'dine_in',        // Traditional table service
  TAKEOUT = 'takeout',        // Customer pickup
  DELIVERY = 'delivery',      // Third-party or in-house delivery
  CURBSIDE = 'curbside',      // Contactless pickup
  DRIVE_THROUGH = 'drive_through',  // Drive-thru window
  CATERING = 'catering',      // Large orders for events
  BAR = 'bar'                 // Bar service only
}
```

#### 2.1.2 Order Structure

```typescript
interface Order {
  orderId: string;
  orderNumber: number;        // Sequential daily number
  orderType: OrderType;
  status: OrderStatus;
  tableNumber?: number;
  serverId: string;
  serverName: string;
  createdAt: Date;
  modifiedAt: Date;
  items: OrderItem[];
  subtotal: number;
  discounts: Discount[];
  tax: number;
  tip: number;
  total: number;
  paymentStatus: PaymentStatus;
  specialInstructions?: string;
  courseTiming?: CourseTiming[];
  guestCount?: number;
}
```

#### 2.1.3 Order Item Details

```typescript
interface OrderItem {
  itemId: string;
  menuItemId: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  modifiers: Modifier[];
  specialRequests?: string;
  station: KitchenStation;  // Where item is prepared
  courseNumber?: number;    // For multi-course meals
  seat?: number;            // Seat position tracking
  status: ItemStatus;
  prepTime: number;         // Estimated minutes
  firedAt?: Date;          // When sent to kitchen
  readyAt?: Date;          // When completed
}
```

#### 2.1.4 Modifiers and Customizations

```typescript
interface Modifier {
  modifierId: string;
  name: string;
  type: ModifierType;  // ADD, REMOVE, SUBSTITUTE
  priceAdjustment: number;  // Can be positive or negative
  affectsCost: boolean;
}

enum ModifierType {
  ADD = 'add',              // Add ingredient
  REMOVE = 'remove',        // Remove ingredient (usually no charge)
  SUBSTITUTE = 'substitute', // Replace ingredient
  PORTION = 'portion',      // Adjust portion size
  PREPARATION = 'preparation' // Cooking method (rare, well-done, etc.)
}
```

### 2.2 Pricing Calculations

#### 2.2.1 Order Total Calculation

```
Subtotal = Σ(Item Price × Quantity + Modifier Adjustments)
Discount Amount = Subtotal × Discount Rate (or Fixed Amount)
Taxable Amount = Subtotal - Discount
Tax = Taxable Amount × Tax Rate
Suggested Tip = Subtotal × Tip Percentage
Total = Subtotal - Discount + Tax + Tip
```

#### 2.2.2 Tax Calculation

Tax rates vary by jurisdiction and item type:

```typescript
interface TaxConfiguration {
  jurisdiction: string;
  foodTaxRate: number;        // Prepared food tax
  alcoholTaxRate: number;     // Alcoholic beverage tax
  retailTaxRate: number;      // Packaged goods tax
  cateringTaxRate?: number;   // Special catering tax
  deliveryTaxRate?: number;   // Delivery service tax
  taxOnTax?: boolean;         // Some jurisdictions tax the total including other taxes
}
```

#### 2.2.3 Discount Types

```typescript
interface Discount {
  discountId: string;
  name: string;
  type: DiscountType;
  value: number;
  applicableItems?: string[];  // If item-specific
  requiresManagerApproval: boolean;
  reason?: string;
}

enum DiscountType {
  PERCENTAGE = 'percentage',     // % off
  FIXED_AMOUNT = 'fixed_amount', // $ off
  HAPPY_HOUR = 'happy_hour',     // Time-based discount
  LOYALTY = 'loyalty',           // Customer loyalty program
  EMPLOYEE = 'employee',         // Staff discount
  COMP = 'comp',                 // Complimentary (100% off)
  PROMOTIONAL = 'promotional'    // Marketing campaign
}
```

### 2.3 Table Management

#### 2.3.1 Table Configuration

```typescript
interface Table {
  tableId: string;
  tableNumber: number;
  section: string;           // Floor area
  capacity: number;          // Max seats
  currentPartySize?: number;
  status: TableStatus;
  serverId?: string;
  serverName?: string;
  seatedAt?: Date;
  estimatedDuration: number; // Minutes
  shape: TableShape;
  combinable: boolean;       // Can join with other tables
  position: Coordinates;
}

enum TableStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
  DIRTY = 'dirty',           // Needs bussing
  CLEANING = 'cleaning',
  MAINTENANCE = 'maintenance'
}
```

#### 2.3.2 Table Turnover Calculation

```
Turnover Rate = Number of Parties Served / (Number of Tables × Operating Hours)

Example:
- 25 tables
- 85 parties served
- 8 hours open
- Turnover = 85 / (25 × 8) = 0.425 parties per table per hour
- Or 141 minutes average per party (60 / 0.425)
```

#### 2.3.3 Section Management

```typescript
interface Section {
  sectionId: string;
  name: string;
  tables: string[];          // Table IDs in section
  serverId?: string;
  capacity: number;          // Total seats
  status: SectionStatus;
  openTime?: Date;
  closeTime?: Date;
}
```

### 2.4 Order Routing

#### 2.4.1 Kitchen Station Routing

Orders are automatically routed to appropriate kitchen stations:

```typescript
interface KitchenStation {
  stationId: string;
  name: string;
  type: StationType;
  capacity: number;          // Concurrent orders
  currentLoad: number;
  averageTicketTime: number; // Minutes
  staff: string[];
  equipment: string[];
}

enum StationType {
  GRILL = 'grill',
  SAUTE = 'saute',
  FRY = 'fry',
  COLD_PREP = 'cold_prep',
  SALAD = 'salad',
  DESSERT = 'dessert',
  BAR = 'bar',
  EXPO = 'expo'              // Expeditor/final assembly
}
```

#### 2.4.2 Routing Algorithm

```typescript
function routeOrderItems(order: Order): Map<string, OrderItem[]> {
  const routingMap = new Map<string, OrderItem[]>();

  for (const item of order.items) {
    const station = determineStation(item);

    if (!routingMap.has(station)) {
      routingMap.set(station, []);
    }

    routingMap.get(station)!.push(item);
  }

  // Adjust for station capacity and timing
  return optimizeRouting(routingMap, order.courseTiming);
}
```

---

## 3. Reservation Management

### 3.1 Reservation System

#### 3.1.1 Reservation Structure

```typescript
interface Reservation {
  reservationId: string;
  confirmationCode: string;
  customerId?: string;
  customerName: string;
  partySize: number;
  dateTime: Date;
  duration: number;          // Expected duration in minutes
  status: ReservationStatus;
  tablePreference?: string;
  seatingArea?: string;      // Indoor, outdoor, bar, etc.
  occasion?: string;         // Birthday, anniversary, etc.
  specialRequests?: string;
  dietaryRestrictions?: string[];
  contactPhone: string;
  contactEmail: string;
  createdAt: Date;
  createdBy: string;         // Staff member or 'online'
  deposit?: number;
  noShowHistory?: number;    // Track reliability
  vipStatus?: boolean;
}

enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SEATED = 'seated',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  WAITLIST = 'waitlist'
}
```

#### 3.1.2 Availability Calculation

```typescript
interface AvailabilityCheck {
  date: Date;
  time: Date;
  partySize: number;
  duration?: number;         // Default: 90 minutes for dinner
}

function checkAvailability(check: AvailabilityCheck): AvailabilityResult {
  const { date, time, partySize, duration = 90 } = check;

  // Get all tables that can accommodate party size
  const suitableTables = findSuitableTables(partySize);

  // Check each table's schedule
  const availableTables = suitableTables.filter(table => {
    const startTime = time;
    const endTime = new Date(time.getTime() + duration * 60000);

    // Check for conflicts with existing reservations
    return !hasConflict(table, startTime, endTime);
  });

  return {
    available: availableTables.length > 0,
    suggestedTimes: availableTables.length === 0
      ? findAlternativeTimes(check)
      : [],
    availableTables
  };
}
```

#### 3.1.3 Table Allocation Strategy

```typescript
interface AllocationStrategy {
  strategy: 'first_available' | 'optimize_turnover' | 'section_balance';
  preferences: {
    preferredSection?: string;
    preferredTable?: number;
    windowSeating?: boolean;
    quietArea?: boolean;
    accessibility?: boolean;
  };
}

function allocateTable(
  reservation: Reservation,
  strategy: AllocationStrategy
): Table {
  // Algorithm considers:
  // 1. Party size vs table capacity (avoid oversizing)
  // 2. Server workload balancing
  // 3. Customer preferences
  // 4. Section rotation
  // 5. VIP status

  const candidateTables = findCandidateTables(reservation, strategy);
  return selectOptimalTable(candidateTables, strategy);
}
```

### 3.2 Waitlist Management

#### 3.2.1 Waitlist Entry

```typescript
interface WaitlistEntry {
  entryId: string;
  customerName: string;
  partySize: number;
  contactPhone: string;
  addedAt: Date;
  quotedWait: number;        // Minutes quoted to customer
  actualWait?: number;       // Actual time waited
  status: WaitlistStatus;
  priority: number;          // Higher = more priority
  notified: boolean;
  notifiedAt?: Date;
  specialRequests?: string;
}

enum WaitlistStatus {
  WAITING = 'waiting',
  NOTIFIED = 'notified',
  SEATED = 'seated',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}
```

#### 3.2.2 Wait Time Estimation

```typescript
function estimateWaitTime(partySize: number): number {
  // Get current table turnover rate
  const currentTurnoverRate = calculateCurrentTurnover();

  // Get parties ahead in queue
  const partiesAhead = getWaitlistCount(partySize);

  // Average table time for this party size
  const avgTableTime = getAverageTableTime(partySize);

  // Calculate estimate
  const estimatedWait = Math.ceil(
    (partiesAhead + 1) * avgTableTime / currentTurnoverRate
  );

  // Add buffer (10-15%)
  return Math.ceil(estimatedWait * 1.15);
}
```

### 3.3 Customer Preferences

#### 3.3.1 Preference Tracking

```typescript
interface CustomerPreferences {
  customerId: string;
  favoriteTable?: number;
  preferredServer?: string;
  seatingPreferences: string[];  // ['window', 'quiet', 'booth']
  dietaryRestrictions: string[];
  allergens: string[];
  favoriteItems: string[];
  dislikedItems: string[];
  specialOccasions: SpecialOccasion[];
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
}

interface SpecialOccasion {
  type: 'birthday' | 'anniversary' | 'other';
  date: Date;
  recurring: boolean;
}
```

---

## 4. Kitchen Display Systems

### 4.1 KDS Architecture

#### 4.1.1 Display Configuration

```typescript
interface KDSDisplay {
  displayId: string;
  station: KitchenStation;
  screenSize: 'small' | 'medium' | 'large';
  columns: number;           // Number of ticket columns
  maxTickets: number;        // Visible tickets per column
  sortOrder: TicketSortOrder;
  colorCoding: ColorCodingScheme;
  soundAlerts: boolean;
  language: string;
}

enum TicketSortOrder {
  FIFO = 'fifo',                    // First In First Out
  PRIORITY = 'priority',             // VIP/urgent first
  COURSE_TIMING = 'course_timing',   // Coordinate courses
  TABLE_NUMBER = 'table_number'      // Group by table
}
```

#### 4.1.2 Ticket Display

```typescript
interface KitchenTicket {
  ticketId: string;
  orderNumber: number;
  tableNumber?: number;
  serverName: string;
  items: KitchenItem[];
  priority: Priority;
  status: TicketStatus;
  firedAt: Date;
  dueTime?: Date;           // For coordinated courses
  elapsedTime: number;      // Seconds since fired
  specialInstructions?: string;
}

interface KitchenItem {
  name: string;
  quantity: number;
  modifiers: string[];
  seat?: number;
  status: ItemStatus;
  startedAt?: Date;
  completedAt?: Date;
}

enum Priority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
  VIP = 'vip'
}
```

#### 4.1.3 Color Coding System

```typescript
interface ColorCodingScheme {
  // Time-based color changes
  under5min: string;      // Green - good
  under10min: string;     // Yellow - watch
  under15min: string;     // Orange - getting slow
  over15min: string;      // Red - too long

  // Priority colors
  vip: string;           // Purple - VIP
  urgent: string;        // Red flash - urgent

  // Status colors
  inProgress: string;
  ready: string;
  recalled: string;      // Item sent back
}
```

### 4.2 Ticket Timing

#### 4.2.1 Average Ticket Time Calculation

```typescript
function calculateAverageTicketTime(
  station: string,
  period: 'last_hour' | 'today' | 'last_week'
): number {
  const tickets = getCompletedTickets(station, period);

  const totalTime = tickets.reduce((sum, ticket) => {
    const duration = ticket.completedAt.getTime() - ticket.firedAt.getTime();
    return sum + duration;
  }, 0);

  return totalTime / tickets.length / 60000; // Convert to minutes
}
```

#### 4.2.2 Course Timing Coordination

```typescript
interface CourseTiming {
  courseNumber: number;
  items: string[];
  fireTime: Date;           // When to fire course
  targetReadyTime: Date;    // When course should be ready
  previousCourse?: number;
  minimumGap: number;       // Minutes between courses
}

function coordinateCourses(
  order: Order,
  courses: CourseTiming[]
): FireSchedule {
  const schedule: FireSchedule = {};

  // Work backwards from desired service time
  for (let i = courses.length - 1; i >= 0; i--) {
    const course = courses[i];
    const prepTime = calculateCoursePrepTime(course.items);

    if (i === courses.length - 1) {
      // Last course - use target time
      schedule[course.courseNumber] = {
        fireAt: new Date(course.targetReadyTime.getTime() - prepTime * 60000)
      };
    } else {
      // Earlier courses - coordinate with next course
      const nextCourse = courses[i + 1];
      const fireTime = new Date(
        schedule[nextCourse.courseNumber].fireAt.getTime()
        - course.minimumGap * 60000
        - prepTime * 60000
      );
      schedule[course.courseNumber] = { fireAt: fireTime };
    }
  }

  return schedule;
}
```

### 4.3 Bump/Recall System

#### 4.3.1 Bumping Orders

```typescript
function bumpItem(ticketId: string, itemId: string): void {
  // Mark item as complete
  updateItemStatus(itemId, ItemStatus.COMPLETED);

  // Check if all items in ticket are complete
  const ticket = getTicket(ticketId);
  const allComplete = ticket.items.every(
    item => item.status === ItemStatus.COMPLETED
  );

  if (allComplete) {
    // Remove from display
    removeTicket(ticketId);

    // Notify expo/server
    notifyTicketReady(ticketId);

    // Record completion time
    recordTicketMetrics(ticket);
  }
}
```

#### 4.3.2 Recalling Items

```typescript
interface RecallReason {
  reason: 'wrong_item' | 'quality_issue' | 'customer_change' | 'dropped' | 'other';
  description?: string;
  remakePriority: Priority;
}

function recallItem(
  ticketId: string,
  itemId: string,
  reason: RecallReason
): void {
  // Create new ticket with higher priority
  const originalTicket = getTicket(ticketId);
  const item = originalTicket.items.find(i => i.itemId === itemId);

  const recallTicket = createTicket({
    ...originalTicket,
    ticketId: generateId(),
    items: [item],
    priority: reason.remakePriority,
    isRecall: true,
    recallReason: reason
  });

  // Track quality metrics
  recordRecall(originalTicket, item, reason);
}
```

---

## 5. Staff Scheduling

### 5.1 Schedule Optimization

#### 5.1.1 Labor Cost Calculation

```typescript
interface LaborCost {
  date: Date;
  projectedRevenue: number;
  targetLaborPercent: number;  // 25-35% typical
  shifts: StaffShift[];
  totalLaborCost: number;
  actualLaborPercent: number;
  variance: number;
}

function calculateLaborCost(schedule: StaffShift[]): LaborCost {
  const totalHours = schedule.reduce((sum, shift) => {
    const hours = (shift.endTime - shift.startTime) / 3600000;
    return sum + hours;
  }, 0);

  const totalCost = schedule.reduce((sum, shift) => {
    const hours = (shift.endTime - shift.startTime) / 3600000;
    return sum + (hours * shift.hourlyRate);
  }, 0);

  return {
    totalHours,
    totalCost,
    averageHourlyRate: totalCost / totalHours
  };
}
```

#### 5.1.2 Coverage Requirements

```typescript
interface CoverageRequirement {
  dayOfWeek: number;        // 0-6 (Sunday-Saturday)
  timeSlot: TimeSlot;
  role: StaffRole;
  minimumStaff: number;
  optimalStaff: number;
  skillLevel: SkillLevel;
}

interface TimeSlot {
  start: string;            // HH:MM format
  end: string;
  expectedCovers: number;   // Expected customer count
  coverageMultiplier: number; // Servers per X covers
}

enum StaffRole {
  SERVER = 'server',
  BARTENDER = 'bartender',
  HOST = 'host',
  COOK = 'cook',
  PREP_COOK = 'prep_cook',
  DISHWASHER = 'dishwasher',
  BUSSER = 'busser',
  MANAGER = 'manager',
  SOMMELIER = 'sommelier'
}

enum SkillLevel {
  TRAINEE = 'trainee',
  JUNIOR = 'junior',
  EXPERIENCED = 'experienced',
  SENIOR = 'senior',
  LEAD = 'lead'
}
```

#### 5.1.3 Optimization Algorithm

```typescript
function optimizeSchedule(requirements: ScheduleRequirements): Schedule {
  const {
    date,
    expectedCovers,
    laborCostTarget,
    availableStaff,
    constraints
  } = requirements;

  // Calculate required staff hours
  const requiredHours = calculateRequiredHours(expectedCovers);

  // Generate candidate schedules
  const candidates = generateScheduleCandidates(
    availableStaff,
    requiredHours,
    constraints
  );

  // Score each candidate
  const scored = candidates.map(schedule => ({
    schedule,
    score: scoreSchedule(schedule, {
      laborCostTarget,
      coverageRequirements: requiredHours,
      staffPreferences: availableStaff.map(s => s.preferences)
    })
  }));

  // Return best schedule
  return scored.sort((a, b) => b.score - a.score)[0].schedule;
}

function scoreSchedule(schedule: Schedule, criteria: ScoringCriteria): number {
  let score = 0;

  // Labor cost adherence (40% weight)
  const laborCostScore =
    1 - Math.abs(schedule.laborPercent - criteria.laborCostTarget) / 100;
  score += laborCostScore * 0.4;

  // Coverage adequacy (40% weight)
  const coverageScore = evaluateCoverage(schedule, criteria.coverageRequirements);
  score += coverageScore * 0.4;

  // Staff preferences (20% weight)
  const preferenceScore = evaluatePreferences(schedule, criteria.staffPreferences);
  score += preferenceScore * 0.2;

  return score;
}
```

### 5.2 Time and Attendance

#### 5.2.1 Clock In/Out System

```typescript
interface TimeRecord {
  employeeId: string;
  date: Date;
  clockIn: Date;
  clockOut?: Date;
  scheduledStart: Date;
  scheduledEnd: Date;
  breakStart?: Date[];
  breakEnd?: Date[];
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  status: AttendanceStatus;
}

enum AttendanceStatus {
  ON_TIME = 'on_time',
  LATE = 'late',
  EARLY_DEPARTURE = 'early_departure',
  NO_SHOW = 'no_show',
  ABSENT = 'absent',
  EXCUSED = 'excused'
}
```

#### 5.2.2 Break Compliance

```typescript
interface BreakPolicy {
  jurisdiction: string;
  shiftLengthHours: number;
  requiredBreaks: BreakRequirement[];
}

interface BreakRequirement {
  type: 'meal' | 'rest';
  durationMinutes: number;
  paid: boolean;
  requiredByHour: number;  // Must be taken by hour X of shift
}

function validateBreakCompliance(
  timeRecord: TimeRecord,
  policy: BreakPolicy
): ComplianceResult {
  // Check each required break
  for (const requirement of policy.requiredBreaks) {
    const breakTaken = findBreak(timeRecord, requirement);

    if (!breakTaken) {
      return {
        compliant: false,
        violation: `Missing ${requirement.type} break`,
        penalty: calculatePenalty(requirement)
      };
    }

    if (breakTaken.duration < requirement.durationMinutes) {
      return {
        compliant: false,
        violation: `${requirement.type} break too short`,
        penalty: calculatePenalty(requirement)
      };
    }
  }

  return { compliant: true };
}
```

### 5.3 Shift Trading

#### 5.3.1 Shift Trade Request

```typescript
interface ShiftTradeRequest {
  requestId: string;
  fromEmployee: string;
  toEmployee?: string;      // Specific person or null for open trade
  shift: StaffShift;
  reason?: string;
  status: TradeStatus;
  createdAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
}

enum TradeStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied',
  CANCELLED = 'cancelled'
}

function validateShiftTrade(
  request: ShiftTradeRequest,
  toEmployee: Employee
): ValidationResult {
  // Check if recipient is qualified
  if (!hasRequiredSkills(toEmployee, request.shift.role)) {
    return { valid: false, reason: 'Insufficient qualifications' };
  }

  // Check for scheduling conflicts
  if (hasConflict(toEmployee, request.shift)) {
    return { valid: false, reason: 'Scheduling conflict' };
  }

  // Check overtime limits
  if (wouldExceedOvertimeLimit(toEmployee, request.shift)) {
    return { valid: false, reason: 'Would exceed overtime limit' };
  }

  return { valid: true };
}
```

---

## 6. Inventory Management

### 6.1 Inventory Tracking

#### 6.1.1 Item Structure

```typescript
interface InventoryItem {
  itemId: string;
  name: string;
  category: InventoryCategory;
  unit: Unit;
  currentQuantity: number;
  parLevel: number;         // Minimum quantity to maintain
  maxLevel: number;         // Maximum storage capacity
  reorderPoint: number;     // Trigger for reordering
  reorderQuantity: number;  // Amount to order
  unitCost: number;
  supplier: string;
  supplierId: string;
  shelfLife?: number;       // Days until expiration
  storageLocation: string;
  trackByLot: boolean;
  trackBySerial: boolean;
}

enum InventoryCategory {
  PRODUCE = 'produce',
  MEAT = 'meat',
  SEAFOOD = 'seafood',
  DAIRY = 'dairy',
  DRY_GOODS = 'dry_goods',
  BEVERAGES = 'beverages',
  ALCOHOL = 'alcohol',
  SUPPLIES = 'supplies',
  CLEANING = 'cleaning'
}

enum Unit {
  EACH = 'each',
  POUND = 'lb',
  KILOGRAM = 'kg',
  OUNCE = 'oz',
  GRAM = 'g',
  LITER = 'l',
  GALLON = 'gal',
  CASE = 'case',
  BOX = 'box'
}
```

#### 6.1.2 Stock Movements

```typescript
interface StockMovement {
  movementId: string;
  itemId: string;
  type: MovementType;
  quantity: number;
  unit: Unit;
  timestamp: Date;
  userId: string;
  reference?: string;       // Order ID, invoice ID, etc.
  cost?: number;
  notes?: string;
}

enum MovementType {
  RECEIVED = 'received',    // Delivery received
  USED = 'used',           // Used in production
  WASTED = 'wasted',       // Spoilage, dropped, etc.
  SOLD = 'sold',           // Retail sale
  TRANSFERRED = 'transferred', // Between locations
  ADJUSTMENT = 'adjustment' // Inventory count correction
}
```

#### 6.1.3 Automatic Depletion

```typescript
function depleteInventory(order: Order): void {
  for (const item of order.items) {
    const recipe = getRecipe(item.menuItemId);

    for (const ingredient of recipe.ingredients) {
      const movement: StockMovement = {
        movementId: generateId(),
        itemId: ingredient.itemId,
        type: MovementType.USED,
        quantity: ingredient.quantity * item.quantity,
        unit: ingredient.unit,
        timestamp: new Date(),
        userId: order.serverId,
        reference: order.orderId
      };

      recordMovement(movement);
      updateQuantity(ingredient.itemId, -movement.quantity);

      // Check if reorder needed
      checkReorderPoint(ingredient.itemId);
    }
  }
}
```

### 6.2 Recipe Management

#### 6.2.1 Recipe Structure

```typescript
interface Recipe {
  recipeId: string;
  menuItemId: string;
  name: string;
  yield: number;            // Number of servings
  ingredients: Ingredient[];
  cost: number;             // Total ingredient cost
  instructions?: string[];
  prepTime: number;         // Minutes
  cookTime: number;
  allergens: string[];
  version: number;
}

interface Ingredient {
  itemId: string;
  name: string;
  quantity: number;
  unit: Unit;
  cost: number;
  optional: boolean;
  substituteFor?: string;   // Original ingredient if this is a substitute
}
```

#### 6.2.2 Cost Calculation

```typescript
function calculateRecipeCost(recipe: Recipe): number {
  return recipe.ingredients.reduce((total, ingredient) => {
    const unitCost = getInventoryItem(ingredient.itemId).unitCost;
    const ingredientCost = ingredient.quantity * unitCost;
    return total + ingredientCost;
  }, 0);
}

function calculateMenuItemProfitability(menuItem: MenuItem): Profitability {
  const recipe = getRecipe(menuItem.recipeId);
  const cost = calculateRecipeCost(recipe);
  const price = menuItem.price;

  return {
    cost,
    price,
    profit: price - cost,
    marginPercent: ((price - cost) / price) * 100,
    markupPercent: ((price - cost) / cost) * 100
  };
}
```

### 6.3 Purchase Orders

#### 6.3.1 Purchase Order Structure

```typescript
interface PurchaseOrder {
  poId: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  status: POStatus;
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentTerms: string;
  deliveryAddress: string;
  orderedBy: string;
}

interface PurchaseOrderItem {
  itemId: string;
  name: string;
  quantity: number;
  unit: Unit;
  unitCost: number;
  totalCost: number;
  receivedQuantity?: number;
  acceptedQuantity?: number;
}

enum POStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  CONFIRMED = 'confirmed',
  PARTIALLY_RECEIVED = 'partially_received',
  RECEIVED = 'received',
  INVOICED = 'invoiced',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}
```

#### 6.3.2 Auto-Reorder System

```typescript
function checkReorderPoints(): PurchaseOrder[] {
  const itemsToReorder = getInventoryItems().filter(item =>
    item.currentQuantity <= item.reorderPoint
  );

  // Group by supplier
  const bySupplier = groupBy(itemsToReorder, 'supplierId');

  const purchaseOrders: PurchaseOrder[] = [];

  for (const [supplierId, items] of Object.entries(bySupplier)) {
    const po = createPurchaseOrder({
      supplierId,
      items: items.map(item => ({
        itemId: item.itemId,
        quantity: item.reorderQuantity,
        unitCost: item.unitCost
      }))
    });

    purchaseOrders.push(po);
  }

  return purchaseOrders;
}
```

---

## 7. Customer Analytics

### 7.1 Customer Profiles

#### 7.1.1 Customer Data Structure

```typescript
interface Customer {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  joinDate: Date;
  totalVisits: number;
  totalSpent: number;
  averageCheckSize: number;
  lastVisit: Date;
  favoriteItems: string[];
  dietaryRestrictions: string[];
  allergens: string[];
  vipStatus: boolean;
  loyaltyPoints: number;
  segment: CustomerSegment;
  communicationPreferences: CommunicationPreferences;
}

enum CustomerSegment {
  NEW = 'new',              // 0-2 visits
  OCCASIONAL = 'occasional', // 3-6 visits
  REGULAR = 'regular',      // 7-15 visits
  LOYAL = 'loyal',          // 16+ visits
  VIP = 'vip',              // High value
  AT_RISK = 'at_risk',      // Haven't visited recently
  LOST = 'lost'             // Haven't visited in 6+ months
}
```

#### 7.1.2 Customer Lifetime Value (CLV)

```typescript
function calculateCustomerLifetimeValue(customer: Customer): CLV {
  // Historical CLV (actual)
  const historicalCLV = customer.totalSpent;

  // Predicted CLV
  const avgVisitValue = customer.averageCheckSize;
  const visitFrequency = calculateVisitFrequency(customer);
  const estimatedLifetime = estimateCustomerLifetime(customer);

  const predictedCLV = avgVisitValue * visitFrequency * estimatedLifetime;

  // Retention probability
  const retentionProbability = calculateRetentionProbability(customer);

  // Adjusted CLV
  const adjustedCLV = predictedCLV * retentionProbability;

  return {
    historical: historicalCLV,
    predicted: predictedCLV,
    adjusted: adjustedCLV,
    retentionProbability
  };
}

function calculateVisitFrequency(customer: Customer): number {
  const daysSinceJoin =
    (Date.now() - customer.joinDate.getTime()) / (1000 * 60 * 60 * 24);
  return customer.totalVisits / (daysSinceJoin / 30); // Visits per month
}
```

### 7.2 Dining Pattern Analysis

#### 7.2.1 Visit Patterns

```typescript
interface DiningPattern {
  customerId: string;
  preferredDays: DayOfWeek[];
  preferredTimes: TimeOfDay[];
  averagePartySize: number;
  averageDuration: number;
  peakSeasonMonths: number[];
  orderPatterns: OrderPattern[];
}

enum TimeOfDay {
  BREAKFAST = 'breakfast',   // 6-11am
  LUNCH = 'lunch',          // 11am-3pm
  AFTERNOON = 'afternoon',   // 3-5pm
  DINNER = 'dinner',        // 5-10pm
  LATE_NIGHT = 'late_night' // 10pm+
}

interface OrderPattern {
  category: string;
  frequency: number;        // % of visits
  avgSpend: number;
  trending: 'up' | 'down' | 'stable';
}
```

#### 7.2.2 Churn Prediction

```typescript
function predictChurn(customer: Customer): ChurnPrediction {
  const features = extractChurnFeatures(customer);

  // Simple rule-based model (can be replaced with ML model)
  let churnScore = 0;

  // Recency factor
  const daysSinceLastVisit =
    (Date.now() - customer.lastVisit.getTime()) / (1000 * 60 * 60 * 24);
  const expectedDays = 30 / calculateVisitFrequency(customer);

  if (daysSinceLastVisit > expectedDays * 2) {
    churnScore += 0.3;
  }

  // Frequency decline
  const recentFrequency = calculateVisitFrequency(customer, 90); // Last 90 days
  const overallFrequency = calculateVisitFrequency(customer);

  if (recentFrequency < overallFrequency * 0.7) {
    churnScore += 0.3;
  }

  // Spend decline
  const recentAvgSpend = calculateAverageSpend(customer, 90);
  if (recentAvgSpend < customer.averageCheckSize * 0.8) {
    churnScore += 0.2;
  }

  // Negative feedback
  if (hasRecentNegativeFeedback(customer)) {
    churnScore += 0.2;
  }

  return {
    churnScore: Math.min(churnScore, 1),
    risk: churnScore > 0.6 ? 'high' : churnScore > 0.3 ? 'medium' : 'low',
    recommendedActions: generateRetentionActions(churnScore)
  };
}
```

### 7.3 Loyalty Programs

#### 7.3.1 Points System

```typescript
interface LoyaltyProgram {
  programId: string;
  name: string;
  pointsPerDollar: number;
  pointsExpireDays?: number;
  tiers: LoyaltyTier[];
  rewards: Reward[];
}

interface LoyaltyTier {
  tierName: string;
  requiredPoints: number;
  benefits: string[];
  pointsMultiplier: number;  // 1.0 = standard, 1.5 = 50% bonus
  discountPercent: number;
}

interface Reward {
  rewardId: string;
  name: string;
  description: string;
  pointsCost: number;
  type: RewardType;
  value: number;
  expiryDays: number;
}

enum RewardType {
  DISCOUNT_PERCENT = 'discount_percent',
  DISCOUNT_FIXED = 'discount_fixed',
  FREE_ITEM = 'free_item',
  UPGRADE = 'upgrade',
  EXPERIENCE = 'experience'  // Chef's table, wine tasting, etc.
}
```

---

## 8. Menu Engineering

### 8.1 Menu Item Analysis

#### 8.1.1 Menu Mix Analysis

```typescript
interface MenuMixAnalysis {
  itemId: string;
  name: string;
  category: string;
  salesCount: number;
  salesPercent: number;     // % of category sales
  revenue: number;
  revenuePercent: number;   // % of category revenue
  cost: number;
  profit: number;
  profitMargin: number;
  classification: MenuItemClass;
}

enum MenuItemClass {
  STAR = 'star',           // High profit, high popularity
  PLOW_HORSE = 'plow_horse', // Low profit, high popularity
  PUZZLE = 'puzzle',       // High profit, low popularity
  DOG = 'dog'              // Low profit, low popularity
}

function classifyMenuItem(
  item: MenuMixAnalysis,
  avgProfitMargin: number,
  avgSalesPercent: number
): MenuItemClass {
  const highProfit = item.profitMargin > avgProfitMargin;
  const highPopularity = item.salesPercent > avgSalesPercent;

  if (highProfit && highPopularity) return MenuItemClass.STAR;
  if (!highProfit && highPopularity) return MenuItemClass.PLOW_HORSE;
  if (highProfit && !highPopularity) return MenuItemClass.PUZZLE;
  return MenuItemClass.DOG;
}
```

#### 8.1.2 Pricing Strategies

```typescript
interface PricingStrategy {
  method: PricingMethod;
  targetMargin?: number;
  competitorPrices?: number[];
  valuePerception?: number; // 1-10 scale
}

enum PricingMethod {
  COST_PLUS = 'cost_plus',         // Cost × markup
  TARGET_MARGIN = 'target_margin',  // Price for desired margin %
  COMPETITIVE = 'competitive',      // Based on competitor pricing
  VALUE_BASED = 'value_based',     // Based on perceived value
  PSYCHOLOGICAL = 'psychological'   // $9.99 instead of $10
}

function calculateOptimalPrice(
  item: MenuItem,
  strategy: PricingStrategy
): number {
  switch (strategy.method) {
    case PricingMethod.COST_PLUS:
      const markup = 3.0; // Typical restaurant markup
      return item.cost * markup;

    case PricingMethod.TARGET_MARGIN:
      // Price = Cost / (1 - Target Margin %)
      return item.cost / (1 - strategy.targetMargin!);

    case PricingMethod.COMPETITIVE:
      const avgCompetitorPrice =
        strategy.competitorPrices!.reduce((a, b) => a + b) /
        strategy.competitorPrices!.length;
      return avgCompetitorPrice;

    case PricingMethod.PSYCHOLOGICAL:
      const basePrice = calculateOptimalPrice(item, {
        method: PricingMethod.COST_PLUS
      });
      // Round to .99
      return Math.ceil(basePrice) - 0.01;

    default:
      return item.cost * 3.0;
  }
}
```

### 8.2 Menu Performance Metrics

#### 8.2.1 ABC Analysis

```typescript
interface ABCAnalysis {
  items: {
    itemId: string;
    name: string;
    revenue: number;
    cumulativeRevenue: number;
    cumulativePercent: number;
    class: 'A' | 'B' | 'C';
  }[];
  classBreakdown: {
    A: { count: number; revenue: number; percent: number };
    B: { count: number; revenue: number; percent: number };
    C: { count: number; revenue: number; percent: number };
  };
}

function performABCAnalysis(items: MenuItem[]): ABCAnalysis {
  // Sort by revenue descending
  const sorted = items
    .sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = sorted.reduce((sum, item) => sum + item.revenue, 0);

  let cumulativeRevenue = 0;
  const analyzed = sorted.map(item => {
    cumulativeRevenue += item.revenue;
    const cumulativePercent = (cumulativeRevenue / totalRevenue) * 100;

    // A items: top 80% of revenue
    // B items: next 15% of revenue
    // C items: last 5% of revenue
    const itemClass =
      cumulativePercent <= 80 ? 'A' :
      cumulativePercent <= 95 ? 'B' : 'C';

    return {
      itemId: item.id,
      name: item.name,
      revenue: item.revenue,
      cumulativeRevenue,
      cumulativePercent,
      class: itemClass
    };
  });

  return { items: analyzed, classBreakdown: summarizeClasses(analyzed) };
}
```

---

## 9. Payment Processing

### 9.1 Payment Methods

#### 9.1.1 Supported Payment Types

```typescript
enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  GIFT_CARD = 'gift_card',
  MOBILE_PAYMENT = 'mobile_payment',  // Apple Pay, Google Pay
  CRYPTOCURRENCY = 'cryptocurrency',
  ACCOUNT_CHARGE = 'account_charge',  // Hotel room charge, etc.
  COMP = 'comp'                       // Complimentary
}

interface Payment {
  paymentId: string;
  orderId: string;
  method: PaymentMethod;
  amount: number;
  tipAmount: number;
  totalAmount: number;
  status: PaymentStatus;
  processedAt: Date;
  processorReference?: string;
  last4?: string;             // Last 4 digits of card
  cardBrand?: string;         // Visa, Mastercard, etc.
  authCode?: string;
}

enum PaymentStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  CAPTURED = 'captured',
  REFUNDED = 'refunded',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}
```

#### 9.1.2 Split Payments

```typescript
interface SplitPayment {
  orderId: string;
  totalAmount: number;
  splits: PaymentSplit[];
  status: SplitPaymentStatus;
}

interface PaymentSplit {
  splitId: string;
  customerId?: string;
  amount: number;
  tipAmount: number;
  method: PaymentMethod;
  items?: string[];          // Specific items paid by this person
  status: PaymentStatus;
}

enum SplitPaymentStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETE = 'complete',
  PARTIAL = 'partial'
}

function processSplitPayment(
  order: Order,
  splitType: 'even' | 'by_item' | 'custom'
): SplitPayment {
  switch (splitType) {
    case 'even':
      return splitEvenly(order);
    case 'by_item':
      return splitByItem(order);
    case 'custom':
      return createCustomSplit(order);
  }
}
```

### 9.2 Tip Management

#### 9.2.1 Tip Calculation

```typescript
interface TipCalculation {
  subtotal: number;
  suggestedTips: {
    percent15: number;
    percent18: number;
    percent20: number;
    percent25: number;
  };
  customTip?: number;
}

function calculateSuggestedTips(subtotal: number): TipCalculation {
  return {
    subtotal,
    suggestedTips: {
      percent15: Math.round(subtotal * 0.15 * 100) / 100,
      percent18: Math.round(subtotal * 0.18 * 100) / 100,
      percent20: Math.round(subtotal * 0.20 * 100) / 100,
      percent25: Math.round(subtotal * 0.25 * 100) / 100
    }
  };
}
```

#### 9.2.2 Tip Distribution

```typescript
interface TipPool {
  date: Date;
  totalTips: number;
  distribution: TipDistribution[];
  method: TipPoolMethod;
}

interface TipDistribution {
  employeeId: string;
  role: StaffRole;
  hoursWorked: number;
  points: number;           // For point-based systems
  amount: number;
  percent: number;
}

enum TipPoolMethod {
  HOURS_WORKED = 'hours_worked',      // Proportional to hours
  POINTS = 'points',                  // Point system by role
  EQUAL = 'equal',                    // Equal split
  ROLE_BASED = 'role_based'          // Different % by role
}

function distributeTips(
  pool: TipPool,
  employees: Employee[],
  method: TipPoolMethod
): TipDistribution[] {
  switch (method) {
    case TipPoolMethod.HOURS_WORKED:
      return distributeByHours(pool, employees);
    case TipPoolMethod.POINTS:
      return distributeByPoints(pool, employees);
    case TipPoolMethod.EQUAL:
      return distributeEqually(pool, employees);
    case TipPoolMethod.ROLE_BASED:
      return distributeByRole(pool, employees);
  }
}
```

---

## 10. Multi-Location Management

### 10.1 Chain Restaurant Operations

#### 10.1.1 Location Hierarchy

```typescript
interface RestaurantChain {
  chainId: string;
  name: string;
  headquarters: Address;
  locations: Location[];
  standardMenus: Menu[];
  corporatePolicies: Policy[];
}

interface Location {
  locationId: string;
  name: string;
  address: Address;
  phone: string;
  timezone: string;
  managerId: string;
  operatingHours: OperatingHours[];
  seatingCapacity: number;
  status: LocationStatus;
  openDate: Date;
  format: RestaurantFormat;
}

enum RestaurantFormat {
  FULL_SERVICE = 'full_service',
  QUICK_SERVICE = 'quick_service',
  FAST_CASUAL = 'fast_casual',
  FOOD_TRUCK = 'food_truck',
  KIOSK = 'kiosk',
  GHOST_KITCHEN = 'ghost_kitchen'
}
```

#### 10.1.2 Centralized Reporting

```typescript
interface ConsolidatedReport {
  chainId: string;
  period: DateRange;
  locations: LocationReport[];
  totals: AggregateMetrics;
  comparisons: LocationComparison[];
}

interface LocationReport {
  locationId: string;
  name: string;
  revenue: number;
  covers: number;
  averageCheck: number;
  laborCost: number;
  laborPercent: number;
  foodCost: number;
  foodCostPercent: number;
  profitMargin: number;
}

interface LocationComparison {
  metric: string;
  best: { locationId: string; value: number };
  worst: { locationId: string; value: number };
  average: number;
  standardDeviation: number;
}
```

### 10.2 Menu Standardization

#### 10.2.1 Standard Menu vs Local Variations

```typescript
interface StandardMenu {
  menuId: string;
  name: string;
  version: number;
  effectiveDate: Date;
  items: StandardMenuItem[];
  requiredItems: string[];   // Must be on all location menus
  optionalItems: string[];   // Can be added locally
}

interface LocalMenuVariation {
  locationId: string;
  baseMenuId: string;
  additions: MenuItem[];     // Local specials
  removals: string[];        // Standard items not offered
  priceAdjustments: PriceAdjustment[];
}

interface PriceAdjustment {
  itemId: string;
  standardPrice: number;
  localPrice: number;
  reason: string;            // e.g., "higher cost of living"
}
```

---

## 11. Reporting & Analytics

### 11.1 Sales Reports

#### 11.1.1 Daily Sales Report

```typescript
interface DailySalesReport {
  date: Date;
  location: string;

  // Revenue
  totalRevenue: number;
  foodRevenue: number;
  beverageRevenue: number;
  alcoholRevenue: number;

  // Volume
  totalCovers: number;
  totalOrders: number;

  // Averages
  averageCheck: number;
  averageCoversPerTable: number;

  // By meal period
  breakfast: PeriodSales;
  lunch: PeriodSales;
  dinner: PeriodSales;

  // By order type
  dineIn: number;
  takeout: number;
  delivery: number;

  // Payment methods
  cash: number;
  creditCard: number;
  other: number;

  // Top items
  topSellingItems: TopItem[];

  // Discounts
  totalDiscounts: number;
  discountPercent: number;
}

interface PeriodSales {
  revenue: number;
  covers: number;
  orders: number;
  averageCheck: number;
}
```

#### 11.1.2 Performance Metrics

```typescript
interface PerformanceMetrics {
  // Efficiency
  tableTurnover: number;
  averageTicketTime: number;
  orderAccuracy: number;      // %

  // Financial
  revPASH: number;           // Revenue per available seat hour
  primeCost: number;         // Food + labor costs
  primeCostPercent: number;

  // Labor
  laborCost: number;
  laborPercent: number;
  salesPerLaborHour: number;

  // Food cost
  foodCost: number;
  foodCostPercent: number;
  wastePercent: number;

  // Customer satisfaction
  averageRating: number;
  reviewCount: number;
  netPromoterScore: number;
}
```

### 11.2 Key Performance Indicators (KPIs)

#### 11.2.1 Essential Restaurant KPIs

```typescript
interface RestaurantKPIs {
  // Revenue KPIs
  dailySales: number;
  monthlySales: number;
  salesGrowth: number;       // % vs prior period
  revPASH: number;

  // Cost KPIs
  primeCost: number;
  primeCostPercent: number;  // Target: <60%
  foodCostPercent: number;   // Target: 28-35%
  laborCostPercent: number;  // Target: 25-35%

  // Operational KPIs
  tableTurnover: number;
  averageTicketTime: number;
  orderAccuracy: number;
  wastePercent: number;

  // Customer KPIs
  customerRetention: number;  // %
  repeatCustomerRate: number; // %
  averageCheckSize: number;
  netPromoterScore: number;

  // Employee KPIs
  employeeTurnover: number;   // %
  averageTenure: number;      // Months
  trainingCompletionRate: number;
}
```

---

## 12. Data Formats

### 12.1 Standard Data Exchange

#### 12.1.1 JSON API Format

```json
{
  "order": {
    "orderId": "ord_abc123",
    "orderNumber": 42,
    "orderType": "dine_in",
    "tableNumber": 12,
    "server": {
      "id": "srv_001",
      "name": "Jane Smith"
    },
    "items": [
      {
        "itemId": "item_001",
        "name": "Grilled Salmon",
        "quantity": 1,
        "unitPrice": 24.99,
        "modifiers": [
          {"name": "no lemon", "price": 0},
          {"name": "extra vegetables", "price": 2.00}
        ],
        "subtotal": 26.99
      }
    ],
    "totals": {
      "subtotal": 26.99,
      "tax": 2.16,
      "tip": 4.86,
      "total": 34.01
    },
    "timestamp": "2025-12-27T19:30:00Z"
  }
}
```

### 12.2 CSV Export Format

#### 12.2.1 Sales Export

```csv
Date,Order ID,Order Type,Table,Server,Items,Subtotal,Tax,Tip,Total,Payment Method
2025-12-27,ord_001,dine_in,12,Jane Smith,2,45.50,3.64,8.19,57.33,credit_card
```

---

## 13. API Interface

### 13.1 REST API Endpoints

```
POST   /api/orders                    # Create order
GET    /api/orders/:id                # Get order details
PUT    /api/orders/:id                # Update order
DELETE /api/orders/:id                # Cancel order

POST   /api/reservations              # Create reservation
GET    /api/reservations/:id          # Get reservation
PUT    /api/reservations/:id          # Update reservation

GET    /api/menu                      # Get menu
GET    /api/inventory                 # Get inventory
POST   /api/inventory/adjust          # Adjust inventory

GET    /api/reports/sales             # Sales reports
GET    /api/reports/labor             # Labor reports
GET    /api/analytics/customer/:id    # Customer analytics
```

---

## 14. Security & Compliance

### 14.1 PCI DSS Compliance

- Never store full credit card numbers
- Tokenize payment data
- Encrypt sensitive data at rest and in transit
- Implement access controls
- Regular security audits

### 14.2 Data Privacy

- GDPR compliance for EU customers
- CCPA compliance for California customers
- Customer data access and deletion rights
- Consent management
- Data retention policies

---

## 15. Integration Standards

### 15.1 Third-Party Integrations

- Payment processors (Stripe, Square, Toast)
- Reservation platforms (OpenTable, Resy, Yelp Reservations)
- Delivery services (Uber Eats, DoorDash, Grubhub)
- Accounting (QuickBooks, Xero)
- Loyalty platforms
- Review aggregators

---

## 16. References

### 16.1 Industry Standards

- National Restaurant Association guidelines
- ServSafe food safety certification
- PCI DSS payment security standards
- OSHA workplace safety regulations

### 16.2 Related WIA Standards

- WIA-PAYMENT: Payment processing standard
- WIA-DATA: Data format specifications
- WIA-SECURITY: Security best practices

---

**弘益人間 (Benefit All Humanity)**

© 2025 SmileStory Inc. / WIA - MIT License
