import React from 'react';
import { BookingStatus, WorkerVerificationStatus } from '../../types';

interface BadgeProps {
  status: BookingStatus | WorkerVerificationStatus | 'paid' | 'pending' | 'refunded' | 'adjusted';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const configMap: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    // Booking statuses
    PENDING_ACCEPTANCE: {
      label: 'Searching Worker...',
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      dot: 'bg-amber-500 animate-pulse'
    },
    ACCEPTED: {
      label: 'Worker Assigned',
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      dot: 'bg-blue-500'
    },
    EN_ROUTE: {
      label: 'Worker En Route',
      bg: 'bg-indigo-50 border-indigo-200',
      text: 'text-indigo-800',
      dot: 'bg-indigo-500 animate-bounce'
    },
    ARRIVED_INSPECTING: {
      label: 'Arrived & Inspecting',
      bg: 'bg-purple-50 border-purple-200',
      text: 'text-purple-800',
      dot: 'bg-purple-500'
    },
    QUOTATION_SUBMITTED: {
      label: 'Quotation Awaiting Approval',
      bg: 'bg-orange-50 border-orange-200',
      text: 'text-orange-800',
      dot: 'bg-orange-500'
    },
    IN_PROGRESS: {
      label: 'Work in Progress',
      bg: 'bg-cyan-50 border-cyan-200',
      text: 'text-cyan-800',
      dot: 'bg-cyan-500 animate-pulse'
    },
    COMPLETED: {
      label: 'Job Completed',
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500'
    },
    CANCELLED: {
      label: 'Cancelled',
      bg: 'bg-rose-50 border-rose-200',
      text: 'text-rose-800',
      dot: 'bg-rose-500'
    },

    // Verification
    verified: {
      label: 'Verified Partner',
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500'
    },
    pending: {
      label: 'Verification Pending',
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      dot: 'bg-amber-500'
    },
    rejected: {
      label: 'Verification Rejected',
      bg: 'bg-rose-50 border-rose-200',
      text: 'text-rose-800',
      dot: 'bg-rose-500'
    },

    // Payment statuses
    paid: {
      label: 'Paid',
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500'
    },
    refunded: {
      label: 'Refunded',
      bg: 'bg-slate-100 border-slate-200',
      text: 'text-slate-700',
      dot: 'bg-slate-400'
    },
    adjusted: {
      label: 'Adjusted in Bill',
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      dot: 'bg-blue-500'
    }
  };

  const current = configMap[status] || {
    label: status,
    bg: 'bg-slate-50 border-slate-200',
    text: 'text-slate-700',
    dot: 'bg-slate-400'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${current.bg} ${current.text} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  );
};

