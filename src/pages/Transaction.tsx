import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Check, ArrowRight, Briefcase, TrendingUp, Shield, Zap, FileText, Users } from "lucide-react";

const plans = [
  {
    name: "Observer",
    price: "Free",
    period: "",
    description: "Follow our journey and stay informed.",
    features: [
      "Public devlogs & updates",
      "Community forum access",
      "Monthly newsletter",
    ],
    cta: "Join Free",
    highlight: false,
  },
  {
    name: "Supporter",
    price: "$9",
    period: "/month",
    description: "Back the mission and get early access.",
    features: [
      "Everything in Observer",
      "Early access to prototypes",
      "Vote on design proposals",
      "Supporter-only Discord channels",
      "Name in credits",
    ],
    cta: "Subscribe",
    highlight: true,
  },
  {
    name: "Founding Member",
    price: "$25",
    period: "/month",
    description: "Shape the studio from the ground up.",
    features: [
      "Everything in Supporter",
      "Priority proposal submissions",
      "Monthly Q&A sessions",
      "Behind-the-scenes builds",
      "Founding member badge",
      "Direct feedback channel",
    ],
    cta: "Subscribe",
    highlight: false,
  },
];

const capabilities = [
  {
    icon: TrendingUp,
    title: "GROWTH PIPELINE",
    description: "Scalable revenue models designed for sustainable studio expansion and long-term viability.",
  },
  {
    icon: Shield,
    title: "TRANSPARENCY CORE",
    description: "Open financial reporting and decision logs. Every dollar traced, every choice documented.",
  },
  {
    icon: Zap,
    title: "RAPID DEPLOYMENT",
    description: "Streamlined production cycles from concept to delivery with industrial-grade tooling.",
  },
  {
    icon: FileText,
    title: "SMART CONTRACTS",
    description: "Clear, fair agreements for contributors, collaborators, and community stakeholders.",
  },
  {
    icon: Users,
    title: "PARTNER NETWORK",
    description: "Curated ecosystem of aligned studios, creators, and service providers.",
  },
  {
    icon: Briefcase,
    title: "ASSET MANAGEMENT",
    description: "Centralized resource allocation and project budgeting with real-time oversight.",
  },
];

const Transaction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-copper/50" />
            <p className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
              MODULE 01 // BUSINESS OPERATIONS
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-wide text-foreground mb-4">
            THE FORGE<br />
            <span style={{ color: "hsl(var(--copper))" }}>ECONOMY</span>
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed text-lg mb-8">
            Scalable strategic infrastructure built for transparent, community-backed game development. Fund the mission. Shape the output.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#plans"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium rounded transition-colors"
              style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
            >
              View Plans
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border border-border rounded text-muted-foreground hover:text-foreground hover:border-copper/40 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium" style={{ color: "hsl(var(--copper))" }}>
              OPERATIONAL CAPABILITIES
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group border border-border rounded-lg p-6 bg-card/40 hover:border-copper/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0 group-hover:bg-copper/10 transition-colors">
                    <cap.icon className="w-5 h-5 text-muted-foreground group-hover:text-copper transition-colors" style={{}} />
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-semibold tracking-[0.1em] text-foreground mb-1">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Plans */}
      <section id="plans" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-copper/50" />
              <p className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
                INVESTMENT TIERS
              </p>
              <div className="h-px w-10 bg-copper/50" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wide text-foreground mb-3">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Support ethical game development. Every tier funds our work and gives you a voice in how we build.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border p-8 flex flex-col transition-all ${
                  plan.highlight
                    ? "border-copper bg-copper/5 shadow-[0_0_30px_-10px_hsl(var(--copper)/0.3)]"
                    : "border-border bg-secondary/30"
                }`}
              >
                {/* Corner dots */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

                {plan.highlight && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-sans font-medium tracking-widest uppercase px-4 py-1 rounded-full"
                    style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
                  >
                    Recommended
                  </span>
                )}
                <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-serif font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  )}
                </div>
                <div className="h-0.5 w-8 mb-4" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--copper))" }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium transition-colors rounded ${
                    plan.highlight
                      ? "text-background hover:opacity-90"
                      : "border border-border text-foreground hover:bg-secondary"
                  }`}
                  style={plan.highlight ? { backgroundColor: "hsl(var(--copper))" } : {}}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom status */}
      <section className="px-6 pb-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] tracking-[0.2em] uppercase font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span style={{ color: "hsl(var(--copper))" }}>OP_STATUS: NOMINAL</span>
          </div>
          <div className="hidden md:block h-4 w-px bg-border" />
          <span className="text-muted-foreground">MODULE: BUSINESS // ACTIVE</span>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Transaction;
