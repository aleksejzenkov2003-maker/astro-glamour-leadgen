import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Send, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  orderNumber: string;
}

const SuccessModal = ({ open, onClose, orderNumber }: SuccessModalProps) => {
  const handleMessengerClick = (messenger: string) => {
    console.log(`Selected messenger: ${messenger}`);
    // Here you would integrate with your backend to record the choice
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-2 border-primary/30 max-w-md glow-mystical">
        <DialogHeader>
          <div className="text-center space-y-6 py-4">
            {/* Order number with shimmer effect */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Ваш номер заказа</p>
              <h2 className="text-5xl font-bold text-gradient-gold glow-gold animate-float">
                № {orderNumber}
              </h2>
            </div>
            
            {/* Confirmation text */}
            <div className="space-y-2">
              <p className="text-lg text-foreground font-medium">
                ✨ Ваш запрос принят ✨
              </p>
              <p className="text-muted-foreground">
                Я свяжусь с вами в выбранном мессенджере в ближайшее время
              </p>
            </div>
            
            {/* Messenger selection */}
            <div className="space-y-3 pt-2">
              <p className="text-sm text-muted-foreground">Выберите удобный мессенджер:</p>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={() => handleMessengerClick("Telegram")}
                  className="h-14 text-lg bg-gradient-to-r from-[#229ED9] to-[#0088cc] hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-[#229ED9]/50"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Telegram
                </Button>
                
                <Button
                  onClick={() => handleMessengerClick("WhatsApp")}
                  className="h-14 text-lg bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-[#25D366]/50"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
                
                <Button
                  onClick={() => handleMessengerClick("VK")}
                  className="h-14 text-lg bg-gradient-to-r from-[#0077FF] to-[#4680C2] hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-[#0077FF]/50"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  VK
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
