import { useLocalSearchParams } from "expo-router";
import { Placeholder } from "@/src/components/ui/Placeholder";

export default function ChatThread() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <Placeholder
      title="Chat Thread"
      subtitle={`Placeholder — Phase 15. id=${id}`}
      showBack
    />
  );
}

