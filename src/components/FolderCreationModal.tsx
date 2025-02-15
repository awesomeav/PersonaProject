import React, { useState } from 'react';
import Modal from './Modal'; // adjust the import path as needed

interface FolderCreationModalProps {
  open: boolean;
  closeModal: () => void;
  onSave: (name: string, description: string) => void;
}

const FolderCreationModal: React.FC<FolderCreationModalProps> = ({ open, closeModal, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Modal open={open}  showModalCloseBtn dataTestId="folder-creation-modal">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Create Folder</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Folder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            placeholder="Folder Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              onSave(name, description);
              setName('');
              setDescription('');
              closeModal();
            }}
            className="bg-[#5E60CE] text-white px-4 py-2 rounded hover:bg-[#4b4cc0] transition-colors text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FolderCreationModal;
