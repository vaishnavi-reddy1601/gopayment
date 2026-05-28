import { useState } from 'react';
import { MoreVertical, Edit, Trash2, Bell, X } from 'lucide-react';
import { mockBillerCategories } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

type Biller = { categoryName: string; name: string; icon: string };

function EditBillerModal({ biller, onSave, onClose }: { biller: Biller; onSave: () => void; onClose: () => void }) {
  const [name, setName] = useState(biller.name);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Edit Biller</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Biller Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="input-field" />
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={onSave} className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function BillerManagement() {
  const { showToast } = useToast();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [editingBiller, setEditingBiller] = useState<Biller | null>(null);
  const [deletedBillers, setDeletedBillers] = useState<Set<string>>(new Set());

  const filledCategories = mockBillerCategories.filter(c => c.savedBillers.length > 0);

  const handleDelete = (billerName: string) => {
    setDeletedBillers(prev => new Set([...prev, billerName]));
    setOpenMenu(null);
    showToast(`Biller "${billerName.split('(')[0].trim()}" removed`, 'error');
  };

  const handleSetReminder = (billerName: string) => {
    setOpenMenu(null);
    showToast(`Reminder set for "${billerName.split('(')[0].trim()}"`);
  };

  return (
    <div>
      {editingBiller && (
        <EditBillerModal
          biller={editingBiller}
          onSave={() => { showToast(`Biller updated successfully`); setEditingBiller(null); }}
          onClose={() => setEditingBiller(null)}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Biller Management</h2>
        <span className="text-orange-500 font-bold">Bharat <span className="text-orange-700">Connect</span></span>
      </div>

      {/* Backdrop to close menu */}
      {openMenu && <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />}

      <div className="space-y-6">
        {filledCategories.map(cat => {
          const activeBillers = cat.savedBillers.filter(b => !deletedBillers.has(b));
          if (activeBillers.length === 0) return null;
          return (
            <div key={cat.name}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">{cat.name}</h3>
              <div className="flex flex-wrap gap-4">
                {activeBillers.map(biller => {
                  const menuKey = `${cat.name}:${biller}`;
                  return (
                    <div key={biller} className="relative">
                      <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 w-20">
                        <div className="relative w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center text-2xl hover:border-blue-300 transition-colors">
                          {cat.icon}
                          <button
                            onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === menuKey ? null : menuKey); }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 shadow-sm z-20"
                          >
                            <MoreVertical size={10} />
                          </button>
                        </div>
                        <span className="text-xs text-gray-600 text-center w-full truncate">{biller.split('(')[0].trim()}</span>
                        <span className="text-xs text-gray-400 text-center">{biller.match(/\(([^)]+)\)/)?.[1]}</span>
                      </div>

                      {openMenu === menuKey && (
                        <div className="absolute left-0 top-14 w-44 bg-white border border-gray-200 shadow-xl rounded-xl py-1 z-30">
                          <button
                            onClick={() => { setEditingBiller({ categoryName: cat.name, name: biller, icon: cat.icon }); setOpenMenu(null); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Edit size={13} className="text-blue-500" /> Edit Biller
                          </button>
                          <button
                            onClick={() => handleSetReminder(biller)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Bell size={13} className="text-yellow-500" /> Set Reminder
                          </button>
                          <div className="border-t border-gray-100 my-1" />
                          <button
                            onClick={() => handleDelete(biller)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 size={13} /> Remove Biller
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
