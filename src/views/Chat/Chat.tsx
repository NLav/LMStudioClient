import { IMessage } from "@/interfaces";
import { ChatService } from "@/services/chatService";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { useState } from "react";
import "./Chat.scss";
import { ChatMessage } from "./components";

function Chat() {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPrompt("");
    setMessages((current) => [
      {
        content: prompt,
        timestamp: new Date(),
        role: "sender",
      },
      ...current,
    ]);

    ChatService.postPrompt(prompt)
      .then((response) => {
        setMessages((current) => [
          {
            content: response.data.choices[0].message.content.trim(),
            timestamp: new Date(),
            role: "receiver",
          },
          ...current,
        ]);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="chat">
      <h1>Chat</h1>
      <div
        className={`chat__messages${messages.length === 0 ? "--empty" : ""}`}
      >
        {messages.length > 0 ? (
          messages.map((message) => <ChatMessage message={message} />)
        ) : (
          <span>Chat vazio</span>
        )}
      </div>

      <form onSubmit={(event) => handleSend(event)}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button type="submit" disabled={prompt.trim() === ""}>
          <PaperPlaneRight size={32} />
        </button>
      </form>
    </div>
  );
}

export { Chat };
