import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface ReportPageProps {
  title: string;
  hasDateRange?: boolean;
}

export default function ReportPage({ title, hasDateRange = true }: ReportPageProps) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">{title}</h1>
        {!hasDateRange && (
          <button className="btn-primary" onClick={() => setGenerated(true)}>Generate Report</button>
        )}
      </div>

      {hasDateRange && (
        <div className="card p-5 mb-5">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Select Date Range</h3>
          <p className="text-xs text-gray-400 mb-3">Please select a date range with difference of maximum 31 days.</p>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From Date</label>
              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                placeholder="DD-MM-YYYY" className="input-field max-w-[160px]" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To Date</label>
              <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                placeholder="DD-MM-YYYY" className="input-field max-w-[160px]" />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!fromDate || !toDate || loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              {loading && <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
              Generate Report
            </button>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Generated Report(s)</h2>
        </div>
        {generated ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Report Name</th>
                <th className="table-header">Generated On</th>
                <th className="table-header text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="table-cell font-medium">{title}_{fromDate || 'latest'}.xlsx</td>
                <td className="table-cell text-gray-500">{new Date().toLocaleDateString('en-IN')}</td>
                <td className="table-cell text-right">
                  <button className="text-blue-600 text-xs hover:underline">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
            <svg viewBox="0 0 100 100" className="w-20 h-20 mb-3">
              <circle cx="50" cy="35" r="22" fill="#dbeafe" />
              <ellipse cx="50" cy="72" rx="30" ry="15" fill="#bfdbfe" />
              <circle cx="50" cy="30" r="14" fill="#3b82f6" />
            </svg>
            <p className="text-sm font-medium">No Reports Yet!</p>
            <p className="text-xs mt-1">Once you start generating reports, they'll reflect here.</p>
          </div>
        )}

        {/* Pagination */}
        {generated && (
          <div className="flex justify-between items-center px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
            <span>«First «Previous 1 Next» Last»</span>
            <button className="text-gray-400 hover:text-gray-600">
              <RefreshCw size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
