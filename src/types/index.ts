export interface Pipeline {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  repository: string;
  lastRun: string;
  duration: number;
}

export interface Infrastructure {
  id: string;
  name: string;
  provider: 'aws' | 'gcp' | 'azure';
  resources: number;
  status: 'active' | 'updating' | 'error';
  lastUpdated: string;
}

export interface Metric {
  name: string;
  value: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'viewer';
}