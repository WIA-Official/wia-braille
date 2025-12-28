/**
 * WIA Grand Challenges SDK
 * 홍익인간 (弘益人間) - Benefit All Humanity
 *
 * 33개 인류 난제 해결을 위한 통합 API SDK
 */

import axios, { AxiosInstance } from 'axios';
import * as Types from './types';

export * from './types';

export interface WIAClientConfig {
  baseUrl: string;
  apiKey: string;
  version?: string;
}

export class WIAClient {
  private client: AxiosInstance;
  private version: string;

  constructor(config: WIAClientConfig) {
    this.version = config.version || 'v1';
    this.client = axios.create({
      baseURL: `${config.baseUrl}/api/${this.version}`,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'X-WIA-SDK': 'typescript/1.0.0',
      },
    });
  }

  // ============================================
  // Life Sciences APIs
  // ============================================

  readonly aging = {
    assess: (data: Partial<Types.AgingProfile>): Promise<Types.WIAResponse<Types.AgingProfile>> =>
      this.client.post('/aging/assess', data).then(r => r.data),

    getBiologicalAge: (patientId: string): Promise<Types.WIAResponse<{ biologicalAge: number; delta: number }>> =>
      this.client.get(`/aging/biological-age/${patientId}`).then(r => r.data),

    getIntervention: (patientId: string): Promise<Types.WIAResponse<{ recommendations: string[] }>> =>
      this.client.get(`/aging/intervention/${patientId}`).then(r => r.data),
  };

  readonly alzheimers = {
    assess: (data: Partial<Types.AlzheimersProfile>): Promise<Types.WIAResponse<Types.AlzheimersProfile>> =>
      this.client.post('/alzheimers/assess', data).then(r => r.data),

    getGlymphaticStatus: (patientId: string): Promise<Types.WIAResponse<{ alpsIndex: number; clearance: number }>> =>
      this.client.get(`/alzheimers/glymphatic/${patientId}`).then(r => r.data),

    getGammaTherapyProtocol: (patientId: string): Promise<Types.WIAResponse<{ protocol: object }>> =>
      this.client.post('/alzheimers/gamma-therapy/protocol', { patientId }).then(r => r.data),
  };

  readonly rareDiseases = {
    diagnose: (data: { vcf?: string; phenotypes?: string[] }): Promise<Types.WIAResponse<Types.RareDiseaseProfile>> =>
      this.client.post('/rare-diseases/diagnose', data).then(r => r.data),

    designTherapy: (patientId: string): Promise<Types.WIAResponse<{ design: object }>> =>
      this.client.post('/rare-diseases/therapy/design', { patientId }).then(r => r.data),

    checkEligibility: (patientId: string): Promise<Types.WIAResponse<{ eligible: boolean; therapyType: string }>> =>
      this.client.get(`/rare-diseases/eligibility/${patientId}`).then(r => r.data),
  };

  // ============================================
  // Mental Health APIs
  // ============================================

  readonly mentalHealth = {
    assess: (data: Partial<Types.MentalHealthProfile>): Promise<Types.WIAResponse<Types.MentalHealthProfile>> =>
      this.client.post('/mental-health/assess', data).then(r => r.data),

    getInflammatoryProfile: (patientId: string): Promise<Types.WIAResponse<{ markers: object }>> =>
      this.client.get(`/mental-health/inflammatory/${patientId}`).then(r => r.data),
  };

  readonly sleep = {
    assess: (data: Partial<Types.SleepProfile>): Promise<Types.WIAResponse<Types.SleepProfile>> =>
      this.client.post('/sleep/assess', data).then(r => r.data),

    getGlymphaticStatus: (patientId: string): Promise<Types.WIAResponse<{ status: object }>> =>
      this.client.get(`/sleep/glymphatic/${patientId}`).then(r => r.data),

    optimizeCircadian: (patientId: string): Promise<Types.WIAResponse<{ plan: object }>> =>
      this.client.post('/sleep/circadian/optimize', { patientId }).then(r => r.data),
  };

  // ============================================
  // Sensory & Mobility APIs
  // ============================================

  readonly hearing = {
    assess: (data: Partial<Types.HearingProfile>): Promise<Types.WIAResponse<Types.HearingProfile>> =>
      this.client.post('/hearing-loss/assess', data).then(r => r.data),

    diagnoseGenetic: (data: { patientId: string }): Promise<Types.WIAResponse<{ diagnosis: object }>> =>
      this.client.post('/hearing-loss/genetic/diagnose', data).then(r => r.data),

    getTherapyEligibility: (patientId: string): Promise<Types.WIAResponse<{ eligibility: object }>> =>
      this.client.post('/hearing-loss/therapy/eligibility', { patientId }).then(r => r.data),
  };

  readonly vision = {
    assess: (data: Partial<Types.VisionProfile>): Promise<Types.WIAResponse<Types.VisionProfile>> =>
      this.client.post('/vision-loss/assess', data).then(r => r.data),

    checkOptogeneticsEligibility: (patientId: string): Promise<Types.WIAResponse<{ eligible: boolean }>> =>
      this.client.post('/vision-loss/optogenetics/eligibility', { patientId }).then(r => r.data),
  };

  readonly spinalCord = {
    assess: (data: Partial<Types.SpinalCordInjuryProfile>): Promise<Types.WIAResponse<Types.SpinalCordInjuryProfile>> =>
      this.client.post('/sci/assess', data).then(r => r.data),

    designTherapy: (patientId: string): Promise<Types.WIAResponse<{ design: object }>> =>
      this.client.post('/sci/therapy/design', { patientId }).then(r => r.data),
  };

  // ============================================
  // Environment APIs
  // ============================================

  readonly water = {
    assess: (data: Partial<Types.WaterProfile>): Promise<Types.WIAResponse<Types.WaterProfile>> =>
      this.client.post('/water-scarcity/assess', data).then(r => r.data),

    recommendSolution: (locationId: string): Promise<Types.WIAResponse<{ solution: object }>> =>
      this.client.post('/water-scarcity/solution/recommend', { locationId }).then(r => r.data),
  };

  readonly foodSecurity = {
    assess: (data: Partial<Types.FoodSecurityProfile>): Promise<Types.WIAResponse<Types.FoodSecurityProfile>> =>
      this.client.post('/food-security/assess', data).then(r => r.data),

    optimizePrecisionAg: (regionId: string): Promise<Types.WIAResponse<{ optimization: object }>> =>
      this.client.post('/food-security/precision-ag/optimize', { regionId }).then(r => r.data),
  };

  readonly biodiversity = {
    assess: (data: Partial<Types.BiodiversityProfile>): Promise<Types.WIAResponse<Types.BiodiversityProfile>> =>
      this.client.post('/biodiversity/assess', data).then(r => r.data),

    planRestoration: (siteId: string): Promise<Types.WIAResponse<{ plan: object }>> =>
      this.client.post('/biodiversity/restoration/plan', { siteId }).then(r => r.data),
  };

  // ============================================
  // Society APIs
  // ============================================

  readonly digitalDivide = {
    assess: (data: Partial<Types.DigitalEquityProfile>): Promise<Types.WIAResponse<Types.DigitalEquityProfile>> =>
      this.client.post('/digital-divide/assess', data).then(r => r.data),

    planInfrastructure: (regionId: string): Promise<Types.WIAResponse<{ plan: object }>> =>
      this.client.post('/digital-divide/infrastructure/plan', { regionId }).then(r => r.data),
  };

  readonly refugee = {
    register: (data: Partial<Types.RefugeeProfile>): Promise<Types.WIAResponse<Types.RefugeeProfile>> =>
      this.client.post('/refugee/register', data).then(r => r.data),

    assessNeeds: (personId: string): Promise<Types.WIAResponse<{ needs: object }>> =>
      this.client.post('/refugee/needs/assess', { personId }).then(r => r.data),

    matchServices: (personId: string): Promise<Types.WIAResponse<{ services: string[] }>> =>
      this.client.post('/refugee/services/match', { personId }).then(r => r.data),
  };

  readonly accessibility = {
    audit: (data: Partial<Types.AccessibilityProfile>): Promise<Types.WIAResponse<Types.AccessibilityProfile>> =>
      this.client.post('/accessibility/audit', data).then(r => r.data),

    checkWcag: (entityId: string): Promise<Types.WIAResponse<{ compliance: object }>> =>
      this.client.post('/accessibility/wcag/check', { entityId }).then(r => r.data),
  };

  readonly grief = {
    assess: (data: Partial<Types.BereavementProfile>): Promise<Types.WIAResponse<Types.BereavementProfile>> =>
      this.client.post('/grief/assess', data).then(r => r.data),

    matchSupport: (personId: string): Promise<Types.WIAResponse<{ support: object }>> =>
      this.client.post('/grief/support/match', { personId }).then(r => r.data),
  };

  readonly trauma = {
    assess: (data: Partial<Types.TraumaProfile>): Promise<Types.WIAResponse<Types.TraumaProfile>> =>
      this.client.post('/trauma/assess', data).then(r => r.data),

    screenEpigenetic: (personId: string): Promise<Types.WIAResponse<{ markers: object }>> =>
      this.client.post('/trauma/epigenetic/screen', { personId }).then(r => r.data),

    planHealing: (personId: string): Promise<Types.WIAResponse<{ plan: object }>> =>
      this.client.post('/trauma/healing/plan', { personId }).then(r => r.data),
  };
}

// Default export
export default WIAClient;
