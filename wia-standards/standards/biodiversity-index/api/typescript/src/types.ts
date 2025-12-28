/**
 * WIA Biodiversity Index Standard - TypeScript Type Definitions
 * Version: 1.0.0
 * Philosophy: 弘益人間 (홍익인간) - Benefit All Humanity, Preserve All Life
 */

export interface Taxonomy {
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  subspecies?: string | null;
}

export interface Species {
  scientific_name: string;
  common_name?: string;
  taxonomy: Taxonomy;
  taxonomic_authority?: string;
  taxon_id?: string;
  iucn_status?: IUCNStatus;
  endemic?: boolean;
}

export type IUCNStatus = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD' | 'NE';

export interface Location {
  latitude: number;
  longitude: number;
  coordinate_uncertainty_m?: number;
  datum?: string;
  elevation_m?: number;
  depth_m?: number | null;
  locality?: string;
  country?: string;
  state_province?: string;
  protected_area?: boolean;
  habitat_type?: string;
  habitat_detail?: string;
}

export interface Temporal {
  observation_date: string; // ISO 8601
  observation_duration_minutes?: number;
  season?: 'spring' | 'summer' | 'fall' | 'winter' | 'wet' | 'dry';
  time_of_day?: 'dawn' | 'morning' | 'midday' | 'afternoon' | 'dusk' | 'night';
}

export interface Observation {
  basis_of_record: string;
  sampling_protocol?: string;
  individual_count?: number;
  life_stage?: 'egg' | 'larva' | 'juvenile' | 'adult' | 'unknown';
  sex?: 'male' | 'female' | 'unknown';
  behavior?: string;
  observer_id?: string;
  observer_name?: string;
  identification_confidence?: number;
  identification_method?: string;
  identification_verified_by?: string | null;
  evidence?: Evidence;
}

export interface Evidence {
  has_photo: boolean;
  has_sound: boolean;
  has_specimen: boolean;
  photo_urls?: string[];
  sound_urls?: string[];
  specimen_id?: string;
}

export interface Environmental {
  temperature_c?: number;
  humidity_percent?: number;
  cloud_cover_percent?: number;
  wind_speed_ms?: number;
  canopy_cover_percent?: number;
}

export interface Quality {
  quality_flag: 'unvalidated' | 'validated' | 'expert_verified' | 'flagged';
  quality_checks?: string[];
  validation_date?: string;
  validator_id?: string;
}

export interface Provenance {
  data_source: string;
  project_name?: string;
  funding_source?: string;
  permit_number?: string;
  created_date: string;
  modified_date?: string;
  license: string;
}

export interface SpeciesOccurrence {
  $schema?: string;
  occurrence_id: string;
  dataset_id?: string;
  species: Species;
  location: Location;
  temporal: Temporal;
  observation: Observation;
  environmental?: Environmental;
  quality?: Quality;
  provenance?: Provenance;
}

export interface EDNASample {
  $schema?: string;
  sample_id: string;
  collection: EDNACollection;
  processing: EDNAProcessing;
  results: EDNAResults;
  quality: EDNAQuality;
}

export interface EDNACollection {
  date: string;
  location: {
    latitude: number;
    longitude: number;
    water_body_name?: string;
    water_body_type?: string;
    sample_depth_m?: number;
  };
  sampling_method: string;
  volume_liters: number;
  filter_pore_size_um: number;
  filter_type: string;
  replicates: number;
  water_parameters?: {
    temperature_c?: number;
    ph?: number;
    conductivity_us_cm?: number;
    turbidity_ntu?: number;
  };
}

export interface EDNAProcessing {
  extraction_date: string;
  extraction_method: string;
  extraction_kit_lot?: string;
  dna_concentration_ng_ul?: number;
  dna_quality_260_280?: number;
  sequencing_platform: string;
  sequencing_date?: string;
  target_gene: string;
  primer_set?: string;
  pcr_cycles?: number;
  sequencing_depth?: string;
}

export interface EDNAResults {
  total_reads: number;
  quality_filtered_reads: number;
  unique_asvs: number;
  detected_taxa: DetectedTaxon[];
}

export interface DetectedTaxon {
  scientific_name: string;
  common_name?: string;
  read_count: number;
  asv_count: number;
  confidence: number;
  taxonomy_database: string;
}

export interface EDNAQuality {
  negative_control_contamination: boolean;
  positive_control_success: boolean;
  primer_dimer_percentage?: number;
  quality_flag: 'passed' | 'failed' | 'warning';
}

export interface DiversityIndices {
  species_richness?: SpeciesRichness;
  shannon_diversity?: ShannonDiversity;
  simpson_index?: SimpsonIndex;
  pielou_evenness?: PielouEvenness;
  margalef_richness?: MargalefRichness;
}

export interface SpeciesRichness {
  value: number;
  rarefied_to_n?: number;
  rarefied_value?: number;
  confidence_interval_95?: [number, number];
}

export interface ShannonDiversity {
  value: number;
  confidence_interval_95?: [number, number];
  calculation_method?: 'natural_log' | 'log2' | 'log10';
  bootstrap_iterations?: number;
}

export interface SimpsonIndex {
  value: number;
  diversity_1_minus_d: number;
  inverse_simpson: number;
  confidence_interval_95?: [number, number];
}

export interface PielouEvenness {
  value: number;
  interpretation?: string;
}

export interface MargalefRichness {
  value: number;
}

export interface DiversityCalculationRequest {
  dataset_id?: string;
  spatial_filter?: GeoJSONPolygon;
  temporal_filter?: {
    start_date: string;
    end_date: string;
  };
  indices: ('species_richness' | 'shannon_diversity' | 'simpson_index' | 'pielou_evenness' | 'margalef_richness')[];
  rarefaction?: {
    enabled: boolean;
    target_n: number;
  };
  bootstrap?: {
    enabled: boolean;
    iterations: number;
    confidence_level: number;
  };
}

export interface GeoJSONPolygon {
  type: 'Polygon';
  coordinates: number[][][];
}

export interface DiversityCalculationResult {
  calculation_id: string;
  status: 'processing' | 'completed' | 'failed';
  execution_time_ms?: number;
  results?: DiversityIndices;
  metadata?: {
    input_occurrences: number;
    unique_species: number;
    total_individuals: number;
    calculation_date: string;
  };
  error?: string;
}

export interface OccurrenceQuery {
  species?: string;
  country?: string;
  start_date?: string;
  end_date?: string;
  bbox?: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  habitat_type?: string;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ValidationResult {
  valid: boolean;
  quality_score: number;
  checks: ValidationCheck[];
  warnings: string[];
  errors: string[];
}

export interface ValidationCheck {
  check: string;
  status: 'passed' | 'failed' | 'warning';
  message: string;
}

export interface APIError {
  error: {
    code: string;
    message: string;
    details?: any;
    documentation_url?: string;
  };
  request_id?: string;
}
