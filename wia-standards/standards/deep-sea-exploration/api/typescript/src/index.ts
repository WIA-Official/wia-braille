/**
 * WIA Deep Sea Exploration Standard - TypeScript SDK
 * Version: 1.0.0
 * Philosophy: 弘익人間 (Benefit All Humanity)
 *
 * This SDK provides a TypeScript client for interacting with WIA Deep Sea Exploration
 * compliant systems, including vehicle control, telemetry streaming, mission management,
 * and data retrieval.
 *
 * @example
 * ```typescript
 * import { WIADeepSeaClient } from '@wia/deep-sea-exploration';
 *
 * const client = new WIADeepSeaClient({
 *   baseUrl: 'https://api.wia-dse.org/v1',
 *   apiKey: 'your-api-key'
 * });
 *
 * const vehicles = await client.vehicles.list();
 * console.log(vehicles);
 * ```
 */

import type {
  WIAClientConfig,
  VehicleListResponse,
  VehicleSummary,
  VehicleTelemetry,
  VehicleCommand,
  CommandResponse,
  Mission,
  OceanographicData,
  BathymetricData,
  SampleMetadata,
  WIAError,
  TelemetryStreamConfig,
} from './types';

// ============================================================================
// Main Client Class
// ============================================================================

export class WIADeepSeaClient {
  private config: Required<WIAClientConfig>;

  constructor(config: WIAClientConfig) {
    this.config = {
      baseUrl: config.baseUrl,
      apiKey: config.apiKey || '',
      bearerToken: config.bearerToken || '',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      headers: config.headers || {},
    };

    // Initialize sub-clients
    this.vehicles = new VehicleClient(this.config);
    this.missions = new MissionClient(this.config);
    this.telemetry = new TelemetryClient(this.config);
    this.samples = new SampleClient(this.config);
    this.data = new DataClient(this.config);
  }

  public readonly vehicles: VehicleClient;
  public readonly missions: MissionClient;
  public readonly telemetry: TelemetryClient;
  public readonly samples: SampleClient;
  public readonly data: DataClient;
}

// ============================================================================
// HTTP Client Helper
// ============================================================================

class HTTPClient {
  constructor(private config: Required<WIAClientConfig>) {}

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-WIA-Version': '1.0',
      ...this.config.headers,
    };

    if (this.config.bearerToken) {
      headers['Authorization'] = `Bearer ${this.config.bearerToken}`;
    } else if (this.config.apiKey) {
      headers['X-API-Key'] = this.config.apiKey;
    }

    return headers;
  }

  async request<T>(
    method: string,
    path: string,
    body?: unknown,
    query?: Record<string, string | number>
  ): Promise<T> {
    let url = `${this.config.baseUrl}${path}`;

    if (query) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        params.append(key, String(value));
      }
      url += `?${params.toString()}`;
    }

    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error: WIAError = await response.json();
          throw new WIAAPIError(error);
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;
        if (attempt < this.config.retries) {
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async get<T>(path: string, query?: Record<string, string | number>): Promise<T> {
    return this.request<T>('GET', path, undefined, query);
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}

// ============================================================================
// Custom Error Class
// ============================================================================

export class WIAAPIError extends Error {
  public code: string;
  public details?: Record<string, unknown>;
  public timestamp: string;
  public requestId: string;
  public documentation?: string;

  constructor(error: WIAError) {
    super(error.error.message);
    this.name = 'WIAAPIError';
    this.code = error.error.code;
    this.details = error.error.details;
    this.timestamp = error.error.timestamp;
    this.requestId = error.error.requestId;
    this.documentation = error.error.documentation;
  }
}

// ============================================================================
// Vehicle Client
// ============================================================================

export class VehicleClient {
  private http: HTTPClient;

  constructor(config: Required<WIAClientConfig>) {
    this.http = new HTTPClient(config);
  }

  /**
   * List all vehicles accessible to the authenticated user
   */
  async list(options?: {
    status?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<VehicleListResponse> {
    return this.http.get<VehicleListResponse>('/vehicles', options as any);
  }

  /**
   * Get detailed status for a specific vehicle
   */
  async get(vehicleId: string): Promise<VehicleSummary> {
    return this.http.get<VehicleSummary>(`/vehicles/${vehicleId}`);
  }

  /**
   * Send a command to a vehicle
   */
  async sendCommand(vehicleId: string, command: VehicleCommand): Promise<CommandResponse> {
    return this.http.post<CommandResponse>(`/vehicles/${vehicleId}/commands`, command);
  }

  /**
   * Get the status of a previously issued command
   */
  async getCommandStatus(vehicleId: string, commandId: string): Promise<CommandResponse> {
    return this.http.get<CommandResponse>(`/vehicles/${vehicleId}/commands/${commandId}`);
  }

  /**
   * Navigate vehicle to specific coordinates
   */
  async navigateTo(
    vehicleId: string,
    waypoint: { latitude: number; longitude: number; depth: number; altitude?: number },
    options?: { speed?: number; obstacleAvoidance?: boolean }
  ): Promise<CommandResponse> {
    return this.sendCommand(vehicleId, {
      command: 'NAVIGATE_TO_WAYPOINT',
      parameters: {
        waypoint,
        speed: options?.speed || 0.5,
        speedUnit: 'm/s',
        obstacleAvoidance: options?.obstacleAvoidance !== false,
      },
      priority: 'NORMAL',
      acknowledgementRequired: true,
    });
  }

  /**
   * Initiate emergency surface procedure
   */
  async emergencySurface(vehicleId: string): Promise<CommandResponse> {
    return this.sendCommand(vehicleId, {
      command: 'EMERGENCY_ASCENT',
      parameters: {},
      priority: 'CRITICAL',
      acknowledgementRequired: true,
    });
  }
}

// ============================================================================
// Mission Client
// ============================================================================

export class MissionClient {
  private http: HTTPClient;

  constructor(config: Required<WIAClientConfig>) {
    this.http = new HTTPClient(config);
  }

  /**
   * Create a new mission
   */
  async create(mission: Omit<Mission, 'missionId' | 'status'>): Promise<{ missionId: string; status: string; createdAt: string; missionUrl: string }> {
    return this.http.post('/missions', mission);
  }

  /**
   * Get mission details
   */
  async get(missionId: string): Promise<Mission & { timeline: any; progress: any; data: any }> {
    return this.http.get(`/missions/${missionId}`);
  }

  /**
   * List all missions
   */
  async list(options?: {
    status?: string;
    vehicleId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Mission[]; pagination: any }> {
    return this.http.get('/missions', options as any);
  }

  /**
   * Update mission status
   */
  async updateStatus(missionId: string, status: 'IN_PROGRESS' | 'COMPLETED' | 'ABORTED'): Promise<Mission> {
    return this.http.put(`/missions/${missionId}/status`, { status });
  }
}

// ============================================================================
// Telemetry Client
// ============================================================================

export class TelemetryClient {
  private http: HTTPClient;
  private config: Required<WIAClientConfig>;

  constructor(config: Required<WIAClientConfig>) {
    this.http = new HTTPClient(config);
    this.config = config;
  }

  /**
   * Retrieve historical telemetry data
   */
  async getHistory(
    vehicleId: string,
    options: {
      startTime: string;
      endTime: string;
      parameters?: string[];
      interval?: number;
    }
  ): Promise<{
    vehicleId: string;
    timeRange: { start: string; end: string };
    interval: number;
    data: any[];
    downloadUrl?: string;
  }> {
    return this.http.get('/telemetry/history', {
      vehicleId,
      ...options,
      parameters: options.parameters?.join(','),
    } as any);
  }

  /**
   * Stream real-time telemetry via WebSocket
   */
  stream(config: TelemetryStreamConfig): TelemetryStream {
    return new TelemetryStream(this.config, config);
  }
}

// ============================================================================
// Telemetry Stream (WebSocket)
// ============================================================================

export class TelemetryStream {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  constructor(
    private clientConfig: Required<WIAClientConfig>,
    private config: TelemetryStreamConfig
  ) {}

  connect(): void {
    const wsUrl = this.clientConfig.baseUrl.replace(/^http/, 'ws');
    const params = new URLSearchParams({
      vehicleId: this.config.vehicleId,
      dataRate: String(this.config.dataRate || 10) + 'Hz',
    });

    if (this.config.parameters) {
      params.append('parameters', this.config.parameters.join(','));
    }

    this.ws = new WebSocket(`${wsUrl}/telemetry/stream?${params.toString()}`);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.emit('data', data);
    };

    this.ws.onerror = (error) => {
      this.emit('error', error);
    };

    this.ws.onclose = () => {
      this.emit('close', {});
      if (this.config.reconnect) {
        setTimeout(() => this.connect(), 5000);
      }
    };

    this.ws.onopen = () => {
      this.emit('open', {});
    };
  }

  on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: (data: any) => void): void {
    this.listeners.get(event)?.delete(callback);
  }

  private emit(event: string, data: any): void {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// ============================================================================
// Sample Client
// ============================================================================

export class SampleClient {
  private http: HTTPClient;

  constructor(config: Required<WIAClientConfig>) {
    this.http = new HTTPClient(config);
  }

  /**
   * Register a new sample
   */
  async register(sample: SampleMetadata['payload']): Promise<{
    sampleId: string;
    registrationTimestamp: string;
    qrCode: string;
    trackingUrl: string;
  }> {
    return this.http.post('/samples', sample);
  }

  /**
   * Get sample details
   */
  async get(sampleId: string): Promise<SampleMetadata> {
    return this.http.get(`/samples/${sampleId}`);
  }

  /**
   * List samples for a mission
   */
  async listByMission(missionId: string): Promise<{ data: SampleMetadata[] }> {
    return this.http.get('/samples', { missionId } as any);
  }
}

// ============================================================================
// Data Client
// ============================================================================

export class DataClient {
  private http: HTTPClient;

  constructor(config: Required<WIAClientConfig>) {
    this.http = new HTTPClient(config);
  }

  /**
   * Submit oceanographic data
   */
  async submitOceanographic(data: OceanographicData): Promise<{ dataId: string; status: string }> {
    return this.http.post('/data/oceanographic', data);
  }

  /**
   * Submit bathymetric data
   */
  async submitBathymetric(data: BathymetricData): Promise<{ dataId: string; status: string }> {
    return this.http.post('/data/bathymetric', data);
  }

  /**
   * Query oceanographic data
   */
  async queryOceanographic(query: {
    startTime: string;
    endTime: string;
    boundingBox?: any;
    parameters?: string[];
  }): Promise<{ data: OceanographicData[] }> {
    return this.http.get('/data/oceanographic', query as any);
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Calculate checksum for a message (SHA-256)
 */
export async function calculateChecksum(data: any): Promise<string> {
  const message = JSON.stringify(data);
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `SHA256:${hashHex}`;
}

/**
 * Validate oceanographic data ranges
 */
export function validateOceanographicData(data: OceanographicData['payload']): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Depth validation
  if (data.location.depth < 0 || data.location.depth > 11000) {
    errors.push(`Depth ${data.location.depth}m is out of range (0-11000m)`);
  }

  // Temperature validation
  if (data.environment.temperature.value < -2 || data.environment.temperature.value > 400) {
    errors.push(`Temperature ${data.environment.temperature.value}°C is out of range (-2 to 400°C)`);
  }

  // Pressure validation
  if (data.environment.pressure.value < 0 || data.environment.pressure.value > 1100) {
    errors.push(`Pressure ${data.environment.pressure.value} bar is out of range (0-1100 bar)`);
  }

  // Salinity validation
  if (data.environment.salinity.value < 0 || data.environment.salinity.value > 50) {
    errors.push(`Salinity ${data.environment.salinity.value} PSU is out of range (0-50 PSU)`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// Exports
// ============================================================================

export * from './types';
export default WIADeepSeaClient;
