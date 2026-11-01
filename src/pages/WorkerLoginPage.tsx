import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Phone,
  Lock,
  ArrowRight,
  HardHat,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

export const WorkerLoginPage: React.FC = () => {
  const {
    signInWithPassword,
    sendPhoneOtp,
    verifyPhoneOtp,
    isConfigured
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/worker/dashboard';

  const [authMethod, setAuthMethod] = useState<'password' | 'phone_otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

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
        setError(res.error || 'Invalid credentials.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    const clean = phone.replace(/\D/g, '');
    if (clean.length < 10) {
      setError('Please enter a valid 10-digit registered mobile number.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await sendPhoneOtp(phone, 'worker');
      if (res.success) {
        setStep('otp');
        setResendCooldown(60);
        setSuccessMsg(`OTP sent to ${phone}. Enter verification code.`);
      } else {
        setError(res.error || 'Failed to send worker OTP.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error.');
    } finally {
      setIsLoading(false);
    }
  };

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
      const res = await verifyPhoneOtp(phone, otp, 'worker');
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

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 py-16 text-slate-100">
      <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center text-white mx-auto shadow-md">
            <HardHat size={24} />
          </div>
          <h1 className="text-2xl font-black text-white">Worker Partner Portal</h1>
          <p className="text-xs text-slate-400">
            Login to manage active jobs, view earnings, and submit quotations
          </p>
        </div>

        {/* Method Selector */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('password');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'password'
                ? 'bg-brand-orange text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
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
                ? 'bg-brand-orange text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Phone size={14} />
            <span>Mobile OTP</span>
          </button>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="bg-rose-900/40 border border-rose-700/60 text-rose-200 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-950/50 border border-emerald-600/40 text-emerald-200 p-3 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab 1: Password Login */}
        {authMethod === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Registered Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="worker@findmyworker.in"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900/60 border border-white/15 rounded-xl font-semibold text-white focus:outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter partner password"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900/60 border border-white/15 rounded-xl font-semibold text-white focus:outline-none focus:border-brand-orange"
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
                  <span>Login to Partner Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: Mobile OTP */}
        {authMethod === 'phone_otp' && (
          <>
            {step === 'input' ? (
              <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98888 11223"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900/60 border border-white/15 rounded-xl font-semibold text-white focus:outline-none focus:border-brand-orange"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    We'll send a 6-digit OTP to your registered phone number.
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
                <div className="bg-slate-900/60 border border-white/15 rounded-xl p-3 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile</span>
                    <span className="font-semibold text-white">{phone}</span>
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
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Enter 6-Digit Worker OTP
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      maxLength={8}
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-2.5 text-center tracking-widest text-base font-bold bg-slate-900/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-orange"
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
                      <span>Verifying Partner...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Verify & Access Dashboard</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Didn't receive code?</span>
                  <button
                    type="button"
                    onClick={handleSendPhoneOtp}
                    disabled={resendCooldown > 0 || isLoading}
                    className="text-brand-orange font-bold hover:underline disabled:text-slate-500 disabled:no-underline flex items-center gap-1"
                  >
                    <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                    <span>{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}</span>
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/10 space-y-1.5">
          <div>
            New worker in Mohali or Chandigarh?{' '}
            <Link to="/worker/register" className="text-brand-orange font-bold hover:underline">
              Register for Free (₹0 fee)
            </Link>
          </div>
          <div>
            <Link to="/customer/login" className="text-slate-400 hover:text-white">
              Switch to Customer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
