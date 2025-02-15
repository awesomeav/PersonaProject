import React, { useState } from 'react';
import {
  Menu,
  Folder,
  Description,
  Add,
  CloudUpload,
  Close,
  FilterList,
  UploadFile,
} from '@mui/icons-material';

/* ============================================================
   Modal Components
   ============================================================ */

type CreateFolderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
};

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[442px] h-[322px] rounded shadow-lg relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <Close />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Create Folder</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Folder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
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
              onClose();
            }}
            className="bg-[#5E60CE] text-white px-4 py-2 rounded hover:bg-[#4b4cc0] transition-colors text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

type UploadDocumentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | null) => void;
};

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
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
        <h2 className="text-xl font-semibold mb-6 text-center">
          Upload Document
        </h2>
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

type FilterPanelProps = {
  filterText: string;
  setFilterText: (value: string) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterText,
  setFilterText,
}) => {
  return (
    <div className="p-4 bg-white border-b">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        File/Folder Filtering
      </label>
      <input
        type="text"
        placeholder="Filter by name, description, created date"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
      />
    </div>
  );
};

/* ============================================================
   TreeView & Filtering Logic
   ============================================================ */

type TreeItem = {
  id: string;
  name: string;
  isDoc: boolean;
  description?: string;
  createdAt?: string;
  children?: TreeItem[];
};

type TreeViewProps = {
  items: TreeItem[];
  level?: number;
};

const TreeView: React.FC<TreeViewProps> = ({ items, level = 0 }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ul className={`space-y-1 ${level > 0 ? 'ml-4' : ''}`}>
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex items-center space-x-2 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
            {item.children && item.children.length > 0 ? (
              <button
                onClick={() => toggleExpand(item.id)}
                className="focus:outline-none"
              >
                {expanded[item.id] ? '-' : '+'}
              </button>
            ) : (
              <span className="w-4 inline-block" />
            )}
            {item.isDoc ? (
              <Description className="text-blue-500" fontSize="small" />
            ) : (
              <Folder className="text-yellow-500" fontSize="small" />
            )}
            <span>{item.name}</span>
          </div>
          {item.children && item.children.length > 0 && expanded[item.id] && (
            <TreeView items={item.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};

const filterTreeData = (items: TreeItem[], filter: string): TreeItem[] => {
  if (!filter) return items;
  const lowerFilter = filter.toLowerCase();
  return items.reduce<TreeItem[]>((acc, item) => {
    const matches =
      item.name.toLowerCase().includes(lowerFilter) ||
      (item.description && item.description.toLowerCase().includes(lowerFilter)) ||
      (item.createdAt && item.createdAt.toLowerCase().includes(lowerFilter));
    let filteredChildren: TreeItem[] | undefined;
    if (item.children) {
      filteredChildren = filterTreeData(item.children, filter);
    }
    if (matches || (filteredChildren && filteredChildren.length > 0)) {
      acc.push({
        ...item,
        children: filteredChildren,
      });
    }
    return acc;
  }, []);
};

const sampleTreeData: TreeItem[] = [
  {
    id: '1',
    name: 'Mission_Logs',
    isDoc: false,
    description: 'Logs for missions',
    createdAt: '17/03/2025 23:30',
    children: [
      {
        id: '1-1',
        name: 'Logs_2020',
        isDoc: false,
        description: 'Logs for 2020',
        createdAt: '17/03/2025 23:30',
        children: [
          {
            id: '1-1-1',
            name: 'log1.txt',
            isDoc: true,
            description: 'First log',
            createdAt: '17/03/2025 23:30',
          },
          {
            id: '1-1-2',
            name: 'log2.txt',
            isDoc: true,
            description: 'Second log',
            createdAt: '17/03/2025 23:30',
          },
        ],
      },
      {
        id: '1-2',
        name: 'Logs_2021',
        isDoc: false,
        description: 'Logs for 2021',
        createdAt: '17/03/2025 23:30',
      },
    ],
  },
  {
    id: '2',
    name: 'Satellite_Data',
    isDoc: false,
    description: 'Data from satellites',
    createdAt: '17/03/2025 23:30',
    children: [
      {
        id: '2-1',
        name: 'Data_Part1',
        isDoc: true,
        description: 'Part 1',
        createdAt: '17/03/2025 23:30',
      },
      {
        id: '2-2',
        name: 'Data_Part2',
        isDoc: true,
        description: 'Part 2',
        createdAt: '17/03/2025 23:30',
      },
    ],
  },
  {
    id: '3',
    name: 'Open_Source_Tools',
    isDoc: false,
    description: 'Tools',
    createdAt: '17/03/2025 23:30',
  },
  {
    id: '4',
    name: 'Indian Navy',
    isDoc: false,
    description: 'Navy info',
    createdAt: '17/03/2025 23:30',
  },
  {
    id: '5',
    name: 'VR_AR_Experiments',
    isDoc: false,
    description: 'Experiments',
    createdAt: '17/03/2025 23:30',
  },
  {
    id: '6',
    name: 'Autonomous_Systems',
    isDoc: false,
    description: 'Systems',
    createdAt: '17/03/2025 23:30',
  },
  {
    id: '7',
    name: 'Cybersecurity_Reports',
    isDoc: false,
    description: 'Reports',
    createdAt: '17/03/2025 23:30',
  },
  {
    id: '8',
    name: 'Operating_Systems',
    isDoc: false,
    description: 'Operating Systems',
    createdAt: '17/03/2025 23:30',
  },
  {
    id: '9',
    name: 'note1.docx',
    isDoc: true,
    description: 'Note',
    createdAt: '17/03/2025 23:30',
  },
  {
    id: '10',
    name: 'Networking_Protocols',
    isDoc: false,
    description: 'Protocols',
    createdAt: '17/03/2025 23:30',
  },
];

/* ============================================================
   Main Layout Component
   ============================================================ */

const ExactFigmaDesignUpdated: React.FC = () => {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [createFolderModalOpen, setCreateFolderModalOpen] = useState(false);
  const [uploadDocumentModalOpen, setUploadDocumentModalOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  // Apply filter to tree data
  const filteredTreeData = filterTreeData(sampleTreeData, filterText);

  return (
    <div className="flex h-screen w-screen font-sans text-[14px] text-gray-700">
      {/* Left Panel with Collapse Button */}
      <div
        className={`${
          leftPanelCollapsed ? 'w-0' : 'w-[280px]'
        } transition-all duration-300 flex flex-col border-r bg-white`}
      >
        <div className="px-[16px] py-[16px] border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-[16px] font-semibold text-gray-800">
              Folders & Documents
            </h2>
            <span className="text-[12px] text-gray-500">200+</span>
          </div>
          <button
            onClick={() => setLeftPanelCollapsed(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            &lt;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-[16px] py-[12px]">
          <TreeView items={filteredTreeData} />
        </div>
      </div>
      {/* Expand Button when Left Panel is Collapsed */}
      {leftPanelCollapsed && (
        <div className="w-[20px] flex items-center justify-center border-r bg-white">
          <button
            onClick={() => setLeftPanelCollapsed(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            &gt;
          </button>
        </div>
      )}

      {/* Middle Panel */}
      <div className="flex-1 flex flex-col bg-[#F8F9FC]">
        {/* Top Bar */}
        <div className="px-[24px] py-[16px] bg-white border-b flex items-center justify-between">
          <div className="flex items-center space-x-[8px] text-gray-500">
            <span className="cursor-pointer hover:underline">NSM</span>
            <span>/</span>
            <span className="font-semibold text-gray-800">
              Folders & Documents
            </span>
          </div>
          <div className="flex items-center space-x-[12px]">
            <button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              className="flex items-center bg-gray-200 text-gray-700 px-[8px] py-[6px] rounded hover:bg-gray-300 transition-colors text-[14px]"
            >
              <FilterList fontSize="small" className="mr-[4px]" />
              Filter
            </button>
            <button
              onClick={() => setCreateFolderModalOpen(true)}
              className="flex items-center bg-[#5E60CE] text-white px-[12px] py-[8px] rounded hover:bg-[#4b4cc0] transition-colors text-[14px]"
            >
              <Add className="mr-[4px]" fontSize="small" />
              Create Folder
            </button>
            <button
              onClick={() => setUploadDocumentModalOpen(true)}
              className="flex items-center bg-[#5E60CE] text-white px-[12px] py-[8px] rounded hover:bg-[#4b4cc0] transition-colors text-[14px]"
            >
              <CloudUpload className="mr-[4px]" fontSize="small" />
              Upload Document
            </button>
          </div>
        </div>
        {/* Filter Panel */}
        {filterPanelOpen && (
          <FilterPanel filterText={filterText} setFilterText={setFilterText} />
        )}
        {/* Main Content Tree View */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          <TreeView items={filteredTreeData} />
        </div>
      </div>

      {/* Modals */}
      <CreateFolderModal
        isOpen={createFolderModalOpen}
        onClose={() => setCreateFolderModalOpen(false)}
        onSave={(name, description) => {
          console.log('Folder saved:', name, description);
          // Implement folder creation logic here.
        }}
      />
      <UploadDocumentModal
        isOpen={uploadDocumentModalOpen}
        onClose={() => setUploadDocumentModalOpen(false)}
        onUpload={(file) => {
          console.log('File uploaded:', file);
          // Implement file upload logic here.
        }}
      />
    </div>
  );
};

export default ExactFigmaDesignUpdated;


//  {/* Filter Button */}
//  <button
//  onClick={() => setFilterPanelOpen(!filterPanelOpen)}
//  className="flex items-center justify-center bg-[#2D336B] hover:bg-[#2D336B] w-[35px] h-[35px] rounded-full transition-colors"
// >
//  <FilterAltOutlinedIcon className="text-white" />
// </button>
// {/* Create Folder Button */}
// <button
//  onClick={() => openFolderCreationModal()}
//  className="flex items-center justify-center bg-[#2D336B] !important hover:bg-[#2D336B] w-[35px] h-[35px] rounded-full transition-colors"
//  >
//  <AddBoxOutlinedIcon className="text-white" />
// </button>
// {/* Upload Document Button */}
// <button
//  onClick={() => openFolderUpload()}
//  className="flex items-center bg-[#5E60CE] text-white px-3 py-2 rounded hover:bg-[#4b4cc0] transition-colors"
// >
//  <span>Upload Document</span>
// </button>