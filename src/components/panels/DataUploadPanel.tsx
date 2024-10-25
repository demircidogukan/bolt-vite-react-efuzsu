import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { VersionCard } from '../VersionCard';

const sampleDatasets = [
  { 
    id: 1, 
    version: '1.0', 
    name: 'Product Documentation', 
    timestamp: Date.now() - 86400000,
    files: ['docs.pdf', 'guide.md']
  },
  { 
    id: 2, 
    version: '1.1', 
    name: 'Customer Support Data', 
    timestamp: Date.now(),
    files: ['tickets.csv', 'responses.json']
  }
];

export function DataUploadPanel({ onVersionSelect }) {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [processingOptions, setProcessingOptions] = useState({
    textExtraction: false,
    chunkDocuments: false
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Saved Datasets</h3>
        <div className="space-y-2">
          {sampleDatasets.map((dataset) => (
            <VersionCard
              key={dataset.id}
              version={dataset.version}
              name={dataset.name}
              timestamp={dataset.timestamp}
              isSelected={selectedVersion === dataset.id}
              onClick={() => {
                setSelectedVersion(dataset.id);
                onVersionSelect?.(dataset);
              }}
            />
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-800 mb-4">Upload New Dataset</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Dataset Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter dataset name..."
            />
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag and drop files here, or click to select files</p>
            <input type="file" className="hidden" multiple />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">Processing Options</span>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600"
                  checked={processingOptions.textExtraction}
                  onChange={(e) => setProcessingOptions({ ...processingOptions, textExtraction: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-600">Text Extraction</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600"
                  checked={processingOptions.chunkDocuments}
                  onChange={(e) => setProcessingOptions({ ...processingOptions, chunkDocuments: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-600">Chunk Documents</span>
              </label>
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Upload and Process
          </button>
        </div>
      </div>
    </div>
  );
}