import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Position {
  row: number;
  col: number;
}

interface Piece {
  id: number;
  player: 'white' | 'black';
  position: Position;
  isKing: boolean;
  isSelected: boolean;
}

interface CheckerBoardProps {
  currentPlayer: 'white' | 'black';
  onMove: (piece: Piece, newPosition: Position) => void;
}

const initialBoardSetup = (): Piece[] => {
  const pieces: Piece[] = [];
  let id = 1;

  // Set up black pieces (rows 0-2)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        pieces.push({
          id: id++,
          player: 'black',
          position: { row, col },
          isKing: false,
          isSelected: false,
        });
      }
    }
  }

  // Set up white pieces (rows 5-7)
  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        pieces.push({
          id: id++,
          player: 'white',
          position: { row, col },
          isKing: false,
          isSelected: false,
        });
      }
    }
  }

  return pieces;
};

const CheckerBoard: React.FC<CheckerBoardProps> = ({ currentPlayer, onMove }) => {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardSetup());
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [boardRotation, setBoardRotation] = useState(0);

  const getValidMoves = (piece: Piece): Position[] => {
    const validMoves: Position[] = [];
    const { row, col } = piece.position;
    const direction = piece.player === 'white' ? -1 : 1;
    
    const rowDirections = piece.isKing ? [direction, -direction] : [direction];
    
    for (const rowDir of rowDirections) {
      for (const colDir of [-1, 1]) {
        const newRow = row + rowDir;
        const newCol = col + colDir;
        
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          if (!getPieceAtPosition(newRow, newCol)) {
            validMoves.push({ row: newRow, col: newCol });
          }
        }
      }
      
      for (const colDir of [-1, 1]) {
        const jumpRow = row + rowDir * 2;
        const jumpCol = col + colDir * 2;
        const middleRow = row + rowDir;
        const middleCol = col + colDir;
        
        if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8) {
          const middlePiece = getPieceAtPosition(middleRow, middleCol);
          
          if (
            middlePiece && 
            middlePiece.player !== piece.player && 
            !getPieceAtPosition(jumpRow, jumpCol)
          ) {
            validMoves.push({ row: jumpRow, col: jumpCol });
          }
        }
      }
    }
    
    return validMoves;
  };

  const getPieceAtPosition = (row: number, col: number): Piece | undefined => {
    return pieces.find(p => p.position.row === row && p.position.col === col);
  };

  const handlePieceClick = (piece: Piece) => {
    if (piece.player !== currentPlayer) return;

    if (selectedPiece?.id === piece.id) {
      setSelectedPiece(null);
      setValidMoves([]);
      return;
    }

    const moves = getValidMoves(piece);
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
    
    for (let row = 0; row < 8; row++) {
      squares.push(
        <div 
          key={`row-label-${row}`} 
          className="board-coordinates" 
          style={{ 
            left: '-1.5rem', 
            top: `calc(${12.5 * row + 6.25}% - 0.5rem)`,
          }}
        >
          {8 - row}
        </div>
      );
    }
    
    for (let col = 0; col < 8; col++) {
      squares.push(
        <div 
          key={`col-label-${col}`} 
          className="board-coordinates" 
          style={{ 
            bottom: '-1.5rem', 
            left: `calc(${12.5 * col + 6.25}% - 0.5rem)`,
          }}
        >
          {String.fromCharCode(97 + col)}
        </div>
      );
    }
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isBlackSquare = (row + col) % 2 === 1;
        const piece = getPieceAtPosition(row, col);
        const isValidMoveSquare = validMoves.some(move => move.row === row && move.col === col);
        
        squares.push(
          <div 
            key={`${row}-${col}`} 
            className={cn(
              "w-1/8 h-1/8 absolute transition-colors duration-200",
              isBlackSquare 
                ? isValidMoveSquare 
                  ? "bg-game-board-dark/70 valid-move" 
                  : "bg-game-board-dark" 
                : "bg-game-board-light"
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
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className={cn(
                  "checker-piece absolute w-5/6 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer",
                  piece.player === 'white' ? "white-piece" : "black-piece",
                  piece.isKing && "king",
                  piece.id === selectedPiece?.id && "ring-2 ring-yellow-400 ring-opacity-80"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePieceClick(piece);
                }}
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
      <div className="game-board border-4 border-game-dark shadow-[0_0_30px_rgba(139,92,246,0.3)]">
        {renderBoard()}
      </div>
    </div>
  );
};

export default CheckerBoard;
