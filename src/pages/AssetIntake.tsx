import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Search, Upload, PlusSquare, FolderOpen, AtSign, ChevronUp, Lock } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";

const categories = ["ENVIRONMENT", "CHARACTER", "CREATURE", "MISC"];

const pipelineStages = ["BLOCKOUT", "HIGH POLY", "RETOPO / UV", "TEXTURING"];

const AssetIntake = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workedBefore, setWorkedBefore] = useState<boolean | null>(null);
  const [studioCode, setStudioCode] = useState("");
  const [requestedArtist, setRequestedArtist] = useState("");
  const [projectDescriptor, setProjectDescriptor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [projectDescription, setProjectDescription] = useState("");
  const [referenceSearch, setReferenceSearch] = useState(true);
  const [rigging, setRigging] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [vfx, setVfx] = useState(false);
  const [fullProduction, setFullProduction] = useState(false);
  const [stageToggles, setStageToggles] = useState<Record<string, boolean>>({});
  const [iterations, setIterations] = useState([0]);

  const handleFinalize = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate("/submission-confirmation");
  };

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
              <ArrowRight className="w-4 h-4" style={{ color: "hsl(var(--background))" }} />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground">RESONANT FORGE</h2>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                ASSET INTAKE SYSTEM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { icon: PlusSquare, label: "INTAKE", active: true, path: "/asset-intake" },
              { icon: FolderOpen, label: "ASSETS", active: false, path: "/operations-hub" },
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

          <span className="text-[10px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            STAGE 2 <span className="font-bold text-foreground">DETAILED INSTRUCTION</span>
          </span>
        </div>
      </div>

      <section className="flex-1 px-4 md:px-8 py-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Client Authentication */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">
                  CLIENT AUTHENTICATION
                </span>
              </div>

              <div className="border border-border rounded-lg bg-card/40 p-6 space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-3">
                    HAVE YOU WORKED WITH US BEFORE?
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setWorkedBefore(true)}
                      className={`flex items-center gap-2 text-xs font-sans font-medium ${
                        workedBefore === true ? "" : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-sm border flex items-center justify-center"
                        style={{
                          borderColor: workedBefore === true ? "hsl(var(--copper))" : "hsl(var(--border))",
                          backgroundColor: workedBefore === true ? "hsl(var(--copper))" : "transparent",
                        }}
                      >
                        {workedBefore === true && <span className="text-[8px] text-background">✓</span>}
                      </div>
                      YES
                    </button>
                    <button
                      onClick={() => setWorkedBefore(false)}
                      className={`flex items-center gap-2 text-xs font-sans font-medium ${
                        workedBefore === false ? "" : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-sm border flex items-center justify-center"
                        style={{
                          borderColor: workedBefore === false ? "hsl(var(--border))" : "hsl(var(--border))",
                        }}
                      />
                      NO
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">
                    STUDIO NAME SEARCH
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      value={studioCode}
                      onChange={(e) => setStudioCode(e.target.value)}
                      placeholder="Enter Studio Identification Code..."
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold mb-2" style={{ color: "hsl(var(--copper))" }}>
                    REQUESTED ARTIST(S) [OPTIONAL]
                  </p>
                  <input
                    type="text"
                    value={requestedArtist}
                    onChange={(e) => setRequestedArtist(e.target.value)}
                    placeholder="Enter specific personnel requested for this engagement..."
                    className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50"
                  />
                </div>
              </div>
            </div>

            {/* Project Identity */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">
                  PROJECT IDENTITY
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">
                    PROJECT DESCRIPTOR
                  </p>
                  <input
                    type="text"
                    value={projectDescriptor}
                    onChange={(e) => setProjectDescriptor(e.target.value)}
                    placeholder="Enter Asset Identification..."
                    className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50"
                  />
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">
                    ASSET CATEGORY SELECTION
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                        className={`py-2.5 rounded border text-[10px] tracking-[0.1em] uppercase font-sans font-medium transition-colors ${
                          selectedCategory === cat
                            ? "border-copper/60 text-foreground"
                            : "border-border text-muted-foreground hover:border-copper/30"
                        }`}
                        style={selectedCategory === cat ? { backgroundColor: "hsl(var(--copper) / 0.1)" } : {}}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">
                      ASSET REFERENCE
                    </p>
                    <div className="border-2 border-dashed border-border rounded-lg aspect-square flex flex-col items-center justify-center gap-2 hover:border-copper/30 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6" style={{ color: "hsl(var(--copper))" }} />
                      <span className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground">
                        UPLOAD REFERENCE
                      </span>
                      <span className="text-[9px] text-muted-foreground">DRAG & DROP VISUAL DATA</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-foreground mb-2">
                      PROJECT DESCRIPTION
                    </p>
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Enter detailed operational requirements and asset specifications..."
                      className="w-full h-full min-h-[140px] bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pipeline Stages */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">
                  PIPELINE STAGES
                </span>
              </div>

              <div className="border border-border rounded-lg bg-card/40 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">
                      FULL ASSET PRODUCTION
                    </h3>
                    <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                      END-TO-END ASSET WORKFLOW ENGAGEMENT
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={fullProduction} onCheckedChange={setFullProduction} />
                    <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-0">
                  {pipelineStages.map((stage) => (
                    <div key={stage} className="flex items-center justify-between py-3 border-t border-border">
                      <span className="text-xs font-sans font-medium text-muted-foreground">{stage}</span>
                      <Switch
                        checked={fullProduction || stageToggles[stage] || false}
                        onCheckedChange={(v) => setStageToggles((p) => ({ ...p, [stage]: v }))}
                        disabled={fullProduction}
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
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">
                  PRE-PRODUCTION
                </span>
              </div>

              <div className="border border-border rounded-lg bg-card/40 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">
                      REFERENCE CREATION / SEARCH
                    </h3>
                    <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                      MOODBOARDING AND VISUAL LIBRARY DEVELOPMENT
                    </p>
                  </div>
                  <Switch checked={referenceSearch} onCheckedChange={setReferenceSearch} />
                </div>
              </div>
            </div>

            {/* Extended Production */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">
                  EXTENDED PRODUCTION
                </span>
              </div>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-4">
                ADDITIONAL MODULE CONFIGURATION
              </p>

              <div className="space-y-3">
                {[
                  { label: "RIGGING", desc: "COMPLEX SKELETAL SYSTEMS", state: rigging, set: setRigging },
                  { label: "ANIMATION", desc: "MOVEMENT & CYCLES", state: animation, set: setAnimation },
                  { label: "VFX", desc: "SHADERS & PARTICLES", state: vfx, set: setVfx },
                ].map((mod) => (
                  <div key={mod.label} className="border border-border rounded-lg bg-card/40 p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">{mod.label}</h3>
                      <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                        {mod.desc}
                      </p>
                    </div>
                    <Switch checked={mod.state} onCheckedChange={mod.set} />
                  </div>
                ))}
              </div>
            </div>

            {/* Iteration Allocation */}
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-serif font-bold tracking-wider text-foreground">
                    ITERATION ALLOCATION
                  </h3>
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                    REFINEMENT CYCLES PER STAGE
                  </p>
                </div>
                <span className="text-xl font-serif font-bold text-foreground">
                  {String(iterations[0]).padStart(2, "0")} UNITS
                </span>
              </div>
              <Slider
                value={iterations}
                onValueChange={setIterations}
                max={3}
                min={0}
                step={1}
                className="w-full"
              />
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
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-1">
                    ESTIMATED RANGE
                  </p>
                  <p className="text-3xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                    $0 - $0
                  </p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mb-1">
                    TARGET TIMELINE
                  </p>
                  <p className="text-2xl font-serif font-bold text-foreground">0 Days</p>
                </div>
              </div>
            </div>

            {/* Finalize */}
            <button
              onClick={handleFinalize}
              className="w-full py-5 rounded-lg text-sm md:text-base tracking-[0.15em] uppercase font-sans font-bold flex items-center justify-center gap-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
            >
              FINALIZE INTAKE
              <ArrowRight className="w-5 h-5" />
            </button>

            {!user && (
              <div className="flex items-start gap-2 px-1">
                <Lock className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "hsl(var(--copper))" }} />
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
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
              RESONANT FORGE STUDIO PORTAL // SYSTEM V2.4.0_STABLE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
              PING: 24MS
            </span>
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold" style={{ color: "hsl(var(--copper))" }}>
              ● SECURE HANDSHAKE ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetIntake;
