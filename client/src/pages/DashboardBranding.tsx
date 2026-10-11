import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Branding } from '../types';
import { Palette, Upload, Copy, Check, Eye } from 'lucide-react';

export const DashboardBranding: React.FC = () => {
  const { business, refreshUser } = useAuth();
  const [branding, setBranding] = useState<Branding | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#0d9488');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const fetchBranding = async () => {
    try {
      const res = await api.get('/owner/business/branding');
      setBranding(res.data);
      setPrimaryColor(res.data.primaryColor || '#0d9488');
      setWelcomeMessage(res.data.welcomeMessage || '');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBranding();
  }, []);

  const handleSave = async () => {
    try {
      await api.put('/owner/business/branding', {
        primaryColor,
        themeKey: 'custom',
        welcomeMessage,
      });
      alert('Personnalisation enregistrée !');
      fetchBranding();
    } catch (err) {
      alert('Erreur lors de l’enregistrement');
    }
  };

  const handleTogglePublish = async () => {
    if (!business) return;
    try {
      if (business.published) {
        await api.post('/owner/business/unpublish');
      } else {
        await api.post('/owner/business/publish');
      }
      refreshUser();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors du changement de statut de publication');
    }
  };

  const handleCopyLink = () => {
    if (!business) return;
    const url = `${window.location.origin}/book/${business.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      alert('Logo mis à jour avec succès !');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors du téléchargement');
    } finally {
      setUploadingLogo(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Page de réservation & Branding</h1>
          <p className="text-sm text-slate-500 mt-1">Personnalisez l'apparence de votre lien public et publiez-le</p>
        </div>

        {business && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Lien copié !' : 'Copier mon lien'}</span>
            </button>

            <button
              onClick={handleTogglePublish}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                business.published
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {business.published ? 'Mettre hors ligne (Brouillon)' : 'Publier ma page'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Logo de l'établissement</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                {branding?.logoUrl ? (
                  <img src={branding.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Palette className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
                  <Upload className="w-4 h-4" />
                  <span>{uploadingLogo ? 'Envoi...' : 'Télécharger un logo'}</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
                <p className="text-[11px] text-slate-400 mt-1">PNG, JPG ou WEBP (max 5 Mo)</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Couleur principale de marque</label>
            <div className="flex items-center gap-3">
              {['#0d9488', '#0284c7', '#7c3aed', '#db2777', '#ea580c', '#1e293b'].map((color) => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    primaryColor === color ? 'scale-110 border-white shadow-md' : 'border-transparent'
                  }`}
                />
              ))}
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-8 h-8 rounded-full cursor-pointer border-0 p-0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message d'accueil client</label>
            <textarea
              rows={3}
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              placeholder="Bienvenue chez nous ! Choisissez votre prestation ci-dessous."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
          >
            Enregistrer les modifications
          </button>
        </div>

        <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Aperçu smartphone</span>
              </span>
              <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full text-slate-600">Simulateur</span>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-lg border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl text-white font-extrabold flex items-center justify-center text-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  {business ? business.name.charAt(0) : 'B'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{business?.name || 'Mon Établissement'}</h3>
                  <p className="text-[11px] text-slate-400">{business?.city || 'Casablanca'} • MAD</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl italic">
                "{welcomeMessage || 'Prenez rendez-vous en quelques clics.'}"
              </p>

              <div className="p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Coupe & Coiffure</span>
                  <span style={{ color: primaryColor }}>150 MAD</span>
                </div>
                <div className="text-[10px] text-slate-400">45 minutes</div>
              </div>

              <div
                className="w-full py-2 rounded-xl text-white text-xs font-bold text-center shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                Prendre rendez-vous
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            {business && (
              <a
                href={`/book/${business.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-teal-700 hover:underline"
              >
                Ouvrir la vraie page publique ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
