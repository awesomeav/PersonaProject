// src/components/FolderTree.tsx
import React, { useState } from 'react';
import { Folder, Description } from '@mui/icons-material';
import { TreeItem } from '../context/FileManagerContext';

interface FolderTreeProps {
  items: TreeItem[];
  onSelect: (item: TreeItem) => void;
  selectedFolderId: string | null;
  selectedPath: string[];
  level?: number;
}

const FolderTree: React.FC<FolderTreeProps> = ({ items, onSelect, selectedFolderId, selectedPath, level = 0 }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ul className="space-y-1">
      {items.map(item => {
        const autoExpand = selectedPath.includes(item.id);
        const isExpanded = expanded[item.id] !== undefined ? expanded[item.id] : autoExpand;
        return (
          <li key={item.id}>
            <div
              className={`flex items-center space-x-2 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer ${
                selectedFolderId === item.id ? 'bg-blue-100' : ''
              }`}
              style={{ paddingLeft: level * 16 }}
              onClick={() => onSelect(item)}
            >
              {item.children && item.children.length > 0 ? (
                <button onClick={(e) => toggleExpand(item.id, e)} className="focus:outline-none">
                  {isExpanded ? '-' : '+'}
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
            {item.children && item.children.length > 0 && isExpanded && (
              <FolderTree
                items={item.children}
                onSelect={onSelect}
                selectedFolderId={selectedFolderId}
                selectedPath={selectedPath}
                level={level + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default FolderTree;
