// src/components/Breadcrumb.tsx
import React, { useContext } from 'react';
import { FileManagerContext } from '../context/FileManagerContext';

const Breadcrumb: React.FC = () => {
  const { selectedFolder } = useContext(FileManagerContext);
  return (
    <nav className="flex items-center space-x-2 text-gray-500">
      <span className="cursor-pointer hover:underline">NSM</span>
      <span>/</span>
      <span className="font-semibold text-gray-800">
        {selectedFolder ? selectedFolder.name : 'Folders & Documents'}
      </span>
    </nav>
  );
};

export default Breadcrumb;
