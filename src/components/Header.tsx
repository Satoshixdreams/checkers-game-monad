
import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Gift, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isWalletConnected: boolean;
  balance: { bitmon: number; coins: number };
  onConnectWallet: () => void;
}

const Header: React.FC<HeaderProps> = ({ isWalletConnected, balance, onConnectWallet }) => {
  return (
    <header className="w-full py-4 px-6 backdrop-blur-md bg-black/20 border-b border-white/10 flex items-center justify-between">
      <div className="flex items-center">
        <Link 
          to="/" 
          className="flex items-center mr-6 text-2xl font-bold text-white"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">CHECKERS</span>
        </Link>
        
        <nav className="hidden md:flex space-x-1">
          <Link to="/game" className="nav-item active">GAMES</Link>
          <Link to="/shop" className="nav-item">SHOP</Link>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        {isWalletConnected ? (
          <>
            <div className="currency-badge">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{balance.bitmon}</span>
            </div>
            <div className="currency-badge">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#FFA500" strokeWidth="2"/>
                <path d="M12 6V18" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 10H16" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 14H16" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>{balance.coins}</span>
            </div>
          </>
        ) : (
          <Button 
            onClick={onConnectWallet} 
            className="link-wallet-btn glow-effect"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        )}
        <Button variant="ghost" className="relative rounded-full p-2 bg-white/5 hover:bg-white/10">
          <Gift className="h-5 w-5" />
        </Button>
        {isWalletConnected && (
          <Button variant="ghost" className="rounded-full p-2 bg-white/5 hover:bg-white/10">
            <Wallet className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
