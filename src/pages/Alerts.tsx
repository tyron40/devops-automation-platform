import React, { useState } from 'react';
import { useAppStore } from '../store';
import Header from '../components/Header';
import AlertItem from '../components/AlertItem';
import { Bell, Filter, RefreshCw, Search, Calendar, ChevronDown } from 'lucide-react';

const Alerts: React.FC = () => {
  const { alerts, darkMode } = useAppStore();
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>('');
  
  const filteredAlerts = alerts
    .filter(alert => {
      if (filter === 'all') return true;
      if (filter === 'unacknowledged') return !alert.acknowledged;
      return alert.severity === filter;
    })
    .filter(alert => 
      searchTerm === '' || 
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(alert =>
      selectedSource === '' || alert.source === selectedSource
    );
  
  const handleRefresh = () => {
    alert('Refreshing alerts data');
  };

  const handleApplyFilters = () => {
    setIsFilterMenuOpen(false);
  };
  
  return (
    <div>
      <Header title="Alerts" />
      
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('unacknowledged')}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg ${
                filter === 'unacknowledged' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unacknowledged
            </button>
            <button 
              onClick={() => setFilter('critical')}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg ${
                filter === 'critical' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Critical
            </button>
            <button 
              onClick={() => setFilter('warning')}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg ${
                filter === 'warning' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Warning
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-9 pr-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full`}
              />
              <Search className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={handleRefresh}
              >
                <RefreshCw size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              <div className="relative">
                <button 
                  className={`flex items-center px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-700'} border rounded-lg text-sm`}
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                >
                  <Filter size={16} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  More Filters
                  <ChevronDown size={16} className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
                
                {isFilterMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg border z-10`}>
                    <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Filter by</h4>
                    </div>
                    <div className="p-3">
                      <div className="mb-3">
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Source</label>
                        <select 
                          className={`w-full border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md p-2 text-sm`}
                          value={selectedSource}
                          onChange={(e) => setSelectedSource(e.target.value)}
                        >
                          <option value="">All Sources</option>
                          <option value="Prometheus">Prometheus</option>
                          <option value="GitHub Actions">GitHub Actions</option>
                          <option value="Application Logs">Application Logs</option>
                          <option value="Kubernetes">Kubernetes</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Time Range</label>
                        <div className={`flex items-center border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white text-gray-600'} rounded-md p-2`}>
                          <Calendar size={16} className={darkMode ? 'text-gray-400' : 'text-gray-400'} />
                          <span className="text-sm ml-2">Last 24 hours</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button 
                          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                          onClick={handleApplyFilters}
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          <div className={`px-4 md:px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center">
              <Bell className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />
              <h3 className={`text-lg font-medium ml-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Alert History</h3>
            </div>
          </div>
          
          <div className="p-4 md:p-6">
            {filteredAlerts.length > 0 ? (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} size={48} />
                <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No alerts found</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No alerts match your current filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;