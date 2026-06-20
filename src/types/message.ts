export interface Message {
  id: string;
  conversationId: string;
  fromMe: boolean;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  workerId: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
}

