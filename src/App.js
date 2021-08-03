import logo from './logo.svg';
import './App.css';
import './style/root.scss'
import { Board } from './components/Board';

function App() {
  return (
    <div className="app">
      <h1>TIC TAC TOE!</h1>
      <Board/>
    </div>
  );
}

export default App;
