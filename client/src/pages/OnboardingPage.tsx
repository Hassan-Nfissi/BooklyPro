import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { CheckCircle2, ArrowRight, ArrowLeft, Store, Scissors, Palette, Clock, Check } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { business, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [serviceName, setServiceName] = useState('Coupe & Brushing');
  const [servicePrice, setServicePrice] = useState('150');
  const [serviceDuration, setServiceDuration] = useState('45');
  const [primaryColor, setPrimaryColor] = useState('#0d9488');
  const [welcomeMessage, setWelcomeMessage] = useState('Prenez rendez-vous en quelques clics.');
  const [loading, setLoading] = useState(false);

  const handleNextStep = async () => {
    if (step === 3) {
      // Save service
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
      // Save branding
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
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de la publication');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-between text-xs font-bold text-slate-400">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-teal-600' : ''}`}>
            <span className="w-6 h-6 rounded-full border flex items-center justify-center font-bold">1</span>
            <span className="hidden sm:inline">Établissement</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-teal-600' : ''}`}>
            <span className="w-6 h-6 rounded-full border flex items-center justify-center font-bold">2</span>
            <span className="hidden sm:inline">Personnalisation</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-teal-600' : ''}`}>
            <span className="w-6 h-6 rounded-full border flex items-center justify-center font-bold">3</span>
            <span className="hidden sm:inline">Premier Service</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-teal-600' : ''}`}>
            <span className="w-6 h-6 rounded-full border flex items-center justify-center font-bold">4</span>
            <span className="hidden sm:inline">Publication</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Bienvenue sur BooklyPro ! 🎉</h2>
              <p className="text-sm text-slate-500">
                Votre établissement <strong>{business?.name}</strong> est presque prêt. Vos clients pourront réserver sur :
              </p>
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-teal-900 font-mono text-sm">
                https://booklypro.ma/book/{business?.slug}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Couleurs & Message d'accueil</h2>
              <p className="text-sm text-slate-500">Choisissez la couleur de votre marque et le message qui apparaîtra sur votre page de réservation.</p>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Couleur principale</label>
                <div className="flex items-center gap-3">
                  {['#0d9488', '#0284c7', '#7c3aed', '#db2777', '#ea580c'].map(c => (
                    <button
                      key={c}
                      onClick={() => setPrimaryColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-8 h-8 rounded-full border-2 ${primaryColor === c ? 'scale-110 border-slate-900' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message d'accueil</label>
                <input
                  type="text"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Votre première prestation</h2>
              <p className="text-sm text-slate-500">Ajoutez au moins un service pour permettre à vos clients de réserver.</p>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom de la prestation</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tarif (MAD)</label>
                  <input
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Durée (minutes)</label>
                  <input
                    type="number"
                    value={serviceDuration}
                    onChange={(e) => setServiceDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Tout est prêt ! 🚀</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                En publiant votre page, elle sera immédiatement accessible à vos clients pour réserver en ligne 24h/24.
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-between items-center pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>
            ) : <div></div>}

            {step < 4 ? (
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-700 transition-all"
              >
                <span>Continuer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
              >
                <span>{loading ? 'Publication...' : 'Publier et aller au tableau de bord'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
