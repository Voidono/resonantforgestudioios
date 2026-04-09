import { useNavigate } from "react-router-dom";
import { Settings, LayoutGrid, Sparkles, Package, Shield, Lock, HelpCircle, LogIn } from "lucide-react";
import Footer from "@/components/Footer";

const topModules = [
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
];

const projectIPs = [
  {
    id: "PROJECT_IP_01",
    title: "ASHES OF EARTH",
    icon: Package,
    phase: "FABRICATION PHASE",
    status: "IN DEVELOPMENT",
    statusColor: "hsl(var(--copper))",
    dotColor: "hsl(var(--copper))",
  },
  {
    id: "PROJECT_IP_02",
    title: "STRATARA",
    icon: Shield,
    phase: "ENGINE OPTIMIZATION",
    status: "STANDBY MODE",
    statusColor: "hsl(var(--muted-foreground))",
    dotColor: "hsl(var(--muted-foreground))",
  },
  {
    id: "PROJECT_IP_03",
    title: "SHATTERFRONT",
    icon: Lock,
    phase: "RESOURCE ALLOCATION",
    status: "STANDBY MODE",
    statusColor: "hsl(var(--muted-foreground))",
    dotColor: "hsl(var(--muted-foreground))",
  },
  {
    id: "PROJECT_IP_04",
    title: "CLASSIFIED",
    icon: HelpCircle,
    phase: "DECRYPTING DATA STREAM...",
    status: "ENCRYPTION ACTIVE",
    statusColor: "hsl(var(--copper))",
    dotColor: "hsl(var(--copper))",
    isClassified: true,
  },
];

const CornerDots = () => (
  <>
    <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
  </>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 px-6 text-center relative overflow-hidden">
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
          <CornerDots />
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

      {/* Top Module Cards — Business & Developers */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {topModules.map((mod) => (
            <div
              key={mod.title}
              className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-8 flex flex-col items-center text-center min-h-[340px] justify-between transition-colors hover:border-copper/30"
            >
              <CornerDots />
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

      {/* Community — Expanded Section */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-5">
            <Sparkles className="w-5 h-5" style={{ color: "hsl(var(--copper))" }} />
            <h2
              className="text-lg font-serif font-bold tracking-wider"
              style={{ color: "hsl(var(--copper))" }}
            >
              COMMUNITY
            </h2>
            <div className="h-px flex-1" style={{ backgroundColor: "hsl(var(--copper) / 0.3)" }} />
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
                NET_SYNC: ACTIVE
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Left Column — Studio Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Core Entity Card */}
              <div className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-6">
                <CornerDots />
                <span className="inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-sans border border-border rounded mb-4 text-muted-foreground">
                  CORE ENTITY // RFS
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-foreground mb-4">
                  Resonant Forge Studios
                </h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-5">
                  Pioneering collective direction through industrial-grade creative orchestration. Our mission integrates deep-stack worldbuilding with decentralized asset governance.
                </p>
                <div className="space-y-1 text-[10px] tracking-[0.12em] uppercase font-sans text-muted-foreground">
                  <p>&gt; ORCHESTRATING 4 CORE IP PIPELINES</p>
                  <p>&gt; COLLECTIVE CONSENSUS ACTIVE</p>
                  <p>&gt; FORGE-DRIVEN INFRASTRUCTURE ENABLED</p>
                </div>
              </div>

              {/* Active Vote Card */}
              <div className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-5">
                <CornerDots />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium" style={{ color: "hsl(var(--copper))" }}>
                    ACTIVE VOTE
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                    VOTE OPEN
                  </span>
                </div>
                <div className="space-y-2 text-xs font-sans mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground tracking-[0.1em]">BALLOT_ID:</span>
                    <span className="text-foreground tracking-[0.1em]">RFS-AOE-01/2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground tracking-[0.1em]">PRIORITY:</span>
                    <span className="text-foreground tracking-[0.1em]">AOE ENGINE UPGRADE</span>
                  </div>
                </div>
                <p className="text-[10px] tracking-[0.12em] uppercase font-sans text-center mb-3" style={{ color: "hsl(var(--copper))" }}>
                  MEMBERSHIP REQUIRED
                </p>
                <button
                  onClick={() => navigate("/vote")}
                  className="w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium rounded flex items-center justify-center gap-2 transition-colors"
                  style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
                >
                  ENTER VOTING TERMINAL
                  <LogIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Archive Button */}
              <button
                onClick={() => navigate("/community")}
                className="w-full py-3.5 text-xs tracking-[0.15em] uppercase font-sans font-medium rounded flex items-center justify-center gap-2 transition-colors"
                style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
              >
                VIEW STUDIO ARCHIVE
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-border rounded-lg bg-card/60 p-4">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-sans text-muted-foreground block mb-1">
                    ACTIVE PROPOSALS
                  </span>
                  <span className="text-2xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                    00
                  </span>
                </div>
                <div className="border border-border rounded-lg bg-card/60 p-4">
                  <span className="text-[10px] tracking-[0.12em] uppercase font-sans text-muted-foreground block mb-1">
                    ARCHIVED DECISIONS
                  </span>
                  <span className="text-2xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                    00
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column — Project IP Cards */}
            <div className="lg:col-span-3 space-y-4">
              {projectIPs.map((project) => (
                <div
                  key={project.id}
                  className={`relative border border-border rounded-lg backdrop-blur-sm p-5 flex items-center gap-5 transition-colors hover:border-copper/30 ${
                    project.isClassified
                      ? "bg-gradient-to-r from-card/80 via-card/60 to-copper/5"
                      : "bg-card/60"
                  }`}
                >
                  <CornerDots />
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 border border-border"
                    style={{ backgroundColor: "hsl(var(--card))" }}
                  >
                    <project.icon
                      className="w-7 h-7"
                      style={{ color: project.isClassified ? "hsl(var(--copper))" : "hsl(var(--muted-foreground))" }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground block mb-1">
                      {project.id}
                    </span>
                    <h4 className="text-lg md:text-xl font-serif font-bold tracking-wider text-foreground">
                      {project.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: project.dotColor }} />
                      <span className="text-[10px] tracking-[0.12em] uppercase font-sans" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {project.phase}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className="shrink-0 flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase font-sans rounded border"
                    style={{
                      borderColor: project.statusColor,
                      color: project.statusColor,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.statusColor }} />
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
