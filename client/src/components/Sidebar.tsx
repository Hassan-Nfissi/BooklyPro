import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Scissors,
  Users,
  Clock,
  Palette,
  Settings,
  ExternalLink,
  LogOut,
  Calendar
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

export const Sidebar: React.FC = () => {
  const { business, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Vue d’ensemble', icon: LayoutDashboard, end: true },
    { to: '/dashboard/appointments', label: 'Rendez-vous', icon: CalendarCheck },
    { to: '/dashboard/services', label: 'Services & Tarifs', icon: Scissors },
    { to: '/dashboard/staff', label: 'Équipe & Staff', icon: Users },
    { to: '/dashboard/schedule', label: 'Horaires & Congés', icon: Clock },
    { to: '/dashboard/branding', label: 'Page de réservation', icon: Palette },
    { to: '/dashboard/settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col h-screen sticky top-0 shadow-xs">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <img src="/logo-icon.png" alt="BooklyPro" className="w-8 h-8 object-contain group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight text-slate-900 leading-tight">Bookly<span className="text-emerald-600">Pro</span></span>
            <span className="text-[10px] font-semibold text-slate-400">Espace Pro Maroc</span>
          </div>
        </Link>
      </div>

      {business && (
        <div className="p-4 mx-3 my-2 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs text-slate-900 truncate max-w-[140px]">{business.name}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${business.published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {business.published ? 'En ligne' : 'Brouillon'}
            </span>
          </div>
          <a
            href={`/book/${business.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center gap-1 mt-1"
          >
            <span>Voir ma page client</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-100 space-y-2">
        <div className="px-1 flex justify-center">
          <LanguageSelector />
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};
