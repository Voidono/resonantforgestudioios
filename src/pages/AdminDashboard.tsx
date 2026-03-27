import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Filter,
  SearchCode,
  Package,
  Settings2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import DashboardSubNav from "@/components/DashboardSubNav";

interface Stats {
  assetRequests: { intake: number; production: number; completed: number };
  serviceInquiries: { total: number; pending: number; resolved: number };
  contactMessages: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { hasAdminAccess, isAdmin, loading: roleLoading } = useRole();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
    if (!authLoading && !roleLoading && !hasAdminAccess) {
      navigate("/dashboard");
    }
  }, [authLoading, roleLoading, hasAdminAccess, user, navigate]);

  useEffect(() => {
    if (!hasAdminAccess) return;

    const fetchStats = async () => {
      setLoadingStats(true);

      const [assetRes, inquiryRes, contactRes] = await Promise.all([
        supabase.from("asset_requests").select("status"),
        supabase.from("service_inquiries").select("status"),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);

      const assets = assetRes.data || [];
      const inquiries = inquiryRes.data || [];

      setStats({
        assetRequests: {
          intake: assets.filter((a) => a.status === "pending").length,
          production: assets.filter((a) => a.status === "in_production").length,
          completed: assets.filter((a) => a.status === "completed").length,
        },
        serviceInquiries: {
          total: inquiries.length,
          pending: inquiries.filter((i) => i.status === "pending").length,
          resolved: inquiries.filter((i) => i.status === "resolved").length,
        },
        contactMessages: contactRes.count || 0,
      });
      setLoadingStats(false);
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

  const statusLegend = [
    { label: "COMPLETED", color: "bg-green-500" },
    { label: "IN PIPELINE", color: "bg-amber-500" },
    { label: "UNDER REVIEW", color: "bg-destructive" },
  ];

  const modules = [
    {
      icon: Filter,
      label: "MODULE_01",
      title: "SYSTEM FILTER",
      description: null,
      badges: stats
        ? [
            { value: stats.assetRequests.intake, color: "border-green-500 text-green-400" },
            { value: stats.assetRequests.production, color: "border-amber-500 text-amber-400" },
            { value: stats.assetRequests.completed, color: "border-destructive text-destructive" },
          ]
        : [],
      statusLabel: null,
      statusValue: null,
      actions: [
        { label: "INTAKE", active: true, path: "/asset-intake" },
        { label: "IN PRODUCTION", active: false, path: "/operations-hub" },
        { label: "COMPLETED", active: false, path: "/operations-hub" },
      ],
      secondaryActions: [
        { label: "DATA", path: "/operations-hub" },
        { label: "METRICS", path: "/operations-hub" },
        { label: "EDIT", path: "/operations-hub" },
      ],
      progress: null,
    },
    {
      icon: SearchCode,
      label: "SUBSYSTEM_02",
      title: "SYSTEMS ANALYSIS",
      description:
        "Internal diagnostic review of active studio systems, identifying scaling bottlenecks and decision latency. Monitoring technical pipelines and resolving architectural debt.",
      badges: stats
        ? [
            { value: stats.serviceInquiries.total, color: "border-green-500 text-green-400" },
            { value: stats.serviceInquiries.pending, color: "border-amber-500 text-amber-400" },
            { value: stats.serviceInquiries.resolved, color: "border-destructive text-destructive" },
          ]
        : [],
      statusLabel: "DIAGNOSTIC STATUS",
      statusValue: "STABLE",
      actions: null,
      secondaryActions: null,
      progress: { label: "DIAGNOSTIC STATUS", value: "STABLE", percent: 75 },
    },
    {
      icon: Package,
      label: "SUBSYSTEM_03",
      title: "ASSET PRODUCTION",
      description:
        "Internal production management for active studio IPs. Monitoring throughput, quality standards, and technical integration through a prestigious internal flow.",
      badges: stats
        ? [
            { value: stats.assetRequests.intake, color: "border-green-500 text-green-400" },
            { value: stats.assetRequests.production, color: "border-amber-500 text-amber-400" },
            { value: stats.assetRequests.completed, color: "border-destructive text-destructive" },
          ]
        : [],
      statusLabel: "IP THROUGHPUT",
      statusValue: "50% CAPACITY",
      actions: null,
      secondaryActions: null,
      progress: { label: "IP THROUGHPUT", value: "50% CAPACITY", percent: 50 },
    },
    {
      icon: Settings2,
      label: "SUBSYSTEM_04",
      title: "INFRASTRUCTURE BUILDOUT",
      description:
        "Active construction and maintenance of studio-side engineering pipelines, server architecture, and automation nodes under high-stress constraints.",
      badges: [
        { value: 4, color: "border-green-500 text-green-400" },
        { value: 9, color: "border-amber-500 text-amber-400" },
        { value: 14, color: "border-destructive text-destructive" },
      ],
      statusLabel: "PIPELINE HEALTH",
      statusValue: "CRITICAL",
      actions: null,
      secondaryActions: null,
      progress: { label: "PIPELINE HEALTH", value: "CRITICAL", percent: 30, critical: true },
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mt-[72px]" />

      {/* Sub-header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-copper hover:text-copper/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold">
              ADMIN TERMINAL
            </span>
          </button>

          <DashboardSubNav />

          <button
            onClick={() => navigate("/asset-intake")}
            className="border border-copper text-copper text-[10px] tracking-[0.15em] uppercase font-sans font-bold px-4 py-2 rounded hover:bg-copper/10 transition-colors"
          >
            INITIALIZE SYSTEM
          </button>
        </div>
      </div>

      {/* Status Legend */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-8 pb-4">
        <div className="flex items-center justify-center gap-8">
          {statusLegend.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-sm border border-border ${s.color}`} />
              <span className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Module Grid */}
      <section className="flex-1 px-4 md:px-8 pb-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="border border-border rounded-lg bg-card/40 p-6 flex flex-col justify-between min-h-[280px]"
            >
              {/* Top row: icon + badges */}
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center border border-copper/30"
                    style={{ backgroundColor: "hsl(var(--copper) / 0.1)" }}
                  >
                    <mod.icon className="w-5 h-5 text-copper" />
                  </div>
                  {mod.badges.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      {mod.badges.map((b, i) => (
                        <span
                          key={i}
                          className={`text-[10px] font-mono font-bold border rounded px-1.5 py-0.5 ${b.color}`}
                        >
                          {String(b.value).padStart(2, "0")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-copper font-semibold mb-1">
                  {mod.label}
                </p>
                <h3 className="text-lg font-serif font-bold text-foreground tracking-wider mb-3">
                  {mod.title}
                </h3>

                {mod.description && (
                  <p className="text-xs font-sans text-muted-foreground leading-relaxed mb-4">
                    {mod.description}
                  </p>
                )}

                {/* Action buttons (System Filter module) */}
                {mod.actions && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {mod.actions.map((a) => (
                        <button
                          key={a.label}
                          onClick={() => navigate(a.path)}
                          className={`text-[9px] tracking-[0.12em] uppercase font-sans font-bold px-4 py-2.5 rounded border transition-colors flex-1 ${
                            a.active
                              ? "border-copper bg-copper/20 text-copper"
                              : "border-border text-muted-foreground hover:border-copper/40 hover:text-foreground"
                          }`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                    {mod.secondaryActions && (
                      <div className="flex gap-2">
                        {mod.secondaryActions.map((a) => (
                          <button
                            key={a.label}
                            onClick={() => navigate(a.path)}
                            className="text-[9px] tracking-[0.12em] uppercase font-sans font-medium px-4 py-2.5 rounded border border-border text-muted-foreground hover:border-copper/40 hover:text-foreground transition-colors flex-1"
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom progress bar */}
              {mod.progress && (
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] tracking-[0.12em] uppercase font-sans text-muted-foreground font-medium">
                      {mod.progress.label}
                    </span>
                    <span
                      className={`text-[9px] tracking-[0.12em] uppercase font-sans font-bold ${
                        mod.progress.critical ? "text-destructive" : "text-copper"
                      }`}
                    >
                      {mod.progress.value}
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${mod.progress.percent}%`,
                        backgroundColor: mod.progress.critical
                          ? "hsl(var(--destructive))"
                          : "hsl(var(--copper))",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            <span>
              THERMAL LOAD: <span className="text-copper">42°C</span>
            </span>
            <span>
              CORE FREQUENCY: <span className="text-copper">4.8 GHZ</span>
            </span>
            <span>
              BUFFER STATUS: <span className="text-copper">STABLE</span>
            </span>
          </div>
          <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            © 2024 RESONANT FORGE STUDIOS // STUDIO_OPS_HUB // INTERNAL_USE_ONLY
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
