import React from 'react';
import { motion } from 'framer-motion';

interface DropZoneProps {
  isOver: boolean;
  children?: React.ReactNode;
  onDrop: () => void;
}

export function DropZone({ isOver, children, onDrop }: DropZoneProps) {
  return (
    <motion.div
      animate={isOver ? { scale: 1.05 } : { scale: 1 }}
      className={`rounded-lg border-2 border-dashed p-4 transition-colors ${
        isOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
      }`}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {children || (
        <div className="text-center text-gray-500">
          <p>Drop items here to combine</p>
        </div>
      )}
    </motion.div>
  );
}