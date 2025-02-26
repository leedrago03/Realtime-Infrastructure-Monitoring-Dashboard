# Infrastructure Monitoring Dashboard

A real-time infrastructure monitoring dashboard built with React and Prometheus, designed for microservices architecture.

![Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000)

## Features

- 📊 Real-time system metrics monitoring
- 🔄 Container-level performance tracking
- 📈 Interactive metric visualizations
- 🚀 Microservices-ready architecture
- 🔐 Secure metric collection
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

### Backend & Infrastructure
- Prometheus for metrics collection and storage
- Node Exporter for host metrics
- cAdvisor for container metrics
- Nginx as reverse proxy
- Docker & Docker Compose for containerization

## Prerequisites

- Docker and Docker Compose
- Node.js 18 or higher
- A running Prometheus instance
- Microservices with `/metrics` endpoints

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/infrastructure-monitoring-dashboard.git
   cd infrastructure-monitoring-dashboard
   ```

2. Configure Prometheus:
   - Update `prometheus/prometheus.yml` with your service endpoints
   ```yaml
   scrape_configs:
     - job_name: 'microservices'
       metrics_path: '/metrics'
       static_configs:
         - targets:
           - 'service1:8080'
           - 'service2:8080'
   ```

3. Set environment variables:
   ```bash
   cp .env.example .env
   ```
   Update `VITE_PROMETHEUS_URL` in `.env` with your Prometheus server URL.

4. Start the services:
   ```bash
   docker-compose up -d
   ```

5. Access the dashboard:
   ```
   http://localhost:3000
   ```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Your Services │     │  Node Exporter  │     │    cAdvisor     │
│  (/metrics)     │     │  (Host Metrics) │     │(Container Stats)│
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                        │
         ▼                       ▼                        ▼
┌──────────────────────────────────────────────────────────────────┐
│                          Prometheus                               │
│                    (Metrics Collection & Storage)                 │
└────────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                            Nginx                                  │
│                       (Reverse Proxy)                            │
└────────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                        React Frontend                             │
│                   (Metrics Visualization)                         │
└──────────────────────────────────────────────────────────────────┘
```

## Monitoring Your Services

1. Ensure your services expose metrics on `/metrics` endpoint
2. Add service endpoints to `prometheus.yml`
3. Restart Prometheus container:
   ```bash
   docker-compose restart prometheus
   ```

## Available Metrics

### System Metrics
- CPU Usage
- Memory Utilization
- Disk I/O
- Network Traffic
- Disk Space

### Container Metrics
- Container CPU Usage
- Container Memory Usage
- Container Status
- Restart Count

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- [Prometheus](https://prometheus.io/) for the powerful monitoring system
- [React](https://reactjs.org/) for the frontend framework
- [Docker](https://www.docker.com/) for containerization# Realtime-Infrastructure-Monitoring-Dashboard
