import { create } from 'zustand';
import { Pipeline, Infrastructure, Alert, Metric } from '../types';

interface AppState {
  pipelines: Pipeline[];
  infrastructures: Infrastructure[];
  alerts: Alert[];
  metrics: Record<string, Metric[]>;
  selectedPipeline: string | null;
  selectedInfrastructure: string | null;
  darkMode: boolean;
  
  // Actions
  setPipelines: (pipelines: Pipeline[]) => void;
  setInfrastructures: (infrastructures: Infrastructure[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  setMetrics: (metrics: Record<string, Metric[]>) => void;
  selectPipeline: (id: string | null) => void;
  selectInfrastructure: (id: string | null) => void;
  acknowledgeAlert: (id: string) => void;
  toggleDarkMode: () => void;
}

// Mock data
const mockPipelines: Pipeline[] = [
  {
    id: '1',
    name: 'Frontend CI/CD',
    status: 'success',
    repository: 'organization/frontend',
    lastRun: '2025-04-10T14:30:00Z',
    duration: 245,
  },
  {
    id: '2',
    name: 'Backend API',
    status: 'running',
    repository: 'organization/backend-api',
    lastRun: '2025-04-10T15:45:00Z',
    duration: 178,
  },
  {
    id: '3',
    name: 'Data Processing',
    status: 'failed',
    repository: 'organization/data-processor',
    lastRun: '2025-04-10T12:15:00Z',
    duration: 320,
  },
  {
    id: '4',
    name: 'Mobile App Build',
    status: 'pending',
    repository: 'organization/mobile-app',
    lastRun: '2025-04-10T16:00:00Z',
    duration: 0,
  },
  {
    id: '5',
    name: 'Infrastructure Pipeline',
    status: 'success',
    repository: 'organization/infrastructure',
    lastRun: '2025-04-10T13:20:00Z',
    duration: 195,
  },
];

const mockInfrastructures: Infrastructure[] = [
  {
    id: '1',
    name: 'Production Cluster',
    provider: 'aws',
    resources: 24,
    status: 'active',
    lastUpdated: '2025-04-09T18:30:00Z',
  },
  {
    id: '2',
    name: 'Staging Environment',
    provider: 'gcp',
    resources: 12,
    status: 'updating',
    lastUpdated: '2025-04-10T10:15:00Z',
  },
  {
    id: '3',
    name: 'Development Resources',
    provider: 'azure',
    resources: 8,
    status: 'active',
    lastUpdated: '2025-04-08T14:45:00Z',
  },
  {
    id: '4',
    name: 'Testing Environment',
    provider: 'aws',
    resources: 6,
    status: 'active',
    lastUpdated: '2025-04-07T09:30:00Z',
  },
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    severity: 'critical',
    message: 'High CPU usage on production database',
    source: 'Prometheus',
    timestamp: '2025-04-10T16:32:00Z',
    acknowledged: false,
  },
  {
    id: '2',
    severity: 'warning',
    message: 'Memory usage above 80% on api-server-03',
    source: 'Prometheus',
    timestamp: '2025-04-10T15:47:00Z',
    acknowledged: false,
  },
  {
    id: '3',
    severity: 'info',
    message: 'New deployment completed for frontend',
    source: 'GitHub Actions',
    timestamp: '2025-04-10T14:35:00Z',
    acknowledged: true,
  },
  {
    id: '4',
    severity: 'warning',
    message: 'Disk space below 15% on storage-node-02',
    source: 'Prometheus',
    timestamp: '2025-04-10T12:22:00Z',
    acknowledged: false,
  },
  {
    id: '5',
    severity: 'critical',
    message: 'Database connection failures detected',
    source: 'Application Logs',
    timestamp: '2025-04-10T11:18:00Z',
    acknowledged: false,
  },
];

const generateMetricData = (baseValue: number, variance: number, count: number = 24): Metric[] => {
  return Array.from({ length: count }, (_, i) => ({
    name: 'Metric',
    value: baseValue + Math.random() * variance,
    timestamp: new Date(Date.now() - (count - 1 - i) * 3600000).toISOString(),
  }));
};

const mockMetrics: Record<string, Metric[]> = {
  'cpu': generateMetricData(30, 40),
  'memory': generateMetricData(50, 30),
  'requests': generateMetricData(100, 200),
  'latency': generateMetricData(20, 50),
  'errors': generateMetricData(5, 15),
  'throughput': generateMetricData(500, 300),
};

export const useAppStore = create<AppState>((set) => ({
  pipelines: mockPipelines,
  infrastructures: mockInfrastructures,
  alerts: mockAlerts,
  metrics: mockMetrics,
  selectedPipeline: null,
  selectedInfrastructure: null,
  darkMode: false,
  
  setPipelines: (pipelines) => set({ pipelines }),
  setInfrastructures: (infrastructures) => set({ infrastructures }),
  setAlerts: (alerts) => set({ alerts }),
  setMetrics: (metrics) => set({ metrics }),
  selectPipeline: (id) => set({ selectedPipeline: id }),
  selectInfrastructure: (id) => set({ selectedInfrastructure: id }),
  acknowledgeAlert: (id) => set((state) => ({
    alerts: state.alerts.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ),
  })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));