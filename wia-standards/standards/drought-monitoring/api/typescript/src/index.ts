/**
 * WIA Drought Monitoring SDK
 * Version: 1.0.0
 * License: MIT
 *
 * Philosophy: 弘益人間 (Benefit All Humanity)
 *
 * @packageDocumentation
 */

import type {
  WIAClientConfig,
  QueryParams,
  TimeSeriesParams,
  PDSIData,
  SPIData,
  SoilMoistureData,
  NDVIData,
  MultiIndexResponse,
  AlertSubscription,
  Subscription,
  TimeSeriesData,
  WIAError,
} from "./types";

export * from "./types";

/**
 * Main WIA Drought Monitoring Client
 *
 * @example
 * ```typescript
 * const client = new WIADroughtClient({
 *   apiKey: 'your-api-key-here',
 *   baseURL: 'https://api.drought.org'
 * });
 *
 * const pdsi = await client.getPDSI({ lat: 40.7128, lon: -74.0060 });
 * console.log(pdsi.pdsi.classification);
 * ```
 */
export class WIADroughtClient {
  private apiKey: string;
  private baseURL: string;
  private timeout: number;
  private cache: Map<string, any> | null;

  /**
   * Create a new WIA Drought Monitoring client
   *
   * @param config - Client configuration
   */
  constructor(config: WIAClientConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || "https://api.wia.org/drought/v1";
    this.timeout = config.timeout || 30000;
    this.cache = config.cacheEnabled ? new Map() : null;

    if (!this.apiKey) {
      throw new Error("API key is required");
    }
  }

  /**
   * Get current Palmer Drought Severity Index (PDSI)
   *
   * @param params - Query parameters
   * @returns PDSI data
   *
   * @example
   * ```typescript
   * const pdsi = await client.getPDSI({
   *   lat: 40.7128,
   *   lon: -74.0060,
   *   date: '2025-12-26'
   * });
   * ```
   */
  async getPDSI(params: QueryParams): Promise<PDSIData> {
    return this.request<PDSIData>("/pdsi", params);
  }

  /**
   * Get Standardized Precipitation Index (SPI)
   *
   * @param params - Query parameters including time scale
   * @returns SPI data
   *
   * @example
   * ```typescript
   * const spi = await client.getSPI({
   *   lat: 36.7783,
   *   lon: -119.4179,
   *   scale: 12  // 12-month SPI
   * });
   * ```
   */
  async getSPI(params: QueryParams & { scale: 1 | 3 | 6 | 12 | 24 }): Promise<SPIData> {
    return this.request<SPIData>("/spi", params);
  }

  /**
   * Get soil moisture data
   *
   * @param params - Query parameters
   * @returns Soil moisture data
   */
  async getSoilMoisture(params: QueryParams): Promise<SoilMoistureData> {
    return this.request<SoilMoistureData>("/soil-moisture", params);
  }

  /**
   * Get NDVI vegetation index data
   *
   * @param params - Query parameters including bounding box
   * @returns NDVI data
   */
  async getNDVI(params: QueryParams & { bbox: string }): Promise<NDVIData> {
    return this.request<NDVIData>("/ndvi", params);
  }

  /**
   * Get current status for multiple drought indices
   *
   * @param params - Query parameters with indices array
   * @returns Multi-index response
   *
   * @example
   * ```typescript
   * const status = await client.getCurrentStatus({
   *   lat: 40.7128,
   *   lon: -74.0060,
   *   indices: ['pdsi', 'spi', 'soil_moisture']
   * });
   *
   * console.log(status.pdsi?.classification);
   * console.log(status.soil_moisture?.layers[0].stress_level);
   * ```
   */
  async getCurrentStatus(params: QueryParams & { indices: string[] }): Promise<MultiIndexResponse> {
    const { indices, ...baseParams } = params;
    const results: MultiIndexResponse = {};

    await Promise.all(
      indices.map(async (index) => {
        try {
          switch (index) {
            case "pdsi":
              results.pdsi = await this.getPDSI(baseParams);
              break;
            case "spi":
              if (params.scale) {
                results.spi = await this.getSPI({ ...baseParams, scale: params.scale });
              }
              break;
            case "soil_moisture":
              results.soil_moisture = await this.getSoilMoisture(baseParams);
              break;
            case "ndvi":
              if (params.bbox) {
                results.ndvi = await this.getNDVI({ ...baseParams, bbox: params.bbox });
              }
              break;
          }
        } catch (error) {
          console.error(`Failed to fetch ${index}:`, error);
        }
      })
    );

    return results;
  }

  /**
   * Get historical time series data
   *
   * @param index - Drought index (pdsi, spi, etc.)
   * @param params - Time series parameters
   * @returns Time series data
   *
   * @example
   * ```typescript
   * const history = await client.getTimeSeries('pdsi', {
   *   lat: 40.7128,
   *   lon: -74.0060,
   *   start_date: '2024-01-01',
   *   end_date: '2025-12-26',
   *   interval: 'monthly'
   * });
   * ```
   */
  async getTimeSeries(index: string, params: TimeSeriesParams): Promise<TimeSeriesData> {
    return this.request<TimeSeriesData>(`/${index}/timeseries`, params);
  }

  /**
   * Subscribe to drought alerts
   *
   * @param subscription - Alert subscription configuration
   * @returns Subscription details
   *
   * @example
   * ```typescript
   * const sub = await client.subscribeAlerts({
   *   locations: [
   *     { lat: 40.7128, lon: -74.0060, name: 'Field A' }
   *   ],
   *   indices: ['pdsi', 'soil_moisture'],
   *   thresholds: {
   *     pdsi: { warning: -2.0, alert: -3.0 }
   *   },
   *   notification_methods: [
   *     { type: 'webhook', url: 'https://myapp.com/alert' }
   *   ],
   *   frequency: 'daily'
   * });
   * ```
   */
  async subscribeAlerts(subscription: AlertSubscription): Promise<Subscription> {
    return this.request<Subscription>("/alerts/subscribe", {}, "POST", subscription);
  }

  /**
   * Unsubscribe from alerts
   *
   * @param subscriptionId - Subscription ID to cancel
   */
  async unsubscribeAlerts(subscriptionId: string): Promise<void> {
    await this.request(`/alerts/subscribe/${subscriptionId}`, {}, "DELETE");
  }

  /**
   * Make HTTP request to WIA API
   *
   * @private
   */
  private async request<T>(
    endpoint: string,
    params: Record<string, any> = {},
    method: string = "GET",
    body?: any
  ): Promise<T> {
    // Check cache
    if (this.cache && method === "GET") {
      const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < 3600000) {
        // 1 hour cache
        return cached.data;
      }
    }

    // Build URL
    const url = new URL(endpoint, this.baseURL);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    // Make request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          "X-WIA-API-Key": this.apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: WIAError = await response.json();
        throw new WIAAPIError(error.error.code, error.error.message, error);
      }

      const data = await response.json();

      // Cache successful GET requests
      if (this.cache && method === "GET") {
        const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
        });
      }

      return data;
    } catch (error) {
      if (error instanceof WIAAPIError) {
        throw error;
      }
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * Clear the request cache
   */
  clearCache(): void {
    if (this.cache) {
      this.cache.clear();
    }
  }
}

/**
 * Custom error class for WIA API errors
 */
export class WIAAPIError extends Error {
  constructor(
    public code: string,
    message: string,
    public fullError: WIAError
  ) {
    super(message);
    this.name = "WIAAPIError";
  }
}

/**
 * Helper function to classify PDSI value
 *
 * @param pdsi - PDSI value
 * @returns Classification string
 */
export function classifyPDSI(pdsi: number): string {
  if (pdsi >= 4.0) return "extremely_wet";
  if (pdsi >= 3.0) return "very_wet";
  if (pdsi >= 2.0) return "moderately_wet";
  if (pdsi >= 1.0) return "slightly_wet";
  if (pdsi > -1.0) return "near_normal";
  if (pdsi > -2.0) return "mild_drought";
  if (pdsi > -3.0) return "moderate_drought";
  if (pdsi > -4.0) return "severe_drought";
  return "extreme_drought";
}

/**
 * Helper function to classify SPI value
 *
 * @param spi - SPI value
 * @returns Classification string
 */
export function classifySPI(spi: number): string {
  if (spi >= 2.0) return "extremely_wet";
  if (spi >= 1.5) return "very_wet";
  if (spi >= 1.0) return "moderately_wet";
  if (spi > -1.0) return "near_normal";
  if (spi > -1.5) return "moderately_dry";
  if (spi > -2.0) return "severely_dry";
  return "extremely_dry";
}

/**
 * Default export
 */
export default WIADroughtClient;
