import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Home, Sword, FlaskConical, User } from "lucide-react";
import studioLogo from "@/assets/studio-logo.png";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 hidden md:flex items-center justify-between bg-background/90 backdrop-blur-md border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={studioLogo} alt="Resonant Forge Studios" className="h-14 w-auto" />
        </Link>
        <div className="flex gap-6 text-sm tracking-wide items-center">
          <Link to="/principles" className="text-muted-foreground hover:text-foreground transition-colors">
            Principles
          </Link>
          <Link to="/vessel" className="text-muted-foreground hover:text-foreground transition-colors">
            The Vessel
          </Link>
          <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/vote" className="text-copper hover:text-copper/80 transition-colors font-medium">
                Vote
              </Link>
            </>
          ) : (
            <Link to="/auth" className="text-copper hover:text-copper/80 transition-colors font-medium">
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex md:hidden items-center justify-center bg-background/90 backdrop-blur-md border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={studioLogo} alt="Resonant Forge Studios" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around py-2 px-2">
          <Link to="/" className={`flex flex-col items-center gap-0.5 px-3 py-1.5 ${isActive("/") ? "text-copper" : "text-muted-foreground"}`}>
            <Home className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Home</span>
          </Link>
          <Link to="/principles" className={`flex flex-col items-center gap-0.5 px-3 py-1.5 ${isActive("/principles") ? "text-copper" : "text-muted-foreground"}`}>
            <Sword className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Creed</span>
          </Link>
          <Link to="/vessel" className={`flex flex-col items-center gap-0.5 px-3 py-1.5 ${isActive("/vessel") ? "text-copper" : "text-muted-foreground"}`}>
            <FlaskConical className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Vessel</span>
          </Link>
          <Link to={user ? "/vote" : "/auth"} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 ${isActive("/vote") || isActive("/auth") ? "text-copper" : "text-muted-foreground"}`}>
            <User className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">{user ? "Vote" : "Sign In"}</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
