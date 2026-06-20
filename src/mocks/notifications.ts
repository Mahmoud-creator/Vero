import { AppNotification } from "@/src/types";

export const notifications: AppNotification[] = [
  { id: "n1", type: "request", title: "Request accepted", body: "Marcus Reid accepted your leak repair request.", timestamp: "2h ago", read: false, icon: "checkmark-circle-outline" },
  { id: "n2", type: "message", title: "New message", body: "Marcus: I can be there by 10am tomorrow.", timestamp: "2h ago", read: false, icon: "chatbubble-ellipses-outline" },
  { id: "n3", type: "review", title: "Leave a review", body: "How was your EV charger install with Derek?", timestamp: "1d ago", read: true, icon: "star-outline" },
  { id: "n4", type: "promo", title: "20% off first clean", body: "Book a home clean this week and save 20%.", timestamp: "2d ago", read: true, icon: "pricetag-outline" },
  { id: "n5", type: "system", title: "Profile verified", body: "Your account is now verified. Welcome aboard!", timestamp: "5d ago", read: true, icon: "shield-checkmark-outline" },
];

export const unreadCount = notifications.filter((n) => !n.read).length;

