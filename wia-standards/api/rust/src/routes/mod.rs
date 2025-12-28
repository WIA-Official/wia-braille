//! WIA Grand Challenges - API Routes
//! 홍익인간 (弘益人間) - Benefit All Humanity

use axum::{
    routing::{get, post},
    Router,
};

use crate::handlers;
use crate::AppState;

pub fn create_router(state: AppState) -> Router {
    Router::new()
        // Health check
        .route("/health", get(handlers::health_check))

        // Life Sciences APIs
        .route("/api/v1/aging/assess", post(handlers::assess_aging))
        .route("/api/v1/alzheimers/assess", post(handlers::assess_alzheimers))
        .route("/api/v1/alzheimers/glymphatic/:patient_id", get(handlers::get_glymphatic_status))
        .route("/api/v1/rare-diseases/diagnose", post(handlers::diagnose_rare_disease))

        // Sensory & Mobility APIs
        .route("/api/v1/hearing-loss/assess", post(handlers::assess_hearing))
        .route("/api/v1/vision-loss/assess", post(handlers::assess_vision))
        .route("/api/v1/sci/assess", post(handlers::assess_spinal_cord_injury))

        // Society APIs
        .route("/api/v1/refugee/register", post(handlers::register_refugee))
        .route("/api/v1/trauma/assess", post(handlers::assess_trauma))
        .route("/api/v1/grief/assess", post(handlers::assess_grief))

        // Add state
        .with_state(state)
}
