import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@/src/components/ui";
import { colors, radius, shadows, spacing, typography } from "@/src/constants/theme";
import { CategoryItem } from "@/src/features/home/components/CategoryItem";
import { WorkerCard } from "@/src/features/workers/components/WorkerCard";
import { categories, featuredWorkers, unreadCount, workers } from "@/src/mocks";

export function HomeScreen() {
  const router = useRouter();
  const topRated = [...workers].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.location}>
              <Ionicons name="location" size={14} color={colors.primary} /> Brooklyn, NY
            </Text>
          </View>
          <View style={styles.headerRight}>
            <View>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={colors.text}
                onPress={() => router.push("/notifications")}
              />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
            <Avatar name="Jane Doe" size="sm" />
          </View>
        </View>

        {/* Search */}
        <View style={styles.search}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <Text style={styles.searchText}>Search services or pros...</Text>
          <View style={styles.filterBtn}>
            <Ionicons name="options-outline" size={18} color={colors.textInverse} />
          </View>
        </View>

        {/* Promo banner */}
        <View style={styles.promo}>
          <View style={styles.promoText}>
            <Text style={styles.promoTitle}>20% off your first booking</Text>
            <Text style={styles.promoSub}>Use code VERO20 at checkout</Text>
          </View>
          <Ionicons name="gift" size={40} color={colors.textInverse} />
        </View>

        {/* Categories */}
        <SectionHeader title="Categories" actionLabel="See all" onAction={() => router.push("/category/c1")} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((c) => (
            <CategoryItem key={c.id} category={c} />
          ))}
        </ScrollView>

        {/* Featured */}
        <SectionHeader title="Featured pros" actionLabel="See all" onAction={() => router.push("/category/c2")} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featured}
        >
          {featuredWorkers.map((w) => (
            <WorkerCard key={w.id} worker={w} variant="compact" />
          ))}
        </ScrollView>

        {/* Top rated */}
        <SectionHeader title="Top rated near you" />
        <View style={styles.list}>
          {topRated.map((w) => (
            <WorkerCard key={w.id} worker={w} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel && (
        <Text style={styles.sectionAction} onPress={onAction}>
          {actionLabel}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  greeting: { ...typography.h2 },
  location: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: radius.full,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { ...typography.caption, color: colors.textInverse, fontSize: 10 },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
    paddingVertical: spacing.xs,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    height: 52,
  },
  searchText: { ...typography.body, color: colors.textMuted, flex: 1 },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  promo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    ...shadows.md,
  },
  promoText: { gap: spacing.xs },
  promoTitle: { ...typography.h3, color: colors.textInverse },
  promoSub: { ...typography.bodySmall, color: colors.primaryLight },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: { ...typography.h2, fontSize: 20 },
  sectionAction: { ...typography.label, color: colors.primary },
  categories: { paddingHorizontal: spacing.lg, gap: spacing.md },
  featured: { paddingHorizontal: spacing.lg, gap: spacing.md },
  list: { paddingHorizontal: spacing.lg, gap: spacing.md },
});

