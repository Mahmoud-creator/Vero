import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { Category } from "@/src/types";

export function CategoryItem({ category }: { category: Category }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.item}
      onPress={() => router.push(`/category/${category.id}`)}
      accessibilityRole="button"
    >
      <View style={[styles.badge, { backgroundColor: category.color + "1A" }]}>
        <Ionicons name={category.icon} size={26} color={category.color} />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { alignItems: "center", gap: spacing.sm, width: 76 },
  badge: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { ...typography.caption, color: colors.text, textAlign: "center" },
});

