import { useAuth } from '../context/AuthContext';
import { mockLimitSummary, mockCards, mockDashboardStats, mockRequestsReceived } from '../data/mockData';
import { ChevronRight, CreditCard, Receipt, Star, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const reqStats = {
    all: mockRequestsReceived.length,
    pending: mockRequestsReceived.filter(r => r.status === 'Pending').length,
    approved: mockRequestsReceived.filter(r => r.status === 'Approved').length,
    rejected: mockRequestsReceived.filter(r => r.status === 'Rejected').length,
  };

  return (
    <div className="space-y-4">
      {/* Last Login Banner */}
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center text-sm text-gray-600">
        Last Login: {user?.lastLogin}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left: Banner + Limit Summary */}
        <div className="xl:col-span-2 space-y-4">
          {/* Hero Banner */}
          <div className="rounded-xl overflow-hidden h-40 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-5xl font-black text-white tracking-widest opacity-90">BACKEND</div>
              <div className="text-blue-200 text-sm mt-1">Corporate Banking Portal</div>
            </div>
            <button
              onClick={() => navigate('/virtual-card-details')}
              className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors"
            >
              Create Virtual Card
            </button>
          </div>

          {/* Info banner */}
          <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-700 text-center">
            Relationship Details displayed is as of beginning of day. Please refer "Card Details" section for real time information on cards including Outstanding/Payment.
          </div>

          {/* Limit Summary + Card Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Limit Summary */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Limit Summary</h3>
              <div className="space-y-2 text-xs">
                {[
                  ['Credit Limit', mockLimitSummary.creditLimit],
                  ['Available Limit', mockLimitSummary.availableLimit],
                  ['Open To Buy Limit', mockLimitSummary.openToBuy],
                  ['Limit Utilized', mockLimitSummary.limitUtilized],
                  ['Limit Utilized %', mockLimitSummary.limitPercentageUtilized],
                  ['Relationship Type', mockLimitSummary.relationshipType],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center py-0.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards Summary */}
            <div className="card p-4">
              <div className="flex items-start gap-4">
                {/* Donut chart placeholder */}
                <div className="relative w-24 h-24 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3.8" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#dc2626" strokeWidth="3.8"
                      strokeDasharray={`${(7 / 111) * 100} ${100 - (7 / 111) * 100}`}
                      strokeDashoffset="25" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-gray-800">{mockCards.totalBlocked}</span>
                    <span className="text-[10px] text-gray-500">Blocked</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-xs">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{mockCards.total}</div>
                    <div className="text-gray-500">Total Cards</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-gray-600">Temporary Blocked: {mockCards.temporaryBlocked}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-gray-600">Permanent Blocked: {mockCards.permanentBlocked}</span>
                  </div>
                  <div className="text-gray-400 text-[10px] italic mt-2">
                    Cards not used for over 365 days will be closed as per the RBI mandate.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription + Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="card p-3">
              <div className="text-xs text-gray-500 mb-1">Subscription End Date</div>
              <div className="text-sm font-semibold text-gray-800">{mockDashboardStats.subscriptionEndDate}</div>
            </div>
            <div className="card p-3">
              <div className="text-xs text-gray-500 mb-1">Total Corporate Users</div>
              <div className="text-sm font-semibold text-gray-800">
                Active: {mockDashboardStats.totalCorporateUsers.active}
              </div>
              <div className="text-xs text-gray-400">Inactive: {mockDashboardStats.totalCorporateUsers.inactive}</div>
            </div>
            <div className="card p-3">
              <div className="text-xs text-gray-500 mb-1">Payment Overdue</div>
              <div className="text-2xl font-bold text-gray-800">{mockDashboardStats.paymentOverdue}</div>
            </div>
            <div
              className="card p-3 cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => navigate('/virtual-card-details')}
            >
              <div className="text-xs text-blue-600 font-medium mb-1">Virtual Card Registration</div>
              <ChevronRight size={14} className="text-blue-500" />
            </div>
          </div>

          {/* Requests Received */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Requests Received</h3>
              <button onClick={() => navigate('/requests-received')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'All', value: reqStats.all, color: 'text-gray-800', border: 'border-gray-400' },
                { label: 'Pending', value: reqStats.pending, color: 'text-yellow-600', border: 'border-yellow-400' },
                { label: 'Approved', value: reqStats.approved, color: 'text-green-600', border: 'border-green-400' },
                { label: 'Rejected', value: reqStats.rejected, color: 'text-red-600', border: 'border-red-400' },
              ].map(({ label, value, color, border }) => (
                <div key={label} className={`border-b-2 ${border} pb-2`}>
                  <div className={`text-2xl font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Requests Raised */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Requests Raised</h3>
              <button onClick={() => navigate('/requests-raised')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'All', value: 0, color: 'text-gray-800', border: 'border-gray-400' },
                { label: 'Pending', value: 0, color: 'text-yellow-600', border: 'border-yellow-400' },
                { label: 'Approved', value: 0, color: 'text-green-600', border: 'border-green-400' },
                { label: 'Rejected', value: 0, color: 'text-red-600', border: 'border-red-400' },
              ].map(({ label, value, color, border }) => (
                <div key={label} className={`border-b-2 ${border} pb-2`}>
                  <div className={`text-2xl font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: RM + Quick Links */}
        <div className="space-y-4">
          {/* Relationship Manager */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-blue-700 mb-3">Relationship Manager</h3>
            <div className="space-y-2 text-xs">
              <div className="flex gap-2">
                <span className="text-gray-500 w-20 shrink-0">Name</span>
                <span className="font-medium text-gray-800">{user?.relationshipManager.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-20 shrink-0">Mobile Number</span>
                <span className="font-medium text-gray-800">{user?.relationshipManager.mobile}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-20 shrink-0">Email ID</span>
                <span className="font-medium text-gray-800 break-all">{user?.relationshipManager.email}</span>
              </div>
              <div className="text-gray-400 text-[10px] mt-2 italic">
                For any card related assistance, contact between 9 AM - 5 PM on all working days.
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: 'GST Payment', icon: <Receipt size={16} className="text-blue-600" />, path: '/bill-payments/categories' },
                { label: 'CBDT Payment', icon: <CreditCard size={16} className="text-blue-600" />, path: '/bill-payments/categories' },
                { label: 'Best Offers on Travel', icon: <Plane size={16} className="text-blue-600" />, path: '#' },
                { label: 'Best Offers on Software', icon: <Star size={16} className="text-blue-600" />, path: '#' },
              ].map(({ label, icon, path }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className="w-full flex items-center justify-between p-2.5 rounded border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                      {icon}
                    </div>
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Total Cards status */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Total Cards</h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { label: '30 days', value: '0', color: 'bg-green-100 text-green-700' },
                { label: '60 days', value: '-', color: 'bg-yellow-100 text-yellow-700' },
                { label: '>90 days', value: '-', color: 'bg-red-100 text-red-700' },
              ].map(({ label, value, color }) => (
                <div key={label} className={`${color} rounded p-2`}>
                  <div className="font-bold">{value}</div>
                  <div className="text-[10px] opacity-75">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
