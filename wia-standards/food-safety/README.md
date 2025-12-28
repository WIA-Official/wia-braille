# WIA Food Safety Standard

> HACCP compliance, testing, and incident management

## Overview

The WIA Food Safety Standard provides standardized data formats for food safety management, including hazard analysis, testing protocols, inspections, certifications, and incident reporting.

## Key Features

- **Hazard Analysis**: Biological, chemical, physical, and allergen hazards
- **Laboratory Testing**: Microbiological, chemical residue, allergen testing
- **Inspections**: Facility audits, compliance scoring, corrective actions
- **Certifications**: HACCP, ISO 22000, FSSC 22000, organic
- **Incident Management**: Outbreak tracking, recalls, root cause analysis

## Quick Start

### TypeScript SDK

```bash
npm install @wia/food-safety
```

```typescript
import { FoodSafetyClient } from '@wia/food-safety';

const client = new FoodSafetyClient({
  baseUrl: 'https://api.example.com/food-safety',
  apiKey: 'your-api-key'
});

// Submit test results
const result = await client.submitTestResult(testData);

// Report food safety incident
const incident = await client.reportIncident(incidentData);
```

## Documentation

- Phase 1: Data Format (see spec directory)
- Phase 2: API Interface
- Phase 3: Protocol
- Phase 4: Integration

## Compliance Standards

- **HACCP**: Hazard Analysis Critical Control Points
- **ISO 22000**: Food safety management systems
- **FSSC 22000**: Food Safety System Certification
- **FDA FSMA**: Food Safety Modernization Act
- **EU Regulation 178/2002**: General food law

## License

MIT License - © 2025 WIA Standards Committee

**弘益人間 (Hongik Ingan) - Benefit All Humanity**
