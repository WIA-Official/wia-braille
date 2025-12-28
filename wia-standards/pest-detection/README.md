# WIA Pest Detection Standard

> AI-powered pest and disease detection for agriculture

## Overview

The WIA Pest Detection Standard establishes data formats and protocols for pest detection systems, enabling AI-powered image recognition, population monitoring, and treatment recommendations.

## Key Features

- **AI Image Recognition**: CNN, YOLO, R-CNN model support
- **Pest Identification**: Insects, fungi, bacteria, viruses, weeds
- **Disease Diagnosis**: Symptom cataloging, pathogen identification
- **Population Monitoring**: Trap data, spatial distribution, growth rates
- **Treatment Recommendations**: Integrated pest management strategies

## Quick Start

### TypeScript SDK

```bash
npm install @wia/pest-detection
```

```typescript
import { PestDetectionClient } from '@wia/pest-detection';

const client = new PestDetectionClient({
  baseUrl: 'https://api.example.com/pest-detection',
  apiKey: 'your-api-key'
});

// Analyze image for pests
const analysis = await client.analyzeImage(imageData);
console.log(analysis.data);

// Get treatment recommendations
const treatments = await client.getTreatmentRecommendations('pest-id-123');
```

## Documentation

- [Phase 1: Data Format](spec/PHASE-1-DATA-FORMAT.md)
- [Phase 2: API Interface](spec/PHASE-2-API-INTERFACE.md)
- [Phase 3: Protocol](spec/PHASE-3-PROTOCOL.md)
- [Phase 4: Integration](spec/PHASE-4-INTEGRATION.md)

## Detection Methods

- **Visual Inspection**: Manual field scouting
- **Image AI**: Computer vision, deep learning
- **Trap Monitoring**: Pheromone, sticky, light traps
- **Sensor Arrays**: IoT environmental sensors
- **Laboratory Analysis**: PCR, microscopy

## License

MIT License - © 2025 WIA Standards Committee

**弘익人間 (Hongik Ingan) - Benefit All Humanity**
