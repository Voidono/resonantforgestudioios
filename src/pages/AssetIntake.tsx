import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Search, Upload, PlusSquare, FolderOpen, AtSign, ChevronUp, Lock, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import studioLogo from "@/assets/studio-logo.png";

const categories = ["ENVIRONMENT", "CHARACTER", "CREATURE", "MISC"];

type RequirementType = "HIGH_POLY" | "RUB" | "TEXTURE" | "FULL" | "UNSURE" | "QUOTE";

const requirementOptions: { key: RequirementType; label: string; desc: string }[] = [
  { key: "HIGH_POLY", label: "HIGH POLY", desc: "SCULPT / HERO MESH ONLY" },
  { key: "RUB", label: "RETOPO / UV / BAKE", desc: "REQUIRES EXISTING HIGH POLY" },
  { key: "TEXTURE", label: "TEXTURE", desc: "REQUIRES EXISTING HIGH POLY" },
  { key: "FULL", label: "FULL GAME-READY ASSET", desc: "END-TO-END PRODUCTION" },
  { key: "UNSURE", label: "UNSURE / HELP ME DECIDE", desc: "FLAGGED FOR MANUAL REVIEW" },
  { key: "QUOTE", label: "SIMPLE QUOTE / CONTACT", desc: "ROUTE TO CONTACT TERMINAL" },
];

// Map a requirement selection to internal pipeline stage flags
const stagesForRequirement = (req: RequirementType | null): Record<string, boolean> => {
  switch (req) {
    case "HIGH_POLY":
      return { "HIGH POLY": true };
    case "RUB":
      return { "HIGH POLY": true, "RETOPO / UV": true };
    case "TEXTURE":
      return { "HIGH POLY": true, "TEXTURING": true };
    case "FULL":
      return { BLOCKOUT: true, "HIGH POLY": true, "RETOPO / UV": true, TEXTURING: true };
    default:
      return {};
  }
};

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
  requirement: RequirementType | null;
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
  requirement: null,
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

  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const validateAssets = (): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};
    assets.forEach((a) => {
      const assetErrors: string[] = [];
      if (!a.projectDescriptor.trim()) assetErrors.push("Project Descriptor is required");
      if (!a.selectedCategory) assetErrors.push("Asset Category is required");
      if (!a.studioCode.trim()) assetErrors.push("Studio Code is required");
      if (a.workedBefore === null) assetErrors.push("Please indicate if you've worked with us before");
      if (assetErrors.length > 0) errors[a.id] = assetErrors;
    });
    setValidationErrors(errors);
    return errors;
  };

  const handleFinalize = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    const errors = validateAssets();
    if (Object.keys(errors).length > 0) {
      const firstErrorAssetId = Object.keys(errors)[0];
      const errorIndex = assets.findIndex(a => a.id === firstErrorAssetId);
      if (errorIndex >= 0) setActiveAssetIndex(errorIndex);
      toast.error("Please fill in all required fields before proceeding");
      return;
    }
    setSubmitting(true);
    try {
      // Create the asset request
      // Derive project name and client name from the first asset's data
      const firstAsset = assets[0];
      const projectName = firstAsset?.projectDescriptor || null;
      const clientName = firstAsset?.studioCode || null;

      const { data: request, error: reqError } = await supabase
        .from("asset_requests")
        .insert({
          user_id: user.id,
          project_name: projectName,
          client_name: clientName,
          budget: 0,
          workflow_step: 1,
          status: "pending",
        })
        .select()
        .single();
      if (reqError) throw reqError;

      // Insert all asset items
      const items = assets.map((a) => ({
        request_id: request.id,
        asset_number: a.id,
        size: a.size,
        category: a.selectedCategory,
        worked_before: a.workedBefore,
        studio_code: a.studioCode || null,
        requested_artist: a.requestedArtist || null,
        project_descriptor: a.projectDescriptor || null,
        project_description: a.projectDescription || null,
        reference_search: a.referenceSearch,
        rigging: a.rigging,
        animation: a.animation,
        vfx: a.vfx,
        full_production: a.fullProduction,
        stage_toggles: a.stageToggles,
        iterations: a.iterations,
      }));

      const { error: itemsError } = await supabase
        .from("asset_request_items")
        .insert(items);
      if (itemsError) throw itemsError;

      toast.success("Asset request submitted successfully");
      navigate("/asset-final-review");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit asset request");
    } finally {
      setSubmitting(false);
    }
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
                  validationErrors[a.id]
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : i === activeAssetIndex
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
        {/* Validation Error Banner */}
        {validationErrors[asset.id] && (
          <div className="mb-6 border border-destructive/50 rounded-lg bg-destructive/10 p-4">
            <p className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-destructive mb-2">⚠ REQUIRED FIELDS MISSING</p>
            <ul className="space-y-1">
              {validationErrors[asset.id].map((err, i) => (
                <li key={i} className="text-[10px] tracking-[0.1em] uppercase font-sans text-destructive/80">— {err}</li>
              ))}
            </ul>
          </div>
        )}

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
                  <p className={`text-[10px] tracking-[0.1em] uppercase font-sans font-bold mb-3 ${validationErrors[asset.id]?.some(e => e.includes("worked with us")) ? "text-destructive" : "text-foreground"}`}>HAVE YOU WORKED WITH US BEFORE? {validationErrors[asset.id]?.some(e => e.includes("worked with us")) && <span className="text-destructive">*</span>}</p>
                  <div className="flex gap-4">
                    {[true, false].map(val => (
                      <button key={String(val)} onClick={() => { updateAsset({ workedBefore: val }); setValidationErrors(prev => { const next = { ...prev }; if (next[asset.id]) { next[asset.id] = next[asset.id].filter(e => !e.includes("worked with us")); if (next[asset.id].length === 0) delete next[asset.id]; } return next; }); }} className={`flex items-center gap-2 text-xs font-sans font-medium ${asset.workedBefore === val ? "text-foreground" : "text-muted-foreground"}`}>
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${asset.workedBefore === val ? "border-copper bg-copper" : validationErrors[asset.id]?.some(e => e.includes("worked with us")) ? "border-destructive" : "border-border"}`}>
                          {asset.workedBefore === val && <span className="text-[8px] text-background">✓</span>}
                        </div>
                        {val ? "YES" : "NO"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={`text-[10px] tracking-[0.1em] uppercase font-sans font-bold mb-2 ${validationErrors[asset.id]?.some(e => e.includes("Studio Code")) ? "text-destructive" : "text-foreground"}`}>STUDIO NAME SEARCH {validationErrors[asset.id]?.some(e => e.includes("Studio Code")) && <span className="text-destructive">*</span>}</p>
                  <div className="relative">
                    <input type="text" value={asset.studioCode} onChange={(e) => { updateAsset({ studioCode: e.target.value }); if (e.target.value.trim()) setValidationErrors(prev => { const next = { ...prev }; if (next[asset.id]) { next[asset.id] = next[asset.id].filter(er => !er.includes("Studio Code")); if (next[asset.id].length === 0) delete next[asset.id]; } return next; }); }} placeholder="Enter Studio Identification Code..." className={`w-full bg-background border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none ${validationErrors[asset.id]?.some(e => e.includes("Studio Code")) ? "border-destructive focus:border-destructive" : "border-border focus:border-copper/50"}`} />
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
                  <p className={`text-[10px] tracking-[0.1em] uppercase font-sans font-bold mb-2 ${validationErrors[asset.id]?.some(e => e.includes("Project Descriptor")) ? "text-destructive" : "text-foreground"}`}>PROJECT DESCRIPTOR {validationErrors[asset.id]?.some(e => e.includes("Project Descriptor")) && <span className="text-destructive">*</span>}</p>
                  <input type="text" value={asset.projectDescriptor} onChange={(e) => { updateAsset({ projectDescriptor: e.target.value }); if (e.target.value.trim()) setValidationErrors(prev => { const next = { ...prev }; if (next[asset.id]) { next[asset.id] = next[asset.id].filter(er => !er.includes("Project Descriptor")); if (next[asset.id].length === 0) delete next[asset.id]; } return next; }); }} placeholder="Enter Asset Identification..." className={`w-full bg-background border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none ${validationErrors[asset.id]?.some(e => e.includes("Project Descriptor")) ? "border-destructive focus:border-destructive" : "border-border focus:border-copper/50"}`} />
                </div>
                <div>
                  <p className={`text-[10px] tracking-[0.1em] uppercase font-sans font-bold mb-2 ${validationErrors[asset.id]?.some(e => e.includes("Category")) ? "text-destructive" : "text-foreground"}`}>ASSET CATEGORY SELECTION {validationErrors[asset.id]?.some(e => e.includes("Category")) && <span className="text-destructive">*</span>}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => { updateAsset({ selectedCategory: cat === asset.selectedCategory ? null : cat }); if (cat !== asset.selectedCategory) setValidationErrors(prev => { const next = { ...prev }; if (next[asset.id]) { next[asset.id] = next[asset.id].filter(er => !er.includes("Category")); if (next[asset.id].length === 0) delete next[asset.id]; } return next; }); }} className={`py-2.5 rounded border text-[10px] tracking-[0.1em] uppercase font-sans font-medium transition-colors ${asset.selectedCategory === cat ? "border-copper/60 text-foreground bg-copper/10" : validationErrors[asset.id]?.some(e => e.includes("Category")) ? "border-destructive/50 text-muted-foreground hover:border-destructive/70" : "border-border text-muted-foreground hover:border-copper/30"}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Required Boxes — Project Requirement */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm bg-copper" />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">PROJECT REQUIREMENT</span>
              </div>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-4">SELECT ONE — DEFINES PIPELINE SCOPE</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {requirementOptions.map((opt) => {
                  const active = asset.requirement === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        if (opt.key === "QUOTE") {
                          navigate("/contact-terminal");
                          return;
                        }
                        const stages = stagesForRequirement(opt.key);
                        updateAsset({
                          requirement: opt.key,
                          stageToggles: stages,
                          fullProduction: opt.key === "FULL",
                          rigging: opt.key === "FULL" ? asset.rigging : false,
                          animation: opt.key === "FULL" ? asset.animation : false,
                          vfx: opt.key === "FULL" ? asset.vfx : false,
                        });
                        setValidationErrors(prev => {
                          const next = { ...prev };
                          if (next[asset.id]) {
                            next[asset.id] = next[asset.id].filter(er => !er.includes("Project Requirement"));
                            if (next[asset.id].length === 0) delete next[asset.id];
                          }
                          return next;
                        });
                      }}
                      className={`text-left p-4 rounded border transition-colors ${
                        active
                          ? "border-copper/60 bg-copper/10"
                          : validationErrors[asset.id]?.some(e => e.includes("Project Requirement"))
                          ? "border-destructive/50 hover:border-destructive/70"
                          : "border-border hover:border-copper/30"
                      }`}
                    >
                      <h3 className={`text-sm font-serif font-bold tracking-wider ${active ? "text-copper" : "text-foreground"}`}>{opt.label}</h3>
                      <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mt-1">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
              {asset.requirement === "UNSURE" && (
                <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-copper mt-3">⚑ MARKED FOR MANUAL REVIEW BY STUDIO LEAD</p>
              )}
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

            {/* Extended Production — only when Full Game-Ready */}
            {asset.requirement === "FULL" && (
              <>
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
              </>
            )}

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
