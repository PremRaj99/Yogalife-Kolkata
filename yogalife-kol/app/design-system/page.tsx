import type { Metadata } from "next";
import { DesignSystem } from "@/components/design-system";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return <DesignSystem />;
}
