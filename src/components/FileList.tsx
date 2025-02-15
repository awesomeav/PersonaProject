// src/components/FileList.tsx
import React, { useState } from 'react';
import { TreeItem } from '../context/FileManagerContext';
import { Description } from '@mui/icons-material';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

interface FileListProps {
  items: TreeItem[];
  onSelect: (item: TreeItem) => void;
  selectedFolderId: string | null;
  level?: number;
  onEdit: (item: TreeItem) => void;
  onDelete: (item: TreeItem) => void;
  onCreateFolder: () => void;
  onUploadDocument: () => void;
}

// Helper function to format date/time string so that the time portion is bold.
// Expects format "date time" (e.g. "17/03/2025 23:30")
const formatDateTime = (dt?: string) => {
  if (!dt) return '';
  const parts = dt.split(' ');
  if (parts.length >= 2) {
    return (
      <>
        {parts[0]} <span className="font-bold">{parts[1]}</span>
      </>
    );
  }
  return dt;
};

const FileList: React.FC<FileListProps> = ({
  items,
  onSelect,
  selectedFolderId,
  level = 0,
  onEdit,
  onDelete,
  onCreateFolder,
  onUploadDocument,
}) => {
  // Expanded state per item
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleRowClick = (item: TreeItem) => {
    onSelect(item);
    if (item.children && item.children.length > 0) {
      // Toggle expanded state for this item
      setExpanded((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
    }
  };

  return (
    <div className="w-full">
      {/* Render header only at the top level */}
      {level === 0 && (
        <div className="grid grid-cols-4 text-black font-bold text-[12px] uppercase p-3">
          <div>Name</div>
          <div>Description</div>
          <div>Created at</div>
          <div>Updated at</div>
        </div>
      )}
      <div className="space-y-[15px]">
        {items.map((item) => {
          const isExpanded = expanded[item.id] || false;
          return (
            <div key={item.id} className="bg-white shadow rounded-[5px] cursor-pointer relative"
              style={{ paddingLeft: level * 16 }}>
              {/* Parent row */}
              <div className="p-4 grid grid-cols-4 items-center min-h-[60px]" onClick={() => handleRowClick(item)}>
                {/* Name Column */}
                <div className="flex items-center">
                  {item.isDoc ? (
                    <Description className="text-blue-500" fontSize="small" />
                  ) : (
                    <div className="relative">
                    <FolderOutlinedIcon fontSize="large" className="ml-2" />
                   { item.count ??0  >0 ?<span className="absolute -top-1 left-2 bg-yellow-500 text-black-200 rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                      {item.count}
                    </span>:null }
                  </div>
                  )}
                  <span className="ml-2 font-bold">{item.name}</span>
                </div>
                {/* Description Column */}
                <div>{item.description}</div>
                {/* Created at Column */}
                <div>{formatDateTime(item.createdAt)}</div>
                {/* Updated at Column with Three-Dot Menu */}
                <div className="flex justify-between items-center">
                  <span>{formatDateTime(item.updatedAt)}</span>
                  <button
                    onClick={(e) => {
                      // Prevent row click; handle menu here if needed
                      e.stopPropagation();
                      // You can add menu logic here if desired.
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    
                    <MoreVertOutlinedIcon />
                  </button>
                </div>
              </div>
              {/* Nested children rendered inside the same card */}
              {item.children && item.children.length > 0 && isExpanded && (
                <div className="mt-3 border-t border-gray-200 pt-3 ml-4">
                  <FileList
                    items={item.children}
                    onSelect={onSelect}
                    selectedFolderId={selectedFolderId}
                    level={level + 1}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCreateFolder={onCreateFolder}
                    onUploadDocument={onUploadDocument}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileList;
