import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import GearLogo from "@/components/GearLogo";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface VoteItem {
  id: string;
  title: string;
  description: string | null;
}

const Vote = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<VoteItem[]>([]);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [itemsRes, votesRes] = await Promise.all([
        supabase.from("vote_items").select("*"),
        supabase.from("votes").select("item_id").eq("user_id", user.id),
      ]);
      if (itemsRes.data) setItems(itemsRes.data);
      if (votesRes.data) setVotedIds(new Set(votesRes.data.map((v) => v.item_id)));
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const toggleVote = async (itemId: string) => {
    if (!user) return;
    const hasVoted = votedIds.has(itemId);

    if (hasVoted) {
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("user_id", user.id)
        .eq("item_id", itemId);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      setVotedIds((prev) => { const n = new Set(prev); n.delete(itemId); return n; });
      toast({ title: "Vote removed" });
    } else {
      const { error } = await supabase
        .from("votes")
        .insert({ user_id: user.id, item_id: itemId });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      setVotedIds((prev) => new Set(prev).add(itemId));
      toast({ title: "Vote cast!", description: "Your voice matters." });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-8 px-6 text-center">
        <GearLogo className="w-10 h-10 mx-auto mb-6 text-copper" />
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide text-foreground mb-4">
          Vote on Proposals
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed mb-6">
          Shape what we build next. Select the proposals you want to see come to life.
        </p>
        <button
          onClick={signOut}
          className="text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors"
        >
          Sign Out
        </button>
      </section>

      <section className="pb-24 px-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          {items.map((item) => {
            const voted = votedIds.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleVote(item.id)}
                className={`w-full text-left rounded-lg border p-6 transition-all ${
                  voted
                    ? "border-copper bg-copper/10"
                    : "border-border bg-secondary/30 hover:border-muted-foreground/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                      voted
                        ? "border-copper bg-copper text-background"
                        : "border-border"
                    }`}
                  >
                    {voted && <Check className="w-4 h-4" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vote;
