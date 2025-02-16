// src/App.tsx
import {FileManagerPage} from './pages/FileManagerPage';
import FileManagerProvider from './context/FileManagerContext';
import SquareGrid from './components/Game';
import ShuffleGrid from './components/ShuffleGrid';
function App() {
  return (
    <ShuffleGrid/>
  );
}

export default App;
