import { useState } from 'react';
import { Bell, ChevronDown, Menu, User, LogOut, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockNotifications } from '../../data/mockData';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
      <button
        onClick={onToggleSidebar}
        className="text-gray-500 hover:text-gray-700 p-1 rounded"
      >
        <Menu size={20} />
      </button>

      {/* Audit Trail link */}
      <button
        onClick={() => navigate('/audit-trail')}
        className="text-blue-600 text-sm font-medium hover:text-blue-700 ml-2 flex items-center gap-1.5"
      >
        <ClipboardList size={14} />
        Audit Trail
      </button>

      <div className="flex-1" />

      {/* Account info */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <div className="text-xs text-gray-500">Acc Boarding</div>
          <div className="text-xs font-medium text-gray-700">{user?.accountNumber}</div>
        </div>

        <button
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <ChevronDown size={14} />
        </button>

        {/* Notifications bell */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative text-gray-500 hover:text-gray-700 p-1"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-medium"
          >
            <User size={16} />
          </button>

          {showDropdown && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 top-10 w-52 bg-white shadow-xl rounded-xl border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-semibold text-gray-800">{user?.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{user?.userId}</div>
                  <div className="text-[11px] text-gray-400 mt-1 truncate">{user?.accountNumber}</div>
                </div>
                <button
                  onClick={() => { setShowDropdown(false); navigate('/audit-trail'); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <ClipboardList size={14} className="text-gray-400" />
                  Audit Trail
                </button>
                <button
                  onClick={() => { setShowDropdown(false); navigate('/notifications'); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Bell size={14} className="text-gray-400" />
                  Notifications
                </button>
                <div className="border-t border-gray-100 mt-1" />
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
