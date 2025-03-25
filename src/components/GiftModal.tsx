
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
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Coffee, Rose, X } from 'lucide-react';

interface Gift {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number;
}

interface GiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendGift: (giftId: string, recipient: string) => Promise<boolean>;
  balance: number;
}

const gifts: Gift[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    icon: <Coffee className="h-8 w-8 text-amber-400" />,
    price: 5
  },
  {
    id: 'rose',
    name: 'Rose',
    icon: <Rose className="h-8 w-8 text-rose-400" />,
    price: 10
  }
];

const GiftModal: React.FC<GiftModalProps> = ({ 
  open, 
  onOpenChange,
  onSendGift,
  balance
}) => {
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [recipient, setRecipient] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendGift = async () => {
    if (!selectedGift) {
      toast.error('Please select a gift to send');
      return;
    }

    if (!recipient) {
      toast.error('Please enter a recipient address');
      return;
    }

    const selectedGiftObj = gifts.find(g => g.id === selectedGift);
    if (!selectedGiftObj) return;

    if (selectedGiftObj.price > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsSending(true);
    
    try {
      const success = await onSendGift(selectedGift, recipient);
      
      if (success) {
        toast.success(`${selectedGiftObj.name} sent successfully!`);
        setSelectedGift(null);
        setRecipient('');
        onOpenChange(false);
      } else {
        toast.error('Failed to send gift');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-white/10 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Send a Gift
          </DialogTitle>
          <DialogDescription className="text-center text-white/70">
            Brighten someone's day with a virtual gift
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className={`gift-item cursor-pointer ${selectedGift === gift.id ? 'bg-white/20 ring-2 ring-primary/70' : ''}`}
              onClick={() => setSelectedGift(gift.id)}
            >
              <div className="mb-2">{gift.icon}</div>
              <div className="font-medium">{gift.name}</div>
              <div className="flex items-center mt-1 text-sm text-amber-400">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {gift.price}
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Recipient Address</label>
          <Input
            placeholder="Enter wallet address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="bg-white/5 border-white/20 focus:border-primary/70"
          />
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/20 hover:bg-white/10"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSendGift}
            disabled={!selectedGift || !recipient || isSending}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            {isSending ? 'Sending...' : 'Send Gift'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GiftModal;
