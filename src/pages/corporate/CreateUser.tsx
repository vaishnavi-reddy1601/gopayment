import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const TAKEN_IDS = ['AUSADMIN', 'SANKETK', 'SARANGIT'];

export default function CreateUser() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [tab, setTab] = useState<'basic' | 'map'>('basic');
  const [userType, setUserType] = useState<'Corporate' | 'Employee'>('Corporate');
  const [form, setForm] = useState({
    userId: '', firstName: '', lastName: '', mobile: '', email: '',
    empCode: '', supervisorCode: '', deptName: '', deptCode: '', branchName: '', branchCode: '',
  });
  const [idCheck, setIdCheck] = useState<'available' | 'taken' | null>(null);
  const [checking, setChecking] = useState(false);
  const [mapRelNumber, setMapRelNumber] = useState('');

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'userId') setIdCheck(null);
  };

  const isFormValid = form.userId && form.firstName && form.lastName && form.mobile && form.email && form.empCode && idCheck === 'available';

  const handleCheckId = () => {
    if (!form.userId.trim()) return;
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      const isTaken = TAKEN_IDS.includes(form.userId.trim().toUpperCase());
      setIdCheck(isTaken ? 'taken' : 'available');
    }, 600);
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      showToast('Please fill all required fields and check User ID', 'error');
      return;
    }
    showToast(`User "${form.userId}" created successfully`);
    navigate('/corporate/user-list');
  };

  return (
    <div>
      <div className="text-xs text-gray-500 mb-3">
        <button onClick={() => navigate('/corporate/user-list')} className="text-blue-600 hover:underline">User List</button>
        &rsaquo; Single User
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Create Single User</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate('/corporate/user-list')} className="btn-secondary">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Step Tabs */}
      <div className="flex gap-0 mb-5 border-b border-gray-200">
        {(['basic', 'map'] as const).map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${
              tab === t ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>{i + 1}</span>
            {t === 'basic' ? 'Basic Details' : 'Map Associate Relationship Number'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-5">
          {tab === 'basic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID *</label>
                <div className="flex gap-2 items-start">
                  <div className="flex-1 max-w-xs">
                    <input
                      value={form.userId}
                      onChange={e => update('userId', e.target.value)}
                      placeholder="Enter User ID"
                      className="input-field"
                    />
                    {idCheck === 'available' && (
                      <div className="flex items-center gap-1 mt-1 text-green-600 text-xs">
                        <CheckCircle size={12} /> User ID is available
                      </div>
                    )}
                    {idCheck === 'taken' && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                        <XCircle size={12} /> User ID already exists
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleCheckId}
                    disabled={!form.userId.trim() || checking}
                    className="btn-secondary disabled:opacity-50"
                  >
                    {checking ? 'Checking...' : 'Check'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select User Type *</label>
                <div className="flex gap-4">
                  {(['Corporate', 'Employee'] as const).map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={userType === t} onChange={() => setUserType(t)} className="accent-blue-600" />
                      <span className="text-sm">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'First Name *', field: 'firstName', placeholder: 'Enter First Name' },
                  { label: 'Last Name *', field: 'lastName', placeholder: 'Enter Last Name' },
                  { label: 'Mobile Number *', field: 'mobile', placeholder: 'Enter Mobile Number' },
                  { label: 'Email ID *', field: 'email', placeholder: 'Enter Email ID' },
                  { label: 'Employee Code *', field: 'empCode', placeholder: 'Employee Code' },
                  { label: 'Supervisor Code', field: 'supervisorCode', placeholder: 'Supervisor Code' },
                  { label: 'Department Name', field: 'deptName', placeholder: 'Enter Department Name' },
                  { label: 'Department Code', field: 'deptCode', placeholder: 'Enter Department Code' },
                  { label: 'Branch Name', field: 'branchName', placeholder: 'Enter Branch Name' },
                  { label: 'Branch Code', field: 'branchCode', placeholder: 'Enter Branch Code' },
                ].map(({ label, field, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      value={form[field as keyof typeof form]}
                      onChange={e => update(field, e.target.value)}
                      placeholder={placeholder}
                      className="input-field"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'map' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Associate Relationship Number</label>
                <p className="text-xs text-gray-400 mb-2">Enter the relationship number to associate this user with another relationship.</p>
                <div className="flex gap-2">
                  <input
                    value={mapRelNumber}
                    onChange={e => setMapRelNumber(e.target.value)}
                    placeholder="Enter relationship number"
                    className="input-field max-w-xs"
                  />
                  <button
                    onClick={() => mapRelNumber && showToast('Relationship mapped successfully')}
                    className="btn-primary"
                  >
                    Map
                  </button>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-xs text-blue-700">
                The user will be able to access the mapped relationship after the request is approved by the approver.
              </div>
            </div>
          )}
        </div>

        {/* Approvers Panel */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Approvers</h3>
          <div className="text-xs text-gray-500 mb-2">Level 1</div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">AUS</span>
          </div>
          {isFormValid && (
            <div className="mt-2 p-3 bg-green-50 rounded-lg text-xs text-green-700 border border-green-200">
              <CheckCircle size={12} className="inline mr-1" />
              All required fields filled. Ready to submit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
