import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Calendar, CalendarCheck, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo-icon.png" alt="BooklyPro" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-black text-xl tracking-tight text-slate-900">Bookly<span className="text-emerald-600">Pro</span></span>
            <span className="text-[10px] uppercase font-extrabold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-200/80">
              🇲🇦 {t.moroccoBadge}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/book/salon-amina"
            className="text-xs font-semibold text-slate-600 hover:text-teal-600 transition-colors hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-slate-50"
          >
            {t.demoSalonAmina}
          </Link>

          <LanguageSelector />

          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm transition-all active:scale-95"
            >
              <span>{t.mySpace}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-slate-700 hover:text-teal-600 transition-colors px-2.5 py-1.5"
              >
                {t.login}
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1 bg-slate-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-800 shadow-sm transition-all"
              >
                {t.register}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
