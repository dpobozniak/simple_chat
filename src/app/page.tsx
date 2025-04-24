"use client";

import { useState } from "react";
import { StartView } from "./StartView";
import { ChatView } from "./ChatView";
import { Message } from "./types";

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
          chatPartner={chatPartner}
          chatInput={chatInput}
          setChatInput={setChatInput}
          setMessages={setMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}
