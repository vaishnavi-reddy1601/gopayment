import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCreditCardBills } from '../../data/mockData';
import { ChevronDown, CheckCircle, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

type View = 'home' | 'credit-card' | 'utility';

function DisclaimerModal({ onProceed, onCancel }: { onProceed: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Disclaimer!</h3>
        <p className="text-sm text-gray-600 mb-2">
          HDFC Bank is not selling/rendering any of these Services. Neither is HDFC Bank guaranteeing nor making any representation with respect to the bill payments made by the corporates and HDFC Bank is not liable/responsible for sale/quality/features/payments to the Billers selected for payment by the corporates.
        </p>
        <p className="text-sm text-red-500 mb-4">Please enable browser pop-ups to proceed.</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={onProceed} className="btn-primary">Proceed</button>
        </div>
      </div>
    </div>
  );
}

function PaymentConfirmModal({ bills, onConfirm, onCancel }: {
  bills: typeof mockCreditCardBills;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const total = bills.reduce((sum, b) => {
    const val = parseFloat(b.totalAmountDue.replace(/[₹,]/g, ''));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Confirm Payment</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        <div className="space-y-2 mb-4 max-h-52 overflow-y-auto">
          {bills.map(b => (
            <div key={b.cardNumber} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
              <div>
                <div className="font-medium font-mono text-xs">{b.cardNumber}</div>
                <div className="text-gray-500 text-xs">{b.customerName}</div>
              </div>
              <div className="font-semibold text-gray-800">{b.totalAmountDue}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between text-sm font-semibold">
            <span>Total Amount</span>
            <span className="text-blue-700">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="text-xs text-blue-600 mt-1">Payment will be deducted from account: ...8710</div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={onConfirm} className="btn-primary">Confirm Payment</button>
        </div>
      </div>
    </div>
  );
}

function PaymentSuccessModal({ count, onClose }: { count: number; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Initiated!</h3>
        <p className="text-sm text-gray-500 mb-1">{count} payment(s) submitted successfully.</p>
        <p className="text-xs text-gray-400 mb-6">You will receive a confirmation SMS/email shortly.</p>
        <button onClick={onClose} className="btn-primary w-full">Done</button>
      </div>
    </div>
  );
}

export default function BillPayments() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [view, setView] = useState<View>('home');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [pendingView, setPendingView] = useState<View>('home');
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [showPayConfirm, setShowPayConfirm] = useState(false);
  const [showPaySuccess, setShowPaySuccess] = useState(false);
  const [paidCount, setPaidCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const handleCardClick = (viewType: View) => {
    setPendingView(viewType);
    setShowDisclaimer(true);
  };

  const toggleCard = (i: number) => {
    setSelectedCards(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedCards.size === mockCreditCardBills.length) {
      setSelectedCards(new Set());
    } else {
      setSelectedCards(new Set(mockCreditCardBills.map((_, i) => i)));
    }
  };

  const handlePayNow = () => {
    if (selectedCards.size === 0) {
      showToast('Please select at least one card to pay', 'info');
      return;
    }
    setShowPayConfirm(true);
  };

  const handleConfirmPayment = () => {
    const count = selectedCards.size;
    setPaidCount(count);
    setShowPayConfirm(false);
    setSelectedCards(new Set());
    setShowPaySuccess(true);
  };

  const handleCheckStatus = () => {
    showToast('Payment status: All payments processed. No pending items.', 'info');
  };

  if (view === 'home') {
    return (
      <div>
        {showDisclaimer && (
          <DisclaimerModal
            onProceed={() => {
              if (pendingView === 'utility') { navigate('/bill-payments/categories'); }
              else { setView(pendingView); }
              setShowDisclaimer(false);
            }}
            onCancel={() => setShowDisclaimer(false)}
          />
        )}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="section-title mb-0">Bill Payments</h1>
            <p className="text-xs text-gray-500 mt-0.5">Pay all your utility bills in one place</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-lg">Bharat</span>
            <span className="text-orange-700 font-bold text-lg">Connect</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div
            onClick={() => handleCardClick('credit-card')}
            className="card p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all w-36"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Credit Card Payments</span>
          </div>

          <div
            onClick={() => handleCardClick('utility')}
            className="card p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all w-36"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Utility Payments</span>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'credit-card') {
    const selectedBills = Array.from(selectedCards).map(i => mockCreditCardBills[i]);
    const filtered = statusFilter === 'All' ? mockCreditCardBills
      : mockCreditCardBills.filter(b => b.status === statusFilter);

    return (
      <div>
        {showPayConfirm && (
          <PaymentConfirmModal
            bills={selectedBills}
            onConfirm={handleConfirmPayment}
            onCancel={() => setShowPayConfirm(false)}
          />
        )}
        {showPaySuccess && (
          <PaymentSuccessModal
            count={paidCount}
            onClose={() => setShowPaySuccess(false)}
          />
        )}

        <div className="text-xs text-gray-500 mb-3">
          <button className="text-blue-600 hover:underline" onClick={() => setView('home')}>Bill Payments</button>
          &rsaquo; Credit Card
        </div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="section-title mb-0">Credit Card Bill Payment</h1>
          <div className="flex gap-2">
            <button onClick={handleCheckStatus} className="btn-secondary">Check Status</button>
            <button
              onClick={handlePayNow}
              disabled={selectedCards.size === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay Now {selectedCards.size > 0 && `(${selectedCards.size})`}
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-3">
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="btn-secondary flex items-center gap-1"
            >
              Filter: {statusFilter} <ChevronDown size={12} />
            </button>
            {showStatusDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowStatusDropdown(false)} />
                <div className="absolute right-0 top-9 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {['All', 'Overdue', 'Paid'].map(s => (
                    <button key={s} onClick={() => { setStatusFilter(s); setShowStatusDropdown(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${statusFilter === s ? 'text-blue-600 font-medium' : ''}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header w-8">
                  <input type="checkbox" checked={selectedCards.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll} className="rounded accent-blue-600" />
                </th>
                {['Card Number', 'Customer Name', 'Due Date', 'Status', 'Total Amount Due', 'Minimum Amount Due', 'Mobile No.'].map(h => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((bill, i) => (
                <tr key={i} className={`hover:bg-gray-50 transition-colors ${selectedCards.has(i) ? 'bg-blue-50' : ''}`}>
                  <td className="table-cell" onClick={() => toggleCard(i)}>
                    <input type="checkbox" checked={selectedCards.has(i)} onChange={() => toggleCard(i)} className="rounded accent-blue-600" />
                  </td>
                  <td className="table-cell font-mono text-xs">{bill.cardNumber}</td>
                  <td className="table-cell">{bill.customerName}</td>
                  <td className="table-cell text-gray-500">{bill.dueDate}</td>
                  <td className="table-cell">
                    <span className="text-red-600 text-xs font-medium">{bill.status}</span>
                  </td>
                  <td className="table-cell font-medium">{bill.totalAmountDue}</td>
                  <td className="table-cell">{bill.minimumAmountDue}</td>
                  <td className="table-cell text-xs">{bill.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <select className="border border-gray-300 rounded px-1.5 py-1 text-xs">
            <option>10</option><option>25</option>
          </select>
          {[1, 2, 3].map(p => (
            <button key={p} className={`w-6 h-6 rounded text-xs ${p === 1 ? 'bg-blue-700 text-white' : 'hover:bg-gray-100'}`}>{p}</button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
