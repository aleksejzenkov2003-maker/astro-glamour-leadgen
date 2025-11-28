import { useState } from "react";
import CosmicBackground from "@/components/CosmicBackground";
import MultiStepQuiz from "@/components/MultiStepQuiz";
import SuccessModal from "@/components/SuccessModal";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleFormSubmit = async (data: { date: string; city: string; time: string }) => {
    // Generate random 4-digit order number
    const randomOrderNumber = Math.floor(1000 + Math.random() * 9000).toString();
    setOrderNumber(randomOrderNumber);
    
    // Send data to Google Sheets
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyDdN6-mFcPs3J7h1cPKb0nv3jFhH_p4RZAEJLnziQwHxodliMa7DRg0B-_L3-1GzQJIw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: data.date,
          city: data.city,
          time: data.time,
          orderNumber: randomOrderNumber
        }),
      });
      console.log("Form submitted to Google Sheets:", data);
    } catch (error) {
      console.error("Error sending to Google Sheets:", error);
    }
    
    // Show success modal
    setShowModal(true);
    
    // Show toast notification
    toast.success("Ваш запрос успешно отправлен!");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <CosmicBackground />
      
      <div className="flex-1 relative z-10">
        <MultiStepQuiz onSubmit={handleFormSubmit} />
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
