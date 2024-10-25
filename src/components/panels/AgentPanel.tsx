import React, { useState } from 'react';
import { Code2, Brain, Plus, Trash2, Save } from 'lucide-react';
import { VersionCard } from '../VersionCard';

interface Function {
  id: string;
  name: string;
  description: string;
  code: string;
  parameters: Parameter[];
}

interface Parameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  functions: string[];
  systemPrompt: string;
  temperature: number;
}

export function AgentPanel() {
  const [activeTab, setActiveTab] = useState<'functions' | 'agents'>('functions');
  const [functions, setFunctions] = useState<Function[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [editingFunction, setEditingFunction] = useState<Function | null>(null);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  const handleCreateFunction = () => {
    const newFunction: Function = {
      id: `func_${Date.now()}`,
      name: '',
      description: '',
      code: 'async function execute(params) {\n  // Your code here\n}',
      parameters: []
    };
    setEditingFunction(newFunction);
  };

  const handleCreateAgent = () => {
    const newAgent: Agent = {
      id: `agent_${Date.now()}`,
      name: '',
      description: '',
      functions: [],
      systemPrompt: '',
      temperature: 0.7
    };
    setEditingAgent(newAgent);
  };

  const handleSaveFunction = () => {
    if (!editingFunction) return;
    
    setFunctions(prev => {
      const index = prev.findIndex(f => f.id === editingFunction.id);
      if (index >= 0) {
        return [...prev.slice(0, index), editingFunction, ...prev.slice(index + 1)];
      }
      return [...prev, editingFunction];
    });
    setEditingFunction(null);
  };

  const handleSaveAgent = () => {
    if (!editingAgent) return;
    
    setAgents(prev => {
      const index = prev.findIndex(a => a.id === editingAgent.id);
      if (index >= 0) {
        return [...prev.slice(0, index), editingAgent, ...prev.slice(index + 1)];
      }
      return [...prev, editingAgent];
    });
    setEditingAgent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('functions')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'functions'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4" />
            <span>Functions</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'agents'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Agents</span>
          </div>
        </button>
      </div>

      {activeTab === 'functions' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Functions</h3>
            <button
              onClick={handleCreateFunction}
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              <span>New Function</span>
            </button>
          </div>

          {editingFunction && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {editingFunction.name || 'New Function'}
                  </h2>
                  <button
                    onClick={() => setEditingFunction(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={editingFunction.name}
                      onChange={(e) => setEditingFunction({ ...editingFunction, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={editingFunction.description}
                      onChange={(e) => setEditingFunction({ ...editingFunction, description: e.target.value })}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Code</label>
                    <textarea
                      value={editingFunction.code}
                      onChange={(e) => setEditingFunction({ ...editingFunction, code: e.target.value })}
                      rows={10}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parameters</label>
                    {editingFunction.parameters.map((param, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={param.name}
                          onChange={(e) => {
                            const newParams = [...editingFunction.parameters];
                            newParams[index] = { ...param, name: e.target.value };
                            setEditingFunction({ ...editingFunction, parameters: newParams });
                          }}
                          placeholder="Name"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <select
                          value={param.type}
                          onChange={(e) => {
                            const newParams = [...editingFunction.parameters];
                            newParams[index] = { ...param, type: e.target.value as any };
                            setEditingFunction({ ...editingFunction, parameters: newParams });
                          }}
                          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="string">String</option>
                          <option value="number">Number</option>
                          <option value="boolean">Boolean</option>
                          <option value="array">Array</option>
                          <option value="object">Object</option>
                        </select>
                        <button
                          onClick={() => {
                            const newParams = editingFunction.parameters.filter((_, i) => i !== index);
                            setEditingFunction({ ...editingFunction, parameters: newParams });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newParam: Parameter = {
                          name: '',
                          type: 'string',
                          description: '',
                          required: true
                        };
                        setEditingFunction({
                          ...editingFunction,
                          parameters: [...editingFunction.parameters, newParam]
                        });
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      + Add Parameter
                    </button>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingFunction(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveFunction}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Function</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {functions.map((func) => (
              <div
                key={func.id}
                className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer"
                onClick={() => setEditingFunction(func)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{func.name}</h4>
                    <p className="text-sm text-gray-500">{func.description}</p>
                  </div>
                  <Code2 className="w-5 h-5 text-gray-400" />
                </div>
                {func.parameters.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Parameters:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {func.parameters.map((param, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700"
                        >
                          {param.name}: {param.type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Agents</h3>
            <button
              onClick={handleCreateAgent}
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              <span>New Agent</span>
            </button>
          </div>

          {editingAgent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {editingAgent.name || 'New Agent'}
                  </h2>
                  <button
                    onClick={() => setEditingAgent(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={editingAgent.name}
                      onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={editingAgent.description}
                      onChange={(e) => setEditingAgent({ ...editingAgent, description: e.target.value })}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">System Prompt</label>
                    <textarea
                      value={editingAgent.systemPrompt}
                      onChange={(e) => setEditingAgent({ ...editingAgent, systemPrompt: e.target.value })}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="You are a helpful assistant that..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Temperature</label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={editingAgent.temperature}
                      onChange={(e) => setEditingAgent({ ...editingAgent, temperature: parseFloat(e.target.value) })}
                      className="mt-1 block w-full"
                    />
                    <div className="text-right text-sm text-gray-500">{editingAgent.temperature}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Functions</label>
                    <div className="space-y-2">
                      {functions.map((func) => (
                        <label key={func.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={editingAgent.functions.includes(func.id)}
                            onChange={(e) => {
                              const newFunctions = e.target.checked
                                ? [...editingAgent.functions, func.id]
                                : editingAgent.functions.filter(id => id !== func.id);
                              setEditingAgent({ ...editingAgent, functions: newFunctions });
                            }}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700">{func.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingAgent(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAgent}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Agent</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer"
                onClick={() => setEditingAgent(agent)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{agent.name}</h4>
                    <p className="text-sm text-gray-500">{agent.description}</p>
                  </div>
                  <Brain className="w-5 h-5 text-gray-400" />
                </div>
                {agent.functions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Functions:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {agent.functions.map((funcId) => {
                        const func = functions.find(f => f.id === funcId);
                        return func ? (
                          <span
                            key={funcId}
                            className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700"
                          >
                            {func.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}