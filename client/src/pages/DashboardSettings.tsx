import React, { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Settings, Save, Store, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';

export const DashboardSettings: React.FC = () => {
  const { business, refreshUser } = useAuth();
  const { t } = useLanguage();
  const toast = useToast();

  const [name, setName] = useState(business?.name || '');
  const [slug, setSlug] = useState(business?.slug || '');
  const [category, setCategory] = useState(business?.category || 'hair_salon');
  const [city, setCity] = useState(business?.city || 'Casablanca');
  const [address, setAddress] = useState(business?.address || '');
  const [phone, setPhone] = useState(business?.phone || '');
  const [description, setDescription] = useState(business?.description || '');
  const [advanceNoticeHours, setAdvanceNoticeHours] = useState(business?.advanceNoticeHours?.toString() || '2');
  const [bookingHorizonDays, setBookingHorizonDays] = useState(business?.bookingHorizonDays?.toString() || '30');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/owner/business', {
        name,
        slug,
        category,
        city,
        address,
        phone,
        description,
        advanceNoticeHours: parseInt(advanceNoticeHours, 10),
        bookingHorizonDays: parseInt(bookingHorizonDays, 10),
      });
      toast.success(t.toastSaved);
      refreshUser();
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.toastError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title Header */}
      <div className="pb-2 border-b border-slate-200/60">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.settingsTitle}
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          {t.settingsSub}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Profil de l'établissement */}
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
              <Store className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-black text-slate-900">
                Profil de l'établissement
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.businessNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.slugLabel} *
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-slate-400 bg-slate-50 px-3 py-2.5 border border-r-0 rtl:border-r rtl:border-l-0 border-slate-200 rounded-l-xl rtl:rounded-l-none rtl:rounded-r-xl font-mono">
                    /book/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-r-xl rtl:rounded-r-none rtl:rounded-l-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Localisation & Coordonnées */}
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-black text-slate-900">
                Localisation & Contact au Maroc
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.cityLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.contactPhoneLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+212 5..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.addressLabel}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Quartier, Boulevard, Résidence..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.descriptionLabel}
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Quelques mots pour présenter votre équipe et spécialités..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Règles de réservation */}
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
              <Clock className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-black text-slate-900">
                Règles de réservation en ligne
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.advanceNoticeHoursLabel}
                </label>
                <input
                  type="number"
                  min="0"
                  max="72"
                  value={advanceNoticeHours}
                  onChange={(e) => setAdvanceNoticeHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {t.advanceNoticeHelp}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.bookingHorizonDaysLabel}
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={bookingHorizonDays}
                  onChange={(e) => setBookingHorizonDays(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {t.bookingHorizonHelp}
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? t.confirming : t.saveSettingsBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
