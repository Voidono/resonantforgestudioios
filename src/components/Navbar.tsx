import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHero = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between ${isHero ? "" : "bg-background/80 backdrop-blur-md border-b border-border"}`}>
      <Link to="/" className="font-serif text-lg tracking-wider text-foreground hover:text-primary transition-colors">
        RFS
      </Link>
      <div className="flex gap-6 text-sm tracking-wide">
        <Link to="/principles" className="text-muted-foreground hover:text-foreground transition-colors">
          Principles
        </Link>
        <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
          FAQ
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
