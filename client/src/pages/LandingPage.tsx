import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, CheckCircle2, Clock, Sparkles, Store, ShieldCheck, ArrowRight, ExternalLink, User } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>{t.heroBadge}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
          {t.heroTitle}
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.heroSub}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-600/25 transition-all text-base"
          >
            <span>{t.createPageBtn}</span>
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </Link>
          <Link
            to="/book/salon-amina"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3.5 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all text-base shadow-sm"
          >
            <span>{t.seeDemoBtn}</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Devise en Dirhams (MAD)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Reçu PDF téléchargeable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Support Arabe, Français, Anglais</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Zéro double-réservation garanti</span>
          </div>
        </div>
      </section>

      {/* Showcase Card */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-50 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Aperçu en direct</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Page de réservation Salon Amina (Fès)</h2>
              <p className="text-slate-500 text-sm mt-1">Vos clients sélectionnent la prestation, le coiffeur et l'horaire en 3 clics et téléchargent leur reçu.</p>
            </div>
            <Link
              to="/book/salon-amina"
              className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              <span>Tester la réservation & le PDF</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Store className="w-6 h-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Votre Marque & Vos Tarifs</h3>
              <p className="text-xs text-slate-500 mt-1">Personnalisez votre logo, vos couleurs, vos services (MAD) et vos horaires d'ouverture.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Clock className="w-6 h-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Disponibilités Temps Réel</h3>
              <p className="text-xs text-slate-500 mt-1">Calcul automatique des créneaux selon la durée du soin et le temps de préparation.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-6 h-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Zéro Conflit d'Horaire</h3>
              <p className="text-xs text-slate-500 mt-1">Verrouillage transactionnel instantané. Aucun risque de double réservation simultanée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-slate-900">Bookly<span className="text-teal-600">Pro</span></span>
              <span className="text-[10px] uppercase font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                🇲🇦 Maroc
              </span>
            </div>
            <p className="text-xs text-slate-500">{t.craftedInMorocco}</p>
          </div>

          {/* Co-Founder credit badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200/80 shadow-2xs">
            <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              HN
            </div>
            <div className="text-left rtl:text-right">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block leading-none">{t.coFounder}</span>
              <span className="text-xs font-black text-slate-900 leading-tight">Hassan Nfissi</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right">
            © 2026 BooklyPro. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};
