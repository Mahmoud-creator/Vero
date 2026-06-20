import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, ScreenContainer, TextField } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { validateEmail, validatePassword, validateRequired } from "@/src/utils/validation";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms?: string;
}

export function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleSignUp = () => {
    const next: Errors = {
      name: validateRequired(name, "Name"),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: confirm !== password ? "Passwords do not match" : undefined,
      terms: !agreed ? "Please accept the terms" : undefined,
    };
    setErrors(next);
    const ok = !next.name && !next.email && !next.password && !next.confirm && !next.terms;
    if (ok) router.replace("/(tabs)/home");
  };

  return (
    <ScreenContainer scroll>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join Vero and book trusted local pros today.</Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="Full name"
            icon="person-outline"
            placeholder="Jane Doe"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />
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
            placeholder="At least 6 characters"
            secure
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          <TextField
            label="Confirm password"
            icon="lock-closed-outline"
            placeholder="Re-enter password"
            secure
            value={confirm}
            onChangeText={setConfirm}
            error={errors.confirm}
          />

          <Pressable style={styles.terms} onPress={() => setAgreed((a) => !a)}>
            <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
              {agreed && <Ionicons name="checkmark" size={14} color={colors.textInverse} />}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Pressable>
          {errors.terms && <Text style={styles.error}>{errors.terms}</Text>}

          <Button label="Create account" fullWidth onPress={handleSignUp} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={() => router.replace("/login")}>
            <Text style={styles.footerLink}>Sign in</Text>
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
  terms: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  termsText: { ...typography.bodySmall, flex: 1 },
  termsLink: { color: colors.primary, fontWeight: "600" },
  error: { ...typography.caption, color: colors.danger, marginTop: -spacing.sm },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: spacing.xxl },
  footerText: { ...typography.body, color: colors.textSecondary },
  footerLink: { ...typography.label, color: colors.primary },
});

