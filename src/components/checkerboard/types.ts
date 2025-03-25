
export interface Position {
  row: number;
  col: number;
}

export interface Piece {
  id: number;
  player: 'white' | 'black';
  position: Position;
  isKing: boolean;
  isSelected: boolean;
}

export interface CheckerBoardProps {
  currentPlayer: 'white' | 'black';
  onMove: (piece: Piece, newPosition: Position) => void;
}
