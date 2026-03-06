import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, PlusSquare, FolderOpen, AtSign, CheckCircle, Search, Diamond, Send, FileText, Clock } from "lucide-react";

const workflowSteps = [
  {
    num: "01",
    phase: "INITIAL REVIEW",
    title: "Documentation Audit",
    description: "Complete verification of submission specifications, mesh density targets, and technical constraints.",
    icon: Search,
  },
  {
    num: "02",
    phase: "CLASSIFICATION",
    title: "Tier Assignment",
    description: "Complexity categorization for artisan matching. We assess geometry, texture sets, and rig requirements.",
    icon: Diamond,
  },
  {
    num: "03",
    phase: "FEASIBILITY",
    title: "Resource Determination",
    description: "Studio leads confirm forge capacity and finalize the estimated production timeline for high-fidelity output.",
    icon: Send,
  },
  {
    num: "04",
    phase: "FORMAL OFFER",
    title: "Final Terms & Pricing",
    description: "Delivery of a comprehensive proposal covering fixed costs, licensing tiers, and milestone schedules.",
    icon: FileText,
  },
];

const SubmissionConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mt-[72px]" />

      {/* Sub-header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-9 h-9 rounded flex items-center justify-center"
              style={{ backgroundColor: "hsl(var(--copper))" }}
            >
              <PlusSquare className="w-4 h-4" style={{ color: "hsl(var(--background))" }} />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground">RESONANT FORGE</h2>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                ASSET PRODUCTION PIPELINE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { icon: PlusSquare, label: "INTAKE", active: false, path: "/asset-intake" },
              { icon: FolderOpen, label: "ASSETS", active: false, path: "/operations-hub" },
              { icon: AtSign, label: "CONTACT", active: false, path: "/contact-terminal" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1"
              >
                <item.icon
                  className="w-4 h-4"
                  style={{ color: item.active ? "hsl(var(--copper))" : undefined }}
                />
                <span
                  className="text-[9px] tracking-[0.1em] uppercase font-sans font-medium"
                  style={{ color: item.active ? "hsl(var(--copper))" : undefined }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <span className="text-[10px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            PAGE 3 <span className="font-bold" style={{ color: "hsl(var(--copper))" }}>SUBMISSION CONFIRMATION</span>
          </span>
        </div>
      </div>

      <section className="flex-1 px-4 md:px-8 py-10 max-w-4xl mx-auto w-full">
        {/* Submission Received Card */}
        <div className="border border-border rounded-lg bg-card/40 p-8 mb-16">
          <div className="flex items-start gap-5">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "hsl(var(--copper) / 0.12)" }}
            >
              <CheckCircle className="w-6 h-6" style={{ color: "hsl(var(--copper))" }} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                Submission Received
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Request ID: <span className="font-bold" style={{ color: "hsl(var(--copper))" }}>RF-992-B</span>. Our internal evaluation protocol is now active. Technical review determines final asset tiering and artisan allocation.
              </p>
              <span
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-sans font-bold px-4 py-2 rounded"
                style={{
                  backgroundColor: "hsl(var(--copper) / 0.12)",
                  color: "hsl(var(--copper))",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                AWAITING EVALUATION MODE
              </span>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-muted-foreground mb-2">
            SYSTEM WORKFLOW
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
            WHAT HAPPENS NEXT
          </h2>
          <div className="w-10 h-0.5 mx-auto" style={{ backgroundColor: "hsl(var(--copper))" }} />
        </div>

        {/* Workflow Steps with Timeline */}
        <div className="relative mb-16">
          {/* Vertical line */}
          <div
            className="absolute left-[22px] top-0 bottom-0 w-px"
            style={{ backgroundColor: "hsl(var(--border))" }}
          />

          <div className="space-y-10">
            {workflowSteps.map((step) => (
              <div key={step.num} className="flex gap-6 relative">
                {/* Icon dot */}
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 z-10"
                  style={{ backgroundColor: "hsl(var(--copper) / 0.15)" }}
                >
                  <step.icon className="w-5 h-5" style={{ color: "hsl(var(--copper))" }} />
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-[8px] tracking-[0.1em] uppercase font-sans font-bold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: "hsl(var(--copper) / 0.15)",
                        color: "hsl(var(--copper))",
                      }}
                    >
                      NODE {step.num}
                    </span>
                    <span className="text-[9px] tracking-[0.15em] uppercase font-sans font-semibold text-muted-foreground">
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Protocol */}
        <div className="mb-12">
          <p className="text-center text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-muted-foreground mb-6">
            PAYMENT PROTOCOL
          </p>

          <div className="border border-border rounded-lg bg-card/40 overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-border">
              {[
                { pct: "30%", label: "UPFRONT", desc: "INITIATION & DOCUMENTATION AUDIT" },
                { pct: "40%", label: "MID-PIPELINE", desc: "PRODUCTION MILESTONE VERIFICATION" },
                { pct: "30%", label: "FINAL APPROVAL", desc: "ASSET HANDOVER & TERMINAL RELEASE" },
              ].map((p) => (
                <div key={p.label} className="text-center py-6 px-4">
                  <p className="text-2xl md:text-3xl font-serif font-bold mb-1" style={{ color: "hsl(var(--copper))" }}>
                    {p.pct}
                  </p>
                  <p className="text-xs font-sans font-bold tracking-wider text-foreground mb-1">{p.label}</p>
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-5 py-2.5 flex items-center justify-between">
              <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                PROTOCOL REFERENCE: RFS-FIN-v2
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--copper) / 0.4)" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--copper) / 0.4)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Response Protocol */}
        <div
          className="border rounded-lg p-6 flex items-start gap-4 mb-10"
          style={{ borderColor: "hsl(var(--copper) / 0.3)", backgroundColor: "hsl(var(--copper) / 0.05)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "hsl(var(--copper) / 0.15)" }}
          >
            <Clock className="w-4 h-4" style={{ color: "hsl(var(--copper))" }} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-sans font-bold tracking-wider text-foreground mb-1">RESPONSE PROTOCOL</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Processing time for high-fidelity industrial assets is typically{" "}
              <span className="font-bold underline" style={{ color: "hsl(var(--copper))" }}>24-48 hours</span>.
              A notification will be dispatched to your registered secure terminal once the technical offer is compiled.
            </p>
          </div>
          <button
            onClick={() => navigate("/operations-hub")}
            className="shrink-0 px-5 py-2.5 rounded text-xs tracking-[0.15em] uppercase font-sans font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
          >
            VIEW MY QUEUE
          </button>
        </div>
      </section>

      {/* Status Footer */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
              FORGE CORE CONSOLE V.2.4.0
            </span>
          </div>
          <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            © 2024 RESONANT FORGE STUDIOS // ASSET LOGISTICS DIVISION
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;
