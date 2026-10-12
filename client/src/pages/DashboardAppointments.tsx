import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { AppointmentItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import {
  CalendarCheck,
  Check,
  X,
  Phone,
  Mail,
  Filter,
  MessageCircle,
  Clock,
  User,
  Scissors
} from 'lucide-react';

export const DashboardAppointments: React.FC = () => {
  const { t, language } = useLanguage();
  const toast = useToast();
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const url = statusFilter === 'all' ? '/owner/appointments' : `/owner/appointments?status=${statusFilter}`;
      const res = await api.get(url);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      toast.error(t.toastError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/owner/appointments/${id}/status?status=${newStatus}`);
      toast.success(t.toastStatusUpdated);
      fetchAppointments();
    } catch (err) {
      toast.error(t.toastError);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const locale = language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US';
      const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
      const day = date.getDate();
      const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(date);
      return { weekday, day, time };
    } catch {
      return { weekday: '', day: '', time: '' };
    }
  };

  const getCleanWhatsAppPhone = (phone?: string) => {
    if (!phone) return null;
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) return '212' + clean.substring(1);
    if (!clean.startsWith('212') && clean.length === 9) return '212' + clean;
    return clean;
  };

  const filters = [
    { key: 'all', label: t.filterAll },
    { key: 'CONFIRMED', label: t.filterConfirmed },
    { key: 'COMPLETED', label: t.filterCompleted },
    { key: 'CANCELLED', label: t.filterCancelled },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.appointmentsTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {t.appointmentsSub}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === f.key
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment List State */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 animate-pulse">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-400">{t.searchingSlots}</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <h3 className="font-black text-slate-800 text-lg">{t.noAppointmentsFound}</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
            {t.noAppointmentsFoundSub}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {appointments.map((app) => {
              const { weekday, day, time } = formatDate(app.startsAt);
              const waPhone = getCleanWhatsAppPhone(app.customerPhone);

              return (
                <div
                  key={app.id}
                  className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Left: Date Badge + Info */}
                  <div className="flex items-start gap-4">
                    {/* Moroccan Calendar Date Pill */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-emerald-50 to-teal-50/60 border border-emerald-100 text-emerald-900 flex flex-col items-center justify-center flex-shrink-0 shadow-2xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        {weekday}
                      </span>
                      <span className="text-xl font-black leading-tight text-slate-900">
                        {day}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-800">
                        {time}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-black text-slate-900 text-base sm:text-lg">
                          {app.customerName}
                        </h3>
                        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg font-bold border border-slate-200/60">
                          {app.bookingReference}
                        </span>
                      </div>

                      {/* Service Details */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {app.serviceName} ({app.durationMinutes} {t.min})
                        </span>
                        <span>•</span>
                        <span className="font-black text-slate-900">{app.priceMad} {t.mad}</span>
                        <span>•</span>
                        <span>
                          {t.specialistLabel} : <strong className="text-slate-800 font-bold">{app.staffName}</strong>
                        </span>
                      </div>

                      {/* Contact Channels */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                        {app.customerPhone && (
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${app.customerPhone}`}
                              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{app.customerPhone}</span>
                            </a>
                            {waPhone && (
                              <a
                                href={`https://wa.me/${waPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Ouvrir WhatsApp"
                                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                            )}
                          </div>
                        )}

                        {app.customerEmail && (
                          <a
                            href={`mailto:${app.customerEmail}`}
                            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{app.customerEmail}</span>
                          </a>
                        )}

                        {app.customerNote && (
                          <div className="w-full text-xs text-slate-500 italic bg-amber-50/60 border border-amber-200/60 px-2.5 py-1 rounded-lg mt-1">
                            {t.notePrefix} "{app.customerNote}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Status Pill & Action Buttons */}
                  <div className="flex items-center gap-3 self-end lg:self-center">
                    <span
                      className={`text-xs font-black px-3.5 py-1.5 rounded-full border shadow-2xs ${
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

                    {/* Action buttons if Confirmed */}
                    {app.status === 'CONFIRMED' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateStatus(app.id, 'COMPLETED')}
                          title={t.markCompleted}
                          className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all active:scale-95 shadow-2xs"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(app.id, 'CANCELLED')}
                          title={t.markCancelled}
                          className="p-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 transition-all active:scale-95 shadow-2xs"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
