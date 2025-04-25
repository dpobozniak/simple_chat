"use client";

import { FormEvent, KeyboardEvent } from "react";
import { Avatar } from "./Avatar";

interface StartViewProps {
  chatPartner: string;
  setChatPartner: (chatPartner: string) => void;
  handleStartChat: () => void;
}

export const StartView = ({
  chatPartner,
  setChatPartner,
  handleStartChat,
}: StartViewProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (chatPartner.trim()) {
      handleStartChat();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (chatPartner.trim()) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full text-white">
      <div className="text-2xl font-bold">Simple Chat</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="text-md font-bold">who do you want to chat with?</div>

        {chatPartner.trim() && (
          <div className="flex flex-col items-center gap-2 mb-2">
            <Avatar characterName={chatPartner} size="large" />
            <div className="text-sm text-neutral-400">{chatPartner}</div>
          </div>
        )}

        <textarea
          rows={4}
          className={`
      w-96 p-4 
      bg-neutral-800 
      border border-neutral-700 
      rounded-lg
      resize-none
      text-white
      focus:outline-none
      focus:ring-2
      focus:ring-neutral-600
    `}
          placeholder="Describe your chat partner..."
          value={chatPartner}
          onChange={(e) => setChatPartner(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="bg-neutral-800 px-4 py-2 text-lg rounded-lg border border-neutral-700 hover:bg-neutral-700"
          disabled={!chatPartner.trim()}
        >
          Start Chat
        </button>
      </form>
    </div>
  );
};
