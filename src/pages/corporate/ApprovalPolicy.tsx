import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, X, Plus } from 'lucide-react';
import { mockApprovalPolicies } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

type Policy = typeof mockApprovalPolicies[0];

function EditModal({ policy, onSave, onClose }: { policy: Policy | null; onClose: () => void; onSave: (p: Policy) => void }) {
  const [levels, setLevels] = useState(policy?.levels ?? 'Level 1');
  const [roles, setRoles] = useState<string[]>(policy?.approverRole ?? ['AUS']);
  const [newRole, setNewRole] = useState('');
  const isNew = !policy;

  const addRole = () => {
    if (newRole.trim() && !roles.includes(newRole.trim().toUpperCase())) {
      setRoles(prev => [...prev, newRole.trim().toUpperCase()]);
      setNewRole('');
    }
  };

  const removeRole = (r: string) => setRoles(prev => prev.filter(x => x !== r));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">
            {isNew ? 'Create Approval Policy' : `Edit Policy: ${policy?.functionality}`}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        {isNew && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Functionality *</label>
            <input className="input-field" placeholder="e.g. Card Block - Single" />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Approval Levels</label>
          <select value={levels} onChange={e => setLevels(e.target.value)} className="input-field">
            <option>Level 1</option>
            <option>Level 1, Level 2</option>
            <option>Level 1, Level 2, Level 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Approver Roles</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {roles.map(r => (
              <span key={r} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">
                {r}
                <button onClick={() => removeRole(r)} className="hover:text-blue-900"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addRole()}
              placeholder="Add role (e.g. ADMIN)"
              className="input-field"
            />
            <button onClick={addRole} className="btn-secondary px-3"><Plus size={14} /></button>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            onClick={() => policy && onSave({ ...policy, levels, approverRole: roles })}
            className="btn-primary"
          >
            {isNew ? 'Create' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ApprovalPolicy() {
  const { showToast } = useToast();
  const [cardDetailsOpen, setCardDetailsOpen] = useState(true);
  const [policies, setPolicies] = useState(mockApprovalPolicies);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null | undefined>(undefined);

  const handleSave = (updated: Policy) => {
    setPolicies(prev => prev.map(p => p.functionality === updated.functionality ? updated : p));
    setEditingPolicy(undefined);
    showToast('Approval policy updated successfully');
  };

  const handleCreate = () => {
    setEditingPolicy(undefined);
    showToast('Policy creation form coming soon', 'info');
  };

  return (
    <div>
      {editingPolicy !== undefined && editingPolicy !== null && (
        <EditModal
          policy={editingPolicy}
          onSave={handleSave}
          onClose={() => setEditingPolicy(undefined)}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Approval Policy</h1>
        <button onClick={handleCreate} className="btn-primary flex items-center gap-1.5">
          <Plus size={14} /> Create Policy
        </button>
      </div>

      <div className="card overflow-hidden">
        <div
          className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 border-b border-gray-200 transition-colors"
          onClick={() => setCardDetailsOpen(!cardDetailsOpen)}
        >
          <h3 className="text-sm font-semibold text-gray-700">Card Details Page</h3>
          {cardDetailsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {cardDetailsOpen && (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="table-header">Functionalities</th>
                <th className="table-header">Levels</th>
                <th className="table-header">Approver Role</th>
                <th className="table-header" />
              </tr>
            </thead>
            <tbody>
              {policies.map(policy => (
                <tr key={policy.functionality} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium">{policy.functionality}</td>
                  <td className="table-cell text-gray-500">{policy.levels}</td>
                  <td className="table-cell">
                    <div className="flex flex-wrap gap-1">
                      {policy.approverRole.map(role => (
                        <span key={role} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="table-cell text-right">
                    <button
                      onClick={() => setEditingPolicy(policy)}
                      className="text-blue-600 text-xs hover:text-blue-700 flex items-center gap-1 ml-auto"
                    >
                      <Edit size={12} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
