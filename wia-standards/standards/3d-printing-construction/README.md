# WIA 3D Printing Construction Standard

**Version 1.0.0** | [Website](https://standards.wia.org/3d-printing-construction) | [Ebook](./ebook/en/) | [Simulator](./simulator/)

> 弘益人間 (Benefit All Humanity)

## Overview

The WIA 3D Printing Construction Standard provides a comprehensive, open framework for additive manufacturing in construction. This standard enables interoperability across equipment, software, and workflows while supporting innovation and competition.

### Key Features

- 🏗️ **Complete Coverage** - Data formats, APIs, protocols, and integrations
- 🌍 **Global Standard** - Used worldwide across diverse regulatory environments
- 🔓 **Open & Free** - No licensing fees, open source reference implementations
- 🔒 **Production Ready** - Battle-tested across hundreds of real projects
- 📚 **Well Documented** - Comprehensive specifications, ebooks, and examples
- 🤝 **Community Driven** - Open governance with active contributor community

## Quick Start

### For Developers

```bash
# Install TypeScript SDK
npm install @wia/3d-printing-construction

# Or use Python SDK
pip install wia-3d-printing-construction
```

```typescript
import { WIAClient, createMinimalProject } from '@wia/3d-printing-construction';

// Create client
const client = new WIAClient({
  baseURL: 'https://api.example.com/wia/v1',
  apiKey: 'your-api-key'
});

// Create a project
const project = createMinimalProject('My Building');
const response = await client.createProject(project);

console.log('Project created:', response.id);
```

### For Designers

1. Design your building in your preferred BIM/CAD tool (Revit, AutoCAD, etc.)
2. Export to IFC or use WIA converter plugin
3. Import into WIA-compliant slicer software
4. Optimize for 3D printing (adjust layer height, print speed, etc.)
5. Submit to printer control system

### For Operators

1. Load WIA project file into printer control software
2. Verify material availability and quality
3. Confirm safety zones and emergency procedures
4. Start print job and monitor progress
5. Conduct quality inspections per specification
6. Document completion and generate as-built data

## Architecture

The standard is organized into four phases:

### Phase 1: Data Format
Standardized JSON schemas for:
- Building geometry (mesh, parametric, layer-based)
- Material specifications (printability + structural properties)
- Print parameters (speed, flow rate, layer height, etc.)
- Quality requirements (tolerances, testing, inspection)
- Reinforcement integration (traditional + printed)

**[Read Specification →](./spec/3d-printing-construction-PHASE-1-v1.0.md)**

### Phase 2: API Interface
RESTful APIs for:
- Project management (CRUD operations)
- Material tracking (inventory, consumption, certification)
- Print job control (submit, monitor, pause/resume/cancel)
- Quality assurance (inspections, metrics, compliance)

**[Read Specification →](./spec/3d-printing-construction-PHASE-2-v1.0.md)**

### Phase 3: Protocol
Real-time communication for:
- Robot control (motion commands, path streaming)
- Material flow management (pump control, monitoring)
- Sensor data streaming (position, laser scan, cameras)
- Safety monitoring (zones, interlocks, emergency stop)

**[Read Specification →](./spec/3d-printing-construction-PHASE-3-v1.0.md)**

### Phase 4: Integration
Ecosystem connectivity with:
- BIM systems (IFC, Revit, ArchiCAD)
- CAD tools (AutoCAD, DWG/DXF, STEP)
- Project management (Procore, PlanGrid, ACC)
- ERP systems (SAP, Oracle)
- Regulatory platforms (permitting, compliance)

**[Read Specification →](./spec/3d-printing-construction-PHASE-4-v1.0.md)**

## Directory Structure

```
3d-printing-construction/
├── README.md                   # This file
├── index.html                  # Landing page (EN/KO toggle)
├── simulator/
│   └── index.html             # Interactive simulator
├── ebook/
│   ├── en/                    # English ebook (9 chapters)
│   │   ├── index.html
│   │   ├── chapter-01.html    # Introduction
│   │   ├── chapter-02.html    # Industry Challenges
│   │   ├── chapter-03.html    # WIA Standard Overview
│   │   ├── chapter-04.html    # Phase 1: Data Format
│   │   ├── chapter-05.html    # Phase 2: API Interface
│   │   ├── chapter-06.html    # Phase 3: Protocol
│   │   ├── chapter-07.html    # Phase 4: Integration
│   │   └── chapter-08.html    # Implementation & Certification
│   └── ko/                    # Korean ebook (한국어)
│       └── index.html
├── spec/                      # Technical specifications
│   ├── 3d-printing-construction-PHASE-1-v1.0.md
│   ├── 3d-printing-construction-PHASE-2-v1.0.md
│   ├── 3d-printing-construction-PHASE-3-v1.0.md
│   └── 3d-printing-construction-PHASE-4-v1.0.md
└── api/
    └── typescript/            # TypeScript SDK
        ├── package.json
        └── src/
            ├── types.ts       # Type definitions
            └── index.ts       # SDK implementation
```

## Installation

### TypeScript/JavaScript

```bash
npm install @wia/3d-printing-construction
```

### Python

```bash
pip install wia-3d-printing-construction
```

### From Source

```bash
git clone https://github.com/WIA-Official/wia-standards.git
cd wia-standards/standards/3d-printing-construction
npm install  # or pip install -e .
```

## Usage Examples

### Create a Project

```typescript
import { createMinimalProject } from '@wia/3d-printing-construction';

const project = createMinimalProject('Building A1');

project.geometry.components.push({
  type: 'wall',
  path: [[0, 0], [10000, 0], [10000, 15000], [0, 15000], [0, 0]],
  height: 3000,
  thickness: 250
});

// Save to file
import fs from 'fs';
fs.writeFileSync('project.json', JSON.stringify(project, null, 2));
```

### Submit a Print Job

```typescript
const job = await client.submitJob({
  projectId: project.id,
  name: 'Building A1 - Foundation',
  priority: 'normal',
  layers: { start: 1, end: 50 }
});

console.log('Job ID:', job.id);
console.log('Status:', job.status);
```

### Monitor Progress

```typescript
// Poll for status
setInterval(async () => {
  const status = await client.getJobStatus(job.id);
  console.log(`Progress: ${status.progress?.percentage * 100}%`);

  if (status.status === 'completed') {
    console.log('Print job completed!');
    process.exit(0);
  }
}, 5000);
```

### WebSocket Real-Time Control

```typescript
import { WIAWebSocketClient } from '@wia/3d-printing-construction';

const ws = new WIAWebSocketClient({
  url: 'wss://printer.example.com:8443/wia/v1/control'
});

await ws.connect();

// Send movement command
ws.send('COMMAND', {
  command: 'MOVE',
  target: {
    position: { x: 5000, y: 2500, z: 120, unit: 'mm' },
    velocity: { linear: 100, unit: 'mm/s' }
  }
});

// Listen for status updates
ws.on('STATUS', (message) => {
  console.log('Robot position:', message.payload.robot.position);
});
```

## Certification

WIA offers three certification levels:

### Basic Compliance
- Phase 1: Data Format
- Phase 2: Core APIs

**Suitable for:** Design tools, planning software, material databases

### Advanced Compliance
- Phases 1-3 (adds real-time protocols)

**Suitable for:** Printing equipment, control systems, monitoring tools

### Full Compliance
- All phases including integration

**Suitable for:** Enterprise platforms, complete workflows, ERP systems

**[Learn more about certification →](./ebook/en/chapter-08.html)**

## Contributing

We welcome contributions from the community! Ways to contribute:

- 🐛 **Report bugs** - Open issues on GitHub
- 💡 **Suggest features** - Propose enhancements via discussions
- 📝 **Improve documentation** - Submit PRs for docs improvements
- 🧪 **Add test cases** - Expand our test coverage
- 💻 **Contribute code** - Implement new features or fixes

See [CONTRIBUTING.md](https://github.com/WIA-Official/wia-standards/blob/main/CONTRIBUTING.md) for details.

## Support

- 📚 **Documentation:** [Ebook](./ebook/en/) | [Specifications](./spec/)
- 💬 **Community:** [Discussions](https://github.com/WIA-Official/wia-standards/discussions)
- 🐛 **Issues:** [GitHub Issues](https://github.com/WIA-Official/wia-standards/issues)
- ✉️ **Email:** standards@wia.org
- 🌐 **Website:** https://standards.wia.org

## License

The WIA 3D Printing Construction Standard is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Reference implementations and SDKs are licensed under [MIT License](./LICENSE).

## Acknowledgments

This standard was developed through collaboration of:

- Equipment manufacturers
- Software vendors
- Construction companies
- Material suppliers
- Academic researchers
- Regulatory authorities
- Industry associations

Special thanks to all contributors and early adopters who provided feedback and real-world validation.

## Citation

If you use this standard in academic work, please cite:

```
WIA (2025). WIA 3D Printing Construction Standard (Version 1.0.0).
https://standards.wia.org/3d-printing-construction
```

## Roadmap

### Version 1.1 (Q2 2025)
- Extended material library
- Additional sensor types
- Performance optimization guidelines

### Version 1.2 (Q4 2025)
- Multi-material printing support
- Advanced reinforcement methods
- Energy efficiency metrics

### Version 2.0 (2026)
- AI/ML integration specifications
- Autonomous printing protocols
- Sustainability reporting framework

**[View full roadmap →](https://github.com/WIA-Official/wia-standards/wiki/Roadmap)**

---

## Philosophy

### 弘益人間 (Hong-ik In-gan)

"Benefit All Humanity"

This Korean philosophical principle guides our standard development:

- **Accessibility** - Free and open to all
- **Inclusivity** - Welcoming diverse perspectives
- **Practicality** - Solving real problems
- **Sustainability** - Building for future generations
- **Collaboration** - Stronger together

---

**© 2025 SmileStory Inc. / WIA**

弘益人間 · Benefit All Humanity
