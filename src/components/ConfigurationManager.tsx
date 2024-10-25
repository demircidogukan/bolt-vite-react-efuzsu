import React, { useState } from 'react';
import { DraggableCard } from './DraggableCard';
import { DropZone } from './DropZone';
import { Plus } from 'lucide-react';

interface ConfigItem {
  id: string;
  type: 'vector' | 'llm' | 'dataset' | 'agent';
  name: string;
  description: string;
}

interface CombinedConfig {
  id: string;
  name: string;
  items: ConfigItem[];
}

export function ConfigurationManager() {
  const [items, setItems] = useState<ConfigItem[]>([
    {
      id: '1',
      type: 'vector',
      name: 'Basic Search',
      description: 'Standard vector search configuration'
    },
    {
      id: '2',
      type: 'llm',
      name: 'GPT-4 Config',
      description: 'Default GPT-4 settings'
    },
    {
      id: '3',
      type: 'dataset',
      name: 'Product Data',
      description: 'Product documentation dataset'
    },
    {
      id: '4',
      type: 'agent',
      name: 'Support Agent',
      description: 'Customer support assistant'
    }
  ]);

  const [combinations, setCombinations] = useState<CombinedConfig[]>([]);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggingItem(id);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
    setActiveDropZone(null);
  };

  const handleDrop = (targetId: string) => {
    if (!draggingItem || draggingItem === targetId) return;

    const sourceItem = items.find(item => item.id === draggingItem);
    const targetItem = items.find(item => item.id === targetId);

    if (sourceItem && targetItem) {
      const newCombination: CombinedConfig = {
        id: `combo_${Date.now()}`,
        name: `${sourceItem.name} + ${targetItem.name}`,
        items: [sourceItem, targetItem]
      };

      setCombinations(prev => [...prev, newCombination]);
    }

    handleDragEnd();
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragEnd={handleDragEnd}
            >
              <DraggableCard
                {...item}
                isDragging={draggingItem === item.id}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Combination Area</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {combinations.map(combo => (
            <div key={combo.id} className="relative group">
              <DropZone
                isOver={activeDropZone === combo.id}
                onDrop={() => handleDrop(combo.id)}
              >
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">{combo.name}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {combo.items.map(item => (
                      <div key={item.id} className="text-sm bg-gray-50 rounded p-2">
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </DropZone>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <DropZone
            isOver={activeDropZone === 'new'}
            onDrop={() => handleDrop('new')}
          />
        </div>
      </div>

      <style jsx global>{`
        [draggable] {
          user-select: none;
        }
      `}</style>
    </div>
  );
}