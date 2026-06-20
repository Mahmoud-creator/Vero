import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { conversations, getMessages, getWorkerById } from "@/src/mocks";
import { Message } from "@/src/types";

export function ChatThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const listRef = useRef<FlatList<Message>>(null);

  const conversation = conversations.find((c) => c.id === id);
  const worker = getWorkerById(conversation?.workerId ?? "");
  const [messages, setMessages] = useState<Message[]>(() => getMessages(id ?? ""));
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        conversationId: id ?? "",
        fromMe: true,
        text,
        timestamp: "Now",
      },
    ]);
    setDraft("");
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Avatar uri={worker?.avatar} name={worker?.name} size="sm" online={worker?.online} />
        <View style={styles.headerText}>
          <Text style={styles.headerName}>{worker?.name ?? "Chat"}</Text>
          <Text style={styles.headerStatus}>{worker?.online ? "Online" : "Offline"}</Text>
        </View>
        <Pressable hitSlop={8}>
          <Ionicons name="call-outline" size={22} color={colors.primary} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          renderItem={({ item }) => <Bubble message={item} />}
        />

        {/* Input */}
        <View style={styles.inputBar}>
          <Pressable hitSlop={8} style={styles.attach}>
            <Ionicons name="add" size={24} color={colors.primary} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={colors.textMuted}
            value={draft}
            onChangeText={setDraft}
            onFocus={() => setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50)}
            multiline
          />
          <Pressable onPress={send} style={[styles.send, !draft.trim() && styles.sendDisabled]}>
            <Ionicons name="send" size={18} color={colors.textInverse} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Bubble({ message }: { message: Message }) {
  const mine = message.fromMe;
  return (
    <View style={[styles.bubbleRow, mine ? styles.rowMine : styles.rowTheirs]}>
      <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}>
        <Text style={[styles.bubbleText, mine && styles.bubbleTextMine]}>{message.text}</Text>
        <Text style={[styles.time, mine && styles.timeMine]}>{message.timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  headerText: { flex: 1 },
  headerName: { ...typography.label, fontSize: 16 },
  headerStatus: { ...typography.caption, color: colors.success },
  list: { padding: spacing.lg, gap: spacing.sm },
  bubbleRow: { flexDirection: "row" },
  rowMine: { justifyContent: "flex-end" },
  rowTheirs: { justifyContent: "flex-start" },
  bubble: { maxWidth: "78%", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.lg },
  bubbleMine: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleTheirs: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  bubbleText: { ...typography.body, color: colors.text },
  bubbleTextMine: { color: colors.textInverse },
  time: { ...typography.caption, color: colors.textMuted, marginTop: 2, alignSelf: "flex-end", fontSize: 10 },
  timeMine: { color: colors.primaryLight },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  attach: { height: 44, justifyContent: "center" },
  input: {
    flex: 1,
    ...typography.body,
    maxHeight: 110,
    minHeight: 44,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.sm,
    paddingBottom: spacing.sm,
  },
  send: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendDisabled: { backgroundColor: colors.borderStrong },
});


