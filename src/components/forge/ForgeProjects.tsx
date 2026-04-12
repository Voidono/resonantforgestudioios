import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Filter, Settings, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PIPELINE_STEPS = [
  "DIR CHECK", "BLOCKOUT", "HIGH POLY", "RETOPO", "UV MAP",
  "BAKING", "TEXTURING", "RIGGING", "ANIM", "VFX",
  "TECH ART", "OPTIM", "QA", "EXPORT",
];

interface Contributor {
  id: string;
  name: string;
  hours: number;
}

interface Project {
  id: string;
  name: string;
  client: string;
  priority: string;
  type: string;
  deadline: string;
  totalHours: number;
  budget: number;
  currentStep: number;
  contributors: Contributor[];
}

const priorityColor: Record<string, string> = {
  HIGH: "bg-copper/20 text-copper border border-copper/30",
  CRITICAL: "bg-red-500/20 text-red-400 border border-red-500/30",
  LOW: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  STANDARD: "bg-muted text-muted-foreground border border-border",
};

const ForgeProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContributor, setNewContributor] = useState<Record<string, { name: string; hours: string }>>({});

  const fetchProjects = async () => {
    setLoading(true);
    const { data: requests } = await supabase
      .from("asset_requests")
      .select("id, project_name, client_name, project_type, priority, deadline, total_hours, budget, current_step, status")
      .in("status", ["in_production", "active"])
      .order("created_at", { ascending: false });

    if (!requests) { setLoading(false); return; }

    const ids = requests.map(r => r.id);
    const { data: contributors } = await supabase
      .from("project_contributors")
      .select("id, project_id, contributor_name, hours")
      .in("project_id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);

    const contribMap: Record<string, Contributor[]> = {};
    (contributors || []).forEach(c => {
      if (!contribMap[c.project_id]) contribMap[c.project_id] = [];
      contribMap[c.project_id].push({ id: c.id, name: c.contributor_name, hours: Number(c.hours) });
    });

    setProjects(requests.map(r => ({
      id: r.id,
      name: r.project_name || `PROJECT #${r.id.slice(0, 6).toUpperCase()}`,
      client: r.client_name || "UNASSIGNED",
      priority: r.priority || "STANDARD",
      type: r.project_type || "ASSET",
      deadline: r.deadline ? new Date(r.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }).toUpperCase() : "TBD",
      totalHours: Number(r.total_hours) || 0,
      budget: Number(r.budget) || 0,
      currentStep: Number(r.current_step) || 0,
      contributors: contribMap[r.id] || [],
    })));
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const addContributor = async (projectId: string) => {
    const entry = newContributor[projectId];
    if (!entry?.name || !entry?.hours) return;
    const { error } = await supabase.from("project_contributors").insert({
      project_id: projectId,
      contributor_name: entry.name.toUpperCase(),
      hours: parseFloat(entry.hours),
    });
    if (error) { toast.error("Failed to add contributor"); return; }
    setNewContributor(prev => ({ ...prev, [projectId]: { name: "", hours: "" } }));
    fetchProjects();
    toast.success("Contributor added");
  };

  const totalLogged = (contributors: Contributor[]) =>
    contributors.reduce((sum, c) => sum + c.hours, 0);

  const filtered = projects.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-copper" />
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-serif font-bold tracking-[0.2em] text-copper">IN PRODUCTION</h1>
          <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground mt-1">ACTIVE PRODUCTION QUEUE</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="SEARCH ASSETS..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card/40 border border-border rounded pl-9 pr-4 py-2 text-[10px] tracking-[0.1em] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-copper/40 w-56" />
          </div>
          <div className="text-right">
            <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">PROJECT COUNT</p>
            <p className="text-base font-serif font-bold text-copper">
              {String(filtered.length).padStart(2, "0")} <span className="text-[10px] font-sans text-foreground">ACTIVE</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><Filter className="w-4 h-4" /></button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><SlidersHorizontal className="w-4 h-4" /></button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><Settings className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-border rounded-lg bg-card/40 p-12 text-center">
          <p className="text-sm font-sans text-muted-foreground">NO ACTIVE PROJECTS FOUND</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((project) => {
            const logged = totalLogged(project.contributors);
            const entry = newContributor[project.id] || { name: "", hours: "" };
            return (
              <div key={project.id} className="border border-border/60 bg-card/30 rounded-lg p-5 hover:border-copper/20 transition-colors">
                <div className="grid grid-cols-[1fr_auto] gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="border-l-[3px] border-copper pl-3">
                        <h3 className="text-lg font-serif font-bold tracking-[0.1em] text-foreground">{project.name}</h3>
                        <p className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground mt-0.5">{project.client}</p>
                      </div>
                      <span className={`text-[8px] tracking-[0.12em] uppercase font-sans font-bold px-2.5 py-1 rounded ${priorityColor[project.priority] || priorityColor.STANDARD}`}>
                        {project.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">TOTAL TIME</p>
                        <p className="text-lg font-serif font-bold text-foreground">{project.totalHours} <span className="text-[9px] font-sans text-muted-foreground">HOURS</span></p>
                      </div>
                      <div>
                        <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">BUDGET ALLOCATION</p>
                        <p className="text-lg font-serif font-bold text-foreground">${project.budget.toLocaleString()} <span className="text-[9px] font-sans text-muted-foreground">USD</span></p>
                      </div>
                      <div>
                        <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">CURRENT STAGE</p>
                        <p className="text-sm font-serif font-bold text-copper">
                          {PIPELINE_STEPS[project.currentStep] || "N/A"}{" "}
                          <span className="text-[9px] font-sans text-muted-foreground">STEP {String(project.currentStep + 1).padStart(2, "0")} / {PIPELINE_STEPS.length}</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[9px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">CONTRIBUTOR LOG</p>
                        <p className="text-[9px] tracking-[0.1em] font-sans text-muted-foreground">
                          TOTAL LOGGED <span className="text-copper font-bold">{logged} / {project.totalHours} HRS</span>
                        </p>
                      </div>
                      <div className="bg-background/60 border border-border/40 rounded p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="text" placeholder="CONTRIBUTOR NAME" value={entry.name}
                            onChange={(e) => setNewContributor(prev => ({ ...prev, [project.id]: { ...entry, name: e.target.value } }))}
                            className="flex-1 bg-card/60 border border-border rounded px-3 py-1.5 text-[10px] tracking-[0.1em] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-copper/40" />
                          <input type="number" placeholder="HRS" value={entry.hours}
                            onChange={(e) => setNewContributor(prev => ({ ...prev, [project.id]: { ...entry, hours: e.target.value } }))}
                            className="w-16 bg-card/60 border border-border rounded px-3 py-1.5 text-[10px] tracking-[0.1em] font-sans text-foreground text-center focus:outline-none focus:border-copper/40" />
                          <button onClick={() => addContributor(project.id)} className="p-1.5 bg-card/60 border border-border rounded text-muted-foreground hover:text-copper hover:border-copper/30 transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {project.contributors.map((c) => (
                          <div key={c.id} className="flex items-center justify-between px-1 py-1">
                            <span className="text-[10px] tracking-[0.08em] font-sans text-foreground">{c.name}</span>
                            <span className="text-[10px] tracking-[0.08em] font-sans font-bold text-copper">{c.hours}H</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end gap-6">
                      <div>
                        <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">TYPE</p>
                        <p className="text-xs font-serif font-bold text-foreground">{project.type}</p>
                      </div>
                      <div>
                        <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">DEADLINE</p>
                        <p className="text-xs font-serif font-bold text-foreground">{project.deadline}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-0.5">
                          {PIPELINE_STEPS.map((_, i) => (
                            <div key={i} className={`flex-1 h-5 rounded-sm ${i < project.currentStep ? "bg-emerald-500/80" : i === project.currentStep ? "bg-yellow-500/80" : "bg-card/60 border border-border/30"}`} />
                          ))}
                        </div>
                        <div className="flex gap-0.5 mt-0.5">
                          {PIPELINE_STEPS.map((step, i) => (
                            <p key={i} className="flex-1 text-[5px] tracking-[0.05em] text-center text-muted-foreground truncate">{step}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-36 h-36 bg-card/40 border border-border/30 rounded flex items-center justify-center shrink-0">
                    <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">PREVIEW</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ForgeProjects;
