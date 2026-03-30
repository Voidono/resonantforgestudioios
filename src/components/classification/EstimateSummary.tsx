import { ArrowRight, CheckCircle } from "lucide-react";
import { memo } from "react";

const rateMap: Record<string, { rate: number; hours: number }> = {
  "1,1": { rate: 30, hours: 0.5 }, "1,2": { rate: 35, hours: 1 }, "1,3": { rate: 40, hours: 1.5 },
  "1,4": { rate: 50, hours: 2 }, "1,5": { rate: 60, hours: 3 },
  "2,1": { rate: 35, hours: 1 }, "2,2": { rate: 40, hours: 2 }, "2,3": { rate: 50, hours: 3 },
  "2,4": { rate: 60, hours: 5 }, "2,5": { rate: 75, hours: 8 },
  "3,1": { rate: 40, hours: 2 }, "3,2": { rate: 50, hours: 4 }, "3,3": { rate: 60, hours: 6 },
  "3,4": { rate: 75, hours: 10 }, "3,5": { rate: 90, hours: 16 },
  "4,1": { rate: 50, hours: 4 }, "4,2": { rate: 60, hours: 8 }, "4,3": { rate: 75, hours: 12 },
  "4,4": { rate: 90, hours: 20 }, "4,5": { rate: 110, hours: 32 },
  "5,1": { rate: 60, hours: 8 }, "5,2": { rate: 75, hours: 16 }, "5,3": { rate: 90, hours: 24 },
  "5,4": { rate: 110, hours: 40 }, "5,5": { rate: 130, hours: 60 },
};

interface EstimateSummaryProps {
  selected: { scope: number; complexity: number } | null;
  activeAsset: string;
  totalAssets: number;
  onConfirm: () => void;
}

const EstimateSummary = memo(({ selected, activeAsset, totalAssets, onConfirm }: EstimateSummaryProps) => {
  const currentRate = selected ? rateMap[`${selected.scope},${selected.complexity}`] : null;
  const projectedCost = currentRate ? currentRate.rate * currentRate.hours : 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-sm font-serif font-bold tracking-wider text-foreground">ESTIMATE</h2>
          <h2 className="text-sm font-serif font-bold tracking-wider text-foreground">SUMMARY</h2>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-sans text-muted-foreground mr-2">STAGE</span>
          <span className="text-[10px] font-sans font-bold text-primary">DETAILED</span>
          <br />
          <span className="text-[10px] font-sans text-muted-foreground mr-2">2</span>
          <span className="text-[10px] font-sans font-bold text-primary">INSTRUCTION</span>
        </div>
      </div>

      {/* Stats rows */}
      <div className="space-y-2 border-t border-border pt-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-sans text-muted-foreground tracking-wider">ACTIVE ASSET</span>
          <span className="text-xs font-sans font-bold text-foreground">{activeAsset}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-sans text-muted-foreground tracking-wider">SCOPE VALUE</span>
          <span className="text-xs font-sans font-bold text-primary">
            {selected ? `${selected.scope}.${selected.complexity}` : "—"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-sans text-muted-foreground tracking-wider">COMPLEXITY VALUE</span>
          <span className="text-xs font-sans font-bold text-primary">
            {selected ? `${selected.complexity}.${selected.scope}` : "—"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-sans text-muted-foreground tracking-wider">BASE RATE</span>
          <span className="text-xs font-sans font-bold text-foreground">
            {currentRate ? `$${currentRate.rate.toFixed(2)} / HR` : "—"}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 h-1.5">
        <div className="flex-1 rounded-full bg-primary" />
        <div className="w-1/3 rounded-full bg-muted" />
      </div>

      {/* Estimated Forge Hours */}
      <div className="border border-primary/40 rounded-lg p-5 text-center">
        <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-muted-foreground mb-1">
          ESTIMATED FORGE HOURS
        </p>
        <p className="text-4xl font-serif font-bold text-foreground">
          {currentRate ? currentRate.hours.toFixed(1) : "—"}
        </p>
        <p className="text-xs font-sans text-primary font-bold">HRS</p>
      </div>

      {/* Projected Cost */}
      <div className="border border-primary/40 rounded-lg p-5 text-center">
        <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-muted-foreground mb-1">
          PROJECTED COST
        </p>
        <p className="text-3xl font-serif font-bold text-foreground">
          {currentRate ? `$${projectedCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "—"}
        </p>
      </div>

      {/* Confirm button */}
      <button
        onClick={onConfirm}
        disabled={!selected}
        className="w-full py-4 rounded-lg text-sm tracking-[0.15em] uppercase font-sans font-bold flex items-center justify-center gap-3 transition-opacity disabled:opacity-40 bg-primary text-primary-foreground"
      >
        CONFIRM DATA
        <CheckCircle className="w-5 h-5" />
      </button>

      {/* Export */}
      <button className="w-full py-3 rounded-lg text-[10px] tracking-[0.15em] uppercase font-sans font-bold border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors">
        EXPORT REPORT
      </button>
    </div>
  );
});

EstimateSummary.displayName = "EstimateSummary";
export default EstimateSummary;
