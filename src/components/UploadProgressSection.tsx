// src/components/UploadProgressSection.tsx
import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

interface UploadItem {
  fileName: string;
  progress: number;
}

const UploadProgressSection: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUploads((prev) =>
        prev.map((item) => ({
          ...item,
          progress: item.progress < 100 ? item.progress + 10 : 100,
        }))
      );
    }, 1000);

    if (uploads.length === 0) {
      setUploads([{ fileName: 'DemoFile.pdf', progress: 0 }]);
    }

    return () => clearInterval(interval);
  }, [uploads]);

  return (
    <div className="p-4 border-t">
      <h3 className="mb-2 text-sm font-semibold">Upload Progress</h3>
      {uploads.map((item, idx) => (
        <ProgressBar key={idx} progress={item.progress} fileName={item.fileName} />
      ))}
    </div>
  );
};

export default UploadProgressSection;
