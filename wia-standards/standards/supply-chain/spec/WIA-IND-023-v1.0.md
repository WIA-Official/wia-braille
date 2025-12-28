# WIA-IND-023: Supply Chain Standard - Technical Specification v1.0

> **Standard ID:** WIA-IND-023
> **Category:** IND (Industry)
> **Version:** 1.0.0
> **Status:** Active
> **Published:** 2025-12-27
> **Authors:** WIA Industry Standards Group

---

## Abstract

The WIA-IND-023 Supply Chain Standard defines a comprehensive framework for managing end-to-end supply chain operations across global networks. This standard provides data models, APIs, protocols, and best practices for supplier management, procurement automation, order tracking, blockchain-based traceability, risk assessment, demand planning, logistics optimization, and sustainability tracking.

**弘益人間 (Benefit All Humanity)** - This standard aims to create transparent, efficient, and sustainable supply chains that benefit all stakeholders from raw material suppliers to end consumers.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Scope](#2-scope)
3. [Normative References](#3-normative-references)
4. [Terms and Definitions](#4-terms-and-definitions)
5. [Architecture Overview](#5-architecture-overview)
6. [Data Models](#6-data-models)
7. [Supplier Management](#7-supplier-management)
8. [Procurement Automation](#8-procurement-automation)
9. [Order Management](#9-order-management)
10. [Shipment Tracking](#10-shipment-tracking)
11. [Blockchain Traceability](#11-blockchain-traceability)
12. [Supply Chain Visibility](#12-supply-chain-visibility)
13. [Risk Management](#13-risk-management)
14. [Demand Planning](#14-demand-planning)
15. [Logistics Optimization](#15-logistics-optimization)
16. [Sustainability Tracking](#16-sustainability-tracking)
17. [API Specifications](#17-api-specifications)
18. [Security and Privacy](#18-security-and-privacy)
19. [Integration Patterns](#19-integration-patterns)
20. [Compliance and Certification](#20-compliance-and-certification)

---

## 1. Introduction

### 1.1 Purpose

The WIA-IND-023 standard provides a unified framework for supply chain management that enables:

- **Transparency**: Complete visibility across all tiers of the supply chain
- **Automation**: Streamlined procurement and order processing
- **Traceability**: Immutable product provenance using blockchain technology
- **Optimization**: AI-powered demand forecasting and route optimization
- **Sustainability**: Comprehensive carbon footprint and ESG tracking
- **Risk Mitigation**: Proactive identification and management of supply chain risks

### 1.2 Design Principles

1. **Interoperability**: Compatible with existing ERP, WMS, and TMS systems
2. **Scalability**: Support for small businesses to global enterprises
3. **Modularity**: Adopt individual components or full stack
4. **Real-time**: Live tracking and instant notifications
5. **Data-driven**: Analytics and AI for predictive insights
6. **Security**: End-to-end encryption and access control
7. **Sustainability**: Built-in carbon accounting and ESG compliance

### 1.3 Benefits

**For Manufacturers:**
- Reduced lead times and inventory costs
- Improved supplier relationships
- Better demand forecasting
- Enhanced quality control

**For Suppliers:**
- Streamlined order processing
- Predictable demand patterns
- Performance visibility
- Fair evaluation metrics

**For Distributors:**
- Optimized routing and warehousing
- Real-time inventory visibility
- Reduced shipping costs
- Improved delivery accuracy

**For Retailers:**
- Product authenticity verification
- Faster restocking
- Better customer experience
- Sustainability transparency

**For Consumers:**
- Product provenance verification
- Ethical sourcing confidence
- Sustainability information
- Quality assurance

---

## 2. Scope

### 2.1 In Scope

This standard covers:

- Supplier onboarding, evaluation, and management
- Purchase order creation, approval, and tracking
- Multi-tier supplier visibility
- Real-time shipment tracking across all modes
- Blockchain-based product provenance
- Supplier risk assessment and mitigation
- Demand forecasting and inventory optimization
- Route optimization and cost reduction
- Carbon footprint calculation and ESG scoring
- API specifications for system integration
- Data formats and exchange protocols

### 2.2 Out of Scope

The following are not covered by this standard:

- Internal manufacturing operations (see WIA-MFG standards)
- Warehouse management systems (see WIA-WMS standards)
- Financial accounting and payments (see WIA-FIN standards)
- Human resources management (see WIA-HR standards)
- Product design and development (see WIA-PLM standards)

---

## 3. Normative References

The following standards and specifications are referenced in this document:

- **ISO 28000** - Supply chain security management
- **ISO 9001** - Quality management systems
- **ISO 14001** - Environmental management systems
- **GS1 Standards** - Global supply chain standards
- **EDIFACT** - Electronic data interchange
- **GHG Protocol** - Greenhouse gas accounting
- **WIA-BLOCKCHAIN** - Blockchain traceability standard
- **WIA-API** - API design and security standard
- **WIA-IOT** - Internet of Things integration standard
- **INCOTERMS 2020** - International commercial terms
- **HS Code** - Harmonized commodity description and coding system

---

## 4. Terms and Definitions

### 4.1 Supply Chain Terms

**Supply Chain**: The network of organizations involved in producing and delivering a product from raw materials to end customer.

**Tier 1 Supplier**: Direct supplier to the manufacturer or buyer.

**Tier 2 Supplier**: Supplier to Tier 1 supplier (indirect supplier).

**Lead Time**: Time between order placement and delivery.

**Safety Stock**: Extra inventory held to prevent stockouts.

**Reorder Point**: Inventory level triggering new purchase order.

**Economic Order Quantity (EOQ)**: Optimal order quantity minimizing total costs.

**Fill Rate**: Percentage of customer demand met from available stock.

**Perfect Order**: Order delivered complete, on-time, damage-free, with correct documentation.

**Cash-to-Cash Cycle**: Time from paying suppliers to receiving payment from customers.

### 4.2 Logistics Terms

**Incoterms**: International commercial terms defining shipping responsibilities.

**Bill of Lading (BOL)**: Document detailing shipment contents and terms.

**Customs Broker**: Agent facilitating customs clearance.

**Drayage**: Short-distance transport of goods.

**Cross-Docking**: Direct transfer from inbound to outbound without warehousing.

**Last Mile**: Final delivery leg to end destination.

**Freight Forwarder**: Company arranging storage and shipping on behalf of shippers.

### 4.3 Risk Terms

**Supply Chain Risk**: Potential disruption to supply chain operations.

**Single Source Risk**: Dependency on one supplier for critical items.

**Geopolitical Risk**: Risk from political instability or trade restrictions.

**Force Majeure**: Unforeseeable circumstances preventing contract fulfillment.

**Business Continuity Plan (BCP)**: Strategy for maintaining operations during disruptions.

### 4.4 Sustainability Terms

**Carbon Footprint**: Total greenhouse gas emissions caused by an activity.

**Scope 1/2/3 Emissions**: Direct, indirect energy, and value chain emissions.

**ESG**: Environmental, Social, and Governance factors.

**Circular Economy**: Economic system aimed at eliminating waste.

**Life Cycle Assessment (LCA)**: Environmental impact analysis across product lifecycle.

---

## 5. Architecture Overview

### 5.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   WIA Supply Chain Platform                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Supplier   │  │ Procurement  │  │    Order     │      │
│  │  Management  │  │  Automation  │  │  Management  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Shipment   │  │  Blockchain  │  │   Supply     │      │
│  │   Tracking   │  │ Traceability │  │ Chain Viz    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     Risk     │  │    Demand    │  │  Logistics   │      │
│  │  Management  │  │   Planning   │  │ Optimization │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │        Sustainability & ESG Tracking             │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                      Integration Layer                        │
│   REST API │ GraphQL │ Webhooks │ Event Streams             │
├─────────────────────────────────────────────────────────────┤
│                       Data Layer                              │
│   RDBMS │ Document DB │ Time Series │ Blockchain            │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Component Responsibilities

#### Supplier Management
- Supplier onboarding and qualification
- Performance tracking and scorecarding
- Certification management
- Contract management
- Supplier risk profiling

#### Procurement Automation
- Automated RFQ/RFP generation
- Bid comparison and evaluation
- Approval workflow automation
- Contract generation
- Purchase order automation

#### Order Management
- Order creation and validation
- Multi-tier order visibility
- Order status tracking
- Change order management
- Invoice reconciliation

#### Shipment Tracking
- Real-time location tracking
- Multi-modal transport support
- ETA prediction
- Exception management
- Delivery confirmation

#### Blockchain Traceability
- Product provenance recording
- Authenticity verification
- Tamper-proof audit trails
- Smart contract integration
- NFT-based certificates

#### Supply Chain Visibility
- Multi-tier network mapping
- Real-time status dashboards
- Bottleneck identification
- Collaboration tools
- Document sharing

#### Risk Management
- Risk factor identification
- Risk scoring and prioritization
- Mitigation strategy generation
- Alternative supplier recommendations
- Continuous monitoring

#### Demand Planning
- Historical trend analysis
- Seasonal pattern detection
- Machine learning forecasting
- What-if scenario modeling
- Collaborative planning

#### Logistics Optimization
- Route optimization
- Load planning
- Carrier selection
- Cost optimization
- Carbon-efficient routing

#### Sustainability Tracking
- Carbon footprint calculation
- ESG metric collection
- Compliance monitoring
- Sustainability reporting
- Circular economy tracking

---

## 6. Data Models

### 6.1 Core Entities

#### 6.1.1 Supplier

```json
{
  "id": "string",
  "name": "string",
  "legalName": "string",
  "tier": 1-5,
  "status": "active|inactive|pending|suspended|blacklisted",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "postalCode": "string",
    "country": "string",
    "countryCode": "string",
    "coordinates": {
      "latitude": "number",
      "longitude": "number"
    }
  },
  "contacts": [{
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string",
    "isPrimary": "boolean"
  }],
  "rating": "number (0-5)",
  "certifications": ["ISO9001", "ISO14001", ...],
  "financialScore": "number (0-100)",
  "esgScore": "number (0-100)",
  "riskScore": "number (0-100)",
  "categories": ["string"],
  "paymentTerms": "string",
  "leadTimeDays": "number",
  "moq": "number",
  "currency": "string",
  "contractStart": "ISO 8601 datetime",
  "contractEnd": "ISO 8601 datetime",
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime"
}
```

#### 6.1.2 Purchase Order

```json
{
  "id": "string",
  "poNumber": "string",
  "supplier": {
    "id": "string",
    "name": "string",
    "address": { }
  },
  "buyer": {
    "id": "string",
    "name": "string",
    "address": { }
  },
  "status": "draft|pending_approval|approved|sent|acknowledged|in_production|ready_to_ship|shipped|delivered|completed|cancelled|disputed",
  "items": [{
    "lineNumber": "number",
    "sku": "string",
    "description": "string",
    "quantity": "number",
    "uom": "string",
    "unitPrice": "number",
    "lineTotal": "number",
    "requestedDate": "ISO 8601 datetime",
    "confirmedDate": "ISO 8601 datetime",
    "tax": "number",
    "discount": "number",
    "category": "string",
    "hsCode": "string",
    "countryOfOrigin": "string",
    "blockchainHash": "string"
  }],
  "subtotal": "number",
  "tax": "number",
  "shipping": "number",
  "total": "number",
  "currency": "string",
  "paymentTerms": "string",
  "deliveryAddress": { },
  "requestedDeliveryDate": "ISO 8601 datetime",
  "confirmedDeliveryDate": "ISO 8601 datetime",
  "incoterms": "string",
  "notes": "string",
  "createdBy": "string",
  "approvedBy": "string",
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime",
  "shipmentIds": ["string"]
}
```

#### 6.1.3 Shipment

```json
{
  "id": "string",
  "trackingNumber": "string",
  "purchaseOrderId": "string",
  "carrier": {
    "id": "string",
    "name": "string",
    "service": "string"
  },
  "mode": "air|sea|road|rail|multimodal",
  "status": "pending|picked_up|in_transit|customs_clearance|out_for_delivery|delivered|exception|returned|cancelled",
  "origin": {
    "address": { },
    "departureDate": "ISO 8601 datetime"
  },
  "destination": {
    "address": { },
    "arrivalDate": "ISO 8601 datetime"
  },
  "currentLocation": {
    "name": "string",
    "coordinates": { },
    "timestamp": "ISO 8601 datetime"
  },
  "eta": "ISO 8601 datetime",
  "actualDelivery": "ISO 8601 datetime",
  "events": [{
    "timestamp": "ISO 8601 datetime",
    "type": "string",
    "location": { },
    "description": "string",
    "handledBy": "string",
    "temperature": "number",
    "humidity": "number",
    "damageNoted": "boolean",
    "notes": "string"
  }],
  "packages": [{
    "packageId": "string",
    "weight": "number",
    "weightUnit": "string",
    "dimensions": {
      "length": "number",
      "width": "number",
      "height": "number",
      "unit": "string"
    },
    "contents": "string"
  }],
  "customs": {
    "declarationNumber": "string",
    "value": "number",
    "currency": "string",
    "cleared": "boolean",
    "clearedDate": "ISO 8601 datetime"
  },
  "insurance": {
    "provider": "string",
    "value": "number",
    "currency": "string",
    "policyNumber": "string"
  },
  "temperatureControl": {
    "required": "boolean",
    "minTemp": "number",
    "maxTemp": "number",
    "unit": "C|F",
    "currentTemp": "number"
  },
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime"
}
```

#### 6.1.4 Product Provenance

```json
{
  "sku": "string",
  "serialNumber": "string",
  "network": "ethereum|polygon|hyperledger|private",
  "contractAddress": "string",
  "tokenId": "string",
  "origin": {
    "manufacturer": "string",
    "location": { },
    "date": "ISO 8601 datetime"
  },
  "journey": [{
    "id": "string",
    "stage": "origin|manufacturing|quality_check|packaging|warehouse|shipping|distribution|retail|consumer",
    "timestamp": "ISO 8601 datetime",
    "location": { },
    "txHash": "string",
    "blockNumber": "number",
    "data": { },
    "verifiedBy": "string",
    "certifications": ["string"]
  }],
  "currentOwner": "string",
  "isAuthentic": "boolean",
  "verifiedAt": "ISO 8601 datetime",
  "carbonFootprint": "number",
  "sustainabilityCerts": ["string"]
}
```

---

## 7. Supplier Management

### 7.1 Supplier Onboarding

#### 7.1.1 Registration Process

1. **Initial Contact**: Supplier submits registration form
2. **Document Collection**: Collect required documents
   - Business license
   - Tax registration
   - Bank details
   - Insurance certificates
   - Quality certifications
   - Safety certifications
3. **Due Diligence**: Verify supplier information
   - Credit check
   - Reference verification
   - Facility audit (if required)
   - Compliance verification
4. **Risk Assessment**: Evaluate supplier risk profile
5. **Approval**: Final approval by procurement team
6. **Onboarding**: System setup and training

#### 7.1.2 Required Certifications

**Quality Certifications:**
- ISO 9001 (Quality Management)
- ISO/TS 16949 (Automotive)
- AS9100 (Aerospace)
- ISO 13485 (Medical Devices)

**Environmental Certifications:**
- ISO 14001 (Environmental Management)
- ISO 50001 (Energy Management)
- FSC (Forest Stewardship Council)

**Social Certifications:**
- SA8000 (Social Accountability)
- BSCI (Business Social Compliance)
- Fair Trade

**Safety Certifications:**
- ISO 45001 (Occupational Health & Safety)
- OHSAS 18001

**Security Certifications:**
- ISO 28000 (Supply Chain Security)
- ISO 27001 (Information Security)

### 7.2 Supplier Evaluation

#### 7.2.1 Performance Metrics

**Quality Metrics:**
- Defect rate (PPM - parts per million)
- First pass yield
- Return rate
- Warranty claims
- Customer complaints

**Delivery Metrics:**
- On-time delivery rate
- Lead time compliance
- Order fill rate
- Schedule adherence
- Emergency response time

**Cost Metrics:**
- Price competitiveness
- Cost reduction initiatives
- Payment terms compliance
- Currency stability
- Total cost of ownership

**Innovation Metrics:**
- New product development
- Process improvements
- Technology adoption
- Sustainability initiatives
- Collaboration level

**Compliance Metrics:**
- Audit results
- Certification status
- Legal compliance
- Ethical standards
- Environmental compliance

#### 7.2.2 Scorecard Formula

```
Overall Score =
  (Quality × 30%) +
  (Delivery × 25%) +
  (Cost × 20%) +
  (Innovation × 15%) +
  (Compliance × 10%)

Rating Scale:
  4.5 - 5.0: Excellent (Preferred Supplier)
  4.0 - 4.4: Good (Approved Supplier)
  3.0 - 3.9: Acceptable (Conditional Approval)
  2.0 - 2.9: Poor (Improvement Required)
  0.0 - 1.9: Unacceptable (Probation/Termination)
```

### 7.3 Supplier Development

#### 7.3.1 Improvement Programs

- **Quality Improvement**: Six Sigma, Kaizen, Lean Manufacturing
- **Capacity Building**: Training, technology transfer
- **Sustainability**: Carbon reduction, waste minimization
- **Innovation**: Joint product development, process optimization
- **Compliance**: Audit support, certification assistance

#### 7.3.2 Collaboration Models

- **Strategic Partnership**: Long-term collaboration with shared goals
- **Preferred Supplier**: Priority status with volume commitments
- **Approved Supplier**: Standard relationship with regular monitoring
- **Conditional Supplier**: Probationary status with improvement plan
- **Blacklisted**: Terminated relationship due to severe issues

---

## 8. Procurement Automation

### 8.1 Purchase Requisition

#### 8.1.1 Requisition Creation

```json
{
  "requisitionId": "REQ-2025-001234",
  "requestedBy": "user_id",
  "department": "Manufacturing",
  "priority": "normal|urgent|critical",
  "items": [{
    "materialId": "MAT-5678",
    "description": "Industrial Motor 5HP",
    "quantity": 10,
    "uom": "EA",
    "estimatedCost": 1200.00,
    "requiredDate": "2025-12-30",
    "purpose": "Production line maintenance",
    "accountCode": "5000-123-456"
  }],
  "justification": "string",
  "attachments": ["url"],
  "createdAt": "2025-12-27T10:30:00Z"
}
```

#### 8.1.2 Approval Workflow

```
Requisition Created
    ↓
Manager Approval (< $10,000)
    ↓
Department Head Approval (< $50,000)
    ↓
Director Approval (< $100,000)
    ↓
VP/CFO Approval (≥ $100,000)
    ↓
Procurement Processing
    ↓
PO Generation
```

### 8.2 Supplier Selection

#### 8.2.1 RFQ Process

1. **RFQ Creation**: Define requirements and specifications
2. **Supplier Shortlist**: Select qualified suppliers
3. **RFQ Distribution**: Send RFQ to selected suppliers
4. **Bid Collection**: Receive and log supplier bids
5. **Bid Evaluation**: Compare bids across criteria
6. **Negotiation**: Negotiate with top candidates
7. **Award**: Select winning supplier
8. **PO Generation**: Create purchase order

#### 8.2.2 Evaluation Criteria

```
Total Score =
  (Price × 40%) +
  (Quality × 25%) +
  (Delivery × 20%) +
  (Service × 10%) +
  (Sustainability × 5%)
```

### 8.3 Contract Management

#### 8.3.1 Contract Types

- **Blanket PO**: Open-ended order with release schedule
- **Framework Agreement**: Master agreement with call-offs
- **Spot Buy**: One-time purchase
- **Long-term Contract**: Multi-year agreement
- **Consignment**: Supplier-owned inventory on-site

#### 8.3.2 Contract Terms

- **Pricing**: Fixed, variable, tiered, cost-plus
- **Payment**: NET30, NET60, advance payment, progress payments
- **Incoterms**: FOB, CIF, DDP, EXW, FCA
- **Warranties**: Standard, extended, as-is
- **SLA**: Response time, resolution time, uptime
- **Penalties**: Late delivery, quality issues, breach
- **Termination**: Notice period, conditions, penalties

---

## 9. Order Management

### 9.1 Order Lifecycle

```
Draft → Pending Approval → Approved → Sent → Acknowledged →
In Production → Ready to Ship → Shipped → Delivered →
Received → Quality Check → Accepted → Completed
```

### 9.2 Order Status Definitions

- **Draft**: Order created but not submitted
- **Pending Approval**: Awaiting authorization
- **Approved**: Approved and ready to send
- **Sent**: Transmitted to supplier
- **Acknowledged**: Supplier confirmed receipt
- **In Production**: Manufacturing in progress
- **Ready to Ship**: Completed and awaiting pickup
- **Shipped**: In transit to destination
- **Delivered**: Arrived at destination
- **Received**: Physically received and logged
- **Quality Check**: Under inspection
- **Accepted**: Passed inspection, ready for use
- **Completed**: Closed and archived
- **Cancelled**: Order cancelled
- **Disputed**: Issue under resolution

### 9.3 Change Management

#### 9.3.1 Change Order Process

1. **Change Request**: Initiate change (qty, date, specs)
2. **Impact Analysis**: Assess cost and schedule impact
3. **Supplier Approval**: Get supplier confirmation
4. **Internal Approval**: Get management approval
5. **PO Amendment**: Update purchase order
6. **Confirmation**: Supplier acknowledges change
7. **Implementation**: Execute changed order

#### 9.3.2 Cancellation Policy

- **Before Acknowledgement**: Full refund, no penalty
- **After Acknowledgement**: Cancellation fee applies
- **In Production**: Restocking fee + work completed
- **Shipped**: Return shipping + restocking fee

---

## 10. Shipment Tracking

### 10.1 Tracking Modes

#### 10.1.1 Air Freight

- **Tracking Events**: Booked, received, departed, in-transit, arrived, customs, delivered
- **Update Frequency**: Every 6 hours minimum
- **ETA Accuracy**: ±2 hours
- **Typical Duration**: 1-5 days international

#### 10.1.2 Ocean Freight

- **Tracking Events**: Booked, loaded, departed port, in-transit, arrived port, discharged, customs, delivered
- **Update Frequency**: Daily
- **ETA Accuracy**: ±1 day
- **Typical Duration**: 15-45 days international

#### 10.1.3 Road Transport

- **Tracking Events**: Picked up, in-transit, rest stop, refueling, delivered
- **Update Frequency**: Real-time (GPS)
- **ETA Accuracy**: ±30 minutes
- **Typical Duration**: 1-7 days domestic

#### 10.1.4 Rail Transport

- **Tracking Events**: Loaded, departed, in-transit, arrived, unloaded
- **Update Frequency**: Every 12 hours
- **ETA Accuracy**: ±4 hours
- **Typical Duration**: 5-15 days

### 10.2 Real-time Tracking

#### 10.2.1 GPS Tracking

```json
{
  "shipmentId": "SHIP-2025-001234",
  "currentLocation": {
    "latitude": 22.3080,
    "longitude": 113.9185,
    "altitude": 5.2,
    "accuracy": 10,
    "speed": 65,
    "heading": 285
  },
  "timestamp": "2025-12-27T14:30:00Z",
  "nextCheckpoint": {
    "name": "Los Angeles Airport",
    "eta": "2025-12-28T08:00:00Z",
    "distance": 11250
  }
}
```

#### 10.2.2 IoT Sensors

**Temperature Monitoring** (Cold Chain):
```json
{
  "sensorId": "TEMP-5678",
  "shipmentId": "SHIP-2025-001234",
  "readings": [{
    "timestamp": "2025-12-27T14:30:00Z",
    "temperature": 2.5,
    "unit": "C",
    "status": "normal",
    "alert": false
  }],
  "thresholds": {
    "min": 2.0,
    "max": 8.0,
    "alertDelay": 300
  }
}
```

**Shock/Vibration Monitoring**:
```json
{
  "sensorId": "SHOCK-9012",
  "shipmentId": "SHIP-2025-001234",
  "readings": [{
    "timestamp": "2025-12-27T14:30:00Z",
    "force": 2.5,
    "unit": "G",
    "duration": 50,
    "axis": "vertical",
    "alert": false
  }],
  "threshold": {
    "max": 5.0,
    "duration": 100
  }
}
```

### 10.3 Exception Management

#### 10.3.1 Exception Types

- **Delay**: Shipment behind schedule
- **Damage**: Package damage detected
- **Lost**: Package missing or unaccounted
- **Customs Hold**: Held by customs
- **Weather**: Delayed due to weather
- **Mechanical**: Vehicle breakdown
- **Security**: Security incident
- **Documentation**: Missing or incorrect documents

#### 10.3.2 Exception Handling

```
Exception Detected
    ↓
Auto-notification (Email/SMS/Webhook)
    ↓
Impact Assessment (Delivery date, cost)
    ↓
Mitigation Plan (Expedite, reroute, replace)
    ↓
Stakeholder Communication
    ↓
Resolution Tracking
    ↓
Post-incident Review
```

---

## 11. Blockchain Traceability

### 11.1 Architecture

```
┌─────────────────────────────────────────────────┐
│         Supply Chain Applications               │
├─────────────────────────────────────────────────┤
│              WIA-IND-023 SDK                    │
├─────────────────────────────────────────────────┤
│          Smart Contract Layer                   │
│  (Product Registry, Transfer, Verification)     │
├─────────────────────────────────────────────────┤
│         Blockchain Network                      │
│  (Ethereum / Polygon / Hyperledger)            │
└─────────────────────────────────────────────────┘
```

### 11.2 Smart Contracts

#### 11.2.1 Product Registry Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductRegistry {
    struct Product {
        string sku;
        string serialNumber;
        address manufacturer;
        uint256 manufactureDate;
        string origin;
        bool isAuthentic;
    }

    mapping(bytes32 => Product) public products;
    mapping(bytes32 => Checkpoint[]) public journey;

    struct Checkpoint {
        string stage;
        uint256 timestamp;
        string location;
        address verifiedBy;
        string metadata;
    }

    event ProductRegistered(bytes32 indexed productId, string sku);
    event CheckpointAdded(bytes32 indexed productId, string stage);

    function registerProduct(
        string memory _sku,
        string memory _serialNumber,
        string memory _origin
    ) public returns (bytes32) {
        bytes32 productId = keccak256(abi.encodePacked(_sku, _serialNumber));

        products[productId] = Product({
            sku: _sku,
            serialNumber: _serialNumber,
            manufacturer: msg.sender,
            manufactureDate: block.timestamp,
            origin: _origin,
            isAuthentic: true
        });

        emit ProductRegistered(productId, _sku);
        return productId;
    }

    function addCheckpoint(
        bytes32 _productId,
        string memory _stage,
        string memory _location,
        string memory _metadata
    ) public {
        require(products[_productId].isAuthentic, "Product not found");

        journey[_productId].push(Checkpoint({
            stage: _stage,
            timestamp: block.timestamp,
            location: _location,
            verifiedBy: msg.sender,
            metadata: _metadata
        }));

        emit CheckpointAdded(_productId, _stage);
    }

    function verifyProduct(bytes32 _productId) public view returns (
        bool isAuthentic,
        string memory sku,
        address manufacturer,
        uint256 checkpoints
    ) {
        Product memory product = products[_productId];
        return (
            product.isAuthentic,
            product.sku,
            product.manufacturer,
            journey[_productId].length
        );
    }
}
```

### 11.3 Provenance Recording

#### 11.3.1 Checkpoint Stages

1. **Origin**: Raw material sourcing
2. **Manufacturing**: Production and assembly
3. **Quality Check**: Inspection and testing
4. **Packaging**: Final packaging
5. **Warehouse**: Storage and inventory
6. **Shipping**: Transportation
7. **Distribution**: Regional distribution
8. **Retail**: Point of sale
9. **Consumer**: End user delivery

#### 11.3.2 Data Structure

```json
{
  "checkpoint": {
    "id": "cp_12345",
    "productId": "0x7f8c...",
    "stage": "manufacturing",
    "timestamp": "2025-12-27T10:00:00Z",
    "location": {
      "name": "Factory Floor 3",
      "facility": "Shenzhen Plant",
      "address": {
        "city": "Shenzhen",
        "country": "China",
        "coordinates": {
          "latitude": 22.5431,
          "longitude": 114.0579
        }
      }
    },
    "verifiedBy": "0x1234...",
    "data": {
      "batchNumber": "BATCH-2025-001",
      "operator": "OP-5678",
      "equipment": "LINE-A-03",
      "qualityScore": 98.5,
      "temperature": 22.5,
      "humidity": 45
    },
    "certifications": ["ISO9001", "IATF16949"],
    "blockchain": {
      "network": "polygon",
      "txHash": "0xabc...",
      "blockNumber": 45678901,
      "gasUsed": 125000,
      "confirmations": 12
    },
    "attachments": [
      "ipfs://Qm.../quality-report.pdf",
      "ipfs://Qm.../inspection-photos.zip"
    ]
  }
}
```

### 11.4 Verification Process

#### 11.4.1 QR Code Verification

```
Consumer scans QR code on product
    ↓
Mobile app extracts product ID
    ↓
Query blockchain for product record
    ↓
Retrieve full journey history
    ↓
Verify authenticity (hash validation)
    ↓
Display provenance information
    ↓
Show certifications and origin
```

#### 11.4.2 API Verification

```bash
POST /api/v1/verify
{
  "sku": "CHIP-A100",
  "serialNumber": "SN-12345",
  "blockchainHash": "0x7f8c..."
}

Response:
{
  "isAuthentic": true,
  "confidence": 0.99,
  "product": {
    "sku": "CHIP-A100",
    "name": "Industrial Microchip A100",
    "manufacturer": "Quality Tech Inc.",
    "manufactureDate": "2025-11-15"
  },
  "origin": {
    "country": "Taiwan",
    "facility": "Hsinchu Fab 5"
  },
  "journey": [
    {
      "stage": "manufacturing",
      "date": "2025-11-15",
      "location": "Hsinchu, Taiwan",
      "verified": true
    },
    {
      "stage": "quality_check",
      "date": "2025-11-16",
      "location": "QC Lab, Taiwan",
      "verified": true
    },
    ...
  ],
  "certifications": ["ISO9001", "RoHS", "CE"],
  "carbonFootprint": 1.2,
  "blockchainVerification": {
    "network": "polygon",
    "txHash": "0x7f8c...",
    "verified": true,
    "checkpoints": 7
  }
}
```

---

## 12. Supply Chain Visibility

### 12.1 Multi-Tier Visibility

#### 12.1.1 Network Mapping

```
                    [Raw Material Suppliers]
                            Tier 3
                              ↓
                    [Component Manufacturers]
                            Tier 2
                              ↓
                    [Sub-Assembly Suppliers]
                            Tier 1
                              ↓
                        [OEM/Buyer]
                              ↓
                        [Distributors]
                              ↓
                          [Retailers]
                              ↓
                        [End Consumers]
```

#### 12.1.2 Visibility Levels

**Level 1** (Direct Suppliers):
- Real-time order status
- Production schedules
- Quality metrics
- Delivery tracking
- Invoice status

**Level 2** (Sub-tier Suppliers):
- Order acknowledgement
- Estimated delivery
- Capacity constraints
- Quality certifications

**Level 3+** (Deep tier):
- Supplier identification
- Geographic location
- Risk factors
- Certifications

### 12.2 Dashboard Metrics

#### 12.2.1 Executive Dashboard

- **Order Value**: Total PO value by period
- **Supplier Count**: Active suppliers by tier
- **On-Time Delivery**: OTD% trend
- **Quality Performance**: Defect rate trend
- **Risk Exposure**: High-risk suppliers
- **Sustainability**: Carbon footprint
- **Cost Savings**: Year-over-year comparison

#### 12.2.2 Operational Dashboard

- **Open Orders**: Count by status
- **Shipments in Transit**: Real-time map
- **Delays**: Shipments behind schedule
- **Exceptions**: Active issues
- **Inventory Levels**: Current stock by SKU
- **Incoming**: Expected receipts next 7 days
- **Backorders**: Outstanding orders

---

## 13. Risk Management

### 13.1 Risk Categories

#### 13.1.1 Supplier Risk

**Financial Risk**:
- Credit rating
- Payment history
- Financial ratios
- Bankruptcy probability

**Operational Risk**:
- Capacity utilization
- Quality history
- Delivery performance
- Technology capability

**Compliance Risk**:
- Regulatory violations
- Certification expiry
- Audit findings
- Legal disputes

#### 13.1.2 Geographic Risk

**Geopolitical Risk**:
- Political stability index
- Trade restrictions
- Sanctions
- Conflicts

**Natural Disaster Risk**:
- Earthquake zones
- Hurricane/typhoon paths
- Flood plains
- Wildfire areas

**Infrastructure Risk**:
- Port congestion
- Road conditions
- Power stability
- Internet connectivity

#### 13.1.3 Demand Risk

**Market Risk**:
- Demand volatility
- Seasonality
- Competition
- Economic conditions

**Forecast Risk**:
- Forecast accuracy
- Lead time variability
- Bullwhip effect
- Obsolescence

### 13.2 Risk Scoring Algorithm

```python
def calculate_risk_score(supplier_id):
    # Get risk factors
    financial_score = get_financial_score(supplier_id)      # 0-100
    operational_score = get_operational_score(supplier_id)  # 0-100
    compliance_score = get_compliance_score(supplier_id)    # 0-100
    geo_risk = get_geopolitical_risk(supplier_id)          # 0-100

    # Weights
    weights = {
        'financial': 0.30,
        'operational': 0.25,
        'compliance': 0.20,
        'geopolitical': 0.15,
        'concentration': 0.10
    }

    # Calculate weighted score (inverse - higher score = lower risk)
    risk_score = 100 - (
        financial_score * weights['financial'] +
        operational_score * weights['operational'] +
        compliance_score * weights['compliance'] +
        geo_risk * weights['geopolitical'] +
        concentration_score * weights['concentration']
    )

    # Classify risk level
    if risk_score < 20:
        level = 'LOW'
    elif risk_score < 40:
        level = 'MEDIUM'
    elif risk_score < 60:
        level = 'HIGH'
    else:
        level = 'CRITICAL'

    return {
        'score': risk_score,
        'level': level,
        'factors': {
            'financial': financial_score,
            'operational': operational_score,
            'compliance': compliance_score,
            'geopolitical': geo_risk
        }
    }
```

### 13.3 Mitigation Strategies

#### 13.3.1 Supplier Diversification

- **Dual Sourcing**: Two suppliers for critical items
- **Multi Sourcing**: Multiple suppliers for high-volume items
- **Geographic Diversification**: Suppliers in different regions
- **Vertical Integration**: Bring critical capabilities in-house

#### 13.3.2 Inventory Strategies

- **Safety Stock**: Buffer inventory for critical items
- **Strategic Inventory**: Pre-positioning for long lead items
- **Vendor Managed Inventory**: Supplier-owned stock on-site
- **Consignment**: Supplier inventory until consumption

#### 13.3.3 Contractual Protections

- **Force Majeure Clauses**: Protection for unforeseeable events
- **Performance Bonds**: Financial guarantee of performance
- **Penalty Clauses**: Penalties for non-performance
- **Alternative Supply**: Right to source elsewhere if needed

---

## 14. Demand Planning

### 14.1 Forecasting Methods

#### 14.1.1 Time Series Methods

**Moving Average**:
```
MA(t) = (D(t-1) + D(t-2) + ... + D(t-n)) / n
```

**Exponential Smoothing**:
```
F(t) = α × D(t-1) + (1-α) × F(t-1)
```
Where α = smoothing constant (0-1)

**Holt-Winters (Seasonal)**:
```
Level: L(t) = α × (D(t)/S(t-s)) + (1-α) × (L(t-1) + T(t-1))
Trend: T(t) = β × (L(t) - L(t-1)) + (1-β) × T(t-1)
Season: S(t) = γ × (D(t)/L(t)) + (1-γ) × S(t-s)
Forecast: F(t+m) = (L(t) + m×T(t)) × S(t+m-s)
```

#### 14.1.2 Causal Methods

**Regression Analysis**:
```
Demand = β0 + β1×Price + β2×Marketing + β3×Economy + ε
```

**Machine Learning**:
- Random Forest
- Gradient Boosting
- Neural Networks (LSTM, GRU)
- Prophet (Facebook's algorithm)

### 14.2 Forecast Accuracy Metrics

**Mean Absolute Percentage Error (MAPE)**:
```
MAPE = (100/n) × Σ|Actual - Forecast| / Actual
```

**Root Mean Squared Error (RMSE)**:
```
RMSE = √(Σ(Actual - Forecast)² / n)
```

**Bias**:
```
Bias = Σ(Actual - Forecast) / n
```

**Tracking Signal**:
```
TS = Cumulative Error / MAD
```
Where MAD = Mean Absolute Deviation

### 14.3 Inventory Optimization

#### 14.3.1 Economic Order Quantity (EOQ)

```
EOQ = √((2 × D × S) / H)

Where:
D = Annual demand
S = Order cost per order
H = Holding cost per unit per year
```

#### 14.3.2 Reorder Point (ROP)

```
ROP = (Average Daily Demand × Lead Time) + Safety Stock

Safety Stock = Z × σ × √Lead Time

Where:
Z = Service level factor (e.g., 1.65 for 95% service level)
σ = Standard deviation of demand
```

#### 14.3.3 ABC Analysis

**Class A** (20% of items, 80% of value):
- Tight inventory control
- Frequent review
- Accurate forecasting
- Low safety stock

**Class B** (30% of items, 15% of value):
- Moderate control
- Regular review
- Standard forecasting

**Class C** (50% of items, 5% of value):
- Simple controls
- Periodic review
- High safety stock
- Bulk orders

---

## 15. Logistics Optimization

### 15.1 Route Optimization

#### 15.1.1 Vehicle Routing Problem (VRP)

```
Minimize: Total Distance (or Cost or Time)

Subject to:
- Each customer visited exactly once
- Vehicle capacity not exceeded
- Time windows respected
- Maximum route duration not exceeded
```

**Algorithms**:
- Clarke-Wright Savings
- Genetic Algorithm
- Simulated Annealing
- Ant Colony Optimization
- Google OR-Tools

#### 15.1.2 Multi-Objective Optimization

```
Objective Function =
  w1 × Cost +
  w2 × Time +
  w3 × Carbon Emissions +
  w4 × Reliability

Where w1 + w2 + w3 + w4 = 1
```

### 15.2 Mode Selection

#### 15.2.1 Cost Comparison

| Mode | Cost/kg/km | Speed | Carbon | Reliability |
|------|-----------|-------|--------|-------------|
| Air | $0.50-2.00 | Fast | High | Very High |
| Ocean | $0.01-0.05 | Slow | Low | Medium |
| Road | $0.10-0.30 | Medium | Medium | High |
| Rail | $0.05-0.15 | Medium | Low | Medium |

#### 15.2.2 Selection Criteria

**Urgent (Express)**:
- Mode: Air
- Priority: Speed
- Cost: High
- Use cases: Emergency parts, perishables, high-value

**Standard**:
- Mode: Road/Rail
- Priority: Balanced
- Cost: Medium
- Use cases: Regular shipments, domestic

**Economy**:
- Mode: Ocean
- Priority: Cost
- Cost: Low
- Use cases: Bulk commodities, non-urgent

### 15.3 Load Planning

#### 15.3.1 Container Optimization

**20ft Container**: 33 CBM, 28,200 kg max
**40ft Container**: 67 CBM, 28,800 kg max
**40ft HC**: 76 CBM, 28,600 kg max

**Bin Packing Algorithm**:
```
For each item:
  Find smallest bin with sufficient space
  If no bin found:
    Open new bin
  Place item in bin
  Update remaining capacity
```

#### 15.3.2 Weight Distribution

```
Center of Gravity = Σ(Weight × Distance) / Total Weight

Requirements:
- Max weight per axle
- Balanced left-right
- Heavy items on bottom
- Fragile items protected
```

---

## 16. Sustainability Tracking

### 16.1 Carbon Footprint Calculation

#### 16.1.1 Scope 1 (Direct Emissions)

```
Scope 1 = Σ(Fuel Consumption × Emission Factor)

Emission Factors (kg CO2/liter):
- Diesel: 2.68
- Gasoline: 2.31
- Natural Gas: 2.03 kg/m³
```

#### 16.1.2 Scope 2 (Indirect Energy)

```
Scope 2 = Electricity Consumption (kWh) × Grid Emission Factor

Grid Emission Factors (kg CO2/kWh):
- China: 0.555
- USA: 0.417
- EU: 0.296
- Renewables: 0.000
```

#### 16.1.3 Scope 3 (Value Chain)

```
Scope 3 = Σ(Activity Data × Emission Factor)

Categories:
1. Purchased goods and services
2. Capital goods
3. Fuel and energy
4. Upstream transportation
5. Waste generated
6. Business travel
7. Employee commuting
8. Upstream leased assets
9. Downstream transportation
10. Processing of sold products
11. Use of sold products
12. End-of-life treatment
13. Downstream leased assets
14. Franchises
15. Investments
```

#### 16.1.4 Transportation Emissions

```
Transport CO2 =
  (Weight in tonnes × Distance in km × Emission Factor) /
  Load Factor

Emission Factors (g CO2/tonne-km):
- Air: 500
- Ocean: 15
- Road: 62
- Rail: 28
```

### 16.2 ESG Scoring

#### 16.2.1 Environmental Score (E)

**Metrics** (Weight):
- Carbon footprint (25%)
- Renewable energy use (20%)
- Waste reduction (15%)
- Water consumption (15%)
- Recycled materials (15%)
- Biodiversity impact (10%)

**Calculation**:
```
E-Score = Σ(Metric Score × Weight)

Score ranges:
90-100: Leader
70-89: Good
50-69: Moderate
0-49: Laggard
```

#### 16.2.2 Social Score (S)

**Metrics** (Weight):
- Labor practices (30%)
- Health & safety (25%)
- Diversity & inclusion (20%)
- Community impact (15%)
- Human rights (10%)

#### 16.2.3 Governance Score (G)

**Metrics** (Weight):
- Compliance (30%)
- Ethics & transparency (25%)
- Board diversity (20%)
- Risk management (15%)
- Certifications (10%)

#### 16.2.4 Overall ESG Score

```
ESG Score =
  (E-Score × 0.40) +
  (S-Score × 0.30) +
  (G-Score × 0.30)
```

### 16.3 Circular Economy

#### 16.3.1 Product Lifecycle

```
Design → Manufacture → Use → Collect →
Recycle/Refurbish → Reuse → [back to Use]
```

#### 16.3.2 Circularity Metrics

**Material Circularity Indicator (MCI)**:
```
MCI = (Virgin Material / Total Material) × 100

Target: < 20% (80%+ recycled content)
```

**Product Utilization Rate**:
```
Utilization = Actual Use Time / Expected Lifetime

Target: > 80%
```

**Recovery Rate**:
```
Recovery Rate = (Recycled + Reused) / Total End-of-Life

Target: > 90%
```

---

## 17. API Specifications

### 17.1 Authentication

#### 17.1.1 API Key Authentication

```http
GET /api/v1/suppliers
Authorization: Bearer <API_KEY>
```

#### 17.1.2 OAuth 2.0

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=<CLIENT_ID>
&client_secret=<CLIENT_SECRET>

Response:
{
  "access_token": "eyJhbG...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### 17.2 REST API Endpoints

#### 17.2.1 Suppliers

```http
# List suppliers
GET /api/v1/suppliers?page=1&limit=50&status=active

# Get supplier
GET /api/v1/suppliers/{supplierId}

# Create supplier
POST /api/v1/suppliers
Content-Type: application/json
{
  "name": "Supplier Name",
  "tier": 1,
  "address": { },
  ...
}

# Update supplier
PATCH /api/v1/suppliers/{supplierId}

# Get supplier performance
GET /api/v1/suppliers/{supplierId}/performance?period=2025-Q1
```

#### 17.2.2 Purchase Orders

```http
# Create PO
POST /api/v1/orders
{
  "supplierId": "SUP-5678",
  "items": [{
    "sku": "CHIP-A100",
    "quantity": 1000,
    "unitPrice": 45.50
  }],
  ...
}

# Get PO
GET /api/v1/orders/{orderId}

# Update PO status
PATCH /api/v1/orders/{orderId}/status
{
  "status": "approved",
  "approvedBy": "user_123"
}

# List POs
GET /api/v1/orders?status=open&supplierId=SUP-5678
```

#### 17.2.3 Shipments

```http
# Track shipment
GET /api/v1/shipments/{shipmentId}

# Get location
GET /api/v1/shipments/{shipmentId}/location

# List shipments
GET /api/v1/shipments?status=in_transit&carrier=DHL
```

#### 17.2.4 Blockchain Verification

```http
# Verify product
POST /api/v1/verify
{
  "sku": "CHIP-A100",
  "serialNumber": "SN-12345",
  "blockchainHash": "0x7f8c..."
}

# Get provenance
GET /api/v1/provenance/{sku}/{serialNumber}

# Record checkpoint
POST /api/v1/provenance/checkpoint
{
  "sku": "CHIP-A100",
  "serialNumber": "SN-12345",
  "stage": "quality_check",
  "location": "QC Lab",
  "data": { }
}
```

### 17.3 Webhooks

#### 17.3.1 Event Types

- `order.created`
- `order.approved`
- `order.shipped`
- `order.delivered`
- `shipment.in_transit`
- `shipment.delayed`
- `shipment.exception`
- `supplier.risk_change`
- `inventory.low_stock`

#### 17.3.2 Webhook Payload

```json
{
  "event": "shipment.delayed",
  "timestamp": "2025-12-27T14:30:00Z",
  "data": {
    "shipmentId": "SHIP-2025-001234",
    "orderId": "ORD-2025-5678",
    "originalEta": "2025-12-28T10:00:00Z",
    "newEta": "2025-12-29T15:00:00Z",
    "reason": "Weather delay at origin",
    "impact": "24 hour delay"
  },
  "signature": "sha256=..."
}
```

---

## 18. Security and Privacy

### 18.1 Data Security

#### 18.1.1 Encryption

- **In Transit**: TLS 1.3
- **At Rest**: AES-256
- **Database**: Field-level encryption for PII
- **Blockchain**: Public/private key cryptography

#### 18.1.2 Access Control

**Role-Based Access Control (RBAC)**:
- Admin: Full access
- Procurement Manager: Create/approve POs
- Warehouse: Receive shipments
- Finance: View/approve invoices
- Supplier: View own orders only
- Auditor: Read-only access

### 18.2 Data Privacy

#### 18.2.1 Compliance

- **GDPR**: EU data protection
- **CCPA**: California privacy
- **LGPD**: Brazil data protection
- **PIPL**: China privacy law

#### 18.2.2 Data Retention

- **Transactional Data**: 7 years
- **Communication**: 3 years
- **Audit Logs**: 10 years
- **Personal Data**: As required by law or until consent withdrawn

### 18.3 Audit Trail

```json
{
  "auditId": "AUDIT-12345",
  "timestamp": "2025-12-27T14:30:00Z",
  "userId": "user_123",
  "action": "order.approved",
  "resourceType": "PurchaseOrder",
  "resourceId": "ORD-2025-5678",
  "changes": {
    "status": {
      "from": "pending_approval",
      "to": "approved"
    },
    "approvedBy": {
      "from": null,
      "to": "user_123"
    }
  },
  "ipAddress": "203.0.113.42",
  "userAgent": "Mozilla/5.0...",
  "metadata": {
    "approvalReason": "Budget approved",
    "comments": "Expedite delivery"
  }
}
```

---

## 19. Integration Patterns

### 19.1 ERP Integration

#### 19.1.1 SAP Integration

```xml
<!-- IDoc ORDERS05 -->
<ORDERS05>
  <IDOC BEGIN="1">
    <EDI_DC40>
      <DOCNUM>1234567890</DOCNUM>
      <MESTYP>ORDERS</MESTYP>
    </EDI_DC40>
    <E1EDK01>
      <CURCY>USD</CURCY>
      <BELNR>PO-2025-001234</BELNR>
    </E1EDK01>
    <E1EDP01>
      <POSEX>00010</POSEX>
      <MENGE>1000</MENGE>
      <MATNR>CHIP-A100</MATNR>
    </E1EDP01>
  </IDOC>
</ORDERS05>
```

#### 19.1.2 Oracle EBS Integration

```sql
-- Order Interface Table
INSERT INTO PO_HEADERS_INTERFACE (
  interface_header_id,
  batch_id,
  org_id,
  vendor_id,
  vendor_site_id,
  currency_code,
  approved_flag
) VALUES (
  po_headers_interface_s.nextval,
  :batch_id,
  :org_id,
  :vendor_id,
  :vendor_site_id,
  'USD',
  'Y'
);
```

### 19.2 WMS Integration

#### 19.2.1 ASN (Advanced Shipping Notice)

```json
{
  "asnId": "ASN-2025-001234",
  "shipmentId": "SHIP-2025-001234",
  "orderId": "ORD-2025-5678",
  "expectedArrival": "2025-12-28T10:00:00Z",
  "carrier": "DHL",
  "trackingNumber": "1234567890",
  "packages": [{
    "packageId": "PKG-001",
    "weight": 50,
    "dimensions": { },
    "contents": [{
      "sku": "CHIP-A100",
      "quantity": 1000,
      "lotNumber": "LOT-2025-001",
      "expiryDate": "2027-12-31"
    }]
  }]
}
```

### 19.3 TMS Integration

#### 19.3.1 Shipment Booking

```json
{
  "bookingRequest": {
    "orderId": "ORD-2025-5678",
    "origin": {
      "address": { },
      "readyDate": "2025-12-27"
    },
    "destination": {
      "address": { },
      "requiredDate": "2025-12-30"
    },
    "cargo": [{
      "packageType": "box",
      "quantity": 10,
      "weight": 50,
      "dimensions": { }
    }],
    "serviceLevel": "express",
    "requirements": {
      "temperatureControl": true,
      "insurance": true,
      "signature": true
    }
  }
}
```

---

## 20. Compliance and Certification

### 20.1 WIA Certification

#### 20.1.1 Certification Levels

**Level 1 - Basic Compliance**:
- Implement core data models
- REST API integration
- Basic shipment tracking
- Standard reporting

**Level 2 - Advanced Integration**:
- Multi-tier visibility
- Real-time tracking
- Risk management
- Demand forecasting

**Level 3 - Excellence**:
- Blockchain traceability
- AI-powered optimization
- Carbon accounting
- Full ESG compliance

#### 20.1.2 Certification Process

1. **Application**: Submit certification request
2. **Documentation**: Provide implementation details
3. **Testing**: Pass conformance tests
4. **Audit**: On-site or remote audit
5. **Certification**: Receive WIA certificate
6. **Renewal**: Annual recertification

### 20.2 Conformance Testing

#### 20.2.1 API Conformance

```bash
# Run conformance test suite
wia-ind-023 test conformance --api-url https://your-api.com

Tests:
✓ Authentication (OAuth 2.0)
✓ Supplier CRUD operations
✓ Purchase order workflow
✓ Shipment tracking
✓ Blockchain verification
✓ Risk assessment
✓ Carbon calculation
✓ Webhook delivery
✓ Error handling
✓ Rate limiting

Result: 10/10 tests passed
Certification: Level 3 (Excellence)
```

### 20.3 Industry Standards

#### 20.3.1 Compliance Matrix

| Standard | Requirement | WIA-IND-023 Support |
|----------|------------|-------------------|
| ISO 28000 | Supply chain security | ✓ Full |
| ISO 9001 | Quality management | ✓ Full |
| ISO 14001 | Environmental mgmt | ✓ Full |
| GS1 | Global standards | ✓ Partial |
| EDIFACT | EDI messages | ✓ Full |
| GHG Protocol | Carbon accounting | ✓ Full |
| INCOTERMS 2020 | Trade terms | ✓ Full |

---

## Appendix A: Example Workflows

### A.1 Complete Order Workflow

```
1. Demand Planning
   └─> Generate forecast for SKU-A
   └─> Inventory recommendation: Order 3000 units

2. Purchase Requisition
   └─> Create requisition REQ-001
   └─> Manager approval
   └─> Procurement processing

3. Supplier Selection
   └─> Query available suppliers
   └─> Calculate risk scores
   └─> Select Supplier SUP-5678 (Risk: LOW, Cost: Best)

4. Purchase Order
   └─> Create PO-2025-001234
   └─> Director approval (value > $100k)
   └─> Send PO to supplier via EDI

5. Order Acknowledgement
   └─> Supplier confirms: 3000 units, delivery Dec 30
   └─> Record blockchain checkpoint: Order Confirmed

6. Production
   └─> Supplier updates: In Production
   └─> Record checkpoint: Manufacturing Stage
   └─> Quality check passed
   └─> Record checkpoint: QC Approved

7. Shipment
   └─> Create shipment SHIP-2025-001234
   └─> Book carrier: DHL Express Air
   └─> Generate ASN
   └─> Record checkpoint: Shipped

8. Tracking
   └─> Real-time GPS tracking
   └─> Temperature monitoring (cold chain)
   └─> ETA updates
   └─> Customs clearance

9. Delivery
   └─> Arrived at warehouse
   └─> Physical inspection
   └─> Quantity verification: 3000 units ✓
   └─> Quality check: Passed ✓
   └─> Record checkpoint: Received

10. Invoice & Payment
    └─> Match invoice to PO
    └─> 3-way match: PO, Receipt, Invoice ✓
    └─> Payment scheduled: NET30
    └─> Update supplier performance metrics

11. Blockchain Finalization
    └─> Record final checkpoint: Delivered
    └─> Close product journey
    └─> Generate authenticity certificate
    └─> Calculate carbon footprint: 280.5 kg CO2e
```

### A.2 Risk Mitigation Workflow

```
1. Risk Detection
   └─> Weekly supplier risk scan
   └─> SUP-5678 risk increased: 15 → 35 (MEDIUM)
   └─> Trigger: Geopolitical risk +20 points

2. Impact Analysis
   └─> Active orders: 5 POs, $500k value
   └─> Critical items: 3 SKUs with no alternative
   └─> Projected delivery impact: +10 days

3. Mitigation Planning
   └─> Strategy 1: Diversify to SUP-ALT-001 (cost +5%)
   └─> Strategy 2: Increase safety stock +15%
   └─> Strategy 3: Expedite current orders

4. Stakeholder Communication
   └─> Alert procurement team
   └─> Notify affected departments
   └─> Email to management

5. Implementation
   └─> Approve alternate supplier SUP-ALT-001
   └─> Split next order 60/40
   └─> Increase safety stock for critical SKUs
   └─> Expedite 2 urgent orders to air freight

6. Monitoring
   └─> Daily risk score updates
   └─> Track geopolitical developments
   └─> Monitor alternate supplier performance

7. Review
   └─> 30-day review: Risk decreased to 25
   └─> Supplier performance maintained
   └─> Continue dual-source strategy
```

---

## Appendix B: Sample Code

### B.1 TypeScript SDK Usage

```typescript
import { SupplyChainSDK } from '@wia/ind-023';

const sdk = new SupplyChainSDK({
  apiKey: process.env.WIA_API_KEY!,
  blockchain: {
    network: 'polygon',
    contractAddress: '0x...'
  }
});

async function main() {
  // 1. Create purchase order
  const po = await sdk.createPurchaseOrder({
    supplierId: 'SUP-5678',
    items: [{
      sku: 'CHIP-A100',
      quantity: 1000,
      unitPrice: 45.50
    }],
    deliveryDate: '2025-12-30'
  });

  console.log(`PO Created: ${po.poNumber}`);

  // 2. Track shipment
  const tracking = await sdk.trackShipment('SHIP-2025-001234');
  console.log(`Status: ${tracking.status}`);
  console.log(`ETA: ${tracking.eta}`);

  // 3. Verify on blockchain
  const verification = await sdk.verifyProvenance(
    'CHIP-A100',
    '0x7f8c...'
  );
  console.log(`Authentic: ${verification.isAuthentic}`);
  console.log(`Journey: ${verification.journey.length} checkpoints`);

  // 4. Calculate risk
  const risk = await sdk.calculateRiskScore('SUP-5678');
  console.log(`Risk: ${risk.riskLevel} (${risk.riskScore})`);

  // 5. Demand forecast
  const forecast = await sdk.generateForecast({
    sku: 'CHIP-A100',
    period: 90
  });
  console.log(`90-day forecast generated`);

  // 6. Carbon footprint
  const carbon = await sdk.calculateCarbonFootprint({
    shipmentId: 'SHIP-2025-001234'
  });
  console.log(`Carbon: ${carbon.totalKg} kg CO2e`);
}

main();
```

---

## Appendix C: Glossary

**3PL**: Third-Party Logistics Provider
**4PL**: Fourth-Party Logistics Provider
**ASN**: Advanced Shipping Notice
**BOL**: Bill of Lading
**COGS**: Cost of Goods Sold
**CTC**: Cash-to-Cash Cycle
**DDP**: Delivered Duty Paid
**DIO**: Days Inventory Outstanding
**DPO**: Days Payable Outstanding
**DSO**: Days Sales Outstanding
**EDI**: Electronic Data Interchange
**EOQ**: Economic Order Quantity
**ERP**: Enterprise Resource Planning
**ESG**: Environmental, Social, Governance
**ETA**: Estimated Time of Arrival
**EXW**: Ex Works
**FCA**: Free Carrier
**FOB**: Free On Board
**HS Code**: Harmonized System Code
**Incoterms**: International Commercial Terms
**JIT**: Just-In-Time
**KPI**: Key Performance Indicator
**LCL**: Less than Container Load
**MAPE**: Mean Absolute Percentage Error
**MOQ**: Minimum Order Quantity
**MRP**: Material Requirements Planning
**OTD**: On-Time Delivery
**PPM**: Parts Per Million
**RFP**: Request for Proposal
**RFQ**: Request for Quotation
**RMA**: Return Merchandise Authorization
**RMSE**: Root Mean Squared Error
**ROI**: Return on Investment
**ROP**: Reorder Point
**SKU**: Stock Keeping Unit
**SLA**: Service Level Agreement
**TMS**: Transportation Management System
**UOM**: Unit of Measure
**VMI**: Vendor Managed Inventory
**WMS**: Warehouse Management System

---

## Appendix D: References

1. **ISO 28000:2007** - Specification for security management systems for the supply chain
2. **ISO 9001:2015** - Quality management systems — Requirements
3. **GHG Protocol** - Corporate Accounting and Reporting Standard
4. **INCOTERMS 2020** - ICC official rules for the interpretation of trade terms
5. **GS1 General Specifications** - Global standards for supply chain
6. **WIA Standards Portal** - https://wiastandards.com

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-12-27 | WIA Industry Standards Group | Initial release |

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA - World Certification Industry Association*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
