//! Cloud Security Integration
//!
//! AWS Security Hub, Azure Sentinel, GCP Security Command Center

use crate::types::{WiaSecurityEvent, EventType};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// ============================================================================
// Types
// ============================================================================

/// Cloud security configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CloudSecurityConfig {
    pub region: Option<String>,
    pub credentials: Option<CloudCredentials>,
}

/// Cloud credentials
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CloudCredentials {
    pub access_key_id: Option<String>,
    pub secret_access_key: Option<String>,
    pub session_token: Option<String>,
    pub tenant_id: Option<String>,
    pub client_id: Option<String>,
    pub client_secret: Option<String>,
}

/// Cloud finding representation
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CloudFinding {
    pub id: String,
    pub title: String,
    pub description: String,
    pub severity: CloudSeverity,
    pub finding_type: String,
    pub resource_type: Option<String>,
    pub resource_id: Option<String>,
    pub created_at: String,
    pub updated_at: String,
    pub status: CloudFindingStatus,
}

/// Cloud severity levels
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum CloudSeverity {
    Informational,
    Low,
    Medium,
    High,
    Critical,
}

impl CloudSeverity {
    pub fn from_score(score: f64) -> Self {
        if score >= 9.0 {
            Self::Critical
        } else if score >= 7.0 {
            Self::High
        } else if score >= 4.0 {
            Self::Medium
        } else if score >= 1.0 {
            Self::Low
        } else {
            Self::Informational
        }
    }
}

/// Cloud finding status
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum CloudFindingStatus {
    New,
    Active,
    Resolved,
    Suppressed,
}

/// Result type for cloud operations
pub type CloudResult<T> = Result<T, CloudError>;

/// Cloud integration error
#[derive(Debug)]
pub enum CloudError {
    Authentication(String),
    ApiError { status: u16, message: String },
    SerializationError(String),
    NetworkError(String),
    NotFound(String),
}

impl std::fmt::Display for CloudError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Authentication(msg) => write!(f, "Authentication error: {}", msg),
            Self::ApiError { status, message } => write!(f, "API error ({}): {}", status, message),
            Self::SerializationError(msg) => write!(f, "Serialization error: {}", msg),
            Self::NetworkError(msg) => write!(f, "Network error: {}", msg),
            Self::NotFound(msg) => write!(f, "Not found: {}", msg),
        }
    }
}

impl std::error::Error for CloudError {}

// ============================================================================
// AWS Security Hub
// ============================================================================

/// AWS Security Hub configuration
#[derive(Debug, Clone)]
pub struct AwsSecurityHubConfig {
    pub account_id: String,
    pub region: String,
    pub credentials: Option<CloudCredentials>,
}

/// AWS Security Hub client
pub struct AwsSecurityHubClient {
    config: AwsSecurityHubConfig,
    endpoint: String,
}

impl AwsSecurityHubClient {
    /// Create a new AWS Security Hub client
    pub fn new(config: AwsSecurityHubConfig) -> Self {
        let endpoint = format!("https://securityhub.{}.amazonaws.com", config.region);
        Self { config, endpoint }
    }

    /// Import finding from WIA Security event
    pub async fn import_finding(&self, event: &WiaSecurityEvent) -> CloudResult<String> {
        let finding = self.to_aws_finding(event);
        let finding_id = finding.get("Id")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string();

        // In production, use AWS SDK
        // aws_sdk_securityhub::Client::batch_import_findings()

        Ok(finding_id)
    }

    /// Batch import findings
    pub async fn batch_import_findings(&self, events: &[WiaSecurityEvent]) -> CloudResult<BatchImportResult> {
        let findings: Vec<_> = events.iter().map(|e| self.to_aws_finding(e)).collect();

        // In production, use AWS SDK
        Ok(BatchImportResult {
            success_count: findings.len(),
            failed_count: 0,
        })
    }

    /// Get findings with filters
    pub async fn get_findings(&self, filters: AwsFindingFilters) -> CloudResult<Vec<CloudFinding>> {
        // In production, use AWS SDK
        Ok(vec![])
    }

    /// Update finding status
    pub async fn update_finding(
        &self,
        finding_id: &str,
        product_arn: &str,
        updates: AwsFindingUpdate,
    ) -> CloudResult<()> {
        // In production, use AWS SDK
        Ok(())
    }

    fn to_aws_finding(&self, event: &WiaSecurityEvent) -> serde_json::Value {
        let now = Utc::now().format("%Y-%m-%dT%H:%M:%S%.3fZ").to_string();
        let product_arn = format!(
            "arn:aws:securityhub:{}:{}:product/{}/wia-security",
            self.config.region, self.config.account_id, self.config.account_id
        );

        serde_json::json!({
            "SchemaVersion": "2018-10-08",
            "Id": event.id.to_string(),
            "ProductArn": product_arn,
            "GeneratorId": "wia-security",
            "AwsAccountId": self.config.account_id,
            "Types": [self.map_event_type(&event.event_type)],
            "CreatedAt": event.timestamp,
            "UpdatedAt": now,
            "Severity": {
                "Label": format!("{:?}", CloudSeverity::from_score(event.severity)).to_uppercase(),
                "Original": event.severity.to_string()
            },
            "Title": self.extract_title(event),
            "Description": self.extract_description(event),
            "Resources": self.extract_resources(event),
            "Workflow": {
                "Status": "NEW"
            },
            "RecordState": "ACTIVE"
        })
    }

    fn map_event_type(&self, event_type: &EventType) -> &'static str {
        match event_type {
            EventType::Alert => "Software and Configuration Checks/Vulnerabilities/CVE",
            EventType::ThreatIntel => "TTPs/Initial Access",
            EventType::Vulnerability => "Software and Configuration Checks/Vulnerabilities/CVE",
            EventType::Incident => "Unusual Behaviors/VM/Intrusion",
            EventType::NetworkEvent => "Effects/Network Effects",
            EventType::EndpointEvent => "Unusual Behaviors/Process",
            EventType::AuthEvent => "Sensitive Data Identifications/Authentication",
        }
    }

    fn extract_title(&self, event: &WiaSecurityEvent) -> String {
        event.data.get("title")
            .and_then(|v| v.as_str())
            .unwrap_or("WIA Security Event")
            .chars()
            .take(256)
            .collect()
    }

    fn extract_description(&self, event: &WiaSecurityEvent) -> String {
        event.data.get("description")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string()
    }

    fn extract_resources(&self, event: &WiaSecurityEvent) -> Vec<serde_json::Value> {
        let mut resources = vec![];

        if let Some(context) = &event.context {
            if let Some(host) = &context.host {
                let id = host.hostname.clone()
                    .or_else(|| host.ip.as_ref().and_then(|ips| ips.first().cloned()))
                    .unwrap_or_else(|| "unknown".to_string());

                resources.push(serde_json::json!({
                    "Type": "AwsEc2Instance",
                    "Id": id,
                    "Details": {
                        "Other": {
                            "hostname": host.hostname,
                            "ip": host.ip.as_ref().map(|ips| ips.join(","))
                        }
                    }
                }));
            }
        }

        if resources.is_empty() {
            resources.push(serde_json::json!({
                "Type": "Other",
                "Id": event.id.to_string()
            }));
        }

        resources
    }
}

/// AWS finding filters
#[derive(Debug, Clone, Default)]
pub struct AwsFindingFilters {
    pub severity_labels: Option<Vec<String>>,
    pub types: Option<Vec<String>>,
    pub resource_types: Option<Vec<String>>,
    pub max_results: Option<usize>,
}

/// AWS finding update
#[derive(Debug, Clone, Default)]
pub struct AwsFindingUpdate {
    pub note: Option<String>,
    pub severity: Option<String>,
    pub status: Option<String>,
}

/// Batch import result
#[derive(Debug, Clone)]
pub struct BatchImportResult {
    pub success_count: usize,
    pub failed_count: usize,
}

// ============================================================================
// Azure Sentinel
// ============================================================================

/// Azure Sentinel configuration
#[derive(Debug, Clone)]
pub struct AzureSentinelConfig {
    pub workspace_id: String,
    pub subscription_id: String,
    pub resource_group: String,
    pub tenant_id: String,
    pub client_id: String,
    pub client_secret: String,
}

/// Azure Sentinel client
pub struct AzureSentinelClient {
    config: AzureSentinelConfig,
    access_token: Option<String>,
    token_expiry: Option<chrono::DateTime<Utc>>,
}

impl AzureSentinelClient {
    /// Create a new Azure Sentinel client
    pub fn new(config: AzureSentinelConfig) -> Self {
        Self {
            config,
            access_token: None,
            token_expiry: None,
        }
    }

    /// Create incident from WIA Security event
    pub async fn create_incident(&mut self, event: &WiaSecurityEvent) -> CloudResult<String> {
        self.ensure_token().await?;

        let incident_id = format!("wia-{}", event.id);

        let _incident = serde_json::json!({
            "properties": {
                "title": self.extract_title(event),
                "description": self.extract_description(event),
                "severity": self.map_severity(event.severity),
                "status": "New",
                "labels": [
                    { "labelName": "wia-security" },
                    { "labelName": event.event_type.to_string() }
                ]
            }
        });

        // In production, make HTTP request to Azure API
        Ok(incident_id)
    }

    /// List incidents
    pub async fn list_incidents(&mut self, filters: AzureIncidentFilters) -> CloudResult<Vec<CloudFinding>> {
        self.ensure_token().await?;
        // In production, make HTTP request to Azure API
        Ok(vec![])
    }

    /// Update incident
    pub async fn update_incident(
        &mut self,
        incident_id: &str,
        updates: AzureIncidentUpdate,
    ) -> CloudResult<()> {
        self.ensure_token().await?;
        // In production, make HTTP request to Azure API
        Ok(())
    }

    /// Add comment to incident
    pub async fn add_incident_comment(
        &mut self,
        incident_id: &str,
        message: &str,
    ) -> CloudResult<()> {
        self.ensure_token().await?;
        // In production, make HTTP request to Azure API
        Ok(())
    }

    async fn ensure_token(&mut self) -> CloudResult<()> {
        if let (Some(token), Some(expiry)) = (&self.access_token, &self.token_expiry) {
            if expiry > &Utc::now() {
                return Ok(());
            }
        }

        // In production, get token from Azure AD
        // POST https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token
        self.access_token = Some("placeholder_token".to_string());
        self.token_expiry = Some(Utc::now() + chrono::Duration::hours(1));

        Ok(())
    }

    fn extract_title(&self, event: &WiaSecurityEvent) -> String {
        event.data.get("title")
            .and_then(|v| v.as_str())
            .unwrap_or("WIA Security Event")
            .chars()
            .take(256)
            .collect()
    }

    fn extract_description(&self, event: &WiaSecurityEvent) -> String {
        event.data.get("description")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string()
    }

    fn map_severity(&self, severity: f64) -> &'static str {
        if severity >= 9.0 {
            "High"
        } else if severity >= 6.0 {
            "Medium"
        } else if severity >= 3.0 {
            "Low"
        } else {
            "Informational"
        }
    }
}

/// Azure incident filters
#[derive(Debug, Clone, Default)]
pub struct AzureIncidentFilters {
    pub severity: Option<Vec<String>>,
    pub status: Option<Vec<String>>,
    pub top: Option<usize>,
}

/// Azure incident update
#[derive(Debug, Clone, Default)]
pub struct AzureIncidentUpdate {
    pub status: Option<String>,
    pub severity: Option<String>,
    pub owner: Option<String>,
    pub classification: Option<String>,
}

// ============================================================================
// GCP Security Command Center
// ============================================================================

/// GCP SCC configuration
#[derive(Debug, Clone)]
pub struct GcpSccConfig {
    pub project_id: String,
    pub organization_id: String,
    pub source_id: Option<String>,
}

/// GCP Security Command Center client
pub struct GcpSccClient {
    config: GcpSccConfig,
    access_token: Option<String>,
    token_expiry: Option<chrono::DateTime<Utc>>,
}

impl GcpSccClient {
    /// Create a new GCP SCC client
    pub fn new(config: GcpSccConfig) -> Self {
        Self {
            config,
            access_token: None,
            token_expiry: None,
        }
    }

    /// Create finding from WIA Security event
    pub async fn create_finding(&mut self, event: &WiaSecurityEvent) -> CloudResult<String> {
        self.ensure_token().await?;

        let source_id = self.config.source_id.as_deref().unwrap_or("wia-security");
        let finding_id = event.id.to_string().replace(|c: char| !c.is_alphanumeric() && c != '_' && c != '-', "_");
        let parent = format!("organizations/{}/sources/{}", self.config.organization_id, source_id);

        let _finding = serde_json::json!({
            "state": "ACTIVE",
            "category": event.event_type.to_string(),
            "severity": self.map_severity(event.severity),
            "eventTime": event.timestamp,
            "sourceProperties": {
                "wia_event_id": { "stringValue": event.id.to_string() },
                "wia_event_type": { "stringValue": event.event_type.to_string() }
            }
        });

        // In production, use GCP SDK
        Ok(format!("{}/findings/{}", parent, finding_id))
    }

    /// List findings
    pub async fn list_findings(&mut self, filters: GcpFindingFilters) -> CloudResult<Vec<CloudFinding>> {
        self.ensure_token().await?;
        // In production, use GCP SDK
        Ok(vec![])
    }

    /// Update finding state
    pub async fn update_finding_state(
        &mut self,
        finding_name: &str,
        state: &str,
    ) -> CloudResult<()> {
        self.ensure_token().await?;
        // In production, use GCP SDK
        Ok(())
    }

    /// Add security marks
    pub async fn add_security_marks(
        &mut self,
        finding_name: &str,
        marks: HashMap<String, String>,
    ) -> CloudResult<()> {
        self.ensure_token().await?;
        // In production, use GCP SDK
        Ok(())
    }

    async fn ensure_token(&mut self) -> CloudResult<()> {
        if let (Some(_token), Some(expiry)) = (&self.access_token, &self.token_expiry) {
            if expiry > &Utc::now() {
                return Ok(());
            }
        }

        // In production, get token from GCP metadata server or service account
        self.access_token = Some("placeholder_token".to_string());
        self.token_expiry = Some(Utc::now() + chrono::Duration::hours(1));

        Ok(())
    }

    fn map_severity(&self, severity: f64) -> &'static str {
        if severity >= 9.0 {
            "CRITICAL"
        } else if severity >= 7.0 {
            "HIGH"
        } else if severity >= 4.0 {
            "MEDIUM"
        } else {
            "LOW"
        }
    }
}

/// GCP finding filters
#[derive(Debug, Clone, Default)]
pub struct GcpFindingFilters {
    pub category: Option<String>,
    pub severity: Option<Vec<String>>,
    pub state: Option<String>,
    pub page_size: Option<usize>,
}

// ============================================================================
// Factory Functions
// ============================================================================

/// Create AWS Security Hub client
pub fn create_aws_security_hub_client(config: AwsSecurityHubConfig) -> AwsSecurityHubClient {
    AwsSecurityHubClient::new(config)
}

/// Create Azure Sentinel client
pub fn create_azure_sentinel_client(config: AzureSentinelConfig) -> AzureSentinelClient {
    AzureSentinelClient::new(config)
}

/// Create GCP SCC client
pub fn create_gcp_scc_client(config: GcpSccConfig) -> GcpSccClient {
    GcpSccClient::new(config)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cloud_severity_from_score() {
        assert_eq!(CloudSeverity::from_score(10.0), CloudSeverity::Critical);
        assert_eq!(CloudSeverity::from_score(8.0), CloudSeverity::High);
        assert_eq!(CloudSeverity::from_score(5.0), CloudSeverity::Medium);
        assert_eq!(CloudSeverity::from_score(2.0), CloudSeverity::Low);
        assert_eq!(CloudSeverity::from_score(0.0), CloudSeverity::Informational);
    }
}
