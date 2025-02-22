export interface ICompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: [
    {
      index: 0;
      delta: { role: string; content: string };
    },
  ];
}

export interface IMessage {
  content: string;
  timestamp: Date;
  role: "sender" | "receiver";
}
