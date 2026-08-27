import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ProductStatement } from "@/components/site/ProductStatement";
import { ModuleShowcase } from "@/components/site/ModuleShowcase";
import { AIAssistant } from "@/components/site/AIAssistant";
import { ProductDemo } from "@/components/site/ProductDemo";
import { FinalCTA } from "@/components/site/FinalCTA";
import regintelTracker from "@/assets/regintel-tracker.png.asset.json";
import regintelTables from "@/assets/regintel-tables.png.asset.json";
import regopsDashboard from "@/assets/regops-dashboard.png.asset.json";
import regopsWheel from "@/assets/regops-wheel.png.asset.json";
import regadaptTable from "@/assets/regadapt-table.png.asset.json";
import regadaptAdmin from "@/assets/regadapt-admin.png.asset.json";

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

      <ModuleShowcase
        index="01"
        name="RegIntel"
        headline="See what's changing."
        copy="Monitor regulatory information, track updates and gain earlier visibility into what matters."
        image={regintelTracker.url}
        alt="RegIntel query tracker showing regulatory process submissions and statuses"
        detailImage={regintelTables.url}
        detailAlt="RegIntel dashboard tables for multiple process numbers"
        callouts={["Monitor", "Track", "Understand"]}
      />

      <ModuleShowcase
        index="02"
        name="RegOps"
        headline="Know what needs attention."
        copy="Track regulatory submissions, approvals, renewals and activities from one operational view."
        image={regopsDashboard.url}
        alt="RegOps renewals dashboard with status breakdown and product records"
        detailImage={regopsWheel.url}
        detailAlt="RegOps platform capability overview"
        callouts={["Submissions", "Renewals", "Approvals"]}
        align="right"
      />

      <ModuleShowcase
        index="03"
        name="RegAdapt"
        headline="Adapt without losing control."
        copy="Track regulatory changes and manage adaptation activities with greater visibility."
        image={regadaptTable.url}
        alt="RegAdapt tracking new variants of registered products"
        detailImage={regadaptAdmin.url}
        detailAlt="RegAdapt admin configuration screen"
        callouts={["Detect", "Assess", "Adapt"]}
      />

      <AIAssistant />
      <ProductDemo />
      <FinalCTA />
    </main>
  );
}
