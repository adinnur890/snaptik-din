import ComingSoonPage from "@/components/ComingSoonPage";
import { ScrollText } from "lucide-react";

export const metadata = {
  title: "Terms of Use — SnapDin",
  description: "SnapDin Terms of Use. Coming soon.",
};

export default function TermsPage() {
  return (
    <ComingSoonPage
      title="Terms of Use"
      description="Terms of use are being written. Use SnapDin responsibly."
    >
      <ScrollText size={28} className="text-white" />
    </ComingSoonPage>
  );
}
