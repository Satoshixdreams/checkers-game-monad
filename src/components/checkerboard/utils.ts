
import { Piece, Position } from './types';

export const initialBoardSetup = (): Piece[] => {
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

export const getPieceAtPosition = (row: number, col: number, pieces: Piece[]): Piece | undefined => {
  return pieces.find(p => p.position.row === row && p.position.col === col);
};

export const getValidMoves = (piece: Piece, pieces: Piece[]): Position[] => {
  const validMoves: Position[] = [];
  const { row, col } = piece.position;
  const direction = piece.player === 'white' ? -1 : 1;
  
  const rowDirections = piece.isKing ? [direction, -direction] : [direction];
  
  for (const rowDir of rowDirections) {
    for (const colDir of [-1, 1]) {
      const newRow = row + rowDir;
      const newCol = col + colDir;
      
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (!getPieceAtPosition(newRow, newCol, pieces)) {
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
        const middlePiece = getPieceAtPosition(middleRow, middleCol, pieces);
        
        if (
          middlePiece && 
          middlePiece.player !== piece.player && 
          !getPieceAtPosition(jumpRow, jumpCol, pieces)
        ) {
          validMoves.push({ row: jumpRow, col: jumpCol });
        }
      }
    }
  }
  
  return validMoves;
};
