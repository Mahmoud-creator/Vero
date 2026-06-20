import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Badge, Card } from "@/src/components/ui";
import { colors, spacing, typography } from "@/src/constants/theme";
import { getWorkerById } from "@/src/mocks";
import { RequestStatus, ServiceRequest } from "@/src/types";

const STATUS_META: Record<RequestStatus, { label: string; tone: "warning" | "info" | "success" | "danger" }> = {
  pending: { label: "Pending", tone: "warning" },
  accepted: { label: "Accepted", tone: "info" },
  completed: { label: "Completed", tone: "success" },
  cancelled: { label: "Cancelled", tone: "danger" },
};

export function RequestCard({ request }: { request: ServiceRequest }) {
  const router = useRouter();
  const worker = getWorkerById(request.workerId);
  const meta = STATUS_META[request.status];

  return (
    <Card onPress={() => router.push(`/worker/${request.workerId}`)}>
      <View style={styles.top}>
        <Avatar uri={worker?.avatar} name={worker?.name} size="md" />
        <View style={styles.headInfo}>
          <Text style={styles.service} numberOfLines={1}>
            {request.serviceName}
          </Text>
          <Text style={styles.worker} numberOfLines={1}>
            with {worker?.name ?? "Pro"}
          </Text>
        </View>
        <Badge label={meta.label} tone={meta.tone} />
      </View>

      <Text style={styles.desc} numberOfLines={2}>
        {request.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.meta}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{request.scheduledDate}</Text>
        </View>
        <Text style={styles.price}>${request.price}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  headInfo: { flex: 1, gap: 2 },
  service: { ...typography.label, fontSize: 15 },
  worker: { ...typography.caption, color: colors.textSecondary },
  desc: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.md },
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
  price: { ...typography.h3, color: colors.primary },
});

