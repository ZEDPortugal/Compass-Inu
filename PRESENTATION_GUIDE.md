# COMPASS INU - Complete System Presentation Guide

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [User Portal (Suki Members)](#user-portal-suki-members)
3. [Merchant Portal (MSME Partners)](#merchant-portal-msme-partners)
4. [Admin Portal (Platform Management)](#admin-portal-platform-management)
5. [Data Flow & Business Logic](#data-flow--business-logic)
6. [API Architecture](#api-architecture)

---

## 🌐 System Overview

**COMPASS INU** is a comprehensive loyalty points ecosystem designed to empower MSMEs (Micro, Small, and Medium Enterprises), students, cooperatives, and communities through a unified "Suki Points" system.

### Three User Roles:

| Role | Description | Theme Color |
|------|-------------|-------------|
| **User (Suki Member)** | End consumers who earn and redeem points | Purple (#8b5cf6) |
| **Merchant (MSME Partner)** | Businesses that issue points and create campaigns | Cyan (#06b6d4) |
| **Admin (Platform Manager)** | System administrators who oversee the ecosystem | Orange (#f59e0b) |

---

## 👤 User Portal (Suki Members)

The User Portal is designed for end consumers (called "Suki Members") who participate in the loyalty program. The interface uses a **purple/violet theme** to create a visually appealing experience.

### 1. Dashboard (`/user/dashboard`)

**What You See:**
- **Welcome Header**: Personalized greeting with user's name
- **Points Balance Card**: Large display showing current Suki Points balance (e.g., 3,250 pts)
- **Tier Status**: Shows current tier (Bronze → Silver → Gold → Platinum) with progress bar to next tier
- **Stats Grid**:
  - Total Points Earned (lifetime)
  - Current Tier
  - Number of Transactions
  - Rewards Redeemed
- **Recent Activity**: List of latest transactions (earned/redeemed)
- **Available Rewards**: Quick preview of rewards user can claim

**How It Works with Real Data:**
```
When a user logs in:
1. System fetches user profile from database (name, email, tier)
2. Calculates current points balance from transaction history
3. Retrieves last 4-5 transactions for activity feed
4. Fetches available rewards that user can afford
5. Calculates tier progress percentage
```

**Business Logic:**
- Points balance = Sum of all earned points - Sum of all redeemed points
- Tier calculation based on total lifetime points earned
- Progress bar shows percentage to next tier threshold

---

### 2. Rewards Catalog (`/user/rewards`)

**What You See:**
- **Search Bar**: Filter rewards by name or merchant
- **Category Filters**: All, Food & Beverage, Retail, Health & Fitness
- **Reward Cards Grid**: Each card shows:
  - Reward icon/image
  - Availability badge (Available/Unavailable)
  - Points cost
  - Reward name & merchant
  - Validity date
  - "Redeem" and "Details" buttons

**How It Works with Real Data:**
```
When viewing rewards:
1. API fetches all active rewards from merchants
2. Filters based on:
   - User's current points balance (can afford vs. cannot afford)
   - Category selection
   - Search query
3. Real-time availability check
4. Expiration date validation
```

**Redemption Flow:**
1. User clicks "Redeem" → Confirmation modal appears
2. Shows: Current balance, Cost, New balance after redemption
3. User confirms → API deducts points → Generates redemption code
4. Success notification → Email/SMS sent with voucher details

---

### 3. Scan to Earn (`/user/scan`)

**What You See:**
- **QR Scanner**: Camera view with scanning frame
- **Manual Code Entry**: Input field for 6-digit codes
- **How It Works Section**: Step-by-step guide (Make Purchase → Scan QR → Earn Points)
- **Recent Scans**: History of recent scanning activities

**How It Works with Real Data:**
```
Scanning Flow:
1. User makes purchase at partner MSME
2. Merchant generates QR code for transaction
3. User scans QR code OR enters manual code
4. System validates:
   - QR/Code authenticity
   - Transaction not already claimed
   - Merchant is active partner
5. Points calculated: Transaction Amount × Point Rate
6. Points credited instantly
7. On-chain record created for transparency
```

**Modal Display After Scan:**
- Merchant name and logo
- Transaction amount (₱450)
- Points to earn (90 pts based on ₱5 = 1 point ratio)
- Merchant tier badge (Gold Partner)

---

### 4. Transaction History (`/user/transactions`)

**What You See:**
- **On-Chain Ledger Banner**: Emphasizes blockchain transparency
- **Stats Cards**:
  - Suki Points Earned (total)
  - Points This Month
  - On-Chain Transactions count
- **Filter Tabs**: All, Earn, Redeem, Transfer
- **Transaction List**: Each entry shows:
  - Merchant name
  - Amount spent
  - Points earned/deducted
  - Date
  - **Transaction Hash** (blockchain reference)
  - "View on Explorer" link

**On-Chain Integrity Feature:**
```
Every transaction creates a blockchain record:
- Transaction hash: 0x7a8b9c1d2e3f4a5b...
- Block number: 18234567
- Immutable, verifiable record
- Prevents double-spending or lost points
```

---

### 5. Redeem Points (`/user/redeem`)

**What You See:**
- **Balance Display**: Current Suki Points with wallet icon
- **Available Rewards Count**: Number of rewards user can afford
- **Reward Grid**: Cards with affordability indicators
  - Green "Available" badge = User has enough points
  - Red "Insufficient" badge = Not enough points

**Redemption Business Logic:**
```javascript
canAfford = userPoints >= reward.pointsCost
// If true: Enable redemption button
// If false: Disable button, show "Insufficient" badge
```

---

### 6. Gift Points (`/user/gift`)

**What You See:**
- **Balance Card**: Available points to gift
- **Recipient Input**: Phone number OR email toggle
- **Amount Input**: Manual entry + Quick amount buttons (100, 250, 500, 1000)
- **Personal Message**: Optional message field
- **Recent Recipients**: Previously sent contacts for quick resend

**How It Works (OFW Remittance Style):**
```
Gift Transfer Flow:
1. User enters recipient's phone/email
2. Selects amount (max = current balance)
3. Adds optional message
4. Confirms transfer
5. System:
   - Deducts points from sender
   - Creates pending transfer if recipient not registered
   - OR credits directly if recipient exists
6. Recipient gets SMS/Email notification
7. Points claimable via link or automatic if registered
```

---

### 7. Borrow/Everyday Points (`/user/borrow`)

**What You See:**
- **Credit Score Circle**: Visual gauge (0-850 scale)
- **Credit Tier**: Bronze → Silver → Gold → Platinum
- **Stats Grid**:
  - Everyday Points balance
  - Repayment Streak (bi-weekly)
  - On-Time Payment Rate
- **Proof Certificate**: Generate creditworthiness document
- **Repayment History**: Past payments with bonus points earned

**Business Logic:**
```
Credit Building System:
- Users borrow small amounts (micro-loans)
- Bi-weekly repayment schedule
- Each on-time payment:
  - Earns 50 "Everyday Points"
  - Extends repayment streak
  - Increases credit score
- Full loan repayment = 500 bonus points
- Better credit tier = Lower interest rates from partner lenders
```

**Platinum Benefits:**
- Free 1-on-1 financial consultations
- Up to 2% lower interest rates
- Priority loan processing
- Exclusive Platinum-only rewards

---

### 8. Other User Pages

| Page | Purpose |
|------|---------|
| `/user/catalog` | Browse all partner merchants and their offers |
| `/user/community` | Social features, challenges, leaderboards |
| `/user/learn` | Financial literacy content |
| `/user/profile` | Account settings, preferences |
| `/user/history` | Extended transaction history |

---

## 🏪 Merchant Portal (MSME Partners)

The Merchant Portal is designed for business owners (MSMEs, cooperatives) to manage their loyalty programs. Uses a **cyan/teal theme**.

### 1. Dashboard (`/merchant/dashboard`)

**What You See:**
- **Business Header**: "Suki Points Dashboard" with welcome message
- **Quick Action**: "New Campaign" button
- **Stats Grid**:
  - Total Revenue ($12,450)
  - Points Issued (45,200)
  - Active Members (2,456)
  - Redemptions (234)
- **Recent Redemptions Panel**: Customer redemption requests with status
- **Active Campaigns Panel**: Running promotions with enrollment counts

**How Real Data Flows:**
```
Merchant Dashboard Data:
1. System aggregates all transactions for this merchant
2. Calculates:
   - Revenue = Sum of all transaction amounts
   - Points Issued = Sum of all points given
   - Active Members = Unique customers last 30 days
   - Redemptions = Vouchers/rewards claimed
3. Trend percentages calculated vs. previous period
4. Real-time redemption queue for pending approvals
```

---

### 2. Campaigns (`/merchant/campaigns`)

**What You See:**
- **Stats Bar**: Total campaigns, Active, Redemptions, Pending
- **Filter Tabs**: All, Live, Pending, Draft
- **Campaign List**: Each campaign shows:
  - Campaign name & type (Multiplier, Discount, Bonus)
  - Status badge (Live/Pending/Draft/Scheduled)
  - Date range
  - Enrolled customers count
  - View/Edit actions

**Campaign Types:**
| Type | Description | Example |
|------|-------------|---------|
| **Multiplier** | 2x, 3x points on purchases | Double Points Weekend |
| **Discount** | Direct discounts on redemption | 20% Off |
| **Bonus** | Extra points for specific actions | 500 Bonus Points on ₱1000 spend |
| **Reward** | Special item/service giveaway | Free Coffee |

**How Campaign Creation Works:**
```
1. Merchant sets:
   - Name & description
   - Type (multiplier/discount/bonus)
   - Date range (start → end)
   - Budget limit
   - Target audience (all/tier-specific)
2. Campaign goes to "Pending" for admin approval (optional)
3. Once approved → Goes "Live" automatically on start date
4. Customers see it in app → Enroll/participate
5. System tracks: Enrollments, Redemptions, Budget spent
```

---

### 3. Redemptions (`/merchant/redemptions`)

**What You See:**
- **Stats**: Total redemptions, Approved, Pending, Points Used
- **Filter Tabs**: All, Approved, Pending, Rejected
- **Redemption Table**:
  - Customer name
  - Reward claimed
  - Points spent
  - Status (Approved ✓, Pending ⏳, Rejected ✗)
  - Date
  - Actions (View, Approve, Reject)

**Redemption Workflow:**
```
1. Customer redeems reward via app
2. Creates pending redemption record
3. Merchant sees in "Pending" queue
4. Merchant options:
   - APPROVE: Customer can use voucher
   - REJECT: Points refunded to customer
5. Customer presents code at store
6. Merchant marks as "Used" after service
```

---

### 4. Customers/Suki Members (`/merchant/customers`)

**What You See:**
- **Stats**: Total members, Platinum count, Average points, Total visits
- **Tier Filters**: All, Bronze, Silver, Gold, Platinum
- **Customer Cards**: Each shows:
  - Name & email
  - Tier badge
  - Points balance
  - Total spent
  - Number of visits
  - Join date
  - Quick actions (View profile, Send message)

**Customer Segmentation Logic:**
```
Tier Assignment (merchant's own customers):
- Bronze: 0-999 lifetime points
- Silver: 1,000-4,999 points
- Gold: 5,000-9,999 points
- Platinum: 10,000+ points

Merchant can filter to:
- Target high-value customers (Platinum) for exclusive offers
- Re-engage inactive customers
- Send personalized promotions
```

---

### 5. Analytics (`/merchant/analytics`)

**What You See:**
- Revenue charts (daily/weekly/monthly)
- Points issuance vs. redemption trends
- Customer acquisition funnel
- Campaign performance comparison
- Peak hours heatmap

---

### 6. Other Merchant Pages

| Page | Purpose |
|------|---------|
| `/merchant/campaigns/new` | Create new campaign form |
| `/merchant/settings` | Business profile, payment settings |

---

## 🔧 Admin Portal (Platform Management)

The Admin Portal provides complete oversight of the COMPASS INU ecosystem. Uses an **orange/amber theme**.

### 1. Dashboard (`/admin/dashboard`)

**What You See:**
- **Header**: "Compass INU Ecosystem" with real-time clock
- **Stats Grid**:
  - Suki Members: 12,458 (+12.5%)
  - Partner MSMEs: 534 (+8.3%)
  - Transactions: 89,234 (+23.1%)
  - Suki Points Issued: 4,567,890 (+15.7%)
- **Quick Actions Panel**:
  - Approve MSMEs (23 pending)
  - Review Reports (12)
  - Member Support (8 tickets)
  - System Alerts (3)
- **Live Activity Feed**: Real-time stream of platform activities

**Admin Dashboard Data Flow:**
```
System aggregates:
1. User table → Total registrations, active users
2. Merchant table → Total partners, pending approvals
3. Transaction table → Volume, amounts, points
4. Alerts table → System warnings, fraud flags

Updates every few seconds via real-time subscription
```

---

### 2. Merchant Management (`/admin/merchants`)

**What You See:**
- **Stats**: Total MSMEs, Active, Pending Approval, Total Redemptions
- **Search Bar**: Find merchants by name/category
- **Filter Tabs**: All, Active, Pending, Suspended
- **Merchant Grid Cards**: Each shows:
  - Business name & category icon
  - Status badge
  - Campaign count
  - Total redemptions
  - Rating
  - Join date

**Merchant Approval Workflow:**
```
1. MSME applies via /auth/merchant/signup
2. Status = "Pending" → Appears in admin queue
3. Admin reviews:
   - Business documents
   - Category verification
   - Terms acceptance
4. Admin actions:
   - APPROVE → Status = "Active", merchant can operate
   - REJECT → Application declined, reason sent
   - SUSPEND → Active merchant temporarily disabled
5. Merchant notified via email
```

**Merchant Detail Modal:**
- Full business profile
- Performance metrics
- Campaign history
- Customer complaints
- Action buttons: Approve, Suspend, View Details

---

### 3. User Management (`/admin/users`)

**What You See:**
- **Stats Grid**:
  - Suki Members (total)
  - Active
  - Flagged (suspicious activity)
  - Suspended
  - Total Points Issued
- **Filter Tabs**: All, Active, Flagged, Suspended
- **User Table**:
  - Avatar & name
  - Email & phone
  - Points balance
  - Status
  - Action buttons

**User Status Types:**
| Status | Meaning | Admin Actions |
|--------|---------|---------------|
| Active | Normal user | View, Flag, Suspend |
| Flagged | Under review for suspicious activity | Investigate, Clear, Suspend |
| Suspended | Account disabled | View, Restore |

**Flagging Logic:**
```
Auto-flag triggers:
- Unusual transaction patterns
- Multiple failed redemptions
- Rapid point accumulation
- Geographic anomalies

Admin can:
- Review transaction history
- Contact user
- Clear flag (false positive)
- Suspend account (confirmed fraud)
```

---

### 4. Campaign Oversight (`/admin/campaigns`)

**What You See:**
- **Stats**: Total Campaigns, Active, Scheduled, Budget totals
- **Filter Tabs**: All, Active, Scheduled, Completed, + Type filters
- **Campaign List**: Each shows:
  - Campaign name with status/type badges
  - Merchant name
  - Date range
  - Participants & Redemptions
  - Budget progress bar (spent/total)

**Admin Campaign Actions:**
- View performance details
- Pause problematic campaigns
- Resume paused campaigns
- End campaigns early
- Create platform-wide campaigns

---

### 5. Monitoring (`/admin/monitoring`)

**What You See:**
- System health metrics
- API latency graphs
- Error rate monitoring
- Active connections
- Queue status
- Fraud detection alerts

---

### 6. Settings (`/admin/settings`)

**What You See:**
- Platform configuration
- Points exchange rates
- Tier thresholds
- Email/SMS templates
- Integration settings

---

## 🔄 Data Flow & Business Logic

### Complete Transaction Flow (Earning Points)

```
User Journey:
1. User shops at partner MSME (e.g., Urban Café)
2. Pays ₱450 for purchase
3. Merchant generates QR code with transaction details
4. User scans QR in COMPASS INU app

Backend Process:
5. API validates QR payload:
   - Merchant ID is active
   - Transaction amount matches
   - Not a duplicate scan
6. Calculates points: ₱450 × 0.2 (20% rate) = 90 points
7. Creates transaction record:
   {
     user_id: "user_123",
     merchant_id: "merchant_456",
     type: "earn",
     amount: 450,
     points: 90,
     tx_hash: "0x7a8b...",
     created_at: "2026-01-04T10:30:00Z"
   }
8. Updates user balance: 3250 + 90 = 3340 points
9. Updates merchant stats: points_issued += 90
10. Broadcasts to blockchain for immutable record
11. Sends push notification to user

Result:
- User sees "+90 pts" notification
- Dashboard updates instantly
- Transaction appears in history with blockchain hash
```

### Complete Redemption Flow

```
User Journey:
1. User browses rewards, selects "20% Off at Urban Café" (500 pts)
2. Confirms redemption in modal
3. Receives unique voucher code

Backend Process:
4. API validates:
   - User has 500+ points available
   - Reward is still active
   - User hasn't exceeded redemption limits
5. Deducts points: 3340 - 500 = 2840 points
6. Creates redemption record:
   {
     user_id: "user_123",
     merchant_id: "merchant_456",
     reward_id: "reward_001",
     points_spent: 500,
     voucher_code: "SUKI-ABC123",
     status: "pending",
     expires_at: "2026-01-11T23:59:59Z"
   }
7. Notifies merchant of pending redemption
8. Sends voucher to user via email/SMS

At Store:
9. User shows voucher code at Urban Café
10. Staff enters code in merchant portal
11. System marks redemption as "used"
12. Discount applied to purchase
```

### Tier Progression Logic

```javascript
// Tier thresholds (lifetime earned points)
const TIERS = {
  Bronze:   { min: 0,     max: 2499,  multiplier: 1.0 },
  Silver:   { min: 2500,  max: 4999,  multiplier: 1.1 },
  Gold:     { min: 5000,  max: 9999,  multiplier: 1.25 },
  Platinum: { min: 10000, max: Infinity, multiplier: 1.5 }
};

// On each transaction:
function updateUserTier(user, newPoints) {
  user.lifetimeEarned += newPoints;
  
  for (const [tierName, tier] of Object.entries(TIERS)) {
    if (user.lifetimeEarned >= tier.min && user.lifetimeEarned <= tier.max) {
      user.tier = tierName;
      user.pointMultiplier = tier.multiplier;
      break;
    }
  }
  
  // Calculate progress to next tier
  const currentTier = TIERS[user.tier];
  const nextTier = getNextTier(user.tier);
  user.tierProgress = (user.lifetimeEarned - currentTier.min) / (nextTier.min - currentTier.min);
}
```

---

## 🔌 API Architecture

### User APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/user/dashboard` | GET | Fetch user stats, recent transactions, available rewards |
| `/api/user/rewards` | GET | List all available rewards |
| `/api/user/transactions` | GET | Transaction history with filters |
| `/api/user/rewards` | POST | Redeem a reward |

### Merchant APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/merchant/dashboard` | GET | Business stats, pending redemptions |
| `/api/merchant/campaigns` | GET/POST | List/create campaigns |
| `/api/merchant/redemptions` | GET/PUT | Manage redemption requests |

### Admin APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/dashboard` | GET | Platform-wide statistics |
| `/api/admin/merchants` | GET/PUT | List merchants, approve/suspend |
| `/api/admin/users` | GET/PUT | Manage user accounts |

### Authentication APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | Email/password login |
| `/api/auth/signup` | POST | User registration |
| `/api/auth/merchant/signup` | POST | Merchant application |
| `/api/auth/google` | POST | Google OAuth |
| `/api/auth/verify-otp` | POST | Phone verification |

---

## 🎯 Key Differentiators

1. **On-Chain Transparency**: Every transaction has a blockchain hash for auditability
2. **Tier System**: Gamified progression encourages continued engagement
3. **OFW-Style Gifting**: Send points to family like remittances
4. **Credit Building**: Everyday Points system helps users build credit history
5. **MSME Focus**: Designed specifically for small businesses in the Philippines
6. **Proof Certificates**: Generate creditworthiness documents for loan applications

---

## 📱 Visual Design Notes

- **Dark Theme**: #0f0a1a background for modern feel
- **Animated Particles**: Floating particles for visual interest
- **Gradient Accents**: Role-specific gradient colors
- **Smooth Animations**: fadeInUp, fadeInDown effects
- **Responsive Design**: Works on mobile, tablet, desktop
- **Glass Morphism**: Semi-transparent cards with backdrop blur

---

## 🚀 Demo Flow Suggestion

1. **Start as User**: Show dashboard, scan QR, earn points, redeem reward
2. **Switch to Merchant**: Show how business sees the redemption, creates campaigns
3. **Switch to Admin**: Show platform oversight, approve a merchant, view analytics
4. **Highlight**: On-chain transaction hash, tier progression, gift transfer

---

*This documentation covers the complete COMPASS INU loyalty ecosystem for presentation purposes.*
