import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { mockVirtualCardUsers } from '../../data/mockData';

type CreateMode = 'single' | 'bulk' | null;

export default function VirtualCardUser() {
  const [search, setSearch] = useState('');
  const [createMode, setCreateMode] = useState<CreateMode>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [form, setForm] = useState({ username: '', mobile: '', email: '', userCode: '', status: 'Active' });

  const filtered = mockVirtualCardUsers.filter(u =>
    !search || u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (createMode === 'single') {
    return (
      <div>
        <div className="text-xs text-gray-500 mb-3">
          Virtual Card User Creation &rsaquo; Single Creation
        </div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="section-title mb-0">Create Virtual Card User (Single)</h1>
          <div className="flex gap-2">
            <button onClick={() => setCreateMode(null)} className="btn-secondary">Cancel</button>
            <button className="btn-primary opacity-50 cursor-not-allowed" disabled>Submit</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 card p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Virtual Card Username *</label>
                <div className="flex gap-2">
                  <input value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                    placeholder="Enter Virtual Card Username" className="input-field" />
                  <button className="btn-secondary">Check</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                <input value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
                  placeholder="Enter Mobile Number" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID *</label>
                <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="Enter Email ID" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Code</label>
                <input value={form.userCode} onChange={e => setForm(p => ({ ...p, userCode: e.target.value }))}
                  placeholder="Enter User Code" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                  className="input-field">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
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
        <h1 className="section-title mb-0">Virtual Card User</h1>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="btn-primary flex items-center gap-1.5"
          >
            Create Virtual Card User <ChevronDown size={14} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-1 z-10">
              <button onClick={() => { setCreateMode('single'); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Single Creation</button>
              <button onClick={() => { setCreateMode('bulk'); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Bulk Creation</button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm w-full focus:outline-none"
          />
        </div>
        <button className="btn-primary">Search</button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="table-header">Virtual Card User ID</th>
              <th className="table-header">Virtual Card Username</th>
              <th className="table-header">Contact Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="table-cell text-blue-600 font-medium">{user.id}</td>
                <td className="table-cell font-medium">{user.username}</td>
                <td className="table-cell text-gray-500 text-xs truncate max-w-xs">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
