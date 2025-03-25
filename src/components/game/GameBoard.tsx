
import React from 'react';
import CheckerBoard from '@/components/checkers/CheckerBoard';
import { useGameContext } from '@/context/GameContext';

const GameBoard: React.FC = () => {
  const { currentPlayer, handleMove } = useGameContext();
  
  return (
    <div className="w-full lg:flex-1 flex justify-center">
      <CheckerBoard 
        currentPlayer={currentPlayer}
        onMove={handleMove}
      />
    </div>
  );
};

export default GameBoard;
