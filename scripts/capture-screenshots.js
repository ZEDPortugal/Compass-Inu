/**
 * Screenshot Capture Script for Documentation
 * 
 * This script captures screenshots of your site at different viewport sizes.
 * 
 * Prerequisites:
 *   npm install playwright
 * 
 * Usage:
 *   1. Start your dev server: npm run dev
 *   2. Run this script: node scripts/capture-screenshots.js
 * 
 * Output: Screenshots saved to /screenshots folder
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';

// Define viewport sizes
const viewports = {
  mobile: { width: 375, height: 812, name: 'mobile' },      // iPhone X
  tablet: { width: 768, height: 1024, name: 'tablet' },     // iPad
  desktop: { width: 1440, height: 900, name: 'desktop' }    // Desktop
};

// Pages to capture
const pages = [
  { path: '/', name: 'landing' },
  { path: '/auth/login', name: 'login' },
  { path: '/auth/signup', name: 'signup' },
  { path: '/auth/merchant/signup', name: 'merchant-signup' },
  { path: '/user/dashboard', name: 'user-dashboard' },
  { path: '/user/scan', name: 'user-scan' },
  { path: '/user/rewards', name: 'user-rewards' },
  { path: '/user/transactions', name: 'user-transactions' },
  { path: '/user/gift', name: 'user-gift' },
  { path: '/user/catalog', name: 'user-catalog' },
  { path: '/user/learn', name: 'user-learn' },
  { path: '/user/borrow', name: 'user-borrow' },
  { path: '/user/community', name: 'user-community' },
  { path: '/merchant/dashboard', name: 'merchant-dashboard' },
  { path: '/merchant/campaigns', name: 'merchant-campaigns' },
  { path: '/merchant/customers', name: 'merchant-customers' },
  { path: '/merchant/redemptions', name: 'merchant-redemptions' },
  { path: '/admin/dashboard', name: 'admin-dashboard' },
  { path: '/admin/merchants', name: 'admin-merchants' },
  { path: '/admin/users', name: 'admin-users' },
];

async function captureScreenshots() {
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Create subdirectories for each viewport
  Object.values(viewports).forEach(vp => {
    const dir = path.join(screenshotsDir, vp.name);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const browser = await chromium.launch({ headless: true });
  
  console.log('🚀 Starting screenshot capture...\n');

  for (const pageInfo of pages) {
    console.log(`📸 Capturing: ${pageInfo.name}`);
    
    for (const [key, viewport] of Object.entries(viewports)) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 2, // Retina quality
      });
      
      const page = await context.newPage();
      
      try {
        await page.goto(`${BASE_URL}${pageInfo.path}`, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });
        
        // Wait for animations to settle
        await page.waitForTimeout(1000);
        
        const filename = `${pageInfo.name}-${viewport.name}.png`;
        const filepath = path.join(screenshotsDir, viewport.name, filename);
        
        await page.screenshot({ 
          path: filepath,
          fullPage: true 
        });
        
        console.log(`   ✅ ${viewport.name}: ${filename}`);
      } catch (error) {
        console.log(`   ❌ ${viewport.name}: Failed - ${error.message}`);
      }
      
      await context.close();
    }
    console.log('');
  }

  await browser.close();
  
  console.log('✨ Screenshots saved to /screenshots folder');
  console.log('\nFolder structure:');
  console.log('  screenshots/');
  console.log('    ├── mobile/');
  console.log('    ├── tablet/');
  console.log('    └── desktop/');
}

captureScreenshots().catch(console.error);
