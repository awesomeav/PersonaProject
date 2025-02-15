// src/components/AccordionFileList.tsx
import React from 'react';
import { TreeItem } from '../context/FileManagerContext';
import AccordionItem from './AccordionItem';

interface AccordionFileListProps {
  items: TreeItem[];
  onSelect: (item: TreeItem) => void;
  selectedPath: string[];
}

const AccordionFileList: React.FC<AccordionFileListProps> = ({ items, onSelect, selectedPath }) => {
  return (
    <div>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          onSelect={onSelect}
          selectedPath={selectedPath}
        />
      ))}
    </div>
  );
};

export default AccordionFileList;
