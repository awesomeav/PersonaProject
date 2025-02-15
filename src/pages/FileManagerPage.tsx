// src/pages/FileManagerPage.tsx
import React, { useState, useContext } from "react";
import { FileManagerContext, TreeItem } from "../context/FileManagerContext";
import Breadcrumb from "../components/Breadcrumb";
import FilterPanel from "../components/FilterPanel";
import FileUploadModal from "../components/FileUploadModal";
import FolderCreationModal from "../components/FolderCreationModal";

import FolderTree from "../components/FolderTree";
import FileList from "../components/FileList";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import useModal from "../hooks/useModal";
import PopupMenu from "../components/popupMenu";

function getPath(items: TreeItem[], selectedId: string | null): string[] {
  for (const item of items) {
    if (item.id === selectedId) return [item.id];
    if (item.children) {
      const childPath = getPath(item.children, selectedId);
      if (childPath.length > 0) return [item.id, ...childPath];
    }
  }
  return [];
}

export const FileManagerPage: React.FC = () => {
  const {
    treeData,
    selectedFolder,
    setSelectedFolder,
    filterText,
    setFilterText,
  } = useContext(FileManagerContext);

  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [
    isFolderCreationOpen,
    openFolderCreationModal,
    closeFolderCreationModal,
  ] = useModal();
  const [isFolderUpload, openFolderUpload, closeFolderUpload] = useModal();

  const handleSelectFolder = (item: TreeItem) => {
    setSelectedFolder(item);
  };

  const selectedPath = getPath(
    treeData,
    selectedFolder ? selectedFolder.id : null
  );

  const addMenuOptions = [
    {
      id: 1,
      label: "Create Folder",
      onClick: () => { openFolderCreationModal()},
      dataTestId: "create-Folder",
      hidden: false,
    },
    {
      id: 2,
      label: "Upload Folder",
      onClick: () => {openFolderUpload()},
      dataTestId: "upload-folder",
      hidden: false,
    },
  ].filter((option) => option.hidden !== true);
  return (
    <div className="flex h-screen w-screen font-sans text-[14px] text-gray-700">
      {/* Left Panel */}
      <div
        className={`transition-all duration-300 ${
          leftPanelCollapsed ? "w-0" : "w-[280px]"
        } flex flex-col border-r bg-white`}
      >
        <div className="px-4 py-4 border-b flex items-center justify-between">
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
        <FolderTree
          items={treeData}
          onSelect={handleSelectFolder}
          selectedFolderId={selectedFolder ? selectedFolder.id : null}
          selectedPath={selectedPath}
        />
      </div>
      {leftPanelCollapsed && (
        <div className="w-6 flex items-center justify-center border-r bg-white">
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
        <div className="px-6 py-4 bg-white border-b flex items-center justify-between">
          <Breadcrumb />
          <div className="flex relative items-center space-x-3  ">
            <button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              className="flex items-center justify-center bg-[#2D336B] hover:bg-[#2D336B] w-[35px] h-[35px] rounded-full transition-colors"
            >
              <FilterAltOutlinedIcon className="text-white" />
            </button>
            <PopupMenu
              triggerNode={
                <div className="bg-white rounded-full text-black">
                  <button
                    onClick={() => {}}
                    className="flex items-center justify-center bg-[#2D336B] hover:bg-[#2D336B] w-[35px] h-[35px] rounded-full transition-colors"
                  >
                    <AddBoxOutlinedIcon className="text-white" />
                  </button>
                </div>
              }
              className="absolute top-full right-5  mt-2"
              menuItems={addMenuOptions}
            />
          </div>
        </div>
        {filterPanelOpen && (
          <FilterPanel filterText={filterText} setFilterText={setFilterText} />
        )}
        <div className="flex-1 overflow-y-auto p-6 bg-[#E2ECF8]">
          <FileList
            items={treeData}
            onSelect={handleSelectFolder}
            selectedFolderId={selectedFolder ? selectedFolder.id : null}
            onEdit={(item) => {}}
            onDelete={(item) => {}}
            onCreateFolder={() => {}}
            onUploadDocument={() => {}}
          />
        </div>
      </div>
      {/* Modals */}

      {isFolderCreationOpen && (
        <FolderCreationModal
          open={isFolderCreationOpen}
          closeModal={closeFolderCreationModal}
          onSave={(name, description) => {
            console.log("Folder created:", name, description);
            // TODO: Update your folder treeData here.
          }}
        />
      )}

      {isFolderUpload && (
        <FileUploadModal
          isOpen={isFolderUpload}
          onClose={closeFolderUpload}
          onUpload={(file) => {
            console.log("File uploaded:", file);
            // TODO: Implement file upload logic (update treeData) here.
          }}
        />
      )}
    </div>
  );
};
