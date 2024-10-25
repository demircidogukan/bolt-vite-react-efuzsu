import React from 'react';
import { Clock, Check } from 'lucide-react';

export function VersionCard({ version, name, timestamp, isSelected, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">v{version}</span>
        </div>
        {isSelected && <Check className="w-5 h-5 text-indigo-600" />}
      </div>
      <h3 className="font-medium mt-2">{name}</h3>
      <p className="text-xs text-gray-500 mt-1">{new Date(timestamp).toLocaleString()}</p>
    </div>
  );
}