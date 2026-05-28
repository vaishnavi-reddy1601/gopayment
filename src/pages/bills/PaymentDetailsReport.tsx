import { Download, ChevronDown, Search } from 'lucide-react';
import { mockPaymentTransactions } from '../../data/mockData';

export default function PaymentDetailsReport() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Payment Details Report</h2>
        <span className="text-orange-500 font-bold">Bharat <span className="text-orange-700">Connect</span></span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search" className="border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm w-full focus:outline-none" />
        </div>
        <button className="btn-secondary flex items-center gap-1 text-xs">
          Filter by Date <ChevronDown size={12} />
        </button>
        <button className="btn-primary flex items-center gap-1.5 text-xs">
          <Download size={12} /> Download Report
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50">
              {['PS Txn Reference Number', 'Transaction Date', 'Customer Name', 'Amount', 'Card Number', 'Mobile Number', 'Payment Mode', 'Payment Info Consent', 'Payment Info Consent Date', 'Category', 'Refund Date', 'Status', 'Initiated By User ID', 'Info'].map(h => (
                <th key={h} className="table-header whitespace-nowrap text-[11px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockPaymentTransactions.map((txn, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="table-cell font-mono text-xs">{txn.refNo}</td>
                <td className="table-cell text-xs text-gray-500 whitespace-nowrap">{txn.date}</td>
                <td className="table-cell">{txn.customer}</td>
                <td className="table-cell font-medium">{txn.amount}</td>
                <td className="table-cell font-mono text-xs">{txn.cardNumber}</td>
                <td className="table-cell text-xs">{txn.mobile}</td>
                <td className="table-cell">{txn.mode || '–'}</td>
                <td className="table-cell text-gray-400">–</td>
                <td className="table-cell text-gray-400">–</td>
                <td className="table-cell">
                  <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{txn.category}</span>
                </td>
                <td className="table-cell text-gray-400">–</td>
                <td className="table-cell">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    txn.status === 'Failed' ? 'text-red-600 bg-red-50' : 'text-yellow-600 bg-yellow-50'
                  }`}>{txn.status}</span>
                </td>
                <td className="table-cell text-xs">{txn.customer.replace(' ', '').toUpperCase()}</td>
                <td className="table-cell text-gray-400">–</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
