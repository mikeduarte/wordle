
import './App.css';

import Wordle from './component/Wordle/Wordle';

import { words } from './utils/words';

function App() {
  return (
    <div className="App">
      <Wordle words={words} />
    </div>
  );
}

export default App;
