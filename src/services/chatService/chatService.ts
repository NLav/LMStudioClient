import { api } from "../api";

class ChatService {
  public static async postPromptStream(prompt: string): Promise<Response> {
    return fetch(`${api.getUri()}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5-coder-14b-instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: true,
      }),
    });
  }
}

export { ChatService };
