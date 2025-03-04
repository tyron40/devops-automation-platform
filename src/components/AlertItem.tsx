import React from 'react';
import { AlertTriangle, Info, AlertCircle, Check } from 'lucide-react';
import { Alert } from '../types';
import { useAppStore } from '../store';

interface AlertItemProps {
  alert: Alert;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  const acknowledgeAlert = useAppStore((state) => state.acknowledgeAlert);
  const { darkMode } = useAppStore();

  const getSeverityIcon = () => {
    switch (alert.severity) {
      case 'critical':
        return <AlertCircle className="text-red-500 dark:text-red-400" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500 dark:text-yellow-400" size={20} />;
      case 'info':
        return <Info className="text-blue-500 dark:text-blue-400" size={20} />;
      default:
        return <Info className="text-gray-500 dark:text-gray-400" size={20} />;
    }
  };

  const getSeverityClass = () => {
    switch (alert.severity) {
      case 'critical':
        return darkMode 
          ? 'border-red-800 bg-red-900/20' 
          : 'border-red-200 bg-red-50';
      case 'warning':
        return darkMode 
          ? 'border-yellow-800 bg-yellow-900/20' 
          : 'border-yellow-200 bg-yellow-50';
      case 'info':
        return darkMode 
          ? 'border-blue-800 bg-blue-900/20' 
          : 'border-blue-200 bg-blue-50';
      default:
        return darkMode 
          ? 'border-gray-700 bg-gray-800/50' 
          : 'border-gray-200 bg-gray-50';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleAcknowledge = () => {
    acknowledgeAlert(alert.id);
  };

  return (
    <div className={`border rounded-lg p-4 mb-3 ${getSeverityClass()}`}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">{getSeverityIcon()}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{alert.message}</h4>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatTime(alert.timestamp)}</span>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>Source: {alert.source}</p>
          {!alert.acknowledged && (
            <button
              onClick={handleAcknowledge}
              className={`mt-2 flex items-center text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
            >
              <Check size={16} className="mr-1" />
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertItem;