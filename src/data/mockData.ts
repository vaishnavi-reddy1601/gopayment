export const mockUser = {
  userId: 'AUSADMIN',
  password: 'Admin@123',
  name: 'AUS Admin',
  accountNumber: '000101000000008710',
  lastLogin: '26 May, 2026 | 12:12:12 | from IP 106.51.142.25',
  relationshipType: 'FLOATER',
  relationshipManager: {
    name: 'SARANRAJ G',
    mobile: '+91 95862900689',
    email: 'SARANRAJ.GNANAMURTHY@HDFCBANK.IN',
  },
};

export const mockLimitSummary = {
  creditLimit: '₹3,52,111.00',
  availableLimit: '₹20,60,88,021.00',
  openToBuy: '₹11,111.20',
  limitUtilized: '₹61,71,222.37',
  limitPercentageUtilized: '0.60%',
  relationshipType: 'FLOATER',
};

export const mockCards = {
  total: 111,
  totalBlocked: 7,
  temporaryBlocked: 0,
  permanentBlocked: 7,
};

export const mockDashboardStats = {
  subscriptionEndDate: '28 Apr, 2027 (337 days remaining)',
  totalCorporateUsers: { active: 36, inactive: 813 },
  paymentOverdue: 0,
  totalCards: { thirtyDays: 0, sixtyDays: '-', moreThanNinety: '-' },
};

export const mockRequestsReceived = [
  { id: 42859, submittedOn: '25 May, 2026', submittedBy: 'SANKET KURDHUNDKAR', category: 'Corporate User Modifications', subCategory: 'Corporate User Modifications - Single', status: 'Approved' },
  { id: 42858, submittedOn: '25 May, 2026', submittedBy: 'SANKET KURDHUNDKAR', category: 'Corporate User Modifications', subCategory: 'Corporate User Modifications - Single', status: 'Approved' },
  { id: 42845, submittedOn: '25 May, 2026', submittedBy: 'SARAN GIT', category: 'Updation of Credit Card Usage', subCategory: 'Updation of Credit Card Usage - Single', status: 'Pending' },
  { id: 42844, submittedOn: '25 May, 2026', submittedBy: 'SARAN GIT', category: 'Updation of Credit Card Usage', subCategory: 'Updation of Credit Card Usage - Single', status: 'Approved' },
  { id: 42843, submittedOn: '25 May, 2026', submittedBy: 'SARAN GIT', category: 'Updation of Credit Card Usage', subCategory: 'Updation of Credit Card Usage - Single', status: 'Pending' },
  { id: 42842, submittedOn: '25 May, 2026', submittedBy: 'SARAN GIT', category: 'Updation of Credit Card Usage', subCategory: 'Updation of Credit Card Usage - Single', status: 'Rejected' },
  { id: 42801, submittedOn: '24 May, 2026', submittedBy: 'VIKRANTH VARUN', category: 'Card Activation Request', subCategory: 'Card Activation Request - Single', status: 'Approved' },
  { id: 42790, submittedOn: '23 May, 2026', submittedBy: 'SARAN GIT', category: 'Create Virtual Card', subCategory: 'Create Virtual Card - Single', status: 'Rejected' },
];

export const mockRequestsRaised: typeof mockRequestsReceived = [];

export const mockCorporateRoles = [
  { name: 'AAM', users: 4, status: 'Active' },
  { name: 'ABCD', users: 7, status: 'Active' },
  { name: 'ABCDDEFAULT', users: 0, status: 'Disabled' },
  { name: 'ABHIE', users: 0, status: 'Active' },
  { name: 'ACCT', users: 0, status: 'Active' },
  { name: 'ADMIN', users: 4, status: 'Active' },
  { name: 'AUS', users: 51, status: 'Active' },
  { name: 'AUS COPY', users: 0, status: 'Active' },
  { name: 'AWSUATTEST', users: 0, status: 'Active' },
  { name: 'CORPORATE DEVELOPER', users: 0, status: 'Active' },
];

export const mockEmployeeRoles = [
  { name: 'EMPLOYEE', users: 23, status: 'Active' },
  { name: 'EMPLOYEE TEST ROLE', users: 1, status: 'Active' },
  { name: 'EMPLOYEENEWDEMO', users: 0, status: 'Disabled' },
  { name: 'EMPLOYEE_TEST', users: 2, status: 'Active' },
  { name: 'ROLE CREATED BY SA', users: 0, status: 'Active' },
];

export const mockCorporateUsers = [
  { srNo: 1, firstName: 'VIKRANTH', lastName: 'VARUN', mobile: '+91 8088875789', email: 'NAGENDRAPAVAN@YAHOO.COM', empCode: 'G00031', status: 'Disabled', role: 'MAKE' },
  { srNo: 2, firstName: 'SARAN', lastName: 'GIT', mobile: '+91 9876543210', email: 'SARAN.GIT@HDFCBANK.IN', empCode: 'G00045', status: 'Active', role: 'AUS' },
  { srNo: 3, firstName: 'SANKET', lastName: 'KURDHUNDKAR', mobile: '+91 9988776655', email: 'SANKET.K@YOPMAIL.COM', empCode: 'GO12321', status: 'Active', role: 'AUS' },
];

export const mockApprovalPolicies = [
  { functionality: 'Card Activation Request - Bulk', levels: 'Level 1', approverRole: ['AUS'] },
  { functionality: 'Card Activation Request - Single', levels: 'Level 1', approverRole: ['AUS'] },
  { functionality: 'Create Block Code', levels: 'Level 1', approverRole: ['AUS'] },
  { functionality: 'Create Travel Plan - Bulk', levels: 'Level 1', approverRole: ['AAM', 'AUS'] },
  { functionality: 'Create Virtual Card - Bulk', levels: 'Level 1', approverRole: ['AUS'] },
  { functionality: 'Create Virtual Card - Single', levels: 'Level 1', approverRole: ['AUS'] },
  { functionality: 'Create/ Update Travel Plan - Single', levels: 'Level 1', approverRole: ['AUS'] },
];

export const mockCards2 = [
  { cardNumber: '5566-20xx-xxxx-2432', customerName: 'Suresh Luther', altAcNo: '000101400000221830', cardLimit: '₹1,000.00', blockCode1: '', blockCode2: '', availableLimit: '₹1,000.00' },
  { cardNumber: '5566-20xx-xxxx-6938', customerName: 'Nanden Luther', altAcNo: '000101400000226334', cardLimit: '₹0.00', blockCode1: '', blockCode2: '', availableLimit: '₹0.00' },
  { cardNumber: '5566-20xx-xxxx-6530', customerName: 'Rohann Luther', altAcNo: '000101400000245938', cardLimit: '₹1,000,000.00', blockCode1: '', blockCode2: '', availableLimit: '₹1,000,000.00' },
  { cardNumber: '3608-87xx-xxxx-6458', customerName: 'Mr Harshal Manohar Ajalkar', altAcNo: '000101120000006453', cardLimit: '₹100.00', blockCode1: '', blockCode2: '', availableLimit: '₹-9,849.10' },
  { cardNumber: '5551-53xx-xxxx-1289', customerName: 'Sit Test Account803', altAcNo: '000101370000001286', cardLimit: '₹0.00', blockCode1: '', blockCode2: '', availableLimit: '₹7,546.05' },
];

export const mockVirtualCards = [
  { username: 'SANKETK', cardNumber: '-', status: 'Failed', amount: '₹5,000.00', createdDate: '22 Apr, 2026 at 3:27 PM', validForDays: 45, cardHolder: 'SIT TEST ACCOUNT803', cardNum: '5551-53XX->' },
  { username: 'SANKETK', cardNumber: '-', status: 'Failed', amount: '₹15,000.00', createdDate: '22 Apr, 2026 at 12:39 PM', validForDays: 45, cardHolder: 'SIT TEST ACCOUNT803', cardNum: '5551-53XX->' },
  { username: 'SARAN', cardNumber: '-', status: 'Failed', amount: '₹10.00', createdDate: '17 Feb, 2026 at 3:46 PM', validForDays: 5, cardHolder: 'MOHDNN LUTHER', cardNum: '5566-20XX->' },
  { username: 'SHAMRAGHAV', cardNumber: '-', status: 'Failed', amount: '₹100.00', createdDate: '14 Jan, 2026 at 3:26 PM', validForDays: 21, cardHolder: 'SIT TEST ACCOUNT803', cardNum: '5551-53XX->' },
];

export const mockVirtualCardUsers = [
  { id: 1658, username: 'SANKETK', email: 'SANKET.K@YOPMAIL.COM' },
  { id: 1657, username: 'VIRTUAL_CARD_USER_NAME_TEST_DOT123', email: 'TEST_EMAIL-ID123@TEST.COM' },
  { id: 1655, username: 'ANAGHATEST', email: 'ANAGHA.DHAKITE@GO.OOO' },
  { id: 1650, username: 'USER TS', email: 'RAGHAV@GMAIL0000000000000...' },
  { id: 1649, username: 'USER 001', email: 'USER0011@GMAIL.MMMMM...' },
  { id: 1646, username: 'SHAMRAGHAV', email: 'RAGHAV@GMAI.COM' },
];

export const mockCreditCardBills = [
  { cardNumber: '5551-53XX-XXXX-0612', customerName: 'SIT TEST ACCOUNT502', dueDate: '25/12/2021', status: 'Overdue', totalAmountDue: '₹1,124,865.32', minimumAmountDue: '₹1,124,885.32', mobile: '+91 9876518158' },
  { cardNumber: '3608-27XX-XXXX-1097', customerName: 'SIT TEST ACCOUNT190', dueDate: '19/12/2021', status: 'Overdue', totalAmountDue: '₹913,485.15', minimumAmountDue: '₹0.00', mobile: '+91 9000000000' },
  { cardNumber: '3608-27XX-XXXX-2122', customerName: 'SIT TEST ACCOUNT190', dueDate: '19/12/2021', status: 'Overdue', totalAmountDue: '₹726,631.06', minimumAmountDue: '₹726,631.06', mobile: '+91 822083974' },
  { cardNumber: '3608-27XX-XXXX-0859', customerName: 'PAY - S - DINER COMM', dueDate: '22/11/2021', status: 'Overdue', totalAmountDue: '₹737,984.38', minimumAmountDue: '₹737,984.38', mobile: '+91 9092832039' },
  { cardNumber: '3608-27XX-XXXX-2361', customerName: 'PAYMENTS', dueDate: '17/12/2021', status: 'Overdue', totalAmountDue: '₹195,046.96', minimumAmountDue: '₹195,046.96', mobile: '+91 9092832039' },
];

export const mockFAQs = [
  { id: 401, question: 'What is FAQ?', answer: 'Frequently asked questions.' },
  { id: 397, question: 'Virat is the best batsman', answer: 'Yes' },
  { id: 398, question: 'How do I block a credit card?', answer: 'Go to Card Details > Card Functionalities > Temporary Card Block or Permanent Card Block and follow the instructions.' },
  { id: 399, question: 'How do I create a virtual card?', answer: 'Navigate to Virtual Card Details > Create Virtual Card (Bulk) and upload the required CSV file.' },
  { id: 400, question: 'What is a Relationship Manager?', answer: 'A Relationship Manager is your dedicated HDFC Bank contact person who assists with corporate banking queries.' },
];

export const mockNotifications: { id: number; title: string; message: string; date: string; read: boolean }[] = [
  { id: 1, title: 'Request Approved', message: 'Your request #42859 for Corporate User Modifications has been approved.', date: '25 May, 2026 | 3:16 PM', read: false },
  { id: 2, title: 'Card Activation Pending', message: 'Card activation request #42801 is pending your approval.', date: '24 May, 2026 | 11:30 AM', read: false },
  { id: 3, title: 'New Request Received', message: 'SARAN GIT submitted a new request for Updation of Credit Card Usage.', date: '24 May, 2026 | 09:15 AM', read: false },
  { id: 4, title: 'Virtual Card Failed', message: 'Virtual card creation for user SANKETK has failed. Please retry.', date: '22 Apr, 2026 | 3:27 PM', read: true },
];

export const mockAuditTrail = [
  { date: '25-05-2026', user: 'SANKET KURDHUNDKAR', action: 'Corporate User Modification', description: 'Modified mobile number for user EMPCHECK', ipAddress: '192.168.1.45' },
  { date: '25-05-2026', user: 'SARAN GIT', action: 'Credit Card Usage Update', description: 'Updated credit card usage settings', ipAddress: '192.168.1.67' },
  { date: '24-05-2026', user: 'AUS Admin', action: 'Role Created', description: 'Created new corporate role AUS COPY', ipAddress: '192.168.1.10' },
];

export const mockPaymentTransactions = [
  { refNo: 'BBPS20260526001', date: '26-05-2026 12:30:15', customer: 'Srinivas', amount: '₹0.00', cardNumber: 'XXXXXXXXX0021', mobile: '8863008798', mode: '-', status: 'Fetching', category: 'Credit Card' },
  { refNo: 'BBPS20260525002', date: '25-05-2026 17:59:58', customer: 'Shrinivas', amount: '₹1.00', cardNumber: '-', mobile: '9150699902', mode: 'CC', status: 'Failed', category: 'Electricity' },
  { refNo: 'BBPS20260525003', date: '25-05-2026 17:46:29', customer: 'Shrinivas', amount: '₹1.00', cardNumber: '-', mobile: '9150699902', mode: 'CC', status: 'Failed', category: 'Electricity' },
];

export const mockBillerCategories = [
  { name: 'Broadband Postpad', icon: '📡', savedBillers: ['BroadBandPostPad_Dummy (₹500.00)'] },
  { name: 'DTH', icon: '📺', savedBillers: [] },
  { name: 'Electricity', icon: '⚡', savedBillers: ['Electricity_Dummy (₹70,700.00)'] },
  { name: 'Fastag', icon: '🚗', savedBillers: ['Dummy Biller Fastag (₹500.00)'] },
  { name: 'Insurance', icon: '🛡️', savedBillers: ['Dummy General Insurance (₹49,564.00)'] },
  { name: 'LPG Gas', icon: '🔥', savedBillers: [] },
  { name: 'Mobile', icon: '📱', savedBillers: [] },
  { name: 'Loan Repayment', icon: '🏦', savedBillers: [] },
];

export const permissions = {
  generalPermissions: [
    'Edit Notification Settings',
    'View Dashboard',
    'View Notification',
    'View My Request',
    'View Company Details',
    'View User Details',
  ],
  userAccessManagement: [
    'Disable Corporate Role',
    'View Corporate Users at a Relationship Level',
    'Create Corporate Roles',
    'Create Corporate User - Single',
    'Create Corporate User - Bulk',
    'Edit Corporate Approval Policy',
    'Edit Corporate Roles',
    'View Corporate Approval Policies',
    'View Corporate Roles',
    'Create Corporate Approval Policy',
    'Enable Corporate Role',
    'View Isac Dashboard',
    'View Employee Roles',
    'Enable Employee Roles',
    'Disable Employee Roles',
    'Create Employee Roles',
    'Corporate User Modifications - Single',
    'Corporate User Modifications - Bulk',
    'Edit Corporate User Status - Bulk',
    'Edit Corporate User Limit - Bulk',
  ],
  relationshipCardFunctionality: [
    'Temporary Card Block - Single',
    'Temporary Card Block - Bulk',
    'View Delinquent Cards',
    'View Pending Card Activation',
    'Credit Card Hotlist - Bulk',
    'Request New PIN',
    'Activate Cards Mapped to a Relationship - Bulk',
    'Download Past Statements',
    'Unblock Cards',
    'Credit Card Reissue - Bulk',
    'Download Delinquent Cards Report',
    'Credit Card Replacement - Bulk',
    'Credit Card Reissue - Single',
    'Updation of Credit Card Usage - Bulk',
    'Travel Plan Inquiry',
    'Create/ Update Travel Plan - Single',
    'View Virtual Card',
    'Edit Temporary Limit - Bulk',
    'Edit Permanent Limit - Bulk',
    'View Past Statements',
    'Email Past Statements',
    'View Card Details',
    'Activate Cards Mapped to a Relationship - Single',
    'View Unbilled Transactions',
    'View Unsettled Transactions',
    'Updation of Credit Card Usage - Single',
    'Permanent Card Block - Single',
    'Credit Card Hotlist - Single',
    'Credit Card Replacement - Single',
    'Edit Permanent Limit - Single',
    'Edit Temporary Limit - Single',
    'Create Travel Plan - Bulk',
    'Permanent Card Block - Bulk',
    'Create Virtual Card - Single',
    'Create Virtual Card - Bulk',
  ],
  virtualCardUser: ['Create Virtual Card User - Single', 'Create Virtual Card User - Bulk'],
  serviceRequests: ['View Service Requests', 'Create Service Request'],
  auditTrail: ['View Audit Trail', 'Generate Audit Trail Report'],
  reports: ['View Reports', 'Generate Reports', 'Download Reports'],
  billPayments: ['View Bill Payments', 'Make Bill Payments', 'Manage Billers'],
  faqs: ['View FAQs'],
  masters: ['View Masters', 'Edit Masters'],
};
