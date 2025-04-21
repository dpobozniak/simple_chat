"use client";

interface ChatViewProps {
  messages: { role: string; content: string }[];
  handleSendMessage: (message: string) => void;
  chatInput: string;
  setChatInput: (chatInput: string) => void;
  isLoading: boolean;
}

export const ChatView = ({
  messages,
  handleSendMessage,
  chatInput,
  setChatInput,
  isLoading,
}: ChatViewProps) => {
  return (
    <div className="h-full flex flex-col text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
          {isLoading && (
            <div className="flex gap-2 items-center">
              <div className="bg-blue-600 text-xs px-2 py-1 rounded">BOT</div>
              <div className="bg-neutral-800 p-4 rounded-lg max-w-[80%]">
                <div className="animate-pulse">Thinking...</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 border-t border-neutral-800">
        <div className="flex gap-4">
          <textarea
            className="flex-1 p-4 bg-neutral-800 border border-neutral-700 rounded-lg resize-none text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
            placeholder="Type your message..."
            rows={3}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage(chatInput)}
            className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({ role, content }: { role: string; content: string }) => {
  return (
    <div
      className={`flex gap-2 items-center ${
        role === "user" ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`${
          role === "user" ? "bg-green-600" : "bg-blue-600"
        } text-xs px-2 py-1 rounded`}
      >
        {role === "user" ? "YOU" : "BOT"}
      </div>
      <div className="bg-neutral-800 p-4 rounded-lg max-w-[80%] text-white">
        {content}
      </div>
    </div>
  );
};
