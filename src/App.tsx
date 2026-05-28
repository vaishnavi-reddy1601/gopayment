import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RolesPermissions from './pages/corporate/RolesPermissions';
import CreateRole from './pages/corporate/CreateRole';
import EmployeeRoles from './pages/corporate/EmployeeRoles';
import UserList from './pages/corporate/UserList';
import CreateUser from './pages/corporate/CreateUser';
import ApprovalPolicy from './pages/corporate/ApprovalPolicy';
import RequestsReceived from './pages/requests/RequestsReceived';
import RequestDetail from './pages/requests/RequestDetail';
import RequestsRaised from './pages/requests/RequestsRaised';
import PaymentOverdue from './pages/cards/PaymentOverdue';
import CardRelationship from './pages/cards/CardRelationship';
import CardFunctionalities from './pages/cards/CardFunctionalities';
import VirtualCardDetails from './pages/cards/VirtualCardDetails';
import VirtualCardUser from './pages/cards/VirtualCardUser';
import CardActivation from './pages/cards/CardActivation';
import BillPayments from './pages/bills/BillPayments';
import BillerCategories from './pages/bills/BillerCategories';
import RaiseComplaint from './pages/bills/RaiseComplaint';
import ComplaintTracking from './pages/bills/ComplaintTracking';
import TransactionHistory from './pages/bills/TransactionHistory';
import PaymentDetailsReport from './pages/bills/PaymentDetailsReport';
import BillerManagement from './pages/bills/BillerManagement';
import ReminderEngine from './pages/bills/ReminderEngine';
import ReportPage from './pages/reports/ReportPage';
import FAQs from './pages/FAQs';
import Notifications from './pages/Notifications';
import AuditTrail from './pages/AuditTrail';
import ApiTesting from './pages/ApiTesting';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Corporate User Details */}
        <Route path="corporate/roles" element={<RolesPermissions />} />
        <Route path="corporate/roles/create" element={<CreateRole />} />
        <Route path="corporate/roles/edit/:name" element={<CreateRole />} />
        <Route path="corporate/roles/copy/:name" element={<CreateRole />} />
        <Route path="corporate/employee-roles" element={<EmployeeRoles />} />
        <Route path="corporate/employee-roles/create" element={<CreateRole isEmployee />} />
        <Route path="corporate/employee-roles/edit/:name" element={<CreateRole isEmployee />} />
        <Route path="corporate/user-list" element={<UserList />} />
        <Route path="corporate/user-list/create" element={<CreateUser />} />
        <Route path="corporate/approval-policy" element={<ApprovalPolicy />} />
        <Route path="corporate/approval-policy/edit" element={<ApprovalPolicy />} />

        {/* Requests */}
        <Route path="requests-received" element={<RequestsReceived />} />
        <Route path="requests-received/:id" element={<RequestDetail />} />
        <Route path="requests-raised" element={<RequestsRaised />} />

        {/* Cards */}
        <Route path="payment-overdue" element={<PaymentOverdue />} />
        <Route path="card-details/relationship" element={<CardRelationship />} />
        <Route path="card-details/functionalities" element={<CardFunctionalities />} />
        <Route path="virtual-card-details" element={<VirtualCardDetails />} />
        <Route path="virtual-card-user" element={<VirtualCardUser />} />
        <Route path="card-activation" element={<CardActivation />} />

        {/* Bill Payments */}
        <Route path="bill-payments" element={<BillPayments />} />
        <Route path="bill-payments/categories" element={<BillerCategories />} />
        <Route path="bill-payments/raise-complaint" element={<RaiseComplaint />} />
        <Route path="bill-payments/complaint-tracking" element={<ComplaintTracking />} />
        <Route path="bill-payments/transaction-history" element={<TransactionHistory />} />
        <Route path="bill-payments/payment-report" element={<PaymentDetailsReport />} />
        <Route path="bill-payments/biller-management" element={<BillerManagement />} />
        <Route path="bill-payments/reminder-engine" element={<ReminderEngine />} />

        {/* Reports */}
        <Route path="reports/user-account-overview" element={<ReportPage title="User Account Overview Report" hasDateRange={false} />} />
        <Route path="reports/admin-actions" element={<ReportPage title="Admin Actions Report" />} />
        <Route path="reports/role-rights" element={<ReportPage title="Role Rights Report" hasDateRange={false} />} />
        <Route path="reports/session-activities" element={<ReportPage title="Session Activities Report" />} />
        <Route path="reports/service-requests" element={<ReportPage title="Service Request Report" />} />
        <Route path="reports/transaction-details" element={<ReportPage title="Transaction Details Report" />} />
        <Route path="reports/virtual-card" element={<ReportPage title="Virtual Card Report" />} />

        {/* Misc */}
        <Route path="faqs" element={<FAQs />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="audit-trail" element={<AuditTrail />} />
        <Route path="api-testing" element={<ApiTesting />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
