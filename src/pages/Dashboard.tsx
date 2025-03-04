import React, { useState } from 'react';
import { useAppStore } from '../store';
import Header from '../components/Header';
import StatusBadge from '../components/StatusBadge';
import MetricsChart from '../components/MetricsChart';
import AlertItem from '../components/AlertItem';
import { 
  GitPullRequest, 
  Server, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  Calendar,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { 
    pipelines, 
    infrastructures, 
    alerts, 
    metrics,
    darkMode
  } = useAppStore();
  
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [refreshing, setRefreshing] = useState(false);
  
  const recentPipelines = pipelines.slice(0, 3);
  const recentAlerts = alerts.filter(a => !a.acknowledged).slice(0, 3);
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" />
      
      <div className="p-4 md:p-6">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>DevOps Dashboard</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Overview of your infrastructure and deployments</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`flex items-center space-x-1 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded-lg px-3 py-1.5 text-sm`}>
                <Calendar size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className={`appearance-none bg-transparent pr-8 focus:outline-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
                <ChevronDown size={14} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} absolute right-3`} />
              </div>
            </div>
            <button 
              onClick={handleRefresh}
              className={`p-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded-lg ${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 md:p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base md:text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Pipelines</h3>
              <GitPullRequest className="text-blue-500" size={24} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pipelines.length}</p>
                <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Pipelines</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 dark:text-green-400 font-medium text-sm md:text-base">
                  {pipelines.filter(p => p.status === 'success').length} Successful
                </p>
                <p className="text-red-600 dark:text-red-400 font-medium text-sm md:text-base">
                  {pipelines.filter(p => p.status === 'failed').length} Failed
                </p>
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 md:p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base md:text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Infrastructure</h3>
              <Server className="text-purple-500" size={24} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{infrastructures.length}</p>
                <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Environments</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 dark:text-green-400 font-medium text-sm md:text-base">
                  {infrastructures.filter(i => i.status === 'active').length} Active
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm md:text-base">
                  {infrastructures.filter(i => i.status === 'updating').length} Updating
                </p>
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 md:p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base md:text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Alerts</h3>
              <AlertTriangle className="text-yellow-500" size={24} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{alerts.filter(a => !a.acknowledged).length}</p>
                <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Alerts</p>
              </div>
              <div className="text-right">
                <p className="text-red-600 dark:text-red-400 font-medium text-sm md:text-base">
                  {alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length} Critical
                </p>
                <p className="text-yellow-600 dark:text-yellow-400 font-medium text-sm md:text-base">
                  {alerts.filter(a => a.severity === 'warning' && !a.acknowledged).length} Warning
                </p>
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 md:p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base md:text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Deployment Time</h3>
              <Clock className="text-green-500" size={24} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>14.5 min</p>
                <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Deployment</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 dark:text-green-400 font-medium text-sm md:text-base">↓ 12%</p>
                <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>vs Last Week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow mb-6 md:mb-8">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-0">Performance Insights</h3>
              <div className="flex items-center space-x-2 text-blue-100">
                <TrendingUp size={18} />
                <span className="text-sm">Last 30 days</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100 text-sm">Deployment Frequency</span>
                  <Zap className="text-yellow-300" size={18} />
                </div>
                <p className="text-2xl font-bold text-white">4.2/day</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-300 text-sm">↑ 18%</span>
                  <span className="text-blue-100 text-xs ml-2">vs. last month</span>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100 text-sm">Lead Time</span>
                  <Clock className="text-yellow-300" size={18} />
                </div>
                <p className="text-2xl font-bold text-white">3.5 hours</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-300 text-sm">↓ 22%</span>
                  <span className="text-blue-100 text-xs ml-2">vs. last month</span>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100 text-sm">Team Velocity</span>
                  <Users className="text-yellow-300" size={18} />
                </div>
                <p className="text-2xl font-bold text-white">87 points</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-300 text-sm">↑ 12%</span>
                  <span className="text-blue-100 text-xs ml-2">vs. last sprint</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Metrics Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <MetricsChart 
            data={metrics.cpu} 
            title="CPU Usage (%)" 
            color="#3b82f6" 
            type="area"
            showGradient={true}
          />
          <MetricsChart 
            data={metrics.memory} 
            title="Memory Usage (%)" 
            color="#8b5cf6" 
            type="area"
            showGradient={true}
          />
          <MetricsChart 
            data={metrics.requests} 
            title="Requests/sec" 
            color="#10b981" 
          />
        </div>
        
        {/* Recent Pipelines & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
            <div className={`flex items-center justify-between px-4 md:px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-base md:text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Pipelines</h3>
              <Link to="/pipelines" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {recentPipelines.map((pipeline) => (
                  <div key={pipeline.id} className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pipeline.name}</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pipeline.repository}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(pipeline.lastRun).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pipeline.duration}s</p>
                      </div>
                      <StatusBadge status={pipeline.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Alerts */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
            <div className={`flex items-center justify-between px-4 md:px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-base md:text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Alerts</h3>
              <Link to="/alerts" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="p-4 md:p-6">
              {recentAlerts.length > 0 ? (
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>
              ) : (
                <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No unacknowledged alerts</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;