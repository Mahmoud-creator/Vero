import { Placeholder } from "@/src/components/ui/Placeholder";

export default function RequestService() {
  return (
    <Placeholder
      title="Request Service"
      subtitle="Placeholder modal — Phase 14."
      links={[{ label: "Submit (to My Requests)", href: "/(tabs)/requests" }]}
      showBack
    />
  );
}

