import { IMessage } from "@/interfaces";
import { ChatService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const mutation = useMutation({
    mutationFn: async (input: string) => {
      setMessages((current) => [
        { content: input, role: "sender", timestamp: new Date() },
        ...current,
      ]);

      const response = ChatService.postPrompt(input);

      return (await response).data.choices[0].message.content;
    },
    onSuccess: (message) => {
      setMessages((current) => [
        { content: message, role: "receiver", timestamp: new Date() },
        ...current,
      ]);
    },
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  return { mutation, messages };
};

export { useChat };
