import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import studioLogo from "@/assets/studio-logo.png";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between pointer-events-none">
      <Link to="/" className="flex items-center gap-2 pointer-events-auto">
        <img src={studioLogo} alt="Resonant Forge Studios" className="h-9 md:h-10 w-auto" />
      </Link>
      {user ? (
        <button
          onClick={handleSignOut}
          className="pointer-events-auto px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-sans font-medium border border-copper/40 rounded text-copper hover:bg-copper/10 transition-colors"
        >
          Sign Out
        </button>
      ) : (
        <Link
          to="/auth"
          className="pointer-events-auto px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-sans font-medium border border-copper/40 rounded text-copper hover:bg-copper/10 transition-colors"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
