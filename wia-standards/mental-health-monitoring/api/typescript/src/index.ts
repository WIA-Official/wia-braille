/**
 * WIA-MED-023: Mental Health Monitoring Standard - TypeScript SDK
 *
 * 弘益人間 (홍익인간) - Benefit All Humanity
 *
 * @version 1.0.0
 * @license MIT
 */

import EventEmitter from 'eventemitter3';
import {
  WIAConfig,
  APIResponse,
  PaginatedResponse,
  MentalHealthPatient,
  MoodEntry,
  Assessment,
  MentalHealthAlert,
  TherapySession,
  MoodLevel,
  AssessmentType,
  AlertSeverity,
} from './types';

export * from './types';

// ============================================================================
// SDK Configuration
// ============================================================================

export interface WIAMentalHealthConfig extends WIAConfig {
  providerId?: string;
}

// ============================================================================
// Main SDK Client
// ============================================================================

export class WIAMentalHealthClient {
  private config: Required<WIAMentalHealthConfig>;
  private eventEmitter = new EventEmitter();

  constructor(config: WIAMentalHealthConfig) {
    this.config = {
      endpoint: 'https://api.wia-standards.org/v1/mental-health',
      timeout: 30000,
      debug: false,
      providerId: '',
      ...config,
    };

    if (!this.config.apiKey) {
      throw new Error('API key is required');
    }
  }

  // ==========================================================================
  // Patient Operations
  // ==========================================================================

  async getPatient(patientId: string): Promise<APIResponse<MentalHealthPatient>> {
    return this.makeRequest('GET', `/patients/${patientId}`);
  }

  async listPatients(filters?: {
    riskLevel?: AlertSeverity;
    providerId?: string;
  }): Promise<PaginatedResponse<MentalHealthPatient>> {
    const params = new URLSearchParams(filters as Record<string, string>);
    return this.makeRequest('GET', `/patients?${params}`);
  }

  async updatePatient(patientId: string, updates: Partial<MentalHealthPatient>): Promise<APIResponse<MentalHealthPatient>> {
    return this.makeRequest('PATCH', `/patients/${patientId}`, updates);
  }

  // ==========================================================================
  // Mood Tracking Operations
  // ==========================================================================

  async recordMood(entry: Omit<MoodEntry, 'entryId' | 'timestamp'>): Promise<APIResponse<MoodEntry>> {
    return this.makeRequest('POST', '/mood-entries', entry);
  }

  async getMoodEntry(entryId: string): Promise<APIResponse<MoodEntry>> {
    return this.makeRequest('GET', `/mood-entries/${entryId}`);
  }

  async getMoodHistory(patientId: string, filters?: {
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<PaginatedResponse<MoodEntry>> {
    const params = new URLSearchParams({ patientId, ...filters as Record<string, string> });
    return this.makeRequest('GET', `/mood-entries?${params}`);
  }

  async getMoodTrends(patientId: string, period: 'week' | 'month' | 'year'): Promise<APIResponse<{
    averageMood: number;
    trend: 'improving' | 'stable' | 'declining';
    peakDays: string[];
    lowDays: string[];
  }>> {
    return this.makeRequest('GET', `/patients/${patientId}/mood-trends?period=${period}`);
  }

  // ==========================================================================
  // Assessment Operations
  // ==========================================================================

  async startAssessment(patientId: string, type: AssessmentType): Promise<APIResponse<{
    assessmentId: string;
    questions: Array<{ questionId: string; question: string; maxValue: number }>;
  }>> {
    return this.makeRequest('POST', '/assessments/start', { patientId, type });
  }

  async submitAssessmentResponse(assessmentId: string, responses: Array<{
    questionId: string;
    answer: number;
  }>): Promise<APIResponse<Assessment>> {
    return this.makeRequest('POST', `/assessments/${assessmentId}/submit`, { responses });
  }

  async getAssessment(assessmentId: string): Promise<APIResponse<Assessment>> {
    return this.makeRequest('GET', `/assessments/${assessmentId}`);
  }

  async getAssessmentHistory(patientId: string, type?: AssessmentType): Promise<PaginatedResponse<Assessment>> {
    const params = type ? `?type=${type}` : '';
    return this.makeRequest('GET', `/patients/${patientId}/assessments${params}`);
  }

  // ==========================================================================
  // Alert Operations
  // ==========================================================================

  async getAlerts(patientId: string): Promise<PaginatedResponse<MentalHealthAlert>> {
    return this.makeRequest('GET', `/patients/${patientId}/alerts`);
  }

  async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<APIResponse<MentalHealthAlert>> {
    return this.makeRequest('POST', `/alerts/${alertId}/acknowledge`, { acknowledgedBy });
  }

  async escalateAlert(alertId: string, reason: string): Promise<APIResponse<MentalHealthAlert>> {
    return this.makeRequest('POST', `/alerts/${alertId}/escalate`, { reason });
  }

  // ==========================================================================
  // Session Operations
  // ==========================================================================

  async scheduleSession(session: Omit<TherapySession, 'sessionId'>): Promise<APIResponse<TherapySession>> {
    return this.makeRequest('POST', '/sessions', session);
  }

  async getSession(sessionId: string): Promise<APIResponse<TherapySession>> {
    return this.makeRequest('GET', `/sessions/${sessionId}`);
  }

  async listSessions(patientId: string): Promise<PaginatedResponse<TherapySession>> {
    return this.makeRequest('GET', `/patients/${patientId}/sessions`);
  }

  async completeSession(sessionId: string, notes: string): Promise<APIResponse<TherapySession>> {
    return this.makeRequest('POST', `/sessions/${sessionId}/complete`, { notes });
  }

  // ==========================================================================
  // Event Handling
  // ==========================================================================

  on(event: 'moodRecorded' | 'assessmentCompleted' | 'crisisAlert' | 'sessionScheduled' | 'error', callback: (...args: unknown[]) => void): void {
    this.eventEmitter.on(event, callback);
  }

  // ==========================================================================
  // Private Methods
  // ==========================================================================

  private async makeRequest<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${this.config.endpoint}${path}`;

    if (this.config.debug) {
      console.log(`[WIA Mental Health] ${method} ${url}`, body);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-WIA-Standard': 'MED-023',
          'X-WIA-Version': '1.0.0',
          ...(this.config.providerId && { 'X-Provider-ID': this.config.providerId }),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      return await response.json();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.eventEmitter.emit('error', { code: 'REQUEST_FAILED', message });
      throw error;
    }
  }
}

export function createClient(config: WIAMentalHealthConfig): WIAMentalHealthClient {
  return new WIAMentalHealthClient(config);
}

export default WIAMentalHealthClient;
