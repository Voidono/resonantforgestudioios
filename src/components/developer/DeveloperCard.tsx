import { Globe, Code, Share2, CheckCircle2, Pencil, Trash2 } from "lucide-react";

export interface PipelinePhase {
  name: string;
  items?: string[];
  active: boolean;
}

export interface Developer {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
  pipeline_data: PipelinePhase[] | null;
  sort_order: number;
}

interface DeveloperCardProps {
  dev: Developer;
  isAdmin?: boolean;
  onEdit?: (dev: Developer) => void;
  onDelete?: (dev: Developer) => void;
}

const DeveloperCard = ({ dev, isAdmin, onEdit, onDelete }: DeveloperCardProps) => (
  <div className="border border-border rounded-lg bg-card/60 backdrop-blur-sm p-6 mb-4 group relative">
    {isAdmin && (
      <div className="absolute top-3 right-14 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit?.(dev)}
          className="p-1.5 rounded hover:bg-secondary/60 transition-colors"
          style={{ color: "hsl(var(--copper))" }}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete?.(dev)}
          className="p-1.5 rounded hover:bg-destructive/20 transition-colors text-destructive"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    )}

    <div className="flex items-start justify-between mb-1">
      <div>
        <h3 className="text-sm md:text-base font-serif font-bold tracking-wider text-foreground">
          {dev.name}
        </h3>
        <p
          className="text-[10px] tracking-[0.15em] uppercase font-sans font-semibold"
          style={{ color: "hsl(var(--copper))" }}
        >
          {dev.role}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <Code className="w-4 h-4 text-muted-foreground" />
        <Share2 className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>

    <p className="text-xs text-muted-foreground leading-relaxed font-sans mt-3">{dev.description}</p>

    {dev.pipeline_data && dev.pipeline_data.length > 0 && (
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">
            PIPELINE RESPONSIBILITIES
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {dev.pipeline_data.map((phase) => (
            <div
              key={phase.name}
              className={`border rounded p-3 text-[9px] font-sans ${
                phase.active
                  ? "border-border bg-secondary/40"
                  : "border-border/50 bg-secondary/10 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="tracking-[0.1em] uppercase font-bold text-foreground">
                  {phase.name}
                </span>
                {phase.active && (
                  <CheckCircle2 className="w-3 h-3" style={{ color: "hsl(var(--copper))" }} />
                )}
              </div>
              {phase.items && phase.items.length > 0 && (
                <ul className="space-y-0.5">
                  {phase.items.map((item) => (
                    <li key={item} className="text-muted-foreground">
                      · {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default DeveloperCard;
