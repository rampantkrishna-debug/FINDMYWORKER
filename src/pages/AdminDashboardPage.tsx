import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import { WorkerProfile, Booking } from '../types';
import {
  Shield,
  Users,
  HardHat,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Sliders,
  DollarSign,
  Search,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
  MapPin,
  Clock,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Key,
  Trash2,
  ArrowRight
} from 'lucide-react';
import {
  fetchAllProfiles,
  updateUserRole,
  deleteProfile,
  SupabaseProfile,
  isSupabaseConfigured
} from '../lib/supabase';

export const AdminDashboardPage: React.FC = () => {
  const { bookings, workers, config, adminVerifyWorker, updateConfig } = useData();
  const { currentUser, makeUserAdmin, changeUserRole, removeUser, currentCity } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'verifications' | 'bookings' | 'workers' | 'settings'>('users');
  const [workerSearch, setWorkerSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState<string>('all');

  // Supabase Profiles State
  const [dbUsers, setDbUsers] = useState<SupabaseProfile[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'customer' | 'worker' | 'admin'>('all');
  const [promoteIdentifier, setPromoteIdentifier] = useState('');
  const [adminActionMsg, setAdminActionMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Settings state
  const [commissionInput, setCommissionInput] = useState((config.commissionRate * 100).toString());
  const [inspectionInput, setInspectionInput] = useState(config.inspectionFeeIfCancelled.toString());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Fetch all users from Supabase DB
  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const profiles = await fetchAllProfiles();
      setDbUsers(profiles);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Handle Promote to Admin by email, phone, or UUID
  const handlePromoteByIdentifier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteIdentifier.trim()) return;

    setAdminActionMsg(null);
    const target = promoteIdentifier.trim().toLowerCase();

    // Find in loaded users
    const matched = dbUsers.find(
      u =>
        u.id.toLowerCase() === target ||
        u.email?.toLowerCase() === target ||
        u.phone?.replace(/\D/g, '') === target.replace(/\D/g, '')
    );

    if (matched) {
      const res = await updateUserRole(matched.id, 'admin');
      if (res.success) {
        setAdminActionMsg({
          text: `Success: ${matched.full_name || matched.email || matched.phone} is now an Admin!`,
          type: 'success'
        });
        setPromoteIdentifier('');
        loadUsers();
      } else {
        setAdminActionMsg({ text: `Failed: ${res.error}`, type: 'error' });
      }
    } else {
      setAdminActionMsg({
        text: `No registered user found with "${promoteIdentifier}". Make sure they have signed up first.`,
        type: 'error'
      });
    }
  };

  // Quick Claim Admin for current user
  const handleClaimAdmin = async () => {
    if (!currentUser) return;
    const res = await makeUserAdmin(currentUser.id);
    if (res.success) {
      setAdminActionMsg({
        text: 'Congratulations! Your account has been elevated to Super Admin.',
        type: 'success'
      });
      loadUsers();
      window.location.reload();
    } else {
      setAdminActionMsg({ text: `Failed to claim admin: ${res.error}`, type: 'error' });
    }
  };

  // Change individual user role
  const handleRoleChange = async (userId: string, newRole: 'customer' | 'worker' | 'admin') => {
    const res = await updateUserRole(userId, newRole);
    if (res.success) {
      setAdminActionMsg({ text: `User role successfully updated to ${newRole}.`, type: 'success' });
      loadUsers();
    } else {
      setAdminActionMsg({ text: `Error updating role: ${res.error}`, type: 'error' });
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}'s profile from database?`)) {
      const res = await deleteProfile(userId);
      if (res.success) {
        setAdminActionMsg({ text: `User profile deleted successfully.`, type: 'success' });
        loadUsers();
      } else {
        setAdminActionMsg({ text: `Failed to delete: ${res.error}`, type: 'error' });
      }
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      commissionRate: Number(commissionInput) / 100,
      inspectionFeeIfCancelled: Number(inspectionInput)
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  // Filtered users list
  const filteredUsers = dbUsers.filter(u => {
    const matchesRole = userRoleFilter === 'all' || u.account_type === userRoleFilter;
    const matchesSearch =
      !userSearch ||
      (u.full_name && u.full_name.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.phone && u.phone.includes(userSearch)) ||
      u.id.toLowerCase().includes(userSearch.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Metrics
  const totalCustomers = dbUsers.filter(u => u.account_type === 'customer').length;
  const totalDbWorkers = dbUsers.filter(u => u.account_type === 'worker').length;
  const totalAdmins = dbUsers.filter(u => u.account_type === 'admin').length;
  const verifiedWorkers = workers.filter(w => w.verificationStatus === 'verified').length;
  const pendingWorkers = workers.filter(w => w.verificationStatus === 'pending');
  const activeBookings = bookings.filter(b =>
    ['PENDING_ACCEPTANCE', 'ACCEPTED', 'EN_ROUTE', 'ARRIVED_INSPECTING', 'QUOTATION_SUBMITTED', 'IN_PROGRESS'].includes(b.status)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-brand-navy rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-md">
              <Shield size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black">Platform Administration Console</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Centralized database management, role enforcement, and Tri-City operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadUsers}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={13} className={isLoadingUsers ? 'animate-spin' : ''} />
              <span>Refresh Database</span>
            </button>
          </div>
        </div>

        {/* Claim Admin Banner for current user if not yet admin */}
        {currentUser && currentUser.role !== 'admin' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900">
            <div>
              <h3 className="font-bold text-sm">Site Owner Quick Access:</h3>
              <p className="text-xs text-amber-800">
                You are currently logged in as <strong>{currentUser.name}</strong> ({currentUser.role}). Click the button to grant this account Super Admin permissions.
              </p>
            </div>
            <button
              onClick={handleClaimAdmin}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <ShieldCheck size={15} />
              <span>Make Me Admin</span>
            </button>
          </div>
        )}

        {/* Action alert message */}
        {adminActionMsg && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
              adminActionMsg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {adminActionMsg.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-rose-600 shrink-0" />
            )}
            <span>{adminActionMsg.text}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'users'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Users size={16} />
            <span>All Users & Database ({dbUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <TrendingUp size={16} />
            <span>Operations & Revenue</span>
          </button>

          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'verifications'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Worker Approvals ({pendingWorkers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'bookings'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <CalendarCheck size={16} />
            <span>All Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Sliders size={16} />
            <span>Platform Commission Policy</span>
          </button>
        </div>

        {/* TAB: ALL USERS & DATABASE MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Quick Promotion Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Key size={16} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Make Any User an Admin</h2>
                  <p className="text-xs text-slate-500">
                    Enter the registered email address, phone number, or Supabase UUID to grant administrator privileges.
                  </p>
                </div>
              </div>

              <form onSubmit={handlePromoteByIdentifier} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={promoteIdentifier}
                    onChange={e => setPromoteIdentifier(e.target.value)}
                    placeholder="Enter email, phone, or User UUID (e.g. user@example.com)"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all whitespace-nowrap"
                >
                  <ShieldCheck size={15} />
                  <span>Promote to Admin</span>
                </button>
              </form>
            </div>

            {/* User Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Users</span>
                <span className="text-2xl font-black text-slate-900">{dbUsers.length}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customers</span>
                <span className="text-2xl font-black text-blue-600">{totalCustomers}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Workers</span>
                <span className="text-2xl font-black text-amber-600">{totalDbWorkers}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Super Admins</span>
                <span className="text-2xl font-black text-purple-600">{totalAdmins}</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  placeholder="Search users by name, email, phone, or UUID..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(['all', 'customer', 'worker', 'admin'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => setUserRoleFilter(role)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                      userRoleFilter === role
                        ? 'bg-purple-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {role === 'all' ? 'All Roles' : `${role}s`}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-5 py-3.5">User</th>
                      <th className="px-5 py-3.5">Contact Details</th>
                      <th className="px-5 py-3.5">Role</th>
                      <th className="px-5 py-3.5">City</th>
                      <th className="px-5 py-3.5">Joined</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                          {isLoadingUsers ? (
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw size={15} className="animate-spin text-purple-600" />
                              <span>Loading database users from Supabase...</span>
                            </div>
                          ) : (
                            <span>No registered users found matching the filter.</span>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                                {(u.full_name || u.email || 'U').charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block">
                                  {u.full_name || 'Anonymous User'}
                                </span>
                                <span className="font-mono text-[10px] text-slate-400 block truncate max-w-[150px]">
                                  {u.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-3.5">
                            <div className="space-y-0.5">
                              {u.email && (
                                <span className="flex items-center gap-1 text-slate-700">
                                  <Mail size={12} className="text-slate-400" />
                                  <span>{u.email}</span>
                                </span>
                              )}
                              {u.phone && (
                                <span className="flex items-center gap-1 text-slate-700">
                                  <Phone size={12} className="text-slate-400" />
                                  <span>{u.phone}</span>
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wide ${
                                u.account_type === 'admin'
                                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                  : u.account_type === 'worker'
                                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {u.account_type === 'admin' && <Shield size={10} />}
                              <span>{u.account_type}</span>
                            </span>
                          </td>

                          <td className="px-5 py-3.5 text-slate-600 font-medium">
                            {u.city || currentCity}
                          </td>

                          <td className="px-5 py-3.5 text-slate-500 text-[11px]">
                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Recent'}
                          </td>

                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {u.account_type !== 'admin' ? (
                                <button
                                  onClick={() => handleRoleChange(u.id, 'admin')}
                                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-bold text-[11px] border border-purple-200 transition-colors"
                                  title="Promote to Super Admin"
                                >
                                  Make Admin
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleRoleChange(u.id, 'customer')}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-[11px] transition-colors"
                                  title="Demote to Customer"
                                >
                                  Demote
                                </button>
                              )}

                              {u.account_type !== 'worker' && (
                                <button
                                  onClick={() => handleRoleChange(u.id, 'worker')}
                                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-bold text-[11px] border border-amber-200 transition-colors"
                                  title="Switch to Worker Account"
                                >
                                  Make Worker
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteUser(u.id, u.full_name || u.email || 'User')}
                                className="p-1 text-slate-400 hover:text-rose-600 transition-colors rounded-md"
                                title="Delete user profile"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: OPERATIONS & REVENUE */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Bookings</span>
                <div className="text-3xl font-black text-slate-900">{activeBookings.length}</div>
                <p className="text-[11px] text-slate-500">Currently assigned or in-progress jobs</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform Commission</span>
                <div className="text-3xl font-black text-purple-700">8.0%</div>
                <p className="text-[11px] text-slate-500">Tri-City standardized service fee</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Locations</span>
                <div className="text-3xl font-black text-brand-orange">Mohali & Chd</div>
                <p className="text-[11px] text-slate-500">Phase 1-11 & Sectors 1-65</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: VERIFICATIONS */}
        {activeTab === 'verifications' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-2">Worker Verification Queue</h2>
              <p className="text-xs text-slate-500">
                Inspect Aadhaar documents and trade certificates before partners go live.
              </p>
            </div>
            {pendingWorkers.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400 text-xs font-medium">
                All worker partners have been inspected. No pending verifications.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingWorkers.map(w => (
                  <div key={w.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{w.name}</h4>
                      <p className="text-xs text-slate-500">{w.phone} • {w.services.join(', ')} • {w.city}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => adminVerifyWorker(w.id, 'verified')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                      >
                        Approve Partner
                      </button>
                      <button
                        onClick={() => adminVerifyWorker(w.id, 'rejected')}
                        className="px-4 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Platform Bookings</h2>
            {bookings.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">No bookings recorded yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase">
                    <tr>
                      <th className="py-2">Booking ID</th>
                      <th className="py-2">Service</th>
                      <th className="py-2">Customer</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.map(b => (
                      <tr key={b.id} className="py-2">
                        <td className="py-2.5 font-mono font-bold text-slate-900">{b.bookingNumber}</td>
                        <td className="py-2.5 font-semibold text-slate-800">{b.serviceTitle}</td>
                        <td className="py-2.5 text-slate-600">{b.customerName} ({b.customerPhone})</td>
                        <td className="py-2.5"><StatusBadge status={b.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm max-w-xl">
            <h2 className="text-base font-bold text-slate-900 mb-4">Platform Fee Configurations</h2>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Commission Rate (%)
                </label>
                <input
                  type="number"
                  value={commissionInput}
                  onChange={e => setCommissionInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Inspection Token Fee (₹)
                </label>
                <input
                  type="number"
                  value={inspectionInput}
                  onChange={e => setInspectionInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
