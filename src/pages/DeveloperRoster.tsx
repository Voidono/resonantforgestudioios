import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRole } from "@/hooks/useRole";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import DeveloperCard from "@/components/developer/DeveloperCard";
import DeveloperFormDialog from "@/components/developer/DeveloperFormDialog";
import type { Developer } from "@/components/developer/DeveloperCard";

const DeveloperRoster = () => {
  const navigate = useNavigate();
  const { hasAdminAccess } = useRole();
  const { toast } = useToast();
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDev, setEditingDev] = useState<Developer | null>(null);

  const fetchDevelopers = async () => {
    const { data, error } = await supabase
      .from("developers")
      .select("*")
      .order("sort_order");
    if (!error && data) {
      setDevelopers(data.map((d) => ({
        ...d,
        pipeline_data: d.pipeline_data as unknown as Developer["pipeline_data"],
      })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchDevelopers(); }, []);

  const systemsDevs = developers.filter((d) => d.category === "systems");
  const pipelineDevs = developers.filter((d) => d.category === "pipeline");

  const handleSave = async (data: Omit<Developer, "id" | "sort_order"> & { id?: string; sort_order?: number }) => {
    if (data.id) {
      const { error } = await supabase.from("developers").update({
        name: data.name,
        role: data.role,
        description: data.description,
        category: data.category,
        pipeline_data: data.pipeline_data as any,
      }).eq("id", data.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const maxOrder = developers.length > 0 ? Math.max(...developers.map((d) => d.sort_order)) + 1 : 0;
      const { error } = await supabase.from("developers").insert({
        name: data.name,
        role: data.role,
        description: data.description,
        category: data.category,
        pipeline_data: data.pipeline_data as any,
        sort_order: maxOrder,
      });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    setDialogOpen(false);
    setEditingDev(null);
    fetchDevelopers();
    toast({ title: data.id ? "Developer updated" : "Developer added" });
  };

  const handleDelete = async (dev: Developer) => {
    if (!confirm(`Remove ${dev.name} from the roster?`)) return;
    const { error } = await supabase.from("developers").delete().eq("id", dev.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    fetchDevelopers();
    toast({ title: "Developer removed" });
  };

  const handleEdit = (dev: Developer) => {
    setEditingDev(dev);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingDev(null);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mt-[72px]" />

      <section className="flex-1 px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full">
        <button
          onClick={() => navigate("/developer-hub")}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-sans font-medium mb-10 hover:opacity-80 transition-opacity"
          style={{ color: "hsl(var(--copper))" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wide text-foreground mb-4">
            CATEGORIZED ROSTER
          </h1>
          <div className="h-0.5 w-12 mx-auto mb-4" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <p className="text-sm md:text-base text-muted-foreground tracking-[0.1em] font-sans">
            B2B SPECIALIZATION & DEVELOPMENT CORE
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-20 text-sm font-sans tracking-wider">LOADING ROSTER...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Systems Analysis & Architecture */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base" style={{ color: "hsl(var(--copper))" }}>⚙</span>
                  <h2 className="text-sm font-serif font-bold tracking-[0.15em] text-foreground uppercase">
                    SYSTEMS ANALYSIS & ARCHITECTURE
                  </h2>
                </div>
                <div className="h-px w-full bg-border mb-4" />
                {systemsDevs.map((dev) => (
                  <DeveloperCard key={dev.id} dev={dev} isAdmin={hasAdminAccess} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>

              {/* Asset Production Pipeline */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base" style={{ color: "hsl(var(--copper))" }}>⚙</span>
                  <h2 className="text-sm font-serif font-bold tracking-[0.15em] text-foreground uppercase">
                    ASSET PRODUCTION PIPELINE
                  </h2>
                </div>
                <p
                  className="text-[9px] tracking-[0.15em] uppercase font-sans font-medium mb-1"
                  style={{ color: "hsl(var(--copper))" }}
                >
                  NOTE: THE PIPELINE RESPONSIBILITIES SECTION MIRROR THE ASSET PRODUCTION CONFIGURATION.
                </p>
                <div className="h-px w-full bg-border mb-4" />
                {pipelineDevs.map((dev) => (
                  <DeveloperCard key={dev.id} dev={dev} isAdmin={hasAdminAccess} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>

              {hasAdminAccess && (
                <button
                  onClick={handleAdd}
                  className="mt-6 flex items-center gap-2 px-5 py-3 text-xs tracking-[0.15em] uppercase font-sans font-bold rounded border transition-opacity hover:opacity-90"
                  style={{ borderColor: "hsl(var(--copper))", color: "hsl(var(--copper))" }}
                >
                  <Plus className="w-4 h-4" />
                  ADD DEVELOPER
                </button>
              )}
            </div>

            {/* Recruitment sidebar */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg bg-card/60 backdrop-blur-sm p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <UserPlus className="w-4 h-4" style={{ color: "hsl(var(--copper))" }} />
                  <h3 className="text-sm font-serif font-bold tracking-[0.15em] uppercase" style={{ color: "hsl(var(--copper))" }}>
                    RECRUITMENT
                  </h3>
                </div>
                <div className="text-center py-6">
                  <UserPlus className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="text-sm font-serif font-bold tracking-wider text-foreground mb-2">NO ACTIVE OPENINGS</h4>
                  <p className="text-[10px] text-muted-foreground tracking-[0.1em] uppercase font-sans leading-relaxed mb-6">
                    ALL TECHNICAL UNITS ARE CURRENTLY DEPLOYED.
                  </p>
                  <button
                    className="w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-bold rounded border transition-opacity hover:opacity-90"
                    style={{ borderColor: "hsl(var(--copper))", color: "hsl(var(--copper))" }}
                  >
                    JOIN WAITING LIST
                  </button>
                  <p className="text-[9px] text-muted-foreground tracking-[0.05em] uppercase font-sans leading-relaxed mt-4">
                    BE PRIORITIZED FOR NOTIFICATION WHEN THE NEXT TECHNICAL DEVELOPMENT CYCLE INITIATES.
                  </p>
                </div>
                <div className="h-px w-full bg-border mt-4 mb-3" />
                <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">STATUS: ROSTER FULL</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <DeveloperFormDialog
        open={dialogOpen}
        onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditingDev(null); }}
        developer={editingDev}
        onSave={handleSave}
      />

      <Footer />
    </div>
  );
};

export default DeveloperRoster;
