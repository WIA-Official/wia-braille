/**
 * WIA Grand Challenges SDK - Core Types
 * 홍익인간 (弘益人間) - Benefit All Humanity
 */

// ============================================
// Common Types
// ============================================

export interface WIAResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  metadata: {
    timestamp: string;
    version: string;
    requestId: string;
  };
}

export interface PaginatedResponse<T> extends WIAResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// ============================================
// Life Sciences Challenges (01-11)
// ============================================

export interface AgingProfile {
  patientId: string;
  biologicalAge: number;
  chronologicalAge: number;
  autophagyIndex: number;
  lysosomeHealth: number;
  nadPlusLevel: { value: number; unit: string };
  telomereLength: { value: number; unit: string };
  senescenceMarkers: {
    p16INK4a: number;
    p21: number;
    sasp: number;
  };
}

export interface AlzheimersProfile {
  patientId: string;
  stage: 'preclinical' | 'mci' | 'mild' | 'moderate' | 'severe';
  nadHomeostasis: {
    nadPlus: { value: number; unit: string };
    nadhNadRatio: number;
    homeostasisIndex: number;
  };
  biomarkers: {
    amyloid: { petSuvr: number; csfAb42: number };
    tau: { csfPtau181: number; csfTotalTau: number };
  };
  cognitive: {
    mmse: { score: number; max: number };
    moca: { score: number; max: number };
    cdrSb: number;
  };
  glymphatic: {
    alpsIndex: number;
    clearanceEfficiency: number;
  };
}

export interface RareDiseaseProfile {
  patientId: string;
  diseaseCode: {
    orpha: string;
    omim: string;
    icd10: string;
  };
  geneticDiagnosis: {
    gene: string;
    variant: {
      hgvsC: string;
      hgvsP: string;
      type: string;
      zygosity: string;
      pathogenicity: string;
    };
    inheritance: string;
  };
  treatmentEligibility: {
    geneTherapyCandidate: boolean;
    therapyType: string;
    vector: string;
    route: string;
  };
}

// ============================================
// Mental Health Challenges (12-17)
// ============================================

export interface MentalHealthProfile {
  patientId: string;
  conditions: string[];
  hpaAxisDysregulation: number;
  inflammatoryMarkers: {
    crp: number;
    il6: number;
    tnfAlpha: number;
  };
  neuroimaging: {
    prefrontalActivity: number;
    amygdalaReactivity: number;
  };
  treatment: {
    type: string;
    response: number;
  };
}

export interface SleepProfile {
  patientId: string;
  disorderType: string;
  polysomnography: {
    tst: { value: number; unit: string };
    sleepEfficiency: number;
    sleepLatency: { value: number; unit: string };
    stages: {
      n1Percent: number;
      n2Percent: number;
      n3Percent: number;
      remPercent: number;
    };
    ahi: number;
  };
  glymphatic: {
    alpsIndex: number;
    clearanceEfficiency: number;
  };
  circadian: {
    chronotype: string;
    dimLightMelatoninOnset: string;
    socialJetlag: { value: number; unit: string };
  };
}

// ============================================
// Sensory & Mobility Challenges (24-26)
// ============================================

export interface HearingProfile {
  patientId: string;
  hearingLossType: 'sensorineural' | 'conductive' | 'mixed' | 'auditory_neuropathy';
  etiology: string;
  audiometry: {
    ptaRight: { value: number; unit: string };
    ptaLeft: { value: number; unit: string };
    severity: string;
  };
  geneticDiagnosis?: {
    gene: string;
    variant: string;
    inheritance: string;
  };
  treatmentEligibility: {
    geneTherapyCandidate: boolean;
    regenerationCandidate: boolean;
    cochlearImplantCandidate: boolean;
  };
}

export interface VisionProfile {
  patientId: string;
  diagnosis: string;
  visualFunction: {
    bcvaRight: { logmar: number; snellen: string };
    bcvaLeft: { logmar: number; snellen: string };
    visualField: { rightDegrees: number; leftDegrees: number };
  };
  retinalStructure: {
    octCentralThickness: { value: number; unit: string };
    ellipsoidZonePreserved: boolean;
  };
  treatmentEligibility: {
    optogeneticsCandidate: boolean;
    geneReplacementCandidate: boolean;
    lightPerception: boolean;
  };
}

export interface SpinalCordInjuryProfile {
  patientId: string;
  injuryLevel: string;
  asiaGrade: 'A' | 'B' | 'C' | 'D' | 'E';
  injuryType: 'complete' | 'incomplete';
  chronicity: 'acute' | 'subacute' | 'chronic';
  neurologicalExam: {
    motorScoreUpper: { right: number; left: number };
    motorScoreLower: { right: number; left: number };
  };
  treatmentEligibility: {
    stemCellCandidate: boolean;
    scaffoldCandidate: boolean;
    timeSinceInjuryDays: number;
  };
}

// ============================================
// Environment Challenges (20-22)
// ============================================

export interface WaterProfile {
  locationId: string;
  coordinates: { lat: number; lon: number };
  waterStress: {
    baselineStress: number;
    droughtRisk: string;
  };
  supplyOptions: {
    desalination: { feasible: boolean; capacityLpd: number };
    awg: { feasible: boolean; avgHumidity: number };
  };
}

export interface FoodSecurityProfile {
  regionId: string;
  foodSecurityIndex: {
    availability: number;
    access: number;
    utilization: number;
    stability: number;
  };
  precisionAgriculture: {
    aiRecommendationActive: boolean;
    yieldImprovementPercent: number;
  };
  verticalFarming: {
    facilitiesCount: number;
    totalCapacityTonsYear: number;
  };
}

export interface BiodiversityProfile {
  siteId: string;
  ecosystemType: string;
  biodiversityMetrics: {
    speciesRichness: number;
    shannonDiversityIndex: number;
    redListIndex: number;
  };
  climateIntegration: {
    carbonStockTons: number;
    sequestrationRate: number;
  };
  restorationStatus: {
    underRestoration: boolean;
    areaRestoredHa: number;
  };
}

// ============================================
// Society Challenges (28-33)
// ============================================

export interface DigitalEquityProfile {
  regionId: string;
  access: {
    broadbandAvailability: number;
    broadbandAdoption: number;
    speedMbps: { download: number; upload: number };
  };
  affordability: {
    avgMonthlyCost: { value: number; currency: string };
    incomePercentForInternet: number;
  };
  ability: {
    digitalLiteracyRate: number;
    trainingProgramsAvailable: number;
  };
  disparityIndex: {
    overallScore: number;
    priorityLevel: string;
  };
}

export interface RefugeeProfile {
  personId: string;
  status: 'refugee' | 'asylum_seeker' | 'idp' | 'stateless' | 'returnee';
  countryOfOrigin: string;
  hostCountry: string;
  identity: {
    unhcrRegistration: string;
    digitalId: string;
    biometricEnrolled: boolean;
  };
  needsAssessment: {
    protection: { score: number; urgent: boolean };
    foodSecurity: { score: number; urgent: boolean };
    health: { score: number; urgent: boolean };
  };
  durableSolution: {
    preferred: string;
    status: string;
  };
}

export interface AccessibilityProfile {
  entityId: string;
  entityType: 'website' | 'app' | 'building' | 'product' | 'service';
  universalDesignCompliance: {
    equitableUse: number;
    flexibility: number;
    simpleIntuitive: number;
    perceptibleInfo: number;
    errorTolerance: number;
    lowPhysicalEffort: number;
    sizeAndSpace: number;
    overallScore: number;
  };
  digitalAccessibility: {
    wcagVersion: string;
    conformanceLevel: string;
  };
}

export interface BereavementProfile {
  personId: string;
  relationshipToDeceased: string;
  lossContext: {
    dateOfDeath: string;
    causeOfDeath: string;
    expected: boolean;
  };
  griefAssessment: {
    prolongedGriefInventory: { score: number; risk: string };
    suicidalIdeation: boolean;
  };
  supportNeeds: {
    level: 'universal' | 'targeted' | 'specialist';
    servicesRecommended: string[];
  };
}

export interface TraumaProfile {
  personId: string;
  generation: 'G1_survivor' | 'G2_child' | 'G3_grandchild' | 'G4_plus';
  ancestralTrauma: {
    type: string;
    specificEvent: string;
  };
  exposurePathway: {
    germline: boolean;
    prenatal: boolean;
    direct: boolean;
    behavioral: boolean;
  };
  epigeneticMarkers?: {
    assessed: boolean;
    nr3c1Methylation: number;
    fkbp5Methylation: number;
  };
  resilienceFactors: {
    culturalConnection: number;
    communityBelonging: number;
    meaningMaking: number;
  };
}
