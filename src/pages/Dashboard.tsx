import { useNavigate } from "react-router-dom";
import { Settings, Users, LayoutGrid } from "lucide-react";
import Footer from "@/components/Footer";

const cards = [
  {
    number: "01",
    icon: Settings,
    title: "BUSINESS",
    description:
      "Scalable strategic infrastructure and frameworks built for high-throughput industrial deployment and growth.",
    status: "OP_STATUS: NOMINAL",
    action: "INITIALIZE WORKSPACE",
    route: "/transaction",
  },
  {
    number: "02",
    icon: Users,
    title: "COMMUNITY",
    description:
      "Decentralized culture nodes where production feedback loops undergo high-temperature industrial refinement.",
    status: "NET_SYNC: ACTIVE",
    action: "ACCESS NEXUS",
    route: "/vote",
  },
  {
    number: "03",
    icon: LayoutGrid,
    title: "DEVELOPERS",
    description:
      "Direct low-level technical access. Engine-grade documentation and precision toolsets for core integration.",
    status: "CORE_AUTH: GRANTED",
    action: "FORGE INTEGRATION",
    route: "/vessel",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12 px-6 text-center">
        {/* Status line */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-copper/50" />
          <p className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: "hsl(var(--copper))" }}>
            SYSTEM ONLINE // FORGE CORE ACTIVE
          </p>
          <div className="h-px w-10 bg-copper/50" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wide text-foreground mb-4">
          RESONANT FORGE STUDIOS
        </h1>
        <p className="font-serif italic text-lg md:text-xl mb-8" style={{ color: "hsl(var(--copper))" }}>
          A studio built around legible decisions.
        </p>

        {/* Reference tag */}
        <button
          onClick={() => navigate("/vessel")}
          className="inline-flex items-center gap-2 border border-border rounded px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:border-copper/40 transition-colors font-sans"
        >
          <span className="w-4 h-4 rounded-sm bg-copper/30 flex items-center justify-center">
            <span className="block w-2 h-2 rounded-sm bg-copper" />
          </span>
          REF_004_AMBER_GLOW.MAP
        </button>
      </section>

      {/* Cards Grid */}
      <section className="px-4 md:px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.number}
              className="relative border border-border rounded-lg bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between min-h-[320px]"
            >
              {/* Corner dots */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />

              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-serif font-bold" style={{ color: "hsl(var(--copper))" }}>
                    {card.number}
                  </span>
                  <card.icon className="w-5 h-5 text-muted-foreground mt-1" />
                </div>

                <h2 className="text-xl font-serif font-bold tracking-wider text-foreground mb-1">
                  {card.title}
                </h2>
                <div className="h-0.5 w-8 mb-4" style={{ backgroundColor: "hsl(var(--copper))" }} />

                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>

              <div className="mt-6">
                {/* Status */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium"
                    style={{ color: "hsl(var(--copper))" }}
                  >
                    {card.status}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(card.route)}
                  className="w-full py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium bg-secondary hover:bg-secondary/80 text-foreground rounded transition-colors"
                >
                  {card.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom status */}
      <section className="px-6 pb-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] tracking-[0.2em] uppercase font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--copper))" }} />
            <span style={{ color: "hsl(var(--copper))" }}>BCD // BOUNDED CLEAR DIRECT</span>
          </div>
          <div className="hidden md:block h-4 w-px bg-border" />
          <span className="text-muted-foreground">AUTH: 45.4215N // 75.6972W</span>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
