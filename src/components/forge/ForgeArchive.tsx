import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Filter, Eye, RotateCcw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ArchivedProject {
  id: string;
  code: string;
  name: string;
  client: string;
  type: string;
  completedDate: string;
  finalValue: number;
  profit: number;
  estHours: number;
  loggedHours: number;
}

const ForgeArchive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [archive, setArchive] = useState<ArchivedProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArchive = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("asset_requests")
      .select("id, project_name, client_name, project_type, completed_date, final_value, profit, est_hours, logged_hours")
      .eq("status", "completed")
      .order("completed_date", { ascending: false });

    setArchive((data || []).map(r => ({
      id: r.id,
      code: `#${r.id.slice(0, 4).toUpperCase()}-${r.id.slice(4, 5).toUpperCase()}`,
      name: r.project_name || `PROJECT #${r.id.slice(0, 6).toUpperCase()}`,
      client: r.client_name || "UNKNOWN",
      type: r.project_type || "ASSET",
      completedDate: r.completed_date ? new Date(r.completed_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }).toUpperCase() : "N/A",
      finalValue: Number(r.final_value) || 0,
      profit: Number(r.profit) || 0,
      estHours: Number(r.est_hours) || 0,
      loggedHours: Number(r.logged_hours) || 0,
    })));
    setLoading(false);
  };

  useEffect(() => { fetchArchive(); }, []);

  const handleReopen = async (id: string) => {
    const { error } = await supabase
      .from("asset_requests")
      .update({ status: "in_production", completed_date: null })
      .eq("id", id);
    if (error) { toast.error("Failed to reopen project"); return; }
    toast.success("Project reopened");
    fetchArchive();
  };

  const filtered = archive.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = filtered.reduce((s, p) => s + p.finalValue, 0);
  const totalProfit = filtered.reduce((s, p) => s + p.profit, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-copper" />
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-serif font-bold tracking-[0.2em] text-copper">ARCHIVE</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="SEARCH COMPLETED ASSETS..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card/40 border border-border rounded pl-9 pr-4 py-2 text-[10px] tracking-[0.1em] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-copper/40 w-64" />
          </div>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><Filter className="w-4 h-4" /></button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><SlidersHorizontal className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[8px] tracking-[0.12em] uppercase text-copper font-sans">ACTIVE REPOSITORY</p>
          <h2 className="text-lg font-serif font-bold tracking-[0.12em] text-foreground">VIRTUAL ASSET LOG</h2>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">TOTAL_REVENUE</p>
            <p className="text-lg font-serif font-bold text-copper">${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">TOTAL_PROFIT</p>
            <p className="text-lg font-serif font-bold text-copper">${totalProfit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-border rounded-lg bg-card/40 p-12 text-center">
          <p className="text-sm font-sans text-muted-foreground">NO ARCHIVED PROJECTS FOUND</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((project) => (
            <div key={project.id} className="border border-border/60 bg-card/30 rounded-lg p-5 hover:border-copper/20 transition-colors">
              <div className="grid grid-cols-[1fr_auto] gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[8px] tracking-[0.12em] uppercase font-sans font-bold px-2.5 py-1 rounded bg-muted/60 text-muted-foreground border border-border/40">ARCHIVED</span>
                      <span className="text-[8px] tracking-[0.1em] font-sans text-muted-foreground">ID: {project.code}</span>
                    </div>
                    <h3 className="text-base font-serif font-bold tracking-[0.08em] text-foreground">{project.name}</h3>
                    <p className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground mt-0.5">CLIENT: {project.client}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">FINAL VALUE</p>
                      <p className="text-xl font-serif font-bold text-foreground">${project.finalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-copper font-bold">STUDIO PROFIT</p>
                      <p className="text-xl font-serif font-bold text-copper">${project.profit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">TYPE</p>
                      <p className="text-xs font-serif font-bold text-foreground">{project.type}</p>
                    </div>
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">COMPLETED</p>
                      <p className="text-xs font-serif font-bold text-foreground">{project.completedDate}</p>
                    </div>
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">EST. HOURS</p>
                      <p className="text-xs font-serif font-bold text-foreground">{project.estHours.toFixed(1)}h</p>
                    </div>
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">LOGGED</p>
                      <p className="text-xs font-serif font-bold text-copper">{project.loggedHours.toFixed(1)}h</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="w-36 h-24 bg-card/40 border border-border/30 rounded flex items-center justify-center">
                    <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">PREVIEW</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-card/60 border border-border/40 rounded text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                      <Eye className="w-3 h-3" /> OPEN PROJECT
                    </button>
                    <button onClick={() => handleReopen(project.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-card/60 border border-border/40 rounded text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                      <RotateCcw className="w-3 h-3" /> REOPEN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between text-[8px] tracking-[0.12em] uppercase font-sans text-muted-foreground/50 border-t border-border/30 pt-4">
        <div className="flex items-center gap-6">
          <span>ARCHIVE_STATUS: SYNCHRONIZED</span>
          <span>SERVER: OPS_6_04</span>
          <span>ENCRYPTION: AES-256-TERM</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
          <span>TERMINAL_ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default ForgeArchive;
