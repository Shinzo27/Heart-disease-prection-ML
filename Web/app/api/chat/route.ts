import { NextRequest, NextResponse } from "next/server";
import { ChatSession } from "@google/generative-ai";

const chatSession = new ChatSession(
  process.env.NEXT_PUBLIC_API_KEY || "",
  process.env.NEXT_PUBLIC_MODEL || ""
);

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" });
  }

  const body = await req.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json({ error: "Message is required" });
  }

  try {
    // Check if the query is related to heart disease
    const relevancePrompt = `Determine if the following message is related to heart disease. If yes, provide a detailed response. If no, respond with "unrelated".\nMessage: "${message}"`;
    const relevanceResponse = await chatSession.sendMessage(relevancePrompt);

    // Process the relevance check
    if (relevanceResponse?.response?.text()?.toLowerCase() === "unrelated") {
      return NextResponse.json({
        response:
          "This query does not seem related to heart disease. Please refine your query or specify the topic.",
      });
    }

    // Generate a detailed response if relevant
    const detailedResponse = await chatSession.sendMessage(message);
    return NextResponse.json({ response: detailedResponse?.response?.text() });
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ error: "Failed to generate response." });
  }
}
