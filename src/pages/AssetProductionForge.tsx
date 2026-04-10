import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutGrid,
  ArrowRight,
  Inbox,
  Factory,
  CheckCircle2,
  Database,
  BarChart3,
  Settings2,
  FileText,
  Search,
  Bell,
  Settings,
  Loader2,
  Zap,
  AlertTriangle,
  Copy,
  Plus,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutGrid, label: "Dashboard", id: "dashboard" },
  { icon: Inbox, label: "Intake", id: "intake", active: true },
  { icon: Factory, label: "In Production", id: "production" },
  { icon: CheckCircle2, label: "Completed", id: "completed" },
  { icon: Database, label: "Data", id: "data" },
  { icon: BarChart3, label: "Metrics", id: "metrics" },
  { icon: Settings2, label: "Config", id: "config" },
  { icon: FileText, label: "Logs", id: "logs" },
];

const workflowSteps = [
  { num: "01", title: "REVIEW SUBMISSION", description: "Management reviews the intake for missing info or incorrect scope." },
  { num: "02", title: "SCOPE ADJUSTMENTS", description: "Scope, asset counts, complexity, and requirements are adjusted internally." },
  { num: "03", title: "SEND OFFER", description: "Offer sent to client for review." },
  { num: "04", title: "CLIENT RESPONSE", description: "Client accepts, declines, or requests changes." },
  { num: "05", title: "CONTRACT SENT", description: "Contract created using final agreed scope and pricing." },
  { num: "06", title: "CONTRACT SIGNED", description: "Contract signed and project ready to move to production." },
];

// Mock intake data for display
const mockIntakes = [
  {
    developer: "ARCANE_OVERSEER",
    title: "INDUSTRIAL CHASSIS V4",
    step: "STEP 4 - CLIENT RESPONSE",
    stepNum: 4,
    phases: 6,
    currentPhase: 4,
    submitted: "2026-02-15",
    estValue: "$4.2K - $8.5K",
    flags: ["zap", "copy"],
  },
  {
    developer: "ZEN_NEXUS",
    title: "NEON ENGINE CORE",
    step: "STEP 1 - REVIEW SUBMISSION",
    stepNum: 1,
    phases: 6,
    currentPhase: 1,
    submitted: "2026-02-18",
    estValue: "$12K - $15K",
    flags: ["alert"],
  },
  {
    developer: "VOID_ARCHITECT",
    title: "SUB-SPACE RELAY",
    step: "STEP 3 - SEND OFFER",
    stepNum: 3,
    phases: 6,
    currentPhase: 3,
    submitted: "2026-02-14",
    estValue: "$8.5K - $10K",
    flags: ["copy"],
  },
  {
    developer: "NULL_POINTER",
    title: "NEURAL MESH V2",
    step: "STEP 5 - CONTRACT SENT",
    stepNum: 5,
    phases: 6,
    currentPhase: 5,
    submitted: "2026-02-12",
    estValue: "$1.5K - $2.2K",
    flags: ["zap"],
  },
];

const AssetProductionForge = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { hasAdminAccess, loading: roleLoading } = useRole();
  const [activeTab, setActiveTab] = useState("intake");
  const [stats, setStats] = useState({
    openIntakes: 0,
    reviewing: 0,
    offersOut: 0,
    inNegos: 0,
    contracts: 0,
    productionReady: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && !roleLoading && !hasAdminAccess) navigate("/dashboard");
  }, [authLoading, roleLoading, hasAdminAccess, user, navigate]);

  useEffect(() => {
    if (!hasAdminAccess) return;
    const fetchStats = async () => {
      const { data } = await supabase.from("asset_requests").select("status");
      const items = data || [];
      setStats({
        openIntakes: items.filter((a) => a.status === "pending").length || 14,
        reviewing: 8,
        offersOut: 5,
        inNegos: 3,
        contracts: 6,
        productionReady: 4,
      });
    };
    fetchStats();
  }, [hasAdminAccess]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-copper" />
      </div>
    );
  }

  if (!hasAdminAccess) return null;

  const statCards = [
    { label: "OPEN INTAKES", value: stats.openIntakes, highlight: true },
    { label: "REVIEWING", value: stats.reviewing },
    { label: "OFFERS OUT", value: stats.offersOut },
    { label: "IN NEGOS", value: stats.inNegos },
    { label: "CONTRACTS", value: stats.contracts },
    { label: "PRODUCTION READY", value: stats.productionReady },
  ];

  const getFlagIcon = (flag: string) => {
    switch (flag) {
      case "zap": return <Zap className="w-3.5 h-3.5 text-copper" />;
      case "alert": return <AlertTriangle className="w-3.5 h-3.5 text-destructive" />;
      case "copy": return <Copy className="w-3.5 h-3.5 text-muted-foreground" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex mt-[72px]">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card/30 flex flex-col shrink-0 hidden lg:flex">
        <div className="p-5 border-b border-border">
          <h2 className="text-sm font-serif font-bold tracking-wider text-copper">INTAKE_QUEUE</h2>
          <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mt-1">V.2.0.4-STABLE</p>
        </div>

        <div className="p-4">
          <button
            onClick={() => navigate("/asset-intake")}
            className="w-full py-2.5 rounded text-xs tracking-[0.12em] uppercase font-sans font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
          >
            <Plus className="w-4 h-4" />
            NEW_INTAKE
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-sans transition-colors ${
                activeTab === item.id
                  ? "text-copper bg-copper/10 border-l-2 border-copper"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-copper/20 flex items-center justify-center">
              <Settings className="w-3 h-3 text-copper" />
            </div>
            <div>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">SYSTEM NODE</p>
              <p className="text-[10px] font-sans font-bold text-foreground">FORGE_PRIMARY</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-auto">
        {/* Top Bar */}
        <header className="border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
          <h1 className="text-sm font-serif font-bold tracking-[0.2em] text-foreground">ASSET_PRODUCTION_FORGE</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="SEARCH_QUEUE..."
                className="bg-card/40 border border-border rounded pl-9 pr-4 py-1.5 text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-copper/40 w-48"
              />
            </div>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/admin-operations")}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-8 overflow-auto">
          {/* Page Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-px bg-copper" />
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-copper">PRODUCTION PIPELINE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wider text-foreground">
              ASSET PRODUCTION // INTAKE
            </h2>
            <p className="text-xs tracking-[0.1em] uppercase font-sans text-muted-foreground mt-2">
              UNRESOLVED INTAKE SUBMISSIONS AND PROJECT INITIALIZATION QUEUE.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className={`border rounded-lg p-4 ${
                  stat.highlight
                    ? "border-copper bg-copper/5"
                    : "border-border bg-card/40"
                }`}
              >
                <p className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground mb-1">{stat.label}</p>
                <p className={`text-2xl font-serif font-bold ${stat.highlight ? "text-copper" : "text-foreground"}`}>
                  {String(stat.value).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>

          {/* Intake Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {mockIntakes.map((intake) => (
              <div key={intake.title} className="border border-border rounded-lg bg-card/40 p-5 flex flex-col justify-between">
                <div>
                  {/* Developer + Flags */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] tracking-[0.15em] uppercase font-sans font-bold text-copper">
                      {intake.developer}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {intake.flags.map((f, i) => (
                        <span key={i}>{getFlagIcon(f)}</span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-serif font-bold tracking-wider text-foreground mb-2">{intake.title}</h3>

                  {/* Step */}
                  <p className="text-[9px] tracking-[0.12em] uppercase font-sans font-bold text-copper mb-4">{intake.step}</p>

                  {/* Phase Progression */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">PHASE PROGRESSION</span>
                      <span className="text-[9px] font-sans font-bold text-copper">
                        {String(intake.currentPhase).padStart(2, "0")}/{String(intake.phases).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Phase bars */}
                    <div className="space-y-1.5">
                      <div>
                        <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-0.5">PHASE 1: INITIALIZATION</p>
                        <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                          <div
                            className="h-full rounded-full bg-copper"
                            style={{ width: intake.currentPhase >= 3 ? "100%" : `${(intake.currentPhase / 3) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-0.5">PHASE 2: FINALIZATION</p>
                        <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                          <div
                            className="h-full rounded-full bg-copper"
                            style={{ width: intake.currentPhase > 3 ? `${((intake.currentPhase - 3) / 3) * 100}%` : "0%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Submitted + Est. Value */}
                <div>
                  <div className="flex items-center justify-between mb-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground">SUBMITTED</p>
                      <p className="text-[10px] font-sans font-bold text-foreground">{intake.submitted}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground">EST. VALUE</p>
                      <p className="text-[10px] font-sans font-bold text-copper">{intake.estValue}</p>
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded text-[10px] tracking-[0.12em] uppercase font-sans font-bold border border-border bg-card/60 text-foreground hover:border-copper/40 transition-colors">
                    OPEN INTAKE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Steps */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-copper" />
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-copper">INTAKE WORKFLOW STEPS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workflowSteps.map((step) => (
                <div key={step.num} className="border border-border rounded-lg bg-card/40 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-serif font-bold tracking-wider text-copper border border-copper rounded px-2 py-0.5">
                      {step.num}
                    </span>
                    <h4 className="text-xs font-serif font-bold tracking-wider text-foreground">{step.title}</h4>
                  </div>
                  <p className="text-[10px] font-sans text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetProductionForge;
