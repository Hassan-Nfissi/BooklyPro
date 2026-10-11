import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, LayoutDashboard, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { business } = useAuth();
  const isSubPage = location.pathname !== '/dashboard';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar with back arrow on subpages */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            {isSubPage ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all active:scale-95 group"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-900 rtl:rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
                <span>{t.backToOverview}</span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 text-slate-600 text-xs font-bold">
                <LayoutDashboard className="w-4 h-4 text-teal-600" />
                <span>Espace d'administration</span>
              </div>
            )}
          </div>

          {business && (
            <div className="flex items-center gap-3">
              <a
                href={`/book/${business.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 transition-colors shadow-2xs"
              >
                <span>Voir page client</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
