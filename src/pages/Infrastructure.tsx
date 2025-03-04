import React, { useState } from 'react';
import { useAppStore } from '../store';
import Header from '../components/Header';
import StatusBadge from '../components/StatusBadge';
import CodeEditor from '../components/CodeEditor';
import { Server, Cloud, Database, Globe, Plus, RefreshCw, Search, Filter } from 'lucide-react';

const Infrastructure: React.FC = () => {
  const { infrastructures, darkMode } = useAppStore();
  const [selectedInfra, setSelectedInfra] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  
  const filteredInfrastructures = infrastructures
    .filter(infra => 
      searchTerm === '' || 
      infra.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(infra => 
      filterProvider === 'all' || 
      infra.provider === filterProvider
    );
  
  const selectedInfraData = infrastructures.find(i => i.id === selectedInfra);
  
  const terraformCode = `# Terraform configuration for ${selectedInfraData?.name || 'selected infrastructure'}

provider "aws" {
  region = "us-west-2"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "${selectedInfraData?.name || 'example'}-vpc"
    Environment = "production"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "${selectedInfraData?.name || 'example'}-public-subnet"
  }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  
  tags = {
    Name = "${selectedInfraData?.name || 'example'}-web-server"
  }
}

output "instance_ip" {
  value = aws_instance.web.public_ip
}`;

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'aws':
        return <Cloud className="text-orange-500" size={20} />;
      case 'gcp':
        return <Cloud className="text-blue-500" size={20} />;
      case 'azure':
        return <Cloud className="text-blue-700" size={20} />;
      default:
        return <Cloud className="text-gray-500" size={20} />;
    }
  };

  const handleApply = () => {
    alert(`Applying Terraform configuration for ${selectedInfraData?.name}`);
  };

  const handleRefresh = () => {
    alert(`Refreshing infrastructure data for ${selectedInfraData?.name}`);
  };

  const handleNewEnvironment = () => {
    alert('Creating new environment');
  };

  return (
    <div>
      <Header title="Infrastructure" />
      
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Environments</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search environments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-9 pr-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full`}
              />
              <Search className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className={`pl-3 pr-8 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="all">All Providers</option>
                <option value="aws">AWS</option>
                <option value="gcp">GCP</option>
                <option value="azure">Azure</option>
              </select>
              
              <button 
                onClick={handleNewEnvironment}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center whitespace-nowrap hover:bg-blue-700"
              >
                <Plus size={16} className="mr-2" />
                New Environment
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Infrastructure List */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
              <div className={`px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b`}>
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Infrastructure Resources</h3>
              </div>
              <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'} max-h-[calc(100vh-240px)] overflow-y-auto`}>
                {filteredInfrastructures.length > 0 ? (
                  filteredInfrastructures.map((infra) => (
                    <div 
                      key={infra.id}
                      onClick={() => setSelectedInfra(infra.id)}
                      className={`px-4 py-3 cursor-pointer ${
                        selectedInfra === infra.id 
                          ? darkMode ? 'bg-blue-900/30' : 'bg-blue-50' 
                          : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getProviderIcon(infra.provider)}
                          <span className={`ml-3 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{infra.name}</span>
                        </div>
                        <StatusBadge status={infra.status} />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {infra.provider.toUpperCase()} • {infra.resources} resources
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          Updated {new Date(infra.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`px-4 py-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No environments found matching your criteria
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Infrastructure Details */}
          <div className="lg:col-span-2">
            {selectedInfra ? (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
                <div className={`px-4 md:px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedInfraData?.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleApply}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Apply
                      </button>
                      <button 
                        onClick={handleRefresh}
                        className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <RefreshCw size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <div className="flex items-center">
                        <Server className="text-blue-500 mr-2" size={20} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Resources</span>
                      </div>
                      <p className={`mt-2 text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedInfraData?.resources}</p>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <div className="flex items-center">
                        <Database className="text-green-500 mr-2" size={20} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Provider</span>
                      </div>
                      <p className={`mt-2 text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedInfraData?.provider.toUpperCase()}</p>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <div className="flex items-center">
                        <Globe className="text-purple-500 mr-2" size={20} />
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Region</span>
                      </div>
                      <p className={`mt-2 text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>us-west-2</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Terraform Configuration</h4>
                    <CodeEditor 
                      initialCode={terraformCode}
                      language="HCL (Terraform)"
                      onSave={(code) => alert('Configuration saved')}
                    />
                  </div>
                  
                  <div>
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Resource Graph</h4>
                    <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-64 flex items-center justify-center`}>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Resource visualization graph would appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 flex items-center justify-center h-full`}>
                <div className="text-center">
                  <Server className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} size={48} />
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No Infrastructure Selected</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Select an environment from the list to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;