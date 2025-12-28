/**
 * WIA Ecosystem Monitoring Standard - TypeScript SDK
 * Version: 1.0.0
 *
 * This SDK provides convenient access to WIA-compliant ecosystem monitoring
 * APIs and utilities for working with WIA data formats.
 */

import Ajv from 'ajv';
import axios, { AxiosInstance } from 'axios';
import * as types from './types';

export * from './types';

// ============================================================================
// WIA Client
// ============================================================================

export class WIAClient {
  private client: AxiosInstance;
  private apiKey?: string;

  constructor(config: types.ClientConfig = {}) {
    this.apiKey = config.apiKey;
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.ecosystem-monitoring.wia.org/v1',
      timeout: config.timeout || 30000,
      headers: config.apiKey ? {
        'Authorization': `Bearer ${config.apiKey}`
      } : {}
    });
  }

  /**
   * Query species observations
   */
  async getObservations(
    options: types.QueryOptions = {}
  ): Promise<types.APIResponse<types.SpeciesObservation>> {
    const response = await this.client.get('/observations', {
      params: this.buildQueryParams(options)
    });
    return response.data;
  }

  /**
   * Get specific observation by ID
   */
  async getObservation(id: string): Promise<types.SpeciesObservation> {
    const response = await this.client.get(`/observations/${id}`);
    return response.data.data;
  }

  /**
   * Submit new observation
   */
  async createObservation(
    observation: types.SpeciesObservation
  ): Promise<types.APIResponse<types.SpeciesObservation>> {
    const response = await this.client.post('/observations', observation);
    return response.data;
  }

  /**
   * Submit multiple observations
   */
  async createObservations(
    observations: types.SpeciesObservation[]
  ): Promise<types.APIResponse<types.SpeciesObservation>> {
    const response = await this.client.post('/observations/batch', {
      observations
    });
    return response.data;
  }

  /**
   * Query sensor data
   */
  async getSensorData(
    sensorId: string,
    options: {
      start_time?: string;
      end_time?: string;
      aggregation?: 'raw' | 'hourly' | 'daily' | 'monthly';
    } = {}
  ): Promise<types.APIResponse<types.SensorTimeSeries>> {
    const response = await this.client.get(`/sensors/${sensorId}/data`, {
      params: options
    });
    return response.data;
  }

  /**
   * List available sensors
   */
  async getSensors(
    options: {
      type?: string;
      location?: types.Location;
    } = {}
  ): Promise<types.APIResponse<any>> {
    const response = await this.client.get('/sensors', {
      params: options
    });
    return response.data;
  }

  /**
   * Query monitoring sites
   */
  async getSites(
    options: {
      bbox?: [number, number, number, number];
    } = {}
  ): Promise<types.APIResponse<any>> {
    const response = await this.client.get('/sites', {
      params: options.bbox ? {
        bbox: options.bbox.join(',')
      } : {}
    });
    return response.data;
  }

  /**
   * Discover available datasets
   */
  async getDatasets(): Promise<types.APIResponse<types.DatasetMetadata>> {
    const response = await this.client.get('/datasets');
    return response.data;
  }

  /**
   * Build query parameters
   */
  private buildQueryParams(options: types.QueryOptions): Record<string, any> {
    const params: Record<string, any> = {};

    if (options.taxon) params.taxon = options.taxon;
    if (options.start_date) params.start_date = options.start_date;
    if (options.end_date) params.end_date = options.end_date;
    if (options.bbox) params.bbox = options.bbox.join(',');
    if (options.limit) params.limit = options.limit;
    if (options.offset) params.offset = options.offset;
    if (options.format) params.format = options.format;

    return params;
  }
}

// ============================================================================
// Validation Utilities
// ============================================================================

const ajv = new Ajv();

/**
 * Validate WIA observation against schema
 */
export function validateObservation(
  observation: types.SpeciesObservation
): types.ValidationResult {
  const errors: types.ValidationError[] = [];

  // Check required base fields
  if (!observation.wia_version) {
    errors.push({
      field: 'wia_version',
      message: 'wia_version is required'
    });
  }

  if (!observation.record_id) {
    errors.push({
      field: 'record_id',
      message: 'record_id is required'
    });
  }

  if (!observation.timestamp) {
    errors.push({
      field: 'timestamp',
      message: 'timestamp is required'
    });
  }

  // Validate location
  if (!observation.location) {
    errors.push({
      field: 'location',
      message: 'location is required'
    });
  } else {
    if (observation.location.latitude < -90 || observation.location.latitude > 90) {
      errors.push({
        field: 'location.latitude',
        message: 'latitude must be between -90 and 90',
        value: observation.location.latitude
      });
    }

    if (observation.location.longitude < -180 || observation.location.longitude > 180) {
      errors.push({
        field: 'location.longitude',
        message: 'longitude must be between -180 and 180',
        value: observation.location.longitude
      });
    }
  }

  // Validate taxon
  if (!observation.taxon) {
    errors.push({
      field: 'taxon',
      message: 'taxon is required for species observations'
    });
  } else {
    if (!observation.taxon.scientific_name) {
      errors.push({
        field: 'taxon.scientific_name',
        message: 'scientific_name is required'
      });
    }

    if (!observation.taxon.taxon_authority) {
      errors.push({
        field: 'taxon.taxon_authority',
        message: 'taxon_authority is required'
      });
    }
  }

  // Validate detection method
  if (!observation.detection_method) {
    errors.push({
      field: 'detection_method',
      message: 'detection_method is required'
    });
  }

  // Validate occurrence status
  if (!observation.occurrence_status) {
    errors.push({
      field: 'occurrence_status',
      message: 'occurrence_status is required'
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate sensor time series data
 */
export function validateSensorData(
  sensorData: types.SensorTimeSeries
): types.ValidationResult {
  const errors: types.ValidationError[] = [];

  if (!sensorData.sensor_id) {
    errors.push({
      field: 'sensor_id',
      message: 'sensor_id is required'
    });
  }

  if (!sensorData.sensor_metadata) {
    errors.push({
      field: 'sensor_metadata',
      message: 'sensor_metadata is required'
    });
  }

  if (!sensorData.data || !sensorData.data.readings) {
    errors.push({
      field: 'data.readings',
      message: 'readings array is required'
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================================================
// Conversion Utilities
// ============================================================================

/**
 * Convert WIA observation to GeoJSON Feature
 */
export function toGeoJSON(observation: types.SpeciesObservation): any {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        observation.location.longitude,
        observation.location.latitude
      ]
    },
    properties: {
      record_id: observation.record_id,
      timestamp: observation.timestamp,
      scientific_name: observation.taxon.scientific_name,
      common_name: observation.taxon.common_name,
      detection_method: observation.detection_method,
      abundance: observation.abundance,
      observer: observation.observer.name,
      quality: observation.quality.validation_status
    }
  };
}

/**
 * Convert array of observations to GeoJSON FeatureCollection
 */
export function toGeoJSONCollection(
  observations: types.SpeciesObservation[]
): any {
  return {
    type: 'FeatureCollection',
    features: observations.map(toGeoJSON)
  };
}

/**
 * Convert WIA observation to Darwin Core
 */
export function toDarwinCore(observation: types.SpeciesObservation): any {
  return {
    occurrenceID: observation.record_id,
    eventDate: observation.timestamp,
    decimalLatitude: observation.location.latitude,
    decimalLongitude: observation.location.longitude,
    coordinateUncertaintyInMeters: observation.location.precision,
    scientificName: observation.taxon.scientific_name,
    kingdom: observation.taxon.kingdom,
    phylum: observation.taxon.phylum,
    class: observation.taxon.class,
    order: observation.taxon.order,
    family: observation.taxon.family,
    genus: observation.taxon.genus,
    specificEpithet: observation.taxon.species,
    infraspecificEpithet: observation.taxon.subspecies,
    scientificNameAuthorship: observation.taxon.taxon_authority,
    individualCount: observation.abundance,
    lifeStage: observation.life_stage,
    sex: observation.sex,
    behavior: observation.behavior,
    samplingProtocol: observation.detection_method,
    recordedBy: observation.observer.name,
    institutionCode: observation.observer.organization
  };
}

// ============================================================================
// Export default client
// ============================================================================

export default WIAClient;
