import { useNavigate } from "react-router-dom";
import { PlusSquare, FolderOpen, AtSign } from "lucide-react";

const assets = [
  {
    id: "RF-992-B",
    name: "INDUSTRIAL CHASSIS",
    sub: "LOD-0 VERIFICATION REQUIRED",
    category: "ENVIRONMENT",
    phase: "DOCUMENTATION AUDIT",
    progress: 25,
    status: "ACTIVE",
  },
  {
    id: "RF-841-A",
    name: "TURBINE ASSEMBLY",
    sub: "MECHANICAL RIGGING SPEC V4",
    category: "PROP_HI_COMPLEXITY",
    phase: "RETOPOLOGY",
    progress: 55,
    status: "ACTIVE",
  },
  {
    id: "RF-772-K",
    name: "MODULAR CATWALK SET",
    sub: "PBR MATERIAL CALIBRATION",
    category: "ARCHITECTURE",
    phase: "TEXTURING",
    progress: 70,
    status: "ACTIVE",
  },
  {
    id: "RF-102-C",
    name: "CARGO CONTAINER V3",
    sub: "MESH GEOMETRY FINALIZED",
    category: "PROP_BASIC",
    phase: "FINAL QA RECON",
    progress: 90,
    status: "ACTIVE",
  },
];

const OperationsHub = () => {
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
              <FolderOpen className="w-4 h-4" style={{ color: "hsl(var(--background))" }} />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground">RESONANT FORGE</h2>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                INDUSTRIAL ASSET SYSTEMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { icon: PlusSquare, label: "INTAKE", active: false, path: "/asset-intake" },
              { icon: FolderOpen, label: "ASSETS", active: true, path: "/operations-hub" },
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
                  style={{
                    color: item.active ? "hsl(var(--copper))" : undefined,
                    borderBottom: item.active ? "2px solid hsl(var(--copper))" : "none",
                    paddingBottom: "2px",
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="flex-1 px-4 md:px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-muted-foreground mb-1">
            PRODUCTION QUEUE // ACTIVE PIPELINE
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              OPERATIONS HUB
            </h1>
            <div className="flex items-center gap-6">
              {[
                { label: "TOTAL ASSETS", value: `0${assets.length}` },
                { label: "AVG RESPONSE", value: "3.2 DAYS" },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-border pl-4">
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-serif font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
              <div className="border-l border-border pl-4">
                <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">SYSTEM STATUS</p>
                <p className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                  STABLE <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-[9px] tracking-[0.15em] uppercase font-sans font-bold text-muted-foreground border-b border-border">
          <span className="col-span-1">ASSET_ID</span>
          <span className="col-span-3">ASSET_NAME</span>
          <span className="col-span-2">CATEGORY</span>
          <span className="col-span-3">CURRENT_PHASE</span>
          <span className="col-span-1">STATUS</span>
          <span className="col-span-2 text-right">ACTIONS</span>
        </div>

        {/* Asset Rows */}
        <div className="space-y-3 mt-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="grid grid-cols-12 gap-4 items-center px-4 py-5 border border-border rounded-lg bg-card/30"
              style={{ borderLeftColor: "hsl(var(--copper))", borderLeftWidth: "3px" }}
            >
              <div className="col-span-1">
                <span className="text-sm font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                  {asset.id}
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-sm font-serif font-bold text-foreground">{asset.name}</p>
                <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">{asset.sub}</p>
              </div>
              <div className="col-span-2">
                <span className="text-[9px] tracking-[0.1em] uppercase font-sans font-medium text-muted-foreground border border-border rounded px-2 py-1">
                  {asset.category}
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-xs font-sans font-bold text-foreground tracking-wider mb-1">{asset.phase}</p>
                <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${asset.progress}%`,
                      backgroundColor: "hsl(var(--copper))",
                    }}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <span className="flex items-center gap-1.5 text-[9px] tracking-[0.1em] uppercase font-sans font-bold" style={{ color: "hsl(var(--copper))" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                  {asset.status}
                </span>
                <p className="text-[8px] tracking-[0.1em] uppercase font-sans text-muted-foreground">PROCESSING...</p>
              </div>
              <div className="col-span-2 text-right">
                <button className="text-[9px] tracking-[0.15em] uppercase font-sans font-bold border border-border rounded px-3 py-2 text-muted-foreground hover:text-foreground hover:border-copper/40 transition-colors">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Protocol */}
        <div className="mt-16">
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
      </section>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
              FORGE_CORE_CONSOLE V.2.4.0
            </span>
          </div>
          <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            © 2024 RESONANT FORGE STUDIOS // ASSET LOGISTICS DIVISION // SECURE LINK ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};

export default OperationsHub;
