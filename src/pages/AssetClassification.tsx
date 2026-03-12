import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Lock, Plus, Minus } from "lucide-react";
import { useState } from "react";

const scopeDefinitions = [
  { tier: "T1", title: "SINGLE COMPONENT", desc: "(Single small prop/element)" },
  { tier: "T2", title: "INTEGRATED ASSET", desc: "(Complete meaningful asset)" },
  { tier: "T3", title: "SUB-SYSTEM", desc: "(Large asset or small batch)" },
  { tier: "T4", title: "MACRO UNIT", desc: "(Multi-asset set/kit)" },
  { tier: "T5", title: "OMNI ENVIRONMENT", desc: "(Production run/large batch)" },
];

const complexityDefinitions = [
  { tier: "T1", title: "ROUTINE", desc: "(Routine/Well-understood task)" },
  { tier: "T2", title: "STANDARD", desc: "(Mild problem-solving required)" },
  { tier: "T3", title: "TECHNICAL", desc: "(Moderate technical/aesthetic challenge)" },
  { tier: "T4", title: "ADVANCED", desc: "(Advanced/specialist fidelity)" },
  { tier: "T5", title: "EXPERIMENTAL", desc: "(Critical/high-risk novel systems)" },
];

const rateMap: Record<string, { rate: number; hours: number }> = {
  "1,1": { rate: 30, hours: 0.5 },
  "1,2": { rate: 35, hours: 1 },
  "1,3": { rate: 40, hours: 1.5 },
  "1,4": { rate: 50, hours: 2 },
  "1,5": { rate: 60, hours: 3 },
  "2,1": { rate: 35, hours: 1 },
  "2,2": { rate: 40, hours: 2 },
  "2,3": { rate: 50, hours: 3 },
  "2,4": { rate: 60, hours: 5 },
  "2,5": { rate: 75, hours: 8 },
  "3,1": { rate: 40, hours: 2 },
  "3,2": { rate: 50, hours: 4 },
  "3,3": { rate: 60, hours: 6 },
  "3,4": { rate: 75, hours: 10 },
  "3,5": { rate: 90, hours: 16 },
  "4,1": { rate: 50, hours: 4 },
  "4,2": { rate: 60, hours: 8 },
  "4,3": { rate: 75, hours: 12 },
  "4,4": { rate: 90, hours: 20 },
  "4,5": { rate: 110, hours: 32 },
  "5,1": { rate: 60, hours: 8 },
  "5,2": { rate: 75, hours: 16 },
  "5,3": { rate: 90, hours: 24 },
  "5,4": { rate: 110, hours: 40 },
  "5,5": { rate: 130, hours: 60 },
};

type SizeKey = "small" | "medium" | "large";

const AssetClassification = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<{ scope: number; complexity: number } | null>(null);
  const [quantities, setQuantities] = useState<Record<SizeKey, number>>({
    small: 2,
    medium: 3,
    large: 1,
  });
  const [assetNames, setAssetNames] = useState<Record<SizeKey, string[]>>({
    small: ["ASSET_NAME_01", "ASSET_NAME_02"],
    medium: ["ASSET_NAME_01", "ASSET_NAME_02"],
    large: ["ASSET_NAME_01"],
  });

  const currentRate = selected ? rateMap[`${selected.scope},${selected.complexity}`] : null;

  const updateQuantity = (size: SizeKey, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [size]: Math.max(0, Math.min(99, prev[size] + delta)),
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mt-[72px]" />

      {/* Sub-nav */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-8 py-3">
          <span
            className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold border-b-2 pb-1"
            style={{ color: "hsl(var(--copper))", borderColor: "hsl(var(--copper))" }}
          >
            CORE MATRIX MAPPING
          </span>
          <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium text-muted-foreground">
            PHASE 01: ANALYSIS
          </span>
        </div>
      </div>

      <section className="flex-1 px-4 md:px-8 py-10 max-w-7xl mx-auto w-full">
        {/* Title */}
        <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground mb-1">
          RESONANT FORGE STUDIOS
        </p>
        <h1 className="text-2xl md:text-4xl font-serif font-bold italic tracking-wide text-foreground mb-10">
          INTAKE: ASSET CLASSIFICATION HUB
        </h1>

        {/* Top row: Quantity | Scope Defs | Complexity Defs | Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          {/* Asset Quantity by Size */}
          <div className="lg:col-span-3">
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground mb-5">
                ASSET QUANTITY BY SIZE
              </h2>
              <div className="space-y-4">
                {(["small", "medium", "large"] as SizeKey[]).map((size) => (
                  <div key={size} className="flex items-center justify-between border border-border rounded p-3">
                    <div>
                      <p className="text-xs font-sans font-bold text-foreground uppercase">{size}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wide">
                        {size === "small" ? "SINGLE PROP" : size === "medium" ? "INTEGRATED" : "SUB-SYSTEM"}
                      </p>
                    </div>
                    <div className="flex items-center gap-0">
                      <button
                        onClick={() => updateQuantity(size, -1)}
                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary/50 transition-colors rounded-l"
                      >
                        <Minus className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <div
                        className="w-10 h-8 border-y border-border flex items-center justify-center text-sm font-sans font-bold"
                        style={{ color: "hsl(var(--copper))" }}
                      >
                        {String(quantities[size]).padStart(2, "0")}
                      </div>
                      <button
                        onClick={() => updateQuantity(size, 1)}
                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary/50 transition-colors rounded-r"
                      >
                        <Plus className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scope Definitions */}
          <div className="lg:col-span-3">
            <div className="border border-border rounded-lg bg-card/40 p-5 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--copper))" }}
                >
                  <span className="text-[8px] font-bold" style={{ color: "hsl(var(--background))" }}>■</span>
                </div>
                <h2 className="text-sm font-serif font-bold tracking-wider" style={{ color: "hsl(var(--copper))" }}>
                  SCOPE DEFINITIONS
                </h2>
              </div>
              <div className="space-y-3">
                {scopeDefinitions.map((s) => (
                  <div key={s.tier} className="flex gap-2">
                    <span className="text-xs font-sans font-bold shrink-0" style={{ color: "hsl(var(--copper))" }}>
                      {s.tier}
                    </span>
                    <p className="text-xs font-sans text-foreground">
                      <span className="font-bold">{s.title}</span>{" "}
                      <span className="text-muted-foreground">{s.desc}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complexity Definitions */}
          <div className="lg:col-span-3">
            <div className="border border-border rounded-lg bg-card/40 p-5 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--copper))" }}
                >
                  <span className="text-[8px] font-bold" style={{ color: "hsl(var(--background))" }}>⚙</span>
                </div>
                <h2 className="text-sm font-serif font-bold tracking-wider" style={{ color: "hsl(var(--copper))" }}>
                  COMPLEXITY DEFINITIONS
                </h2>
              </div>
              <div className="space-y-3">
                {complexityDefinitions.map((c) => (
                  <div key={c.tier} className="flex gap-2">
                    <span className="text-xs font-sans font-bold shrink-0" style={{ color: "hsl(var(--copper))" }}>
                      {c.tier}
                    </span>
                    <p className="text-xs font-sans text-foreground">
                      <span className="font-bold">{c.title}</span>{" "}
                      <span className="text-muted-foreground">{c.desc}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reference Image */}
          <div className="lg:col-span-3">
            <div className="border border-border rounded-lg overflow-hidden h-full flex flex-col">
              <div
                className="px-3 py-1.5 text-[9px] tracking-[0.1em] uppercase font-sans font-bold"
                style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
              >
                REFERENCE EXAMPLE: FIDELITY {selected ? `${selected.scope}.${selected.complexity}` : "—"}
              </div>
              <div className="flex-1 aspect-[4/3] bg-card/60 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-2 rounded border border-border flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                      {selected ? `${selected.scope}.${selected.complexity}` : "?"}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans">REFERENCE PREVIEW</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Asset Registry | Grid | Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Asset Registry */}
          <div className="lg:col-span-3">
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground mb-4">
                ASSET REGISTRY
              </h2>

              {(["small", "medium", "large"] as SizeKey[]).map((size) => (
                <div key={size} className="mb-4">
                  <p
                    className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold mb-2"
                    style={{ color: "hsl(var(--copper))" }}
                  >
                    {size} ASSETS
                  </p>
                  <div className="space-y-2">
                    {assetNames[size].map((name, i) => (
                      <div key={i} className="border border-border rounded px-3 py-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            const updated = [...assetNames[size]];
                            updated[i] = e.target.value;
                            setAssetNames((prev) => ({ ...prev, [size]: updated }));
                          }}
                          className="w-full bg-transparent text-xs font-sans text-muted-foreground outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="lg:col-span-6">
            {/* 5x5 Grid */}
            <div className="relative">
              {/* Y-axis label */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90">
                <span className="text-[9px] tracking-[0.2em] uppercase font-sans font-medium text-muted-foreground">
                  COMPLEXITY
                </span>
              </div>

              <div className="ml-8">
                <div className="grid grid-rows-5 gap-0">
                  {[5, 4, 3, 2, 1].map((row) => (
                    <div key={row} className="flex items-center">
                      <span
                        className="w-6 text-xs font-sans font-bold text-right mr-2"
                        style={{ color: row === (selected?.complexity ?? 0) ? "hsl(var(--copper))" : undefined }}
                      >
                        {row}
                      </span>
                      <div className="flex-1 grid grid-cols-5 gap-0">
                        {[1, 2, 3, 4, 5].map((col) => {
                          const isSelected = selected?.scope === col && selected?.complexity === row;
                          return (
                            <button
                              key={col}
                              onClick={() => setSelected({ scope: col, complexity: row })}
                              className={`aspect-square border border-border transition-all hover:border-copper/50 relative flex items-center justify-center ${
                                isSelected ? "bg-copper/90" : "bg-card/20 hover:bg-card/40"
                              }`}
                            >
                              {isSelected && (
                                <span className="text-sm font-sans font-bold text-background">
                                  {col}.{row}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* X-axis numbers */}
                <div className="flex ml-8">
                  {[1, 2, 3, 4, 5].map((col) => (
                    <div key={col} className="flex-1 text-center">
                      <span
                        className="text-xs font-sans font-bold"
                        style={{ color: col === (selected?.scope ?? 0) ? "hsl(var(--copper))" : undefined }}
                      >
                        {col}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-[9px] tracking-[0.2em] uppercase font-sans font-medium text-muted-foreground mt-1 ml-8">
                  SCOPE
                </p>
              </div>
            </div>

            <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-medium text-muted-foreground leading-relaxed text-center mt-6">
              SELECT A GRID COORDINATE TO DEFINE THE EXPECTED PRODUCTION SCOPE AND TECHNICAL COMPLEXITY FOR YOUR ASSET.
            </p>
          </div>

          {/* Right - Pricing */}
          <div className="lg:col-span-3 space-y-5">
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <h3 className="text-sm font-serif font-bold tracking-wider text-foreground mb-1">
                ASSET: {selected ? "INDUSTRIAL CHASSIS" : "AWAITING SELECTION"}
              </h3>
              {selected && (
                <>
                  <p className="text-[10px] font-sans mb-4" style={{ color: "hsl(var(--copper))" }}>
                    ● FIDELITY LEVEL {selected.scope}.{selected.complexity} VERIFIED
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="border border-border rounded p-3 text-center">
                      <p className="text-lg font-serif font-bold text-foreground">
                        ${currentRate?.rate}/HR
                      </p>
                      <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                        BASE RATE
                      </p>
                    </div>
                    <div className="border border-border rounded p-3 text-center">
                      <p className="text-lg font-serif font-bold text-foreground">
                        {currentRate?.hours}H
                      </p>
                      <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                        EST. BUILD
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed mb-5" style={{ color: "hsl(var(--copper))" }}>
                    This is a directive estimation used to generate a more accurate scope and cost breakdown based on your project requirements. Final pricing is verified post-submission.
                  </p>
                </>
              )}

              {!selected && (
                <p className="text-[10px] text-muted-foreground leading-relaxed my-4">
                  Select a coordinate on the grid to view pricing and estimation data.
                </p>
              )}

              <button
                onClick={() => selected && navigate("/asset-intake")}
                disabled={!selected}
                className="w-full py-4 rounded-lg text-sm tracking-[0.15em] uppercase font-sans font-bold flex items-center justify-center gap-3 transition-opacity disabled:opacity-40"
                style={{
                  backgroundColor: "hsl(var(--copper))",
                  color: "hsl(var(--background))",
                }}
              >
                CONFIRM
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Auth notice */}
            <div className="flex items-start gap-2 px-3">
              <Lock className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "hsl(var(--copper))" }} />
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-medium text-muted-foreground leading-relaxed">
                NOTICE: AUTHENTICATION REQUIRED. STUDIO LOGIN IS MANDATORY FOR ALL SUBSEQUENT STAGES BEYOND THIS INTERFACE.
              </p>
            </div>
          </div>
        </div>

        {/* Selected coordinates */}
        {selected && (
          <div className="mt-8 text-right">
            <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium text-muted-foreground">
              ● SELECTED COORDINATES:{" "}
              <span style={{ color: "hsl(var(--copper))" }}>
                ({selected.scope}, {selected.complexity})
              </span>
            </span>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default AssetClassification;
