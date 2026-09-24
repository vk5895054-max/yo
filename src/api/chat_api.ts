const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://vexuslabs-backend.onrender.com/api";

export interface ChatAPIResponse {
  success: boolean;
  reply?: string;
  error?: string;
}

/**
 * Send user chat message to the backend AI API endpoint
 */
export async function sendChatMessageAPI(message: string, history: any[] = []): Promise<ChatAPIResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.warn("⚠️ [ChatAPI] Failed to contact backend AI service, using local fallback:", err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}
