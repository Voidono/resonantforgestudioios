import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  requestId: string | null;
  onClose: () => void;
}

interface RequestRow {
  id: string;
  project_name: string | null;
  client_name: string | null;
  workflow_step: number | null;
  status: string;
  created_at: string;
  budget: number | null;
  total_hours: number | null;
  final_value: number | null;
  priority: string | null;
}

type AnyRow = Record<string, any>;

const Field = ({ label, value }: { label: string; value: any }) => {
  const display =
    value === null || value === undefined || value === "" ? (
      <span className="text-muted-foreground/60">—</span>
    ) : typeof value === "boolean" ? (
      <span className={value ? "text-copper" : "text-muted-foreground"}>{value ? "ON" : "OFF"}</span>
    ) : typeof value === "object" ? (
      <pre className="text-[10px] whitespace-pre-wrap font-mono text-foreground/80 leading-relaxed">{JSON.stringify(value, null, 2)}</pre>
    ) : (
      String(value)
    );
  return (
    <div className="border border-border/60 rounded bg-background/40 p-3">
      <p className="text-[8px] tracking-[0.15em] uppercase font-sans font-bold text-muted-foreground mb-1">{label}</p>
      <div className="text-[11px] font-sans text-foreground break-words">{display}</div>
    </div>
  );
};

const SectionHead = ({ num, title }: { num: string; title: string }) => (
  <div className="flex items-center gap-3 mb-3 mt-5">
    <div className="w-2 h-2 rounded-sm bg-copper" />
    <span className="text-copper text-[10px] tracking-[0.15em] font-sans font-bold">{num}</span>
    <span className="text-[11px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">{title}</span>
    <div className="flex-1 h-px bg-border" />
  </div>
);

const ForgeIntakeDetailDrawer = ({ requestId, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<RequestRow | null>(null);
  const [items, setItems] = useState<AnyRow[]>([]);
  const [specs, setSpecs] = useState<AnyRow[]>([]);

  useEffect(() => {
    if (!requestId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{ data: req }, { data: it }, { data: sp }] = await Promise.all([
        supabase.from("asset_requests").select("*").eq("id", requestId).maybeSingle(),
        supabase.from("asset_request_items").select("*").eq("request_id", requestId).order("asset_number", { ascending: true }),
        supabase.from("asset_specifications").select("*").eq("request_id", requestId),
      ]);
      if (cancelled) return;
      setRequest(req as any);
      setItems(it || []);
      setSpecs(sp || []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [requestId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!requestId) return null;

  // Pull global intake from any spec's pipeline_config
  const firstPipe = specs[0]?.pipeline_config || {};
  const globalIntake = firstPipe?.global || null;
  const specsByItem = new Map<string, AnyRow>();
  specs.forEach((s) => { if (s.asset_item_id) specsByItem.set(s.asset_item_id, s); });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl h-full bg-background border-l border-copper/30 shadow-2xl flex flex-col">
        {/* Sticky header */}
        <div className="border-b border-border bg-card/60 backdrop-blur p-5 flex items-start justify-between">
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-sans font-bold text-copper mb-1">
              {request?.client_name || "UNKNOWN CLIENT"}
            </p>
            <h2 className="text-xl font-serif font-bold tracking-wider text-foreground">
              {request?.project_name || (requestId && `INTAKE #${requestId.slice(0, 6).toUpperCase()}`)}
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-[10px] tracking-[0.1em] uppercase font-sans">
              <span className="text-muted-foreground">STEP <span className="text-copper font-bold">{String(request?.workflow_step ?? 1).padStart(2, "0")}/06</span></span>
              <span className="text-muted-foreground">STATUS <span className="text-foreground font-bold">{request?.status?.toUpperCase() || "—"}</span></span>
              <span className="text-muted-foreground">PRIORITY <span className="text-foreground font-bold">{request?.priority || "—"}</span></span>
              <span className="text-muted-foreground">ASSETS <span className="text-copper font-bold">{items.length}</span></span>
              <span className="text-muted-foreground">SUBMITTED <span className="text-foreground font-bold">{request?.created_at ? new Date(request.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }).toUpperCase() : "—"}</span></span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded border border-border hover:border-copper/50 transition-colors">
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-copper" />
            </div>
          ) : (
            <>
              {/* Global Project Intake */}
              {globalIntake && (
                <div className="border border-copper/40 rounded-lg bg-copper/5 p-4 mb-6">
                  <SectionHead num="00" title="GLOBAL PROJECT INTAKE" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Field label="CLARITY" value={globalIntake.clarity} />
                    <Field label="REFERENCE QUALITY" value={globalIntake.reference} />
                    <Field label="WORKFLOW" value={globalIntake.workflow} />
                    <Field label="REVISIONS" value={globalIntake.revisions} />
                  </div>
                </div>
              )}

              {items.length === 0 ? (
                <div className="border border-border rounded-lg bg-card/40 p-10 text-center">
                  <p className="text-sm font-sans text-muted-foreground">NO ASSET BOXES SUBMITTED</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => {
                    const spec = specsByItem.get(item.id) ?? specs[idx] ?? null;
                    const pipe = spec?.pipeline_config || {};
                    return (
                      <div key={item.id} className="border border-border rounded-lg bg-card/40 p-5">
                        {/* Box header */}
                        <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-copper border border-copper rounded px-2 py-0.5 text-[10px] font-serif font-bold tracking-wider">
                              ASSET {item.asset_number}
                            </span>
                            <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">
                              SIZE {item.size}
                            </span>
                            {item.category && (
                              <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                                {item.category}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              ["FULL PROD", item.full_production],
                              ["RIG", item.rigging],
                              ["ANIM", item.animation],
                              ["VFX", item.vfx],
                              ["REF SEARCH", item.reference_search],
                            ].map(([l, v]) => (
                              <span key={l as string} className={`text-[8px] tracking-[0.12em] uppercase font-sans font-bold px-2 py-0.5 rounded border ${v ? "border-copper text-copper bg-copper/10" : "border-border text-muted-foreground/60"}`}>
                                {l as string}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Intake item fields */}
                        <SectionHead num="01" title="CLIENT INTAKE" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Field label="STUDIO CODE" value={item.studio_code} />
                          <Field label="REQUESTED ARTIST" value={item.requested_artist} />
                          <Field label="WORKED BEFORE" value={item.worked_before} />
                          <Field label="PROJECT DESCRIPTOR" value={item.project_descriptor} />
                          <Field label="ITERATIONS" value={item.iterations} />
                          <Field label="DESCRIPTION" value={item.project_description} />
                          <div className="col-span-full"><Field label="STAGE TOGGLES" value={item.stage_toggles} /></div>
                        </div>

                        {!spec ? (
                          <div className="mt-4 border border-border/60 rounded bg-background/40 p-4 text-center">
                            <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground">NO SPECIFICATION RECORDED</p>
                          </div>
                        ) : (
                          <>
                            <SectionHead num="02" title="VISUAL & STYLE" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="STYLE DIRECTION" value={spec.style_direction} />
                              <Field label="REFERENCE COMPLETENESS" value={spec.reference_completeness} />
                              <Field label="VISUAL NOTES" value={spec.visual_notes} />
                            </div>

                            <SectionHead num="03" title="PRODUCTION CONTEXT" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="ASSET USAGE" value={spec.asset_usage} />
                              <Field label="ASSET ROLE" value={spec.asset_role} />
                              <Field label="CAMERA DISTANCE" value={spec.camera_distance} />
                              <Field label="ENV KIT" value={spec.env_kit} />
                              <Field label="MODULAR KIT" value={spec.modular_kit} />
                            </div>

                            <SectionHead num="04" title="GEOMETRY & BUILD" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="FIDELITY" value={spec.fidelity} />
                              <Field label="POLYCOUNT" value={spec.polycount_range} />
                              <Field label="LOD CONFIG" value={spec.lod_config} />
                              <Field label="SURFACE DETAIL" value={spec.surface_detail} />
                              <Field label="MODULAR" value={spec.modular} />
                              <Field label="SCALE" value={spec.scale} />
                              <Field label="PIVOT" value={spec.pivot_orientation} />
                              <div className="col-span-full"><Field label="GAMEPLAY INTERACTION" value={spec.gameplay_interaction} /></div>
                            </div>

                            <SectionHead num="05" title="MATERIAL & TEXTURE" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="RESOLUTION" value={spec.texture_resolution} />
                              <Field label="TEX SET COUNT" value={spec.texture_set_count} />
                              <Field label="WORKFLOW" value={spec.material_workflow} />
                              <Field label="CHANNEL PACKED" value={spec.channel_packed} />
                              <Field label="NOTES" value={spec.material_notes} />
                              <div className="col-span-full"><Field label="MAP CHECKLIST" value={spec.map_checklist} /></div>
                            </div>

                            <SectionHead num="06" title="VARIANTS & STATES" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="# VARIATIONS" value={spec.num_variations} />
                              <Field label="VARIANT METHOD" value={spec.variant_method} />
                              <Field label="DESTRUCTION" value={spec.destruction_behavior} />
                              <Field label="NOTES" value={spec.variant_notes} />
                              <div className="col-span-full"><Field label="VARIANT TYPES" value={spec.variant_types} /></div>
                            </div>

                            <SectionHead num="07" title="RIGGING & ANIMATION" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="RIG TYPE" value={spec.rig_type} />
                              <Field label="ANIMATION COUNT" value={spec.animation_count} />
                              <Field label="VFX INTEGRATION" value={spec.vfx_integration} />
                              <Field label="NOTES" value={spec.rig_notes} />
                            </div>

                            <SectionHead num="08" title="PRODUCTION EFFICIENCY" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="BULK ORDER TIER" value={spec.bulk_order_tier} />
                              <Field label="ASSET CONSISTENCY" value={spec.asset_consistency} />
                              <Field label="REFERENCE QUALITY" value={spec.reference_quality} />
                              <Field label="GEOMETRY REUSE" value={spec.geometry_reuse} />
                            </div>

                            <SectionHead num="09" title="ENGINE & PIPELINE" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="TARGET ENGINE" value={spec.target_engine} />
                              <Field label="FILE FORMAT" value={spec.file_format} />
                              <Field label="DELIVERY TEX SETS" value={spec.delivery_texture_set_count} />
                              <Field label="DELIVERY WORKFLOW" value={spec.delivery_material_workflow} />
                              <div className="col-span-full"><Field label="PIPELINE CONFIG" value={pipe.pipelineConfig || pipe} /></div>
                            </div>

                            <SectionHead num="10" title="DELIVERY" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              <Field label="PRIORITY" value={spec.priority} />
                              <Field label="DELIVERY TYPE" value={spec.delivery_type} />
                              <Field label="DELIVERY FORMAT" value={spec.delivery_format} />
                              <Field label="NOTES" value={spec.delivery_notes} />
                              <div className="col-span-full"><Field label="DELIVERABLES" value={spec.deliverables} /></div>
                            </div>

                            {pipe.hp?.enabled && (
                              <>
                                <SectionHead num="11" title="HIGH POLY INTAKE" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  <Field label="ASSET TYPE" value={pipe.hp.assetType} />
                                  <Field label="LENGTH (M)" value={pipe.hp.length} />
                                  <Field label="WIDTH (M)" value={pipe.hp.width} />
                                  <Field label="HEIGHT (M)" value={pipe.hp.height} />
                                  <Field label="SHAPE COMPLEXITY" value={pipe.hp.shapeComplexity} />
                                  <Field label="DETAIL DENSITY" value={pipe.hp.detailDensity} />
                                  <Field label="PRECISION" value={pipe.hp.precision} />
                                  <Field label="TARGET TRI COUNT" value={pipe.hp.triUnsure ? "UNSURE" : pipe.hp.targetTriCount} />
                                  <Field label="SUPPORTING PARTS" value={pipe.hp.supporting} />
                                  <Field label="PARTS TIER" value={pipe.hp.partsTier} />
                                </div>
                                {pipe.hp.estimate && (
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    <Field label="HP $ VALUE" value={`$${Number(pipe.hp.estimate.finalValue).toFixed(2)}`} />
                                    <Field label="HP HOURS" value={Number(pipe.hp.estimate.hours).toFixed(2)} />
                                    <Field label="MMC" value={Number(pipe.hp.estimate.MMC).toFixed(2)} />
                                    <Field label="FINAL TRIS" value={pipe.hp.estimate.finalTri} />
                                  </div>
                                )}
                              </>
                            )}
                            {pipe.rub?.enabled && (
                              <>
                                <SectionHead num="12" title="RETOPO / UV / BAKE" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  <Field label="LOW TRI TARGET" value={pipe.rub.lowTri} />
                                  <Field label="TOPOLOGY" value={pipe.rub.topology} />
                                  <Field label="DEFORMATION" value={pipe.rub.deformation} />
                                  <Field label="BAKE QUALITY" value={pipe.rub.bakeQuality} />
                                  <Field label="UV ASSET TYPE" value={pipe.rub.uvAssetType} />
                                  <Field label="UV REQUIREMENT" value={pipe.rub.uvRequirement} />
                                  <Field label="SEAM REQUIREMENT" value={pipe.rub.seamRequirement} />
                                </div>
                                {pipe.rub.estimate && (
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    <Field label="RUB $ VALUE" value={`$${Number(pipe.rub.estimate.finalValue).toFixed(2)}`} />
                                    <Field label="RUB HOURS" value={Number(pipe.rub.estimate.hours).toFixed(2)} />
                                    <Field label="RETOPO FACTOR" value={Number(pipe.rub.estimate.retopoFactor).toFixed(3)} />
                                    <Field label="UV FACTOR" value={Number(pipe.rub.estimate.uvFactor).toFixed(3)} />
                                    <Field label="BAKE FACTOR" value={Number(pipe.rub.estimate.bakeFactor).toFixed(3)} />
                                  </div>
                                )}
                              </>
                            )}
                            {pipe.texture?.enabled && (
                              <>
                                <SectionHead num="13" title="TEXTURE SETS" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  <Field label="SET TIER" value={pipe.texture.setTier} />
                                  <Field label="SET COUNT" value={pipe.texture.sets?.length} />
                                </div>
                                <div className="space-y-2 mt-3">
                                  {(pipe.texture.sets || []).map((s: any) => (
                                    <div key={s.id} className="border border-border/60 rounded bg-background/40 p-3">
                                      <p className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-copper mb-2">{s.label}</p>
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        <Field label="TYPE" value={s.type} />
                                        <Field label="COVERAGE" value={s.coverage} />
                                        <Field label="MAPS" value={s.maps} />
                                        <Field label="MANUAL" value={s.manual} />
                                        <Field label="DETAIL SOURCE" value={s.detail} />
                                        <Field label="VARIATION" value={s.variation} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {pipe.texture.estimate && (
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    <Field label="TEX $ VALUE" value={`$${Number(pipe.texture.estimate.finalValue).toFixed(2)}`} />
                                    <Field label="TEX HOURS" value={Number(pipe.texture.estimate.hours).toFixed(2)} />
                                    <Field label="CREATION COST" value={`$${Number(pipe.texture.estimate.creationCost).toFixed(2)}`} />
                                    <Field label="APPLICATION COST" value={`$${Number(pipe.texture.estimate.applicationCost).toFixed(2)}`} />
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgeIntakeDetailDrawer;
