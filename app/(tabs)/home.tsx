import { Placeholder } from "@/src/components/ui/Placeholder";

export default function HomeTab() {
  return (
    <Placeholder
      title="Home"
      subtitle="Placeholder — Phase 11."
      links={[
        { label: "Category results", href: "/category/c1" },
        { label: "Worker profile", href: "/worker/w1" },
        { label: "Notifications", href: "/notifications" },
      ]}
    />
  );
}

