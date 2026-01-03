# COMPASS INU - Complete Platform Documentation

**Version:** 1.0.0  
**Last Updated:** January 4, 2026  
**Repository:** ZEDPortugal/Compass-Inu

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [The Three Pillars](#the-three-pillars)
4. [User Portal](#user-portal)
5. [Merchant Portal](#merchant-portal)
6. [Admin Portal](#admin-portal)
7. [API Routes](#api-routes)
8. [Components](#components)
9. [Authentication](#authentication)
10. [Tokenomics](#tokenomics)
11. [Roadmap](#roadmap)
12. [Technical Stack](#technical-stack)
13. [File Structure](#file-structure)

---

## Overview

COMPASS INU is a blockchain-based rewards ecosystem designed for MSMEs (Micro, Small, and Medium Enterprises), students, and cooperatives. The platform unifies three core use cases into one interoperable rewards token:

- **Digital Library** - Earn rewards for learning Web3 concepts
- **Suki Points** - Loyalty rewards for purchases at partner merchants  
- **Everyday Points** - Responsible lending rewards

### Key Value Propositions

| Stakeholder | Benefit |
|-------------|---------|
| **Users** | Earn points through shopping, learning, and responsible borrowing |
| **Merchants** | Affordable loyalty program with self-serve signup |
| **Authors** | Earn Author Attention Rewards for creating educational content |
| **Lenders** | Incentivize responsible repayment behavior |

---

## Architecture

```
compass_inu/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.js             # Landing page
│   │   ├── layout.js           # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── providers.js        # Context providers
│   │   ├── admin/              # Admin portal pages
│   │   ├── merchant/           # Merchant portal pages
│   │   ├── user/               # User portal pages
│   │   ├── auth/               # Authentication pages
│   │   └── api/                # API routes
│   ├── components/             # Reusable components
│   │   ├── ui/                 # UI primitives
│   │   ├── layout/             # Layout components
│   │   └── three/              # 3D visualizations
│   ├── context/                # React Context providers
│   └── lib/                    # Utilities and constants
├── public/                     # Static assets
└── Configuration files
```

---

## The Three Pillars

### Pillar 1: Digital Library (Education)

**Purpose:** A Web3 knowledge hub where users earn points for reading and creating content.

**Features:**
- Curated learning tracks with badges
- Reader engagement rewards based on verified read time and scroll depth
- Author Attention Rewards for content creators
- Level progression system (Explorer → Scholar → Expert)
- 7-day streak bonuses

**Location:** `/user/learn`

**Points Structure:**
| Action | Points |
|--------|--------|
| Read article | 25-50 pts |
| Complete track | 300-600 pts |
| 7-day streak | Bonus multiplier |
| Create content | Author share of reader rewards |

---

### Pillar 2: Suki Points (Loyalty/Purchase)

**Purpose:** Affordable loyalty rewards for MSME merchants and their customers.

**Features:**
- Scan QR to earn points at partner merchants
- Gift points to family/friends (OFW remittance style)
- Tangible rewards catalog (mobile load, food, goods, delivery)
- On-chain ledger for transparency
- No lost or double-spent points

**User Locations:**
- `/user/dashboard` - Points overview
- `/user/scan` - QR code scanner
- `/user/gift` - Send points to others
- `/user/catalog` - Redeem for goods
- `/user/rewards` - View available rewards
- `/user/redeem` - Redeem points
- `/user/transactions` - On-chain ledger

**Merchant Locations:**
- `/merchant/dashboard` - Business overview
- `/merchant/campaigns` - Create reward campaigns
- `/merchant/customers` - Customer management
- `/merchant/redemptions` - Track redemptions

---

### Pillar 3: Everyday Points (Lending/Borrowing)

**Purpose:** Incentivize responsible lending behavior with rewards for on-time repayments.

**Features:**
- Token-backed credit profile with score visualization
- Bi-weekly reward accrual for on-time payments
- Proof Certificate generation for better loan offers
- Platinum tier benefits (expert consults, lower rates)
- Repayment streak tracking

**Location:** `/user/borrow`

**Credit Tiers:**
| Tier | Requirements | Benefits |
|------|--------------|----------|
| Bronze | New user | Basic rewards |
| Silver | 6+ on-time payments | 1.25x multiplier |
| Gold | 12+ on-time payments | 1.5x multiplier |
| Platinum | 24+ on-time payments | Expert consults, lowest rates |

---

## User Portal

### Navigation Structure

```
Suki Points (Cyan)
├── Dashboard        /user/dashboard
├── Scan to Earn     /user/scan
├── Gift Points      /user/gift
├── Rewards          /user/rewards
├── Catalog          /user/catalog
└── Redeem           /user/redeem

Digital Library (Purple)
└── Learn            /user/learn

Everyday Points (Orange)
└── Credit Profile   /user/borrow

Community (Pink)
└── Governance       /user/community

Account (Gray)
├── Ledger           /user/transactions
├── History          /user/history
└── Profile          /user/profile
```

### Page Descriptions

#### Dashboard (`/user/dashboard`)
- Points balance with tier progress
- Recent transaction activity
- Available rewards preview
- Stats: Total earned, current tier, transactions count, rewards redeemed

#### Scan to Earn (`/user/scan`)
- QR code scanner interface
- Manual code entry option
- Recent scans history
- Merchant verification before earning

#### Gift Points (`/user/gift`)
- Send points via phone or email
- Quick amount buttons (100, 250, 500, 1000)
- Optional message attachment
- Recent recipients list

#### Rewards Catalog (`/user/catalog`)
- Categories: Mobile Load, Food & Drinks, Goods, Delivery
- Search and filter functionality
- Points balance display
- Stock availability indicators

#### Learn Dashboard (`/user/learn`)
- Learning tracks with progress
- Featured content cards
- Badge collection
- Author signup CTA
- XP and level system

#### Credit Profile (`/user/borrow`)
- Credit score circle visualization
- Repayment history table
- Proof certificate generation
- Platinum benefits preview
- On-time payment rate

#### Community & Governance (`/user/community`)
- Airdrop eligibility checker
- Leaderboard rankings
- Vesting schedule (for builders/investors)
- External tools (Web3 Dictionary, Roblox placeholder)

#### On-Chain Ledger (`/user/transactions`)
- Full transaction history
- Transaction hash display
- Block explorer links
- Filter by type (earn, redeem, transfer)
- Copy-to-clipboard functionality

---

## Merchant Portal

### Navigation Structure

```
├── Dashboard        /merchant/dashboard
├── Campaigns        /merchant/campaigns
├── New Campaign     /merchant/campaigns/new
├── Customers        /merchant/customers
├── Redemptions      /merchant/redemptions
├── Analytics        /merchant/analytics
└── Settings         /merchant/settings
```

### Features

#### Self-Serve Signup
- 3-step registration process
- Google OAuth option
- Business verification
- Go live in a day

#### Campaign Management
- Create custom reward campaigns
- Set points-per-peso ratios
- Define eligibility criteria
- Track campaign performance

#### Customer Insights
- View customer activity
- Track points distribution
- Analyze redemption patterns

---

## Admin Portal

### Navigation Structure

```
├── Dashboard        /admin/dashboard
├── Users            /admin/users
├── Merchants        /admin/merchants
├── Campaigns        /admin/campaigns
├── Analytics        /admin/analytics
├── Monitoring       /admin/monitoring
└── Settings         /admin/settings
```

### Features

- Platform-wide statistics
- User and merchant management
- Campaign oversight
- System monitoring
- Configuration settings

---

## API Routes

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/auth/signup` | POST | User registration |
| `/api/auth/google` | POST | Google OAuth |
| `/api/auth/verify-otp` | POST | OTP verification |
| `/api/auth/merchant/signup` | POST | Merchant registration |

### User APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/dashboard` | GET | User dashboard data |
| `/api/user/rewards` | GET | Available rewards |
| `/api/user/transactions` | GET | Transaction history |

### Merchant APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/merchant/dashboard` | GET | Merchant dashboard data |
| `/api/merchant/campaigns` | GET/POST | Campaign management |
| `/api/merchant/redemptions` | GET | Redemption records |

### Admin APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/dashboard` | GET | Admin dashboard data |
| `/api/admin/users` | GET | User management |
| `/api/admin/merchants` | GET | Merchant management |

---

## Components

### UI Components (`/components/ui/`)

| Component | Description |
|-----------|-------------|
| `Alert.js` | Notification/alert messages |
| `Badge.js` | Status badges |
| `Button.js` | Button variants |
| `Card.js` | Card container |
| `GoogleSignIn.js` | Google OAuth button |
| `Input.js` | Form input fields |
| `Modal.js` | Modal dialogs |
| `PhoneInput.js` | Phone number input with country code |
| `ProgressBar.js` | Progress indicators |
| `StatCard.js` | Statistics display card |
| `Table.js` | Data tables |

### Layout Components

| Component | Description |
|-----------|-------------|
| `UserSidebar.js` | User portal navigation |
| `MerchantSidebar.js` | Merchant portal navigation |
| `AdminSidebar.js` | Admin portal navigation |

### 3D Components (`/components/three/`)

| Component | Description |
|-----------|-------------|
| `AnimatedSphere.js` | Animated 3D sphere |
| `FloatingCoin.js` | Floating coin animation |
| `ParticleField.js` | Particle background |
| `RewardsVisualization.js` | 3D rewards display |

---

## Authentication

### Auth Context (`/context/AuthContext.js`)

Provides authentication state and methods:

```javascript
const { user, login, logout, loginWithGoogle } = useAuth();
```

### Auth Flow

1. **Standard Login**
   - User enters email/phone + password
   - Server validates credentials
   - JWT token returned and stored

2. **Google OAuth**
   - Click "Sign in with Google"
   - Google popup for authentication
   - Credential sent to `/api/auth/google`
   - User created or logged in

3. **OTP Verification**
   - After signup, OTP sent via SMS/email
   - User enters 6-digit code
   - Account verified and activated

4. **Merchant Approval**
   - Merchant completes signup form
   - Application submitted for review
   - Admin approves/rejects
   - Merchant notified of status

---

## Tokenomics

### Supply Policy

| Metric | Value |
|--------|-------|
| **Total Supply** | 500,000,000 COMPASS |
| **Initial Circulating** | ~15% |
| **Vesting Period** | 6-16 months |

### Token Allocation

| Category | Percentage | Purpose |
|----------|------------|---------|
| Community Rewards | 40% | User incentives, airdrops |
| Treasury | 25% | Platform development, operations |
| Team & Builders | 20% | Core team, contributors |
| Liquidity | 15% | DEX liquidity pools |

### Quarterly Airdrops

| Rank | Reward |
|------|--------|
| Top 100 wallets | 5,000 COMPASS |
| Top 500 wallets | 2,500 COMPASS |
| Top 1000 wallets | 1,000 COMPASS |
| Active participants | 100 COMPASS |

### Vesting Schedule (Team/Investors)

| Period | Unlock |
|--------|--------|
| Month 1-6 | 0% (Locked) |
| Month 7 | 10% |
| Month 8 | 10% |
| Month 9 | 10% |
| Month 10 | 10% |
| Month 11-16 | 60% (Linear) |

### Important Notice

> ⚠️ **No ROI / Profit Claims**  
> COMPASS INU is a utility token designed for rewards and ecosystem participation. It is NOT an investment product and makes no promises of financial returns.

---

## Roadmap

### Q1 2026 - Foundation (Current Phase)

- [x] Platform development
- [x] UI/UX testing
- [ ] Suki Points ecosystem launch
- [ ] MSME onboarding

**Progress:** 25%

### Q2 2026 - Digital Library

- [ ] Web3 knowledge hub
- [ ] Reader engagement rewards
- [ ] Author attention system
- [ ] Taglish Web3 Dictionary

### Q3 2026 - Everyday Points

- [ ] Lending partner integrations
- [ ] Credit profile system
- [ ] Repayment rewards
- [ ] Proof certificates

### Q4 2026 - Ecosystem Expansion

- [ ] Roblox integration
- [ ] Multi-chain support
- [ ] Community governance
- [ ] Token utility expansion

---

## Technical Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI library |
| **Tailwind CSS** | Utility-first styling |
| **React Icons** | Icon library (Fi, Bs, Hi, Ri) |

### Backend

| Technology | Purpose |
|------------|---------|
| **Next.js API Routes** | Serverless API endpoints |
| **Node.js** | Runtime environment |

### Authentication

| Technology | Purpose |
|------------|---------|
| **JWT** | Token-based auth |
| **Google OAuth** | Social login |
| **OTP** | Phone/email verification |

### Styling

| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility classes |
| **PostCSS** | CSS processing |
| **Custom Animations** | CSS keyframes |

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.mjs` | Next.js configuration |
| `tailwind.config.js` | Tailwind customization |
| `postcss.config.mjs` | PostCSS plugins |
| `jsconfig.json` | Path aliases |
| `eslint.config.mjs` | Linting rules |

---

## File Structure

```
compass_inu/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js                    # Landing page
│   │   ├── providers.js
│   │   │
│   │   ├── admin/
│   │   │   ├── analytics/page.js
│   │   │   ├── campaigns/page.js
│   │   │   ├── dashboard/page.js
│   │   │   ├── merchants/page.js
│   │   │   ├── monitoring/page.js
│   │   │   ├── settings/page.js
│   │   │   └── users/page.js
│   │   │
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/route.js
│   │   │   │   ├── merchants/route.js
│   │   │   │   └── users/route.js
│   │   │   ├── auth/
│   │   │   │   ├── google/route.js
│   │   │   │   ├── login/route.js
│   │   │   │   ├── merchant/signup/route.js
│   │   │   │   ├── signup/route.js
│   │   │   │   └── verify-otp/route.js
│   │   │   ├── merchant/
│   │   │   │   ├── campaigns/route.js
│   │   │   │   ├── dashboard/route.js
│   │   │   │   └── redemptions/route.js
│   │   │   └── user/
│   │   │       ├── dashboard/route.js
│   │   │       ├── rewards/route.js
│   │   │       └── transactions/route.js
│   │   │
│   │   ├── auth/
│   │   │   ├── login/page.js
│   │   │   ├── signup/page.js
│   │   │   ├── verify-otp/page.js
│   │   │   └── merchant/
│   │   │       ├── pending/page.js
│   │   │       └── signup/page.js
│   │   │
│   │   ├── merchant/
│   │   │   ├── analytics/page.js
│   │   │   ├── campaigns/
│   │   │   │   ├── page.js
│   │   │   │   └── new/page.js
│   │   │   ├── customers/page.js
│   │   │   ├── dashboard/page.js
│   │   │   ├── redemptions/page.js
│   │   │   └── settings/page.js
│   │   │
│   │   └── user/
│   │       ├── borrow/page.js         # Everyday Points
│   │       ├── catalog/page.js        # Rewards catalog
│   │       ├── community/page.js      # Governance & Airdrops
│   │       ├── dashboard/page.js      # Main dashboard
│   │       ├── gift/page.js           # Send points
│   │       ├── history/page.js
│   │       ├── learn/page.js          # Digital Library
│   │       ├── profile/page.js
│   │       ├── redeem/page.js
│   │       ├── rewards/page.js
│   │       ├── scan/page.js           # QR Scanner
│   │       └── transactions/page.js   # On-chain ledger
│   │
│   ├── components/
│   │   ├── AdminSidebar.js
│   │   ├── MerchantSidebar.js
│   │   ├── UserSidebar.js
│   │   ├── layout/
│   │   │   └── UserSidebar.js
│   │   ├── three/
│   │   │   ├── AnimatedSphere.js
│   │   │   ├── FloatingCoin.js
│   │   │   ├── index.js
│   │   │   ├── ParticleField.js
│   │   │   └── RewardsVisualization.js
│   │   └── ui/
│   │       ├── Alert.js
│   │       ├── Badge.js
│   │       ├── Button.js
│   │       ├── Card.js
│   │       ├── GoogleSignIn.js
│   │       ├── Input.js
│   │       ├── Modal.js
│   │       ├── PhoneInput.js
│   │       ├── ProgressBar.js
│   │       ├── StatCard.js
│   │       └── Table.js
│   │
│   ├── context/
│   │   └── AuthContext.js
│   │
│   └── lib/
│       ├── constants.js
│       └── mockData.js
│
├── public/
│
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```

---

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Purple** | `#8b5cf6` | Branding, primary actions |
| **Secondary Purple** | `#7c3aed` | Gradients, hover states |
| **Light Purple** | `#a78bfa` | Highlights, accents |
| **Cyan** | `#06b6d4` | Suki Points, merchants |
| **Orange** | `#f59e0b` | Everyday Points, warnings |
| **Pink** | `#ec4899` | Community, special features |
| **Background Dark** | `#0f0a1a` | Page background |
| **Card Background** | `#1e1433` | Card surfaces |
| **Border** | `#3d2d5c` | Borders, dividers |

### Typography

- **Font Family:** System fonts (default sans-serif)
- **Headings:** Font-black (900 weight)
- **Body:** Font-medium (500 weight)
- **Small:** Font-regular (400 weight)

### Animation Keyframes

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ZEDPortugal/Compass-Inu.git

# Navigate to project
cd compass_inu

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```env
# Authentication
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (when implemented)
DATABASE_URL=your-database-url

# Blockchain (when implemented)
CHAIN_RPC_URL=your-rpc-url
CONTRACT_ADDRESS=your-contract-address
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Future Enhancements

### Backend Integration (Priority)

1. **Database Setup**
   - PostgreSQL or MongoDB
   - User, Merchant, Transaction models
   - Real data persistence

2. **Blockchain Integration**
   - Smart contract deployment
   - On-chain transaction recording
   - Wallet connection (MetaMask, etc.)

3. **QR Scanner**
   - Implement `@zxing/library` or `html5-qrcode`
   - Real camera access
   - Merchant QR validation

4. **Certificate Generation**
   - PDF generation with `jspdf` or `react-pdf`
   - Digital signatures
   - Downloadable proof certificates

### Security Enhancements

1. **Anti-Fraud Verification**
   - reCAPTCHA integration
   - Rate limiting
   - Bot detection for reading rewards

2. **Authentication Hardening**
   - Two-factor authentication
   - Session management
   - Password policies

### Additional Features

1. **Push Notifications**
   - Web push notifications
   - Email notifications
   - SMS alerts

2. **Analytics Dashboard**
   - Real-time metrics
   - User behavior tracking
   - Conversion funnels

3. **Mobile App**
   - React Native version
   - Native QR scanning
   - Biometric authentication

---

## Support

For questions or issues:

- **Repository:** [github.com/ZEDPortugal/Compass-Inu](https://github.com/ZEDPortugal/Compass-Inu)
- **Branch:** main

---

## License

This project is proprietary software. All rights reserved.

---

*Documentation generated on January 4, 2026*
