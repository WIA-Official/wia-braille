/**
 * WIA Fire Safety System Standard - TypeScript SDK
 * @version 1.0.0
 * @license MIT
 */

import * as Types from './types';
export * from './types';

export interface FireSafetyClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  debug?: boolean;
}

export class FireSafetyClient {
  private config: FireSafetyClientConfig;
  private wsConnection?: WebSocket;

  constructor(config: FireSafetyClientConfig) {
    this.config = { timeout: 30000, debug: false, ...config };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<Types.APIResponse<T>> {
    const url = this.config.baseUrl + endpoint;
    const headers: HeadersInit = { 'Content-Type': 'application/json', ...options.headers };
    if (this.config.apiKey) headers['Authorization'] = 'Bearer ' + this.config.apiKey;
    
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      return { success: false, error: { code: response.status.toString(), message: response.statusText }, timestamp: new Date().toISOString() };
    }
    return { success: true, data: await response.json(), timestamp: new Date().toISOString() };
  }

  async getDevices(filter?: Types.QueryFilter): Promise<Types.APIResponse<Types.SensorData[]>> {
    return this.request<Types.SensorData[]>('/api/v1/devices?' + new URLSearchParams(filter as any));
  }

  async getDevice(deviceId: Types.UUID): Promise<Types.APIResponse<Types.SensorData>> {
    return this.request<Types.SensorData>('/api/v1/devices/' + deviceId);
  }

  async updateDevice(deviceId: Types.UUID, updates: Partial<Types.SensorData>): Promise<Types.APIResponse<Types.SensorData>> {
    return this.request<Types.SensorData>('/api/v1/devices/' + deviceId, { method: 'PUT', body: JSON.stringify(updates) });
  }

  async testDevice(deviceId: Types.UUID, testType: Types.TestType): Promise<Types.APIResponse<Types.TestResult>> {
    return this.request<Types.TestResult>('/api/v1/devices/' + deviceId + '/test', { method: 'POST', body: JSON.stringify({ testType }) });
  }

  async deleteDevice(deviceId: Types.UUID): Promise<Types.APIResponse<void>> {
    return this.request<void>('/api/v1/devices/' + deviceId, { method: 'DELETE' });
  }

  async getAlarms(filter?: Types.QueryFilter): Promise<Types.APIResponse<Types.AlarmEvent[]>> {
    return this.request<Types.AlarmEvent[]>('/api/v1/alarms?' + new URLSearchParams(filter as any));
  }

  async getAlarm(alarmId: Types.UUID): Promise<Types.APIResponse<Types.AlarmEvent>> {
    return this.request<Types.AlarmEvent>('/api/v1/alarms/' + alarmId);
  }

  async acknowledgeAlarm(alarmId: Types.UUID, comment?: string): Promise<Types.APIResponse<Types.AlarmEvent>> {
    return this.request<Types.AlarmEvent>('/api/v1/alarms/' + alarmId + '/acknowledge', { method: 'POST', body: JSON.stringify({ comment }) });
  }

  async silenceAlarm(alarmId: Types.UUID): Promise<Types.APIResponse<void>> {
    return this.request<void>('/api/v1/alarms/' + alarmId + '/silence', { method: 'POST' });
  }

  async clearAlarm(alarmId: Types.UUID): Promise<Types.APIResponse<void>> {
    return this.request<void>('/api/v1/alarms/' + alarmId, { method: 'DELETE' });
  }

  async getSystemStatus(): Promise<Types.APIResponse<Types.ControlPanelStatus>> {
    return this.request<Types.ControlPanelStatus>('/api/v1/status');
  }

  async getPanelStatuses(): Promise<Types.APIResponse<Types.ControlPanelStatus[]>> {
    return this.request<Types.ControlPanelStatus[]>('/api/v1/status/panels');
  }

  connectEventStream(onEvent: (event: Types.WebSocketEvent) => void, onError?: (error: Error) => void): void {
    const wsUrl = this.config.baseUrl.replace(/^http/, 'ws');
    this.wsConnection = new WebSocket(wsUrl + '/api/v1/events');
    this.wsConnection.onmessage = (message) => {
      try { onEvent(JSON.parse(message.data)); } catch (error) { if (onError) onError(error as Error); }
    };
    this.wsConnection.onerror = () => { if (onError) onError(new Error('WebSocket error')); };
  }

  disconnectEventStream(): void {
    if (this.wsConnection) { this.wsConnection.close(); this.wsConnection = undefined; }
  }

  async getConfiguration(): Promise<Types.APIResponse<Types.SystemConfiguration>> {
    return this.request<Types.SystemConfiguration>('/api/v1/config');
  }

  async updateConfiguration(updates: Partial<Types.SystemConfiguration>): Promise<Types.APIResponse<Types.SystemConfiguration>> {
    return this.request<Types.SystemConfiguration>('/api/v1/config', { method: 'PUT', body: JSON.stringify(updates) });
  }
}

export function generateUUID(): Types.UUID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getCurrentTimestamp(): Types.Timestamp {
  return new Date().toISOString();
}

export default FireSafetyClient;
