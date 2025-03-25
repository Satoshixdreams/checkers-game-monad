
import React from 'react';
import GameInfo from '@/components/GameInfo';
import GameRules from '@/components/game/GameRules';
import { useGameContext } from '@/context/GameContext';

const GameSidebar: React.FC = () => {
  const { 
    players, 
    currentPlayer, 
    gameStatus, 
    winner, 
    handleForfeit, 
    setIsGiftModalOpen 
  } = useGameContext();

  return (
    <div className="w-full lg:w-auto flex flex-col gap-6">
      <GameInfo 
        players={players}
        currentPlayer={currentPlayer}
        gameStatus={gameStatus}
        winner={winner}
        onForfeit={handleForfeit}
        onOpenGiftModal={() => setIsGiftModalOpen(true)}
      />
      <GameRules />
    </div>
  );
};

export default GameSidebar;
