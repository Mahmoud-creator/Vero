import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fragment } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Badge, Button, Card, EmptyState, IconButton, Rating } from "@/src/components/ui";
import { colors, radius, shadows, spacing, typography } from "@/src/constants/theme";
import { getWorkerById } from "@/src/mocks";
import { Review, Service } from "@/src/types";

export function WorkerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const worker = getWorkerById(id ?? "");

  if (!worker) {
    return (
      <SafeAreaView style={styles.safe}>
        <EmptyState icon="person-outline" title="Pro not found" actionLabel="Go back" onAction={() => router.back()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.topBar}>
        <IconButton name="arrow-back" onPress={() => router.back()} />
        <IconButton name="heart-outline" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Identity */}
        <View style={styles.identity}>
          <Avatar uri={worker.avatar} name={worker.name} size="xl" online={worker.online} />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{worker.name}</Text>
            {worker.verified && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
          </View>
          <Text style={styles.profession}>{worker.profession}</Text>
          <Rating value={worker.rating} reviews={worker.reviewCount} size={16} />
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={styles.location}>
              {worker.location} · {worker.distanceKm} km away
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <Stat value={`$${worker.hourlyRate}`} label="Per hour" />
          <Divider />
          <Stat value={`${worker.jobsCompleted}+`} label="Jobs done" />
          <Divider />
          <Stat value={worker.responseTime} label="Responds" />
        </View>

        {/* About */}
        <Section title="About">
          <Text style={styles.bio}>{worker.bio}</Text>
          <View style={styles.skills}>
            {worker.skills.map((s) => (
              <Badge key={s} label={s} tone="primary" />
            ))}
          </View>
        </Section>

        {/* Services */}
        <Section title="Services">
          <Card padded={false} style={styles.servicesCard}>
            {worker.services.map((svc, i) => (
              <Fragment key={svc.id}>
                {i > 0 && <View style={styles.rowDivider} />}
                <ServiceRow service={svc} />
              </Fragment>
            ))}
          </Card>
        </Section>

        {/* Reviews */}
        <Section title={`Reviews (${worker.reviewCount})`}>
          <View style={styles.reviews}>
            {worker.reviews.map((r) => (
              <ReviewItem key={r.id} review={r} />
            ))}
          </View>
        </Section>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.cta}>
        <Button
          label="Chat"
          variant="outline"
          leftIcon={<Ionicons name="chatbubble-outline" size={18} color={colors.text} />}
          onPress={() => router.push("/chat/cv1")}
          style={styles.chatBtn}
        />
        <Button
          label="Request service"
          onPress={() => router.push(`/request-service?workerId=${worker.id}`)}
          style={styles.requestBtn}
        />
      </View>
    </SafeAreaView>
  );
}


function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.statDivider} />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ServiceRow({ service }: { service: Service }) {
  return (
    <View style={styles.serviceRow}>
      <Text style={styles.serviceName}>{service.name}</Text>
      <Text style={styles.servicePrice}>
        ${service.price}
        <Text style={styles.serviceUnit}>/{service.unit}</Text>
      </Text>
    </View>
  );
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <View style={styles.review}>
      <Avatar uri={review.avatar} name={review.author} size="sm" />
      <View style={styles.reviewBody}>
        <View style={styles.reviewHead}>
          <Text style={styles.reviewAuthor}>{review.author}</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
        <Rating value={review.rating} size={12} showValue={false} />
        <Text style={styles.reviewText}>{review.comment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  content: { paddingBottom: 120 },
  identity: { alignItems: "center", gap: spacing.xs, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  nameRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.sm },
  name: { ...typography.h1 },
  profession: { ...typography.body, color: colors.textSecondary },
  locationRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.xs },
  location: { ...typography.caption, color: colors.textSecondary },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
    ...shadows.sm,
  },
  stat: { flex: 1, alignItems: "center", gap: spacing.xs },
  statValue: { ...typography.h3, color: colors.primary },
  statLabel: { ...typography.caption },
  statDivider: { width: 1, height: 32, backgroundColor: colors.border },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl, gap: spacing.md },
  sectionTitle: { ...typography.h2, fontSize: 18 },
  bio: { ...typography.body, color: colors.textSecondary },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  servicesCard: { overflow: "hidden" },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  serviceName: { ...typography.body, flex: 1 },
  servicePrice: { ...typography.label, color: colors.primary },
  serviceUnit: { ...typography.caption, color: colors.textMuted },
  rowDivider: { height: 1, backgroundColor: colors.border, marginHorizontal: spacing.lg },
  reviews: { gap: spacing.lg },
  review: { flexDirection: "row", gap: spacing.md },
  reviewBody: { flex: 1, gap: spacing.xs },
  reviewHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewAuthor: { ...typography.label },
  reviewDate: { ...typography.caption },
  reviewText: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  cta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chatBtn: { flex: 1 },
  requestBtn: { flex: 2 },
});

