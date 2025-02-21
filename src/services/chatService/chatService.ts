import { ICompletion } from "@/interfaces";
import { AxiosResponse } from "axios";
import { api } from "../api";

class ChatService {
  public static async postPrompt(
    prompt: string
  ): Promise<AxiosResponse<ICompletion>> {
    return api.post("http://192.168.1.21:1234/v1/chat/completions/", {
      model: "qwen2.5-coder-14b-instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: -1,
      stream: false,
    });
  }
}

export { ChatService };
