/**
 * WIA Environmental Sensor Standard - TypeScript Type Definitions
 * Version: 1.0.0
 * Standard: WIA-ENE-027
 *
 * @license MIT
 * @copyright 2025 World Certification Industry Association
 */

// ============================================================================
// Core Data Types
// ============================================================================

export interface WIASensorData {
  version: string;
  standard: string;
  deviceId: string;
  timestamp: string;
  sensorType: SensorType;
  location?: Location;
  metadata?: Metadata;
  quality?: Quality;
  calibration?: Calibration;
  readings: SensorReadings;
}

export type SensorType =
  | 'air_quality'
  | 'water_quality'
  | 'soil'
  | 'meteorological'
  | 'radiation'
  | 'noise';

// ============================================================================
// Common Structures
// ============================================================================

export interface Location {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  datum?: string;
}

export interface Metadata {
  manufacturer?: string;
  model?: string;
  firmware?: string;
  battery?: number;
  signalStrength?: number;
  uptime?: number;
}

export interface Quality {
  overall: 'good' | 'suspect' | 'bad' | 'missing';
  flags?: string[];
  confidence?: number;
}

export interface Calibration {
  lastCalibration: string;
  nextCalibration?: string;
  method?: string;
  parameters?: Record<string, any>;
  certificateId?: string;
}

export interface Measurement {
  value: number;
  unit: string;
  method?: string;
  uncertainty?: number;
  averaged?: number;
}

// ============================================================================
// Sensor-Specific Readings
// ============================================================================

export type SensorReadings =
  | AirQualityReadings
  | WaterQualityReadings
  | SoilReadings
  | MeteorologicalReadings
  | RadiationReadings
  | NoiseReadings;

// Air Quality
export interface AirQualityReadings {
  pm1_0?: Measurement;
  pm2_5?: Measurement;
  pm4_0?: Measurement;
  pm10?: Measurement;
  co2?: Measurement;
  co?: Measurement;
  no2?: Measurement;
  o3?: Measurement;
  so2?: Measurement;
  voc?: Measurement & { compound?: string };
  aqi?: {
    value: number;
    category: 'good' | 'moderate' | 'unhealthy_sensitive' | 'unhealthy' | 'very_unhealthy' | 'hazardous';
    pollutant: string;
    standard?: string;
  };
  temperature?: Measurement;
  humidity?: Measurement;
}

// Water Quality
export interface WaterQualityReadings {
  ph?: Measurement & { temperature_compensated?: boolean };
  dissolved_oxygen?: Measurement & { saturation?: number };
  turbidity?: Measurement;
  conductivity?: Measurement & { temperature?: number; specific_conductance?: number };
  temperature?: Measurement;
  orp?: Measurement;
  chlorophyll?: Measurement;
  tds?: Measurement;
  salinity?: Measurement;
}

// Soil
export interface SoilReadings {
  moisture?: Measurement & { depth?: number };
  temperature?: Measurement & { depth?: number };
  electrical_conductivity?: Measurement & { depth?: number };
  nutrients?: {
    nitrogen?: Measurement & { form?: string; method?: string };
    phosphorus?: Measurement & { form?: string };
    potassium?: Measurement & { form?: string };
  };
}

// Meteorological
export interface MeteorologicalReadings {
  temperature?: Measurement;
  humidity?: Measurement;
  pressure?: Measurement & { type?: 'station' | 'sea_level' };
  wind_speed?: Measurement & { gust?: number };
  wind_direction?: Measurement;
  precipitation?: Measurement & { type?: 'cumulative' | 'rate'; period?: number };
  solar_radiation?: Measurement & { type?: 'global' | 'direct' | 'diffuse' };
  uv_index?: Measurement;
}

// Radiation
export interface RadiationReadings {
  dose_rate?: Measurement & { type?: 'alpha' | 'beta' | 'gamma' | 'neutron'; detector?: string };
  counts_per_minute?: Measurement & { background_subtracted?: boolean };
}

// Noise
export interface NoiseReadings {
  sound_level?: {
    instantaneous?: Measurement & { weighting?: 'A' | 'C' | 'Z' };
    leq?: Measurement & { period?: number };
    lmax?: Measurement;
    lmin?: Measurement;
  };
  frequency_spectrum?: {
    octave_bands?: Array<{ frequency: number; level: number }>;
  };
}

// ============================================================================
// API Response Types
// ============================================================================

export interface SensorListResponse {
  total: number;
  count: number;
  offset: number;
  sensors: SensorInfo[];
  links?: PaginationLinks;
}

export interface SensorInfo {
  deviceId: string;
  type: SensorType;
  location?: Location;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate?: string;
  capabilities?: string[];
}

export interface SensorDetails extends SensorInfo {
  manufacturer?: string;
  model?: string;
  firmware?: string;
  lastCalibration?: string;
  nextCalibration?: string;
  capabilities?: Record<string, CapabilitySpec>;
  metadata?: Record<string, any>;
}

export interface CapabilitySpec {
  range: [number, number];
  unit: string;
  accuracy?: number;
}

export interface HistoricalDataResponse {
  deviceId: string;
  start: string;
  end: string;
  aggregation?: 'none' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  data: HistoricalDataPoint[];
}

export interface HistoricalDataPoint {
  timestamp: string;
  [parameter: string]: string | number | AggregatedValue;
}

export interface AggregatedValue {
  mean?: number;
  min?: number;
  max?: number;
  stddev?: number;
  count?: number;
}

export interface PaginationLinks {
  first?: string;
  prev?: string;
  self?: string;
  next?: string;
  last?: string;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId?: string;
  };
}

// ============================================================================
// API Client Configuration
// ============================================================================

export interface WIAClientConfig {
  baseURL: string;
  apiKey?: string;
  bearerToken?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface QueryParameters {
  type?: SensorType | SensorType[];
  location?: string;
  status?: 'active' | 'inactive' | 'maintenance';
  limit?: number;
  offset?: number;
}

export interface DataQueryParameters {
  start: string;
  end: string;
  parameters?: string | string[];
  aggregation?: 'none' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  format?: 'json' | 'csv' | 'xml';
}

export interface BulkDataRequest {
  sensorIds: string[];
  start: string;
  end: string;
  parameters?: string[];
  aggregation?: 'none' | 'hourly' | 'daily' | 'weekly' | 'monthly';
}

// ============================================================================
// WebSocket/Streaming Types
// ============================================================================

export interface StreamSubscription {
  action: 'subscribe' | 'unsubscribe';
  sensors: string[];
  parameters?: string[];
}

export interface StreamMessage {
  type: 'measurement' | 'status' | 'ping' | 'error';
  deviceId?: string;
  timestamp: string;
  data?: WIASensorData;
  message?: string;
}

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// ============================================================================
// Utility Types
// ============================================================================

export type PartialSensorData = Partial<WIASensorData> & {
  deviceId: string;
  timestamp: string;
  readings: Partial<SensorReadings>;
};

export type SensorDataArray = WIASensorData[];

export type DataCallback = (data: WIASensorData) => void;
export type ErrorCallback = (error: Error | ErrorResponse) => void;
