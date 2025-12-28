# WIA-DIGITAL-MEMORIAL Specification v1.0

## 1. Introduction

### 1.1 Purpose

WIA-DIGITAL-MEMORIAL defines the standard for creating, managing, and preserving digital memorials for deceased individuals. This enables families and friends to honor loved ones through lasting digital tributes.

### 1.2 Scope

- Memorial creation and design
- Content curation and management
- Visitor interaction and tributes
- Privacy and access control
- Long-term preservation
- Platform integration
- Monetization and costs

### 1.3 Philosophy

**Hongik Ingan**: Remembrance benefits all. Digital memorials extend our natural desire to honor the dead into a medium that transcends physical limitations, allowing memories to be shared globally and preserved indefinitely.

## 2. Memorial Structure

### 2.1 Memorial Object

```yaml
memorial:
  id: "memorial-2025-xyz"
  version: "1.0"

  subject:
    name: "홍길동"
    born: "1950-03-15"
    died: "2025-01-10"
    epitaph: "사랑하는 아버지, 남편, 친구"
    photo: "profile.jpg"

  creator:
    wia_id: "wia:family.1234"
    relationship: "son"

  administrators:
    - wia_id: "wia:family.1234"
      role: "primary"
    - wia_id: "wia:family.5678"
      role: "contributor"

  settings:
    visibility: "public" | "family" | "private"
    allow_tributes: true
    allow_photos: true
    allow_stories: true
    moderation: "pre" | "post" | "none"

  created_at: "2025-01-15"
  last_updated: "2025-01-20"
```

### 2.2 Memorial Types

```yaml
public_memorial:
  visibility: "public"
  indexed: true
  features:
    - discoverable_by_search
    - anyone_can_view
    - registered_users_can_tribute
    - family_controls_content

family_memorial:
  visibility: "family"
  indexed: false
  features:
    - visible_to_family_and_friends
    - invitation_based_access
    - all_members_can_contribute
    - private_memories_shared

private_memorial:
  visibility: "private"
  indexed: false
  features:
    - administrators_only
    - maximum_privacy
    - personal_archive
    - family_reference

hybrid_memorial:
  visibility: "hybrid"
  features:
    - public_profile
    - private_content_areas
    - mixed_access_levels
    - flexible_sharing
```

## 3. Content Types

### 3.1 Profile Information

```yaml
profile:
  basic:
    full_name: "홍길동"
    birth_date: "1950-03-15"
    death_date: "2025-01-10"
    birth_place: "서울"
    death_place: "서울"

  extended:
    maiden_name: null
    nicknames: ["길동이"]
    education: ["서울대학교"]
    occupation: "교수"
    achievements: ["학술상 수상"]

  epitaph:
    text: "사랑으로 가득한 삶을 살았습니다"
    author: "가족 일동"

  photos:
    profile: "profile.jpg"
    cover: "cover.jpg"
    gallery: ["photo1.jpg", "photo2.jpg"]
```

### 3.2 Life Timeline

```yaml
timeline:
  events:
    - date: "1950-03-15"
      type: "birth"
      title: "탄생"
      description: "서울에서 태어남"
      photos: ["baby.jpg"]

    - date: "1972-05-20"
      type: "education"
      title: "대학 졸업"
      description: "서울대학교 졸업"
      photos: ["graduation.jpg"]

    - date: "1975-10-15"
      type: "marriage"
      title: "결혼"
      description: "이영희와 결혼"
      photos: ["wedding.jpg"]

    - date: "1978-02-28"
      type: "family"
      title: "아들 탄생"
      description: "첫 아들 홍민수 탄생"

    - date: "2025-01-10"
      type: "death"
      title: "영면"
      description: "가족의 곁에서 평화롭게 눈을 감음"
```

### 3.3 Media Galleries

```yaml
galleries:
  photos:
    - id: "gallery-family"
      title: "가족 사진"
      items:
        - file: "family1.jpg"
          caption: "2010년 설날"
          date: "2010-02-14"
          tagged: ["wia:son.1234", "wia:daughter.5678"]

  videos:
    - id: "video-memories"
      title: "영상 추억"
      items:
        - file: "birthday.mp4"
          title: "70회 생일"
          date: "2020-03-15"
          duration: "5:30"

  audio:
    - id: "voice-recordings"
      title: "음성 기록"
      items:
        - file: "message.mp3"
          title: "가족에게 남긴 말씀"
          date: "2024-12-25"
```

### 3.4 Stories and Memories

```yaml
stories:
  - id: "story-001"
    author: "wia:son.1234"
    author_name: "홍민수"
    relationship: "아들"
    title: "아버지와의 첫 낚시"
    content: "아버지와 처음 낚시를 갔던 날..."
    date: "2025-01-20"
    photos: ["fishing.jpg"]
    visibility: "public"
    moderation_status: "approved"
```

## 4. Tributes and Interactions

### 4.1 Tribute Types

```yaml
tributes:
  condolence:
    type: "condolence"
    author: "wia:friend.9999"
    message: "삼가 고인의 명복을 빕니다."
    date: "2025-01-15"

  memory:
    type: "memory"
    author: "wia:colleague.8888"
    title: "함께한 시간들"
    content: "직장에서 처음 만났을 때..."
    photos: ["office.jpg"]

  flower:
    type: "virtual_flower"
    author: "wia:neighbor.7777"
    flower_type: "chrysanthemum"
    message: "편히 쉬세요"

  candle:
    type: "virtual_candle"
    author: "wia:relative.6666"
    message: "영원히 기억하겠습니다"
    lit_until: "2025-01-22"
```

### 4.2 Virtual Visiting

```yaml
visit:
  visitor: "wia:friend.5555"
  timestamp: "2025-01-20T14:30:00Z"
  duration: "10_minutes"
  actions:
    - viewed_profile: true
    - read_timeline: true
    - left_tribute: true
    - lit_candle: true
  signed_guestbook: true
```

### 4.3 Notifications

```yaml
notifications:
  anniversary:
    type: "death_anniversary"
    date: "2026-01-10"
    recipients: ["family", "friends"]
    message: "홍길동님의 1주기입니다."

  birthday:
    type: "birthday"
    date: "2025-03-15"
    recipients: ["family"]
    message: "아버지의 생신입니다."

  new_tribute:
    type: "tribute_added"
    recipient: "administrators"
    message: "새로운 추모 메시지가 있습니다."
```

## 5. Privacy and Access Control

### 5.1 Access Levels

```yaml
access_control:
  levels:
    public:
      can_view: true
      can_tribute: "registered_only"
      can_add_content: false

    family:
      can_view: true
      can_tribute: true
      can_add_content: true
      can_moderate: false

    admin:
      can_view: true
      can_tribute: true
      can_add_content: true
      can_moderate: true
      can_delete: true
      can_invite: true
```

### 5.2 Content Moderation

```yaml
moderation:
  mode: "pre" | "post" | "none"

  pre_moderation:
    all_content_requires_approval: true
    notification_to_admin: true

  post_moderation:
    content_published_immediately: true
    admin_can_remove: true
    flagging_enabled: true

  auto_filters:
    spam_detection: true
    inappropriate_content: true
    profanity_filter: true
```

### 5.3 Invitation System

```yaml
invitations:
  - email: "friend@example.com"
    access_level: "friend"
    sent_by: "wia:admin.1234"
    sent_at: "2025-01-15"
    accepted: true
    accepted_at: "2025-01-16"
```

## 6. Preservation

### 6.1 Storage Guarantees

```yaml
preservation:
  tier: "standard" | "premium" | "perpetual"

  standard:
    duration: "10_years"
    storage: "1_gb"
    features: ["basic_memorial", "tributes"]

  premium:
    duration: "50_years"
    storage: "10_gb"
    features: ["full_memorial", "video", "custom_domain"]

  perpetual:
    duration: "indefinite"
    storage: "unlimited"
    features: ["all", "blockchain_anchored", "multiple_mirrors"]
```

### 6.2 Backup and Redundancy

```yaml
backup:
  frequency: "daily"
  locations:
    - primary: "cloud_region_1"
    - secondary: "cloud_region_2"
    - archive: "cold_storage"

  exports:
    available_formats: ["html", "pdf", "archive"]
    family_download: true
```

### 6.3 Digital Legacy

```yaml
legacy:
  succession:
    primary_admin: "wia:son.1234"
    successor: "wia:grandson.9999"
    succession_trigger: "admin_death_or_incapacity"

  instructions:
    on_no_admin: "transfer_to_archive"
    archive_location: "wia:archive.memorial"
```

## 7. Platform Integration

### 7.1 Social Media Integration

```yaml
integration:
  platforms:
    facebook:
      import_from: "memorialized_account"
      sync_tributes: false

    instagram:
      import_photos: true
      preserve_captions: true

    youtube:
      embed_videos: true
      preserve_channel: true

  syndication:
    announce_memorial: ["facebook", "twitter"]
    share_anniversary: true
```

### 7.2 Funeral Integration

```yaml
funeral_integration:
  funeral_plan_id: "funeral-2025-abc"
  memorial_created_by: "funeral_execution"
  inherited_content:
    - photos_from_heirlooms
    - messages_from_will
    - preferences_from_plan
```

## 8. API Reference

### 8.1 Core Methods

```typescript
class DigitalMemorial {
  // Create memorial
  static create(options: MemorialOptions): Memorial;

  // Load existing memorial
  static load(memorialId: string): Memorial;

  // Find memorials
  static search(query: SearchQuery): Memorial[];

  // Profile management
  setProfile(profile: Profile): void;
  updateProfile(updates: Partial<Profile>): void;

  // Timeline
  addTimelineEvent(event: TimelineEvent): void;
  getTimeline(): TimelineEvent[];

  // Content
  addPhoto(photo: Photo): void;
  addVideo(video: Video): void;
  addStory(story: Story): void;

  // Tributes
  addTribute(tribute: Tribute): void;
  getTributes(filter?: TributeFilter): Tribute[];
  moderateTribute(id: string, action: 'approve' | 'reject'): void;

  // Access control
  setVisibility(level: VisibilityLevel): void;
  inviteMember(email: string, level: AccessLevel): void;
  removeMember(userId: string): void;

  // Notifications
  subscribeToNotifications(config: NotificationConfig): void;

  // Export
  export(format: 'html' | 'pdf' | 'archive'): ExportResult;
}
```

### 8.2 Events

```typescript
memorial.on('tribute_added', callback);
memorial.on('photo_added', callback);
memorial.on('story_added', callback);
memorial.on('visitor_arrived', callback);
memorial.on('anniversary_reminder', callback);
memorial.on('moderation_required', callback);
```

## 9. Security

### 9.1 Authentication

- Multi-factor authentication for admins
- OAuth integration for visitors
- Email verification for tributes
- Rate limiting for all actions

### 9.2 Data Protection

- Encryption at rest and in transit
- GDPR compliance for EU visitors
- Right to removal for tribute authors
- Audit logging

## 10. Interoperability

### 10.1 With DIGITAL-WILL
- Memorial preferences from will
- Content sources specified
- Administrator appointments

### 10.2 With DIGITAL-FUNERAL
- Memorial created during funeral execution
- Content inheritance
- Notification coordination

### 10.3 With DIGITAL-EXECUTOR
- Executor creates memorial
- Content curation
- Administrator handover

### 10.4 With DIGITAL-ERASURE
- Preservation before erasure
- Selective content retention
- Coordinated execution

## 11. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01 | Initial release |

---

WIA-DIGITAL-MEMORIAL: Honoring the dead, comforting the living.
