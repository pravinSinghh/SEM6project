
import React, { useState, useRef, useEffect } from "react";
import { useAI } from "@/contexts/AIContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Delete, Loader2, Send, FileUp, BrainCircuit } from "lucide-react";

const Chat: React.FC = () => {
  const { messages, sendMessage, clearMessages, isLoading, processPrescriptionImage } = useAI();
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processingImage, setProcessingImage] = useState(false);
  const [ocrResult, setOcrResult] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage(input);
    setInput("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setProcessingImage(true);
      const result = await processPrescriptionImage(base64);
      setOcrResult(result);
      setProcessingImage(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Healthcare Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions about your health or upload prescriptions for analysis
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-health-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <BrainCircuit className="h-4 w-4" />
                        <span className="font-medium text-sm">Healthcare Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your health question here..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (e) => handleImageUpload(e as any);
                          input.click();
                        }}
                        disabled={isLoading || processingImage}
                      >
                        <FileUp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Upload prescription</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={clearMessages}
                        disabled={isLoading || messages.length <= 1}
                      >
                        <Delete className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear chat</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button type="submit" disabled={isLoading || input.trim() === ""}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Health Insights</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-health-100 text-health-800">
                    {user?.name?.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === "doctor" ? user?.specialization : "Patient"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">AI Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-health-500"></div>
                    Medical questions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-health-500"></div>
                    Prescription analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-health-500"></div>
                    Medication information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-health-500"></div>
                    Health recommendations
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {(imagePreview || ocrResult) && (
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Prescription Analysis</h2>
              {imagePreview && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Uploaded Image</p>
                  <img
                    src={imagePreview}
                    alt="Prescription"
                    className="w-full h-auto rounded border mb-2"
                  />
                </div>
              )}
              {processingImage && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing image...
                </div>
              )}
              {ocrResult && (
                <div>
                  <p className="text-sm font-medium mb-2">Extracted Text</p>
                  <div className="bg-gray-50 p-3 rounded text-sm font-mono whitespace-pre-wrap">
                    {ocrResult}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
