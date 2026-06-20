import { Conversation, Message } from "@/src/types";

export const conversations: Conversation[] = [
  { id: "cv1", workerId: "w1", lastMessage: "I can be there by 10am tomorrow.", lastTimestamp: "9:42 AM", unread: 2 },
  { id: "cv2", workerId: "w2", lastMessage: "Sure, eco products included.", lastTimestamp: "Yesterday", unread: 0 },
  { id: "cv3", workerId: "w3", lastMessage: "Charger install is all done!", lastTimestamp: "Mon", unread: 0 },
  { id: "cv4", workerId: "w4", lastMessage: "Sending color samples now.", lastTimestamp: "Jun 12", unread: 1 },
];

export const messagesByConversation: Record<string, Message[]> = {
  cv1: [
    { id: "m1", conversationId: "cv1", fromMe: true, text: "Hi Marcus, my kitchen sink is leaking.", timestamp: "9:30 AM" },
    { id: "m2", conversationId: "cv1", fromMe: false, text: "Hi! Sorry to hear that. Is it dripping or pooling?", timestamp: "9:33 AM" },
    { id: "m3", conversationId: "cv1", fromMe: true, text: "Dripping under the cabinet.", timestamp: "9:35 AM" },
    { id: "m4", conversationId: "cv1", fromMe: false, text: "Likely a worn seal. I can fix it quickly.", timestamp: "9:38 AM" },
    { id: "m5", conversationId: "cv1", fromMe: false, text: "I can be there by 10am tomorrow.", timestamp: "9:42 AM" },
  ],
  cv2: [
    { id: "m6", conversationId: "cv2", fromMe: true, text: "Do you use eco-friendly products?", timestamp: "Yesterday" },
    { id: "m7", conversationId: "cv2", fromMe: false, text: "Sure, eco products included.", timestamp: "Yesterday" },
  ],
  cv3: [
    { id: "m8", conversationId: "cv3", fromMe: false, text: "Charger install is all done!", timestamp: "Mon" },
  ],
  cv4: [
    { id: "m9", conversationId: "cv4", fromMe: true, text: "Can you share some navy shades?", timestamp: "Jun 12" },
    { id: "m10", conversationId: "cv4", fromMe: false, text: "Sending color samples now.", timestamp: "Jun 12" },
  ],
};

export function getMessages(conversationId: string): Message[] {
  return messagesByConversation[conversationId] ?? [];
}

