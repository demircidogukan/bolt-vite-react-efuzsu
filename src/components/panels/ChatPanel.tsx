import React, { useState } from 'react';
import { VersionCard } from '../VersionCard';

const sampleCombinedConfigs = [
  {
    id: 1,
    version: '1.0',
    name: 'Product Support Setup',
    timestamp: Date.now() - 86400000,
    vectorConfig: { id: 1, version: '1.0', name: 'Basic Search' },
    llmConfig: { id: 1, version: '1.0', name: 'GPT-4 Standard' },
    dataset: { id: 1, version: '1.0', name: 'Product Documentation' }
  }
];

export function ChatPanel() {
  const [messages, setMessages] = useState([
    { id: 1, text: "How can I help you with your RAG implementation?", isBot: true }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConfig, setSelectedConfig] = useState(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, 
      { id: prev.length + 1, text: newMessage, isBot: false }
    ]);
    setNewMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, 
        { id: prev.length + 1, text: "Processing with configuration: " + selectedConfig?.name, isBot: true }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Saved Configurations</h3>
        <div className="space-y-2">
          {sampleCombinedConfigs.map((config) => (
            <VersionCard
              key={config.id}
              version={config.version}
              name={config.name}
              timestamp={config.timestamp}
              isSelected={selectedConfig?.id === config.id}
              onClick={() => setSelectedConfig(config)}
            />
          ))}
        </div>
      </div>

      {selectedConfig && (
        <div className="space-y-4">
          <div className="h-64 border rounded-md p-3 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-2 rounded-lg max-w-[80%] ${
                  message.isBot ? 'bg-indigo-100' : 'bg-green-100'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message..."
            />
            <button 
              onClick={handleSend}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {!selectedConfig && (
        <div className="text-center text-gray-500 py-4">
          Please select a configuration to start chatting
        </div>
      )}
    </div>
  );
}