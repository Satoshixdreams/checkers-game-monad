
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ConnectWallet from '@/components/ConnectWallet';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [balance, setBalance] = useState({ bitmon: 0, coins: 0 });

  const handleConnectWallet = async (provider: string) => {
    // Simulate wallet connection
    console.log(`Connecting wallet with ${provider}...`);
    
    // Mock successful connection after a short delay
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setIsWalletConnected(true);
        setBalance({ bitmon: 1, coins: 14 });
        resolve(true);
      }, 1500);
    });
  };

  const handlePlayNow = () => {
    if (isWalletConnected) {
      navigate('/game');
    } else {
      setIsWalletModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Header 
        isWalletConnected={isWalletConnected}
        balance={balance}
        onConnectWallet={() => setIsWalletModalOpen(true)}
      />
      
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Checkers on Monad
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6 max-w-lg">
              Play the classic game of checkers on the Monad testnet, win Bitmon and send gifts to friends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handlePlayNow}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium px-8 py-6 rounded-lg shadow-glow"
              >
                Play Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 bg-white/5 hover:bg-white/10 px-8 py-6 rounded-lg"
                onClick={() => navigate('/leaderboard')}
              >
                Leaderboard
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-3xl -z-10"></div>
              <img 
                src="/lovable-uploads/a77554fb-18c1-4915-91de-0914cd992933.png" 
                alt="Checkers Game" 
                className="max-w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="container mx-auto px-4 py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              How It Works
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
                  <path d="M12 7V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
              <p className="text-white/70">
                Link your wallet to the Monad testnet to start playing and earning rewards.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
                  <path d="M3 9H21" stroke="white" strokeWidth="2"/>
                  <path d="M9 21V9" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Play Checkers</h3>
              <p className="text-white/70">
                Challenge players to matches of checkers and show off your strategic skills.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="white" strokeWidth="2"/>
                  <path d="M12 15V23" stroke="white" strokeWidth="2"/>
                  <path d="M7 20H17" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Win & Gift</h3>
              <p className="text-white/70">
                Win Bitmon tokens and send special gifts like roses or coffee to your friends.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center text-white/50 text-sm">
          © 2023 Checkers on Monad. All rights reserved.
        </div>
      </footer>
      
      <ConnectWallet 
        open={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
        onConnect={handleConnectWallet}
      />
    </div>
  );
};

export default Index;
