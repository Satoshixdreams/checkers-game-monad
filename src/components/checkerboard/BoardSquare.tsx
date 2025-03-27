
import React from 'react';
import { cn } from '@/lib/utils';
import { Piece } from './types';
import CheckerPiece from './CheckerPiece';

interface BoardSquareProps {
  row: number;
  col: number;
  piece: Piece | undefined;
  isValidMove: boolean;
  selectedPieceId: number | null;
  isBlackSquare: boolean;
  onSquareClick: (row: number, col: number) => void;
  onPieceClick: (piece: Piece) => void;
}

const BoardSquare: React.FC<BoardSquareProps> = ({
  row,
  col,
  piece,
  isValidMove,
  selectedPieceId,
  isBlackSquare,
  onSquareClick,
  onPieceClick
}) => {
  return (
    <div 
      className={cn(
        "relative w-full h-full border border-[#0191b4] transition-colors duration-200",
        isBlackSquare 
          ? isValidMove 
            ? "board-square-dark/80 valid-move" 
            : "board-square-dark" 
          : "board-square-light"
      )}
      onClick={() => isBlackSquare && onSquareClick(row, col)}
    >
      {/* Render coordinate label for first column */}
      {col === 0 && (
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-xs font-bold text-white bg-blue-600/80 w-5 h-5 flex items-center justify-center rounded-full">
          {8 - row}
        </span>
      )}
      
      {/* Render coordinate label for last row */}
      {row === 7 && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-xs font-bold text-white bg-blue-600/80 w-5 h-5 flex items-center justify-center rounded-full">
          {String.fromCharCode(97 + col)}
        </span>
      )}
      
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
