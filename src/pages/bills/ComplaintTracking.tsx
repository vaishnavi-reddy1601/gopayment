import { useState } from 'react';

export default function ComplaintTracking() {
  const [complaintType, setComplaintType] = useState('Transaction Based');
  const [complaintId, setComplaintId] = useState('');
  const [result, setResult] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-orange-500 font-bold text-lg">Bharat <span className="text-orange-700">Connect</span></span>
      </div>

      <div className="card p-5 max-w-md">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Complaint Tracking</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type *</label>
            <select value={complaintType} onChange={e => setComplaintType(e.target.value)} className="input-field">
              <option>Transaction Based</option>
              <option>Service Based</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Id *</label>
            <input value={complaintId} onChange={e => setComplaintId(e.target.value)}
              placeholder="Complaint id" className="input-field" />
          </div>
          <button onClick={() => setResult(complaintId ? 'No complaint found for this ID.' : null)} className="btn-primary">
            Submit
          </button>
          {result && <div className="text-sm text-gray-500 mt-2">{result}</div>}
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026, Instant Global Paytech Private Limited &nbsp;|&nbsp; Customer Care: 022-62143030
      </div>
    </div>
  );
}
