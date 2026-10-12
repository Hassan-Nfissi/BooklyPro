import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Branding } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Palette, Upload, Copy, Check, Eye, Smartphone, Sparkles, Globe } from 'lucide-react';

const CURATED_PALETTES = [
  { name: 'Émeraude Royale', hex: '#059669', desc: 'Salons de coiffure & spas' },
  { name: 'Vert Forêt Profond', hex: '#065f46', desc: 'Barbershops & soins premium' },
  { name: 'Bleu Majorelle', hex: '#1d4ed8', desc: 'Instituts modernes' },
  { name: 'Terracotta & Ambre', hex: '#c2410c', desc: 'Hammams & esthétique' },
  { name: 'Ardoise Prestige', hex: '#0f172a', desc: 'Luxe & minimaliste' },
];

export const DashboardBranding: React.FC = () => {
  const { business, refreshUser } = useAuth();
  const { t } = useLanguage();
  const toast = useToast();

  const [branding, setBranding] = useState<Branding | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#059669');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchBranding = async () => {
    try {
      const res = await api.get('/owner/business/branding');
      setBranding(res.data);
      setPrimaryColor(res.data.primaryColor || '#059669');
      setWelcomeMessage(res.data.welcomeMessage || '');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBranding();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/owner/business/branding', {
        primaryColor,
        themeKey: 'custom',
        welcomeMessage,
      });
      toast.success(t.toastSaved);
      fetchBranding();
    } catch (err) {
      toast.error(t.toastError);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async () => {
    if (!business) return;
    try {
      if (business.published) {
        await api.post('/owner/business/unpublish');
        toast.info(t.toastSaved);
      } else {
        await api.post('/owner/business/publish');
        toast.success(t.toastSaved);
      }
      refreshUser();
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.toastError);
    }
  };

  const handleCopyLink = () => {
    if (!business) return;
    const url = `${window.location.origin}/book/${business.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success(t.linkCopied);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setUploadingLogo(true);
    try {
      const res = await api.post('/owner/business/branding/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBranding(res.data);
      toast.success(t.toastSaved);
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.toastError);
    } finally {
      setUploadingLogo(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.brandingTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {t.brandingSub}
          </p>
        </div>

        {business && (
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? t.linkCopied : t.copyLinkBtn}</span>
            </button>

            <button
              onClick={handleTogglePublish}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                business.published
                  ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{business.published ? t.unpublishPageBtn : t.publishPageBtn}</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Color Palettes Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Palette className="w-4 h-4" />
              </div>
              <h2 className="text-base font-black text-slate-900">
                {t.themeColorLabel}
              </h2>
            </div>

            {/* Recommended Swatches */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                {t.recommendedPalettes}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CURATED_PALETTES.map((p) => {
                  const selected = primaryColor.toLowerCase() === p.hex.toLowerCase();
                  return (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={() => setPrimaryColor(p.hex)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                        selected
                          ? 'border-emerald-600 bg-emerald-50/40 shadow-xs ring-2 ring-emerald-600/20'
                          : 'border-slate-200/80 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-xl flex-shrink-0 shadow-xs border border-white"
                        style={{ backgroundColor: p.hex }}
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800">{p.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{p.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Hex Color Picker */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.customColorLabel}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-10 rounded-xl cursor-pointer border border-slate-200 p-1 bg-white"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-36 px-3 py-2 border border-slate-200 rounded-xl font-mono text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Welcome Message Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.welcomeMessageLabel}
            </label>
            <textarea
              rows={3}
              placeholder={t.welcomeMessagePlaceholder}
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            />
            <p className="text-xs text-slate-400">
              Ce message sera affiché sous le nom de votre salon sur votre page publique de réservation.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {saving ? t.confirming : t.saveBrandingBtn}
            </button>
          </div>
        </div>

        {/* Right Column: Live Smartphone Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>{t.livePreviewTitle}</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                Simulateur
              </span>
            </div>

            {/* Mobile Device Mockup */}
            <div className="bg-slate-900 p-3.5 rounded-[40px] shadow-2xl border-4 border-slate-800">
              {/* Notch */}
              <div className="w-24 h-4 bg-slate-900 mx-auto rounded-b-xl mb-2 flex justify-center items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              </div>

              {/* Screen */}
              <div className="bg-slate-50 rounded-[28px] overflow-hidden min-h-[460px] flex flex-col">
                {/* Header with selected brand color */}
                <div
                  className="p-5 text-white transition-colors duration-300 relative"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black text-sm mb-3">
                    BP
                  </div>
                  <h3 className="font-black text-base leading-tight">
                    {business?.name || 'Salon Amina'}
                  </h3>
                  <p className="text-[11px] text-white/80 mt-1 line-clamp-2">
                    {welcomeMessage || t.welcomeMessagePlaceholder}
                  </p>
                  <span className="inline-block mt-2 text-[9px] font-bold bg-white/25 px-2 py-0.5 rounded-full">
                    📍 {business?.city || 'Fès'} • {business?.phone || '+212 5...'}
                  </span>
                </div>

                {/* Simulated Content */}
                <div className="p-3.5 flex-1 space-y-2.5">
                  <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                    {t.stepServices}
                  </div>

                  {/* Prestation Mock Item */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-800 block">Coupe & Brushing</span>
                      <span className="text-[10px] text-slate-400">45 {t.min}</span>
                    </div>
                    <span
                      className="text-xs font-black px-2 py-1 rounded-lg text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      150 {t.mad}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-800 block">Soin Capillaire Argan</span>
                      <span className="text-[10px] text-slate-400">60 {t.min}</span>
                    </div>
                    <span
                      className="text-xs font-black px-2 py-1 rounded-lg text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      250 {t.mad}
                    </span>
                  </div>

                  {/* Booking CTA Mock */}
                  <div className="pt-2">
                    <div
                      className="w-full py-2.5 rounded-xl text-white text-center font-bold text-xs shadow-xs"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {t.confirmBooking}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
