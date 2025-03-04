import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GitPullRequest, 
  Server, 
  LineChart, 
  Bell, 
  Settings,
  Terminal,
  X,
  LogOut
} from 'lucide-react';
import { useAppStore } from '../store';

interface NavbarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { darkMode } = useAppStore();
  
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/pipelines', icon: <GitPullRequest size={20} />, label: 'Pipelines' },
    { path: '/infrastructure', icon: <Server size={20} />, label: 'Infrastructure' },
    { path: '/monitoring', icon: <LineChart size={20} />, label: 'Monitoring' },
    { path: '/alerts', icon: <Bell size={20} />, label: 'Alerts' },
    { path: '/terminal', icon: <Terminal size={20} />, label: 'Terminal' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        bg-gray-900 text-white h-screen z-30
        ${isOpen ? 'fixed inset-y-0 left-0 w-64 transition-transform duration-300 transform translate-x-0' : 'fixed inset-y-0 left-0 w-64 transition-transform duration-300 transform -translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:w-64
        ${darkMode ? 'bg-gray-900' : 'bg-gray-900'}
      `}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Server className="text-blue-400" size={24} />
            <h1 className="text-xl font-bold">DevOps Platform</h1>
          </div>
          <button 
            onClick={closeSidebar}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  onClick={() => closeSidebar()}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="font-semibold">AD</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@example.com</p>
              </div>
            </div>
            <button className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;