import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Eye, EyeOff, Shield, ArrowLeftRight, RefreshCw, Pencil } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type AuthView = "login" | "register" | "verify";

const Auth = () => {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Session initialized.", description: "Welcome back, operator." });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Access denied", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Access codes do not match.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) throw error;
      setView("verify");
      toast({ title: "Registration initialized", description: "Verification code transmitted." });
    } catch (error: any) {
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const cornerDots = (
    <>
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        {view === "login" && (
          <div className="relative w-full max-w-md border border-border rounded p-8 bg-card/50">
            {cornerDots}

            <h1 className="text-center font-serif font-bold text-xl tracking-wide text-foreground mb-1">
              STUDIO ACCESS //
            </h1>
            <p className="text-center font-serif font-bold text-xl tracking-wide text-foreground mb-8">
              AUTHENTICATION REQUIRED
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase font-medium">
                  OPERATOR_ID
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL OR USERNAME"
                    required
                    className="bg-secondary/80 border-border pr-10 uppercase placeholder:normal-case tracking-wider text-xs h-12"
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase font-medium">
                  ACCESS_CODE
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    minLength={6}
                    className="bg-secondary/80 border-border pr-10 tracking-wider text-xs h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="stayLoggedIn"
                  checked={stayLoggedIn}
                  onCheckedChange={(v) => setStayLoggedIn(v as boolean)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="stayLoggedIn" className="text-muted-foreground text-[11px] tracking-[0.15em] uppercase cursor-pointer">
                  STAY LOGGED IN?
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.15em] uppercase text-sm h-12 font-bold"
              >
                <span className="mr-2">▶</span>
                {loading ? "AUTHENTICATING..." : "INITIALIZE SESSION"}
              </Button>
            </form>

            <p className="text-center text-[11px] text-muted-foreground tracking-[0.1em] uppercase mt-6">
              DON'T HAVE AN ACCOUNT? //{" "}
              <button onClick={() => setView("register")} className="text-primary hover:underline">
                REQUEST ACCESS
              </button>
            </p>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button className="text-[11px] text-muted-foreground tracking-[0.1em] uppercase hover:text-foreground">
                RESET ACCESS CODE
              </button>
              <span className="text-muted-foreground/40 text-[10px]">•</span>
              <button className="text-[11px] text-muted-foreground tracking-[0.1em] uppercase hover:text-foreground">
                REQUEST CREDENTIALS
              </button>
            </div>
          </div>
        )}

        {view === "register" && (
          <div className="relative w-full max-w-md border border-border rounded p-8 bg-card/50">
            {cornerDots}

            <h1 className="text-center font-serif font-bold text-2xl tracking-wide text-foreground mb-8">
              CREATE STUDIO ACCOUNT
            </h1>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase font-medium">
                  EMAIL ADDRESS
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="CONTACT@DOMAIN.COM"
                  required
                  className="bg-secondary/80 border-border tracking-wider text-xs h-12 uppercase placeholder:normal-case"
                />
              </div>

              <div className="space-y-4">
                <div className="border-t border-primary/60 pt-3">
                  <span className="text-primary text-[11px] tracking-[0.2em] uppercase font-bold">
                    SECURITY_CREDENTIALS
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase font-medium">
                    ACCESS_CODE
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="bg-secondary border-border tracking-wider text-xs h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase font-medium">
                    VERIFY_ACCESS_CODE
                  </label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="bg-secondary border-border tracking-wider text-xs h-12"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.15em] uppercase text-sm h-12 font-bold"
              >
                <Shield className="w-4 h-4 mr-2" />
                {loading ? "PROCESSING..." : "INITIALIZE REGISTRATION"}
              </Button>
            </form>

            <p className="text-center text-[11px] text-muted-foreground tracking-[0.1em] uppercase mt-8">
              ALREADY REGISTERED? //{" "}
              <button onClick={() => setView("login")} className="text-primary hover:underline">
                ACCESS LOGIN TERMINAL
              </button>
            </p>
          </div>
        )}

        {view === "verify" && (
          <div className="relative w-full max-w-md border border-border rounded p-8 bg-card/50">
            {cornerDots}

            <h1 className="text-center font-bold text-lg tracking-wide text-foreground mb-2">
              SECURITY // VERIFICATION REQUIRED
            </h1>

            <p className="text-center text-muted-foreground text-sm mb-1">
              A 6-digit authentication code has been transmitted to
            </p>
            <p className="text-center text-primary text-sm font-mono mb-2">
              [{email}]
            </p>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Input the code below to finalize account activation.
            </p>

            <p className="text-center text-primary text-[10px] tracking-[0.2em] uppercase font-bold mb-6">
              THIS HELPS ENSURE SECURE ACCESS TO STUDIO SYSTEMS.
            </p>

            <div className="flex justify-center mb-6">
              <InputOTP maxLength={6}>
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-12 h-14 bg-secondary border-border text-foreground text-lg"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.15em] uppercase text-sm h-12 font-bold mb-4"
              onClick={() => {
                toast({ title: "Check your email", description: "Click the verification link sent to your email to complete registration." });
              }}
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              VERIFY CREDENTIALS
            </Button>

            <div className="flex items-center justify-center gap-6">
              <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground tracking-[0.1em] uppercase hover:text-foreground">
                <RefreshCw className="w-3 h-3" /> RESEND CODE
              </button>
              <span className="text-muted-foreground/30">|</span>
              <button
                onClick={() => setView("register")}
                className="flex items-center gap-1.5 text-[11px] text-muted-foreground tracking-[0.1em] uppercase hover:text-foreground"
              >
                <Pencil className="w-3 h-3" /> UPDATE EMAIL
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Terminal footer */}
      <div className="border-t border-border py-3 px-6 text-center">
        <p className="text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase font-mono">
          {view === "login" && "SECURE TERMINAL BCD-09 // ENCRYPTION ACTIVE // UNAUTHORIZED ACCESS PROHIBITED"}
          {view === "register" && "SECURE TERMINAL BCD-REG // ENCRYPTION ACTIVE // PROTOCOL 4.2.1"}
          {view === "verify" && "SECURE TERMINAL BCD-VERIFY // ENCRYPTION ACTIVE // PROTOCOL 4.2.2"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
