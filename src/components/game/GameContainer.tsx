
import React, { useEffect } from 'react';
import GameBoard from '@/components/game/GameBoard';
import GameSidebar from '@/components/game/GameSidebar';
import { useGameContext } from '@/context/GameContext';

const GameContainer: React.FC = () => {
  const { 
    isWalletConnected, 
    setIsWalletModalOpen, 
    startGame 
  } = useGameContext();

  useEffect(() => {
    if (!isWalletConnected) {
      setIsWalletModalOpen(true);
    } else {
      startGame();
    }
  }, [isWalletConnected, setIsWalletModalOpen, startGame]);

  return (
    <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
        <GameBoard />
        <GameSidebar />
      </div>
    </main>
  );
};

export default GameContainer;
