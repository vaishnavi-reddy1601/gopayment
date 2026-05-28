import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Upload, X, ChevronDown } from 'lucide-react';
import { mockCorporateUsers } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

type User = typeof mockCorporateUsers[0];

function UserDetailModal({ user, onClose, onToggleStatus }: { user: User; onClose: () => void; onToggleStatus: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">User Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          {[
            ['First Name', user.firstName],
            ['Last Name', user.lastName],
            ['Mobile', user.mobile],
            ['Email', user.email],
            ['Employee Code', user.empCode],
            ['Role', user.role],
            ['Status', user.status],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-xs text-gray-400 mb-0.5">{label}</div>
              <div className="font-medium text-gray-800">{value}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">Close</button>
          <button
            onClick={() => { onToggleStatus(); onClose(); }}
            className={user.status === 'Active' ? 'btn-danger border border-red-200 px-4 py-2 rounded text-sm' : 'btn-primary'}
          >
            {user.status === 'Active' ? 'Disable User' : 'Enable User'}
          </button>
        </div>
      </div>
    </div>
  );
}

function BulkUserModal({ onClose }: { onClose: () => void }) {
  const [uploaded, setUploaded] = useState(false);
  const { showToast } = useToast();
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Bulk User Creation</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-700">
          Upload a CSV file with columns: <span className="font-medium">UserId, FirstName, LastName, Mobile, Email, EmpCode, Role</span>. Max 500 rows per file.
        </div>
        {!uploaded ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => setUploaded(true)}
          >
            <Upload size={28} className="text-gray-400 mb-2" />
            <p className="text-sm font-medium text-gray-600">Click to upload CSV file</p>
            <p className="text-xs text-gray-400 mt-1">Max file size: 5MB</p>
          </div>
        ) : (
          <div className="bg-green-50 rounded-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
            <div>
              <p className="text-sm font-medium text-green-700">bulk_users.csv uploaded</p>
              <p className="text-xs text-green-600">Ready to submit</p>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            disabled={!uploaded}
            onClick={() => { showToast('Bulk user creation request submitted'); onClose(); }}
            className="btn-primary disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserList() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchId, setSearchId] = useState('');
  const [userType, setUserType] = useState<'Corporate' | 'Employee'>('Corporate');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState(mockCorporateUsers);
  const [idSearchResult, setIdSearchResult] = useState<User | null | false>(false);

  const filtered = users.filter(u => {
    const matchText = !searchText || u.firstName.includes(searchText.toUpperCase()) || u.email.includes(searchText.toUpperCase()) || u.lastName.includes(searchText.toUpperCase());
    const matchStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchText && matchStatus;
  });

  const handleIdSearch = () => {
    if (!searchId.trim()) return;
    const found = users.find(u => (u.firstName + u.lastName).toUpperCase().includes(searchId.toUpperCase()) || u.empCode.toUpperCase().includes(searchId.toUpperCase()));
    setIdSearchResult(found || false);
  };

  const toggleUserStatus = (srNo: number) => {
    setUsers(prev => prev.map(u => {
      if (u.srNo === srNo) {
        const next = u.status === 'Active' ? 'Disabled' : 'Active';
        showToast(`User ${u.firstName} ${next === 'Active' ? 'enabled' : 'disabled'}`);
        return { ...u, status: next };
      }
      return u;
    }));
  };

  return (
    <div>
      {showBulkModal && <BulkUserModal onClose={() => setShowBulkModal(false)} />}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onToggleStatus={() => toggleUserStatus(selectedUser.srNo)}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Corporate Users</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowBulkModal(true)} className="btn-secondary flex items-center gap-1">
            <Upload size={14} /> Bulk User
          </button>
          <button onClick={() => navigate('/corporate/user-list/create')} className="btn-primary">
            Create Single User
          </button>
        </div>
      </div>

      {/* Search by User ID */}
      <div className="card p-4 mb-4">
        <div className="text-sm font-medium text-gray-700 mb-1">Search by User ID</div>
        <div className="text-xs text-gray-400 mb-2">Across all active Relationships</div>
        <div className="flex gap-2">
          <input
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleIdSearch()}
            placeholder="User ID or Employee Code"
            className="input-field max-w-xs"
          />
          <button onClick={handleIdSearch} className="btn-primary">Submit</button>
        </div>
        {idSearchResult === false && searchId && (
          <p className="text-xs text-red-500 mt-2">No user found for "{searchId}"</p>
        )}
        {idSearchResult && (
          <div
            className="mt-2 bg-blue-50 border border-blue-200 rounded p-2 text-xs cursor-pointer hover:bg-blue-100"
            onClick={() => setSelectedUser(idSearchResult as User)}
          >
            Found: <span className="font-medium">{(idSearchResult as User).firstName} {(idSearchResult as User).lastName}</span> — {(idSearchResult as User).role} ({(idSearchResult as User).status})
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="card p-4 mb-4">
        <div className="text-sm font-medium text-gray-700 mb-3">Select User Type</div>
        <div className="flex gap-4 mb-4">
          {(['Corporate', 'Employee'] as const).map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={userType === type} onChange={() => setUserType(type)} className="accent-blue-600" />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Search by name or email"
              className="border border-gray-300 rounded pl-8 pr-3 py-1.5 text-sm w-full focus:outline-none"
            />
          </div>
          <button onClick={() => setSearchText('')} className="btn-secondary">Reset</button>
          <div className="relative">
            <button
              onClick={() => setShowStatusFilter(!showStatusFilter)}
              className="btn-secondary flex items-center gap-1"
            >
              Status: {statusFilter} <ChevronDown size={12} />
            </button>
            {showStatusFilter && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowStatusFilter(false)} />
                <div className="absolute right-0 top-9 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {['All', 'Active', 'Disabled'].map(s => (
                    <button key={s} onClick={() => { setStatusFilter(s); setShowStatusFilter(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${statusFilter === s ? 'text-blue-600 font-medium' : ''}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {['Sr No.', 'First Name', 'Last Name', 'Mobile Number', 'Email ID', 'Employee Code', 'Status', 'Role'].map(h => (
                <th key={h} className="table-header">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-400 text-sm">No users found.</td>
              </tr>
            ) : (
              filtered.map(user => (
                <tr
                  key={user.srNo}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="table-cell text-gray-500">{user.srNo}</td>
                  <td className="table-cell font-medium text-blue-700">{user.firstName}</td>
                  <td className="table-cell">{user.lastName}</td>
                  <td className="table-cell">{user.mobile}</td>
                  <td className="table-cell text-xs">{user.email}</td>
                  <td className="table-cell">{user.empCode}</td>
                  <td className="table-cell">
                    <span className={user.status === 'Active' ? 'badge-approved' : 'badge-disabled'}>
                      {user.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">{user.role}</span>
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
