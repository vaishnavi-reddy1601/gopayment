import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Edit, Plus, Info } from 'lucide-react';
import { mockEmployeeRoles } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

export default function EmployeeRoles() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [roles, setRoles] = useState(mockEmployeeRoles);

  const toggleStatus = (name: string) => {
    const role = roles.find(r => r.name === name);
    const next = role?.status === 'Active' ? 'Disabled' : 'Active';
    setRoles(prev => prev.map(r =>
      r.name === name ? { ...r, status: next } : r
    ));
    showToast(`Role "${name}" ${next === 'Active' ? 'enabled' : 'disabled'}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Employee Roles & Permissions</h1>
        <button onClick={() => navigate('/corporate/employee-roles/create')} className="btn-primary flex items-center gap-1.5">
          <Plus size={14} /> Create Role
        </button>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 flex items-start gap-2">
        <Info size={14} className="text-orange-500 mt-0.5 shrink-0" />
        <p className="text-xs text-orange-700">
          <span className="font-semibold">Default Roles</span> — Any changes performed on these Roles would reflect on the Roles across all the Relationships once the changes are approved by all the Approvers.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Current Roles</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="table-header">Role</th>
              <th className="table-header">Users Mapped</th>
              <th className="table-header text-right">Action(s)</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.name} className="hover:bg-gray-50 transition-colors">
                <td className="table-cell font-medium">{role.name}</td>
                <td className="table-cell text-gray-500">{role.users > 0 ? role.users : '–'}</td>
                <td className="table-cell text-right">
                  <div className="flex items-center justify-end gap-3">
                    {role.status === 'Disabled' ? (
                      <>
                        <span className="badge-disabled">Disabled</span>
                        <button
                          onClick={() => toggleStatus(role.name)}
                          className="text-green-600 text-xs font-medium hover:text-green-700"
                        >
                          Enable
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate(`/corporate/employee-roles/edit/${role.name}`)}
                          className="text-blue-600 text-xs hover:text-blue-700 flex items-center gap-1"
                        >
                          <Copy size={12} /> Copy permissions
                        </button>
                        <button
                          onClick={() => navigate(`/corporate/employee-roles/edit/${role.name}`)}
                          className="text-blue-600 text-xs hover:text-blue-700 flex items-center gap-1"
                        >
                          <Edit size={12} /> Edit
                        </button>
                        <button onClick={() => toggleStatus(role.name)} className="btn-danger">
                          Disable
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
