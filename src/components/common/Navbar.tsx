import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CITIES } from '../../data/locations';
import { City } from '../../types';
import {
  MapPin,
  ChevronDown,
  Menu,
  X,
  User,
  HardHat,
  Shield,
  LogOut,
  CalendarCheck,
  Search,
  Briefcase
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, currentCity, setCity, logout } = useAuth();
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCitySelect = (city: City) => {
    setCity(city);
    setIsCityDropdownOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-8 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-brand-navy flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                  F<span className="text-brand-orange">M</span>W
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-brand-navy leading-none">
                  Find My <span className="text-brand-orange">Worker</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                  The right worker, at your door.
                </span>
              </div>
            </Link>

            {/* City Selector Pill */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-brand-navy text-xs font-semibold border border-slate-200 transition-colors"
              >
                <MapPin size={14} className="text-brand-orange" />
                <span>{currentCity}</span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Your City
                  </div>
                  {CITIES.map(city => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center justify-between transition-colors ${
                        currentCity === city
                          ? 'bg-orange-50 text-brand-orange font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin size={13} className={currentCity === city ? 'text-brand-orange' : 'text-slate-400'} />
                        {city}
                      </span>
                      {currentCity === city && <span className="text-[10px] bg-brand-orange text-white px-1.5 py-0.5 rounded">Active</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                isActive('/') ? 'text-brand-orange' : 'text-slate-700 hover:text-brand-orange'
              }`}
            >
              Home
            </Link>

            <Link
              to="/services"
              className={`text-sm font-semibold transition-colors ${
                isActive('/services') ? 'text-brand-orange' : 'text-slate-700 hover:text-brand-orange'
              }`}
            >
              Services
            </Link>

            <a
              href="/#how-it-works"
              className="text-sm font-semibold text-slate-700 hover:text-brand-orange transition-colors"
            >
              How It Works
            </a>

            <Link
              to="/worker/register"
              className="text-sm font-semibold text-slate-700 hover:text-brand-orange transition-colors flex items-center gap-1.5"
            >
              <HardHat size={16} className="text-brand-orange" />
              Become a Worker
            </Link>

            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors ${
                isActive('/about') ? 'text-brand-orange' : 'text-slate-700 hover:text-brand-orange'
              }`}
            >
              About Us
            </Link>
          </nav>

          {/* User / Auth Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-navy text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email || currentUser.phone}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-brand-orange-light text-brand-orange">
                        {currentUser.role} account
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'customer' && (
                        <>
                          <Link
                            to="/customer/dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-orange"
                          >
                            <User size={15} />
                            Customer Dashboard
                          </Link>
                          <Link
                            to="/customer/dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-orange"
                          >
                            <CalendarCheck size={15} />
                            My Bookings History
                          </Link>
                        </>
                      )}

                      {currentUser.role === 'worker' && (
                        <Link
                          to="/worker/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-orange"
                        >
                          <HardHat size={15} />
                          Worker Dashboard & Jobs
                        </Link>
                      )}

                      {currentUser.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600"
                        >
                          <Shield size={15} />
                          Admin Console
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={async () => {
                          await logout();
                          setIsUserMenuOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut size={15} />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/worker/login"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-brand-navy rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Worker Login
                </Link>
                <Link
                  to="/customer/login"
                  className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
                >
                  <User size={14} />
                  Login / Sign Up
                </Link>
              </>
            )}

            {/* Quick Book CTA if customer */}
            {currentUser?.role === 'customer' && (
              <Link
                to="/services"
                className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
              >
                <Search size={14} />
                Book a Worker
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* City selector in mobile */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Current City:</span>
            <div className="flex items-center gap-2">
              {CITIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currentCity === c ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Services (13 Categories)
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              About Us
            </Link>
            <Link
              to="/worker/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-brand-orange hover:bg-orange-50 font-bold"
            >
              Become a Worker Partner
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {currentUser ? (
              <>
                <div className="text-xs text-slate-500">Logged in as {currentUser.name}</div>
                {currentUser.role === 'customer' && (
                  <Link
                    to="/customer/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl"
                  >
                    Customer Dashboard
                  </Link>
                )}
                {currentUser.role === 'worker' && (
                  <Link
                    to="/worker/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl"
                  >
                    Worker Dashboard
                  </Link>
                )}
                {currentUser.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 bg-purple-700 text-white text-xs font-bold rounded-xl"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={async () => {
                    await logout();
                    setIsMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="block w-full text-center py-2 text-rose-600 text-xs font-semibold"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/worker/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                >
                  Worker Login
                </Link>
                <Link
                  to="/customer/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl"
                >
                  Customer Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

