import { useState } from 'react';
import { Search, Upload, X } from 'lucide-react';
import { mockCards2 } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

const searchByOptions = ['Card Number', 'Mobile Number', 'Email ID', 'Employee Code'];
const bulkOptions = [
  'Select',
  'Manage Temporary Limit',
  'Manage Permanent Limit',
  'Manage Card Usage',
  'Temporary Card Block',
  'Permanent Card Block',
  'Credit Card Reissue',
  'Credit Card Replacement',
  'Activate Cards',
  'Create Travel Plan',
];

type Card = typeof mockCards2[0];

function BulkActionModal({ action, onClose }: { action: string; onClose: () => void }) {
  const [uploaded, setUploaded] = useState(false);
  const { showToast } = useToast();
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">{action} — Bulk</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-700">
          Upload a CSV file with card numbers and required parameters. Max 500 rows.
        </div>
        {!uploaded ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => setUploaded(true)}
          >
            <Upload size={28} className="text-gray-400 mb-2" />
            <p className="text-sm font-medium text-gray-600">Click to upload CSV</p>
          </div>
        ) : (
          <div className="bg-green-50 rounded-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</div>
            <p className="text-sm font-medium text-green-700">bulk_action.csv uploaded</p>
          </div>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            disabled={!uploaded}
            onClick={() => { showToast(`${action} request submitted`); onClose(); }}
            className="btn-primary disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CardFunctionalities() {
  const { showToast } = useToast();
  const [searchBy, setSearchBy] = useState('Card Number');
  const [searchValue, setSearchValue] = useState('');
  const [bulkAction, setBulkAction] = useState('Select');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showBulkDropdown, setShowBulkDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<Card[] | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const handleSearch = () => {
    if (!searchValue.trim()) {
      showToast('Please enter a search value', 'error');
      return;
    }
    const q = searchValue.trim().toUpperCase();
    const results = mockCards2.filter(c => {
      if (searchBy === 'Card Number') return c.cardNumber.replace(/-/g, '').includes(q);
      if (searchBy === 'Mobile Number') return c.altAcNo.includes(q);
      return c.customerName.toUpperCase().includes(q);
    });
    setSearchResults(results);
    if (results.length === 0) showToast('No cards found', 'info');
  };

  const handleBulkCreate = () => {
    if (bulkAction === 'Select') return;
    setShowBulkModal(true);
  };

  return (
    <div>
      {showBulkModal && <BulkActionModal action={bulkAction} onClose={() => setShowBulkModal(false)} />}

      <h1 className="section-title mb-4">Card Functionalities</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Card */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Search Card</h3>

          <div className="relative mb-3">
            <button
              onClick={() => setShowSearchDropdown(!showSearchDropdown)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-left flex items-center justify-between hover:border-gray-400"
            >
              <span>{searchBy}</span>
              <span className="text-gray-400">▾</span>
            </button>
            {showSearchDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSearchDropdown(false)} />
                <div className="absolute left-0 top-10 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-20">
                  {searchByOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSearchBy(opt); setShowSearchDropdown(false); setSearchResults(null); setSearchValue(''); }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      {opt === searchBy && <span className="text-blue-600 text-xs">✓</span>}
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <input
            value={searchValue}
            onChange={e => { setSearchValue(e.target.value); setSearchResults(null); }}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder={searchBy === 'Card Number' ? 'Enter Last 4 Digits' : `Enter ${searchBy}`}
            className="input-field mb-3"
          />

          <button onClick={handleSearch} className="bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-800 flex items-center gap-2">
            <Search size={14} /> Search
          </button>
        </div>

        {/* Bulk Creation */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Bulk Creation</h3>

          <div className="relative mb-3">
            <button
              onClick={() => setShowBulkDropdown(!showBulkDropdown)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-left flex items-center justify-between hover:border-gray-400"
            >
              <span className={bulkAction === 'Select' ? 'text-gray-400' : ''}>{bulkAction}</span>
              <span className="text-gray-400">▾</span>
            </button>
            {showBulkDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowBulkDropdown(false)} />
                <div className="absolute left-0 top-10 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-20 max-h-56 overflow-y-auto">
                  {bulkOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setBulkAction(opt); setShowBulkDropdown(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${opt === 'Select' ? 'text-gray-400' : ''}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleBulkCreate}
            disabled={bulkAction === 'Select'}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults !== null && (
        <div className="card overflow-x-auto mt-4">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Search Results ({searchResults.length} found)
            </h3>
            <button onClick={() => setSearchResults(null)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
          </div>
          {searchResults.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">No cards found matching your search.</div>
          ) : (
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50">
                  {['Card Number', 'Customer Name', 'Alternate A/c No.', 'Card Limit', 'Available Limit', 'Action'].map(h => (
                    <th key={h} className="table-header whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searchResults.map(card => (
                  <tr key={card.cardNumber} className="hover:bg-gray-50">
                    <td className="table-cell font-mono text-sm">{card.cardNumber}</td>
                    <td className="table-cell font-medium">{card.customerName}</td>
                    <td className="table-cell text-blue-600 text-xs">{card.altAcNo}</td>
                    <td className="table-cell">{card.cardLimit}</td>
                    <td className={`table-cell font-medium ${card.availableLimit.startsWith('₹-') ? 'text-red-600' : ''}`}>
                      {card.availableLimit}
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => showToast(`Temporary block applied to ${card.cardNumber}`)}
                        className="text-orange-600 text-xs hover:underline mr-3"
                      >
                        Temp Block
                      </button>
                      <button
                        onClick={() => showToast(`Permanent block applied to ${card.cardNumber}`, 'error')}
                        className="text-red-600 text-xs hover:underline"
                      >
                        Perm Block
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
