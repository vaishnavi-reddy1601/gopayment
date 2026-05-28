import { useState } from 'react';
import { ChevronDown, Bell, CheckCheck, X } from 'lucide-react';
import { mockNotifications } from '../data/mockData';
import { useToast } from '../context/ToastContext';

type Tab = 'All' | 'Unread' | 'Read';
type Notification = typeof mockNotifications[0];

export default function Notifications() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showDateFilter, setShowDateFilter] = useState(false);

  const filtered = notifications.filter(n => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Read') return n.read;
    return true;
  });

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = (checked: boolean) => {
    setSelected(checked ? new Set(filtered.map(n => n.id)) : new Set());
  };

  const markRead = () => {
    setNotifications(prev => prev.map(n =>
      selected.has(n.id) ? { ...n, read: true } : n
    ));
    showToast(`${selected.size} notification(s) marked as read`);
    setSelected(new Set());
  };

  const markUnread = () => {
    setNotifications(prev => prev.map(n =>
      selected.has(n.id) ? { ...n, read: false } : n
    ));
    showToast(`${selected.size} notification(s) marked as unread`);
    setSelected(new Set());
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selected.has(n.id)));
    showToast(`${selected.size} notification(s) deleted`, 'error');
    setSelected(new Set());
  };

  const deleteSingle = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast('Notification deleted');
  };

  const markSingleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;
  const allSelected = filtered.length > 0 && selected.size === filtered.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title mb-0">Notifications</h1>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="btn-secondary flex items-center gap-1 text-xs"
            >
              Filter By Date <ChevronDown size={12} />
            </button>
            {showDateFilter && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDateFilter(false)} />
                <div className="absolute right-0 top-9 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">
                  <div className="flex flex-col gap-2">
                    <input type="date" className="input-field text-xs" />
                    <input type="date" className="input-field text-xs" />
                    <button onClick={() => setShowDateFilter(false)} className="btn-primary text-xs">Apply Filter</button>
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={markUnread}
            disabled={selected.size === 0}
            className="btn-secondary text-xs disabled:opacity-40"
          >
            Mark as Unread
          </button>
          <button
            onClick={deleteSelected}
            disabled={selected.size === 0}
            className="btn-secondary text-xs text-red-600 hover:bg-red-50 disabled:opacity-40"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="card p-4 mb-4 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={e => selectAll(e.target.checked)}
            className="rounded accent-blue-600"
          />
          Select All
          {selected.size > 0 && (
            <span className="text-blue-600 font-medium ml-1">({selected.size} selected)</span>
          )}
        </label>
        {selected.size > 0 && (
          <button
            onClick={markRead}
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            <CheckCheck size={12} /> Mark as Read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {([
          { tab: 'All', count: notifications.length },
          { tab: 'Unread', count: unreadCount },
          { tab: 'Read', count: readCount },
        ] as const).map(({ tab, count }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as Tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            <span className={`text-xs rounded-full px-1.5 ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-center text-gray-400">
          <Bell size={40} className="text-gray-200 mb-3" />
          <p className="text-sm font-medium">No Notifications Found</p>
          <p className="text-xs mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(n => (
            <div
              key={n.id}
              className={`card p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-gray-50 ${!n.read ? 'border-l-4 border-l-blue-500' : ''}`}
              onClick={() => markSingleRead(n.id)}
            >
              <input
                type="checkbox"
                checked={selected.has(n.id)}
                onChange={() => toggleSelect(n.id)}
                onClick={e => e.stopPropagation()}
                className="mt-0.5 rounded accent-blue-600 shrink-0"
              />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!n.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Bell size={14} className={!n.read ? 'text-blue-600' : 'text-gray-400'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm font-medium ${!n.read ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{n.message}</p>
                <p className="text-[11px] text-gray-400 mt-1">{n.date}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); deleteSingle(n.id); }}
                className="shrink-0 p-1 text-gray-300 hover:text-red-500 rounded transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
