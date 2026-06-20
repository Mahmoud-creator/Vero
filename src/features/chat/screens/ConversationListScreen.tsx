import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { conversations, getWorkerById } from "@/src/mocks";
import { Conversation } from "@/src/types";

export function ConversationListScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <FlatList
        data={conversations}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <ConversationRow conversation={item} onPress={() => router.push(`/chat/${item.id}`)} />
        )}
      />
    </SafeAreaView>
  );
}

function ConversationRow({
  conversation,
  onPress,
}: {
  conversation: Conversation;
  onPress: () => void;
}) {
  const worker = getWorkerById(conversation.workerId);
  const unread = conversation.unread > 0;
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Avatar uri={worker?.avatar} name={worker?.name} size="md" online={worker?.online} />
      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <Text style={styles.name}>{worker?.name ?? "Unknown"}</Text>
          <Text style={[styles.time, unread && styles.timeUnread]}>{conversation.lastTimestamp}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={[styles.preview, unread && styles.previewUnread]} numberOfLines={1}>
            {conversation.lastMessage}
          </Text>
          {unread && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{conversation.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  title: { ...typography.h1 },
  list: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  separator: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  rowBody: { flex: 1, gap: spacing.xs },
  rowTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { ...typography.label, fontSize: 16 },
  time: { ...typography.caption },
  timeUnread: { color: colors.primary, fontWeight: "600" },
  rowBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm },
  preview: { ...typography.bodySmall, color: colors.textSecondary, flex: 1 },
  previewUnread: { color: colors.text, fontWeight: "500" },
  badge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { ...typography.caption, color: colors.textInverse, fontSize: 11 },
});

