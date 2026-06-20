import { Image } from "expo-image";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radius, typography } from "@/src/constants/theme";

type Size = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: Size;
  online?: boolean;
  style?: ViewStyle;
}

const dimensions: Record<Size, number> = { sm: 36, md: 48, lg: 64, xl: 96 };

function initials(name?: string): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ uri, name, size = "md", online, style }: AvatarProps) {
  const dim = dimensions[size];
  const dotSize = Math.max(8, dim * 0.22);

  return (
    <View style={[{ width: dim, height: dim }, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: dim, height: dim, borderRadius: dim / 2 }]}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { width: dim, height: dim, borderRadius: dim / 2 },
          ]}
        >
          <Text style={[styles.initials, { fontSize: dim * 0.36 }]}>{initials(name)}</Text>
        </View>
      )}
      {online !== undefined && (
        <View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: online ? colors.success : colors.textMuted,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.surfaceAlt },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryLight,
  },
  initials: { ...typography.label, color: colors.primaryDark },
  dot: {
    position: "absolute",
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: colors.surface,
    borderRadius: radius.full,
  },
});

