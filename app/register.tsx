import { Placeholder } from "@/src/components/ui/Placeholder";

export default function Register() {
  return (
    <Placeholder
      title="Register"
      subtitle="Placeholder — Phase 10."
      links={[{ label: "Sign up (enter app)", href: "/(tabs)/home" }]}
      showBack
    />
  );
}

