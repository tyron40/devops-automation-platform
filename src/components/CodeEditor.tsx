import React, { useState } from 'react';
import { useAppStore } from '../store';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  readOnly?: boolean;
  onSave?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  readOnly = false,
  onSave,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isEditing, setIsEditing] = useState(false);
  const { darkMode } = useAppStore();

  const handleSave = () => {
    if (onSave) {
      onSave(code);
    }
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-900 text-white">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <span className="text-sm font-medium">{language}</span>
        </div>
        {!readOnly && (
          <div>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className="p-4 overflow-auto">
        {isEditing && !readOnly ? (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-gray-900 text-gray-100 font-mono text-sm p-2 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        ) : (
          <pre className="font-mono text-sm whitespace-pre-wrap">{code}</pre>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;