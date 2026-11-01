import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SERVICES } from '../data/services';
import { TRICITY_AREAS } from '../data/locations';
import { City, WorkerProfile } from '../types';
import {
  HardHat,
  ShieldCheck,
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Building,
  User,
  Phone,
  FileText,
  AlertCircle
} from 'lucide-react';

export const WorkerRegisterPage: React.FC = () => {
  const { signUpWorker, currentCity } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Personal info & Skills
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCityVal] = useState<City>(currentCity);
  const [selectedServices, setSelectedServices] = useState<string[]>(['electrician']);
  const [experienceYears, setExperienceYears] = useState(4);
  const [bio, setBio] = useState('Skilled professional with hands-on trade experience in Mohali & Chandigarh.');

  // Step 2: Service Areas & KYC
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    currentCity === 'Mohali' ? 'Phase 7 (Sector 61)' : 'Sector 17 (City Centre)',
    currentCity === 'Mohali' ? 'Phase 3B2 (Sector 60)' : 'Sector 35-C & B'
  ]);
  const [aadhaarNumber, setAadhaarNumber] = useState('5491-8822-1094');
  const [aadhaarDocUploaded, setAadhaarDocUploaded] = useState(true);

  // Step 3: Payout Details
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('State Bank of India');
  const [accountNumber, setAccountNumber] = useState('39810294819');
  const [ifsc, setIfsc] = useState('SBIN0001234');

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const toggleArea = (areaName: string) => {
    if (selectedAreas.includes(areaName)) {
      if (selectedAreas.length > 1) {
        setSelectedAreas(selectedAreas.filter(a => a !== areaName));
      }
    } else {
      setSelectedAreas([...selectedAreas, areaName]);
    }
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length < 10) return;

    await signUpWorker({
      name,
      phone,
      email: email || `${phone.replace(/\D/g, '')}@findmyworker.in`,
      city,
      services: selectedServices,
      experienceYears: Number(experienceYears),
      serviceAreas: selectedAreas,
      bio,
      documents: {
        aadhaarNumberMasked: `XXXX-XXXX-${aadhaarNumber.slice(-4) || '9123'}`,
        aadhaarDocUrl: 'https://placehold.co/600x400/0B192C/FFFFFF/png?text=Aadhaar+Front+Back+Uploaded',
        tradeCertificateUrl: 'https://placehold.co/600x400/0B192C/FFFFFF/png?text=Skill+Certificate'
      },
      payoutDetails: {
        upiId: upiId || `${name.toLowerCase().replace(/\s+/g, '')}@okaxis`,
        accountHolderName: name,
        bankName,
        accountNumberMasked: `XXXXXXXX${accountNumber.slice(-4) || '1234'}`,
        ifsc
      }
    }, password || 'FmwWorker@2026');

    // Worker account is created with verificationStatus = 'pending'
    navigate('/worker/dashboard');
  };

  const currentCityAreas = TRICITY_AREAS.filter(a => a.city === city);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange-light text-brand-orange text-xs font-bold uppercase tracking-wider">
            <HardHat size={14} />
            <span>Worker Partner Registration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy">
            Join Find My Worker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Zero registration fee. Direct UPI daily payouts. Verification completed within 24 hours.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between text-xs font-bold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-orange' : 'text-slate-400'}`}>
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">1</span>
            <span>Personal & Skills</span>
          </div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-orange' : 'text-slate-400'}`}>
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">2</span>
            <span>Areas & Aadhaar KYC</span>
          </div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-brand-orange' : 'text-slate-400'}`}>
            <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">3</span>
            <span>Bank & UPI Details</span>
          </div>
        </div>

        {/* Step 1: Personal info & Skills */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Step 1: Personal Details & Skills</h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Jaswinder Singh"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Phone (WhatsApp)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98888 XXXXX"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
                  required
                />
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="worker@example.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary City</label>
                <select
                  value={city}
                  onChange={e => setCityVal(e.target.value as City)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="Mohali">Mohali</option>
                  <option value="Chandigarh">Chandigarh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={e => setExperienceYears(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  min="1"
                  max="40"
                />
              </div>
            </div>

            {/* Select Skills (multi-checkbox) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Select Your Skills & Services (Choose all that apply):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map(s => {
                  const isChecked = selectedServices.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-brand-orange bg-orange-50 text-brand-orange'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{s.title}</span>
                      {isChecked && <CheckCircle2 size={14} className="text-brand-orange" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span>Continue to KYC</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Areas & Aadhaar */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Step 2: Service Areas & Aadhaar Verification</h2>

            {/* Service Areas selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Select Phases & Sectors in {city} You Can Travel To:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentCityAreas.map(area => {
                  const isSelected = selectedAreas.includes(area.name);
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleArea(area.name)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-brand-orange bg-orange-50 text-brand-orange'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{area.name}</span>
                      {isSelected && <CheckCircle2 size={14} className="text-brand-orange" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Aadhaar Input & Upload */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  12-Digit Government Aadhaar Card Number
                </label>
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={e => setAadhaarNumber(e.target.value)}
                  placeholder="5491-8822-1094"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
                <Upload size={24} className="mx-auto text-brand-orange" />
                <div className="text-xs font-bold text-slate-800">Aadhaar Card Front & Back Photo</div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  ✓ Document attached (Ready for Admin verification desk)
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
              >
                <span>Continue to Payout Setup</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Bank / UPI Details */}
        {step === 3 && (
          <form onSubmit={handleCompleteRegistration} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Step 3: Payout Details & Final Agreement</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  UPI ID (For Daily Automated Earnings Payout)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@okaxis or name@paytm"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={ifsc}
                    onChange={e => setIfsc(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Fair Partner Terms:</span>
                </div>
                <p>• Zero registration charges. You pay nothing to sign up.</p>
                <p>• Modest 8% platform service fee deducted only from successfully completed jobs.</p>
                <p>• Account will be verified by the Mohali/Chandigarh operations admin within 24 hours.</p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-7 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                <HardHat size={16} />
                <span>Submit Application for Verification</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

