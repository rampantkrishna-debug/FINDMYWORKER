import { WorkerProfile, CustomerProfile, Booking, Review, PlatformConfig } from '../types';

export const INITIAL_CUSTOMERS: CustomerProfile[] = [];

export const INITIAL_WORKERS: WorkerProfile[] = [];

export const INITIAL_BOOKINGS: Booking[] = [];

export const INITIAL_REVIEWS: Review[] = [];

export const INITIAL_CONFIG: PlatformConfig = {
  commissionRate: 0.08, // 8%
  inspectionFeeIfCancelled: 99,
  freeCancellationMinutes: 30,
  activeLocations: ['Mohali', 'Chandigarh']
};
