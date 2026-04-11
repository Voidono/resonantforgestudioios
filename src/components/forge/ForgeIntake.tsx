import { useNavigate } from "react-router-dom";
import { Zap, AlertTriangle, Copy } from "lucide-react";

const workflowSteps = [
  { num: "01", title: "REVIEW SUBMISSION", description: "Management reviews the intake for missing info or incorrect scope." },
  { num: "02", title: "SCOPE ADJUSTMENTS", description: "Scope, asset counts, complexity, and requirements are adjusted internally." },
  { num: "03", title: "SEND OFFER", description: "Offer sent to client for review." },
  { num: "04", title: "CLIENT RESPONSE", description: "Client accepts, declines, or requests changes." },
  { num: "05", title: "CONTRACT SENT", description: "Contract created using final agreed scope and pricing." },
  { num: "06", title: "CONTRACT SIGNED", description: "Contract signed and project ready to move to production." },
];

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

const getFlagIcon = (flag: string) => {
  switch (flag) {
    case "zap": return <Zap className="w-3.5 h-3.5 text-copper" />;
    case "alert": return <AlertTriangle className="w-3.5 h-3.5 text-destructive" />;
    case "copy": return <Copy className="w-3.5 h-3.5 text-muted-foreground" />;
    default: return null;
  }
};

interface ForgeIntakeProps {
  stats: { openIntakes: number; reviewing: number; offersOut: number; inNegos: number; contracts: number; productionReady: number };
}

const ForgeIntake = ({ stats }: ForgeIntakeProps) => {
  const navigate = useNavigate();

  const statCards = [
    { label: "OPEN INTAKES", value: stats.openIntakes, highlight: true },
    { label: "REVIEWING", value: stats.reviewing },
    { label: "OFFERS OUT", value: stats.offersOut },
    { label: "IN NEGOS", value: stats.inNegos },
    { label: "CONTRACTS", value: stats.contracts },
    { label: "PRODUCTION READY", value: stats.productionReady },
  ];

  return (
    <div className="space-y-8">
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
            className={`border rounded-lg p-4 ${stat.highlight ? "border-copper bg-copper/5" : "border-border bg-card/40"}`}
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] tracking-[0.15em] uppercase font-sans font-bold text-copper">{intake.developer}</span>
                <div className="flex items-center gap-1.5">
                  {intake.flags.map((f, i) => <span key={i}>{getFlagIcon(f)}</span>)}
                </div>
              </div>
              <h3 className="text-sm font-serif font-bold tracking-wider text-foreground mb-2">{intake.title}</h3>
              <p className="text-[9px] tracking-[0.12em] uppercase font-sans font-bold text-copper mb-4">{intake.step}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">PHASE PROGRESSION</span>
                  <span className="text-[9px] font-sans font-bold text-copper">
                    {String(intake.currentPhase).padStart(2, "0")}/{String(intake.phases).padStart(2, "0")}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div>
                    <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-0.5">PHASE 1: INITIALIZATION</p>
                    <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                      <div className="h-full rounded-full bg-copper" style={{ width: intake.currentPhase >= 3 ? "100%" : `${(intake.currentPhase / 3) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-0.5">PHASE 2: FINALIZATION</p>
                    <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                      <div className="h-full rounded-full bg-copper" style={{ width: intake.currentPhase > 3 ? `${((intake.currentPhase - 3) / 3) * 100}%` : "0%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <span className="text-[10px] font-serif font-bold tracking-wider text-copper border border-copper rounded px-2 py-0.5">{step.num}</span>
                <h4 className="text-xs font-serif font-bold tracking-wider text-foreground">{step.title}</h4>
              </div>
              <p className="text-[10px] font-sans text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForgeIntake;
