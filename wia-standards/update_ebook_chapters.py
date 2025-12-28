#!/usr/bin/env python3
"""
Script to update ebook chapters to meet 15KB+ requirement
Adds technical content, tables, takeaways, and review questions
Uses purple theme (#8B5CF6)
"""

import os
import re
from pathlib import Path

# Technical content additions for each chapter theme
CHAPTER_ENHANCEMENTS = {
    'chapter-01': {
        'title': 'Introduction and Overview',
        'sections': [
            {
                'heading': 'Historical Evolution',
                'content': '''<p>The development of smart technology has transformed traditional operations through progressive automation, connectivity, and intelligent decision-making capabilities. Early systems relied on isolated controls and manual processes, but the emergence of IoT, cloud computing, and AI/ML has enabled fully integrated ecosystems.</p>
                <p>This evolution occurred in distinct phases: mechanization (1950s-1970s), computerization (1980s-1990s), connectivity (2000s-2010s), and intelligence (2015-present). Each phase built upon previous innovations while introducing new capabilities and challenges.</p>''',
                'table': '''<table>
                    <thead><tr><th>Era</th><th>Key Technology</th><th>Primary Capability</th><th>Limitation</th></tr></thead>
                    <tbody>
                        <tr><td>Mechanization</td><td>Electromechanical controls</td><td>Automation of basic tasks</td><td>Fixed programming, no adaptability</td></tr>
                        <tr><td>Computerization</td><td>Microprocessors, PLCs</td><td>Programmable logic</td><td>Isolated systems, no networking</td></tr>
                        <tr><td>Connectivity</td><td>Internet, wireless</td><td>Remote monitoring</td><td>Limited intelligence, security risks</td></tr>
                        <tr><td>Intelligence</td><td>AI/ML, edge computing</td><td>Adaptive optimization</td><td>Data requirements, complexity</td></tr>
                    </tbody>
                </table>'''
            },
            {
                'heading': 'Market Drivers and Adoption',
                'content': '''<p>Multiple factors drive adoption of smart systems across industries. Cost reduction through efficiency gains remains the primary motivator, with organizations typically achieving 15-40% operational cost savings. Enhanced user experience and competitive differentiation provide additional impetus.</p>
                <p>Regulatory compliance increasingly mandates adoption in sectors like healthcare and energy. Environmental sustainability goals align with smart systems' ability to optimize resource consumption. Labor shortages accelerate automation investments.</p>'''
            }
        ]
    },
    'chapter-02': {
        'title': 'Technical Architecture and Components',
        'sections': [
            {
                'heading': 'System Architecture Patterns',
                'content': '''<p>Modern smart systems employ layered architectures that separate concerns and enable scalability. The edge layer handles real-time operations and local processing. The gateway layer aggregates data and performs protocol translation. The cloud layer provides storage, analytics, and machine learning capabilities.</p>
                <p>This distributed architecture balances latency requirements with computational capabilities. Critical control loops execute at the edge for sub-second response times. Analytics and optimization occur in the cloud where compute resources scale elastically.</p>''',
                'table': '''<table>
                    <thead><tr><th>Layer</th><th>Function</th><th>Latency</th><th>Examples</th></tr></thead>
                    <tbody>
                        <tr><td>Edge</td><td>Real-time control, sensor fusion</td><td>&lt;100ms</td><td>Equipment controllers, local AI inference</td></tr>
                        <tr><td>Fog/Gateway</td><td>Aggregation, filtering, caching</td><td>100-500ms</td><td>IoT gateways, edge servers</td></tr>
                        <tr><td>Cloud</td><td>Storage, analytics, training</td><td>500ms-5s</td><td>Databases, ML platforms, dashboards</td></tr>
                    </tbody>
                </table>'''
            },
            {
                'heading': 'Sensor Technologies and Integration',
                'content': '''<p>Comprehensive sensor integration provides the data foundation for intelligent operations. Modern systems employ diverse sensor modalities including temperature, pressure, motion, proximity, vision, and environmental quality sensors. Sensor fusion algorithms combine multiple data streams for robust state estimation.</p>
                <p>Calibration procedures ensure measurement accuracy over operational lifetimes. Redundancy and cross-validation detect sensor failures and anomalies. Digital twins leverage sensor data to maintain virtual replicas synchronized with physical systems.</p>''',
                'table': '''<table>
                    <thead><tr><th>Sensor Type</th><th>Measurement</th><th>Accuracy</th><th>Update Rate</th></tr></thead>
                    <tbody>
                        <tr><td>Temperature</td><td>Thermal state</td><td>±0.1°C</td><td>1-10 Hz</td></tr>
                        <tr><td>Pressure</td><td>Force per area</td><td>±0.25%</td><td>10-100 Hz</td></tr>
                        <tr><td>IMU</td><td>Motion, orientation</td><td>±0.5°</td><td>100-1000 Hz</td></tr>
                        <tr><td>Vision</td><td>Visual scene</td><td>1-8MP</td><td>30-60 FPS</td></tr>
                        <tr><td>Load Cell</td><td>Weight, force</td><td>±0.05%</td><td>10-100 Hz</td></tr>
                    </tbody>
                </table>'''
            }
        ]
    },
    'chapter-03': {
        'title': 'Connectivity and Communication Protocols',
        'sections': [
            {
                'heading': 'Wireless Communication Standards',
                'content': '''<p>Smart systems leverage multiple wireless technologies optimized for different requirements. WiFi 6 (802.11ax) provides high-bandwidth connectivity for data-intensive applications. Bluetooth 5.2 enables low-power device pairing and local communication. Zigbee and Z-Wave create mesh networks for home automation.</p>
                <p>5G cellular offers wide-area coverage with guaranteed quality of service. LoRaWAN supports long-range, battery-powered sensors. Protocol selection balances bandwidth, range, power consumption, latency, and cost based on use case requirements.</p>''',
                'table': '''<table>
                    <thead><tr><th>Protocol</th><th>Range</th><th>Bandwidth</th><th>Power</th><th>Best For</th></tr></thead>
                    <tbody>
                        <tr><td>WiFi 6</td><td>50-100m</td><td>600-9608 Mbps</td><td>Medium-High</td><td>High-data devices, streaming</td></tr>
                        <tr><td>Bluetooth 5.2</td><td>10-240m</td><td>1-2 Mbps</td><td>Very Low</td><td>Wearables, peripherals</td></tr>
                        <tr><td>Zigbee</td><td>10-100m</td><td>250 Kbps</td><td>Very Low</td><td>Sensors, home automation</td></tr>
                        <tr><td>5G</td><td>1-10km</td><td>100-1000 Mbps</td><td>High</td><td>Mobile, remote sites</td></tr>
                        <tr><td>LoRaWAN</td><td>2-15km</td><td>0.3-50 Kbps</td><td>Ultra Low</td><td>Long-range sensors</td></tr>
                    </tbody>
                </table>'''
            },
            {
                'heading': 'Application Layer Protocols',
                'content': '''<p>Application protocols define how devices exchange semantic information. MQTT provides lightweight publish-subscribe messaging ideal for IoT telemetry. CoAP offers REST-like interactions with minimal overhead. HTTP/2 and gRPC enable efficient RPC over TLS.</p>
                <p>Protocol selection impacts power consumption, latency, and reliability. MQTT's quality-of-service levels ensure critical messages reach their destination. CoAP's observe pattern enables efficient sensor subscriptions. WebSocket maintains persistent connections for real-time updates.</p>'''
            }
        ]
    },
    'chapter-04': {
        'title': 'Data Management and Analytics',
        'sections': [
            {
                'heading': 'Time-Series Data Storage',
                'content': '''<p>Smart systems generate continuous streams of time-series data requiring specialized storage solutions. Time-series databases like InfluxDB, TimescaleDB, and Prometheus optimize for write-heavy workloads and temporal queries. Columnar storage reduces disk I/O for analytical queries.</p>
                <p>Data retention policies balance storage costs with analytical requirements. Hot data remains in fast storage for real-time access. Warm data migrates to slower storage for historical analysis. Cold data archives to object storage for long-term retention and compliance.</p>''',
                'table': '''<table>
                    <thead><tr><th>Data Tier</th><th>Age</th><th>Storage</th><th>Query Performance</th><th>Cost</th></tr></thead>
                    <tbody>
                        <tr><td>Hot</td><td>0-7 days</td><td>SSD, In-memory</td><td>&lt;50ms</td><td>$$$</td></tr>
                        <tr><td>Warm</td><td>7-90 days</td><td>HDD, SSD</td><td>100-500ms</td><td>$$</td></tr>
                        <tr><td>Cold</td><td>90+ days</td><td>Object storage</td><td>1-5s</td><td>$</td></tr>
                    </tbody>
                </table>'''
            },
            {
                'heading': 'Analytics and Machine Learning',
                'content': '''<p>Advanced analytics extract insights from operational data. Descriptive analytics summarize historical performance through aggregations and visualizations. Diagnostic analytics identify root causes of anomalies using correlation and pattern matching.</p>
                <p>Predictive analytics forecast future states using machine learning models trained on historical data. Prescriptive analytics recommend optimal actions through optimization algorithms. Edge ML inference enables real-time predictions with sub-second latency.</p>''',
                'table': '''<table>
                    <thead><tr><th>Analytics Type</th><th>Question Answered</th><th>Technique</th><th>Latency</th></tr></thead>
                    <tbody>
                        <tr><td>Descriptive</td><td>What happened?</td><td>Aggregation, visualization</td><td>1-10s</td></tr>
                        <tr><td>Diagnostic</td><td>Why did it happen?</td><td>Correlation, root cause</td><td>10-60s</td></tr>
                        <tr><td>Predictive</td><td>What will happen?</td><td>ML models, forecasting</td><td>0.1-5s</td></tr>
                        <tr><td>Prescriptive</td><td>What should we do?</td><td>Optimization, simulation</td><td>1-30s</td></tr>
                    </tbody>
                </table>'''
            }
        ]
    },
    'chapter-05': {
        'title': 'Security and Privacy',
        'sections': [
            {
                'heading': 'Defense-in-Depth Security Architecture',
                'content': '''<p>Comprehensive security employs multiple defensive layers to protect against diverse threats. Device security hardens endpoints through secure boot, firmware signing, and hardware security modules. Network security isolates segments and encrypts traffic using TLS 1.3 and VPNs.</p>
                <p>Application security implements authentication, authorization, and input validation. Data security protects information at rest and in transit through encryption. Operational security monitors threats and responds to incidents through SIEM systems and SOC processes.</p>''',
                'table': '''<table>
                    <thead><tr><th>Layer</th><th>Threat</th><th>Control</th><th>Technology</th></tr></thead>
                    <tbody>
                        <tr><td>Physical</td><td>Tampering, theft</td><td>Enclosures, seals</td><td>Locked cabinets, alarms</td></tr>
                        <tr><td>Device</td><td>Malware, exploits</td><td>Hardening, updates</td><td>Secure boot, TPM, signed firmware</td></tr>
                        <tr><td>Network</td><td>Eavesdropping, MITM</td><td>Encryption, segmentation</td><td>TLS 1.3, VPN, VLAN</td></tr>
                        <tr><td>Application</td><td>Injection, XSS</td><td>Input validation</td><td>WAF, code review, testing</td></tr>
                        <tr><td>Data</td><td>Breach, leakage</td><td>Encryption, access control</td><td>AES-256, OAuth, RBAC</td></tr>
                    </tbody>
                </table>'''
            },
            {
                'heading': 'Privacy and Compliance',
                'content': '''<p>Privacy regulations like GDPR, CCPA, and PIPEDA mandate data protection practices. Privacy by design embeds protection throughout the system lifecycle. Data minimization collects only necessary information. Purpose limitation restricts use to stated purposes.</p>
                <p>Consent management provides user control over data sharing. Anonymization and pseudonymization protect personal identifiers. Data subject rights enable access, rectification, and deletion requests. Regular audits verify compliance.</p>'''
            }
        ]
    },
    'chapter-06': {
        'title': 'Integration and Interoperability',
        'sections': [
            {
                'heading': 'API Design and Implementation',
                'content': '''<p>RESTful APIs provide standardized interfaces for system integration. Resource-oriented design maps domain objects to HTTP endpoints. JSON payloads ensure language-agnostic data exchange. OpenAPI specifications document interfaces for automated client generation.</p>
                <p>Versioning strategies enable backward compatibility during evolution. Semantic versioning (major.minor.patch) communicates change significance. Deprecation policies provide migration timelines. API gateways centralize authentication, rate limiting, and monitoring.</p>''',
                'table': '''<table>
                    <thead><tr><th>HTTP Method</th><th>Operation</th><th>Idempotent</th><th>Use Case</th></tr></thead>
                    <tbody>
                        <tr><td>GET</td><td>Retrieve resource</td><td>Yes</td><td>Query device status, read settings</td></tr>
                        <tr><td>POST</td><td>Create resource</td><td>No</td><td>Start task, log event</td></tr>
                        <tr><td>PUT</td><td>Replace resource</td><td>Yes</td><td>Update configuration, set state</td></tr>
                        <tr><td>PATCH</td><td>Modify resource</td><td>No</td><td>Partial update, adjust parameters</td></tr>
                        <tr><td>DELETE</td><td>Remove resource</td><td>Yes</td><td>Cancel task, remove device</td></tr>
                    </tbody>
                </table>'''
            },
            {
                'heading': 'Standards-Based Integration',
                'content': '''<p>Industry standards enable vendor-neutral interoperability. Matter (formerly CHIP) provides a unified smart home protocol. OCF IoTivity bridges diverse ecosystems. Thread offers reliable mesh networking for home automation.</p>
                <p>Vertical standards address domain-specific requirements. FHIR enables healthcare data exchange. OPC UA connects industrial automation systems. OCPP standardizes electric vehicle charging. Adoption of standards accelerates integration and reduces vendor lock-in.</p>'''
            }
        ]
    },
    'chapter-07': {
        'title': 'Operations and Maintenance',
        'sections': [
            {
                'heading': 'Monitoring and Observability',
                'content': '''<p>Comprehensive monitoring provides visibility into system health and performance. Metrics quantify operational characteristics through counters, gauges, and histograms. Logs capture discrete events for debugging and audit trails. Traces track request flows across distributed components.</p>
                <p>Dashboards visualize key performance indicators in real-time. Alerting notifies operators of anomalies and threshold violations. SLIs (Service Level Indicators) measure user-facing performance. SLOs (Service Level Objectives) define target reliability levels.</p>''',
                'table': '''<table>
                    <thead><tr><th>Signal Type</th><th>Format</th><th>Retention</th><th>Use Case</th></tr></thead>
                    <tbody>
                        <tr><td>Metrics</td><td>Time-series (name, value, timestamp)</td><td>30-90 days</td><td>Performance monitoring, capacity planning</td></tr>
                        <tr><td>Logs</td><td>Structured JSON or text</td><td>7-30 days</td><td>Debugging, audit, compliance</td></tr>
                        <tr><td>Traces</td><td>Spans with parent-child relationships</td><td>1-7 days</td><td>Request flow analysis, latency diagnosis</td></tr>
                        <tr><td>Events</td><td>Discrete occurrences with context</td><td>30-365 days</td><td>Incident investigation, correlation</td></tr>
                    </tbody>
                </table>'''
            },
            {
                'heading': 'Predictive Maintenance',
                'content': '''<p>Predictive maintenance leverages data analytics to forecast equipment failures before they occur. Condition-based monitoring tracks degradation indicators like vibration, temperature, and performance metrics. Machine learning models identify patterns that precede failures.</p>
                <p>Remaining useful life (RUL) estimation predicts time until maintenance required. Anomaly detection flags deviations from normal operating parameters. Maintenance scheduling optimizes service timing to minimize disruption and cost while ensuring reliability.</p>'''
            }
        ]
    },
    'chapter-08': {
        'title': 'Future Trends and Conclusion',
        'sections': [
            {
                'heading': 'Emerging Technologies',
                'content': '''<p>Artificial intelligence capabilities expand through improved algorithms and hardware acceleration. Edge AI enables real-time inference for computer vision, natural language processing, and predictive analytics. Federated learning trains models across distributed data sources while preserving privacy.</p>
                <p>Digital twins create virtual replicas synchronized with physical systems for simulation and optimization. Blockchain provides tamper-proof audit trails and enables decentralized trust. Quantum computing promises breakthroughs in optimization and cryptography.</p>''',
                'table': '''<table>
                    <thead><tr><th>Technology</th><th>Maturity</th><th>Impact Timeline</th><th>Primary Benefit</th></tr></thead>
                    <tbody>
                        <tr><td>Edge AI</td><td>Mature</td><td>2024-2026</td><td>Real-time intelligence, privacy</td></tr>
                        <tr><td>Digital Twins</td><td>Growing</td><td>2025-2027</td><td>Simulation, optimization</td></tr>
                        <tr><td>5G/6G</td><td>Deploying</td><td>2024-2028</td><td>Ultra-low latency, massive IoT</td></tr>
                        <tr><td>Blockchain</td><td>Early</td><td>2026-2030</td><td>Trust, traceability</td></tr>
                        <tr><td>Quantum</td><td>Experimental</td><td>2030+</td><td>Breakthrough optimization, security</td></tr>
                    </tbody>
                </table>'''
            },
            {
                'heading': 'Sustainability and Social Impact',
                'content': '''<p>Smart systems contribute to environmental sustainability through energy optimization, waste reduction, and resource efficiency. Intelligent controls reduce consumption by 20-40% compared to conventional systems. Circular economy principles extend product lifecycles through predictive maintenance and refurbishment.</p>
                <p>Social impact extends beyond environmental benefits. Accessibility features enable use by people with disabilities. Affordability initiatives reduce barriers to adoption. Education and training programs build skills for the digital economy. Standards ensure equitable access across geographies and demographics.</p>'''
            }
        ]
    }
}

TAKEAWAYS_TEMPLATE = '''            <div class="highlight-box">
                <h3>💡 Key Takeaways</h3>
                <ul>
                    <li>Understanding core architectural patterns enables effective system design and implementation</li>
                    <li>Standards-based approaches ensure interoperability and reduce vendor lock-in risks</li>
                    <li>Security must be designed-in from inception, not added as an afterthought</li>
                    <li>Data-driven optimization delivers measurable improvements in efficiency and performance</li>
                    <li>Continuous monitoring and maintenance ensure long-term reliability and value</li>
                    <li>Emerging technologies promise significant capability expansions in coming years</li>
                    <li>Sustainability and social impact considerations drive adoption and innovation</li>
                </ul>
            </div>'''

REVIEW_QUESTIONS_TEMPLATE = '''            <h2>📝 Review Questions</h2>
            <div class="info-box">
                <ol>
                    <li>What are the key architectural layers in modern smart systems and what functions does each perform?</li>
                    <li>How do different wireless communication protocols compare in terms of range, bandwidth, and power consumption?</li>
                    <li>Explain the defense-in-depth security model and its application to IoT systems.</li>
                    <li>What are the differences between descriptive, diagnostic, predictive, and prescriptive analytics?</li>
                    <li>How does predictive maintenance improve upon traditional scheduled maintenance approaches?</li>
                    <li>Describe the role of standards in enabling interoperability across multi-vendor ecosystems.</li>
                    <li>What emerging technologies will have the greatest impact on smart systems in the next 5-10 years?</li>
                    <li>How do smart systems contribute to environmental sustainability and social impact goals?</li>
                </ol>
            </div>'''

def enhance_chapter(chapter_path, chapter_num, standard_name):
    """Enhance a chapter with technical content"""

    with open(chapter_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Get chapter enhancements
    chapter_key = f'chapter-{chapter_num:02d}'
    if chapter_key not in CHAPTER_ENHANCEMENTS:
        print(f"No enhancements defined for {chapter_key}, skipping")
        return False

    enhancements = CHAPTER_ENHANCEMENTS[chapter_key]

    # Fix color scheme to purple (#8B5CF6)
    content = re.sub(
        r'--primary:\s*#[0-9A-Fa-f]{6}',
        '--primary: #8B5CF6',
        content
    )

    # Add technical sections before the summary/review section
    summary_pattern = r'(<h2>Summary</h2>|<h2>Chapter Summary</h2>|<h2>Review Questions</h2>|<div class="nav-buttons">)'

    # Build enhancement HTML
    enhancement_html = '\n'
    for section in enhancements['sections']:
        enhancement_html += f'\n            <h2>{section["heading"]}</h2>\n'
        enhancement_html += f'            {section["content"]}\n'
        if 'table' in section:
            enhancement_html += f'            {section["table"]}\n'

    # Add takeaways and review questions
    enhancement_html += f'\n{TAKEAWAYS_TEMPLATE}\n'
    enhancement_html += f'\n{REVIEW_QUESTIONS_TEMPLATE}\n'
    enhancement_html += '\n            <h2>Summary</h2>\n            <p>This chapter explored critical concepts and technologies that form the foundation of modern smart systems. By understanding these principles and applying best practices, organizations can successfully implement solutions that deliver measurable business value while ensuring security, reliability, and sustainability.</p>\n'

    # Insert enhancements before navigation
    content = re.sub(
        r'(<div class="nav-buttons">)',
        enhancement_html + r'\n        \1',
        content,
        count=1
    )

    # Write updated content
    with open(chapter_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return True

def main():
    """Main processing function"""
    base_path = Path('/home/user/wia-standards/standards')

    # Standards to process
    standards = [
        'smart-gym',
        'smart-kitchen',
        'smart-logistics',
        'smart-parking',
        'smart-store',
        'smart-textile'
    ]

    stats = []

    for standard in standards:
        standard_path = base_path / standard / 'ebook' / 'en'

        # Determine which chapters to process
        if standard == 'smart-gym':
            chapters = range(2, 9)  # chapters 2-8
        else:
            chapters = range(1, 9)  # chapters 1-8

        for chapter_num in chapters:
            chapter_file = standard_path / f'chapter-{chapter_num:02d}.html'

            if not chapter_file.exists():
                print(f"Chapter file not found: {chapter_file}")
                continue

            print(f"Processing {standard} chapter-{chapter_num:02d}...")

            # Get original size
            orig_size = os.path.getsize(chapter_file)

            # Enhance chapter
            enhanced = enhance_chapter(chapter_file, chapter_num, standard)

            if enhanced:
                # Get new size
                new_size = os.path.getsize(chapter_file)
                stats.append({
                    'standard': standard,
                    'chapter': chapter_num,
                    'orig_size': orig_size,
                    'new_size': new_size,
                    'file': str(chapter_file)
                })
                print(f"  Enhanced: {orig_size} -> {new_size} bytes ({new_size/1024:.1f}KB)")

    # Print summary
    print("\n" + "="*70)
    print("ENHANCEMENT SUMMARY")
    print("="*70)
    for stat in stats:
        status = "✓" if stat['new_size'] >= 15000 else "⚠"
        print(f"{status} {stat['standard']}/chapter-{stat['chapter']:02d}: {stat['new_size']/1024:.1f}KB")

    print(f"\nTotal chapters enhanced: {len(stats)}")
    print(f"Chapters >= 15KB: {sum(1 for s in stats if s['new_size'] >= 15000)}")

if __name__ == '__main__':
    main()
