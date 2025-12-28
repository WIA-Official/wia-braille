# WIA-COMM-019: Real-Time Communication Specification v1.0

> **Standard ID:** WIA-COMM-019
> **Version:** 1.0.0
> **Published:** 2025-12-26
> **Status:** Active
> **Authors:** WIA Real-Time Communication Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [WebRTC Architecture](#2-webrtc-architecture)
3. [SIP (Session Initiation Protocol)](#3-sip-session-initiation-protocol)
4. [RTP/RTCP Media Transport](#4-rtprtcp-media-transport)
5. [SRTP Encryption](#5-srtp-encryption)
6. [Jitter Buffer Management](#6-jitter-buffer-management)
7. [Codec Selection and Negotiation](#7-codec-selection-and-negotiation)
8. [NAT Traversal (STUN/TURN/ICE)](#8-nat-traversal-stunturnnice)
9. [Signaling Servers](#9-signaling-servers)
10. [Quality of Experience (QoE)](#10-quality-of-experience-qoe)
11. [Low-Latency Streaming](#11-low-latency-streaming)
12. [Video Conferencing Systems](#12-video-conferencing-systems)
13. [Push-to-Talk Systems](#13-push-to-talk-systems)
14. [Security and Privacy](#14-security-and-privacy)
15. [Implementation Guidelines](#15-implementation-guidelines)
16. [References](#16-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines a comprehensive framework for real-time communication systems, enabling low-latency voice, video, and data transmission across diverse network environments with high quality and security.

### 1.2 Scope

The standard covers:
- WebRTC peer-to-peer communication architecture
- SIP for call signaling and session management
- RTP/RTCP for media transport and quality feedback
- SRTP for secure media encryption
- Adaptive jitter buffer management
- Video and audio codec selection (VP8/VP9, H.264, Opus, etc.)
- NAT traversal using STUN, TURN, and ICE
- Signaling server protocols (WebSocket, SIP, XMPP)
- Quality of Experience (QoE) measurement and optimization
- Low-latency streaming techniques
- Multi-party video conferencing (MCU/SFU architectures)
- Push-to-talk communication systems

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to connect people seamlessly and securely, regardless of geographical or technological barriers, fostering global communication and collaboration.

### 1.4 Terminology

- **WebRTC**: Web Real-Time Communication
- **SIP**: Session Initiation Protocol
- **RTP**: Real-time Transport Protocol
- **RTCP**: RTP Control Protocol
- **SRTP**: Secure RTP
- **ICE**: Interactive Connectivity Establishment
- **STUN**: Session Traversal Utilities for NAT
- **TURN**: Traversal Using Relays around NAT
- **SDP**: Session Description Protocol
- **NAT**: Network Address Translation
- **MCU**: Multipoint Control Unit
- **SFU**: Selective Forwarding Unit
- **QoE**: Quality of Experience
- **MOS**: Mean Opinion Score
- **PTT**: Push-to-Talk

---

## 2. WebRTC Architecture

### 2.1 Overview

WebRTC provides browser-based real-time communication without plugins, using open standards for audio, video, and data exchange.

### 2.2 Core Components

#### 2.2.1 PeerConnection API

The central interface for WebRTC peer-to-peer connections:

```javascript
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:turn.example.com:3478',
      username: 'user',
      credential: 'pass'
    }
  ],
  iceCandidatePoolSize: 10,
  bundlePolicy: 'max-bundle',
  rtcpMuxPolicy: 'require'
};

const pc = new RTCPeerConnection(configuration);
```

**Key Methods:**
- `createOffer()`: Generate SDP offer
- `createAnswer()`: Generate SDP answer
- `setLocalDescription(desc)`: Set local SDP
- `setRemoteDescription(desc)`: Set remote SDP
- `addIceCandidate(candidate)`: Add ICE candidate
- `addTrack(track, stream)`: Add media track
- `addTransceiver(kind, init)`: Add transceiver

**Connection States:**
- `new`: Initial state
- `connecting`: ICE/DTLS in progress
- `connected`: Media flowing
- `disconnected`: Temporary disconnection
- `failed`: Connection failed
- `closed`: Connection closed

#### 2.2.2 MediaStream API

Access to camera and microphone:

```javascript
const constraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    sampleRate: 48000,
    channelCount: 2
  },
  video: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
    frameRate: { min: 15, ideal: 30, max: 60 },
    facingMode: 'user'
  }
};

const stream = await navigator.mediaDevices.getUserMedia(constraints);
```

**MediaStreamTrack Properties:**
- `kind`: 'audio' or 'video'
- `label`: Device label
- `enabled`: Track enabled state
- `muted`: Track muted state
- `readyState`: 'live' or 'ended'

#### 2.2.3 DataChannel API

Arbitrary data exchange:

```javascript
const dataChannel = pc.createDataChannel('chat', {
  ordered: true,
  maxRetransmits: 3,
  protocol: 'json'
});

dataChannel.onopen = () => {
  dataChannel.send(JSON.stringify({ msg: 'Hello' }));
};

dataChannel.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```

**Properties:**
- `ordered`: In-order delivery guarantee
- `maxPacketLifeTime`: Maximum retransmission time
- `maxRetransmits`: Maximum retransmission count
- `protocol`: Subprotocol name
- `negotiated`: Pre-negotiated channel
- `id`: Channel identifier

### 2.3 Signaling Flow

WebRTC requires external signaling for peer discovery and session negotiation:

```
Alice                    Signaling Server                    Bob
  |                              |                              |
  |------ createOffer() -------->|                              |
  |                              |                              |
  |                              |-------- offer SDP --------->|
  |                              |                              |
  |                              |<------- answer SDP ---------|
  |                              |                              |
  |<----- answer SDP ------------|                              |
  |                              |                              |
  |------ ICE candidate -------->|                              |
  |                              |------ ICE candidate -------->|
  |                              |                              |
  |<----- ICE candidate ---------|                              |
  |                              |<----- ICE candidate ---------|
  |                              |                              |
  |<=========== Media Connection (P2P) =====================>|
```

### 2.4 SDP (Session Description Protocol)

SDP describes media capabilities and parameters:

```
v=0
o=- 1234567890 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0 1
a=msid-semantic: WMS stream1

m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:F7gI
a=ice-pwd:x9cml/YzichV2+XlhiMu8g
a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:5D:48
a=setup:actpass
a=mid:0
a=sendrecv
a=rtcp-mux
a=rtpmap:111 opus/48000/2
a=fmtp:111 minptime=10;useinbandfec=1

m=video 9 UDP/TLS/RTP/SAVPF 96 97 98
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:F7gI
a=ice-pwd:x9cml/YzichV2+XlhiMu8g
a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:5D:48
a=setup:actpass
a=mid:1
a=sendrecv
a=rtcp-mux
a=rtpmap:96 VP8/90000
a=rtpmap:97 VP9/90000
a=rtpmap:98 H264/90000
a=fmtp:98 profile-level-id=42e01f;packetization-mode=1
```

**SDP Sections:**
- **Session-level**: Global parameters
- **Media-level**: Per-media description (audio, video, data)
- **Attributes**: Codec parameters, encryption, ICE credentials

---

## 3. SIP (Session Initiation Protocol)

### 3.1 SIP Architecture

SIP is a signaling protocol for initiating, maintaining, and terminating real-time sessions:

**Components:**
- **User Agent (UA)**: Endpoint device
- **Proxy Server**: Routes requests
- **Registrar**: Registers user locations
- **Redirect Server**: Returns alternate addresses
- **Back-to-Back User Agent (B2BUA)**: Intermediary UA

### 3.2 SIP Messages

#### 3.2.1 Request Methods

| Method | Description | Usage |
|--------|-------------|-------|
| INVITE | Initiate session | Start call |
| ACK | Acknowledge INVITE | Confirm session |
| BYE | Terminate session | End call |
| CANCEL | Cancel pending request | Cancel ringing |
| REGISTER | Register location | User registration |
| OPTIONS | Query capabilities | Presence check |
| INFO | Mid-session info | DTMF, events |
| PRACK | Provisional acknowledgment | Reliable provisional |
| UPDATE | Session modification | Mid-call update |
| REFER | Transfer request | Call transfer |
| SUBSCRIBE | Subscribe to event | Presence subscription |
| NOTIFY | Event notification | Presence update |

#### 3.2.2 Response Codes

**1xx - Provisional:**
- 100 Trying
- 180 Ringing
- 181 Call Is Being Forwarded
- 183 Session Progress

**2xx - Success:**
- 200 OK

**3xx - Redirection:**
- 301 Moved Permanently
- 302 Moved Temporarily

**4xx - Client Error:**
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 486 Busy Here
- 487 Request Terminated

**5xx - Server Error:**
- 500 Server Internal Error
- 503 Service Unavailable

**6xx - Global Failure:**
- 600 Busy Everywhere
- 603 Decline

### 3.3 SIP Call Flow

Basic call establishment:

```
Alice (UA)                  Proxy                    Bob (UA)
    |                         |                         |
    |------ INVITE ---------->|                         |
    |<----- 100 Trying -------|                         |
    |                         |------ INVITE ---------->|
    |                         |<----- 100 Trying -------|
    |                         |<----- 180 Ringing ------|
    |<----- 180 Ringing ------|                         |
    |                         |<----- 200 OK ----------|
    |<----- 200 OK -----------|                         |
    |------ ACK ------------->|------ ACK ------------->|
    |                         |                         |
    |<=============== RTP Media Stream ===============>|
    |                         |                         |
    |------ BYE ------------->|------ BYE ------------->|
    |<----- 200 OK -----------|<----- 200 OK -----------|
```

### 3.4 SIP Message Format

Example INVITE:

```
INVITE sip:bob@example.com SIP/2.0
Via: SIP/2.0/UDP pc33.atlanta.com;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: Bob <sip:bob@example.com>
From: Alice <sip:alice@atlanta.com>;tag=1928301774
Call-ID: a84b4c76e66710@pc33.atlanta.com
CSeq: 314159 INVITE
Contact: <sip:alice@pc33.atlanta.com>
Content-Type: application/sdp
Content-Length: 142

v=0
o=alice 2890844526 2890844526 IN IP4 pc33.atlanta.com
s=Session SDP
c=IN IP4 pc33.atlanta.com
t=0 0
m=audio 49170 RTP/AVP 0
a=rtpmap:0 PCMU/8000
```

---

## 4. RTP/RTCP Media Transport

### 4.1 RTP (Real-time Transport Protocol)

RTP provides end-to-end delivery for real-time data with sequencing and timestamping.

#### 4.1.1 RTP Header Format

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|X|  CC   |M|     PT      |       Sequence Number         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           Timestamp                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Synchronization Source (SSRC) Identifier            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Contributing Source (CSRC) Identifiers             |
|                             ....                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

**Fields:**
- **V (Version)**: RTP version (2)
- **P (Padding)**: Padding flag
- **X (Extension)**: Header extension flag
- **CC (CSRC Count)**: Number of CSRC identifiers
- **M (Marker)**: Marker bit (frame boundary)
- **PT (Payload Type)**: Codec identifier
- **Sequence Number**: Packet sequence (16-bit)
- **Timestamp**: Media timestamp (32-bit)
- **SSRC**: Synchronization source identifier
- **CSRC**: Contributing source identifiers (for mixers)

#### 4.1.2 Payload Types

Common payload types:

| PT | Encoding | Media Type | Clock Rate |
|----|----------|------------|------------|
| 0 | PCMU | Audio | 8000 Hz |
| 3 | GSM | Audio | 8000 Hz |
| 4 | G723 | Audio | 8000 Hz |
| 8 | PCMA | Audio | 8000 Hz |
| 9 | G722 | Audio | 8000 Hz |
| 18 | G729 | Audio | 8000 Hz |
| 96-127 | Dynamic | Audio/Video | Varies |

**Dynamic Payload Types** (96-127) are negotiated via SDP for:
- Opus (typically 111)
- VP8 (typically 96)
- VP9 (typically 98)
- H.264 (typically 102)

### 4.2 RTCP (RTP Control Protocol)

RTCP provides feedback on media quality and participant information.

#### 4.2.1 RTCP Packet Types

| Type | Name | Description |
|------|------|-------------|
| 200 | SR | Sender Report |
| 201 | RR | Receiver Report |
| 202 | SDES | Source Description |
| 203 | BYE | Goodbye |
| 204 | APP | Application-defined |
| 205 | RTPFB | Transport Layer Feedback |
| 206 | PSFB | Payload-specific Feedback |

#### 4.2.2 Sender Report (SR)

Includes transmission statistics:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|    RC   |   PT=SR=200   |             length            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         SSRC of sender                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|              NTP timestamp, most significant word             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|             NTP timestamp, least significant word             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         RTP timestamp                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     sender's packet count                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      sender's octet count                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

#### 4.2.3 Receiver Report (RR)

Includes reception statistics:

- Fraction lost: Packet loss fraction since last report
- Cumulative packets lost: Total packets lost
- Extended highest sequence number: Last sequence + cycles
- Interarrival jitter: Statistical variance of RTP packet arrival
- Last SR timestamp (LSR): NTP timestamp from last SR
- Delay since last SR (DLSR): Delay for RTT calculation

#### 4.2.4 RTCP Extended Reports (XR)

Enhanced quality metrics:
- VoIP Metrics Block (RFC 3611)
- Statistics Summary Block
- Delay Metrics Block
- Discard Metrics Block

### 4.3 RTP Session Multiplexing

**BUNDLE (RFC 8843):**
- Multiplex audio/video on single 5-tuple
- Reduce ICE overhead
- Single DTLS handshake

**RTCP Multiplexing (RFC 5761):**
- Share port for RTP and RTCP
- Differentiate via packet type (RTP PT < 64, RTCP > 127)

---

## 5. SRTP Encryption

### 5.1 Overview

SRTP (Secure RTP) provides confidentiality, authentication, and replay protection for RTP/RTCP.

### 5.2 Encryption Algorithms

**Cipher Suites:**

| Suite | Cipher | Auth | Key Length |
|-------|--------|------|------------|
| AES_CM_128_HMAC_SHA1_80 | AES-128-CTR | HMAC-SHA1-80 | 128-bit |
| AES_CM_128_HMAC_SHA1_32 | AES-128-CTR | HMAC-SHA1-32 | 128-bit |
| AEAD_AES_128_GCM | AES-128-GCM | GCM | 128-bit |
| AEAD_AES_256_GCM | AES-256-GCM | GCM | 256-bit |

**Recommended:** AEAD_AES_128_GCM (authenticated encryption)

### 5.3 Key Management

#### 5.3.1 DTLS-SRTP (RFC 5764)

WebRTC uses DTLS for key exchange:

```
Client                                         Server
  |                                               |
  |<============ DTLS Handshake ================>|
  |                                               |
  | ClientHello (use_srtp extension)              |
  |---------------------------------------------->|
  |                                               |
  |                       ServerHello, Certificate|
  |<----------------------------------------------|
  |                                               |
  | Certificate, ClientKeyExchange, Finished      |
  |---------------------------------------------->|
  |                                               |
  |                                      Finished |
  |<----------------------------------------------|
  |                                               |
  |<=========== Derive SRTP Keys ===============>|
  |                                               |
  |<=========== SRTP Media Flow =================>|
```

**Key Derivation:**
- Master key and salt extracted from DTLS
- SRTP keys derived using PRF
- Separate keys for sending/receiving
- Perfect forward secrecy

#### 5.3.2 SDES (RFC 4568)

Legacy key exchange via SDP (not recommended for WebRTC):

```
a=crypto:1 AES_CM_128_HMAC_SHA1_80 \
  inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
```

### 5.4 Security Features

**Replay Protection:**
- Replay list or window-based detection
- Sequence number tracking
- Timestamp validation

**Authentication:**
- HMAC-SHA1 or GCM auth tag
- Prevents tampering
- Source validation

**Encryption:**
- AES counter mode or GCM
- Per-packet IV
- Confidentiality of media

---

## 6. Jitter Buffer Management

### 6.1 Purpose

Jitter buffers compensate for network delay variations, ensuring smooth media playback.

### 6.2 Jitter Buffer Types

#### 6.2.1 Fixed Jitter Buffer

Constant delay:

```
Delay = Initial_Offset (e.g., 50ms)
```

**Pros:**
- Simple implementation
- Predictable latency

**Cons:**
- May underflow or overflow
- Not adaptive to network conditions

#### 6.2.2 Adaptive Jitter Buffer

Dynamic delay based on network conditions:

```
Delay = Base_Delay + Adaptive_Component

Adaptive_Component = f(jitter, packet_loss, buffer_occupancy)
```

**Algorithm:**
1. Measure inter-arrival jitter
2. Adjust buffer size dynamically
3. Balance latency vs. quality

**Parameters:**
- `min_delay`: Minimum buffer size (e.g., 20ms)
- `max_delay`: Maximum buffer size (e.g., 200ms)
- `target_delay`: Optimal delay (e.g., 60ms)
- `jitter_threshold`: Trigger for adjustment

### 6.3 Packet Loss Concealment (PLC)

When packets are lost or late:

**Audio PLC:**
- **Interpolation**: Generate audio from adjacent packets
- **Waveform substitution**: Repeat previous waveform
- **Model-based**: Use codec-specific models (Opus PLC)
- **Comfort noise**: Generate background noise

**Video PLC:**
- **Frame freeze**: Repeat last frame
- **Error concealment**: Spatial/temporal interpolation
- **Slice copying**: Copy undamaged slices
- **Motion compensation**: Estimate missing blocks

### 6.4 Time Stretching/Compression

Adjust playback speed to manage buffer:

**Techniques:**
- **WSOLA** (Waveform Similarity Overlap-Add)
- **SOLA** (Synchronous Overlap-Add)
- **Phase vocoder**: Frequency domain modification

**Parameters:**
- Stretch factor: 0.9-1.1 (±10%)
- Segment size: 10-20ms
- Overlap: 25-50%

### 6.5 Voice Activity Detection (VAD)

Detect speech vs. silence:

**Benefits:**
- Skip playout during silence
- Faster buffer adaptation
- Bandwidth savings (discontinuous transmission)

**Algorithms:**
- Energy-based threshold
- Zero-crossing rate
- Spectral entropy
- Machine learning models

---

## 7. Codec Selection and Negotiation

### 7.1 Video Codecs

#### 7.1.1 VP8

Open-source codec from Google (WebM project):

**Features:**
- Royalty-free
- Profile 0-3
- Resolution up to 1080p (practical limit)
- Bitrate range: 100-2000 kbps

**SDP Example:**
```
a=rtpmap:96 VP8/90000
a=rtcp-fb:96 nack
a=rtcp-fb:96 nack pli
a=rtcp-fb:96 ccm fir
```

#### 7.1.2 VP9

Next-generation VP codec:

**Features:**
- 30-50% better compression than VP8
- Resolution up to 8K
- Scalable Video Coding (SVC)
- Profile 0-3

**SDP Example:**
```
a=rtpmap:98 VP9/90000
a=fmtp:98 profile-id=0
a=rtcp-fb:98 nack
a=rtcp-fb:98 nack pli
```

#### 7.1.3 H.264/AVC

Industry standard codec:

**Profiles:**
- **Baseline** (BP): Low complexity, mobile
- **Main** (MP): Broadcast quality
- **High** (HiP): HD/UHD quality

**SDP Example:**
```
a=rtpmap:102 H264/90000
a=fmtp:102 profile-level-id=42e01f;packetization-mode=1
a=rtcp-fb:102 nack
a=rtcp-fb:102 nack pli
a=rtcp-fb:102 ccm fir
```

**profile-level-id:**
- `42e01f`: Baseline Profile, Level 3.1
- `4d001f`: Main Profile, Level 3.1
- `64001f`: High Profile, Level 3.1

#### 7.1.4 H.265/HEVC

High-efficiency codec:

**Features:**
- 50% better compression than H.264
- Resolution up to 8K
- Main, Main 10 profiles

**Licensing:** Patent-encumbered (use with caution)

#### 7.1.5 AV1

Next-generation open codec:

**Features:**
- 30% better than VP9 / H.265
- Royalty-free
- Alliance for Open Media (AOMedia)

**Status:** Emerging support in browsers

### 7.2 Audio Codecs

#### 7.2.1 Opus (Recommended)

Universal audio codec (RFC 6716):

**Features:**
- Bitrate: 6-510 kbps
- Sampling: 8-48 kHz
- Low latency: 5-66.5ms
- Combines SILK (speech) + CELT (music)
- Adaptive mode switching

**SDP Example:**
```
a=rtpmap:111 opus/48000/2
a=fmtp:111 minptime=10;useinbandfec=1;stereo=1
```

**Parameters:**
- `minptime`: Minimum packet time (10ms)
- `useinbandfec`: Forward error correction
- `stereo`: Stereo encoding
- `maxaveragebitrate`: Bitrate limit

#### 7.2.2 G.711 (PCMU/PCMA)

Classic telephony codec:

**Features:**
- 64 kbps fixed bitrate
- 8 kHz sampling
- µ-law (PCMU) in North America
- A-law (PCMA) in Europe

**SDP Example:**
```
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
```

#### 7.2.3 G.722

Wideband telephony codec:

**Features:**
- 64 kbps bitrate
- 16 kHz sampling (7 kHz bandwidth)
- Better quality than G.711

**SDP Example:**
```
a=rtpmap:9 G722/8000
```

Note: Clock rate is 8000 Hz for historical reasons, but actual sampling is 16 kHz.

### 7.3 Codec Negotiation

#### 7.3.1 SDP Offer/Answer

Codec capabilities exchanged via SDP:

**Offer (Alice):**
```
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 9 0 8
a=rtpmap:111 opus/48000/2
a=rtpmap:103 ISAC/16000
a=rtpmap:9 G722/8000
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
```

**Answer (Bob):**
```
m=audio 9 UDP/TLS/RTP/SAVPF 111 9
a=rtpmap:111 opus/48000/2
a=rtpmap:9 G722/8000
```

Bob chooses Opus and G.722 from Alice's offer.

#### 7.3.2 Codec Preference

Set codec order in SDP (first = most preferred):

```javascript
const transceivers = pc.getTransceivers();
transceivers.forEach(transceiver => {
  if (transceiver.sender.track.kind === 'video') {
    const codecs = RTCRtpSender.getCapabilities('video').codecs;
    const vp9 = codecs.find(c => c.mimeType === 'video/VP9');
    const vp8 = codecs.find(c => c.mimeType === 'video/VP8');
    const h264 = codecs.find(c => c.mimeType === 'video/H264');
    transceiver.setCodecPreferences([vp9, vp8, h264]);
  }
});
```

### 7.4 Bandwidth Adaptation

Dynamic bitrate adjustment based on network conditions:

**Techniques:**
- **REMB** (Receiver Estimated Maximum Bitrate)
- **TWCC** (Transport-Wide Congestion Control)
- **GCC** (Google Congestion Control)

**SDP:**
```
a=rtcp-fb:96 goog-remb
a=rtcp-fb:96 transport-cc
```

---

## 8. NAT Traversal (STUN/TURN/ICE)

### 8.1 NAT Types

| NAT Type | P2P Connectivity | Description |
|----------|------------------|-------------|
| Full Cone | Excellent | Any external host can send to mapped port |
| Restricted Cone | Good | External host must be previously contacted |
| Port Restricted | Fair | External host+port must be previously contacted |
| Symmetric | Poor | Different mapping for each destination |

### 8.2 STUN (RFC 5389)

Session Traversal Utilities for NAT:

**Purpose:**
- Discover public IP address
- Determine NAT type
- Keep NAT bindings alive

**Message Flow:**
```
Client                              STUN Server
  |                                      |
  |------ Binding Request -------------->|
  |                                      |
  |<----- Binding Response --------------|
  |       (XOR-MAPPED-ADDRESS)           |
```

**Binding Response:**
```json
{
  "type": "binding-response",
  "xor_mapped_address": {
    "ip": "203.0.113.45",
    "port": 54321
  }
}
```

**STUN Servers (Public):**
- `stun:stun.l.google.com:19302`
- `stun:stun1.l.google.com:19302`
- `stun:stun.services.mozilla.com`

### 8.3 TURN (RFC 5766)

Traversal Using Relays around NAT:

**Purpose:**
- Relay media when direct P2P fails
- Support symmetric NATs
- Fallback mechanism

**Message Flow:**
```
Client                         TURN Server                   Peer
  |                                 |                          |
  |--- Allocate Request ----------->|                          |
  |<-- Allocate Success (relayed) --|                          |
  |                                 |                          |
  |--- CreatePermission (peer IP) ->|                          |
  |<-- Success ---------------------|                          |
  |                                 |                          |
  |--- ChannelBind (peer) --------->|                          |
  |<-- Success ---------------------|                          |
  |                                 |                          |
  |=== ChannelData ================>|=== ChannelData =========>|
  |                                 |                          |
  |<== ChannelData =================|<== ChannelData ==========|
```

**TURN Credentials:**
```javascript
{
  urls: 'turn:turn.example.com:3478',
  username: 'user1234',
  credential: 'pass5678',
  credentialType: 'password'
}
```

**Protocols:**
- UDP (default, lowest latency)
- TCP (firewall-friendly)
- TLS (encrypted signaling)

### 8.4 ICE (RFC 8445)

Interactive Connectivity Establishment:

**Process:**
1. **Gather candidates**: host, srflx, relay
2. **Exchange candidates**: Via signaling
3. **Pair candidates**: Create candidate pairs
4. **Check connectivity**: STUN binding checks
5. **Nominate pair**: Select best working pair

**Candidate Types:**

| Type | Description | Priority |
|------|-------------|----------|
| host | Local network interface | High |
| srflx | Server reflexive (STUN) | Medium |
| prflx | Peer reflexive (discovered) | Medium |
| relay | TURN relay | Low |

**Candidate Format:**
```
candidate:1 1 UDP 2130706431 192.168.1.100 54321 typ host
candidate:2 1 UDP 1694498815 203.0.113.45 54322 typ srflx raddr 192.168.1.100 rport 54321
candidate:3 1 UDP 16777215 198.51.100.10 60000 typ relay raddr 203.0.113.45 rport 54322
```

**Fields:**
- Foundation: Candidate group identifier
- Component: 1=RTP, 2=RTCP
- Transport: UDP/TCP
- Priority: Calculated priority
- IP/Port: Connection endpoint
- Type: host/srflx/prflx/relay
- raddr/rport: Related address/port

**Priority Calculation:**
```
priority = (2^24 * type_preference) +
           (2^8 * local_preference) +
           (256 - component_id)
```

**Type Preferences:**
- host: 126
- srflx: 100
- relay: 0

### 8.5 Trickle ICE

Progressive candidate exchange:

**Benefits:**
- Faster connection setup
- Start connectivity checks earlier
- Don't wait for all candidates

**Flow:**
```
Alice                                                       Bob
  |                                                          |
  |------ createOffer() + local candidates (host) --------->|
  |                                                          |
  |                 (continue gathering srflx, relay)        |
  |                                                          |
  |------ additional ICE candidates -------------------->   |
  |                                                          |
  |<----- createAnswer() + Bob's candidates -----------------|
  |                                                          |
  |<----- additional ICE candidates -------------------------|
  |                                                          |
  |<=========== Start connectivity checks ================>|
```

---

## 9. Signaling Servers

### 9.1 WebSocket Signaling

Real-time bidirectional signaling:

**Server (Node.js):**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'register':
        clients.set(data.userId, ws);
        break;

      case 'offer':
      case 'answer':
      case 'ice-candidate':
        const recipientWs = clients.get(data.to);
        if (recipientWs) {
          recipientWs.send(JSON.stringify(data));
        }
        break;
    }
  });

  ws.on('close', () => {
    // Remove client
  });
});
```

**Client:**
```javascript
const ws = new WebSocket('wss://signal.example.com');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'register',
    userId: 'alice'
  }));
};

ws.onmessage = async (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case 'offer':
      await pc.setRemoteDescription(data.offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      ws.send(JSON.stringify({
        type: 'answer',
        to: data.from,
        answer: answer
      }));
      break;

    case 'ice-candidate':
      await pc.addIceCandidate(data.candidate);
      break;
  }
};
```

### 9.2 SIP over WebSocket (RFC 7118)

SIP signaling in browsers:

**Configuration:**
```javascript
const sipConfig = {
  uri: 'sip:alice@example.com',
  wsServers: ['wss://sip.example.com:7443'],
  authorizationUser: 'alice',
  password: 'secret',
  registerExpires: 3600,
  sessionDescriptionHandlerFactoryOptions: {
    constraints: {
      audio: true,
      video: true
    }
  }
};
```

### 9.3 XMPP (Jingle)

XMPP-based signaling using Jingle extensions:

**Features:**
- Presence and roster management
- Security (TLS, SASL)
- Federation support

---

## 10. Quality of Experience (QoE)

### 10.1 Objective Metrics

#### 10.1.1 MOS (Mean Opinion Score)

5-point scale for perceived quality:

| MOS | Quality | Impairment |
|-----|---------|------------|
| 5.0 | Excellent | Imperceptible |
| 4.0 | Good | Perceptible but not annoying |
| 3.0 | Fair | Slightly annoying |
| 2.0 | Poor | Annoying |
| 1.0 | Bad | Very annoying |

**E-Model (G.107):**

Calculates MOS from network parameters:

```
R = R0 - Is - Id - Ie + A

MOS = 1 + 0.035*R + 7*10^-6*R*(R-60)*(100-R)
```

Where:
- R0: Basic signal-to-noise ratio
- Is: Simultaneous impairment
- Id: Delay impairment
- Ie: Equipment impairment
- A: Advantage factor

#### 10.1.2 PESQ/POLQA

Perceptual audio quality measurement:

**PESQ (ITU-T P.862):**
- Range: -0.5 to 4.5
- Maps to MOS
- Narrowband (8 kHz) and wideband (16 kHz)

**POLQA (ITU-T P.863):**
- Next-generation PESQ
- Super-wideband (48 kHz)
- Better correlation with subjective scores

#### 10.1.3 VMAF

Video quality metric from Netflix:

**Features:**
- Machine learning-based
- Scale: 0-100
- Correlates well with subjective quality
- Considers spatial and temporal artifacts

### 10.2 Network Metrics

#### 10.2.1 Latency

End-to-end delay:

**Components:**
- Encoding delay
- Packetization delay
- Network transmission delay
- Jitter buffer delay
- Decoding delay

**Targets:**
- VoIP: < 150ms (one-way)
- Video conferencing: < 150ms
- Interactive gaming: < 50ms

**Measurement:**
Via RTCP:

```
RTT = Current_Time - LSR - DLSR
One_Way_Delay = RTT / 2 (estimate)
```

#### 10.2.2 Jitter

Variation in packet arrival times:

**Calculation (RFC 3550):**
```
J(i) = J(i-1) + (|D(i-1,i)| - J(i-1)) / 16

D(i-1,i) = (R(i) - S(i)) - (R(i-1) - S(i-1))
```

Where:
- R(i): Receive timestamp
- S(i): Send timestamp (RTP)
- J(i): Smoothed jitter

**Targets:**
- VoIP: < 30ms
- Video: < 50ms

#### 10.2.3 Packet Loss

**Calculation:**
```
loss_rate = (packets_lost / packets_sent) * 100%
```

**Targets:**
- VoIP: < 1%
- Video: < 3%

**Mitigation:**
- Forward error correction (FEC)
- Packet loss concealment (PLC)
- Redundancy (RED)

### 10.3 WebRTC Statistics API

```javascript
const stats = await pc.getStats();

stats.forEach(report => {
  if (report.type === 'inbound-rtp' && report.kind === 'audio') {
    console.log('Packets received:', report.packetsReceived);
    console.log('Packets lost:', report.packetsLost);
    console.log('Jitter:', report.jitter);
  }

  if (report.type === 'candidate-pair' && report.state === 'succeeded') {
    console.log('RTT:', report.currentRoundTripTime);
    console.log('Available outgoing bitrate:', report.availableOutgoingBitrate);
  }
});
```

---

## 11. Low-Latency Streaming

### 11.1 Glass-to-Glass Latency

Total delay from camera to display:

**Target:** < 1 second (ideally < 500ms)

**Components:**
1. Camera capture: 16-33ms (30-60 fps)
2. Encoding: 20-100ms
3. Packetization: 10-20ms
4. Network transmission: 10-200ms
5. Jitter buffer: 20-60ms
6. Decoding: 20-50ms
7. Display: 16-33ms

**Total:** ~112-496ms (best case to typical)

### 11.2 Techniques

#### 11.2.1 Ultra-Low Latency Codecs

- **AV1**: Low Delay mode
- **H.264**: Baseline with low-delay HRD
- **VP9**: Real-time mode

#### 11.2.2 Small GOP Size

- **Intra-only**: Every frame is I-frame (highest latency, large bandwidth)
- **Small GOP**: 1-2 second GOP (good balance)
- **Keyframe frequency**: Every 1-3 seconds

#### 11.2.3 Fast Encoding Presets

Trade compression efficiency for speed:

**x264 presets:**
- `ultrafast`: Lowest latency, largest file
- `superfast`: Very low latency
- `veryfast`: Low latency (recommended)

#### 11.2.4 UDP vs. TCP

- **UDP**: Lower latency, no retransmission
- **TCP**: Higher latency, reliable delivery

**WebRTC uses UDP** with application-level retransmission (NACK).

### 11.3 Adaptive Bitrate Streaming

Adjust quality based on network:

**Simulcast:**
Send multiple resolutions simultaneously, receiver chooses:

```javascript
const sender = pc.addTrack(track, stream);

const params = sender.getParameters();
params.encodings = [
  { rid: 'high', maxBitrate: 1500000 },
  { rid: 'medium', maxBitrate: 600000, scaleResolutionDownBy: 2 },
  { rid: 'low', maxBitrate: 200000, scaleResolutionDownBy: 4 }
];

sender.setParameters(params);
```

**SVC (Scalable Video Coding):**
Single stream with multiple layers:
- Temporal scalability: Frame rate layers
- Spatial scalability: Resolution layers
- Quality scalability: SNR layers

---

## 12. Video Conferencing Systems

### 12.1 Architectures

#### 12.1.1 MCU (Multipoint Control Unit)

Centralized mixing:

```
Participant A ----\
                   \
Participant B -------> MCU (mixes all streams) --> Single mixed stream to all
                   /
Participant C ----/
```

**Pros:**
- Low client bandwidth
- Single decode per client
- Consistent layout

**Cons:**
- High server CPU
- Quality loss (transcoding)
- Latency from mixing

#### 12.1.2 SFU (Selective Forwarding Unit)

Routing without transcoding:

```
Participant A ----\
                   \
Participant B -------> SFU (forwards selectively) --> N-1 streams to each participant
                   /
Participant C ----/
```

**Pros:**
- Lower server CPU
- Better quality (no transcoding)
- Lower latency

**Cons:**
- Higher client bandwidth
- Multiple encodes/decodes
- Complexity in client

#### 12.1.3 Mesh (P2P Full Mesh)

Direct peer-to-peer between all participants:

```
Participant A <-------> Participant B
     ^                      ^
     |                      |
     v                      v
Participant C <-------> Participant D
```

**Pros:**
- No server infrastructure
- Lowest latency

**Cons:**
- Exponential bandwidth growth: N*(N-1)
- Scalability limit: ~4-6 participants
- NAT traversal complexity

### 12.2 Layout Management

**Common Layouts:**
- **Speaker-focused**: Large view of active speaker, thumbnails of others
- **Grid**: Equal-sized tiles
- **Picture-in-Picture**: Main content + small self-view
- **Gallery**: Multiple equal participants
- **Presentation**: Screen share + video thumbnails

**Active Speaker Detection:**
```javascript
conference.on('audio-level-changed', (participant, level) => {
  if (level > threshold) {
    switchLayout('speaker-focused', participant);
  }
});
```

### 12.3 Bandwidth Optimization

**Simulcast Reception:**
SFU selects appropriate quality per receiver:

```javascript
// Receiver subscribes to medium quality
receiver.setParameters({
  encodings: [
    { rid: 'medium', active: true }
  ]
});
```

**Video Pause for Off-Screen:**
Stop video for participants not visible:

```javascript
participants.forEach(p => {
  if (!isVisible(p)) {
    p.setVideoEnabled(false);
  }
});
```

---

## 13. Push-to-Talk Systems

### 13.1 Architecture

Half-duplex communication with floor control:

**Components:**
- **PTT Client**: User device
- **PTT Server**: Floor control logic
- **Media Server**: Audio distribution

### 13.2 Floor Control

**States:**
- **Idle**: No one speaking
- **Granted**: User has floor
- **Queued**: User requested, waiting
- **Denied**: Request rejected (another user has floor)

**Message Flow:**
```
Client A                PTT Server              Client B, C
   |                         |                      |
   |--- Floor Request ------>|                      |
   |<-- Floor Granted -------|                      |
   |                         |                      |
   |--- Audio Stream ------->|--- Audio Stream --->|
   |                         |                      |
   |--- Floor Release ------>|                      |
   |<-- Floor Idle ----------|                      |
```

### 13.3 Priority Levels

| Priority | Use Case | Preemption |
|----------|----------|------------|
| Emergency | Critical alerts | Always preempts |
| High | Supervisor, dispatch | Preempts normal |
| Normal | Standard users | No preemption |
| Low | Background info | Easily preempted |

### 13.4 Late Join

Users joining mid-transmission:

**Strategies:**
- **Immediate join**: Hear ongoing transmission
- **Buffer replay**: Replay last N seconds
- **Wait for next**: Wait until floor released

### 13.5 Implementation

```javascript
class PushToTalk {
  constructor(config) {
    this.channel = config.channel;
    this.priority = config.priority || 'normal';
    this.floorState = 'idle';
  }

  requestFloor() {
    this.send({
      type: 'floor-request',
      channel: this.channel,
      priority: this.priority
    });
  }

  releaseFloor() {
    this.send({
      type: 'floor-release',
      channel: this.channel
    });
    this.floorState = 'idle';
  }

  onFloorGranted() {
    this.floorState = 'granted';
    this.startAudioTransmission();
  }

  onFloorDenied(reason) {
    this.floorState = 'denied';
    console.log('Floor denied:', reason);
  }
}
```

---

## 14. Security and Privacy

### 14.1 End-to-End Encryption

**DTLS-SRTP:**
- Default in WebRTC
- Keys never leave endpoints
- Perfect forward secrecy

**Insertable Streams (E2EE):**
Custom encryption in JavaScript:

```javascript
const senderTransform = new TransformStream({
  transform: (chunk, controller) => {
    const encrypted = encrypt(chunk, key);
    controller.enqueue(encrypted);
  }
});

sender.createEncodedStreams().readable
  .pipeThrough(senderTransform)
  .pipeTo(sender.writable);
```

### 14.2 Authentication

**SIP Digest Authentication:**
- Challenge-response mechanism
- MD5 hash (weak, use with TLS)

**OAuth 2.0:**
- Token-based authentication
- Refresh token mechanism

**Certificate-Based:**
- Mutual TLS
- Client certificates

### 14.3 Privacy Protection

**IP Address Leaking:**
- Use mDNS for local IPs: `ip.local` instead of `192.168.x.x`
- Require user consent for IP disclosure

**Media Device Permissions:**
- Prompt user before camera/mic access
- Indicator when devices active

**Recording Notification:**
- Inform participants of recording
- Legal requirements (GDPR, CCPA)

---

## 15. Implementation Guidelines

### 15.1 Best Practices

1. **Always use HTTPS/WSS** for signaling
2. **Enable SRTP** for all media
3. **Implement reconnection logic** for network failures
4. **Use Opus** for audio (best quality/bandwidth)
5. **Prefer VP9 or H.264** for video compatibility
6. **Implement adaptive bitrate** for varying networks
7. **Monitor QoE metrics** and adjust
8. **Provide TURN servers** for restrictive NATs
9. **Handle errors gracefully** with user feedback
10. **Test across browsers** (Chrome, Firefox, Safari, Edge)

### 15.2 Error Handling

```javascript
pc.addEventListener('connectionstatechange', () => {
  switch (pc.connectionState) {
    case 'disconnected':
      console.warn('Connection lost, attempting reconnection');
      attemptReconnection();
      break;

    case 'failed':
      console.error('Connection failed');
      showErrorToUser('Connection failed. Please check your network.');
      break;

    case 'closed':
      console.log('Connection closed');
      cleanup();
      break;
  }
});

pc.addEventListener('iceconnectionstatechange', () => {
  if (pc.iceConnectionState === 'failed') {
    // ICE restart
    pc.restartIce();
  }
});
```

### 15.3 Performance Optimization

**Reduce Bandwidth:**
- Lower resolution for small video tiles
- Disable video for audio-only calls
- Use simulcast/SVC

**Reduce CPU:**
- Hardware acceleration for encoding/decoding
- Limit framerate (15-30 fps often sufficient)
- Use efficient codecs (VP9, H.265)

**Reduce Latency:**
- Minimize jitter buffer size
- Use low-delay codec modes
- Optimize signaling (trickle ICE)

---

## 16. References

### 16.1 Standards Documents

- **RFC 3550**: RTP: A Transport Protocol for Real-Time Applications
- **RFC 3551**: RTP Profile for Audio and Video Conferences
- **RFC 3711**: The Secure Real-time Transport Protocol (SRTP)
- **RFC 3261**: SIP: Session Initiation Protocol
- **RFC 4566**: SDP: Session Description Protocol
- **RFC 5245**: Interactive Connectivity Establishment (ICE)
- **RFC 5389**: Session Traversal Utilities for NAT (STUN)
- **RFC 5766**: Traversal Using Relays around NAT (TURN)
- **RFC 5764**: DTLS Extension to Establish Keys for SRTP
- **RFC 6716**: Opus Codec
- **RFC 7742**: WebRTC Video Processing and Codec Requirements
- **RFC 8825**: Overview: Real-Time Protocols for Browser-Based Applications

### 16.2 WebRTC Resources

- **W3C WebRTC 1.0**: https://www.w3.org/TR/webrtc/
- **WebRTC.org**: https://webrtc.org/
- **MDN WebRTC API**: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API

### 16.3 Codec Specifications

- **VP8**: RFC 6386
- **VP9**: https://www.webmproject.org/vp9/
- **H.264**: ITU-T H.264 / ISO/IEC 14496-10
- **Opus**: RFC 6716
- **G.711**: ITU-T G.711

---

**弘익人間 (Benefit All Humanity)**

*This specification is designed to enable secure, high-quality, low-latency real-time communication for all people, fostering global connection and collaboration.*

---

© 2025 WIA - World Certification Industry Association
MIT License
