import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { mockRequestsReceived } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

function RejectModal({ onConfirm, onCancel }: { onConfirm: (reason: string) => void; onCancel: () => void }) {
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Reject Request</h3>
        <p className="text-sm text-gray-500 mb-3">Please provide a reason for rejection (optional):</p>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Enter rejection reason..."
          className="input-field resize-none mb-4"
          rows={3}
        />
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={() => onConfirm(reason)} className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700">
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const req = mockRequestsReceived.find(r => String(r.id) === id);

  const [localStatus, setLocalStatus] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionTime] = useState(new Date().toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  if (!req) return <div className="text-center py-20 text-gray-400">Request not found</div>;

  const status = localStatus || req.status;

  const handleApprove = () => {
    setLocalStatus('Approved');
    showToast(`Request #${req.id} approved successfully`);
  };

  const handleReject = (reason: string) => {
    setRejectReason(reason);
    setLocalStatus('Rejected');
    setShowRejectModal(false);
    showToast(`Request #${req.id} rejected`, 'error');
  };

  return (
    <div>
      {showRejectModal && (
        <RejectModal
          onConfirm={handleReject}
          onCancel={() => setShowRejectModal(false)}
        />
      )}

      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/requests-received')} className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100">
          <ArrowLeft size={18} />
        </button>
        <h1 className="section-title mb-0">Request #{req.id}</h1>
        <div className="ml-auto">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
            status === 'Approved' ? 'bg-green-100 text-green-700' :
            status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-600'
          }`}>
            {status}
          </span>
        </div>
      </div>

      <div className="text-xs text-blue-600 mb-4 font-medium">Request Details</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Maker Details */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Maker Details</h3>
            <div className="grid grid-cols-3 gap-4 text-xs">
              {[
                { label: 'Submitted Date & Time', value: '25/05/2026 | 3:16:02 PM' },
                { label: 'Email ID', value: 'HARDIKPANDYA@GMAIL.COM' },
                { label: 'First Name', value: req.submittedBy.split(' ')[0] },
                { label: 'Last Name', value: req.submittedBy.split(' ').slice(1).join(' ') || 'N/A' },
                { label: 'Relationship Name', value: 'ACC BOARDING' },
                { label: 'Role Name', value: 'AUS' },
                { label: 'User Name', value: req.submittedBy.replace(' ', '').toUpperCase().slice(0, 10) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-gray-400 mb-0.5">{label}</div>
                  <div className="font-medium text-gray-800">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Details */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Request Details</h3>
            <div className="grid grid-cols-2 gap-4 text-xs mb-4">
              <div>
                <div className="text-gray-400 mb-0.5">Request Category</div>
                <div className="font-medium text-gray-800">{req.category}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-0.5">Request Sub Category</div>
                <div className="font-medium text-gray-800">{req.subCategory}</div>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-gray-700 mb-3">Basic Details</h4>
            <div className="grid grid-cols-3 gap-4 text-xs">
              {[
                { label: 'Old Mobile Number', value: 'SagmYr1xzqTm8pptJQe4A**' },
                { label: 'New Mobile Number', value: 'ExSOzMpuJuJYjKAR98al+g==' },
                { label: 'First Name', value: 'SANKETC' },
                { label: 'Last Name', value: 'KURDHUNDKAR' },
                { label: 'Email ID', value: 'SANKET.K@YOPMAIL.COM' },
                { label: 'Emp Code', value: 'GO12321' },
                { label: 'Branch Code', value: '' },
                { label: 'Branch Name', value: '' },
                { label: 'Supervisor Code', value: '' },
                { label: 'Department Code', value: '' },
                { label: 'Department Name', value: '' },
                { label: 'Status', value: 'ACTIVE' },
                { label: 'User ID', value: 'EMPCHECK' },
                { label: 'User Type', value: 'EMPLOYEE' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-gray-400 mb-0.5">{label}</div>
                  <div className="font-medium text-gray-800">{value || '–'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Timeline</h3>
          <div className="space-y-5">
            {/* Created */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="w-px flex-1 bg-gray-200 mt-1" />
              </div>
              <div className="text-xs pb-4">
                <div className="text-gray-500">Request created by</div>
                <div className="font-medium text-gray-800 mt-0.5">AUS</div>
                <div className="text-gray-600">{req.submittedBy}</div>
                <div className="text-gray-400 mt-0.5">{req.submittedOn} | 3:16:02 PM</div>
              </div>
            </div>

            {/* Action taken */}
            {(status === 'Approved' || status === 'Rejected') && (
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${status === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {status === 'Approved'
                      ? <CheckCircle size={12} className="text-white" />
                      : <XCircle size={12} className="text-white" />
                    }
                  </div>
                </div>
                <div className="text-xs">
                  <div className="text-gray-500">{status === 'Approved' ? 'Approved' : 'Rejected'} at Level 1 by</div>
                  <div className="font-medium text-gray-800 mt-0.5">AUS</div>
                  <span className={status === 'Approved' ? 'badge-approved' : 'badge-rejected'}>
                    {status.toUpperCase()}
                  </span>
                  {rejectReason && (
                    <div className="mt-1 text-gray-500 bg-red-50 px-2 py-1 rounded text-[11px]">
                      Reason: {rejectReason}
                    </div>
                  )}
                  <div className="mt-1 text-gray-500">AUSADMIN</div>
                  <div className="text-gray-400">{actionTime}</div>
                </div>
              </div>
            )}

            {/* Pending action buttons */}
            {status === 'Pending' && (
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
                <div className="text-xs">
                  <div className="text-gray-500">Pending approval at Level 1</div>
                  <div className="font-medium text-gray-800 mt-0.5">AUS</div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleApprove}
                      className="bg-green-600 text-white text-xs px-3 py-1.5 rounded hover:bg-green-700 flex items-center gap-1 font-medium"
                    >
                      <CheckCircle size={12} /> Approve
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="bg-red-600 text-white text-xs px-3 py-1.5 rounded hover:bg-red-700 flex items-center gap-1 font-medium"
                    >
                      <XCircle size={12} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
