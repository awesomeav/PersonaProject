import React, { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';
import { TreeItem } from '../context/FileManagerContext';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit: TreeItem | null;         // The file/folder to edit
  onSave: (updatedItem: TreeItem) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, itemToEdit, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Pre-fill modal fields with the item’s current data
  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name || '');
      setDescription(itemToEdit.description || '');
    }
  }, [itemToEdit]);

  if (!isOpen || !itemToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Edit modal container */}
      <div className="bg-white w-[442px] h-[322px] rounded shadow-lg relative p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <Close />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Document</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Document Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm 
                       focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            placeholder="Document Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm 
                       focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              onSave({ ...itemToEdit, name, description });
              onClose();
            }}
            className="bg-[#5E60CE] text-white px-4 py-2 rounded hover:bg-[#4b4cc0] 
                       transition-colors text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
