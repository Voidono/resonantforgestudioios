import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Search, Upload, PlusSquare, FolderOpen, AtSign, ChevronUp, Lock, Copy } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import studioLogo from "@/assets/studio-logo.png";

const categories = ["ENVIRONMENT", "CHARACTER", "CREATURE", "MISC"];
const pipelineStages = ["BLOCKOUT", "HIGH POLY", "RETOPO / UV", "TEXTURING"];

type AssetSize = "S" | "M" | "L" | "G";

interface AssetData {
  id: string;
  size: AssetSize;
  workedBefore: boolean | null;
  studioCode: string;
  requestedArtist: string;
  projectDescriptor: string;
  selectedCategory: string | null;
  projectDescription: string;
  referenceSearch: boolean;
  rigging: boolean;
  animation: boolean;
  vfx: boolean;
  fullProduction: boolean;
  stageToggles: Record<string, boolean>;
  iterations: number[];
}

const createDefaultAsset = (id: string, size: AssetSize): AssetData => ({
  id,
  size,
  workedBefore: null,
  studioCode: "",
  requestedArtist: "",
  projectDescriptor: "",
  selectedCategory: null,
  projectDescription: "",
  referenceSearch: true,
  rigging: false,
  animation: false,
  vfx: false,
  fullProduction: false,
  stageToggles: {},
  iterations: [0],
});

const sizeLabels: Record<AssetSize, string> = { S: "SMALL", M: "MEDIUM", L: "LARGE", G: "GAME-READY" };

const AssetIntake = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assets, setAssets] = useState<AssetData[]>([createDefaultAsset("01", "S")]);
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);

  const asset = assets[activeAssetIndex];

  const updateAsset = (updates: Partial<AssetData>) => {
    setAssets(prev => prev.map((a, i) => i === activeAssetIndex ? { ...a, ...updates } : a));
  };

  const addAsset = (size: AssetSize) => {
    const newId = String(assets.length + 1).padStart(2, "0");
    setAssets(prev => [...prev, createDefaultAsset(newId, size)]);
    setActiveAssetIndex(assets.length);
  };

  const duplicateAsset = (targetIndex: number) => {
    const source = assets[activeAssetIndex];
    const newId = String(assets.length + 1).padStart(2, "0");
    setAssets(prev => [...prev, { ...source, id: newId }]);
    setActiveAssetIndex(assets.length);
  };

  const removeAsset = (index: number) => {
    if (assets.length <= 1) return;
    setAssets(prev => prev.filter((_, i) => i !== index));
    setActiveAssetIndex(prev => Math.min(prev, assets.length - 2));
  };

  const handleFinalize = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate("/asset-final-review");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border mt-[72px] md:mt-[88px]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-medium">BACK</span>
          </button>
          <div className="flex items-center gap-6">
            {["BUSINESS", "COMMUNITY", "DEVELOPERS"].map((label, i) => (
              <span key={label} className={`text-[10px] tracking-[0.1em] uppercase font-sans font-medium ${i === 0 ? "text-copper" : "text-muted-foreground"}`}>
                {label}
              </span>
            ))}
          </div>
          <button onClick={() => navigate(user ? "/dashboard" : "/auth")} className="border border-copper text-copper text-[10px] tracking-[0.1em] uppercase font-sans font-bold px-4 py-1.5 rounded hover:bg-copper/10 transition-colors">
            STUDIO LOGIN
          </button>
        </div>
      </div>

      {/* Sub-header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={studioLogo} alt="Resonant Forge" className="h-10 w-auto" />
            <div>
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground">RESONANT FORGE</h2>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">ASSET INTAKE SYSTEM</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { icon: PlusSquare, label: "INTAKE", active: true, path: "/asset-intake" },
              { icon: FolderOpen, label: "ASSETS", active: false, path: "/operations-hub" },
              { icon: AtSign, label: "CONTACT", active: false, path: "/contact-terminal" },
            ].map((item) => (
              <button key={item.label} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1">
                <item.icon className={`w-4 h-4 ${item.active ? "text-copper" : "text-muted-foreground"}`} />
                <span className={`text-[9px] tracking-[0.1em] uppercase font-sans font-medium ${item.active ? "text-copper border-b-2 border-copper pb-0.5" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <span className="text-[10px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            STAGE 2 <span className="font-bold text-foreground">DETAILED INSTRUCTION</span>
          </span>
        </div>
      </div>

      {/* Asset Selector Bar */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4 flex-wrap">
          <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground">SELECT ASSET:</span>
          <div className="flex items-center gap-2">
            {assets.map((a, i) => (
              <button
                key={i}
                onClick={() => setActiveAssetIndex(i)}
                className={`px-3 py-1.5 rounded text-[11px] tracking-[0.05em] font-sans font-bold transition-colors border ${
                  i === activeAssetIndex
                    ? "border-copper bg-copper/20 text-copper"
                    : "border-border text-muted-foreground hover:border-copper/40"
                }`}
              >
                {a.id}-{a.size}
              </button>
            ))}
            <button
              onClick={() => addAsset("S")}
              className="px-2 py-1.5 rounded border border-dashed border-border text-muted-foreground hover:border-copper/40 hover:text-copper transition-colors text-[11px] font-sans"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <div className="h-5 w-px bg-copper/60" />
            <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">
              SIZE: {sizeLabels[asset.size]}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => duplicateAsset(activeAssetIndex)}
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-border text-[10px] tracking-[0.1em] uppercase font-sans font-medium text-muted-foreground hover:border-copper/40 hover:text-foreground transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              DUPLICATE TO...
            </button>
            {assets.length > 1 && (
              <button
                onClick={() => removeAsset(activeAssetIndex)}
                className="px-2 py-1.5 rounded border border-border text-[10px] tracking-[0.1em] uppercase font-sans font-medium text-destructive hover:border-destructive/40 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="flex-1 px-4 md:px-8 py-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Client Authentication */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm bg-copper" />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">CLIENT AUTHENTICATION</span>
              </div>
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">HAVE YOU WORKED WITH US BEFORE?</p>
                  <div className="flex gap-4">
                    {[true, false].map(val => (
                      <button key={String(val)} onClick={() => updateAsset({ workedBefore: val })} className={`flex items-center gap-2 text-xs font-sans font-medium ${asset.workedBefore === val ? "text-foreground" : "text-muted-foreground"}`}>
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${asset.workedBefore === val ? "border-copper bg-copper" : "border-border"}`}>
                          {asset.workedBefore === val && <span className="text-[8px] text-background">✓</span>}
                        </div>
                        {val ? "YES" : "NO"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">STUDIO NAME SEARCH</p>
                  <div className="relative">
                    <input type="text" value={asset.studioCode} onChange={(e) => updateAsset({ studioCode: e.target.value })} placeholder="Enter Studio Identification Code..." className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold mb-2 text-copper">REQUESTED ARTIST(S) [OPTIONAL]</p>
                  <input type="text" value={asset.requestedArtist} onChange={(e) => updateAsset({ requestedArtist: e.target.value })} placeholder="Enter specific personnel requested for this engagement..." className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50" />
                </div>
              </div>
            </div>

            {/* Project Identity */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm bg-copper" />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">PROJECT IDENTITY</span>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">PROJECT DESCRIPTOR</p>
                  <input type="text" value={asset.projectDescriptor} onChange={(e) => updateAsset({ projectDescriptor: e.target.value })} placeholder="Enter Asset Identification..." className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">ASSET CATEGORY SELECTION</p>
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => updateAsset({ selectedCategory: cat === asset.selectedCategory ? null : cat })} className={`py-2.5 rounded border text-[10px] tracking-[0.1em] uppercase font-sans font-medium transition-colors ${asset.selectedCategory === cat ? "border-copper/60 text-foreground bg-copper/10" : "border-border text-muted-foreground hover:border-copper/30"}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pipeline Stages */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm bg-copper" />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">PIPELINE STAGES</span>
              </div>
              <div className="border border-border rounded-lg bg-card/40 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">FULL ASSET PRODUCTION</h3>
                    <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">END-TO-END ASSET WORKFLOW ENGAGEMENT</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={asset.fullProduction} onCheckedChange={(v) => updateAsset({ fullProduction: v })} />
                    <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-0">
                  {pipelineStages.map((stage) => (
                    <div key={stage} className="flex items-center justify-between py-3 border-t border-border">
                      <span className="text-xs font-sans font-medium text-muted-foreground">{stage}</span>
                      <Switch
                        checked={asset.fullProduction || asset.stageToggles[stage] || false}
                        onCheckedChange={(v) => updateAsset({ stageToggles: { ...asset.stageToggles, [stage]: v } })}
                        disabled={asset.fullProduction}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Pre-Production */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm bg-copper" />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">PRE-PRODUCTION</span>
              </div>
              <div className="border border-border rounded-lg bg-card/40 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">REFERENCE CREATION / SEARCH</h3>
                    <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">MOODBOARDING AND VISUAL LIBRARY DEVELOPMENT</p>
                  </div>
                  <Switch checked={asset.referenceSearch} onCheckedChange={(v) => updateAsset({ referenceSearch: v })} />
                </div>
              </div>
            </div>

            {/* Extended Production */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm bg-copper" />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">EXTENDED PRODUCTION</span>
              </div>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-4">ADDITIONAL MODULE CONFIGURATION</p>
              <div className="space-y-3">
                {([
                  { label: "RIGGING", desc: "COMPLEX SKELETAL SYSTEMS", key: "rigging" as const },
                  { label: "ANIMATION", desc: "MOVEMENT & CYCLES", key: "animation" as const },
                  { label: "VFX", desc: "SHADERS & PARTICLES", key: "vfx" as const },
                ] as const).map((mod) => (
                  <div key={mod.label} className="border border-border rounded-lg bg-card/40 p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">{mod.label}</h3>
                      <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">{mod.desc}</p>
                    </div>
                    <Switch checked={asset[mod.key]} onCheckedChange={(v) => updateAsset({ [mod.key]: v })} />
                  </div>
                ))}
              </div>
            </div>

            {/* Iteration Allocation */}
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">ITERATION ALLOCATION</h3>
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">REFINEMENT CYCLES PER STAGE</p>
                </div>
                <span className="text-xl font-serif font-bold text-foreground">{String(asset.iterations[0]).padStart(2, "0")} UNITS</span>
              </div>
              <Slider value={asset.iterations} onValueChange={(v) => updateAsset({ iterations: v })} max={3} min={0} step={1} className="w-full" />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-muted-foreground font-sans">MIN_01</span>
                <span className="text-[9px] text-muted-foreground font-sans">MAX_03</span>
              </div>
            </div>

            {/* Estimation */}
            <div className="border border-border rounded-lg bg-card/40 p-5 text-center">
              <p className="text-[10px] tracking-[0.1em] uppercase font-sans italic text-muted-foreground mb-5">
                "INTAKE REQUEST INITIALIZED. ESTIMATES PROVIDED ARE SUBJECT TO STUDIO LEAD FEASIBILITY REVIEW."
              </p>
              <div className="flex items-end justify-center gap-6 mb-2">
                <div>
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-1">ESTIMATED RANGE</p>
                  <p className="text-3xl font-serif font-bold text-copper">$0 - $0</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-1">TARGET TIMELINE</p>
                  <p className="text-2xl font-serif font-bold text-foreground">0 Days</p>
                </div>
              </div>
            </div>

            {/* Finalize */}
            <button onClick={handleFinalize} className="w-full py-5 rounded-lg text-sm md:text-base tracking-[0.15em] uppercase font-sans font-bold flex items-center justify-center gap-3 transition-opacity hover:opacity-90 bg-copper text-background">
              FINALIZE DETAILS
              <ArrowRight className="w-5 h-5" />
            </button>

            {!user && (
              <div className="flex items-start gap-2 px-1">
                <Lock className="w-3 h-3 shrink-0 mt-0.5 text-copper" />
                <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-medium text-muted-foreground leading-relaxed">
                  AUTHENTICATION REQUIRED. STUDIO LOGIN IS MANDATORY FOR SUBMISSION.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Status Footer */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">RESONANT FORGE STUDIO PORTAL // SYSTEM V2.4.0_STABLE</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">PING: 24MS</span>
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper">● SECURE HANDSHAKE ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetIntake;
