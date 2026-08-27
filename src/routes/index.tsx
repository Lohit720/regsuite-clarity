import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ProductStatement } from "@/components/site/ProductStatement";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { AIAssistant } from "@/components/site/AIAssistant";
import { ProductDemo } from "@/components/site/ProductDemo";
import { FinalCTA } from "@/components/site/FinalCTA";
import regintelTracker from "@/assets/regintel-tracker.png.asset.json";
import regopsDashboard from "@/assets/regops-dashboard.png.asset.json";
import regadaptTable from "@/assets/regadapt-table.png.asset.json";

const title = "RegProductSuite by 720 Degrees — AI Regulatory Intelligence";
const description =
  "AI-powered regulatory intelligence, operations and adaptation for modern enterprises. RegIntel, RegOps and RegAdapt in one platform.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-black">
      <Nav />
      <Hero />
      <ProductStatement />

      <ProductShowcase
        products={[
          {
            index: "01",
            name: "RegIntel",
            headline: "See what's changing.",
            copy: "Monitor regulatory information, track updates and gain earlier visibility into what matters.",
            image: regintelTracker.url,
            alt: "RegIntel query tracker showing regulatory process submissions and statuses",
            callouts: ["Monitor", "Track", "Understand"],
          },
          {
            index: "02",
            name: "RegAdapt",
            headline: "Adapt without losing control.",
            copy: "Track regulatory changes and manage adaptation activities with greater visibility.",
            image: regadaptTable.url,
            alt: "RegAdapt tracking new variants of registered products",
            callouts: ["Detect", "Assess", "Adapt"],
          },
          {
            index: "03",
            name: "RegOps",
            headline: "Know what needs attention.",
            copy: "Track regulatory submissions, approvals, renewals and activities from one operational view.",
            image: regopsDashboard.url,
            alt: "RegOps renewals dashboard with status breakdown and product records",
            callouts: ["Submissions", "Renewals", "Approvals"],
          },
        ]}
      />


      <AIAssistant />
      <ProductDemo />
      <FinalCTA />
    </main>
  );
}
