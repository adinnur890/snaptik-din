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
      description="We don't collect or sell your data. Full policy coming soon."
    >
      <ShieldCheck size={28} className="text-white" />
    </ComingSoonPage>
  );
}
