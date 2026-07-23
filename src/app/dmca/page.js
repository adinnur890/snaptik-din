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
      description="Our DMCA takedown policy is being prepared. We respect intellectual property rights and will respond to all valid requests."
    >
      <FileWarning size={28} className="text-white" />
    </ComingSoonPage>
  );
}
