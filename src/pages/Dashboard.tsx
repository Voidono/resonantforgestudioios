import { useNavigate } from "react-router-dom";
import { Settings, LayoutGrid, Sparkles } from "lucide-react";

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
    route: "/community",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Hero */}
      <section className="pt-12 md:pt-16 pb-3 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 20%, hsl(var(--copper) / 0.12), transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 md:w-16" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans font-medium"
              style={{ color: "hsl(var(--copper))" }}
            >
              SYSTEM ONLINE // FORGE CORE ACTIVE
            </span>
            <div className="h-px w-8 md:w-16" style={{ backgroundColor: "hsl(var(--copper))" }} />
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-wider text-foreground mb-2">
            RESONANT FORGE STUDIOS
          </h1>

          <p
            className="text-xs md:text-sm tracking-[0.1em] font-sans"
            style={{ color: "hsl(var(--copper))" }}
          >
            A studio built around legible decisions.
          </p>
        </div>
      </section>

      {/* OUR GOAL */}
      <section className="px-6 pb-3">
        <div
          onClick={() => navigate("/principles")}
          className="relative max-w-3xl mx-auto border border-border rounded-lg bg-card/60 backdrop-blur-sm p-4 md:p-5 text-center cursor-pointer transition-all duration-300 hover:border-copper/40 hover:shadow-[0_0_32px_-4px_hsl(var(--copper)/0.45)]"
        >
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

          <h2 className="text-xl md:text-2xl font-serif font-bold tracking-wider text-foreground mb-2">
            OUR GOAL
          </h2>
          <div className="h-0.5 w-10 mx-auto mb-2" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <p className="text-muted-foreground font-sans leading-relaxed text-xs md:text-sm max-w-xl mx-auto mb-3">
            To build a studio that makes creative, technical, and business decisions explicit, accountable, and structurally sound as they scale.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/principles");
            }}
            className="px-6 py-1.5 text-[11px] tracking-[0.15em] uppercase font-sans font-medium rounded transition-colors"
            style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
          >
            VIEW STUDIO MISSION
          </button>
        </div>
      </section>

      {/* Module Cards */}
      <section className="flex-1 px-6 pb-3 min-h-0 overflow-auto md:overflow-hidden">
        <div className="max-w-6xl h-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <div
              key={mod.title}
              onClick={() => navigate(mod.route)}
              className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-4 flex flex-col items-center text-center justify-between cursor-pointer transition-all duration-300 hover:border-copper/40 hover:shadow-[0_0_32px_-4px_hsl(var(--copper)/0.45)]"
            >
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

              <div className="flex flex-col items-center">
                <mod.icon className="w-6 h-6 mb-2 text-muted-foreground" />
                <h3
                  className="text-lg md:text-xl font-serif font-bold tracking-wider mb-2"
                  style={{ color: "hsl(var(--copper))" }}
                >
                  {mod.title}
                </h3>
                <div className="h-0.5 w-8 mb-2" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <p className="text-xs text-muted-foreground leading-relaxed font-sans max-w-xs">
                  {mod.description}
                </p>
              </div>

              <div className="w-full mt-3 space-y-2">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(mod.route);
                  }}
                  className="w-full py-2 text-[11px] tracking-[0.15em] uppercase font-sans font-medium border border-border rounded hover:border-copper/40 text-foreground transition-colors"
                >
                  {mod.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom status */}
      <section className="px-6 py-2 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1 text-[10px] tracking-[0.2em] uppercase font-sans">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span style={{ color: "hsl(var(--copper))" }}>BCO // BOUNDED CLEAR DIRECT</span>
            <span className="text-muted-foreground hidden md:inline">AUTH: 45.4215N // 75.6972W</span>
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
