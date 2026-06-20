import { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

export interface Category {
  id: string;
  name: string;
  icon: IconName;
  color: string;
  workerCount: number;
}

