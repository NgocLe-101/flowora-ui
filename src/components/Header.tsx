import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";

export function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black';

  return (
    <header className="flex h-16 items-center justify-between px-8 border-b border-gray-200">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold">
          Flowora
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/features" className={navLinkClass}>
            Features
          </NavLink>
          <NavLink to="/use-cases" className={navLinkClass}>
            Use cases
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/signup">Signup</Link>
        </Button>
      </div>
    </header>
  )
}
