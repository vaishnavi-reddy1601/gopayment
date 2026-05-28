import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';
import { permissions } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

interface PermissionsState {
  [key: string]: boolean;
}

const TAKEN_NAMES = ['ADMIN', 'AUS', 'AAM', 'EMPLOYEE'];

const permissionGroups = [
  { key: 'generalPermissions', label: 'General Permissions', items: permissions.generalPermissions },
  { key: 'userAccessManagement', label: 'User Access Management', items: permissions.userAccessManagement },
  { key: 'relationshipCardFunctionality', label: 'Relationship Card Functionality', items: permissions.relationshipCardFunctionality },
  { key: 'virtualCardUser', label: 'Virtual Card User', items: permissions.virtualCardUser },
  { key: 'serviceRequests', label: 'Service Requests', items: permissions.serviceRequests },
  { key: 'auditTrail', label: 'Audit Trail', items: permissions.auditTrail },
  { key: 'reports', label: 'Reports', items: permissions.reports },
  { key: 'billPayments', label: 'Bill Payments', items: permissions.billPayments },
  { key: 'faqs', label: 'FAQs', items: permissions.faqs },
  { key: 'masters', label: 'Masters', items: permissions.masters },
];

export default function CreateRole({ isEmployee = false }: { isEmployee?: boolean }) {
  const navigate = useNavigate();
  const { name: paramName } = useParams();
  const location = useLocation();
  const { showToast } = useToast();

  const isEdit = location.pathname.includes('/edit/');
  const isCopy = location.pathname.includes('/copy/');

  const initialName = isEdit ? (paramName || '') : isCopy ? `COPY OF ${paramName || ''}` : '';

  const [roleName, setRoleName] = useState(initialName);
  const [description, setDescription] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['generalPermissions']));
  const [groupEnabled, setGroupEnabled] = useState<{ [key: string]: boolean }>({});
  const [permStates, setPermStates] = useState<PermissionsState>({});
  const [activeQuick, setActiveQuick] = useState('All');
  const [nameCheck, setNameCheck] = useState<'available' | 'taken' | null>(null);
  const [checking, setChecking] = useState(false);

  const quickAccessTabs = isEmployee
    ? ['All', 'General Permissions', 'Relationship Card Functionality', 'FAQs', 'Service Requests', 'Bill Payments']
    : ['All', 'General Permissions', 'User Access Management', 'Relationship Card Functionality', 'Virtual Card User', 'Service Requests', 'Audit Trail'];

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleGroupEnabled = (key: string) => {
    const newVal = !groupEnabled[key];
    setGroupEnabled(prev => ({ ...prev, [key]: newVal }));
    const group = permissionGroups.find(g => g.key === key);
    if (group) {
      const updates: PermissionsState = {};
      group.items.forEach(item => { updates[`${key}:${item}`] = newVal; });
      setPermStates(prev => ({ ...prev, ...updates }));
    }
  };

  const togglePerm = (key: string, item: string) => {
    setPermStates(prev => ({ ...prev, [`${key}:${item}`]: !prev[`${key}:${item}`] }));
  };

  const handleCheckName = () => {
    if (!roleName.trim()) return;
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      const isTaken = TAKEN_NAMES.includes(roleName.trim().toUpperCase());
      setNameCheck(isTaken ? 'taken' : 'available');
    }, 600);
  };

  const handleSubmit = () => {
    if (!roleName.trim()) {
      showToast('Please enter a role name', 'error');
      return;
    }
    if (nameCheck === 'taken' && !isEdit) {
      showToast('Role name is already taken', 'error');
      return;
    }
    const action = isEdit ? 'updated' : isCopy ? 'copied' : 'created';
    showToast(`Role "${roleName}" ${action} successfully`);
    navigate(backPath);
  };

  const backPath = isEmployee ? '/corporate/employee-roles' : '/corporate/roles';
  const title = isEdit ? `Edit Role: ${paramName}` : isCopy ? `Copy Role: ${paramName}` : isEmployee ? 'Create Employee Role' : 'Create Corporate Role';
  const breadcrumb = isEmployee ? 'Employee Roles & Permissions' : 'Roles & Permissions';

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-3">
        Corporate Users &rsaquo;{' '}
        <button onClick={() => navigate(backPath)} className="text-blue-600 hover:underline">{breadcrumb}</button>
        &rsaquo; {isEdit ? 'Edit Role' : isCopy ? 'Copy Role' : 'Create New Role'}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">{title}</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate(backPath)} className="btn-secondary">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary">
            {isEdit ? 'Save Changes' : 'Submit'}
          </button>
        </div>
      </div>

      <div className="card p-5 space-y-5">
        {/* Role Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter Role Name *</label>
          <div className="flex gap-2 items-start">
            <div className="flex-1 max-w-md">
              <input
                value={roleName}
                onChange={e => { setRoleName(e.target.value); setNameCheck(null); }}
                placeholder="e.g. Admin"
                className="input-field"
              />
              {nameCheck === 'available' && (
                <div className="flex items-center gap-1 mt-1 text-green-600 text-xs">
                  <CheckCircle size={12} /> Role name is available
                </div>
              )}
              {nameCheck === 'taken' && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                  <XCircle size={12} /> Role name is already taken
                </div>
              )}
            </div>
            <button
              onClick={handleCheckName}
              disabled={!roleName.trim() || checking}
              className="btn-secondary px-4 disabled:opacity-50"
            >
              {checking ? 'Checking...' : 'Check'}
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g. Admin will have all UAM rights."
            rows={3}
            maxLength={280}
            className="input-field max-w-md resize-none"
          />
          <div className="text-xs text-gray-400 text-right max-w-md">{description.length} / 280</div>
        </div>

        {/* Quick Access Tabs */}
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">Quick Access</div>
          <div className="flex flex-wrap gap-2">
            {quickAccessTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveQuick(tab)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeQuick === tab
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Permission Groups */}
        <div className="space-y-2">
          {permissionGroups.map(group => (
            <div key={group.key} className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleGroup(group.key)}
              >
                <span className="text-sm font-medium text-gray-700">{group.label}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={e => { e.stopPropagation(); toggleGroupEnabled(group.key); }}
                    className={`w-10 h-5 rounded-full transition-colors relative ${groupEnabled[group.key] ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${groupEnabled[group.key] ? 'left-5' : 'left-0.5'}`} />
                  </button>
                  {expandedGroups.has(group.key) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </div>

              {expandedGroups.has(group.key) && (
                <div className="px-4 py-2 bg-white">
                  {group.items.map(item => (
                    <div key={item} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-700">{item}</span>
                      <button
                        onClick={() => togglePerm(group.key, item)}
                        className={`w-9 h-4 rounded-full transition-colors relative ${permStates[`${group.key}:${item}`] ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                        <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${permStates[`${group.key}:${item}`] ? 'left-5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
