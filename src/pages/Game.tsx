
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import CheckerBoard from '@/components/CheckerBoard';
import GameInfo from '@/components/GameInfo';
import GiftModal from '@/components/GiftModal';
import ConnectWallet from '@/components/ConnectWallet';

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

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isCurrentPlayer: boolean;
}

const Game = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [balance, setBalance] = useState({ bitmon: 0, coins: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [gameStatus, setGameStatus] = useState<'waiting' | 'playing' | 'ended'>('waiting');
  const [winner, setWinner] = useState<string | null>(null);
  
  const [players, setPlayers] = useState<{ white: Player; black: Player }>({
    white: {
      id: 'player1',
      name: 'You',
      isCurrentPlayer: true
    },
    black: {
      id: 'player2',
      name: 'Static Cerberus',
      isCurrentPlayer: false
    }
  });

  // Check if wallet is connected on mount
  useEffect(() => {
    // For demo purposes, we'll show the wallet dialog if not connected
    if (!isWalletConnected) {
      setIsWalletModalOpen(true);
    } else {
      startGame();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnectWallet = async (provider: string) => {
    // Simulate wallet connection
    console.log(`Connecting wallet with ${provider}...`);
    
    // Mock successful connection after a short delay
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setIsWalletConnected(true);
        setBalance({ bitmon: 1, coins: 14 });
        startGame();
        resolve(true);
      }, 1500);
    });
  };

  const startGame = () => {
    setGameStatus('playing');
    toast.success('Game started! Your turn.');
  };

  const handleMove = (piece: Piece, newPosition: Position) => {
    // Switch turns after a move
    const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
    setCurrentPlayer(nextPlayer);
    
    // Update player current status
    setPlayers(prev => ({
      white: {
        ...prev.white,
        isCurrentPlayer: nextPlayer === 'white'
      },
      black: {
        ...prev.black,
        isCurrentPlayer: nextPlayer === 'black'
      }
    }));

    // For demo purposes, let's have a 20% chance of winning after each move
    if (Math.random() < 0.2) {
      handleGameEnd(piece.player);
    }

    // For AI opponent, simulate a move after 1.5 seconds
    if (nextPlayer === 'black') {
      setTimeout(() => {
        // Simulate AI making a move
        setCurrentPlayer('white');
        setPlayers(prev => ({
          white: {
            ...prev.white,
            isCurrentPlayer: true
          },
          black: {
            ...prev.black,
            isCurrentPlayer: false
          }
        }));
        
        toast.info("Static Cerberus made a move. Your turn!");
      }, 1500);
    }
  };

  const handleGameEnd = (winnerColor: 'white' | 'black') => {
    setGameStatus('ended');
    const winnerId = winnerColor === 'white' ? players.white.id : players.black.id;
    setWinner(winnerId);
    
    if (winnerColor === 'white') {
      // Player wins
      toast.success('Congratulations! You won the game!');
      // Award Bitmon
      setBalance(prev => ({
        ...prev,
        bitmon: prev.bitmon + 1
      }));
      
      toast.success('You earned 1 Bitmon!');
      
      // Show gift modal
      setTimeout(() => {
        setIsGiftModalOpen(true);
      }, 1000);
    } else {
      // AI wins
      toast.error('Game over! Static Cerberus won the game.');
    }
  };

  const handleForfeit = () => {
    if (gameStatus !== 'playing') return;
    
    // Forfeit gives the win to the opponent
    const winnerId = currentPlayer === 'white' ? players.black.id : players.white.id;
    setWinner(winnerId);
    setGameStatus('ended');
    
    toast.info('You forfeited the game');
  };

  const handleSendGift = async (giftId: string, recipient: string) => {
    // Simulate sending a gift
    console.log(`Sending ${giftId} to ${recipient}...`);
    
    // Deduct cost from balance
    const giftPrice = giftId === 'coffee' ? 5 : 10;
    
    setBalance(prev => ({
      ...prev,
      coins: prev.coins - giftPrice
    }));
    
    // Mock successful gift sending after a short delay
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        isWalletConnected={isWalletConnected}
        balance={balance}
        onConnectWallet={() => setIsWalletModalOpen(true)}
      />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
          <div className="w-full lg:flex-1 flex justify-center">
            <CheckerBoard 
              currentPlayer={currentPlayer}
              onMove={handleMove}
            />
          </div>
          
          <div className="w-full lg:w-auto flex flex-col gap-6">
            <GameInfo 
              players={players}
              currentPlayer={currentPlayer}
              gameStatus={gameStatus}
              winner={winner}
              onForfeit={handleForfeit}
              onOpenGiftModal={() => setIsGiftModalOpen(true)}
            />
            
            <div className="glass-panel p-4 md:p-6 w-full max-w-xs">
              <h2 className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                GAME RULES
              </h2>
              <div className="space-y-2 text-sm text-white/80">
                <p>• Move pieces diagonally forward</p>
                <p>• Capture opponent's pieces by jumping over them</p>
                <p>• Reach the opposite end to crown a piece as King</p>
                <p>• Kings can move diagonally in any direction</p>
                <p>• Win by capturing all opponent's pieces</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
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

export default Game;
