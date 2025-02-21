import { IMessage } from "@/interfaces";
import { ChatService } from "@/services";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import "./Chat.scss";
import { ChatMessage } from "./components";

function Chat() {
  const [currentInputValue, setCurrentInputValue] = useState<string>("");
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

  return (
    <div className="chat">
      <h1>Chat</h1>
      <div
        className={`chat__messages${messages.length === 0 ? "--empty" : ""}`}
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <ChatMessage key={String(message.timestamp)} message={message} />
          ))
        ) : (
          <span>Chat vazio</span>
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate(currentInputValue);
        }}
      >
        <input
          type="text"
          value={currentInputValue}
          onChange={(e) => setCurrentInputValue(e.target.value)}
        />

        <button type="submit" disabled={currentInputValue.trim() === ""}>
          <PaperPlaneRight size={32} />
        </button>
      </form>
    </div>
  );
}

export { Chat };
