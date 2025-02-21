import { IMessage } from "@/interfaces";
import dayjs from "dayjs";
import Markdown from "react-markdown";
import "./ChatMessage.scss";

interface IChatMessageProps {
  message: IMessage;
}

function ChatMessage({ message }: IChatMessageProps) {
  return (
    <div className="chat-message">
      <span className="chat-message__time">
        <b>{dayjs(message.timestamp).format("DD/MM/YYYY à[s] HH:mm:ss")}</b>
      </span>

      <Markdown className="chat-message__content">{message.content}</Markdown>
    </div>
  );
}

export { ChatMessage };
