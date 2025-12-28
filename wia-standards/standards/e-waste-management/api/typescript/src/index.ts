/**
 * WIA E-Waste Management Standard - TypeScript SDK
 * Main API Client
 *
 * @version 1.0.0
 * @license MIT
 */

import type {
  Device,
  DeviceWithHistory,
  RegisterDeviceRequest,
  RegisterDeviceResponse,
  CreateCollectionRequest,
  CreateCollectionResponse,
  ProcessingStageRequest,
  ProcessingStageResponse,
  MaterialRecoveryRequest,
  MaterialRecoveryResponse,
  OAuthTokenRequest,
  OAuthTokenResponse,
  RecoveryReport,
  APIError,
} from './types';

export * from './types';

export interface WIAEWasteClientConfig {
  baseURL?: string;
  clientId: string;
  clientSecret: string;
  timeout?: number;
}

export class WIAEWasteClient {
  private baseURL: string;
  private clientId: string;
  private clientSecret: string;
  private timeout: number;
  private accessToken?: string;
  private tokenExpiry?: number;

  constructor(config: WIAEWasteClientConfig) {
    this.baseURL = config.baseURL || 'https://api.wia-ewaste.org/v1';
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.timeout = config.timeout || 30000;
  }

  /**
   * Authenticate with OAuth 2.0 client credentials flow
   */
  async authenticate(scope: string = 'devices:read devices:write'): Promise<void> {
    const request: OAuthTokenRequest = {
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      scope,
    };

    const response = await this.request<OAuthTokenResponse>('POST', '/oauth/token', request, false);

    this.accessToken = response.access_token;
    this.tokenExpiry = Date.now() + (response.expires_in * 1000);
  }

  /**
   * Ensure valid access token
   */
  private async ensureAuthenticated(): Promise<void> {
    if (!this.accessToken || !this.tokenExpiry || Date.now() >= this.tokenExpiry) {
      await this.authenticate();
    }
  }

  /**
   * Generic HTTP request method
   */
  private async request<T>(
    method: string,
    path: string,
    body?: any,
    requireAuth: boolean = true
  ): Promise<T> {
    if (requireAuth) {
      await this.ensureAuthenticated();
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.accessToken && requireAuth) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const url = `${this.baseURL}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: APIError = await response.json();
        throw new Error(`API Error: ${error.error} - ${error.message}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Device Management Methods

  /**
   * Register a new device
   */
  async registerDevice(device: Device): Promise<RegisterDeviceResponse> {
    const request: RegisterDeviceRequest = { device };
    return await this.request<RegisterDeviceResponse>('POST', '/devices', request);
  }

  /**
   * Get device information by ID
   */
  async getDevice(deviceId: string): Promise<DeviceWithHistory> {
    return await this.request<DeviceWithHistory>('GET', `/devices/${deviceId}`);
  }

  /**
   * Query devices by criteria
   */
  async queryDevices(params: {
    manufacturer?: string;
    model?: string;
    weee_category?: string;
    limit?: number;
    offset?: number;
  }): Promise<Device[]> {
    const queryString = new URLSearchParams(params as any).toString();
    return await this.request<Device[]>('GET', `/devices?${queryString}`);
  }

  /**
   * Update device status
   */
  async updateDeviceStatus(
    deviceId: string,
    status: string,
    timestamp?: string
  ): Promise<DeviceWithHistory> {
    const body = {
      status,
      timestamp: timestamp || new Date().toISOString(),
    };
    return await this.request<DeviceWithHistory>('PATCH', `/devices/${deviceId}/status`, body);
  }

  // Collection Methods

  /**
   * Create a new collection event
   */
  async createCollection(collection: CreateCollectionRequest): Promise<CreateCollectionResponse> {
    return await this.request<CreateCollectionResponse>('POST', '/collections', collection);
  }

  /**
   * Get collection details
   */
  async getCollection(collectionId: string): Promise<any> {
    return await this.request('GET', `/collections/${collectionId}`);
  }

  // Processing Methods

  /**
   * Document a processing stage
   */
  async createProcessingStage(stage: ProcessingStageRequest): Promise<ProcessingStageResponse> {
    return await this.request<ProcessingStageResponse>('POST', '/processing/stages', stage);
  }

  /**
   * Report material recovery
   */
  async reportMaterialRecovery(recovery: MaterialRecoveryRequest): Promise<MaterialRecoveryResponse> {
    return await this.request<MaterialRecoveryResponse>('POST', '/recovery/materials', recovery);
  }

  /**
   * Get recovery report
   */
  async getRecoveryReport(reportId: string): Promise<RecoveryReport> {
    return await this.request<RecoveryReport>('GET', `/recovery/reports/${reportId}`);
  }

  // Compliance Methods

  /**
   * Generate compliance report
   */
  async generateComplianceReport(params: {
    type: 'epr' | 'basel' | 'weee';
    jurisdiction?: string;
    period?: string;
    format?: 'json' | 'xml' | 'pdf';
  }): Promise<any> {
    const queryString = new URLSearchParams(params as any).toString();
    return await this.request('GET', `/compliance/reports/${params.type}?${queryString}`);
  }

  /**
   * Get recycling certificate for device
   */
  async getRecyclingCertificate(deviceId: string): Promise<Blob> {
    await this.ensureAuthenticated();

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.accessToken}`,
    };

    const response = await fetch(`${this.baseURL}/compliance/certificates/${deviceId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch certificate: ${response.statusText}`);
    }

    return await response.blob();
  }
}

// Helper functions

/**
 * Validate device data against schema
 */
export function validateDevice(device: Device): boolean {
  // Basic validation
  if (!device.device_id || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(device.device_id)) {
    throw new Error('Invalid device_id: must be a valid UUID v4');
  }

  if (!['WEEE-1', 'WEEE-2', 'WEEE-3', 'WEEE-4', 'WEEE-5', 'WEEE-6'].includes(device.weee_category)) {
    throw new Error('Invalid weee_category: must be WEEE-1 through WEEE-6');
  }

  if (device.physical_properties.weight_kg <= 0) {
    throw new Error('Invalid weight_kg: must be positive number');
  }

  return true;
}

/**
 * Generate device QR code URL
 */
export function generateQRCodeURL(deviceId: string, baseURL: string = 'https://ewaste.wia.org'): string {
  return `${baseURL}/qr/${deviceId.substring(0, 8)}`;
}

/**
 * Calculate material recovery value
 */
export function calculateRecoveryValue(materials: Array<{ material: string; weight_g: number }>): number {
  const prices: Record<string, number> = {
    'Gold': 60.0, // USD per gram
    'Silver': 0.75,
    'Copper': 0.009,
    'Aluminum': 0.0025,
  };

  return materials.reduce((total, { material, weight_g }) => {
    const price = prices[material] || 0;
    return total + (weight_g * price);
  }, 0);
}

export default WIAEWasteClient;
