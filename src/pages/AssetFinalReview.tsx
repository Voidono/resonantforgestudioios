import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, PlusSquare, FolderOpen, AtSign, Upload, Copy, Info, HelpCircle, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import studioLogo from "@/assets/studio-logo.png";

const AssetFinalReview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Asset selector state
  const [assets] = useState([
    { id: "01", size: "S" },
    { id: "02", size: "M" },
    { id: "03", size: "L" },
    { id: "04", size: "S" },
    { id: "05", size: "S" },
  ]);
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);

  // Section 01: Visual Reference & Style Direction
  const [styleDirection, setStyleDirection] = useState<"REALISTIC" | "STYLIZED">("REALISTIC");
  const [referenceCompleteness, setReferenceCompleteness] = useState("PRODUCTION-READY CONCEPT");
  const [visualNotes, setVisualNotes] = useState("");

  // Section 02: Production Context
  const [assetUsage, setAssetUsage] = useState("HERO ASSET");
  const [assetRole, setAssetRole] = useState("STANDALONE");
  const [cameraDistance, setCameraDistance] = useState("PLAYER INTERACTION RANGE");
  const [envKit, setEnvKit] = useState<boolean | null>(false);
  const [modularKit, setModularKit] = useState<boolean | null>(false);

  // Section 03: Geometry & Build Targets
  const [fidelity, setFidelity] = useState("MID");
  const [polycountRange, setPolycountRange] = useState("1K-20K");
  const [lodConfig, setLodConfig] = useState("LOD0-LOD3");
  const [surfaceDetail, setSurfaceDetail] = useState("STANDARD");
  const [gameplayInteraction, setGameplayInteraction] = useState({ static: true, physics: false, destructible: false });
  const [modular, setModular] = useState(true);
  const [scale, setScale] = useState("1.0");
  const [pivotOrientation, setPivotOrientation] = useState("BASE PIVOT");

  // Section 04: Material & Texture Spec
  const [resolution, setResolution] = useState("4096 (4K)");
  const [textureSetCount, setTextureSetCount] = useState("1");
  const [materialWorkflow, setMaterialWorkflow] = useState("UNIQUE TEXTURES");
  const [mapChecklist, setMapChecklist] = useState({ albedo: true, normal: true, roughness: true, ao: false, emissive: false });
  const [channelPacked, setChannelPacked] = useState(false);
  const [materialNotes, setMaterialNotes] = useState("");

  // Section 05: Asset Variants & State Conditions
  const [numVariations, setNumVariations] = useState("1 (BASE ASSET ONLY)");
  const [variantMethod, setVariantMethod] = useState("MATERIAL / SHADER VARIANTS");
  const [destructionBehavior, setDestructionBehavior] = useState("NONE");
  const [variantTypes, setVariantTypes] = useState({ damageStates: false, destructionStages: false, wearAging: false, colorSwap: false });
  const [variantNotes, setVariantNotes] = useState("");

  // Section 06: Rigging & Animation
  const [rigType, setRigType] = useState("NONE");
  const [animationCount, setAnimationCount] = useState("0");
  const [vfxIntegration, setVfxIntegration] = useState("NONE REQUIRED");
  const [rigNotes, setRigNotes] = useState("");

  // Section 07: Production Efficiency
  const [bulkOrderTier, setBulkOrderTier] = useState("SINGLE ASSET");
  const [assetConsistency, setAssetConsistency] = useState("MOSTLY SIMILAR ASSETS");
  const [referenceQuality, setReferenceQuality] = useState("PRODUCTION-READY REFERENCE PACKAGE");
  const [geometryReuse, setGeometryReuse] = useState("MODULAR KIT REUSE");

  // Section 08: Engine & Pipeline Target
  const [targetEngine, setTargetEngine] = useState("UNREAL ENGINE 5");
  const [fileFormat, setFileFormat] = useState("FBX");
  const [pipelineConfig, setPipelineConfig] = useState({ collisionMesh: "ON", pivotPoint: "WORLD ORIGIN", namingConv: "STANDARD_V2" });
  const [deliveryTextureSetCount, setDeliveryTextureSetCount] = useState("1 SET");
  const [deliveryMaterialWorkflow, setDeliveryMaterialWorkflow] = useState("UNIQUE TEXTURES");

  // Section 09: Delivery Expectations
  const [priority, setPriority] = useState("STANDARD");
  const [deliverables, setDeliverables] = useState({ sourceFiles: true, exportFiles: true, lodMeshes: false, textureBakes: false, turntableRender: false });
  const [deliveryType, setDeliveryType] = useState("SINGLE");
  const [deliveryFormat, setDeliveryFormat] = useState("FBX");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const specCompleteness = 79;

  // ====== Section 10: High Poly Intake ======
  const [hpEnabled, setHpEnabled] = useState(false);
  const [hpAssetType, setHpAssetType] = useState<"SHS" | "THS" | "ORG">("SHS");
  const [hpLength, setHpLength] = useState<string>("1");
  const [hpWidth, setHpWidth] = useState<string>("1");
  const [hpHeight, setHpHeight] = useState<string>("");
  const [hpForm, setHpForm] = useState<number>(0.6); // shape complexity
  const [hpDetail, setHpDetail] = useState<number>(0.6); // detail density
  const [hpPrecision, setHpPrecision] = useState<number>(0.5); // precision
  const [hpTriCount, setHpTriCount] = useState<string>("");
  const [hpTriUnsure, setHpTriUnsure] = useState<boolean>(true);
  const [hpSupporting, setHpSupporting] = useState<"YES" | "NO" | "UNSURE">("UNSURE");
  const [hpPartsTier, setHpPartsTier] = useState<"FEW" | "MOD" | "MANY" | "VMANY">("MOD");

  const hpEstimate = useMemo(() => {
    if (!hpEnabled) return null;
    const L = Math.max(0.1, parseFloat(hpLength) || 1);
    const W = Math.max(0.1, parseFloat(hpWidth) || 1);
    const MMC = Math.max(0.4, Math.min(2.6, hpForm + hpDetail + hpPrecision));
    // Tri Floor
    const triFloorRaw = 2000 + 73000 * Math.pow(Math.max(0, (MMC - 0.4) / 2.2), 2.2);
    const triFloor = Math.min(75000, Math.max(2000, triFloorRaw));
    const roundedMinTri = Math.floor(triFloor / 5000) * 5000;
    const userTri = hpTriUnsure || !hpTriCount ? roundedMinTri : Math.max(0, parseInt(hpTriCount) || 0);
    const finalTri = Math.max(userTri, roundedMinTri);
    const polyScore = Math.min(5, Math.max(1, 1 + ((finalTri - 5000) / 295000) * 4));
    // Size modifier
    const footprint = L * W;
    const footprintMult = Math.min(1.6, Math.max(1.0, 1.0 + ((footprint - 1) / 74) * 0.6));
    const longest = Math.max(L, W); const shortest = Math.min(L, W);
    const ratio = longest / shortest;
    const aspectMult = ratio <= 3 ? 1.0 : ratio <= 6 ? 0.95 : ratio <= 10 ? 0.9 : 0.85;
    const sizeMod = footprintMult * aspectMult;
    const adjSizeMod = 0.75 + 0.25 * sizeMod;
    const scopeValue = polyScore * adjSizeMod;
    // Asset Type Modifier
    const ATM = hpAssetType === "SHS" ? 1.0 : hpAssetType === "THS" ? 1.05 + MMC * 0.1 : 1.30 + MMC * 0.3;
    const mainHp = 150 * Math.pow(scopeValue, 1.15) * MMC * ATM;
    // Supporting structure
    let supporting = 0;
    if (hpAssetType === "ORG") {
      supporting = 10 * (3 + MMC * 2);
    } else if (hpSupporting !== "NO") {
      let count: number;
      if (hpSupporting === "UNSURE") {
        count = Math.min(60, Math.max(5, scopeValue * MMC * 6));
      } else {
        count = hpPartsTier === "FEW" ? 3 : hpPartsTier === "MOD" ? 10 : hpPartsTier === "MANY" ? 23 : 45;
      }
      const dist = { shape: 0.20, simple: 0.30, baseline: 0.35, complex: 0.10, experimental: 0.05 };
      const vals = { shape: 5, simple: 10, baseline: 15, complex: 25, experimental: 40 };
      const unique = count * (dist.shape * vals.shape + dist.simple * vals.simple + dist.baseline * vals.baseline + dist.complex * vals.complex + dist.experimental * vals.experimental);
      const reused = (count * 0.5) * 5;
      supporting = unique + reused;
    }
    const workBase = mainHp + supporting;
    // Min hour adjustment (assume $75/hr)
    const hours = workBase / 75;
    const adj = hours <= 2 ? 0.25 : hours <= 4 ? 0.20 : hours <= 6 ? 0.15 : hours <= 8 ? 0.10 : hours <= 10 ? 0.05 : hours <= 12 ? 0.025 : 0;
    const finalValue = workBase * (1 + adj);
    return { finalValue, hours: hours * (1 + adj), MMC, scopeValue, polyScore, finalTri };
  }, [hpEnabled, hpAssetType, hpLength, hpWidth, hpForm, hpDetail, hpPrecision, hpTriCount, hpTriUnsure, hpSupporting, hpPartsTier]);

  // ====== Section 11: Retopo / UV / Bake Intake ======
  const [rubEnabled, setRubEnabled] = useState(false);
  const [rubLowTri, setRubLowTri] = useState<string>("");
  const [rubTopology, setRubTopology] = useState<"GAME" | "CLEAN" | "ALLQUADS">("GAME");
  const [rubDeformation, setRubDeformation] = useState<"STATIC" | "MECH" | "ORGANIC" | "CHAR">("STATIC");
  const [rubBakeQuality, setRubBakeQuality] = useState<"STD" | "HIGH" | "VHIGH" | "HERO">("STD");
  const [rubUvAssetType, setRubUvAssetType] = useState<"SIMPLE" | "STANDARD" | "TECH" | "ORGANIC">("STANDARD");
  const [rubUvReq, setRubUvReq] = useState<"BASIC" | "CLEAN" | "TEXEL" | "UDIM">("BASIC");
  const [rubSeam, setRubSeam] = useState<"STD" | "REDUCED" | "KEY" | "TILING">("STD");

  const rubEstimate = useMemo(() => {
    if (!rubEnabled || !hpEstimate) return null;
    const hpBase = hpEstimate.finalValue;
    // Retopo Factor
    const lowTri = Math.max(100, parseInt(rubLowTri) || Math.max(2000, Math.round(hpEstimate.finalTri / 10)));
    const ratio = hpEstimate.finalTri / lowTri;
    const reduction = ratio <= 3 ? 0 : ratio <= 8 ? 0.05 : ratio <= 15 ? 0.10 : ratio <= 25 ? 0.20 : 0.35;
    const topology = rubTopology === "GAME" ? 0 : rubTopology === "CLEAN" ? 0.08 : 0.18;
    const deformation = rubDeformation === "STATIC" ? 0 : rubDeformation === "MECH" ? 0.06 : rubDeformation === "ORGANIC" ? 0.12 : 0.20;
    const retopoFactor = 0.25 + reduction + topology + deformation;
    // UV Factor
    const uvAsset = rubUvAssetType === "SIMPLE" ? 0 : rubUvAssetType === "STANDARD" ? 0.02 : rubUvAssetType === "TECH" ? 0.05 : 0.06;
    const uvReq = rubUvReq === "BASIC" ? 0 : rubUvReq === "CLEAN" ? 0.03 : rubUvReq === "TEXEL" ? 0.05 : 0.10;
    const seam = rubSeam === "STD" ? 0 : rubSeam === "REDUCED" ? 0.03 : rubSeam === "KEY" ? 0.06 : 0.10;
    const uvFactor = 0.10 + uvAsset + uvReq + seam;
    // Bake Factor — derive bake risk from HP MMC
    const mmc = hpEstimate.MMC;
    const bakeRisk = mmc <= 0.8 ? 0 : mmc <= 1.3 ? 0.05 : mmc <= 1.8 ? 0.10 : mmc <= 2.3 ? 0.20 : 0.35;
    const bakeQ = rubBakeQuality === "STD" ? 0 : rubBakeQuality === "HIGH" ? 0.05 : rubBakeQuality === "VHIGH" ? 0.10 : 0.20;
    const bakeFactor = 0.15 + bakeRisk + bakeQ;
    const finalValue = hpBase * (retopoFactor + uvFactor + bakeFactor);
    const hours = finalValue / 75;
    return { finalValue, hours, retopoFactor, uvFactor, bakeFactor, lowTri };
  }, [rubEnabled, hpEstimate, rubLowTri, rubTopology, rubDeformation, rubBakeQuality, rubUvAssetType, rubUvReq, rubSeam]);

  // ====== Section 12: Texture Intake ======
  type TexType = "HS_CLEAN" | "HS_WORN" | "ORGANIC" | "FABRIC" | "SKIN" | "STYLIZED" | "OTHER";
  type TexCoverage = "SMALL" | "MED" | "LARGE" | "FULL";
  type TexMaps = "BASE" | "BASE_RM" | "PBR" | "PBR_PLUS";
  type TexManual = "NONE" | "LOW" | "MOD" | "HIGH" | "VHIGH";
  type TexDetail = "BAKE" | "MBAKE" | "MIX" | "MAUTH" | "FAUTH";
  type TexVariation = "UNIFORM" | "LIGHT" | "MOD" | "HIGH" | "UNIQUE";
  interface TexSet {
    id: string; label: string;
    type: TexType; coverage: TexCoverage; maps: TexMaps;
    manual: TexManual; detail: TexDetail; variation: TexVariation;
  }
  const newTexSet = (n: number): TexSet => ({
    id: crypto.randomUUID(), label: `TEXTURE SET ${n}`,
    type: "HS_CLEAN", coverage: "MED", maps: "PBR",
    manual: "LOW", detail: "MBAKE", variation: "LIGHT",
  });
  const [textureEnabled, setTextureEnabled] = useState(false);
  const [textureSetTier, setTextureSetTier] = useState<"1" | "2-3" | "4-6" | "7+" | "UNSURE">("1");
  const [texSets, setTexSets] = useState<TexSet[]>([newTexSet(1)]);

  const setTexSetCount = (tier: typeof textureSetTier) => {
    setTextureSetTier(tier);
    const target = tier === "1" ? 1 : tier === "2-3" ? 2 : tier === "4-6" ? 4 : tier === "7+" ? 7 : 1;
    setTexSets(prev => {
      if (prev.length === target) return prev;
      if (prev.length < target) {
        const add = Array.from({ length: target - prev.length }, (_, i) => newTexSet(prev.length + i + 1));
        return [...prev, ...add];
      }
      return prev.slice(0, target);
    });
  };
  const updateTexSet = (id: string, patch: Partial<TexSet>) =>
    setTexSets(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
  const addTexSet = () => setTexSets(prev => [...prev, newTexSet(prev.length + 1)]);
  const removeTexSet = (id: string) => setTexSets(prev => prev.length > 1 ? prev.filter(s => s.id !== id) : prev);

  const textureEstimate = useMemo(() => {
    if (!textureEnabled || !hpEstimate) return null;
    const hpBase = hpEstimate.finalValue;
    const TYPE_W: Record<TexType, number> = { HS_CLEAN: 0.10, HS_WORN: 0.16, ORGANIC: 0.18, FABRIC: 0.16, SKIN: 0.22, STYLIZED: 0.12, OTHER: 0.14 };
    const COV_W: Record<TexCoverage, number> = { SMALL: 0.18, MED: 0.38, LARGE: 0.62, FULL: 0.88 };
    const MAPS_W: Record<TexMaps, number> = { BASE: 0.05, BASE_RM: 0.10, PBR: 0.18, PBR_PLUS: 0.26 };
    const MAN_W: Record<TexManual, number> = { NONE: 0, LOW: 0.05, MOD: 0.10, HIGH: 0.18, VHIGH: 0.28 };
    const DET_W: Record<TexDetail, number> = { BAKE: 0, MBAKE: 0.03, MIX: 0.06, MAUTH: 0.12, FAUTH: 0.20 };
    const VAR_W: Record<TexVariation, number> = { UNIFORM: 0, LIGHT: 0.04, MOD: 0.08, HIGH: 0.14, UNIQUE: 0.22 };

    const perSet = texSets.map(s => {
      const normal = TYPE_W[s.type] + DET_W[s.detail];
      const baseColor = MAPS_W[s.maps] + VAR_W[s.variation];
      const minor = MAN_W[s.manual];
      const complexity = normal + baseColor + minor;
      const coverage = COV_W[s.coverage];
      const finalFactor = complexity * coverage;
      return { id: s.id, label: s.label, complexity, coverage, finalFactor };
    });
    const textureWork = perSet.reduce((sum, p) => sum + p.finalFactor, 0);
    const creationCost = hpBase * textureWork * 0.45;
    const applicationCost = hpBase * textureWork * 0.55;
    const finalValue = creationCost + applicationCost;
    const hours = finalValue / 75;
    return { finalValue, hours, textureWork, creationCost, applicationCost, perSet };
  }, [textureEnabled, hpEstimate, texSets]);


  // ====== Section 13: Global Project Intake (Modal) ======
  const [globalModalOpen, setGlobalModalOpen] = useState(false);
  const [gpClarity, setGpClarity] = useState<"VDETAIL" | "MOSTLY" | "PARTIAL" | "ROUGH">("MOSTLY");
  const [gpReference, setGpReference] = useState<"VCLEAR" | "GOOD" | "MIXED" | "POOR" | "NONE">("GOOD");
  const [gpWorkflow, setGpWorkflow] = useState<"VSMOOTH" | "STD" | "SOME" | "DIFF" | "HIGH">("STD");
  const [gpRevisions, setGpRevisions] = useState<"0" | "1" | "2" | "3+">("1");

  const handleSubmitSpecifications = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setSubmitting(true);
    try {
      // Create asset request first
      const { data: request, error: reqError } = await supabase
        .from("asset_requests")
        .insert({ user_id: user.id })
        .select()
        .single();
      if (reqError) throw reqError;

      // Insert specification for each asset
      const specs = assets.map((a) => ({
        request_id: request.id,
        style_direction: styleDirection,
        reference_completeness: referenceCompleteness,
        visual_notes: visualNotes || null,
        asset_usage: assetUsage,
        asset_role: assetRole,
        camera_distance: cameraDistance,
        env_kit: envKit ?? false,
        modular_kit: modularKit ?? false,
        fidelity,
        polycount_range: polycountRange,
        lod_config: lodConfig,
        surface_detail: surfaceDetail,
        gameplay_interaction: gameplayInteraction,
        modular,
        scale,
        pivot_orientation: pivotOrientation,
        texture_resolution: resolution,
        texture_set_count: textureSetCount,
        material_workflow: materialWorkflow,
        map_checklist: mapChecklist,
        channel_packed: channelPacked,
        material_notes: materialNotes || null,
        num_variations: numVariations,
        variant_method: variantMethod,
        destruction_behavior: destructionBehavior,
        variant_types: variantTypes,
        variant_notes: variantNotes || null,
        rig_type: rigType,
        animation_count: animationCount,
        vfx_integration: vfxIntegration,
        rig_notes: rigNotes || null,
        bulk_order_tier: bulkOrderTier,
        asset_consistency: assetConsistency,
        reference_quality: referenceQuality,
        geometry_reuse: geometryReuse,
        target_engine: targetEngine,
        file_format: fileFormat,
        pipeline_config: pipelineConfig,
        delivery_texture_set_count: deliveryTextureSetCount,
        delivery_material_workflow: deliveryMaterialWorkflow,
        priority,
        deliverables,
        delivery_type: deliveryType,
        delivery_format: deliveryFormat,
        delivery_notes: deliveryNotes || null,
      }));

      const { error: specError } = await supabase
        .from("asset_specifications")
        .insert(specs);
      if (specError) throw specError;

      toast.success("Specifications submitted successfully");
      navigate("/submission-confirmation");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit specifications");
    } finally {
      setSubmitting(false);
    }
  };

  const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
      <div className="w-2 h-2 rounded-sm bg-copper" />
      <span className="text-copper text-[10px] tracking-[0.1em] font-sans font-bold">{num}</span>
      <span className="text-[11px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">{title}</span>
    </div>
  );

  const SelectField = ({ label, value, onChange, options, tooltip }: { label: string; value: string; onChange: (v: string) => void; options: string[]; tooltip?: boolean }) => (
    <div>
      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2 flex items-center gap-1.5">
        {label} {tooltip && <HelpCircle className="w-3 h-3 text-muted-foreground" />}
      </p>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground focus:outline-none focus:border-copper/50 appearance-none cursor-pointer">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const ToggleButtons = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
    <div className="flex gap-0 border border-border rounded overflow-hidden">
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} className={`flex-1 py-3 text-[10px] tracking-[0.05em] uppercase font-sans font-bold transition-colors ${value === o ? "bg-copper/20 text-copper border border-copper" : "text-muted-foreground hover:text-foreground"}`}>
          {o}
        </button>
      ))}
    </div>
  );

  const YesNoToggle = ({ value, onChange }: { value: boolean | null; onChange: (v: boolean) => void }) => (
    <div className="flex gap-2">
      <button onClick={() => onChange(true)} className={`px-5 py-2 rounded text-[10px] tracking-[0.1em] uppercase font-sans font-bold border transition-colors ${value === true ? "border-copper bg-copper/20 text-copper" : "border-border text-muted-foreground"}`}>YES</button>
      <button onClick={() => onChange(false)} className={`px-5 py-2 rounded text-[10px] tracking-[0.1em] uppercase font-sans font-bold border transition-colors ${value === false ? "border-copper bg-copper/20 text-copper" : "border-border text-muted-foreground"}`}>NO</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border mt-[72px] md:mt-[88px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
          <button onClick={() => navigate("/asset-intake")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
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
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
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
            STAGE 3: <span className="font-bold text-foreground">FINAL REVIEW</span>
          </span>
        </div>
      </div>

      {/* Asset Selector Bar */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4 flex-wrap">
          <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground">SELECT ASSET:</span>
          <div className="flex items-center gap-2">
            {assets.map((a, i) => (
              <button key={i} onClick={() => setActiveAssetIndex(i)} className={`px-3 py-1.5 rounded text-[11px] tracking-[0.05em] font-sans font-bold transition-colors border ${i === activeAssetIndex ? "border-copper bg-copper/20 text-copper" : "border-border text-muted-foreground hover:border-copper/40"}`}>
                {a.id}-{a.size}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-2">
            <div className="h-5 w-px bg-copper/60" />
            <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">
              SIZE: {assets[activeAssetIndex]?.size === "S" ? "SMALL" : assets[activeAssetIndex]?.size === "M" ? "MEDIUM" : assets[activeAssetIndex]?.size === "L" ? "LARGE" : "GAME-READY"}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded border border-border text-[10px] tracking-[0.1em] uppercase font-sans font-medium text-muted-foreground hover:border-copper/40 hover:text-foreground transition-colors">
              <Copy className="w-3.5 h-3.5" />
              DUPLICATE TO...
            </button>
          </div>
        </div>
      </div>

      {/* Technical Advisory */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mt-8">
        <div className="border border-copper/30 rounded-lg bg-copper/5 p-5 flex gap-4">
          <Info className="w-5 h-5 text-copper shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-1">TECHNICAL ADVISORY</p>
            <p className="text-[10px] tracking-[0.05em] uppercase font-sans text-muted-foreground leading-relaxed">
              NOTE: WE DO NOT EXPECT 100% ACCURACY AT THIS STAGE. PLEASE PROVIDE AS MUCH TECHNICAL INFORMATION AS CAN BE FEASIBLY GIVEN TO ASSIST WITH ESTIMATION. WE REQUEST THAT YOU BE DESCRIPTIVE IN THE NOTES FIELDS TO PROVIDE THE NECESSARY PRODUCTION CONTEXT.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 px-4 md:px-8 py-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          {/* LEFT: Form Sections */}
          <div className="space-y-12">

            {/* 01 Visual Reference & Style Direction */}
            <div>
              <SectionHeader num="01" title="VISUAL REFERENCE & STYLE DIRECTION" />
              <div className="border border-border rounded-lg bg-card/40 p-6">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
                  {/* Upload area */}
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">UPLOAD REFERENCE</p>
                    <div className="border-2 border-dashed border-border rounded-lg h-48 flex flex-col items-center justify-center gap-3 bg-background/50 hover:border-copper/30 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-[10px] tracking-[0.1em] uppercase font-sans text-muted-foreground">DROP ASSETS HERE</span>
                    </div>
                  </div>
                  {/* Style options */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">STYLE DIRECTION</p>
                      <div className="flex gap-2">
                        {(["REALISTIC", "STYLIZED"] as const).map(s => (
                          <button key={s} onClick={() => setStyleDirection(s)} className={`px-5 py-2 rounded text-[10px] tracking-[0.1em] uppercase font-sans font-bold border transition-colors ${styleDirection === s ? "border-copper bg-copper/20 text-copper" : "border-border text-muted-foreground"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <SelectField label="REFERENCE COMPLETENESS" value={referenceCompleteness} onChange={setReferenceCompleteness} options={["PRODUCTION-READY CONCEPT", "ROUGH CONCEPT", "MOOD REFERENCE ONLY", "NO REFERENCE"]} tooltip />
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">VISUAL NOTES</p>
                      <textarea value={visualNotes} onChange={e => setVisualNotes(e.target.value)} placeholder="Visual notes..." className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50 min-h-[80px] resize-y" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 Production Context */}
            <div>
              <SectionHeader num="02" title="PRODUCTION CONTEXT" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">ASSET USAGE</p>
                  <div className="flex gap-0 border border-border rounded overflow-hidden">
                    {["GAMEPLAY PROP", "BACKGROUND PROP", "HERO ASSET", "CINEMATIC", "MARKETING"].map(o => (
                      <button key={o} onClick={() => setAssetUsage(o)} className={`flex-1 py-3 text-[10px] tracking-[0.05em] uppercase font-sans font-bold transition-colors ${assetUsage === o ? "bg-copper/20 text-copper border border-copper" : "text-muted-foreground hover:text-foreground"}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
                <SelectField label="ASSET ROLE" value={assetRole} onChange={setAssetRole} options={["STANDALONE", "KIT COMPONENT", "HERO FOCAL POINT", "BACKGROUND FILL"]} />
                <SelectField label="CAMERA DISTANCE" value={cameraDistance} onChange={setCameraDistance} options={["PLAYER INTERACTION RANGE", "MID-RANGE VIEW", "DISTANT / BACKGROUND", "EXTREME CLOSE-UP"]} />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">ENVIRONMENT KIT ASSET</p>
                      <p className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground mt-0.5">CONSIDER WHETHER THE ASSET BELONGS TO A MODULAR ENVIRONMENT FOR USE TO BUILD AREAS, RATHER THAN A UNIQUE STANDALONE PIECE</p>
                    </div>
                    <YesNoToggle value={envKit} onChange={setEnvKit} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">MODULAR KIT PIECE</p>
                      <p className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground mt-0.5">INDICATES WHETHER THE ASSET IS DESIGNED AS A STACKABLE/CONNECTABLE COMPONENT</p>
                    </div>
                    <YesNoToggle value={modularKit} onChange={setModularKit} />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground">PRODUCTION SPECIFICATION</p>
            </div>

            {/* 03 Geometry & Build Targets */}
            <div>
              <SectionHeader num="03" title="GEOMETRY & BUILD TARGETS" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="flex gap-0 border border-border rounded overflow-hidden">
                  {[
                    { id: "LOW", label: "LOW", sub: "GAME ASSET" },
                    { id: "MID", label: "MID", sub: "HIGH FIDELITY" },
                    { id: "HIGH", label: "HIGH", sub: "CINEMATIC" },
                    { id: "HERO", label: "HERO", sub: "FEATURE ITEM" },
                  ].map(o => (
                    <button key={o.id} onClick={() => setFidelity(o.id)} className={`flex-1 py-4 text-center transition-colors ${fidelity === o.id ? "bg-copper/20 border border-copper" : "hover:bg-card/60"}`}>
                      <span className={`text-[10px] tracking-[0.1em] uppercase font-sans font-bold block ${fidelity === o.id ? "text-copper" : "text-muted-foreground"}`}>{o.label}</span>
                      <span className={`text-[9px] tracking-[0.05em] uppercase font-sans block mt-0.5 ${fidelity === o.id ? "text-foreground" : "text-muted-foreground"}`}>{o.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="TARGET POLYCOUNT RANGE" value={polycountRange} onChange={setPolycountRange} options={["1K-20K", "20K-50K", "50K-100K", "100K-500K", "500K+"]} tooltip />
                  <SelectField label="LOD CONFIGURATION" value={lodConfig} onChange={setLodConfig} options={["LOD0-LOD3", "LOD0-LOD2", "LOD0 ONLY", "CUSTOM"]} tooltip />
                </div>
                <p className="text-[8px] tracking-[0.05em] font-sans text-muted-foreground">THESE CONFIGURATIONS ARE INTERRELATED AND APPLY TO THE SELECTED FIDELITY SYSTEM.</p>

                <SelectField label="SURFACE DETAIL / SCULPT COMPLEXITY" value={surfaceDetail} onChange={setSurfaceDetail} options={["STANDARD", "HIGH DETAIL", "ULTRA DETAIL", "MINIMAL"]} tooltip />
                <p className="text-[8px] tracking-[0.05em] font-sans text-muted-foreground">SURFACE DETAIL REFERS TO SCULPTED OR MATERIAL DETAIL BEYOND THE BASE POLYGON COUNT, SUCH AS ENGRAVINGS, PANEL LINES, WEAR PATTERNS, OR FINE DAMAGE DETAILS.</p>

                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">GAMEPLAY INTERACTION</p>
                  <div className="flex items-center gap-6 flex-wrap">
                    {(["Static", "Physics", "Destructible"] as const).map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${gameplayInteraction[type.toLowerCase() as keyof typeof gameplayInteraction] ? "border-copper bg-copper" : "border-border"}`}
                          onClick={() => setGameplayInteraction(prev => ({ ...prev, [type.toLowerCase()]: !prev[type.toLowerCase() as keyof typeof prev] }))}>
                          {gameplayInteraction[type.toLowerCase() as keyof typeof gameplayInteraction] && <span className="text-[8px] text-background">✓</span>}
                        </div>
                        <span className="text-xs font-sans text-foreground">{type}</span>
                      </label>
                    ))}
                    <div className="flex items-center gap-2 ml-4">
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${modular ? "border-copper bg-copper" : "border-border"}`}
                        onClick={() => setModular(!modular)}>
                        {modular && <span className="text-[8px] text-background">✓</span>}
                      </div>
                      <span className="text-xs font-sans font-bold text-foreground">MODULAR</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-[10px] tracking-[0.1em] uppercase font-sans text-muted-foreground">SCALE:</span>
                      <input type="text" value={scale} onChange={e => setScale(e.target.value)} className="w-12 bg-background border border-border rounded px-2 py-1 text-sm font-sans text-foreground text-center focus:outline-none focus:border-copper/50" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3 flex items-center gap-1.5">
                    PIVOT / ORIENTATION REQUIREMENT <HelpCircle className="w-3 h-3 text-muted-foreground" />
                  </p>
                  <ToggleButtons options={["CENTER PIVOT", "BASE PIVOT", "WORLD-ALIGNED", "CUSTOM PIVOT"]} value={pivotOrientation} onChange={setPivotOrientation} />
                </div>
              </div>
            </div>

            {/* 04 Material & Texture Spec */}
            <div>
              <SectionHeader num="04" title="MATERIAL & TEXTURE SPEC" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <SelectField label="RESOLUTION" value={resolution} onChange={setResolution} options={["1024 (1K)", "2048 (2K)", "4096 (4K)", "8192 (8K)"]} />
                  <SelectField label="TEXTURE SET COUNT" value={textureSetCount} onChange={setTextureSetCount} options={["1", "2", "3", "4", "5+"]} tooltip />
                  <SelectField label="MATERIAL WORKFLOW" value={materialWorkflow} onChange={setMaterialWorkflow} options={["UNIQUE TEXTURES", "TRIM SHEETS", "TILING TEXTURES", "HYBRID"]} tooltip />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">MAP CHECKLIST</p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Switch checked={channelPacked} onCheckedChange={setChannelPacked} />
                      <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper">CHANNEL PACKED</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap">
                    {(["albedo", "normal", "roughness", "ao", "emissive"] as const).map(map => (
                      <label key={map} className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${mapChecklist[map] ? "border-copper bg-copper" : "border-border"}`}
                          onClick={() => setMapChecklist(prev => ({ ...prev, [map]: !prev[map] }))}>
                          {mapChecklist[map] && <span className="text-[8px] text-background">✓</span>}
                        </div>
                        <span className="text-xs font-sans text-foreground uppercase">{map}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">MATERIAL & TEXTURE NOTES</p>
                  <textarea value={materialNotes} onChange={e => setMaterialNotes(e.target.value)} placeholder="Specify custom shader ranges, requirements, layered material usage, or specific surface detail near asset..." className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50 min-h-[80px] resize-y" />
                </div>
              </div>
            </div>

            {/* 05 Asset Variants & State Conditions */}
            <div>
              <SectionHeader num="05" title="ASSET VARIANTS & STATE CONDITIONS" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper">VARIANT STRUCTURE</p>
                    <SelectField label="NUMBER OF ASSET VARIATIONS" value={numVariations} onChange={setNumVariations} options={["1 (BASE ASSET ONLY)", "2-3 VARIANTS", "4-6 VARIANTS", "7+ VARIANTS"]} />
                    <SelectField label="VARIANT PRODUCTION METHOD" value={variantMethod} onChange={setVariantMethod} options={["MATERIAL / SHADER VARIANTS", "GEOMETRY VARIANTS", "FULL UNIQUE VARIANTS", "HYBRID"]} />
                    <p className="text-[8px] tracking-[0.05em] font-sans text-muted-foreground">VARIANTS THAT ALTER PHYSICAL SHAPE OR MATERIAL, CHANGES WITHOUT NEW GEOMETRY</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper">STATE CONDITIONS</p>
                    <SelectField label="DESTRUCTION BEHAVIOR" value={destructionBehavior} onChange={setDestructionBehavior} options={["NONE", "SIMPLE BREAK", "MULTI-STAGE", "FULL DESTRUCTION"]} />
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">VARIANT TYPES</p>
                      <div className="space-y-2">
                        <p className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground uppercase">DAMAGE STATES</p>
                        <div className="flex gap-4">
                          {(["damageStates", "destructionStages"] as const).map(t => (
                            <label key={t} className="flex items-center gap-2 cursor-pointer">
                              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${variantTypes[t] ? "border-copper bg-copper" : "border-border"}`}
                                onClick={() => setVariantTypes(prev => ({ ...prev, [t]: !prev[t] }))}>
                                {variantTypes[t] && <span className="text-[8px] text-background">✓</span>}
                              </div>
                              <span className="text-xs font-sans text-foreground">{t === "damageStates" ? "Damage States" : "Destruction Stages"}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground uppercase mt-2">WEAR / AGE STATES</p>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${variantTypes.wearAging ? "border-copper bg-copper" : "border-border"}`}
                            onClick={() => setVariantTypes(prev => ({ ...prev, wearAging: !prev.wearAging }))}>
                            {variantTypes.wearAging && <span className="text-[8px] text-background">✓</span>}
                          </div>
                          <span className="text-xs font-sans text-foreground">Wear / Aging</span>
                        </label>
                        <p className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground uppercase mt-2">ENVIRONMENTAL STATES</p>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${variantTypes.colorSwap ? "border-copper bg-copper" : "border-border"}`}
                            onClick={() => setVariantTypes(prev => ({ ...prev, colorSwap: !prev.colorSwap }))}>
                            {variantTypes.colorSwap && <span className="text-[8px] text-background">✓</span>}
                          </div>
                          <span className="text-xs font-sans text-foreground">Color Swap</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">VARIANT NOTES</p>
                  <textarea value={variantNotes} onChange={e => setVariantNotes(e.target.value)} placeholder="Specify variant details..." className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50 min-h-[80px] resize-y" />
                </div>
              </div>
            </div>

            {/* 06 Rigging & Animation */}
            <div>
              <SectionHeader num="06" title="RIGGING & ANIMATION" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <SelectField label="RIG TYPE" value={rigType} onChange={setRigType} options={["NONE", "BASIC", "ADVANCED", "CUSTOM"]} />
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">ANIMATION COUNT (CLIPS)</p>
                    <input type="text" value={animationCount} onChange={e => setAnimationCount(e.target.value)} className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground focus:outline-none focus:border-copper/50" />
                  </div>
                  <SelectField label="VFX INTEGRATION" value={vfxIntegration} onChange={setVfxIntegration} options={["NONE REQUIRED", "PARTICLE EFFECTS", "SHADER EFFECTS", "FULL VFX SUITE"]} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">RIG / ANIMATION NOTES</p>
                  <textarea value={rigNotes} onChange={e => setRigNotes(e.target.value)} placeholder="Enter staging or animation specifications..." className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50 min-h-[100px] resize-y" />
                </div>
              </div>
            </div>

            {/* 07 Production Efficiency */}
            <div>
              <SectionHeader num="07" title="PRODUCTION EFFICIENCY" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <p className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground uppercase leading-relaxed">
                  IDENTIFY PRODUCTION CONDITIONS THAT MAY REDUCE ASSET BUILD TIME, SUCH AS REUSABLE ASSETS, BULK ORDERS, OR COMPLETE REFERENCE PACKAGES.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="BULK ORDER TIER" value={bulkOrderTier} onChange={setBulkOrderTier} options={["SINGLE ASSET", "SMALL BATCH (2-5)", "MEDIUM BATCH (6-15)", "LARGE BATCH (16+)"]} />
                  <SelectField label="ASSET CONSISTENCY" value={assetConsistency} onChange={setAssetConsistency} options={["MOSTLY SIMILAR ASSETS", "MIXED COMPLEXITY", "ALL UNIQUE"]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="REFERENCE QUALITY" value={referenceQuality} onChange={setReferenceQuality} options={["PRODUCTION-READY REFERENCE PACKAGE", "ROUGH CONCEPT", "MOOD REFERENCE ONLY", "NO REFERENCE"]} />
                  <SelectField label="GEOMETRY / MATERIAL REUSE" value={geometryReuse} onChange={setGeometryReuse} options={["MODULAR KIT REUSE", "MATERIAL REUSE ONLY", "FULL UNIQUE BUILD", "HYBRID APPROACH"]} />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground">INTEGRATION & DELIVERY</p>
            </div>

            {/* 08 Engine & Pipeline Target */}
            <div>
              <SectionHeader num="08" title="ENGINE & PIPELINE TARGET" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="grid grid-cols-[1fr_1fr] gap-8">
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">TARGET ENGINE</p>
                      <div className="flex gap-2">
                        {["UNREAL ENGINE 5", "UNITY/PRO"].map(e => (
                          <button key={e} onClick={() => setTargetEngine(e)} className={`px-5 py-2.5 rounded text-[10px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${targetEngine === e ? "border-copper bg-copper/20 text-copper" : "border-border text-muted-foreground"}`}>
                            {e}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">FILE FORMAT</p>
                      <div className="flex gap-2">
                        {["FBX", "USD", "OBJ"].map(f => (
                          <button key={f} onClick={() => setFileFormat(f)} className={`px-5 py-2 rounded text-[10px] tracking-[0.1em] uppercase font-sans font-bold border transition-colors ${fileFormat === f ? "border-copper bg-copper/20 text-copper" : "border-border text-muted-foreground"}`}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">PIPELINE CONFIG</p>
                    <div className="space-y-2">
                      {[
                        { label: "COLLISION MESH", value: pipelineConfig.collisionMesh },
                        { label: "PIVOT POINT", value: pipelineConfig.pivotPoint },
                        { label: "NAMING CONV.", value: pipelineConfig.namingConv },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between py-2 border-b border-border">
                          <span className="text-[10px] tracking-[0.05em] font-sans text-muted-foreground">{item.label}</span>
                          <span className="text-[10px] tracking-[0.05em] font-sans font-bold text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <SelectField label="TEXTURE SET COUNT" value={deliveryTextureSetCount} onChange={setDeliveryTextureSetCount} options={["1 SET", "2 SETS", "3 SETS", "4+ SETS"]} />
                  <SelectField label="MATERIAL WORKFLOW" value={deliveryMaterialWorkflow} onChange={setDeliveryMaterialWorkflow} options={["UNIQUE TEXTURES", "TRIM SHEETS", "TILING", "HYBRID"]} tooltip />
                </div>
              </div>
            </div>

            {/* 09 Delivery Expectations */}
            <div>
              <SectionHeader num="09" title="DELIVERY EXPECTATIONS" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">PRIORITY</p>
                      <ToggleButtons options={["STANDARD", "EXPEDITED", "CRITICAL"]} value={priority} onChange={setPriority} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">DELIVERY TYPE</p>
                      <p className="text-[8px] tracking-[0.05em] font-sans text-muted-foreground mb-2 leading-relaxed">
                        DST SINGLE MEANS ASSETS ARE DELIVERED AS A SINGLE COMPLETED PACKAGE ON FINALIZATION / MILESTONE DELIVERY.<br />
                        DST MILESTONE EACH MAJOR DELIVERABLE AS A SINGLE COMPLETED PACKAGE OR IN SINGLE MILESTONE DELIVERED.
                      </p>
                      <div className="flex gap-2">
                        {["SINGLE", "MILESTONE"].map(t => (
                          <button key={t} onClick={() => setDeliveryType(t)} className={`px-6 py-2.5 rounded text-[10px] tracking-[0.1em] uppercase font-sans font-bold border transition-colors ${deliveryType === t ? "border-copper bg-copper/20 text-copper" : "border-border text-muted-foreground"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">DELIVERABLES CHECKLIST</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(deliverables) as (keyof typeof deliverables)[]).map(d => (
                        <label key={d} className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${deliverables[d] ? "border-copper bg-copper" : "border-border"}`}
                            onClick={() => setDeliverables(prev => ({ ...prev, [d]: !prev[d] }))}>
                            {deliverables[d] && <span className="text-[8px] text-background">✓</span>}
                          </div>
                          <span className="text-xs font-sans text-foreground capitalize">{d.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <SelectField label="PREFERRED DELIVERY FORMAT" value={deliveryFormat} onChange={setDeliveryFormat} options={["FBX", "USD", "OBJ", "GLTF", "BLEND"]} />

                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">DELIVERY NOTES</p>
                  <textarea value={deliveryNotes} onChange={e => setDeliveryNotes(e.target.value)} placeholder="Enter specific delivery requirements..." className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50 min-h-[100px] resize-y" />
                </div>
              </div>
            </div>

            {/* 10 High Poly Intake */}
            <div>
              <SectionHeader num="10" title="HIGH POLY INTAKE" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">ENABLE HIGH POLY STAGE</p>
                    <p className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground mt-1">TOGGLE TO INCLUDE HP COSTS IN ESTIMATE</p>
                  </div>
                  <Switch checked={hpEnabled} onCheckedChange={setHpEnabled} />
                </div>

                {hpEnabled && (
                  <div className="space-y-6 pt-2 border-t border-border">
                    {/* Asset Type */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">ASSET TYPE</p>
                      <div className="grid grid-cols-3 gap-2">
                        {([["SHS","STANDARD HARD SURFACE"],["THS","TECHNICAL HARD SURFACE"],["ORG","ORGANIC"]] as const).map(([k,l]) => (
                          <button key={k} onClick={() => setHpAssetType(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${hpAssetType===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Estimated Size */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">ESTIMATED SIZE</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[["LENGTH (M)",hpLength,setHpLength,false],["WIDTH (M)",hpWidth,setHpWidth,false],["HEIGHT (M, OPT)",hpHeight,setHpHeight,true]].map(([lab,val,fn]:any) => (
                          <div key={lab}>
                            <p className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground mb-1">{lab}</p>
                            <input type="number" min="0" step="0.1" value={val} onChange={e=>fn(e.target.value)} className="w-full bg-background border border-border rounded px-3 py-2 text-sm font-sans text-foreground focus:outline-none focus:border-copper/50" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shape Complexity */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">SHAPE COMPLEXITY</p>
                      <div className="grid grid-cols-5 gap-2">
                        {([["VERY SIMPLE",0.2],["SIMPLE",0.4],["MODERATE",0.6],["COMPLEX",0.8],["HIGHLY COMPLEX",1.0]] as const).map(([l,v]) => (
                          <button key={l} onClick={()=>setHpForm(v)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${hpForm===v?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Detail Density */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">DETAIL DENSITY</p>
                      <div className="grid grid-cols-5 gap-2">
                        {([["MINIMAL",0.2],["LOW",0.4],["MODERATE",0.6],["HIGH",0.8],["VERY HIGH",1.0]] as const).map(([l,v]) => (
                          <button key={l} onClick={()=>setHpDetail(v)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${hpDetail===v?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Precision Requirement */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">PRECISION REQUIREMENT</p>
                      <div className="grid grid-cols-4 gap-2">
                        {([["LOOSE / CONCEPT",0.25],["STANDARD",0.5],["HIGH PRECISION",0.75],["EXTREME / CRITICAL",1.0]] as const).map(([l,v]) => (
                          <button key={l} onClick={()=>setHpPrecision(v)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${hpPrecision===v?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Target Triangle Count */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">TARGET TRIANGLE COUNT</p>
                      <div className="flex gap-3 items-end">
                        <div className="flex-1">
                          <input type="number" min="0" disabled={hpTriUnsure} value={hpTriCount} onChange={e=>setHpTriCount(e.target.value)} placeholder="e.g. 50000" className="w-full bg-background border border-border rounded px-3 py-2 text-sm font-sans text-foreground focus:outline-none focus:border-copper/50 disabled:opacity-40" />
                        </div>
                        <button onClick={()=>setHpTriUnsure(!hpTriUnsure)} className={`px-4 py-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${hpTriUnsure?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>I'M NOT SURE</button>
                      </div>
                    </div>

                    {/* Supporting Parts */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">SUPPORTING PARTS</p>
                      <div className="grid grid-cols-3 gap-2">
                        {(["YES","NO","UNSURE"] as const).map(k => (
                          <button key={k} onClick={()=>setHpSupporting(k)} className={`py-3 rounded text-[10px] tracking-[0.1em] uppercase font-sans font-bold border transition-colors ${hpSupporting===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{k}</button>
                        ))}
                      </div>
                      {hpSupporting === "YES" && (
                        <div className="mt-4">
                          <p className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground mb-2">UNIQUE PART COUNT</p>
                          <div className="grid grid-cols-4 gap-2">
                            {([["FEW","FEW (1–5)"],["MOD","MODERATE (6–15)"],["MANY","MANY (16–30)"],["VMANY","VERY MANY (30+)"]] as const).map(([k,l]) => (
                              <button key={k} onClick={()=>setHpPartsTier(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${hpPartsTier===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 11 Retopo / UV / Bake Intake */}
            <div>
              <SectionHeader num="11" title="RETOPO / UV / BAKE INTAKE" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">ENABLE RETOPO / UV / BAKE STAGE</p>
                    <p className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground mt-1">REQUIRES HIGH POLY STAGE TO BE ENABLED FOR ANCHOR BASE</p>
                  </div>
                  <Switch checked={rubEnabled} onCheckedChange={setRubEnabled} />
                </div>

                {rubEnabled && !hpEstimate && (
                  <div className="border border-copper/40 bg-copper/10 rounded p-3">
                    <p className="text-[10px] tracking-[0.05em] uppercase font-sans text-copper">ENABLE HIGH POLY INTAKE FIRST — RUB IS ANCHORED TO HP BASE VALUE.</p>
                  </div>
                )}

                {rubEnabled && (
                  <div className="space-y-6 pt-2 border-t border-border">
                    {/* Target Low Poly Tri Count */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">TARGET LOW POLY TRIANGLE COUNT</p>
                      <input type="number" min="0" value={rubLowTri} onChange={e=>setRubLowTri(e.target.value)} placeholder="e.g. 8000 — leave blank to match game-ready standard" className="w-full bg-background border border-border rounded px-3 py-2 text-sm font-sans text-foreground focus:outline-none focus:border-copper/50" />
                    </div>

                    {/* Topology Standard */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">TOPOLOGY STANDARD</p>
                      <div className="grid grid-cols-3 gap-2">
                        {([["GAME","GAME-READY (75%+ QUADS)"],["CLEAN","CLEAN PRODUCTION (95%+ QUADS)"],["ALLQUADS","ALL-QUADS / ANIMATION-READY"]] as const).map(([k,l]) => (
                          <button key={k} onClick={()=>setRubTopology(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${rubTopology===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Deformation Requirement */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">DEFORMATION REQUIREMENT</p>
                      <div className="grid grid-cols-4 gap-2">
                        {([["STATIC","STATIC / NO MOVEMENT"],["MECH","MECHANICAL / MOVING PARTS"],["ORGANIC","ORGANIC DEFORMATION"],["CHAR","CHARACTER / CREATURE"]] as const).map(([k,l]) => (
                          <button key={k} onClick={()=>setRubDeformation(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${rubDeformation===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Bake Quality */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">BAKE QUALITY</p>
                      <div className="grid grid-cols-4 gap-2">
                        {([["STD","STANDARD"],["HIGH","HIGH QUALITY"],["VHIGH","VERY HIGH / ARTIFACT-FREE"],["HERO","HERO QUALITY"]] as const).map(([k,l]) => (
                          <button key={k} onClick={()=>setRubBakeQuality(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${rubBakeQuality===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* UV Asset Type */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">UV ASSET TYPE</p>
                      <div className="grid grid-cols-4 gap-2">
                        {([["SIMPLE","SIMPLE HARD-SURFACE"],["STANDARD","STANDARD HARD-SURFACE"],["TECH","TECHNICAL HARD-SURFACE"],["ORGANIC","ORGANIC"]] as const).map(([k,l]) => (
                          <button key={k} onClick={()=>setRubUvAssetType(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${rubUvAssetType===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* UV Requirement */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">UV REQUIREMENT</p>
                      <div className="grid grid-cols-4 gap-2">
                        {([["BASIC","BASIC UNWRAP"],["CLEAN","CLEAN PACKING"],["TEXEL","CONSISTENT TEXEL DENSITY"],["UDIM","UDIM / MULTI-TILE"]] as const).map(([k,l]) => (
                          <button key={k} onClick={()=>setRubUvReq(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${rubUvReq===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Seam Requirement */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">SEAM REQUIREMENT</p>
                      <div className="grid grid-cols-4 gap-2">
                        {([["STD","SEAMS ARE FINE"],["REDUCED","MINIMIZE VISIBLE SEAMS"],["KEY","SEAMLESS IN KEY AREAS"],["TILING","FULLY SEAMLESS / TILING-CRITICAL"]] as const).map(([k,l]) => (
                          <button key={k} onClick={()=>setRubSeam(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${rubSeam===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 12 Texture Intake */}
            <div className="space-y-4">
              <SectionHeader num="12" title="TEXTURE INTAKE" />
              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">ENABLE TEXTURE STAGE</p>
                    <p className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground mt-1">REQUIRES HIGH POLY STAGE TO BE ENABLED FOR ANCHOR BASE</p>
                  </div>
                  <Switch checked={textureEnabled} onCheckedChange={setTextureEnabled} />
                </div>

                {textureEnabled && !hpEstimate && (
                  <div className="border border-copper/40 bg-copper/10 rounded p-3">
                    <p className="text-[10px] tracking-[0.05em] uppercase font-sans text-copper">ENABLE HIGH POLY INTAKE FIRST — TEXTURE IS ANCHORED TO HP BASE VALUE.</p>
                  </div>
                )}

                {textureEnabled && (
                  <div className="space-y-6 pt-2 border-t border-border">
                    {/* Set Count Tier */}
                    <div className="border border-border rounded p-4 bg-background/40">
                      <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-3">NUMBER OF TEXTURE SETS</p>
                      <div className="grid grid-cols-5 gap-2">
                        {([["1","1"],["2-3","2 TO 3"],["4-6","4 TO 6"],["7+","7+"],["UNSURE","UNSURE"]] as const).map(([k,l]) => (
                          <button key={k} onClick={()=>setTexSetCount(k)} className={`py-3 px-2 rounded text-[9px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${textureSetTier===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    {/* Per-Set Cards */}
                    {texSets.map((s) => (
                      <div key={s.id} className="border border-copper/30 rounded-lg bg-background/40 p-5 space-y-5">
                        <div className="flex items-center justify-between">
                          <input
                            value={s.label}
                            onChange={e=>updateTexSet(s.id, { label: e.target.value })}
                            className="bg-transparent border-b border-border focus:border-copper/60 text-[11px] tracking-[0.1em] uppercase font-sans font-bold text-foreground outline-none px-1 py-1 w-64"
                          />
                          {texSets.length > 1 && (
                            <button onClick={()=>removeTexSet(s.id)} className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground hover:text-copper">REMOVE</button>
                          )}
                        </div>

                        <div>
                          <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-2">TEXTURE TYPE</p>
                          <div className="grid grid-cols-4 gap-2">
                            {([["HS_CLEAN","HARD SURFACE — CLEAN"],["HS_WORN","HARD SURFACE — WORN"],["ORGANIC","ORGANIC"],["FABRIC","FABRIC / CLOTH"],["SKIN","SKIN"],["STYLIZED","STYLIZED / PAINTED"],["OTHER","OTHER"]] as const).map(([k,l]) => (
                              <button key={k} onClick={()=>updateTexSet(s.id,{type:k})} className={`py-2 px-2 rounded text-[8px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${s.type===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-2">COVERAGE</p>
                          <div className="grid grid-cols-4 gap-2">
                            {([["SMALL","SMALL — 10–25%"],["MED","MEDIUM — 25–50%"],["LARGE","LARGE — 50–75%"],["FULL","ENTIRE — 75–100%"]] as const).map(([k,l]) => (
                              <button key={k} onClick={()=>updateTexSet(s.id,{coverage:k})} className={`py-2 px-2 rounded text-[8px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${s.coverage===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-2">REQUIRED MAPS</p>
                          <div className="grid grid-cols-4 gap-2">
                            {([["BASE","BASE COLOR ONLY"],["BASE_RM","BASE + ROUGH / METAL"],["PBR","FULL PBR"],["PBR_PLUS","FULL PBR + AUTHORED DETAIL"]] as const).map(([k,l]) => (
                              <button key={k} onClick={()=>updateTexSet(s.id,{maps:k})} className={`py-2 px-2 rounded text-[8px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${s.maps===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-2">MANUAL WORK REQUIRED</p>
                          <div className="grid grid-cols-5 gap-2">
                            {([["NONE","NONE"],["LOW","LOW <25%"],["MOD","MODERATE 25–50%"],["HIGH","HIGH 50–75%"],["VHIGH","VERY HIGH 75–100%"]] as const).map(([k,l]) => (
                              <button key={k} onClick={()=>updateTexSet(s.id,{manual:k})} className={`py-2 px-2 rounded text-[8px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${s.manual===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-2">DETAIL SOURCE</p>
                          <div className="grid grid-cols-5 gap-2">
                            {([["BAKE","FROM BAKE"],["MBAKE","MOSTLY BAKE"],["MIX","MIXED"],["MAUTH","MOSTLY AUTHORED"],["FAUTH","FULLY AUTHORED"]] as const).map(([k,l]) => (
                              <button key={k} onClick={()=>updateTexSet(s.id,{detail:k})} className={`py-2 px-2 rounded text-[8px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${s.detail===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-2">VARIATION REQUIREMENT</p>
                          <div className="grid grid-cols-5 gap-2">
                            {([["UNIFORM","MOSTLY UNIFORM / TILING"],["LIGHT","LIGHT VARIATION"],["MOD","MODERATE VARIATION"],["HIGH","HIGH VARIATION"],["UNIQUE","FULLY UNIQUE"]] as const).map(([k,l]) => (
                              <button key={k} onClick={()=>updateTexSet(s.id,{variation:k})} className={`py-2 px-2 rounded text-[8px] tracking-[0.05em] uppercase font-sans font-bold border transition-colors ${s.variation===k?"border-copper bg-copper/20 text-copper":"border-border text-muted-foreground hover:border-copper/40"}`}>{l}</button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper mb-2">TEXTURE-SPECIFIC REFERENCES</p>
                          <label className="flex items-center justify-center gap-2 py-4 border border-dashed border-border rounded cursor-pointer hover:border-copper/60 transition-colors">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">UPLOAD REFERENCE IMAGES</span>
                            <input type="file" multiple className="hidden" />
                          </label>
                        </div>
                      </div>
                    ))}

                    <button onClick={addTexSet} className="w-full py-3 rounded border border-dashed border-copper/40 text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper hover:bg-copper/10 transition-colors">
                      + ADD ANOTHER TEXTURE SET
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-border rounded-lg bg-card/60 p-6 sticky top-[120px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-serif font-bold tracking-wider text-foreground uppercase">Command Summary</h3>
                <div className="w-5 h-5 border border-border rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-copper rounded-sm" />
                </div>
              </div>

              {/* Production Profile */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">PRODUCTION PROFILE</p>
                  <span className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-copper">● ACTIVE</span>
                </div>
                <div className="border border-border rounded bg-background/50 p-4 space-y-2">
                  {[
                    { label: "ASSET USAGE:", value: assetUsage },
                    { label: "PLATFORM:", value: targetEngine === "UNREAL ENGINE 5" ? "PC/CONSOLE" : "MOBILE/PC" },
                    { label: "TEXTURE SET:", value: `${textureSetCount}SET (${resolution.includes("4K") ? "4K" : resolution})` },
                    { label: "LOD COUNT:", value: lodConfig },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">{item.label}</span>
                      <span className="text-[9px] tracking-[0.05em] font-sans font-bold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Command Parameters */}
              <div className="mb-6">
                <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">COMMAND PARAMETERS</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[8px] tracking-[0.05em] font-sans text-muted-foreground mb-1">ASSET ROLE / PLATFORM</p>
                    <div className="flex gap-1 flex-wrap">
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">{assetUsage}</span>
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">PC/CONSOLE</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] tracking-[0.05em] font-sans text-muted-foreground mb-1">TEXTURE SETS / MATERIAL WORKFLOW</p>
                    <div className="flex gap-1 flex-wrap">
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">{textureSetCount} SET(S)</span>
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">{materialWorkflow}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] tracking-[0.05em] font-sans text-muted-foreground mb-1">LOD / VARIANTS</p>
                    <div className="flex gap-1 flex-wrap">
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">{lodConfig}</span>
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">NO VARIANTS</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] tracking-[0.05em] font-sans text-muted-foreground mb-1">PRODUCTION APPROACH</p>
                    <div className="flex gap-1 flex-wrap">
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">{bulkOrderTier}</span>
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">PRODUCTION-READY</span>
                      <span className="px-2 py-1 rounded text-[8px] font-sans font-bold bg-copper/20 text-copper border border-copper/30">{geometryReuse}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spec Completeness */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">SPEC COMPLETENESS</p>
                  <span className="text-[10px] font-sans font-bold text-copper flex items-center gap-1">
                    {specCompleteness}% <HelpCircle className="w-3 h-3 text-muted-foreground" />
                  </span>
                </div>
                <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-copper rounded-full transition-all" style={{ width: `${specCompleteness}%` }} />
                </div>
              </div>

              {/* Estimates */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">COMPLEXITY LEVEL</span>
                  <span className="text-[10px] font-sans font-bold text-foreground">LVL 04</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">ESTIMATED TIMELINE</span>
                  <span className="text-[10px] font-sans font-bold text-foreground">7-10 DAYS</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground block">ESTIMATED PRODUCTION RANGE</span>
                    <span className="text-[8px] font-sans text-muted-foreground">(PER ASSET)</span>
                  </div>
                  <span className="text-lg font-serif font-bold text-copper">$1,200 – $1,800</span>
                </div>
              </div>

              {/* High Poly Estimate */}
              {hpEstimate && (
                <div className="mb-6 border border-copper/30 rounded-lg bg-copper/5 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper">HIGH POLY STAGE</span>
                    <span className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground">CALCULATED</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">EST. HOURS</span>
                    <span className="text-[10px] font-sans font-bold text-foreground">{hpEstimate.hours.toFixed(1)} HRS</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">TARGET TRI COUNT</span>
                    <span className="text-[10px] font-sans font-bold text-foreground">{hpEstimate.finalTri.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-copper/20">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">HP VALUE</span>
                    <span className="text-lg font-serif font-bold text-copper">${hpEstimate.finalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              )}

              {/* RUB Estimate */}
              {rubEstimate && (
                <div className="mb-6 border border-copper/30 rounded-lg bg-copper/5 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper">RETOPO / UV / BAKE</span>
                    <span className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground">CALCULATED</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">EST. HOURS</span>
                    <span className="text-[10px] font-sans font-bold text-foreground">{rubEstimate.hours.toFixed(1)} HRS</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">TARGET LOW POLY</span>
                    <span className="text-[10px] font-sans font-bold text-foreground">{rubEstimate.lowTri.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-copper/20">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">RUB VALUE</span>
                    <span className="text-lg font-serif font-bold text-copper">${rubEstimate.finalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              )}

              {/* Texture Estimate */}
              {textureEstimate && (
                <div className="mb-6 border border-copper/30 rounded-lg bg-copper/5 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-copper">TEXTURE STAGE</span>
                    <span className="text-[9px] tracking-[0.05em] uppercase font-sans text-muted-foreground">CALCULATED</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">EST. HOURS</span>
                    <span className="text-[10px] font-sans font-bold text-foreground">{textureEstimate.hours.toFixed(1)} HRS</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">TEXTURE SETS</span>
                    <span className="text-[10px] font-sans font-bold text-foreground">{textureEstimate.perSet.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">CREATION</span>
                    <span className="text-[10px] font-sans font-bold text-foreground">${textureEstimate.creationCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.05em] font-sans text-muted-foreground">APPLICATION</span>
                    <span className="text-[10px] font-sans font-bold text-foreground">${textureEstimate.applicationCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-copper/20">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">TEXTURE VALUE</span>
                    <span className="text-lg font-serif font-bold text-copper">${textureEstimate.finalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              )}

              {/* CTA */}
              <button onClick={() => setGlobalModalOpen(true)} disabled={submitting} className="w-full py-4 rounded-lg text-sm tracking-[0.15em] uppercase font-sans font-bold flex items-center justify-center gap-3 bg-copper text-background hover:opacity-90 transition-opacity disabled:opacity-50">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "SUBMITTING..." : "CONTINUE TO FINAL REVIEW"}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Technical Support */}
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-copper/20 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-copper" />
                </div>
                <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">TECHNICAL SUPPORT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">RESONANT FORGE</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">TERMS OF SERVICE</span>
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">PRIVACY POLICY</span>
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">ASSET PIPELINE V4.2</span>
          </div>
          <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">© 2026 RESONANT FORGE STUDIOS. ALL RIGHTS RESERVED</span>
        </div>
      </div>

      {/* Global Project Intake Modal */}
      {globalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => !submitting && setGlobalModalOpen(false)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-copper/40 rounded-lg p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase font-sans text-copper mb-2">SECTION 13 / GLOBAL PROJECT INTAKE</p>
                <h2 className="text-2xl font-serif font-bold text-foreground">Final Project Conditions</h2>
                <p className="text-[11px] tracking-[0.05em] font-sans text-muted-foreground mt-2">A few last questions to finalize your project scope.</p>
              </div>
              <button onClick={() => !submitting && setGlobalModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none">×</button>
            </div>

            <div className="space-y-6">
              {/* Project Clarity */}
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground mb-3">PROJECT CLARITY</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ["VDETAIL", "Very detailed, everything defined"],
                    ["MOSTLY", "Mostly defined"],
                    ["PARTIAL", "Partially defined"],
                    ["ROUGH", "Very rough / exploratory"],
                  ] as const).map(([k, label]) => (
                    <button key={k} onClick={() => setGpClarity(k)} className={`text-left px-3 py-2.5 rounded border text-[10px] tracking-[0.05em] uppercase font-sans transition-colors ${gpClarity === k ? "border-copper bg-copper/10 text-copper" : "border-border bg-background/40 text-muted-foreground hover:border-copper/40"}`}>{label}</button>
                  ))}
                </div>
              </div>

              {/* Reference Quality */}
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground mb-3">REFERENCE QUALITY</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ["VCLEAR", "Very clear and usable"],
                    ["GOOD", "Good"],
                    ["MIXED", "Mixed"],
                    ["POOR", "Poor / unclear"],
                    ["NONE", "None"],
                  ] as const).map(([k, label]) => (
                    <button key={k} onClick={() => setGpReference(k)} className={`text-left px-3 py-2.5 rounded border text-[10px] tracking-[0.05em] uppercase font-sans transition-colors ${gpReference === k ? "border-copper bg-copper/10 text-copper" : "border-border bg-background/40 text-muted-foreground hover:border-copper/40"}`}>{label}</button>
                  ))}
                </div>
              </div>

              {/* Workflow Conditions */}
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground mb-3">WORKFLOW CONDITIONS</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ["VSMOOTH", "Very smooth"],
                    ["STD", "Standard"],
                    ["SOME", "Some complexity"],
                    ["DIFF", "Difficult"],
                    ["HIGH", "Highly complex"],
                  ] as const).map(([k, label]) => (
                    <button key={k} onClick={() => setGpWorkflow(k)} className={`text-left px-3 py-2.5 rounded border text-[10px] tracking-[0.05em] uppercase font-sans transition-colors ${gpWorkflow === k ? "border-copper bg-copper/10 text-copper" : "border-border bg-background/40 text-muted-foreground hover:border-copper/40"}`}>{label}</button>
                  ))}
                </div>
              </div>

              {/* Included Revisions */}
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground mb-3">INCLUDED REVISION COUNT</p>
                <div className="grid grid-cols-4 gap-2">
                  {(["0", "1", "2", "3+"] as const).map((k) => (
                    <button key={k} onClick={() => setGpRevisions(k)} className={`px-3 py-2.5 rounded border text-[11px] tracking-[0.1em] uppercase font-sans font-bold transition-colors ${gpRevisions === k ? "border-copper bg-copper/10 text-copper" : "border-border bg-background/40 text-muted-foreground hover:border-copper/40"}`}>{k}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
              <button onClick={() => setGlobalModalOpen(false)} disabled={submitting} className="flex-1 py-3 rounded-lg text-[10px] tracking-[0.15em] uppercase font-sans font-bold border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">CANCEL</button>
              <button onClick={async () => { await handleSubmitSpecifications(); setGlobalModalOpen(false); }} disabled={submitting} className="flex-[2] py-3 rounded-lg text-[10px] tracking-[0.15em] uppercase font-sans font-bold bg-copper text-background hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "SUBMITTING..." : "CONFIRM & SUBMIT"}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetFinalReview;
