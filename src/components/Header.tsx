import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";

export function Header() {
  const { isAuthenticated, user } = useAuth();
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
        {isAuthenticated ? (
          <>
            <Button variant="ghost" asChild>
              <Link to="/dashboard">
                <User className="mr-2 h-4 w-4" />
                {user?.email}
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Signup</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
