
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
        "absolute w-[60%] h-[60%] bottom-0 left-0 rounded-tl-none rounded-tr-full rounded-br-full rounded-bl-full cursor-pointer",
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
