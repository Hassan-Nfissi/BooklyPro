import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';
import { AppointmentItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { generateBookingReceiptPdf } from '../utils/pdfGenerator';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Download,
  MessageCircle,
  FileText
} from 'lucide-react';

export const BookingConfirmedPage: React.FC = () => {
  const { reference } = useParams<{ reference: string }>();
  const { t, isRtl } = useLanguage();

  const [appointment, setAppointment] = useState<AppointmentItem | null>(null);
  const [business, setBusiness] = useState<{ name: string; city?: string; address?: string; phone?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await api.get(`/public/appointments/${reference}`);
        setAppointment(res.data);

        // Fetch business details for receipt
        if (res.data.businessId) {
          try {
            const busRes = await api.get(`/owner/business`);
            setBusiness(busRes.data);
          } catch {
            setBusiness({ name: 'BooklyPro Salon' });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (reference) fetchAppointment();
  }, [reference]);

  const handleDownloadPdf = () => {
    if (!appointment) return;
    setDownloading(true);
    try {
      generateBookingReceiptPdf(appointment, business || undefined);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du téléchargement du PDF');
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">
        {t.searchingSlots}
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Réservation introuvable</h2>
        <p className="text-sm text-slate-500 mt-1">Veuillez vérifier votre référence de réservation.</p>
      </div>
    );
  }

  const rawPhone = business?.phone?.replace(/[^0-9]/g, '') || '';
  const cleanPhone = rawPhone.startsWith('0') ? '212' + rawPhone.substring(1) : rawPhone;

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto w-full">
        {/* Language selector on confirmation */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.confirmedTitle}</h1>
            <p className="text-xs text-slate-500 mt-1">
              {t.confirmedSub}
            </p>
          </div>

          {/* Receipt Preview Box */}
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 text-left rtl:text-right space-y-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.uniqueRef}</span>
              <p className="font-mono font-black text-lg text-teal-700 tracking-wider">{appointment.bookingReference}</p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-slate-900">{appointment.serviceName}</span>
                <p className="text-[11px] text-slate-400">{t.durationLabel} : {appointment.durationMinutes} {t.min}</p>
              </div>
              <span className="text-base font-extrabold text-slate-900">{appointment.priceMad} {t.mad}</span>
            </div>

            <div className="pt-2 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>{new Date(appointment.startsAt).toLocaleDateString(t.mad === 'درهم' ? 'ar-MA' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>{new Date(appointment.startsAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>{t.specialistLabel} : <strong>{appointment.staffName}</strong></span>
              </div>
            </div>
          </div>

          {/* Action: Download PDF Receipt */}
          <div className="space-y-2.5">
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-xl font-bold text-xs hover:bg-teal-700 shadow-md shadow-teal-600/20 transition-all active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Génération...' : t.downloadPdf}</span>
            </button>

            {cleanPhone && (
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Bonjour, j'ai réservé le rendez-vous ${appointment.bookingReference} pour ${appointment.serviceName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 py-2.5 px-4 rounded-xl font-bold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.shareWhatsapp}</span>
              </a>
            )}
          </div>

          <div className="p-3 bg-teal-50/60 rounded-xl text-[11px] text-teal-800 text-center font-medium">
            {t.payOnSite}
          </div>

          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-all pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{t.backHome}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
