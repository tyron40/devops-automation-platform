import React, { useState } from 'react';
import Header from '../components/Header';
import { Save, User, Bell, Shield, Server, GitBranch } from 'lucide-react';
import { useAppStore } from '../store';

const Settings: React.FC = () => {
  const { darkMode } = useAppStore();
  const [activeTab, setActiveTab] = useState('user');
  const [fullName, setFullName] = useState('Admin User');
  const [email, setEmail] = useState('admin@example.com');
  const [role, setRole] = useState('admin');
  
  const handleSaveChanges = () => {
    alert('Settings saved successfully');
  };

  const handleRegenerateApiKey = () => {
    alert('API key regenerated');
  };

  return (
    <div>
      <Header title="Settings" />
      
      <div className="p-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Platform Settings</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="space-y-6">
                  <div 
                    className={`flex items-center p-3 rounded-lg ${
                      activeTab === 'user' 
                        ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    } cursor-pointer`}
                    onClick={() => setActiveTab('user')}
                  >
                    <User className={`${activeTab === 'user' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} size={20} />
                    <span className={`font-medium ${activeTab === 'user' ? 'text-blue-700 dark:text-blue-300' : darkMode ? 'text-gray-200' : 'text-gray-700'}`}>User Settings</span>
                  </div>
                  
                  <div 
                    className={`flex items-center p-3 rounded-lg ${
                      activeTab === 'notifications' 
                        ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    } cursor-pointer`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell className={`${activeTab === 'notifications' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} size={20} />
                    <span className={`font-medium ${activeTab === 'notifications' ? 'text-blue-700 dark:text-blue-300' : darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Notifications</span>
                  </div>
                  
                  <div 
                    className={`flex items-center p-3 rounded-lg ${
                      activeTab === 'security' 
                        ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    } cursor-pointer`}
                    onClick={() => setActiveTab('security')}
                  >
                    <Shield className={`${activeTab === 'security' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} size={20} />
                    <span className={`font-medium ${activeTab === 'security' ? 'text-blue-700 dark:text-blue-300' : darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Security</span>
                  </div>
                  
                  <div 
                    className={`flex items-center p-3 rounded-lg ${
                      activeTab === 'infrastructure' 
                        ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    } cursor-pointer`}
                    onClick={() => setActiveTab('infrastructure')}
                  >
                    <Server className={`${activeTab === 'infrastructure' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} size={20} />
                    <span className={`font-medium ${activeTab === 'infrastructure' ? 'text-blue-700 dark:text-blue-300' : darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Infrastructure</span>
                  </div>
                  
                  <div 
                    className={`flex items-center p-3 rounded-lg ${
                      activeTab === 'integrations' 
                        ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    } cursor-pointer`}
                    onClick={() => setActiveTab('integrations')}
                  >
                    <GitBranch className={`${activeTab === 'integrations' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} size={20} />
                    <span className={`font-medium ${activeTab === 'integrations' ? 'text-blue-700 dark:text-blue-300' : darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Integrations</span>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2">
                {activeTab === 'user' && (
                  <>
                    <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>User Settings</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Role
                        </label>
                        <select
                          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="admin">Administrator</option>
                          <option value="developer">Developer</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          API Key
                        </label>
                        <div className="flex">
                          <input
                            type="password"
                            className={`flex-1 px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} ${darkMode ? 'border-r-0' : 'border-r-0'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            defaultValue="api-key-12345-abcde"
                            readOnly
                          />
                          <button 
                            className={`px-4 py-2 ${darkMode ? 'bg-gray-600 border-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-100 border border-gray-300 border-l-0 text-gray-700 hover:bg-gray-200'} rounded-r-md`}
                            onClick={handleRegenerateApiKey}
                          >
                            Regenerate
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                          onClick={handleSaveChanges}
                        >
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'notifications' && (
                  <>
                    <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Notification Settings</h4>
                    
                    <div className="space-y-6">
                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Email Notifications</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Receive alerts and updates via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Pipeline Notifications</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Get notified about pipeline status changes</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Infrastructure Alerts</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Receive alerts about infrastructure changes</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                          onClick={handleSaveChanges}
                        >
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'security' && (
                  <>
                    <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Security Settings</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Current Password
                        </label>
                        <input
                          type="password"
                          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="Enter current password"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          New Password
                        </label>
                        <input
                          type="password"
                          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="Enter new password"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'} mt-6`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Two-Factor Authentication</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                          onClick={handleSaveChanges}
                        >
                          <Save size={16} className="mr-2" />
                          Update Security Settings
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'infrastructure' && (
                  <>
                    <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Infrastructure Settings</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Default Cloud Provider
                        </label>
                        <select
                          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          defaultValue="aws"
                        >
                          <option value="aws">AWS</option>
                          <option value="gcp">Google Cloud Platform</option>
                          <option value="azure">Microsoft Azure</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          Default Region
                        </label>
                        <select
                          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          defaultValue="us-west-2"
                        >
                          <option value="us-east-1">US East (N. Virginia)</option>
                          <option value="us-east-2">US East (Ohio)</option>
                          <option value="us-west-1">US West (N. California)</option>
                          <option value="us-west-2">US West (Oregon)</option>
                          <option value="eu-west-1">EU (Ireland)</option>
                          <option value="eu-central-1">EU (Frankfurt)</option>
                        </select>
                      </div>

                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Auto-Scaling</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Automatically scale resources based on demand</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                          onClick={handleSaveChanges}
                        >
                          <Save size={16} className="mr-2" />
                          Save Infrastructure Settings
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'integrations' && (
                  <>
                    <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Integration Settings</h4>
                    
                    <div className="space-y-6">
                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>GitHub Integration</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Connect to GitHub repositories</p>
                          </div>
                          <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                            Connected
                          </button>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Slack Integration</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Send notifications to Slack channels</p>
                          </div>
                          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                            Connect
                          </button>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Jira Integration</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Link deployments to Jira issues</p>
                          </div>
                          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                            Connect
                          </button>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Docker Registry</h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Connect to Docker container registry</p>
                          </div>
                          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                            Connect
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                          onClick={handleSaveChanges}
                        >
                          <Save size={16} className="mr-2" />
                          Save Integration Settings
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;