import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { PublicBusiness, ServiceItem, StaffItem, SlotItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import {
  Calendar,
  Clock,
  Phone,
  MapPin,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';

export const PublicBookingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, isRtl } = useLanguage();

  const [business, setBusiness] = useState<PublicBusiness | null>(null);
  const [loadingBusiness, setLoadingBusiness] = useState(true);
  const [errorBusiness, setErrorBusiness] = useState<string | null>(null);

  // Flow: 1: Service, 2: Staff, 3: Date & Slot, 4: Client Info
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState<SlotItem[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null);

  // Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await api.get(`/public/businesses/${slug}`);
        setBusiness(res.data);
      } catch (err: any) {
        setErrorBusiness(err.response?.data?.message || 'Page introuvable');
      } finally {
        setLoadingBusiness(false);
      }
    };
    if (slug) fetchBusiness();
  }, [slug]);

  useEffect(() => {
    if (business && selectedService && selectedDate) {
      const fetchSlots = async () => {
        setLoadingSlots(true);
        setSelectedSlot(null);
        try {
          const staffParam = selectedStaff ? `&staffId=${selectedStaff.id}` : '';
          const res = await api.get(
            `/public/businesses/${slug}/availability?serviceId=${selectedService.id}&date=${selectedDate}${staffParam}`
          );
          setAvailableSlots(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [business, selectedService, selectedStaff, selectedDate, slug]);

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedSlot) return;

    setBookingError(null);
    setSubmitting(true);
    try {
      const res = await api.post(`/public/businesses/${slug}/appointments`, {
        serviceId: selectedService.id,
        staffId: selectedSlot.staffId,
        startsAt: selectedSlot.startTime,
        customerName,
        customerPhone,
        customerEmail,
        customerNote,
      });

      navigate(`/booking/confirmed/${res.data.bookingReference}`);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setBookingError("Ce créneau vient d'être réservé par un autre client. Veuillez choisir un autre horaire disponible.");
        setCurrentStep(3);
      } else {
        setBookingError(err.response?.data?.message || "Erreur lors de la réservation");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingBusiness) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-medium">{t.searchingSlots}</div>
      </div>
    );
  }

  if (errorBusiness || !business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Établissement indisponible</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">{errorBusiness || "Cette page n'existe pas."}</p>
      </div>
    );
  }

  const primaryColor = business.branding?.primaryColor || '#0d9488';
  const rawPhone = business.phone?.replace(/[^0-9]/g, '') || '212600000000';
  const cleanPhone = rawPhone.startsWith('0') ? '212' + rawPhone.substring(1) : rawPhone;

  return (
    <div className="min-h-screen bg-slate-100/70 pb-16">
      {/* Top Header with branding & Language Switcher */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-md flex-shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              {business.branding?.logoUrl ? (
                <img src={business.branding.logoUrl} alt={business.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                business.name.charAt(0)
              )}
            </div>

            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">{business.name}</h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{business.city}{business.address ? ` • ${business.address}` : ''}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 mt-6">
        {/* Welcome Callout & WhatsApp CTA */}
        {business.branding?.welcomeMessage && (
          <div className="mb-5 p-3.5 bg-white rounded-2xl border border-slate-200/70 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-600 italic">
              "{business.branding.welcomeMessage}"
            </p>
            {business.phone && (
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors flex-shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.contactOnWhatsapp}</span>
              </a>
            )}
          </div>
        )}

        {bookingError && (
          <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
            <span>{bookingError}</span>
          </div>
        )}

        {/* Step 1: Services */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">{t.step1Title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.step1Sub}</p>
            </div>

            <div className="space-y-3">
              {business.services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => {
                    setSelectedService(srv);
                    setCurrentStep(2);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    selectedService?.id === srv.id
                      ? 'border-teal-600 bg-teal-50/20 shadow-sm'
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{srv.name}</h3>
                    {srv.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.description}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{srv.durationMinutes} {t.min}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 rtl:text-left">
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">{srv.priceMad} {t.mad}</span>
                    <button
                      className="block mt-2 text-xs font-bold px-3.5 py-1.5 rounded-xl text-white shadow-sm transition-transform active:scale-95"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Choisir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Staff */}
        {currentStep === 2 && selectedService && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t.changeService} ({selectedService.name})</span>
              </button>
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-900">{t.step2Title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.step2Sub}</p>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => {
                  setSelectedStaff(null);
                  setCurrentStep(3);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedStaff === null ? 'border-teal-600 bg-teal-50/20 shadow-sm' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{t.anyStaff}</h3>
                    <p className="text-xs text-slate-400">{t.anyStaffSub}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
              </div>

              {business.staff
                .filter(stf => stf.assignedServiceIds.includes(selectedService.id))
                .map((stf) => (
                  <div
                    key={stf.id}
                    onClick={() => {
                      setSelectedStaff(stf);
                      setCurrentStep(3);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      selectedStaff?.id === stf.id ? 'border-teal-600 bg-teal-50/20 shadow-sm' : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-extrabold text-sm">
                        {stf.displayName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{stf.displayName}</h3>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Step 3: Date & Slots */}
        {currentStep === 3 && selectedService && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t.changeStaff}</span>
              </button>
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-900">{t.step3Title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.step3Sub}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.dateLabel}</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">{t.availableSlots}</label>

              {loadingSlots ? (
                <div className="py-8 text-center text-xs text-slate-400">{t.searchingSlots}</div>
              ) : availableSlots.length === 0 ? (
                <div className="py-8 text-center bg-slate-50 rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs font-semibold text-slate-600">{t.noSlots}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{t.noSlotsSub}</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlot?.startTime === slot.startTime;
                    return (
                      <button
                        key={slot.startTime}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setCurrentStep(4);
                        }}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                          isSelected
                            ? 'border-teal-600 bg-teal-600 text-white shadow-md'
                            : 'border-slate-100 hover:border-slate-300 text-slate-700 bg-slate-50'
                        }`}
                      >
                        {slot.formattedTime}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Contact & Confirm */}
        {currentStep === 4 && selectedService && selectedSlot && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t.changeSlot}</span>
              </button>
            </div>

            {/* Recap Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t.recap}</span>
              <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                <span>{selectedService.name}</span>
                <span className="text-teal-700">{selectedService.priceMad} {t.mad}</span>
              </div>
              <div className="text-xs text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
                <span>📅 {new Date(selectedSlot.startTime).toLocaleDateString(t.mad === 'درهم' ? 'ar-MA' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                <span>⏰ {selectedSlot.formattedTime} ({selectedService.durationMinutes} {t.min})</span>
                <span>👤 {selectedSlot.staffName}</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-900">{t.step4Title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.step4Sub}</p>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.fullName}</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="ex. Fatima Zahra"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.phone}</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.emailOptional}</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="contact@exemple.ma"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.noteOptional}</label>
                <input
                  type="text"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="ex. Première visite, cheveux mi-longs..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Check className="w-5 h-5" />
                  <span>{submitting ? t.confirming : t.confirmBooking}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
