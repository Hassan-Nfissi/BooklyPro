export type Language = 'fr' | 'ar' | 'en';

export interface Translations {
  demoSalonAmina: string;
  mySpace: string;
  login: string;
  register: string;
  moroccoBadge: string;
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  createPageBtn: string;
  seeDemoBtn: string;
  step1Title: string;
  step1Sub: string;
  step2Title: string;
  step2Sub: string;
  anyStaff: string;
  anyStaffSub: string;
  step3Title: string;
  step3Sub: string;
  dateLabel: string;
  availableSlots: string;
  noSlots: string;
  noSlotsSub: string;
  searchingSlots: string;
  step4Title: string;
  step4Sub: string;
  fullName: string;
  phone: string;
  emailOptional: string;
  noteOptional: string;
  confirmBooking: string;
  confirming: string;
  recap: string;
  min: string;
  mad: string;
  changeService: string;
  changeStaff: string;
  changeSlot: string;
  confirmedTitle: string;
  confirmedSub: string;
  uniqueRef: string;
  downloadPdf: string;
  shareWhatsapp: string;
  payOnSite: string;
  backHome: string;
  durationLabel: string;
  specialistLabel: string;
  contactOnWhatsapp: string;
  back: string;
  previousStep: string;
  stepServices: string;
  stepStaff: string;
  stepTime: string;
  stepDetails: string;
  verifiedBusiness: string;
  backToOverview: string;
  coFounder: string;
  coFounderCredit: string;
  craftedInMorocco: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    demoSalonAmina: "Démo : Salon Amina (Fès)",
    mySpace: "Mon Espace",
    login: "Connexion",
    register: "Créer ma page",
    moroccoBadge: "Maroc",
    heroBadge: "La solution de réservation pour salons et instituts au Maroc",
    heroTitle: "Remplissez votre planning sans passer des heures au téléphone.",
    heroSub: "Offrez à vos clients marocains une page de réservation moderne en dirhams (MAD). Évitez les rendez-vous manqués et gérez votre équipe facilement.",
    createPageBtn: "Créer ma page en 2 minutes",
    seeDemoBtn: "Voir l'exemple Salon Amina",
    step1Title: "1. Choisissez votre prestation",
    step1Sub: "Sélectionnez le soin ou le service souhaité",
    step2Title: "2. Avec qui souhaitez-vous ce soin ?",
    step2Sub: "Choisissez votre collaborateur ou premier disponible",
    anyStaff: "N'importe quel collaborateur",
    anyStaffSub: "Le premier disponible à l'horaire sélectionné",
    step3Title: "3. Choisissez la date & l'heure",
    step3Sub: "Disponibilités vérifiées en temps réel",
    dateLabel: "Date du rendez-vous",
    availableSlots: "Créneaux horaires disponibles",
    noSlots: "Aucun créneau disponible pour cette date.",
    noSlotsSub: "L'établissement est peut-être fermé ou tous les créneaux sont réservés.",
    searchingSlots: "Recherche des créneaux libres...",
    step4Title: "4. Vos coordonnées",
    step4Sub: "Nous vous enverrons la confirmation immédiate du rendez-vous",
    fullName: "Nom complet *",
    phone: "Numéro de téléphone (WhatsApp) *",
    emailOptional: "Email (optionnel)",
    noteOptional: "Remarque ou demande particulière",
    confirmBooking: "Confirmer mon rendez-vous",
    confirming: "Validation en cours...",
    recap: "Récapitulatif de votre rendez-vous",
    min: "min",
    mad: "MAD",
    changeService: "Changer de prestation",
    changeStaff: "Changer de praticien",
    changeSlot: "Modifier l'horaire",
    confirmedTitle: "Rendez-vous Confirmé !",
    confirmedSub: "Merci, votre créneau a été validé avec succès.",
    uniqueRef: "Référence unique",
    downloadPdf: "Télécharger mon reçu officiel (PDF)",
    shareWhatsapp: "Ouvrir sur WhatsApp",
    payOnSite: "Paiement sur place en dirhams (MAD) le jour de votre rendez-vous.",
    backHome: "Retour à l'accueil",
    durationLabel: "Durée",
    specialistLabel: "Collaborateur",
    contactOnWhatsapp: "Contacter le salon sur WhatsApp",
    back: "Retour",
    previousStep: "Étape précédente",
    stepServices: "Prestation",
    stepStaff: "Collaborateur",
    stepTime: "Date & Heure",
    stepDetails: "Coordonnées",
    verifiedBusiness: "Établissement vérifié",
    backToOverview: "Retour à la vue d'ensemble",
    coFounder: "Co-Fondateur",
    coFounderCredit: "Co-Fondé par Hassan Nfissi",
    craftedInMorocco: "Conçu avec passion au Maroc pour les professionnels de service 🇲🇦"
  },
  ar: {
    demoSalonAmina: "عرض توضيحي : صالون أمينة (فاس)",
    mySpace: "لوحة التحكم",
    login: "تسجيل الدخول",
    register: "إنشاء صفحتي",
    moroccoBadge: "المغرب",
    heroBadge: "منصة الحجز الإلكتروني الأولى لصالونات ومراكز التجميل في المغرب",
    heroTitle: "نظم مواعيد زبنائك بسهولة دون إضاعة الوقت في المكالمات الهاتفية.",
    heroSub: "وفر لزبنائك المغاربة صفحة حجز عصرية بالدرهم المغربي (MAD). تجنب تضارب المواعيد وسير فريق عملك بكل سهولة.",
    createPageBtn: "ابدأ صفحتك في دقيقتين",
    seeDemoBtn: "تجربة صالون أمينة",
    step1Title: "1. اختر الخدمة المطلوبة",
    step1Sub: "حدد الخدمة أو العناية التي ترغب في حجزها",
    step2Title: "2. مع من تود إجراء الموعد؟",
    step2Sub: "اختر المصفف المفضل أو أول متاح",
    anyStaff: "أي مصفف متاح",
    anyStaffSub: "أول عضو متاح في الوقت المحدد",
    step3Title: "3. اختر التاريخ والتوقيت",
    step3Sub: "أوقات شاغرة ومحدثة بشكل فوري ومباشر",
    dateLabel: "تاريخ الموعد",
    availableSlots: "المواعيد الشاغرة المتاحة",
    noSlots: "لا توجد مواعيد شاغرة في هذا التاريخ.",
    noSlotsSub: "الصالون قد يكون مغلقاً أو جميع المواعيد محجوزة.",
    searchingSlots: "جاري البحث عن المواعيد الشاغرة...",
    step4Title: "4. معلومات الاتصال الخاصة بك",
    step4Sub: "سنقوم بتأكيد حجزك وإرسال الإشعار فوراً",
    fullName: "الاسم الكامل *",
    phone: "رقم الهاتف (واتساب) *",
    emailOptional: "البريد الإلكتروني (اختياري)",
    noteOptional: "ملاحظة أو طلب خاص",
    confirmBooking: "تأكيد الحجز فورياً",
    confirming: "جاري تأكيد الموعد...",
    recap: "ملخص الحجز الخاص بك",
    min: "دقيقة",
    mad: "درهم",
    changeService: "تغيير الخدمة",
    changeStaff: "تغيير المصفف",
    changeSlot: "تغيير الموعد",
    confirmedTitle: "تم تأكيد موعدك بنجاح !",
    confirmedSub: "شكراً لك، تم تسجيل موعدك في جدول الصالون بنجاح.",
    uniqueRef: "رقم الحجز الفريد",
    downloadPdf: "تحميل وصل الحجز الرسمي (PDF)",
    shareWhatsapp: "مراسلة الصالون عبر واتساب",
    payOnSite: "الأداء بعين المكان بالدرهم المغربي (MAD) يوم الموعد.",
    backHome: "العودة للرئيسية",
    durationLabel: "المدة",
    specialistLabel: "المصفف / الأخصائي",
    contactOnWhatsapp: "التواصل مع الصالون عبر واتساب",
    back: "رجوع",
    previousStep: "الخطوة السابقة",
    stepServices: "الخدمة",
    stepStaff: "المصفف",
    stepTime: "الموعد",
    stepDetails: "المعلومات",
    verifiedBusiness: "صالون موثق",
    backToOverview: "الرجوع للوحة التحكم",
    coFounder: "الشريك المؤسس",
    coFounderCredit: "تطوير وإشراف الشريك المؤسس حسن النفيسي",
    craftedInMorocco: "تم تصميمه وتطويره بشغف في المغرب لخدمة المهنيين 🇲🇦"
  },
  en: {
    demoSalonAmina: "Demo: Salon Amina (Fez)",
    mySpace: "Dashboard",
    login: "Log in",
    register: "Create my page",
    moroccoBadge: "Morocco",
    heroBadge: "The booking solution for salons and studios across Morocco",
    heroTitle: "Fill your appointment calendar without endless phone calls.",
    heroSub: "Provide your Moroccan clients with a modern booking page priced in MAD. Eliminate double bookings and manage your team with ease.",
    createPageBtn: "Create my page in 2 minutes",
    seeDemoBtn: "View Salon Amina demo",
    step1Title: "1. Choose your service",
    step1Sub: "Select your desired hair care or beauty treatment",
    step2Title: "2. Select your specialist",
    step2Sub: "Pick your preferred team member or any available",
    anyStaff: "Any available team member",
    anyStaffSub: "First specialist available at the chosen time",
    step3Title: "3. Choose date & time",
    step3Sub: "Real-time verified slot availability",
    dateLabel: "Appointment date",
    availableSlots: "Available time slots",
    noSlots: "No available slots on this date.",
    noSlotsSub: "The establishment may be closed or fully booked.",
    searchingSlots: "Checking available slots...",
    step4Title: "4. Your contact details",
    step4Sub: "We will immediately validate your booking details",
    fullName: "Full Name *",
    phone: "Phone Number (WhatsApp) *",
    emailOptional: "Email (optional)",
    noteOptional: "Special request or note",
    confirmBooking: "Confirm my appointment",
    confirming: "Confirming booking...",
    recap: "Booking Summary",
    min: "min",
    mad: "MAD",
    changeService: "Change service",
    changeStaff: "Change specialist",
    changeSlot: "Change time slot",
    confirmedTitle: "Appointment Confirmed!",
    confirmedSub: "Thank you, your booking has been successfully confirmed.",
    uniqueRef: "Booking Reference",
    downloadPdf: "Download Official Receipt (PDF)",
    shareWhatsapp: "Open in WhatsApp",
    payOnSite: "Payment on-site in Moroccan Dirhams (MAD) upon arrival.",
    backHome: "Back to Home",
    durationLabel: "Duration",
    specialistLabel: "Specialist",
    contactOnWhatsapp: "Contact salon on WhatsApp",
    back: "Back",
    previousStep: "Previous step",
    stepServices: "Service",
    stepStaff: "Staff",
    stepTime: "Date & Time",
    stepDetails: "Details",
    verifiedBusiness: "Verified establishment",
    backToOverview: "Back to dashboard",
    coFounder: "Co-Founder",
    coFounderCredit: "Co-Founded by Hassan Nfissi",
    craftedInMorocco: "Crafted with passion in Morocco for service professionals 🇲🇦"
  }
};
