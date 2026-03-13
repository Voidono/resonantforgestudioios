import { useNavigate } from "react-router-dom";
import { Construction, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-lg w-full text-center">
          {/* Corner-dot card */}
          <div className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-10 md:p-14">
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-lg bg-copper/10 border border-copper/30 flex items-center justify-center">
                <Construction className="w-8 h-8" style={{ color: "hsl(var(--copper))" }} />
              </div>
            </div>

            <p className="text-[10px] tracking-[0.3em] uppercase font-sans mb-3" style={{ color: "hsl(var(--copper))" }}>
              MODULE STATUS: FABRICATION
            </p>

            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wider text-foreground mb-3">
              UNDER CONSTRUCTION
            </h1>
            <div className="h-0.5 w-12 mx-auto mb-6" style={{ backgroundColor: "hsl(var(--copper))" }} />

            <p className="text-muted-foreground font-sans leading-relaxed mb-8">
              This module is currently being forged. Our systems are assembling the infrastructure required to bring this section online.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "hsl(var(--copper))" }} />
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
                ETA: PENDING ALLOCATION
              </span>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border border-border hover:border-copper/40 text-foreground rounded transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              RETURN TO PREVIOUS MODULE
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UnderConstruction;
