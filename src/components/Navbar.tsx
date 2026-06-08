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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 flex items-center justify-between bg-background/70 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <img src={studioLogo} alt="Resonant Forge Studios" className="h-10 md:h-12 w-auto" />
      </Link>
      {user ? (
        <button
          onClick={handleSignOut}
          className="text-copper hover:text-copper/80 transition-colors text-xs md:text-sm tracking-[0.15em] uppercase font-sans font-medium"
        >
          Sign Out
        </button>
      ) : (
        <Link
          to="/auth"
          className="text-copper hover:text-copper/80 transition-colors text-xs md:text-sm tracking-[0.15em] uppercase font-sans font-medium"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
