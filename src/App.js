import logo from './logo.svg';
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
      <h1>TIC TAC TOE!</h1>
      <StatusMessage winner = {winner} current = {current}/> 
      <Board board={current.board} handleSquareClick={handleSquareClick} winningSquare={winningSquare}/>
      <button type="button" onClick={onNewGame}>Start New Game</button>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
}

export default App;
