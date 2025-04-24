"use server";

import { Message } from "./types";

export async function sendMessage(
  message: string,
  messages: Message[],
  chatPartner: string
): Promise<Message> {
  if (!message.trim()) {
    throw new Error("Message cannot be empty");
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-opus-20240229",
          messages: [
            {
              role: "system",
              content: `You are ${chatPartner}. Respond as this character would. Keep responses concise and engaging.`,
            },
            ...messages,
            { role: "user", content: message },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      role: "assistant",
      content: data.choices[0].message.content,
    };
  } catch (error) {
    console.error("Chat API error:", error);
    throw new Error("Failed to process chat message");
  }
}
