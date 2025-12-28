# 🔐 WIA Access Control System (WIA-ACS)

## 弘益人間 - Benefit All Humanity

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/wia-official/wia-acs)
[![Standard](https://img.shields.io/badge/standard-WIA--ACS-red.svg)](https://wia-acs.org)

**WIA Access Control System** is a comprehensive, open standard for unified physical and digital access control. It integrates RBAC, ABAC, biometric authentication, and Zero Trust architecture to provide enterprise-grade security for both physical spaces and digital resources.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Four-Phase Implementation](#four-phase-implementation)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Directory Structure](#directory-structure)
- [API & SDKs](#api--sdks)
- [Integration](#integration)
- [Certification](#certification)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

WIA-ACS provides a standardized approach to access control that eliminates vendor lock-in, enables interoperability, and supports modern security requirements including:

- **Unified Access Control:** Single standard for physical (doors, gates) and digital (applications, APIs) access
- **Multiple Authentication Methods:** Badges, biometrics, smart cards, RFID, NFC, mobile credentials, MFA
- **Flexible Authorization:** Support for both RBAC (Role-Based) and ABAC (Attribute-Based) access control
- **Zero Trust Architecture:** Continuous verification, least privilege, microsegmentation
- **Comprehensive Auditing:** Tamper-proof event logs with cryptographic integrity
- **Enterprise Integration:** LDAP, Active Directory, PACS, biometric systems, cloud IdPs

---

## ✨ Features

### Security
- ✅ **TLS 1.3** mandatory encryption
- ✅ **Multi-Factor Authentication** (MFA)
- ✅ **Zero Trust** principles
- ✅ **Cryptographic audit trails**
- ✅ **OAuth 2.0 & OpenID Connect**
- ✅ **SAML 2.0** for enterprise SSO

### Performance
- ⚡ **< 100ms** authentication latency
- ⚡ **10M+** records/second processing
- ⚡ **99.99%** uptime guarantee
- ⚡ **Horizontal scaling** support

### Compliance
- 📜 **ISO 27001** certified
- 📜 **GDPR** compliant
- 📜 **SOC 2 Type II**
- 📜 **FIPS 140-2**
- 📜 **NIST SP 800-63**

---

## 🎯 Four-Phase Implementation

WIA-ACS uses a phased approach enabling incremental adoption:

### Phase 1: Data Format
Standardized JSON schemas for users, credentials, permissions, and audit events.

**Benefits:**
- Data portability
- Unified reporting
- Easy migration

**Deliverables:**
- JSON Schema definitions
- CSV/NDJSON import/export
- Validation rules

📄 [Phase 1 Specification](spec/access-control-system-PHASE-1-v1.0.md)

### Phase 2: API Interface
RESTful and gRPC APIs for authentication, authorization, and management.

**Benefits:**
- Automation
- Third-party integrations
- Custom applications

**Deliverables:**
- OpenAPI 3.0 specs
- gRPC protocol buffers
- SDK libraries

📄 [Phase 2 Specification](spec/access-control-system-PHASE-2-v1.0.md)

### Phase 3: Protocol
Secure communication using TLS 1.3, OAuth 2.0, OpenID Connect, and SAML 2.0.

**Benefits:**
- End-to-end encryption
- Single sign-on (SSO)
- Federated identity

**Deliverables:**
- Protocol specifications
- Certificate management
- Security guidelines

📄 [Phase 3 Specification](spec/access-control-system-PHASE-3-v1.0.md)

### Phase 4: Integration
Adapters for LDAP, PACS, biometric devices, smart cards, and cloud services.

**Benefits:**
- Leverage existing infrastructure
- Vendor interoperability
- Future-proof architecture

**Deliverables:**
- Integration adapters
- Reference implementations
- Deployment guides

📄 [Phase 4 Specification](spec/access-control-system-PHASE-4-v1.0.md)

---

## 🚀 Quick Start

### 1. Explore the Interactive Simulator

Open `index.html` in your browser to:
- View the landing page with full documentation
- Try the interactive simulator with 5 tabs (Data Format, Algorithms, Protocol, Integration, Test)
- Experience WIA-ACS capabilities hands-on

```bash
cd /home/user/wia-standards/standards/access-control-system
open index.html  # or double-click on macOS
```

### 2. Install the TypeScript SDK

```bash
npm install @wia/acs-sdk
```

### 3. Basic Usage Example

```typescript
import { WiaAcsClient } from '@wia/acs-sdk';

// Initialize client
const client = new WiaAcsClient({
  apiUrl: 'https://api.example.com',
  apiKey: 'your-api-key'
});

// Authenticate a user
const authResult = await client.authenticate({
  credentialId: 'cred-xyz789',
  factors: [
    { type: 'pin', value: '1234', factor_type: 'something_you_know', method: 'pin', strength: 'medium' }
  ]
});

console.log('Access token:', authResult.access_token);

// Check authorization
const authzResult = await client.authorize({
  userId: authResult.user.user_id,
  resource: { type: 'door', id: 'door-main-lobby' },
  action: 'entry'
});

if (authzResult.decision === 'permit') {
  console.log('✅ Access granted!');
} else {
  console.log('❌ Access denied:', authzResult.reason);
}
```

---

## 📚 Documentation

### Complete E-book Guide

- **English:** [ebook/en/index.html](ebook/en/index.html)
  - Chapter 1: Introduction to Access Control Systems
  - Chapter 2: Current Challenges in Physical & Digital Security
  - Chapter 3: WIA Standard Overview
  - Chapter 4: Phase 1 - Data Format
  - Chapter 5: Phase 2 - API Interface
  - Chapter 6: Phase 3 - Protocol
  - Chapter 7: Phase 4 - Integration
  - Chapter 8: Implementation & Certification

- **한국어:** [ebook/ko/index.html](ebook/ko/index.html)
  - 제1장: 출입통제시스템 개론
  - 제2장: 물리적 및 디지털 보안의 현재 과제
  - 제3장: WIA 표준 개요
  - 제4장~제8장: 구현 가이드

### Specifications

- [Phase 1: Data Format](spec/access-control-system-PHASE-1-v1.0.md)
- [Phase 2: API Interface](spec/access-control-system-PHASE-2-v1.0.md)
- [Phase 3: Protocol](spec/access-control-system-PHASE-3-v1.0.md)
- [Phase 4: Integration](spec/access-control-system-PHASE-4-v1.0.md)

---

## 📁 Directory Structure

```
access-control-system/
├── index.html                 # Landing page with dark theme
├── simulator/
│   └── index.html            # Interactive 5-tab simulator
├── ebook/
│   ├── en/                   # English documentation (9 chapters)
│   │   ├── index.html
│   │   ├── chapter-01.html
│   │   └── ...
│   └── ko/                   # Korean documentation (9 chapters)
│       ├── index.html
│       └── chapter-01.html
├── spec/                     # Technical specifications
│   ├── access-control-system-PHASE-1-v1.0.md
│   ├── access-control-system-PHASE-2-v1.0.md
│   ├── access-control-system-PHASE-3-v1.0.md
│   └── access-control-system-PHASE-4-v1.0.md
├── api/
│   └── typescript/           # TypeScript/JavaScript SDK
│       ├── src/
│       │   ├── types.ts     # Type definitions
│       │   └── index.ts     # SDK implementation
│       └── package.json
└── README.md                 # This file
```

---

## 🔌 API & SDKs

### Official SDKs

| Language | Package | Documentation |
|----------|---------|---------------|
| TypeScript/JavaScript | `@wia/acs-sdk` | [API Docs](api/typescript/README.md) |
| Python | `wia-acs` | Coming soon |
| Go | `github.com/wia-official/wia-acs-go` | Coming soon |
| Java | `com.wia:acs-sdk` | Coming soon |

### REST API Endpoints

```
POST   /v1/authenticate          # Authenticate user
POST   /v1/authorize             # Check authorization
GET    /v1/users                 # List users
POST   /v1/users                 # Create user
GET    /v1/users/{id}            # Get user
PATCH  /v1/users/{id}            # Update user
DELETE /v1/users/{id}            # Delete user
POST   /v1/credentials           # Issue credential
DELETE /v1/credentials/{id}      # Revoke credential
GET    /v1/audit/events          # Query audit logs
POST   /v1/webhooks              # Create webhook
```

Full API reference: [Phase 2 Specification](spec/access-control-system-PHASE-2-v1.0.md)

---

## 🔗 Integration

### Supported Systems

#### Directory Services
- ✅ LDAP
- ✅ Active Directory
- ✅ Azure AD (SCIM)
- ✅ Okta
- ✅ Auth0

#### Physical Access Control Systems (PACS)
- ✅ HID VertX
- ✅ Lenel OnGuard
- ✅ Software House CCure
- ✅ Genetec Synergis
- ✅ Honeywell Pro-Watch

#### Biometric Devices
- ✅ Fingerprint scanners (ISO 19794-2)
- ✅ Facial recognition (ISO 19794-5)
- ✅ Iris scanners (ISO 19794-6)
- ✅ Suprema, ZKTeco, HID devices

#### Smart Cards & RFID
- ✅ PIV/CAC smart cards
- ✅ MIFARE (13.56 MHz)
- ✅ Proximity cards (125 kHz)
- ✅ NFC mobile credentials
- ✅ UHF RFID (vehicle access)

Integration guide: [Phase 4 Specification](spec/access-control-system-PHASE-4-v1.0.md)

---

## 🏆 Certification

WIA-ACS offers four certification levels:

| Level | Requirements | Suitable For |
|-------|-------------|--------------|
| **Bronze** | Phase 1 (Data Format) | Basic interoperability, reporting |
| **Silver** | Phases 1 + 2 (API) | Integrated applications, automation |
| **Gold** | Phases 1 + 2 + 3 (Protocol) | Enterprise deployments, high security |
| **Platinum** | All 4 phases | Complete systems, multi-vendor environments |

### Certification Process

1. **Self-Assessment:** Complete compliance checklist
2. **Documentation Review:** Submit architecture and API docs
3. **Conformance Testing:** Run official test suite
4. **Interoperability Testing:** Cross-vendor integration
5. **Security Audit:** Third-party penetration testing
6. **Certification Granted:** Listed in official directory

Apply for certification: https://wia-acs.org/certification

---

## 🤝 Contributing

We welcome contributions! WIA-ACS is an open standard developed collaboratively.

### How to Contribute

1. **Report Issues:** [GitHub Issues](https://github.com/wia-official/wia-acs/issues)
2. **Propose Enhancements:** Submit RFCs (Request for Comments)
3. **Contribute Code:** Fork and submit pull requests
4. **Join Working Groups:** Security, Privacy, Integration, Accessibility

### Working Groups

- **Security WG:** Threat modeling, vulnerability response
- **Privacy WG:** GDPR compliance, privacy-enhancing technologies
- **Integration WG:** Vendor adapters, interoperability testing
- **Accessibility WG:** Inclusive design, internationalization

Contact: tech@wia-acs.org

---

## 📜 License

This standard and reference implementation are licensed under the **Apache License 2.0**.

```
Copyright 2025 SmileStory Inc. / WIA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## 🌐 Resources

- **Website:** https://wia-acs.org
- **Repository:** https://github.com/wia-official/wia-acs
- **Documentation:** https://docs.wia-acs.org
- **Community:** https://community.wia-acs.org
- **Twitter:** @WIA_ACS
- **LinkedIn:** WIA Access Control System

---

## 🙏 Acknowledgments

WIA-ACS is developed by the **WIA Technical Committee** with contributions from security professionals, system integrators, and organizations worldwide.

Special thanks to:
- Enterprise security teams providing real-world requirements
- Open source contributors
- Certification partners
- Early adopters and pilot participants

---

## 📞 Support

- **Technical Support:** support@wia-acs.org
- **Sales Inquiries:** sales@wia-acs.org
- **General Questions:** info@wia-acs.org
- **Security Issues:** security@wia-acs.org (PGP key available)

---

<p align="center">
  <strong>弘益人間 (Hongik Ingan)</strong><br>
  Benefit All Humanity
</p>

<p align="center">
  © 2025 SmileStory Inc. / WIA<br>
  Made with ❤️ for a more secure world
</p>
