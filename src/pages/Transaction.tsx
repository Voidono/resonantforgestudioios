import { useNavigate } from "react-router-dom";
import { Box, TrendingUp, Paintbrush, Brain } from "lucide-react";
import DashboardSubNav from "@/components/DashboardSubNav";

const subsystems = [
  {
    id: "01",
    icon: Box,
    title: "FRAMEWORKS",
    status: "IN PROGRESS",
    statusColor: "hsl(var(--copper))",
    statusBg: "hsl(var(--copper) / 0.15)",
    description:
      "Proprietary architectural foundations optimized for large-scale immersive environments and distributed simulation logic. Designed for extreme concurrency and low-latency state synchronization.",
    metric: "SYNC LATENCY",
    metricValue: "33% OPTIMIZED",
    metricProgress: 33,
    metricColor: "hsl(var(--copper))",
    route: null as string | null,
    dotColor: "hsl(var(--copper))",
  },
  {
    id: "02",
    icon: TrendingUp,
    title: "SYSTEMS ANALYSIS",
    status: "LIVE",
    statusColor: "#22c55e",
    statusBg: "rgba(34, 197, 94, 0.15)",
    description:
      "Evaluative auditing and infrastructure design for external partner studios. We optimize technical pipelines, resolve debt, and architect scalable production structures for high-performance releases.",
    metric: "LOAD BALANCE",
    metricValue: "25% CAPACITY",
    metricProgress: 25,
    metricColor: "#22c55e",
    route: "/systems-analysis",
    dotColor: "#22c55e",
  },
  {
    id: "03",
    icon: Paintbrush,
    title: "ASSET PRODUCTION",
    status: "LIVE",
    statusColor: "#22c55e",
    statusBg: "rgba(34, 197, 94, 0.15)",
    description:
      "A high-fidelity production pipeline for mission-critical visual and logic assets. Requests are scoped and executed through a rigorous internal flow, ensuring consistent quality and technical integration.",
    metric: "OUTPUT RATE",
    metricValue: "50% CAPACITY",
    metricProgress: 50,
    metricColor: "hsl(var(--copper))",
    route: "/asset-production",
    dotColor: "#22c55e",
  },
  {
    id: "04",
    icon: Brain,
    title: "NLR RESEARCH",
    status: "PENDING",
    statusColor: "#ef4444",
    statusBg: "rgba(239, 68, 68, 0.15)",
    description:
      "R&D focus on non-linear responsiveness and perceptual stability within real-time systems. Investigating low-latency orchestration and autonomic system behavior under high-stress constraints.",
    metric: "QUEUE LOAD",
    metricValue: "OFFLINE",
    metricProgress: 0,
    metricColor: "#ef4444",
    route: null as string | null,
    dotColor: "#ef4444",
  },
];

const Transaction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardSubNav />

      <section className="flex-1 px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full pt-[120px] md:pt-[132px]">
        {/* Subsystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subsystems.map((sys) => (
            <div
              key={sys.id}
              className={`relative border border-border rounded-lg bg-card/40 p-6 md:p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 ${
                sys.route ? "cursor-pointer hover:border-copper/40" : ""
              }`}
              onClick={() => sys.route && navigate(sys.route)}
            >
              <div
                className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: sys.dotColor }}
              />

              <div>
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-5"
                  style={{ backgroundColor: "hsl(var(--copper) / 0.12)" }}
                >
                  <sys.icon className="w-5 h-5" style={{ color: "hsl(var(--copper))" }} />
                </div>

                <p
                  className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium mb-2"
                  style={{ color: "hsl(var(--copper))" }}
                >
                  SUBSYSTEM_{sys.id}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg md:text-xl font-serif font-bold tracking-wider text-foreground">
                    {sys.title}
                  </h2>
                  <span
                    className="text-[9px] tracking-[0.15em] uppercase font-sans font-semibold px-2.5 py-0.5 rounded border"
                    style={{
                      color: sys.statusColor,
                      borderColor: sys.statusColor,
                      backgroundColor: sys.statusBg,
                    }}
                  >
                    {sys.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  {sys.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium text-muted-foreground">
                    {sys.metric}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase font-sans font-semibold"
                    style={{ color: sys.metricColor }}
                  >
                    {sys.metricValue}
                  </span>
                </div>
                <div className="w-full h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${sys.metricProgress}%`,
                      backgroundColor: sys.metricColor,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom status bar */}
      <section className="px-6 py-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.15em] uppercase font-sans">
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground">
              THERMAL LOAD: <span style={{ color: "hsl(var(--copper))" }}>42°C</span>
            </span>
            <span className="text-muted-foreground">
              CORE FREQUENCY: <span style={{ color: "hsl(var(--copper))" }}>4.8 GHz</span>
            </span>
            <span className="text-muted-foreground">
              BUFFER STATUS: <span className="text-green-500">STABLE</span>
            </span>
          </div>
          <span className="text-muted-foreground">
            © 2024 RESONANT FORGE STUDIOS (RFS) // CORE_SUBSYSTEMS_HUB // INFRA_V2.1.0
          </span>
        </div>
      </section>
    </div>
  );
};

export default Transaction;
