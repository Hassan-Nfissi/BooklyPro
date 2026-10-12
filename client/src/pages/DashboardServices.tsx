import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Plus, Clock, Edit2, Check, X, Sparkles, Layers } from 'lucide-react';

export const DashboardServices: React.FC = () => {
  const { t } = useLanguage();
  const toast = useToast();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceMad, setPriceMad] = useState('150');
  const [durationMinutes, setDurationMinutes] = useState('45');
  const [bufferMinutes, setBufferMinutes] = useState('15');
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await api.get('/owner/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
      toast.error(t.toastError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreate = () => {
    setEditingService(null);
    setName('');
    setDescription('');
    setPriceMad('150');
    setDurationMinutes('45');
    setBufferMinutes('15');
    setShowModal(true);
  };

  const openEdit = (s: ServiceItem) => {
    setEditingService(s);
    setName(s.name);
    setDescription(s.description || '');
    setPriceMad(s.priceMad.toString());
    setDurationMinutes(s.durationMinutes.toString());
    setBufferMinutes(s.bufferMinutes.toString());
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name,
        description,
        priceMad: parseFloat(priceMad),
        durationMinutes: parseInt(durationMinutes, 10),
        bufferMinutes: parseInt(bufferMinutes, 10),
      };

      if (editingService) {
        await api.put(`/owner/services/${editingService.id}`, payload);
      } else {
        await api.post('/owner/services', payload);
      }

      toast.success(t.toastSaved);
      setShowModal(false);
      fetchServices();
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.toastError);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      await api.patch(`/owner/services/${id}/status`);
      toast.success(t.toastStatusUpdated);
      fetchServices();
    } catch (err) {
      toast.error(t.toastError);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.servicesTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {t.servicesSub}
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addServiceBtn}</span>
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 animate-pulse">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-400">{t.searchingSlots}</p>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="font-black text-slate-800 text-lg">{t.noServicesFound}</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
            {t.noServicesFoundSub}
          </p>
          <button
            onClick={openCreate}
            className="mt-5 inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-xs shadow hover:bg-emerald-700 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addServiceBtn}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.id}
              className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all group ${
                s.active
                  ? 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md'
                  : 'border-slate-200/60 bg-slate-50/50 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors">
                    {s.name}
                  </h3>
                  <div className="text-right flex-shrink-0">
                    <span className="text-lg font-black text-emerald-700 block leading-tight">
                      {s.priceMad} {t.mad}
                    </span>
                  </div>
                </div>

                {s.description && (
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                    {s.description}
                  </p>
                )}

                {/* Duration & Buffer Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{s.durationMinutes} {t.min}</span>
                  </span>
                  {s.bufferMinutes > 0 && (
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-lg">
                      +{s.bufferMinutes} {t.min} pause
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => toggleStatus(s.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    s.active
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${s.active ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  <span>{s.active ? t.activeLabel : t.inactiveLabel}</span>
                </button>

                <button
                  onClick={() => openEdit(s)}
                  className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all"
                  title={t.editServiceBtn}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Styled Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {editingService ? t.editServiceModalTitle : t.newServiceModalTitle}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.serviceNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Coupe brushing & soin kératine"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.serviceDescLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder="Détails du soin ou produits appliqués..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.servicePriceLabel} *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="0"
                      step="5"
                      value={priceMad}
                      onChange={(e) => setPriceMad(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.serviceDurationLabel} *
                  </label>
                  <input
                    type="number"
                    required
                    min="5"
                    step="5"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.bufferMinutesLabel}
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="5"
                    value={bufferMinutes}
                    onChange={(e) => setBufferMinutes(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? t.confirming : t.saveServiceBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
