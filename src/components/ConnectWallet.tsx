
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ConnectWalletProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (provider: string) => Promise<boolean>;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  open,
  onOpenChange,
  onConnect
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = async (provider: string) => {
    setIsConnecting(true);
    
    try {
      const success = await onConnect(provider);
      
      if (success) {
        toast.success('Wallet connected successfully!');
        onOpenChange(false);
      } else {
        toast.error('Failed to connect wallet');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('An error occurred while connecting');
    } finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-white/10 shadow-xl max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Connect to Monad Testnet
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Connect your wallet to play Checkers and earn rewards
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => handleConnect('metamask')}
            disabled={isConnecting}
            className="h-14 relative overflow-hidden bg-white/10 hover:bg-white/15 border border-white/10 text-white"
          >
            <div className="flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                alt="MetaMask" 
                className="h-6 w-6 mr-3"
              />
              <span className="font-medium">MetaMask</span>
            </div>
          </Button>
          
          <Button
            onClick={() => handleConnect('walletconnect')}
            disabled={isConnecting}
            className="h-14 relative overflow-hidden bg-white/10 hover:bg-white/15 border border-white/10 text-white"
          >
            <div className="flex items-center justify-center">
              <img 
                src="https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.png" 
                alt="WalletConnect" 
                className="h-6 w-10 mr-3 object-contain"
              />
              <span className="font-medium">WalletConnect</span>
            </div>
          </Button>
        </div>
        
        <DialogFooter className="flex-col">
          <div className="text-xs text-white/50 text-center mb-2">
            By connecting, you agree to the Terms of Service and Privacy Policy
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWallet;
