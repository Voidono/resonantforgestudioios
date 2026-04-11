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
      <aside className="w-64 border-r border-border/50 bg-background/80 flex flex-col shrink-0 hidden lg:flex">
        <div className="px-6 py-6 border-b border-border/50">
          <h2 className="text-sm font-serif font-bold tracking-[0.15em] text-copper">ASSET MANAGEMENT</h2>
          <p className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground mt-1.5">INTERNAL PRODUCTION // LANE 01</p>
        </div>

        <nav className="flex-1 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3.5 text-[11px] tracking-[0.18em] uppercase font-sans font-medium transition-all ${
                activeTab === item.id
                  ? "text-copper bg-copper/8 border-l-[3px] border-copper"
                  : "text-muted-foreground hover:text-foreground border-l-[3px] border-transparent"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-border/50 mt-auto">
          <button
            onClick={() => navigate("/asset-intake")}
            className="w-full py-3 rounded text-[10px] tracking-[0.15em] uppercase font-sans font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
          >
            <Plus className="w-3.5 h-3.5" />
            NEW INTAKE
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-auto">
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AssetProductionForge;
