# DevOps Automation Platform

A modern, full-featured DevOps automation platform that integrates CI/CD pipeline management, infrastructure as code, and monitoring capabilities into a unified dashboard.

![DevOps Platform Dashboard](https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80)

## Features

### 🚀 CI/CD Pipeline Management
- Visual pipeline management dashboard
- Real-time status tracking (running, successful, failed, pending)
- GitHub Actions integration
- Pipeline execution metrics and analytics
- One-click pipeline execution and monitoring

### 🏗️ Infrastructure as Code
- Terraform configuration management
- Multi-cloud support:
  - Amazon Web Services (AWS)
  - Google Cloud Platform (GCP)
  - Microsoft Azure
- Infrastructure resource tracking
- Real-time deployment status
- Visual resource dependency graphs

### 📊 Monitoring & Observability
- Real-time metrics visualization
- System performance monitoring:
  - CPU usage
  - Memory utilization
  - Request rates
- Prometheus integration
- Custom metrics query interface
- Configurable alert thresholds

### ⚡ Terminal Interface
- Interactive command-line interface
- Integrated Terraform command execution
- Prometheus query execution
- GitHub Actions workflow management
- Real-time command output

### 🔔 Alert Management
- Multi-severity alert levels (Critical, Warning, Info)
- Real-time alert notifications
- Alert acknowledgment system
- Historical alert tracking
- Source-based filtering

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Router**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/devops-automation-platform.git
   cd devops-automation-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
devops-automation-platform/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── store/            # Zustand store configurations
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── package.json        # Project dependencies and scripts
```

## Key Components

### Dashboard
The main dashboard provides a comprehensive overview of your DevOps infrastructure, including:
- Pipeline status summary
- Infrastructure health metrics
- Recent alerts
- System performance graphs

### Pipeline Management
Manage and monitor CI/CD pipelines with features like:
- Pipeline execution control
- Status monitoring
- Performance metrics
- Build logs

### Infrastructure Management
Manage your infrastructure as code with:
- Terraform configuration editor
- Multi-cloud resource management
- Deployment status tracking
- Resource visualization

### Monitoring
Monitor your systems with:
- Real-time performance metrics
- Custom Prometheus queries
- Alert management
- Historical data analysis

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_GITHUB_TOKEN=your_github_token
```

### Terraform Configuration
Update the Terraform provider configuration in the infrastructure management section according to your cloud provider credentials.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite team for the blazing fast build tool
- All contributors who have helped shape this project
