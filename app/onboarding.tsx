import { Placeholder } from "@/src/components/ui/Placeholder";

export default function Onboarding() {
  return (
    <Placeholder
      title="Onboarding"
      subtitle="Placeholder — Phase 8."
      links={[{ label: "Continue to Login", href: "/login" }]}
      showBack
    />
  );
}

