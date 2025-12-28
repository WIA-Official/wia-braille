/**
 * WIA 3D Printing Construction Standard - TypeScript Type Definitions
 * Version 1.0.0
 *
 * 弘益人間 (Benefit All Humanity)
 */

// ============================================================================
// Core Project Types
// ============================================================================

export interface WIAProject {
  standard: 'WIA-3D-PRINTING-CONSTRUCTION';
  version: string;
  project: ProjectMetadata;
  geometry: Geometry;
  materials: Materials;
  printParameters: PrintParameters;
  quality: QualityRequirements;
  reinforcement?: Reinforcement;
  extensions?: Record<string, unknown>;
}

export interface ProjectMetadata {
  id: string; // UUID v4
  name: string;
  type: BuildingType;
  location: Location;
  dates: ProjectDates;
  stakeholders?: Stakeholders;
  properties?: Record<string, unknown>;
}

export type BuildingType =
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'infrastructure'
  | 'institutional'
  | 'mixed-use';

export interface Location {
  address?: string;
  city: string;
  state?: string;
  country: string; // ISO 3166-1 alpha-3
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: number;  // -90 to 90
  longitude: number; // -180 to 180
  elevation?: number; // meters above sea level
}

export interface ProjectDates {
  design?: string;      // ISO 8601
  printStart?: string;  // ISO 8601
  printEnd?: string;    // ISO 8601
  completion?: string;  // ISO 8601
}

export interface Stakeholders {
  owner?: string;
  architect?: string;
  contractor?: string;
  engineer?: string;
  materialSupplier?: string;
}

// ============================================================================
// Geometry Types
// ============================================================================

export type Geometry = MeshGeometry | ParametricGeometry | LayerGeometry;

export interface MeshGeometry {
  format: 'mesh';
  meshData: MeshData;
  boundingBox: BoundingBox;
  unit: 'mm' | 'cm' | 'm';
}

export interface MeshData {
  vertices: number[][]; // [x, y, z]
  faces: number[][];    // [v1, v2, v3]
  normals?: number[][]; // [nx, ny, nz]
  unit: string;
}

export interface BoundingBox {
  min: [number, number, number];
  max: [number, number, number];
}

export interface ParametricGeometry {
  format: 'parametric';
  components: ParametricComponent[];
  unit: 'mm' | 'cm' | 'm';
}

export interface ParametricComponent {
  id?: string;
  type: 'wall' | 'slab' | 'column' | 'beam';
  name?: string;
  path: number[][];  // [x, y]
  height: number;
  thickness: number;
  material?: string;
}

export interface LayerGeometry {
  format: 'layers';
  layerHeight: number;
  layers: Layer[];
  unit: 'mm' | 'cm' | 'm';
}

export interface Layer {
  number: number;
  height: number;
  paths: PrintPath[];
}

export interface PrintPath {
  type: 'perimeter' | 'infill' | 'support';
  points: number[][];
  width: number;
  density?: number; // 0-1
}

// ============================================================================
// Material Types
// ============================================================================

export interface Materials {
  primary: Material;
  secondary?: Material;
  support?: Material;
}

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  composition?: Composition;
  properties: MaterialProperties;
}

export type MaterialCategory =
  | 'concrete'
  | 'polymer'
  | 'metal'
  | 'composite'
  | 'earth';

export interface Composition {
  components: Component[];
}

export interface Component {
  material: string;
  proportion: number; // 0-1
  specification?: string;
}

export interface MaterialProperties {
  printability: PrintabilityProperties;
  structural: StructuralProperties;
  durability?: DurabilityProperties;
  thermal?: ThermalProperties;
}

export interface PrintabilityProperties {
  flowRate: ValueRange;
  extrusionPressure: Value;
  buildability: Value;
  openTime: Value;
}

export interface StructuralProperties {
  compressiveStrength: Value;
  tensileStrength?: Value;
  modulusOfElasticity?: Value;
  flexuralStrength?: Value;
  bondStrength?: Value;
}

export interface DurabilityProperties {
  freezeThaw?: 'pass' | 'fail';
  sulfateResistance?: 'low' | 'medium' | 'high';
  carbonation?: 'low' | 'medium' | 'high';
  permeability?: Value;
}

export interface ThermalProperties {
  conductivity?: Value;
  expansion?: Value;
  specificHeat?: Value;
}

export interface Value {
  value: number;
  unit: string;
}

export interface ValueRange {
  min: number;
  max: number;
  unit: string;
}

// ============================================================================
// Print Parameters
// ============================================================================

export interface PrintParameters {
  layerHeight: number;
  printSpeed: SpeedParameters;
  pathWidth: PathWidth;
  temperature?: TemperatureParameters;
  flowRate: FlowRateParameters;
  acceleration?: AccelerationParameters;
  retraction?: RetractionParameters;
}

export interface SpeedParameters {
  perimeter: number;
  infill: number;
  unit: 'mm/s' | 'cm/s';
}

export interface PathWidth {
  outer: number;
  inner: number;
  unit: 'mm' | 'cm';
}

export interface TemperatureParameters {
  material: number;
  ambient: number;
  unit: 'celsius' | 'fahrenheit';
}

export interface FlowRateParameters {
  target: number;
  tolerance: number;
  unit: 'mm³/s' | 'cm³/s';
}

export interface AccelerationParameters {
  max: number;
  unit: 'mm/s²' | 'm/s²';
}

export interface RetractionParameters {
  distance: number;
  speed: number;
  unit: 'mm' | 'cm';
}

// ============================================================================
// Quality Types
// ============================================================================

export interface QualityRequirements {
  dimensional: DimensionalQuality;
  surface?: SurfaceQuality;
  structural?: StructuralQuality;
  inspection?: InspectionRequirements;
}

export interface DimensionalQuality {
  tolerances: Tolerances;
}

export interface Tolerances {
  horizontal: Tolerance;
  vertical: Tolerance;
  wallThickness?: Tolerance;
}

export interface Tolerance {
  value: number;
  unit: 'mm' | 'cm';
  method?: 'laser-measurement' | 'manual' | 'ultrasonic' | 'coring';
}

export interface SurfaceQuality {
  roughness?: RoughnessSpec;
  waviness?: WavinessSpec;
}

export interface RoughnessSpec {
  max: number;
  unit: 'mm';
  measurement: 'Ra' | 'Rz';
}

export interface WavinessSpec {
  max: number;
  wavelength?: number;
  unit: 'mm';
}

export interface StructuralQuality {
  loadTesting?: LoadTestingSpec;
}

export interface LoadTestingSpec {
  required: boolean;
  loadFactor: number; // typically 1.0-2.0
  duration: number;   // hours
  acceptance?: string;
}

export interface InspectionRequirements {
  frequency: 'per-layer' | 'every-5-layers' | 'milestones';
  methods: InspectionMethod[];
}

export type InspectionMethod =
  | 'visual'
  | 'laser-scan'
  | 'ultrasonic'
  | 'coring'
  | 'load-test';

// ============================================================================
// Reinforcement Types
// ============================================================================

export interface Reinforcement {
  type: 'traditional' | 'printed' | 'hybrid';
  traditional?: TraditionalReinforcement[];
  printed?: PrintedReinforcement[];
}

export interface TraditionalReinforcement {
  id: string;
  material: string;
  diameter: number;
  path: number[][]; // 3D polyline
  placement: PlacementSpec;
}

export interface PlacementSpec {
  layer: number;
  pausePrint: boolean;
  installMethod: 'manual' | 'robotic';
}

export interface PrintedReinforcement {
  id: string;
  material: string;
  diameter: number;
  distribution: 'continuous-mesh' | 'discrete-bars';
  pattern: 'rectilinear' | 'diagonal' | 'optimized';
  density?: number;
}

// ============================================================================
// API Types (Phase 2)
// ============================================================================

export interface APIConfig {
  baseURL: string;
  apiKey?: string;
  timeout?: number;
}

export interface ProjectResponse {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt?: string;
  links: {
    self: string;
    jobs?: string;
  };
}

export type ProjectStatus =
  | 'created'
  | 'approved'
  | 'printing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface JobRequest {
  projectId: string;
  name: string;
  priority: 'low' | 'normal' | 'high';
  schedule?: ScheduleSpec;
  layers: LayerRange;
  printerId?: string;
}

export interface ScheduleSpec {
  startTime: string; // ISO 8601
  estimatedDuration?: number; // seconds
}

export interface LayerRange {
  start: number;
  end: number;
}

export interface JobResponse {
  id: string;
  status: JobStatus;
  progress?: JobProgress;
  printer?: PrinterStatus;
  quality?: QualityStatus;
}

export type JobStatus =
  | 'queued'
  | 'printing'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface JobProgress {
  currentLayer: number;
  totalLayers: number;
  percentage: number;
  elapsedTime?: number; // seconds
  estimatedRemaining?: number; // seconds
}

export interface PrinterStatus {
  id: string;
  status: 'operational' | 'fault' | 'maintenance';
  temperature?: number;
  materialLevel?: number; // 0-1
}

export interface QualityStatus {
  lastInspection?: string; // ISO 8601
  dimensionalAccuracy?: 'within-tolerance' | 'out-of-tolerance';
  layerAdhesion?: 'good' | 'fair' | 'poor';
  overallScore?: number; // 0-100
}

// ============================================================================
// WebSocket Types (Phase 3)
// ============================================================================

export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnect?: boolean;
  reconnectInterval?: number;
}

export interface WebSocketMessage<T = unknown> {
  type: MessageType;
  timestamp: string;
  sequenceNumber: number;
  payload: T;
}

export type MessageType =
  | 'AUTH'
  | 'COMMAND'
  | 'STATUS'
  | 'SENSOR'
  | 'EVENT'
  | 'HEARTBEAT'
  | 'ACK'
  | 'ERROR';

export interface CommandPayload {
  command: Command;
  [key: string]: unknown;
}

export type Command =
  | 'MOVE'
  | 'PATH_SEGMENT'
  | 'SET_MATERIAL_FLOW'
  | 'DEFINE_SAFETY_ZONE'
  | 'EMERGENCY_STOP'
  | 'SYNC_STATE';

export interface EventPayload {
  event: Event;
  severity: 'info' | 'warning' | 'error' | 'critical';
  data: unknown;
}

export type Event =
  | 'LAYER_STARTED'
  | 'LAYER_COMPLETED'
  | 'MATERIAL_LOW'
  | 'QUALITY_ISSUE'
  | 'EQUIPMENT_FAULT'
  | 'SAFETY_VIOLATION';

// ============================================================================
// Utility Types
// ============================================================================

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
  requestId?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  value?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  links: {
    first?: string;
    prev?: string;
    self: string;
    next?: string;
    last?: string;
  };
}
