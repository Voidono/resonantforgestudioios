import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const tabs = [
  { label: "BUSINESS", route: "/transaction" },
  { label: "DEVELOPERS", route: "/developer-hub" },
  { label: "COMMUNITY", route: "/community" },
] as const;

const DashboardSubNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const activeRoute = location.pathname;

  return (
    <div className="fixed top-[56px] md:top-[68px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-12">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase font-sans transition-colors"
          style={{ color: "hsl(var(--copper))" }}
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </button>

        <div className="flex items-center gap-6 md:gap-8">
          {tabs.map((tab) => {
            const isActive = activeRoute === tab.route;
            return (
              <button
                key={tab.label}
                onClick={() => navigate(tab.route)}
                className={`text-xs tracking-[0.2em] uppercase font-sans py-3 border-b-2 transition-colors ${
                  isActive
                    ? "border-copper text-copper"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                style={isActive ? { color: "hsl(var(--copper))", borderColor: "hsl(var(--copper))" } : {}}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => navigate("/auth")}
          className="text-xs tracking-[0.15em] uppercase font-sans px-4 py-1.5 border border-copper/50 rounded text-foreground hover:bg-copper/10 transition-colors"
        >
          STUDIO LOGIN
        </button>
      </div>
    </div>
  );
};

export default DashboardSubNav;
