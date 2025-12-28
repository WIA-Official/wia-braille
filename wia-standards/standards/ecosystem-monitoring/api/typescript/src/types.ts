/**
 * WIA Ecosystem Monitoring Standard - TypeScript Type Definitions
 * Version: 1.0.0
 *
 * This file contains comprehensive type definitions for the WIA Ecosystem
 * Monitoring Standard, covering all phases of the specification.
 */

// ============================================================================
// Base Types
// ============================================================================

export type WIAVersion = '1.0';

export type ValidationStatus =
  | 'unvalidated'
  | 'in_review'
  | 'validated'
  | 'expert_verified'
  | 'questionable'
  | 'invalid';

export type QualityFlag =
  | 'good'
  | 'questionable'
  | 'bad'
  | 'missing'
  | 'estimated';

export interface Location {
  latitude: number;
  longitude: number;
  elevation?: number;
  datum?: string;
  precision?: number;
  location_name?: string;
}

export interface Observer {
  id: string;
  name?: string;
  organization?: string;
  email?: string;
}

export interface Quality {
  validation_status: ValidationStatus;
  quality_flags?: QualityFlag[];
  confidence_level?: number;
}

export interface BaseRecord {
  wia_version: WIAVersion;
  schema_type: string;
  record_id: string;
  timestamp: string; // ISO 8601
  location: Location;
  observer: Observer;
  quality: Quality;
}

// ============================================================================
// Species Observation Types
// ============================================================================

export type DetectionMethod =
  | 'visual_survey'
  | 'camera_trap'
  | 'acoustic_monitoring'
  | 'edna'
  | 'telemetry'
  | 'mark_recapture'
  | 'remote_sensing'
  | 'specimen';

export type OccurrenceStatus =
  | 'present'
  | 'absent'
  | 'trace';

export type LifeStage =
  | 'adult'
  | 'juvenile'
  | 'larva'
  | 'egg'
  | 'seed'
  | 'seedling'
  | 'sapling';

export type Sex =
  | 'male'
  | 'female'
  | 'hermaphrodite'
  | 'unknown';

export interface Taxon {
  scientific_name: string;
  common_name?: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  subspecies?: string;
  taxon_authority: string;
  taxon_id?: string;
}

export interface EnvironmentalConditions {
  temperature_c?: number;
  cloud_cover?: string;
  wind_speed_kmh?: number;
  precipitation?: string;
}

export interface SpeciesObservation extends BaseRecord {
  schema_type: 'species-observation';
  taxon: Taxon;
  detection_method: DetectionMethod;
  occurrence_status: OccurrenceStatus;
  abundance?: number | string;
  life_stage?: LifeStage;
  sex?: Sex;
  behavior?: string;
  reproductive_condition?: string;
  habitat_type?: string;
  associated_taxa?: Taxon[];
  environmental_conditions?: EnvironmentalConditions;
}

// ============================================================================
// Sensor Data Types
// ============================================================================

export interface SensorMetadata {
  sensor_type: string;
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  measurement_parameter: string;
  measurement_unit: string;
  precision?: number;
  accuracy?: number;
  detection_limit?: number;
  calibration_date: string;
  calibration_certificate?: string;
}

export interface Deployment {
  deployment_date: string;
  location: Location;
  height_above_ground?: number;
  depth_below_surface?: number;
  environment?: string;
}

export interface SensorReading {
  timestamp: string;
  value: number;
  qc_flag: QualityFlag;
  qc_notes?: string;
}

export interface SensorTimeSeries extends BaseRecord {
  schema_type: 'sensor-timeseries';
  sensor_id: string;
  sensor_metadata: SensorMetadata;
  deployment: Deployment;
  data: {
    start_time: string;
    end_time: string;
    interval_seconds: number;
    readings: SensorReading[];
  };
}

// ============================================================================
// Water Quality Types
// ============================================================================

export type SamplingMethod =
  | 'grab_sample'
  | 'composite'
  | 'in_situ'
  | 'continuous';

export interface WaterQualityParameters {
  temperature_c?: number;
  ph?: number;
  dissolved_oxygen_mgl?: number;
  turbidity_ntu?: number;
  conductivity_uscm?: number;
  total_nitrogen_mgl?: number;
  total_phosphorus_mgl?: number;
  chlorophyll_a_ugl?: number;
  salinity_ppt?: number;
}

export interface Laboratory {
  lab_name?: string;
  analysis_date?: string;
  methods?: Record<string, string>;
  detection_limits?: Record<string, number>;
}

export interface WaterQualitySample extends BaseRecord {
  schema_type: 'water-quality-sample';
  sample_id: string;
  waterbody_name?: string;
  site_id?: string;
  sampling_depth_meters?: number;
  sampling_method: SamplingMethod;
  parameters: WaterQualityParameters;
  laboratory?: Laboratory;
}

// ============================================================================
// Air Quality Types
// ============================================================================

export interface AirQualityParameters {
  pm25_ugm3?: number;
  pm10_ugm3?: number;
  o3_ppb?: number;
  no2_ppb?: number;
  so2_ppb?: number;
  co_ppm?: number;
  co2_ppm?: number;
  temperature_c?: number;
  relative_humidity_percent?: number;
  pressure_mb?: number;
  wind_speed_ms?: number;
  wind_direction_degrees?: number;
}

export type AQICategory =
  | 'good'
  | 'moderate'
  | 'unhealthy_sensitive'
  | 'unhealthy'
  | 'very_unhealthy'
  | 'hazardous';

export interface AirQualityMeasurement extends BaseRecord {
  schema_type: 'air-quality-measurement';
  station_id: string;
  parameters: AirQualityParameters;
  aqi_value?: number;
  aqi_category?: AQICategory;
}

// ============================================================================
// API Types
// ============================================================================

export interface APIResponse<T> {
  status: 'success' | 'error';
  api_version: string;
  request_id: string;
  timestamp: string;
  query?: Record<string, any>;
  pagination?: Pagination;
  data?: T[];
  error_code?: string;
  message?: string;
  details?: any;
}

export interface Pagination {
  total_records: number;
  returned_records: number;
  page: number;
  total_pages: number;
  next_page?: string;
}

export interface QueryOptions {
  taxon?: string;
  start_date?: string;
  end_date?: string;
  bbox?: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  limit?: number;
  offset?: number;
  format?: 'json' | 'csv' | 'geojson';
}

export interface ClientConfig {
  apiKey?: string;
  baseURL?: string;
  timeout?: number;
}

// ============================================================================
// Metadata Types
// ============================================================================

export interface Person {
  name: string;
  email?: string;
  organization?: string;
  orcid?: string;
}

export interface TemporalCoverage {
  start_date: string;
  end_date?: string;
}

export interface GeographicCoverage {
  bounding_box: [number, number, number, number];
  description?: string;
}

export interface Methods {
  description: string;
  protocol_url?: string;
  sampling_design?: string;
}

export interface QualityAssurance {
  description: string;
  validation_procedures?: string;
}

export interface Access {
  license: string;
  restrictions?: string;
  citation: string;
}

export interface RelatedResources {
  publications?: string[];
  related_datasets?: string[];
}

export interface DatasetMetadata {
  title: string;
  abstract: string;
  keywords: string[];
  authors: Person[];
  contacts: Person[];
  funding_sources?: string[];
  temporal_coverage: TemporalCoverage;
  geographic_coverage: GeographicCoverage;
  taxonomic_coverage?: Taxon[];
  methods: Methods;
  quality_assurance: QualityAssurance;
  access: Access;
  related_resources?: RelatedResources;
}

// ============================================================================
// Union Types
// ============================================================================

export type EcosystemRecord =
  | SpeciesObservation
  | SensorTimeSeries
  | WaterQualitySample
  | AirQualityMeasurement;

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}
