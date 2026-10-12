import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Store,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Star,
  Scissors,
  FileText,
  Globe,
  Users,
  TrendingUp,
  Check,
  Smartphone,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, isRtl, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'core' | 'business' | 'client'>('core');
  const [simulatedDay, setSimulatedDay] = useState<number>(0);
  const [simulatedSlot, setSimulatedSlot] = useState<string>('11:30');

  // Simulated booking days
  const simDays = [
    { label: language === 'ar' ? 'اليوم' : language === 'en' ? 'Today' : 'Aujourd\'hui', date: '14 Oct' },
    { label: language === 'ar' ? 'غداً' : language === 'en' ? 'Tomorrow' : 'Demain', date: '15 Oct' },
    { label: language === 'ar' ? 'بعد غد' : language === 'en' ? 'In 2 days' : 'Après-demain', date: '16 Oct' },
  ];

  const simSlots = ['10:00', '11:30', '14:00', '15:30', '17:00'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* =========================================================================
          1. HERO SECTION (SimplyBook.me Inspired Clean SaaS Header)
      ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 text-center">
        {/* Glow backdrop decorative effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-100/60 to-teal-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Hero Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold mb-6 shadow-2xs hover:bg-emerald-100/70 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>{t.heroBadge}</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
          {t.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          {t.heroSub}
        </p>

        {/* Dual High-Conversion CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-600/25 transition-all text-base active:scale-95 group"
          >
            <span>{t.createPageBtn}</span>
            <ArrowRight className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/book/salon-amina"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-slate-800 border border-slate-200/90 px-6 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all text-base shadow-sm active:scale-95"
          >
            <span>{t.seeDemoBtn}</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Sub-CTA micro-badge */}
        <p className="mt-3 text-xs text-slate-400 font-medium">
          {t.noCardRequired}
        </p>

        {/* Quick Value Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-700 font-bold">
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{t.featureDirhams}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{t.featurePdf}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{t.featureLanguages}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{t.featureNoDoubleBooking}</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SOCIAL PROOF & TRUST STRIP (SimplyBook.me Style Trust Bar)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-16">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-md shadow-slate-200/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-slate-100">
            {/* Google Reviews */}
            <div className="flex flex-col items-center text-center p-2">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{t.trustRatingGoogle}</span>
              <span className="text-[11px] text-slate-400 font-medium">98% avis 5 étoiles</span>
            </div>

            {/* Capterra / Satisfaction */}
            <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <Award className="w-4 h-4" />
                <span className="font-black text-sm text-slate-900">4.8 / 5</span>
              </div>
              <span className="text-xs font-bold text-slate-800">{t.trustRatingCapterra}</span>
              <span className="text-[11px] text-slate-400 font-medium">Facilité d'utilisation</span>
            </div>

            {/* Moroccan Salons */}
            <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
              <div className="flex items-center gap-1.5 text-slate-900 mb-1">
                <span className="text-base">🇲🇦</span>
                <span className="font-black text-sm">+120 Établissements</span>
              </div>
              <span className="text-xs font-bold text-slate-800">{t.trustMoroccoSalons}</span>
              <span className="text-[11px] text-slate-400 font-medium">Casablanca, Rabat, Fès, Marrakech</span>
            </div>

            {/* 100% Secured */}
            <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
              <div className="flex items-center gap-1.5 text-teal-600 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-black text-sm text-slate-900">100% Sécurisé</span>
              </div>
              <span className="text-xs font-bold text-slate-800">{t.trustSecured}</span>
              <span className="text-[11px] text-slate-400 font-medium">RGPD & Données protégées</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE TABBED FEATURES SHOWCASE (SimplyBook.me Signature)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black text-emerald-600 tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Fonctionnalités SaaS Avancées
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            {t.featuresSectionTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {t.featuresSectionSub}
          </p>
        </div>

        {/* Tab Selection Buttons (Horizontal Pills) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('core')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'core'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{t.tabCoreFeatures}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('business')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'business'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t.tabBusinessGrowth}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('client')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'client'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.tabClientExperience}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTab === 'core' && (
            <>
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 ring-4 ring-emerald-50/50">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    24h/24 & 7j/7
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'حجز ذاتي على مدار الساعة' : language === 'en' ? '24/7 Self-Service Booking' : 'Réservation en Ligne 24/7'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'يتمكن زبناؤك من اختيار الخدمات والمواعيد بحرية تامة في أي وقت دون مقاطعتك بالاتصالات أثناء تقديم الخدمات.'
                      : language === 'en'
                      ? 'Clients can schedule their own visits anytime, anywhere without interrupting your hands-on client treatments.'
                      : 'Vos clients réservent à n\'importe quelle heure du jour ou de la nuit depuis leur smartphone, sans jamais vous déranger pendant un soin.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'متوافق مع الهواتف الذكية' : language === 'en' ? 'Optimized for all smartphones' : 'Optimisé smartphones & tablettes'}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 ring-4 ring-teal-50/50">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-teal-600 uppercase tracking-wider bg-teal-50/80 px-2.5 py-0.5 rounded-md border border-teal-100">
                    Algorithme Atomique
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'ضمان عدم تضارب المواعيد' : language === 'en' ? 'Zero Double-Booking Guarantee' : 'Verrouillage Zéro Conflit'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'حماية تامة للمواعيد : بمجرد حجز أي توقيت يُقفل تلقائياً بالمللي ثانية لمنع أي تداخل بين زبونين في نفس الوقت.'
                      : language === 'en'
                      ? 'Instant transaction slot locking prevents double bookings completely, ending confusing paper overlaps forever.'
                      : 'Chaque créneau est verrouillé instantanément au niveau base de données. Fini les chevauchements et les ratures du carnet papier.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-teal-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'دقة وموثوقية بنسبة 100%' : language === 'en' ? '100% Slot Reliability' : 'Fiabilité absolue du planning'}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 ring-4 ring-emerald-50/50">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    PDF & WhatsApp
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'وصل حجز رسمي فوري' : language === 'en' ? 'Instant Official PDF Receipt' : 'Reçu Officiel PDF Téléchargeable'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'يتلقى الزبون وصلاً أنيقاً بصيغة PDF يتضمن رمز الحجز الفريد، تفاصيل الخدمة، السعر بالدرهم، وإمكانية المشاركة الفورية عبر واتساب.'
                      : language === 'en'
                      ? 'Generates a sleek branded PDF ticket with a unique booking reference, full breakdown, MAD pricing, and WhatsApp share.'
                      : 'Génération automatique d\'un reçu professionnel avec référence unique, détails du soin, tarif en MAD et bouton de partage WhatsApp.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تقليل التخلف عن المواعيد (No-shows)' : language === 'en' ? 'Significantly reduces no-shows' : 'Réduit drastiquement les no-shows'}</span>
                </div>
              </div>
            </>
          )}

          {activeTab === 'business' && (
            <>
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 ring-4 ring-emerald-50/50">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    Équipe & Staff
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'إدارة فريق العمل والمختصين' : language === 'en' ? 'Staff & Team Scheduling' : 'Planning Multi-Collaborateurs'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'قم بإضافة الحلاقين، خبيرات التجميل، والمدلكين. يستطيع الزبون اختيار مصففه المفضل مع جدول مواعيد مستقل لكل عضو في الفريق.'
                      : language === 'en'
                      ? 'Add your barbers, estheticians, and therapists. Clients can pick their favorite specialist with individual shift calendars.'
                      : 'Attribuez les soins à vos coiffeurs, barbiers ou esthéticiennes. Chaque membre possède son calendrier dédié et ses créneaux.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تنظيم دقيق لمهام كل مختص' : language === 'en' ? 'Individual specialist shifts' : 'Plannings d\'équipe individualisés'}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 ring-4 ring-teal-50/50">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-teal-600 uppercase tracking-wider bg-teal-50/80 px-2.5 py-0.5 rounded-md border border-teal-100">
                    MAD & Statistiques
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'متابعة المداخيل بالدرهم (MAD)' : language === 'en' ? 'Revenue Tracking in Dirhams' : 'Suivi Financier en Dirhams'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'لوحة تحكم توضح مواعيد اليوم، الحجوزات المؤكدة، والمداخيل المحققة بالدرهم المغربي لاتخاذ قرارات تجارية ذكية.'
                      : language === 'en'
                      ? 'Clear analytics on today\'s bookings, completed visits, and generated volume in Moroccan Dirhams (MAD).'
                      : 'Tableau de bord clair indiquant le nombre de réservations du jour, les prestations confirmées et le CA estimé en dirhams.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-teal-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'رؤية شاملة ومباشرة للمداخيل' : language === 'en' ? 'Real-time financial visibility' : 'Visibilité instantanée des flux'}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 ring-4 ring-emerald-50/50">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    Configuration Précise
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'مرونة ساعات العمل والراحة' : language === 'en' ? 'Custom Hours & Buffer Times' : 'Horaires & Temps Tampons'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'حدد أيام الفتح وساعات العمل وأوقات الاستراحة، مع إمكانية إضافة دقائق تنظيف وتعقيم (buffer) بين المواعيد.'
                      : language === 'en'
                      ? 'Configure opening hours, break times, and automatic cleaning buffer minutes between customer appointments.'
                      : 'Définissez vos heures d\'ouverture, pauses déjeuner et temps de battement pour préparer votre matériel entre chaque client.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تنظيم هادئ ومريح ليومك' : language === 'en' ? 'Stress-free salon agenda' : 'Journées sereines et sans stress'}</span>
                </div>
              </div>
            </>
          )}

          {activeTab === 'client' && (
            <>
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 ring-4 ring-emerald-50/50">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    Sans Application
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'حجز سلس في أقل من دقيقة' : language === 'en' ? 'Fast 3-Step Mobile Booking' : 'Réservation Mobile en 3 Clics'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'لا داعي لتحميل أي تطبيق ثقيل أو إنشاء حساب معقد. يفتح الرابط فوراً من إنستغرام أو واتساب ويحجز الزبون بثلاث نقرات.'
                      : language === 'en'
                      ? 'No heavy apps to download. The link opens seamlessly directly from Instagram bio or WhatsApp.'
                      : 'Aucune application à installer. Le lien s\'ouvre instantanément depuis votre bio Instagram, WhatsApp ou Google Maps.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'رابط مباشر للبايو وإنستغرام' : language === 'en' ? 'Perfect for Instagram bio' : 'Idéal pour le lien Instagram bio'}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 ring-4 ring-teal-50/50">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-teal-600 uppercase tracking-wider bg-teal-50/80 px-2.5 py-0.5 rounded-md border border-teal-100">
                    Français • العربية • English
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'تجربة ثلاثية اللغات مع العربية الأصلية' : language === 'en' ? 'Native Trilingual Experience' : 'Support Trilingue Naturel'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'واجهة تفاعلية كاملة باللغة العربية مع خط تجوال المغربي الأنيق ودعم كامل لاتجاه القراءة من اليمين إلى اليسار (RTL).'
                      : language === 'en'
                      ? 'Full trilingual support: French, natural Arabic with RTL direction and Tajawal typography, and English.'
                      : 'Vos clients naviguent confortablement en français, en arabe marocain natif de droite à gauche (RTL) ou en anglais.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-teal-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تناغم تام مع ثقافة وخصوصية المغرب' : language === 'en' ? 'Culturally adapted for Morocco' : '100% adapté aux clients marocains'}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-100 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 ring-4 ring-emerald-50/50">
                    <Store className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    Sans Carte Bancaire
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === 'ar' ? 'دفع مريح بالصالون بعين المكان' : language === 'en' ? 'Frictionless Pay on Site' : 'Paiement Simplifié au Salon'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ar'
                      ? 'إزالة عائق الدفع المسبق الإجباري بالبطاقة. يحجز الزبون مجاناً ويدفع عند حضوره إلى الصالون كاش أو عبر TPE.'
                      : language === 'en'
                      ? 'Removes online card payment friction. Clients book securely and settle payments on arrival at your front desk.'
                      : 'Pas d\'obligation de carte bancaire pour réserver : vos clients valident leur présence et règlent sur place au comptoir.'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'نسبة تحويل وحجوزات أعلى' : language === 'en' ? 'Maximizes booking conversion' : 'Taux de réservation maximal'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* =========================================================================
          4. SPLIT 2-COLUMN "RUN & GROW" SHOWCASE WITH INTERACTIVE LIVE AGENDA
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white via-emerald-50/30 to-white rounded-3xl border border-slate-200/80 my-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.liveAgendaSimulator}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {language === 'ar'
                ? 'تجربة حجز احترافية تعكس فخامة صالونك'
                : language === 'en'
                ? 'Elevate your salon brand with an agenda built to convert'
                : 'Offrez à vos clients l\'expérience de réservation la plus moderne du Maroc'}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {language === 'ar'
                ? 'وداعاً للدفاتر الورقية المتسخة والمكالمات الفائتة. يرى زبونك خدماتك وأسعارك والمواعيد المتاحة بوضوح، مع تأكيد فوري ووصل PDF أنيق.'
                : language === 'en'
                ? 'No more messy paper journals or lost phone messages. Your clients pick their desired treatment, choose their specialist, and receive an instant PDF ticket.'
                : 'Fini le carnet papier et les rendez-vous notés à la hâte. Vos clients découvrent vos prestations, vos tarifs en dirhams et vos disponibilités en un coup d\'œil.'}
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {language === 'ar' ? 'حجز مباشر وسريع في أقل من دقيقة واحدة' : language === 'en' ? 'Instant booking in under 60 seconds' : 'Prise de rendez-vous fluide en moins de 60 secondes'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {language === 'ar' ? 'تأكيد فوري مع خيار تحميل وصل PDF' : language === 'en' ? 'Instant confirmation & downloadable PDF ticket' : 'Confirmation immédiate avec reçu PDF haute résolution'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {language === 'ar' ? 'مشاركة مباشرة وتواصل عبر واتساب' : language === 'en' ? 'Direct WhatsApp communication & reminders' : 'Partage WhatsApp et rappel automatique du rendez-vous'}
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/book/salon-amina"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/20 text-sm transition-all active:scale-95"
              >
                <span>{t.seeDemoBtn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-50 text-sm transition-all"
              >
                <span>{t.createPageBtn}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Simulated Live Agenda Widget (SimplyBook.me signature) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xl shadow-emerald-900/10 relative overflow-hidden">
              {/* Header of simulated booking page */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black text-lg flex items-center justify-center shadow-md">
                    SA
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-slate-900 text-base">Salon Amina</h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {language === 'ar' ? 'مفتوح اليوم' : language === 'en' ? 'Open Today' : 'Ouvert'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        4.9
                      </span>
                      <span>• Fès / Casablanca</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-400">
                  {language === 'ar' ? 'معاينة حية' : language === 'en' ? 'Live Simulator' : 'Simulation'}
                </span>
              </div>

              {/* Step indicator */}
              <div className="my-5 flex items-center justify-between text-xs font-bold text-slate-600">
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
                  {t.stepServices}
                </span>
                <span className="text-slate-300">→</span>
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                  {t.stepTime}
                </span>
                <span className="text-slate-300">→</span>
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">3</span>
                  {t.stepDetails}
                </span>
              </div>

              {/* Interactive Date Selector */}
              <div className="mb-4">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  {language === 'ar' ? 'اختر اليوم :' : language === 'en' ? 'Select Date:' : 'Choisissez une date :'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {simDays.map((d, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSimulatedDay(idx)}
                      className={`p-2.5 rounded-xl text-center border transition-all text-xs font-bold ${
                        simulatedDay === idx
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-[11px] text-slate-500 font-medium">{d.label}</span>
                      <span className="block font-black mt-0.5">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Slots Selector */}
              <div className="mb-5">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  {language === 'ar' ? 'الأوقات المتوفرة :' : language === 'en' ? 'Available Time Slots:' : 'Créneaux disponibles :'}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {simSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSimulatedSlot(slot)}
                      className={`py-2 rounded-lg text-center text-xs font-bold transition-all border ${
                        simulatedSlot === slot
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Service & Receipt Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Brushing & Soin Argan</span>
                    <span className="text-slate-500 mt-0.5 block text-xs">Spécialiste : Amina K. • 45 min</span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="font-black text-emerald-700 text-base">150 MAD</span>
                    <span className="block text-[10px] text-slate-400 font-medium">Sur place</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Créneau : {simDays[simulatedDay].date} à {simulatedSlot}</span>
                  </div>
                  <Link
                    to="/book/salon-amina"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline"
                  >
                    <span>{language === 'ar' ? 'تجربة حية كاملة' : language === 'en' ? 'Full interactive demo' : 'Essayer la démo complète'}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. MOROCCAN BEAUTY SECTOR SOLUTIONS GRID (SimplyBook.me Industry Solutions)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black text-emerald-600 tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Secteurs & Métiers
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            {t.industryTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {t.industrySub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sector 1: Hair & Barber */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md shadow-slate-100 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-lg mb-2">
                {t.industryHair}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                {t.industryHairDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Dégradé Barbe</span>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Kératine</span>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Coloration</span>
            </div>
          </div>

          {/* Sector 2: Moroccan Spa & Hammam */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md shadow-slate-100 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-lg mb-2">
                {t.industrySpa}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                {t.industrySpaDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Bain Beldi</span>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Savon Noir</span>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Argan Massage</span>
            </div>
          </div>

          {/* Sector 3: Beauty & Nails */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md shadow-slate-100 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-lg mb-2">
                {t.industryBeauty}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                {t.industryBeautyDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Manucure Gel</span>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Pose Cils</span>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Hydrafacial</span>
            </div>
          </div>

          {/* Sector 4: Wellness & Holistic */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md shadow-slate-100 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-lg mb-2">
                {t.industryWellness}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                {t.industryWellnessDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Drainage</span>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Réflexologie</span>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Remise en Forme</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. BEFORE VS WITH BOOKLYPRO COMPARISON MATRIX (SimplyBook.me Style)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black text-emerald-600 tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Comparatif & Valeur Ajoutée
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            {t.comparisonTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {t.comparisonSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before BooklyPro */}
          <div className="bg-slate-50/80 rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm relative">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-200/80">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black">
                ✕
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-lg">{t.comparisonColBefore}</h3>
                <span className="text-xs text-slate-400">Carnet papier & téléphone classique</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.compItem1Before}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.compItem2Before}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.compItem3Before}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.compItem4Before}
                </p>
              </div>
            </div>
          </div>

          {/* With BooklyPro */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-emerald-500 shadow-xl shadow-emerald-600/10 relative">
            <div className="absolute -top-3.5 right-6 rtl:right-auto rtl:left-6 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              Recommandé par +120 salons
            </div>

            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                ✓
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">{t.comparisonColAfter}</h3>
                <span className="text-xs text-emerald-700 font-bold">Plateforme automatisée BooklyPro</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {t.compItem1After}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {t.compItem2After}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {t.compItem3After}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {t.compItem4After}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. HIGH-CONVERTING BOTTOM CTA BANNER (SimplyBook.me Signature Banner)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-8 sm:p-14 shadow-2xl overflow-hidden text-center">
          {/* Ambient decorative blur circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.finalCtaBadge}</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {t.finalCtaTitle}
            </h2>

            <p className="mt-4 text-emerald-100/90 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t.finalCtaSub}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-xl font-black text-base hover:bg-emerald-50 shadow-xl transition-all active:scale-95"
              >
                <span>{t.createPageBtn}</span>
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
              <Link
                to="/book/salon-amina"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800/80 text-white border border-emerald-400/30 px-6 py-4 rounded-xl font-bold text-base hover:bg-emerald-800 transition-all active:scale-95"
              >
                <span>{t.viewDemoLive}</span>
                <ExternalLink className="w-4 h-4 text-emerald-300" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-emerald-300/80 font-medium">
              {t.noCardRequired}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FOOTER WITH BRAND IDENTITY & CO-FOUNDER CREDIT
      ========================================================================= */}
      <footer className="border-t border-slate-200/80 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="BooklyPro" className="w-7 h-7 object-contain" />
              <span className="font-black text-xl tracking-tight text-slate-900 leading-none">
                Bookly<span className="text-emerald-600">Pro</span>
              </span>
              <span className="text-[10px] uppercase font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                🇲🇦 {t.moroccoBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{t.craftedInMorocco}</p>
          </div>

          {/* Co-Founder credit badge (Hassan Nfissi) */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              HN
            </div>
            <div className="text-left rtl:text-right">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block leading-none">
                {t.coFounder}
              </span>
              <span className="text-xs font-black text-slate-900 leading-tight">
                Hassan Nfissi
              </span>
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
