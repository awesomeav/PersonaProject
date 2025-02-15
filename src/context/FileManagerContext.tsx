import { createContext, useState, ReactNode } from 'react';

export type TreeItem = {
  id: string;
  name: string;
  isDoc: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  children?: TreeItem[];
  count?: number|undefined;
};

interface FileManagerContextProps {
  selectedFolder: TreeItem | null;
  setSelectedFolder: (folder: TreeItem | null) => void;
  treeData: TreeItem[];
  setTreeData: (data: TreeItem[]) => void;
  filterText: string;
  setFilterText: (text: string) => void;
}

export const FileManagerContext = createContext<FileManagerContextProps>({
  selectedFolder: null,
  setSelectedFolder: () => {},
  treeData: [],
  setTreeData: () => {},
  filterText: '',
  setFilterText: () => {},
});

export const FileManagerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFolder, setSelectedFolder] = useState<TreeItem | null>(null);
  const [treeData, setTreeData] = useState<TreeItem[]>([
    {
      id: '1',
      name: 'Mission_Logs',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
      count:2,
      children: [
        {
          id: '1-1',
          name: 'This file includes the most dangerous se...',
          isDoc: false,
          description: 'Logs for 2020',
          createdAt: '17/03/2025 23:30',
          updatedAt: '17/03/2025 23:30',
          children: [
            { id: '1-1-1', name: 'log1.txt', isDoc: true, description: 'First log', createdAt: '17/03/2025 23:30', updatedAt: '17/03/2025 23:30' },
            { id: '1-1-2', name: 'log2.txt', isDoc: true, description: 'Second log', createdAt: '17/03/2025 23:30', updatedAt: '17/03/2025 23:30' },
          ],
        },
        {
          id: '1-2',
          name: 'This file includes the most dangerous se...',
          isDoc: false,
          description: 'Logs for 2021',
          createdAt: '17/03/2025 23:30',
          updatedAt: '17/03/2025 23:30',
        },
      ],
      
    },
    {
      id: '2',
      name: 'Satellite_Data',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
      count:2,

      children: [
        { id: '2-1', name: 'Data_Part1', isDoc: true, description: 'Part 1', createdAt: '17/03/2025 23:30', updatedAt: '17/03/2025 23:30' },
        { id: '2-2', name: 'Data_Part2', isDoc: true, description: 'Part 2', createdAt: '17/03/2025 23:30', updatedAt: '17/03/2025 23:30' },
      ],
    },
    {
      id: '3',
      name: 'Open_Source_Tools',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      id: '4',
      name: 'Indian Navy',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      id: '5',
      name: 'VR_AR_Experiments',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      id: '6',
      name: 'Autonomous_Systems',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      id: '7',
      name: 'Cybersecurity_Reports',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      id: '8',
      name: 'Operating_Systems',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      id: '9',
      name: 'note1.docx',
      isDoc: true,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      id: '10',
      name: 'Networking_Protocols',
      isDoc: false,
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
  ]);
  const [filterText, setFilterText] = useState('');

  return (
    <FileManagerContext.Provider
      value={{ selectedFolder, setSelectedFolder, treeData, setTreeData, filterText, setFilterText }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};

export default FileManagerProvider;
