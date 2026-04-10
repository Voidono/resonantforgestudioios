import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, X } from "lucide-react";
import type { Developer, PipelinePhase } from "./DeveloperCard";

interface DeveloperFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  developer?: Developer | null;
  onSave: (data: Omit<Developer, "id" | "sort_order"> & { id?: string; sort_order?: number }) => void;
}

const DEFAULT_PIPELINE: PipelinePhase[] = [
  { name: "PRE-PRODUCTION", items: [], active: false },
  { name: "FULL ASSET PRODUCTION", items: ["Blockout", "High Poly", "Retopo / UV", "Texturing"], active: true },
  { name: "EXTENDED PRODUCTION", items: [], active: false },
];

const DeveloperFormDialog = ({ open, onOpenChange, developer, onSave }: DeveloperFormDialogProps) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("systems");
  const [pipeline, setPipeline] = useState<PipelinePhase[]>(DEFAULT_PIPELINE);
  const [showPipeline, setShowPipeline] = useState(false);

  useEffect(() => {
    if (developer) {
      setName(developer.name);
      setRole(developer.role);
      setDescription(developer.description);
      setCategory(developer.category);
      setShowPipeline(!!developer.pipeline_data);
      setPipeline(developer.pipeline_data || DEFAULT_PIPELINE);
    } else {
      setName("");
      setRole("");
      setDescription("");
      setCategory("systems");
      setShowPipeline(false);
      setPipeline(DEFAULT_PIPELINE);
    }
  }, [developer, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(developer ? { id: developer.id, sort_order: developer.sort_order } : {}),
      name: name.toUpperCase(),
      role: role.toUpperCase(),
      description,
      category,
      pipeline_data: showPipeline ? pipeline : null,
    });
  };

  const updatePhase = (idx: number, updates: Partial<PipelinePhase>) => {
    setPipeline((prev) => prev.map((p, i) => (i === idx ? { ...p, ...updates } : p)));
  };

  const addItem = (phaseIdx: number) => {
    setPipeline((prev) =>
      prev.map((p, i) =>
        i === phaseIdx ? { ...p, items: [...(p.items || []), "New Item"] } : p
      )
    );
  };

  const removeItem = (phaseIdx: number, itemIdx: number) => {
    setPipeline((prev) =>
      prev.map((p, i) =>
        i === phaseIdx ? { ...p, items: (p.items || []).filter((_, j) => j !== itemIdx) } : p
      )
    );
  };

  const updateItem = (phaseIdx: number, itemIdx: number, value: string) => {
    setPipeline((prev) =>
      prev.map((p, i) =>
        i === phaseIdx
          ? { ...p, items: (p.items || []).map((item, j) => (j === itemIdx ? value : item)) }
          : p
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif tracking-wider text-foreground">
            {developer ? "EDIT DEVELOPER" : "ADD DEVELOPER"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-[10px] tracking-[0.15em] uppercase font-sans">Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
          </div>

          <div>
            <Label className="text-[10px] tracking-[0.15em] uppercase font-sans">Role</Label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} required className="mt-1" />
          </div>

          <div>
            <Label className="text-[10px] tracking-[0.15em] uppercase font-sans">Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1" rows={3} />
          </div>

          <div>
            <Label className="text-[10px] tracking-[0.15em] uppercase font-sans">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="systems">Systems Analysis & Architecture</SelectItem>
                <SelectItem value="pipeline">Asset Production Pipeline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={showPipeline} onCheckedChange={setShowPipeline} />
            <Label className="text-[10px] tracking-[0.15em] uppercase font-sans">Pipeline Responsibilities</Label>
          </div>

          {showPipeline && (
            <div className="space-y-3 border border-border rounded p-3">
              {pipeline.map((phase, pi) => (
                <div key={pi} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={phase.active}
                      onCheckedChange={(active) => updatePhase(pi, { active })}
                    />
                    <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-foreground">
                      {phase.name}
                    </span>
                  </div>
                  {phase.active && (
                    <div className="pl-6 space-y-1">
                      {(phase.items || []).map((item, ii) => (
                        <div key={ii} className="flex items-center gap-1">
                          <Input
                            value={item}
                            onChange={(e) => updateItem(pi, ii, e.target.value)}
                            className="h-7 text-xs"
                          />
                          <button type="button" onClick={() => removeItem(pi, ii)} className="text-destructive p-1">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addItem(pi)}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-sans hover:opacity-80"
                        style={{ color: "hsl(var(--copper))" }}
                      >
                        <Plus className="w-3 h-3" /> Add Item
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-bold rounded border transition-opacity hover:opacity-90"
            style={{ borderColor: "hsl(var(--copper))", color: "hsl(var(--copper))" }}
          >
            {developer ? "SAVE CHANGES" : "ADD DEVELOPER"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperFormDialog;
