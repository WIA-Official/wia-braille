//! WIA Grand Challenges API Server
//! 홍익인간 (弘益人間) - Benefit All Humanity
//!
//! 33개 인류 난제 해결을 위한 통합 API 서버 (Axum 기반)

use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod handlers;
mod models;
mod routes;

#[derive(Clone)]
pub struct AppState {
    pub version: String,
    pub philosophy: String,
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "wia_grand_challenges=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Initialize application state
    let state = AppState {
        version: "1.0.0".to_string(),
        philosophy: "홍익인간 (弘益人間) - Benefit All Humanity".to_string(),
    };

    // CORS configuration
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Create router with middleware
    let app = routes::create_router(state)
        .layer(cors)
        .layer(TraceLayer::new_for_http());

    // Start server
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    tracing::info!("🚀 WIA Grand Challenges API Server starting on {}", addr);
    tracing::info!("📖 Philosophy: 홍익인간 (弘益人間) - Benefit All Humanity");
    tracing::info!("🎯 33 Grand Challenges for Humanity");

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
