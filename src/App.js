import './App.css';
import './style/root.scss'
import { Board } from './components/Board';
import {useState} from 'react';
import { calculateWinner } from './helpers';
import History from './components/History';
import StatusMessage from './components/StatusMessage';

function App() {
    const NEW_GAME = [{
      board: Array(9).fill(null),
      isXNext: true
    }];
    const [history, setHistory] = useState(NEW_GAME); 
    const [currentMove, setCurrentMove] = useState(0);
    const current = history[currentMove];
    const {winner,winningSquare} = calculateWinner(current.board); 
    const handleSquareClick = (position) => {

        if(current.board[position] || winner) {
            return ; 
        }
        setHistory((prev) => {
          const last = prev[prev.length-1];
          const newBoard = last.board.map((square,pos) => {
                if(pos === position) {
                    return last.isXNext ? 'X' : 'O';
                }
                return square;
            });
          return prev.concat({board: newBoard ,isXNext: !last.isXNext});
        });
        setCurrentMove(prev => prev + 1);
    }
    const moveTo = (move) => {
      setCurrentMove(move);
    };
    const onNewGame = () => {
      setHistory(NEW_GAME);
      setCurrentMove(0);

    }
  return (
    <div className="app">
      <h1>TIC <span className="text-green">TAC</span> TOE</h1>
      <StatusMessage winner = {winner} current = {current}/> 
      <Board board={current.board} handleSquareClick={handleSquareClick} winningSquare={winningSquare}/>
      <button 
        className={`btn-reset ${winner ? 'active' : ''}`} 
        type="button" 
        onClick={onNewGame}
      >
        Start New Game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
      <div className="bg-balls"></div>    
    </div>
  );
}

export default App;
