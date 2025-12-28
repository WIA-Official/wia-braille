# WIA-CORE-004: Interoperability Registry
## PHASE 1: FOUNDATION

**Version:** 1.0  
**Status:** Active  
**Last Updated:** 2025-01-27

---

## Overview

Phase 1 establishes the foundational architecture, data models, and core services that form the basis of the WIA Interoperability Registry. This phase focuses on creating a solid, scalable foundation that supports future growth and advanced features.

## Objectives

1. **Core Registry Infrastructure** - Build distributed registry infrastructure with global availability
2. **Data Model Definition** - Define extensible metadata schemas for standards, systems, and protocols
3. **Basic CRUD Operations** - Implement create, read, update, and delete operations
4. **Authentication & Authorization** - Establish security framework with RBAC
5. **API Gateway** - Deploy API gateway for consistent access patterns
6. **Storage Layer** - Implement multi-region, eventually-consistent storage

## Architecture Components

### 1. Registry Core Service

The Registry Core Service manages the lifecycle of all registry entries.

**Responsibilities:**
- Entry creation, validation, and storage
- Version management and history tracking
- Access control enforcement
- Event emission for state changes

**Technical Stack:**
- **Language:** Node.js / TypeScript
- **Framework:** Express.js with TypeScript
- **Database:** MongoDB (sharded, multi-region)
- **Cache:** Redis Cluster
- **Message Queue:** Apache Kafka

**API Endpoints:**

```
POST   /api/v1/entries              Create new entry
GET    /api/v1/entries/:id          Retrieve entry by ID
PUT    /api/v1/entries/:id          Update existing entry
DELETE /api/v1/entries/:id          Delete entry (soft delete)
GET    /api/v1/entries/:id/history  Get entry version history
POST   /api/v1/entries/:id/versions Create new version
```

**Data Model:**

```typescript
interface RegistryEntry {
  id: string;                    // Unique identifier
  type: 'standard' | 'system' | 'protocol';
  name: string;                  // Human-readable name
  version: string;               // Semantic version
  description: Record<string, string>;  // Multi-language
  
  metadata: {
    created: Date;
    updated: Date;
    status: 'draft' | 'active' | 'deprecated' | 'retired';
    visibility: 'public' | 'private' | 'restricted';
    tags: string[];
  };
  
  maintainer: {
    organization: string;
    contact: string;
    website?: string;
  };
  
  signature?: string;             // Cryptographic signature
  customFields?: Record<string, any>;  // Extensibility
}

interface StandardEntry extends RegistryEntry {
  type: 'standard';
  category: string;
  specification: {
    url: string;
    format: 'markdown' | 'pdf' | 'html';
    size: number;
  };
  dependencies: Dependency[];
  testSuite?: {
    url: string;
    coverage: number;
  };
}

interface SystemEntry extends RegistryEntry {
  type: 'system';
  implements: Implementation[];
  endpoints: {
    api?: string;
    docs?: string;
    status?: string;
    health?: string;
  };
  capabilities: string[];
  deployment?: DeploymentInfo;
}

interface ProtocolEntry extends RegistryEntry {
  type: 'protocol';
  specification: {
    url: string;
    rfc?: string;
  };
  useCases: string[];
  implementations: string[];
}
```

### 2. Metadata Store

Distributed, eventually-consistent metadata storage optimized for global access.

**Technology:** MongoDB Atlas with multi-region replication

**Sharding Strategy:**
- Shard key: `id` (first 2 characters for even distribution)
- Replica sets: 3 nodes per shard
- Read preference: Nearest (for geo-distributed reads)

**Indexes:**
```javascript
// Primary indexes
db.entries.createIndex({ id: 1 }, { unique: true });
db.entries.createIndex({ type: 1, status: 1 });
db.entries.createIndex({ 'metadata.created': -1 });

// Search indexes
db.entries.createIndex({ name: 'text', 'description.en': 'text' });
db.entries.createIndex({ 'metadata.tags': 1 });

// Query optimization indexes
db.entries.createIndex({ type: 1, 'metadata.status': 1, 'metadata.created': -1 });
```

**Data Consistency:**
- Write concern: Majority
- Read concern: Local (with eventual consistency)
- Conflict resolution: Last-write-wins with vector clocks

### 3. API Gateway

Unified entry point for all API operations.

**Technology:** Kong Gateway

**Features:**
- **Rate Limiting:** Tier-based (1000/hour free, 10000/hour pro, unlimited enterprise)
- **Authentication:** OAuth 2.0, API Keys, JWT
- **Caching:** Edge caching with 5-minute TTL for GET requests
- **Protocol Support:** REST, GraphQL, gRPC
- **CORS:** Configurable cross-origin policies
- **Monitoring:** Request logging, metrics collection

**Rate Limiting Configuration:**
```yaml
rate_limits:
  free_tier:
    requests_per_hour: 1000
    burst: 100
  professional_tier:
    requests_per_hour: 10000
    burst: 500
  enterprise_tier:
    unlimited: true
```

### 4. Authentication Service

Manages user authentication and authorization.

**Technology:** Auth0 / Keycloak

**Authentication Methods:**
- OAuth 2.0 (Google, GitHub, Microsoft)
- API Keys (for service-to-service)
- JWT tokens (short-lived, 1-hour expiry)
- Service accounts (for automation)

**Authorization Model (RBAC):**

```typescript
enum Role {
  PUBLIC_USER = 'public_user',           // Read public entries
  REGISTERED_USER = 'registered_user',   // Create private entries
  MAINTAINER = 'maintainer',             // Update owned entries
  CERTIFIER = 'certifier',               // Issue certifications
  ADMINISTRATOR = 'administrator'        // Full access
}

interface Permission {
  resource: string;      // e.g., 'entries', 'entries/:id'
  action: string;        // e.g., 'read', 'write', 'delete'
  conditions?: Record<string, any>;
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.PUBLIC_USER]: [
    { resource: 'entries', action: 'read', conditions: { visibility: 'public' } }
  ],
  [Role.REGISTERED_USER]: [
    { resource: 'entries', action: 'read' },
    { resource: 'entries', action: 'create' }
  ],
  [Role.MAINTAINER]: [
    { resource: 'entries', action: 'read' },
    { resource: 'entries', action: 'create' },
    { resource: 'entries', action: 'update', conditions: { owner: 'self' } }
  ],
  // ... additional roles
};
```

## Data Validation

### Schema Validation

All entries must conform to JSON Schema definitions.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "type", "name", "version", "description", "metadata", "maintainer"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "minLength": 3,
      "maxLength": 100
    },
    "type": {
      "type": "string",
      "enum": ["standard", "system", "protocol"]
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+(-[a-z0-9.-]+)?(\\+[a-z0-9.-]+)?$"
    },
    "description": {
      "type": "object",
      "patternProperties": {
        "^[a-z]{2}(-[A-Z]{2})?$": {
          "type": "string",
          "minLength": 10,
          "maxLength": 5000
        }
      },
      "additionalProperties": false,
      "minProperties": 1
    }
  }
}
```

### Business Logic Validation

```typescript
class EntryValidator {
  async validateCreate(entry: RegistryEntry): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    
    // Check ID uniqueness
    const existing = await db.entries.findOne({ id: entry.id });
    if (existing) {
      errors.push({ field: 'id', message: 'ID already exists' });
    }
    
    // Validate version format (semver)
    if (!semver.valid(entry.version)) {
      errors.push({ field: 'version', message: 'Invalid semantic version' });
    }
    
    // Check required language (English)
    if (!entry.description.en) {
      errors.push({ field: 'description', message: 'English description required' });
    }
    
    // Validate URLs
    if (entry.maintainer.website && !isValidUrl(entry.maintainer.website)) {
      errors.push({ field: 'maintainer.website', message: 'Invalid URL' });
    }
    
    // Type-specific validation
    if (entry.type === 'standard') {
      await this.validateStandard(entry as StandardEntry, errors);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  private async validateStandard(
    standard: StandardEntry,
    errors: ValidationError[]
  ): Promise<void> {
    // Validate dependencies exist
    for (const dep of standard.dependencies) {
      const exists = await db.entries.findOne({ 
        id: dep.standard,
        type: 'standard'
      });
      if (!exists) {
        errors.push({
          field: 'dependencies',
          message: `Referenced standard ${dep.standard} not found`
        });
      }
    }
    
    // Validate specification URL is accessible
    const specExists = await checkUrlAccessible(standard.specification.url);
    if (!specExists) {
      errors.push({
        field: 'specification.url',
        message: 'Specification URL not accessible'
      });
    }
  }
}
```

## Versioning

### Entry Versioning

Every entry follows semantic versioning (MAJOR.MINOR.PATCH).

**Version History Storage:**
```typescript
interface VersionHistory {
  entryId: string;
  versions: Version[];
}

interface Version {
  version: string;
  content: RegistryEntry;
  changelog: string;
  publishedAt: Date;
  publishedBy: string;
  deprecated?: {
    reason: string;
    replacedBy?: string;
  };
}
```

**Version Transition Rules:**
- MAJOR: Breaking changes requiring migration
- MINOR: Backward-compatible new features
- PATCH: Backward-compatible bug fixes

### API Versioning

API versions in URL path: `/api/v1/`, `/api/v2/`

**Version Support Policy:**
- Current version: Full support with new features
- Previous version: Security updates only (12 months)
- Deprecated versions: Warning headers, sunset timeline

## Security

### Data Encryption

- **At Rest:** AES-256 encryption for all stored data
- **In Transit:** TLS 1.3 for all network communication
- **Key Management:** AWS KMS / Azure Key Vault

### Access Control

```typescript
interface AccessPolicy {
  resource: string;
  actions: string[];
  principal: {
    type: 'user' | 'service' | 'role';
    id: string;
  };
  conditions?: {
    ipRange?: string[];
    timeRange?: { start: string; end: string };
  };
}
```

### Audit Logging

All operations logged with:
- Timestamp
- User/service identity
- Action performed
- Resource affected
- Result (success/failure)
- IP address
- Request metadata

**Retention:** 7 years (compliance requirement)

## Performance Targets

### Latency Targets

- **GET single entry:** < 50ms (p95)
- **GET list (100 items):** < 200ms (p95)
- **POST create:** < 500ms (p95)
- **PUT update:** < 500ms (p95)

### Throughput Targets

- **Reads:** 10,000 req/sec per region
- **Writes:** 1,000 req/sec per region

### Availability Targets

- **Uptime:** 99.99% (52.6 minutes downtime/year)
- **RTO (Recovery Time Objective):** 15 minutes
- **RPO (Recovery Point Objective):** 1 minute

## Monitoring & Observability

### Metrics

```typescript
const metrics = {
  // Request metrics
  'api.requests.total': Counter,
  'api.requests.duration': Histogram,
  'api.requests.errors': Counter,
  
  // Database metrics
  'db.connections.active': Gauge,
  'db.queries.duration': Histogram,
  'db.queries.errors': Counter,
  
  // Business metrics
  'entries.created': Counter,
  'entries.updated': Counter,
  'entries.deleted': Counter,
  'entries.total': Gauge
};
```

### Alerts

- High error rate (>1%)
- High latency (p95 > 500ms)
- Database connection issues
- Storage capacity warnings (>80%)
- Security events (failed auth attempts)

## Deployment

### Infrastructure

- **Cloud Provider:** AWS / Azure / GCP (multi-cloud strategy)
- **Regions:** US-East, US-West, EU-West, Asia-Pacific, South America
- **Container Orchestration:** Kubernetes
- **Service Mesh:** Istio

### CI/CD Pipeline

```yaml
stages:
  - test
  - build
  - deploy_staging
  - integration_test
  - deploy_production

test:
  script:
    - npm run lint
    - npm run test
    - npm run test:integration
  coverage: 95%

build:
  script:
    - docker build -t registry-core:$CI_COMMIT_SHA .
    - docker push registry-core:$CI_COMMIT_SHA

deploy_production:
  script:
    - kubectl apply -f k8s/production/
    - kubectl set image deployment/registry-core registry-core=registry-core:$CI_COMMIT_SHA
  when: manual
  only:
    - main
```

## Success Criteria

Phase 1 is considered complete when:

1. ✅ Core registry service deployed to all regions
2. ✅ API gateway operational with rate limiting
3. ✅ Authentication/authorization fully functional
4. ✅ Basic CRUD operations tested and validated
5. ✅ Database sharding implemented and tested
6. ✅ Monitoring and alerting configured
7. ✅ Documentation complete
8. ✅ Security audit passed
9. ✅ Load testing passed (10K concurrent users)
10. ✅ 99.99% uptime achieved for 30 consecutive days

## Timeline

- **Weeks 1-2:** Infrastructure setup, database design
- **Weeks 3-4:** Core service implementation
- **Weeks 5-6:** API gateway and authentication
- **Weeks 7-8:** Testing, monitoring, security
- **Week 9:** Documentation and handoff
- **Week 10:** Production deployment and validation

**Total Duration:** 10 weeks

---

**Next Phase:** [PHASE-2-DISCOVERY.md](./PHASE-2-DISCOVERY.md) - Discovery and search capabilities
