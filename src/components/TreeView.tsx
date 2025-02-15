// src/components/TreeView.tsx
import React, { useState } from 'react';
import { Folder, Description } from '@mui/icons-material';
import { TreeItem } from '../context/FileManagerContext';

interface TreeViewProps {
  items: TreeItem[];
  level?: number;
  onSelect: (item: TreeItem) => void;
  selectedFolderId: string | null;
}

const TreeView: React.FC<TreeViewProps> = ({ items, level = 0, onSelect, selectedFolderId }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ul className={`space-y-1 ${level > 0 ? 'ml-4' : ''}`}>
      {items.map((item) => (
        <li key={item.id}>
          <div
            className={`flex items-center space-x-2 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer ${
              selectedFolderId === item.id ? 'bg-blue-100' : ''
            }`}
            onClick={() => onSelect(item)}
          >
            {item.children && item.children.length > 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(item.id);
                }}
                className="focus:outline-none"
              >
                {expanded[item.id] ? '-' : '+'}
              </button>
            ) : (
              <span className="w-4 inline-block" />
            )}
            {item.isDoc ? (
              <Description className="text-blue-500" fontSize="small" />
            ) : (
              <Folder className="text-yellow-500" fontSize="small" />
            )}
            <span>{item.name}</span>
          </div>
          {item.children && item.children.length > 0 && expanded[item.id] && (
            <TreeView items={item.children} level={level + 1} onSelect={onSelect} selectedFolderId={selectedFolderId} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TreeView;
