
import React from 'react';
import { cn } from '@/lib/utils';
import { Piece, Position } from './types';
import CheckerPiece from './CheckerPiece';

interface BoardSquareProps {
  row: number;
  col: number;
  piece: Piece | undefined;
  isValidMove: boolean;
  selectedPieceId: number | null;
  onSquareClick: (row: number, col: number) => void;
  onPieceClick: (piece: Piece) => void;
}

const BoardSquare: React.FC<BoardSquareProps> = ({
  row,
  col,
  piece,
  isValidMove,
  selectedPieceId,
  onSquareClick,
  onPieceClick
}) => {
  const isBlackSquare = (row + col) % 2 === 1;
  
  return (
    <div 
      className={cn(
        "absolute overflow-hidden transition-colors duration-200",
        isBlackSquare 
          ? isValidMove 
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
      onClick={() => isBlackSquare && onSquareClick(row, col)}
    >
      {piece && (
        <CheckerPiece 
          piece={piece} 
          isSelected={selectedPieceId === piece.id}
          onClick={onPieceClick}
        />
      )}
    </div>
  );
};

export default BoardSquare;
