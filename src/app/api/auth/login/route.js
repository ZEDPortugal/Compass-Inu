import { NextResponse } from 'next/server';

// Mock user database
const mockUsers = [
  { id: 'user_1', email: 'john@example.com', phone: '+1234567890', password: 'password123', name: 'John Doe', role: 'user' },
  { id: 'merchant_1', email: 'merchant@coffeehouse.com', phone: '+1987654321', password: 'password123', name: 'Coffee House', role: 'merchant', businessName: 'Coffee House' },
  { id: 'admin_1', email: 'admin@compass.com', phone: '+1111111111', password: 'admin123', name: 'Admin User', role: 'admin' },
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, phone, password, provider } = body;

    // Handle Google Sign-In
    if (provider === 'google') {
      const { googleToken, googleUser } = body;
      
      // In production, verify the Google token with Google's API
      // For now, we'll simulate a successful Google login
      if (!googleToken || !googleUser) {
        return NextResponse.json({ error: 'Invalid Google credentials' }, { status: 400 });
      }

      // Check if user exists with this email
      let user = mockUsers.find(u => u.email === googleUser.email);
      
      if (!user) {
        // Create new user from Google account
        user = {
          id: `user_google_${Date.now()}`,
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.picture,
          role: 'user',
          provider: 'google',
          googleId: googleUser.sub,
        };
      }

      const token = `mock_jwt_token_${user.id}_${Date.now()}`;

      return NextResponse.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
          },
          token,
        },
        message: 'Google sign-in successful',
      });
    }

    // Handle Phone OTP Login
    if (phone && !password) {
      const user = mockUsers.find(u => u.phone === phone);
      
      if (!user) {
        return NextResponse.json({ 
          error: 'User not found', 
          message: 'No account found with this phone number' 
        }, { status: 404 });
      }

      // Generate OTP (in production, send via SMS)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // In production, store OTP with expiry in Redis/database
      console.log(`OTP for ${phone}: ${otp}`);

      return NextResponse.json({
        success: true,
        data: {
          otpSent: true,
          phone: phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
          expiresIn: 300, // 5 minutes
        },
        message: 'OTP sent successfully',
      });
    }

    // Handle Email/Password Login
    if (!email && !phone) {
      return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const user = mockUsers.find(u => 
      (email && u.email === email) || (phone && u.phone === phone)
    );

    if (!user) {
      return NextResponse.json({ 
        error: 'Invalid credentials', 
        message: 'No account found with these credentials' 
      }, { status: 401 });
    }

    if (user.password !== password) {
      return NextResponse.json({ 
        error: 'Invalid credentials', 
        message: 'Incorrect password' 
      }, { status: 401 });
    }

    // Generate JWT token (mock)
    const token = `mock_jwt_token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          businessName: user.businessName,
        },
        token,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
