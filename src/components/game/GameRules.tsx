
import React from 'react';

const GameRules: React.FC = () => {
  return (
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
  );
};

export default GameRules;
