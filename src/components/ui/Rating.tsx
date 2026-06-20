import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, spacing, typography } from "@/src/constants/theme";

interface RatingProps {
  value: number;
  reviews?: number;
  size?: number;
  showValue?: boolean;
  style?: ViewStyle;
}

export function Rating({ value, reviews, size = 14, showValue = true, style }: RatingProps) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <View style={[styles.row, style]}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => {
          const name = rounded >= i ? "star" : rounded >= i - 0.5 ? "star-half" : "star-outline";
          return <Ionicons key={i} name={name} size={size} color={colors.star} />;
        })}
      </View>
      {showValue && <Text style={styles.value}>{value.toFixed(1)}</Text>}
      {reviews !== undefined && <Text style={styles.reviews}>({reviews})</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  stars: { flexDirection: "row", gap: 1 },
  value: { ...typography.label, marginLeft: spacing.xs },
  reviews: { ...typography.caption },
});

