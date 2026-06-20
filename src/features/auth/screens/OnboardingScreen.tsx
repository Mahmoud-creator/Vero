import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";

interface Slide {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  title: string;
  body: string;
}

const SLIDES: Slide[] = [
  {
    id: "1",
    icon: "search-outline",
    accent: colors.primary,
    title: "Find trusted pros",
    body: "Browse verified local experts for cleaning, repairs, and more — all rated by real customers.",
  },
  {
    id: "2",
    icon: "calendar-outline",
    accent: colors.accent,
    title: "Book in minutes",
    body: "Pick a service, choose a time, and send a request. No phone calls, no hassle.",
  },
  {
    id: "3",
    icon: "shield-checkmark-outline",
    accent: colors.success,
    title: "Relax with confidence",
    body: "Chat directly, track your requests, and pay only when the job is done right.",
  },
];

export function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);

  const isLast = index === SLIDES.length - 1;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== index) setIndex(next);
  };

  const handleNext = () => {
    if (isLast) {
      router.push("/login");
      return;
    }
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Button label="Skip" variant="ghost" size="sm" onPress={() => router.push("/login")} />
      </View>

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(s) => s.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={[styles.iconHalo, { backgroundColor: item.accent + "1A" }]}>
              <View style={[styles.iconBadge, { backgroundColor: item.accent }]}>
                <Ionicons name={item.icon} size={48} color={colors.textInverse} />
              </View>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((s, i) => (
            <View
              key={s.id}
              style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]}
            />
          ))}
        </View>
        <Button label={isLast ? "Get Started" : "Continue"} fullWidth onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: { alignItems: "flex-end", paddingHorizontal: spacing.lg, height: 44, justifyContent: "center" },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  iconHalo: {
    width: 200,
    height: 200,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  iconBadge: {
    width: 112,
    height: 112,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { ...typography.h1, textAlign: "center" },
  body: { ...typography.body, color: colors.textSecondary, textAlign: "center", maxWidth: 300 },
  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, gap: spacing.xl },
  dots: { flexDirection: "row", justifyContent: "center", gap: spacing.sm },
  dot: { height: 8, borderRadius: radius.pill },
  dotActive: { width: 24, backgroundColor: colors.primary },
  dotInactive: { width: 8, backgroundColor: colors.borderStrong },
});

