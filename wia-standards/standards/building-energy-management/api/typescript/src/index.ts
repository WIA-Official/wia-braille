/**
 * WIA-BEMS TypeScript SDK
 * Building Energy Management Standard - Client Library
 *
 * @package wia-bems-sdk
 * @version 1.0.0
 * @license MIT
 */

import * as types from './types';

export * from './types';

// ============================================================================
// SDK Configuration
// ============================================================================

export interface WIABEMSConfig {
  baseUrl: string;
  apiKey?: string;
  accessToken?: string;
  timeout?: number;
}

// ============================================================================
// Main SDK Class
// ============================================================================

export class WIABEMSClient {
  private config: WIABEMSConfig;
  private baseUrl: string;

  constructor(config: WIABEMSConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Make authenticated HTTP request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.config.accessToken) {
      headers['Authorization'] = `Bearer ${this.config.accessToken}`;
    } else if (this.config.apiKey) {
      headers['X-API-Key'] = this.config.apiKey;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: types.APIError = await response.json();
        throw new Error(`API Error: ${error.error.code} - ${error.error.message}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // ==========================================================================
  // Building Operations
  // ==========================================================================

  /**
   * List all accessible buildings
   */
  async listBuildings(params?: {
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<types.PaginatedResponse<types.Building>> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.sort) queryParams.append('sort', params.sort);

    const query = queryParams.toString();
    return this.request<types.PaginatedResponse<types.Building>>(
      `/api/v1/buildings${query ? '?' + query : ''}`
    );
  }

  /**
   * Get building details
   */
  async getBuilding(buildingId: string): Promise<types.Building> {
    return this.request<types.Building>(`/api/v1/buildings/${buildingId}`);
  }

  /**
   * Update building information
   */
  async updateBuilding(
    buildingId: string,
    data: Partial<types.Building>
  ): Promise<types.Building> {
    return this.request<types.Building>(`/api/v1/buildings/${buildingId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==========================================================================
  // Energy Data Operations
  // ==========================================================================

  /**
   * Query energy consumption data
   */
  async getEnergyData(
    buildingId: string,
    params: types.EnergyQueryParams
  ): Promise<types.EnergyQueryResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('start', params.start);
    queryParams.append('end', params.end);
    if (params.interval) queryParams.append('interval', params.interval);
    if (params.meter_id) queryParams.append('meter_id', params.meter_id);
    if (params.floor !== undefined) queryParams.append('floor', params.floor.toString());
    if (params.zone) queryParams.append('zone', params.zone);
    if (params.quality) queryParams.append('quality', params.quality);

    return this.request<types.EnergyQueryResponse>(
      `/api/v1/buildings/${buildingId}/energy?${queryParams.toString()}`
    );
  }

  /**
   * Submit energy consumption data
   */
  async submitEnergyData(
    buildingId: string,
    data: types.EnergyConsumption
  ): Promise<{ success: boolean; measurement_id: string }> {
    return this.request(`/api/v1/buildings/${buildingId}/energy`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ==========================================================================
  // Equipment Operations
  // ==========================================================================

  /**
   * List equipment in building
   */
  async listEquipment(buildingId: string): Promise<{
    equipment: Array<{
      equipment_id: string;
      equipment_type: string;
      location: types.Location;
      status: types.EquipmentStatus;
    }>;
  }> {
    return this.request(`/api/v1/buildings/${buildingId}/equipment`);
  }

  /**
   * Get equipment status
   */
  async getEquipmentStatus(
    buildingId: string,
    equipmentId: string
  ): Promise<types.HVACStatus | types.LightingStatus> {
    return this.request(`/api/v1/buildings/${buildingId}/equipment/${equipmentId}`);
  }

  /**
   * Send command to equipment
   */
  async sendCommand(
    buildingId: string,
    equipmentId: string,
    command: types.EquipmentCommand
  ): Promise<types.CommandResponse> {
    return this.request<types.CommandResponse>(
      `/api/v1/buildings/${buildingId}/equipment/${equipmentId}/commands`,
      {
        method: 'POST',
        body: JSON.stringify(command),
      }
    );
  }

  /**
   * Get command status
   */
  async getCommandStatus(commandId: string): Promise<types.CommandResponse> {
    return this.request<types.CommandResponse>(`/api/v1/commands/${commandId}`);
  }

  // ==========================================================================
  // Analytics Operations
  // ==========================================================================

  /**
   * Request analytics calculation
   */
  async requestAnalytics(
    buildingId: string,
    analysisType: string,
    parameters: Record<string, any>
  ): Promise<types.AnalyticsResult> {
    return this.request<types.AnalyticsResult>(
      `/api/v1/buildings/${buildingId}/analytics`,
      {
        method: 'POST',
        body: JSON.stringify({
          analysis_type: analysisType,
          parameters,
        }),
      }
    );
  }

  /**
   * Get analytics result
   */
  async getAnalyticsResult(
    buildingId: string,
    analysisId: string
  ): Promise<types.AnalyticsResult> {
    return this.request<types.AnalyticsResult>(
      `/api/v1/buildings/${buildingId}/analytics/${analysisId}`
    );
  }

  // ==========================================================================
  // Real-Time Data Operations
  // ==========================================================================

  /**
   * Connect to real-time data stream (WebSocket)
   */
  connectRealtime(
    buildingId: string,
    onMessage: (data: any) => void,
    onError?: (error: Error) => void
  ): WebSocket {
    const wsUrl = this.baseUrl.replace(/^http/, 'ws');
    const ws = new WebSocket(`${wsUrl}/api/v1/buildings/${buildingId}/realtime`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        if (onError) onError(error as Error);
      }
    };

    ws.onerror = (event) => {
      if (onError) onError(new Error('WebSocket error'));
    };

    return ws;
  }

  /**
   * Subscribe to data streams via WebSocket
   */
  subscribeToStreams(
    ws: WebSocket,
    streams: Array<{
      type: string;
      meter_id?: string;
      equipment_id?: string;
      zone?: string;
      sample_rate?: string;
    }>
  ): void {
    ws.send(
      JSON.stringify({
        action: 'subscribe',
        streams,
      })
    );
  }

  /**
   * Unsubscribe from data streams
   */
  unsubscribeFromStreams(ws: WebSocket, streamIds: string[]): void {
    ws.send(
      JSON.stringify({
        action: 'unsubscribe',
        stream_ids: streamIds,
      })
    );
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Validate data against JSON schema (basic validation)
 */
export function validateEnergyConsumption(
  data: types.EnergyConsumption
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.measurement_id) errors.push('measurement_id is required');
  if (!data.timestamp_start) errors.push('timestamp_start is required');
  if (!data.timestamp_end) errors.push('timestamp_end is required');
  if (!data.location?.building_id) errors.push('location.building_id is required');
  if (data.energy?.consumption_kwh === undefined)
    errors.push('energy.consumption_kwh is required');

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Calculate Energy Use Intensity (EUI)
 */
export function calculateEUI(energyKwh: number, areaSqm: number, days: number = 365): number {
  return (energyKwh / areaSqm / days) * 365;
}

/**
 * Generate UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ============================================================================
// Export
// ============================================================================

export default WIABEMSClient;
