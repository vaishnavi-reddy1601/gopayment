import { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { mockVirtualCards } from '../../data/mockData';

export default function VirtualCardDetails() {
  const [search, setSearch] = useState('');
  const [showBulkCreate, setShowBulkCreate] = useState(false);

  const filtered = mockVirtualCards.filter(c =>
    !search || c.username.toLowerCase().includes(search.toLowerCase())
  );

  if (showBulkCreate) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="section-title mb-0">Create Virtual Card (Bulk)</h1>
          <div className="flex gap-2">
            <button onClick={() => setShowBulkCreate(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Submit</button>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-xs text-green-700">
          <strong>Note:</strong> Upload the file in .csv (Comma Separated Value) format and do not edit the headers. Below fields are mandatory:
          <br />
          <span className="text-green-600 font-medium">Aan, VirtualCardUserName, EmailId, MobileNumber, Amount, ValidForDays</span>
          <br /><br />
          To issue a Virtual Card, your primary card must be registered and a Virtual card user must be added.{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Click to register</span> or{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Click to add Virtual card user</span> to continue.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="card border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload size={32} className="text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-600 mb-1">Upload File</p>
              <p className="text-xs text-gray-400 mb-4">Make sure your file is not more than 5MB in .csv format</p>
              <button className="btn-primary">Upload File</button>
            </div>
          </div>
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Approvers:</h3>
            <div className="text-xs text-gray-500 mb-2">Level 1</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">AUS</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Virtual Card Details</h1>
        <button onClick={() => setShowBulkCreate(true)} className="btn-primary">
          Create Virtual Card (Bulk)
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Virtual Card User Name"
            className="border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm w-full focus:outline-none"
          />
        </div>
        <button className="btn-primary">Search</button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50">
              {['Virtual Card UserName', 'Virtual Card Number', 'Status', 'Amount', 'Created Date', 'Valid for Days', 'Card Holder Name', 'Card Number'].map(h => (
                <th key={h} className="table-header whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((card, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="table-cell font-medium">{card.username}</td>
                <td className="table-cell text-gray-400">{card.cardNumber}</td>
                <td className="table-cell">
                  <span className="badge-rejected">{card.status}</span>
                </td>
                <td className="table-cell font-medium">{card.amount}</td>
                <td className="table-cell text-gray-500 text-xs">{card.createdDate}</td>
                <td className="table-cell">{card.validForDays}</td>
                <td className="table-cell">{card.cardHolder}</td>
                <td className="table-cell font-mono text-xs">{card.cardNum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
