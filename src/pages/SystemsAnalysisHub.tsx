import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Layers, Code, ArrowRight, Shield, Clock, Check, Loader2 } from "lucide-react";
import DashboardSubNav from "@/components/DashboardSubNav";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const serviceCards = [
  {
    id: "01",
    type: "SERV_TYPE_01",
    icon: Zap,
    title: "CONCEPT STRESS TEST",
    subtitle: "PRELIMINARY ARCHITECTURAL VALIDATION",
    price: "$400.00",
    priceNote: "STUDIO ASSESSMENT FEE // ONE-TIME",
    delivery: "DELIVERY: 5-7 BUSINESS DAYS",
    features: [
      { icon: Shield, text: "RAPID STRUCTURAL AUDIT" },
      { icon: Layers, text: "CONSTRAINT MAPPING SESSION" },
    ],
    output: "IMMEDIATE BOTTLENECK IDENTIFICATION LOG",
    status: "AVAILABLE",
    highlighted: false,
  },
  {
    id: "02",
    type: "SERV_TYPE_02",
    icon: Layers,
    title: "DEEP SYSTEMS REVIEW",
    subtitle: "FULL-SCALE DIAGNOSTIC OF ARCHITECTURAL BOTTLENECKS AND SYSTEMIC FAILURES",
    price: "$200.00",
    priceNote: "/HR // MIN 40-HR UNIT CYCLE",
    delivery: null,
    features: [
      { icon: Check, text: "FULL STRUCTURAL BREAKDOWN" },
      { icon: Check, text: "RESOURCE ALLOCATION REVIEW" },
      { icon: Check, text: "INTERNAL FRICTION ANALYSIS" },
    ],
    output: "COMPLETE ARCHITECTURAL OPTIMIZATION BLUEPRINT & REPORT",
    status: "ACTIVE",
    highlighted: true,
  },
  {
    id: "03",
    type: "ARCH_TYPE_01",
    icon: Code,
    title: "EMBEDDED WINDOW",
    subtitle: "HANDS-ON ARCHITECT RESPONSIVE FOR ON-GOING TECHNICAL OVERSIGHT",
    price: "$200.00",
    priceNote: "/HR // WEEKLY MINIMUM: 20 HRS",
    delivery: "1-WEEK DEPOSIT: UPFRONT",
    features: [
      { icon: Check, text: "FRACTIONAL CTO/ARCHITECT" },
      { icon: Check, text: "WEEKLY SYNC & ADJUSTMENT" },
      { icon: Check, text: "IMPLEMENTATION OVERSIGHT" },
    ],
    output: "LIVE SYSTEMIC EVOLUTION AND SCALING PROTOCOLS",
    status: "AVAILABLE",
    highlighted: false,
  },
];

const SystemsAnalysisHub = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardSubNav />

      <section className="flex-1 px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full pt-[120px] md:pt-[132px]">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground">
              STATUS: ANALYSIS MODE ACTIVE
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground">
              //
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
              SYS-A-001
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground mb-2">
            STUDIO
            <br />
            ARCHITECTURE
          </h1>
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-serif italic tracking-wide"
            style={{ color: "hsl(var(--copper))" }}
          >
            PATH SELECTION
          </p>

          {/* Capacity indicators */}
          <div className="flex items-center gap-8 mt-8">
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-1">
                CAPACITY SIGNAL
              </p>
              <div className="flex items-center gap-1">
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <div className="w-8 h-1 rounded-full bg-muted" />
              </div>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-1">
                CONTINUITY LOCK
              </p>
              <p className="text-sm font-sans font-medium" style={{ color: "hsl(var(--copper))" }}>
                94.2% <span className="text-muted-foreground font-normal">SECURE</span>
              </p>
            </div>
          </div>
        </div>

        {/* Authentication Notice */}
        <div className="border border-copper/30 rounded-lg p-3 mb-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
          <p className="text-[10px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            <span className="text-foreground">NOTICE:</span> AUTHENTICATION REQUIRED — STUDIO LOGIN IS MANDATORY FOR ALL SUBSEQUENT STAGES BEYOND THIS INTERFACE.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {serviceCards.map((card) => (
            <div
              key={card.id}
              className={`relative border rounded-lg p-6 flex flex-col transition-all duration-300 ${
                card.highlighted
                  ? "border-copper/50 bg-card/60"
                  : "border-border bg-card/40 hover:border-copper/30"
              } ${hoveredCard === card.id ? "scale-[1.02]" : ""}`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Corner dots */}
              <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

              {/* Status badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                  {card.type}
                </span>
                <span
                  className="text-[8px] tracking-[0.1em] uppercase font-sans px-2 py-0.5 rounded border"
                  style={{
                    color: card.status === "ACTIVE" ? "hsl(var(--copper))" : "hsl(var(--muted-foreground))",
                    borderColor: card.status === "ACTIVE" ? "hsl(var(--copper) / 0.5)" : "hsl(var(--border))",
                    backgroundColor: card.status === "ACTIVE" ? "hsl(var(--copper) / 0.1)" : "transparent",
                  }}
                >
                  {card.status}
                </span>
              </div>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                style={{ backgroundColor: "hsl(var(--copper) / 0.12)" }}
              >
                <card.icon className="w-5 h-5" style={{ color: "hsl(var(--copper))" }} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-serif font-bold tracking-wide text-foreground mb-1">
                {card.title}
              </h3>
              <p className="text-[10px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-4 leading-relaxed">
                {card.subtitle}
              </p>

              {/* Price */}
              <div className="mb-4">
                <p className="text-2xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                  {card.price}
                  <span className="text-sm font-normal text-muted-foreground">{card.priceNote}</span>
                </p>
              </div>

              {/* Delivery */}
              {card.delivery && (
                <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-4">
                  {card.delivery}
                </p>
              )}

              {/* Features */}
              <div className="flex-1">
                <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-3">
                  INCLUDED:
                </p>
                <ul className="space-y-2 mb-4">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-foreground">
                      <feature.icon className="w-3.5 h-3.5" style={{ color: "hsl(var(--copper))" }} />
                      <span className="font-sans">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Output */}
              <div className="border-t border-border pt-4 mb-4">
                <p className="text-[8px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-1">
                  OUTPUT:
                </p>
                <p className="text-[10px] font-sans text-foreground leading-relaxed">
                  {card.output}
                </p>
              </div>

              <Button
                variant={card.highlighted ? "default" : "outline"}
                className={`w-full text-[10px] tracking-[0.15em] uppercase font-sans h-10 ${
                  card.highlighted
                    ? "bg-copper hover:bg-copper/90 text-background"
                    : "border-copper/50 text-foreground hover:bg-copper/10"
                }`}
                onClick={() => navigate("/systems-analysis-confirmation")}
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Continuity Allocation Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-2">
              PERFORMANCE ASSURANCE
            </p>
            <h3 className="text-2xl font-serif font-bold tracking-wide text-foreground mb-3">
              CONTINUITY ALLOCATION
            </h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
              Dedicated resource blocks assigned to each project architecture to prevent systemic dilution. 
              All cycles are tracked via Forge-Vault logging for audit transparency.
            </p>
            
            <div className="flex gap-4">
              <div className="border border-border rounded-lg p-4 flex-1">
                <p className="text-[8px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-1">
                  UPTIME SEAL
                </p>
                <p className="text-xl font-serif font-bold text-foreground">99.8%</p>
              </div>
              <div className="border border-border rounded-lg p-4 flex-1">
                <p className="text-[8px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-1">
                  RESPONSE LATENCY
                </p>
                <p className="text-xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                  &lt; 12.0 <span className="text-sm">HR</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-2">
              OPERATIONAL REMINDERS
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <div>
                  <p className="text-xs font-sans font-medium text-foreground mb-1">ANALYSIS SCOPE</p>
                  <p className="text-xs text-muted-foreground font-sans">
                    Architectural validation, pipeline review, and bottleneck identification only.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <div>
                  <p className="text-xs font-sans font-medium text-foreground mb-1">DATA SECURITY</p>
                  <p className="text-xs text-muted-foreground font-sans">
                    Encrypted transfer, delivery via ephemeral hosting protocols.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <div>
                  <p className="text-xs font-sans font-medium text-foreground mb-1">MODIFICATION RIGHTS</p>
                  <p className="text-xs text-muted-foreground font-sans">
                    Client final sign-off authority over suggested architectural shifts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Build Inquiry CTA */}
        <div className="border border-border rounded-lg p-8 md:p-12 bg-card/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-2">
                PROJECT TYPE: INFRASTRUCTURE
              </p>
              <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
                STUDIO
                <br />
                ARCHITECTURE
              </h3>
              <p
                className="text-2xl md:text-3xl font-serif italic tracking-wide"
                style={{ color: "hsl(var(--copper))" }}
              >
                // BUILD
              </p>
              <p className="text-sm text-muted-foreground font-sans mt-4 max-w-md">
                Direct engineering and structural implementation for teams not yet constrained by 
                active production systems, or requiring hands-on construction.
              </p>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans mt-3" style={{ color: "hsl(var(--copper))" }}>
                NOTE: ENGAGEMENT OPTIONS ARE SCALED FOR BOTH NEWLY FORMING TEAMS AND FORMALIZED PRODUCTION STUDIOS.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <Button
                className="bg-copper hover:bg-copper/90 text-background text-[10px] tracking-[0.15em] uppercase font-sans h-12 px-8"
                onClick={() => navigate("/under-construction")}
              >
                INITIALIZE BUILD INQUIRY
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                LEAD TIME: 48-72 HRS
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border flex justify-end">
            <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
              ACCESS: <span className="text-foreground">INDUSTRY_ONLY</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemsAnalysisHub;
