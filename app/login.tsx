import { Placeholder } from "@/src/components/ui/Placeholder";

export default function Login() {
  return (
    <Placeholder
      title="Login"
      subtitle="Placeholder — Phase 9."
      links={[
        { label: "Sign in (enter app)", href: "/(tabs)/home" },
        { label: "Create account", href: "/register" },
      ]}
      showBack
    />
  );
}

