import {
  TrendingUp,
  Inbox,
  Factory,
  CheckCircle2,
  Database,
  BarChart3,
  Settings2,
  Activity,
  AlertTriangle,
  Package,
  RefreshCw,
  Clock,
} from "lucide-react";

const stats = [
  { label: "INTAKE / WEEK", value: "08", icon: TrendingUp, highlight: true },
  { label: "ACTIVE PROJECTS", value: "12" },
  { label: "COMPLETED / WEEK", value: "05" },
  { label: "CAPACITY USAGE", value: "84%", highlight: true },
  { label: "REVENUE / WEEK", value: "$42.5K", highlight: true },
  { label: "AVG TURNAROUND", value: "4.2", suffix: "DAYS" },
];

const operationalModules = [
  { title: "INTAKE", subtitle: "ASSET SUBMISSION & TRIAGE", badge: "08 NEW", badgeHighlight: true, action: "OPEN INTAKE", tabId: "intake", icon: Inbox },
  { title: "IN PRODUCTION", subtitle: "ACTIVE WORKSTREAMS", badge: "12 ACTIVE", action: "VIEW ACTIVE", tabId: "production", icon: Factory },
  { title: "COMPLETED", subtitle: "ARCHIVED ASSETS", badge: "248 TOTAL", action: "OPEN ARCHIVE", tabId: "completed", icon: CheckCircle2 },
  { title: "DATA", subtitle: "ASSET METADATA", badge: "4.2 TB USED", action: "OPEN DATA", tabId: "data", icon: Database },
  { title: "METRICS", subtitle: "KPI TRACKING", action: "VIEW METRICS", tabId: "metrics", icon: BarChart3 },
  { title: "CONFIG", subtitle: "SYSTEM RULES", action: "OPEN CONFIG", tabId: "config", icon: Settings2 },
];

const pipelineStages = [
  { num: "01", label: "INTAKE", active: true },
  { num: "02", label: "REVIEW" },
  { num: "03", label: "CONTRACT" },
  { num: "04", label: "PRODUCTION", active: true },
  { num: "05", label: "QA" },
  { num: "06", label: "DELIVERY" },
  { num: "07", label: "COMPLETED" },
];

const activityFeed = [
  { time: "14:22", text: "NODE_04 rendering sequence completed for Project RF-V9.", icon: CheckCircle2 },
  { time: "14:15", text: "New intake ticket #TK-882 assigned to Production Lane B.", icon: Inbox, highlight: "#TK-882" },
  { time: "13:58", text: "Global bandwidth usage spiked to 89% during large asset transfer.", icon: AlertTriangle },
  { time: "13:42", text: "Supervisor VALK_7 approved pricing adjustment.", icon: CheckCircle2 },
];

const queueItems = [
  { ref: "#TK-884", subject: "VFX_ASSET_PACK_01", priority: "CRITICAL", priorityColor: "text-destructive border-destructive" },
  { ref: "#TK-885", subject: "CHARACTER_RIG_VAR_B", priority: "NORMAL", priorityColor: "text-muted-foreground" },
  { ref: "#RF-X42", subject: "ENVIRONMENT_TEXTURE_4K", priority: "HIGH", priorityColor: "text-copper border-copper" },
  { ref: "#RF-X43", subject: "LIGHTING_RIG_NIGHT", priority: "LOW", priorityColor: "text-muted-foreground" },
];

interface ForgeDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

const ForgeDashboard = ({ onNavigateTab }: ForgeDashboardProps) => {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-copper" />
        <div className="pl-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-wider text-foreground leading-tight">
            BUSINESS SYSTEM <span className="text-copper">// ASSET PRODUCTION</span>
          </h2>
          <p className="text-xs tracking-[0.12em] uppercase font-sans text-muted-foreground mt-3 max-w-2xl">
            OPERATIONAL LANE FOR ASSET INTAKE, PRODUCTION TRACKING, DELIVERY FLOW, AND PERFORMANCE VISIBILITY.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border rounded-lg bg-card/40 p-4 flex flex-col justify-between">
            <p className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-serif font-bold ${stat.highlight ? "text-copper" : "text-foreground"}`}>
                {stat.value}
              </span>
              {stat.suffix && <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">{stat.suffix}</span>}
              {stat.icon && <stat.icon className="w-3.5 h-3.5 text-copper ml-1" />}
            </div>
          </div>
        ))}
      </div>

      {/* Operational Modules */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-px bg-copper" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-copper">OPERATIONAL MODULES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {operationalModules.map((mod) => (
            <div key={mod.title} className="border border-border rounded-lg bg-card/40 p-5 flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">{mod.title}</h3>
                  {mod.badge && (
                    <span className={`text-[9px] tracking-[0.1em] uppercase font-sans font-bold px-2 py-0.5 border rounded ${mod.badgeHighlight ? "text-copper border-copper" : "border-border text-muted-foreground"}`}>
                      {mod.badge}
                    </span>
                  )}
                </div>
                <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">{mod.subtitle}</p>
              </div>
              <button
                onClick={() => onNavigateTab(mod.tabId)}
                className="w-full py-2.5 rounded text-[10px] tracking-[0.12em] uppercase font-sans font-bold border border-border bg-card/60 text-foreground hover:border-copper/40 transition-colors mt-4"
              >
                {mod.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Overview */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-px bg-copper" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-copper">PIPELINE OVERVIEW</span>
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          {pipelineStages.map((stage) => (
            <div key={stage.num} className={`border rounded-lg px-5 py-3 ${stage.active ? "border-copper" : "border-border"}`}>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">STAGE {stage.num}</p>
              <p className={`text-xs font-serif font-bold tracking-wider ${stage.active ? "text-copper" : "text-foreground"}`}>{stage.label}</p>
            </div>
          ))}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg bg-card/40 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-copper" />
              <span className="text-[9px] tracking-[0.12em] uppercase font-sans font-bold text-copper">PIPELINE HEALTH</span>
            </div>
            <p className="text-2xl font-serif font-bold text-copper">NOMINAL</p>
            <div className="w-full h-1 rounded-full bg-border mt-3 overflow-hidden">
              <div className="h-full rounded-full bg-copper" style={{ width: "85%" }} />
            </div>
          </div>
          <div className="border border-border rounded-lg bg-card/40 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-copper" />
              <span className="text-[9px] tracking-[0.12em] uppercase font-sans font-bold text-muted-foreground">REVIEW BACKLOG</span>
            </div>
            <p className="text-2xl font-serif font-bold text-copper">14 PENDING</p>
            <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mt-2">REQUIRES SUPERVISOR SIGN-OFF</p>
          </div>
          <div className="border border-border rounded-lg bg-card/40 p-5 row-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-copper animate-pulse" />
                <span className="text-[9px] tracking-[0.12em] uppercase font-sans font-bold text-muted-foreground">LIVE STATUS FEED</span>
              </div>
              <RefreshCw className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-[9px] font-sans font-bold text-copper shrink-0 mt-0.5">{item.time}</span>
                  <p className="text-[10px] font-sans text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-lg bg-card/40 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-copper" />
              <span className="text-[9px] tracking-[0.12em] uppercase font-sans font-bold text-muted-foreground">DELIVERY STATUS</span>
            </div>
            <p className="text-2xl font-serif font-bold text-foreground">06 READY</p>
            <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mt-2">AWAITING CLIENT ACQUISITION</p>
          </div>
          <div className="border border-border rounded-lg bg-card/40 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-copper" />
              <span className="text-[9px] tracking-[0.12em] uppercase font-sans font-bold text-muted-foreground">CAPACITY WARNING</span>
            </div>
            <p className="text-2xl font-serif font-bold text-copper">02 BOTTLENECKS</p>
            <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mt-2">COMPUTE RESOURCE AT 94% LOAD</p>
          </div>
        </div>
      </div>

      {/* Recent Activity + Queue Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-copper" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-copper">RECENT ACTIVITY</span>
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground ml-auto cursor-pointer hover:text-foreground">VIEW FULL LOG</span>
          </div>
          <div className="space-y-3">
            {[
              { icon: "🟠", text: 'New intake submitted by Client ARC_OVERSEER', sub: "TRIAGE STATUS: PENDING REVIEW | 12M AGO" },
              { icon: "⚙️", text: 'Project #RF-2024-X4 moved to review', sub: "LANE: CHARACTER MODELING | 45M AGO" },
              { icon: "✅", text: 'Delivery completed for Project #RF-2024-V9', sub: "DESTINATION: S3_PRODUCTION_BUCKET | 1H 20M AGO" },
            ].map((item, i) => (
              <div key={i} className="border border-border rounded-lg bg-card/40 p-4 flex items-start gap-3">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-xs font-sans text-foreground">{item.text}</p>
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-serif font-bold tracking-wider text-foreground">QUEUE SNAPSHOT</span>
            <div className="flex items-center gap-1 ml-auto">
              {["QUEUE", "ACTIVE", "HISTORY"].map((tab) => (
                <button key={tab} className={`px-3 py-1 text-[9px] tracking-[0.1em] uppercase font-sans font-bold rounded ${tab === "ACTIVE" ? "bg-copper text-background" : "border border-border text-muted-foreground hover:text-foreground"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground text-left p-3">REFERENCE ID</th>
                  <th className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground text-left p-3">SUBJECT</th>
                  <th className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground text-left p-3">PRIORITY</th>
                </tr>
              </thead>
              <tbody>
                {queueItems.map((item) => (
                  <tr key={item.ref} className="border-b border-border last:border-b-0">
                    <td className="p-3 text-[10px] font-sans font-bold text-copper">{item.ref}</td>
                    <td className="p-3 text-[10px] font-sans text-foreground">{item.subject}</td>
                    <td className="p-3">
                      <span className={`text-[9px] tracking-[0.1em] uppercase font-sans font-bold px-2 py-0.5 rounded border ${item.priorityColor}`}>
                        {item.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Resources Footer */}
      <div className="grid grid-cols-2 gap-8 pt-6 border-t border-border">
        <div>
          <h4 className="text-xs font-serif font-bold tracking-wider text-copper mb-3">RESOURCES</h4>
          <div className="space-y-2">
            {["SCOPE DEFINITIONS", "PRICING RULES", "PROJECT TEMPLATES"].map((item) => (
              <p key={item} className="text-[10px] font-sans text-muted-foreground hover:text-foreground cursor-pointer transition-colors flex items-center gap-2">
                <span className="text-copper">|</span> {item}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-serif font-bold tracking-wider text-copper mb-3">INTERNAL</h4>
          <div className="space-y-2">
            {["PRODUCTION DOCS", "PIPELINE API", "ASSET NAMING GUIDE"].map((item) => (
              <p key={item} className="text-[10px] font-sans text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgeDashboard;
