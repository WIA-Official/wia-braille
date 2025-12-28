/**
 * WIA Deep Sea Exploration Standard - TypeScript Type Definitions
 * Version: 1.0.0
 * Philosophy: 弘益人間 (Benefit All Humanity)
 */

// ============================================================================
// Base Types
// ============================================================================

export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
export type MessageType = 'DATA_PACKET' | 'TELEMETRY' | 'COMMAND' | 'RESPONSE' | 'OCEANOGRAPHIC_DATA' | 'BATHYMETRIC_DATA' | 'SAMPLE_METADATA' | 'VEHICLE_TELEMETRY';
export type VehicleType = 'ROV' | 'AUV' | 'SUBMERSIBLE' | 'GLIDER';
export type VehicleStatus = 'OPERATIONAL' | 'MAINTENANCE' | 'DEPLOYED' | 'STANDBY';
export type MissionType = 'BATHYMETRIC_MAPPING' | 'SAMPLE_COLLECTION' | 'BIOLOGICAL_SURVEY' | 'HYDROTHERMAL_VENT_STUDY' | 'SCIENTIFIC_RESEARCH';
export type SampleType = 'BIOLOGICAL' | 'GEOLOGICAL' | 'CHEMICAL' | 'WATER';
export type DataQuality = 'RAW' | 'VALIDATED' | 'PROCESSED' | 'OUT_OF_RANGE';
export type SystemStatus = 'NOMINAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE';

// ============================================================================
// Core Message Format
// ============================================================================

export interface BaseMessage {
  wiaVersion: string;
  messageType: MessageType;
  timestamp: string; // ISO8601 format
  sequenceNumber: number;
  sourceId: string;
  priority: Priority;
  payload: unknown;
  metadata?: Record<string, unknown>;
  checksum: string;
}

// ============================================================================
// Geospatial Types
// ============================================================================

export interface Location {
  latitude: number; // -90 to 90
  longitude: number; // -180 to 180
  depth: number; // meters, 0 to 11000
  altitude?: number; // meters above seafloor
  coordinateSystem?: string; // default: WGS84
  accuracy?: LocationAccuracy;
}

export interface LocationAccuracy {
  horizontal: number; // meters
  vertical: number; // meters
  unit: string;
}

export interface BoundingBox {
  northWest: { lat: number; lon: number };
  southEast: { lat: number; lon: number };
}

// ============================================================================
// Environmental Data
// ============================================================================

export interface EnvironmentData {
  temperature: SensorReading;
  pressure: SensorReading;
  salinity: SensorReading;
  dissolvedOxygen?: SensorReading;
  pH?: SensorReading;
  turbidity?: SensorReading;
  soundVelocity?: SensorReading;
}

export interface SensorReading {
  value: number;
  unit: string;
  sensorId: string;
  calibrationDate?: string;
  quality?: DataQuality;
}

export interface WaterCurrent {
  speed: number;
  direction: number; // degrees, 0-360
  unit: string;
  directionReference: 'true-north' | 'magnetic-north';
}

// ============================================================================
// Oceanographic Data Packet
// ============================================================================

export interface OceanographicData extends BaseMessage {
  messageType: 'OCEANOGRAPHIC_DATA';
  payload: {
    location: Location;
    environment: EnvironmentData;
    waterCurrent?: WaterCurrent;
  };
  metadata: {
    mission?: string;
    institution?: string;
    researchVessel?: string;
    chiefScientist?: string;
    dataQuality: DataQuality;
  };
}

// ============================================================================
// Bathymetric Data
// ============================================================================

export interface BathymetricData extends BaseMessage {
  messageType: 'BATHYMETRIC_DATA';
  payload: {
    surveyArea: SurveyArea;
    sonarConfiguration: SonarConfiguration;
    soundings: Sounding[];
    processingParameters: ProcessingParameters;
  };
}

export interface SurveyArea {
  boundingBox: BoundingBox;
  gridResolution: number;
  gridUnit: string;
  coordinateSystem: string;
}

export interface SonarConfiguration {
  type: 'MULTIBEAM' | 'SINGLEBEAM' | 'SIDESCAN';
  model: string;
  frequency: number;
  frequencyUnit: string;
  beamWidth: number;
  beamWidthUnit: string;
  swathWidth: number;
  swathWidthUnit: string;
}

export interface Sounding {
  latitude: number;
  longitude: number;
  depth: number;
  uncertainty: number;
  intensity?: number;
  beamAngle?: number;
  quality: 'VERIFIED' | 'UNVERIFIED' | 'REJECTED';
}

export interface ProcessingParameters {
  soundVelocityProfile: string;
  tidalCorrection: boolean;
  rayTracing: 'SNELL' | 'STRAIGHT' | 'CURVED';
  artifactRemoval: boolean;
}

// ============================================================================
// Sample Collection
// ============================================================================

export interface SampleMetadata extends BaseMessage {
  messageType: 'SAMPLE_METADATA';
  payload: {
    sampleId: string;
    sampleType: SampleType;
    collectionMethod: string;
    location: Location & {
      habitat?: string;
      substrate?: string;
    };
    environment: EnvironmentData;
    specimen?: SpecimenData;
    container: ContainerInfo;
    collector: CollectorInfo;
    permits?: string[];
  };
}

export interface SpecimenData {
  taxonCandidate?: string;
  description: string;
  photographs?: string[];
  videoClip?: string;
}

export interface ContainerInfo {
  type: string;
  containerId: string;
  preservative?: string;
  temperature?: string;
}

export interface CollectorInfo {
  name: string;
  institution: string;
  email?: string;
  orcid?: string;
}

// ============================================================================
// Vehicle Telemetry
// ============================================================================

export interface VehicleTelemetry extends BaseMessage {
  messageType: 'VEHICLE_TELEMETRY';
  payload: {
    vehicle: VehicleInfo;
    position: VehiclePosition;
    propulsion?: PropulsionStatus;
    power: PowerStatus;
    systems: SystemsStatus;
    alerts: Alert[];
  };
}

export interface VehicleInfo {
  type: VehicleType;
  model: string;
  manufacturer: string;
  serialNumber: string;
  maxDepthRating: number;
  maxDepthRatingUnit: string;
}

export interface VehiclePosition {
  latitude: number;
  longitude: number;
  depth: number;
  heading: number; // degrees, 0-360
  pitch: number; // degrees, -90 to 90
  roll: number; // degrees, -180 to 180
  altitude?: number; // meters above seafloor
}

export interface ThrusterStatus {
  power: number; // percentage, 0-100
  rpm: number;
  status: 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE';
}

export interface PropulsionStatus {
  thrusterStatus: {
    forward: ThrusterStatus;
    aft: ThrusterStatus;
    port: ThrusterStatus;
    starboard: ThrusterStatus;
    vertical_fore: ThrusterStatus;
    vertical_aft: ThrusterStatus;
  };
}

export interface PowerStatus {
  batteryVoltage: number; // volts
  batteryCurrent: number; // amps
  batteryCapacityRemaining: number; // percentage, 0-100
  estimatedTimeRemaining: number; // minutes
  estimatedTimeRemainingUnit: string;
  powerConsumption: number; // watts
  powerConsumptionUnit: string;
}

export interface SystemsStatus {
  hydraulics?: { pressure: number; temperature: number; status: SystemStatus };
  cameras?: Record<string, 'ACTIVE' | 'STANDBY' | 'OFFLINE'>;
  lights?: { intensity: number; status: 'ON' | 'OFF' };
  manipulators?: Record<string, 'DEPLOYED' | 'STOWED' | 'MOVING'>;
  sonar?: { status: SystemStatus; range?: number; rangeUnit?: string };
  communications?: {
    fiber?: 'CONNECTED' | 'DISCONNECTED';
    acoustic?: 'ACTIVE' | 'STANDBY' | 'OFFLINE';
    bandwidth?: number;
    bandwidthUnit?: string;
  };
}

export interface Alert {
  alertId: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface VehicleListResponse {
  data: VehicleSummary[];
  pagination: PaginationInfo;
}

export interface VehicleSummary {
  vehicleId: string;
  name: string;
  type: VehicleType;
  manufacturer: string;
  model: string;
  status: VehicleStatus;
  location?: Location & { lastUpdate: string };
  capabilities: VehicleCapabilities;
  currentMission?: MissionReference;
  health: VehicleHealth;
}

export interface VehicleCapabilities {
  maxDepth: number;
  maxDepthUnit: string;
  manipulators: number;
  cameras: number;
  sensors: string[];
  payloadCapacity: number;
  payloadCapacityUnit: string;
}

export interface MissionReference {
  missionId: string;
  missionName: string;
  startTime: string;
}

export interface VehicleHealth {
  batteryLevel: number; // percentage
  systemStatus: SystemStatus;
  lastMaintenance: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface VehicleCommand {
  command: string;
  parameters: Record<string, unknown>;
  priority: Priority;
  acknowledgementRequired: boolean;
}

export interface CommandResponse {
  commandId: string;
  status: 'ACKNOWLEDGED' | 'REJECTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  timestamp: string;
  estimatedCompletionTime?: string;
  acknowledgement?: {
    vehicleId: string;
    receivedAt: string;
    validationStatus: 'VALIDATED' | 'INVALID';
    executionStarted?: string;
  };
}

export interface Mission {
  missionId: string;
  missionName: string;
  description: string;
  vehicleId: string;
  plannedStartTime: string;
  plannedEndTime: string;
  missionType: MissionType;
  objectives: string[];
  waypoints: Waypoint[];
  permissions: {
    chiefScientist: string;
    permits?: string[];
  };
  status?: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ABORTED';
}

export interface Waypoint {
  name: string;
  latitude: number;
  longitude: number;
  depth: number;
  tasks: string[];
}

// ============================================================================
// Error Types
// ============================================================================

export interface WIAError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
    requestId: string;
    documentation?: string;
  };
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface WIAClientConfig {
  baseUrl: string;
  apiKey?: string;
  bearerToken?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface TelemetryStreamConfig {
  vehicleId: string;
  dataRate?: number; // Hz
  parameters?: string[];
  reconnect?: boolean;
}
