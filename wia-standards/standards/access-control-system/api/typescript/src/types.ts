/**
 * WIA Access Control System - TypeScript SDK
 * Type Definitions
 *
 * @version 1.0.0
 * @license Apache-2.0
 * @author WIA Technical Committee
 *
 * Philosophy: 弘益人間 (Hongik Ingan) - Benefit All Humanity
 */

// ============================================================================
// User Types
// ============================================================================

export type UserStatus = 'active' | 'suspended' | 'terminated';
export type EmploymentType = 'full_time' | 'part_time' | 'contractor' | 'intern' | 'temporary';

export interface UserIdentity {
  given_name: string;
  family_name: string;
  middle_name?: string;
  preferred_name?: string;
  email: string;
  email_verified?: boolean;
  phone?: string;
  phone_verified?: boolean;
}

export interface UserEmployment {
  employee_id?: string;
  department?: string;
  title?: string;
  manager_id?: string;
  start_date?: string;
  end_date?: string;
  employment_type?: EmploymentType;
}

export interface UserMetadata {
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface User {
  user_id: string;
  external_id?: string;
  status: UserStatus;
  identity: UserIdentity;
  employment?: UserEmployment;
  roles: string[];
  attributes?: Record<string, any>;
  metadata?: UserMetadata;
}

export interface CreateUserRequest {
  external_id?: string;
  identity: UserIdentity;
  employment?: UserEmployment;
  roles: string[];
  attributes?: Record<string, any>;
}

export interface UpdateUserRequest {
  status?: UserStatus;
  identity?: Partial<UserIdentity>;
  employment?: Partial<UserEmployment>;
  roles?: string[];
  attributes?: Record<string, any>;
}

// ============================================================================
// Credential Types
// ============================================================================

export type CredentialType =
  | 'magnetic_stripe'
  | 'proximity'
  | 'smart_card'
  | 'mobile'
  | 'biometric'
  | 'pin_code'
  | 'otp'
  | 'certificate';

export type CredentialStatus = 'active' | 'suspended' | 'revoked' | 'expired';

export type FactorType =
  | 'something_you_know'
  | 'something_you_have'
  | 'something_you_are'
  | 'somewhere_you_are';

export type FactorStrength = 'low' | 'medium' | 'high';

export interface AuthFactor {
  factor_type: FactorType;
  method: string;
  strength: FactorStrength;
  pin_hash?: string;
  value?: string;
}

export interface TimeZone {
  days: string[];
  start_time: string;
  end_time: string;
  timezone: string;
}

export interface CredentialRestrictions {
  time_zones?: TimeZone[];
  locations?: string[];
  ip_ranges?: string[];
}

export interface Credential {
  credential_id: string;
  user_id: string;
  credential_type: CredentialType;
  status: CredentialStatus;
  issued_at: string;
  expires_at: string;
  activates_at?: string;
  issuer?: string;
  encoding?: Record<string, any>;
  factors?: AuthFactor[];
  access_profiles?: string[];
  restrictions?: CredentialRestrictions;
  metadata?: UserMetadata;
}

export interface CreateCredentialRequest {
  user_id: string;
  credential_type: CredentialType;
  issued_at?: string;
  expires_at: string;
  encoding?: Record<string, any>;
  factors?: Omit<AuthFactor, 'pin_hash'>[];
  access_profiles?: string[];
  restrictions?: CredentialRestrictions;
}

// ============================================================================
// Authentication Types
// ============================================================================

export interface DeviceInfo {
  device_id: string;
  ip_address?: string;
  user_agent?: string;
}

export interface AuthenticateRequest {
  credential_id: string;
  factors: AuthFactor[];
  device_info?: DeviceInfo;
}

export interface AuthenticateResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  user: User;
  session_id?: string;
  mfa_required: boolean;
}

export interface MFAAuthenticateRequest {
  mfa_token: string;
  method: string;
  code: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

// ============================================================================
// Authorization Types
// ============================================================================

export type AuthorizationDecision = 'permit' | 'deny';

export interface ResourceAttributes {
  [key: string]: any;
}

export interface AuthorizeRequest {
  user_id: string;
  resource: {
    type: string;
    id: string;
    attributes?: ResourceAttributes;
  };
  action: string;
  context?: {
    timestamp?: string;
    ip_address?: string;
    mfa_verified?: boolean;
    [key: string]: any;
  };
}

export interface AuthorizeResponse {
  decision: AuthorizationDecision;
  reason: string;
  matched_policies?: string[];
  valid_until?: string;
  conditions?: Record<string, any>;
  requirements?: Record<string, any>;
  audit_id?: string;
}

// ============================================================================
// Audit Event Types
// ============================================================================

export type EventType =
  | 'access_granted'
  | 'access_denied'
  | 'credential_issued'
  | 'credential_revoked'
  | 'user_created'
  | 'user_modified'
  | 'user_deleted';

export type EventCategory =
  | 'authentication'
  | 'authorization'
  | 'credential_lifecycle'
  | 'user_management'
  | 'system';

export type EventSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface AuditEventActor {
  user_id?: string;
  user_name?: string;
  credential_id?: string;
  credential_type?: CredentialType;
  ip_address?: string;
  device_id?: string;
  session_id?: string;
}

export interface AuditEventTarget {
  resource_type: string;
  resource_id: string;
  resource_name?: string;
  location?: string;
}

export interface AuditEventDecision {
  decision_engine?: string;
  decision_time_ms?: number;
  matched_rules?: string[];
  applied_roles?: string[];
  evaluation_method?: string;
}

export interface AuditEventIntegrity {
  previous_event_hash?: string;
  this_event_hash: string;
  signature?: string;
  chain_sequence?: number;
}

export interface AuditEvent {
  event_id: string;
  event_type: EventType;
  category: EventCategory;
  severity: EventSeverity;
  timestamp: string;
  actor?: AuditEventActor;
  target?: AuditEventTarget;
  action: string;
  result: string;
  decision?: AuditEventDecision;
  context?: Record<string, any>;
  integrity?: AuditEventIntegrity;
  metadata?: Record<string, any>;
}

export interface AuditEventsQuery {
  start_date?: string;
  end_date?: string;
  event_type?: EventType;
  user_id?: string;
  resource_type?: string;
  result?: string;
  page?: number;
  per_page?: number;
}

// ============================================================================
// Pagination Types
// ============================================================================

export interface Pagination {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginatedLinks {
  self: string;
  next?: string;
  previous?: string;
  first?: string;
  last?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
  links: PaginatedLinks;
}

// ============================================================================
// Error Types
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: string;
  field?: string;
  request_id?: string;
  documentation_url?: string;
}

export interface ApiErrorResponse {
  error: ApiError;
}

// ============================================================================
// Client Configuration Types
// ============================================================================

export interface WiaAcsClientConfig {
  apiUrl: string;
  apiKey?: string;
  accessToken?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

// ============================================================================
// Webhook Types
// ============================================================================

export interface WebhookFilters {
  resource_type?: string;
  location?: string;
  [key: string]: any;
}

export interface CreateWebhookRequest {
  url: string;
  events: EventType[];
  secret: string;
  active?: boolean;
  filters?: WebhookFilters;
}

export interface Webhook {
  webhook_id: string;
  url: string;
  events: EventType[];
  secret: string;
  active: boolean;
  filters?: WebhookFilters;
  created_at: string;
  updated_at: string;
}

export interface WebhookDelivery {
  webhook_id: string;
  event: AuditEvent;
}
