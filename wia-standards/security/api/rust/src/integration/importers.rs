//! Data Importers
//!
//! NVD/CVE, Nessus, OpenVAS, TAXII 2.1

use crate::types::{VulnerabilityData, Cvss, CvssSeverity, WiaSecurityEvent, EventType, Source, SourceType};
use serde::{Deserialize, Serialize};
use std::time::Duration;
use uuid::Uuid;

// ============================================================================
// Types
// ============================================================================

/// Import result
pub type ImportResult<T> = Result<T, ImportError>;

/// Import error
#[derive(Debug)]
pub enum ImportError {
    ApiError { status: u16, message: String },
    ParseError(String),
    NetworkError(String),
    RateLimited(Duration),
    NotFound,
    InvalidFormat(String),
}

impl std::fmt::Display for ImportError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::ApiError { status, message } => write!(f, "API error ({}): {}", status, message),
            Self::ParseError(msg) => write!(f, "Parse error: {}", msg),
            Self::NetworkError(msg) => write!(f, "Network error: {}", msg),
            Self::RateLimited(duration) => write!(f, "Rate limited, retry after {:?}", duration),
            Self::NotFound => write!(f, "Not found"),
            Self::InvalidFormat(msg) => write!(f, "Invalid format: {}", msg),
        }
    }
}

impl std::error::Error for ImportError {}

// ============================================================================
// NVD/CVE Importer
// ============================================================================

/// NVD API configuration
#[derive(Debug, Clone)]
pub struct NvdConfig {
    pub api_key: Option<String>,
    pub timeout: Duration,
}

impl Default for NvdConfig {
    fn default() -> Self {
        Self {
            api_key: None,
            timeout: Duration::from_secs(30),
        }
    }
}

/// NVD Importer for CVE data
pub struct NvdImporter {
    config: NvdConfig,
    base_url: String,
}

impl NvdImporter {
    /// Create a new NVD importer
    pub fn new(config: NvdConfig) -> Self {
        Self {
            config,
            base_url: "https://services.nvd.nist.gov/rest/json/cves/2.0".to_string(),
        }
    }

    /// Fetch CVE by ID
    pub async fn fetch_cve(&self, cve_id: &str) -> ImportResult<CveRecord> {
        // In production, make HTTP request
        // GET {base_url}?cveId={cve_id}
        // Headers: apiKey if configured

        // Placeholder implementation
        Ok(CveRecord {
            id: cve_id.to_string(),
            descriptions: vec![CveDescription {
                lang: "en".to_string(),
                value: format!("Description for {}", cve_id),
            }],
            metrics: CveMetrics {
                cvss_v31: Some(CvssV31 {
                    base_score: 7.5,
                    base_severity: "HIGH".to_string(),
                    vector_string: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N".to_string(),
                }),
            },
            references: vec![],
            weaknesses: vec![],
            configurations: vec![],
            published: chrono::Utc::now().to_rfc3339(),
            last_modified: chrono::Utc::now().to_rfc3339(),
        })
    }

    /// Search CVEs
    pub async fn search_cves(&self, query: NvdSearchQuery) -> ImportResult<Vec<CveRecord>> {
        // In production, make HTTP request with query parameters
        // GET {base_url}?keyword={keyword}&cvssV3Severity={severity}&...
        Ok(vec![])
    }

    /// Convert CVE to WIA Security event
    pub fn to_wia_event(&self, cve: &CveRecord) -> WiaSecurityEvent {
        let cvss = cve.metrics.cvss_v31.as_ref();
        let severity_score = cvss.map(|c| c.base_score).unwrap_or(0.0);

        let vuln_data = VulnerabilityData {
            vuln_id: cve.id.clone(),
            title: cve.descriptions.first()
                .map(|d| d.value.chars().take(100).collect())
                .unwrap_or_else(|| cve.id.clone()),
            description: cve.descriptions.first()
                .map(|d| d.value.clone()),
            cvss: Cvss {
                version: "3.1".to_string(),
                score: severity_score,
                vector: cvss.map(|c| c.vector_string.clone()),
                severity: cvss.map(|c| c.base_severity.clone())
                    .unwrap_or_else(|| "UNKNOWN".to_string()),
                base_score: Some(severity_score),
                temporal_score: None,
                environmental_score: None,
            },
            cwe: Some(cve.weaknesses.iter()
                .flat_map(|w| w.description.iter().map(|d| d.value.clone()))
                .collect()),
            affected_products: None,
            exploit_available: None,
            exploit_details: None,
            patch_available: Some(cve.references.iter()
                .any(|r| r.tags.iter().any(|t| t.to_lowercase() == "patch"))),
            patch_details: None,
            references: Some(cve.references.iter().map(|r| r.url.clone()).collect()),
            published: Some(cve.published.clone()),
            modified: Some(cve.last_modified.clone()),
        };

        let mut event = WiaSecurityEvent::new(
            EventType::Vulnerability,
            Source::new(SourceType::Scanner, "NVD"),
            serde_json::to_value(&vuln_data).unwrap_or_default(),
        );
        event.severity = severity_score;
        event
    }
}

/// NVD search query
#[derive(Debug, Clone, Default)]
pub struct NvdSearchQuery {
    pub keyword: Option<String>,
    pub cve_id: Option<String>,
    pub cvss_v3_severity: Option<String>,
    pub cwe_id: Option<String>,
    pub results_per_page: Option<usize>,
    pub start_index: Option<usize>,
}

/// CVE record from NVD
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CveRecord {
    pub id: String,
    pub descriptions: Vec<CveDescription>,
    pub metrics: CveMetrics,
    pub references: Vec<CveReference>,
    pub weaknesses: Vec<CveWeakness>,
    pub configurations: Vec<serde_json::Value>,
    pub published: String,
    #[serde(rename = "lastModified")]
    pub last_modified: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CveDescription {
    pub lang: String,
    pub value: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CveMetrics {
    #[serde(rename = "cvssMetricV31")]
    pub cvss_v31: Option<CvssV31>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CvssV31 {
    #[serde(rename = "baseScore")]
    pub base_score: f64,
    #[serde(rename = "baseSeverity")]
    pub base_severity: String,
    #[serde(rename = "vectorString")]
    pub vector_string: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CveReference {
    pub url: String,
    #[serde(default)]
    pub tags: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CveWeakness {
    pub description: Vec<CveDescription>,
}

// ============================================================================
// Nessus Importer
// ============================================================================

/// Nessus XML importer
pub struct NessusImporter;

impl NessusImporter {
    /// Create a new Nessus importer
    pub fn new() -> Self {
        Self
    }

    /// Parse Nessus XML report
    pub fn parse_xml(&self, xml_content: &str) -> ImportResult<Vec<WiaSecurityEvent>> {
        // In production, use quick-xml to parse
        // This is a simplified placeholder

        let events = vec![];

        // Parse XML structure:
        // <NessusClientData_v2>
        //   <Report>
        //     <ReportHost name="hostname">
        //       <ReportItem port="443" svc_name="https" protocol="tcp" severity="3">
        //         <pluginID>12345</pluginID>
        //         <pluginName>Vulnerability Name</pluginName>
        //         <description>...</description>
        //         <solution>...</solution>
        //         <cvss_base_score>7.5</cvss_base_score>
        //       </ReportItem>
        //     </ReportHost>
        //   </Report>
        // </NessusClientData_v2>

        Ok(events)
    }

    /// Parse Nessus report item to WIA event
    fn parse_report_item(
        &self,
        host: &str,
        item: &NessusReportItem,
    ) -> WiaSecurityEvent {
        let severity = match item.severity {
            4 => 9.0, // Critical
            3 => 7.0, // High
            2 => 4.0, // Medium
            1 => 2.0, // Low
            _ => 0.0, // Info
        };

        let vuln_data = serde_json::json!({
            "vuln_id": format!("NESSUS-{}", item.plugin_id),
            "title": item.plugin_name,
            "description": item.description,
            "cvss": {
                "version": "3.0",
                "score": item.cvss_base_score.unwrap_or(severity),
                "severity": match item.severity {
                    4 => "critical",
                    3 => "high",
                    2 => "medium",
                    1 => "low",
                    _ => "none",
                }
            },
            "affected_products": [{
                "host": host,
                "port": item.port,
                "protocol": item.protocol,
                "service": item.svc_name,
            }],
            "patch_available": !item.solution.is_empty(),
            "remediation": item.solution,
        });

        let mut event = WiaSecurityEvent::new(
            EventType::Vulnerability,
            Source::new(SourceType::Scanner, "Nessus"),
            vuln_data,
        );
        event.severity = severity;
        event
    }
}

impl Default for NessusImporter {
    fn default() -> Self {
        Self::new()
    }
}

/// Nessus report item
#[derive(Debug, Clone)]
pub struct NessusReportItem {
    pub port: u16,
    pub svc_name: String,
    pub protocol: String,
    pub severity: u8,
    pub plugin_id: String,
    pub plugin_name: String,
    pub description: String,
    pub solution: String,
    pub cvss_base_score: Option<f64>,
    pub cvss_vector: Option<String>,
}

// ============================================================================
// OpenVAS Importer
// ============================================================================

/// OpenVAS XML importer
pub struct OpenVasImporter;

impl OpenVasImporter {
    /// Create a new OpenVAS importer
    pub fn new() -> Self {
        Self
    }

    /// Parse OpenVAS XML report
    pub fn parse_xml(&self, xml_content: &str) -> ImportResult<Vec<WiaSecurityEvent>> {
        // In production, parse OpenVAS XML format
        // <report>
        //   <results>
        //     <result>
        //       <host>192.168.1.1</host>
        //       <port>443/tcp</port>
        //       <nvt oid="1.2.3.4">
        //         <name>Vulnerability</name>
        //         <cvss_base>7.5</cvss_base>
        //       </nvt>
        //       <threat>High</threat>
        //       <description>...</description>
        //     </result>
        //   </results>
        // </report>

        Ok(vec![])
    }
}

impl Default for OpenVasImporter {
    fn default() -> Self {
        Self::new()
    }
}

// ============================================================================
// TAXII 2.1 Client
// ============================================================================

/// TAXII 2.1 configuration
#[derive(Debug, Clone)]
pub struct TaxiiConfig {
    pub api_root: String,
    pub username: String,
    pub password: String,
    pub timeout: Duration,
}

/// TAXII 2.1 client
pub struct TaxiiClient {
    config: TaxiiConfig,
}

impl TaxiiClient {
    /// Create a new TAXII client
    pub fn new(config: TaxiiConfig) -> Self {
        Self { config }
    }

    /// Get available collections
    pub async fn get_collections(&self) -> ImportResult<Vec<TaxiiCollection>> {
        // In production, make HTTP request
        // GET {api_root}/collections/
        // Accept: application/taxii+json;version=2.1
        Ok(vec![])
    }

    /// Get objects from collection
    pub async fn get_objects(
        &self,
        collection_id: &str,
        filters: Option<TaxiiFilters>,
    ) -> ImportResult<StixBundle> {
        // In production, make HTTP request
        // GET {api_root}/collections/{collection_id}/objects/
        Ok(StixBundle {
            bundle_type: "bundle".to_string(),
            id: format!("bundle--{}", Uuid::new_v4()),
            objects: vec![],
        })
    }

    /// Add objects to collection
    pub async fn add_objects(
        &self,
        collection_id: &str,
        objects: Vec<serde_json::Value>,
    ) -> ImportResult<TaxiiStatus> {
        // In production, make HTTP request
        // POST {api_root}/collections/{collection_id}/objects/
        Ok(TaxiiStatus {
            id: format!("status--{}", Uuid::new_v4()),
            status: "complete".to_string(),
            total_count: objects.len(),
            success_count: objects.len(),
            failure_count: 0,
        })
    }

    /// Convert STIX objects to WIA events
    pub fn stix_to_wia_events(&self, bundle: &StixBundle) -> Vec<WiaSecurityEvent> {
        bundle.objects.iter()
            .filter_map(|obj| {
                let obj_type = obj.get("type")?.as_str()?;
                match obj_type {
                    "indicator" => Some(self.indicator_to_event(obj)),
                    "malware" => Some(self.malware_to_event(obj)),
                    "threat-actor" => Some(self.threat_actor_to_event(obj)),
                    _ => None,
                }
            })
            .collect()
    }

    fn indicator_to_event(&self, obj: &serde_json::Value) -> WiaSecurityEvent {
        let data = serde_json::json!({
            "threat_type": "indicator",
            "threat_name": obj.get("name").and_then(|v| v.as_str()).unwrap_or("Unknown"),
            "indicators": [{
                "type": "stix_pattern",
                "value": obj.get("pattern").and_then(|v| v.as_str()).unwrap_or(""),
            }],
            "status": "active",
        });

        WiaSecurityEvent::new(
            EventType::ThreatIntel,
            Source::new(SourceType::Custom, "TAXII"),
            data,
        )
    }

    fn malware_to_event(&self, obj: &serde_json::Value) -> WiaSecurityEvent {
        let data = serde_json::json!({
            "threat_type": "malware",
            "threat_name": obj.get("name").and_then(|v| v.as_str()).unwrap_or("Unknown"),
            "threat_family": obj.get("malware_types").and_then(|v| v.get(0)).and_then(|v| v.as_str()),
            "status": "active",
        });

        let mut event = WiaSecurityEvent::new(
            EventType::ThreatIntel,
            Source::new(SourceType::Custom, "TAXII"),
            data,
        );
        event.severity = 8.0;
        event
    }

    fn threat_actor_to_event(&self, obj: &serde_json::Value) -> WiaSecurityEvent {
        let data = serde_json::json!({
            "threat_type": "apt",
            "threat_name": obj.get("name").and_then(|v| v.as_str()).unwrap_or("Unknown"),
            "aliases": obj.get("aliases"),
            "target_sectors": obj.get("goals"),
            "status": "active",
        });

        let mut event = WiaSecurityEvent::new(
            EventType::ThreatIntel,
            Source::new(SourceType::Custom, "TAXII"),
            data,
        );
        event.severity = 9.0;
        event
    }
}

/// TAXII collection
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaxiiCollection {
    pub id: String,
    pub title: String,
    pub description: Option<String>,
    pub can_read: bool,
    pub can_write: bool,
}

/// TAXII filters
#[derive(Debug, Clone, Default)]
pub struct TaxiiFilters {
    pub types: Option<Vec<String>>,
    pub id: Option<String>,
    pub added_after: Option<String>,
}

/// STIX bundle
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StixBundle {
    #[serde(rename = "type")]
    pub bundle_type: String,
    pub id: String,
    pub objects: Vec<serde_json::Value>,
}

/// TAXII status response
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaxiiStatus {
    pub id: String,
    pub status: String,
    pub total_count: usize,
    pub success_count: usize,
    pub failure_count: usize,
}

// ============================================================================
// Factory Functions
// ============================================================================

/// Create NVD importer
pub fn create_nvd_importer(config: NvdConfig) -> NvdImporter {
    NvdImporter::new(config)
}

/// Create Nessus importer
pub fn create_nessus_importer() -> NessusImporter {
    NessusImporter::new()
}

/// Create OpenVAS importer
pub fn create_openvas_importer() -> OpenVasImporter {
    OpenVasImporter::new()
}

/// Create TAXII client
pub fn create_taxii_client(config: TaxiiConfig) -> TaxiiClient {
    TaxiiClient::new(config)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_nvd_importer() {
        let config = NvdConfig::default();
        let importer = NvdImporter::new(config);

        let cve = importer.fetch_cve("CVE-2021-44228").await.unwrap();
        assert_eq!(cve.id, "CVE-2021-44228");
    }

    #[test]
    fn test_nvd_to_wia_event() {
        let config = NvdConfig::default();
        let importer = NvdImporter::new(config);

        let cve = CveRecord {
            id: "CVE-2021-44228".to_string(),
            descriptions: vec![CveDescription {
                lang: "en".to_string(),
                value: "Log4j vulnerability".to_string(),
            }],
            metrics: CveMetrics {
                cvss_v31: Some(CvssV31 {
                    base_score: 10.0,
                    base_severity: "CRITICAL".to_string(),
                    vector_string: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H".to_string(),
                }),
            },
            references: vec![],
            weaknesses: vec![],
            configurations: vec![],
            published: "2021-12-10T00:00:00Z".to_string(),
            last_modified: "2021-12-10T00:00:00Z".to_string(),
        };

        let event = importer.to_wia_event(&cve);
        assert_eq!(event.event_type, EventType::Vulnerability);
        assert_eq!(event.severity, 10.0);
    }
}
