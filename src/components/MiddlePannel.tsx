// src/components/MiddlePanel.tsx
import React, { useContext, useState } from 'react';
import { Add, CloudUpload, FilterList } from '@mui/icons-material';
import FilterPanel from './FilterPanel';
import TreeView from './TreeView';
import { FileManagerContext } from '../context/FileManagerContext';

interface MiddlePanelProps {
  onOpenCreateFolder: () => void;
  onOpenUploadDocument: () => void;
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ onOpenCreateFolder, onOpenUploadDocument }) => {
  const { treeData, selectedFolder, setSelectedFolder, filterText, setFilterText } = useContext(FileManagerContext);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const filterTreeData = (items: any[], filter: string): any[] => {
    if (!filter) return items;
    const lowerFilter = filter.toLowerCase();
    return items.reduce((acc: any[], item: any) => {
      const matches =
        item.name.toLowerCase().includes(lowerFilter) ||
        (item.description && item.description.toLowerCase().includes(lowerFilter)) ||
        (item.createdAt && item.createdAt.toLowerCase().includes(lowerFilter));
      const filteredChildren = item.children ? filterTreeData(item.children, filter) : [];
      if (matches || (filteredChildren && filteredChildren.length > 0)) {
        acc.push({ ...item, children: filteredChildren });
      }
      return acc;
    }, []);
  };

  const filteredData = filterTreeData(treeData, filterText);

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9FC]">
      <div className="px-[24px] py-[16px] bg-white border-b flex items-center justify-between">
        <div className="flex items-center space-x-[8px] text-gray-500">
          <span className="cursor-pointer hover:underline">NSM</span>
          <span>/</span>
          <span className="font-semibold text-gray-800">Folders & Documents</span>
        </div>
        <div className="flex items-center space-x-[12px]">
          <button
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            className="flex items-center bg-gray-200 text-gray-700 px-[8px] py-[6px] rounded hover:bg-gray-300 transition-colors text-[14px]"
          >
            <FilterList fontSize="small" className="mr-[4px]" />
            Filter
          </button>
          <button
            onClick={onOpenCreateFolder}
            className="flex items-center bg-[#5E60CE] text-white px-[12px] py-[8px] rounded hover:bg-[#4b4cc0] transition-colors text-[14px]"
          >
            <Add className="mr-[4px]" fontSize="small" />
            Create Folder
          </button>
          <button
            onClick={onOpenUploadDocument}
            className="flex items-center bg-[#5E60CE] text-white px-[12px] py-[8px] rounded hover:bg-[#4b4cc0] transition-colors text-[14px]"
          >
            <CloudUpload className="mr-[4px]" fontSize="small" />
            Upload Document
          </button>
        </div>
      </div>
      {filterPanelOpen && <FilterPanel filterText={filterText} setFilterText={setFilterText} />}
      <div className="flex-1 overflow-y-auto p-[24px]">
        <TreeView
          items={filteredData}
          onSelect={(item) => setSelectedFolder(item)}
          selectedFolderId={selectedFolder ? selectedFolder.id : null}
        />
      </div>
    </div>
  );
};

export default MiddlePanel;
