import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button, ScreenContainer } from "@/src/components/ui";
import { colors, spacing, typography } from "@/src/constants/theme";

interface NavLink {
  label: string;
  href: string;
}

interface PlaceholderProps {
  title: string;
  subtitle?: string;
  links?: NavLink[];
  showBack?: boolean;
}

/** Temporary scaffold screen used to verify navigation wiring (Phase 6). */
export function Placeholder({ title, subtitle, links = [], showBack = false }: PlaceholderProps) {
  const router = useRouter();

  return (
    <ScreenContainer scroll>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.links}>
        {links.map((l) => (
          <Button key={l.href} label={l.label} onPress={() => router.push(l.href as never)} />
        ))}
        {showBack && (
          <Button label="Go back" variant="outline" onPress={() => router.back()} />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.xxl, paddingBottom: spacing.xl, gap: spacing.sm },
  title: { ...typography.h1 },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary },
  links: { gap: spacing.md },
});

