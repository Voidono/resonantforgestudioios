import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { useEffect } from "react";
import { Settings, LayoutGrid, Sparkles, Loader2 } from "lucide-react";

const modules = [
  {
    icon: Settings,
    title: "BUSINESS",
    description:
      "Access asset production, systems analysis, frameworks, and NLR research systems.",
    status: "OP_STATUS: NOMINAL",
    button: "INITIALIZE WORKSPACE",
    route: "/admin-operations",
  },
  {
    icon: LayoutGrid,
    title: "DEVELOPERS",
    description:
      "Manage studio roster, job categories, recruitment, and operational standards.",
    status: "CORE_AUTH: GRANTED",
    button: "FORGE INTEGRATION",
    route: "/developer-hub",
    secondaryButton: "MANAGE ROSTER",
    secondaryRoute: "/admin-operations/developer-roster",
  },
  {
    icon: Sparkles,
    title: "COMMUNITY",
    description:
      "Configure IP modules, active voting terminals, and public archive datasets.",
    status: "NET_SYNC: ACTIVE",
    button: "ACCESS NEXUS",
    route: "/community",
  },
];

const AdminHub = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { hasAdminAccess, loading: roleLoading } = useRole();

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && !roleLoading && !hasAdminAccess) navigate("/dashboard");
  }, [authLoading, roleLoading, hasAdminAccess, user, navigate]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-copper" />
      </div>
    );
  }

  if (!hasAdminAccess) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 20%, hsl(var(--copper) / 0.12), transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 md:w-16" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans font-medium"
              style={{ color: "hsl(var(--copper))" }}
            >
              SYSTEM ONLINE // FORGE CORE ACTIVE
            </span>
            <div className="h-px w-8 md:w-16" style={{ backgroundColor: "hsl(var(--copper))" }} />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wider text-foreground mb-4">
            RESONANT FORGE STUDIOS
          </h1>

          <p
            className="text-sm md:text-base tracking-[0.1em] font-sans mb-8"
            style={{ color: "hsl(var(--copper))" }}
          >
            A studio built around legible decisions.
          </p>

          <button
            onClick={() => navigate("/under-construction")}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase font-sans border border-border rounded hover:border-copper/40 text-foreground transition-colors"
          >
            <LayoutGrid className="w-4 h-4" style={{ color: "hsl(var(--copper))" }} />
            REF_005_UPDATED_DESCR.MAP
          </button>
        </div>
      </section>

      {/* Website Modifications Card */}
      <section className="px-6 pb-16">
        <div className="relative max-w-3xl mx-auto border border-border rounded-lg bg-card/60 backdrop-blur-sm p-10 md:p-14 text-center">
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-foreground mb-3">
            WEBSITE MODIFICATIONS
          </h2>
          <div className="h-0.5 w-10 mx-auto mb-6" style={{ backgroundColor: "hsl(var(--copper))" }} />
          <p className="text-muted-foreground font-sans leading-relaxed text-sm md:text-base max-w-xl mx-auto mb-8">
            Direct access to internal studio systems and surface configurations.
          </p>
          <button
            onClick={() => navigate("/under-construction")}
            className="px-8 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border border-border rounded hover:border-copper/40 text-foreground transition-colors"
          >
            ENTER EDITOR
          </button>
        </div>
      </section>

      {/* Module Cards */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-8 flex flex-col items-center text-center min-h-[380px] justify-between transition-colors hover:border-copper/30"
            >
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

              <div className="flex flex-col items-center">
                <mod.icon className="w-8 h-8 mb-5 text-muted-foreground" />
                <h3
                  className="text-xl md:text-2xl font-serif font-bold tracking-wider mb-2"
                  style={{ color: "hsl(var(--copper))" }}
                >
                  {mod.title}
                </h3>
                <div className="h-0.5 w-8 mb-5" style={{ backgroundColor: "hsl(var(--copper))" }} />
                <p className="text-xs text-muted-foreground leading-relaxed font-sans max-w-xs">
                  {mod.description}
                </p>
              </div>

              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium"
                    style={{ color: "hsl(var(--copper))" }}
                  >
                    {mod.status}
                  </span>
                </div>
                <button
                  onClick={() => navigate(mod.route)}
                  className="w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border border-border rounded hover:border-copper/40 text-foreground transition-colors"
                >
                  {mod.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom status */}
      <section className="mt-auto px-6 py-4 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.2em] uppercase font-sans">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span style={{ color: "hsl(var(--copper))" }}>BCO // BOUNDED CLEAR DIRECT</span>
            <span className="text-muted-foreground">AUTH: 45.4215N // 75.6972W</span>
          </div>
          <span className="text-muted-foreground">
            © 2026 RESONANT FORGE STUDIOS (BCO) // ADMIN_HUB_v1.0.0
          </span>
        </div>
      </section>
    </div>
  );
};

export default AdminHub;
