import React from 'react';
import { Clock, Check } from 'lucide-react';
import type { CombinedConfig } from '../types';

interface VersionTimelineProps {
  versions: CombinedConfig[];
  selectedVersion: CombinedConfig | null;
  onVersionSelect: (version: CombinedConfig) => void;
}

export function VersionTimeline({ versions, selectedVersion, onVersionSelect }: VersionTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Version Timeline</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        {/* Version items */}
        <div className="space-y-4">
          {versions.map((version) => (
            <div
              key={version.id}
              onClick={() => onVersionSelect(version)}
              className={`relative pl-10 cursor-pointer transition-colors ${
                selectedVersion?.id === version.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
              } rounded-lg p-3`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                selectedVersion?.id === version.id
                  ? 'border-indigo-500 bg-indigo-100'
                  : 'border-gray-300 bg-white'
              } top-1/2 -translate-y-1/2`} />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">v{version.version}</span>
                    <span className="text-sm text-gray-500">-</span>
                    <span className="text-sm font-medium text-gray-700">{version.name}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {new Date(version.timestamp).toLocaleString()}
                  </div>
                </div>
                {selectedVersion?.id === version.id && (
                  <Check className="w-5 h-5 text-indigo-600" />
                )}
              </div>
              
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                  Vector: v{version.vectorConfig.version}
                </div>
                <div className="px-2 py-1 bg-purple-50 text-purple-700 rounded">
                  LLM: v{version.llmConfig.version}
                </div>
                <div className="px-2 py-1 bg-green-50 text-green-700 rounded">
                  Data: v{version.dataset.version}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}