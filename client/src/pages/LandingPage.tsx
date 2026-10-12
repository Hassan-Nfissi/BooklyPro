import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, CheckCircle2, Clock, Sparkles, Store, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.heroBadge}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
          {t.heroTitle}
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          {t.heroSub}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all text-base active:scale-95"
          >
            <span>{t.createPageBtn}</span>
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </Link>
          <Link
            to="/book/salon-amina"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-200/90 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all text-base shadow-2xs active:scale-95"
          >
            <span>{t.seeDemoBtn}</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-700 font-bold">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.featureDirhams}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.featurePdf}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.featureLanguages}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.featureNoDoubleBooking}</span>
          </div>
        </div>
      </section>

      {/* Showcase Card */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                {t.showcaseBadge}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {t.showcaseTitle}
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-xl">
                {t.showcaseSub}
              </p>
            </div>
            <Link
              to="/book/salon-amina"
              className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors self-start md:self-auto"
            >
              <span>{t.showcaseTestBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 text-sm">{t.brandCardTitle}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.brandCardSub}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 text-sm">{t.realtimeCardTitle}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.realtimeCardSub}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 text-sm">{t.noConflictCardTitle}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.noConflictCardSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="BooklyPro" className="w-6 h-6 object-contain" />
              <span className="font-black text-lg tracking-tight text-slate-900 leading-none">
                Bookly<span className="text-emerald-600">Pro</span>
              </span>
              <span className="text-[10px] uppercase font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                🇲🇦 {t.moroccoBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{t.craftedInMorocco}</p>
          </div>

          {/* Co-Founder credit badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 shadow-2xs">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              HN
            </div>
            <div className="text-left rtl:text-right">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block leading-none">{t.coFounder}</span>
              <span className="text-xs font-black text-slate-900 leading-tight">Hassan Nfissi</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right">
            © 2026 BooklyPro. {t.allRightsReserved}
          </p>
        </div>
      </footer>
    </div>
  );
};
