import { useLocalSearchParams } from "expo-router";
import { Placeholder } from "@/src/components/ui/Placeholder";

export default function WorkerProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <Placeholder
      title="Worker Profile"
      subtitle={`Placeholder — Phase 13. id=${id}`}
      links={[
        { label: "Request service", href: "/request-service" },
        { label: "Open chat", href: "/chat/cv1" },
      ]}
      showBack
    />
  );
}

