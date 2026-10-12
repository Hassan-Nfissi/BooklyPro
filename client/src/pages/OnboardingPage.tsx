import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { CheckCircle2, ArrowRight, ArrowLeft, Store, Scissors, Palette, Clock, Check, Sparkles } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { business, refreshUser } = useAuth();
  const { t, isRtl } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [serviceName, setServiceName] = useState('Coupe & Brushing');
  const [servicePrice, setServicePrice] = useState('150');
  const [serviceDuration, setServiceDuration] = useState('45');
  const [primaryColor, setPrimaryColor] = useState('#059669');
  const [welcomeMessage, setWelcomeMessage] = useState('Prenez rendez-vous en quelques clics.');
  const [loading, setLoading] = useState(false);

  const handleNextStep = async () => {
    if (step === 3) {
      try {
        await api.post('/owner/services', {
          name: serviceName,
          priceMad: parseFloat(servicePrice),
          durationMinutes: parseInt(serviceDuration, 10),
          bufferMinutes: 10,
        });
      } catch (err) {
        console.error(err);
      }
    } else if (step === 2) {
      try {
        await api.put('/owner/business/branding', {
          primaryColor,
          themeKey: 'emerald',
          welcomeMessage,
        });
      } catch (err) {
        console.error(err);
      }
    }
    setStep(s => s + 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await api.post('/owner/business/publish');
      await refreshUser();
      toast.success(t.toastSaved);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || t.toastError);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Top Language Selector */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6">
        <LanguageSelector />
      </div>

      <div className="max-w-2xl mx-auto w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="BooklyPro" className="h-10 w-auto object-contain mx-auto mb-3" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {t.onboardingWelcome}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.onboardingSub}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-between text-xs font-bold text-slate-400 px-4">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-700' : ''}`}>
            <span className={`w-7 h-7 rounded-xl border flex items-center justify-center font-black ${step >= 1 ? 'bg-emerald-50 border-emerald-300' : 'bg-white'}`}>
              1
            </span>
            <span className="hidden sm:inline">{t.stepEstablishment}</span>
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-700' : ''}`}>
            <span className={`w-7 h-7 rounded-xl border flex items-center justify-center font-black ${step >= 2 ? 'bg-emerald-50 border-emerald-300' : 'bg-white'}`}>
              2
            </span>
            <span className="hidden sm:inline">{t.stepBranding}</span>
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-emerald-700' : ''}`}>
            <span className={`w-7 h-7 rounded-xl border flex items-center justify-center font-black ${step >= 3 ? 'bg-emerald-50 border-emerald-300' : 'bg-white'}`}>
              3
            </span>
            <span className="hidden sm:inline">{t.stepFirstService}</span>
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 4 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-emerald-700' : ''}`}>
            <span className={`w-7 h-7 rounded-xl border flex items-center justify-center font-black ${step >= 4 ? 'bg-emerald-50 border-emerald-300' : 'bg-white'}`}>
              4
            </span>
            <span className="hidden sm:inline">{t.stepPublish}</span>
          </div>
        </div>

        {/* Step Card Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          {step === 1 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Store className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {business?.name || 'Votre Établissement'}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t.step1Desc}
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-mono text-xs sm:text-sm font-bold flex items-center justify-between">
                <span>https://booklypro-app.duckdns.org/book/{business?.slug}</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Palette className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {t.brandingTitle}
              </h2>
              <p className="text-sm text-slate-500">
                {t.step2Desc}
              </p>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t.themeColorLabel}
                </label>
                <div className="flex items-center gap-3">
                  {['#059669', '#065f46', '#1d4ed8', '#c2410c', '#0f172a'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setPrimaryColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-9 h-9 rounded-xl border-2 transition-transform ${primaryColor === c ? 'scale-110 border-slate-900 ring-2 ring-emerald-500' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.welcomeMessageLabel}
                </label>
                <input
                  type="text"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Scissors className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {t.newServiceModalTitle}
              </h2>
              <p className="text-sm text-slate-500">
                {t.step3Desc}
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.serviceNameLabel} *
                </label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.servicePriceLabel} *
                  </label>
                  <input
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.serviceDurationLabel} *
                  </label>
                  <input
                    type="number"
                    value={serviceDuration}
                    onChange={(e) => setServiceDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {t.readyToPublishMsg}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                {t.step4Desc}
              </p>
            </div>
          )}

          {/* Wizard Footer Navigation */}
          <div className="mt-8 flex justify-between items-center pt-5 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.back}</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 active:scale-95"
              >
                <span>{t.nextStepBtn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                <span>{loading ? t.confirming : t.finishAndLaunchBtn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
