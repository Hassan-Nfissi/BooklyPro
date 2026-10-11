import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';
import { AppointmentItem } from '../types';
import { CheckCircle2, Calendar, Clock, MapPin, User, ArrowLeft, Store } from 'lucide-react';

export const BookingConfirmedPage: React.FC = () => {
  const { reference } = useParams<{ reference: string }>();
  const [appointment, setAppointment] = useState<AppointmentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await api.get(`/public/appointments/${reference}`);
        setAppointment(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (reference) fetchAppointment();
  }, [reference]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Chargement de votre réservation...</div>;
  }

  if (!appointment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Réservation introuvable</h2>
        <p className="text-sm text-slate-500 mt-1">Vérifiez votre référence de réservation.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto w-full">
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900">Rendez-vous Confirmé !</h1>
            <p className="text-xs text-slate-500 mt-1">
              Merci {appointment.customerName}, votre créneau est validé avec succès.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Référence unique</span>
              <p className="font-mono font-extrabold text-base text-teal-700">{appointment.bookingReference}</p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-slate-900">{appointment.serviceName}</span>
                <p className="text-[11px] text-slate-400">Durée : {appointment.durationMinutes} min</p>
              </div>
              <span className="text-base font-extrabold text-slate-900">{appointment.priceMad} MAD</span>
            </div>

            <div className="pt-2 border-t border-slate-200/60 space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>{new Date(appointment.startsAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{new Date(appointment.startsAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Collaborateur : {appointment.staffName}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-teal-50/60 rounded-xl text-[11px] text-teal-800 text-center">
            Paiement sur place en dirhams (MAD) le jour de votre rendez-vous.
          </div>

          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
