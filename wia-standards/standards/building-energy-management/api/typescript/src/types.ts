/**
 * WIA-BEMS TypeScript SDK - Type Definitions
 * Building Energy Management Standard - Data Types
 *
 * @package wia-bems-sdk
 * @version 1.0.0
 * @license MIT
 */

// ============================================================================
// Common Types
// ============================================================================

export type ISO8601Timestamp = string;
export type UUID = string;

export interface Location {
  building_id: string;
  floor?: number;
  zone?: string;
  meter_id?: string;
  sensor_id?: string;
  equipment_id?: string;
}

export interface Quality {
  validation_status: 'verified' | 'estimated' | 'questionable' | 'invalid';
  completeness?: number; // 0-100
  accuracy?: number;
  estimated?: boolean;
  confidence?: number; // 0.0-1.0
  error_code?: string;
  error_description?: string;
  last_valid_measurement?: ISO8601Timestamp;
}

// ============================================================================
// Energy Data Types
// ============================================================================

export interface EnergyConsumption {
  measurement_id: UUID;
  timestamp_start: ISO8601Timestamp;
  timestamp_end: ISO8601Timestamp;
  location: Location;
  energy: {
    consumption_kwh: number;
    unit: 'kilowatt_hour';
    measurement_type: 'electrical' | 'gas' | 'steam' | 'chilled_water';
    accuracy_class?: string;
  };
  cost?: {
    amount: number;
    currency: string;
    rate_schedule?: string;
  };
  quality: Quality;
  metadata?: Record<string, any>;
}

export interface PowerDemand {
  measurement_id: UUID;
  timestamp: ISO8601Timestamp;
  location: Location;
  power: {
    demand_kw: number;
    unit: 'kilowatt';
    measurement_type: 'electrical' | 'thermal';
    power_factor?: number; // 0.0-1.0
  };
  electrical_details?: {
    voltage_v: number;
    current_a: number;
    frequency_hz: number;
    phases: number;
  };
  quality: Quality;
}

// ============================================================================
// Environmental Data Types
// ============================================================================

export interface TemperatureMeasurement {
  measurement_id: UUID;
  timestamp: ISO8601Timestamp;
  location: Location;
  temperature: {
    value: number;
    unit: 'celsius' | 'fahrenheit' | 'kelvin';
    measurement_type: 'ambient_air' | 'surface' | 'supply_air' | 'return_air' | 'outdoor';
  };
  quality: Quality;
}

export interface AirQuality {
  measurement_id: UUID;
  timestamp: ISO8601Timestamp;
  location: Location;
  measurements: {
    humidity?: {
      relative_humidity_percent: number;
      accuracy: number;
    };
    co2?: {
      concentration_ppm: number;
      accuracy: number;
      threshold_warning?: number;
      threshold_critical?: number;
    };
    particulate_matter?: {
      pm25_ugm3: number;
      pm10_ugm3: number;
    };
    volatile_organic_compounds?: {
      tvoc_ppb: number;
      threshold_warning?: number;
    };
  };
}

// ============================================================================
// Occupancy Data Types
// ============================================================================

export type OccupancyDetectionMethod =
  | 'pir_sensor'
  | 'ultrasonic'
  | 'co2_based'
  | 'camera_vision'
  | 'wifi_device_count';

export interface Occupancy {
  measurement_id: UUID;
  timestamp: ISO8601Timestamp;
  location: Location & { room_capacity?: number };
  occupancy: {
    count: number | null;
    detection_method: OccupancyDetectionMethod;
    confidence: number;
    privacy_preserved: boolean;
  };
  utilization?: {
    percent: number;
    status: 'occupied' | 'vacant' | 'partial';
    scheduled?: boolean;
    event_type?: string;
  };
}

// ============================================================================
// Equipment Data Types
// ============================================================================

export type EquipmentStatus = 'running' | 'stopped' | 'standby' | 'alarm' | 'maintenance';
export type HVACMode = 'heating' | 'cooling' | 'ventilating' | 'economizer' | 'off';

export interface HVACStatus {
  measurement_id: UUID;
  timestamp: ISO8601Timestamp;
  equipment: {
    equipment_id: string;
    equipment_type: 'air_handling_unit' | 'fan_coil_unit' | 'variable_air_volume' | 'chiller' | 'boiler' | 'heat_pump';
    location: Location;
  };
  operational_status: {
    status: EquipmentStatus;
    mode: HVACMode;
    enabled: boolean;
    alarm_status: string;
  };
  performance: {
    supply_air_temp_c?: number;
    return_air_temp_c?: number;
    supply_air_flow_cfm?: number;
    static_pressure_pa?: number;
    fan_speed_percent?: number;
    power_kw?: number;
  };
  setpoints?: {
    supply_air_temp_setpoint_c?: number;
    static_pressure_setpoint_pa?: number;
  };
  maintenance?: {
    runtime_hours: number;
    filter_pressure_drop_pa?: number;
    last_maintenance_date?: string;
  };
}

export interface LightingStatus {
  measurement_id: UUID;
  timestamp: ISO8601Timestamp;
  equipment: {
    equipment_id: string;
    equipment_type: 'led_lighting_zone' | 'fluorescent_lighting' | 'individual_fixture';
    location: Location;
  };
  operational_status: {
    status: 'on' | 'off' | 'dimmed';
    brightness_percent: number;
    color_temperature_k?: number;
    control_mode: 'manual' | 'scheduled' | 'auto_occupancy' | 'daylight_harvesting';
  };
  performance: {
    power_w: number;
    fixture_count?: number;
    operational_fixtures?: number;
    ambient_light_lux?: number;
    target_light_lux?: number;
  };
}

// ============================================================================
// Renewable Energy Types
// ============================================================================

export interface SolarGeneration {
  measurement_id: UUID;
  timestamp: ISO8601Timestamp;
  system: {
    system_id: string;
    system_type: 'photovoltaic';
    location: Location & { array_location?: string; capacity_kw?: number };
  };
  generation: {
    power_kw: number;
    energy_kwh_today: number;
    performance_ratio: number; // 0.0-1.0
  };
  environmental?: {
    irradiance_wm2: number;
    module_temp_c: number;
    ambient_temp_c: number;
  };
  electrical?: {
    dc_voltage_v: number;
    dc_current_a: number;
    ac_voltage_v: number;
    inverter_efficiency: number;
  };
}

export interface EnergyStorage {
  measurement_id: UUID;
  timestamp: ISO8601Timestamp;
  system: {
    system_id: string;
    system_type: 'lithium_ion_battery' | 'lead_acid_battery' | 'flow_battery';
    location: Location;
    capacity_kwh: number;
  };
  state: {
    state_of_charge_percent: number;
    state_of_health_percent: number;
    operating_mode: 'charging' | 'discharging' | 'standby' | 'grid_support';
    power_kw: number; // Positive = charging, Negative = discharging
    charging: boolean;
    discharging: boolean;
  };
  performance?: {
    round_trip_efficiency: number;
    cycles_total: number;
    throughput_kwh_total: number;
  };
  thermal?: {
    temperature_c: number;
    temperature_max_c: number;
    cooling_active: boolean;
  };
}

// ============================================================================
// Control Types
// ============================================================================

export interface EquipmentCommand {
  command_id?: UUID;
  equipment_id: string;
  command: string;
  parameters: Record<string, any>;
  authorization?: {
    override_reason?: string;
    duration_minutes?: number;
  };
}

export interface CommandResponse {
  command_id: UUID;
  status: 'accepted' | 'rejected' | 'completed' | 'failed';
  equipment_id: string;
  estimated_completion?: ISO8601Timestamp;
  error?: string;
  links?: {
    status?: string;
  };
}

// ============================================================================
// API Response Types
// ============================================================================

export interface Building {
  building_id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
  area_sqm: number;
  floors: number;
  type: 'commercial_office' | 'retail' | 'hotel' | 'hospital' | 'data_center' | 'residential' | 'industrial';
  year_built?: number;
  certifications?: string[];
  links?: {
    self?: string;
    meters?: string;
    equipment?: string;
    energy?: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    next?: string;
  };
  links?: {
    next?: string;
    previous?: string;
  };
}

export interface EnergyQueryParams {
  start: ISO8601Timestamp;
  end: ISO8601Timestamp;
  interval?: '1m' | '5m' | '15m' | '1h' | '1d';
  meter_id?: string;
  floor?: number;
  zone?: string;
  quality?: 'verified' | 'estimated' | 'questionable';
}

export interface EnergyQueryResponse {
  building_id: string;
  query: EnergyQueryParams;
  data: Array<{
    timestamp_start: ISO8601Timestamp;
    timestamp_end: ISO8601Timestamp;
    energy_kwh: number;
    cost_usd?: number;
    quality: string;
  }>;
  summary: {
    total_energy_kwh: number;
    total_cost_usd?: number;
    avg_power_kw: number;
    peak_power_kw: number;
    data_completeness: number;
  };
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface OptimizationRecommendation {
  action: string;
  equipment_id?: string;
  zone?: string;
  current_setting: string;
  recommended_setting: string;
  projected_savings_kwh: number;
  projected_savings_usd: number;
  confidence: number;
  implementation_cost_usd?: number;
  payback_period_days?: number;
}

export interface AnalyticsResult {
  analysis_id: UUID;
  analysis_type: string;
  timestamp: ISO8601Timestamp;
  recommendations: OptimizationRecommendation[];
  summary: {
    total_savings_kwh: number;
    total_savings_usd: number;
    total_cost_usd?: number;
    payback_period_days?: number;
    risk_level: 'low' | 'medium' | 'high';
  };
}

// ============================================================================
// Error Types
// ============================================================================

export interface APIError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: ISO8601Timestamp;
    request_id: string;
  };
}
