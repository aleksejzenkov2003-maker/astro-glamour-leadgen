import { useState } from "react";
import CosmicBackground from "@/components/CosmicBackground";
import MobileHero from "@/components/MobileHero";
import SuccessModal from "@/components/SuccessModal";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleFormSubmit = (data: { date: string; name: string; phone: string }) => {
    // Generate random 4-digit order number
    const randomOrderNumber = Math.floor(1000 + Math.random() * 9000).toString();
    setOrderNumber(randomOrderNumber);
    
    // Here you would typically send data to your backend/CRM
    console.log("Form submitted:", data);
    
    // Show success modal
    setShowModal(true);
    
    // Show toast notification
    toast.success("Ваш запрос успешно отправлен!");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <CosmicBackground />
      
      <div className="flex-1">
        <MobileHero onSubmit={handleFormSubmit} />
      </div>

      <Footer />

      <SuccessModal
        open={showModal}
        onClose={() => setShowModal(false)}
        orderNumber={orderNumber}
      />
    </div>
  );
};

export default Index;
