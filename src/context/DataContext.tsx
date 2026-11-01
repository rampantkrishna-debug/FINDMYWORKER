import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Booking,
  WorkerProfile,
  CustomerProfile,
  Review,
  PlatformConfig,
  BookingStatus,
  Quotation
} from '../types';
import {
  INITIAL_BOOKINGS,
  INITIAL_WORKERS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_CONFIG
} from '../data/initialData';

interface DataContextType {
  bookings: Booking[];
  workers: WorkerProfile[];
  customers: CustomerProfile[];
  reviews: Review[];
  config: PlatformConfig;
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'updatedAt' | 'tokenTransactionId'>) => Booking;
  workerAcceptBooking: (bookingId: string, workerId: string) => void;
  workerRejectBooking: (bookingId: string, workerId: string) => void;
  workerEnRoute: (bookingId: string) => void;
  workerArrived: (bookingId: string) => void;
  submitQuotation: (bookingId: string, labor: number, materials: number, notes: string) => void;
  customerApproveQuotation: (bookingId: string) => void;
  workerCompleteJob: (bookingId: string) => void;
  payFinalBill: (bookingId: string, method: 'upi' | 'card' | 'cash') => void;
  submitReview: (bookingId: string, rating: number, feedback: string, punctualityRating: number, qualityRating: number) => void;
  cancelBooking: (bookingId: string, reason: string, cancelledBy: 'customer' | 'worker' | 'admin') => void;
  toggleWorkerOnline: (workerId: string) => void;
  adminVerifyWorker: (workerId: string, status: 'verified' | 'rejected', notes?: string) => void;
  updateConfig: (newConfig: Partial<PlatformConfig>) => void;
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('fmw_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    const saved = localStorage.getItem('fmw_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [customers, setCustomers] = useState<CustomerProfile[]>(() => {
    const saved = localStorage.getItem('fmw_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('fmw_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [config, setConfig] = useState<PlatformConfig>(() => {
    const saved = localStorage.getItem('fmw_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fmw_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('fmw_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('fmw_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('fmw_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('fmw_config', JSON.stringify(config));
  }, [config]);

  // Create booking
  const createBooking = (
    bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'updatedAt' | 'tokenTransactionId'>
  ): Booking => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      bookingNumber: `FMW-2026-${randomSuffix}`,
      tokenTransactionId: `TXN_TOK_${Date.now().toString().slice(-7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);

    // Realistic auto-dispatch simulation:
    // If there is an online verified worker matching the service and city, auto-propose or assign after 5 seconds
    setTimeout(() => {
      setBookings(currentList => {
        const target = currentList.find(b => b.id === newBooking.id);
        if (!target || target.status !== 'PENDING_ACCEPTANCE') return currentList;

        const eligibleWorker = workers.find(
          w =>
            w.verificationStatus === 'verified' &&
            w.isOnline &&
            w.services.includes(target.serviceId) &&
            w.city === target.address.city
        );

        if (eligibleWorker) {
          return currentList.map(b =>
            b.id === newBooking.id
              ? {
                  ...b,
                  status: 'ACCEPTED',
                  workerId: eligibleWorker.id,
                  workerName: eligibleWorker.name,
                  workerPhone: eligibleWorker.phone,
                  workerRating: eligibleWorker.rating,
                  workerAvatar: eligibleWorker.avatarUrl,
                  estimatedArrivalMins: Math.floor(20 + Math.random() * 15),
                  updatedAt: new Date().toISOString()
                }
              : b
          );
        }
        return currentList;
      });
    }, 4000);

    return newBooking;
  };

  const workerAcceptBooking = (bookingId: string, workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'ACCEPTED' as BookingStatus,
              workerId: worker.id,
              workerName: worker.name,
              workerPhone: worker.phone,
              workerRating: worker.rating,
              workerAvatar: worker.avatarUrl,
              estimatedArrivalMins: 25,
              updatedAt: new Date().toISOString()
            }
          : b
      )
    );
  };

  const workerRejectBooking = (bookingId: string, _workerId: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              workerId: undefined,
              workerName: undefined,
              status: 'PENDING_ACCEPTANCE' as BookingStatus,
              updatedAt: new Date().toISOString()
            }
          : b
      )
    );
  };

  const workerEnRoute = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'EN_ROUTE' as BookingStatus,
              estimatedArrivalMins: 15,
              updatedAt: new Date().toISOString()
            }
          : b
      )
    );
  };

  const workerArrived = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'ARRIVED_INSPECTING' as BookingStatus,
              estimatedArrivalMins: 0,
              updatedAt: new Date().toISOString()
            }
          : b
      )
    );
  };

  const submitQuotation = (bookingId: string, labor: number, materials: number, notes: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        const totalRaw = labor + materials;
        const payable = Math.max(0, totalRaw - b.tokenAmount);
        const quote: Quotation = {
          id: `quote-${Date.now()}`,
          bookingId,
          laborCharges: labor,
          materialsCost: materials,
          notes,
          tokenAdjusted: b.tokenAmount,
          finalPayableAmount: payable,
          createdAt: new Date().toISOString(),
          status: 'pending'
        };
        return {
          ...b,
          quotation: quote,
          status: 'QUOTATION_SUBMITTED' as BookingStatus,
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  const customerApproveQuotation = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId || !b.quotation) return b;
        return {
          ...b,
          quotation: {
            ...b.quotation,
            status: 'accepted'
          },
          status: 'IN_PROGRESS' as BookingStatus,
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  const workerCompleteJob = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'COMPLETED' as BookingStatus,
              updatedAt: new Date().toISOString()
            }
          : b
      )
    );
  };

  const payFinalBill = (bookingId: string, method: 'upi' | 'card' | 'cash') => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        const payable = b.quotation?.finalPayableAmount || 0;
        return {
          ...b,
          tokenPaymentStatus: 'adjusted',
          finalPayment: {
            method,
            status: 'paid',
            transactionId: `PAY_FIN_${Date.now().toString().slice(-8)}`,
            paidAt: new Date().toISOString(),
            amount: payable
          },
          updatedAt: new Date().toISOString()
        };
      })
    );

    // Update worker earnings
    const targetBooking = bookings.find(b => b.id === bookingId);
    if (targetBooking?.workerId && targetBooking.quotation) {
      const gross = targetBooking.quotation.laborCharges + targetBooking.quotation.materialsCost;
      const commission = Math.round(targetBooking.quotation.laborCharges * config.commissionRate);
      const net = gross - commission;

      setWorkers(prevWorkers =>
        prevWorkers.map(w => {
          if (w.id !== targetBooking.workerId) return w;
          return {
            ...w,
            completedJobsCount: w.completedJobsCount + 1,
            earnings: {
              totalGross: w.earnings.totalGross + gross,
              platformFeeDeducted: w.earnings.platformFeeDeducted + commission,
              netPaidOut: w.earnings.netPaidOut,
              walletBalance: w.earnings.walletBalance + net
            }
          };
        })
      );
    }
  };

  const submitReview = (
    bookingId: string,
    rating: number,
    feedback: string,
    punctualityRating: number,
    qualityRating: number
  ) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || !booking.workerId) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      bookingId,
      workerId: booking.workerId,
      customerId: booking.customerId,
      customerName: booking.customerName,
      customerCity: booking.address.city,
      serviceTitle: booking.serviceTitle,
      rating,
      comment: feedback,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setReviews(prev => [newRev, ...prev]);

    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              review: {
                rating,
                feedback,
                punctualityRating,
                qualityRating,
                createdAt: new Date().toISOString()
              },
              updatedAt: new Date().toISOString()
            }
          : b
      )
    );

    // Recalculate worker rating
    setWorkers(prevWorkers =>
      prevWorkers.map(w => {
        if (w.id !== booking.workerId) return w;
        const totalCount = w.totalRatingsCount + 1;
        const newAvg = Number(((w.rating * w.totalRatingsCount + rating) / totalCount).toFixed(2));
        return {
          ...w,
          rating: newAvg,
          totalRatingsCount: totalCount
        };
      })
    );
  };

  const cancelBooking = (bookingId: string, reason: string, cancelledBy: 'customer' | 'worker' | 'admin') => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        // Check cancellation policy:
        // If cancelled after inspection, inspection fee ₹99 applies (token retained/adjusted)
        // If cancelled before arrival/worker acceptance, token is refunded
        const isAfterInspection = b.status === 'ARRIVED_INSPECTING' || b.status === 'QUOTATION_SUBMITTED' || b.status === 'IN_PROGRESS';
        const refundStatus = isAfterInspection ? 'adjusted' : 'refunded';

        return {
          ...b,
          status: 'CANCELLED' as BookingStatus,
          tokenPaymentStatus: refundStatus,
          cancellationReason: reason,
          cancelledBy,
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  const toggleWorkerOnline = (workerId: string) => {
    setWorkers(prev =>
      prev.map(w =>
        w.id === workerId
          ? {
              ...w,
              isOnline: !w.isOnline
            }
          : w
      )
    );
  };

  const adminVerifyWorker = (workerId: string, status: 'verified' | 'rejected', notes?: string) => {
    setWorkers(prev =>
      prev.map(w =>
        w.id === workerId
          ? {
              ...w,
              verificationStatus: status,
              verificationNotes: notes || (status === 'verified' ? 'Approved by Admin.' : 'Rejected by Admin.')
            }
          : w
      )
    );
  };

  const updateConfig = (newConfig: Partial<PlatformConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetDemoData = () => {
    localStorage.removeItem('fmw_bookings');
    localStorage.removeItem('fmw_workers');
    localStorage.removeItem('fmw_customers');
    localStorage.removeItem('fmw_reviews');
    localStorage.removeItem('fmw_config');
    localStorage.removeItem('fmw_current_user');
    setBookings(INITIAL_BOOKINGS);
    setWorkers(INITIAL_WORKERS);
    setCustomers(INITIAL_CUSTOMERS);
    setReviews(INITIAL_REVIEWS);
    setConfig(INITIAL_CONFIG);
  };

  return (
    <DataContext.Provider
      value={{
        bookings,
        workers,
        customers,
        reviews,
        config,
        createBooking,
        workerAcceptBooking,
        workerRejectBooking,
        workerEnRoute,
        workerArrived,
        submitQuotation,
        customerApproveQuotation,
        workerCompleteJob,
        payFinalBill,
        submitReview,
        cancelBooking,
        toggleWorkerOnline,
        adminVerifyWorker,
        updateConfig,
        resetDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

