import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState, IconButton } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { notifications as initialNotifications } from "@/src/mocks";
import { AppNotification, NotificationType } from "@/src/types";

const TYPE_COLOR: Record<NotificationType, string> = {
  request: colors.success,
  message: colors.primary,
  review: colors.accent,
  promo: colors.warning,
  system: colors.info,
};

export function NotificationsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<AppNotification[]>(initialNotifications);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const hasUnread = items.some((n) => !n.read);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <IconButton name="arrow-back" onPress={() => router.back()} />
        <Text style={styles.title}>Notifications</Text>
        <Pressable onPress={markAllRead} disabled={!hasUnread} hitSlop={8}>
          <Text style={[styles.markRead, !hasUnread && styles.markReadDisabled]}>Mark all</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(n) => n.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <NotificationRow
            notification={item}
            onPress={() =>
              setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)))
            }
          />
        )}
        ListEmptyComponent={
          <EmptyState icon="notifications-off-outline" title="No notifications" message="You're all caught up." />
        }
      />
    </SafeAreaView>
  );
}

function NotificationRow({
  notification,
  onPress,
}: {
  notification: AppNotification;
  onPress: () => void;
}) {
  const tint = TYPE_COLOR[notification.type];
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={[styles.iconWrap, { backgroundColor: tint + "1A" }]}>
        <Ionicons name={notification.icon} size={22} color={tint} />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {notification.title}
          </Text>
          {!notification.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {notification.body}
        </Text>
        <Text style={styles.time}>{notification.timestamp}</Text>
      </View>
    </Pressable>
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
  title: { ...typography.h2, fontSize: 20, flex: 1 },
  markRead: { ...typography.label, color: colors.primary },
  markReadDisabled: { color: colors.textMuted },
  list: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, flexGrow: 1 },
  separator: { height: spacing.md },
  row: { flexDirection: "row", gap: spacing.md, alignItems: "flex-start" },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { flex: 1, gap: 2 },
  bodyTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowTitle: { ...typography.label, fontSize: 15, flex: 1 },
  unreadDot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.primary, marginLeft: spacing.sm },
  message: { ...typography.bodySmall, color: colors.textSecondary },
  time: { ...typography.caption, marginTop: spacing.xs },
});

