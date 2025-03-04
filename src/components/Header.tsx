import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { useAppStore } from '../store';

const Header: React.FC<{ title: string }> = ({ title }) => {
  const alerts = useAppStore((state) => state.alerts);
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const { darkMode } = useAppStore();

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border-b h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 lg:hidden`}>
      <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 lg:w-64`}
          />
          <Search className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
        </div>
        
        <div className="relative">
          <Bell className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} cursor-pointer`} size={20} />
          {unacknowledgedAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unacknowledgedAlerts.length}
            </span>
          )}
        </div>
        
        <HelpCircle className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} cursor-pointer hidden sm:block`} size={20} />
        
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <span className="font-semibold">AD</span>
        </div>
      </div>
    </header>
  );
};

export default Header;