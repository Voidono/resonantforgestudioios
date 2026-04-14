import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import DeveloperCard from "@/components/developer/DeveloperCard";
import type { Developer } from "@/components/developer/DeveloperCard";

const DeveloperRoster = () => {
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchDevelopers();
  }, []);

  const systemsDevs = developers.filter((d) => d.category === "systems");
  const pipelineDevs = developers.filter((d) => d.category === "pipeline");

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
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base" style={{ color: "hsl(var(--copper))" }}>⚙</span>
                  <h2 className="text-sm font-serif font-bold tracking-[0.15em] text-foreground uppercase">
                    SYSTEMS ANALYSIS & ARCHITECTURE
                  </h2>
                </div>
                <div className="h-px w-full bg-border mb-4" />
                {systemsDevs.map((dev) => (
                  <DeveloperCard key={dev.id} dev={dev} />
                ))}
              </div>

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
                  <DeveloperCard key={dev.id} dev={dev} />
                ))}
              </div>
            </div>

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

      <Footer />
    </div>
  );
};

export default DeveloperRoster;
