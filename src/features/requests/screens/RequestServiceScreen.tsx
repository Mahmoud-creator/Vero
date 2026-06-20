import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, TextField } from "@/src/components/ui";
import { colors, radius, spacing, typography } from "@/src/constants/theme";
import { getWorkerById } from "@/src/mocks";

const TIME_SLOTS = ["Morning", "Afternoon", "Evening"] as const;

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function RequestServiceScreen() {
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  const router = useRouter();
  const worker = getWorkerById(workerId ?? "");
  const scrollRef = useRef<ScrollView>(null);

  const [serviceId, setServiceId] = useState(worker?.services[0]?.id ?? "");
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [slot, setSlot] = useState<(typeof TIME_SLOTS)[number]>("Morning");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ date?: string; description?: string }>({});

  const onChangeDate = (event: DateTimePickerEvent, selected?: Date) => {
    // Android closes the dialog itself; iOS uses inline spinner.
    setShowPicker(Platform.OS === "ios");
    if (event.type === "set" && selected) {
      setDate(selected);
      setErrors((e) => ({ ...e, date: undefined }));
    }
  };

  const handleSubmit = () => {
    const next = {
      date: !date ? "Pick a date" : undefined,
      description: description.trim().length < 10 ? "Add a few more details" : undefined,
    };
    setErrors(next);
    if (!next.date && !next.description) {
      router.replace("/(tabs)/requests");
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Request a service</Text>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.close}>
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {worker && (
            <View style={styles.workerRow}>
              <Avatar uri={worker.avatar} name={worker.name} size="md" />
              <View>
                <Text style={styles.workerName}>{worker.name}</Text>
                <Text style={styles.workerPro}>{worker.profession}</Text>
              </View>
            </View>
          )}

          <Text style={styles.label}>Select a service</Text>
          <View style={styles.services}>
            {worker?.services.map((svc) => {
              const active = svc.id === serviceId;
              return (
                <Pressable
                  key={svc.id}
                  onPress={() => setServiceId(svc.id)}
                  style={[styles.service, active && styles.serviceActive]}
                >
                  <View style={styles.radioOuter}>
                    {active && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.serviceName}>{svc.name}</Text>
                  <Text style={styles.servicePrice}>${svc.price}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Preferred date</Text>
          <Pressable
            onPress={() => setShowPicker(true)}
            style={[styles.dateField, !!errors.date && styles.dateFieldError]}
          >
            <Ionicons name="calendar-outline" size={20} color={date ? colors.primary : colors.textMuted} />
            <Text style={[styles.dateText, !date && styles.datePlaceholder]}>
              {date ? formatDate(date) : "Select a date"}
            </Text>
            <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
          </Pressable>
          {errors.date && <Text style={styles.fieldError}>{errors.date}</Text>}

          {showPicker && (
            <DateTimePicker
              value={date ?? new Date()}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={onChangeDate}
            />
          )}

          <Text style={styles.label}>Preferred time</Text>
          <View style={styles.slots}>
            {TIME_SLOTS.map((s) => {
              const active = s === slot;
              return (
                <Pressable key={s} onPress={() => setSlot(s)} style={[styles.slot, active && styles.slotActive]}>
                  <Text style={[styles.slotText, active && styles.slotTextActive]}>{s}</Text>
                </Pressable>
              );
            })}
          </View>

          <TextField
            label="Describe the job"
            placeholder="Tell the pro what you need help with..."
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            multiline
            textAlignVertical="top"
            onFocus={() => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 250)}
            containerStyle={styles.field}
            style={styles.textarea}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Button label="Send request" fullWidth onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { ...typography.h2, fontSize: 20 },
  close: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  workerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  workerName: { ...typography.label },
  workerPro: { ...typography.caption, color: colors.textSecondary },
  label: { ...typography.label, marginTop: spacing.sm },
  services: { gap: spacing.sm },
  service: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  serviceActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: { width: 10, height: 10, borderRadius: radius.full, backgroundColor: colors.primary },
  serviceName: { ...typography.body, flex: 1 },
  servicePrice: { ...typography.label, color: colors.primary },
  field: { marginTop: spacing.sm },
  dateField: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  dateFieldError: { borderColor: colors.danger },
  dateText: { ...typography.body, flex: 1 },
  datePlaceholder: { color: colors.textMuted },
  fieldError: { ...typography.caption, color: colors.danger },
  slots: { flexDirection: "row", gap: spacing.sm },
  slot: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  slotActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  slotText: { ...typography.label, color: colors.textSecondary },
  slotTextActive: { color: colors.textInverse },
  textarea: { minHeight: 120 },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});

