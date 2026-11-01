export type UserRole = 'customer' | 'worker' | 'admin';

export type City = 'Mohali' | 'Chandigarh';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  city: City;
  avatarUrl?: string;
  createdAt: string;
}

export interface CustomerProfile extends User {
  role: 'customer';
  savedAddresses: Address[];
}

export interface Address {
  id: string;
  label: 'Home' | 'Office' | 'Other';
  city: City;
  area: string; // e.g., 'Phase 7', 'Sector 35-C'
  streetAddress: string;
  landmark?: string;
  pincode: string;
  isDefault?: boolean;
}

export type WorkerVerificationStatus = 'pending' | 'verified' | 'rejected';

export interface WorkerProfile extends User {
  role: 'worker';
  verificationStatus: WorkerVerificationStatus;
  verificationNotes?: string;
  services: string[]; // service ids e.g. 'electrician', 'ac-repair'
  experienceYears: number;
  serviceAreas: string[]; // e.g. ['Phase 1-7 Mohali', 'Sector 17-35 Chandigarh']
  bio: string;
  dailyRate?: number;
  hourlyRate?: number;
  isOnline: boolean;
  rating: number;
  totalRatingsCount: number;
  completedJobsCount: number;
  documents: {
    aadhaarNumberMasked: string;
    aadhaarDocUrl?: string;
    tradeCertificateUrl?: string;
    panNumberMasked?: string;
  };
  payoutDetails: {
    upiId: string;
    accountHolderName: string;
    bankName: string;
    accountNumberMasked: string;
    ifsc: string;
  };
  earnings: {
    totalGross: number;
    platformFeeDeducted: number;
    netPaidOut: number;
    walletBalance: number;
  };
}

export type ServiceCategory = 'skilled' | 'unskilled';

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  tokenPrice: number; // ₹99, ₹149, or ₹199
  estimatedBaseCost: string; // e.g., '₹249 - ₹499'
  estimatedDuration: string;
  popular: boolean;
  included: string[];
  excluded: string[];
  faqs: { question: string; answer: string }[];
  subcategories: string[];
}

export type BookingStatus =
  | 'PENDING_ACCEPTANCE'
  | 'ACCEPTED'
  | 'EN_ROUTE'
  | 'ARRIVED_INSPECTING'
  | 'QUOTATION_SUBMITTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Quotation {
  id: string;
  bookingId: string;
  laborCharges: number;
  materialsCost: number;
  notes: string;
  tokenAdjusted: number; // e.g. -99
  finalPayableAmount: number;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Booking {
  id: string;
  bookingNumber: string; // e.g. FMW-2026-8941
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceTitle: string;
  subService?: string;
  category: ServiceCategory;
  description: string;
  photos?: string[];
  address: Address;
  scheduledDate: string;
  scheduledTimeSlot: string;
  tokenAmount: number;
  tokenPaymentStatus: 'paid' | 'refunded' | 'adjusted';
  tokenTransactionId: string;
  status: BookingStatus;
  workerId?: string;
  workerName?: string;
  workerPhone?: string;
  workerRating?: number;
  workerAvatar?: string;
  estimatedArrivalMins?: number;
  quotation?: Quotation;
  finalPayment?: {
    method: 'upi' | 'card' | 'cash';
    status: 'paid' | 'pending';
    transactionId?: string;
    paidAt?: string;
    amount: number;
  };
  review?: {
    rating: number;
    feedback: string;
    punctualityRating: number;
    qualityRating: number;
    createdAt: string;
  };
  cancellationReason?: string;
  cancelledBy?: 'customer' | 'worker' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  workerId: string;
  customerId: string;
  customerName: string;
  customerCity: City;
  serviceTitle: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PlatformConfig {
  commissionRate: number; // e.g., 0.08 (8%)
  inspectionFeeIfCancelled: number; // ₹99
  freeCancellationMinutes: number; // 30
  activeLocations: City[];
}

