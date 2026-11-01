import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Key
} from 'lucide-react';
import { setSupabasePublishableKey } from '../lib/supabase';

export const CustomerLoginPage: React.FC = () => {
  const {
    signInWithPassword,
    sendPhoneOtp,
    verifyPhoneOtp,
    isConfigured
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/customer/dashboard';

  // Auth Method: 'password' | 'phone_otp'
  const [authMethod, setAuthMethod] = useState<'password' | 'phone_otp'>('password');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Quick key setup modal if key is missing
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [manualKey, setManualKey] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Handle Email & Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please provide both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await signInWithPassword(email, password);
      if (res.success) {
        if (email.toLowerCase().includes('admin') || email.toLowerCase() === 'ops@findmyworker.in') {
          navigate('/admin', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(res.error || 'Invalid email or password.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Phone OTP Request
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    const clean = phone.replace(/\D/g, '');
    if (clean.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await sendPhoneOtp(phone, 'customer');
      if (res.success) {
        setStep('otp');
        setResendCooldown(60);
        setSuccessMsg(`OTP sent to ${phone}. Enter verification code.`);
      } else {
        setError(res.error || 'Failed to send OTP code.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Phone OTP Verification
  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!otp.trim()) {
      setError('Please enter the OTP code.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await verifyPhoneOtp(phone, otp, 'customer');
      if (res.success) {
        if (email.toLowerCase().includes('admin') || email.toLowerCase() === 'ops@findmyworker.in') {
          navigate('/admin', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(res.error || 'Invalid or expired OTP code.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualKey.trim()) {
      setSupabasePublishableKey(manualKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center font-black text-white text-lg mx-auto shadow-md">
            F<span className="text-brand-orange">M</span>W
          </div>
          <h1 className="text-2xl font-black text-brand-navy">Customer Login</h1>
          <p className="text-xs text-slate-500">
            Sign in to access your bookings and manage home services
          </p>
        </div>

        {/* Supabase Key Missing Banner */}
        {!isConfigured && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-2xl text-xs flex items-center justify-between gap-2">
            <div>
              <p className="font-bold">Connect Supabase Project</p>
              <p className="text-[11px] text-amber-700">Publishable key required for live authentication.</p>
            </div>
            <button
              onClick={() => setShowKeyModal(true)}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] whitespace-nowrap shadow-xs"
            >
              Add Key
            </button>
          </div>
        )}

        {/* Auth Method Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('password');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'password'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock size={14} />
            <span>Email & Password</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMethod('phone_otp');
              setStep('input');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'phone_otp'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Phone size={14} />
            <span>Phone OTP</span>
          </button>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs flex items-start gap-2">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-start gap-2">
            <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab 1: Email & Password */}
        {authMethod === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: Phone Number + OTP */}
        {authMethod === 'phone_otp' && (
          <>
            {step === 'input' ? (
              <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-brand-orange"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    We'll send a 6-digit verification code to your mobile phone.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyPhoneOtp} className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Mobile</span>
                    <span className="font-semibold text-slate-800">{phone}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('input');
                      setOtp('');
                      setError('');
                    }}
                    className="text-brand-orange font-bold text-xs hover:underline"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Enter 6-Digit OTP Code
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      maxLength={8}
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-2.5 text-center tracking-widest text-base font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange"
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Verify & Login</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Didn't receive code?</span>
                  <button
                    type="button"
                    onClick={handleSendPhoneOtp}
                    disabled={resendCooldown > 0 || isLoading}
                    className="text-brand-orange font-bold hover:underline disabled:text-slate-400 disabled:no-underline flex items-center gap-1"
                  >
                    <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                    <span>{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}</span>
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        <div className="text-center text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-100">
          <div>
            Don't have an account yet?{' '}
            <Link to="/customer/register" className="text-brand-orange font-bold hover:underline">
              Create an Account
            </Link>
          </div>
          <div>
            Are you a service professional?{' '}
            <Link to="/worker/login" className="text-brand-navy font-bold hover:underline">
              Worker Partner Login
            </Link>
          </div>
        </div>

        {/* Modal for instant key paste if needed */}
        {showKeyModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex items-center gap-2 text-brand-navy font-bold">
                <Key size={18} className="text-brand-orange" />
                <span>Supabase Publishable Key</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Paste your <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">sb_publishable_...</code> or anon key from the Supabase Project Dashboard:
              </p>
              <form onSubmit={handleSaveKey} className="space-y-3">
                <textarea
                  rows={3}
                  value={manualKey}
                  onChange={e => setManualKey(e.target.value)}
                  placeholder="sb_publishable_..."
                  className="w-full p-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowKeyModal(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Connect Key
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
