import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";

export function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Decorative background shapes */}
      <View style={[styles.blob, styles.blobTop]} />
      <View style={[styles.blob, styles.blobBottom]} />

      <SafeAreaView style={styles.safe}>
        <View style={styles.hero}>
          <Animated.View entering={FadeInDown.duration(600)} style={styles.logoWrap}>
            <View style={styles.logoBadge}>
              <Ionicons name="construct" size={40} color={colors.primary} />
            </View>
          </Animated.View>

          <Animated.Text entering={FadeInUp.delay(150).duration(600)} style={styles.brand}>
            Vero
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(250).duration(600)} style={styles.tagline}>
            Trusted local pros, booked in minutes.
          </Animated.Text>

          <Animated.View entering={FadeIn.delay(400).duration(600)} style={styles.stats}>
            {STATS.map((s) => (
              <View key={s.label} style={styles.stat}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </Animated.View>
        </View>

        <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.footer}>
          <Button
            label="Get Started"
            variant="secondary"
            fullWidth
            onPress={() => router.push("/onboarding")}
          />
          <Pressable
            onPress={() => router.push("/login")}
            style={styles.signInLink}
            accessibilityRole="button"
          >
            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.signInStrong}>Sign in</Text>
            </Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const STATS = [
  { value: "500+", label: "Pros" },
  { value: "4.9★", label: "Avg rating" },
  { value: "24/7", label: "Support" },
];

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  safe: { flex: 1, justifyContent: "space-between", paddingHorizontal: spacing.xl },
  blob: {
    position: "absolute",
    borderRadius: radius.full,
    backgroundColor: colors.primaryDark,
    opacity: 0.5,
  },
  blobTop: { width: 320, height: 320, top: -120, right: -80 },
  blobBottom: { width: 260, height: 260, bottom: -100, left: -90 },
  hero: { flex: 1, justifyContent: "center", alignItems: "center", gap: spacing.md },
  logoWrap: { marginBottom: spacing.lg },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    ...typography.display,
    color: colors.textInverse,
    letterSpacing: 1,
  },
  tagline: {
    ...typography.body,
    color: colors.primaryLight,
    textAlign: "center",
    maxWidth: 280,
  },
  stats: {
    flexDirection: "row",
    gap: spacing.xl,
    marginTop: spacing.xxl,
  },
  stat: { alignItems: "center", gap: spacing.xs },
  statValue: { ...typography.h2, color: colors.textInverse },
  statLabel: { ...typography.caption, color: colors.primaryLight },
  footer: { paddingBottom: spacing.lg, gap: spacing.md },
  signInLink: { alignItems: "center", paddingVertical: spacing.sm },
  signInText: { ...typography.bodySmall, color: colors.primaryLight },
  signInStrong: { ...typography.label, color: colors.textInverse },
});




