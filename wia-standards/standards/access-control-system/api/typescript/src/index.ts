/**
 * WIA Access Control System - TypeScript SDK
 * Main Client Implementation
 *
 * @version 1.0.0
 * @license Apache-2.0
 * @author WIA Technical Committee
 *
 * Philosophy: 弘익人間 (Hongik Ingan) - Benefit All Humanity
 */

import {
  WiaAcsClientConfig,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  Credential,
  CreateCredentialRequest,
  AuthenticateRequest,
  AuthenticateResponse,
  MFAAuthenticateRequest,
  RefreshTokenRequest,
  AuthorizeRequest,
  AuthorizeResponse,
  AuditEvent,
  AuditEventsQuery,
  PaginatedResponse,
  ApiErrorResponse,
  CreateWebhookRequest,
  Webhook,
} from './types';

export * from './types';

/**
 * Main WIA-ACS Client Class
 */
export class WiaAcsClient {
  private config: Required<WiaAcsClientConfig>;
  private headers: Record<string, string>;

  constructor(config: WiaAcsClientConfig) {
    this.config = {
      apiUrl: config.apiUrl.replace(/\/$/, ''), // Remove trailing slash
      apiKey: config.apiKey || '',
      accessToken: config.accessToken || '',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      headers: config.headers || {},
    };

    this.headers = {
      'Content-Type': 'application/json',
      ...this.config.headers,
    };

    if (this.config.apiKey) {
      this.headers['X-API-Key'] = this.config.apiKey;
    }

    if (this.config.accessToken) {
      this.headers['Authorization'] = `Bearer ${this.config.accessToken}`;
    }
  }

  /**
   * Set access token for authenticated requests
   */
  setAccessToken(token: string): void {
    this.config.accessToken = token;
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Make HTTP request with retry logic
   */
  private async request<T>(
    method: string,
    path: string,
    body?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = `${this.config.apiUrl}${path}`;
    const headers = { ...this.headers, ...customHeaders };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.config.retries; attempt++) {
      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: AbortSignal.timeout(this.config.timeout),
        });

        if (!response.ok) {
          const errorData: ApiErrorResponse = await response.json();
          throw new WiaAcsError(
            errorData.error.code,
            errorData.error.message,
            response.status,
            errorData.error
          );
        }

        // No content responses
        if (response.status === 204) {
          return {} as T;
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;

        // Don't retry on 4xx errors (except 429 rate limit)
        if (error instanceof WiaAcsError && error.statusCode < 500 && error.statusCode !== 429) {
          throw error;
        }

        // Wait before retry (exponential backoff)
        if (attempt < this.config.retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError;
  }

  // ============================================================================
  // Authentication Methods
  // ============================================================================

  /**
   * Authenticate a user
   */
  async authenticate(request: AuthenticateRequest): Promise<AuthenticateResponse> {
    return this.request<AuthenticateResponse>('POST', '/v1/authenticate', request);
  }

  /**
   * Complete multi-factor authentication
   */
  async authenticateMFA(request: MFAAuthenticateRequest): Promise<AuthenticateResponse> {
    return this.request<AuthenticateResponse>('POST', '/v1/authenticate/mfa', request);
  }

  /**
   * Refresh access token
   */
  async refreshToken(request: RefreshTokenRequest): Promise<AuthenticateResponse> {
    return this.request<AuthenticateResponse>('POST', '/v1/token/refresh', request);
  }

  // ============================================================================
  // Authorization Methods
  // ============================================================================

  /**
   * Check authorization for an action
   */
  async authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
    return this.request<AuthorizeResponse>('POST', '/v1/authorize', request);
  }

  // ============================================================================
  // User Management Methods
  // ============================================================================

  /**
   * List users with pagination
   */
  async listUsers(query?: {
    status?: string;
    department?: string;
    page?: number;
    per_page?: number;
    sort?: string;
  }): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }

    const path = params.toString() ? `/v1/users?${params}` : '/v1/users';
    const response = await this.request<{ users: User[]; pagination: any; links: any }>(
      'GET',
      path
    );

    return {
      data: response.users,
      pagination: response.pagination,
      links: response.links,
    };
  }

  /**
   * Get a specific user
   */
  async getUser(userId: string): Promise<User> {
    return this.request<User>('GET', `/v1/users/${userId}`);
  }

  /**
   * Create a new user
   */
  async createUser(request: CreateUserRequest): Promise<User> {
    return this.request<User>('POST', '/v1/users', request);
  }

  /**
   * Update a user
   */
  async updateUser(userId: string, request: UpdateUserRequest): Promise<User> {
    return this.request<User>('PATCH', `/v1/users/${userId}`, request);
  }

  /**
   * Delete a user
   */
  async deleteUser(userId: string): Promise<void> {
    await this.request<void>('DELETE', `/v1/users/${userId}`);
  }

  /**
   * Get user's roles
   */
  async getUserRoles(userId: string): Promise<string[]> {
    const response = await this.request<{ roles: string[] }>('GET', `/v1/users/${userId}/roles`);
    return response.roles;
  }

  /**
   * Assign role to user
   */
  async assignUserRole(userId: string, roleId: string): Promise<void> {
    await this.request<void>('POST', `/v1/users/${userId}/roles`, { role_id: roleId });
  }

  /**
   * Remove role from user
   */
  async removeUserRole(userId: string, roleId: string): Promise<void> {
    await this.request<void>('DELETE', `/v1/users/${userId}/roles/${roleId}`);
  }

  // ============================================================================
  // Credential Management Methods
  // ============================================================================

  /**
   * List user's credentials
   */
  async listUserCredentials(userId: string): Promise<Credential[]> {
    const response = await this.request<{ credentials: Credential[] }>(
      'GET',
      `/v1/users/${userId}/credentials`
    );
    return response.credentials;
  }

  /**
   * Get a specific credential
   */
  async getCredential(credentialId: string): Promise<Credential> {
    return this.request<Credential>('GET', `/v1/credentials/${credentialId}`);
  }

  /**
   * Issue a new credential
   */
  async createCredential(request: CreateCredentialRequest): Promise<Credential> {
    return this.request<Credential>('POST', '/v1/credentials', request);
  }

  /**
   * Revoke a credential
   */
  async revokeCredential(
    credentialId: string,
    reason?: string
  ): Promise<void> {
    const params = reason ? `?reason=${encodeURIComponent(reason)}` : '';
    await this.request<void>('DELETE', `/v1/credentials/${credentialId}${params}`);
  }

  // ============================================================================
  // Audit Methods
  // ============================================================================

  /**
   * Query audit events
   */
  async queryAuditEvents(query: AuditEventsQuery): Promise<PaginatedResponse<AuditEvent>> {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });

    const path = `/v1/audit/events?${params}`;
    const response = await this.request<{ events: AuditEvent[]; pagination: any; links: any }>(
      'GET',
      path
    );

    return {
      data: response.events,
      pagination: response.pagination,
      links: response.links,
    };
  }

  // ============================================================================
  // Webhook Methods
  // ============================================================================

  /**
   * Create a webhook
   */
  async createWebhook(request: CreateWebhookRequest): Promise<Webhook> {
    return this.request<Webhook>('POST', '/v1/webhooks', request);
  }

  /**
   * List webhooks
   */
  async listWebhooks(): Promise<Webhook[]> {
    const response = await this.request<{ webhooks: Webhook[] }>('GET', '/v1/webhooks');
    return response.webhooks;
  }

  /**
   * Delete a webhook
   */
  async deleteWebhook(webhookId: string): Promise<void> {
    await this.request<void>('DELETE', `/v1/webhooks/${webhookId}`);
  }
}

/**
 * Custom Error Class for WIA-ACS API Errors
 */
export class WiaAcsError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(code: string, message: string, statusCode: number, details?: any) {
    super(message);
    this.name = 'WiaAcsError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, WiaAcsError);
    }
  }
}

/**
 * Default export
 */
export default WiaAcsClient;
