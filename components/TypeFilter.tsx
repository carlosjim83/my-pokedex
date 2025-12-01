'use client';

import { ALL_TYPES, getTypeColor, capitalize } from '@/lib/utils';

interface TypeFilterProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  onClearFilters: () => void;
}

export default function TypeFilter({ selectedTypes, onTypeToggle, onClearFilters }: TypeFilterProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Filter by Type
        </h2>
        {selectedTypes.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Clear all ({selectedTypes.length})
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {ALL_TYPES.map((type) => {
          const isSelected = selectedTypes.includes(type);
          const colorClass = getTypeColor(type);
          
          return (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              className={`
                px-4 py-2 rounded-full font-medium text-white text-sm
                transition-all duration-200 transform
                ${colorClass}
                ${isSelected 
                  ? 'ring-4 ring-offset-2 ring-blue-400 scale-105 shadow-lg' 
                  : 'opacity-70 hover:opacity-100 hover:scale-105 shadow'
                }
              `}
            >
              {capitalize(type)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
