import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Settings, Database } from 'lucide-react';

interface DraggableCardProps {
  id: string;
  type: 'vector' | 'llm' | 'dataset' | 'agent';
  name: string;
  description: string;
  isDragging?: boolean;
}

const iconMap = {
  vector: Search,
  llm: Settings,
  dataset: Database,
  agent: Brain,
};

export function DraggableCard({ id, type, name, description, isDragging }: DraggableCardProps) {
  const Icon = iconMap[type];

  return (
    <motion.div
      layout
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      whileDrag={{ scale: 1.05, zIndex: 1 }}
      whileHover={{ scale: 1.02 }}
      animate={isDragging ? { scale: 1.05, zIndex: 1 } : { scale: 1, zIndex: 0 }}
      className={`bg-white rounded-lg shadow-md p-4 cursor-grab active:cursor-grabbing ${
        isDragging ? 'border-2 border-indigo-500 shadow-lg' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-indigo-600" />
            <h3 className="font-medium text-gray-900">{name}</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}