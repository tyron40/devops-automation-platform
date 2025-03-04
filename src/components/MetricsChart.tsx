import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { Metric } from '../types';
import { useAppStore } from '../store';

interface MetricsChartProps {
  data: Metric[];
  title: string;
  color?: string;
  type?: 'line' | 'area';
  showGradient?: boolean;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ 
  data, 
  title, 
  color = '#3b82f6',
  type = 'line',
  showGradient = false
}) => {
  const { darkMode } = useAppStore();
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const renderChart = () => {
    if (type === 'area') {
      return (
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id={`colorGradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={darkMode ? '#374151' : '#f0f0f0'} 
            vertical={false}
          />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatTime} 
            stroke={darkMode ? '#9ca3af' : '#9ca3af'}
            fontSize={10}
            tick={{ fontSize: 10 }}
            tickMargin={8}
          />
          <YAxis 
            stroke={darkMode ? '#9ca3af' : '#9ca3af'} 
            fontSize={10}
            tick={{ fontSize: 10 }}
            width={30}
          />
          <Tooltip 
            formatter={(value) => [`${value}`, title]}
            labelFormatter={(label) => formatTime(label)}
            contentStyle={{ 
              fontSize: '12px', 
              backgroundColor: darkMode ? '#1f2937' : '#fff',
              borderColor: darkMode ? '#374151' : '#e5e7eb',
              color: darkMode ? '#f9fafb' : '#111827'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Area
            type="monotone"
            dataKey="value"
            name={title}
            stroke={color}
            fillOpacity={1}
            fill={showGradient ? `url(#colorGradient-${title.replace(/\s+/g, '')})` : color}
            strokeWidth={2}
          />
        </AreaChart>
      );
    }

    return (
      <LineChart
        data={data}
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={darkMode ? '#374151' : '#f0f0f0'} 
          vertical={false}
        />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={formatTime} 
          stroke={darkMode ? '#9ca3af' : '#9ca3af'}
          fontSize={10}
          tick={{ fontSize: 10 }}
          tickMargin={8}
        />
        <YAxis 
          stroke={darkMode ? '#9ca3af' : '#9ca3af'} 
          fontSize={10}
          tick={{ fontSize: 10 }}
          width={30}
        />
        <Tooltip 
          formatter={(value) => [`${value}`, title]}
          labelFormatter={(label) => formatTime(label)}
          contentStyle={{ 
            fontSize: '12px', 
            backgroundColor: darkMode ? '#1f2937' : '#fff',
            borderColor: darkMode ? '#374151' : '#e5e7eb',
            color: darkMode ? '#f9fafb' : '#111827'
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Line
          type="monotone"
          dataKey="value"
          name={title}
          stroke={color}
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    );
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
      <h3 className={`text-base md:text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>{title}</h3>
      <div className="h-48 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsChart;