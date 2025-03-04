import React, { useState } from 'react';
import { useAppStore } from '../store';
import Header from '../components/Header';
import MetricsChart from '../components/MetricsChart';
import { LineChart, Activity, Clock, RefreshCw, Filter, ChevronDown } from 'lucide-react';

const Monitoring: React.FC = () => {
  const { metrics, darkMode } = useAppStore();
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['cpu', 'memory', 'requests']);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExecuteQuery = () => {
    alert('Executing Prometheus query');
  };

  return (
    <div>
      <Header title="Monitoring" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mr-4`}>Metrics</h2>
            <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Clock size={16} className="mr-1" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Time Range:</span>
              <div className="relative">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className={`appearance-none border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md text-sm p-1.5 pr-8`}
                >
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                </select>
                <ChevronDown size={14} className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
            
            <button 
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${isRefreshing ? 'animate-spin' : ''}`}
              onClick={handleRefresh}
            >
              <RefreshCw size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            
            <div className="relative">
              <button 
                className={`flex items-center px-3 py-1.5 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-700'} border rounded-lg text-sm`}
              >
                <Filter size={16} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                Filter
                <ChevronDown size={14} className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
        </div>
        
        {/* System Metrics */}
        <div className="mb-8">
          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>System Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricsChart 
              data={metrics.cpu} 
              title="CPU Usage (%)" 
              color="#3b82f6" 
            />
            <MetricsChart 
              data={metrics.memory} 
              title="Memory Usage (%)" 
              color="#8b5cf6" 
            />
            <MetricsChart 
              data={metrics.requests} 
              title="Requests/sec" 
              color="#10b981" 
            />
          </div>
        </div>
        
        {/* Application Metrics */}
        <div className="mb-8">
          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Application Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
              <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Response Time (ms)</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <LineChart className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} size={48} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Response time metrics would appear here</p>
                </div>
              </div>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
              <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Error Rate (%)</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Activity className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} size={48} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Error rate metrics would appear here</p>
                </div>
              </div>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
              <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Throughput (req/s)</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Activity className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} size={48} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Throughput metrics would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Prometheus Query */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Prometheus Query</h3>
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Enter PromQL query..."
                className={`flex-1 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                defaultValue="rate(http_requests_total[5m])"
              />
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                onClick={handleExecuteQuery}
              >
                Execute
              </button>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border`}>
            <pre className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
{`# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{code="200",handler="api",method="get"} 1021
http_requests_total{code="200",handler="api",method="post"} 342
http_requests_total{code="404",handler="api",method="get"} 12
http_requests_total{code="500",handler="api",method="post"} 4`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;