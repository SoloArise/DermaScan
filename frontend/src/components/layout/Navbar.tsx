import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { checkServerHealth } from '../../services/scanService';
import type { HealthStatus } from '../../types/scan';

export interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serverHealth, setServerHealth] = useState<HealthStatus | null>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const fetchHealth = async () => {
      try {
        setIsCheckingHealth(true);
        const health = await checkServerHealth();
        if (isMounted) setServerHealth(health);
      } catch {
        if (isMounted) setServerHealth(null);
      } finally {
        if (isMounted) setIsCheckingHealth(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Skin Scan', path: '/scan' },
    { label: 'History', path: '/history' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-med-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1 transition-transform hover:scale-[1.02]"
          aria-label="DermaScan Home"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-navy leading-none tracking-tight">
              Derma<span className="text-primary">Scan</span>
            </span>
            <span className="text-[10px] font-medium text-content-secondary uppercase tracking-wider mt-0.5">
              AI-Assisted Screening
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary bg-primary-light font-semibold'
                    : 'text-content-secondary hover:text-content-main hover:bg-surface-soft'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: Status indicator & Start Scan CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Server status pill */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-surface-soft border-med-border"
            title={
              serverHealth
                ? serverHealth.is_model_loaded
                  ? 'Server Online (Real Model Loaded)'
                  : 'Server Online (Dev Preview Simulation Mode)'
                : 'Server Offline or Connecting...'
            }
          >
            <span
              className={`w-2 h-2 rounded-full ${
                serverHealth
                  ? serverHealth.is_model_loaded
                    ? 'bg-emerald-500'
                    : 'bg-amber-500 animate-pulse'
                  : 'bg-slate-300'
              }`}
            />
            <span className="text-content-secondary">
              {serverHealth
                ? serverHealth.is_model_loaded
                  ? 'Model Ready'
                  : 'Dev Preview'
                : isCheckingHealth
                ? 'Connecting...'
                : 'Offline'}
            </span>
          </div>

          <Link to="/scan">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start a Scan
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/scan" className="sm:hidden">
            <Button variant="primary" size="sm">
              Scan
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-content-secondary hover:text-content-main rounded-lg hover:bg-surface-soft focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-med-border bg-white px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary bg-primary-light font-semibold'
                      : 'text-content-secondary hover:text-content-main hover:bg-surface-soft'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-2 border-t border-med-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-content-secondary px-2">
              <span>Backend Status:</span>
              <span className="flex items-center gap-1.5 font-medium">
                <span
                  className={`w-2 h-2 rounded-full ${
                    serverHealth
                      ? serverHealth.is_model_loaded
                        ? 'bg-emerald-500'
                        : 'bg-amber-500'
                      : 'bg-slate-300'
                  }`}
                />
                {serverHealth
                  ? serverHealth.is_model_loaded
                    ? 'Model Active'
                    : 'Simulation Mode'
                  : 'Backend Offline'}
              </span>
            </div>
            <Link to="/scan" className="w-full">
              <Button variant="primary" size="lg" className="w-full justify-center">
                Start a Skin Scan
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
