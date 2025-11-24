import { useState } from "react";
import DarkBackground from "@/components/DarkBackground";
import MainForm from "@/components/MainForm";
import SuccessModal from "@/components/SuccessModal";
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
    <div className="relative min-h-screen">
      <DarkBackground />
      
      <MainForm onSubmit={handleFormSubmit} />

      <SuccessModal
        open={showModal}
        onClose={() => setShowModal(false)}
        orderNumber={orderNumber}
      />
    </div>
  );
};

export default Index;
