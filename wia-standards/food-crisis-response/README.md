# WIA-AGRI-031: Food Crisis Response Standard

## Overview

The WIA Food Crisis Response Standard provides protocols for coordinating and managing emergency food assistance during humanitarian crises.

## Key Features

- **Crisis Management**: Track and assess food emergencies
- **Emergency Response**: Coordinate multi-agency interventions
- **Distribution Management**: Plan and monitor food distributions
- **Logistics Coordination**: Manage supply chain and last-mile delivery
- **Nutrition Programs**: Specialized feeding for vulnerable groups
- **Funding Tracking**: Monitor appeals and donor contributions

## IPC Food Security Phases

1. **Phase 1 - Minimal**: Food secure
2. **Phase 2 - Stressed**: Moderately food insecure
3. **Phase 3 - Crisis**: Acutely food insecure
4. **Phase 4 - Emergency**: Humanitarian emergency
5. **Phase 5 - Catastrophe/Famine**: Humanitarian catastrophe

## Use Cases

- Emergency food distribution
- Cash/voucher programs
- Nutrition interventions
- Livelihood support
- Disaster response coordination
- Refugee assistance

## Installation

```bash
npm install @wia/food-crisis-response
```

## Usage Example

```typescript
import { FoodCrisisResponseClient } from '@wia/food-crisis-response';

const client = new FoodCrisisResponseClient({
  apiKey: 'your-api-key',
});

// Track active crises
const crises = await client.getCrises('active', 'phase_4');

// Create emergency response
const response = await client.createResponse({
  crisisId: 'crisis-001',
  name: 'Emergency Food Distribution',
  type: 'emergency_food',
  targetPopulation: 100000,
  budget: 5000000,
});

// Plan distribution
await client.createDistribution({
  operationId: 'op-001',
  date: '2025-01-15',
  beneficiaries: 5000,
  rationType: 'full',
});
```

## License

MIT License - see LICENSE file for details.

---

© 2025 SmileStory Inc. / WIA
弘益人間 (홍익인간) · Benefit All Humanity
