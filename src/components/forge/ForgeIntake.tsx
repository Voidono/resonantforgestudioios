import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, AlertTriangle, Copy, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ForgeIntakeDetailDrawer from "./ForgeIntakeDetailDrawer";

const workflowSteps = [
  { num: "01", title: "REVIEW SUBMISSION", description: "Management reviews the intake for missing info or incorrect scope." },
  { num: "02", title: "SCOPE ADJUSTMENTS", description: "Scope, asset counts, complexity, and requirements are adjusted internally." },
  { num: "03", title: "SEND OFFER", description: "Offer sent to client for review." },
  { num: "04", title: "CLIENT RESPONSE", description: "Client accepts, declines, or requests changes." },
  { num: "05", title: "CONTRACT SENT", description: "Contract created using final agreed scope and pricing." },
  { num: "06", title: "CONTRACT SIGNED", description: "Contract signed and project ready to move to production." },
];

interface IntakeItem {
  id: string;
  project_name: string | null;
  client_name: string | null;
  workflow_step: number;
  created_at: string;
  budget: number;
  status: string;
  itemCount: number;
}

interface ForgeIntakeProps {
  stats: { openIntakes: number; reviewing: number; offersOut: number; inNegos: number; contracts: number; productionReady: number };
}

const ForgeIntake = ({ stats }: ForgeIntakeProps) => {
  const navigate = useNavigate();
  const [intakes, setIntakes] = useState<IntakeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntakes = async () => {
      setLoading(true);
      const { data: requests } = await supabase
        .from("asset_requests")
        .select("id, project_name, client_name, workflow_step, created_at, budget, status")
        .in("status", ["pending", "reviewing", "offer_sent", "negotiating", "contract_sent"])
        .order("created_at", { ascending: false });

      if (!requests) { setLoading(false); return; }

      // Get item counts per request
      const ids = requests.map(r => r.id);
      const { data: items } = await supabase
        .from("asset_request_items")
        .select("request_id")
        .in("request_id", ids);

      const countMap: Record<string, number> = {};
      (items || []).forEach(i => { countMap[i.request_id] = (countMap[i.request_id] || 0) + 1; });

      setIntakes(requests.map(r => ({
        ...r,
        workflow_step: r.workflow_step ?? 1,
        budget: r.budget ?? 0,
        itemCount: countMap[r.id] || 0,
      })));
      setLoading(false);
    };
    fetchIntakes();
  }, []);

  const stepLabel = (step: number) => {
    const s = workflowSteps[step - 1];
    return s ? `STEP ${step} - ${s.title}` : `STEP ${step}`;
  };

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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((stat) => (
          <div key={stat.label} className={`border rounded-lg p-4 ${stat.highlight ? "border-copper bg-copper/5" : "border-border bg-card/40"}`}>
            <p className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-2xl font-serif font-bold ${stat.highlight ? "text-copper" : "text-foreground"}`}>
              {String(stat.value).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-copper" />
        </div>
      ) : intakes.length === 0 ? (
        <div className="border border-border rounded-lg bg-card/40 p-12 text-center">
          <p className="text-sm font-sans text-muted-foreground">NO ACTIVE INTAKES FOUND</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {intakes.map((intake) => (
            <div key={intake.id} className="border border-border rounded-lg bg-card/40 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] tracking-[0.15em] uppercase font-sans font-bold text-copper">
                    {intake.client_name || "UNKNOWN CLIENT"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {intake.workflow_step <= 2 && <AlertTriangle className="w-3.5 h-3.5 text-destructive" />}
                    {intake.itemCount > 1 && <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                    {intake.workflow_step >= 4 && <Zap className="w-3.5 h-3.5 text-copper" />}
                  </div>
                </div>
                <h3 className="text-sm font-serif font-bold tracking-wider text-foreground mb-2">
                  {intake.project_name || `INTAKE #${intake.id.slice(0, 6).toUpperCase()}`}
                </h3>
                <p className="text-[9px] tracking-[0.12em] uppercase font-sans font-bold text-copper mb-4">
                  {stepLabel(intake.workflow_step)}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">PHASE PROGRESSION</span>
                    <span className="text-[9px] font-sans font-bold text-copper">
                      {String(intake.workflow_step).padStart(2, "0")}/06
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-0.5">PHASE 1: INITIALIZATION</p>
                      <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                        <div className="h-full rounded-full bg-copper" style={{ width: intake.workflow_step >= 3 ? "100%" : `${(intake.workflow_step / 3) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-0.5">PHASE 2: FINALIZATION</p>
                      <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                        <div className="h-full rounded-full bg-copper" style={{ width: intake.workflow_step > 3 ? `${((intake.workflow_step - 3) / 3) * 100}%` : "0%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground">SUBMITTED</p>
                    <p className="text-[10px] font-sans font-bold text-foreground">
                      {new Date(intake.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }).toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground">ASSETS</p>
                    <p className="text-[10px] font-sans font-bold text-copper">{intake.itemCount} ITEM{intake.itemCount !== 1 ? "S" : ""}</p>
                  </div>
                </div>
                <button onClick={() => setOpenId(intake.id)} className="w-full py-2.5 rounded text-[10px] tracking-[0.12em] uppercase font-sans font-bold border border-border bg-card/60 text-foreground hover:border-copper/40 transition-colors">
                  OPEN INTAKE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
      <ForgeIntakeDetailDrawer requestId={openId} onClose={() => setOpenId(null)} />
    </div>
  );
};

export default ForgeIntake;
