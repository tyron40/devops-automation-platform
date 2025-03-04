import React, { useState } from 'react';
import { useAppStore } from '../store';
import Header from '../components/Header';
import StatusBadge from '../components/StatusBadge';
import { Play, Pause, RefreshCw, Plus, GitBranch, Clock, Filter, Search } from 'lucide-react';

const Pipelines: React.FC = () => {
  const { pipelines, darkMode } = useAppStore();
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredPipelines = pipelines
    .filter(p => filter === 'all' || p.status === filter)
    .filter(p => 
      searchTerm === '' || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.repository.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const handleRunPipeline = (id: string) => {
    alert(`Running pipeline ${id}`);
  };

  const handlePausePipeline = (id: string) => {
    alert(`Pausing pipeline ${id}`);
  };

  const handleRefreshPipeline = (id: string) => {
    alert(`Refreshing pipeline ${id}`);
  };

  const handleNewPipeline = () => {
    alert('Creating new pipeline');
  };
  
  return (
    <div>
      <Header title="CI/CD Pipelines" />
      
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
              onClick={() => setFilter('running')}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg ${
                filter === 'running' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Running
            </button>
            <button 
              onClick={() => setFilter('success')}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg ${
                filter === 'success' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Successful
            </button>
            <button 
              onClick={() => setFilter('failed')}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg ${
                filter === 'failed' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Failed
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pipelines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-9 pr-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full`}
              />
              <Search className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
            </div>
            <button 
              onClick={handleNewPipeline}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" />
              New Pipeline
            </button>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th scope="col" className={`px-4 md:px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Pipeline
                  </th>
                  <th scope="col" className={`px-4 md:px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider hidden sm:table-cell`}>
                    Repository
                  </th>
                  <th scope="col" className={`px-4 md:px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Status
                  </th>
                  <th scope="col" className={`px-4 md:px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider hidden md:table-cell`}>
                    Last Run
                  </th>
                  <th scope="col" className={`px-4 md:px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider hidden lg:table-cell`}>
                    Duration
                  </th>
                  <th scope="col" className={`px-4 md:px-6 py-3 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'bg-gray-800 divide-y divide-gray-700' : 'bg-white divide-y divide-gray-200'}`}>
                {filteredPipelines.length > 0 ? (
                  filteredPipelines.map((pipeline) => (
                    <tr key={pipeline.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pipeline.name}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} sm:hidden`}>{pipeline.repository}</div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <GitBranch size={16} className={`mr-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          {pipeline.repository}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={pipeline.status} />
                      </td>
                      <td className={`px-4 md:px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} hidden md:table-cell`}>
                        <div className="flex items-center">
                          <Clock size={16} className={`mr-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          {new Date(pipeline.lastRun).toLocaleString()}
                        </div>
                      </td>
                      <td className={`px-4 md:px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} hidden lg:table-cell`}>
                        {pipeline.duration > 0 ? `${pipeline.duration}s` : '-'}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {pipeline.status === 'running' ? (
                            <button 
                              className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                              onClick={() => handlePausePipeline(pipeline.id)}
                            >
                              <Pause size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                            </button>
                          ) : (
                            <button 
                              className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                              onClick={() => handleRunPipeline(pipeline.id)}
                            >
                              <Play size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                            </button>
                          )}
                          <button 
                            className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                            onClick={() => handleRefreshPipeline(pipeline.id)}
                          >
                            <RefreshCw size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={`px-6 py-10 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No pipelines found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipelines;