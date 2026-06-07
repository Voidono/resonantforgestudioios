import { useNavigate } from "react-router-dom";
import { Settings, LayoutGrid, Sparkles } from "lucide-react";

const modules = [
  {
    index: "01",
    icon: Settings,
    title: "BUSINESS",
    description:
      "Studio infrastructure and operating systems designed to make the B2B side of game development more honest, legible, and enforceable.",
    status: "OP_STATUS: NOMINAL",
    button: "INITIALIZE WORKSPACE",
    route: "/transaction",
    dominant: true,
  },
  {
    index: "02",
    icon: LayoutGrid,
    title: "DEVELOPERS",
    description:
      "A mutually visible network of developers we support and who choose to stand behind the studio.",
    status: "CORE_AUTH: GRANTED",
    button: "FORGE INTEGRATION",
    route: "/developer-hub",
  },
  {
    index: "03",
    icon: Sparkles,
    title: "COMMUNITY",
    description:
      "Where our games take shape in the open. Progress, art, and direction shared as the studio builds.",
    status: "NET_SYNC: ACTIVE",
    button: "ACCESS NEXUS",
    route: "/community",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden relative">
      {/* Background artistry */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--copper)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--copper)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--copper) / 0.18), transparent 70%), radial-gradient(ellipse 50% 40% at 50% 100%, hsl(var(--gold) / 0.08), transparent 70%)",
        }}
      />

      {/* Hero */}
      <section className="pt-20 md:pt-24 pb-3 px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-10 md:w-20" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <span
            className="text-[10px] md:text-xs tracking-[0.35em] uppercase font-sans font-medium"
            style={{ color: "hsl(var(--copper))" }}
          >
            SYSTEM ONLINE // FORGE CORE ACTIVE
          </span>
          <div className="h-px w-10 md:w-20" style={{ backgroundColor: "hsl(var(--copper))" }} />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-wider text-foreground mb-1">
          RESONANT <span className="italic font-normal" style={{ color: "hsl(var(--copper))" }}>Forge</span> STUDIOS
        </h1>

        <p
          className="text-[11px] md:text-sm tracking-[0.2em] font-sans italic"
          style={{ color: "hsl(var(--copper) / 0.85)" }}
        >
          — a studio built around legible decisions —
        </p>
      </section>

      {/* Module Cards */}
      <section className="flex-1 px-6 pb-6 min-h-0 relative z-10 overflow-auto lg:overflow-hidden">
        <div className="max-w-7xl h-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.title}
                onClick={() => navigate(mod.route)}
                className={`group relative border border-border rounded-lg bg-card/40 backdrop-blur-sm p-6 flex flex-col items-start text-left transition-all duration-500 hover:border-copper/60 hover:bg-card/70 hover:-translate-y-1 ${
                  mod.dominant ? "md:col-span-2 md:row-span-1" : "md:col-span-1"
                }`}
                style={{
                  boxShadow: "0 0 0 0 hsl(var(--copper) / 0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 60px -10px hsl(var(--copper) / 0.45), inset 0 0 30px -10px hsl(var(--copper) / 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 0 hsl(var(--copper) / 0)";
                }}
              >
                {/* Corner brackets */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-copper/60" />
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-copper/60" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-copper/60" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-copper/60" />

                {/* Index number */}
                <span
                  className="absolute top-3 right-4 font-serif italic text-xs tracking-widest"
                  style={{ color: "hsl(var(--copper) / 0.5)" }}
                >
                  {mod.index} / 03
                </span>

                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    className={`${mod.dominant ? "w-8 h-8" : "w-6 h-6"} transition-colors group-hover:text-copper`}
                    style={{ color: "hsl(var(--copper) / 0.7)" }}
                  />
                  <h3
                    className={`${
                      mod.dominant ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                    } font-serif font-bold tracking-wider`}
                    style={{ color: "hsl(var(--copper))" }}
                  >
                    {mod.title}
                  </h3>
                </div>

                <div
                  className="h-px w-12 mb-3 transition-all duration-500 group-hover:w-24"
                  style={{ backgroundColor: "hsl(var(--copper))" }}
                />

                <p
                  className={`${
                    mod.dominant ? "text-sm md:text-base" : "text-xs md:text-sm"
                  } text-muted-foreground leading-relaxed font-sans flex-1`}
                >
                  {mod.description}
                </p>

                <div className="w-full mt-4 flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "hsl(var(--copper))" }}
                    />
                    <span
                      className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-sans"
                      style={{ color: "hsl(var(--copper) / 0.8)" }}
                    >
                      {mod.status}
                    </span>
                  </div>
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-colors group-hover:text-copper"
                    style={{ color: "hsl(var(--copper) / 0.7)" }}
                  >
                    {mod.button} →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Bottom whisper */}
      <div className="px-6 py-2 text-center relative z-10">
        <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-muted-foreground/50">
          © 2026 RESONANT FORGE STUDIOS — BCO // BOUNDED · CLEAR · DIRECT
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
