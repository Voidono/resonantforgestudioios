import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Shield, HelpCircle, Lock, Box } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";

const tabs = ["BUSINESS", "DEVELOPERS", "COMMUNITY"] as const;
type Tab = typeof tabs[number];

const projects = [
  {
    id: "PROJECT_IP_01",
    title: "ASHES OF EARTH",
    icon: Settings,
    phase: "FABRICATION PHASE",
    status: "IN DEVELOPMENT",
    statusColor: "hsl(var(--copper))",
    active: true,
  },
  {
    id: "PROJECT_IP_02",
    title: "STRATARA",
    icon: Shield,
    phase: "ENGINE OPTIMIZATION",
    status: "STANDBY MODE",
    statusColor: "hsl(var(--muted-foreground))",
    active: false,
  },
  {
    id: "PROJECT_IP_03",
    title: "SHATTERFRONT",
    icon: Lock,
    phase: "RESOURCE ALLOCATION",
    status: "STANDBY MODE",
    statusColor: "hsl(var(--muted-foreground))",
    active: false,
  },
  {
    id: "PROJECT_IP_04",
    title: "CLASSIFIED",
    icon: HelpCircle,
    phase: "DECRYPTING DATA STREAM...",
    status: "ENCRYPTION ACTIVE",
    statusColor: "hsl(var(--copper))",
    active: true,
    classified: true,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("COMMUNITY");

  return (
    <div className="min-h-screen bg-background">
      {/* Sub-nav bar */}
      <div className="fixed top-[56px] md:top-[68px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase font-sans transition-colors"
            style={{ color: "hsl(var(--copper))" }}
          >
            <ArrowLeft className="w-4 h-4" />
            BACK
          </button>

          <div className="flex items-center gap-6 md:gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs tracking-[0.2em] uppercase font-sans py-3 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-copper text-copper"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                style={activeTab === tab ? { color: "hsl(var(--copper))", borderColor: "hsl(var(--copper))" } : {}}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => user ? navigate("/auth") : navigate("/auth")}
            className="text-xs tracking-[0.15em] uppercase font-sans px-4 py-1.5 border border-copper/50 rounded text-foreground hover:bg-copper/10 transition-colors"
          >
            STUDIO LOGIN
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-[120px] md:pt-[132px]">
        {activeTab === "COMMUNITY" ? (
          <CommunityTab navigate={navigate} />
        ) : (
          <PlaceholderTab tab={activeTab} navigate={navigate} />
        )}
      </div>

      {/* Bottom status bar */}
      <section className="px-6 py-4 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.2em] uppercase font-sans">
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground">
              HUB LATENCY: <span style={{ color: "hsl(var(--copper))" }}>14MS</span>
            </span>
            <span className="text-muted-foreground">
              COMM ENCRYPTION: <span style={{ color: "hsl(var(--copper))" }}>AES-256</span>
            </span>
            <span className="text-muted-foreground">
              ARCHIVE STATE: <span style={{ color: "hsl(var(--copper))" }}>SYNCHRONIZED</span>
            </span>
          </div>
          <span className="text-muted-foreground">
            © 2026 RESONANT FORGE STUDIOS (BCO) // HUB_INTERFACE_v5.0.0
          </span>
        </div>
      </section>
    </div>
  );
};

/* ─── COMMUNITY TAB ─── */
const CommunityTab = ({ navigate }: { navigate: ReturnType<typeof useNavigate> }) => (
  <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
      {/* Left sidebar */}
      <div className="space-y-6">
        {/* Core entity */}
        <div>
          <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-sans border border-border rounded px-3 py-1 text-muted-foreground mb-4">
            CORE ENTITY // RFS
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide text-foreground mb-4">
            Resonant Forge<br />Studios
          </h1>
          <p className="text-muted-foreground font-sans leading-relaxed text-sm mb-6">
            Pioneering collective direction through industrial-grade creative orchestration. Our mission integrates deep-stack worldbuilding with decentralized asset governance.
          </p>
          <div className="space-y-1 text-xs font-mono text-muted-foreground">
            <p><span style={{ color: "hsl(var(--copper))" }}>&gt;</span> ORCHESTRATING 4 CORE IP PIPELINES</p>
            <p><span style={{ color: "hsl(var(--copper))" }}>&gt;</span> COLLECTIVE CONSENSUS ACTIVE</p>
            <p><span style={{ color: "hsl(var(--copper))" }}>&gt;</span> FORGE-DRIVEN INFRASTRUCTURE ENABLED</p>
          </div>
        </div>

        {/* Active Vote widget */}
        <div className="border border-copper/30 rounded-lg p-5 bg-card/60">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium" style={{ color: "hsl(var(--copper))" }}>
              ACTIVE VOTE
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "hsl(var(--copper))" }} />
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
                VOTE OPEN
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-sans mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">BALLOT_ID:</span>
              <span className="text-foreground font-medium">RFS-AOE-01/2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">PRIORITY:</span>
              <span className="text-foreground font-medium">AOE ENGINE UPGRADE</span>
            </div>
          </div>

          <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-center mb-3" style={{ color: "hsl(var(--copper))" }}>
            MEMBERSHIP REQUIRED
          </p>

          <button
            onClick={() => navigate("/vote")}
            className="w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium rounded transition-colors border border-copper/50 text-foreground hover:bg-copper/10"
          >
            ENTER VOTING TERMINAL →
          </button>
        </div>

        {/* View Studio Archive */}
        <button
          onClick={() => navigate("/under-construction")}
          className="w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium rounded transition-colors flex items-center justify-center gap-2"
          style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
        >
          VIEW STUDIO ARCHIVE
          <Box className="w-4 h-4" />
        </button>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-border rounded-lg p-4 bg-card/60">
            <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground block mb-1">
              ACTIVE PROPOSALS
            </span>
            <span className="text-2xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>00</span>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card/60">
            <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground block mb-1">
              ARCHIVED DECISIONS
            </span>
            <span className="text-2xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>00</span>
          </div>
        </div>
      </div>

      {/* Right — Project IPs */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`relative border rounded-lg p-5 md:p-6 transition-colors cursor-pointer hover:border-copper/30 ${
              project.classified
                ? "border-copper/30 bg-copper/5"
                : "border-border bg-card/60"
            }`}
            onClick={() => navigate("/under-construction")}
          >
            {/* Corner dots */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-secondary/80 border border-border flex items-center justify-center flex-shrink-0">
                <project.icon className="w-6 h-6 text-muted-foreground" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-[0.2em] uppercase font-sans mb-1" style={{ color: "hsl(var(--copper))" }}>
                  {project.id}
                </p>
                <h3 className="text-xl md:text-2xl font-serif font-bold tracking-wider text-foreground">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(var(--copper))" }} />
                  <span className="text-xs tracking-[0.1em] uppercase font-sans text-muted-foreground">
                    {project.phase}
                  </span>
                </div>
              </div>

              {/* Status badge */}
              <span
                className={`hidden md:inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase font-sans px-3 py-1.5 rounded border flex-shrink-0 ${
                  project.active
                    ? "border-copper/40 text-copper"
                    : "border-border text-muted-foreground"
                }`}
                style={project.active ? { color: "hsl(var(--copper))", borderColor: "hsl(var(--copper) / 0.4)" } : {}}
              >
                {project.active && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                )}
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── PLACEHOLDER TAB ─── */
const PlaceholderTab = ({ tab, navigate }: { tab: string; navigate: ReturnType<typeof useNavigate> }) => (
  <div className="max-w-3xl mx-auto px-6 py-20 text-center">
    <p className="text-[10px] tracking-[0.3em] uppercase font-sans mb-4" style={{ color: "hsl(var(--copper))" }}>
      MODULE: {tab}
    </p>
    <h2 className="text-3xl font-serif font-bold tracking-wider text-foreground mb-3">
      SECTION UNDER FABRICATION
    </h2>
    <div className="h-0.5 w-12 mx-auto mb-6" style={{ backgroundColor: "hsl(var(--copper))" }} />
    <p className="text-muted-foreground font-sans leading-relaxed mb-8">
      This module is currently being assembled. Navigate to an active section or return later.
    </p>
    <button
      onClick={() => navigate("/under-construction")}
      className="px-8 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border border-border hover:border-copper/40 text-foreground rounded transition-colors"
    >
      VIEW MODULE STATUS
    </button>
  </div>
);

export default Dashboard;
