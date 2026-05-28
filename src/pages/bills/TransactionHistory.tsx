import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, ChevronDown } from 'lucide-react';
import { mockPaymentTransactions } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

type Tab = 'Recent Utility Bill Payments' | 'Credit Card Payments';

export default function TransactionHistory() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('Recent Utility Bill Payments');
  const [search, setSearch] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = mockPaymentTransactions.filter(t => {
    const matchSearch = !search || t.refNo.toLowerCase().includes(search.toLowerCase())
      || t.customer.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/bill-payments/raise-complaint')}
            className="btn-secondary text-xs"
          >
            Raise Complaint
          </button>
          <button
            onClick={() => navigate('/bill-payments/complaint-tracking')}
            className="btn-secondary text-xs"
          >
            Complaint Tracking
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {(['Recent Utility Bill Payments', 'Credit Card Payments'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by reference number or customer"
            className="border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm w-full focus:outline-none"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="btn-secondary flex items-center gap-1 text-xs"
          >
            Filter by Date <ChevronDown size={12} />
          </button>
          {showDateFilter && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDateFilter(false)} />
              <div className="absolute right-0 top-9 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">
                <div className="text-xs font-medium text-gray-600 mb-2">Date Range</div>
                <div className="flex flex-col gap-2">
                  <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="input-field text-xs" />
                  <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="input-field text-xs" />
                  <button onClick={() => setShowDateFilter(false)} className="btn-primary text-xs">Apply</button>
                </div>
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => showToast('Report downloaded successfully')}
          className="btn-primary flex items-center gap-1.5 text-xs"
        >
          <Download size={12} /> Download Report
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-50">
              {['BBPS Txn Reference Number', 'Transaction Date', 'Customer Name', 'Amount', 'Info', 'Payment Mode', 'Status', 'Refund Date'].map(h => (
                <th key={h} className="table-header whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeTab === 'Recent Utility Bill Payments' ? (
              <tr>
                <td colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">🔍</div>
                    <p className="text-sm font-medium">No Record Found</p>
                    <button
                      onClick={() => setActiveTab('Credit Card Payments')}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Credit Card Payments
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400 text-sm">No transactions match your search.</td>
                </tr>
              ) : (
                filtered.map((txn, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="table-cell font-mono text-xs text-blue-600">{txn.refNo}</td>
                    <td className="table-cell text-xs text-gray-500 whitespace-nowrap">{txn.date}</td>
                    <td className="table-cell">{txn.customer}</td>
                    <td className="table-cell font-medium">{txn.amount}</td>
                    <td className="table-cell text-gray-400">–</td>
                    <td className="table-cell">{txn.mode || '–'}</td>
                    <td className="table-cell">
                      <span className={txn.status === 'Failed' ? 'badge-rejected' : txn.status === 'Fetching' ? 'badge-pending' : 'badge-approved'}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="table-cell text-gray-400">–</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
        <div className="text-xs text-gray-400 px-4 py-2 border-t border-gray-100 flex items-center gap-2">
          {[1, 2, 3].map(p => (
            <button key={p} className={`w-6 h-6 rounded text-xs ${p === 1 ? 'bg-blue-700 text-white' : 'hover:bg-gray-100'}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026, Instant Global Paytech Private Limited &nbsp;|&nbsp; Customer Care: 022-62143030
      </div>
    </div>
  );
}
