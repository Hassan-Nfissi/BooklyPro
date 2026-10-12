import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Lock, Mail, ArrowRight, ArrowLeft, Zap, AlertCircle } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const { login, googleLogin, devLogin } = useAuth();
  const { t, isRtl } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  const handleDevLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await devLogin('owner@salonamina.ma');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion démo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Back to Home Link */}
      <Link
        to="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 rtl:left-auto rtl:right-4 sm:rtl:right-6 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold border border-slate-200/90 shadow-2xs transition-all active:scale-95 group"
      >
        <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-900 rtl:rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
        <span>{t.backHome}</span>
      </Link>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6">
        <LanguageSelector />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block mb-4">
          <img src="/logo.png" alt="BooklyPro" className="h-12 w-auto object-contain mx-auto" />
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          {t.loginTitle}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          {t.loginSub}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* 1-Click Dev Login button */}
          <div className="mb-6">
            <button
              onClick={handleDevLogin}
              disabled={loading}
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{t.oneClickDemo}</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              {t.oneClickDemoSub}
            </p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-bold tracking-wider">
                {t.orDivider}
              </span>
            </div>
          </div>

          {/* Google OAuth Login */}
          <div className="mb-6 flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                if (credentialResponse.credential) {
                  try {
                    await googleLogin(credentialResponse.credential);
                    navigate('/dashboard');
                  } catch (err: any) {
                    setError('Échec de la validation Google');
                  }
                }
              }}
              onError={() => setError('Connexion Google annulée')}
              text="signin_with"
              shape="rectangular"
              locale="fr"
            />
          </div>

          {/* Email / Password Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.emailLabel} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="nom@salon.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.passwordLabel} *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-800 shadow-md transition-all active:scale-95 disabled:opacity-50 mt-2"
            >
              <span>{loading ? t.confirming : t.signInBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>

          {/* Register Prompt */}
          <div className="mt-6 text-center">
            <span className="text-xs text-slate-500">
              {t.noAccountPrompt}{' '}
            </span>
            <Link to="/register" className="text-xs font-bold text-emerald-700 hover:underline">
              {t.register}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
