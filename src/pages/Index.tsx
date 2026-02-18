import { useState } from "react";
import heroGradient from "@/assets/hero-gradient.jpg";
import GearLogo from "@/components/GearLogo";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const notList = [
  "A traditional game publisher.",
  "A platform that exploits FOMO or scarcity.",
  "An aggressive retention-first algorithm.",
  "Virtual loot boxes or predatory monetization.",
  "No opaque virtual currencies.",
];

const Index = () => {
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed! We'll keep you posted.");
    setEmail("");
    setSubscribeOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="hero-gradient-bg min-h-screen flex flex-col items-center justify-center px-6 text-center relative"
        style={{ backgroundImage: `url(${heroGradient})` }}
      >
        <div className="relative z-10 max-w-md mx-auto">
          <GearLogo className="w-16 h-16 mx-auto mb-8 text-primary-foreground/80" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide leading-tight text-primary-foreground mb-6">
            RESONANT<br />FORGE STUDIOS
          </h1>
          <p className="font-serif italic text-primary-foreground/80 text-lg mb-10 leading-relaxed">
            A studio exploring games and systems<br />without coercive monetization.
          </p>
          <button
            onClick={() => setSubscribeOpen(true)}
            className="w-full max-w-xs mx-auto block border-2 border-primary-foreground/40 text-primary-foreground px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-primary-foreground/10 transition-colors mb-4"
          >
            Subscribe
          </button>
          <button className="w-full max-w-xs mx-auto block bg-primary-foreground/20 text-primary-foreground px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-primary-foreground/30 transition-colors backdrop-blur-sm">
            Learn How This Works
          </button>
        </div>
      </section>

      {/* What This Is */}
      <section className="py-20 px-6 max-w-2xl mx-auto">
        <p className="section-label mb-8">What This Is</p>
        <div className="warm-divider mb-8" />
        <p className="text-foreground/80 leading-relaxed text-base">
          Resonant Forge Studios is an independent research and development lab dedicated to the
          craft of game systems. We believe that games should be judged by the depth of their
          engagement and the quality of their loops, not by their ability to exploit psychological
          vulnerabilities. Our work focuses on sustainable participation models that respect the
          player's time and agency.
        </p>
      </section>

      {/* What This Is Not */}
      <section className="py-20 px-6 max-w-2xl mx-auto">
        <p className="section-label mb-8">What This Is Not</p>
        <div className="warm-divider mb-8" />
        <div className="space-y-4">
          {notList.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 items-start py-3 px-4 bg-secondary/50 rounded-md"
            >
              <span className="principle-number mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-foreground/80 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <Dialog open={subscribeOpen} onOpenChange={setSubscribeOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Subscribe</DialogTitle>
            <DialogDescription>Enter your email to get updates from Resonant Forge Studios.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-2">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            />
            <Button onClick={handleSubscribe}>Subscribe</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
