// src/components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number;
  fileName: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, fileName }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs">
        <span>{fileName}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-2">
        <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
