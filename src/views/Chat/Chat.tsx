import { useChat } from "@/hooks";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { useState } from "react";
import "./Chat.scss";
import { ChatMessage } from "./components";

function Chat() {
  const [prompt, setPrompt] = useState<string>("");

  const { mutation, messages } = useChat();

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
          mutation.mutate(prompt);
          setPrompt("");
        }}
      >
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
