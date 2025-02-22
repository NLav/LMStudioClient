import { ICompletion, IMessage } from "@/interfaces";
import { ChatService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>();

  const mutation = useMutation({
    scope: { id: "" },
    mutationFn: async (input: string) => {
      setMessages((current) => [
        { content: input, role: "sender", timestamp: new Date() },
        ...current,
      ]);

      ChatService.postPromptStream(input)
        .then((response) => {
          const reader = response.body?.getReader();
          let localCurrentMessage = "";

          function processReader() {
            return reader?.read().then(({ done, value }) => {
              if (done) {
                setMessages((current) => [
                  {
                    content: localCurrentMessage,
                    role: "receiver",
                    timestamp: new Date(),
                  },
                  ...current,
                ]);

                setCurrentMessage(undefined);

                return;
              }

              const data = new TextDecoder()
                .decode(value)
                .replaceAll("data: ", "")
                .trim()
                .split("\n");

              const completions: ICompletion[] = data
                .map((stringObject) =>
                  stringObject !== "" && stringObject !== "[DONE]"
                    ? JSON.parse(stringObject)
                    : undefined
                )
                .filter((value) => !!value);

              completions.forEach((completion) => {
                if (completion.choices[0].delta.content) {
                  localCurrentMessage += completion.choices[0].delta.content;
                  setCurrentMessage(
                    (current) =>
                      (current ?? "") + completion.choices[0].delta.content
                  );
                }
              });

              processReader();
            });
          }

          processReader();
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    onError: (error) => {
      throw new Error("Error fetching messages:", error);
    },
  });

  return { currentMessage, messages, mutation };
};

export { useChat };
