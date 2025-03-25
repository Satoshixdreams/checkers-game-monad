
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Piece } from './types';

interface CheckerPieceProps {
  piece: Piece;
  isSelected: boolean;
  onClick: (piece: Piece) => void;
}

const CheckerPiece: React.FC<CheckerPieceProps> = ({ piece, isSelected, onClick }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 15 }}
      className={cn(
        "absolute w-[80%] h-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer",
        piece.player === 'white' ? "white-piece" : "black-piece",
        piece.isKing && "king",
        isSelected && "ring-2 ring-yellow-400 ring-opacity-80"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick(piece);
      }}
    />
  );
};

export default CheckerPiece;
