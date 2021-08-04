import React,{useState} from 'react'
import Square from './Square'

export const Board = ({board,handleSquareClick, winningSquare}) => {
    const renderSquare = position => {
        const isWinningSquare = winningSquare.includes(position);
        return (
            <Square 
                value={board[position]}
                onClick= {() => handleSquareClick(position)}
                isWinningSquare= {isWinningSquare}
            />
        )
    } 
    console.log(board);
    return (
        <div className="board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}
