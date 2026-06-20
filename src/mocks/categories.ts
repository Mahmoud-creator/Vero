import { Category } from "@/src/types";
import { colors } from "@/src/constants/theme";

export const categories: Category[] = [
  { id: "c1", name: "Cleaning", icon: "sparkles-outline", color: colors.info, workerCount: 128 },
  { id: "c2", name: "Plumbing", icon: "water-outline", color: colors.primary, workerCount: 86 },
  { id: "c3", name: "Electrical", icon: "flash-outline", color: colors.accent, workerCount: 74 },
  { id: "c4", name: "Painting", icon: "color-palette-outline", color: colors.success, workerCount: 53 },
  { id: "c5", name: "Moving", icon: "cube-outline", color: colors.warning, workerCount: 41 },
  { id: "c6", name: "Gardening", icon: "leaf-outline", color: colors.success, workerCount: 67 },
  { id: "c7", name: "Carpentry", icon: "hammer-outline", color: colors.danger, workerCount: 38 },
  { id: "c8", name: "Appliance", icon: "construct-outline", color: colors.primaryDark, workerCount: 29 },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

