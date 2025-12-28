/**
 * WIA-CITY-010: Smart HVAC System Types
 * 弘익人間 (Hongik Ingan) - Benefit All Humanity
 */

export type CertificationLevel = 'bronze' | 'silver' | 'gold' | 'platinum';
export type HVACMode = 'auto' | 'cooling' | 'heating' | 'ventilation' | 'off';
export type SystemStatus = 'active' | 'standby' | 'fault' | 'offline';

export interface HVACConfig {
  mode: HVACMode;
  targetTemperature: number;
  certificationLevel: CertificationLevel;
  zones?: ZoneConfig[];
  energyOptimization?: EnergyOptimizationConfig;
  iaqMonitoring?: IAQMonitoringConfig;
}

export interface ZoneConfig {
  id?: string;
  name: string;
  targetTemp: number;
  occupancySensing: boolean;
  co2Threshold?: number;
  humidityRange?: { min: number; max: number };
}

export interface EnergyOptimizationConfig {
  enabledStrategies: OptimizationStrategy[];
  demandResponseEnabled: boolean;
  optimalStartStop: boolean;
  economizerControl: boolean;
}

export type OptimizationStrategy =
  | 'optimal-start-stop'
  | 'economizer'
  | 'sat-reset'
  | 'static-pressure-reset'
  | 'chw-reset'
  | 'demand-limiting'
  | 'machine-learning';

export interface IAQMonitoringConfig {
  co2Monitoring: boolean;
  vocMonitoring: boolean;
  pm25Monitoring: boolean;
  humidityControl: boolean;
  ventilationControl: 'fixed' | 'demand-controlled';
}

export interface SensorData {
  timestamp: Date;
  temperature: number;
  humidity: number;
  co2?: number;
  voc?: number;
  pm25?: number;
  occupancy?: boolean;
  occupantCount?: number;
}

export interface SystemMetrics {
  efficiency: {
    cop: number; // Coefficient of Performance
    eer: number; // Energy Efficiency Ratio
    savingsPercent: number;
  };
  energyConsumption: {
    current: number; // kW
    daily: number; // kWh
    monthly: number; // kWh
  };
  airQuality: {
    co2: number; // ppm
    humidity: number; // %
    temperature: number; // °C
    pm25?: number; // µg/m³
    voc?: number; // µg/m³
  };
  operationalStatus: {
    status: SystemStatus;
    uptime: number; // hours
    lastMaintenance: Date;
    nextMaintenance?: Date;
  };
}

export interface FaultDetectionResult {
  faultDetected: boolean;
  faults: Fault[];
  recommendations: string[];
}

export interface Fault {
  type: FaultType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: Date;
  affectedZones?: string[];
  estimatedImpact: {
    energyWaste?: number; // % or kWh
    comfortImpact?: 'none' | 'minor' | 'moderate' | 'severe';
  };
}

export type FaultType =
  | 'simultaneous-heating-cooling'
  | 'economizer-stuck'
  | 'sensor-drift'
  | 'scheduling-error'
  | 'excessive-outdoor-air'
  | 'short-cycling'
  | 'refrigerant-leak'
  | 'fouled-coil'
  | 'belt-slippage'
  | 'damper-failure';

export interface MaintenanceSchedule {
  tasks: MaintenanceTask[];
  predictedFailures: PredictedFailure[];
}

export interface MaintenanceTask {
  id: string;
  task: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: number; // minutes
}

export interface PredictedFailure {
  component: string;
  failureProbability: number; // 0-1
  estimatedTimeToFailure: number; // days
  recommendedAction: string;
}

export interface DemandResponseEvent {
  eventId: string;
  startTime: Date;
  endTime: Date;
  targetReduction: number; // kW
  strategy: 'setpoint-adjustment' | 'load-shedding' | 'pre-cooling';
  compensation?: number; // $
}
