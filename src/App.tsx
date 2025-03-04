import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileHeader from './components/MobileHeader';
import Dashboard from './pages/Dashboard';
import Pipelines from './pages/Pipelines';
import Infrastructure from './pages/Infrastructure';
import Monitoring from './pages/Monitoring';
import Alerts from './pages/Alerts';
import TerminalPage from './pages/TerminalPage';
import Settings from './pages/Settings';
import { useAppStore } from './store';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode } = useAppStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
        <Navbar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileHeader toggleSidebar={toggleSidebar} />
          <div className="flex-1 overflow-auto pb-6 md:ml-0 lg:ml-0 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pipelines" element={<Pipelines />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/terminal" element={<TerminalPage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;