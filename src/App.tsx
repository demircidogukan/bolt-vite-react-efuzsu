import React, { useState } from 'react';
import { Search, Settings, Upload, MessageSquare, Brain } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { UserPanel } from './components/UserPanel';
import { VectorSearchPanel } from './components/panels/VectorSearchPanel';
import { LLMConfigPanel } from './components/panels/LLMConfigPanel';
import { DataUploadPanel } from './components/panels/DataUploadPanel';
import { ChatPanel } from './components/panels/ChatPanel';
import { SettingsPanel } from './components/panels/SettingsPanel';
import { AgentPanel } from './components/panels/AgentPanel';
import { VersionTimeline } from './components/VersionTimeline';
import type { CombinedConfig } from './types';

function App() {
  const [openPanels, setOpenPanels] = useState({
    vectorSearch: true,
    llmConfig: false,
    dataUpload: false,
    chat: false,
    settings: false,
    agent: false,
  });

  const [selectedConfigs, setSelectedConfigs] = useState({
    vectorSearch: null,
    llmConfig: null,
    dataset: null,
  });

  const [savedConfigs, setSavedConfigs] = useState<CombinedConfig[]>([]);
  const [selectedTimelineVersion, setSelectedTimelineVersion] = useState<CombinedConfig | null>(null);

  const togglePanel = (panel: string) => {
    setOpenPanels(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const handleSaveConfiguration = () => {
    if (!Object.values(selectedConfigs).every(Boolean)) return;

    const newConfig: CombinedConfig = {
      id: savedConfigs.length + 1,
      version: `1.${savedConfigs.length}`,
      name: `Configuration ${savedConfigs.length + 1}`,
      timestamp: Date.now(),
      vectorConfig: selectedConfigs.vectorSearch,
      llmConfig: selectedConfigs.llmConfig,
      dataset: selectedConfigs.dataset
    };

    setSavedConfigs(prev => [...prev, newConfig]);
    setSelectedConfigs({
      vectorSearch: null,
      llmConfig: null,
      dataset: null,
    });
    setSelectedTimelineVersion(newConfig);

    setOpenPanels(prev => ({
      ...prev,
      chat: true
    }));
  };

  const handleTimelineVersionSelect = (version: CombinedConfig) => {
    setSelectedTimelineVersion(version);
    setSelectedConfigs({
      vectorSearch: version.vectorConfig,
      llmConfig: version.llmConfig,
      dataset: version.dataset
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end p-4 border-b bg-white shadow-sm">
        <UserPanel onSettingsClick={() => togglePanel('settings')} />
      </div>

      <div className="flex">
        <div className="flex flex-col space-y-2 p-4">
          <Sidebar
            isOpen={openPanels.vectorSearch}
            onToggle={() => togglePanel('vectorSearch')}
            title="Vector Search"
            icon={Search}
          >
            <VectorSearchPanel 
              onVersionSelect={(config) => setSelectedConfigs(prev => ({ ...prev, vectorSearch: config }))}
            />
          </Sidebar>

          <Sidebar
            isOpen={openPanels.llmConfig}
            onToggle={() => togglePanel('llmConfig')}
            title="LLM Configuration"
            icon={Settings}
          >
            <LLMConfigPanel 
              onVersionSelect={(config) => setSelectedConfigs(prev => ({ ...prev, llmConfig: config }))}
            />
          </Sidebar>

          <Sidebar
            isOpen={openPanels.dataUpload}
            onToggle={() => togglePanel('dataUpload')}
            title="Data Upload"
            icon={Upload}
          >
            <DataUploadPanel 
              onVersionSelect={(dataset) => setSelectedConfigs(prev => ({ ...prev, dataset }))}
            />
          </Sidebar>

          <Sidebar
            isOpen={openPanels.chat}
            onToggle={() => togglePanel('chat')}
            title="Chat Interface"
            icon={MessageSquare}
          >
            <ChatPanel />
          </Sidebar>

          <Sidebar
            isOpen={openPanels.agent}
            onToggle={() => togglePanel('agent')}
            title="Agent Management"
            icon={Brain}
          >
            <AgentPanel />
          </Sidebar>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">RAG System Dashboard</h1>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Selected Configurations</h2>
                
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-medium text-gray-700">Vector Search Config</h3>
                    {selectedConfigs.vectorSearch ? (
                      <p className="text-sm text-gray-600">
                        Version {selectedConfigs.vectorSearch.version} - {selectedConfigs.vectorSearch.name}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No configuration selected</p>
                    )}
                  </div>

                  <div className="border-b pb-2">
                    <h3 className="font-medium text-gray-700">LLM Config</h3>
                    {selectedConfigs.llmConfig ? (
                      <p className="text-sm text-gray-600">
                        Version {selectedConfigs.llmConfig.version} - {selectedConfigs.llmConfig.name}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No configuration selected</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Dataset</h3>
                    {selectedConfigs.dataset ? (
                      <p className="text-sm text-gray-600">
                        Version {selectedConfigs.dataset.version} - {selectedConfigs.dataset.name}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No dataset selected</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleSaveConfiguration}
                  className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
                    Object.values(selectedConfigs).every(Boolean)
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!Object.values(selectedConfigs).every(Boolean)}
                >
                  Save Configuration and Start Chat
                </button>

                {savedConfigs.length > 0 && (
                  <div className="text-sm text-gray-600 text-center">
                    Configuration saved! Open the Chat Interface to start using it.
                  </div>
                )}
              </div>
            </div>
          </div>

          {savedConfigs.length > 0 && (
            <VersionTimeline
              versions={savedConfigs}
              selectedVersion={selectedTimelineVersion}
              onVersionSelect={handleTimelineVersionSelect}
            />
          )}
        </div>

        {openPanels.settings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
                <button
                  onClick={() => togglePanel('settings')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <SettingsPanel />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;