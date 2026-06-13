import { useNavigate } from "react-router-dom";
import { Settings, LayoutGrid, Sparkles, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";

const modules = [
  {
    icon: Settings,
    title: "BUSINESS",
    blurb: "Studio infrastructure built to make B2B legible and enforceable.",
    route: "/transaction",
  },
  {
    icon: LayoutGrid,
    title: "DEVELOPERS",
    blurb: "A visible network of developers backing shared standards.",
    route: "/developer-hub",
  },
  {
    icon: Sparkles,
    title: "COMMUNITY",
    blurb: "Where our games take shape in the open. Decisions, documented.",
    route: "/community",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-[var(--sp-section)] py-[var(--sp-section)]">
        {/* Hero */}
        <header className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 md:w-12 bg-copper" />
            <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-medium text-copper">
              FORGE CORE ACTIVE
            </span>
            <div className="h-px w-8 md:w-12 bg-copper" />
          </div>
          <h1
            className="font-serif font-bold tracking-wider text-foreground"
            style={{ fontSize: "var(--fs-display)", lineHeight: 1.05 }}
          >
            RESONANT FORGE STUDIOS
          </h1>
          <p
            className="mt-2 tracking-[0.1em] text-copper"
            style={{ fontSize: "var(--fs-body)" }}
          >
            A studio built around legible decisions.
          </p>
        </header>

        {/* Module Cards — single row, viewport-fit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-gap)]">
          {modules.map((mod) => (
            <button
              key={mod.title}
              onClick={() => navigate(mod.route)}
              className="group relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-5 md:p-6 text-left flex flex-col gap-3 transition-colors hover:border-copper/40 focus:outline-none focus:border-copper"
            >
              <mod.icon className="w-6 h-6 text-copper" />
              <h3
                className="font-serif font-bold tracking-wider text-foreground"
                style={{ fontSize: "var(--fs-h2)" }}
              >
                {mod.title}
              </h3>
              <p
                className="text-muted-foreground leading-relaxed"
                style={{ fontSize: "var(--fs-small)" }}
              >
                {mod.blurb}
              </p>
              <div className="mt-auto flex items-center gap-2 text-copper text-[10px] tracking-[0.2em] uppercase">
                ENTER <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/principles")}
            className="px-7 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium rounded transition-colors bg-copper text-background hover:bg-copper/90"
          >
            View Studio Mission
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default Dashboard;
