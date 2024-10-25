import React from 'react';
import { ChevronRight } from 'lucide-react';

export function Sidebar({ isOpen, onToggle, children, title, icon: Icon }) {
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-96' : 'w-20'}`}>
      <div 
        className="flex items-center p-4 cursor-pointer hover:bg-gray-50 border-b"
        onClick={onToggle}
      >
        <Icon className="w-6 h-6 text-indigo-600" />
        {isOpen && <span className="ml-3 font-medium text-gray-700">{title}</span>}
        <ChevronRight className={`w-5 h-5 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}