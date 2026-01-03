import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      email, 
      phone, 
      password, 
      name, 
      provider,
      googleToken,
      googleUser,
      type = 'user' // 'user' or 'merchant'
    } = body;

    // Handle Google Sign-Up
    if (provider === 'google') {
      if (!googleToken || !googleUser) {
        return NextResponse.json({ error: 'Invalid Google credentials' }, { status: 400 });
      }

      // In production, verify the Google token and check if user already exists
      const newUser = {
        id: `${type}_google_${Date.now()}`,
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture,
        role: type,
        provider: 'google',
        googleId: googleUser.sub,
        createdAt: new Date().toISOString(),
      };

      const token = `mock_jwt_token_${newUser.id}_${Date.now()}`;

      return NextResponse.json({
        success: true,
        data: {
          user: newUser,
          token,
        },
        message: 'Google sign-up successful',
      });
    }

    // Handle Phone Registration (OTP will be sent)
    if (phone && !password && !email) {
      // Validate phone number format
      const phoneRegex = /^\+?[1-9]\d{9,14}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return NextResponse.json({ 
          error: 'Invalid phone number format' 
        }, { status: 400 });
      }

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // In production: 
      // 1. Store OTP with phone number in Redis/database with expiry
      // 2. Send OTP via SMS using Twilio, AWS SNS, etc.
      console.log(`OTP for ${phone}: ${otp}`);

      return NextResponse.json({
        success: true,
        data: {
          otpSent: true,
          phone: phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
          expiresIn: 300, // 5 minutes
          // For development only - remove in production
          _devOtp: otp,
        },
        message: 'OTP sent to your phone',
      });
    }

    // Validate required fields for email registration
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ 
        error: 'Password must be at least 6 characters' 
      }, { status: 400 });
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ 
        error: 'Name must be at least 2 characters' 
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // In production, check if email already exists in database
    // For now, simulate email check
    if (email === 'existing@example.com') {
      return NextResponse.json({ 
        error: 'Email already registered',
        message: 'An account with this email already exists. Please login instead.'
      }, { status: 409 });
    }

    // Create new user
    const newUser = {
      id: `${type}_${Date.now()}`,
      email,
      phone: phone || null,
      name,
      role: type,
      createdAt: new Date().toISOString(),
      emailVerified: false,
    };

    // Generate JWT token
    const token = `mock_jwt_token_${newUser.id}_${Date.now()}`;

    // In production, you might want to send a verification email
    return NextResponse.json({
      success: true,
      data: {
        user: newUser,
        token,
        requiresVerification: true,
      },
      message: 'Account created successfully. Please verify your email.',
    });
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
