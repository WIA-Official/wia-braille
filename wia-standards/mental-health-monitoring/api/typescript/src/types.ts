/**
 * WIA-MED-023: Mental Health Monitoring Standard - TypeScript Types
 *
 * 弘益人間 (홍익인간) - Benefit All Humanity
 *
 * @version 1.0.0
 * @license MIT
 */

// ============================================================================
// Type Aliases
// ============================================================================

export type Timestamp = string;
export type PatientID = string;
export type SessionID = string;

// ============================================================================
// Enums
// ============================================================================

export enum MoodLevel {
  VERY_LOW = 1,
  LOW = 2,
  NEUTRAL = 3,
  GOOD = 4,
  EXCELLENT = 5,
}

export enum AssessmentType {
  PHQ9 = 'PHQ-9',
  GAD7 = 'GAD-7',
  DASS21 = 'DASS-21',
  BDI = 'BDI-II',
  CUSTOM = 'custom',
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRISIS = 'crisis',
}

export enum InterventionType {
  SELF_HELP = 'self_help',
  THERAPIST_CONTACT = 'therapist_contact',
  CRISIS_LINE = 'crisis_line',
  EMERGENCY = 'emergency',
}

// ============================================================================
// Patient Types
// ============================================================================

export interface MentalHealthPatient {
  patientId: PatientID;
  treatmentPlan?: TreatmentPlan;
  careTeam: CareTeamMember[];
  riskLevel: AlertSeverity;
  lastAssessment?: Timestamp;
  lastCheckIn?: Timestamp;
}

export interface CareTeamMember {
  providerId: string;
  name: string;
  role: 'psychiatrist' | 'psychologist' | 'therapist' | 'counselor';
  primaryContact: boolean;
}

export interface TreatmentPlan {
  planId: string;
  diagnosis: string[];
  goals: string[];
  interventions: string[];
  startDate: Timestamp;
  reviewDate: Timestamp;
}

// ============================================================================
// Monitoring Types
// ============================================================================

export interface MoodEntry {
  entryId: string;
  patientId: PatientID;
  timestamp: Timestamp;
  moodLevel: MoodLevel;
  anxiety?: number;
  energy?: number;
  sleep?: SleepData;
  notes?: string;
  triggers?: string[];
  activities?: string[];
}

export interface SleepData {
  durationMinutes: number;
  quality: number;
  disturbances: number;
  bedTime?: Timestamp;
  wakeTime?: Timestamp;
}

export interface Assessment {
  assessmentId: string;
  patientId: PatientID;
  type: AssessmentType;
  score: number;
  maxScore: number;
  severity: AlertSeverity;
  responses: AssessmentResponse[];
  completedAt: Timestamp;
}

export interface AssessmentResponse {
  questionId: string;
  question: string;
  answer: number;
  maxValue: number;
}

// ============================================================================
// Alert Types
// ============================================================================

export interface MentalHealthAlert {
  alertId: string;
  patientId: PatientID;
  severity: AlertSeverity;
  reason: string;
  recommendedIntervention: InterventionType;
  createdAt: Timestamp;
  acknowledged: boolean;
  acknowledgedBy?: string;
}

// ============================================================================
// Session Types
// ============================================================================

export interface TherapySession {
  sessionId: SessionID;
  patientId: PatientID;
  providerId: string;
  scheduledAt: Timestamp;
  duration: number;
  type: 'in_person' | 'video' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
}

// ============================================================================
// API Types
// ============================================================================

export interface WIAConfig {
  apiKey: string;
  endpoint: string;
  timeout?: number;
  debug?: boolean;
}

export interface APIResponse<T = unknown> {
  status: number;
  success: boolean;
  data?: T;
  timestamp: Timestamp;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
}
