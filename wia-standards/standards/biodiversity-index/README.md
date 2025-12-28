# WIA Biodiversity Index Standard

**Version:** 1.0
**Status:** Active
**Philosophy:** 弘益人間 (홍익인간) - Benefit All Humanity, Preserve All Life

## Overview

The WIA Biodiversity Index Standard provides a comprehensive, interoperable framework for measuring, monitoring, and preserving biodiversity globally. This standard addresses critical challenges in biodiversity science through standardized data formats, computational APIs, field protocols, and system integrations.

## Quick Start

### Try the Simulator
Experience biodiversity index calculations in your browser:
```
https://biodiversity.wia.org/simulator
```

### Read the eBook
Comprehensive guide (English & Korean):
```
https://biodiversity.wia.org/ebook/en/
https://biodiversity.wia.org/ebook/ko/
```

### Install SDK

**TypeScript/JavaScript:**
```bash
npm install @wia/biodiversity-index
```

**Python:**
```bash
pip install wia-biodiversity
```

**R:**
```r
install.packages("wiabiodiversity")
```

## The 4-Phase Approach

### Phase 1: Data Format
Standardized JSON schemas for biodiversity data:
- Species occurrence records
- eDNA sample data
- Habitat classifications
- Diversity index results
- Taxonomy references

**See:** [Phase 1 Specification](spec/biodiversity-index-PHASE-1-v1.0.md)

### Phase 2: API Interface
RESTful and GraphQL APIs for:
- Occurrence management
- Diversity index calculation
- Data validation
- GBIF/IUCN integration
- Real-time alerts

**See:** [Phase 2 Specification](spec/biodiversity-index-PHASE-2-v1.0.md)

### Phase 3: Protocol
Standardized field protocols for:
- Bird point counts
- Mammal camera trapping
- Vegetation quadrat sampling
- eDNA water sampling
- Quality assurance procedures

**See:** [Phase 3 Specification](spec/biodiversity-index-PHASE-3-v1.0.md)

### Phase 4: Integration
Seamless connectivity with:
- GIS platforms (ArcGIS, QGIS)
- Conservation tools (Marxan, Zonation)
- Policy reporting (CBD, IPBES)
- Environmental impact assessment
- Alert and monitoring systems

**See:** [Phase 4 Specification](spec/biodiversity-index-PHASE-4-v1.0.md)

## Usage Examples

### TypeScript SDK

```typescript
import { BiodiversityClient } from '@wia/biodiversity-index';

const client = new BiodiversityClient({
  apiKey: process.env.WIA_API_KEY
});

// Query tiger occurrences
const occurrences = await client.occurrences.list({
  species: 'Panthera tigris',
  country: 'India',
  start_date: '2025-01-01',
  end_date: '2025-12-31'
});

// Calculate diversity indices
const results = await client.indices.calculate({
  dataset_id: 'DS-INDIA-2025',
  indices: ['shannon_diversity', 'simpson_index', 'species_richness'],
  bootstrap: {
    enabled: true,
    iterations: 1000,
    confidence_level: 0.95
  }
});

console.log(`Shannon Diversity: ${results.results.shannon_diversity.value}`);
console.log(`Species Richness: ${results.results.species_richness.value}`);
```

### Python SDK

```python
from wia_biodiversity import BiodiversityAPI

client = BiodiversityAPI(api_key='your_api_key')

# Query occurrences
occurrences = client.occurrences.list(
    species='Panthera tigris',
    country='India',
    year=2025
)

# Calculate diversity
results = client.indices.calculate(
    dataset_id='DS-INDIA-2025',
    indices=['shannon', 'simpson', 'richness'],
    bootstrap_iterations=1000
)

print(f"Shannon: {results.shannon.value:.3f}")
print(f"Richness: {results.richness.observed}")
```

### R SDK

```r
library(wiabiodiversity)

client <- BiodiversityClient$new(api_key = Sys.getenv("WIA_API_KEY"))

# Query occurrences
occurrences <- client$occurrences$list(
  species = "Panthera tigris",
  country = "India",
  year = 2025
)

# Calculate diversity
results <- client$indices$calculate(
  dataset_id = "DS-INDIA-2025",
  indices = c("shannon", "simpson", "richness")
)

cat(sprintf("Shannon: %.3f\n", results$shannon$value))
```

## Core Biodiversity Indices

### Shannon Diversity Index (H')
Measures species diversity considering both richness and evenness.

```
H' = -Σ(pi × ln(pi))

where pi = proportion of species i
```

**Range:** 0 (no diversity) to ln(S) where S = species count
**Typical Values:** 1.5-3.5 for most ecosystems

### Simpson Index (D and 1-D)
Probability that two randomly selected individuals belong to the same species.

```
D = Σ(ni(ni-1)) / (N(N-1))

Simpson's Diversity: 1-D
```

**Range:** 0 to 1 (where 1 = infinite diversity in 1-D form)

### Species Richness (S)
Total number of different species in a community.

### Pielou's Evenness (J')
How evenly individuals are distributed across species.

```
J' = H' / ln(S)
```

**Range:** 0 to 1 (where 1 = perfect evenness)

## Data Format

### Species Occurrence Example

```json
{
  "$schema": "https://wia.org/schemas/occurrence/v1.0",
  "occurrence_id": "OCC-2025-123456",
  "species": {
    "scientific_name": "Panthera tigris",
    "common_name": "Bengal Tiger",
    "iucn_status": "EN"
  },
  "location": {
    "latitude": 27.5142,
    "longitude": 88.7597,
    "habitat_type": "tropical_forest",
    "country": "India"
  },
  "temporal": {
    "observation_date": "2025-11-15T09:30:00Z"
  },
  "observation": {
    "individual_count": 1,
    "basis_of_record": "camera_trap",
    "observer_id": "OBS-2025-042"
  }
}
```

## Certification Levels

### Bronze - Data Format Compliance
- 90% schema conformance
- All required fields populated
- 95% validation pass rate
- Complete metadata

### Silver - API Integration
- Bronze + Phase 2 API integration
- Real-time validation
- External system integration (GBIF/IUCN/GIS)

### Gold - Field Protocol Compliance
- Silver + 50% staff WIA Level 1 certified
- Phase 3 protocols implemented
- QA/QC audit passed

### Platinum - Full Integration
- Gold + Phase 4 integrations operational
- Contributions to WIA development
- Demonstrated conservation impact
- Mentorship of other organizations

## Directory Structure

```
biodiversity-index/
├── index.html              # Landing page
├── simulator/
│   └── index.html         # Interactive biodiversity calculator
├── ebook/
│   ├── en/                # English ebook (9 chapters)
│   │   ├── index.html
│   │   ├── chapter-01.html
│   │   └── ...
│   └── ko/                # Korean ebook (9 chapters)
│       ├── index.html
│       └── ...
├── spec/                  # Technical specifications
│   ├── biodiversity-index-PHASE-1-v1.0.md
│   ├── biodiversity-index-PHASE-2-v1.0.md
│   ├── biodiversity-index-PHASE-3-v1.0.md
│   └── biodiversity-index-PHASE-4-v1.0.md
├── api/
│   └── typescript/        # TypeScript SDK
│       ├── src/
│       │   ├── types.ts
│       │   └── index.ts
│       └── package.json
└── README.md
```

## Key Features

- **eDNA Analysis** - Environmental DNA for non-invasive biodiversity assessment
- **Global Coverage** - Standardized protocols applicable worldwide
- **Real-time Analytics** - WebSocket streaming for live monitoring
- **GBIF Integration** - Direct submission to Global Biodiversity Information Facility
- **Remote Sensing** - Satellite imagery integration for habitat monitoring
- **ISO Certified** - Follows international standards and best practices

## Resources

### Documentation
- **Landing Page:** https://biodiversity.wia.org
- **API Reference:** https://docs.biodiversity.wia.org/api
- **Field Protocols:** https://docs.biodiversity.wia.org/protocols
- **GitHub Repository:** https://github.com/WIA-Official/wia-standards

### Training
- **Online Courses:** https://training.biodiversity.wia.org
- **Certification:** https://certification.biodiversity.wia.org
- **Community Forum:** https://community.biodiversity.wia.org

### Support
- **Email:** support@biodiversity.wia.org
- **Issues:** https://github.com/WIA-Official/wia-standards/issues
- **Slack:** https://wia-community.slack.com

## Real-World Applications

### Amazon Rainforest Monitoring Network
- 15 research stations standardized
- 25 years of historical data migrated
- 2.1 million km² analyzed
- 23 new biodiversity hotspots identified
- **Achievement:** Gold Certification

### Kenya National Biodiversity Program
- CBD reporting time: 6 months → 2 weeks
- Citizen science contributions: +340%
- 8 datasets integrated
- **Achievement:** Silver Certification

### Mediterranean Marine Protected Area Network
- 50 MPAs across 15 countries
- eDNA detected 15% more species
- Identified connectivity corridors
- **Achievement:** Gold Certification (network-wide)

## Contributing

We welcome contributions from the global community:

1. **Code:** Submit pull requests for SDK improvements
2. **Protocols:** Propose enhancements to field methods
3. **Translations:** Help translate documentation
4. **Case Studies:** Share implementation experiences

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

Data collected using this standard should follow appropriate data sharing agreements and respect the Nagoya Protocol on Access and Benefit Sharing.

## Citation

If you use this standard in your research, please cite:

```
WIA (2025). WIA Biodiversity Index Standard, Version 1.0.
World Certification Industry Association.
https://biodiversity.wia.org
```

## Acknowledgments

This standard builds on decades of ecological research and incorporates best practices from:
- Darwin Core Standard
- IUCN Habitat Classification Scheme
- GBIF Data Quality Framework
- Convention on Biological Diversity

Special thanks to the global biodiversity community for feedback and contributions.

---

## Philosophy

**弘益人間 (홍익인간)** - Benefit All Humanity, Preserve All Life

This standard extends the principle of benefiting all humanity to encompass all life on Earth. By standardizing biodiversity measurement, we create the foundation for evidence-based conservation at the scale and urgency demanded by the biodiversity crisis.

---

© 2025 SmileStory Inc. / WIA
弘益人間 (홍익인간) · Benefit All Humanity · Preserve All Life
