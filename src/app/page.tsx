"use client";

import { useState } from "react";
import { StartView } from "./StartView";
import { ChatView } from "./ChatView";

interface Message {
  role: string;
  content: string;
}

enum View {
  START = "START",
  CHAT = "CHAT",
}

export default function Home() {
  const [view, setView] = useState(View.START);
  const [chatPartner, setChatPartner] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartChat = async () => {
    if (!chatPartner.trim()) {
      alert("Please describe who you want to chat with");
      return;
    }
    setMessages([]);
    setView(View.CHAT);
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setChatInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          chatPartner,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      {view === View.START && (
        <StartView
          chatPartner={chatPartner}
          setChatPartner={setChatPartner}
          handleStartChat={handleStartChat}
        />
      )}
      {view === View.CHAT && (
        <ChatView
          messages={messages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
