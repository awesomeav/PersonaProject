// src/components/UploadDocumentModal.tsx
import React, { useState } from 'react';
import { Close, UploadFile } from '@mui/icons-material';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | null) => void;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[442px] h-[322px] rounded shadow-lg relative p-6 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <Close />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center">Upload Document</h2>
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
          <p className="mb-4 text-gray-500">Browse Document</p>
          <label className="flex flex-col items-center px-4 py-2 bg-[#5E60CE] text-white rounded cursor-pointer hover:bg-[#4b4cc0]">
            <UploadFile fontSize="small" />
            <span className="mt-2 text-sm">Choose File</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setSelectedFile(file);
              }}
            />
          </label>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              onUpload(selectedFile);
              onClose();
            }}
            className="bg-[#5E60CE] text-white px-4 py-2 rounded hover:bg-[#4b4cc0] transition-colors text-sm"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
