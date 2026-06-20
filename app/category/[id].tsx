import { useLocalSearchParams } from "expo-router";
import { Placeholder } from "@/src/components/ui/Placeholder";

export default function CategoryResults() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <Placeholder
      title="Category Results"
      subtitle={`Placeholder — Phase 12. id=${id}`}
      links={[{ label: "Open worker", href: "/worker/w1" }]}
      showBack
    />
  );
}

