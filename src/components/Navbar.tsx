import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const baseClass =
    "fixed top-4 right-4 z-50 px-3 py-1.5 rounded border border-copper/40 text-copper text-[10px] tracking-[0.2em] uppercase font-sans font-medium bg-transparent hover:bg-copper/10 hover:border-copper transition-colors";

  return user ? (
    <button onClick={handleSignOut} className={baseClass}>
      Sign Out
    </button>
  ) : (
    <Link to="/auth" className={baseClass}>
      Sign In
    </Link>
  );
};

export default Navbar;
