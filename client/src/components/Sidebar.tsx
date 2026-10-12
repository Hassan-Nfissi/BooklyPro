import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
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
  X,
  Sparkles
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onClose }) => {
  const { business, logout } = useAuth();
  const { t, isRtl } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: t.navOverview, icon: LayoutDashboard, end: true },
    { to: '/dashboard/appointments', label: t.navAppointments, icon: CalendarCheck },
    { to: '/dashboard/services', label: t.navServices, icon: Scissors },
    { to: '/dashboard/staff', label: t.navStaff, icon: Users },
    { to: '/dashboard/schedule', label: t.navSchedule, icon: Clock },
    { to: '/dashboard/branding', label: t.navBranding, icon: Palette },
    { to: '/dashboard/settings', label: t.navSettings, icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 h-screen w-72 bg-white border-r border-slate-200/90 rtl:border-r-0 rtl:border-l flex flex-col z-50 transition-transform duration-300 shadow-sm ${
          mobileOpen
            ? 'translate-x-0'
            : isRtl
            ? 'translate-x-full lg:translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        } ${isRtl ? 'right-0 lg:right-auto' : 'left-0 lg:left-auto'}`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link to="/dashboard" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center p-1.5 shadow-2xs group-hover:scale-105 transition-transform">
              <img src="/logo-icon.png" alt="BooklyPro" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-slate-900 leading-tight">
                  Bookly<span className="text-emerald-600">Pro</span>
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                🇲🇦 {t.proSpaceBadge}
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Business Status Card */}
        {business && (
          <div className="p-3.5 mx-3.5 my-3 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200/70 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold text-xs text-slate-900 truncate max-w-[140px]">
                {business.name}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  business.published
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {business.published ? t.onlineStatus : t.draftStatus}
              </span>
            </div>
            <a
              href={`/book/${business.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1.5 group"
            >
              <span>{t.viewClientPage}</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
            </a>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Footer Actions */}
        <div className="p-3.5 border-t border-slate-100 space-y-2.5 bg-slate-50/50">
          <div className="flex justify-center">
            <LanguageSelector className="w-full" />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors border border-transparent hover:border-rose-100"
          >
            <LogOut className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{t.logout}</span>
          </button>

          {/* Co-founder attribution */}
          <div className="pt-1 text-center">
            <span className="text-[10px] text-slate-400 font-medium">
              BooklyPro • {t.coFounderCredit}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
