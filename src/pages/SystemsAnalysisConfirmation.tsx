import { useNavigate } from "react-router-dom";
import { CheckCircle, Compass, Scale, Clock, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSubNav from "@/components/DashboardSubNav";

const steps = [
  {
    id: "01",
    icon: CheckCircle,
    title: "INTAKE VALIDATION",
    description: "Submission completeness and structural fit are verified.",
    active: true,
  },
  {
    id: "02",
    icon: Compass,
    title: "FEASIBILITY & SCOPE REVIEW",
    description: "Proposed engagement is evaluated within the selected architectural mode.",
    active: false,
  },
  {
    id: "03",
    icon: Scale,
    title: "ENGAGEMENT DECISION",
    description: "A clear outcome is issued: proceed, revise, or decline.",
    active: false,
  },
];

const SystemsAnalysisConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardSubNav />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pt-[120px] md:pt-[132px] pb-12">
        {/* Transmission header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-copper/50" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
            TRANSMISSION SUCCESS
          </span>
          <div className="h-px w-12 bg-copper/50" />
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-center mb-4">
          SUBMISSION <span className="italic" style={{ color: "hsl(var(--copper))" }}>RECEIVED</span>
        </h1>

        <p className="text-sm md:text-base text-muted-foreground font-sans text-center max-w-xl mb-12 leading-relaxed">
          The intake protocol has been successfully initiated. Our systems architecture team is reviewing your documentation.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative border rounded-lg p-6 transition-all ${
                step.active
                  ? "border-copper/50 bg-card/60"
                  : "border-border bg-card/20"
              }`}
            >
              {step.active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ backgroundColor: "hsl(var(--copper))" }} />
              )}

              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: step.active ? "hsl(var(--copper) / 0.15)" : "hsl(var(--muted) / 0.5)" }}
                >
                  <step.icon
                    className="w-4 h-4"
                    style={{ color: step.active ? "hsl(var(--copper))" : "hsl(var(--muted-foreground))" }}
                  />
                </div>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold"
                  style={{ color: step.active ? "hsl(var(--copper))" : "hsl(var(--muted-foreground))" }}
                >
                  STEP {step.id}
                </span>
              </div>

              <h3 className={`text-sm font-serif font-bold tracking-wide mb-2 ${step.active ? "text-foreground" : "text-muted-foreground"}`}>
                {step.title}
              </h3>
              <p className={`text-xs font-sans leading-relaxed ${step.active ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                {step.description}
              </p>

              {step.active && (
                <div className="mt-4 w-full h-1 rounded-full overflow-hidden bg-muted">
                  <div className="h-full w-full rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Steps Card */}
        <div className="border border-border rounded-lg p-6 md:p-8 w-full max-w-3xl bg-card/30 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: "hsl(var(--copper) / 0.12)" }}
          >
            <MessageSquare className="w-6 h-6" style={{ color: "hsl(var(--copper))" }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold mb-2" style={{ color: "hsl(var(--copper))" }}>
              NEXT STEPS
            </p>
            <p className="text-lg md:text-xl font-serif font-bold text-foreground mb-3">
              Expect a scope/feasibility response within 3-5 business days.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                QUEUE STATUS: HIGH PRIORITY PROCESSING
              </span>
            </div>
          </div>
          <Clock className="w-8 h-8 text-muted-foreground/30 shrink-0" />
        </div>
      </section>

      {/* Footer bar */}
      <section className="px-6 py-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
            RFS-SYS-INTAKE-CONFIRMED // UUID: 8F2A-4C9D-11EB
          </span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="text-[10px] tracking-[0.15em] uppercase font-sans h-10 px-6 border-copper/50 text-foreground hover:bg-copper/10"
              onClick={() => navigate("/systems-analysis")}
            >
              RETURN TO HUB
            </Button>
            <Button
              className="text-[10px] tracking-[0.15em] uppercase font-sans h-10 px-6 bg-copper hover:bg-copper/90 text-background"
              onClick={() => navigate("/principles")}
            >
              VIEW STUDIO PHILOSOPHY
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemsAnalysisConfirmation;
