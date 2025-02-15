// src/components/AccordionItem.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { TreeItem } from '../context/FileManagerContext';
import { Folder, Description } from '@mui/icons-material';

interface AccordionItemProps {
  item: TreeItem;
  level?: number;
  onSelect: (item: TreeItem) => void;
  selectedPath: string[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, level = 0, onSelect, selectedPath }) => {
  const [isOpen, setIsOpen] = useState(false);
console.log(item,"<<<<<<<");
  // Auto-open if this item is in the selected path
  useEffect(() => {
    if (selectedPath.includes(item.id)) {
      setIsOpen(true);
    }
  }, [selectedPath, item.id]);

  const handleHeaderClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
      onSelect(item);
    },
    [onSelect, item]
  );

  return (
    <div
      className="w-[847px] flex flex-col items-start justify-start transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[150ms] cursor-pointer"
      data-acc-item
      onClick={handleHeaderClick}
    >
      {/* Header */}
      <div className="w-[847px] h-[61px] rounded-t-3xs rounded-b-none bg-lightsteelblue-400 flex flex-row items-center justify-start pt-[21px] px-[42px] pb-[17px] box-border relative z-[1]">
        {/* Expand/collapse indicator */}
        <div className="mr-4">
          {item.children && item.children.length > 0 && (
            <span className="text-xl font-bold text-black">{isOpen ? '-' : '+'}</span>
          )}
        </div>
        {/* Icon and title */}
        <div className="flex flex-col">
          <div className="text-base font-medium text-black">{item.name}</div>
          {item.description && (
            <div className="text-sm text-black">{item.description}</div>
          )}
        </div>
      </div>
      {/* Content – children items */}
      <div
        className={`w-[847px] overflow-hidden transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[150ms] text-darkslategray ${
          isOpen ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'
        }`}
        data-acc-content
      >
        {isOpen && item.children && item.children.length > 0 && (
          <div className="w-[847px] border-t border-gainsboro box-border">
            {item.children.map((child) => (
              <AccordionItem
                key={child.id}
                item={child}
                level={level + 1}
                onSelect={onSelect}
                selectedPath={selectedPath}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionItem;
