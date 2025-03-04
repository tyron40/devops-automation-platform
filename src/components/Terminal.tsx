import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, X, Clipboard, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store';

const Terminal: React.FC = () => {
  const { darkMode } = useAppStore();
  const [history, setHistory] = useState<string[]>([
    '> Welcome to DevOps Platform Terminal',
    '> Type "help" for available commands',
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newHistory = [...history, `> ${input}`];
    
    // Add to command history
    setCommandHistory([input, ...commandHistory]);
    setHistoryIndex(-1);
    
    // Process commands
    switch (input.toLowerCase()) {
      case 'help':
        newHistory.push(
          'Available commands:',
          '  help - Show this help message',
          '  clear - Clear terminal',
          '  status - Check system status',
          '  terraform plan - Run Terraform plan',
          '  terraform apply - Run Terraform apply',
          '  prometheus query - Query Prometheus metrics',
          '  github actions list - List GitHub Actions workflows',
          '  kubectl get pods - List Kubernetes pods',
          '  kubectl get deployments - List Kubernetes deployments',
          '  docker ps - List running containers'
        );
        break;
      case 'clear':
        setHistory([
          '> Welcome to DevOps Platform Terminal',
          '> Type "help" for available commands',
        ]);
        setInput('');
        return;
      case 'status':
        newHistory.push(
          'System Status:',
          '  CI/CD Pipelines: 3 running, 1 failed',
          '  Infrastructure: 2 active, 1 updating',
          '  Monitoring: All systems operational',
          '  Alerts: 2 unacknowledged alerts'
        );
        break;
      case 'terraform plan':
        newHistory.push(
          'Running Terraform plan...',
          'Initializing the backend...',
          'Initializing provider plugins...',
          '- Finding latest version of hashicorp/aws...',
          '- Installing hashicorp/aws v4.67.0...',
          'Planning completed successfully.',
          'Plan: 3 to add, 1 to change, 2 to destroy.'
        );
        break;
      case 'terraform apply':
        newHistory.push(
          'Running Terraform apply...',
          'Do you want to perform these actions?',
          '  Terraform will perform the actions described above.',
          '  Only "yes" will be accepted to approve.',
          '',
          'Enter a value: yes',
          '',
          'Applying changes...',
          'Apply complete! Resources: 3 added, 1 changed, 2 destroyed.'
        );
        break;
      case 'prometheus query':
        newHistory.push(
          'Enter PromQL query: up',
          'Result:',
          'up{instance="localhost:9090",job="prometheus"} 1',
          'up{instance="localhost:9100",job="node"} 1',
          'up{instance="localhost:8080",job="api"} 1'
        );
        break;
      case 'github actions list':
        newHistory.push(
          'GitHub Actions Workflows:',
          '  frontend-ci: ✓ Completed 10 minutes ago',
          '  backend-ci: ⟳ Running',
          '  deploy-prod: ✓ Completed 1 hour ago',
          '  integration-tests: ✗ Failed 30 minutes ago'
        );
        break;
      case 'kubectl get pods':
        newHistory.push(
          'NAME                                READY   STATUS    RESTARTS   AGE',
          'api-deployment-6d5f7c8b9d-2jl9x     1/1     Running   0          2d',
          'api-deployment-6d5f7c8b9d-8k4n2     1/1     Running   0          2d',
          'frontend-deployment-7f9c6b8d5-x2z1  1/1     Running   0          1d',
          'db-statefulset-0                    1/1     Running   0          5d',
          'redis-deployment-5d7f68c9b-jl2k9    1/1     Running   0          3d'
        );
        break;
      case 'kubectl get deployments':
        newHistory.push(
          'NAME                 READY   UP-TO-DATE   AVAILABLE   AGE',
          'api-deployment       2/2     2            2           5d',
          'frontend-deployment  1/1     1            1           3d',
          'redis-deployment     1/1     1            1           5d'
        );
        break;
      case 'docker ps':
        newHistory.push(
          'CONTAINER ID   IMAGE                      COMMAND                  CREATED        STATUS        PORTS                    NAMES',
          'a1b2c3d4e5f6   nginx:latest               "/docker-entrypoint.…"   2 days ago     Up 2 days     0.0.0.0:80->80/tcp       web-server',
          'f6e5d4c3b2a1   postgres:13                "docker-entrypoint.s…"   5 days ago     Up 5 days     0.0.0.0:5432->5432/tcp   database',
          '1a2b3c4d5e6f   redis:alpine               "docker-entrypoint.s…"   3 days ago     Up 3 days     0.0.0.0:6379->6379/tcp   cache'
        );
        break;
      default:
        newHistory.push(`Command not found: ${input}`);
    }
    
    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const copyToClipboard = () => {
    const text = history.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-gray-100 rounded-lg shadow-lg overflow-hidden h-full flex flex-col`} onClick={focusInput}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-800'} px-4 py-2 border-b border-gray-700 flex items-center justify-between`}>
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
            title="Copy terminal output"
          >
            {copied ? <CheckCircle size={16} className="text-green-400" /> : <Clipboard size={16} />}
          </button>
          <button 
            onClick={() => setHistory(['> Welcome to DevOps Platform Terminal', '> Type "help" for available commands'])}
            className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
            title="Clear terminal"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto"
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap mb-1">
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleCommand} className="border-t border-gray-700 p-2">
        <div className="flex items-center">
          <ChevronRight className="text-green-400 mr-2" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-gray-100 font-mono"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;