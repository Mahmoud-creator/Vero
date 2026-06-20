import { Placeholder } from "@/src/components/ui/Placeholder";

export default function ChatTab() {
  return (
    <Placeholder
      title="Chat"
      subtitle="Placeholder — conversation list."
      links={[{ label: "Open conversation", href: "/chat/cv1" }]}
    />
  );
}

