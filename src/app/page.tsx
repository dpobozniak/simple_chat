"use client";

import { useState } from "react";
import { StartView } from "./StartView";
import { ChatView } from "./ChatView";

enum View {
  START = "START",
  CHAT = "CHAT",
}

export default function Home() {
  const [view, setView] = useState(View.START);
  const [chatPartner, setChatPartner] = useState("");
  const [messages, setMessages] = useState<[]>([]);
  const [chatInput, setChatInput] = useState("");

  const handleStartChat = async () => {
    // probably do this lol
  };

  const handleSendMessage = async (userMessage: string) => {
    // probably do this lol
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
        />
      )}
    </div>
  );
}
