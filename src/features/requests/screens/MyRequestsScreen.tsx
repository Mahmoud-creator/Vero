import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { RequestCard } from "@/src/features/requests/components/RequestCard";
import { requests } from "@/src/mocks";
import { RequestStatus } from "@/src/types";

type Filter = "all" | RequestStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export function MyRequestsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");

  const data = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Requests</Text>
        <Text style={styles.subtitle}>{requests.length} total bookings</Text>
      </View>

      <View style={styles.filterWrap}>
        <FlatList
          data={FILTERS}
          keyExtractor={(f) => f.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
          renderItem={({ item }) => {
            const active = item.key === filter;
            return (
              <Pressable
                onPress={() => setFilter(item.key)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
              </Pressable>
            );
          }}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => <RequestCard request={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="briefcase-outline"
            title="No requests here"
            message="You have no bookings with this status yet."
            actionLabel="Browse pros"
            onAction={() => router.push("/(tabs)/home")}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  title: { ...typography.h1 },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  filterWrap: { marginTop: spacing.lg },
  filters: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.label, color: colors.textSecondary },
  chipTextActive: { color: colors.textInverse },
  list: { padding: spacing.lg, gap: spacing.md, flexGrow: 1 },
});

