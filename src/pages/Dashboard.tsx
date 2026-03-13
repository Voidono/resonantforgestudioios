import { useNavigate } from "react-router-dom";
import { Settings, LayoutGrid, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

const modules = [
  {
    icon: Settings,
    title: "BUSINESS",
    description:
      "Studio infrastructure and operating systems designed to make the B2B side of game development more honest, legible, and enforceable.",
    status: "OP_STATUS: NOMINAL",
    button: "INITIALIZE WORKSPACE",
    route: "/transaction",
  },
  {
    icon: LayoutGrid,
    title: "DEVELOPERS",
    description:
      "A mutually visible network of developers we support and who choose to stand behind the studio through shared standards and work.",
    status: "CORE_AUTH: GRANTED",
    button: "FORGE INTEGRATION",
    route: "/developer-hub",
  },
  {
    icon: Sparkles,
    title: "COMMUNITY",
    description:
      "Where our games take shape in the open. Sharing progress, art, and direction as the studio builds. Decisions made collectively are documented, showing the path chosen.",
    status: "NET_SYNC: ACTIVE",
    button: "ACCESS NEXUS",
    route: "/dashboard",
    isCommunity: true,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 px-6 text-center relative overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 20%, hsl(var(--copper) / 0.12), transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 md:w-16" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans font-medium"
              style={{ color: "hsl(var(--copper))" }}
            >
              SYSTEM ONLINE // FORGE CORE ACTIVE
            </span>
            <div className="h-px w-8 md:w-16" style={{ backgroundColor: "hsl(var(--copper))" }} />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wider text-foreground mb-4">
            RESONANT FORGE STUDIOS
          </h1>

          <p
            className="text-sm md:text-base tracking-[0.1em] font-sans mb-8"
            style={{ color: "hsl(var(--copper))" }}
          >
            A studio built around legible decisions.
          </p>

          <button
            onClick={() => navigate("/under-construction")}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase font-sans border border-border rounded hover:border-copper/40 text-foreground transition-colors"
          >
            <LayoutGrid className="w-4 h-4" style={{ color: "hsl(var(--copper))" }} />
            REF_005_UPDATED_DESCR.MAP
          </button>
        </div>
      </section>

      {/* OUR GOAL */}
      <section className="px-6 pb-16">
        <div className="relative max-w-3xl mx-auto border border-border rounded-lg bg-card/60 backdrop-blur-sm p-10 md:p-14 text-center">
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-foreground mb-3">
            OUR GOAL
          </h2>
          <div className="h-0.5 w-10 mx-auto mb-6" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <p className="text-muted-foreground font-sans leading-relaxed text-sm md:text-base max-w-xl mx-auto mb-8">
            To build a studio that makes creative, technical, and business decisions explicit, accountable, and structurally sound as they scale.
          </p>
          <button
            onClick={() => navigate("/principles")}
            className="px-8 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium rounded transition-colors"
            style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
          >
            VIEW STUDIO MISSION
          </button>
        </div>
      </section>

      {/* Module Cards */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-8 flex flex-col items-center text-center min-h-[380px] justify-between transition-colors hover:border-copper/30"
            >
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

              <div className="flex flex-col items-center">
                <mod.icon className="w-8 h-8 mb-5 text-muted-foreground" />
                <h3
                  className="text-xl md:text-2xl font-serif font-bold tracking-wider mb-2"
                  style={{ color: "hsl(var(--copper))" }}
                >
                  {mod.title}
                </h3>
                <div className="h-0.5 w-8 mb-5" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <p className="text-xs text-muted-foreground leading-relaxed font-sans max-w-xs">
                  {mod.description}
                </p>
              </div>

              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium"
                    style={{ color: "hsl(var(--copper))" }}
                  >
                    {mod.status}
                  </span>
                </div>
                <button
                  onClick={() => navigate(mod.route)}
                  className="w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border border-border rounded hover:border-copper/40 text-foreground transition-colors"
                >
                  {mod.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom status */}
      <section className="mt-auto px-6 py-4 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.2em] uppercase font-sans">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span style={{ color: "hsl(var(--copper))" }}>BCO // BOUNDED CLEAR DIRECT</span>
            <span className="text-muted-foreground">AUTH: 45.4215N // 75.6972W</span>
          </div>
          <span className="text-muted-foreground">
            © 2026 RESONANT FORGE STUDIOS (BCO) // HUB_INTERFACE_v5.0.0
          </span>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
