import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Card, Rating } from "@/src/components/ui";
import { colors, spacing, typography } from "@/src/constants/theme";
import { Worker } from "@/src/types";

interface WorkerCardProps {
  worker: Worker;
  variant?: "full" | "compact";
}

export function WorkerCard({ worker, variant = "full" }: WorkerCardProps) {
  const router = useRouter();
  const compact = variant === "compact";

  return (
    <Card
      onPress={() => router.push(`/worker/${worker.id}`)}
      style={compact ? styles.compact : undefined}
    >
      <View style={styles.row}>
        <Avatar uri={worker.avatar} name={worker.name} size="lg" online={worker.online} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {worker.name}
            </Text>
            {worker.verified && (
              <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
            )}
          </View>
          <Text style={styles.profession} numberOfLines={1}>
            {worker.profession}
          </Text>
          <Rating value={worker.rating} reviews={worker.reviewCount} size={13} />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.meta}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{worker.distanceKm} km</Text>
          <Text style={styles.dot}>·</Text>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{worker.responseTime}</Text>
        </View>
        <Text style={styles.price}>
          ${worker.hourlyRate}
          <Text style={styles.priceUnit}>/hr</Text>
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  compact: { width: 280 },
  row: { flexDirection: "row", gap: spacing.md },
  info: { flex: 1, gap: spacing.xs, justifyContent: "center" },
  nameRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  name: { ...typography.h3, flexShrink: 1 },
  profession: { ...typography.bodySmall, color: colors.textSecondary },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  meta: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  metaText: { ...typography.caption, color: colors.textSecondary },
  dot: { ...typography.caption, color: colors.textMuted, marginHorizontal: spacing.xs },
  price: { ...typography.h3, color: colors.primary },
  priceUnit: { ...typography.caption, color: colors.textMuted },
});

