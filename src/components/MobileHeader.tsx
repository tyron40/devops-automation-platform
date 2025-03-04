import React from 'react';
import { Menu, Search, Bell, HelpCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '../store';
import ThemeToggle from './ThemeToggle';

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const alerts = useAppStore((state) => state.alerts);
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/pipelines':
        return 'CI/CD Pipelines';
      case '/infrastructure':
        return 'Infrastructure';
      case '/monitoring':
        return 'Monitoring';
      case '/alerts':
        return 'Alerts';
      case '/terminal':
        return 'Terminal';
      case '/settings':
        return 'Settings';
      default:
        return 'DevOps Platform';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white lg:hidden"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-40 lg:w-64"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
        </div>
        
        <ThemeToggle />
        
        <div className="relative">
          <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white" size={20} />
          {unacknowledgedAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unacknowledgedAlerts.length}
            </span>
          )}
        </div>
        
        <HelpCircle className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white hidden sm:block" size={20} />
        
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <span className="font-semibold">AD</span>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;