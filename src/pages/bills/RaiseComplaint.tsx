import { useState } from 'react';

export default function RaiseComplaint() {
  const [complaintType, setComplaintType] = useState('Transaction Based');
  const [transactionRef, setTransactionRef] = useState('');
  const [disposition, setDisposition] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-green-500 text-4xl mb-3">✓</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Complaint Submitted!</h3>
        <p className="text-sm text-gray-500 mb-4">Your complaint has been raised successfully.</p>
        <button onClick={() => setSubmitted(false)} className="btn-primary">Raise Another</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-orange-500 font-bold text-lg">Bharat <span className="text-orange-700">Connect</span></span>
      </div>

      <div className="card p-5 max-w-md">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Raise Complaint</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type *</label>
            <select value={complaintType} onChange={e => setComplaintType(e.target.value)} className="input-field">
              <option>Transaction Based</option>
              <option>Service Based</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Ref Id *</label>
            <input value={transactionRef} onChange={e => setTransactionRef(e.target.value)}
              placeholder="Transaction Ref Id" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Disposition *</label>
            <select value={disposition} onChange={e => setDisposition(e.target.value)} className="input-field">
              <option value="">Select</option>
              <option>Refund Requested</option>
              <option>Transaction Failed</option>
              <option>Double Debit</option>
            </select>
          </div>
          <button
            onClick={() => { if (transactionRef && disposition) setSubmitted(true); }}
            className="btn-primary"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2026, Instant Global Paytech Private Limited &nbsp;|&nbsp; Customer Care: 022-62143030
      </div>
    </div>
  );
}
