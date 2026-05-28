import { useState } from 'react';
import { Download } from 'lucide-react';
import { mockCards2 } from '../../data/mockData';

export default function CardRelationship() {
  const [showColumnSelect, setShowColumnSelect] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set());

  const allColumns = ['Aan', 'Acc4 Digit', 'Action', 'Address1', 'Address2', 'Address3', 'Address4', 'Application No', 'Beg Balance'];

  const toggleColumn = (col: string) => {
    setSelectedColumns(prev => {
      const next = new Set(prev);
      if (next.has(col)) next.delete(col);
      else next.add(col);
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Card Relationship</h1>
        <div className="flex gap-2 relative">
          <button className="btn-primary">Pay Now</button>
          <button
            onClick={() => setShowColumnSelect(!showColumnSelect)}
            className="btn-secondary flex items-center gap-1"
          >
            <Download size={14} /> Download
          </button>

          {showColumnSelect && (
            <div className="absolute top-10 right-0 w-56 bg-white border border-gray-200 shadow-lg rounded-lg py-2 z-20">
              <div className="px-3 py-1 text-xs font-semibold text-gray-500">Select Columns to Download (Multi Select)</div>
              <div className="max-h-56 overflow-y-auto">
                {allColumns.map(col => (
                  <label key={col} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm">
                    <input type="checkbox" checked={selectedColumns.has(col)} onChange={() => toggleColumn(col)} className="rounded" />
                    {col}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50">
              {['Card Number', 'Customer Name', 'Alternate A/c No.', 'Card Limit', 'Block Code 1', 'Block Code 2', 'Available Limit'].map(h => (
                <th key={h} className="table-header whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockCards2.map(card => (
              <tr key={card.cardNumber} className="hover:bg-gray-50">
                <td className="table-cell font-mono text-sm">{card.cardNumber}</td>
                <td className="table-cell">{card.customerName}</td>
                <td className="table-cell text-blue-600 text-xs">{card.altAcNo}</td>
                <td className="table-cell font-medium">{card.cardLimit}</td>
                <td className="table-cell text-gray-400">{card.blockCode1 || ''}</td>
                <td className="table-cell text-gray-400">{card.blockCode2 || ''}</td>
                <td className={`table-cell font-medium ${card.availableLimit.startsWith('₹-') ? 'text-red-600' : 'text-gray-800'}`}>
                  {card.availableLimit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
