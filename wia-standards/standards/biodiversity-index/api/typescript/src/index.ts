/**
 * WIA Biodiversity Index Standard - TypeScript SDK
 * Version: 1.0.0
 * Philosophy: 弘益人間 (홍익인간) - Benefit All Humanity, Preserve All Life
 */

import type {
  SpeciesOccurrence,
  EDNASample,
  DiversityCalculationRequest,
  DiversityCalculationResult,
  OccurrenceQuery,
  PaginatedResponse,
  ValidationResult,
  APIError,
} from './types';

export * from './types';

export interface BiodiversityClientOptions {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

export class BiodiversityClient {
  private apiKey: string;
  private baseURL: string;
  private timeout: number;

  constructor(options: BiodiversityClientOptions) {
    this.apiKey = options.apiKey;
    this.baseURL = options.baseURL || 'https://api.biodiversity.wia.org/v1';
    this.timeout = options.timeout || 30000;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: APIError = await response.json();
        throw new BiodiversityAPIError(error, response.status);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof BiodiversityAPIError) {
        throw error;
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  /**
   * Occurrences API
   */
  public occurrences = {
    /**
     * List species occurrences with optional filters
     */
    list: async (query?: OccurrenceQuery): Promise<PaginatedResponse<SpeciesOccurrence>> => {
      const params = new URLSearchParams();
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined) {
            if (Array.isArray(value)) {
              params.append(key, value.join(','));
            } else {
              params.append(key, String(value));
            }
          }
        });
      }

      const queryString = params.toString();
      return this.request<PaginatedResponse<SpeciesOccurrence>>(
        `/occurrences${queryString ? `?${queryString}` : ''}`
      );
    },

    /**
     * Get a specific occurrence by ID
     */
    get: async (occurrenceId: string): Promise<SpeciesOccurrence> => {
      return this.request<SpeciesOccurrence>(`/occurrences/${occurrenceId}`);
    },

    /**
     * Create a new occurrence record
     */
    create: async (occurrence: SpeciesOccurrence): Promise<SpeciesOccurrence> => {
      return this.request<SpeciesOccurrence>('/occurrences', {
        method: 'POST',
        body: JSON.stringify(occurrence),
      });
    },

    /**
     * Update an existing occurrence
     */
    update: async (occurrenceId: string, occurrence: Partial<SpeciesOccurrence>): Promise<SpeciesOccurrence> => {
      return this.request<SpeciesOccurrence>(`/occurrences/${occurrenceId}`, {
        method: 'PUT',
        body: JSON.stringify(occurrence),
      });
    },

    /**
     * Delete an occurrence
     */
    delete: async (occurrenceId: string): Promise<void> => {
      await this.request<void>(`/occurrences/${occurrenceId}`, {
        method: 'DELETE',
      });
    },
  };

  /**
   * Diversity Indices API
   */
  public indices = {
    /**
     * Calculate biodiversity indices
     */
    calculate: async (request: DiversityCalculationRequest): Promise<DiversityCalculationResult> => {
      return this.request<DiversityCalculationResult>('/indices/calculate', {
        method: 'POST',
        body: JSON.stringify(request),
      });
    },

    /**
     * Get calculation results by ID
     */
    get: async (calculationId: string): Promise<DiversityCalculationResult> => {
      return this.request<DiversityCalculationResult>(`/indices/${calculationId}`);
    },

    /**
     * Get temporal trends
     */
    trends: async (datasetId: string, metric: string): Promise<any> => {
      return this.request<any>(`/indices/trends?dataset_id=${datasetId}&metric=${metric}`);
    },
  };

  /**
   * Validation API
   */
  public validation = {
    /**
     * Validate a single occurrence record
     */
    validateOccurrence: async (occurrence: SpeciesOccurrence): Promise<ValidationResult> => {
      return this.request<ValidationResult>('/validate/occurrence', {
        method: 'POST',
        body: JSON.stringify(occurrence),
      });
    },

    /**
     * Batch validate multiple occurrences
     */
    validateBatch: async (occurrences: SpeciesOccurrence[]): Promise<ValidationResult[]> => {
      return this.request<ValidationResult[]>('/validate/batch', {
        method: 'POST',
        body: JSON.stringify({ occurrences }),
      });
    },
  };

  /**
   * Species API
   */
  public species = {
    /**
     * Search for species
     */
    search: async (query: string): Promise<any[]> => {
      return this.request<any[]>(`/species/search?q=${encodeURIComponent(query)}`);
    },

    /**
     * Get species details
     */
    get: async (taxonId: string): Promise<any> => {
      return this.request<any>(`/species/${taxonId}`);
    },

    /**
     * Get occurrences for a species
     */
    occurrences: async (taxonId: string, query?: OccurrenceQuery): Promise<PaginatedResponse<SpeciesOccurrence>> => {
      const params = new URLSearchParams();
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, String(value));
          }
        });
      }

      const queryString = params.toString();
      return this.request<PaginatedResponse<SpeciesOccurrence>>(
        `/species/${taxonId}/occurrences${queryString ? `?${queryString}` : ''}`
      );
    },
  };

  /**
   * Export API
   */
  public export = {
    /**
     * Export to GBIF format
     */
    toGBIF: async (datasetId: string, options?: any): Promise<any> => {
      return this.request<any>('/export/gbif', {
        method: 'POST',
        body: JSON.stringify({ dataset_id: datasetId, ...options }),
      });
    },

    /**
     * Export to GeoJSON
     */
    toGeoJSON: async (query: OccurrenceQuery): Promise<any> => {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });

      return this.request<any>(`/export/geojson?${params.toString()}`);
    },
  };
}

/**
 * Custom error class for API errors
 */
export class BiodiversityAPIError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;
  public requestId?: string;

  constructor(error: APIError, statusCode: number) {
    super(error.error.message);
    this.name = 'BiodiversityAPIError';
    this.statusCode = statusCode;
    this.code = error.error.code;
    this.details = error.error.details;
    this.requestId = error.request_id;
  }
}

/**
 * Helper functions
 */
export const helpers = {
  /**
   * Calculate Shannon diversity index from occurrence data
   */
  calculateShannon: (occurrences: SpeciesOccurrence[]): number => {
    const speciesCounts = new Map<string, number>();
    let total = 0;

    occurrences.forEach(occ => {
      const species = occ.species.scientific_name;
      const count = occ.observation.individual_count || 1;
      speciesCounts.set(species, (speciesCounts.get(species) || 0) + count);
      total += count;
    });

    let shannon = 0;
    speciesCounts.forEach(count => {
      const pi = count / total;
      shannon -= pi * Math.log(pi);
    });

    return shannon;
  },

  /**
   * Calculate Simpson index from occurrence data
   */
  calculateSimpson: (occurrences: SpeciesOccurrence[]): number => {
    const speciesCounts = new Map<string, number>();
    let total = 0;

    occurrences.forEach(occ => {
      const species = occ.species.scientific_name;
      const count = occ.observation.individual_count || 1;
      speciesCounts.set(species, (speciesCounts.get(species) || 0) + count);
      total += count;
    });

    let simpson = 0;
    speciesCounts.forEach(count => {
      simpson += (count * (count - 1)) / (total * (total - 1));
    });

    return simpson;
  },

  /**
   * Count species richness
   */
  calculateRichness: (occurrences: SpeciesOccurrence[]): number => {
    const uniqueSpecies = new Set(occurrences.map(occ => occ.species.scientific_name));
    return uniqueSpecies.size;
  },
};

export default BiodiversityClient;
