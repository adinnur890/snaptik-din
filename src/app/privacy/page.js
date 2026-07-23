import ComingSoonPage from "@/components/ComingSoonPage";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — SnapDin",
  description: "SnapDin Privacy Policy. Coming soon.",
};

export default function PrivacyPage() {
  return (
    <ComingSoonPage
      title="Privacy Policy"
      description="Our privacy policy is being drafted. We take your privacy seriously and will publish a clear, transparent policy soon."
    >
      <ShieldCheck size={28} className="text-white" />
    </ComingSoonPage>
  );
}
