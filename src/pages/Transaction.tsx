import { useNavigate } from "react-router-dom";
import GearLogo from "@/components/GearLogo";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

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

const Transaction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <GearLogo className="w-10 h-10 mx-auto mb-6 text-copper" />
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide text-foreground mb-4">
          Choose Your Path
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Support ethical game development. Every tier funds our work and gives you
          a voice in how we build.
        </p>
      </section>

      {/* Plans */}
      <section className="pb-24 px-6 max-w-5xl mx-auto">
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
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-copper text-background text-xs font-medium tracking-widest uppercase px-4 py-1 rounded-full">
                  Recommended
                </span>
              )}
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
                {plan.name}
              </h2>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-serif font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="w-4 h-4 mt-0.5 text-copper shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 text-sm tracking-[0.15em] uppercase transition-colors rounded ${
                  plan.highlight
                    ? "bg-copper text-background hover:bg-copper/90"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Transaction;
