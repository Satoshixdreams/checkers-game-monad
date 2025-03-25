
import React from 'react';
import Header from '@/components/Header';
import GameContainer from '@/components/game/GameContainer';
import ConnectWallet from '@/components/ConnectWallet';
import GiftModal from '@/components/GiftModal';
import { GameProvider, useGameContext } from '@/context/GameContext';

const GamePage: React.FC = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

const GameContent: React.FC = () => {
  const { 
    isWalletConnected,
    balance,
    setIsWalletModalOpen,
    isWalletModalOpen,
    isGiftModalOpen,
    setIsGiftModalOpen,
    handleConnectWallet,
    handleSendGift
  } = useGameContext();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        isWalletConnected={isWalletConnected}
        balance={balance}
        onConnectWallet={() => setIsWalletModalOpen(true)}
      />
      
      <GameContainer />
      
      <ConnectWallet 
        open={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
        onConnect={handleConnectWallet}
      />
      
      <GiftModal 
        open={isGiftModalOpen}
        onOpenChange={setIsGiftModalOpen}
        onSendGift={handleSendGift}
        balance={balance.coins}
      />
    </div>
  );
};

export default GamePage;
