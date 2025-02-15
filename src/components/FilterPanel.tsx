// src/components/FilterPanel.tsx
import React from 'react';

interface FilterPanelProps {
  filterText: string;
  setFilterText: (value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filterText, setFilterText }) => {
  return (
    <div className="p-4 bg-white border-b">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        File/Folder Filtering
      </label>
      <input
        type="text"
        placeholder="Filter by name, description, created date"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
      />
    </div>
  );
};

export default FilterPanel;
