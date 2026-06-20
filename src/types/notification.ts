import { IconName } from "./category";

export type NotificationType = "request" | "message" | "review" | "promo" | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  icon: IconName;
}

