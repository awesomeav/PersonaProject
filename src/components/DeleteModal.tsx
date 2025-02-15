import React from 'react';
import { Close } from '@mui/icons-material';
import { TreeItem } from '../context/FileManagerContext';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToDelete: TreeItem | null; // The file/folder to delete
  onConfirm: (item: TreeItem) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, itemToDelete, onConfirm }) => {
  if (!isOpen || !itemToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Delete modal container */}
      <div className="bg-white w-[442px] h-[200px] rounded shadow-lg relative p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <Close />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Delete Document</h2>
        <p className="text-center mb-4">
          Are you sure you want to delete 
          <span className="font-bold"> {itemToDelete.name}</span>?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 
                       transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(itemToDelete);
              onClose();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 
                       transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
