import { useState } from 'react';

export default function AuditTrail() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setGenerated(true); }, 800);
  };

  return (
    <div>
      <h1 className="section-title mb-4">Audit Trail</h1>

      <div className="card p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Select Date</h3>
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
            className="btn-primary disabled:opacity-50 flex items-center gap-1.5"
          >
            {loading && <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
            Generate Report
          </button>
        </div>
      </div>

      {generated && (
        <div className="card overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['Date', 'User', 'Action', 'Description', 'IP Address'].map(h => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { date: fromDate, user: 'SANKET KURDHUNDKAR', action: 'Corporate User Modification', description: 'Modified mobile number', ip: '192.168.1.45' },
                { date: fromDate, user: 'SARAN GIT', action: 'Credit Card Usage Update', description: 'Updated credit card usage settings', ip: '192.168.1.67' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="table-cell text-gray-500">{row.date}</td>
                  <td className="table-cell font-medium">{row.user}</td>
                  <td className="table-cell text-blue-700">{row.action}</td>
                  <td className="table-cell text-gray-600">{row.description}</td>
                  <td className="table-cell font-mono text-xs">{row.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
