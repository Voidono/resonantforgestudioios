import { memo } from "react";

const rowLabels = [
  { id: 5, code: "C5", title: "EXPERIMENTAL", desc: "NOVEL SIMULATION, CUTTING-EDGE CONSTRUCTION" },
  { id: 4, code: "C4", title: "ADVANCED", desc: "COMPLEX HERO ASSEMBLIES/RIGS" },
  { id: 3, code: "C3", title: "TECHNICAL", desc: "MID-END TEXTURED SPECIALIZED MATERIALS" },
  { id: 2, code: "C2", title: "STANDARD", desc: "ASSETS FEATURING MILD PROBLEM-SOLVING" },
  { id: 1, code: "C1", title: "ROUTINE", desc: "BASIC AUTONOMOUSLY REPRODUCIBLE CALL" },
];

const colLabels = [
  { id: 1, code: "S1", title: "COMPONENT", desc: "LOW TRIANGLE COUNT AND MINIMAL FOOTPRINT" },
  { id: 2, code: "S2", title: "ASSET", desc: "MODERATE TRIANGLE COUNT AND FOOTPRINT" },
  { id: 3, code: "S3", title: "SUB-SYSTEM", desc: "HIGH GEOMETRY WORKLOAD OR LARGE FOOTPRINT" },
  { id: 4, code: "S4", title: "MACRO ASSET", desc: "VERY HIGH TRIANGLE COUNT, MAJOR FOOTPRINT" },
  { id: 5, code: "S5", title: "ULTRA ASSET", desc: "EXTREME GEOMETRY, BROADSCALE ARCHITECTURE" },
];

interface ClassificationMatrixProps {
  selected: { scope: number; complexity: number } | null;
  onSelect: (scope: number, complexity: number) => void;
}

const ClassificationMatrix = memo(({ selected, onSelect }: ClassificationMatrixProps) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="text-center py-3 border-b border-border">
        <h2 className="text-xs tracking-[0.3em] uppercase font-sans font-bold text-muted-foreground">
          CLASSIFICATION MATRIX
        </h2>
      </div>

      {/* Grid area */}
      <div className="p-4">
        <div className="flex">
          {/* Row labels */}
          <div className="w-44 shrink-0 flex flex-col">
            {rowLabels.map((row) => {
              const isActive = selected?.complexity === row.id;
              return (
                <div
                  key={row.id}
                  className={`flex-1 border border-border p-2 flex flex-col justify-center transition-colors ${
                    isActive ? "border-primary/60 bg-primary/5" : ""
                  }`}
                >
                  <p className={`text-[10px] font-sans font-bold tracking-wider ${isActive ? "text-primary" : "text-foreground"}`}>
                    {row.title}
                  </p>
                  <p className="text-[7px] font-sans text-muted-foreground leading-tight mt-0.5">{row.desc}</p>
                  <span className="text-[9px] font-sans font-bold text-muted-foreground mt-1">{row.code}</span>
                </div>
              );
            })}
          </div>

          {/* 5x5 grid */}
          <div className="flex-1 grid grid-cols-5">
            {rowLabels.map((row) =>
              colLabels.map((col) => {
                const isSelected = selected?.scope === col.id && selected?.complexity === row.id;
                const isInRow = selected?.complexity === row.id;
                const isInCol = selected?.scope === col.id;
                return (
                  <button
                    key={`${col.id}-${row.id}`}
                    onClick={() => onSelect(col.id, row.id)}
                    className={`aspect-square border border-border relative transition-all ${
                      isSelected
                        ? "bg-primary/80 border-primary"
                        : isInRow && isInCol
                        ? "bg-primary/20"
                        : isInRow || isInCol
                        ? "bg-card/60"
                        : "bg-card/20 hover:bg-card/40"
                    }`}
                  >
                    {isSelected && (
                      <span className="text-xs font-sans font-bold text-primary-foreground">
                        {col.id}.{row.id}
                      </span>
                    )}
                    {/* Dot markers for visual interest */}
                    {!isSelected && ((col.id + row.id) % 3 === 0) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 absolute" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Scope axis labels */}
        <div className="flex mt-0">
          <div className="w-44 shrink-0">
            <div className="text-[8px] font-sans text-muted-foreground p-2">
              S.S.F / C.E.A
            </div>
          </div>
          <div className="flex-1 grid grid-cols-5">
            {colLabels.map((col) => {
              const isActive = selected?.scope === col.id;
              return (
                <div
                  key={col.id}
                  className={`border border-border p-2 text-center transition-colors ${
                    isActive ? "border-primary/60 bg-primary/5" : ""
                  }`}
                >
                  <span className={`text-[9px] font-sans font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {col.code}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column descriptions */}
        <div className="flex mt-0">
          <div className="w-44 shrink-0" />
          <div className="flex-1 grid grid-cols-5">
            {colLabels.map((col) => {
              const isActive = selected?.scope === col.id;
              return (
                <div
                  key={col.id}
                  className={`border border-border p-2 transition-colors ${
                    isActive ? "border-primary/60 bg-primary/5" : ""
                  }`}
                >
                  <p className={`text-[10px] font-sans font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
                    {col.title}
                  </p>
                  <p className="text-[7px] font-sans text-muted-foreground leading-tight mt-0.5">{col.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

ClassificationMatrix.displayName = "ClassificationMatrix";
export default ClassificationMatrix;
