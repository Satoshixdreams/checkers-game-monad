
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { Piece, Position } from '@/components/checkers/types';

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isCurrentPlayer: boolean;
}

interface GameContextProps {
  isWalletConnected: boolean;
  setIsWalletConnected: (value: boolean) => void;
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (value: boolean) => void;
  isGiftModalOpen: boolean;
  setIsGiftModalOpen: (value: boolean) => void;
  balance: { bitmon: number; coins: number };
  setBalance: (balance: { bitmon: number; coins: number }) => void;
  currentPlayer: 'white' | 'black';
  setCurrentPlayer: (player: 'white' | 'black') => void;
  gameStatus: 'waiting' | 'playing' | 'ended';
  setGameStatus: (status: 'waiting' | 'playing' | 'ended') => void;
  winner: string | null;
  setWinner: (winner: string | null) => void;
  players: { white: Player; black: Player };
  setPlayers: React.Dispatch<React.SetStateAction<{ white: Player; black: Player }>>;
  startGame: () => void;
  handleMove: (piece: Piece, newPosition: Position) => void;
  handleGameEnd: (winnerColor: 'white' | 'black') => void;
  handleForfeit: () => void;
  handleConnectWallet: (provider: string) => Promise<boolean>;
  handleSendGift: (giftId: string, recipient: string) => Promise<boolean>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  const startGame = () => {
    setGameStatus('playing');
    toast.success('Game started! Your turn.');
  };

  const handleMove = (piece: Piece, newPosition: Position) => {
    const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
    setCurrentPlayer(nextPlayer);
    
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

    if (Math.random() < 0.2) {
      handleGameEnd(piece.player);
    }

    if (nextPlayer === 'black') {
      setTimeout(() => {
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
      toast.success('Congratulations! You won the game!');
      setBalance(prev => ({
        ...prev,
        bitmon: prev.bitmon + 1
      }));
      
      toast.success('You earned 1 Bitmon!');
      
      setTimeout(() => {
        setIsGiftModalOpen(true);
      }, 1000);
    } else {
      toast.error('Game over! Static Cerberus won the game.');
    }
  };

  const handleForfeit = () => {
    if (gameStatus !== 'playing') return;
    
    const winnerId = currentPlayer === 'white' ? players.black.id : players.white.id;
    setWinner(winnerId);
    setGameStatus('ended');
    
    toast.info('You forfeited the game');
  };

  const handleConnectWallet = async (provider: string) => {
    console.log(`Connecting wallet with ${provider}...`);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setIsWalletConnected(true);
        setBalance({ bitmon: 1, coins: 14 });
        startGame();
        resolve(true);
      }, 1500);
    });
  };

  const handleSendGift = async (giftId: string, recipient: string) => {
    console.log(`Sending ${giftId} to ${recipient}...`);
    
    const giftPrice = giftId === 'coffee' ? 5 : 10;
    
    setBalance(prev => ({
      ...prev,
      coins: prev.coins - giftPrice
    }));
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  const value = {
    isWalletConnected,
    setIsWalletConnected,
    isWalletModalOpen,
    setIsWalletModalOpen,
    isGiftModalOpen,
    setIsGiftModalOpen,
    balance,
    setBalance,
    currentPlayer,
    setCurrentPlayer,
    gameStatus,
    setGameStatus,
    winner,
    setWinner,
    players,
    setPlayers,
    startGame,
    handleMove,
    handleGameEnd,
    handleForfeit,
    handleConnectWallet,
    handleSendGift
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
