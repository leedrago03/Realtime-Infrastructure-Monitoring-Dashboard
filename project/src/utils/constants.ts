// API Configuration
export const PROMETHEUS_URL = import.meta.env.VITE_PROMETHEUS_URL || 'http://your-prometheus-server:9090';

// Polling intervals (in milliseconds)
export const METRICS_POLLING_INTERVAL = 15000; // Match Prometheus scrape interval

// Feature flags
export const USE_MOCK_DATA = import.meta.env.DEV; // Use mock data only in development