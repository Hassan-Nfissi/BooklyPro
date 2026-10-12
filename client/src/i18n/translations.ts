export type Language = 'fr' | 'ar' | 'en';

export interface Translations {
  // Public Landing & Common
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
  featureDirhams: string;
  featurePdf: string;
  featureLanguages: string;
  featureNoDoubleBooking: string;
  showcaseBadge: string;
  showcaseTitle: string;
  showcaseSub: string;
  showcaseTestBtn: string;
  brandCardTitle: string;
  brandCardSub: string;
  realtimeCardTitle: string;
  realtimeCardSub: string;
  noConflictCardTitle: string;
  noConflictCardSub: string;

  // Booking Flow Steps
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

  // Booking Confirmed
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

  // Credits & Brand
  coFounder: string;
  coFounderCredit: string;
  craftedInMorocco: string;
  allRightsReserved: string;

  // Sidebar & Navigation
  navOverview: string;
  navAppointments: string;
  navServices: string;
  navStaff: string;
  navSchedule: string;
  navBranding: string;
  navSettings: string;
  logout: string;
  proSpaceBadge: string;
  onlineStatus: string;
  draftStatus: string;
  viewClientPage: string;
  adminSpace: string;

  // Dashboard Overview
  hello: string;
  overviewSub: string;
  todayMetric: string;
  confirmedMetric: string;
  completedMetric: string;
  cancelledMetric: string;
  notPublishedBannerTitle: string;
  notPublishedBannerSub: string;
  publishMyPageBtn: string;
  recentAppointmentsTitle: string;
  viewAllCalendar: string;
  noAppointmentsYet: string;
  loadingDashboard: string;

  // Dashboard Appointments
  appointmentsTitle: string;
  appointmentsSub: string;
  filterAll: string;
  filterConfirmed: string;
  filterCompleted: string;
  filterCancelled: string;
  markCompleted: string;
  markCancelled: string;
  noAppointmentsFound: string;
  noAppointmentsFoundSub: string;
  notePrefix: string;
  statusConfirmed: string;
  statusCompleted: string;
  statusCancelled: string;

  // Dashboard Services
  servicesTitle: string;
  servicesSub: string;
  addServiceBtn: string;
  editServiceBtn: string;
  serviceNameLabel: string;
  serviceDescLabel: string;
  servicePriceLabel: string;
  serviceDurationLabel: string;
  bufferMinutesLabel: string;
  activeLabel: string;
  inactiveLabel: string;
  saveServiceBtn: string;
  newServiceModalTitle: string;
  editServiceModalTitle: string;
  noServicesFound: string;
  noServicesFoundSub: string;

  // Dashboard Staff
  staffTitle: string;
  staffSub: string;
  addStaffBtn: string;
  editStaffBtn: string;
  staffNameLabel: string;
  staffEmailLabel: string;
  staffPhoneLabel: string;
  assignedServicesLabel: string;
  saveStaffBtn: string;
  newStaffModalTitle: string;
  editStaffModalTitle: string;
  noStaffFound: string;
  noStaffFoundSub: string;
  allServicesAssigned: string;

  // Dashboard Schedule
  scheduleTitle: string;
  scheduleSub: string;
  weeklyHoursTitle: string;
  saveHoursBtn: string;
  closedLabel: string;
  openLabel: string;
  timeOffTitle: string;
  addTimeOffBtn: string;
  timeOffStarts: string;
  timeOffEnds: string;
  timeOffReason: string;
  saveTimeOffBtn: string;
  noTimeOff: string;
  noTimeOffSub: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;

  // Dashboard Branding
  brandingTitle: string;
  brandingSub: string;
  themeColorLabel: string;
  welcomeMessageLabel: string;
  welcomeMessagePlaceholder: string;
  saveBrandingBtn: string;
  publishPageBtn: string;
  unpublishPageBtn: string;
  copyLinkBtn: string;
  linkCopied: string;
  livePreviewTitle: string;
  uploadLogoBtn: string;
  customColorLabel: string;
  recommendedPalettes: string;

  // Dashboard Settings
  settingsTitle: string;
  settingsSub: string;
  businessNameLabel: string;
  slugLabel: string;
  cityLabel: string;
  addressLabel: string;
  contactPhoneLabel: string;
  descriptionLabel: string;
  advanceNoticeHoursLabel: string;
  advanceNoticeHelp: string;
  bookingHorizonDaysLabel: string;
  bookingHorizonHelp: string;
  saveSettingsBtn: string;

  // Onboarding
  onboardingWelcome: string;
  onboardingSub: string;
  stepEstablishment: string;
  stepBranding: string;
  stepFirstService: string;
  stepPublish: string;
  step1Desc: string;
  step2Desc: string;
  step3Desc: string;
  step4Desc: string;
  readyToPublishMsg: string;
  nextStepBtn: string;
  finishAndLaunchBtn: string;

  // Auth (Login & Register)
  loginTitle: string;
  loginSub: string;
  registerTitle: string;
  registerSub: string;
  emailLabel: string;
  passwordLabel: string;
  signInBtn: string;
  createAccountBtn: string;
  oneClickDemo: string;
  oneClickDemoSub: string;
  orDivider: string;
  noAccountPrompt: string;
  alreadyAccountPrompt: string;
  googleLoginBtn: string;

  // Common Toasts & Dialogs
  toastSaved: string;
  toastError: string;
  toastDeleted: string;
  toastCopied: string;
  toastStatusUpdated: string;
  cancelBtn: string;
  deleteConfirmTitle: string;
  confirmDeleteBtn: string;

  // SimplyBook.me Inspired Components
  trustRatingGoogle: string;
  trustRatingCapterra: string;
  trustSecured: string;
  trustMoroccoSalons: string;
  tabCoreFeatures: string;
  tabBusinessGrowth: string;
  tabClientExperience: string;
  featuresSectionTitle: string;
  featuresSectionSub: string;
  industryTitle: string;
  industrySub: string;
  industryHair: string;
  industryHairDesc: string;
  industrySpa: string;
  industrySpaDesc: string;
  industryBeauty: string;
  industryBeautyDesc: string;
  industryWellness: string;
  industryWellnessDesc: string;
  comparisonTitle: string;
  comparisonSub: string;
  comparisonColBefore: string;
  comparisonColAfter: string;
  compItem1Before: string;
  compItem1After: string;
  compItem2Before: string;
  compItem2After: string;
  compItem3Before: string;
  compItem3After: string;
  compItem4Before: string;
  compItem4After: string;
  finalCtaBadge: string;
  finalCtaTitle: string;
  finalCtaSub: string;
  noCardRequired: string;
  viewDemoLive: string;
  liveAgendaSimulator: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    // Public Landing & Common
    demoSalonAmina: "Démo : Salon Amina (Fès)",
    mySpace: "Mon Espace Pro",
    login: "Connexion",
    register: "Créer ma page",
    moroccoBadge: "Maroc",
    heroBadge: "La plateforme de réservation pour salons et instituts au Maroc",
    heroTitle: "Remplissez votre planning sans passer des heures au téléphone.",
    heroSub: "Offrez à vos clients marocains une expérience de réservation fluide en dirhams (MAD). Éliminez les rendez-vous manqués et modernisez votre établissement.",
    createPageBtn: "Créer ma page en 2 minutes",
    seeDemoBtn: "Tester l'exemple Salon Amina",
    featureDirhams: "Tarifs en Dirhams (MAD)",
    featurePdf: "Reçu PDF instantané",
    featureLanguages: "Arabe, Français & Anglais",
    featureNoDoubleBooking: "Zéro double réservation",
    showcaseBadge: "Aperçu en direct",
    showcaseTitle: "Page de réservation Salon Amina (Fès)",
    showcaseSub: "Vos clients sélectionnent la prestation, le spécialiste et le créneau en 3 clics et reçoivent leur reçu officiel.",
    showcaseTestBtn: "Tester la réservation & le reçu PDF",
    brandCardTitle: "Votre Marque & Vos Tarifs",
    brandCardSub: "Personnalisez votre logo, vos couleurs, vos prestations (MAD) et vos horaires d'ouverture.",
    realtimeCardTitle: "Disponibilités en Temps Réel",
    realtimeCardSub: "Calcul automatique des créneaux selon la durée du soin et le temps de préparation.",
    noConflictCardTitle: "Zéro Conflit d'Horaire",
    noConflictCardSub: "Verrouillage transactionnel instantané. Aucun risque de chevauchement d'horaires.",

    // Booking Flow Steps
    step1Title: "1. Choisissez votre prestation",
    step1Sub: "Sélectionnez le soin ou le forfait souhaité",
    step2Title: "2. Avec qui souhaitez-vous ce soin ?",
    step2Sub: "Choisissez votre spécialiste ou optez pour le premier disponible",
    anyStaff: "N'importe quel spécialiste disponible",
    anyStaffSub: "Premier collaborateur libre à l'horaire sélectionné",
    step3Title: "3. Choisissez la date & l'heure",
    step3Sub: "Créneaux vérifiés en temps réel",
    dateLabel: "Date du rendez-vous",
    availableSlots: "Créneaux horaires disponibles",
    noSlots: "Aucun créneau disponible pour cette date.",
    noSlotsSub: "L'établissement est peut-être fermé ou tous les créneaux sont déjà réservés.",
    searchingSlots: "Recherche des disponibilités en cours...",
    step4Title: "4. Vos coordonnées",
    step4Sub: "Nous vous enverrons la confirmation immédiate avec votre reçu",
    fullName: "Nom et prénom *",
    phone: "Numéro de téléphone (WhatsApp) *",
    emailOptional: "Email (recommandé pour le reçu)",
    noteOptional: "Remarque ou demande particulière",
    confirmBooking: "Confirmer mon rendez-vous",
    confirming: "Validation du rendez-vous en cours...",
    recap: "Récapitulatif de votre rendez-vous",
    min: "min",
    mad: "MAD",
    changeService: "Changer de prestation",
    changeStaff: "Changer de praticien",
    changeSlot: "Modifier l'horaire",

    // Booking Confirmed
    confirmedTitle: "Rendez-vous Confirmé avec Succès !",
    confirmedSub: "Merci ! Votre réservation a été enregistrée dans le planning de l'établissement.",
    uniqueRef: "Référence unique",
    downloadPdf: "Télécharger mon reçu officiel (PDF)",
    shareWhatsapp: "Ouvrir sur WhatsApp",
    payOnSite: "Paiement sur place en dirhams marocains (MAD) lors de votre visite.",
    backHome: "Retour à l'accueil",
    durationLabel: "Durée",
    specialistLabel: "Spécialiste",
    contactOnWhatsapp: "Contacter le salon sur WhatsApp",
    back: "Retour",
    previousStep: "Étape précédente",
    stepServices: "Prestation",
    stepStaff: "Spécialiste",
    stepTime: "Date & Heure",
    stepDetails: "Coordonnées",
    verifiedBusiness: "Établissement vérifié",
    backToOverview: "Retour au tableau de bord",

    // Credits & Brand
    coFounder: "Co-Fondateur",
    coFounderCredit: "Co-Fondé par Hassan Nfissi",
    craftedInMorocco: "Conçu avec passion au Maroc pour les professionnels de service 🇲🇦",
    allRightsReserved: "Tous droits réservés.",

    // Sidebar & Navigation
    navOverview: "Vue d'ensemble",
    navAppointments: "Rendez-vous",
    navServices: "Services & Tarifs",
    navStaff: "Équipe & Praticiens",
    navSchedule: "Horaires & Fermetures",
    navBranding: "Page client & Marque",
    navSettings: "Paramètres du salon",
    logout: "Déconnexion",
    proSpaceBadge: "Espace Pro Maroc",
    onlineStatus: "En ligne",
    draftStatus: "Brouillon",
    viewClientPage: "Voir ma page client",
    adminSpace: "Espace d'administration",

    // Dashboard Overview
    hello: "Bonjour",
    overviewSub: "Voici l'activité en temps réel de votre établissement",
    todayMetric: "Aujourd'hui",
    confirmedMetric: "Confirmés",
    completedMetric: "Honorés / Terminés",
    cancelledMetric: "Annulés",
    notPublishedBannerTitle: "Votre page de réservation n'est pas encore visible en ligne",
    notPublishedBannerSub: "Vérifiez vos prestations, configurez vos collaborateurs et publiez votre page pour recevoir vos premières réservations.",
    publishMyPageBtn: "Activer ma page client",
    recentAppointmentsTitle: "Derniers Rendez-vous enregistrés",
    viewAllCalendar: "Voir tout le planning",
    noAppointmentsYet: "Aucun rendez-vous enregistré pour le moment.",
    loadingDashboard: "Chargement du tableau de bord...",

    // Dashboard Appointments
    appointmentsTitle: "Gestion des Rendez-vous",
    appointmentsSub: "Consultez le planning et mettez à jour le statut des réservations en un clic",
    filterAll: "Tous les statuts",
    filterConfirmed: "Confirmés",
    filterCompleted: "Terminés",
    filterCancelled: "Annulés",
    markCompleted: "Marquer comme honoré",
    markCancelled: "Annuler le rendez-vous",
    noAppointmentsFound: "Aucun rendez-vous trouvé dans cette vue",
    noAppointmentsFoundSub: "Les nouvelles réservations effectuées par vos clients s'afficheront instantanément ici.",
    notePrefix: "Note client :",
    statusConfirmed: "Confirmé",
    statusCompleted: "Terminé",
    statusCancelled: "Annulé",

    // Dashboard Services
    servicesTitle: "Catalogue de Prestations & Tarifs",
    servicesSub: "Définissez les soins, tarifs en dirhams (MAD) et durées proposés à vos clients",
    addServiceBtn: "Ajouter une prestation",
    editServiceBtn: "Modifier",
    serviceNameLabel: "Intitulé du soin / service",
    serviceDescLabel: "Description (bienfaits, produits utilisés...)",
    servicePriceLabel: "Tarif en dirhams (MAD)",
    serviceDurationLabel: "Durée du soin (minutes)",
    bufferMinutesLabel: "Temps de pause / nettoyage (min)",
    activeLabel: "Disponible à la réservation",
    inactiveLabel: "Masqué du planning",
    saveServiceBtn: "Enregistrer la prestation",
    newServiceModalTitle: "Créer une nouvelle prestation",
    editServiceModalTitle: "Modifier la prestation",
    noServicesFound: "Aucune prestation configurée",
    noServicesFoundSub: "Ajoutez vos premiers services pour permettre à vos clients de réserver en ligne.",

    // Dashboard Staff
    staffTitle: "Équipe & Praticiens",
    staffSub: "Gérez vos coiffeurs, esthéticiennes et attribuez les soins que chacun maîtrise",
    addStaffBtn: "Ajouter un collaborateur",
    editStaffBtn: "Modifier",
    staffNameLabel: "Nom complet du praticien",
    staffEmailLabel: "Email professionnel (optionnel)",
    staffPhoneLabel: "Numéro WhatsApp / Téléphone",
    assignedServicesLabel: "Prestations assurées par ce praticien",
    saveStaffBtn: "Enregistrer le collaborateur",
    newStaffModalTitle: "Nouveau membre de l'équipe",
    editStaffModalTitle: "Modifier le profil",
    noStaffFound: "Aucun membre d'équipe enregistré",
    noStaffFoundSub: "Ajoutez les praticiens de votre salon pour leur assigner des réservations.",
    allServicesAssigned: "Toutes les prestations",

    // Dashboard Schedule
    scheduleTitle: "Horaires Hebdomadaires & Congés",
    scheduleSub: "Définissez vos heures d'ouverture quotidiennes et vos fermetures exceptionnelles",
    weeklyHoursTitle: "Planning hebdomadaire d'ouverture",
    saveHoursBtn: "Enregistrer les horaires",
    closedLabel: "Fermé ce jour",
    openLabel: "Ouvert",
    timeOffTitle: "Fermetures exceptionnelles & Congés",
    addTimeOffBtn: "Ajouter une fermeture",
    timeOffStarts: "Début de la période",
    timeOffEnds: "Fin de la période",
    timeOffReason: "Motif (ex: Aïd, Travaux, Vacances annuelles)",
    saveTimeOffBtn: "Enregistrer la période",
    noTimeOff: "Aucune fermeture exceptionnelle programmée",
    noTimeOffSub: "Vous pouvez bloquer des journées ou demi-journées pour congés ou travaux.",
    mon: "Lundi",
    tue: "Mardi",
    wed: "Mercredi",
    thu: "Jeudi",
    fri: "Vendredi",
    sat: "Samedi",
    sun: "Dimanche",

    // Dashboard Branding
    brandingTitle: "Personnalisation & Page Client",
    brandingSub: "Adaptez l'univers visuel de votre page de réservation et partagez votre lien",
    themeColorLabel: "Couleur dominante de votre salon",
    welcomeMessageLabel: "Message d'accueil pour vos clients",
    welcomeMessagePlaceholder: "Bienvenue dans notre salon ! Réservez votre créneau en toute simplicité.",
    saveBrandingBtn: "Enregistrer les modifications",
    publishPageBtn: "Mettre la page en ligne",
    unpublishPageBtn: "Basculer en mode brouillon",
    copyLinkBtn: "Copier mon lien de réservation",
    linkCopied: "Lien copié dans le presse-papier !",
    livePreviewTitle: "Aperçu mobile en direct",
    uploadLogoBtn: "Changer le logo du salon",
    customColorLabel: "Couleur personnalisée (Code Hex)",
    recommendedPalettes: "Palettes recommandées pour instituts marocains",

    // Dashboard Settings
    settingsTitle: "Informations Générales & Règles de Réservation",
    settingsSub: "Gérez les coordonnées de votre salon, son adresse et les règles de réservation",
    businessNameLabel: "Nom de l'établissement",
    slugLabel: "Lien personnalisé (Identifiant URL)",
    cityLabel: "Ville au Maroc",
    addressLabel: "Adresse exacte (quartier, rue)",
    contactPhoneLabel: "Téléphone direct / WhatsApp",
    descriptionLabel: "Présentation courte de votre établissement",
    advanceNoticeHoursLabel: "Délai de prévenance minimum (heures)",
    advanceNoticeHelp: "Empêche les réservations de dernière minute (ex: 2h à l'avance minimum).",
    bookingHorizonDaysLabel: "Horizon de réservation maximal (jours)",
    bookingHorizonHelp: "Limite les réservations à l'avance (ex: 30 jours à l'avance max).",
    saveSettingsBtn: "Enregistrer les paramètres",

    // Onboarding
    onboardingWelcome: "Bienvenue sur BooklyPro ! 🎉",
    onboardingSub: "Configurons ensemble votre salon en quelques étapes simples.",
    stepEstablishment: "Établissement",
    stepBranding: "Identité",
    stepFirstService: "Prestation",
    stepPublish: "Publication",
    step1Desc: "Votre salon est prêt à être configuré avec un lien personnalisé sur mesure.",
    step2Desc: "Choisissez votre ambiance de marque et le message d'accueil pour vos clients.",
    step3Desc: "Ajoutez une première prestation phare pour commencer à remplir votre planning.",
    step4Desc: "Tout est prêt ! Vous pouvez publier votre page et partager votre lien.",
    readyToPublishMsg: "Félicitations ! Votre page de réservation est prête à accueillir des clients.",
    nextStepBtn: "Étape suivante",
    finishAndLaunchBtn: "Publier et accéder au tableau de bord",

    // Auth (Login & Register)
    loginTitle: "Connexion à votre Espace Pro",
    loginSub: "Accédez à la gestion de vos rendez-vous, collaborateurs et prestations",
    registerTitle: "Créez votre page de réservation",
    registerSub: "En 2 minutes, votre salon ou institut marocain est prêt à recevoir des réservations",
    emailLabel: "Adresse email",
    passwordLabel: "Mot de passe",
    signInBtn: "Se connecter",
    createAccountBtn: "Créer mon compte professionnel",
    oneClickDemo: "Accès Démo 1-Clic (Salon Amina, Fès)",
    oneClickDemoSub: "Accès immédiat sans mot de passe pour explorer la plateforme",
    orDivider: "ou connectez-vous par email",
    noAccountPrompt: "Pas encore de compte ?",
    alreadyAccountPrompt: "Vous avez déjà un compte ?",
    googleLoginBtn: "Continuer avec Google",

    // Common Toasts & Dialogs
    toastSaved: "Modifications enregistrées avec succès !",
    toastError: "Une erreur est survenue lors de l'opération.",
    toastDeleted: "Élément supprimé avec succès.",
    toastCopied: "Copié dans le presse-papier !",
    toastStatusUpdated: "Statut du rendez-vous mis à jour.",
    cancelBtn: "Annuler",
    deleteConfirmTitle: "Êtes-vous sûr de vouloir supprimer cet élément ?",
    confirmDeleteBtn: "Confirmer la suppression",

    // SimplyBook.me Inspired Components
    trustRatingGoogle: "4.9/5 sur Google Reviews",
    trustRatingCapterra: "4.8/5 Satisfaction clients",
    trustSecured: "100% Sécurisé & Données protégées",
    trustMoroccoSalons: "+120 Salons & Spas au Maroc",
    tabCoreFeatures: "Fonctionnalités Clés",
    tabBusinessGrowth: "Gestion & Croissance",
    tabClientExperience: "Expérience Client",
    featuresSectionTitle: "Tout ce dont vous avez besoin pour développer votre salon",
    featuresSectionSub: "Des outils modernes inspirés des meilleurs standards mondiaux, adaptés au marché marocain.",
    industryTitle: "Une solution dédiée à chaque secteur de beauté au Maroc",
    industrySub: "Que vous dirigiez un salon de coiffure, un spa hammam ou un institut esthétique, BooklyPro s'adapte à vos rituels.",
    industryHair: "Coiffure & Barbershop",
    industryHairDesc: "Salons femmes, barbiers traditionnels, coloristes et experts en lissage & kératine.",
    industrySpa: "Spas & Hammams Marocains",
    industrySpaDesc: "Bains traditionnels, rituels gommage beldi, massages relaxants et soins orientaux.",
    industryBeauty: "Esthétique & Onglerie",
    industryBeautyDesc: "Manucure, pose gel, extensions de cils, microblading et soins du visage ciblés.",
    industryWellness: "Centres de Bien-être & Soins",
    industryWellnessDesc: "Détente, drainage lymphatique, coaching et centres de remise en forme.",
    comparisonTitle: "Pourquoi les professionnels marocains choisissent BooklyPro",
    comparisonSub: "Comparez la gestion traditionnelle avec la sérénité d'une solution numérique sur-mesure.",
    comparisonColBefore: "Avant BooklyPro (Gestion Manuelle)",
    comparisonColAfter: "Avec BooklyPro (Plateforme Digitale)",
    compItem1Before: "Appels incessants et messages WhatsApp dispersés pendant vos soins",
    compItem1After: "Page de réservation 24h/24 : vos clients réservent en autonomie",
    compItem2Before: "Rendez-vous manqués (no-shows) et créneaux perdus sans confirmation",
    compItem2After: "Reçu officiel PDF téléchargeable et rappels automatiques",
    compItem3Before: "Risques fréquents de double-réservation sur agenda papier",
    compItem3After: "Verrouillage transactionnel instantané : zéro conflit garanti",
    compItem4Before: "Paiement confus et gestion difficile des acomptes",
    compItem4After: "Tarifs clairs affichés en dirhams (MAD) et paiement facilité sur place",
    finalCtaBadge: "Modernisez votre salon dès aujourd'hui",
    finalCtaTitle: "Prêt à remplir votre planning sans passer des heures au téléphone ?",
    finalCtaSub: "Créez votre page en 2 minutes. Offrez à vos clients l'expérience de réservation la plus fluide du Maroc.",
    noCardRequired: "Gratuit pour démarrer • Sans carte bancaire • Prêt en 2 min",
    viewDemoLive: "Tester la démo en direct",
    liveAgendaSimulator: "Agenda en direct"
  },

  ar: {
    // Public Landing & Common
    demoSalonAmina: "عرض توضيحي : صالون أمينة (فاس)",
    mySpace: "لوحة التحكم للمهنيين",
    login: "تسجيل الدخول",
    register: "إنشاء صفحتي",
    moroccoBadge: "المغرب",
    heroBadge: "المنصة المغربية الأولى لحجز المواعيد في صالونات ومراكز التجميل",
    heroTitle: "نظّم جدول مواعيدك بذكاء دون إضاعة الوقت في المكالمات الهاتفية.",
    heroSub: "وفّر لزبنائك في المغرب تجربة حجز عصرية وسلسة بالدرهم المغربي (MAD). تخلص نهائياً من المواعيد المزدوجة وطوّر عملك بكل احترافية.",
    createPageBtn: "ابدأ صفحتك في دقيقتين",
    seeDemoBtn: "تجربة صالون أمينة التوضيحي",
    featureDirhams: "الأسعار بالدرهم (MAD)",
    featurePdf: "وصل رسمي فوري (PDF)",
    featureLanguages: "عربية، فرنسية، إنجليزية",
    featureNoDoubleBooking: "ضمان عدم تضارب المواعيد",
    showcaseBadge: "معاينة حية ومباشرة",
    showcaseTitle: "صفحة حجز صالون أمينة (فاس)",
    showcaseSub: "يختار زبناؤك الخدمة، الأخصائي، والوقت المناسب في 3 نقرات فقط مع استلام وصل رسمي.",
    showcaseTestBtn: "تجربة الحجز وتحميل وصل PDF",
    brandCardTitle: "هويتك البصرية وباقات أسعارك",
    brandCardSub: "خصص شعارك، ألوانك الخاصة، خدماتك بالدرهم المغربي ومواقيت العمل الأسبوعية.",
    realtimeCardTitle: "أوقات شاغرة ومحدثة فورياً",
    realtimeCardSub: "حساب تلقائي للوقت المتاح وفقاً لمدة كل خدمة وفترة الإعداد والتنظيف.",
    noConflictCardTitle: "حماية تامة من التداخل",
    noConflictCardSub: "تأمين فوري ومحكم للحجز يمنع نهائياً تكرار الحجز في نفس التوقيت.",

    // Booking Flow Steps
    step1Title: "1. اختر الخدمة أو الباقة المطلوبة",
    step1Sub: "حدد نوع العناية أو التسريحة التي ترغب في حجزها",
    step2Title: "2. مع من تود الاستفادة من هذه الخدمة؟",
    step2Sub: "اختر أخصائيك المفضل أو أول مصفف متاح",
    anyStaff: "أي مصفف أو أخصائي متاح",
    anyStaffSub: "أول عضو في الفريق متاح في الوقت المختار",
    step3Title: "3. اختر التاريخ والتوقيت المناسب",
    step3Sub: "أوقات عمل شاغرة ومحدثة مباشرة",
    dateLabel: "تاريخ الموعد",
    availableSlots: "المواعيد الشاغرة المتاحة",
    noSlots: "لا توجد مواعيد شاغرة في هذا التاريخ.",
    noSlotsSub: "الصالون قد يكون في يوم عطلة أو أن جميع المواعيد محجوزة بالكامل.",
    searchingSlots: "جاري التحقق من المواعيد المتاحة...",
    step4Title: "4. معلومات الاتصال الخاصة بك",
    step4Sub: "سنرسل لك تأكيد الحجز فورياً مع وصل الحجز الرسمي",
    fullName: "الاسم الكامل *",
    phone: "رقم الهاتف (واتساب) *",
    emailOptional: "البريد الإلكتروني (اختياري لوصل الحجز)",
    noteOptional: "ملاحظة أو طلب خاص للصالون",
    confirmBooking: "تأكيد موعد الحجز",
    confirming: "جاري تأكيد الموعد وتسجيله...",
    recap: "ملخص الحجز الخاص بك",
    min: "دقيقة",
    mad: "د.م",
    changeService: "تغيير الخدمة",
    changeStaff: "تغيير الأخصائي",
    changeSlot: "تعديل الموعد",

    // Booking Confirmed
    confirmedTitle: "تم تأكيد موعدك بنجاح تام !",
    confirmedSub: "شكراً لك ! تم تسجيل موعدك في جدول الصالون وسيتم استقبالك بكل ترحيب.",
    uniqueRef: "رقم الحجز الفريد",
    downloadPdf: "تحميل وصل الحجز الرسمي (PDF)",
    shareWhatsapp: "فتح وتأكيد عبر واتساب",
    payOnSite: "الأداء بعين المكان بالدرهم المغربي (MAD) عند حضورك للموعد.",
    backHome: "العودة للرئيسية",
    durationLabel: "المدة",
    specialistLabel: "الأخصائي / المصفف",
    contactOnWhatsapp: "التواصل مع الصالون عبر واتساب",
    back: "رجوع",
    previousStep: "الخطوة السابقة",
    stepServices: "الخدمة",
    stepStaff: "الأخصائي",
    stepTime: "الموعد",
    stepDetails: "المعلومات",
    verifiedBusiness: "مؤسسة موثقة",
    backToOverview: "الرجوع للوحة التحكم",

    // Credits & Brand
    coFounder: "الشريك المؤسس",
    coFounderCredit: "تطوير وإشراف الشريك المؤسس حسن النفيسي",
    craftedInMorocco: "تم تصميمه وتطويره بشغف في المغرب لخدمة المهنيين المغاربة 🇲🇦",
    allRightsReserved: "جميع الحقوق محفوظة.",

    // Sidebar & Navigation
    navOverview: "لوحة القيادة العامة",
    navAppointments: "المواعيد والحجوزات",
    navServices: "الخدمات والأسعار",
    navStaff: "فريق العمل والمصففون",
    navSchedule: "أوقات العمل والعطل",
    navBranding: "صفحة الحجز والهوية",
    navSettings: "إعدادات المؤسسة",
    logout: "تسجيل الخروج",
    proSpaceBadge: "بوابة المهنيين بالمغرب",
    onlineStatus: "منشور ومتاح",
    draftStatus: "مسودة غير منشورة",
    viewClientPage: "معاينة صفحة الزبناء",
    adminSpace: "لوحة إدارة الحجوزات",

    // Dashboard Overview
    hello: "مرحباً بك",
    overviewSub: "إليك النشاط المباشر لمواعيد مؤسستك وزبنائك",
    todayMetric: "مواعيد اليوم",
    confirmedMetric: "مواعيد مؤكدة",
    completedMetric: "مواعيد مكتملة",
    cancelledMetric: "مواعيد ملغاة",
    notPublishedBannerTitle: "صفحة الحجز الخاصة بك غير منشورة للعموم بعد",
    notPublishedBannerSub: "تحقق من باقة الخدمات، أضف أعضاء الفريق ثم انشر صفحتك لبدء استقبال الحجوزات عبر الإنترنت اليوم.",
    publishMyPageBtn: "نشر وتفعيل صفحة الحجز",
    recentAppointmentsTitle: "آخر المواعيد المسجلة",
    viewAllCalendar: "عرض الجدول الزمني كاملاً",
    noAppointmentsYet: "لا توجد مواعيد مسجلة حتى الآن.",
    loadingDashboard: "جاري تحميل بيانات لوحة القيادة...",

    // Dashboard Appointments
    appointmentsTitle: "إدارة ومتابعة المواعيد",
    appointmentsSub: "استعرض جدول المواعيد وحدث حالة كل حجز بنقرة زر واحدة",
    filterAll: "جميع الحالات",
    filterConfirmed: "المواعيد المؤكدة",
    filterCompleted: "المواعيد المكتملة",
    filterCancelled: "المواعيد الملغاة",
    markCompleted: "تحديد كمكتمل ومُنجز",
    markCancelled: "إلغاء الموعد",
    noAppointmentsFound: "لا توجد مواعيد مطابقة لهذا التصنيف",
    noAppointmentsFoundSub: "المواعيد الجديدة التي يحجزها زبناؤك ستظهر مباشرة وبشكل فوري هنا.",
    notePrefix: "ملاحظة الزبون :",
    statusConfirmed: "مؤكد",
    statusCompleted: "مكتمل",
    statusCancelled: "ملغى",

    // Dashboard Services
    servicesTitle: "دليل الخدمات والأسعار",
    servicesSub: "حدد الخدمات، الأسعار بالدرهم المغربي ومدة كل حصة للزبناء",
    addServiceBtn: "إضافة خدمة جديدة",
    editServiceBtn: "تعديل",
    serviceNameLabel: "اسم الخدمة أو الباقة",
    serviceDescLabel: "وصف الخدمة (المزايا والمواد المستخدمة)",
    servicePriceLabel: "السعر بالدرهم (MAD)",
    serviceDurationLabel: "مدة الحصة (بالدقائق)",
    bufferMinutesLabel: "وقت الاستراحة والتجهيز (بالدقائق)",
    activeLabel: "متاحة للحجز أونلاين",
    inactiveLabel: "مخفية مؤقتاً",
    saveServiceBtn: "حفظ وتحديث الخدمة",
    newServiceModalTitle: "إضافة خدمة أو باقة جديدة",
    editServiceModalTitle: "تعديل بيانات الخدمة",
    noServicesFound: "لم يتم إنشاء أي خدمة بعد",
    noServicesFoundSub: "أضف خدماتك الأولى لتمكين زبنائك من حجزها مباشرة عبر الإنترنت.",

    // Dashboard Staff
    staffTitle: "فريق العمل والأخصائيين",
    staffSub: "أدر مصففيك وأخصائيي التجميل وعين الخدمات المخصصة لكل منهم",
    addStaffBtn: "إضافة عضو جديد للفريق",
    editStaffBtn: "تعديل",
    staffNameLabel: "الاسم الكامل للمصفف / الأخصائي",
    staffEmailLabel: "البريد الإلكتروني المهني (اختياري)",
    staffPhoneLabel: "رقم الهاتف / واتساب",
    assignedServicesLabel: "الخدمات التي يقدمها هذا العضو",
    saveStaffBtn: "حفظ بيانات العضو",
    newStaffModalTitle: "إضافة عضو جديد للفريق",
    editStaffModalTitle: "تعديل الملف المهني",
    noStaffFound: "لا يوجد أعضاء مسجلين بالفريق حتى الآن",
    noStaffFoundSub: "أضف أعضاء فريقك لتمكين الزبناء من اختيار المصفف المفضل.",
    allServicesAssigned: "جميع الخدمات متاحة له",

    // Dashboard Schedule
    scheduleTitle: "مواقيت العمل الأسبوعية وأيام العطل",
    scheduleSub: "حدد ساعات الفتح والإغلاق لكل يوم وفترات الإغلاق الاستثنائية",
    weeklyHoursTitle: "جدول أوقات العمل الأسبوعي",
    saveHoursBtn: "حفظ مواقيت العمل",
    closedLabel: "مغلق طيلة اليوم",
    openLabel: "مفتوح للعمل",
    timeOffTitle: "أيام العطل والإغلاق الاستثنائي",
    addTimeOffBtn: "إضافة فترة إغلاق أو عطلة",
    timeOffStarts: "بداية فترة الإغلاق",
    timeOffEnds: "نهاية فترة الإغلاق",
    timeOffReason: "السبب (مثال: عيد الفطر، أشغال، عطلة سنوية)",
    saveTimeOffBtn: "حفظ وتثبيت فترة الإغلاق",
    noTimeOff: "لا توجد فترات إغلاق استثنائية مسجلة",
    noTimeOffSub: "يمكنك تعطيل أيام أو أوقات محددة بمناسبة الأعياد أو العطل السنوية.",
    mon: "الإثنين",
    tue: "الثلاثاء",
    wed: "الأربعاء",
    thu: "الخميس",
    fri: "الجمعة",
    sat: "السبت",
    sun: "الأحد",

    // Dashboard Branding
    brandingTitle: "الهوية البصرية وتخصيص صفحة الحجز",
    brandingSub: "اضبط مظهر صفحتك لتعكس فخامة صالونك وشارك الرابط مع زبنائك",
    themeColorLabel: "اللون الرئيسي المميز لصالونك",
    welcomeMessageLabel: "رسالة الترحيب بزبنائك في أعلى الصفحة",
    welcomeMessagePlaceholder: "مرحباً بكم في صالوننا ! احجزوا موعدكم بكل سهولة وأناقة.",
    saveBrandingBtn: "حفظ التخصيص",
    publishPageBtn: "نشر الصفحة للعموم",
    unpublishPageBtn: "تحويل إلى مسودة خاصة",
    copyLinkBtn: "نسخ رابط الحجز المباشر",
    linkCopied: "تم نسخ الرابط بنجاح إلى الحافظة !",
    livePreviewTitle: "معاينة حية على شاشة الهاتف",
    uploadLogoBtn: "تغيير شعار الصالون",
    customColorLabel: "لون مخصص (كود Hex)",
    recommendedPalettes: "ألوان مقترحة لصالونات التجميل المغربية",

    // Dashboard Settings
    settingsTitle: "إعدادات المؤسسة وقواعد الحجز",
    settingsSub: "أدخل معلومات التواصل، العنوان في المغرب وشروط وسياسة الحجز",
    businessNameLabel: "اسم المؤسسة أو الصالون",
    slugLabel: "الرابط المخصص (معرّف الرابط URL)",
    cityLabel: "المدينة بالمغرب",
    addressLabel: "العنوان بالتفصيل (الحي، الشارع)",
    contactPhoneLabel: "هاتف الاتصال المباشر / واتساب",
    descriptionLabel: "نبذة تعريفية عن الصالون وخدماته",
    advanceNoticeHoursLabel: "الحد الأدنى للإشعار المسبق (بالساعات)",
    advanceNoticeHelp: "يمنع الحجوزات المفاجئة في اللحظة الأخيرة (مثال: ساعتان قبل الموعد كحد أدنى).",
    bookingHorizonDaysLabel: "أقصى فترة حجز مسبق (بالأيام)",
    bookingHorizonHelp: "يحدد مدى إمكانية الحجز مستقبلاً (مثال: 30 يوماً كحد أقصى مسبقاً).",
    saveSettingsBtn: "حفظ الإعدادات العامة",

    // Onboarding
    onboardingWelcome: "أهلاً بك في BooklyPro ! 🎉",
    onboardingSub: "لنقم معاً بتهيئة صالونك في خطوات معدودة وسريعة.",
    stepEstablishment: "المؤسسة",
    stepBranding: "الهوية",
    stepFirstService: "الخدمة الأولى",
    stepPublish: "النشر",
    step1Desc: "صالونك جاهز للتهيئة مع رابط خاص باسمك وعلامتك التجارية.",
    step2Desc: "اختر ألوانك المفضلة ورسالة الترحيب التي ستظهر لزبنائك.",
    step3Desc: "أضف أول خدمة لتبدأ في استقبال المواعيد وجدولتها فوراً.",
    step4Desc: "كل شيء جاهز ومكتمل ! يمكنك الآن نشر صفحتك ومشاركة الرابط.",
    readyToPublishMsg: "تهانينا ! صفحة حجز صالونك جاهزة بالكامل لاستقبال أولى الحجوزات.",
    nextStepBtn: "الخطوة التالية",
    finishAndLaunchBtn: "نشر والذهاب للوحة التحكم",

    // Auth (Login & Register)
    loginTitle: "تسجيل الدخول إلى بوابتك المهنية",
    loginSub: "أدر مواعيدك، طاقم العمل وخدماتك بكل سهولة وأمان",
    registerTitle: "أنشئ صفحة حجز صالونك الآن",
    registerSub: "في دقيقتين فقط، يكون صالونك أو معهدك التجميلي جاهزاً لاستقبال الحجوزات",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    signInBtn: "تسجيل الدخول",
    createAccountBtn: "إنشاء حساب مهني جديد",
    oneClickDemo: "دخول تجريبي بضغطة واحدة (صالون أمينة، فاس)",
    oneClickDemoSub: "دخول فوري مباشر بدون كلمة مرور لتجربة المنصة",
    orDivider: "أو سجل عبر البريد الإلكتروني",
    noAccountPrompt: "ليس لديك حساب بعد ؟",
    alreadyAccountPrompt: "هل لديك حساب بالفعل ؟",
    googleLoginBtn: "المتابعة عبر حساب Google",

    // Common Toasts & Dialogs
    toastSaved: "تم حفظ التعديلات بنجاح تام !",
    toastError: "حدث خطأ أثناء إجراء العملية، يرجى المحاولة ثانية.",
    toastDeleted: "تم الحذف بنجاح.",
    toastCopied: "تم النسخ بنجاح إلى الحافظة !",
    toastStatusUpdated: "تم تحديث حالة الموعد بنجاح.",
    cancelBtn: "إلغاء",
    deleteConfirmTitle: "هل أنت متأكد من رغبتك في حذف هذا العنصر ؟",
    confirmDeleteBtn: "تأكيد الحذف",

    // SimplyBook.me Inspired Components
    trustRatingGoogle: "4.9/5 على تقييمات Google",
    trustRatingCapterra: "4.8/5 رضا الزبناء والمهنيين",
    trustSecured: "100% حماية تامة وأمان المعطيات",
    trustMoroccoSalons: "+120 صالون ومعهد تجميل بالمغرب",
    tabCoreFeatures: "الميزات الأساسية",
    tabBusinessGrowth: "إدارة ونمو الصالون",
    tabClientExperience: "تجربة الزبون",
    featuresSectionTitle: "كل ما تحتاجه لتسيير وتطوير صالونك باحترافية",
    featuresSectionSub: "أدوات عصرية مستوحاة من أفضل المعايير العالمية ومصممة خصيصاً للمهنيين في المغرب.",
    industryTitle: "حل متكامل مصمم لكل مهن التجميل والعناية بالمغرب",
    industrySub: "سواء كنت تدير صالون حلاقة، سبا حمام مغربي، أو مركز تجميل، تتكيف المنصة مع متطلباتك.",
    industryHair: "الحلاقة والتصفيف (Barbershop & Coiffure)",
    industryHairDesc: "صالونات نسائية، حلاقة رجالية راقية، خبراء الصباغة، الكيراتين وعلاج الشعر.",
    industrySpa: "السبا والحمام المغربي التقليدي",
    industrySpaDesc: "حمامات بلدية، جلسات التقشير بالصابون البلدي، التدليك والاسترخاء الملكي.",
    industryBeauty: "العناية بالبشرة وتركيب الأظافر والرموش",
    industryBeautyDesc: "مانيكير وباديكير، جل، تركيب الرموش، مايكروبليدينغ وجلسات تنظيف البشرة.",
    industryWellness: "مراكز العناية والراحة والاسترخاء",
    industryWellnessDesc: "علاجات طبيعية، تصريف ليمفاوي، لياقة بدنية ومراكز التخسيس والعناية بالجسم.",
    comparisonTitle: "لماذا تختار الصالونات المغربية منصة BooklyPro",
    comparisonSub: "قارن بين التسيير اليدوي التقليدي وراحة البال مع منصة رقمية متطورة.",
    comparisonColBefore: "قبل BooklyPro (التسيير التقليدي)",
    comparisonColAfter: "مع BooklyPro (النظام الرقمي الذكي)",
    compItem1Before: "مكالمات ورسائل واتساب مستمرة تقاطعك أثناء خدمة الزبناء",
    compItem1After: "صفحة حجز تعمل 24/7 : زبناؤك يحجزون باستقلالية وسهولة",
    compItem2Before: "تخلف الزبناء عن المواعيد (No-shows) وخسارة في المداخيل",
    compItem2After: "وصل حجز رسمي فوري بصيغة PDF وتذكير مباشر عبر واتساب",
    compItem3Before: "تضارب الحجوزات وأخطاء متكررة في الدفتر الورقي",
    compItem3After: "قفل حجز فوري ومحكم يضمن عدم تضارب المواعيد بنسبة 100%",
    compItem4Before: "ارتباك في الأسعار وصعوبة تنظيم الدفعات المسبقة",
    compItem4After: "أسعار واضحة بالدرهم المغربي (MAD) ودفع مريح بعين المكان",
    finalCtaBadge: "طور مشروعك وانضم إلى رواد المستقبل",
    finalCtaTitle: "جاهز لتنظيم جدول مواعيدك دون إضاعة الوقت في الهاتف ؟",
    finalCtaSub: "أنشئ صفحة حجز صالونك في دقيقتين فقط، ووفر لزبنائك أرقى تجربة حجز في المغرب.",
    noCardRequired: "مجاني للبدء • بدون بطاقة بنكية • جاهز في دقيقتين",
    viewDemoLive: "تجربة العرض التوضيحي المباشر",
    liveAgendaSimulator: "جدول المواعيد المباشر"
  },

  en: {
    // Public Landing & Common
    demoSalonAmina: "Demo: Salon Amina (Fez)",
    mySpace: "Pro Dashboard",
    login: "Log in",
    register: "Create my page",
    moroccoBadge: "Morocco",
    heroBadge: "The modern booking solution for salons & studios across Morocco",
    heroTitle: "Fill your appointment calendar without endless phone calls.",
    heroSub: "Provide your Moroccan clients with a seamless booking page priced in Moroccan Dirhams (MAD). Eliminate double-bookings and scale your team with ease.",
    createPageBtn: "Create my page in 2 minutes",
    seeDemoBtn: "Try Salon Amina Demo",
    featureDirhams: "Priced in Dirhams (MAD)",
    featurePdf: "Instant PDF Receipt",
    featureLanguages: "Arabic, French & English",
    featureNoDoubleBooking: "Zero Double-Booking Guarantee",
    showcaseBadge: "Live Interactive Preview",
    showcaseTitle: "Salon Amina Booking Page (Fez)",
    showcaseSub: "Your clients pick their service, specialist, and time slot in 3 clicks and get their official receipt.",
    showcaseTestBtn: "Test Booking & Download PDF",
    brandCardTitle: "Your Brand & Your Pricing",
    brandCardSub: "Customize your logo, brand colors, services in MAD, and weekly working hours.",
    realtimeCardTitle: "Real-time Availability",
    realtimeCardSub: "Automatic slot generation based on treatment duration and sanitization buffer time.",
    noConflictCardTitle: "Zero Scheduling Conflicts",
    noConflictCardSub: "Instant transactional lock preventing any double-booking at the exact same slot.",

    // Booking Flow Steps
    step1Title: "1. Select your service",
    step1Sub: "Choose the beauty treatment or grooming package",
    step2Title: "2. Choose your specialist",
    step2Sub: "Select your preferred stylist or pick any available",
    anyStaff: "Any available specialist",
    anyStaffSub: "First team member free at the selected time",
    step3Title: "3. Choose date & time",
    step3Sub: "Real-time verified slot availability",
    dateLabel: "Appointment date",
    availableSlots: "Available time slots",
    noSlots: "No available time slots for this date.",
    noSlotsSub: "The salon may be closed or fully booked on this date.",
    searchingSlots: "Checking available slots...",
    step4Title: "4. Your contact details",
    step4Sub: "We'll send immediate booking confirmation and your official receipt",
    fullName: "Full name *",
    phone: "Phone number (WhatsApp) *",
    emailOptional: "Email (optional, for receipt)",
    noteOptional: "Special note or preference",
    confirmBooking: "Confirm my appointment",
    confirming: "Confirming appointment...",
    recap: "Booking Summary",
    min: "min",
    mad: "MAD",
    changeService: "Change service",
    changeStaff: "Change specialist",
    changeSlot: "Change time slot",

    // Booking Confirmed
    confirmedTitle: "Appointment Successfully Confirmed!",
    confirmedSub: "Thank you! Your booking is registered in the salon calendar.",
    uniqueRef: "Unique Booking Reference",
    downloadPdf: "Download Official Receipt (PDF)",
    shareWhatsapp: "Confirm on WhatsApp",
    payOnSite: "Payment on-site in Moroccan Dirhams (MAD) upon your arrival.",
    backHome: "Back to Home",
    durationLabel: "Duration",
    specialistLabel: "Specialist",
    contactOnWhatsapp: "Contact salon on WhatsApp",
    back: "Back",
    previousStep: "Previous step",
    stepServices: "Service",
    stepStaff: "Specialist",
    stepTime: "Date & Time",
    stepDetails: "Details",
    verifiedBusiness: "Verified Establishment",
    backToOverview: "Back to dashboard",

    // Credits & Brand
    coFounder: "Co-Founder",
    coFounderCredit: "Co-Founded by Hassan Nfissi",
    craftedInMorocco: "Crafted with passion in Morocco for service professionals 🇲🇦",
    allRightsReserved: "All rights reserved.",

    // Sidebar & Navigation
    navOverview: "Overview",
    navAppointments: "Appointments",
    navServices: "Services & Pricing",
    navStaff: "Team & Specialists",
    navSchedule: "Hours & Time Off",
    navBranding: "Branding & Booking Page",
    navSettings: "Salon Settings",
    logout: "Log out",
    proSpaceBadge: "Morocco Pro Space",
    onlineStatus: "Live",
    draftStatus: "Draft",
    viewClientPage: "View client page",
    adminSpace: "Admin Workspace",

    // Dashboard Overview
    hello: "Welcome back",
    overviewSub: "Here is your real-time salon activity and upcoming appointments",
    todayMetric: "Today",
    confirmedMetric: "Confirmed",
    completedMetric: "Completed",
    cancelledMetric: "Cancelled",
    notPublishedBannerTitle: "Your booking page is not published yet",
    notPublishedBannerSub: "Check your services, add your team members, and publish your page to start accepting bookings today.",
    publishMyPageBtn: "Publish my page",
    recentAppointmentsTitle: "Recent Appointments",
    viewAllCalendar: "View full schedule",
    noAppointmentsYet: "No appointments registered yet.",
    loadingDashboard: "Loading dashboard data...",

    // Dashboard Appointments
    appointmentsTitle: "Appointment Management",
    appointmentsSub: "View your calendar and update client booking statuses in one click",
    filterAll: "All statuses",
    filterConfirmed: "Confirmed",
    filterCompleted: "Completed",
    filterCancelled: "Cancelled",
    markCompleted: "Mark as completed",
    markCancelled: "Cancel appointment",
    noAppointmentsFound: "No appointments found",
    noAppointmentsFoundSub: "Client bookings submitted on your public page will appear here immediately.",
    notePrefix: "Client note:",
    statusConfirmed: "Confirmed",
    statusCompleted: "Completed",
    statusCancelled: "Cancelled",

    // Dashboard Services
    servicesTitle: "Services & Pricing Catalog",
    servicesSub: "Configure your treatments, prices in MAD, and durations",
    addServiceBtn: "Add new service",
    editServiceBtn: "Edit",
    serviceNameLabel: "Service name",
    serviceDescLabel: "Description (benefits, products used...)",
    servicePriceLabel: "Price in MAD",
    serviceDurationLabel: "Duration (minutes)",
    bufferMinutesLabel: "Buffer / clean time (min)",
    activeLabel: "Available online",
    inactiveLabel: "Hidden",
    saveServiceBtn: "Save service",
    newServiceModalTitle: "Add new service",
    editServiceModalTitle: "Edit service",
    noServicesFound: "No services configured yet",
    noServicesFoundSub: "Add your first service to let clients book online.",

    // Dashboard Staff
    staffTitle: "Team & Specialists",
    staffSub: "Manage your stylists and assign available services to each",
    addStaffBtn: "Add team member",
    editStaffBtn: "Edit",
    staffNameLabel: "Full name",
    staffEmailLabel: "Professional email (optional)",
    staffPhoneLabel: "WhatsApp / Phone number",
    assignedServicesLabel: "Services provided by this member",
    saveStaffBtn: "Save team member",
    newStaffModalTitle: "New team member",
    editStaffModalTitle: "Edit team member",
    noStaffFound: "No team members found",
    noStaffFoundSub: "Add your specialists so clients can book directly with them.",
    allServicesAssigned: "All services assigned",

    // Dashboard Schedule
    scheduleTitle: "Weekly Working Hours & Time Off",
    scheduleSub: "Configure your daily business hours and planned closures",
    weeklyHoursTitle: "Weekly business timetable",
    saveHoursBtn: "Save business hours",
    closedLabel: "Closed all day",
    openLabel: "Open",
    timeOffTitle: "Time Off & Holiday Closures",
    addTimeOffBtn: "Add closure period",
    timeOffStarts: "Start date & time",
    timeOffEnds: "End date & time",
    timeOffReason: "Reason (e.g. Eid, Renovations, Annual Leave)",
    saveTimeOffBtn: "Save closure",
    noTimeOff: "No planned closures",
    noTimeOffSub: "You can block days or hours for holidays or maintenance.",
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",

    // Dashboard Branding
    brandingTitle: "Branding & Public Booking Page",
    brandingSub: "Tailor the visual style of your client page and share your link",
    themeColorLabel: "Primary brand color",
    welcomeMessageLabel: "Welcome message for clients",
    welcomeMessagePlaceholder: "Welcome to our salon! Book your appointment in a few easy steps.",
    saveBrandingBtn: "Save customization",
    publishPageBtn: "Publish page",
    unpublishPageBtn: "Switch to draft",
    copyLinkBtn: "Copy booking link",
    linkCopied: "Link copied to clipboard!",
    livePreviewTitle: "Live mobile preview",
    uploadLogoBtn: "Change salon logo",
    customColorLabel: "Custom color (Hex code)",
    recommendedPalettes: "Curated palettes for Moroccan salons",

    // Dashboard Settings
    settingsTitle: "Salon Information & Booking Rules",
    settingsSub: "Manage your contact info, location in Morocco, and booking policy",
    businessNameLabel: "Establishment name",
    slugLabel: "Custom URL link (Slug)",
    cityLabel: "City in Morocco",
    addressLabel: "Full address (neighborhood, street)",
    contactPhoneLabel: "Direct phone / WhatsApp",
    descriptionLabel: "Short salon bio",
    advanceNoticeHoursLabel: "Minimum advance notice (hours)",
    advanceNoticeHelp: "Prevents last-minute surprises (e.g. min 2 hours notice).",
    bookingHorizonDaysLabel: "Maximum booking horizon (days)",
    bookingHorizonHelp: "Limits how far ahead clients can book (e.g. max 30 days ahead).",
    saveSettingsBtn: "Save settings",

    // Onboarding
    onboardingWelcome: "Welcome to BooklyPro! 🎉",
    onboardingSub: "Let's set up your salon in a few simple steps.",
    stepEstablishment: "Establishment",
    stepBranding: "Branding",
    stepFirstService: "First Service",
    stepPublish: "Launch",
    step1Desc: "Your salon is ready to be set up with a dedicated custom link.",
    step2Desc: "Pick your brand colors and client welcome note.",
    step3Desc: "Add your first flagship service to start filling your schedule.",
    step4Desc: "All set! You can now publish your page and share the link.",
    readyToPublishMsg: "Congratulations! Your booking page is fully ready to take appointments.",
    nextStepBtn: "Next step",
    finishAndLaunchBtn: "Publish & Go to Dashboard",

    // Auth (Login & Register)
    loginTitle: "Log in to your Pro Space",
    loginSub: "Manage your bookings, team members, and services",
    registerTitle: "Create your booking page",
    registerSub: "In just 2 minutes, your Moroccan salon is ready to accept bookings",
    emailLabel: "Email address",
    passwordLabel: "Password",
    signInBtn: "Sign in",
    createAccountBtn: "Create professional account",
    oneClickDemo: "1-Click Demo Login (Salon Amina, Fez)",
    oneClickDemoSub: "Instant passwordless access to test the platform",
    orDivider: "or sign in with email",
    noAccountPrompt: "Don't have an account yet?",
    alreadyAccountPrompt: "Already have an account?",
    googleLoginBtn: "Continue with Google",

    // Common Toasts & Dialogs
    toastSaved: "Changes saved successfully!",
    toastError: "An error occurred during this action.",
    toastDeleted: "Item deleted successfully.",
    toastCopied: "Copied to clipboard!",
    toastStatusUpdated: "Appointment status updated.",
    cancelBtn: "Cancel",
    deleteConfirmTitle: "Are you sure you want to delete this item?",
    confirmDeleteBtn: "Confirm deletion",

    // SimplyBook.me Inspired Components
    trustRatingGoogle: "4.9/5 on Google Reviews",
    trustRatingCapterra: "4.8/5 Client Satisfaction",
    trustSecured: "100% Secured & Data Protected",
    trustMoroccoSalons: "+120 Salons & Spas in Morocco",
    tabCoreFeatures: "Core Features",
    tabBusinessGrowth: "Business Essentials",
    tabClientExperience: "Client Experience",
    featuresSectionTitle: "Everything You Need to Run & Grow Your Salon",
    featuresSectionSub: "Modern booking software inspired by global industry leaders, tailored for Morocco.",
    industryTitle: "Tailored for Every Beauty & Wellness Sector in Morocco",
    industrySub: "Whether you run a luxury hair studio, a Moroccan bath & hammam, or an aesthetic clinic, BooklyPro scales with your craft.",
    industryHair: "Hair Salons & Barbershops",
    industryHairDesc: "Women's salons, traditional barber studios, colorists, and keratin & hair care experts.",
    industrySpa: "Spas & Moroccan Hammams",
    industrySpaDesc: "Authentic steam baths, beldi soap exfoliating rituals, relaxing massage, and oriental packages.",
    industryBeauty: "Beauty, Nails & Lashes",
    industryBeautyDesc: "Manicures, gel nails, lash extensions, microblading, and advanced clinical facials.",
    industryWellness: "Wellness & Holistic Centers",
    industryWellnessDesc: "Relaxation therapies, lymphatic drainage, wellness coaching, and fitness centers.",
    comparisonTitle: "Why Moroccan Beauty Businesses Choose BooklyPro",
    comparisonSub: "Compare manual scheduling friction with the peace of mind of an automated platform.",
    comparisonColBefore: "Before BooklyPro (Manual Hassle)",
    comparisonColAfter: "With BooklyPro (Digital Automation)",
    compItem1Before: "Endless phone calls and fragmented WhatsApp messages interrupting your client treatments",
    compItem1After: "24/7 dedicated online booking page: clients schedule autonomously anytime",
    compItem2Before: "Costly no-shows and wasted empty calendar gaps without validation",
    compItem2After: "Instant official downloadable PDF receipt & automated WhatsApp appointment reminders",
    compItem3Before: "Frequent double-booking confusion and overlapping handwriting errors on paper notebooks",
    compItem3After: "100% transactional slot locking: zero double-booking conflicts guaranteed",
    compItem4Before: "Price ambiguity and awkward deposit collection at reception",
    compItem4After: "Clear Moroccan Dirham (MAD) pricing and effortless payment on-site upon arrival",
    finalCtaBadge: "Upgrade Your Salon Experience Today",
    finalCtaTitle: "Ready to fill your appointment calendar without endless phone calls?",
    finalCtaSub: "Set up your page in 2 minutes. Deliver the smoothest booking journey to your clients across Morocco.",
    noCardRequired: "Free to start • No credit card required • Ready in 2 min",
    viewDemoLive: "Try Live Salon Demo",
    liveAgendaSimulator: "Live Agenda Preview"
  }
};
