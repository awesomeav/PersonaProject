// src/components/DocumentViewer.tsx
import React from 'react';

interface DocumentViewerProps {
  fileUrl: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ fileUrl }) => {
  return (
    <div className="h-full">
      <iframe src={fileUrl} title="Document Viewer" className="w-full h-full"></iframe>
    </div>
  );
};

export default DocumentViewer;
