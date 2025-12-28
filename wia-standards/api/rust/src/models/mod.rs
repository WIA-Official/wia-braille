//! WIA Grand Challenges - Data Models
//! 홍익인간 (弘益人間) - Benefit All Humanity

use serde::{Deserialize, Serialize};
use uuid::Uuid;

// ============================================
// Common Types
// ============================================

#[derive(Debug, Serialize, Deserialize)]
pub struct WiaResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<WiaError>,
    pub metadata: ResponseMetadata,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WiaError {
    pub code: String,
    pub message: String,
    pub details: Option<serde_json::Value>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseMetadata {
    pub timestamp: String,
    pub version: String,
    pub request_id: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Measurement {
    pub value: f64,
    pub unit: String,
}

// ============================================
// Life Sciences Models
// ============================================

#[derive(Debug, Serialize, Deserialize)]
pub struct AgingProfile {
    pub patient_id: Uuid,
    pub biological_age: f64,
    pub chronological_age: f64,
    pub autophagy_index: f64,
    pub lysosome_health: f64,
    pub nad_plus_level: Measurement,
    pub telomere_length: Measurement,
    pub senescence_markers: SenescenceMarkers,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SenescenceMarkers {
    pub p16ink4a: f64,
    pub p21: f64,
    pub sasp: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AlzheimersProfile {
    pub patient_id: Uuid,
    pub stage: AlzheimersStage,
    pub nad_homeostasis: NadHomeostasis,
    pub biomarkers: AlzheimersBiomarkers,
    pub cognitive: CognitiveAssessment,
    pub glymphatic: GlymphaticStatus,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum AlzheimersStage {
    Preclinical,
    Mci,
    Mild,
    Moderate,
    Severe,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NadHomeostasis {
    pub nad_plus: Measurement,
    pub nadh_nad_ratio: f64,
    pub homeostasis_index: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AlzheimersBiomarkers {
    pub amyloid: AmyloidMarkers,
    pub tau: TauMarkers,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AmyloidMarkers {
    pub pet_suvr: f64,
    pub csf_ab42: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TauMarkers {
    pub csf_ptau181: f64,
    pub csf_total_tau: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CognitiveAssessment {
    pub mmse: Score,
    pub moca: Score,
    pub cdr_sb: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Score {
    pub score: i32,
    pub max: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GlymphaticStatus {
    pub alps_index: f64,
    pub clearance_efficiency: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RareDiseaseProfile {
    pub patient_id: Uuid,
    pub disease_code: DiseaseCode,
    pub genetic_diagnosis: GeneticDiagnosis,
    pub treatment_eligibility: TreatmentEligibility,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DiseaseCode {
    pub orpha: String,
    pub omim: String,
    pub icd10: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GeneticDiagnosis {
    pub gene: String,
    pub variant: GeneticVariant,
    pub inheritance: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GeneticVariant {
    pub hgvs_c: String,
    pub hgvs_p: String,
    pub variant_type: String,
    pub zygosity: String,
    pub pathogenicity: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TreatmentEligibility {
    pub gene_therapy_candidate: bool,
    pub therapy_type: String,
    pub vector: String,
    pub route: String,
}

// ============================================
// Mental Health Models
// ============================================

#[derive(Debug, Serialize, Deserialize)]
pub struct SleepProfile {
    pub patient_id: Uuid,
    pub disorder_type: String,
    pub polysomnography: Polysomnography,
    pub glymphatic: GlymphaticStatus,
    pub circadian: CircadianProfile,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Polysomnography {
    pub tst: Measurement,
    pub sleep_efficiency: f64,
    pub sleep_latency: Measurement,
    pub stages: SleepStages,
    pub ahi: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SleepStages {
    pub n1_percent: f64,
    pub n2_percent: f64,
    pub n3_percent: f64,
    pub rem_percent: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CircadianProfile {
    pub chronotype: String,
    pub dim_light_melatonin_onset: String,
    pub social_jetlag: Measurement,
}

// ============================================
// Sensory & Mobility Models
// ============================================

#[derive(Debug, Serialize, Deserialize)]
pub struct HearingProfile {
    pub patient_id: Uuid,
    pub hearing_loss_type: HearingLossType,
    pub etiology: String,
    pub audiometry: Audiometry,
    pub genetic_diagnosis: Option<GeneticDiagnosis>,
    pub treatment_eligibility: HearingTreatmentEligibility,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum HearingLossType {
    Sensorineural,
    Conductive,
    Mixed,
    AuditoryNeuropathy,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Audiometry {
    pub pta_right: Measurement,
    pub pta_left: Measurement,
    pub severity: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HearingTreatmentEligibility {
    pub gene_therapy_candidate: bool,
    pub regeneration_candidate: bool,
    pub cochlear_implant_candidate: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VisionProfile {
    pub patient_id: Uuid,
    pub diagnosis: String,
    pub visual_function: VisualFunction,
    pub retinal_structure: RetinalStructure,
    pub treatment_eligibility: VisionTreatmentEligibility,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VisualFunction {
    pub bcva_right: VisualAcuity,
    pub bcva_left: VisualAcuity,
    pub visual_field: VisualField,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VisualAcuity {
    pub logmar: f64,
    pub snellen: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VisualField {
    pub right_degrees: i32,
    pub left_degrees: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RetinalStructure {
    pub oct_central_thickness: Measurement,
    pub ellipsoid_zone_preserved: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VisionTreatmentEligibility {
    pub optogenetics_candidate: bool,
    pub gene_replacement_candidate: bool,
    pub light_perception: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SpinalCordInjuryProfile {
    pub patient_id: Uuid,
    pub injury_level: String,
    pub asia_grade: AsiaGrade,
    pub injury_type: InjuryType,
    pub chronicity: Chronicity,
    pub neurological_exam: NeurologicalExam,
    pub treatment_eligibility: SciTreatmentEligibility,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum AsiaGrade {
    A,
    B,
    C,
    D,
    E,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum InjuryType {
    Complete,
    Incomplete,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Chronicity {
    Acute,
    Subacute,
    Chronic,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NeurologicalExam {
    pub motor_score_upper: LateralScore,
    pub motor_score_lower: LateralScore,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LateralScore {
    pub right: i32,
    pub left: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SciTreatmentEligibility {
    pub stem_cell_candidate: bool,
    pub scaffold_candidate: bool,
    pub time_since_injury_days: i32,
}

// ============================================
// Society Models
// ============================================

#[derive(Debug, Serialize, Deserialize)]
pub struct RefugeeProfile {
    pub person_id: Uuid,
    pub status: RefugeeStatus,
    pub country_of_origin: String,
    pub host_country: String,
    pub identity: RefugeeIdentity,
    pub needs_assessment: NeedsAssessment,
    pub durable_solution: DurableSolution,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RefugeeStatus {
    Refugee,
    AsylumSeeker,
    Idp,
    Stateless,
    Returnee,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RefugeeIdentity {
    pub unhcr_registration: String,
    pub digital_id: String,
    pub biometric_enrolled: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NeedsAssessment {
    pub protection: NeedScore,
    pub food_security: NeedScore,
    pub health: NeedScore,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NeedScore {
    pub score: i32,
    pub urgent: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DurableSolution {
    pub preferred: String,
    pub status: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TraumaProfile {
    pub person_id: Uuid,
    pub generation: TraumaGeneration,
    pub ancestral_trauma: AncestralTrauma,
    pub exposure_pathway: ExposurePathway,
    pub epigenetic_markers: Option<EpigeneticMarkers>,
    pub resilience_factors: ResilienceFactors,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum TraumaGeneration {
    G1Survivor,
    G2Child,
    G3Grandchild,
    G4Plus,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AncestralTrauma {
    pub trauma_type: String,
    pub specific_event: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ExposurePathway {
    pub germline: bool,
    pub prenatal: bool,
    pub direct: bool,
    pub behavioral: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EpigeneticMarkers {
    pub assessed: bool,
    pub nr3c1_methylation: f64,
    pub fkbp5_methylation: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResilienceFactors {
    pub cultural_connection: f64,
    pub community_belonging: f64,
    pub meaning_making: f64,
}
