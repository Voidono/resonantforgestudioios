import { useNavigate } from "react-router-dom";
import { PlusSquare, FolderOpen, AtSign, Rss, Building2, Shield } from "lucide-react";
import { useState } from "react";

const departments = [
  {
    name: "ASSET PRODUCTION",
    status: "AVAILABLE",
    statusColor: "#22c55e",
    latency: "< 12.0 HR",
    highlight: true,
  },
  {
    name: "SYSTEMS ANALYSIS",
    status: "AVAILABLE",
    statusColor: "#22c55e",
    latency: "< 24.0 HR",
    highlight: false,
  },
  {
    name: "INFRASTRUCTURE BUILDOUT",
    status: "DELAYED",
    statusColor: "#f59e0b",
    latency: "< 48.0 HR",
    highlight: false,
  },
];

const ContactTerminal = () => {
  const navigate = useNavigate();
  const [operatorName, setOperatorName] = useState("");
  const [studioName, setStudioName] = useState("");
  const [intakeRef, setIntakeRef] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent mt-[72px]" />

      {/* Sub-header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-9 h-9 rounded flex items-center justify-center"
              style={{ backgroundColor: "hsl(var(--copper))" }}
            >
              <AtSign className="w-4 h-4" style={{ color: "hsl(var(--background))" }} />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold tracking-wider text-foreground">RESONANT FORGE</h2>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                INDUSTRIAL ASSET SYSTEMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { icon: PlusSquare, label: "INTAKE", active: false, path: "/asset-intake" },
              { icon: FolderOpen, label: "ASSETS", active: false, path: "/operations-hub" },
              { icon: AtSign, label: "CONTACT", active: true, path: "/contact-terminal" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1"
              >
                <item.icon
                  className="w-4 h-4"
                  style={{ color: item.active ? "hsl(var(--copper))" : undefined }}
                />
                <span
                  className="text-[9px] tracking-[0.1em] uppercase font-sans font-medium"
                  style={{
                    color: item.active ? "hsl(var(--copper))" : undefined,
                    borderBottom: item.active ? "2px solid hsl(var(--copper))" : "none",
                    paddingBottom: "2px",
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="flex-1 px-4 md:px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Hero */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold mb-1" style={{ color: "hsl(var(--copper))" }}>
            B2B COMMUNICATIONS // DIRECT UPLINK
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            STUDIO B2B CONTACT TERMINAL
          </h1>
          <p className="text-sm font-sans text-muted-foreground tracking-wider uppercase max-w-2xl">
            Initialize a direct link for technical asset production, systems analysis, or infrastructure buildout inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Form */}
          <div
            className="border rounded-lg p-6 space-y-6"
            style={{ borderColor: "hsl(var(--copper) / 0.3)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Rss className="w-4 h-4" style={{ color: "hsl(var(--copper))" }} />
              <span className="text-xs tracking-[0.2em] uppercase font-sans font-bold text-foreground">
                COMMUNICATIONS INTAKE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground mb-2 block">
                  OPERATOR_NAME <span style={{ color: "hsl(var(--copper))" }}>*</span>
                </label>
                <input
                  type="text"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  placeholder="IDENTIFY..."
                  className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50"
                />
              </div>
              <div>
                <label className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground mb-2 block">
                  STUDIO_NAME <span style={{ color: "hsl(var(--copper))" }}>*</span>
                </label>
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  placeholder="ENTER STUDIO NAME..."
                  className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50"
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground mb-2 block">
                INTAKE REFERENCE #
              </label>
              <input
                type="text"
                value={intakeRef}
                onChange={(e) => setIntakeRef(e.target.value)}
                placeholder="OPTIONAL_ID..."
                className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50"
              />
            </div>

            <div>
              <label className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold text-muted-foreground mb-2 block">
                MESSAGE_BODY
              </label>
              <textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="ENTER TRANSMISSION DATA..."
                className="w-full bg-background border border-border rounded px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-copper/50 resize-none min-h-[160px]"
              />
            </div>

            <button
              className="w-full py-4 rounded text-sm tracking-[0.2em] uppercase font-sans font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "hsl(var(--copper))", color: "hsl(var(--background))" }}
            >
              TRANSMIT MESSAGE
            </button>
          </div>

          {/* Right - Directory */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs tracking-[0.2em] uppercase font-sans font-bold text-muted-foreground">
                STUDIO DIRECTORY // B2B DEPARTMENTS
              </span>
            </div>

            {departments.map((dept) => (
              <button
                key={dept.name}
                onClick={() => setSelectedDept(dept.name)}
                className="w-full text-left border rounded-lg p-5 transition-colors"
                style={{
                  borderColor: selectedDept === dept.name ? "hsl(var(--copper))" : dept.highlight ? "hsl(var(--copper) / 0.4)" : "hsl(var(--border))",
                  backgroundColor: selectedDept === dept.name ? "hsl(var(--copper) / 0.05)" : "transparent",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-serif font-bold text-foreground">{dept.name}</h3>
                  <span className="flex items-center gap-1.5 text-[9px] tracking-[0.1em] uppercase font-sans font-bold" style={{ color: dept.statusColor }}>
                    {dept.status}
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.statusColor }} />
                  </span>
                </div>
                <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
                  RESPONSE LATENCY: <span style={{ color: "hsl(var(--copper))" }}>{dept.latency}</span>
                </p>
              </button>
            ))}

            {/* Encryption Note */}
            <div className="border border-border rounded-lg p-5 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4" style={{ color: "hsl(var(--gold))" }} />
                <span className="text-xs tracking-[0.15em] uppercase font-sans font-bold text-foreground">
                  B2B ENCRYPTION PROTOCOL
                </span>
              </div>
              <p className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground leading-relaxed">
                ALL B2B TRANSMISSIONS ARE ROUTED VIA DEDICATED SECURE TUNNELS WITH 4096-BIT INDUSTRIAL GRADE ENCRYPTION. SELECT A DEPARTMENT TO BEGIN ROUTING.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
              FORGE_CORE_CONSOLE V.2.4.0_B2B
            </span>
          </div>
          <span className="text-[9px] tracking-[0.1em] uppercase font-sans text-muted-foreground">
            © 2024 RESONANT FORGE STUDIOS // B2B CONTACT DIVISION
          </span>
          <span className="text-[9px] tracking-[0.1em] uppercase font-sans font-bold" style={{ color: "hsl(var(--copper))" }}>
            ● SECURE LINK ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;
