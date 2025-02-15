// src/components/ContextMenu.tsx
import React, { useState } from 'react';

interface ContextMenuProps {
  options: string[];
  onSelect: (option: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ options, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        ⋮
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
