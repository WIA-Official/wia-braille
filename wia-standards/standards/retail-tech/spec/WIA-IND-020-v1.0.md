# WIA-IND-020: Retail Tech Specification v1.0

> **Standard ID:** WIA-IND-020
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Industry Standards Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Point of Sale (POS) Systems](#2-point-of-sale-pos-systems)
3. [E-commerce Platform Integration](#3-e-commerce-platform-integration)
4. [Omnichannel Retail](#4-omnichannel-retail)
5. [Customer Relationship Management](#5-customer-relationship-management)
6. [Loyalty Programs](#6-loyalty-programs)
7. [Product Information Management](#7-product-information-management)
8. [Inventory Management](#8-inventory-management)
9. [Price Management](#9-price-management)
10. [Promotions and Discounts](#10-promotions-and-discounts)
11. [Payment Processing](#11-payment-processing)
12. [Returns and Refunds](#12-returns-and-refunds)
13. [Analytics and Reporting](#13-analytics-and-reporting)
14. [Security and Compliance](#14-security-and-compliance)
15. [Integration Guidelines](#15-integration-guidelines)
16. [References](#16-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the comprehensive framework for retail technology systems, providing standardized interfaces and protocols for modern retail operations across physical stores, e-commerce platforms, and omnichannel environments.

### 1.2 Scope

The standard covers:
- Point of Sale (POS) transaction processing
- E-commerce platform integration
- Omnichannel retail experiences
- Customer data and relationship management
- Loyalty program operations
- Product information and catalog management
- Real-time inventory tracking
- Dynamic pricing and promotions
- Payment processing and security
- Returns and refund workflows
- Business analytics and reporting

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to create seamless, efficient, and customer-centric retail experiences that benefit both merchants and consumers through standardized, interoperable technology systems.

### 1.4 Terminology

- **SKU (Stock Keeping Unit)**: Unique identifier for products
- **POS (Point of Sale)**: System for processing retail transactions
- **Omnichannel**: Integrated multi-channel retail approach
- **CLV (Customer Lifetime Value)**: Predicted total revenue from customer
- **BOPIS**: Buy Online, Pick Up In Store
- **Inventory Turnover**: Rate at which inventory is sold and replaced
- **Conversion Rate**: Percentage of visitors who make purchases

---

## 2. Point of Sale (POS) Systems

### 2.1 POS Architecture

Modern POS systems consist of:

```
┌─────────────────────────────────────────┐
│           POS Terminal                   │
├─────────────────────────────────────────┤
│  • Touch Screen Interface               │
│  • Barcode Scanner                      │
│  • Receipt Printer                      │
│  • Card Reader (EMV/NFC)                │
│  • Cash Drawer                          │
│  • Customer Display                     │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│      POS Software Layer                  │
├─────────────────────────────────────────┤
│  • Transaction Management               │
│  • Payment Processing                   │
│  • Inventory Updates                    │
│  • Customer Lookup                      │
│  • Reporting                            │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│      Backend Systems                     │
├─────────────────────────────────────────┤
│  • Database                             │
│  • Payment Gateway                      │
│  • Inventory Management                 │
│  • CRM System                           │
└─────────────────────────────────────────┘
```

### 2.2 Transaction Processing Flow

```
1. Item Scan/Entry
   ├─> Lookup product in database
   ├─> Verify inventory availability
   ├─> Add to transaction
   └─> Calculate price (including promotions)

2. Apply Discounts
   ├─> Manual discounts
   ├─> Promotion codes
   ├─> Loyalty rewards
   └─> Employee discounts

3. Calculate Totals
   ├─> Subtotal = Sum(item prices × quantities)
   ├─> Tax = Subtotal × Tax Rate
   ├─> Discount = Sum(all discounts)
   └─> Total = Subtotal + Tax - Discount + Shipping

4. Payment Processing
   ├─> Accept payment method
   ├─> Process payment
   ├─> Verify authorization
   └─> Capture payment

5. Transaction Completion
   ├─> Update inventory
   ├─> Record customer purchase
   ├─> Award loyalty points
   ├─> Print/email receipt
   └─> Close transaction
```

### 2.3 Transaction Data Model

```typescript
interface Transaction {
  id: string;                    // Unique transaction ID
  storeId: string;               // Store identifier
  registerId: string;            // POS register ID
  receiptNumber: string;         // Human-readable receipt number

  // Items
  items: TransactionItem[];

  // Customer
  customerId?: string;
  customerEmail?: string;

  // Financial
  subtotal: number;              // Before tax/discounts
  tax: number;                   // Total tax amount
  discount: number;              // Total discount amount
  shipping: number;              // Shipping charges
  total: number;                 // Final total
  currency: string;              // ISO 4217 currency code

  // Payment
  payments: Payment[];

  // Status
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';

  // Metadata
  employeeId?: string;           // Cashier/associate
  channel: 'in_store' | 'online' | 'mobile' | 'kiosk';
  createdAt: Date;
  updatedAt: Date;
}

interface TransactionItem {
  id: string;
  sku: string;                   // Stock keeping unit
  name: string;
  quantity: number;
  price: number;                 // Unit price
  originalPrice?: number;        // Before discounts
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;                 // Line total
}
```

### 2.4 POS System Requirements

**Hardware Requirements:**
- Processor: Intel Core i3 or equivalent
- RAM: 4GB minimum, 8GB recommended
- Storage: 128GB SSD minimum
- Network: Gigabit Ethernet or WiFi 5/6
- Peripherals: Barcode scanner, receipt printer, cash drawer

**Software Requirements:**
- Operating System: Windows 10/11, Linux, or iOS
- Database: PostgreSQL, MySQL, or cloud-based
- Network connectivity for payment processing
- Offline mode capability for network outages
- Backup and recovery systems

**Performance Requirements:**
- Transaction processing: < 2 seconds
- Barcode scan response: < 500ms
- Payment authorization: < 5 seconds
- Receipt printing: < 3 seconds
- System uptime: 99.9% minimum

---

## 3. E-commerce Platform Integration

### 3.1 E-commerce Architecture

```
┌─────────────────────────────────────────┐
│        E-commerce Frontend               │
│  • Product Catalog                      │
│  • Shopping Cart                        │
│  • Checkout                             │
│  • Customer Account                     │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│      E-commerce Backend API              │
│  • Product Management                   │
│  • Order Processing                     │
│  • Payment Integration                  │
│  • Customer Management                  │
│  • Inventory Sync                       │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│      Integration Layer                   │
│  • POS System Sync                      │
│  • Inventory Management                 │
│  • CRM Integration                      │
│  • Analytics Platform                   │
└─────────────────────────────────────────┘
```

### 3.2 RESTful API Endpoints

**Product Endpoints:**
```
GET    /api/v1/products              List products
GET    /api/v1/products/:id          Get product details
POST   /api/v1/products              Create product
PUT    /api/v1/products/:id          Update product
DELETE /api/v1/products/:id          Delete product
GET    /api/v1/products/:id/inventory Inventory levels
```

**Order Endpoints:**
```
GET    /api/v1/orders                List orders
GET    /api/v1/orders/:id            Get order details
POST   /api/v1/orders                Create order
PUT    /api/v1/orders/:id            Update order
DELETE /api/v1/orders/:id            Cancel order
POST   /api/v1/orders/:id/fulfill    Fulfill order
```

**Customer Endpoints:**
```
GET    /api/v1/customers             List customers
GET    /api/v1/customers/:id         Get customer details
POST   /api/v1/customers             Create customer
PUT    /api/v1/customers/:id         Update customer
GET    /api/v1/customers/:id/orders  Customer orders
GET    /api/v1/customers/:id/loyalty Loyalty information
```

### 3.3 Shopping Cart Management

```typescript
interface ShoppingCart {
  id: string;
  customerId?: string;
  sessionId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  attributes?: Record<string, string>;
}
```

### 3.4 Checkout Process

```
1. Cart Review
   ├─> Display cart items
   ├─> Apply discount codes
   └─> Calculate totals

2. Customer Information
   ├─> Login or guest checkout
   ├─> Shipping address
   └─> Billing address

3. Shipping Method
   ├─> Standard shipping
   ├─> Express shipping
   ├─> Free shipping (if eligible)
   └─> Pick up in store

4. Payment
   ├─> Enter payment details
   ├─> Apply gift cards
   └─> Process payment

5. Order Confirmation
   ├─> Generate order number
   ├─> Send confirmation email
   ├─> Update inventory
   └─> Award loyalty points
```

---

## 4. Omnichannel Retail

### 4.1 Omnichannel Strategy

Omnichannel retail provides seamless customer experience across all channels:

**Key Principles:**
1. **Unified Inventory**: Real-time visibility across all channels
2. **Consistent Pricing**: Same prices online and in-store
3. **Flexible Fulfillment**: BOPIS, ship from store, home delivery
4. **Single Customer View**: Unified customer data across channels
5. **Channel-Agnostic Returns**: Return anywhere regardless of purchase channel

### 4.2 Buy Online, Pick Up In Store (BOPIS)

```typescript
interface BOPISOrder {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  pickupStore: string;
  pickupTime: Date;
  notificationPreference: 'email' | 'sms' | 'both';
  status: 'pending' | 'ready' | 'picked_up' | 'cancelled';
  preparationTime: number;      // minutes
  readyAt?: Date;
  pickedUpAt?: Date;
}
```

**BOPIS Workflow:**
```
1. Customer places order online
   └─> Select "Pick up in store" option
   └─> Choose preferred store and pickup time

2. Order routing
   └─> Check inventory at selected store
   └─> If unavailable, offer alternative stores
   └─> Create BOPIS order

3. Store preparation
   └─> Notify store staff
   └─> Pick items from inventory
   └─> Package for pickup
   └─> Mark as ready

4. Customer notification
   └─> Send pickup ready notification
   └─> Provide pickup instructions
   └─> Include QR code for easy pickup

5. Pickup
   └─> Customer arrives at store
   └─> Verify identity (QR code or ID)
   └─> Hand over order
   └─> Mark as picked up
```

### 4.3 Ship From Store

Ship from store turns retail locations into micro-fulfillment centers:

```typescript
interface ShipFromStoreOrder {
  orderId: string;
  fulfillmentStore: string;
  shippingAddress: Address;
  shippingMethod: 'standard' | 'express' | 'overnight';
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery: Date;
  status: 'pending' | 'picked' | 'packed' | 'shipped' | 'delivered';
}
```

**Benefits:**
- Faster delivery from nearby stores
- Reduced shipping costs
- Better inventory utilization
- Lower warehouse requirements

### 4.4 Endless Aisle

Allow in-store customers to purchase items not in stock:

```
1. Customer browses in-store
   └─> Item not available in current store

2. Associate checks inventory
   └─> Look up in endless aisle system
   └─> Show availability at other stores or online

3. Customer places order
   └─> Ship to home or other store
   └─> Process payment in-store
   └─> Receive order confirmation

4. Order fulfillment
   └─> Route to nearest fulfillment location
   └─> Ship to customer
```

---

## 5. Customer Relationship Management

### 5.1 Customer Data Model

```typescript
interface Customer {
  // Identity
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;

  // Addresses
  addresses: Address[];
  defaultShippingAddress?: string;
  defaultBillingAddress?: string;

  // Loyalty
  loyaltyMembership?: LoyaltyMembership;

  // Preferences
  preferences: CustomerPreferences;

  // Metrics
  lifetimeValue: number;
  totalPurchases: number;
  totalSpent: number;
  averageOrderValue: number;
  purchaseFrequency: number;

  // Segmentation
  segment: 'vip' | 'regular' | 'new' | 'at_risk' | 'churned';
  tags: string[];

  // Communication
  marketingOptIn: boolean;
  smsOptIn: boolean;

  // Timestamps
  firstPurchaseAt?: Date;
  lastPurchaseAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Address {
  id: string;
  type: 'shipping' | 'billing' | 'both';
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}
```

### 5.2 Customer Segmentation

**Segmentation Criteria:**

| Segment | Definition | Strategy |
|---------|-----------|----------|
| VIP | CLV > $10,000, Frequent buyer | Exclusive offers, early access |
| Regular | CLV $1,000-$10,000 | Standard loyalty benefits |
| New | < 3 months since first purchase | Onboarding, welcome offers |
| At Risk | No purchase in 6+ months | Win-back campaigns |
| Churned | No purchase in 12+ months | Reactivation campaigns |

### 5.3 Customer Lifetime Value Calculation

```
CLV = (Average Order Value × Purchase Frequency × Customer Lifespan) - Acquisition Cost

Where:
- Average Order Value = Total Revenue / Number of Orders
- Purchase Frequency = Number of Orders / Number of Unique Customers
- Customer Lifespan = Average time customer remains active (in years)
- Acquisition Cost = Marketing spend / New customers acquired
```

**Example:**
```
Average Order Value: $75
Purchase Frequency: 8 times/year
Customer Lifespan: 3 years
Acquisition Cost: $50

CLV = ($75 × 8 × 3) - $50
CLV = $1,800 - $50
CLV = $1,750
```

### 5.4 Customer Communication

**Communication Channels:**
- Email: Transactional and marketing emails
- SMS: Order updates, pickup notifications
- Push Notifications: Mobile app alerts
- In-App Messages: Personalized offers
- Direct Mail: Special occasions, catalogs

**Triggered Communications:**
```typescript
interface CommunicationTrigger {
  type: 'welcome' | 'abandoned_cart' | 'order_confirmation' |
        'shipping_notification' | 'delivery_confirmation' |
        'review_request' | 'win_back' | 'birthday';
  channel: 'email' | 'sms' | 'push' | 'in_app';
  timing: {
    delay: number;              // minutes
    condition?: string;         // Additional conditions
  };
  template: string;
  personalization: Record<string, any>;
}
```

---

## 6. Loyalty Programs

### 6.1 Loyalty Program Types

**1. Points-Based Programs**
```
Earn Points: 1 point per $1 spent
Redeem Points: 100 points = $1 discount

Example:
Purchase: $100
Points Earned: 100
Points Balance: 500
Available Discount: $5
```

**2. Tiered Programs**
```
Bronze Tier: 0-499 points
- 1x points on purchases
- Birthday bonus

Silver Tier: 500-1,999 points
- 1.5x points on purchases
- Free shipping
- Birthday bonus

Gold Tier: 2,000+ points
- 2x points on purchases
- Free shipping
- Priority support
- Early access to sales
- Birthday bonus + gift
```

**3. Cashback Programs**
```
Standard: 1% cashback on all purchases
Premium: 3% cashback (annual fee)

Example:
Purchase: $1,000
Cashback: $10 (standard) or $30 (premium)
```

### 6.2 Loyalty Data Model

```typescript
interface LoyaltyMembership {
  id: string;
  customerId: string;
  programId: string;
  membershipNumber: string;

  // Points
  pointsBalance: number;
  lifetimePoints: number;
  expiringPoints: ExpiringPoints[];

  // Tier
  tier: LoyaltyTier;
  tierProgress: number;         // Points toward next tier
  tierExpirationDate?: Date;

  // Status
  status: 'active' | 'suspended' | 'cancelled';
  memberSince: Date;
}

interface LoyaltyTier {
  name: string;
  level: number;
  pointsRequired: number;
  benefits: string[];
  pointsMultiplier: number;
  discountPercentage?: number;
}

interface ExpiringPoints {
  points: number;
  expirationDate: Date;
}

interface LoyaltyTransaction {
  id: string;
  customerId: string;
  pointsChange: number;
  type: 'earned' | 'redeemed' | 'bonus' | 'expired' | 'adjustment';
  referenceId?: string;         // Related order ID
  description: string;
  timestamp: Date;
  expirationDate?: Date;
}
```

### 6.3 Points Calculation

**Earning Points:**
```typescript
function calculatePointsEarned(
  amount: number,
  tierMultiplier: number,
  baseRate: number = 1
): number {
  return Math.floor(amount * baseRate * tierMultiplier);
}

// Example
const purchase = 125.50;
const tierMultiplier = 1.5;  // Silver tier
const points = calculatePointsEarned(purchase, tierMultiplier);
// Result: 188 points
```

**Redeeming Points:**
```typescript
function convertPointsToDiscount(
  points: number,
  conversionRate: number = 0.01
): number {
  return points * conversionRate;
}

// Example
const pointsToRedeem = 500;
const discount = convertPointsToDiscount(pointsToRedeem);
// Result: $5.00 discount
```

### 6.4 Bonus Point Opportunities

- **Welcome Bonus**: 500 points for joining
- **Birthday Bonus**: 2x points on birthday month
- **Product Reviews**: 25 points per review
- **Referrals**: 100 points per successful referral
- **Social Sharing**: 10 points per share
- **Survey Completion**: 50 points
- **Anniversary Bonus**: 100 points per year of membership

---

## 7. Product Information Management

### 7.1 Product Data Model

```typescript
interface Product {
  // Identity
  sku: string;                  // Unique identifier
  upc?: string;                 // Universal Product Code
  ean?: string;                 // European Article Number
  gtin?: string;                // Global Trade Item Number

  // Basic Information
  name: string;
  description: string;
  shortDescription?: string;
  brand: string;
  manufacturer?: string;

  // Classification
  category: string;
  subcategory?: string;
  tags: string[];

  // Pricing
  price: number;
  compareAtPrice?: number;      // Original price for sale items
  cost?: number;                // Cost of goods sold
  currency: string;

  // Tax
  taxCategory: 'standard' | 'reduced' | 'zero' | 'exempt';
  taxable: boolean;

  // Inventory
  trackInventory: boolean;
  inventoryPolicy: 'deny' | 'continue';  // Out of stock behavior

  // Physical Attributes
  weight?: number;              // kg
  dimensions?: {
    length: number;             // cm
    width: number;
    height: number;
  };

  // Media
  images: ProductImage[];
  videos?: ProductVideo[];

  // Variants
  hasVariants: boolean;
  variants?: ProductVariant[];
  variantAttributes?: string[]; // e.g., ['size', 'color']

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };

  // Status
  status: 'active' | 'draft' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductVariant {
  sku: string;
  name: string;
  attributes: Record<string, string>;  // e.g., {size: 'Large', color: 'Blue'}
  price?: number;                      // If different from base
  compareAtPrice?: number;
  weight?: number;
  image?: string;
  inventory?: InventoryLevel;
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
  isDefault: boolean;
}
```

### 7.2 Product Categorization

**Category Hierarchy:**
```
Electronics
├── Computers
│   ├── Laptops
│   ├── Desktops
│   └── Tablets
├── Mobile Phones
│   ├── Smartphones
│   └── Accessories
└── Audio
    ├── Headphones
    └── Speakers

Clothing
├── Men
│   ├── Shirts
│   ├── Pants
│   └── Shoes
├── Women
│   ├── Dresses
│   ├── Tops
│   └── Shoes
└── Accessories
    ├── Bags
    └── Jewelry
```

### 7.3 Product Attributes

**Standard Attributes:**
- Brand
- Model Number
- Color
- Size
- Material
- Country of Origin
- Care Instructions
- Warranty

**Custom Attributes (by category):**
```typescript
interface CategoryAttributes {
  categoryId: string;
  attributes: Attribute[];
}

interface Attribute {
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean';
  required: boolean;
  options?: string[];           // For select/multiselect
  unit?: string;                // For number (e.g., 'inches', 'kg')
}

// Example: Electronics > Laptops
{
  categoryId: 'electronics-laptops',
  attributes: [
    { name: 'Processor', type: 'text', required: true },
    { name: 'RAM', type: 'select', required: true,
      options: ['4GB', '8GB', '16GB', '32GB'], unit: 'GB' },
    { name: 'Storage', type: 'select', required: true,
      options: ['256GB SSD', '512GB SSD', '1TB SSD'] },
    { name: 'Screen Size', type: 'number', required: true, unit: 'inches' },
    { name: 'Operating System', type: 'select', required: true,
      options: ['Windows 11', 'macOS', 'Linux'] }
  ]
}
```

### 7.4 Product Search and Filters

**Search Capabilities:**
- Full-text search across name, description, SKU
- Synonym matching (e.g., 'laptop' → 'notebook')
- Spell correction
- Autocomplete suggestions
- Search result ranking by relevance

**Filter Options:**
- Price range
- Category/subcategory
- Brand
- Color
- Size
- Rating
- Availability
- Custom attributes

---

## 8. Inventory Management

### 8.1 Inventory Tracking

```typescript
interface InventoryLevel {
  sku: string;
  locationId: string;

  // Quantities
  availableQuantity: number;    // Available for sale
  reservedQuantity: number;     // In carts/pending orders
  inTransitQuantity: number;    // Incoming shipments
  damagedQuantity: number;      // Damaged/unsellable

  // Thresholds
  reorderPoint: number;         // Trigger reorder
  reorderQuantity: number;      // Amount to reorder
  maxStockLevel: number;        // Maximum to stock

  // Metadata
  lastStockCheck?: Date;
  lastRestocked?: Date;
  bin Location?: string;        // Warehouse location
}
```

### 8.2 Stock Movements

```typescript
interface StockMovement {
  id: string;
  sku: string;
  locationId: string;

  // Movement details
  type: 'purchase' | 'sale' | 'return' | 'adjustment' |
        'transfer' | 'damaged' | 'theft' | 'cycle_count';
  quantity: number;             // Positive or negative

  // References
  referenceId?: string;         // Order ID, PO, etc.
  fromLocation?: string;        // For transfers
  toLocation?: string;

  // Tracking
  employeeId?: string;
  notes?: string;
  timestamp: Date;
}
```

### 8.3 Inventory Calculations

**Available to Sell:**
```
Available = On Hand - Reserved - Damaged

Example:
On Hand: 100 units
Reserved: 15 units (in carts)
Damaged: 2 units
Available = 100 - 15 - 2 = 83 units
```

**Inventory Turnover Ratio:**
```
Inventory Turnover = Cost of Goods Sold / Average Inventory Value

Example:
Annual COGS: $500,000
Average Inventory: $100,000
Turnover = $500,000 / $100,000 = 5.0

This means inventory is sold and replaced 5 times per year.
```

**Days Inventory Outstanding (DIO):**
```
DIO = 365 / Inventory Turnover

Example:
Inventory Turnover: 5.0
DIO = 365 / 5.0 = 73 days

On average, inventory sits for 73 days before being sold.
```

**Economic Order Quantity (EOQ):**
```
EOQ = √((2 × D × S) / H)

Where:
D = Annual demand
S = Order cost per order
H = Holding cost per unit per year

Example:
Annual demand: 10,000 units
Order cost: $100
Holding cost: $2 per unit
EOQ = √((2 × 10,000 × 100) / 2)
EOQ = √(1,000,000)
EOQ = 1,000 units
```

### 8.4 Multi-Location Inventory

```typescript
interface InventoryAllocation {
  sku: string;
  totalAvailable: number;
  locations: LocationInventory[];
}

interface LocationInventory {
  locationId: string;
  locationName: string;
  locationType: 'store' | 'warehouse' | 'supplier';
  available: number;
  reserved: number;
  inTransit: number;
  distanceFromCustomer?: number; // km
  shippingTime?: number;         // days
}
```

**Allocation Strategy:**
```
1. Check customer's preferred store
2. If insufficient stock, find nearest location with stock
3. If no nearby stock, check warehouse
4. If multiple options, optimize for:
   - Fastest delivery
   - Lowest shipping cost
   - Best inventory distribution
```

### 8.5 Stockouts and Backorders

**Stockout Handling:**
```typescript
interface StockoutPolicy {
  sku: string;
  policy: 'deny' | 'backorder' | 'notify';

  // For backorder policy
  maxBackorderQuantity?: number;
  expectedRestockDate?: Date;
  notifyOnRestock: boolean;

  // Alternative actions
  suggestAlternatives: boolean;
  alternativeSkus?: string[];
}
```

---

## 9. Price Management

### 9.1 Pricing Strategies

**1. Cost-Plus Pricing**
```
Selling Price = Cost + (Cost × Markup Percentage)

Example:
Cost: $50
Markup: 40%
Price = $50 + ($50 × 0.40) = $70
```

**2. Competitive Pricing**
```
Monitor competitor prices and adjust accordingly:
- Match competitor prices
- Undercut by X%
- Premium pricing (higher than competitors)
```

**3. Dynamic Pricing**
```typescript
interface DynamicPricing {
  sku: string;
  basePrice: number;
  rules: PricingRule[];
}

interface PricingRule {
  condition: 'time' | 'demand' | 'inventory' | 'customer_segment';
  operator: 'increase' | 'decrease';
  value: number;
  valueType: 'percentage' | 'fixed';
  priority: number;
}

// Example: Increase price during peak hours
{
  condition: 'time',
  operator: 'increase',
  value: 10,
  valueType: 'percentage',
  priority: 1,
  timeRange: { start: '09:00', end: '17:00' }
}
```

### 9.2 Price Tiers

```typescript
interface PriceTier {
  sku: string;
  tiers: {
    minQuantity: number;
    maxQuantity?: number;
    price: number;
    discount?: number;
  }[];
}

// Example: Volume discounts
{
  sku: 'WIDGET-001',
  tiers: [
    { minQuantity: 1, maxQuantity: 9, price: 10.00 },
    { minQuantity: 10, maxQuantity: 49, price: 9.00, discount: 10 },
    { minQuantity: 50, price: 8.00, discount: 20 }
  ]
}
```

### 9.3 Customer-Specific Pricing

```typescript
interface CustomerPricing {
  customerId: string;
  segment: string;
  priceList?: string;
  discountPercentage?: number;
  products: {
    sku: string;
    specialPrice?: number;
    discountPercentage?: number;
  }[];
}
```

---

## 10. Promotions and Discounts

### 10.1 Promotion Types

**1. Percentage Discount**
```
Discount = Original Price × (Discount % / 100)
Final Price = Original Price - Discount

Example:
Original: $100
Discount: 20%
Final = $100 - ($100 × 0.20) = $80
```

**2. Fixed Amount Discount**
```
Final Price = Original Price - Discount Amount

Example:
Original: $100
Discount: $15
Final = $100 - $15 = $85
```

**3. Buy One Get One (BOGO)**
```typescript
interface BOGOPromotion {
  buyQuantity: number;
  getQuantity: number;
  getDiscount: number;          // 0-100 (100 = free)
  applicableSkus: string[];
}

// Example: Buy 2, Get 1 Free
{
  buyQuantity: 2,
  getQuantity: 1,
  getDiscount: 100,
  applicableSkus: ['SKU-001', 'SKU-002']
}
```

**4. Bundle Pricing**
```typescript
interface BundlePromotion {
  bundleId: string;
  name: string;
  requiredProducts: {
    sku: string;
    quantity: number;
  }[];
  bundlePrice: number;
  savings: number;
}

// Example: Laptop + Mouse + Bag bundle
{
  bundleId: 'TECH-BUNDLE-001',
  name: 'Work From Home Bundle',
  requiredProducts: [
    { sku: 'LAPTOP-001', quantity: 1 },
    { sku: 'MOUSE-002', quantity: 1 },
    { sku: 'BAG-003', quantity: 1 }
  ],
  bundlePrice: 999,
  savings: 150
}
```

### 10.2 Promotion Rules

```typescript
interface Promotion {
  id: string;
  code?: string;
  name: string;
  description: string;

  // Type
  type: 'percentage' | 'fixed_amount' | 'bogo' | 'bundle' | 'free_shipping';

  // Value
  discountValue?: number;

  // Conditions
  minimumPurchase?: number;
  maximumDiscount?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  excludedProducts?: string[];

  // Customer restrictions
  customerSegments?: string[];
  newCustomersOnly?: boolean;

  // Usage limits
  usageLimitPerCustomer?: number;
  totalUsageLimit?: number;
  currentUsageCount: number;

  // Timing
  startDate: Date;
  endDate: Date;

  // Stacking
  stackable: boolean;
  priority: number;

  // Status
  active: boolean;
}
```

### 10.3 Promotion Application Logic

```typescript
function applyPromotions(
  cart: ShoppingCart,
  promotions: Promotion[]
): DiscountCalculation {
  // Sort by priority
  const sortedPromotions = promotions.sort((a, b) => a.priority - b.priority);

  let totalDiscount = 0;
  const appliedPromotions: string[] = [];

  for (const promo of sortedPromotions) {
    // Check if promotion is valid
    if (!isPromotionValid(promo, cart)) continue;

    // Calculate discount
    const discount = calculatePromoDiscount(promo, cart);

    // Apply maximum discount limit
    const finalDiscount = promo.maximumDiscount
      ? Math.min(discount, promo.maximumDiscount)
      : discount;

    totalDiscount += finalDiscount;
    appliedPromotions.push(promo.id);

    // If not stackable, stop here
    if (!promo.stackable) break;
  }

  return {
    totalDiscount,
    appliedPromotions
  };
}
```

---

## 11. Payment Processing

### 11.1 Supported Payment Methods

**Credit/Debit Cards:**
- Visa
- Mastercard
- American Express
- Discover
- JCB
- UnionPay

**Digital Wallets:**
- Apple Pay
- Google Pay
- Samsung Pay
- PayPal
- Venmo

**Alternative Methods:**
- Buy Now, Pay Later (Afterpay, Klarna, Affirm)
- Bank Transfer (ACH, Wire)
- Gift Cards
- Store Credit
- Cash (in-store only)
- Cryptocurrency

### 11.2 Payment Processing Flow

```
1. Payment Initiation
   ├─> Customer selects payment method
   ├─> Enter payment details
   └─> Confirm amount

2. Tokenization
   ├─> Convert card details to token
   ├─> Token sent to payment gateway
   └─> Original card data never stored

3. Authorization
   ├─> Send authorization request
   ├─> Check customer funds
   ├─> Apply fraud checks
   └─> Receive authorization code

4. Capture
   ├─> Capture authorized amount
   ├─> Funds transferred from customer
   └─> Payment confirmed

5. Settlement
   ├─> Batch processing (typically daily)
   ├─> Funds deposited to merchant account
   └─> Settlement complete
```

### 11.3 Payment Data Model

```typescript
interface Payment {
  id: string;
  transactionId: string;

  // Amount
  amount: number;
  currency: string;

  // Method
  method: PaymentMethod;
  cardInfo?: CardInfo;
  walletInfo?: DigitalWalletInfo;

  // Processing
  status: 'pending' | 'authorized' | 'captured' | 'settled' |
          'failed' | 'cancelled' | 'refunded';
  authorizationCode?: string;
  processor: string;
  processingFee: number;

  // Security
  riskScore?: number;
  fraudChecks: FraudCheck[];

  // Timestamps
  authorizedAt?: Date;
  capturedAt?: Date;
  settledAt?: Date;
  timestamp: Date;
}

interface CardInfo {
  token: string;                // Tokenized card number
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  expiryMonth: number;
  expiryYear: number;
  cardholderName?: string;
}
```

### 11.4 Security Standards

**PCI DSS Compliance:**
- Build and maintain secure network
- Protect cardholder data
- Maintain vulnerability management program
- Implement strong access control measures
- Regularly monitor and test networks
- Maintain information security policy

**Tokenization:**
- Replace sensitive card data with tokens
- Tokens useless if intercepted
- Original data stored in secure vault
- Reduces PCI compliance scope

**EMV Chip Cards:**
- Dynamic authentication for each transaction
- Prevents card cloning
- Liability shift to merchants for non-chip transactions

**3D Secure (3DS):**
- Additional authentication layer
- Customer verifies with password/biometric
- Reduces fraud, shifts liability to issuer

---

## 12. Returns and Refunds

### 12.1 Return Policy

**Standard Return Window:**
- 30 days for most items
- 90 days for electronics
- 14 days for apparel (hygiene)
- No returns on final sale items

**Return Conditions:**
- Items in original condition
- Original packaging included
- Receipt or proof of purchase
- Tags still attached (apparel)

### 12.2 Return Process

```typescript
interface ReturnRequest {
  id: string;
  transactionId: string;
  customerId: string;

  // Items
  items: ReturnItem[];

  // Details
  reason: ReturnReason;
  method: 'in_store' | 'mail' | 'pickup';
  condition: 'new' | 'like_new' | 'good' | 'damaged';

  // Financial
  refundAmount: number;
  restockingFee: number;
  refundMethod: 'original_payment' | 'store_credit' | 'exchange';

  // Status
  status: 'requested' | 'approved' | 'received' |
          'inspected' | 'refunded' | 'rejected';

  // Tracking
  returnLabel?: string;
  trackingNumber?: string;

  // Timestamps
  createdAt: Date;
  receivedAt?: Date;
  inspectedAt?: Date;
  refundedAt?: Date;

  // Notes
  customerNotes?: string;
  internalNotes?: string;
}

interface ReturnItem {
  transactionItemId: string;
  sku: string;
  quantity: number;
  reason: ReturnReason;
  condition: ItemCondition;
  refundAmount: number;
}

type ReturnReason =
  | 'defective'
  | 'wrong_item'
  | 'not_as_described'
  | 'changed_mind'
  | 'size_fit'
  | 'damaged_shipping'
  | 'other';
```

### 12.3 Refund Calculation

```typescript
function calculateRefund(returnRequest: ReturnRequest): RefundCalculation {
  let refundAmount = 0;

  // Sum item refunds
  for (const item of returnRequest.items) {
    refundAmount += item.refundAmount;
  }

  // Apply restocking fee if applicable
  const restockingFee = calculateRestockingFee(returnRequest);
  refundAmount -= restockingFee;

  // Refund shipping if product was defective
  if (returnRequest.reason === 'defective') {
    refundAmount += getOriginalShipping(returnRequest.transactionId);
  }

  // Deduct return shipping if customer's fault
  if (!isDefectiveReturn(returnRequest.reason)) {
    const returnShipping = 9.99; // Standard return shipping
    refundAmount -= returnShipping;
  }

  return {
    subtotal: refundAmount,
    restockingFee,
    returnShipping: returnShipping,
    total: Math.max(0, refundAmount)
  };
}
```

---

## 13. Analytics and Reporting

### 13.1 Key Performance Indicators (KPIs)

**Sales Metrics:**
```
Revenue = Sum of all transaction totals
Gross Profit = Revenue - Cost of Goods Sold
Net Profit = Gross Profit - Operating Expenses
Profit Margin = (Net Profit / Revenue) × 100

Conversion Rate = (Transactions / Visitors) × 100
Average Order Value (AOV) = Revenue / Number of Orders
Units Per Transaction (UPT) = Total Units Sold / Transactions
```

**Customer Metrics:**
```
Customer Acquisition Cost = Marketing Spend / New Customers
Customer Lifetime Value = Average Order Value × Purchase Frequency × Lifespan
Customer Retention Rate = ((CE - CN) / CS) × 100
  where CE = customers at end, CN = new customers, CS = customers at start

Repeat Purchase Rate = Repeat Customers / Total Customers × 100
Churn Rate = Lost Customers / Total Customers × 100
```

**Inventory Metrics:**
```
Inventory Turnover = Cost of Goods Sold / Average Inventory
Days Sales of Inventory = 365 / Inventory Turnover
Gross Margin Return on Investment = Gross Margin / Average Inventory Cost
Sell-Through Rate = Units Sold / Units Received × 100
Stock-Out Rate = Out of Stock SKUs / Total SKUs × 100
```

**Operational Metrics:**
```
Sales per Square Foot = Total Sales / Store Square Footage
Sales per Employee Hour = Total Sales / Total Employee Hours
Order Fulfillment Time = Average time from order to shipment
Return Rate = Returned Items / Total Items Sold × 100
```

### 13.2 Sales Reports

```typescript
interface SalesReport {
  period: {
    startDate: Date;
    endDate: Date;
  };

  // Overall metrics
  totalSales: number;
  totalTransactions: number;
  totalItemsSold: number;
  averageOrderValue: number;

  // Financial
  grossRevenue: number;
  discounts: number;
  returns: number;
  netRevenue: number;
  tax: number;

  // Profitability
  costOfGoodsSold: number;
  grossProfit: number;
  grossMargin: number;

  // Breakdown
  salesByChannel: Record<string, number>;
  salesByCategory: Record<string, number>;
  salesByDay: DailySales[];
  salesByHour: HourlySales[];

  // Top performers
  topProducts: ProductSales[];
  topCategories: CategorySales[];
  topStores: StoreSales[];
}
```

### 13.3 Customer Analytics

```typescript
interface CustomerAnalytics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;

  // Segmentation
  customersBySegment: Record<string, number>;
  customersByTier: Record<string, number>;

  // Behavior
  averageOrderValue: number;
  averagePurchaseFrequency: number;
  averageCustomerLifetime: number;

  // Engagement
  emailOpenRate: number;
  emailClickRate: number;
  loyaltyParticipation: number;

  // Retention
  retentionRate: number;
  churnRate: number;
  repeatPurchaseRate: number;
}
```

### 13.4 Real-Time Dashboard

**Dashboard Components:**
- Today's sales vs. yesterday
- Current transactions in progress
- Top selling products (live)
- Inventory alerts (low stock, out of stock)
- Recent customer activity
- Payment processing status
- Store performance comparison
- Traffic and conversion rates

---

## 14. Security and Compliance

### 14.1 Data Security

**Encryption:**
- Data at rest: AES-256 encryption
- Data in transit: TLS 1.3
- Database encryption: Field-level encryption for sensitive data
- Backup encryption: Encrypted backups stored off-site

**Access Control:**
- Role-based access control (RBAC)
- Multi-factor authentication (MFA)
- Session management and timeout
- IP whitelisting for admin access
- Audit logging of all access

**Payment Security:**
- PCI DSS Level 1 compliance
- Tokenization of card data
- No storage of CVV/CVC codes
- 3D Secure authentication
- Fraud detection and prevention

### 14.2 Privacy Compliance

**GDPR (EU):**
- Right to access data
- Right to erasure ("right to be forgotten")
- Right to data portability
- Consent management
- Data breach notification (72 hours)
- Data protection officer (DPO)

**CCPA (California):**
- Disclosure of data collection
- Right to know what data is collected
- Right to delete personal data
- Right to opt-out of data sale
- Non-discrimination for exercising rights

**Data Retention:**
```typescript
interface DataRetentionPolicy {
  dataType: string;
  retentionPeriod: number;        // days
  anonymizationAfter?: number;    // days
  deletionAfter: number;          // days
  legalHoldException: boolean;
}

// Example policies
[
  {
    dataType: 'transaction_data',
    retentionPeriod: 2555,        // 7 years (tax requirement)
    deletionAfter: 2555,
    legalHoldException: true
  },
  {
    dataType: 'customer_pii',
    retentionPeriod: 1095,        // 3 years
    anonymizationAfter: 1095,
    deletionAfter: 1825,          // 5 years
    legalHoldException: false
  },
  {
    dataType: 'marketing_data',
    retentionPeriod: 365,         // 1 year
    deletionAfter: 730,           // 2 years
    legalHoldException: false
  }
]
```

### 14.3 Compliance Standards

**Industry Standards:**
- PCI DSS: Payment card security
- SOC 2: Service organization controls
- ISO 27001: Information security management
- WCAG 2.1: Web accessibility

**Retail Regulations:**
- Consumer protection laws
- Product safety standards
- Labeling requirements
- Warranty regulations
- Sales tax compliance

---

## 15. Integration Guidelines

### 15.1 API Integration

**Authentication:**
```
POST /api/v1/auth/token
Content-Type: application/json

{
  "apiKey": "your-api-key",
  "apiSecret": "your-api-secret"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

**API Request:**
```
GET /api/v1/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "perPage": 50,
    "total": 500,
    "totalPages": 10
  }
}
```

### 15.2 Webhook Events

```typescript
interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  data: any;
  timestamp: Date;
  signature: string;            // HMAC signature for verification
}

type WebhookEventType =
  | 'order.created'
  | 'order.updated'
  | 'order.cancelled'
  | 'payment.authorized'
  | 'payment.captured'
  | 'payment.failed'
  | 'inventory.updated'
  | 'product.created'
  | 'product.updated'
  | 'customer.created';
```

### 15.3 System Integration Points

- **ERP Systems**: SAP, Oracle NetSuite, Microsoft Dynamics
- **CRM Systems**: Salesforce, HubSpot, Microsoft Dynamics
- **Payment Gateways**: Stripe, Square, Adyen, Braintree
- **Shipping Providers**: FedEx, UPS, USPS, DHL
- **Accounting**: QuickBooks, Xero, FreshBooks
- **Marketing**: Mailchimp, Klaviyo, SendGrid
- **Analytics**: Google Analytics, Adobe Analytics, Mixpanel

---

## 16. References

### 16.1 Related Standards

- **WIA-INTENT**: Intent-based retail operations
- **WIA-OMNI-API**: Universal retail API gateway
- **WIA-SOCIAL**: Social commerce integration
- **ISO 8583**: Financial transaction messages
- **GS1**: Global standards for supply chain

### 16.2 Industry Resources

- National Retail Federation (NRF)
- Retail Industry Leaders Association (RILA)
- Payment Card Industry Security Standards Council (PCI SSC)
- International Council of Shopping Centers (ICSC)

### 16.3 Technology Platforms

- Shopify, WooCommerce, Magento
- Square POS, Lightspeed, Toast POS
- Salesforce Commerce Cloud
- SAP Commerce Cloud
- Oracle Retail

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA - World Certification Industry Association*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
