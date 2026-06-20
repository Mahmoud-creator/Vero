import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, ScreenContainer, TextField } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { validateEmail, validatePassword } from "@/src/utils/validation";

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSignIn = () => {
    const next = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(next);
    if (!next.email && !next.password) {
      router.replace("/(tabs)/home");
    }
  };

  return (
    <ScreenContainer scroll>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue booking trusted pros.</Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="Email"
            icon="mail-outline"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <TextField
            label="Password"
            icon="lock-closed-outline"
            placeholder="••••••••"
            secure
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          <Pressable style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          <Button label="Sign in" fullWidth onPress={handleSignIn} />
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.social}>
          <Button label="Continue with Google" variant="outline" fullWidth leftIcon={<Ionicons name="logo-google" size={18} color={colors.text} />} onPress={() => router.replace("/(tabs)/home")} />
          <Button label="Continue with Apple" variant="outline" fullWidth leftIcon={<Ionicons name="logo-apple" size={18} color={colors.text} />} onPress={() => router.replace("/(tabs)/home")} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text style={styles.footerLink}>Sign up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  back: { marginTop: spacing.sm },
  header: { paddingTop: spacing.xl, paddingBottom: spacing.xl, gap: spacing.sm },
  title: { ...typography.display, fontSize: 30 },
  subtitle: { ...typography.body, color: colors.textSecondary },
  form: { gap: spacing.lg },
  forgot: { alignSelf: "flex-end", marginTop: -spacing.sm },
  forgotText: { ...typography.label, color: colors.primary },
  divider: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginVertical: spacing.xl },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { ...typography.caption },
  social: { gap: spacing.md },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: spacing.xxl },
  footerText: { ...typography.body, color: colors.textSecondary },
  footerLink: { ...typography.label, color: colors.primary },
});

