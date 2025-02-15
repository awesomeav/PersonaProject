// src/App.tsx
import {FileManagerPage} from './pages/FileManagerPage';
import FileManagerProvider from './context/FileManagerContext';

function App() {
  return (
    <FileManagerProvider>
      <FileManagerPage />
    </FileManagerProvider>
  );
}

export default App;
