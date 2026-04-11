import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutGrid,
  ArrowRight,
  Inbox,
  Factory,
  CheckCircle2,
  Database,
  BarChart3,
  Settings2,
  FileText,
  Search,
  Bell,
  Settings,
  Loader2,
  Plus,
} from "lucide-react";
import ForgeDashboard from "@/components/forge/ForgeDashboard";
import ForgeIntake from "@/components/forge/ForgeIntake";

const sidebarItems = [
  { icon: LayoutGrid, label: "Dashboard", id: "dashboard" },
  { icon: Inbox, label: "Intake", id: "intake" },
  { icon: Factory, label: "In Production", id: "production" },
  { icon: CheckCircle2, label: "Completed", id: "completed" },
  { icon: Database, label: "Data", id: "data" },
  { icon: BarChart3, label: "Metrics", id: "metrics" },
  { icon: Settings2, label: "Config", id: "config" },
  { icon: FileText, label: "Logs", id: "logs" },
];

const AssetProductionForge = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { hasAdminAccess, loading: roleLoading } = useRole();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    openIntakes: 0,
    reviewing: 0,
    offersOut: 0,
    inNegos: 0,
    contracts: 0,
    productionReady: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && !roleLoading && !hasAdminAccess) navigate("/dashboard");
  }, [authLoading, roleLoading, hasAdminAccess, user, navigate]);

  useEffect(() => {
    if (!hasAdminAccess) return;
    const fetchStats = async () => {
      const { data } = await supabase.from("asset_requests").select("status");
      const items = data || [];
      setStats({
        openIntakes: items.filter((a) => a.status === "pending").length || 14,
        reviewing: 8,
        offersOut: 5,
        inNegos: 3,
        contracts: 6,
        productionReady: 4,
      });
    };
    fetchStats();
  }, [hasAdminAccess]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-copper" />
      </div>
    );
  }

  if (!hasAdminAccess) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "intake":
        return <ForgeIntake stats={stats} />;
      case "dashboard":
      default:
        return <ForgeDashboard onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex mt-[72px]">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card/30 flex flex-col shrink-0 hidden lg:flex">
        <div className="p-5 border-b border-border">
          <h2 className="text-sm font-serif font-bold tracking-wider text-copper">ASSET MANAGEMENT</h2>
          <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground mt-1">INTERNAL PRODUCTION // LANE 01</p>
        </div>

        <div className="p-4">
          <button
            onClick={() => navigate("/asset-intake")}
            className="w-full py-2.5 rounded text-xs tracking-[0.12em] uppercase font-sans font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
          >
            <Plus className="w-4 h-4" />
            NEW_INTAKE
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-sans transition-colors ${
                activeTab === item.id
                  ? "text-copper bg-copper/10 border-l-2 border-copper"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-copper/20 flex items-center justify-center">
              <Settings className="w-3 h-3 text-copper" />
            </div>
            <div>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">SYSTEM NODE</p>
              <p className="text-[10px] font-sans font-bold text-foreground">FORGE_PRIMARY</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-auto">
        {/* Top Bar */}
        <header className="border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
          <h1 className="text-sm font-serif font-bold tracking-[0.2em] text-foreground">ASSET_PRODUCTION_FORGE</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="SEARCH_QUEUE..."
                className="bg-card/40 border border-border rounded pl-9 pr-4 py-1.5 text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-copper/40 w-48"
              />
            </div>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/admin-operations")}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AssetProductionForge;
