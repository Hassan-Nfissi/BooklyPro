export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  phone?: string;
  city: string;
  address?: string;
  timezone: string;
  currency: string;
  published: boolean;
  advanceNoticeHours: number;
  bookingHorizonDays: number;
}

export interface Branding {
  logoUrl?: string;
  coverUrl?: string;
  primaryColor: string;
  themeKey: string;
  welcomeMessage?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  priceMad: number;
  durationMinutes: number;
  bufferMinutes: number;
  imageUrl?: string;
  active: boolean;
}

export interface StaffItem {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  active: boolean;
  assignedServiceIds: string[];
}

export interface WorkingHourItem {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
  closed: boolean;
}

export interface TimeOffItem {
  id: string;
  startsAt: string;
  endsAt: string;
  reason?: string;
}

export interface SlotItem {
  startTime: string;
  endTime: string;
  staffId: string;
  staffName: string;
  formattedTime: string;
}

export interface AppointmentItem {
  id: string;
  businessId: string;
  serviceId: string;
  serviceName: string;
  priceMad: number;
  durationMinutes: number;
  startsAt: string;
  endsAt: string;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  bookingReference: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  customerNote?: string;
  staffId: string;
  staffName: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalAppointments: number;
  todayAppointments: number;
  confirmedCount: number;
  completedCount: number;
  cancelledCount: number;
  activeServicesCount: number;
  activeStaffCount: number;
  isPublished: boolean;
  publicUrl: string;
  businessName: string;
  slug: string;
}

export interface PublicBusiness {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  phone?: string;
  city: string;
  address?: string;
  currency: string;
  branding: Branding;
  services: ServiceItem[];
  staff: StaffItem[];
  workingHours: WorkingHourItem[];
  advanceNoticeHours: number;
  bookingHorizonDays: number;
}
