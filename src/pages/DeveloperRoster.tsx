import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, Code, Share2, CheckCircle2, UserPlus } from "lucide-react";
import Footer from "@/components/Footer";

interface PipelinePhase {
  name: string;
  items?: string[];
  active: boolean;
}

interface Developer {
  name: string;
  role: string;
  description: string;
  pipeline?: PipelinePhase[];
}

const systemsDevs: Developer[] = [
  {
    name: "ELIAS VANCE",
    role: "LEAD INFRASTRUCTURE ARCHITECT",
    description:
      "Specialist in distributed systems and high-availability cloud architecture. Over 12 years of experience deploying scalable microservices for AAA global gaming environments.",
  },
  {
    name: "DR. ARIA VOSS",
    role: "SENIOR SYSTEMS ANALYST",
    description:
      "Specializing in complexity theory and algorithmic optimization. Orchestrates large-scale data modeling and predictive logic for enterprise-tier B2B simulations.",
  },
];

const pipelineDevs: Developer[] = [
  {
    name: "SARAH CHEN",
    role: "DEVOPS PIPELINE ENGINEER",
    description:
      "Expert in CI/CD automation and container orchestration. Streamlines development cycles through robust toolchains and automated performance profiling systems.",
    pipeline: [
      { name: "PRE-PRODUCTION", items: [], active: false },
      { name: "FULL ASSET PRODUCTION", items: ["Blockout", "High Poly", "Retopo / UV", "Texturing"], active: true },
      { name: "EXTENDED PRODUCTION", items: [], active: false },
    ],
  },
  {
    name: "MARCUS THORNE",
    role: "TOOLS & SYSTEMS SPECIALIST",
    description:
      "Focuses on low-level engine integration and custom plugin development. Extensive background in C++ optimization and real-time physics simulation modules.",
    pipeline: [
      { name: "PRE-PRODUCTION", items: [], active: false },
      { name: "FULL ASSET PRODUCTION", items: ["Blockout", "High Poly", "Retopo / UV", "Texturing"], active: true },
      { name: "EXTENDED PRODUCTION", items: ["Rigging"], active: true },
    ],
  },
  {
    name: "ALEXA RIVERA",
    role: "AUTOMATION SPECIALIST",
    description:
      "Driving engineering efficiency through Python-based automation frameworks. Specialized in large-scale data processing and internal asset management tools.",
    pipeline: [
      { name: "PRE-PRODUCTION", items: ["Reference Creation / Search"], active: true },
      { name: "FULL ASSET PRODUCTION", items: ["Blockout", "High Poly", "Retopo / UV", "Texturing"], active: true },
      { name: "EXTENDED PRODUCTION", items: ["Rigging", "Animation", "VFX"], active: true },
    ],
  },
];

const DeveloperCard = ({ dev }: { dev: Developer }) => (
  <div className="border border-border rounded-lg bg-card/60 backdrop-blur-sm p-6 mb-4">
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

    {dev.pipeline && (
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold text-foreground">
            PIPELINE RESPONSIBILITIES
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {dev.pipeline.map((phase) => (
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

const DeveloperRoster = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mt-[72px]" />

      <section className="flex-1 px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full">
        {/* Back */}
        <button
          onClick={() => navigate("/developer-hub")}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-sans font-medium mb-10 hover:opacity-80 transition-opacity"
          style={{ color: "hsl(var(--copper))" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wide text-foreground mb-4">
            CATEGORIZED ROSTER
          </h1>
          <div className="h-0.5 w-12 mx-auto mb-4" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <p className="text-sm md:text-base text-muted-foreground tracking-[0.1em] font-sans">
            B2B SPECIALIZATION & DEVELOPMENT CORE
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Roster */}
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
                <DeveloperCard key={dev.name} dev={dev} />
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
                <DeveloperCard key={dev.name} dev={dev} />
              ))}
            </div>
          </div>

          {/* Right column - Recruitment */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg bg-card/60 backdrop-blur-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <UserPlus className="w-4 h-4" style={{ color: "hsl(var(--copper))" }} />
                <h3
                  className="text-sm font-serif font-bold tracking-[0.15em] uppercase"
                  style={{ color: "hsl(var(--copper))" }}
                >
                  RECRUITMENT
                </h3>
              </div>

              <div className="text-center py-6">
                <UserPlus className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-sm font-serif font-bold tracking-wider text-foreground mb-2">
                  NO ACTIVE OPENINGS
                </h4>
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
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                STATUS: ROSTER FULL
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeveloperRoster;
