import { NextResponse } from 'next/server';

// In production, OTPs would be stored in Redis with expiry
const pendingOTPs = new Map();

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, otp, action = 'verify' } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Handle OTP request (send new OTP)
    if (action === 'send') {
      const phoneRegex = /^\+?[1-9]\d{9,14}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return NextResponse.json({ 
          error: 'Invalid phone number format' 
        }, { status: 400 });
      }

      // Generate 6-digit OTP
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP with 5-minute expiry
      pendingOTPs.set(phone, {
        otp: generatedOTP,
        expiresAt: Date.now() + 5 * 60 * 1000,
        attempts: 0,
      });

      // In production: Send OTP via SMS (Twilio, AWS SNS, etc.)
      console.log(`[DEV] OTP for ${phone}: ${generatedOTP}`);

      return NextResponse.json({
        success: true,
        data: {
          otpSent: true,
          phone: phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
          expiresIn: 300,
          // Development only - remove in production
          _devOtp: generatedOTP,
        },
        message: 'OTP sent successfully',
      });
    }

    // Handle OTP verification
    if (action === 'verify') {
      if (!otp) {
        return NextResponse.json({ error: 'OTP is required' }, { status: 400 });
      }

      if (otp.length !== 6) {
        return NextResponse.json({ error: 'OTP must be 6 digits' }, { status: 400 });
      }

      // In production, retrieve from Redis/database
      const storedData = pendingOTPs.get(phone);
      
      // For development, accept "123456" as valid OTP if no stored OTP
      const isDevMode = !storedData && otp === '123456';
      
      if (!storedData && !isDevMode) {
        return NextResponse.json({ 
          error: 'OTP expired or not found',
          message: 'Please request a new OTP'
        }, { status: 400 });
      }

      if (storedData) {
        // Check expiry
        if (Date.now() > storedData.expiresAt) {
          pendingOTPs.delete(phone);
          return NextResponse.json({ 
            error: 'OTP expired',
            message: 'Please request a new OTP'
          }, { status: 400 });
        }

        // Check attempts (max 3)
        if (storedData.attempts >= 3) {
          pendingOTPs.delete(phone);
          return NextResponse.json({ 
            error: 'Too many attempts',
            message: 'Please request a new OTP'
          }, { status: 429 });
        }

        // Verify OTP
        if (storedData.otp !== otp) {
          storedData.attempts += 1;
          return NextResponse.json({ 
            error: 'Invalid OTP',
            attemptsRemaining: 3 - storedData.attempts
          }, { status: 400 });
        }

        // OTP verified - clean up
        pendingOTPs.delete(phone);
      }

      // Create or find user
      const user = {
        id: `user_phone_${Date.now()}`,
        phone,
        role: 'user',
        phoneVerified: true,
        createdAt: new Date().toISOString(),
      };

      const token = `mock_jwt_token_${user.id}_${Date.now()}`;

      return NextResponse.json({
        success: true,
        data: {
          user,
          token,
          isNewUser: true,
        },
        message: 'Phone verified successfully',
      });
    }

    // Handle OTP resend
    if (action === 'resend') {
      const storedData = pendingOTPs.get(phone);
      
      // Rate limiting - can only resend after 60 seconds
      if (storedData && (Date.now() - (storedData.expiresAt - 5 * 60 * 1000)) < 60 * 1000) {
        return NextResponse.json({ 
          error: 'Please wait before requesting a new OTP',
          retryAfter: 60
        }, { status: 429 });
      }

      // Generate new OTP
      const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
      
      pendingOTPs.set(phone, {
        otp: newOTP,
        expiresAt: Date.now() + 5 * 60 * 1000,
        attempts: 0,
      });

      console.log(`[DEV] New OTP for ${phone}: ${newOTP}`);

      return NextResponse.json({
        success: true,
        data: {
          otpSent: true,
          expiresIn: 300,
          _devOtp: newOTP,
        },
        message: 'New OTP sent successfully',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
