import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { DashboardSummary, AppointmentItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ArrowRight,
  Sparkles,
  User,
  Scissors
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [todayAppointments, setTodayAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sumRes, appRes] = await Promise.all([
          api.get('/owner/dashboard/summary'),
          api.get('/owner/appointments')
        ]);
        setSummary(sumRes.data);
        setTodayAppointments(appRes.data.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const locale = language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US';
      return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(date);
    } catch {
      return '';
    }
  };

  if (loading || !summary) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Clock className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-slate-500">{t.loadingDashboard}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t.hello}, {summary.businessName}</span>
            <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {t.overviewSub}
          </p>
        </div>

        <a
          href={summary.publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-emerald-800 border border-emerald-200/90 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:bg-emerald-50/50 hover:border-emerald-300 transition-all self-start sm:self-auto"
        >
          <span>/book/{summary.slug}</span>
          <ExternalLink className="w-4 h-4 text-emerald-600" />
        </a>
      </div>

      {/* Modern High-Impact Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Today */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.todayMetric}</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 tracking-tight">{summary.todayAppointments}</p>
            <span className="text-xs text-slate-400 font-semibold">{t.navAppointments.toLowerCase()}</span>
          </div>
        </div>

        {/* Metric 2: Confirmed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.confirmedMetric}</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 tracking-tight">{summary.confirmedCount}</p>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              {t.statusConfirmed}
            </span>
          </div>
        </div>

        {/* Metric 3: Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.completedMetric}</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 tracking-tight">{summary.completedCount}</p>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              {t.statusCompleted}
            </span>
          </div>
        </div>

        {/* Metric 4: Cancelled */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-rose-200 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.cancelledMetric}</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 tracking-tight">{summary.cancelledCount}</p>
            <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full">
              {t.statusCancelled}
            </span>
          </div>
        </div>
      </div>

      {/* Un-published Notice Card */}
      {!summary.isPublished && (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-7 rounded-3xl shadow-lg shadow-emerald-950/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 flex-shrink-0" />
            <h2 className="text-lg sm:text-xl font-black">{t.notPublishedBannerTitle}</h2>
          </div>
          <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
            {t.notPublishedBannerSub}
          </p>
          <div className="mt-5">
            <Link
              to="/dashboard/branding"
              className="bg-white text-emerald-900 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-all inline-flex items-center gap-2 group"
            >
              <span>{t.publishMyPageBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* Recent Appointments Widget */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 flex items-center justify-between border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">{t.recentAppointmentsTitle}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{summary.totalAppointments} au total</p>
          </div>
          <Link
            to="/dashboard/appointments"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 group"
          >
            <span>{t.viewAllCalendar}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {todayAppointments.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm font-medium">
            {t.noAppointmentsYet}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {todayAppointments.map((app) => (
              <div
                key={app.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex flex-col items-center justify-center font-bold flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
                    <span className="text-xs font-black leading-none">{formatTime(app.startsAt)}</span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{app.customerName}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                        {app.serviceName}
                      </span>
                      <span>•</span>
                      <span className="font-extrabold text-slate-700">{app.priceMad} {t.mad}</span>
                      <span>•</span>
                      <span className="text-slate-500">
                        {app.staffName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs text-slate-400 font-mono font-medium hidden md:inline">
                    {app.bookingReference}
                  </span>
                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                      app.status === 'CONFIRMED'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : app.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {app.status === 'CONFIRMED'
                      ? t.statusConfirmed
                      : app.status === 'COMPLETED'
                      ? t.statusCompleted
                      : t.statusCancelled}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
