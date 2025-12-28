/**
 * WIA Drought Monitoring Standard - TypeScript Type Definitions
 * Version: 1.0.0
 * License: MIT
 *
 * Philosophy: 弘益人間 (Benefit All Humanity)
 */

// ============================================================================
// Core Types
// ============================================================================

export type WIAVersion = "1.0";

export type DataType =
  | "pdsi"
  | "spi"
  | "soil_moisture"
  | "ndvi"
  | "evapotranspiration"
  | "pdsi_timeseries"
  | "drought_forecast";

export type QualityFlag = "excellent" | "good" | "fair" | "poor" | "invalid";

export type DroughtClassification =
  | "extremely_wet"
  | "very_wet"
  | "moderately_wet"
  | "slightly_wet"
  | "near_normal"
  | "mild_drought"
  | "moderate_drought"
  | "severe_drought"
  | "extreme_drought";

// ============================================================================
// Location Types
// ============================================================================

export interface Point {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
  properties?: LocationProperties;
}

export interface Polygon {
  type: "Polygon";
  coordinates: [number, number][][];
  properties?: LocationProperties;
}

export interface LocationProperties {
  region?: string;
  elevation_m?: number;
  land_use?: string;
  climate_division?: string;
  [key: string]: any;
}

export type Location = Point | Polygon;

// ============================================================================
// Metadata
// ============================================================================

export interface Metadata {
  source_organization: string;
  processing_date: string; // ISO 8601
  quality_flag: QualityFlag;
  confidence_score: number; // 0.0 to 1.0
  validation_method?: string;
  data_completeness?: number; // 0.0 to 1.0
  [key: string]: any;
}

// ============================================================================
// PDSI Types
// ============================================================================

export interface PDSIValue {
  value: number; // -10.0 to 10.0
  classification: DroughtClassification;
  classification_label: string;
  range: [number, number];
  percentile: number;
  zscore?: number;
}

export interface PDSIParameters {
  precipitation_mm: number;
  temperature_c: number;
  potential_evapotranspiration_mm: number;
  soil_moisture_mm: number;
  available_water_capacity_mm?: number;
  runoff_mm?: number;
}

export interface WaterBalance {
  deficit_mm: number;
  surplus_mm: number;
  recharge_mm: number;
  loss_mm: number;
}

export interface HistoricalComparison {
  "30year_mean": number;
  "30year_stddev": number;
  same_month_mean: number;
  rank_percentile: number;
}

export interface PDSIData {
  wia_version: WIAVersion;
  data_type: "pdsi";
  timestamp: string; // ISO 8601
  location: Location;
  pdsi: PDSIValue;
  parameters: PDSIParameters;
  water_balance?: WaterBalance;
  historical_comparison?: HistoricalComparison;
  metadata: Metadata;
}

// ============================================================================
// SPI Types
// ============================================================================

export interface SPIValue {
  value: number;
  time_scale_months: 1 | 3 | 6 | 12 | 24;
  classification: DroughtClassification;
  classification_label: string;
  probability: number;
  percentile: number;
}

export interface PrecipitationData {
  period_total_mm: number;
  historical_mean_mm: number;
  historical_stddev_mm: number;
  percent_of_normal: number;
  deficit_mm: number;
}

export interface SPIData {
  wia_version: WIAVersion;
  data_type: "spi";
  timestamp: string;
  location: Location;
  spi: SPIValue;
  precipitation: PrecipitationData;
  multi_scale?: {
    spi_1_month?: number;
    spi_3_month?: number;
    spi_6_month?: number;
    spi_12_month?: number;
    spi_24_month?: number;
  };
  metadata: Metadata;
}

// ============================================================================
// Soil Moisture Types
// ============================================================================

export type StressLevel = "none" | "low" | "moderate" | "high" | "severe";

export interface SoilMoistureLayer {
  depth_range_cm: [number, number];
  depth_center_cm: number;
  moisture_percent: number;
  saturation_percent: number;
  field_capacity_percent: number;
  wilting_point_percent: number;
  available_water_percent: number;
  stress_level: StressLevel;
}

export interface SoilMoistureValue {
  measurement_type: "volumetric" | "gravimetric";
  unit: "percent" | "fraction";
  layers: SoilMoistureLayer[];
}

export interface SoilMoistureData {
  wia_version: WIAVersion;
  data_type: "soil_moisture";
  timestamp: string;
  location: Location;
  soil_moisture: SoilMoistureValue;
  measurement_info?: {
    method: string;
    sensor_model?: string;
    calibration_date?: string;
    accuracy_percent?: number;
  };
  historical_comparison?: {
    "30day_mean_percent": number;
    same_date_mean_percent: number;
    percentile: number;
    anomaly_percent: number;
  };
  metadata: Metadata;
}

// ============================================================================
// NDVI Types
// ============================================================================

export interface NDVIValue {
  value: number; // -1.0 to 1.0
  range: [number, number];
  interpretation: string;
  anomaly: number;
  percentile: number;
  zscore: number;
}

export interface SatelliteInfo {
  satellite: string;
  sensor: string;
  resolution_m: number;
  cloud_cover_percent?: number;
  quality_assessment?: string;
  acquisition_date?: string;
  processing_level?: string;
}

export interface NDVIData {
  wia_version: WIAVersion;
  data_type: "ndvi";
  timestamp: string;
  location: Location;
  ndvi: NDVIValue;
  reflectance?: {
    red_band: number;
    nir_band: number;
    calculation: string;
  };
  satellite_info: SatelliteInfo;
  historical_comparison?: {
    same_period_mean: number;
    same_period_stddev: number;
    "10year_max": number;
    "10year_min": number;
    current_rank_percentile: number;
  };
  drought_indicators?: {
    vegetation_stress: string;
    drought_likelihood: string;
    trend_14day: string;
    rate_of_change: number;
  };
  metadata: Metadata;
}

// ============================================================================
// Evapotranspiration Types
// ============================================================================

export interface EvapotranspirationData {
  wia_version: WIAVersion;
  data_type: "evapotranspiration";
  timestamp: string;
  location: Location;
  evapotranspiration: {
    et0_mm_day: number;
    etc_mm_day?: number;
    kc_coefficient?: number;
    crop_type?: string;
    growth_stage?: string;
  };
  weather_inputs?: {
    temperature_max_c: number;
    temperature_min_c: number;
    solar_radiation_mj_m2: number;
    wind_speed_2m_ms: number;
    relative_humidity_percent: number;
    precipitation_mm: number;
  };
  calculation_method?: {
    algorithm: string;
    reference: string;
    quality_assessment: string;
  };
  metadata: Metadata;
}

// ============================================================================
// Time Series Types
// ============================================================================

export interface TimeSeriesEntry {
  timestamp: string;
  pdsi?: PDSIValue;
  spi?: SPIValue;
  soil_moisture?: number;
  ndvi?: number;
}

export interface TimeSeriesData {
  wia_version: WIAVersion;
  data_type: "pdsi_timeseries" | "spi_timeseries";
  location: Location;
  time_series: TimeSeriesEntry[];
  statistics: {
    count: number;
    mean: number;
    min: number;
    max: number;
    trend: "improving" | "stable" | "declining";
  };
  metadata: Metadata;
}

// ============================================================================
// Alert Types
// ============================================================================

export interface AlertLocation {
  lat: number;
  lon: number;
  name: string;
}

export interface Thresholds {
  pdsi?: {
    warning?: number;
    alert?: number;
    emergency?: number;
  };
  soil_moisture?: {
    warning?: number;
    alert?: number;
  };
  [key: string]: any;
}

export interface NotificationMethod {
  type: "webhook" | "email" | "sms" | "push";
  url?: string;
  address?: string;
  device_token?: string;
}

export interface AlertSubscription {
  locations: AlertLocation[];
  indices: string[];
  thresholds: Thresholds;
  notification_methods: NotificationMethod[];
  frequency: "realtime" | "daily" | "weekly";
}

export interface Subscription {
  subscription_id: string;
  status: "active" | "paused" | "cancelled";
  created_at: string;
  locations_count: number;
  next_check?: string;
}

export interface Alert {
  alert_id: string;
  subscription_id: string;
  timestamp: string;
  location: AlertLocation;
  trigger: {
    index: string;
    value: number;
    threshold: string;
    threshold_value: number;
  };
  current_conditions: {
    pdsi?: number;
    spi_12?: number;
    soil_moisture?: number;
  };
  severity: "low" | "moderate" | "high" | "critical";
  recommended_actions: string[];
}

// ============================================================================
// API Client Configuration
// ============================================================================

export interface WIAClientConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  cacheEnabled?: boolean;
  offlineMode?: boolean;
}

export interface QueryParams {
  lat?: number;
  lon?: number;
  bbox?: string;
  date?: string;
  scale?: 1 | 3 | 6 | 12 | 24;
  indices?: string[];
}

export interface TimeSeriesParams {
  lat: number;
  lon: number;
  start_date: string;
  end_date: string;
  interval?: "daily" | "weekly" | "monthly";
}

// ============================================================================
// Error Types
// ============================================================================

export interface WIAError {
  error: {
    code: string;
    message: string;
    details?: any;
    request_id?: string;
    documentation_url?: string;
  };
}

// ============================================================================
// Response Types
// ============================================================================

export type DroughtData =
  | PDSIData
  | SPIData
  | SoilMoistureData
  | NDVIData
  | EvapotranspirationData
  | TimeSeriesData;

export interface MultiIndexResponse {
  pdsi?: PDSIData;
  spi?: SPIData;
  soil_moisture?: SoilMoistureData;
  ndvi?: NDVIData;
  evapotranspiration?: EvapotranspirationData;
}
