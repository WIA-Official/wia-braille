/**
 * WIA 3D Printing Construction Standard - TypeScript SDK
 * Version 1.0.0
 *
 * 弘益人間 (Benefit All Humanity)
 */

import axios, { AxiosInstance } from 'axios';
import WebSocket from 'ws';
import Ajv from 'ajv';

export * from './types';
import type {
  APIConfig,
  WIAProject,
  ProjectResponse,
  JobRequest,
  JobResponse,
  ValidationResult,
  WebSocketConfig,
  WebSocketMessage,
  PaginatedResponse,
} from './types';

// ============================================================================
// WIA Client
// ============================================================================

export class WIAClient {
  private axios: AxiosInstance;
  private validator: Ajv;

  constructor(config: APIConfig) {
    this.axios = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
      },
    });

    this.validator = new Ajv({ allErrors: true });
  }

  // ========================================================================
  // Project Management
  // ========================================================================

  /**
   * Create a new 3D printing construction project
   */
  async createProject(project: WIAProject): Promise<ProjectResponse> {
    const response = await this.axios.post<ProjectResponse>('/projects', project);
    return response.data;
  }

  /**
   * Get project by ID
   */
  async getProject(id: string): Promise<WIAProject> {
    const response = await this.axios.get<WIAProject>(`/projects/${id}`);
    return response.data;
  }

  /**
   * List all projects
   */
  async listProjects(params?: {
    status?: string;
    type?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<ProjectResponse>> {
    const response = await this.axios.get<PaginatedResponse<ProjectResponse>>('/projects', {
      params,
    });
    return response.data;
  }

  /**
   * Update existing project
   */
  async updateProject(id: string, updates: Partial<WIAProject>): Promise<ProjectResponse> {
    const response = await this.axios.put<ProjectResponse>(`/projects/${id}`, updates);
    return response.data;
  }

  /**
   * Delete project
   */
  async deleteProject(id: string): Promise<void> {
    await this.axios.delete(`/projects/${id}`);
  }

  // ========================================================================
  // Job Management
  // ========================================================================

  /**
   * Submit a print job
   */
  async submitJob(job: JobRequest): Promise<JobResponse> {
    const response = await this.axios.post<JobResponse>('/jobs', job);
    return response.data;
  }

  /**
   * Get job status
   */
  async getJobStatus(jobId: string): Promise<JobResponse> {
    const response = await this.axios.get<JobResponse>(`/jobs/${jobId}/status`);
    return response.data;
  }

  /**
   * Pause a running job
   */
  async pauseJob(jobId: string): Promise<void> {
    await this.axios.post(`/jobs/${jobId}/pause`);
  }

  /**
   * Resume a paused job
   */
  async resumeJob(jobId: string): Promise<void> {
    await this.axios.post(`/jobs/${jobId}/resume`);
  }

  /**
   * Cancel a job
   */
  async cancelJob(jobId: string): Promise<void> {
    await this.axios.post(`/jobs/${jobId}/cancel`);
  }

  // ========================================================================
  // Material Management
  // ========================================================================

  /**
   * Get current material inventory
   */
  async getMaterialInventory(): Promise<any> {
    const response = await this.axios.get('/materials/inventory');
    return response.data;
  }

  /**
   * Record material consumption
   */
  async recordMaterialConsumption(data: {
    projectId: string;
    materialId: string;
    quantity: number;
    unit: string;
    jobId?: string;
  }): Promise<void> {
    await this.axios.post('/materials/consumption', data);
  }

  // ========================================================================
  // Quality Management
  // ========================================================================

  /**
   * Submit inspection results
   */
  async submitInspection(inspection: {
    jobId: string;
    layer: number;
    inspector: string;
    method: string;
    measurements: any;
    overallStatus: string;
  }): Promise<void> {
    await this.axios.post('/quality/inspections', inspection);
  }

  /**
   * Get quality metrics for a job
   */
  async getQualityMetrics(jobId: string): Promise<any> {
    const response = await this.axios.get('/quality/metrics', {
      params: { jobId },
    });
    return response.data;
  }

  // ========================================================================
  // Validation
  // ========================================================================

  /**
   * Validate a project against WIA schema
   */
  validateProject(project: WIAProject): ValidationResult {
    // Simplified validation - in production, load full JSON Schema
    const errors: any[] = [];

    if (!project.standard || project.standard !== 'WIA-3D-PRINTING-CONSTRUCTION') {
      errors.push({
        path: 'standard',
        message: 'Standard must be "WIA-3D-PRINTING-CONSTRUCTION"',
      });
    }

    if (!project.version || !/^\d+\.\d+\.\d+$/.test(project.version)) {
      errors.push({
        path: 'version',
        message: 'Version must follow semantic versioning (x.y.z)',
      });
    }

    if (!project.project || !project.project.id) {
      errors.push({
        path: 'project.id',
        message: 'Project ID is required',
      });
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}

// ============================================================================
// WebSocket Client
// ============================================================================

export class WIAWebSocketClient {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig;
  private sequenceNumber = 0;
  private messageHandlers: Map<string, (message: WebSocketMessage) => void> = new Map();

  constructor(config: WebSocketConfig) {
    this.config = config;
  }

  /**
   * Connect to WebSocket server
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.config.url, this.config.protocols);

      this.ws.on('open', () => {
        console.log('WebSocket connected');
        resolve();
      });

      this.ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      });

      this.ws.on('close', () => {
        console.log('WebSocket closed');
        if (this.config.reconnect) {
          setTimeout(() => this.connect(), this.config.reconnectInterval || 5000);
        }
      });

      this.ws.on('message', (data: WebSocket.Data) => {
        try {
          const message = JSON.parse(data.toString()) as WebSocketMessage;
          this.handleMessage(message);
        } catch (error) {
          console.error('Failed to parse message:', error);
        }
      });
    });
  }

  /**
   * Send a message through WebSocket
   */
  send(type: string, payload: any): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    const message: WebSocketMessage = {
      type: type as any,
      timestamp: new Date().toISOString(),
      sequenceNumber: ++this.sequenceNumber,
      payload,
    };

    this.ws.send(JSON.stringify(message));
  }

  /**
   * Register a message handler
   */
  on(messageType: string, handler: (message: WebSocketMessage) => void): void {
    this.messageHandlers.set(messageType, handler);
  }

  /**
   * Disconnect WebSocket
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    }
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Create a minimal valid WIA project
 */
export function createMinimalProject(name: string): WIAProject {
  return {
    standard: 'WIA-3D-PRINTING-CONSTRUCTION',
    version: '1.0.0',
    project: {
      id: generateUUID(),
      name,
      type: 'residential',
      location: {
        city: 'Example City',
        country: 'USA',
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
      dates: {},
    },
    geometry: {
      format: 'parametric',
      components: [],
      unit: 'mm',
    },
    materials: {
      primary: {
        id: 'WIA-CONCRETE-STD-001',
        name: 'Standard Printable Concrete',
        category: 'concrete',
        properties: {
          printability: {
            flowRate: { min: 500, max: 1500, unit: 'mm³/s' },
            extrusionPressure: { value: 1.2, unit: 'MPa' },
            buildability: { value: 15, unit: 'kPa' },
            openTime: { value: 45, unit: 'minutes' },
          },
          structural: {
            compressiveStrength: { value: 30, unit: 'MPa' },
          },
        },
      },
    },
    printParameters: {
      layerHeight: 20,
      printSpeed: {
        perimeter: 100,
        infill: 150,
        unit: 'mm/s',
      },
      pathWidth: {
        outer: 40,
        inner: 40,
        unit: 'mm',
      },
      flowRate: {
        target: 1000,
        tolerance: 50,
        unit: 'mm³/s',
      },
    },
    quality: {
      dimensional: {
        tolerances: {
          horizontal: { value: 5, unit: 'mm' },
          vertical: { value: 10, unit: 'mm' },
        },
      },
    },
  };
}

// ============================================================================
// Exports
// ============================================================================

export default {
  WIAClient,
  WIAWebSocketClient,
  generateUUID,
  createMinimalProject,
};
