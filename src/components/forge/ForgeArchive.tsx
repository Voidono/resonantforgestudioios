import { useState } from "react";
import { Search, SlidersHorizontal, Filter, Eye, RotateCcw } from "lucide-react";

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

const mockArchive: ArchivedProject[] = [
  {
    id: "1",
    code: "#8821-H",
    name: "HEAVY INDUSTRIAL CHASSIS",
    client: "NOVA INTERACTIVE",
    type: "ENVIRONMENT",
    completedDate: "OCT 12, 2023",
    finalValue: 1200,
    profit: 360,
    estHours: 40,
    loggedHours: 42.5,
  },
  {
    id: "2",
    code: "#0044-K",
    name: "PROPULSION SYSTEM MODULE",
    client: "TITAN AEROSPACE",
    type: "ASSET",
    completedDate: "NOV 28, 2023",
    finalValue: 4500,
    profit: 1350,
    estHours: 120,
    loggedHours: 115.2,
  },
  {
    id: "3",
    code: "#0201-M",
    name: "MODULAR LOGISTICS TERMINAL",
    client: "CYBERDYNE LOGISTICS",
    type: "UI / LAYOUT",
    completedDate: "DEC 05, 2023",
    finalValue: 2850,
    profit: 855,
    estHours: 75,
    loggedHours: 74.8,
  },
];

const ForgeArchive = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const totalRevenue = mockArchive.reduce((s, p) => s + p.finalValue, 0);
  const totalProfit = mockArchive.reduce((s, p) => s + p.profit, 0);

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-serif font-bold tracking-[0.2em] text-copper">ARCHIVE</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="SEARCH COMPLETED ASSETS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card/40 border border-border rounded pl-9 pr-4 py-2 text-[10px] tracking-[0.1em] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-copper/40 w-64"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><Filter className="w-4 h-4" /></button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><SlidersHorizontal className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Summary Row */}
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

      {/* Archive Cards */}
      <div className="space-y-4">
        {mockArchive.map((project) => (
          <div
            key={project.id}
            className="border border-border/60 bg-card/30 rounded-lg p-5 hover:border-copper/20 transition-colors"
          >
            <div className="grid grid-cols-[1fr_auto] gap-6">
              {/* Left Content */}
              <div className="space-y-4">
                {/* Tags + Title */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] tracking-[0.12em] uppercase font-sans font-bold px-2.5 py-1 rounded bg-muted/60 text-muted-foreground border border-border/40">
                      ARCHIVED
                    </span>
                    <span className="text-[8px] tracking-[0.1em] font-sans text-muted-foreground">
                      ID: {project.code}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold tracking-[0.08em] text-foreground">{project.name}</h3>
                  <p className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground mt-0.5">
                    CLIENT: {project.client}
                  </p>
                </div>

                {/* Financial Row */}
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">FINAL VALUE</p>
                    <p className="text-xl font-serif font-bold text-foreground">
                      ${project.finalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[7px] tracking-[0.12em] uppercase text-copper font-bold">STUDIO PROFIT</p>
                    <p className="text-xl font-serif font-bold text-copper">
                      ${project.profit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                {/* Meta Row */}
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

              {/* Right Side: Preview + Actions */}
              <div className="flex flex-col items-end gap-3">
                <div className="w-36 h-24 bg-card/40 border border-border/30 rounded flex items-center justify-center">
                  <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">PREVIEW</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-card/60 border border-border/40 rounded text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                    <Eye className="w-3 h-3" /> OPEN PROJECT
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-card/60 border border-border/40 rounded text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                    <RotateCcw className="w-3 h-3" /> REOPEN
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status */}
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
