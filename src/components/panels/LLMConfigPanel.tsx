import React, { useState } from 'react';
import { VersionCard } from '../VersionCard';

const sampleLLMConfigs = [
  { 
    id: 1, 
    version: '1.0', 
    name: 'GPT-4 Standard', 
    timestamp: Date.now() - 86400000,
    model: 'GPT-4',
    temperature: 0.7,
    maxTokens: 2048
  },
  { 
    id: 2, 
    version: '1.1', 
    name: 'Claude Precise', 
    timestamp: Date.now(),
    model: 'Claude 2',
    temperature: 0.3,
    maxTokens: 4096
  }
];

export function LLMConfigPanel({ onVersionSelect }) {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [newConfig, setNewConfig] = useState({
    model: 'GPT-4',
    temperature: 0.7,
    maxTokens: 2048
  });

  const handleSaveVersion = () => {
    // Implementation for saving new version
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Saved Configurations</h3>
        <div className="space-y-2">
          {sampleLLMConfigs.map((config) => (
            <VersionCard
              key={config.id}
              version={config.version}
              name={config.name}
              timestamp={config.timestamp}
              isSelected={selectedVersion === config.id}
              onClick={() => {
                setSelectedVersion(config.id);
                onVersionSelect?.(config);
              }}
            />
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-800 mb-4">New Configuration</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Configuration Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter configuration name..."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Model Selection</label>
            <select 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              value={newConfig.model}
              onChange={(e) => setNewConfig({ ...newConfig, model: e.target.value })}
            >
              <option>GPT-4</option>
              <option>GPT-3.5-Turbo</option>
              <option>Claude 2</option>
              <option>Llama 2</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Temperature</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={newConfig.temperature}
              onChange={(e) => setNewConfig({ ...newConfig, temperature: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-600 text-right">{newConfig.temperature}</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              value={newConfig.maxTokens}
              onChange={(e) => setNewConfig({ ...newConfig, maxTokens: parseInt(e.target.value) })}
            />
          </div>
          <button 
            onClick={handleSaveVersion}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}