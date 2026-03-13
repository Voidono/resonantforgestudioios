import { useNavigate } from "react-router-dom";
import { Settings, Monitor, Users } from "lucide-react";
import DashboardSubNav from "@/components/DashboardSubNav";
import Footer from "@/components/Footer";

const DeveloperHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardSubNav />

      <section className="flex-1 px-4 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full pt-[120px] md:pt-[132px]">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wide text-foreground mb-4">
            DEVELOPER SURFACE HUB
          </h1>
          <div className="h-0.5 w-12 mx-auto mb-4" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <p className="text-sm md:text-base text-muted-foreground tracking-[0.1em] font-sans">
            Empowering specialists across the Forge
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Business-Facing Developers */}
          <div className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-8 md:p-10 flex flex-col items-center text-center min-h-[420px] justify-between">
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 mb-6" style={{ color: "hsl(var(--copper))" }} />
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wider mb-6" style={{ color: "hsl(var(--copper))" }}>
                BUSINESS-<br />FACING<br />DEVELOPERS
              </h2>
              <p className="text-sm font-sans font-semibold text-foreground mb-3">
                Focus: Systems architects, infrastructure engineers, and pipeline specialists.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans max-w-sm">
                Precision-driven talent building the production-scale core. Join the ranks of developers forging the studio's technical backbone.
              </p>
            </div>

            <button
              onClick={() => navigate("/developer-roster")}
              className="mt-8 px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-sans font-bold rounded transition-opacity hover:opacity-90 flex items-center gap-3"
              style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
            >
              ENTER BUSINESS TRACK
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Community-Facing Developers */}
          <div className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-8 md:p-10 flex flex-col items-center text-center min-h-[420px] justify-between">
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

            <div className="flex flex-col items-center">
              <span className="text-xs tracking-[0.15em] uppercase font-sans font-medium text-muted-foreground mb-4">
                (Page Not Needed Currently)
              </span>
              <Users className="w-10 h-10 mb-6" style={{ color: "hsl(var(--copper))" }} />
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wider mb-6" style={{ color: "hsl(var(--copper))" }}>
                COMMUNITY-<br />FACING<br />DEVELOPERS
              </h2>
              <p className="text-sm font-sans font-semibold text-foreground mb-3">
                Focus: Creative technologists, IP visionaries, and engagement architects.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans max-w-sm">
                Collaborative minds bridging the gap between public IP and player systems. Lead the charge in transparent development.
              </p>
            </div>

            <button
              disabled
              className="mt-8 px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-sans font-bold rounded flex items-center gap-3 border opacity-50 cursor-not-allowed"
              style={{ borderColor: "hsl(var(--copper))", color: "hsl(var(--copper))" }}
            >
              ENTER COMMUNITY TRACK
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeveloperHub;
