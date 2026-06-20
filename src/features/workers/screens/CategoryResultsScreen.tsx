import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { WorkerCard } from "@/src/features/workers/components/WorkerCard";
import { getCategoryById, getWorkersByCategory } from "@/src/mocks";

const SORTS = ["Top rated", "Nearest", "Price"] as const;

export function CategoryResultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Top rated");

  const category = getCategoryById(id ?? "");
  const base = getWorkersByCategory(id ?? "");

  const workers = [...base].sort((a, b) => {
    if (sort === "Nearest") return a.distanceKm - b.distanceKm;
    if (sort === "Price") return a.hourlyRate - b.hourlyRate;
    return b.rating - a.rating;
  });

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.title}>{category?.name ?? "Results"}</Text>
          <Text style={styles.count}>{workers.length} pros available</Text>
        </View>
        <Pressable hitSlop={8} style={styles.backBtn}>
          <Ionicons name="search" size={22} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.sorts}>
        {SORTS.map((s) => {
          const active = s === sort;
          return (
            <Pressable
              key={s}
              onPress={() => setSort(s)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{s}</Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={workers}
        keyExtractor={(w) => w.id}
        renderItem={({ item }) => <WorkerCard worker={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="people-outline"
            title="No pros yet"
            message="We couldn't find providers in this category nearby. Try another category."
            actionLabel="Browse categories"
            onAction={() => router.back()}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { flex: 1 },
  title: { ...typography.h2, fontSize: 20 },
  count: { ...typography.caption, color: colors.textSecondary },
  sorts: { flexDirection: "row", gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
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
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
});

