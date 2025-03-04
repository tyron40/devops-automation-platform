import React from 'react';
import Header from '../components/Header';
import Terminal from '../components/Terminal';

const TerminalPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <Header title="Terminal" />
      
      <div className="p-6 flex-1">
        <div className="bg-white rounded-lg shadow p-4 h-full">
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;