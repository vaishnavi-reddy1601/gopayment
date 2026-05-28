import { Download } from 'lucide-react';

export default function PaymentOverdue() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Payment Overdue</h1>
        <button className="btn-primary flex items-center gap-1.5">
          <Download size={14} /> Download
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['Alternate A/c No.', 'Card Number', 'Card Holder Name', 'Email ID', 'Card Limit', 'Minimum Amount Due', 'Payment Due Date', 'Overdue Amount', 'Block Code'].map(h => (
                  <th key={h} className="table-header whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={9} className="text-center py-20">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      <circle cx="50" cy="35" r="22" fill="#dbeafe" />
                      <ellipse cx="50" cy="70" rx="28" ry="14" fill="#bfdbfe" />
                    </svg>
                    <p className="text-sm font-medium">You've got no cards.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto px-4 pb-2">
          <div className="w-32 h-1 bg-gray-200 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}
