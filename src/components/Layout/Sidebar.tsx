import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Inbox, SendHorizontal, CreditCard, AlertCircle,
  Wallet, ShieldCheck, FileText, HelpCircle, Bell, ClipboardList, ChevronDown,
  ChevronRight, LogOut, Code2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
}

interface NavItemDef {
  label: string;
  icon: React.ReactNode;
  path?: string;
  badge?: number;
  children?: { label: string; path: string; children?: { label: string; path: string }[] }[];
}

const navItems: NavItemDef[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={16} />, path: '/dashboard' },
  {
    label: 'Corporate User Details', icon: <Users size={16} />,
    children: [
      {
        label: 'Roles & Permissions', path: '/corporate/roles',
        children: [
          { label: 'Employee Roles & Permissions', path: '/corporate/employee-roles' },
          { label: 'User List', path: '/corporate/user-list' },
          { label: 'Approval Policy', path: '/corporate/approval-policy' },
        ]
      },
    ]
  },
  { label: 'Requests Received', icon: <Inbox size={16} />, path: '/requests-received', badge: 3 },
  { label: 'Requests Raised', icon: <SendHorizontal size={16} />, path: '/requests-raised' },
  { label: 'Payment Overdue', icon: <AlertCircle size={16} />, path: '/payment-overdue' },
  {
    label: 'Card Details', icon: <CreditCard size={16} />,
    children: [
      { label: 'Card Relationship', path: '/card-details/relationship' },
      { label: 'Card Functionalities', path: '/card-details/functionalities' },
    ]
  },
  { label: 'Virtual Card Details', icon: <ShieldCheck size={16} />, path: '/virtual-card-details' },
  { label: 'Virtual Card User', icon: <Users size={16} />, path: '/virtual-card-user' },
  {
    label: 'Bill Payments', icon: <Wallet size={16} />,
    path: '/bill-payments',
    children: [
      { label: 'Bill Payments Home', path: '/bill-payments' },
      { label: 'Biller Categories', path: '/bill-payments/categories' },
      { label: 'Transaction History', path: '/bill-payments/transaction-history' },
      { label: 'Payment Details Report', path: '/bill-payments/payment-report' },
      { label: 'Biller Management', path: '/bill-payments/biller-management' },
      { label: 'Reminder Engine', path: '/bill-payments/reminder-engine' },
      { label: 'Raise Complaint', path: '/bill-payments/raise-complaint' },
      { label: 'Complaint Tracking', path: '/bill-payments/complaint-tracking' },
    ]
  },
  { label: 'Card Activation', icon: <CreditCard size={16} />, path: '/card-activation' },
  {
    label: 'Reports', icon: <FileText size={16} />,
    children: [
      { label: 'User Account Overview', path: '/reports/user-account-overview' },
      { label: 'Admin Actions Report', path: '/reports/admin-actions' },
      { label: 'Role Rights Report', path: '/reports/role-rights' },
      { label: 'Session Activities Report', path: '/reports/session-activities' },
      { label: 'Service Request Report', path: '/reports/service-requests' },
      { label: 'Transaction Details Report', path: '/reports/transaction-details' },
      { label: 'Virtual Card Report', path: '/reports/virtual-card' },
    ]
  },
  { label: 'FAQs', icon: <HelpCircle size={16} />, path: '/faqs' },
  { label: 'Notifications', icon: <Bell size={16} />, path: '/notifications', badge: 3 },
  { label: 'Audit Trail', icon: <ClipboardList size={16} />, path: '/audit-trail' },
  { label: 'Api Testing', icon: <Code2 size={16} />, path: '/api-testing' },
];

export default function Sidebar({ collapsed }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['Corporate User Details']));
  const [openSubSections, setOpenSubSections] = useState<Set<string>>(new Set());
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSection = (label: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const toggleSubSection = (label: string) => {
    setOpenSubSections(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-14' : 'w-60'} min-h-screen`}>
      {/* Logo */}
      <div className="h-14 flex items-center justify-center border-b border-gray-200 px-3 shrink-0">
        {collapsed ? (
          <span className="text-orange-500 font-extrabold text-lg">G</span>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-orange-500 font-extrabold text-lg">GO</span>
            <span className="text-blue-700 font-extrabold text-base">PAYMENTS</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map(item => {
          if (!item.children) {
            return (
              <NavLink
                key={item.label}
                to={item.path!}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="ml-auto bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          }

          const isOpen = openSections.has(item.label);
          return (
            <div key={item.label}>
              <button
                onClick={() => {
                  toggleSection(item.label);
                  if (item.path) navigate(item.path);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="truncate flex-1 text-left">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                        {item.badge}
                      </span>
                    )}
                    {isOpen ? <ChevronDown size={14} className="shrink-0" /> : <ChevronRight size={14} className="shrink-0" />}
                  </>
                )}
              </button>

              {isOpen && !collapsed && (
                <div className="bg-gray-50">
                  {item.children!.map(child => {
                    if (!child.children) {
                      return (
                        <NavLink
                          key={child.label}
                          to={child.path}
                          className={({ isActive }) =>
                            `flex items-center gap-2 pl-8 pr-3 py-1.5 text-xs transition-colors ${
                              isActive ? 'text-blue-700 font-semibold bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`
                          }
                        >
                          <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                          {child.label}
                        </NavLink>
                      );
                    }
                    const isSubOpen = openSubSections.has(child.label);
                    return (
                      <div key={child.label}>
                        <button
                          onClick={() => { toggleSubSection(child.label); navigate(child.path); }}
                          className="w-full flex items-center gap-2 pl-8 pr-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                          <span className="flex-1 text-left">{child.label}</span>
                          {isSubOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                        </button>
                        {isSubOpen && (
                          <div className="bg-gray-100">
                            {child.children!.map(sub => (
                              <NavLink
                                key={sub.label}
                                to={sub.path}
                                className={({ isActive }) =>
                                  `flex items-center gap-2 pl-12 pr-3 py-1.5 text-xs transition-colors ${
                                    isActive ? 'text-blue-700 font-semibold' : 'text-gray-500 hover:text-gray-800'
                                  }`
                                }
                              >
                                <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                                {sub.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-2 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
