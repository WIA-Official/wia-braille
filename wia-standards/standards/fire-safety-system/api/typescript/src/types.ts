/**
 * WIA Fire Safety System Standard - TypeScript Type Definitions
 * @version 1.0.0
 * @license MIT
 * 
 * 弘益人間 (홍익인간) · Benefit All Humanity
 */

// ============================================================================
// Core Types
// ============================================================================

/** UUID v4 string format */
export type UUID = string;

/** ISO 8601 timestamp string */
export type Timestamp = string;

/** Device status enumeration */
export type DeviceStatus = 'normal' | 'alarm' | 'trouble' | 'disabled' | 'maintenance';

/** Event priority levels */
export type EventPriority = 'critical' | 'high' | 'medium' | 'low';

/** Event type categories */
export type EventType = 'fire' | 'supervisory' | 'trouble' | 'test' | 'maintenance';

// ============================================================================
// Location and Positioning
// ============================================================================

/** Geographic coordinates in WGS84 */
export interface Coordinates {
  /** X coordinate in meters */
  x: number;
  /** Y coordinate in meters */
  y: number;
  /** Z coordinate in meters (optional, for multi-story) */
  z?: number;
}

/** GPS coordinates */
export interface GPSCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
}

/** Physical location within a building */
export interface Location {
  building: string;
  floor: number;
  zone: string;
  coordinates?: Coordinates;
  description?: string;
}

/** Complete address information */
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  gpsCoordinates?: GPSCoordinates;
}

// ============================================================================
// Sensor and Device Types
// ============================================================================

/** Sensor type enumeration */
export type SensorType = 
  | 'smoke_ionization'
  | 'smoke_photoelectric'
  | 'smoke_aspirating'
  | 'heat_fixed'
  | 'heat_rate_of_rise'
  | 'heat_combination'
  | 'flame_uv'
  | 'flame_ir'
  | 'flame_uv_ir'
  | 'co_detector'
  | 'multi_criteria';

/** Sensor reading with metadata */
export interface SensorReading {
  value: number;
  unit: string;
  timestamp: Timestamp;
  quality?: 'good' | 'poor' | 'uncertain';
}

/** Device metadata */
export interface DeviceMetadata {
  manufacturer: string;
  model: string;
  serialNumber?: string;
  firmwareVersion: string;
  hardwareVersion?: string;
  installationDate: Timestamp;
  lastMaintenance?: Timestamp;
  nextMaintenanceDue?: Timestamp;
  certifications?: string[];
}

/** Fire safety sensor data */
export interface SensorData {
  sensorId: UUID;
  type: SensorType;
  location: Location;
  status: DeviceStatus;
  readings: SensorReading;
  metadata: DeviceMetadata;
  batteryLevel?: number;
  signalStrength?: number;
}

// ============================================================================
// Alarm and Event Types
// ============================================================================

/** Alarm event source information */
export interface AlarmSource {
  deviceId: UUID;
  deviceType: string;
  location: Location;
}

/** Alarm acknowledgment information */
export interface AlarmAcknowledgment {
  acknowledgedBy: string;
  acknowledgedAt: Timestamp;
  comment?: string;
}

/** Alarm event data */
export interface AlarmEvent {
  eventId: UUID;
  eventType: EventType;
  priority: EventPriority;
  source: AlarmSource;
  timestamp: Timestamp;
  description: string;
  notifications: string[];
  status: 'active' | 'acknowledged' | 'resolved';
  acknowledgment?: AlarmAcknowledgment;
  resolvedAt?: Timestamp;
  resolvedBy?: string;
}

// ============================================================================
// Control Panel Types
// ============================================================================

/** Fire Alarm Control Panel configuration */
export interface ControlPanelConfig {
  panelId: UUID;
  name: string;
  location: Location;
  manufacturer: string;
  model: string;
  firmwareVersion: string;
  networkAddress: string;
  isPrimary: boolean;
  connectedDeviceCount: number;
  maxDeviceCapacity: number;
}

/** Control panel system health */
export interface SystemHealth {
  powerSupply: 'normal' | 'battery' | 'fault';
  batteryLevel?: number;
  batteryVoltage?: number;
  networkStatus: 'connected' | 'disconnected' | 'degraded';
  cpuUsage?: number;
  memoryUsage?: number;
  temperature?: number;
}

/** Control panel status */
export interface ControlPanelStatus {
  panelId: UUID;
  status: DeviceStatus;
  activeAlarms: number;
  troubleConditions: number;
  systemHealth: SystemHealth;
  lastCheck: Timestamp;
}

// ============================================================================
// Suppression System Types
// ============================================================================

/** Suppression system types */
export type SuppressionType = 
  | 'wet_pipe_sprinkler'
  | 'dry_pipe_sprinkler'
  | 'preaction_sprinkler'
  | 'deluge_sprinkler'
  | 'fm200_gas'
  | 'novec_gas'
  | 'inergen_gas'
  | 'co2_gas'
  | 'foam'
  | 'dry_chemical';

/** Water supply information */
export interface WaterSupply {
  pressure: number;
  unit: string;
  flowRate: number;
  valveStatus: 'open' | 'closed' | 'partially_open';
  temperature?: number;
}

/** Suppression system coverage area */
export interface CoverageArea {
  area: number;
  unit: string;
  headCount: number;
  activeHeads: UUID[];
}

/** Suppression system data */
export interface SuppressionSystem {
  systemId: UUID;
  type: SuppressionType;
  status: DeviceStatus;
  location: Location;
  waterSupply?: WaterSupply;
  coverage: CoverageArea;
  lastInspection: Timestamp;
  nextInspectionDue: Timestamp;
}

// ============================================================================
// Notification Appliance Types
// ============================================================================

/** Notification appliance types */
export type NotificationApplianceType = 
  | 'horn'
  | 'bell'
  | 'chime'
  | 'speaker'
  | 'strobe'
  | 'speaker_strobe'
  | 'horn_strobe';

/** Audio settings */
export interface AudioSettings {
  volume: number; // 0-100
  tone: string;
  pattern: 'temporal_3' | 'continuous' | 'pulse' | 'custom';
}

/** Visual settings */
export interface VisualSettings {
  candela: number;
  flashRate: number; // flashes per minute
  color: 'red' | 'white' | 'amber';
}

/** Notification appliance data */
export interface NotificationAppliance {
  applianceId: UUID;
  type: NotificationApplianceType;
  location: Location;
  status: DeviceStatus;
  audioSettings?: AudioSettings;
  visualSettings?: VisualSettings;
  metadata: DeviceMetadata;
}

// ============================================================================
// Integration Types
// ============================================================================

/** Building system integration action */
export interface IntegrationAction {
  system: 'hvac' | 'access_control' | 'elevator' | 'lighting' | 'mass_notification';
  action: string;
  parameters?: Record<string, any>;
  executedAt?: Timestamp;
  status?: 'pending' | 'executed' | 'failed';
  error?: string;
}

/** Fire event trigger for integration */
export interface FireEventTrigger {
  eventId: UUID;
  location: Location;
  actions: IntegrationAction[];
}

/** Emergency services notification */
export interface EmergencyNotification {
  facilityId: UUID;
  facilityName: string;
  address: Address;
  emergencyType: 'fire' | 'medical' | 'security';
  severity: EventPriority;
  location: Location;
  detectionTime: Timestamp;
  occupancyEstimate?: number;
  hazardousMaterials?: string[];
  buildingAccess?: string;
  contactPerson?: {
    name: string;
    phone: string;
    email?: string;
  };
  videoFeedUrl?: string;
  buildingPlansUrl?: string;
}

// ============================================================================
// API Types
// ============================================================================

/** API response wrapper */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Timestamp;
}

/** Paginated response */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/** Query filter parameters */
export interface QueryFilter {
  status?: DeviceStatus | DeviceStatus[];
  type?: string | string[];
  location?: Partial<Location>;
  startDate?: Timestamp;
  endDate?: Timestamp;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// WebSocket Event Types
// ============================================================================

/** WebSocket event message */
export interface WebSocketEvent<T = any> {
  eventType: string;
  timestamp: Timestamp;
  data: T;
}

/** Real-time alarm event */
export type AlarmTriggeredEvent = WebSocketEvent<AlarmEvent>;

/** Device status change event */
export interface DeviceStatusChangedEvent extends WebSocketEvent<{
  deviceId: UUID;
  previousStatus: DeviceStatus;
  currentStatus: DeviceStatus;
  reason?: string;
}> {}

/** System fault detected event */
export interface SystemFaultEvent extends WebSocketEvent<{
  faultId: UUID;
  severity: EventPriority;
  component: string;
  description: string;
  recommendedAction?: string;
}> {}

// ============================================================================
// User and Access Control Types
// ============================================================================

/** User roles */
export type UserRole = 'viewer' | 'operator' | 'technician' | 'administrator';

/** User information */
export interface User {
  userId: UUID;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  createdAt: Timestamp;
  lastLogin?: Timestamp;
  active: boolean;
}

/** Authentication token */
export interface AuthToken {
  token: string;
  expiresAt: Timestamp;
  refreshToken?: string;
  user: User;
}

// ============================================================================
// Testing and Maintenance Types
// ============================================================================

/** Test types */
export type TestType = 'functional' | 'sensitivity' | 'walk_test' | 'battery' | 'communication';

/** Test result */
export interface TestResult {
  testId: UUID;
  deviceId: UUID;
  testType: TestType;
  performedBy: string;
  performedAt: Timestamp;
  passed: boolean;
  measurements?: Record<string, number>;
  notes?: string;
  nextTestDue?: Timestamp;
}

/** Maintenance record */
export interface MaintenanceRecord {
  recordId: UUID;
  deviceId: UUID;
  maintenanceType: 'inspection' | 'repair' | 'replacement' | 'cleaning';
  performedBy: string;
  performedAt: Timestamp;
  description: string;
  partsReplaced?: string[];
  cost?: number;
  nextMaintenanceDue?: Timestamp;
}

// ============================================================================
// Configuration Types
// ============================================================================

/** System configuration */
export interface SystemConfiguration {
  facilityId: UUID;
  facilityName: string;
  timezone: string;
  primaryLanguage: string;
  secondaryLanguages?: string[];
  alarmVerificationDelay: number; // seconds
  evacuationSequence: 'immediate' | 'phased' | 'defend_in_place';
  integrationEnabled: boolean;
  notificationSettings: {
    email: boolean;
    sms: boolean;
    push: boolean;
    emergencyServices: boolean;
  };
}

export default {
  // Export all types as a namespace
};
