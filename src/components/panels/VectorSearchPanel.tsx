import React, { useState } from 'react';
import { VersionCard } from '../VersionCard';

const sampleVectorConfigs = [
  { id: 1, version: '1.0', name: 'Basic Search', timestamp: Date.now() - 86400000, topK: 5 },
  { id: 2, version: '1.1', name: 'Enhanced Search', timestamp: Date.now(), topK: 10 }
];

export function VectorSearchPanel({ onVersionSelect }) {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [newConfig, setNewConfig] = useState({ query: '', topK: 5 });

  const handleSaveVersion = () => {
    // Implementation for saving new version
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Saved Configurations</h3>
        <div className="space-y-2">
          {sampleVectorConfigs.map((config) => (
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
            <label className="block text-sm font-medium text-gray-700">Top K Results</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              value={newConfig.topK}
              onChange={(e) => setNewConfig({ ...newConfig, topK: parseInt(e.target.value) })}
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