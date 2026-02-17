import Footer from "@/components/Footer";

const principles = [
  {
    title: "Voluntary Support Only",
    body: "Participation is never coerced. We do not employ psychological traps to maintain retention. Subscriptions are initiated by conscious choice and can be terminated instantly. We prioritize the freedom to leave over the metrics of staying.",
  },
  {
    title: "Transparency Over Optimization",
    body: "Algorithms here serve the user, not the engagement metrics. We do not hide information to optimize for time spent. All studio logic is designed to be legible and auditable. Clarity is our primary product.",
  },
  {
    title: "Privacy as a Constraint",
    body: "Data handling is treated as a physical constraint. We collect the absolute minimum required for operation. Your digital footprint is your property; we are temporary stewards of the data you explicitly share.",
  },
  {
    title: "Resonant Value Exchange",
    body: "Value is measured by the depth of resonance, not the volume of consumption. We reject the attention economy model. Our goal is to provide tools that offer lasting utility, respecting the finite nature of your focus.",
  },
  {
    title: "Human-Centric Agency",
    body: "The platform is a tool for human agency, not a surrogate for it. We design features that empower participants to make informed decisions rather than automating away their critical thinking.",
  },
];

const Principles = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <p className="section-label mb-4">Structural Contract V1.0.4</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6 leading-tight">
          Studio Principles<br />
          <span className="italic">&amp; Constraints</span>
        </h1>
        <p className="font-serif italic text-muted-foreground leading-relaxed">
          This document defines the immutable constraints governing Resonant Forge Studios. These
          are the architectural foundations upon which our trust is forged.
        </p>
      </section>

      {/* Principles */}
      <section className="px-6 max-w-2xl mx-auto pb-16">
        {principles.map((p, i) => (
          <div key={i} className="py-10 border-t border-border">
            <span className="principle-number block mb-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="principle-title mb-4">{p.title}</h2>
            <p className="text-foreground/75 leading-relaxed text-sm">{p.body}</p>
          </div>
        ))}
      </section>

      {/* Accept */}
      <section className="px-6 max-w-2xl mx-auto pb-20">
        <div className="border border-border rounded-md p-8 text-center">
          <p className="font-serif italic text-muted-foreground text-sm mb-6">
            By proceeding, you acknowledge these structural constraints. They form the basis of
            our mutual trust.
          </p>
          <button className="w-full max-w-xs mx-auto block bg-primary text-primary-foreground px-8 py-3 text-sm tracking-[0.2em] uppercase font-medium hover:bg-primary/90 transition-colors">
            Accept Principles
          </button>
        </div>
        <p className="text-center mt-6 text-xs text-copper tracking-[0.15em] uppercase cursor-pointer hover:underline">
          Digital Archival Copy (PDF)
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Principles;
