# WIA-DEF-005: Cyber Defense Specification v1.0

> **Standard ID:** WIA-DEF-005
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Defense & Security Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Defense Architecture](#2-defense-architecture)
3. [Threat Detection](#3-threat-detection)
4. [Incident Response](#4-incident-response)
5. [Network Hardening](#5-network-hardening)
6. [SOC Operations](#6-soc-operations)
7. [Threat Intelligence](#7-threat-intelligence)
8. [SIEM Integration](#8-siem-integration)
9. [Critical Infrastructure Protection](#9-critical-infrastructure-protection)
10. [Implementation Guidelines](#10-implementation-guidelines)

---

## 1. Introduction

### 1.1 Purpose

This specification defines a comprehensive cyber defense framework for protecting critical infrastructure, enterprise networks, and sensitive systems from cyber threats. It provides standardized approaches for threat detection, incident response, and security operations.

### 1.2 Scope

The standard covers:
- Multi-layered defense architecture (Defense-in-Depth)
- Real-time threat detection and monitoring
- Structured incident response procedures
- Network hardening and security controls
- Security Operations Center (SOC) workflows
- Threat intelligence integration
- SIEM system requirements
- Critical infrastructure protection measures

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to protect critical infrastructure and essential services that society depends on, ensuring the security, resilience, and continuity of systems that benefit all of humanity.

### 1.4 Terminology

- **IOC (Indicator of Compromise)**: Evidence of a security breach or malicious activity
- **TTPs (Tactics, Techniques, and Procedures)**: Methods used by threat actors
- **SOC (Security Operations Center)**: Centralized unit for monitoring and responding to security incidents
- **SIEM (Security Information and Event Management)**: System for collecting and analyzing security logs
- **EDR (Endpoint Detection and Response)**: Endpoint security solution with advanced threat detection
- **Zero Trust**: Security model requiring strict verification for all users and devices
- **Defense-in-Depth**: Layered security approach with multiple defensive mechanisms

---

## 2. Defense Architecture

### 2.1 Seven-Layer Defense Model

The WIA-DEF-005 defense architecture implements a seven-layer security model:

```
┌──────────────────────────────────────────────────────┐
│ Layer 7: Application Security                       │
│   - Web Application Firewall (WAF)                  │
│   - API Gateway & Rate Limiting                     │
│   - Input Validation & Sanitization                 │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│ Layer 6: Data Security                              │
│   - Encryption (at rest & in transit)               │
│   - Data Loss Prevention (DLP)                      │
│   - Database Activity Monitoring (DAM)              │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│ Layer 5: Endpoint Security                          │
│   - Endpoint Detection & Response (EDR)             │
│   - Antivirus & Anti-malware                        │
│   - Host-based Firewall & IPS                       │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│ Layer 4: Network Security                           │
│   - Next-Gen Firewall (NGFW)                        │
│   - Intrusion Detection/Prevention (IDS/IPS)        │
│   - Network Segmentation & VLANs                    │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│ Layer 3: Identity & Access Management               │
│   - Multi-Factor Authentication (MFA)               │
│   - Role-Based Access Control (RBAC)                │
│   - Privileged Access Management (PAM)              │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│ Layer 2: Infrastructure Security                    │
│   - Server & OS Hardening                           │
│   - Patch Management                                │
│   - Configuration Management                        │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│ Layer 1: Physical Security                          │
│   - Facility Access Control                         │
│   - Hardware Security Modules (HSM)                 │
│   - Environmental Monitoring                        │
└──────────────────────────────────────────────────────┘
```

### 2.2 Defense Score Calculation

Each layer receives a security score (0-100), and the overall defense posture is calculated as:

```
Defense_Score = Σ(Layer_Score × Layer_Weight) / Σ(Layer_Weight)

Where Layer_Weight:
  Layer 7 (Application): 0.15
  Layer 6 (Data): 0.20
  Layer 5 (Endpoint): 0.15
  Layer 4 (Network): 0.15
  Layer 3 (Identity): 0.20
  Layer 2 (Infrastructure): 0.10
  Layer 1 (Physical): 0.05
```

### 2.3 Zero Trust Architecture

Implementation of Zero Trust principles:

```
1. Verify explicitly
   - Authenticate every access request
   - Use all available data points (identity, location, device, etc.)

2. Use least privilege access
   - Just-in-Time (JIT) access
   - Just-Enough-Access (JEA)
   - Risk-based adaptive policies

3. Assume breach
   - Minimize blast radius with segmentation
   - Verify end-to-end encryption
   - Use analytics for threat detection
```

---

## 3. Threat Detection

### 3.1 Threat Severity Classification

```
CRITICAL (Score: 90-100)
  - Active data exfiltration
  - Ransomware encryption in progress
  - Root/Admin compromise
  - Critical infrastructure disruption

HIGH (Score: 70-89)
  - Exploit attempts on critical systems
  - Malware detected on production servers
  - Privilege escalation attempts
  - Lateral movement detected

MEDIUM (Score: 40-69)
  - Suspicious network traffic patterns
  - Failed authentication attempts (brute force)
  - Policy violations
  - Outdated/vulnerable software detected

LOW (Score: 20-39)
  - Anomalous behavior (low confidence)
  - Minor policy violations
  - Reconnaissance scanning
  - Informational alerts

INFO (Score: 0-19)
  - Normal operations logging
  - Baseline behavior
  - Audit trail events
```

### 3.2 Detection Methods

#### 3.2.1 Signature-Based Detection

```
Detection Rule Format:
{
  "rule_id": "RULE-001",
  "name": "SQL Injection Attempt",
  "pattern": "/(union|select|insert|update|delete|drop).*from/i",
  "severity": "HIGH",
  "action": "BLOCK_AND_ALERT"
}
```

#### 3.2.2 Anomaly-Based Detection

Machine learning models for behavioral analysis:

```
Anomaly_Score = Σ(Feature_Deviation × Feature_Weight)

Features:
  - Network traffic volume (weight: 0.20)
  - Connection patterns (weight: 0.15)
  - Authentication patterns (weight: 0.25)
  - Data access patterns (weight: 0.25)
  - System resource usage (weight: 0.15)

Threshold: Anomaly_Score > 0.75 → Alert
```

#### 3.2.3 Threat Intelligence Matching

```
IOC Matching Process:
1. Collect IOCs from threat feeds
2. Normalize IOC format (IP, domain, hash, URL)
3. Match against network/system logs
4. Calculate confidence score
5. Generate alert if confidence > threshold
```

### 3.3 Detection Metrics

Key Performance Indicators:

```
- Mean Time to Detect (MTTD): < 5 minutes
- Mean Time to Respond (MTTR): < 30 minutes
- False Positive Rate: < 5%
- Detection Coverage: > 95% of MITRE ATT&CK techniques
- Alert Volume: Optimized to < 100 actionable alerts/day
```

---

## 4. Incident Response

### 4.1 Incident Response Lifecycle

```
1. PREPARATION
   ├─ Develop IR plan and playbooks
   ├─ Train IR team
   ├─ Establish communication channels
   └─ Pre-configure tools and access

2. DETECTION & ANALYSIS
   ├─ Monitor security alerts
   ├─ Analyze indicators
   ├─ Determine incident scope
   └─ Classify incident severity

3. CONTAINMENT
   ├─ Short-term containment (isolate affected systems)
   ├─ Evidence preservation
   ├─ Long-term containment (apply patches, reconfigure)
   └─ Network segmentation

4. ERADICATION
   ├─ Remove malware and backdoors
   ├─ Close security gaps
   ├─ Reset compromised credentials
   └─ Verify complete removal

5. RECOVERY
   ├─ Restore systems from clean backups
   ├─ Rebuild compromised systems
   ├─ Enhanced monitoring
   └─ Gradual return to normal operations

6. POST-INCIDENT REVIEW
   ├─ Document lessons learned
   ├─ Update IR procedures
   ├─ Improve defenses
   └─ Compliance reporting
```

### 4.2 Incident Severity Matrix

```
┌──────────┬──────────┬────────────┬─────────────┬──────────────┐
│ Impact   │ Data Loss│ Downtime   │ Response SLA│ Escalation   │
├──────────┼──────────┼────────────┼─────────────┼──────────────┤
│ CRITICAL │ > 1GB    │ > 4 hours  │ 15 minutes  │ CISO + Exec  │
│ HIGH     │ > 100MB  │ > 1 hour   │ 1 hour      │ CISO         │
│ MEDIUM   │ > 10MB   │ > 30 min   │ 4 hours     │ SOC Manager  │
│ LOW      │ < 10MB   │ < 30 min   │ 24 hours    │ SOC Analyst  │
└──────────┴──────────┴────────────┴─────────────┴──────────────┘
```

### 4.3 Incident Response Playbooks

#### 4.3.1 Ransomware Response

```
PLAYBOOK: RANSOMWARE-001

1. IMMEDIATE ACTIONS (0-15 minutes)
   □ Isolate infected systems from network
   □ Identify ransomware variant
   □ Preserve forensic evidence
   □ Notify IR team and management

2. CONTAINMENT (15-60 minutes)
   □ Disable network shares
   □ Block C2 communications
   □ Identify patient zero
   □ Scan all endpoints for IOCs

3. ERADICATION (1-4 hours)
   □ Remove ransomware from systems
   □ Reset all credentials
   □ Apply security patches
   □ Update AV signatures

4. RECOVERY (4-24 hours)
   □ Verify backup integrity
   □ Restore from clean backups
   □ Test restored systems
   □ Gradual network reconnection

5. POST-INCIDENT (24-48 hours)
   □ Root cause analysis
   □ Update defenses
   □ Regulatory reporting
   □ Insurance claim filing
```

---

## 5. Network Hardening

### 5.1 Network Segmentation

```
Internet
    │
    ├─ DMZ (Demilitarized Zone)
    │   ├─ Web Servers (Public-facing)
    │   ├─ Mail Servers
    │   └─ DNS Servers
    │
    ├─ Production Network
    │   ├─ Application Servers
    │   ├─ Database Servers
    │   └─ API Gateways
    │
    ├─ Management Network
    │   ├─ Admin Workstations
    │   ├─ Jump Servers
    │   └─ Monitoring Systems
    │
    ├─ Internal Network
    │   ├─ Employee Workstations
    │   ├─ File Servers
    │   └─ Printers
    │
    └─ Critical Infrastructure (Air-Gapped)
        ├─ SCADA Systems
        ├─ Industrial Control Systems
        └─ Safety Systems
```

### 5.2 Firewall Configuration

#### 5.2.1 Default Deny Policy

```
Rule Priority: Explicit Deny > Explicit Allow > Implicit Deny

Default Rules:
1. DENY ALL incoming traffic
2. DENY ALL outgoing traffic
3. ALLOW specific approved traffic (whitelist)
4. LOG all denied connections
```

#### 5.2.2 Firewall Rule Example

```json
{
  "rule_id": "FW-001",
  "name": "Allow HTTPS from Internet to DMZ Web Servers",
  "source": "0.0.0.0/0",
  "destination": "10.1.1.0/24",
  "port": 443,
  "protocol": "TCP",
  "action": "ALLOW",
  "logging": true,
  "enabled": true
}
```

### 5.3 Intrusion Prevention

IPS configuration for critical systems:

```
Detection Modes:
  - Inline Mode: Block malicious traffic in real-time
  - Passive Mode: Alert only (for monitoring)

Signature Updates: Every 4 hours
Custom Signatures: Yes
SSL/TLS Inspection: Enabled for outbound traffic
Geo-blocking: Block traffic from high-risk countries
```

---

## 6. SOC Operations

### 6.1 SOC Staffing Model

```
Tier 1: Security Analysts (24/7)
  - Monitor security alerts
  - Initial triage and classification
  - Escalate to Tier 2 when needed
  - Response SLA: < 15 minutes

Tier 2: Incident Responders (24/7)
  - Investigate security incidents
  - Perform forensic analysis
  - Coordinate response actions
  - Response SLA: < 1 hour

Tier 3: Threat Hunters (Business hours)
  - Proactive threat hunting
  - Advanced malware analysis
  - Develop custom detection rules
  - Threat intelligence research

SOC Manager (Business hours)
  - Oversee SOC operations
  - Escalation point
  - Metrics and reporting
  - Process improvement
```

### 6.2 Alert Handling Workflow

```
┌─────────────────┐
│  Alert Generated│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Auto-Enrichment│ ← Add context (user, asset, threat intel)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Deduplication  │ ← Merge similar alerts
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Prioritization │ ← Risk-based scoring
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tier 1 Analysis │
└────┬───────┬────┘
     │       │
False│       │True
     │       │
     ▼       ▼
  Close   Escalate
           to Tier 2
```

### 6.3 SOC Metrics

```
Operational Metrics:
  - Alerts per day: < 100 (after tuning)
  - Mean Time to Acknowledge (MTTA): < 5 minutes
  - Mean Time to Detect (MTTD): < 5 minutes
  - Mean Time to Respond (MTTR): < 30 minutes
  - Mean Time to Contain (MTTC): < 2 hours
  - False Positive Rate: < 5%

Strategic Metrics:
  - Security Coverage: > 95%
  - Threat Detection Rate: > 90%
  - Incident Recurrence: < 2%
  - Analyst Burnout Rate: < 10%
  - Training Hours per Analyst: > 40 hours/year
```

---

## 7. Threat Intelligence

### 7.1 Threat Intelligence Sources

```
Open Source Intelligence (OSINT):
  - AlienVault OTX
  - MISP (Malware Information Sharing Platform)
  - Abuse.ch
  - Emerging Threats

Commercial Feeds:
  - CrowdStrike Falcon Intelligence
  - Recorded Future
  - Anomali ThreatStream
  - FireEye iSIGHT

Internal Intelligence:
  - Past incidents
  - Honeypots
  - Dark web monitoring
  - Vulnerability scans
```

### 7.2 IOC Management

#### 7.2.1 IOC Types

```
IP Addresses: Malicious IPs, C2 servers
Domain Names: Phishing domains, malware distribution sites
URLs: Malicious links, exploit kits
File Hashes: MD5, SHA1, SHA256 of malware
Email Addresses: Phishing senders, spam sources
Registry Keys: Malware persistence mechanisms
Mutex Names: Malware identifiers
```

#### 7.2.2 IOC Confidence Scoring

```
Confidence = (Source_Reliability × Evidence_Quality × Recency_Factor)

Source_Reliability:
  - Government/CERT: 1.0
  - Commercial vendor: 0.9
  - Community: 0.7
  - Anonymous: 0.5

Evidence_Quality:
  - Multiple independent sources: 1.0
  - Single verified source: 0.8
  - Unverified: 0.5

Recency_Factor:
  - < 7 days: 1.0
  - < 30 days: 0.8
  - < 90 days: 0.6
  - > 90 days: 0.4
```

### 7.3 MITRE ATT&CK Mapping

Map detections to MITRE ATT&CK framework:

```
Tactic: Initial Access
  - T1190: Exploit Public-Facing Application
  - T1133: External Remote Services
  - T1566: Phishing

Tactic: Execution
  - T1059: Command and Scripting Interpreter
  - T1203: Exploitation for Client Execution

Tactic: Persistence
  - T1053: Scheduled Task/Job
  - T1136: Create Account

... (14 tactics, 193 techniques total)
```

---

## 8. SIEM Integration

### 8.1 SIEM Architecture

```
┌─────────────────────────────────────────────────────┐
│              Data Collection Layer                  │
├─────────────────────────────────────────────────────┤
│  • Syslog                                          │
│  • Windows Event Logs                              │
│  • Network Flow (NetFlow, sFlow)                   │
│  • API Integrations (Cloud, SaaS)                  │
│  • Custom Parsers                                  │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│           Normalization & Enrichment                │
├─────────────────────────────────────────────────────┤
│  • Field mapping to common schema                  │
│  • GeoIP lookup                                    │
│  • Threat intelligence enrichment                  │
│  • Asset context addition                          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│            Correlation & Analytics                  │
├─────────────────────────────────────────────────────┤
│  • Rule-based correlation                          │
│  • Statistical analysis                            │
│  • Machine learning models                         │
│  • User behavior analytics (UBA)                   │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│          Alerting & Response                        │
├─────────────────────────────────────────────────────┤
│  • Alert generation                                │
│  • Incident creation                               │
│  • SOAR integration                                │
│  • Automated response playbooks                    │
└─────────────────────────────────────────────────────┘
```

### 8.2 Log Sources & Retention

```
Critical Systems (365 days):
  - Firewall logs
  - Authentication logs
  - Database audit logs
  - Admin activity logs

High-Value Systems (180 days):
  - Application logs
  - Web server logs
  - Email gateway logs
  - DNS logs

Standard Systems (90 days):
  - Endpoint logs
  - Network device logs
  - VPN logs

Low-Priority (30 days):
  - Debug logs
  - Performance metrics
```

### 8.3 Correlation Rules

#### 8.3.1 Brute Force Detection

```
Rule: Multiple Failed Logins
Condition: COUNT(failed_login) > 5
           WHERE user = <same_user>
           AND time_window = 5_minutes
           AND source_ip = <same_ip>
Action: ALERT + BLOCK_IP
Severity: HIGH
```

#### 8.3.2 Lateral Movement Detection

```
Rule: Suspicious RDP Usage
Condition: RDP_connection
           WHERE source = <workstation>
           AND destination = <server>
           AND user NOT IN (admin_list)
Action: ALERT + NOTIFY_SOC
Severity: HIGH
```

---

## 9. Critical Infrastructure Protection

### 9.1 SCADA/ICS Security

```
Control Network Security:
┌─────────────────────────────────────────────┐
│  Air Gap / Physical Separation              │
├─────────────────────────────────────────────┤
│  Data Diode (One-way communication)         │
├─────────────────────────────────────────────┤
│  Industrial Firewall                        │
├─────────────────────────────────────────────┤
│  Network Segmentation (VLANs)               │
├─────────────────────────────────────────────┤
│  Anomaly Detection (baseline monitoring)    │
├─────────────────────────────────────────────┤
│  Physical Access Controls                   │
└─────────────────────────────────────────────┘
```

### 9.2 Safety Instrumented Systems (SIS)

```
IEC 61511 Compliance:
  - Safety Integrity Level (SIL) assessment
  - Independent safety layer
  - Fail-safe design
  - Regular testing and validation
  - Change management procedures
```

### 9.3 OT/IT Convergence Security

```
Challenges:
  - Legacy systems without security updates
  - Real-time requirements (low latency)
  - Extended asset lifecycle (20+ years)
  - Limited visibility and monitoring

Solutions:
  - Passive monitoring (network taps)
  - Virtual patching (IPS signatures)
  - Network segmentation (Purdue Model)
  - Asset inventory and risk assessment
  - Vendor coordination for updates
```

---

## 10. Implementation Guidelines

### 10.1 Deployment Phases

```
Phase 1: Assessment (Weeks 1-4)
  □ Current security posture evaluation
  □ Asset inventory
  □ Risk assessment
  □ Gap analysis

Phase 2: Planning (Weeks 5-8)
  □ Security architecture design
  □ Tool selection
  □ Resource allocation
  □ Timeline development

Phase 3: Implementation (Weeks 9-20)
  □ Deploy security controls (Layer 1-7)
  □ Configure SIEM and SOC
  □ Integrate threat intelligence
  □ Develop playbooks

Phase 4: Testing (Weeks 21-24)
  □ Penetration testing
  □ Red team exercises
  □ Incident simulation (tabletop)
  □ Performance tuning

Phase 5: Operations (Ongoing)
  □ 24/7 SOC operations
  □ Continuous monitoring
  □ Regular updates and patching
  □ Quarterly reviews
```

### 10.2 Compliance Mapping

```
NIST CSF:
  - Identify: Asset inventory, risk assessment
  - Protect: Access controls, security training
  - Detect: Continuous monitoring, anomaly detection
  - Respond: Incident response plan, communications
  - Recover: Recovery planning, improvements

ISO 27001:
  - A.5: Information security policies
  - A.9: Access control
  - A.12: Operations security
  - A.16: Incident management
  - A.17: Business continuity

CIS Controls:
  - Control 1: Inventory of assets
  - Control 3: Data protection
  - Control 6: Access control
  - Control 13: Network monitoring
  - Control 17: Incident response
```

### 10.3 Success Metrics

```
Technical Metrics:
  - Vulnerability remediation time: < 30 days (critical)
  - Patch compliance: > 95%
  - Security event correlation: > 90%
  - Uptime of security tools: > 99.9%

Operational Metrics:
  - Incident response time: < 30 minutes
  - False positive rate: < 5%
  - SOC analyst retention: > 80%
  - Training completion: 100%

Business Metrics:
  - Security budget optimization: 10% annual savings
  - Cyber insurance premium reduction: 15-20%
  - Regulatory compliance: 100%
  - Customer trust score: > 4.5/5
```

---

## Appendix A: Threat Severity Calculator

```python
def calculate_threat_severity(threat):
    """
    Calculate threat severity score (0-100)
    """
    # Base score from threat type
    base_score = {
        'malware': 70,
        'exploit': 80,
        'phishing': 60,
        'dos': 50,
        'data_exfiltration': 90,
        'privilege_escalation': 85,
        'reconnaissance': 30
    }.get(threat.type, 50)

    # Asset criticality multiplier
    asset_multiplier = {
        'critical': 1.3,
        'high': 1.1,
        'medium': 1.0,
        'low': 0.8
    }.get(threat.asset_criticality, 1.0)

    # Confidence adjustment
    confidence_factor = threat.confidence / 100.0

    # Calculate final score
    severity_score = min(100, base_score * asset_multiplier * confidence_factor)

    # Classify severity
    if severity_score >= 90:
        return 'CRITICAL', severity_score
    elif severity_score >= 70:
        return 'HIGH', severity_score
    elif severity_score >= 40:
        return 'MEDIUM', severity_score
    elif severity_score >= 20:
        return 'LOW', severity_score
    else:
        return 'INFO', severity_score
```

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA-DEF-005 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
