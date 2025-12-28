/**
 * WIA E-Waste Management Standard - TypeScript SDK
 * Type Definitions for Phase 1 Data Format
 *
 * @version 1.0.0
 * @license MIT
 */

export type WEEECategory = 'WEEE-1' | 'WEEE-2' | 'WEEE-3' | 'WEEE-4' | 'WEEE-5' | 'WEEE-6';

export type HazardLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM_HIGH' | 'MEDIUM' | 'LOW_MEDIUM' | 'LOW';

export type DeviceCondition = 'functional' | 'functional_obsolete' | 'partially_functional' | 'non_functional' | 'damaged';

export type CollectionMethod = 'retail_takeback' | 'municipal_dropoff' | 'mail_in' | 'corporate_itad' | 'event_collection';

export type EventType =
  | 'manufacturing_complete'
  | 'first_sale'
  | 'ownership_transfer'
  | 'repair_service'
  | 'collected_for_recycling'
  | 'data_wiped'
  | 'dismantled'
  | 'material_recovered';

export type ProcessingStage =
  | 'collection'
  | 'sorting'
  | 'inspection'
  | 'data_wiping'
  | 'dismantling'
  | 'shredding'
  | 'separation'
  | 'recovery'
  | 'disposal';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  facility_id?: string;
  address?: string;
  city?: string;
  country_code: string;
  coordinates?: Coordinates;
}

export interface Manufacturer {
  name: string;
  facility_id?: string;
  country_code: string;
}

export interface Model {
  name: string;
  number?: string;
  variant?: string;
}

export interface Manufacturing {
  date: string; // ISO 8601
  batch_number?: string;
  facility_id?: string;
}

export interface PhysicalProperties {
  weight_kg: number;
  dimensions_mm?: {
    length: number;
    width: number;
    depth: number;
  };
}

export interface Device {
  device_id: string; // UUID v4
  weee_category: WEEECategory;
  weee_subcategory?: string;
  manufacturer: Manufacturer;
  model: Model;
  manufacturing?: Manufacturing;
  physical_properties: PhysicalProperties;
  serial_number?: string;
  qr_code_url?: string;
  created_at: string; // ISO 8601
  schema_version: string;
}

export interface Material {
  substance: string;
  cas_number: string;
  weight_g: number;
  percentage: number;
  form?: string;
  location?: string;
  recovery_priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface HazardousSubstance {
  substance: string;
  cas_number: string;
  weight_g: number;
  concentration_ppm: number;
  location: string;
  rohs_exempt?: boolean;
  exemption_code?: string;
  handling_requirements?: string;
}

export interface Component {
  component_id: string;
  component_name: string;
  component_type: string;
  weight_g: number;
  materials: Material[];
  hazardous_substances?: HazardousSubstance[];
}

export interface MaterialSummary {
  precious_metals_g: number;
  base_metals_g: number;
  plastics_g: number;
  glass_g: number;
  other_g: number;
}

export interface BillOfMaterials {
  version: string;
  last_updated: string; // ISO 8601
  components: Component[];
  total_weight_g: number;
  material_summary: MaterialSummary;
}

export interface Actor {
  organization_id: string;
  role: 'manufacturer' | 'retailer' | 'collector' | 'processor' | 'consumer';
}

export interface LifecycleEvent {
  event_id: string;
  event_type: EventType;
  timestamp: string; // ISO 8601
  location: Location;
  actor: Actor;
  metadata?: Record<string, any>;
}

export interface RecoveredMaterial {
  material: string;
  cas_number: string;
  weight_kg?: number;
  weight_g?: number;
  purity_percentage: number;
  recovery_method: string;
  destination?: {
    facility_id: string;
    facility_type: string;
    certification?: string[];
  };
  estimated_value_usd?: number;
}

export interface ResidualOutput {
  material_type: string;
  weight_kg: number;
  disposition: 'energy_recovery' | 'secure_landfill' | 'hazardous_waste_facility';
  facility_id: string;
  certification?: string;
}

export interface RecoveryEfficiency {
  overall_recovery_rate_pct: number;
  material_recovery_pct: number;
  energy_recovery_pct?: number;
}

export interface InputDevice {
  device_id: string;
  weee_category?: WEEECategory;
  weight_kg: number;
}

export interface RecoveryReport {
  recovery_report_id: string;
  facility_id: string;
  processing_date: string; // ISO 8601
  certification?: string[];
  input_devices: InputDevice[];
  batch_summary: {
    total_devices: number;
    total_weight_kg: number;
    processing_method: string;
  };
  recovered_materials: RecoveredMaterial[];
  residual_outputs?: ResidualOutput[];
  recovery_efficiency: RecoveryEfficiency;
}

export interface DeviceWithHistory extends Device {
  bill_of_materials?: BillOfMaterials;
  lifecycle_events: LifecycleEvent[];
}

// API Request/Response Types

export interface RegisterDeviceRequest {
  device: Device;
}

export interface RegisterDeviceResponse {
  device_id: string;
  qr_code_url: string;
  created_at: string;
}

export interface CreateCollectionRequest {
  device_ids: string[];
  collector_id: string;
  location: Location;
  collection_method: CollectionMethod;
  condition_assessments?: Array<{
    device_id: string;
    condition: DeviceCondition;
    visual_damage?: string;
  }>;
}

export interface CreateCollectionResponse {
  collection_id: string;
  devices_count: number;
  created_at: string;
}

export interface ProcessingStageRequest {
  stage_type: ProcessingStage;
  input_devices: string[];
  facility_id: string;
  timestamp: string;
  outputs?: Array<{
    component_type: string;
    quantity: number;
    total_weight_kg: number;
    disposition: string;
  }>;
}

export interface ProcessingStageResponse {
  stage_id: string;
  created_at: string;
}

export interface MaterialRecoveryRequest {
  source_devices: string[];
  facility_id: string;
  recovery_date: string;
  recovered_materials: RecoveredMaterial[];
  residual_outputs?: ResidualOutput[];
}

export interface MaterialRecoveryResponse {
  recovery_report_id: string;
  created_at: string;
}

export interface OAuthTokenRequest {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
  scope: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: string;
}

export interface APIError {
  error: string;
  message: string;
  details?: Array<{
    field: string;
    error: string;
    value?: any;
  }>;
}

export interface ValidationError extends APIError {
  error: 'validation_error';
  details: Array<{
    field: string;
    error: string;
    value?: any;
  }>;
}

export interface RateLimitError extends APIError {
  error: 'rate_limit_exceeded';
  retry_after: number;
}
