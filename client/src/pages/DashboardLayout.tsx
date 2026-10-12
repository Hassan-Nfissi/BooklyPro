import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, LayoutDashboard, ExternalLink, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from '../components/LanguageSelector';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { t, isRtl } = useLanguage();
  const { business } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isSubPage = location.pathname !== '/dashboard';

  return (
    <div className="min-h-screen bg-slate-50/70 flex">
      {/* Sidebar with mobile drawer state */}
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {isSubPage ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all active:scale-95 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900 rtl:rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
                <span>{t.backToOverview}</span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 text-slate-700 text-xs font-extrabold">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                </div>
                <span>{t.adminSpace}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {business && (
              <a
                href={`/book/${business.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors shadow-2xs"
              >
                <span>{t.viewClientPage}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </header>

        {/* Dashboard Page View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
