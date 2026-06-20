import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button } from "@/src/components/ui";
import { colors, radius, shadows, spacing, typography } from "@/src/constants/theme";

interface Row {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  toggle?: boolean;
}

export function ProfileScreen() {
  const router = useRouter();
  const [pushOn, setPushOn] = useState(true);

  const account: Row[] = [
    { icon: "person-outline", label: "Edit profile" },
    { icon: "card-outline", label: "Payment methods", value: "Visa •• 4242" },
    { icon: "location-outline", label: "Saved addresses", value: "2" },
    { icon: "heart-outline", label: "Favorite pros", value: "5" },
  ];

  const preferences: Row[] = [
    { icon: "notifications-outline", label: "Push notifications", toggle: true },
    { icon: "shield-checkmark-outline", label: "Privacy & security" },
    { icon: "help-circle-outline", label: "Help center" },
    { icon: "information-circle-outline", label: "About Vero", value: "v1.0.0" },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable hitSlop={8}>
            <Ionicons name="settings-outline" size={22} color={colors.text} />
          </Pressable>
        </View>

        {/* Identity card */}
        <View style={styles.identity}>
          <Avatar name="Jane Doe" size="xl" />
          <View style={styles.identityText}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>Jane Doe</Text>
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
            </View>
            <Text style={styles.email}>jane.doe@example.com</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <Stat value="12" label="Bookings" />
          <View style={styles.statDivider} />
          <Stat value="5" label="Favorites" />
          <View style={styles.statDivider} />
          <Stat value="4.9" label="Your rating" />
        </View>

        {/* Account */}
        <Section title="Account">
          {account.map((r, i) => (
            <Fragment key={r.label}>
              {i > 0 && <View style={styles.divider} />}
              <SettingRow row={r} />
            </Fragment>
          ))}
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          {preferences.map((r, i) => (
            <Fragment key={r.label}>
              {i > 0 && <View style={styles.divider} />}
              <SettingRow row={r} pushOn={pushOn} onTogglePush={setPushOn} />
            </Fragment>
          ))}
        </Section>

        <Button
          label="Log out"
          variant="outline"
          fullWidth
          leftIcon={<Ionicons name="log-out-outline" size={18} color={colors.danger} />}
          onPress={() => router.replace("/")}
          style={styles.logout}
        />
        <Text style={styles.version}>Vero · Made for demo purposes</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function SettingRow({
  row,
  pushOn,
  onTogglePush,
}: {
  row: Row;
  pushOn?: boolean;
  onTogglePush?: (v: boolean) => void;
}) {
  return (
    <Pressable style={styles.row} disabled={row.toggle}>
      <View style={styles.rowLeft}>
        <Ionicons name={row.icon} size={20} color={colors.textSecondary} />
        <Text style={styles.rowLabel}>{row.label}</Text>
      </View>
      {row.toggle ? (
        <Switch
          value={pushOn}
          onValueChange={onTogglePush}
          trackColor={{ true: colors.primary, false: colors.borderStrong }}
          thumbColor={colors.surface}
        />
      ) : (
        <View style={styles.rowRight}>
          {row.value && <Text style={styles.rowValue}>{row.value}</Text>}
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing.md,
  },
  headerTitle: { ...typography.h1 },
  identity: { flexDirection: "row", alignItems: "center", gap: spacing.lg, marginTop: spacing.lg },
  identityText: { gap: spacing.xs },
  nameRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  name: { ...typography.h2, fontSize: 22 },
  email: { ...typography.bodySmall, color: colors.textSecondary },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.xl,
    ...shadows.sm,
  },
  stat: { flex: 1, alignItems: "center", gap: spacing.xs },
  statValue: { ...typography.h3, color: colors.primary },
  statLabel: { ...typography.caption },
  statDivider: { width: 1, height: 32, backgroundColor: colors.border },
  section: { marginTop: spacing.xl, gap: spacing.md },
  sectionTitle: { ...typography.label, color: colors.textSecondary, textTransform: "uppercase", fontSize: 12, letterSpacing: 0.5 },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  rowLabel: { ...typography.body },
  rowRight: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  rowValue: { ...typography.bodySmall, color: colors.textMuted },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: spacing.lg + 20 + spacing.md },
  logout: { marginTop: spacing.xl, borderColor: colors.dangerLight },
  version: { ...typography.caption, textAlign: "center", marginTop: spacing.lg },
});

