// Application Constants

export const USER_ROLES = {
  USER: 'user',
  MERCHANT: 'merchant',
  ADMIN: 'admin',
};

export const MERCHANT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
};

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  VALIDATED: 'validated',
  REJECTED: 'rejected',
};

export const REDEMPTION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  DENIED: 'denied',
};

export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  LIVE: 'live',
  PAUSED: 'paused',
  ENDED: 'ended',
};

export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const LEDGER_ENTRY_TYPES = {
  EARN: 'earn',
  REDEEM: 'redeem',
  ADJUSTMENT: 'adjustment',
  EXPIRY: 'expiry',
};

export const NOTIFICATION_TYPES = {
  TRANSACTION: 'transaction',
  REWARD: 'reward',
  CAMPAIGN: 'campaign',
  SYSTEM: 'system',
  ALERT: 'alert',
};

export const NAV_ITEMS = {
  user: [
    { label: 'Dashboard', href: '/user/dashboard', icon: 'home' },
    { label: 'My Rewards', href: '/user/rewards', icon: 'gift' },
    { label: 'Transactions', href: '/user/transactions', icon: 'receipt' },
    { label: 'Redeem Points', href: '/user/redeem', icon: 'exchange' },
    { label: 'History', href: '/user/history', icon: 'clock' },
    { label: 'Profile', href: '/user/profile', icon: 'user' },
  ],
  merchant: [
    { label: 'Dashboard', href: '/merchant/dashboard', icon: 'home' },
    { label: 'Campaigns', href: '/merchant/campaigns', icon: 'megaphone' },
    { label: 'Redemptions', href: '/merchant/redemptions', icon: 'exchange' },
    { label: 'Analytics', href: '/merchant/analytics', icon: 'chart' },
    { label: 'Customers', href: '/merchant/customers', icon: 'users' },
    { label: 'Settings', href: '/merchant/settings', icon: 'settings' },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'home' },
    { label: 'Merchants', href: '/admin/merchants', icon: 'store' },
    { label: 'Users', href: '/admin/users', icon: 'users' },
    { label: 'Campaigns', href: '/admin/campaigns', icon: 'megaphone' },
    { label: 'Monitoring', href: '/admin/monitoring', icon: 'shield' },
    { label: 'Analytics', href: '/admin/analytics', icon: 'chart' },
    { label: 'Settings', href: '/admin/settings', icon: 'settings' },
  ],
};
