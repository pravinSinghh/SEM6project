
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

interface AIContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  processPrescriptionImage: (imageBase64: string) => Promise<string>;
  analyzeMedicalText: (text: string) => Promise<string>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

// Mock AI responses
const mockResponses: Record<string, string> = {
  "hello": "Hello! How can I assist you with your healthcare needs today?",
  "how are you": "I'm functioning well, thank you! How can I help you with your medical questions?",
  "what can you do": "I can help with medical information, explain prescriptions, provide health advice, schedule appointments, and answer questions about medications or conditions. How can I assist you today?",
};

// Medical information responses
const medicalResponses: Record<string, string> = {
  "headache": "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or underlying medical conditions. For persistent or severe headaches, please consult your doctor.",
  "blood pressure": "Normal blood pressure is typically around 120/80 mmHg. High blood pressure (hypertension) is generally considered to be 130/80 mmHg or higher. Regular monitoring is important for managing cardiovascular health.",
  "diabetes": "Diabetes is a chronic condition that affects how your body turns food into energy. The main types are Type 1, Type 2, and gestational diabetes. Management typically involves monitoring blood sugar levels, medication, healthy eating, and regular physical activity.",
};

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hello! I'm your healthcare assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check direct matches
    for (const key in mockResponses) {
      if (lowerMessage.includes(key)) {
        return mockResponses[key];
      }
    }
    
    // Check medical keywords
    for (const key in medicalResponses) {
      if (lowerMessage.includes(key)) {
        return medicalResponses[key];
      }
    }
    
    // Default responses
    const defaultResponses = [
      "I understand. Could you tell me more about your symptoms?",
      "That's important information. Have you discussed this with your doctor?",
      "I'd be happy to help with that. Let me know if you need more specific information.",
      "Thank you for sharing that. Is there anything else you'd like to know?",
      "I'm here to help with your healthcare questions. Could you provide more details?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async (content: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate AI response
      const response = generateResponse(content);
      
      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = (): void => {
    setMessages([
      {
        id: "init",
        role: "assistant",
        content: "Hello! I'm your healthcare assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
    toast.info("Conversation cleared");
  };

  const processPrescriptionImage = async (imageBase64: string): Promise<string> => {
    try {
      setIsLoading(true);
      
      // In a real implementation, we would send the image to an OCR service
      // For demo purposes, we'll return a mock result
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return `Prescription Details:
Patient: John Doe
Medication: Amoxicillin 500mg
Instructions: Take one capsule three times daily with meals
Duration: 10 days
Refills: 0
Dr. Smith, MD
License: #12345`;
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process prescription image");
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeMedicalText = async (text: string): Promise<string> => {
    try {
      setIsLoading(true);
      
      // In a real implementation, we would send the text to an NLP service
      // For demo purposes, we'll return a mock analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return "Analysis Summary: This prescription contains an antibiotic (Amoxicillin) at a standard dosage for treating bacterial infections. The medication should be taken with food to reduce stomach upset. The full course should be completed even if symptoms improve to prevent antibiotic resistance.";
    } catch (error) {
      console.error("Error analyzing text:", error);
      toast.error("Failed to analyze medical text");
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        clearMessages,
        processPrescriptionImage,
        analyzeMedicalText,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};
