//! Data Exporters
//!
//! Splunk HEC, Elasticsearch, PDF Reports, Grafana Dashboards

use crate::types::WiaSecurityEvent;
use serde::{Deserialize, Serialize};
use std::time::Duration;
use std::collections::HashMap;

// ============================================================================
// Types
// ============================================================================

/// Export result
pub type ExportResult<T> = Result<T, ExportError>;

/// Export error
#[derive(Debug)]
pub enum ExportError {
    ApiError { status: u16, message: String },
    SerializationError(String),
    NetworkError(String),
    IoError(String),
    AuthenticationError(String),
}

impl std::fmt::Display for ExportError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::ApiError { status, message } => write!(f, "API error ({}): {}", status, message),
            Self::SerializationError(msg) => write!(f, "Serialization error: {}", msg),
            Self::NetworkError(msg) => write!(f, "Network error: {}", msg),
            Self::IoError(msg) => write!(f, "IO error: {}", msg),
            Self::AuthenticationError(msg) => write!(f, "Authentication error: {}", msg),
        }
    }
}

impl std::error::Error for ExportError {}

// ============================================================================
// Splunk HEC Exporter
// ============================================================================

/// Splunk HEC configuration
#[derive(Debug, Clone)]
pub struct SplunkHecConfig {
    pub url: String,
    pub token: String,
    pub index: Option<String>,
    pub source: Option<String>,
    pub sourcetype: Option<String>,
    pub verify_tls: bool,
    pub timeout: Duration,
}

impl Default for SplunkHecConfig {
    fn default() -> Self {
        Self {
            url: String::new(),
            token: String::new(),
            index: None,
            source: Some("wia-security".to_string()),
            sourcetype: Some("wia:security:event".to_string()),
            verify_tls: true,
            timeout: Duration::from_secs(30),
        }
    }
}

/// Splunk HEC exporter
pub struct SplunkHecExporter {
    config: SplunkHecConfig,
}

impl SplunkHecExporter {
    /// Create a new Splunk HEC exporter
    pub fn new(config: SplunkHecConfig) -> Self {
        Self { config }
    }

    /// Send single event
    pub async fn send_event(&self, event: &WiaSecurityEvent) -> ExportResult<()> {
        let hec_event = self.to_hec_event(event);

        // In production, make HTTP request
        // POST {url}/services/collector/event
        // Headers: Authorization: Splunk {token}
        let _ = hec_event;
        Ok(())
    }

    /// Send batch of events
    pub async fn send_batch(&self, events: &[WiaSecurityEvent]) -> ExportResult<BatchExportResult> {
        let mut success_count = 0;
        let mut failed_count = 0;

        for event in events {
            match self.send_event(event).await {
                Ok(_) => success_count += 1,
                Err(_) => failed_count += 1,
            }
        }

        Ok(BatchExportResult {
            success_count,
            failed_count,
        })
    }

    fn to_hec_event(&self, event: &WiaSecurityEvent) -> serde_json::Value {
        let timestamp = chrono::DateTime::parse_from_rfc3339(&event.timestamp)
            .map(|dt| dt.timestamp())
            .unwrap_or_else(|_| chrono::Utc::now().timestamp());

        serde_json::json!({
            "time": timestamp,
            "host": event.context.as_ref()
                .and_then(|c| c.host.as_ref())
                .and_then(|h| h.hostname.clone())
                .unwrap_or_else(|| "unknown".to_string()),
            "source": self.config.source,
            "sourcetype": self.config.sourcetype,
            "index": self.config.index,
            "event": {
                "id": event.id.to_string(),
                "type": event.event_type.to_string(),
                "severity": event.severity,
                "timestamp": event.timestamp,
                "source_type": format!("{:?}", event.source.source_type),
                "source_name": event.source.name,
                "data": event.data,
                "mitre": event.mitre,
            }
        })
    }
}

/// Batch export result
#[derive(Debug, Clone)]
pub struct BatchExportResult {
    pub success_count: usize,
    pub failed_count: usize,
}

// ============================================================================
// Elasticsearch Exporter
// ============================================================================

/// Elasticsearch configuration
#[derive(Debug, Clone)]
pub struct ElasticsearchConfig {
    pub url: String,
    pub api_key: Option<String>,
    pub username: Option<String>,
    pub password: Option<String>,
    pub index_prefix: String,
    pub verify_tls: bool,
    pub timeout: Duration,
}

impl Default for ElasticsearchConfig {
    fn default() -> Self {
        Self {
            url: "http://localhost:9200".to_string(),
            api_key: None,
            username: None,
            password: None,
            index_prefix: "wia-security".to_string(),
            verify_tls: true,
            timeout: Duration::from_secs(30),
        }
    }
}

/// Elasticsearch exporter
pub struct ElasticsearchExporter {
    config: ElasticsearchConfig,
}

impl ElasticsearchExporter {
    /// Create a new Elasticsearch exporter
    pub fn new(config: ElasticsearchConfig) -> Self {
        Self { config }
    }

    /// Index single event
    pub async fn index_event(&self, event: &WiaSecurityEvent) -> ExportResult<String> {
        let index_name = self.get_index_name(event);
        let doc = self.to_es_document(event);

        // In production, make HTTP request
        // PUT {url}/{index}/_doc/{id}
        let _ = doc;
        Ok(format!("{}/{}", index_name, event.id))
    }

    /// Bulk index events
    pub async fn bulk_index(&self, events: &[WiaSecurityEvent]) -> ExportResult<BulkIndexResult> {
        let mut actions = Vec::new();

        for event in events {
            let index_name = self.get_index_name(event);

            // Action line
            actions.push(serde_json::json!({
                "index": {
                    "_index": index_name,
                    "_id": event.id.to_string()
                }
            }));

            // Document line
            actions.push(self.to_es_document(event));
        }

        // In production, make HTTP request
        // POST {url}/_bulk
        // Body: NDJSON format

        Ok(BulkIndexResult {
            took_ms: 100,
            errors: false,
            items_indexed: events.len(),
        })
    }

    /// Search events
    pub async fn search(&self, query: EsSearchQuery) -> ExportResult<Vec<WiaSecurityEvent>> {
        // In production, make HTTP request
        // POST {url}/{index_prefix}-*/_search
        Ok(vec![])
    }

    fn get_index_name(&self, event: &WiaSecurityEvent) -> String {
        let date = chrono::DateTime::parse_from_rfc3339(&event.timestamp)
            .map(|dt| dt.format("%Y.%m.%d").to_string())
            .unwrap_or_else(|_| chrono::Utc::now().format("%Y.%m.%d").to_string());

        format!("{}-{}-{}", self.config.index_prefix, event.event_type, date)
    }

    fn to_es_document(&self, event: &WiaSecurityEvent) -> serde_json::Value {
        serde_json::json!({
            "@timestamp": event.timestamp,
            "event_id": event.id.to_string(),
            "event_type": event.event_type.to_string(),
            "severity": event.severity,
            "source": {
                "type": format!("{:?}", event.source.source_type),
                "name": event.source.name,
                "vendor": event.source.vendor,
            },
            "data": event.data,
            "context": event.context,
            "mitre": event.mitre,
            "meta": event.meta,
        })
    }
}

/// Bulk index result
#[derive(Debug, Clone)]
pub struct BulkIndexResult {
    pub took_ms: u64,
    pub errors: bool,
    pub items_indexed: usize,
}

/// Elasticsearch search query
#[derive(Debug, Clone, Default)]
pub struct EsSearchQuery {
    pub query_string: Option<String>,
    pub severity_min: Option<f64>,
    pub event_types: Option<Vec<String>>,
    pub time_from: Option<String>,
    pub time_to: Option<String>,
    pub size: Option<usize>,
}

// ============================================================================
// QRadar Exporter
// ============================================================================

/// QRadar configuration
#[derive(Debug, Clone)]
pub struct QRadarConfig {
    pub url: String,
    pub api_key: String,
    pub log_source_id: Option<String>,
}

/// QRadar exporter
pub struct QRadarExporter {
    config: QRadarConfig,
}

impl QRadarExporter {
    /// Create a new QRadar exporter
    pub fn new(config: QRadarConfig) -> Self {
        Self { config }
    }

    /// Send event as syslog
    pub async fn send_event(&self, event: &WiaSecurityEvent) -> ExportResult<()> {
        let syslog_msg = self.to_syslog(event);

        // In production, send via syslog or SIEM API
        let _ = syslog_msg;
        Ok(())
    }

    /// Create offense from event
    pub async fn create_offense(&self, event: &WiaSecurityEvent) -> ExportResult<String> {
        // In production, use QRadar API
        // POST {url}/api/siem/offenses
        Ok(format!("offense-{}", chrono::Utc::now().timestamp()))
    }

    fn to_syslog(&self, event: &WiaSecurityEvent) -> String {
        let severity = match event.severity as u8 {
            s if s >= 9 => 2,  // Critical
            s if s >= 7 => 3,  // Error
            s if s >= 4 => 4,  // Warning
            _ => 6,            // Informational
        };

        let facility = 1; // User-level messages
        let priority = facility * 8 + severity;

        format!(
            "<{}>1 {} {} wia-security - {} - {}",
            priority,
            event.timestamp,
            event.context.as_ref()
                .and_then(|c| c.host.as_ref())
                .and_then(|h| h.hostname.clone())
                .unwrap_or_else(|| "-".to_string()),
            event.id,
            serde_json::to_string(&event.data).unwrap_or_default()
        )
    }
}

// ============================================================================
// PDF Report Generator
// ============================================================================

/// PDF report configuration
#[derive(Debug, Clone)]
pub struct PdfReportConfig {
    pub title: String,
    pub company_name: Option<String>,
    pub logo_path: Option<String>,
    pub include_executive_summary: bool,
    pub include_technical_details: bool,
}

impl Default for PdfReportConfig {
    fn default() -> Self {
        Self {
            title: "Security Assessment Report".to_string(),
            company_name: None,
            logo_path: None,
            include_executive_summary: true,
            include_technical_details: true,
        }
    }
}

/// PDF report generator
pub struct PdfReportGenerator {
    config: PdfReportConfig,
}

impl PdfReportGenerator {
    /// Create a new PDF report generator
    pub fn new(config: PdfReportConfig) -> Self {
        Self { config }
    }

    /// Generate PDF report
    pub fn generate(&self, events: &[WiaSecurityEvent], output_path: &str) -> ExportResult<()> {
        let report_data = self.build_report_data(events);

        // In production, use a PDF library like printpdf or similar
        // Generate actual PDF with:
        // - Title page
        // - Executive summary
        // - Severity distribution chart
        // - Detailed findings
        // - Recommendations

        // Placeholder: write JSON summary
        let json = serde_json::to_string_pretty(&report_data)
            .map_err(|e| ExportError::SerializationError(e.to_string()))?;

        std::fs::write(output_path, json)
            .map_err(|e| ExportError::IoError(e.to_string()))?;

        Ok(())
    }

    fn build_report_data(&self, events: &[WiaSecurityEvent]) -> ReportData {
        let mut severity_counts = SeverityCounts::default();
        let mut findings_by_type: HashMap<String, usize> = HashMap::new();

        for event in events {
            if event.severity >= 9.0 {
                severity_counts.critical += 1;
            } else if event.severity >= 7.0 {
                severity_counts.high += 1;
            } else if event.severity >= 4.0 {
                severity_counts.medium += 1;
            } else if event.severity >= 1.0 {
                severity_counts.low += 1;
            } else {
                severity_counts.info += 1;
            }

            *findings_by_type.entry(event.event_type.to_string()).or_insert(0) += 1;
        }

        ReportData {
            title: self.config.title.clone(),
            company_name: self.config.company_name.clone(),
            generated_at: chrono::Utc::now().to_rfc3339(),
            total_findings: events.len(),
            severity_counts,
            findings_by_type,
            top_findings: events.iter()
                .filter(|e| e.severity >= 7.0)
                .take(10)
                .map(|e| FindingSummary {
                    id: e.id.to_string(),
                    title: e.data.get("title")
                        .and_then(|v| v.as_str())
                        .unwrap_or("Unknown")
                        .to_string(),
                    severity: e.severity,
                    event_type: e.event_type.to_string(),
                })
                .collect(),
        }
    }
}

/// Report data structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ReportData {
    pub title: String,
    pub company_name: Option<String>,
    pub generated_at: String,
    pub total_findings: usize,
    pub severity_counts: SeverityCounts,
    pub findings_by_type: HashMap<String, usize>,
    pub top_findings: Vec<FindingSummary>,
}

/// Severity counts
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct SeverityCounts {
    pub critical: usize,
    pub high: usize,
    pub medium: usize,
    pub low: usize,
    pub info: usize,
}

/// Finding summary
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FindingSummary {
    pub id: String,
    pub title: String,
    pub severity: f64,
    pub event_type: String,
}

// ============================================================================
// HTML Report Generator
// ============================================================================

/// HTML report generator
pub struct HtmlReportGenerator;

impl HtmlReportGenerator {
    /// Create a new HTML report generator
    pub fn new() -> Self {
        Self
    }

    /// Generate HTML report
    pub fn generate(&self, events: &[WiaSecurityEvent], output_path: &str) -> ExportResult<()> {
        let html = self.build_html(events);

        std::fs::write(output_path, html)
            .map_err(|e| ExportError::IoError(e.to_string()))?;

        Ok(())
    }

    fn build_html(&self, events: &[WiaSecurityEvent]) -> String {
        let critical = events.iter().filter(|e| e.severity >= 9.0).count();
        let high = events.iter().filter(|e| e.severity >= 7.0 && e.severity < 9.0).count();
        let medium = events.iter().filter(|e| e.severity >= 4.0 && e.severity < 7.0).count();
        let low = events.iter().filter(|e| e.severity >= 1.0 && e.severity < 4.0).count();

        format!(r#"<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WIA Security Report</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; }}
        h1 {{ color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }}
        .summary {{ display: flex; gap: 20px; margin: 20px 0; }}
        .card {{ padding: 20px; border-radius: 8px; color: white; min-width: 120px; text-align: center; }}
        .critical {{ background: #d32f2f; }}
        .high {{ background: #f57c00; }}
        .medium {{ background: #fbc02d; color: #333; }}
        .low {{ background: #388e3c; }}
        .card-count {{ font-size: 32px; font-weight: bold; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
        th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }}
        th {{ background: #f5f5f5; }}
        .severity-critical {{ color: #d32f2f; font-weight: bold; }}
        .severity-high {{ color: #f57c00; font-weight: bold; }}
        .severity-medium {{ color: #fbc02d; }}
        .severity-low {{ color: #388e3c; }}
    </style>
</head>
<body>
    <h1>WIA Security Assessment Report</h1>
    <p>Generated: {}</p>

    <h2>Executive Summary</h2>
    <div class="summary">
        <div class="card critical">
            <div class="card-count">{}</div>
            <div>Critical</div>
        </div>
        <div class="card high">
            <div class="card-count">{}</div>
            <div>High</div>
        </div>
        <div class="card medium">
            <div class="card-count">{}</div>
            <div>Medium</div>
        </div>
        <div class="card low">
            <div class="card-count">{}</div>
            <div>Low</div>
        </div>
    </div>

    <h2>Findings ({} total)</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Title</th>
                <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>
            {}
        </tbody>
    </table>
</body>
</html>"#,
            chrono::Utc::now().format("%Y-%m-%d %H:%M:%S UTC"),
            critical, high, medium, low,
            events.len(),
            events.iter()
                .take(100)
                .map(|e| {
                    let severity_class = if e.severity >= 9.0 { "severity-critical" }
                        else if e.severity >= 7.0 { "severity-high" }
                        else if e.severity >= 4.0 { "severity-medium" }
                        else { "severity-low" };

                    format!(
                        "<tr><td>{}</td><td>{}</td><td class=\"{}\">{:.1}</td><td>{}</td><td>{}</td></tr>",
                        &e.id.to_string()[..8],
                        e.event_type,
                        severity_class,
                        e.severity,
                        e.data.get("title").and_then(|v| v.as_str()).unwrap_or("N/A"),
                        e.timestamp
                    )
                })
                .collect::<Vec<_>>()
                .join("\n")
        )
    }
}

impl Default for HtmlReportGenerator {
    fn default() -> Self {
        Self::new()
    }
}

// ============================================================================
// Grafana Dashboard Exporter
// ============================================================================

/// Grafana dashboard configuration
#[derive(Debug, Clone)]
pub struct GrafanaConfig {
    pub url: String,
    pub api_key: String,
}

/// Grafana dashboard exporter
pub struct GrafanaExporter {
    config: GrafanaConfig,
}

impl GrafanaExporter {
    /// Create a new Grafana exporter
    pub fn new(config: GrafanaConfig) -> Self {
        Self { config }
    }

    /// Generate dashboard JSON
    pub fn generate_dashboard(&self) -> serde_json::Value {
        serde_json::json!({
            "dashboard": {
                "title": "WIA Security Dashboard",
                "tags": ["security", "wia", "monitoring"],
                "timezone": "browser",
                "schemaVersion": 38,
                "panels": [
                    {
                        "id": 1,
                        "title": "Severity Distribution",
                        "type": "piechart",
                        "gridPos": { "h": 8, "w": 8, "x": 0, "y": 0 },
                        "targets": [{
                            "expr": "sum by (severity) (wia_security_events_total)",
                            "legendFormat": "{{severity}}"
                        }],
                        "options": {
                            "legend": { "displayMode": "table", "placement": "right" }
                        }
                    },
                    {
                        "id": 2,
                        "title": "Events Over Time",
                        "type": "timeseries",
                        "gridPos": { "h": 8, "w": 16, "x": 8, "y": 0 },
                        "targets": [{
                            "expr": "sum(rate(wia_security_events_total[5m])) by (event_type)",
                            "legendFormat": "{{event_type}}"
                        }],
                        "options": {
                            "tooltip": { "mode": "multi" }
                        }
                    },
                    {
                        "id": 3,
                        "title": "Critical & High Severity Events",
                        "type": "table",
                        "gridPos": { "h": 10, "w": 24, "x": 0, "y": 8 },
                        "targets": [{
                            "expr": "wia_security_events{severity=~\"critical|high\"}",
                            "format": "table"
                        }],
                        "transformations": [{
                            "id": "organize",
                            "options": {
                                "excludeByName": {},
                                "indexByName": {
                                    "Time": 0,
                                    "event_id": 1,
                                    "severity": 2,
                                    "event_type": 3
                                }
                            }
                        }]
                    },
                    {
                        "id": 4,
                        "title": "Risk Score Gauge",
                        "type": "gauge",
                        "gridPos": { "h": 6, "w": 6, "x": 0, "y": 18 },
                        "targets": [{
                            "expr": "wia_security_risk_score"
                        }],
                        "options": {
                            "reduceOptions": { "calcs": ["lastNotNull"] },
                            "showThresholdLabels": false,
                            "showThresholdMarkers": true
                        },
                        "fieldConfig": {
                            "defaults": {
                                "min": 0,
                                "max": 10,
                                "thresholds": {
                                    "mode": "absolute",
                                    "steps": [
                                        { "color": "green", "value": null },
                                        { "color": "yellow", "value": 4 },
                                        { "color": "orange", "value": 7 },
                                        { "color": "red", "value": 9 }
                                    ]
                                }
                            }
                        }
                    },
                    {
                        "id": 5,
                        "title": "MITRE ATT&CK Techniques",
                        "type": "barchart",
                        "gridPos": { "h": 6, "w": 18, "x": 6, "y": 18 },
                        "targets": [{
                            "expr": "topk(10, sum by (technique) (wia_security_mitre_hits))",
                            "legendFormat": "{{technique}}"
                        }]
                    }
                ],
                "refresh": "30s",
                "time": { "from": "now-24h", "to": "now" }
            },
            "overwrite": true,
            "folderId": 0
        })
    }

    /// Upload dashboard to Grafana
    pub async fn upload_dashboard(&self) -> ExportResult<String> {
        let dashboard = self.generate_dashboard();

        // In production, make HTTP request
        // POST {url}/api/dashboards/db
        // Headers: Authorization: Bearer {api_key}

        let _ = dashboard;
        Ok("wia-security-dashboard".to_string())
    }

    /// Save dashboard to file
    pub fn save_dashboard(&self, output_path: &str) -> ExportResult<()> {
        let dashboard = self.generate_dashboard();
        let json = serde_json::to_string_pretty(&dashboard)
            .map_err(|e| ExportError::SerializationError(e.to_string()))?;

        std::fs::write(output_path, json)
            .map_err(|e| ExportError::IoError(e.to_string()))?;

        Ok(())
    }
}

// ============================================================================
// Factory Functions
// ============================================================================

/// Create Splunk HEC exporter
pub fn create_splunk_exporter(config: SplunkHecConfig) -> SplunkHecExporter {
    SplunkHecExporter::new(config)
}

/// Create Elasticsearch exporter
pub fn create_elasticsearch_exporter(config: ElasticsearchConfig) -> ElasticsearchExporter {
    ElasticsearchExporter::new(config)
}

/// Create QRadar exporter
pub fn create_qradar_exporter(config: QRadarConfig) -> QRadarExporter {
    QRadarExporter::new(config)
}

/// Create PDF report generator
pub fn create_pdf_report_generator(config: PdfReportConfig) -> PdfReportGenerator {
    PdfReportGenerator::new(config)
}

/// Create HTML report generator
pub fn create_html_report_generator() -> HtmlReportGenerator {
    HtmlReportGenerator::new()
}

/// Create Grafana exporter
pub fn create_grafana_exporter(config: GrafanaConfig) -> GrafanaExporter {
    GrafanaExporter::new(config)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::{Source, SourceType, EventType};

    #[test]
    fn test_grafana_dashboard_generation() {
        let config = GrafanaConfig {
            url: "http://localhost:3000".to_string(),
            api_key: "test".to_string(),
        };
        let exporter = GrafanaExporter::new(config);
        let dashboard = exporter.generate_dashboard();

        assert!(dashboard.get("dashboard").is_some());
        assert_eq!(
            dashboard["dashboard"]["title"].as_str(),
            Some("WIA Security Dashboard")
        );
    }

    #[test]
    fn test_html_report_generation() {
        let generator = HtmlReportGenerator::new();
        let events = vec![
            WiaSecurityEvent::new(
                EventType::Alert,
                Source::new(SourceType::Siem, "Test"),
                serde_json::json!({ "title": "Test Alert" }),
            )
        ];

        let html = generator.build_html(&events);
        assert!(html.contains("WIA Security"));
        assert!(html.contains("Test Alert"));
    }
}
