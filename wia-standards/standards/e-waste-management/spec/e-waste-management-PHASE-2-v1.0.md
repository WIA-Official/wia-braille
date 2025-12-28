# WIA E-Waste Management Standard
# Phase 2: API Interface Specification v1.0

## Document Information
- **Standard**: WIA E-Waste Management  
- **Phase**: 2 - API Interface
- **Version**: 1.0.0
- **Status**: Published
- **Date**: 2025-01-15

## 1. Overview

Phase 2 defines RESTful API specifications enabling system integration across e-waste management stakeholders. These APIs facilitate device tracking, collection management, processing documentation, and compliance reporting.

## 2. Architecture Principles

### 2.1 REST Design
- Stateless HTTP-based communication
- Resource-oriented URLs
- Standard HTTP methods (GET, POST, PUT, PATCH, DELETE)
- JSON request/response bodies
- OAuth 2.0 authentication

### 2.2 Base URL Structure
```
https://api.wia-ewaste.org/v1
```

## 3. Core Endpoints

### 3.1 Device Management

**POST /api/v1/devices**  
Register new device with manufacturer declaration
```json
Request:
{
  "device": { /* Phase 1 device object */ }
}
Response: 201 Created
{
  "device_id": "550e8400-e29b-41d4-a716-446655440000",
  "qr_code_url": "https://api.wia-ewaste.org/qr/550e8400",
  "created_at": "2025-01-15T10:00:00Z"
}
```

**GET /api/v1/devices/{device_id}**  
Retrieve device information
```
Response: 200 OK
{
  "device": { /* Full device object with lifecycle history */ }
}
```

### 3.2 Collection API

**POST /api/v1/collections**
Log collection event
```json
Request:
{
  "device_ids": ["uuid1", "uuid2"],
  "collector_id": "COL-12345",
  "location": {...},
  "collection_method": "retail_takeback"
}
Response: 201 Created
{
  "collection_id": "col_xyz",
  "devices_count": 2
}
```

### 3.3 Processing API

**POST /api/v1/processing/stages**
Document processing stage
```json
Request:
{
  "stage_type": "dismantling",
  "input_devices": ["uuid1"],
  "facility_id": "RC-US-CA-001",
  "outputs": [...]
}
```

### 3.4 Recovery API

**POST /api/v1/recovery/materials**
Report material recovery
```json
Request:
{
  "source_devices": ["uuid1", "uuid2"],
  "facility_id": "RC-US-CA-001",
  "recovered_materials": [...]
}
```

## 4. Authentication

### 4.1 OAuth 2.0 Flow
```
POST /api/v1/oauth/token
Request:
{
  "grant_type": "client_credentials",
  "client_id": "your_client_id",
  "client_secret": "your_secret",
  "scope": "devices:read collections:write"
}
Response:
{
  "access_token": "eyJhbG...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### 4.2 Roles and Permissions
| Role | Permissions |
|------|-------------|
| Manufacturer | devices:write, devices:read (own products) |
| Collector | collections:write, devices:read |
| Processor | processing:write, recovery:write, devices:read |
| Regulator | *:read, reports:generate |
| Consumer | devices:read (own devices) |

## 5. Rate Limiting
- 1000 requests/hour for standard tier
- 10000 requests/hour for enterprise tier
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- HTTP 429 when exceeded

## 6. Error Responses
```json
HTTP 400 Bad Request
{
  "error": "validation_error",
  "message": "Request body failed schema validation",
  "details": [
    {"field": "weight_kg", "error": "must be positive"}
  ]
}
```

Standard codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Too Many Requests, 500 Server Error

## 7. Webhooks
Register webhook endpoints for event notifications:
```
POST /api/v1/webhooks
{
  "url": "https://your-server.com/webhook",
  "events": ["device.collected", "processing.complete"]
}
```

## 8. Compliance Reporting
```
GET /api/v1/compliance/reports/epr?jurisdiction=EU&period=2025-Q1
GET /api/v1/compliance/reports/basel?shipment_id=SHP-123
GET /api/v1/compliance/certificates/{device_id}
```

## 9. Versioning
- URL-based: `/v1/`, `/v2/`
- 2-year support for previous version
- 6-month deprecation notice
- Version info in response headers

## 10. Performance Requirements
- 95th percentile response time < 500ms
- 99.5% uptime (excluding maintenance)
- Support 100 requests/second per facility

---
© 2025 SmileStory Inc. / WIA · 弘益人間
