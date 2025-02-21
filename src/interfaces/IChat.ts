export interface ICompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      index: number;
      finish_reason: string;
      message: {
        role: string;
        content: string;
      };
    },
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  system_fingerprint: string;
}

export interface IMessage {
  content: string;
  timestamp: Date;
  role: "sender" | "receiver";
}
