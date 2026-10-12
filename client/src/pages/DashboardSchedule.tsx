import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { WorkingHourItem, TimeOffItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Clock, Plus, Trash2, Calendar, Check, AlertCircle, X } from 'lucide-react';

export const DashboardSchedule: React.FC = () => {
  const { t, language } = useLanguage();
  const toast = useToast();
  const [hours, setHours] = useState<WorkingHourItem[]>([]);
  const [timeOff, setTimeOff] = useState<TimeOffItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingHours, setSavingHours] = useState(false);

  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [reason, setReason] = useState('');
  const [showTimeOffModal, setShowTimeOffModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const weekdays = [
    { day: 1, label: t.mon },
    { day: 2, label: t.tue },
    { day: 3, label: t.wed },
    { day: 4, label: t.thu },
    { day: 5, label: t.fri },
    { day: 6, label: t.sat },
    { day: 7, label: t.sun },
  ];

  const fetchData = async () => {
    try {
      const [whRes, toRes] = await Promise.all([
        api.get('/owner/working-hours'),
        api.get('/owner/time-off')
      ]);
      setHours(whRes.data);
      setTimeOff(toRes.data);
    } catch (err) {
      console.error(err);
      toast.error(t.toastError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHourChange = (weekday: number, field: string, value: any) => {
    setHours((prev) =>
      prev.map((h) => (h.weekday === weekday ? { ...h, [field]: value } : h))
    );
  };

  const saveHours = async () => {
    setSavingHours(true);
    try {
      await api.put('/owner/working-hours', { hours });
      toast.success(t.toastSaved);
    } catch (err) {
      toast.error(t.toastError);
    } finally {
      setSavingHours(false);
    }
  };

  const addTimeOff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/owner/time-off', { startsAt, endsAt, reason });
      toast.success(t.toastSaved);
      setShowTimeOffModal(false);
      setStartsAt('');
      setEndsAt('');
      setReason('');
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.toastError);
    }
  };

  const confirmDeleteTimeOff = async (id: string) => {
    try {
      await api.delete(`/owner/time-off/${id}`);
      toast.success(t.toastDeleted);
      setDeletingId(null);
      fetchData();
    } catch (err) {
      toast.error(t.toastError);
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const locale = language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US';
      return new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="pb-2 border-b border-slate-200/60">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.scheduleTitle}
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          {t.scheduleSub}
        </p>
      </div>

      {/* Weekly Schedule Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-black text-slate-900">
              {t.weeklyHoursTitle}
            </h2>
          </div>

          <button
            onClick={saveHours}
            disabled={savingHours}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto active:scale-95 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{savingHours ? t.confirming : t.saveHoursBtn}</span>
          </button>
        </div>

        {/* Days Rows */}
        <div className="divide-y divide-slate-100">
          {weekdays.map(({ day, label }) => {
            const h = hours.find((x) => x.weekday === day) || {
              weekday: day,
              startTime: '09:00',
              endTime: '19:00',
              closed: false,
            };

            return (
              <div
                key={day}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Day name & Open/Closed toggle */}
                <div className="flex items-center gap-4 min-w-[160px]">
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base w-24">
                    {label}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleHourChange(day, 'closed', !h.closed)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                      h.closed
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {h.closed ? t.closedLabel : t.openLabel}
                  </button>
                </div>

                {/* Time range inputs */}
                {!h.closed ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <input
                      type="time"
                      value={h.startTime}
                      onChange={(e) => handleHourChange(day, 'startTime', e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-xs font-bold"
                    />
                    <span className="text-slate-400">→</span>
                    <input
                      type="time"
                      value={h.endTime}
                      onChange={(e) => handleHourChange(day, 'endTime', e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-xs font-bold"
                    />
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    {t.closedLabel}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Time-Off & Exceptional Closures */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {t.timeOffTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setShowTimeOffModal(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-bold text-xs shadow transition-all self-start sm:self-auto active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addTimeOffBtn}</span>
          </button>
        </div>

        {timeOff.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            {t.noTimeOff}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {timeOff.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <span>{formatDateDisplay(item.startsAt)}</span>
                    <span className="text-slate-400">→</span>
                    <span>{formatDateDisplay(item.endsAt)}</span>
                  </div>
                  {item.reason && (
                    <p className="text-xs text-slate-500 mt-0.5 italic">
                      Motif : {item.reason}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setDeletingId(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors self-end sm:self-auto"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">{t.deleteConfirmTitle}</h3>
            <p className="text-xs text-slate-500 mb-5">Cette période de fermeture sera retirée immédiatement.</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                {t.cancelBtn}
              </button>
              <button
                onClick={() => confirmDeleteTimeOff(deletingId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow"
              >
                {t.confirmDeleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Time Off Modal */}
      {showTimeOffModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {t.addTimeOffBtn}
              </h2>
              <button
                onClick={() => setShowTimeOffModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addTimeOff} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.timeOffStarts} *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.timeOffEnds} *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.timeOffReason}
                </label>
                <input
                  type="text"
                  placeholder="ex: Fête de l'Aïd, Travaux..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTimeOffModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  {t.saveTimeOffBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
