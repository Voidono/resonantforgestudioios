import { useState } from "react";
import { Search, SlidersHorizontal, Filter, Settings, Plus } from "lucide-react";

const PIPELINE_STEPS = [
  "DIR CHECK", "BLOCKOUT", "HIGH POLY", "RETOPO", "UV MAP",
  "BAKING", "TEXTURING", "RIGGING", "ANIM", "VFX",
  "TECH ART", "OPTIM", "QA", "EXPORT",
];

interface Contributor {
  name: string;
  hours: number;
}

interface Project {
  id: string;
  name: string;
  studio: string;
  priority: "HIGH" | "CRITICAL" | "LOW" | "STANDARD";
  type: string;
  deadline: string;
  totalHours: number;
  budget: number;
  currentStep: number;
  contributors: Contributor[];
}

const mockProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "SCI-FI CRATE",
    studio: "IRON FORGE STUDIO",
    priority: "HIGH",
    type: "PROP",
    deadline: "MARCH 15, 2026",
    totalHours: 40,
    budget: 1200,
    currentStep: 6,
    contributors: [
      { name: "YANG XIAO", hours: 6 },
      { name: "DIEGO SUSANO", hours: 12 },
    ],
  },
  {
    id: "PRJ-002",
    name: "ALIEN CREATURE",
    studio: "XENOMORPH LABS",
    priority: "CRITICAL",
    type: "CHARACTER",
    deadline: "APRIL 02, 2026",
    totalHours: 120,
    budget: 4500,
    currentStep: 3,
    contributors: [
      { name: "LINA PARK", hours: 24 },
      { name: "MARCO REUS", hours: 20 },
    ],
  },
  {
    id: "PRJ-003",
    name: "INDUSTRIAL DOOR",
    studio: "IRON FORGE STUDIO",
    priority: "LOW",
    type: "ENVIRONMENT",
    deadline: "APRIL 20, 2026",
    totalHours: 16,
    budget: 400,
    currentStep: 4,
    contributors: [
      { name: "CHEN WEI", hours: 4 },
    ],
  },
];

const priorityColor: Record<string, string> = {
  HIGH: "bg-copper/20 text-copper border border-copper/30",
  CRITICAL: "bg-red-500/20 text-red-400 border border-red-500/30",
  LOW: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  STANDARD: "bg-muted text-muted-foreground border border-border",
};

const ForgeProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const totalLogged = (contributors: Contributor[]) =>
    contributors.reduce((sum, c) => sum + c.hours, 0);

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-serif font-bold tracking-[0.2em] text-copper">IN PRODUCTION</h1>
          <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground mt-1">
            ACTIVE PRODUCTION QUEUE
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="SEARCH ASSETS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card/40 border border-border rounded pl-9 pr-4 py-2 text-[10px] tracking-[0.1em] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-copper/40 w-56"
            />
          </div>
          <div className="text-right">
            <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">SORT BY</p>
            <p className="text-[11px] font-sans font-bold text-foreground">PRIORITY</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">PROJECT COUNT</p>
            <p className="text-base font-serif font-bold text-copper">
              {String(mockProjects.length).padStart(2, "0")} <span className="text-[10px] font-sans text-foreground">ACTIVE</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><Filter className="w-4 h-4" /></button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><SlidersHorizontal className="w-4 h-4" /></button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground"><Settings className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {mockProjects.map((project) => {
          const logged = totalLogged(project.contributors);
          return (
            <div
              key={project.id}
              className="border border-border/60 bg-card/30 rounded-lg p-5 hover:border-copper/20 transition-colors"
            >
              <div className="grid grid-cols-[1fr_auto] gap-6">
                {/* Left Content */}
                <div className="space-y-4">
                  {/* Title Row */}
                  <div className="flex items-start gap-3">
                    <div className="border-l-[3px] border-copper pl-3">
                      <h3 className="text-lg font-serif font-bold tracking-[0.1em] text-foreground">{project.name}</h3>
                      <p className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground mt-0.5">{project.studio}</p>
                    </div>
                    <span className={`text-[8px] tracking-[0.12em] uppercase font-sans font-bold px-2.5 py-1 rounded ${priorityColor[project.priority]}`}>
                      {project.priority}
                    </span>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">TOTAL TIME</p>
                      <p className="text-lg font-serif font-bold text-foreground">
                        {project.totalHours} <span className="text-[9px] font-sans text-muted-foreground">HOURS</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">BUDGET ALLOCATION</p>
                      <p className="text-lg font-serif font-bold text-foreground">
                        ${project.budget.toLocaleString()} <span className="text-[9px] font-sans text-muted-foreground">USD</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[7px] tracking-[0.12em] uppercase text-muted-foreground">CURRENT STAGE</p>
                      <p className="text-sm font-serif font-bold text-copper">
                        {PIPELINE_STEPS[project.currentStep]}{" "}
                        <span className="text-[9px] font-sans text-muted-foreground">
                          STEP {String(project.currentStep + 1).padStart(2, "0")} / {PIPELINE_STEPS.length}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Contributor Log */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[9px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">CONTRIBUTOR LOG</p>
                      <p className="text-[9px] tracking-[0.1em] font-sans text-muted-foreground">
                        TOTAL LOGGED <span className="text-copper font-bold">{logged} / {project.totalHours} HRS</span>
                      </p>
                    </div>
                    <div className="bg-background/60 border border-border/40 rounded p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <select className="flex-1 bg-card/60 border border-border rounded px-3 py-1.5 text-[10px] tracking-[0.1em] font-sans text-muted-foreground focus:outline-none focus:border-copper/40">
                          <option>SELECT CONTRIBUTOR</option>
                        </select>
                        <input
                          type="text"
                          placeholder="HRS"
                          className="w-16 bg-card/60 border border-border rounded px-3 py-1.5 text-[10px] tracking-[0.1em] font-sans text-foreground text-center focus:outline-none focus:border-copper/40"
                        />
                        <button className="p-1.5 bg-card/60 border border-border rounded text-muted-foreground hover:text-copper hover:border-copper/30 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {project.contributors.map((c, i) => (
                        <div key={i} className="flex items-center justify-between px-1 py-1">
                          <span className="text-[10px] tracking-[0.08em] font-sans text-foreground">{c.name}</span>
                          <span className="text-[10px] tracking-[0.08em] font-sans font-bold text-copper">{c.hours}H</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Type + Deadline + Pipeline */}
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
                        {PIPELINE_STEPS.map((step, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-5 rounded-sm flex items-center justify-center ${
                              i < project.currentStep
                                ? "bg-emerald-500/80"
                                : i === project.currentStep
                                ? "bg-yellow-500/80"
                                : "bg-card/60 border border-border/30"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-0.5 mt-0.5">
                        {PIPELINE_STEPS.map((step, i) => (
                          <p key={i} className="flex-1 text-[5px] tracking-[0.05em] text-center text-muted-foreground truncate">
                            {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Preview */}
                <div className="w-36 h-36 bg-card/40 border border-border/30 rounded flex items-center justify-center shrink-0">
                  <p className="text-[8px] tracking-[0.1em] uppercase text-muted-foreground">PREVIEW</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForgeProjects;
