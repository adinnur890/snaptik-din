import ComingSoonPage from "@/components/ComingSoonPage";
import { FileWarning } from "lucide-react";

export const metadata = {
  title: "DMCA — SnapDin",
  description: "SnapDin DMCA Policy. Coming soon.",
};

export default function DmcaPage() {
  return (
    <ComingSoonPage
      title="DMCA Policy"
      description="We respect intellectual property. DMCA policy coming soon."
    >
      <FileWarning size={28} className="text-white" />
    </ComingSoonPage>
  );
}
