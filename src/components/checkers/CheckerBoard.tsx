
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Piece, Position, CheckerBoardProps } from './types';
import { initialBoardSetup, getValidMoves, getPieceAtPosition } from './utils';
import CheckerPiece from './CheckerPiece';

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
    
    // Render row numbers
    for (let row = 0; row < 8; row++) {
      squares.push(
        <div 
          key={`row-label-${row}`} 
          className="absolute text-xs font-bold text-white bg-blue-600/80 w-6 h-6 flex items-center justify-center z-10" 
          style={{ 
            left: '-2rem', 
            top: `calc(${row * 12.5}% + 6.25% - 0.75rem)`,
          }}
        >
          {8 - row}
        </div>
      );
    }
    
    // Render column letters
    for (let col = 0; col < 8; col++) {
      squares.push(
        <div 
          key={`col-label-${col}`} 
          className="absolute text-xs font-bold text-white bg-blue-600/80 w-6 h-6 flex items-center justify-center z-10" 
          style={{ 
            bottom: '-2rem', 
            left: `calc(${col * 12.5}% + 6.25% - 0.75rem)`,
          }}
        >
          {String.fromCharCode(97 + col)}
        </div>
      );
    }
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isBlackSquare = (row + col) % 2 === 1;
        const piece = getPieceAtPosition(row, col, pieces);
        const isValidMoveSquare = validMoves.some(move => move.row === row && move.col === col);
        
        squares.push(
          <div 
            key={`${row}-${col}`} 
            className={cn(
              "absolute overflow-hidden transition-colors duration-200",
              isBlackSquare 
                ? isValidMoveSquare 
                  ? "board-square-dark/70 valid-move" 
                  : "board-square-dark" 
                : "board-square-light"
            )}
            style={{ 
              width: '12.5%', 
              height: '12.5%', 
              top: `${row * 12.5}%`, 
              left: `${col * 12.5}%`,
            }}
            onClick={() => isBlackSquare && handleSquareClick(row, col)}
          >
            {piece && (
              <CheckerPiece 
                piece={piece} 
                isSelected={selectedPiece?.id === piece.id}
                onClick={handlePieceClick}
              />
            )}
          </div>
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
