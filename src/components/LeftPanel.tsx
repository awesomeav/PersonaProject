// src/components/LeftPanel.tsx
import React, { useContext } from 'react';
import TreeView from './TreeView';
import { FileManagerContext } from '../context/FileManagerContext';

const LeftPanel: React.FC = () => {
  const { treeData, selectedFolder, setSelectedFolder, filterText, setFilterText } = useContext(FileManagerContext);

  // Simple filtering function
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
    <div className="flex-1 overflow-y-auto px-[16px] py-[12px]">
      <TreeView
        items={filteredData}
        onSelect={(item) => setSelectedFolder(item)}
        selectedFolderId={selectedFolder ? selectedFolder.id : null}
      />
    </div>
  );
};

export default LeftPanel;
