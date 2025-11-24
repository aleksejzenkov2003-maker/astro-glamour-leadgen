import { useState } from "react";
import CosmicBackground from "@/components/CosmicBackground";
import HeroSection from "@/components/HeroSection";
import LeadForm from "@/components/LeadForm";
import SuccessModal from "@/components/SuccessModal";
import { toast } from "sonner";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleDateSubmit = (date: string) => {
    setBirthDate(date);
    setShowForm(true);
    // Smooth scroll to form
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 100);
  };

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
      <CosmicBackground />
      
      <HeroSection onDateSubmit={handleDateSubmit} />
      
      {showForm && (
        <div className="animate-fade-in">
          <LeadForm initialDate={birthDate} onSubmit={handleFormSubmit} />
        </div>
      )}

      <SuccessModal
        open={showModal}
        onClose={() => setShowModal(false)}
        orderNumber={orderNumber}
      />
    </div>
  );
};

export default Index;
