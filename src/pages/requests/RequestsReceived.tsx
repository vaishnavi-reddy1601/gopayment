import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle } from 'lucide-react';
import { mockRequestsReceived } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

type Tab = 'All' | 'Approved' | 'Pending' | 'Rejected';

export default function RequestsReceived() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = mockRequestsReceived.filter(r => {
    const matchTab = activeTab === 'All' || r.status === activeTab;
    const matchSearch = !search || r.submittedBy.toLowerCase().includes(search.toLowerCase())
      || r.category.toLowerCase().includes(search.toLowerCase())
      || String(r.id).includes(search);
    return matchTab && matchSearch;
  });

  const pendingFiltered = filtered.filter(r => r.status === 'Pending');

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(r => r.id)));
    }
  };

  const handleApproveAll = () => {
    const pendingSelected = filtered.filter(r => selected.has(r.id) && r.status === 'Pending');
    if (pendingSelected.length === 0) {
      showToast('Select pending requests to approve', 'info');
      return;
    }
    showToast(`${pendingSelected.length} request(s) approved successfully`);
    setSelected(new Set());
  };

  const tabs: Tab[] = ['All', 'Approved', 'Pending', 'Rejected'];
  const allSelected = filtered.length > 0 && selected.size === filtered.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="section-title mb-0">Request Received</h1>
          <p className="text-xs text-gray-500 mt-0.5">Approve or Reject requests.</p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {selected.size} selected
            </span>
          )}
          <button
            onClick={handleApproveAll}
            disabled={selected.size === 0 || pendingFiltered.length === 0}
            className="btn-primary flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle size={14} /> Approve All
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by ID, name, or category"
          className="border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map(tab => {
          const count = tab === 'All' ? mockRequestsReceived.length
            : mockRequestsReceived.filter(r => r.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              <span className={`text-xs rounded-full px-1.5 ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="table-header w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="rounded accent-blue-600"
                />
              </th>
              <th className="table-header">Request ID</th>
              <th className="table-header">Submitted On</th>
              <th className="table-header">Submitted by (Username)</th>
              <th className="table-header">Request Category</th>
              <th className="table-header">Sub Category</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                  No requests found.
                </td>
              </tr>
            ) : (
              filtered.map(req => (
                <tr
                  key={req.id}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${selected.has(req.id) ? 'bg-blue-50' : ''}`}
                  onClick={() => navigate(`/requests-received/${req.id}`)}
                >
                  <td className="table-cell" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(req.id)}
                      onChange={() => toggleSelect(req.id)}
                      className="rounded accent-blue-600"
                    />
                  </td>
                  <td className="table-cell text-blue-600 font-medium">{req.id}</td>
                  <td className="table-cell text-gray-500">{req.submittedOn}</td>
                  <td className="table-cell font-medium">{req.submittedBy}</td>
                  <td className="table-cell">{req.category}</td>
                  <td className="table-cell text-gray-600">{req.subCategory}</td>
                  <td className="table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      req.status === 'Approved' ? 'badge-approved' :
                      req.status === 'Pending' ? 'badge-pending' : 'badge-rejected'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
