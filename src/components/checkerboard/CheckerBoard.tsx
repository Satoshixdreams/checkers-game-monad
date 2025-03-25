
import React, { useState } from 'react';
import { Piece, Position, CheckerBoardProps } from './types';
import { initialBoardSetup, getValidMoves, getPieceAtPosition } from './utils';
import BoardSquare from './BoardSquare';
import BoardCoordinates from './BoardCoordinates';

const CheckerBoard: React.FC<CheckerBoardProps> = ({ currentPlayer, onMove }) => {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardSetup());
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);

  const handlePieceClick = (piece: Piece) => {
    if (piece.player !== currentPlayer) return;

    if (selectedPiece?.id === piece.id) {
      setSelectedPiece(null);
      setValidMoves([]);
      return;
    }

    const moves = getValidMoves(piece, pieces);
    setSelectedPiece(piece);
    setValidMoves(moves);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (!selectedPiece) return;

    const isValidMove = validMoves.some(move => move.row === row && move.col === col);
    
    if (isValidMove) {
      const oldPosition = selectedPiece.position;
      const newPosition = { row, col };
      
      if (Math.abs(row - oldPosition.row) === 2) {
        const middleRow = (oldPosition.row + row) / 2;
        const middleCol = (oldPosition.col + col) / 2;
        
        setPieces(prev => prev.filter(p => 
          p.position.row !== middleRow || p.position.col !== middleCol
        ));
      }
      
      const shouldPromote = 
        (selectedPiece.player === 'white' && row === 0) || 
        (selectedPiece.player === 'black' && row === 7);
      
      setPieces(prev => prev.map(p => 
        p.id === selectedPiece.id 
          ? { 
              ...p, 
              position: newPosition,
              isKing: p.isKing || shouldPromote,
              isSelected: false
            } 
          : p
      ));
      
      onMove(
        selectedPiece, 
        newPosition
      );
      
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  const renderBoard = () => {
    const squares = [];
    
    // Add board coordinates
    squares.push(<BoardCoordinates key="coordinates" />);
    
    // Add board squares
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = getPieceAtPosition(row, col, pieces);
        const isValidMoveSquare = validMoves.some(move => move.row === row && move.col === col);
        
        squares.push(
          <BoardSquare
            key={`${row}-${col}`}
            row={row}
            col={col}
            piece={piece}
            isValidMove={isValidMoveSquare}
            selectedPieceId={selectedPiece?.id || null}
            onSquareClick={handleSquareClick}
            onPieceClick={handlePieceClick}
          />
        );
      }
    }
    
    return squares;
  };

  return (
    <div className="game-board-container">
      <div className="game-board">
        {renderBoard()}
      </div>
    </div>
  );
};

export default CheckerBoard;
