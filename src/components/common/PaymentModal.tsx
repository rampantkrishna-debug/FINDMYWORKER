import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Smartphone, CreditCard, Building2, Banknote, ArrowRight } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  title: string;
  subtitle: string;
  onPaymentSuccess: (details: { method: 'upi' | 'card' | 'cash'; transactionId: string }) => void;
  allowCash?: boolean;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  title,
  subtitle,
  onPaymentSuccess,
  allowCash = false
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking' | 'cash'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('742');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        const resolvedMethod = method === 'cash' ? 'cash' : method === 'card' ? 'card' : 'upi';
        onPaymentSuccess({
          method: resolvedMethod,
          transactionId: `RAZ_PAY_${Date.now().toString().slice(-8)}`
        });
      }, 1000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center font-bold text-white shadow-md">
              ₹
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                <Lock size={12} className="text-emerald-400" />
                Find My Worker Secure Gateway
              </div>
              <h3 className="font-bold text-lg">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Amount bar */}
        <div className="bg-brand-orange-light px-5 py-3 border-b border-orange-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-brand-navy/70">{subtitle}</div>
            <div className="text-xs text-brand-navy/50">Includes all GST & platform fee</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-brand-navy">₹{amount}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {isDone ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Payment Verified!</h4>
              <p className="text-sm text-slate-600">Your transaction has been securely processed.</p>
            </div>
          ) : (
            <>
              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    method === 'upi'
                      ? 'border-brand-orange bg-orange-50/50 text-brand-orange font-semibold shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Smartphone size={20} className="mx-auto mb-1" />
                  <span className="text-xs">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    method === 'card'
                      ? 'border-brand-orange bg-orange-50/50 text-brand-orange font-semibold shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <CreditCard size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('netbanking')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    method === 'netbanking'
                      ? 'border-brand-orange bg-orange-50/50 text-brand-orange font-semibold shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Building2 size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Net Banking</span>
                </button>
              </div>

              {allowCash && (
                <button
                  type="button"
                  onClick={() => setMethod('cash')}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    method === 'cash'
                      ? 'border-brand-orange bg-orange-50 text-brand-orange font-semibold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <Banknote size={18} />
                    <span>Pay Cash Directly to Worker on Completion</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">Supported</span>
                </button>
              )}

              {/* Method Details */}
              {method === 'upi' && (
                <div className="space-y-3 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Enter UPI ID (Google Pay / PhonePe / Paytm)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-brand-orange"
                      placeholder="e.g. mobile@upi"
                    />
                  </div>
                  <div className="flex items-center justify-around py-1">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-indigo-50 text-indigo-700">GPay</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-purple-50 text-purple-700">PhonePe</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 text-blue-700">Paytm</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-50 text-emerald-700">BHIM</span>
                  </div>
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-2 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          maxLength={3}
                          className="w-full px-3 py-1.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {method === 'netbanking' && (
                <div className="pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <label className="block text-xs font-medium text-slate-700 mb-2">Select Your Bank</label>
                    <select className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-brand-orange">
                      <option>HDFC Bank</option>
                      <option>State Bank of India</option>
                      <option>ICICI Bank</option>
                      <option>Punjab National Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full mt-4 py-3.5 px-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting to Bank...
                  </span>
                ) : (
                  <>
                    <span>Pay ₹{amount} Securely</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Trust Badge */}
              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>256-bit Bank Grade Encryption • 100% Refund Guarantee</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

