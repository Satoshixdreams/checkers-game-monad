
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isCurrentPlayer: boolean;
}

interface GameInfoProps {
  players: { white: Player; black: Player };
  currentPlayer: 'white' | 'black';
  gameStatus: 'waiting' | 'playing' | 'ended';
  winner: string | null;
  onForfeit: () => void;
  onOpenGiftModal: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  players,
  currentPlayer,
  gameStatus,
  winner,
  onForfeit,
  onOpenGiftModal
}) => {
  const renderPlayerInfo = (player: Player, pieceColor: 'white' | 'black') => {
    const isCurrentTurn = currentPlayer === pieceColor && gameStatus === 'playing';
    
    return (
      <div className={`p-4 rounded-xl glass-panel flex items-center ${isCurrentTurn ? 'ring-2 ring-primary/80' : ''}`}>
        <div className="relative">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
            {player.avatar ? (
              <img 
                src={player.avatar} 
                alt={player.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-xl font-bold text-white/70">
                {player.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {isCurrentTurn && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
          )}
        </div>
        <div className="ml-3 flex-1">
          <div className="font-semibold text-sm">{player.name}</div>
          <div className="flex items-center mt-1">
            <div 
              className={`w-3 h-3 rounded-full ${pieceColor === 'white' ? 'bg-white' : 'bg-black'}`}
            ></div>
            <span className="ml-1 text-xs text-white/70">{pieceColor === 'white' ? 'White' : 'Black'}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel p-4 md:p-6 w-full max-w-xs">
      <h2 className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        GAME INFO
      </h2>
      
      <div className="space-y-3 mb-6">
        {renderPlayerInfo(players.black, 'black')}
        
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
            VS
          </div>
        </div>
        
        {renderPlayerInfo(players.white, 'white')}
      </div>
      
      {gameStatus === 'playing' && (
        <div className="bg-white/5 rounded-lg p-3 mb-4">
          <div className="text-sm font-medium text-center">
            {currentPlayer === 'white' ? players.white.name : players.black.name}'s turn
          </div>
        </div>
      )}
      
      {gameStatus === 'ended' && winner && (
        <div className="bg-primary/20 rounded-lg p-3 mb-4">
          <div className="text-sm font-medium text-center">
            {winner === players.white.id ? players.white.name : players.black.name} won!
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <Button 
          onClick={onForfeit}
          variant="outline" 
          className="flex-1 bg-white/5 hover:bg-white/10 border-white/10"
          disabled={gameStatus !== 'playing'}
        >
          Forfeit
        </Button>
        <Button 
          onClick={onOpenGiftModal}
          className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          <Gift className="mr-2 h-4 w-4" />
          Send Gift
        </Button>
      </div>
    </div>
  );
};

export default GameInfo;
