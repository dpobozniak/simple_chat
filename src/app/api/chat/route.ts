import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, chatPartner } = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

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
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    console.log("-------err", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
