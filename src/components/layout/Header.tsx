'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, LogOut, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { cn } from '../../utils';

export default function Header() {
  const pathname = usePathname();
  const { getItemCount } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = getItemCount();

  const navLinks = [
    { name: 'Products', href: '/' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Deals', href: '/#deals' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-primary">
              STORE
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-indigo-600",
                  pathname === link.href ? "text-indigo-600" : "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="h-9 w-64 rounded-full border border-zinc-200 bg-zinc-100 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900"
            />
          </div>

          <ThemeToggle />

          <Link href="/cart" className="relative p-2 text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-950">
                {itemCount}
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center space-x-2 border-l pl-4 dark:border-zinc-800">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-zinc-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-16 z-50 bg-white p-4 shadow-xl animate-in slide-in-from-top duration-300 dark:bg-zinc-950 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t dark:border-zinc-800">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-4">
                   <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user?.username}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-600 font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block w-full rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
