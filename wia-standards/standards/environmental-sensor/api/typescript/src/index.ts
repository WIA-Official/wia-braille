/**
 * WIA Environmental Sensor Standard - TypeScript SDK
 * Version: 1.0.0
 * Standard: WIA-ENE-027
 *
 * @license MIT
 * @copyright 2025 World Certification Industry Association
 */

import type {
  WIAClientConfig,
  WIASensorData,
  SensorListResponse,
  SensorDetails,
  HistoricalDataResponse,
  QueryParameters,
  DataQueryParameters,
  BulkDataRequest,
  StreamSubscription,
  StreamMessage,
  ValidationResult,
  DataCallback,
  ErrorCallback,
} from './types';

export * from './types';

/**
 * WIA Environmental Sensor API Client
 */
export class WIAClient {
  private config: WIAClientConfig;
  private wsConnection?: WebSocket;

  constructor(config: WIAClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  /**
   * List all sensors with optional filtering
   */
  async listSensors(params?: QueryParameters): Promise<SensorListResponse> {
    const url = this.buildURL('/api/v1/sensors', params);
    return this.request<SensorListResponse>(url, 'GET');
  }

  /**
   * Get details of a specific sensor
   */
  async getSensor(deviceId: string): Promise<SensorDetails> {
    const url = this.buildURL(`/api/v1/sensors/${deviceId}`);
    return this.request<SensorDetails>(url, 'GET');
  }

  /**
   * Get latest data from a sensor
   */
  async getLatestData(deviceId: string): Promise<WIASensorData> {
    const url = this.buildURL(`/api/v1/sensors/${deviceId}/data/latest`);
    return this.request<WIASensorData>(url, 'GET');
  }

  /**
   * Get historical data from a sensor
   */
  async getHistoricalData(
    deviceId: string,
    params: DataQueryParameters
  ): Promise<HistoricalDataResponse> {
    const url = this.buildURL(`/api/v1/sensors/${deviceId}/data`, params);
    return this.request<HistoricalDataResponse>(url, 'GET');
  }

  /**
   * Submit sensor data
   */
  async submitData(deviceId: string, data: WIASensorData): Promise<void> {
    const url = this.buildURL(`/api/v1/sensors/${deviceId}/data`);
    await this.request(url, 'POST', data);
  }

  /**
   * Bulk data retrieval from multiple sensors
   */
  async getBulkData(request: BulkDataRequest): Promise<HistoricalDataResponse[]> {
    const url = this.buildURL('/api/v1/data/bulk');
    const response = await this.request<{ sensors: HistoricalDataResponse[] }>(url, 'POST', request);
    return response.sensors;
  }

  /**
   * Register a new sensor
   */
  async registerSensor(sensor: Partial<SensorDetails>): Promise<SensorDetails> {
    const url = this.buildURL('/api/v1/sensors');
    return this.request<SensorDetails>(url, 'POST', sensor);
  }

  /**
   * Update sensor configuration
   */
  async updateSensorConfig(
    deviceId: string,
    config: Record<string, any>
  ): Promise<void> {
    const url = this.buildURL(`/api/v1/sensors/${deviceId}/config`);
    await this.request(url, 'PUT', config);
  }

  /**
   * Subscribe to real-time sensor data via WebSocket
   */
  subscribeToStream(
    subscription: StreamSubscription,
    onData: DataCallback,
    onError?: ErrorCallback
  ): () => void {
    const wsURL = this.config.baseURL.replace(/^http/, 'ws') + '/v1/stream';

    this.wsConnection = new WebSocket(wsURL);

    this.wsConnection.onopen = () => {
      this.wsConnection?.send(JSON.stringify(subscription));
    };

    this.wsConnection.onmessage = (event) => {
      try {
        const message: StreamMessage = JSON.parse(event.data);
        if (message.type === 'measurement' && message.data) {
          onData(message.data);
        }
      } catch (error) {
        onError?.(error as Error);
      }
    };

    this.wsConnection.onerror = (error) => {
      onError?.(new Error('WebSocket error'));
    };

    // Return unsubscribe function
    return () => {
      if (this.wsConnection) {
        const unsubscribe: StreamSubscription = {
          action: 'unsubscribe',
          sensors: subscription.sensors,
        };
        this.wsConnection.send(JSON.stringify(unsubscribe));
        this.wsConnection.close();
        this.wsConnection = undefined;
      }
    };
  }

  /**
   * Validate WIA sensor data against schema
   */
  static validate(data: any): ValidationResult {
    const errors: Array<{ field: string; message: string }> = [];

    // Required fields validation
    if (!data.version) errors.push({ field: 'version', message: 'Required field' });
    if (!data.standard) errors.push({ field: 'standard', message: 'Required field' });
    if (!data.deviceId) errors.push({ field: 'deviceId', message: 'Required field' });
    if (!data.timestamp) errors.push({ field: 'timestamp', message: 'Required field' });
    if (!data.sensorType) errors.push({ field: 'sensorType', message: 'Required field' });
    if (!data.readings) errors.push({ field: 'readings', message: 'Required field' });

    // Standard value validation
    if (data.standard && data.standard !== 'WIA-ENE-027') {
      errors.push({ field: 'standard', message: 'Must be WIA-ENE-027' });
    }

    // Timestamp validation
    if (data.timestamp && !this.isValidISO8601(data.timestamp)) {
      errors.push({ field: 'timestamp', message: 'Must be valid ISO 8601 format' });
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  // Private helper methods

  private buildURL(path: string, params?: Record<string, any>): string {
    const url = new URL(path, this.config.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            url.searchParams.set(key, value.join(','));
          } else {
            url.searchParams.set(key, String(value));
          }
        }
      });
    }

    return url.toString();
  }

  private async request<T>(
    url: string,
    method: string,
    body?: any
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.headers,
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    } else if (this.config.bearerToken) {
      headers['Authorization'] = `Bearer ${this.config.bearerToken}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `HTTP ${response.status}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  }

  private static isValidISO8601(dateString: string): boolean {
    try {
      const date = new Date(dateString);
      return date.toISOString() === dateString;
    } catch {
      return false;
    }
  }
}

/**
 * Utility functions for working with WIA sensor data
 */
export class WIAUtils {
  /**
   * Convert temperature between Celsius and Fahrenheit
   */
  static convertTemperature(value: number, from: '°C' | '°F', to: '°C' | '°F'): number {
    if (from === to) return value;
    if (from === '°C') return (value * 9/5) + 32;
    return (value - 32) * 5/9;
  }

  /**
   * Calculate Air Quality Index (US EPA standard)
   */
  static calculateAQI(pm25: number): { value: number; category: string } {
    const breakpoints = [
      { low: 0, high: 12.0, aqiLow: 0, aqiHigh: 50, category: 'good' },
      { low: 12.1, high: 35.4, aqiLow: 51, aqiHigh: 100, category: 'moderate' },
      { low: 35.5, high: 55.4, aqiLow: 101, aqiHigh: 150, category: 'unhealthy_sensitive' },
      { low: 55.5, high: 150.4, aqiLow: 151, aqiHigh: 200, category: 'unhealthy' },
      { low: 150.5, high: 250.4, aqiLow: 201, aqiHigh: 300, category: 'very_unhealthy' },
      { low: 250.5, high: 500.4, aqiLow: 301, aqiHigh: 500, category: 'hazardous' },
    ];

    for (const bp of breakpoints) {
      if (pm25 >= bp.low && pm25 <= bp.high) {
        const aqi = Math.round(
          ((bp.aqiHigh - bp.aqiLow) / (bp.high - bp.low)) * (pm25 - bp.low) + bp.aqiLow
        );
        return { value: aqi, category: bp.category };
      }
    }

    return { value: 500, category: 'hazardous' };
  }

  /**
   * Aggregate multiple sensor readings
   */
  static aggregateReadings(
    data: WIASensorData[],
    parameter: string
  ): { mean: number; min: number; max: number; count: number } {
    const values = data
      .map(d => (d.readings as any)[parameter]?.value)
      .filter(v => v !== undefined && v !== null);

    if (values.length === 0) {
      return { mean: 0, min: 0, max: 0, count: 0 };
    }

    return {
      mean: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    };
  }
}

// Default export
export default WIAClient;
