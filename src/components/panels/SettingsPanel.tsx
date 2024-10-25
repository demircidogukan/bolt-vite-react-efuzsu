import React, { useState, useEffect } from 'react';
import { Key, EyeOff, Eye, Save, RefreshCw } from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  lastUsed?: string;
}

export function SettingsPanel() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    { id: 'openai', name: 'OpenAI API Key', key: '', lastUsed: 'Never' },
    { id: 'anthropic', name: 'Anthropic API Key', key: '', lastUsed: 'Never' },
    { id: 'cohere', name: 'Cohere API Key', key: '', lastUsed: 'Never' }
  ]);
  
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const toggleKeyVisibility = (id: string) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleKeyChange = (id: string, value: string) => {
    setApiKeys(prev => 
      prev.map(key => 
        key.id === id ? { ...key, key: value } : key
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const validateKey = (key: string) => {
    return key.length >= 32 || key === '';
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">API Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium text-gray-800">{apiKey.name}</h3>
              </div>
              {apiKey.lastUsed && (
                <span className="text-sm text-gray-500">
                  Last used: {apiKey.lastUsed}
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showKey[apiKey.id] ? 'text' : 'password'}
                  value={apiKey.key}
                  onChange={(e) => handleKeyChange(apiKey.id, e.target.value)}
                  placeholder="Enter API key"
                  className={`w-full pl-3 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${
                    apiKey.key && !validateKey(apiKey.key) ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showKey[apiKey.id] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {apiKey.key && !validateKey(apiKey.key) && (
              <p className="text-sm text-red-500">
                API key should be at least 32 characters long
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
        <p>Your API keys are encrypted and stored securely. They are only used to make requests to the respective services.</p>
      </div>
    </div>
  );
}