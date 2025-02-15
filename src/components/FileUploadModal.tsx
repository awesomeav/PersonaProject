import React, { useState } from 'react';
import { UploadFile, Close } from '@mui/icons-material';
import Modal from './Modal';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | null) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    onUpload(selectedFile);
    onClose();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <Modal
      open={isOpen}
      closeModal={onClose}
      showModalCloseBtn
      dataTestId="file-upload-modal"
    >
      <div className="w-full  p-6 flex flex-col">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload Document</h2>
        <div className="flex flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
          {!selectedFile ? (
            <>
              <p className="mb-4 text-gray-500 text-center">
                Browse or drag &amp; drop your document here
              </p>
              <label className="flex flex-col items-center px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-500 transition-colors">
                <UploadFile fontSize="medium" />
                <span className="mt-2 text-sm">Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <UploadFile fontSize="medium" className="text-indigo-600" />
              <span className="text-gray-700">{selectedFile.name}</span>
              <button onClick={handleRemoveFile} aria-label="Remove file">
                <Close fontSize="small" className="text-red-500" />
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-8 mt-6">
        <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={"px-4 py-2 rounded text-black-500 transition-colors text-sm "}
          >
            cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded transition-colors text-sm ${
              selectedFile
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
